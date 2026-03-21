---
title: Deepgram 音频转录怎么接
description: 基于最新官方 Deepgram provider 文档，整理 OpenClaw 里语音转录的接入方式、配置重点，以及它和聊天模型 provider 的边界。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/providers/deepgram
sourceName: OpenClaw Docs
sourceType: official
tags: [deepgram, transcription, audio, voice, providers]
---

# Deepgram 音频转录怎么接

官方现在已经把 `Deepgram` 单独列为正式 provider，这一点很重要，因为它说明 OpenClaw 里的“语音能不能转成文本”已经不该再和聊天模型混着理解。

对很多中文用户来说，更容易记住的边界是：

- 聊天模型负责回答
- 转录 provider 负责把音频变成文本

## Deepgram 在 OpenClaw 里负责什么

根据最新官方 provider 文档，Deepgram 在 OpenClaw 里的职责很明确：

- 处理入站音频或语音消息
- 上传音频文件到 Deepgram
- 把转录结果注入回复流水线

官方文档还特别说明了两点：

- 这里用的是预录音频转录接口
- 不是实时流式转录

所以更适合把它理解成“把一段现成音频转成文本”，而不是打电话那种实时语音栈。

## 最小配置长什么样

官方文档给出的最小思路很直接：

1. 配 `DEEPGRAM_API_KEY`
2. 打开 `tools.media.audio.enabled`
3. 给音频工具指定 `provider: "deepgram"`

一个更容易理解的最小配置可以写成：

```json
{
  "tools": {
    "media": {
      "audio": {
        "enabled": true,
        "models": [
          {
            "provider": "deepgram",
            "model": "nova-3"
          }
        ]
      }
    }
  }
}
```

## 为什么它和聊天 provider 不该混起来配

这类问题在中文环境里很常见：

- 聊天已经能用了
- 结果语音消息还是不工作

原因通常就在于聊天 provider 和转录 provider 是两层不同能力。

根据官方现在的 provider 目录，这种分层已经很明确：

- 聊天模型是一层
- image model 可能是一层
- audio transcription 又是一层

所以“主模型能回话”并不等于“语音入口已经完整可用”。

## 官方当前最值得记住的几个选项

Deepgram provider 文档目前特别提到的可调项包括：

- `model`
- `language`
- `detect_language`

这意味着你可以根据自己的场景决定：

- 直接固定语言
- 给语言提示
- 让它自己检测

如果你处理的是中文、英文或中英混合语音，这几个参数就比想象中更重要。

## 转录结果在 OpenClaw 里是怎么进入会话的

官方文档当前的说法很清楚：转录结果会被注入到回复流水线里，带上 transcript 信息和音频块上下文。

这件事的意义在于：

- 语音消息不是“黑盒附件”
- 转录文本会进入后续模型处理
- 你后面的 Skill、记忆或自动化都可能基于这段文本继续工作

也正因为如此，转录质量和语言设置会直接影响后续体验。

## 什么场景特别适合单独配 Deepgram

更适合优先配 Deepgram 的场景通常包括：

- Telegram / WhatsApp 语音消息
- 大量语音备忘
- 音频资料整理
- 想把语音内容继续接进记忆或知识流

如果你站点后面准备继续做语音、知识库或自动整理内容，这条 provider 会比单看聊天模型更关键。

## 排错时先看什么

如果语音转录没生效，更适合先查这几层：

1. `DEEPGRAM_API_KEY` 是否可用
2. `tools.media.audio.enabled` 是否真的开启
3. `models` 里是否指定了 Deepgram
4. 语言设置是否和实际音频偏差太大

很多时候问题并不在主模型，而在这条独立转录链路。

## 中文站建议怎么理解这页

如果你在搭语音或记忆场景，更适合把这条线拆开看：

- 想让音频能进系统：先看 Deepgram
- 想让文本被记住：再看 [记忆搜索与索引](/docs/manual/memory-search-and-indexing)
- 想让回复模型更稳：再看 [模型提供商与故障转移](/docs/manual/providers-and-fallback)

这样会比把所有问题都归到“模型不行”更容易排查。
