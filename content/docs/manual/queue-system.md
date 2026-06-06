---
title: Queue 系统与消息转向
description: 了解 OpenClaw 的 Queue 系统、消息转向模式和并发控制机制。
category: manual
updatedAt: 2026-06-06
sourceType: official
source: https://docs.openclaw.ai/concepts/queue
tags: [queue, steering, concurrency, messages]
---

# Queue 系统与消息转向

OpenClaw 通过一个进程内队列序列化所有入站自动回复运行，防止多个 Agent 运行冲突，同时在会话间允许安全的并行。

## 为什么需要 Queue

- 自动回复运行成本高（LLM 调用），多条消息同时到达可能冲突
- 串行化避免争夺共享资源（会话文件、日志、CLI stdin）
- 减少上游 API 限流风险

## Queue 模式

`/queue` 控制当会话已有活跃运行时，新消息的行为：

| 模式 | 行为 | 适用场景 |
|------|------|---------|
| `steer`（默认） | 消息注入当前运行 | 日常对话，希望实时响应 |
| `followup` | 不转向，排队等当前运行结束 | 消息需要独立处理 |
| `collect` | 不转向，安静窗口后合并处理 | 快速连续消息 |
| `interrupt` | 中止当前运行，处理最新消息 | 紧急消息需要立即响应 |

### steer 模式细节

运行中收到的消息默认转向到当前运行。转向在**当前 assistant turn 完成工具调用之后、下一次 LLM 调用之前**交付。

Codex app-server 模式下，接收一次批量的 `turn/steer`。如果运行未激活流式或转向不可用，OpenClaw 会等到当前运行结束再处理新消息。

### collect 模式

将排队消息合并为**一次**后续处理。如果消息来自不同的频道/线程，会分别处理以保持路由正确。

## 配置

全局或按频道配置：

```json5
{
  messages: {
    queue: {
      mode: "steer",
      debounceMs: 500,
      cap: 20,
      drop: "summarize",
      byChannel: { discord: "collect" },
    },
  },
}
```

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `debounceMs` | 安静窗口时间 | `500` |
| `cap` | 每会话最大排队数 | `20` |
| `drop` | 队列满时策略 | `"summarize"` |

drop 策略：

- `"summarize"`：丢弃最旧消息，保留紧凑摘要，作为合成 followup 提示
- `"old"`：丢弃最旧消息，不保留摘要
- `"new"`：拒绝最新消息

## 会话级覆盖

发送 `/queue <steer|followup|collect|interrupt>` 作为独立命令来存储当前会话的队列模式。

组合选项：

```
/queue collect debounce:0.5s cap:25 drop:summarize
```

恢复默认：

```
/queue default
/queue reset
```

## 并发控制

- 队列使用 FCFS（先来先服务）模式，可配置并发上限
- `agents.defaults.maxConcurrent` 控制全局并行数（默认 main: 4, subagent: 8）
- 会话级别保证：同一时刻只有一次 Agent 运行操作某个会话
- 不同车道（main / cron / subagent）可并行运行

## 常见问题

### 命令看起来卡住了

启用详细日志，查找 "queued for ...ms" 行确认队列是否正常排出。

### 消息被丢弃

检查队列 cap 配置。如果消息到达速度超过处理速度，超出 cap 的消息会根据 drop 策略被丢弃。

## 相关文档

- [消息投递、重试与响应行为](/docs/manual/message-retries-and-delivery)
- [消息入口的去重、合并和排队](/docs/manual/inbound-dedupe-and-debounce)
- [Agent 运行时](/docs/manual/agent-runtime)
- [Steer 命令](/tools/steer)
