---
title: 流式输出与分块机制
description: 理解 OpenClaw 的两层流式输出机制：块流式（实时发送）和预览流式（实时预览），以及如何配置。
category: manual
updatedAt: 2026-06-10
sourceType: official
source: https://docs.openclaw.ai/concepts/streaming
tags: [streaming, chunking, block, preview, channels]
---

# 流式输出与分块机制

当你的 Agent 在 Telegram 或 Discord 里回复长消息时，你是希望它"憋一大段再发"，还是"写一段发一段"？OpenClaw 提供了两层独立的流式输出机制，帮你精确控制这个行为。

## 两层机制，各管各的

| 机制 | 作用 | 用户看到什么 |
|------|------|-------------|
| **块流式**（Block Streaming） | 写完一个"块"就立即发送 | 消息一条一条蹦出来 |
| **预览流式**（Preview Streaming） | 生成过程中更新预览消息 | 消息在"打字中"不断更新 |

**关键区别**：块流式发送的是真正的频道消息；预览流式只是在编辑一条临时消息，直到最终回复完成。

**没有真正的 token-delta 流式**：OpenClaw 不会把每个 token 实时发到频道。预览流式基于消息发送+编辑，不是 token 级别的。

## 块流式：写一段发一段

块流式是最常用的流式方式。开启后，Agent 写完一个"块"就立即发送到频道。

### 开启方式

```json5
{
  agents: {
    defaults: {
      blockStreamingDefault: "on", // 全局开关
    },
  },
  channels: {
    telegram: {
      blockStreaming: true, // 渠道级开关
    },
  },
}
```

**注意**：块流式默认是**关闭**的。你需要显式开启。

### 控制参数

| 配置项 | 作用 | 默认值 |
|--------|------|--------|
| `blockStreamingDefault` | 全局开关 | `"off"` |
| `*.blockStreaming` | 渠道级开关 | 继承默认 |
| `blockStreamingBreak` | 什么时候发 | `"text_end"` |
| `blockStreamingChunk` | 块大小 | `{ minChars: 800, maxChars: 1200 }` |
| `blockStreamingCoalesce` | 合并连续块 | `{ idleMs: 1500 }` |

### 边界语义

- **`text_end`**：块一准备好就立即发送（默认）
- **`message_end`**：等整个回复写完再发送（可能一次性发很多条）

**推荐**：大多数场景用 `text_end`，用户体验更好。

### 分块算法

OpenClaw 不会随便在句子中间切断。它按以下优先级找断点：

1. 段落边界（`\n\n`）
2. 换行（`\n`）
3. 句子边界（`. `、`。`）
4. 空格
5. 硬分割（达到 `maxChars` 时强制切断）

**代码块保护**：如果在代码块中间被迫切断，OpenClaw 会自动关闭代码块（加 ` ``` `），在下一个块重新打开，保持 Markdown 有效。

### 人类化节奏

多段回复一条一条蹦出来太快，看起来像机器人在刷屏。你可以加一个随机延迟：

```json5
{
  agents: {
    defaults: {
      humanDelay: "natural", // 800-2500ms 随机延迟
    },
  },
}
```

这个延迟只在块回复之间生效，不影响最终回复或工具摘要。

## 预览流式：实时预览

预览流式在生成过程中更新一条临时消息，让用户看到"正在打字"。支持 Telegram、Discord、Slack 等。

### 四种模式

| 模式 | 用户看到什么 | 适用场景 |
|------|-------------|---------|
| `off` | 只看到最终回复 | 默认，不需要预览 |
| `partial` | 一条消息不断更新为最新文本 | 最常用，适合大多数场景 |
| `block` | 分块更新预览 | 需要看到完整分块过程 |
| `progress` | 显示"正在思考..."等进度信息 | 长时间运行，需要反馈 |

### 配置示例

```json5
{
  channels: {
    telegram: {
      streaming: {
        mode: "partial",
        preview: {
          toolProgress: true, // 显示工具进度
          commandText: "status", // 命令文本显示为"正在执行..."
        },
      },
    },
  },
}
```

### 工具进度预览

开启 `toolProgress` 后，Agent 在调用工具时会显示进度信息：

- "正在搜索网页..."
- "正在读取文件..."
- "正在执行命令..."

这些进度信息会更新在同一条预览消息中，让用户知道 Agent 在做什么。

### 频道支持

| 频道 | `off` | `partial` | `block` | `progress` |
|------|-------|-----------|---------|------------|
| Telegram | ✅ | ✅ | ✅ | 可编辑的进度草稿 |
| Discord | ✅ | ✅ | ✅ | 可编辑的进度草稿 |
| Slack | ✅ | ✅ | ✅ | ✅ |
| Mattermost | ✅ | ✅ | ✅ | ✅ |
| MS Teams | ✅ | ✅ | ✅ | 原生进度流 |

## 完整配置示例

一个典型的流式输出配置：

```json5
{
  agents: {
    defaults: {
      blockStreamingDefault: "on",
      blockStreamingBreak: "text_end",
      blockStreamingChunk: {
        minChars: 800,
        maxChars: 1200,
      },
      blockStreamingCoalesce: {
        minChars: 500,
        maxChars: 2000,
        idleMs: 1500,
      },
      humanDelay: "natural",
    },
  },
  channels: {
    telegram: {
      blockStreaming: true,
      streaming: {
        mode: "partial",
        preview: {
          toolProgress: true,
        },
      },
    },
    discord: {
      blockStreaming: true,
      streaming: {
        mode: "partial",
      },
    },
  },
}
```

## 调优建议

| 场景 | 推荐配置 | 原因 |
|------|---------|------|
| 快速回复 | `blockStreamingBreak: "text_end"` + 小 chunk | 用户更快看到回复 |
| 长文回复 | `blockStreamingBreak: "message_end"` + 大 chunk | 避免太多条消息 |
| 慢模型（如本地 Ollama） | 开启 `humanDelay` + 大 `idleMs` | 看起来更自然 |
| 快模型（如 GPT-4） | 关闭 `humanDelay` + 小 chunk | 最快看到回复 |

## 相关文档

- [消息生命周期](/concepts/messages)
- [消息重试](/concepts/retry)
- [频道配置](/channels)
