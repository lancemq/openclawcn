---
title: Trusted Proxy 和 Tailscale Serve 怎么选
description: 基于最新官方安全与 trusted proxy 文档，解释 OpenClaw 在 trusted-proxy、token/password 和 Tailscale Serve 之间各自适合什么场景。
category: 运维
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/gateway/trusted-proxy-auth
sourceName: OpenClaw Docs
sourceType: official
tags: [trusted-proxy, tailscale, reverse-proxy, auth, gateway, security]
---

# Trusted Proxy 和 Tailscale Serve 怎么选

很多人在把 Gateway 暴露给别的设备时，最容易混淆的不是“能不能连上”，而是“该把认证放在哪一层”。

官方最近的安全和 trusted proxy 文档，其实已经把这条边界说得很清楚：

- `trusted-proxy` 适合身份感知代理
- token / password 仍然是基础认证方式
- Tailscale Serve 适合更轻量的个人或小团队远程访问

## 为什么这三个东西不能混着理解

它们解决的问题不完全一样。

### Token / Password

这是 Gateway 自己直接做认证。

更适合：

- 单机
- 小范围远程访问
- 不想引入额外身份代理

### Trusted Proxy

这是把认证前移到反向代理。

更适合：

- OAuth/OIDC/SAML 已经在代理层做好
- 浏览器要稳定访问 Control UI
- 容器或平台化环境里代理就是唯一入口

### Tailscale Serve

它更像“让安全远程入口简单很多”的路径。

更适合：

- 自己的设备之间访问
- 小团队 tailnet
- 不想单独维护一整套身份代理

## 官方为什么特别提醒不要滥用 trusted-proxy

官方文档把 `trusted-proxy` 明确标成安全敏感能力，不是因为它不好，而是因为它一旦配错，后果会非常直接。

最关键的风险其实就一个：

- Gateway 完全信任前置代理传来的认证结果

所以只要出现下面任何一种情况，就不该轻易上它：

- 代理只是 TLS 终止器
- 还有绕过代理直达 Gateway 的路径
- 你不确定 `x-forwarded-*` 头会不会被正确覆盖
- 只是想先把页面访问问题“凑合解决”

## 什么时候更应该优先用 Tailscale Serve

官方 trusted proxy 文档里实际上给了很明确的暗示：

- 如果你只需要个人单用户访问
- 或者主要是少量可信设备之间远程访问

那更适合优先考虑 Tailscale Serve + loopback 这类更轻的路径。

这类方式的价值在于：

- 不需要你自己搭完整 OAuth 代理
- 不需要维护用户 header 注入链路
- 认证边界更简单

对中文站很多个人用户和小团队来说，这通常会比 trusted-proxy 稳很多。

## 浏览器和 WebSocket 问题时怎么判断该走哪条路

官方文档特别提到一个典型场景：浏览器 WebSocket 遇到 `1008 unauthorized`。

这时很多人会立刻觉得“是不是应该上 trusted-proxy”。但更稳的判断顺序其实是：

1. 先确认你是不是确实需要浏览器走代理认证
2. 再确认是不是容器/平台场景
3. 再看能不能直接用更简单的远程访问路径

如果只是自己远程开网页，并不一定要把整套认证前移。

## 真正适合 trusted-proxy 的环境长什么样

根据当前官方文档，更像下面这些环境：

- Pomerium
- Caddy + OAuth
- nginx + oauth2-proxy
- Traefik + forward auth

也就是：

- 代理本身已经知道“这个用户是谁”
- 代理会注入用户 header
- Gateway 只接受来自可信代理 IP 的请求

如果少了其中任何一个前提，`trusted-proxy` 都可能比想象中危险。

## 配 trusted-proxy 时最不能省的检查

官方文档里当前最值得记住的几个点是：

1. `gateway.trustedProxies` 只能写真实代理 IP
2. `userHeader` 必须明确
3. 最好限制 `allowUsers`
4. 代理必须是唯一入口
5. 外部访问必须走 HTTPS

这套东西本质上不是“再加一个 auth mode”，而是一条完整的部署边界。

## 中文站建议怎么选

如果你现在只是想稳定访问自己的 Gateway，建议按这个顺序判断：

1. 个人设备远程访问：优先 Tailscale Serve
2. 小范围可信访问：先用 token / password
3. 企业或平台统一身份接入：再考虑 trusted-proxy

这样做的好处是：复杂度会和真实需求一起增长，而不是一开始就把安全边界弄得过重。

## 下一步推荐

- [Trusted Proxy Auth 怎么用](/docs/operations/trusted-proxy-auth)
- [网络访问与配对连接](/docs/operations/network-and-pairing)
- [远程访问方案梳理](/docs/operations/remote-access)

这三页连起来看，会比单看某一种入口方式更容易做出正确判断。
