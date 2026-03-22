---
title: sessions cleanup 和 session maintenance 应该怎么配合
description: 基于最新官方 sessions CLI 文档，解释 openclaw sessions cleanup 的作用范围、dry-run/enforce 语义、active-key 保护，以及它和 cron maintenance 不是同一层清理。
category: 运维
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/cli/sessions
sourceName: OpenClaw Docs
sourceType: official
tags: [sessions, cleanup, maintenance, transcripts, operations]
---

# sessions cleanup 和 session maintenance 应该怎么配合

OpenClaw 现在的长期运行不只是靠 compaction 和 reset。  
官方最近的 `sessions` CLI 文档还把另一条很值的线补清楚了：

- session store / transcript 也有专门的 maintenance 工具

这就是：

- `openclaw sessions cleanup`

## 这条命令到底在清什么

官方当前文档写得很明确：

- `sessions cleanup` 只维护 session stores / transcripts
- 不负责清 cron run logs

这句话非常重要，因为它把两类后台清理彻底分开了：

- session 维护
- cron 维护

如果你把它们混成一层，排障和运维判断都会偏。

## 它依赖哪套配置

官方文档当前说明：

- `openclaw sessions cleanup` 使用的是 `session.maintenance` 配置

也就是说，它不是一个完全脱离配置的临时脚本，而是：

- session 生命周期规则的手动触发入口

## `--dry-run` 和 `--enforce` 应该怎么理解

### `--dry-run`

用于预览会发生什么，不写盘。

官方文档现在还特别提到：

- text mode 下会输出每个 session 的 action table
- 你能看到哪些会被 keep、cap 或 remove

这很适合先做一次安全检查。

### `--enforce`

才是真正把维护动作落到磁盘。

更稳的做法通常是：

1. 先 dry-run
2. 确认结果合理
3. 再 enforce

## `--active-key` 为什么很值

官方现在还给了：

- `--active-key "agent:main:telegram:dm:123"`

这种参数。

它的价值在于：

- 你可以显式告诉 cleanup 当前哪个 session 仍然活跃

这对多入口、远程操作和手工维护特别有用，因为它能减少：

- 误把当前正在用的 session 当成可收掉对象

## 为什么它适合“现在立刻维护一次”

官方文档明确说明：

- 这条命令可以“现在就跑 maintenance”
- 不用等下次正常写入周期

这对于下面几类场景特别实用：

- 你刚改了 maintenance 配置
- 想先看清理效果
- 磁盘足迹已经开始膨胀
- 你刚排完一轮会话异常，想手动收尾

## 它和 cron maintenance 的边界再强调一次

官方刻意在 `sessions cleanup` 文档里重申：

- 它不管 `cron/runs/<jobId>.jsonl`
- cron run logs 还是归 `cron.runLog.*`

这其实是在帮你避免一个非常常见的误区：

- 以为“我做了 sessions cleanup，后台日志就都会被收掉”

实际不是。

## orphan transcripts 为什么值得看

官方 `doctor` 文档最近也补了一条相关能力：

- 可以检测 orphan transcript files
- 并把它们归档成 `.deleted.<timestamp>`

这说明官方现在对 transcript 生命周期的思路越来越明确：

- 不是只有“保留或删除”
- 还包括 orphan 检测和安全归档

`sessions cleanup`、`doctor` 和 cron maintenance 其实是在一起补这条线。

## 中文用户最容易踩的坑

### 1. 只知道聊天界面的 `/new`，不知道底层 session 也要维护

reset 是工作面治理，cleanup 是底层存储治理。

### 2. 以为 cleanup 一次能把 cron 足迹也收干净

cron run logs 还是另一套规则。

### 3. 直接 enforce，不先 dry-run

长期环境里，这很容易让你在没看清影响前就做了清理。

## 一条更稳的使用路径

建议按这个顺序：

1. 先看 `session.maintenance` 规则是否合理
2. 用 `openclaw sessions cleanup --dry-run`
3. 必要时带 `--agent`、`--all-agents` 或 `--active-key` 缩小作用面
4. 最后再 `--enforce`

## 下一步推荐

- [长期使用时 session reset 策略怎么定](/best-practices/session-reset-policy)
- [Cron 的 retention 和 run log pruning 怎么工作](/docs/operations/cron-retention-and-run-log-pruning)
- [Compaction 前的 memory flush 在保护什么](/docs/operations/pre-compaction-memory-flush)
