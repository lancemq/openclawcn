---
title: openclaw sessions 的 store scope 和巡检方式
description: 基于最新官方 sessions CLI 文档，解释 openclaw sessions 在默认 agent、单 agent、all-agents 和显式 store 路径下分别在看什么，以及长期运维里为什么值得把它当作 session store 巡检入口。
category: 参考
updatedAt: 2026-04-01
source: https://docs.openclaw.ai/cli/sessions
sourceName: OpenClaw Docs
sourceType: official
tags: [sessions, cli, store, audit, operations]
---

# openclaw sessions 的 store scope 和巡检方式

官方最近把 `openclaw sessions` 这组 CLI 文档写得更完整之后，一个很适合中文站补进去的点是：

- session 现在不只是 UI 才看得到
- CLI 已经能比较清晰地把 store scope 暴露出来

这让它很适合被当成：

- session store 巡检入口

而不是只是一条“列一下会话”的辅助命令。

## 默认 scope 在看什么

根据当前官方文档，直接运行：

```bash
openclaw sessions
```

看的仍然是：

- 当前配置里的默认 agent store

这点很重要，因为很多人会误以为它天然在扫全局。

## `--agent`、`--all-agents` 和 `--store` 的差别

官方当前把 scope 讲得很清楚：

### `--agent <id>`

看某一个配置 agent 的 store。

### `--all-agents`

聚合所有已配置 agent store。

### `--store <path>`

直接看一个显式 sessions.json 路径。

而且：

- `--store` 不能和 `--agent` / `--all-agents` 混用

这说明这条 CLI 的设计心智已经很明确：

- 先选你要看的 store scope
- 再谈输出

## `--active` 为什么很适合值班巡检

当前官方文档里这一项很值：

```bash
openclaw sessions --active 120
```

它更适合回答：

- 最近一段时间里哪些 session 真正在活跃

这对长期运行环境特别有用，因为很多排障都不是“有没有会话”，而是：

- 哪些会话最近还在动

## `--json` 为什么值得常用

如果你只是随手看一眼，纯文本够用；  
但如果你要做巡检、脚本化或多 agent 汇总，`--json` 更稳。

官方当前示例已经明确会返回：

- store 路径
- agentId
- key
- model

这让它很适合做：

- 会话盘点
- 多 agent 对照
- store 归属确认

## 为什么这条 CLI 和 source of truth 观念是连着的

官方最近在 Session 文档里一直强调：

- Gateway owns session state

`openclaw sessions` 之所以值，就在于它给了你一个更直接的途径去看：

- Gateway 当前到底认哪些会话存在

而不是只看某个 UI 的投影视图。

## 中文环境里最容易踩的坑

### 1. 以为 `openclaw sessions` 默认就是全量

默认只看默认 agent。

### 2. 多 agent 环境还只盯一个 store

这会让很多“为什么另一个入口看不到会话”很难解释。

### 3. 只在 UI 里盘会话，不回到 CLI 看 scope

长期排障时，CLI 会更直。

## 一条更稳的巡检顺序

建议按这个顺序走：

1. 先确认是默认 agent、单 agent 还是 all-agents
2. 再用 `--active` 看最近活动
3. 必要时用 `--json` 留下结构化结果
4. 遇到疑难再回到显式 `--store` 路径

## 下一步推荐

- [Gateway 为什么是 session source of truth](/docs/reference/gateway-session-source-of-truth)
- [session JSONL、compaction entry 和 branch summary 应该怎么理解](/docs/reference/session-jsonl-and-compaction-entries)
- [sessions cleanup 与 maintenance](/docs/operations/sessions-cleanup-and-maintenance)
