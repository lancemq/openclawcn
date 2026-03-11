---
title: 语音助手配置与使用指南
description: 全面了解 OpenClaw 语音功能的配置和使用，包括语音唤醒、连续对话和语音合成。
category: 语音交互
difficulty: 初级
updatedAt: 2026-03-11
sourceType: third-party
tags: [voice, wakeword, speech, setup]
---

# 语音助手配置与使用指南

本文详细介绍 OpenClaw 语音功能的配置和使用。

## 语音功能概述

OpenClaw 提供完整的语音交互能力：

- 语音唤醒（macOS/iOS）
- 连续语音对话（Android）
- 语音合成输出
- 多语言支持

## 启用语音功能

### 基本配置

```json
{
  "voice": {
    "enabled": true,
    "language": "zh-CN",
    "input": {
      "provider": "system",
      "wake_word": "Hey OpenClaw"
    },
    "output": {
      "provider": "elevenlabs",
      "voice_id": "rachel"
    }
  }
}
```

### 平台配置

#### macOS

```bash
# 启用语音唤醒
openclaw voice enable-wakeword --platform macos

# 授权麦克风
openclaw voice authorize-microphone
```

#### iOS

```swift
// 在 iOS 应用中启用
OpenClawVoice.shared().enableWakeWord("Hey OpenClaw")
```

#### Android

```kotlin
// 启用连续对话
voiceClient.enableContinuousMode()
```

## 语音识别

### 输入配置

```json
{
  "voice": {
    "input": {
      "provider": "openai",
      "model": "whisper-1",
      "language": "zh",
      "punctuation": true
    }
  }
}
```

### 语音活动检测

```python
# 配置语音活动检测
voice_config = {
    "silence_threshold": 500,  # 毫秒
    "min_speech_duration": 300,
    "max_speech_duration": 30000
}
```

## 语音合成

### 输出配置

```json
{
  "voice": {
    "output": {
      "provider": "elevenlabs",
      "voice_id": "rachel",
      "stability": 0.5,
      "similarity_boost": 0.75
    }
  }
}
```

### 可用语音

| 语音 ID | 名称 | 风格 |
|---------|------|------|
| rachel | Rachel | 温暖女声 |
| adam | Adam | 专业男声 |
| sam | Sam | 友好男声 |

### 自定义语音

```python
# 克隆自己的声音
voice = await elevenlabs.clone_voice(
    name="my_voice",
    audio_files=["sample1.mp3", "sample2.mp3"]
)
```

## 语音场景

### 驾驶模式

```json
{
  "voice": {
    "mode": "driving",
    "long_listening": true,
    "announce_responses": true,
    "volume": 0.9
  }
}
```

### 家庭模式

```json
{
  "voice": {
    "mode": "home",
    "short_listening": true,
    "announce_responses": false,
    "child_friendly": true
  }
}
```

## 语音指令

### 自定义命令

```python
voice_commands = {
    "导航到 {location}": lambda loc: navigate_to(loc),
    "给 {name} 打电话": lambda name: call_contact(name),
    "设置 {time} 的闹钟": lambda time: set_alarm(time),
    "播放 {song}": lambda song: play_music(song)
}
```

### 快捷指令

```yaml
shortcuts:
  - phrase: "上班"
    action: |
      查看今天日程
      播报天气
      播报路况
  
  - phrase: "下班"
    action: |
      发送位置给家人
      播放轻松音乐
```

## 常见问题

### 语音识别不准

- 检查麦克风位置
- 确保环境安静
- 调整灵敏度设置

### 响应延迟

- 检查网络连接
- 切换到本地模型
- 减少上下文长度

### 语音唤醒失败

- 检查唤醒词设置
- 确认麦克风权限
- 调整唤醒灵敏度

## 下一步

- [语音功能最佳实践](/best-practices/voice-usage)
- [多平台客户端](/news/multiplatform-clients)
- [核心能力总览](/docs/manual/core-capabilities)
