---
title: "OpenClaw 正在把 /tasks 做成后台工作总账本，而不是聊天里的附属提示"
description: "官方近期补全的 Background Tasks 与 tasks CLI 文档，说明 OpenClaw 的后台任务体系已经从隐式执行，转向更正式的 ledger、审计和清理模型。"
category: "生态观察"
date: "2026-04-30"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/automation/tasks"
updatedAt: "2026-04-30"
sourceType: "official"
tags: ["tasks", "automation", "cron", "subagent", "audit", "operations"]
---

OpenClaw 最近把 Background Tasks 这一块补成了一套完整文档，这说明官方已经不满足于“后台工作能跑”，而是在把：

- 后台工作记录
- 任务可视化
- 状态审计
- 维护清理

一起做成正式能力。

## 1. `/tasks` 已经不只是聊天小命令

当前官方描述里，`/tasks` 是当前 session 关联后台任务的任务板。  
它会展示：

- runtime
- status
- timing
- progress
- error detail

这让它越来越像会话内的工作观察面，而不是一个可有可无的聊天辅助命令。

## 2. 官方现在把 tasks 和 cron / heartbeat 的边界写得很清楚

这是这次最值得注意的变化之一：

- tasks 负责记账
- cron / heartbeat 负责触发

这种边界一旦写清，长期运行时很多“到底是调度没跑、还是结果没送达”的问题就更容易拆开看。

## 3. `openclaw tasks audit` 表明它已经在走正式运维面

一旦一个系统开始提供：

- `audit`
- `maintenance`
- `maintenance --apply`

这通常意味着它不再是“实验功能”，而是已经在考虑脏状态、丢失记录和 cleanup 问题了。

这对长期运行团队尤其重要。

## 推荐延伸阅读

- [Background Tasks、/tasks 与 task flow 应该怎么用](/docs/manual/background-tasks-and-task-board)
- [用 Heartbeat 和 Cron 做低噪音自动化](/best-practices/heartbeat-cron-composition)

