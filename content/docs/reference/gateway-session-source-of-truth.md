---
title: Gateway 为什么是 session source of truth
description: 基于最新官方 Session 文档，解释 OpenClaw 的 session store、JSONL transcript、token 计数和 UI 查询为什么都应围绕 Gateway 理解，避免把本地浏览器、WebChat 或 operator 设备误当成真实状态源。
category: 参考
updatedAt: 2026-03-26
source: https://docs.openclaw.ai/session
sourceName: OpenClaw Docs
sourceType: official
tags: [session, gateway, webchat, dashboard, reference]
---

# Gateway 为什么是 session source of truth

官方最近的 Session 文档把一个很关键、但在中文环境里经常被低估的点写得非常明确：

- Gateway is the source of truth

这句话看起来像一句架构概述，但它实际会直接影响：

- 你怎么理解 WebChat
- 你怎么理解 Dashboard
- 你怎么排查 session 不一致

## 先记住“状态在哪”

根据当前官方文档，session 的事实层在 Gateway 主机上。

它至少包括两层：

- `sessions.json` 这类 store 映射
- 对应 session 的 JSONL transcript

也就是说：

- UI 客户端不是自己维护真相
- 它们应该向 Gateway 取 session 列表、token 计数和当前状态

## `sessions.json` 在回答什么

当前官方文档把 store 结构写得很清楚：

- 它本质上是 `sessionKey -> sessionId` 的映射，加上更新时间和展示字段

更适合把它理解成：

- 会话索引层

它告诉你：

- 某个 session key 当前对应哪个会话实体
- UI 该去展示哪个 sessionId

## JSONL transcript 在回答什么

而 transcript 更接近：

- 事件与消息事实层

它承载的是：

- 具体 turn
- 部分输出
- 中断事实
- 真实对话记录

所以 store 和 transcript 不是重复数据，而是两层不同职责。

## 为什么 UI 不该自己“修正” token 计数

官方现在明确强调：

- token counts 应该来自 Gateway store 字段
- UI 不应自己去解析 JSONL 再“修正” totals

这条边界很重要，因为它意味着：

- 浏览器看到的 token 数不应依赖本地补算
- 不同 UI 之间应该围绕同一份 Gateway 状态对齐

## 远程模式里最容易错在哪

在 remote mode 下，最容易发生的误判是：

- 还在下意识看本机某些旧状态
- 但真正的 session store 其实在远程 Gateway 主机

官方文档现在把这点写得很直接：

- 你关心的 session store lives on the remote gateway host

所以只要系统已经远程化，就不该再把 operator 设备本地视图当事实源。

## WebChat 和 Dashboard 应该怎么放在这条链里

更稳的理解方式是：

- Gateway 持有会话和计数事实
- WebChat 和 Dashboard 是围绕 Gateway 状态工作的 UI

这也解释了为什么：

- Gateway 不可达时，UI 会降级
- bounded history 不等于原始 transcript 全量镜像
- 不同 operator 应看到同一份会话现实，而不是各自“修过”的版本

## 中文环境里最容易踩的坑

### 1. 把浏览器看到的历史当成完整事实

UI 视图只是事实层的投影。

### 2. 远程 Gateway 还在本机排 session 文件

如果 Gateway 不在本机，这往往就是看错地方了。

### 3. 用 UI 展示结果去反推底层 token 计数

当前官方更明确推荐直接信任 Gateway store 字段。

## 一条更稳的排查顺序

建议按这个顺序走：

1. 先确认当前 Gateway 在哪台主机
2. 再确认 session store 和 transcript 实际落点
3. 然后再看 UI 展示是不是只是投影视图边界

## 下一步推荐

- [WebChat 的 history、inject 和展示边界](/docs/reference/webchat-history-and-inject-boundaries)
- [HTTP API、Gateway WebSocket 和 SDK 应该怎么分工](/docs/reference/http-api-vs-gateway-websocket-vs-sdk)
- [Remote Operators 与多设备协作](/docs/operations/remote-operators-and-nodes)
