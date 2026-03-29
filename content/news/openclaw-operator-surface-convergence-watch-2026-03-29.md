---
title: "OpenClaw 正在把 Dashboard、WebChat 和 WebSocket 收成一套 operator surface"
description: "官方最近围绕 Dashboard、WebChat 和 Gateway Protocol 的文档更新，越来越清楚地把这些入口解释成同一套 operator surface 的不同层，而不是彼此割裂的功能页。"
category: 生态观察
date: "2026-03-29"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/gateway/protocol"
updatedAt: "2026-03-29"
sourceType: "official"
tags: ["dashboard", "webchat", "websocket", "operators", "control-plane"]
---

最近把 OpenClaw 的 `Dashboard`、`WebChat` 和 `Gateway Protocol` 文档放在一起看，会看到一个越来越清楚的趋势：

- 官方正在把这些入口解释成同一套 operator surface 的不同层

而不是：

- 各自独立的几个页面

## 1. Dashboard 越来越像控制面 bootstrap

Dashboard 文档最近一直在强化：

- `openclaw dashboard` 是推荐入口
- token 引导和远程 hint 都围绕它
- 它属于 admin surface

这会让 Dashboard 更像：

- 控制面起点

而不是普通网页。

## 2. WebChat 被放回“真实聊天会话面”

WebChat 文档现在写得更清楚了：

- history 总是从 Gateway 拉
- unreachable 时会退成只读
- abort partial 会保留可见片段

这说明它在官方定位里，更像：

- 与真实会话边界贴得更近的聊天层

而不是 Dashboard 的简化版。

## 3. Gateway Protocol 把底层统一成单一控制面

协议文档里最关键的一句，是：

- single control plane + node transport

这让前面的 UI 入口都更容易被理解成：

- 同一条 Gateway WS 协议上的不同表面

也就是说，前台看起来是多个入口，底层其实越来越在收口。

## 4. Tools catalog 也说明 UI 正在贴近运行时

WebChat 文档最近还补了一条很值的细节：

- Control UI `/agents` Tools 面板会拉 `tools.catalog`

这说明官方不只是把 UI 当展示层，而是在让前台更直接反映：

- 当前运行时目录
- 当前工具来源
- 当前策略限制

## 对中文团队最有价值的提醒

如果你现在已经在同时用：

- Dashboard
- WebChat
- API
- node / operator 连接

那更值得补的认知不是再记更多入口名字，而是先把它们看成：

- 一套分层的 operator surface

## 推荐延伸阅读

- [Gateway WebSocket 的 role 和 scope 应该怎么理解](/docs/reference/gateway-ws-roles-and-scopes)
- [Control UI 的 Tools 面板为什么更像运行时目录，不是静态配置页](/docs/manual/control-ui-tools-catalog-and-policy-precedence)
- [operator 入口更稳的升级梯子：先看 UI，再下沉协议和 API](/best-practices/operator-surface-escalation-ladder)
