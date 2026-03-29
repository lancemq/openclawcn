---
title: Control UI 的 Tools 面板为什么更像运行时目录，不是静态配置页
description: 基于最新官方 WebChat 文档，解释 Control UI `/agents` 里的 Tools 面板如何通过 tools.catalog 拉取运行时目录、何时回退到静态列表，以及为什么真正的可用性最终仍由 allow/deny 和多层策略优先级决定。
category: 使用说明
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/web/webchat
sourceName: OpenClaw Docs
sourceType: official
tags: [control-ui, tools, catalog, policy, manual]
---

# Control UI 的 Tools 面板为什么更像运行时目录，不是静态配置页

OpenClaw 最近的 `WebChat` 文档里有一段很容易被忽略，但其实很关键的信息：

- Control UI `/agents` 的 Tools 面板会拉 `tools.catalog`

这意味着它展示的不是一份死的前端列表，而更像：

- 当前运行时工具目录

## 面板现在是怎么拿数据的

根据最新官方说明，Tools 面板会优先：

- 调 `tools.catalog`

然后把每个工具标成：

- `core`
- `plugin:<id>`
- 可选时再带 `optional`

这会让面板更像：

- 当前 Gateway 真正知道哪些工具存在

而不是：

- 配置文件里理论上写了什么

## 为什么 fallback 到静态列表也值得注意

官方同时也写了一个边界：

- 如果 `tools.catalog` 不可用，面板会回退到内建静态列表

这说明前端展示并不总能代表运行时真相。  
更准确的理解是：

- UI 会尽量贴近运行时
- 但必要时仍保留降级展示

## 面板能编辑，不等于运行时就一定能用

这是这页里最重要的一句。

官方现在明确提醒：

- 面板可以编辑 profile 和 override config
- 但真正有效的运行时访问仍然遵循 policy precedence

也就是：

- `allow` / `deny`
- per-agent overrides
- provider / channel overrides

这些规则最终一起决定：

- 工具能不能真被调用

## 为什么这和“看见工具”不是一回事

团队里最常见的误会通常是：

- 面板里看见了工具
- 就以为 agent 一定能用

但运行时真正要回答的是两件事：

1. 这个工具是否存在于当前 catalog
2. 当前 agent / provider / channel policy 是否允许它被调用

缺一不可。

## 这对排障有什么帮助

如果你现在遇到的是：

- UI 里有工具，但 agent 调不起来
- 插件已经装了，但工具面板展示不稳定
- 某个 agent 能用，另一个 agent 不能用

那更稳的排查顺序通常是：

1. 先确认 runtime catalog 里有没有它
2. 再看是不是 fallback 到了静态列表
3. 最后查 allow/deny 和 per-agent policy

## 为什么这页对插件生态也很重要

官方现在把 catalog 里的来源标签也带上了：

- `core`
- `plugin:<id>`

这会让团队更容易回答：

- 这是系统内置工具
- 还是某个插件带进来的工具

这对扩展治理特别有价值，因为它能把：

- 工具来源
- 权限策略
- 运行时可用性

放回同一个观察面。

## 推荐延伸阅读

- [Gateway WebSocket 的 role 和 scope 应该怎么理解](/docs/reference/gateway-ws-roles-and-scopes)
- [WebChat 的会话与只读边界](/docs/manual/webchat-session-and-readonly-mode)
- [HTTP API、Gateway WebSocket 和 SDK 应该怎么分工](/docs/reference/http-api-vs-gateway-websocket-vs-sdk)
