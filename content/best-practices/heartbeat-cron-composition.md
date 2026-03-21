---
title: 用 Heartbeat 和 Cron 做低噪音自动化
description: 结合最新官方自动化文档，总结如何用 Heartbeat 承担周期感知、用 Cron 承担精确调度，避免把主会话做成噪音中心。
category: 自动化
difficulty: 中级
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/automation/cron-vs-heartbeat
sourceName: OpenClaw Docs
sourceType: official
tags: [automation, heartbeat, cron, scheduling, operations]
---

# 用 Heartbeat 和 Cron 做低噪音自动化

很多 OpenClaw 自动化做着做着会出现一个问题：功能看起来都能跑，但主会话越来越吵，真正重要的提醒反而被淹掉。

最近的官方自动化文档其实已经给出了一个更成熟的做法：不要让一种机制承担所有任务，而是把“持续感知”和“精确调度”拆开。

更稳的组合通常是：

- 用 Heartbeat 做周期性感知
- 用 Cron 做精确时间点任务
- 用 Cron isolated 承担重任务和独立分析

## 先把目标拆成两类

如果你把自动化目标分错，后面就很容易越做越乱。

### 第一类：持续感知

适合交给 Heartbeat：

- 看邮箱有没有紧急内容
- 看日历未来两小时有没有会议
- 看后台任务有没有跑完
- 在白天适当做轻量 check-in

这类任务共同特点是：

- 不要求秒级或分钟级精确时机
- 需要结合上下文判断是否值得提醒
- 很适合批处理

### 第二类：准点执行

适合交给 Cron：

- 每天 9 点发日报
- 每周一固定做一次总结
- 20 分钟后提醒回电
- 凌晨跑一次独立分析或巡检

这类任务共同特点是：

- 时间点本身就是要求的一部分
- 可以不依赖主会话上下文
- 更适合做隔离执行和单独投递

## Heartbeat 最适合扮演什么角色

Heartbeat 不应该被当成“另一个 cron”，它更像“带上下文的定期巡检”。

官方推荐的做法是把多个轻量检查项集中放进 `HEARTBEAT.md`，例如：

```md
# Heartbeat checklist

- Check email for urgent messages
- Review calendar for events in next 2 hours
- Review any pending tasks
- Light check-in if quiet for 8+ hours
```

这样做的好处很明显：

- 一个 turn 处理多个检查项
- 主会话知道你最近在做什么
- 没有需要提醒的内容时可以静默
- 比多个独立轮询任务便宜

## Cron 应该承担什么

Cron 更适合你“明确知道什么时候要发生什么”的任务。

常见的正确用法包括：

- `--at` 做一次性提醒
- `--session main` 把事件注入主会话
- `--session isolated` 做深度分析、独立周报、批处理任务

如果任务本身会产生较长输出、需要高 thinking 或要直接投递到渠道，isolated 通常会比 main 更稳。

## 一个很实用的组合模板

### 1. Heartbeat 负责值守

- 邮箱
- 日历
- 通知
- 轻量健康检查

### 2. Cron 负责准点事项

- 早报、周报、月报
- 到点提醒
- 例行巡检
- 周期性批处理

### 3. 重任务单独隔离

例如：

- 周报分析
- 大量日志整理
- 版本回归检查
- 成本分析

这些任务如果塞进主会话，不仅会打断对话节奏，也会让历史越来越脏。

## 最容易犯的三个错误

### 错误一：把所有周期任务都拆成 cron

结果通常是：

- 任务数量膨胀
- 成本上升
- 主会话被大量系统消息占满

如果这些任务其实都只是“定期看一下再判断”，Heartbeat 更合适。

### 错误二：把准点任务塞进 Heartbeat

这样会导致：

- 执行时间不够准
- 忙的时候被推迟
- 结果和你预期的“9 点整”不一致

### 错误三：不区分 `main` 和 `isolated`

如果你不先决定一个任务是否应该污染主会话，后面就会出现：

- 任务历史难看
- 提醒和正常对话混在一起
- 很难判断哪些信息是长期上下文，哪些只是计划任务产物

## 推荐的低噪音配置思路

一个更稳的默认策略通常是：

- Heartbeat 用较小的 checklist，控制频率和 active hours
- Main session cron 只放少量需要上下文承接的提醒
- Isolated cron 放重分析和精确报表
- 让真正需要外发的任务才投递到渠道

如果能做到这几点，自动化会明显更像“辅助系统”，而不是“不断打断你的机器人”。

## 什么情况下应该重构现有自动化

如果你已经出现下面这些症状，说明该重构了：

- 主会话里充满大量例行任务输出
- 同一类巡检被拆成很多 cron
- 你说不清哪个任务为什么是 main，哪个是 isolated
- 同样的提醒会在不同地方重复出现

这时候不要继续堆新任务，先把 Heartbeat 和 Cron 的职责重新划分。

## 建议的下一步

- 先看 [定时任务与心跳怎么选](/docs/operations/cron-vs-heartbeat)
- 再看 [自动化故障排查](/docs/reference/troubleshooting)
- 如果已经有很多任务，回头审一遍 [自动化工作流设计](/best-practices/automation-workflows)

把“感知”和“调度”分开以后，OpenClaw 的自动化通常会安静很多，也更容易长期维护。
