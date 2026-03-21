---
title: Gateway 命令与 RPC 该怎么用
description: 基于最新官方 CLI Reference 与 Gateway protocol 文档，整理 openclaw gateway 子命令、RPC 调用边界、显式凭据要求，以及为什么它更适合被当成控制面入口而不是随手脚本助手。
category: 参考
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/cli
sourceName: OpenClaw Docs
sourceType: official
tags: [gateway, rpc, cli, websocket, control-plane]
---

# Gateway 命令与 RPC 该怎么用

官方最近的 CLI reference 和 Gateway protocol 文档一起看，会有一个很明确的感受：

- `openclaw gateway` 这组命令已经不是“顺手给你几个 service 命令”
- 它实际上是控制面入口

对中文站来说，这很值得单独说明，因为很多人会把它误解成：

- 和普通业务命令一样随便调

## `gateway` 这组命令到底分了哪几类

根据当前官方 CLI 文档，`openclaw gateway` 下面至少有几类东西：

- `gateway status`
- `gateway health`
- `gateway probe`
- `gateway discover`
- `gateway install|start|stop|restart`
- `gateway call`

更容易理解的分类是：

- 服务管理
- 连通性探测
- RPC 调用

## 为什么 `gateway call` 最值得谨慎

官方文档当前对这条线写得很明确：

- 只要你显式传了 `--url`
- CLI 就不会再帮你自动补 config 或环境里的凭据
- 这时你必须显式给 `--token` 或 `--password`

这条规则非常重要，因为它避免了一个很危险的误判：

- “我连上了某个远程地址，CLI 应该知道怎么认证”

官方现在明确告诉你：不会自动帮你猜。

## 这意味着什么

如果你在做 RPC 或远程 Gateway 管理，更适合的心智应该是：

- 只要走远程，就显式写清 URL 和认证

这样虽然麻烦一点，但排错时会清楚很多。

## Gateway WS protocol 为什么值得一起看

官方最近的 protocol 文档已经把底层模型讲得很清楚：

- 传输层是 WebSocket + JSON
- 第一帧必须先 `connect`
- 之后才是 request / response / event

而且三类 frame 已经很固定：

- `req`
- `res`
- `event`

这说明 Gateway 不只是“一个后端进程”，而是一条明确的控制协议。

## `gateway` 命令为什么更像控制面，而不是普通业务命令

因为它碰到的通常是这些能力：

- `config.apply`
- `config.patch`
- `update.run`
- 探针和服务状态

这些都不是“普通聊天指令”，而是：

- 能影响整套实例运行形态的动作

所以更适合把它理解成：

- 管理员和运维入口

## `gateway status` 和普通 `status` 有什么不同

官方文档现在把这层差别也写得更清楚了。

- `openclaw status` 更偏实例总览
- `openclaw gateway status` 更偏 Gateway RPC 侧探测

而且 `gateway status` 还会尝试告诉你：

- CLI 当前使用哪份 config
- service 可能在用哪份 config
- 实际 probe 的目标 URL 是什么

这在 service 配置漂移时特别有价值。

## 什么场景下更适合用 `gateway call`

更适合它的通常包括：

- 你在做脚本化运维
- 你已经明确知道要调用哪个 RPC 方法
- 你需要精确控制 config patch / apply

如果你只是想大概看看系统活不活，先用 `status` / `health` 往往更稳。

## 中文站建议怎么用这组命令

更稳的顺序通常是：

1. 先用普通 `status / health / logs`
2. 需要更底层时再进 `gateway status`
3. 只有确实要做控制面动作时才用 `gateway call`

这样会比一上来就直接打 RPC 安全很多。

## 下一步推荐

- [status、health 和 logs 该怎么分工](/docs/reference/status-health-and-logs)
- [API 与参考资料阅读入口](/docs/reference/api-reference-overview)
- [CLI 命令参考](/docs/reference/cli-reference)

把这几页串起来看，CLI 参考就会从“命令列表”变成“控制面工具箱”。
