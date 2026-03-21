---
title: 定时任务与心跳怎么选
description: 根据最新官方自动化文档，解释 Heartbeat、Cron main、Cron isolated 三种机制分别适合什么场景，以及它们在精度、上下文和成本上的差异。
category: 运维
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/automation/cron-vs-heartbeat
sourceName: OpenClaw Docs
sourceType: official
tags: [automation, cron, heartbeat, scheduling, operations]
---

# 定时任务与心跳怎么选

OpenClaw 现在的自动化不再只有“定时跑任务”一种做法。官方已经把自动化拆成三种不同思路：

- Heartbeat：让主会话定期检查环境与待办
- Cron main：把事件塞回主会话，由下一次心跳承接
- Cron isolated：在独立会话里精确执行一条计划任务

如果这三者不分清，很容易出现两种问题：

- 需要精确时间的任务被放进心跳，结果执行时间漂移
- 只需要低频巡检的任务被拆成一堆独立 cron，成本和噪音都变高

## 先用一句话记住差别

- 需要“固定时间点”时，优先选 Cron
- 需要“持续感知上下文”时，优先选 Heartbeat
- 需要“精确 + 隔离”时，选 Cron isolated

官方文档给出的决策表非常实用：

- 每 30 分钟检查邮箱：Heartbeat
- 每天 9 点准时发日报：Cron isolated
- 检查日历未来 2 小时事件：Heartbeat
- 每周深度分析一次项目：Cron isolated
- 20 分钟后提醒我：Cron main 或 `--at`

## Heartbeat 更适合什么

Heartbeat 运行在主会话里，默认周期是 `30m`。它最适合“周期性感知”而不是“精确触发”。

官方强调它的优势主要有四个：

- 能把多个检查项批处理，例如邮箱、日历、通知、后台任务一起看
- 继承主会话上下文，知道你最近在做什么
- 如果没有值得提醒的内容，可以直接静默返回
- 通常比拆成很多独立 cron 更省 token

一个典型的 `HEARTBEAT.md` 可能只需要写：

```md
# Heartbeat checklist

- Check email for urgent messages
- Review calendar for events in next 2 hours
- If a background task finished, summarize results
- If idle for 8+ hours, send a brief check-in
```

这种写法适合“持续值守型自动化”，不适合“必须 9:00 整准点发”这种任务。

## Cron 更适合什么

Cron 是 Gateway 内建调度器，强调的是精确时机和任务隔离。

官方文档里，Cron 更适合这些情况：

- 必须在固定时刻执行
- 任务不需要主会话上下文
- 想用不同模型或不同 thinking 配置
- 想把历史和噪音隔离出主会话
- 想做一次性提醒

最新文档还补充了两个很值得注意的细节：

- 现在支持更明确的 stagger / exact 控制，避免整点任务全部撞在一起
- isolated job 可以直接投递结果，同时把摘要回写到主会话

## `main` 和 `isolated` 的差别

很多人会把“用 cron”理解成一件事，但官方现在区分得很清楚。

### `--session main`

适合：

- 想把提醒作为系统事件放回主会话
- 希望下一次 heartbeat 用完整上下文接手
- 不想额外开出一段独立历史

示例：

```bash
openclaw cron add \
  --name "Check project" \
  --every "4h" \
  --session main \
  --system-event "Time for a project health check" \
  --wake now
```

### `--session isolated`

适合：

- 想完全隔离上下文
- 想切换到更强或更便宜的模型
- 想减少主会话被计划任务刷屏
- 想把重分析任务当成独立作业运行

示例：

```bash
openclaw cron add \
  --name "Deep analysis" \
  --cron "0 6 * * 0" \
  --session isolated \
  --message "Weekly codebase analysis..." \
  --model opus \
  --thinking high \
  --announce
```

## 什么时候不要上来就写 cron

如果你的任务本质上是“周期巡检 + 上下文判断”，Heartbeat 往往更好。

例如：

- 检查是否有重要邮件
- 看未来两小时有没有会议
- 轻量健康检查
- 根据最近对话决定要不要提醒

这些任务如果全部拆成独立 cron，问题通常不是“不能跑”，而是：

- 任务太碎
- 成本更高
- 主线对话被计划任务噪音打断

## 什么时候不要强行塞进 Heartbeat

如果你要求的是下面这些条件，就不该只靠 Heartbeat：

- 必须固定在某个时点执行
- 想用和主会话不同的模型
- 想隔离运行日志和上下文
- 想给特定渠道直接投递输出

Heartbeat 的优势是“有上下文”，它的代价就是不适合承担所有精确调度。

## 配置上最容易忽略的几个点

根据最新官方文档，自动化配置里有几个现在特别值得注意：

- Heartbeat 默认并不是一定会发消息，`target` 的默认值可能是 `none`
- Heartbeat 可以限制在 `activeHours`
- Cron 需要明确 session 模式，否则团队成员会误解它是“主会话任务”还是“独立作业”
- One-shot 提醒推荐直接用 `--at`
- 频繁整点任务现在要注意是否需要 `--exact` 或显式 stagger

## 中文站建议的实操判断法

你可以直接用下面这套判断顺序：

1. 任务是否要求准点执行
2. 任务是否需要主会话上下文
3. 任务是否会高频打扰主会话
4. 是否需要单独模型和思考强度

如果回答大致是：

- “不要求准点，但要结合上下文判断” → Heartbeat
- “要求准点，但仍想回到主会话处理” → Cron main
- “要求准点，还要独立运行和单独投递” → Cron isolated

## 下一步推荐

- [自动化故障排查](/docs/reference/troubleshooting)
- [Hooks 概览](/docs/manual/hooks-overview)
- [自动化工作流设计](/best-practices/automation-workflows)

把这些页面连起来看，会更容易把“什么时候该调度，什么时候该感知”真正区分开。
