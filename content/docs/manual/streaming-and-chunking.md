---
title: 流式输出与分块机制
description: 了解 OpenClaw 的块流式输出、预览流式输出、分块算法和频道映射。
category: manual
updatedAt: 2026-06-06
sourceType: official
source: https://docs.openclaw.ai/concepts/streaming
tags: [streaming, chunking, block, preview, channels]
---

# 流式输出与分块机制

OpenClaw 有两层独立的流式输出机制：

- **块流式（Block streaming）**：assistant 写完一个**块**后立即发送。这些是正常的频道消息（不是 token delta）。
- **预览流式（Preview streaming）**：在生成过程中更新**临时预览消息**（支持 Telegram/Discord/Slack 等）。

目前没有真正的 token-delta 流式输出到频道消息。预览流式基于消息发送+编辑。

## 块流式（频道消息）

块流式在内容可用时将 assistant 输出以粗粒度块的形式发送。

### 控制开关

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `agents.defaults.blockStreamingDefault` | 全局开关 | `"off"` |
| `*.blockStreaming` | 渠道级覆盖 | 继承默认值 |
| `agents.defaults.blockStreamingBreak` | 分块边界 | `"text_end"` |
| `agents.defaults.blockStreamingChunk` | 块大小控制 | `{ minChars, maxChars }` |
| `agents.defaults.blockStreamingCoalesce` | 合并流式块 | `{ idleMs }` |

### 边界语义

- **`text_end`**：块一旦准备好就立即发送，在每次 `text_end` 时刷新
- **`message_end`**：等待 assistant 消息完成，然后刷新缓冲输出

即使是 `message_end` 模式，如果缓冲文本超过 `maxChars`，仍可能发送多个块。

### 媒体交付

块流式发送媒体时必须使用结构化字段（如 `mediaUrl`），流式文本不会解析为附件命令。如果最终回复重复了已流式传输的媒体 URL，OpenClaw 会自动去重。

### 人类化节奏

```json5
{
  agents: {
    defaults: {
      humanDelay: "natural", // off | natural (800-2500ms) | custom
    },
  },
}
```

在块之间添加随机延迟，让多段回复感觉更自然。仅应用于块回复，不适用于最终回复或工具摘要。

## 分块算法

`EmbeddedBlockChunker` 实现了以下逻辑：

- **低边界**：缓冲区达到 `minChars` 前不发送（除非强制）
- **高边界**：优先在 `maxChars` 之前分割；如果被迫，在 `maxChars` 处分割
- **断点偏好**：段落 → 换行 → 句子 → 空白 → 硬分割
- **代码块**：永不分割代码块内部；当被迫时，关闭并重新打开 fence 以保持 Markdown 有效

`maxChars` 受限于渠道的 `textChunkLimit`。

## 块合并（Coalescing）

块流式启用时，OpenClaw 可以在发送前**合并连续的块**，减少"单行刷屏"。

- 等待空闲间隙（`idleMs`）后刷新
- 缓冲区达到 `maxChars` 时强制刷新
- 最小块大小由 `minChars` 控制

```json5
{
  agents: {
    defaults: {
      blockStreamingCoalesce: {
        minChars: 500,
        maxChars: 2000,
        idleMs: 1500,
      },
    },
  },
}
```

## 预览流式模式

核心配置：`channels.<channel>.streaming`

| 模式 | 说明 |
|------|------|
| `off` | 禁用预览流式 |
| `partial` | 单个预览消息，不断更新为最新文本 |
| `block` | 分块/追加方式的预览更新 |
| `progress` | 生成期间显示进度/状态，完成时发送最终答案 |

### 频道映射

| 频道 | `off` | `partial` | `block` | `progress` |
|------|-------|-----------|---------|------------|
| Telegram | ✅ | ✅ | ✅ | editable progress draft |
| Discord | ✅ | ✅ | ✅ | editable progress draft |
| Slack | ✅ | ✅ | ✅ | ✅ |
| Mattermost | ✅ | ✅ | ✅ | ✅ |
| MS Teams | ✅ | ✅ | ✅ | native progress stream |

### 工具进度预览

预览流式还可以包含**工具进度**更新——如"正在搜索网页"、"正在读取文件"——在工具运行时显示在预览消息中。

支持的表面：Discord、Slack、Telegram、Matrix。

控制显示：

```json5
{
  channels: {
    telegram: {
      streaming: {
        mode: "partial",
        preview: {
          toolProgress: true,
          commandText: "status", // "raw" | "status"
        },
      },
    },
  },
}
```

## 相关文档

- [消息生命周期](/concepts/messages)
- [消息重试](/concepts/retry)
- [频道配置](/channels)
