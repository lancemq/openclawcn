---
title: 用 quiet hours 和 manual wake 控制自动化节奏
description: 结合最新官方 Heartbeat 与 Automation Troubleshooting 文档，总结如何让 heartbeat 在该安静时安静、在需要时再手动唤醒，避免把自动化做成全天噪音源。
category: 自动化
difficulty: 中级
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/gateway/heartbeat
sourceName: OpenClaw Docs
sourceType: official
tags: [heartbeat, activeHours, automation, operations, best-practices]
---

# 用 quiet hours 和 manual wake 控制自动化节奏

很多团队把 heartbeat 开起来之后，真正的问题往往不是“它不工作”，而是：

- 它工作得太勤
- 或者在不该出声的时候出声

官方最近的 Heartbeat 和自动化排障文档，其实已经给出了一套很成熟的节奏控制方法：

- 平时靠 `activeHours`
- 需要时再用 manual wake

这比一味缩短或拉长 heartbeat 间隔稳得多。

## 第一原则：先接受“不是每一轮都该发消息”

Heartbeat 的默认设计就是低噪音：

- 没事时可以返回 `HEARTBEAT_OK`
- quiet hours 时允许跳过
- visibility policy 还可能继续抑制外发

所以更好的目标不是“每 30 分钟一定提醒一次”，而是：

- 有必要时再让它说话

## 第二原则：activeHours 用来控制自然节奏

如果你的 heartbeat 主要服务于：

- 白天值班
- 工作时段巡检
- 正常办公提醒

那就应该先把 `activeHours` 设清楚，而不是拿一堆条件写进 `HEARTBEAT.md` 里硬判断。

这样做的好处是：

- 规则更直观
- logs 里会直接看到 `reason=quiet-hours`
- 后续调试也更好懂

## 第三原则：不要把 quiet-hours 当成 bug

官方排障页已经把 `quiet-hours` 明确列成常见签名。

这其实是在提醒你：

- 自动化没有坏
- 它只是按时间窗口主动安静

如果你的团队还在“看到 skipped 就紧张”，往往说明大家还没有把节奏控制当成正式配置面来管理。

## 第四原则：manual wake 用来处理“现在就看一次”

heartbeat 设了 quiet hours，不代表晚上或非窗口期永远不能查。

更稳的做法是：

- 正常情况让 heartbeat 在窗口里自然运行
- 临时需要时再做 manual wake

这样既不需要把默认 cadence 调得很激进，也不会为了偶发需求长期制造噪音。

## 第五原则：把 manual wake 当成运维按钮，不是日常主路径

如果你发现自己频繁手动 wake，往往说明有一层设计该调整：

- 可能是 activeHours 设得不对
- 可能是 cadence 太稀
- 也可能是这个任务本来就更适合 cron

manual wake 很好用，但不该长期替代正确的调度设计。

## 一条更稳的落地方式

更适合的默认做法通常是：

1. heartbeat 只负责日间轻量值守
2. `activeHours` 明确覆盖真正需要提醒的时间段
3. 高频准点任务交给 cron
4. 偶发临时检查再用 manual wake

这样自动化会明显更像一个值守助手，而不是全天广播器。

## 什么时候该重构

如果你们已经出现下面这些现象，就说明节奏设计该改了：

- 夜里反复收到无意义 heartbeat
- 白天经常手动 wake 才能补救
- 为了避免噪音把 heartbeat 直接关掉
- 同一个需求在 heartbeat 和 cron 里各做了一份

## 下一步推荐

- [HEARTBEAT_OK、可见性控制和 quiet-hours 应该怎么一起看](/docs/reference/heartbeat-ack-and-visibility-controls)
- [定时任务与心跳怎么选](/docs/operations/cron-vs-heartbeat)
- [用 Heartbeat 和 Cron 做低噪音自动化](/best-practices/heartbeat-cron-composition)
