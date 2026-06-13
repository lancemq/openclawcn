---
title: Queue 系统与消息转向
description: 理解 OpenClaw 的 Queue 系统、消息转向模式和并发控制机制。
category: manual
updatedAt: 2026-06-10
sourceType: official
source: https://docs.openclaw.ai/concepts/queue
tags: [queue, steering, concurrency, messages]
---

# Queue 系统与消息转向

当你的 Agent 在处理一条消息时，你又发了一条新消息，会发生什么？OpenClaw 用一个 Queue 系统来管理这种情况。

## 为什么需要 Queue

想象这个场景：你发了一条消息让 Agent "帮我写一篇报告"，Agent 开始调用工具、搜索资料、生成内容。这时你又发了一条"对了，报告要用中文"。

如果没有 Queue，两条消息会同时触发两次 Agent 运行，可能产生冲突。Queue 的作用就是让消息排队，确保同一时刻只有一次 Agent 运行操作某个会话。

## 四种模式，各管各的

| 模式 | 行为 | 适用场景 |
|------|------|---------|
| `steer`（默认） | 消息注入当前运行 | 日常对话，希望实时响应 |
| `followup` | 排队等当前运行结束 | 消息需要独立处理 |
| `collect` | 安静窗口后合并处理 | 快速连续消息 |
| `interrupt` | 中止当前运行，处理最新消息 | 紧急消息需要立即响应 |

### steer：转向（默认）

这是最常用的模式。当你的新消息到达时，如果 Agent 正在运行，消息会被"转向"到当前运行——Agent 会在完成当前工具调用后，读取你的新消息并调整行为。

**什么时候转向**：转向在**当前 assistant turn 完成工具调用之后、下一次 LLM 调用之前**交付。

**什么时候排队**：如果运行未激活流式或转向不可用，消息会等到当前运行结束再处理。

### followup：排队

新消息不会注入当前运行，而是排队等待。当前运行结束后，Agent 会按顺序处理排队的消息。

**适用场景**：当你需要每条消息都被独立处理，而不是合并到当前运行中。

### collect：合并

将排队消息合并为一次后续处理。比如你快速发了三条消息，collect 模式会等一个安静窗口（默认 500ms），然后把三条消息合并成一条处理。

**适用场景**：当你快速连续发消息，希望 Agent 一次性处理所有内容。

### interrupt：中断

中止当前运行，立即处理最新消息。这会打断正在进行的工作。

**适用场景**：当你发现 Agent 跑偏了，想立即纠正。

## 配置方式

### 全局配置

```json5
{
  messages: {
    queue: {
      mode: "steer",
      debounceMs: 500,
      cap: 20,
      drop: "summarize",
    },
  },
}
```

### 按渠道配置

不同渠道可以用不同模式：

```json5
{
  messages: {
    queue: {
      mode: "steer",
      byChannel: {
        discord: "collect", // Discord 用合并模式
        telegram: "steer", // Telegram 用转向模式
      },
    },
  },
}
```

### 会话级切换

在聊天中直接切换模式：

```
/queue collect
/queue steer
/queue interrupt
```

组合选项：

```
/queue collect debounce:0.5s cap:25 drop:summarize
```

恢复默认：

```
/queue default
```

## 配置参数

| 参数 | 作用 | 默认值 |
|------|------|--------|
| `mode` | 队列模式 | `"steer"` |
| `debounceMs` | 安静窗口时间 | `500` |
| `cap` | 每会话最大排队数 | `20` |
| `drop` | 队列满时策略 | `"summarize"` |

### drop 策略

| 策略 | 行为 |
|------|------|
| `"summarize"` | 丢弃最旧消息，保留紧凑摘要，作为合成 followup 提示 |
| `"old"` | 丢弃最旧消息，不保留摘要 |
| `"new"` | 拒绝最新消息 |

**推荐**：用 `"summarize"`，这样即使消息被丢弃，Agent 也能知道你之前说了什么。

## 并发控制

OpenClaw 使用车道（lane）模型控制并发：

| 车道 | 默认并发数 | 用途 |
|------|-----------|------|
| `main` | 4 | 入站消息 + 主心跳 |
| `subagent` | 8 | 子 Agent |
| `cron` | 可配置 | 定时任务 |

**会话级保证**：同一时刻只有一次 Agent 运行操作某个会话。这是通过会话级车道保证的。

## 常见问题

### 问题一：命令看起来卡住了

**症状**：消息发出去后，Agent 好像没反应。

**排查**：
1. 启用详细日志：`openclaw gateway start --verbose`
2. 查找 "queued for ...ms" 行，确认消息是否在排队
3. 检查 `maxConcurrent` 是否太小

### 问题二：消息被丢弃

**症状**：发了很多消息，但 Agent 只处理了部分。

**原因**：队列满了（达到 `cap`），超出的消息被 `drop` 策略丢弃。

**解决**：
1. 增大 `cap`：`messages.queue.cap: 50`
2. 或者用 `"summarize"` 策略，确保被丢弃的消息有摘要

### 问题三：collect 模式下消息被拆分

**症状**：发了三条消息，但 Agent 只处理了两条。

**原因**：如果消息来自不同的频道/线程，会分别处理以保持路由正确。

**解决**：这是正常行为。如果你希望所有消息合并处理，确保在同一个频道/线程中发送。

## 相关文档

- [消息投递、重试与响应行为](/docs/manual/message-retries-and-delivery)
- [消息入口的去重、合并和排队](/docs/manual/inbound-dedupe-and-debounce)
- [Agent 运行时](/docs/manual/agent-runtime)
