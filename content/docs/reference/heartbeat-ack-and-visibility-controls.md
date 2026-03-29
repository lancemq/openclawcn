---
title: HEARTBEAT_OK、可见性控制和 quiet-hours 应该怎么一起看
description: 基于最新官方 Heartbeat 与 Automation Troubleshooting 文档，解释 HEARTBEAT_OK 的 ack 语义、alerts-disabled 和 dm-blocked 等可见性控制，以及 quiet-hours 为什么不是故障。
category: 参考
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/gateway/heartbeat
sourceName: OpenClaw Docs
sourceType: official
tags: [heartbeat, visibility, activeHours, alerts, reference]
---

# HEARTBEAT_OK、可见性控制和 quiet-hours 应该怎么一起看

OpenClaw 官方最近把 Heartbeat 文档和自动化排障页写细之后，一个特别容易混淆的问题变清楚了：

- heartbeat 没发消息

这并不总是故障，也不总意味着没跑。

因为 heartbeat 现在至少有三层需要分开看：

- 这次 run 有没有执行
- 执行后是否被当作 ack 丢弃
- 即使有内容，当前可见性策略是否允许外发

## `HEARTBEAT_OK` 是正式 ack，不是普通字符串

官方 Heartbeat 文档现在明确规定：

- 如果没什么需要提醒，回复 `HEARTBEAT_OK`
- 当它出现在开头或结尾时，会被当成 ack
- 如果剩余内容长度不超过 `ackMaxChars`，整条回复会被丢弃

这说明 heartbeat 的默认设计就是：

- 没事时尽量安静

所以“没有收到消息”本身不等于“这轮没跑”。

## `HEARTBEAT_OK` 放中间不会被特殊处理

官方还专门补了一条边界：

- 如果 `HEARTBEAT_OK` 出现在消息中间
- 就不会被当作特殊 token

这意味着它不是任意位置都生效的魔法词，而是一种明确的 ack contract。

## `ackMaxChars` 在控制什么

默认情况下，官方给出的 `ackMaxChars` 是 `300`。

它的意义不是“消息最大长度”，而是：

- 如果 ack 之外只剩一点很短的尾巴
- 系统会认为这仍然属于“无需提醒”

所以一条表面上“有一点输出”的 heartbeat，仍然可能被静默吞掉。

## 可见性控制是另一层，不是执行层

官方 Heartbeat 文档把 `target`、`directPolicy` 和相关 channel 可见性配置分得很清楚。

最关键的是：

- heartbeat 可以运行
- 但外发仍然可能被 visibility policy 抑制

官方自动化排障页里就给出了一个典型信号：

- `alerts-disabled`

这通常表示：

- 不是 heartbeat 本身坏了
- 而是当前配置不允许把这轮结果向外送

## `quiet-hours` 也不是故障

自动化排障页还把另一类非常常见的跳过原因写明了：

- `reason=quiet-hours`

这通常表示：

- 当前已经落在 `activeHours` 之外
- 这轮会被跳过
- 等下一个进入时间窗的 tick 再恢复

如果你本来就配置了营业时间型 heartbeat，这其实是“按设计工作”。

## `requests-in-flight` 更像主 lane 忙

官方还列出一个很值钱的信号：

- `requests-in-flight`

它更接近：

- 主会话当前忙
- heartbeat 被延后

这类情况更像 lane 协调问题，不该一上来就改 heartbeat 文件。

## `empty-heartbeat-file` 也说明它在按 contract 行动

排障页里还有另一条容易被误判的原因：

- `empty-heartbeat-file`

意思是：

- `HEARTBEAT.md` 没有可执行内容
- 当前也没有 tagged cron event 在排队

因此 interval heartbeat 被跳过。

这不是模型失灵，而是你把它配置成了“没有需要做的事”。

## 更稳的判断顺序

看到“没发消息”时，更适合按这个顺序排：

1. `openclaw system heartbeat last`
2. 看 last result 是 `ran`、`quiet-hours`、`requests-in-flight` 还是 `empty-heartbeat-file`
3. `openclaw config get agents.defaults.heartbeat`
4. 看 `target`、`directPolicy`、`activeHours`
5. 再结合 `openclaw logs --follow`

这样能把“没跑”“跑了但被 ack 丢掉”“跑了但被 visibility suppress”分开。

## 下一步推荐

- [定时任务与心跳怎么选](/docs/operations/cron-vs-heartbeat)
- [自动化故障排查](/docs/reference/troubleshooting)
- [用 Heartbeat 和 Cron 做低噪音自动化](/best-practices/heartbeat-cron-composition)
