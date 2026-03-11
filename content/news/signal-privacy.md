---
title: "OpenClaw Signal 隐私通讯集成"
description: "了解如何将 OpenClaw 连接到 Signal，实现隐私通讯。"
category: 渠道指南
date: "2026-03-09"
author: "OpenClaw Team"
source: "openclaw.ai"
updatedAt: "2026-03-11"
sourceType: official
tags: ["signal", "privacy", "channel", "tutorial"]
---

本文介绍如何将 OpenClaw 集成到 Signal。

## 前置要求

- signal-cli 已安装
- 可用的电话号码
- Linux/macOS 系统

## 安装 signal-cli

```bash
# macOS
brew install signal-cli

# Linux
sudo apt install signal-cli
```

## 配置

### 1. 注册设备

```bash
signal-cli -u +15555550123 register
signal-cli -u +15555550123 verify [CODE]
```

### 2. 配置 OpenClaw

```json
{
  "channels": {
    "signal": {
      "phoneNumber": "+15555550123",
      "allowFrom": ["+15555550124"]
    }
  }
}
```

## 使用方式

### 发送消息

```python
# 通过 API
await openclaw.send_message("+15555550124", "Hello!")
```

### 接收消息

Signal 消息会自动转发到 OpenClaw

## 隐私特性

- 端到端加密
- 无元数据收集
- 开源协议

---

*了解更多，请访问 [docs.openclaw.ai](https://docs.openclaw.ai)。*
