---
title: Trusted Proxy Auth 怎么用
description: 理解 OpenClaw 的 trusted-proxy 认证模式、适用场景、风险检查项，以及它和普通 TLS 反向代理的本质区别。
category: 运维
updatedAt: 2026-03-18
source: https://docs.openclaw.ai/gateway/trusted-proxy
sourceName: OpenClaw Docs
sourceType: official
tags: [trusted-proxy, reverse-proxy, auth, gateway, security]
---

# Trusted Proxy Auth 怎么用

OpenClaw 官方把 `trusted-proxy` 认证模式单独做成一页，不是因为它常用，而是因为它**风险高但很重要**。

如果你只记一句话，更适合记这句：

- **它适合“代理本身已经做完身份认证”的场景**
- **它不适合“只是想把 Gateway 放到 nginx / Caddy 后面”的场景**

## 1. `trusted-proxy` 到底做了什么

在这种模式下，Gateway 不再自己直接认证终端用户，而是把认证结果委托给前面的反向代理。

更准确地说，它假设：

- 代理已经完成用户认证
- 代理会把用户身份通过 header 传给 Gateway
- Gateway 只接受来自受信代理的请求

所以它不是“多一种 token 写法”，而是**把整套认证边界前移到代理层**。

## 2. 什么场景适合用

根据官方当前文档，更适合启用 `trusted-proxy` 的情况是：

- 你使用 identity-aware proxy，例如 `oauth2-proxy`、Pomerium、Traefik forward auth 等
- 你的反向代理就是访问 Gateway 的唯一入口
- 你在 Kubernetes / 容器环境里，需要让浏览器走统一身份系统
- 你已经遇到浏览器 WebSocket `1008 unauthorized` 之类问题，并确认需要把认证放到代理层解决

它更像企业或平台化部署能力，而不是个人首选。

## 3. 什么情况不该用

官方“不建议启用”的条件写得也很明确：

- 你的代理只是 TLS 终止器或普通负载均衡
- 仍然存在绕过代理直达 Gateway 的路径
- 你不确定代理是否会覆盖而不是追加 `x-forwarded-*` 头
- 你只是想“先让网页能连上再说”

如果是这些情况，更适合继续用：

- token / password auth
- SSH tunnel
- Tailscale Serve

## 4. 这和普通反向代理的区别

很多人会把“反向代理 + HTTPS”和“trusted-proxy auth”混成一件事，其实不是。

### 普通反向代理

只负责：

- TLS
- 域名
- 路由
- WebSocket 透传

这时 Gateway 自己仍然负责 token / password 认证。

### Trusted Proxy Auth

除了 TLS / 转发，还负责：

- 用户登录
- 会话身份
- 用户 header 注入

这时 Gateway 只信代理转发来的“已经认证好的用户”。

## 5. 开启前必须过的安全检查

官方文档现在把这几个检查项列得非常具体：

1. **代理是唯一入口**  
   Gateway 端口必须被防火墙保护，不能让任何人绕过代理直接访问。

2. **`trustedProxies` 必须最小化**  
   只写真实代理 IP，不要写整段大网段。

3. **代理必须覆盖 header**  
   `X-Forwarded-For` 等头要 overwrite，不是 append。

4. **外层用户必须走 HTTPS**  
   不要在明文 HTTP 上做这层信任。

5. **最好显式限制 `allowUsers`**  
   否则任何“已经被代理认证的人”都可能进 Gateway。

## 6. 一个更容易理解的最小配置

更适合把它理解成“三段式”：

```yaml
gateway:
  trustedProxies:
    - "127.0.0.1"
  auth:
    mode: trusted-proxy
```

然后再补：

- 代理身份 header
- `allowUsers`
- 防火墙规则

也就是说，真正的重点不在 YAML 有几行，而在于**网络路径和用户身份是否真的闭环**。

## 7. 为什么官方把它标成 security-sensitive

因为这个模式一旦配错，风险不是“小 bug”，而是**整个 Gateway 被未授权访问**。

最典型的错误包括：

- 代理没做认证，只做 TLS
- `trustedProxies` 写得过宽
- Gateway 端口没有被挡住
- 用户可以自己构造 forwarded headers

这几类问题一旦出现，后果往往比单纯的 token 泄露更难察觉。

## 8. `allowUsers` 为什么很重要

官方安全检查里把空的 `allowUsers` 也当成值得提醒的高风险项，不是没有原因。

因为在 trusted-proxy 模式下：

- 没有限制时，任何通过代理认证的人都可能进入 Gateway
- 一旦代理接的是组织级 SSO，默认暴露面可能比你想象得大很多

所以更稳的做法通常是：

- 先只放少量管理员 / operator
- 逐步扩大，而不是一开始全组织开放

## 9. 它和 Tailscale Serve 不是一回事

两者都可能出现在“浏览器连 Gateway”的场景里，但安全模型不同：

### Tailscale Serve

- 更偏 tailnet 内部身份
- OpenClaw 能结合本地 Tailscale daemon 校验身份
- 适合个人或小团队私网访问

### Trusted Proxy Auth

- 更偏企业代理 / SSO
- 身份完全由你前面的代理决定
- 更适合统一身份和统一域名入口

不要把 Serve 的便利性和 trusted-proxy 的企业能力混成一类。

## 10. 最常见的排错方向

如果你已经开了 trusted-proxy，又遇到权限问题，优先检查：

- 请求是不是一定经过代理
- 代理是不是覆盖了 `x-forwarded-*`
- `trustedProxies` 是否只包含真实代理 IP
- `userHeader` 是否和代理实际输出一致
- `allowUsers` 是否挡住了本来想放行的人

官方文档里还特别提到，`openclaw security audit` 会把 trusted-proxy auth 标成 critical 提醒，这不是报错，而是故意提醒你：**你把安全责任交给代理了。**

## 11. 更适合的使用顺序

如果你准备上 trusted-proxy，建议按这个顺序：

1. 先用 token / password 跑通 Gateway
2. 再确认代理层认证已经稳定
3. 再把 Gateway 端口完全收口到代理后面
4. 最后才切换到 `trusted-proxy`

这个顺序能明显减少“问题到底出在代理还是 Gateway”这种排错混乱。

## 下一步推荐

- [OpenClaw 安全配置基础](/docs/operations/safety-basics)
- [OpenClaw 安全最佳实践](/docs/operations/openclaw-security-best-practices)
- [远程访问与 Tailscale / SSH](/docs/operations/remote-access)
- [故障排除与诊断思路](/docs/reference/troubleshooting)
