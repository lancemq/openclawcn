---
title: Tailscale Serve / Funnel 怎么选
description: 基于官方 Tailscale 文档，解释 serve、funnel、tailnet 绑定和 allowTailscale 的差异，以及更稳的使用边界。
category: 运维
updatedAt: 2026-03-12
source: https://docs.openclaw.ai/zh-CN/gateway/tailscale
sourceName: OpenClaw Docs
sourceType: official
tags: [tailscale, serve, funnel, gateway, auth]
---

# Tailscale Serve / Funnel 怎么选

Tailscale 是 OpenClaw 官方远程访问文档里出现频率最高的一条路径，但真正容易混淆的是：`serve`、`funnel`、`bind: "tailnet"` 以及 `allowTailscale` 并不是一回事。

如果你只记一个结论，更适合记这句：

- `serve` 适合 tailnet 内部访问
- `funnel` 是公网暴露，风险和要求都更高
- `bind: "tailnet"` 是直接监听 tailnet 地址，不等于 Serve

## 三种模式分别解决什么问题

### `gateway.tailscale.mode = "serve"`

这是官方文档里更偏默认推荐的安全路径。

它的特点是：

- Gateway 仍保持在 `127.0.0.1`
- 由 `tailscale serve` 暴露 HTTPS / WebSocket
- 访问范围限定在 tailnet 内
- Serve 请求可以带 Tailscale 身份头

更适合：

- 你自己的多设备访问
- 小团队在同一 tailnet 内访问
- 不希望直接把 Gateway 监听到公网或局域网接口

### `gateway.tailscale.mode = "funnel"`

这是公开 HTTPS 暴露模式。

官方文档明确把它定义为公共访问能力，因此要求也更高：

- 需要共享密码或更明确的认证边界
- 不再是 tailnet-only
- 不会像 Serve 一样注入同样的身份头信任模型
- 对 Tailscale 版本、MagicDNS、HTTPS 和节点属性都有额外要求

如果你只是想自己远程访问，通常不该先上 Funnel。

### `gateway.bind = "tailnet"`

这不是 Serve，也不是 Funnel。

它的含义更接近：

- Gateway 直接监听 Tailnet IP
- 你直接从另一个 tailnet 设备连到这个地址
- 这时仍然需要显式考虑 token / password 等认证方式

这种模式适合已经很清楚自己网络边界的人，但对多数第一次远程化的用户来说，Serve 往往更容易控制风险。

## `allowTailscale` 到底做了什么

这是官方文档里非常值得单独讲清楚的一点。

当满足这些条件时：

- `tailscale.mode = "serve"`
- `gateway.auth.allowTailscale = true`

OpenClaw 可以接受经过 Serve 代理、并带有 Tailscale 身份头的请求，而不再强制要求额外 token / password。官方说明里提到它会结合本地 Tailscale 守护进程做身份验证，而不是盲目信任请求头。

但这套便利性只适合 Serve 场景。它不等于“所有 Tailscale 访问都自动免密”。

如果你希望所有访问都必须显式提供凭证，可以：

- 设 `gateway.auth.allowTailscale: false`
- 或直接强制 `gateway.auth.mode: "password"`

## 为什么 Funnel 更该谨慎

官方文档对 Funnel 的态度很明确：它能用，但不是“更高级的默认方案”，而是“公开暴露能力”。

实际意味着：

- 你的暴露面从 tailnet 扩大到公网
- 密码、反向代理、TLS 和访问日志都会更关键
- 错误配置的成本显著高于 Serve

如果你还在排“远程能不能连上”，通常先别上 Funnel。

## 浏览器控制为什么不该优先用 Funnel

官方文档对远程 Gateway 配合本地浏览器控制也给了明确建议：如果 Gateway 在一台机器上，而浏览器要在另一台机器上被驱动，更稳的做法是在浏览器所在机器上跑一个节点主机，再让两边处于同一个 tailnet。

也就是说：

- 浏览器控制优先靠节点
- 不要把 Funnel 当成浏览器远控的主路径

这点很重要，因为很多人会试图通过“把 UI 暴露出来”解决浏览器控制问题，但那不是 OpenClaw 更推荐的架构。

## 最小配置示例应该怎么理解

官方文档给的 tailnet-only 示例，本质上是在强调一件事：Gateway 可以继续保持 loopback 绑定，再让 Tailscale 负责外层访问。

更稳的基本思路是：

```json
{
  "gateway": {
    "bind": "loopback",
    "tailscale": { "mode": "serve" }
  }
}
```

如果你改成直接 `bind: "tailnet"`，那你要自己更清楚地承担认证和暴露边界。

## 使用前提和限制别忽略

官方文档里还列了几条很实际的限制：

- Serve 需要 tailnet 已启用 HTTPS
- Funnel 需要 Tailscale `v1.38.3+`
- Funnel 依赖 MagicDNS、HTTPS 和 funnel 节点属性
- Funnel 只支持特定 TLS 端口

所以“配置对了却还是打不开”时，不一定是 OpenClaw 本身有问题，可能是 Tailscale 前提条件没满足。

## 中文站建议的选择顺序

如果你准备做远程访问，建议按这个顺序选：

1. 单人临时访问：先 SSH 隧道
2. 多设备长期访问：优先 Tailscale Serve
3. 已有明确公网暴露需求：再评估 Funnel
4. 已经很熟 tailnet 网络边界：再考虑直接 `bind: "tailnet"`

## 下一步推荐

- [远程访问与 Tailscale / SSH](/docs/operations/remote-access)
- [网络模型、发现与配对](/docs/operations/network-and-pairing)
- [OpenClaw 安全配置基础](/docs/operations/safety-basics)
- [多 Gateway 与环境隔离](/docs/operations/multiple-gateways)
