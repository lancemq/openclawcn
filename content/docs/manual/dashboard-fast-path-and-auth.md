---
title: Dashboard 快速打开与认证行为
description: 基于最新官方 Dashboard 文档，整理 openclaw dashboard 的快速打开路径、token 在浏览器里的保存行为，以及本地与远程打开时最容易混淆的认证边界。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/web/dashboard
sourceName: OpenClaw Docs
sourceType: official
tags: [dashboard, control-ui, auth, token, browser]
---

# Dashboard 快速打开与认证行为

官方最近的 Dashboard 文档把一个很容易被忽略的问题讲得比以前清楚很多了：很多人以为自己打不开 dashboard 是“网页有问题”，其实大多数时候是认证边界没理解清楚。

如果你只记一句话，更适合记这个：

- `openclaw dashboard` 不只是“帮你打开浏览器”
- 它其实是在帮你走最稳的本地控制面入口

## Dashboard 默认到底在哪里

根据当前官方文档，browser Control UI 默认就挂在：

```text
http://127.0.0.1:18789/
```

或者：

```text
http://localhost:18789/
```

它默认服务在 `/`，而不是某个额外子路径。只有你显式改：

- `gateway.controlUi.basePath`

时，这个路径才会变化。

## `openclaw dashboard` 为什么比手打地址更稳

官方当前最推荐的打开方式仍然是：

```bash
openclaw dashboard
```

它的价值不只在“省一次复制粘贴”，而在于：

- 本地首次打开时更容易带你走正确认证路径
- 如果在 headless 环境，还会给 SSH hint
- 更适合快速确认 Gateway 和控制面是不是同一套实例

对第一次接触 OpenClaw 的用户来说，这通常比自己猜 URL 更少变量。

## token 现在在浏览器里是怎么处理的

官方最新 Dashboard 文档里一个值得注意的小变化是：

- token 会在当前浏览器 tab 的 `sessionStorage` 中保留
- 页面加载后会把 URL 里的 token 去掉

这和很多人以为的“token 永远留在 URL 或 localStorage 里”不一样。

这意味着：

- 当前 tab 内体验更顺
- token 不会长期裸露在地址栏
- 但它仍然是高敏感控制面凭据

## 本地打开和远程打开有什么区别

官方文档现在把这条边界说得很明确：

### 本地 localhost

更适合：

- 直接开 `http://127.0.0.1:18789/`
- 如果 unauthorized，再跑 `openclaw dashboard`

### 远程

更适合：

- SSH 隧道
- Tailscale Serve
- 明确的 tailnet bind + token/password

也就是说，官方并不鼓励你把 dashboard 当普通公网网页去打开。

## 为什么 `1008 unauthorized` 这么常见

根据官方 Dashboard 文档，最常见的几种原因其实都很具体：

- Gateway 根本没连上
- token 不对
- 当前浏览器没有正确带 auth
- 你以为自己连的是本地，其实已经在连远程实例

所以看到 `1008` 时，更适合先问：

- 这是本地还是远程
- 当前 token 来源是什么
- 当前 URL 连到的是哪台 Gateway

## Dashboard 和 WebChat 不该混着理解

虽然它们都走 Gateway WebSocket，但职责不同：

- Dashboard 更偏控制面
- WebChat 更偏聊天入口

Dashboard 文档甚至明确提醒：

- 这是 admin surface
- 不该公开暴露

所以它不是“另一个聊天前端”，而是高权限管理面。

## 中文站建议怎么使用它

更稳的默认习惯通常是：

1. 本地第一次验证先跑 `openclaw dashboard`
2. 远程时优先 SSH 隧道或 Tailscale Serve
3. 不把 dashboard 当公开网页
4. 看到 unauthorized 先查 token 和实例归属

这样会比“先把网页打开，再慢慢补 auth”稳很多。

## 下一步推荐

- [远程打开 Control UI 的正确方式](/docs/operations/control-ui-remote-access)
- [WebChat 的会话与只读边界](/docs/manual/webchat-session-and-readonly-mode)
- [Web 入口怎么选：Dashboard、WebChat、message CLI](/best-practices/web-entry-selection)

把这几页串起来看，Web 入口就更不容易再混成一团。
