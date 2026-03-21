---
title: 远程打开 Control UI 的正确方式
description: 基于最新官方 Control UI、Dashboard 和 Tailscale 文档，整理远程访问 Control UI 时最稳的路径、常见 1008 报错原因，以及 allowedOrigins 等关键边界。
category: 运维
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/web/control-ui
sourceName: OpenClaw Docs
sourceType: official
tags: [control-ui, dashboard, remote-access, tailscale, allowedOrigins]
---

# 远程打开 Control UI 的正确方式

很多人第一次把 OpenClaw 放到另一台主机上时，最先踩坑的不是 Gateway 本身，而是浏览器控制面怎么安全地打开。

官方最近的 `Control UI`、`Dashboard` 和 `Tailscale` 文档，其实已经把最关键的边界讲得很清楚：

- Control UI 是管理面，不是公开网页
- 本地、tailnet 和开发调试的打开方式都不一样
- 浏览器能打开页面，不代表 WebSocket 和配对就一定正常

## 先记住一个前提

Control UI 本质上是 Gateway 提供的一层浏览器管理面，它直接连同端口上的 WebSocket。

这意味着远程打开它时，你实际上同时在处理三件事：

- HTTP 页面能否加载
- WebSocket 能否握手
- 这个浏览器设备是否已经被允许

任何一层不通，最后都会表现成“页面能开但就是用不了”。

## 最稳的三种打开方式

### 1. 本地 localhost

官方最推荐的永远是：

```text
http://127.0.0.1:18789/
```

这时：

- 浏览器和 Gateway 在同一台机器
- 本地连接会自动批准设备
- 不用额外处理远程 origin

如果你只是自己调试，先在这条路径跑通永远最省事。

### 2. SSH 隧道

如果 Gateway 在远程主机，而你只是从自己的电脑上偶尔管理，更适合先走 SSH 隧道：

```bash
ssh -N -L 18789:127.0.0.1:18789 user@host
```

然后本地浏览器仍然打开：

```text
http://127.0.0.1:18789/
```

这条路径的价值在于：浏览器仍然以为自己连的是 localhost，很多远程浏览器限制就自然规避掉了。

### 3. Tailscale Serve

如果你准备长期在多设备上打开同一个 Control UI，官方当前更推荐：

- Gateway 继续 loopback-only
- 通过 Tailscale Serve 提供 HTTPS
- 让浏览器走 tailnet 身份

这通常比自己裸露一个公网管理面稳得多。

## 为什么很多人会遇到 `1008 unauthorized`

官方 Dashboard 和 Control UI 文档现在都反复提到 `1008` 这类报错，因为它很常见，但原因不只一个。

最常见的几种情况是：

- 没带 token / password
- 远程浏览器设备还没配对批准
- 走了不安全的 HTTP 场景，设备身份校验被浏览器卡住
- `gatewayUrl` 指向了远程实例，但没显式给认证参数

所以看到 `1008` 时，不要第一反应就改代理。先判断到底是：

- auth 问题
- pairing 问题
- secure context 问题

## `openclaw dashboard` 为什么值得先用

官方 Dashboard 文档现在明确推荐：

```bash
openclaw dashboard
```

它的好处是：

- 会给你一条带 token 的快速打开链接
- 本地首次接入时更容易减少“为什么明明在同一台机子上还 unauthorized”的困惑

如果你只是想先确认 Gateway 正不正常，这通常比手工拼 URL 更快。

## 远程 dev server 调试时最容易漏什么

官方 `pnpm ui:dev` 调远程 Gateway 的文档现在已经把关键边界写得很清楚了。

如果你用本地 Vite dev server 去连远程 Gateway，最容易漏的是：

- `gatewayUrl`
- 显式 token
- `gateway.controlUi.allowedOrigins`

也就是：

- 页面和 WebSocket 可以不在同一个 origin
- 但 Gateway 必须明确允许这个前端来源

如果这层没加，页面看起来像是起来了，真正连 Gateway 时还是会失败。

## `allowedOrigins` 到底什么时候要配

根据最新官方文档，只要出现“非 loopback 的 Control UI 部署”或“跨 origin 调试”，就应该明确写 `allowedOrigins`。

它特别适合：

- 本地 `5173` 调远程 Gateway
- 固定域名下的控制面部署
- 你明确知道浏览器来源应该只有哪些地址

这不是额外麻烦，而是把管理面入口限定清楚。

## 为什么 plain HTTP 远程访问风险很高

官方文档现在专门把这点单独拎出来讲：

- 如果你直接用 `http://<lan-ip>` 或 `http://<tailscale-ip>`
- 浏览器会处在 non-secure context
- WebCrypto 和设备身份相关逻辑可能受限

因此官方推荐优先：

- `http://127.0.0.1:18789/`
- `https://<magicdns>/`

而不是把 HTTP 局域网地址当成长期默认入口。

## 中文站建议的判断顺序

如果你现在准备远程用浏览器管理 OpenClaw，更适合按这个顺序：

1. 先本地 `openclaw dashboard`
2. 再试 SSH 隧道
3. 需要多设备长期访问时再上 Tailscale Serve
4. 只有你非常清楚 origin、TLS 和认证边界时，才做自定义远程前端入口

这样会比一开始就折腾公网域名、反向代理和跨域调试稳很多。

## 下一步推荐

- [配对审批与设备授权管理](/docs/reference/pairing-admin)
- [Trusted Proxy 和 Tailscale Serve 怎么选](/docs/operations/trusted-proxy-vs-tailscale-serve)
- [Remote Operators 与多设备协作](/docs/operations/remote-operators-and-nodes)

把这三页一起看，远程 Control UI 的安全边界会清楚很多。
