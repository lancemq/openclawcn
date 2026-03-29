---
title: cron run 入队语义和 retry backoff 应该怎么理解
description: 基于最新官方 cron CLI 与 Cron Jobs 文档，解释 openclaw cron run 为什么先返回 enqueued、何时该去看 runs，以及 recurring job 连续失败后的退避节奏。
category: 参考
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/cli/cron
sourceName: OpenClaw Docs
sourceType: official
tags: [cron, retry, scheduler, queue, reference]
---

# cron run 入队语义和 retry backoff 应该怎么理解

官方最近把 `openclaw cron` 这组命令补得更接近真正的作业控制面后，有两个细节特别值得单独拎出来：

- `openclaw cron run` 现在先返回“已入队”
- recurring job 连续失败时会走明确的 retry backoff

如果这两条没看清，长期运行里的排障会很容易误判。

## `cron run` 现在不是“同步跑完再回”

官方 CLI 文档当前写得很明确：

- `openclaw cron run` 会在 manual run 被排进执行队列后就返回
- 成功响应会包含 `{ ok: true, enqueued: true, runId }`

这意味着它更像：

- 提交一个执行请求

而不是：

- 在你眼前把整个 job 跑完

## 为什么这条变化很重要

很多人以前习惯把 `cron run` 当成“手工立即执行并拿最终结果”的命令。

但现在更准确的理解是：

1. 你先把 run 请求发给调度器
2. 调度器给你一个 `runId`
3. 真正结果要去 `openclaw cron runs --id <jobId>` 跟

这会让 cron 更像一个正式作业系统，而不是命令行里的同步 helper。

## 什么时候该去看 `runs`

如果你已经拿到了 `enqueued: true`，接下来最值钱的不是重复敲 `cron run`，而是去看：

```bash
openclaw cron runs --id <job-id> --limit 20
```

官方自动化排障页也是把它当成主入口，因为这里才能看到：

- 最终 run status
- `ok` 还是 skip
- `not-due`
- delivery 有没有真的发生

## `not-due` 为什么也常见

官方排障页明确提到一种很常见的签名：

- `reason: not-due`

这通常表示：

- 你手动跑了 `cron run`
- 但没有 `--force`
- 而当前这个 job 还没到应跑时间

这类情况不是 scheduler 坏了，而是你对手工 run 的期待和当前调度条件不一致。

## recurring job 的 retry backoff 现在是固定梯子

CLI 文档和 Cron Jobs 文档都把这条写清楚了：

- recurring jobs 连续失败后
- 会按 `30s → 1m → 5m → 15m → 60m` 退避
- 下次成功后再回到正常 schedule

这意味着“为什么这个 job 没按原时间点继续跑”不一定是配置错了，也可能只是已经进入 retry lane。

## 哪类失败会进入 retry，哪类不会

官方 Cron Jobs 文档当前把错误分成两类：

### transient

例如：

- 429
- timeout
- network error
- 5xx

这类会被视为可重试。

### permanent

例如：

- unauthorized
- invalid API key
- 配置校验错误

这类更像硬错误，不该靠无限重试掩盖。

## one-shot `--at` 还有两个很容易漏的点

官方 CLI 文档还补了两条很实用的规则：

- one-shot job 成功后默认会删掉
- 想保留它，要用 `--keep-after-run`

以及：

- offset-less 的 `--at` 时间默认按 UTC 解释
- 如果你想按某个本地时区墙钟时间解释，得配 `--tz <iana>`

这两条都很容易在“临时提醒为什么消失了”“为什么跑偏几个小时”这种问题里出现。

## 更稳的排障顺序

如果 cron 看起来不对，建议按这个顺序：

1. `openclaw cron status`
2. 看有没有 future `nextWakeAtMs`
3. `openclaw cron list`
4. `openclaw cron runs --id <jobId> --limit 20`
5. 再配合 `openclaw logs --follow`

这个顺序会比只盯着 `cron run` 的返回值更接近真实运行状态。

## 下一步推荐

- [Cron 的 retention 和 run log pruning 怎么工作](/docs/operations/cron-retention-and-run-log-pruning)
- [自动化故障排查](/docs/reference/troubleshooting)
- [用 Heartbeat 和 Cron 做低噪音自动化](/best-practices/heartbeat-cron-composition)
