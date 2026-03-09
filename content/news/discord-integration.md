---
title: "OpenClaw Discord 集成配置"
description: "了解如何将 Discord Bot 连接到 OpenClaw，实现服务器和频道管理。"
category: 渠道指南
date: "2026-03-09"
author: "OpenClaw Team"
source: "openclaw.ai"
tags: ["discord", "bot", "channel", "tutorial"]
---

本文介绍如何将 Discord Bot 集成到 OpenClaw。

## 创建 Discord 应用

### 1. 创建应用

1. 访问 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 "New Application"
3. 设置应用名称

### 2. 创建 Bot

1. 转到 "Bot" 页面
2. 点击 "Add Bot"
3. 获取 Token

### 3. 配置权限

添加以下权限：
- Send Messages
- Read Message History
- Use Slash Commands

## 配置 OpenClaw

```json
{
  "channels": {
    "discord": {
      "token": "YOUR_DISCORD_TOKEN",
      "guilds": ["SERVER_ID"],
      "allowFrom": ["CHANNEL_ID_1", "CHANNEL_ID_2"]
    }
  }
}
```

## Slash 命令

OpenClaw 支持 Discord Slash 命令：

| 命令 | 说明 |
|------|------|
| /ask | 向助手提问 |
| /status | 检查状态 |
| /settings | 查看设置 |

## 频道配置

```json
{
  "channels": {
    "discord": {
      "channels": {
        "123456789": {
          "mode": "agent",
          "agent": "default"
        }
      }
    }
  }
}
```

---

*了解更多，请访问 [docs.openclaw.ai](https://docs.openclaw.ai)。*