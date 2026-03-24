---
title: Trusted Proxy 上线前应该过哪些检查
description: 结合最新官方 trusted-proxy auth 与 security audit 文档，整理一套上线前检查顺序，避免把只是做 TLS 的反向代理误当成可托付身份的安全代理。
category: 安全治理
difficulty: 高级
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/gateway/trusted-proxy-auth
sourceName: OpenClaw Docs
sourceType: official
tags: [trusted-proxy, reverse-proxy, auth, security, rollout]
---

# Trusted Proxy 上线前应该过哪些检查

trusted-proxy 是 OpenClaw 里最值得保守上线的能力之一。  
官方最近不仅把它单独拆成文档，还明确说明：

- `openclaw security audit` 会把它标成 critical

这不是因为它不能用，而是因为：

- 你把认证责任前移给了代理

## 第一原则：先确认你需要的是“身份代理”，不是“TLS 代理”

如果你的代理只做：

- HTTPS
- 域名
- WebSocket 转发

那通常还不该切到 trusted-proxy。

更适合 trusted-proxy 的前提是：

- 代理本身已经完成用户认证

## 第二原则：代理必须是唯一入口

这是上线前最关键的一条。

如果用户还能绕过代理直接访问 Gateway，那么 trusted-proxy 基本就已经失去意义。

上线前至少要确认：

- Gateway 端口不对公网开放
- 只有代理可以打到 Gateway
- 防火墙 / 容器网络路径真的收紧

## 第三原则：`trustedProxies` 一定要最小化

官方当前明确把这点当成重点风险项。  
更稳的做法是：

- 只写真实代理 IP
- 不写大网段
- 不图省事把整段容器网络都放进去

## 第四原则：`userHeader` 和 `allowUsers` 不要留空想当然

trusted-proxy 模式里，真正决定身份接入面的关键配置通常是：

- `userHeader`
- `allowUsers`

如果这两项没收好，很容易出现：

- 代理虽然认证了
- 但 Gateway 还是接收了比预期更宽的用户范围

## 第五原则：先做小范围 operator 试点

不要一开始就把整个组织级 SSO 全部接进来。  
更稳的上线顺序通常是：

1. 先只给少量 operator
2. 先验证 Control UI、WebSocket、身份头是否一致
3. 再慢慢扩大

## 第六原则：把 `security audit` 放进上线流程

trusted-proxy 上线前后，都建议至少跑：

```bash
openclaw security audit
```

如果后面又改了代理链、负载均衡或头部策略，再补：

```bash
openclaw security audit --deep
```

## 最容易踩的坑

### 1. 代理没做认证，只做 HTTPS

这不是真正的 trusted-proxy 场景。

### 2. `trustedProxies` 配得过宽

后面最容易被 header 伪造或非预期来源撞进来。

### 3. `allowUsers` 留空

这在组织代理后面尤其容易把暴露面放得过大。

### 4. 只关心页面能不能打开

能打开 Control UI 不代表身份链已经安全闭环。

## 一条更稳的上线顺序

1. 先用 token / password 把 Gateway 跑稳
2. 再把代理认证跑稳
3. 收紧 Gateway 网络入口
4. 小范围启用 trusted-proxy
5. 跑 `security audit`
6. 再逐步扩大 operator 范围

## 下一步推荐

- [Trusted Proxy Auth 怎么用](/docs/operations/trusted-proxy-auth)
- [security audit、--deep 和 --fix 该怎么配合](/docs/operations/security-audit-fix-and-review)
- [OpenClaw 安全配置基础](/docs/operations/safety-basics)

