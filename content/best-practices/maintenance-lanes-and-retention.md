---
title: 后台维护任务应该怎么分 lane 和保留周期
description: 结合最新官方 Cron、sessions cleanup、doctor 和 Session 文档，总结长期运行时怎样给 isolated cron、main session、session cleanup 和 run logs 设不同的维护节奏。
category: 运维治理
difficulty: 高级
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/cron
sourceName: OpenClaw Docs
sourceType: official
tags: [maintenance, cron, sessions, retention, operations]
---

# 后台维护任务应该怎么分 lane 和保留周期

长期运行 OpenClaw 后，最容易失控的往往不是某个单点功能，而是“后台一直在积累的东西”：

- isolated cron run sessions
- transcripts
- session stores
- run logs

官方最近把 cron maintenance、sessions cleanup 和 doctor 这几条线都补得更清楚了，说明这已经不是边角问题，而是正式运维面。

## 第一原则：不同对象要走不同 maintenance lane

更稳的理解方式是把后台维护拆成四类：

1. main session 工作面
2. isolated cron run sessions
3. session store / transcript cleanup
4. cron run logs

这四类对象的生命周期完全不一样，不适合拿同一条 retention 规则去管。

## 第二原则：main session 更偏连续性，isolated cron 更偏可回收

main session 更像：

- 长期对话工作面
- 需要连续性

isolated cron run 更像：

- 独立作业痕迹
- 跑完就应该逐步回收

所以更稳的默认倾向通常是：

- 对 main session 保守清理
- 对 isolated cron 更积极 retention

## 第三原则：run logs 不等于 transcripts

这是很多团队最容易混淆的地方。

更准确的区别是：

- transcript：对话 / run 历史事实
- run log：作业执行日志摘要

因此：

- session cleanup 不等于 run log pruning
- `cron.runLog.*` 也不等于 session retention

## 第四原则：高频 job 先控 log，再考虑扩频

官方 Cron 文档已经明确提醒：

- 高频 scheduler 会快速放大 run-session 和 run-log 足迹

所以更稳的顺序应该是：

1. 先小规模试频率
2. 先看 `cron/runs/*.jsonl` 增长速度
3. 再调整 `runLog.maxBytes` / `keepLines`
4. 最后才决定是否把频率继续拉高

## 第五原则：cleanup 先 dry-run，再 enforce

官方 `sessions cleanup` 文档给了很好的习惯：

- 先 dry-run
- 再 enforce

这件事对长期环境特别值，因为你真正怕的通常不是“清不掉”，而是：

- 清过头
- 清掉你还在用的那一批

## 第六原则：doctor 更适合做状态巡检，不替代 retention 策略

官方 `doctor` 最近也补了：

- orphan transcripts 检测和归档
- legacy cron shape 检查

但它更适合：

- 巡检
- 修复异常

而不是替代你对 retention lane 的日常设计。

## 第七原则：把 one-shot、isolated recurring、main-session recurring 分开想

这三类任务的生命周期很不一样：

### one-shot

更适合：

- 默认跑完删除

### isolated recurring

更适合：

- 积极回收 run sessions
- 控制 run logs 大小

### main-session recurring

更适合：

- 更谨慎地承接长期上下文
- 避免过度把后台任务挤进主工作面

## 第八原则：保留策略应该围绕“排障价值”而不是“全留着”

很多人一开始会直觉觉得：

- 留越久越安全

但真正更成熟的问题是：

- 这些记录在多长时间内还有排障价值

如果某类 run log 48 小时后几乎没人再看，就没必要长期无限堆着。

## 一个更稳的最小方案

如果你现在刚进入长期运行阶段，推荐最小组合是：

1. isolated cron 先保留默认 `24h`
2. run logs 先用官方默认大小和行数
3. 每次大改配置后先跑一次 `sessions cleanup --dry-run`
4. 用 `doctor` 定期检查 orphan / legacy 状态

这比一开始就自己拍脑袋定超长 retention 更稳。

## 中文用户最容易踩的坑

### 1. 把所有后台任务都丢进 isolated cron，却不看 retention

这样最容易默默堆出很多 run 足迹。

### 2. 把 cleanup、doctor、cron maintenance 当成一个工具

它们其实分别负责不同层。

### 3. 只关心任务结果，不关心任务痕迹管理

长期运维里，痕迹管理和任务成功率一样重要。

## 下一步推荐

- [Cron 的 retention 和 run log pruning 怎么工作](/docs/operations/cron-retention-and-run-log-pruning)
- [sessions cleanup 和 session maintenance 应该怎么配合](/docs/operations/sessions-cleanup-and-maintenance)
- [Cron 和 Heartbeat 应该怎么分工](/docs/operations/cron-vs-heartbeat)
