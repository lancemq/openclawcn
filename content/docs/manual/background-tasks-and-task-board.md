---
title: Background Tasks、/tasks 与 task flow 应该怎么用
description: 基于最新官方 Background Tasks 与 openclaw tasks 文档，整理 OpenClaw 的后台任务记录、/tasks 面板、通知策略和长期维护方式。
category: 功能
updatedAt: 2026-04-30
source: https://docs.openclaw.ai/automation/tasks
sourceName: OpenClaw Docs
sourceType: official
tags: [tasks, automation, cron, subagent, cli, operations]
---

# Background Tasks、/tasks 与 task flow 应该怎么用

最近官方把 Background Tasks 和 `openclaw tasks` 这组文档补得很完整，这意味着 OpenClaw 正在把“后台干了什么”正式做成可观察的系统层，而不是只靠聊天回复猜状态。

最重要的心智先记住一句：

- tasks 负责记录后台工作发生了什么，不负责决定什么时候运行

也就是说，cron、heartbeat、ACP 或 subagent 决定“何时做事”，tasks 负责把这件事登记成可追踪记录。

## 哪些动作会创建 task

当前官方文档列得很清楚，会创建 task record 的主要来源有：

- ACP 背景运行
- subagent spawn
- 所有 cron 执行
- 通过 gateway 运行的 CLI agent 命令

相反，普通聊天会话和 heartbeat turn 本身不会创建 task。

这很关键，因为很多人看到 `/tasks` 之后容易误以为：

- 所有聊天回复都应该出现在任务板里

实际上不是。task 更像 detached work ledger。

## task 的生命周期怎么理解

官方把状态机写得很明确：

- `queued`
- `running`
- `succeeded`
- `failed`
- `timed_out`
- `cancelled`
- `lost`

更值得记住的是：

- terminal state 不只包含成功和失败，也包含“超时”“取消”和“丢失”

这让 `/tasks` 和 CLI 审计更适合值班，而不只是看一个“有没有跑完”。

## `/tasks` 聊天任务板真正解决什么

现在 OpenClaw 在会话里支持 `/tasks`。它不是全局控制台，而是：

- 当前会话关联后台工作的局部看板

官方当前行为是：

- 如果当前 session 有可见 linked tasks，就展示这些任务
- 如果当前 session 没有可见 linked tasks，就退回 agent-local task counts

这让它更适合日常使用，因为你不用一上来就切 CLI，也不会把别的会话任务泄露进当前上下文。

## 什么时候该用 `/tasks`，什么时候该用 CLI

更稳的分工通常是：

- `/tasks`：会话内快速看本次后台工作有没有排队、运行或失败
- `openclaw tasks list`：值班、巡检、全局看任务账本
- `openclaw tasks audit`：找脏记录、stale 任务和 delivery 异常
- `openclaw tasks maintenance --apply`：做清理和修复

如果你只是想知道：

- 刚刚那个 subagent 跑到哪了

那 `/tasks` 更直接。  
如果你想知道：

- 全站 cron / ACP / 子代理现在整体压力怎么样

就该回 CLI。

## 通知策略是这套系统的关键

官方给 task 定义了三种 notify policy：

- `done_only`
- `state_changes`
- `silent`

当前默认值非常有讲究：

- ACP / subagent 默认 `done_only`
- cron 和 CLI 背景任务更偏向 `silent`

这意味着官方已经在主动帮你控制噪音，不希望长期系统因为后台记录过多而把聊天面刷爆。

## 为什么 cron 默认更安静

这一点很值得照抄到中文团队实践里。

因为 cron 任务本质上可能是：

- 定时巡检
- 自动同步
- 周期整理
- 长期维持动作

如果每次都往聊天面显式播报，很快就会让 operator 忽略真正重要的告警。所以：

- 记录 task
- 不默认大声通知

这是更成熟的默认策略。

## `openclaw tasks` 最值得先会的几条命令

```bash
openclaw tasks list
openclaw tasks list --runtime acp
openclaw tasks list --status running

openclaw tasks show <lookup>
openclaw tasks notify <lookup> state_changes
openclaw tasks cancel <lookup>

openclaw tasks audit
openclaw tasks maintenance
openclaw tasks maintenance --apply
```

如果你是长期运行用户，最先该养成习惯的不是 `cancel`，而是：

- `list`
- `show`
- `audit`

先把观察和诊断习惯建立起来，再去做操作面治理。

## task flow 和单个 task 的边界

官方现在把 Task Flow 也单独拎出来了，这说明：

- task 是一条后台工作记录
- task flow 是更高一层的编排与协调状态

一个 flow 可能跨多个 task。  
因此：

- 看单次执行细节，用 `tasks show`
- 看整体编排状态，用 `tasks flow list/show`

不要把两者混成一个概念。

## 哪些迹象说明你该开始用 tasks audit

出现下面几类情况时，不要只盯着聊天记录：

- cron 看起来触发过，但结果没送回
- subagent 好像结束了，但主会话没被唤醒
- 某些后台工作反复超时或卡在 running
- 运维现场开始说“系统有时会自己恢复，但我们不知道中间发生了什么”

这时 task ledger 的价值会非常高。

## 中文团队更适合怎么落地

对中文团队来说，最稳的上手顺序通常是：

1. 先跑通一个最简单的 detached work 场景
2. 在聊天里用 `/tasks` 看会话关联任务
3. 再在 CLI 里做全局 `list` 和 `audit`
4. 最后才把 `maintenance --apply` 纳入正式维护动作

这样可以先建立观察面，再建立清理面。

## 最容易踩的坑

### 1. 把 task 当成 scheduler

它不是 cron 的替代物。

### 2. 看到 silent 就以为没记录

silent 只是不通知，不代表没写账本。

### 3. 把 `/tasks` 当成全局后台总览

它优先是当前会话相关视图，不是全局 SOC 面板。

## 下一步推荐

- [用 Heartbeat 和 Cron 做低噪音自动化](/best-practices/heartbeat-cron-composition)
- [cron、retention 与 run log 清理](/docs/operations/cron-retention-and-run-log-pruning)
- [OpenClaw 的 sessions CLI 正在从会话列表命令长成 store 巡检入口](/news/openclaw-sessions-cli-watch-2026-04-01)

