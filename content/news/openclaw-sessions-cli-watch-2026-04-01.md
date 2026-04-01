---
title: "OpenClaw 的 sessions CLI 正在从会话列表命令长成 store 巡检入口"
description: "官方最近把 sessions CLI 的 scope、all-agents、active 和显式 store 路径写得更完整了，也让它更适合作为长期运维里的 session store 巡检面。"
category: "生态观察"
date: "2026-04-01"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/cli/sessions"
updatedAt: "2026-04-01"
sourceType: "official"
tags: ["sessions", "cli", "store", "audit", "operations"]
---

OpenClaw 最近把 `openclaw sessions` 这组文档补得更完整之后，一个很清楚的变化是：它已经不再只是“列一下当前会话”的辅助命令，而更像 session store 的巡检入口。

当前官方文档已经把几层 scope 写得更明确：

- 默认 agent
- `--agent`
- `--all-agents`
- `--store <path>`

这让它在长期运维里的位置变得更清楚了。

## 1. session 列表开始更像 store scope 视图

随着 scope 区分被写细，`openclaw sessions` 不再只是在“看有哪些会话”，而是在回答：

- 你现在到底在看哪个 store

这对多 agent 环境特别重要。

## 2. `--active` 让这条 CLI 更适合值班

官方把 `--active <minutes>` 写进去之后，这条命令更像：

- 最近活跃会话盘点

而不是静态列表。

这会让 session 巡检和排障更像正式运维动作。

## 3. 它也在强化 Gateway source-of-truth 心智

`sessions CLI` 越写越清楚，也在反过来强化一件事：

- 真实会话状态应该围绕 Gateway store 看

而不是只看某个 UI 当前投影。

## 推荐延伸阅读

- [openclaw sessions 的 store scope 和巡检方式](/docs/reference/sessions-cli-store-scope-and-audit)
- [Gateway 为什么是 session source of truth](/docs/reference/gateway-session-source-of-truth)
- [sessions cleanup 与 maintenance](/docs/operations/sessions-cleanup-and-maintenance)
