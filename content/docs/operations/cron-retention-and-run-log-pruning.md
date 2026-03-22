---
title: Cron 的 retention 和 run log pruning 怎么工作
description: 基于最新官方 Cron Jobs 与配置文档，解释 isolated cron run 的 sessionRetention、runLog 裁剪、transcript archive 和高频调度下的磁盘足迹，避免把 cron 当成无限保留的后台队列。
category: 运维
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/cron
sourceName: OpenClaw Docs
sourceType: official
tags: [cron, retention, pruning, runlog, operations]
---

# Cron 的 retention 和 run log pruning 怎么工作

站里已经有一页在讲 `Cron vs Heartbeat`，但官方最近的 Cron Jobs 文档把另一层更值的东西也讲清楚了：

- cron 不只是“会定时跑”
- 它还有自己的 maintenance 路径

如果你准备长期跑定时任务，这层不理解清楚，磁盘和会话状态迟早会慢慢膨胀。

## 先记住官方给的两条 maintenance 路径

Cron Jobs 文档当前明确写到，cron 有两条内建维护线：

- isolated run-session retention
- run-log pruning

也就是说，cron 运行后的清理并不是“靠你自己手工管”，而是产品本身有明确的后台收口机制。

## 哪类 cron 会产生独立 run session

重点在：

- `sessionTarget: "isolated"`

这类任务不会借用主会话，而是为每次运行创建独立 run session，例如：

```text
...:cron:<jobId>:run:<uuid>
```

这也是为什么它特别需要 retention。

## `cron.sessionRetention` 在管什么

官方当前默认值是：

- `24h`

它控制的是：

- completed isolated run sessions 从 session store 里被清理掉的时间

更准确地说，它不是“删掉整个 cron job”，而是：

- 清理完成后的 isolated run 会话记录

如果你把它关掉，长期高频 isolated cron 会越来越容易堆出大量 run session。

## 清理 run session 时 transcript 会怎样

这是官方文档里很值得单独提醒的一点。

当 expired run session 被清理后：

- 如果 transcript 已经不再被 session store 引用
- OpenClaw 会把 transcript 文件归档
- 然后再按同样 retention 清理旧 deleted archives

这意味着它不是粗暴直接抹掉，而更像：

- 先脱离活动状态
- 再进入归档 / 清理节奏

## `cron.runLog.*` 又在管什么

这是另一条不同的维护线。

官方当前默认值是：

- `cron.runLog.maxBytes = 2_000_000`
- `cron.runLog.keepLines = 2000`

它控制的是：

- `~/.openclaw/cron/runs/<jobId>.jsonl`

这类 run log 文件的大小和保留行数。

所以：

- `sessionRetention` 管 run session
- `runLog.*` 管 job 的 JSONL 运行日志

这两者不要混成同一个“保留策略”。

## run log pruning 是什么时候发生的

官方文档当前说明：

- 每次 run append 之后都会检查文件大小
- 超过 `maxBytes` 就裁到最新的 `keepLines`

这意味着 run log pruning 是：

- 持续发生的增量维护

而不是等你手工触发一次大清理。

## 为什么高频 scheduler 特别要看这条线

官方专门补了一段 performance caveat：

- 高频 cron 会带来大量 run-session 和 run-log 足迹

这对中文用户特别值，因为很多人一开始只想着：

- “能不能每 1 分钟跑一次”

但长期更该问的是：

- “每分钟跑一次，session 和 log 会长成什么样”

## one-shot job 的生命周期也值得记

CLI cron 文档还明确写到：

- one-shot (`--at`) 成功后默认会自动删除
- 可以用 `--keep-after-run` 保留

这意味着 one-shot 本身就已经有一层生命周期管理，不会默认永远堆在 jobs 列表里。

## recurring jobs 出错时不会无止境硬撞

官方 CLI cron 文档还补了一条最近很值的行为：

- recurring jobs 在连续报错后会走指数退避
- `30s -> 1m -> 5m -> 15m -> 60m`
- 下次成功后再回到正常 schedule

这说明 cron 的后台维护不只是清理磁盘，还包括：

- 对失败节奏做自我缓冲

## 中文用户最容易踩的坑

### 1. 以为 isolated cron 只是“更干净”

它确实更隔离，但也会生成更多独立 run session 和 transcript 足迹。

### 2. 只看 job 有没有成功，不看 run logs 和 retention

长期运行时，维护成本通常先体现在磁盘和会话数量上。

### 3. 把 `sessionRetention` 和 `runLog.*` 当成同一件事

它们管的是两类不同对象。

## 一条更稳的配置思路

建议按这个顺序看：

1. 先决定哪些任务真要 `isolated`
2. 对高频任务控制好 `sessionRetention`
3. 再根据作业量调整 `runLog.maxBytes` 和 `keepLines`
4. 周期性看一次 `~/.openclaw/cron/` 和 session 足迹

## 下一步推荐

- [Cron 和 Heartbeat 应该怎么分工](/docs/operations/cron-vs-heartbeat)
- [用 Heartbeat 和 Cron 做低噪音自动化](/best-practices/heartbeat-cron-composition)
- [长期使用时 session reset 策略怎么定](/best-practices/session-reset-policy)
