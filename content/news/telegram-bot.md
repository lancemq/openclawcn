---
title: "OpenClaw Telegram Bot 配置指南"
description: "了解如何创建和配置 Telegram Bot 连接到 OpenClaw。"
category: 渠道指南
date: "2026-03-09"
author: "OpenClaw Team"
source: "openclaw.ai"
tags: ["telegram", "bot", "channel", "tutorial"]
---

本文介绍如何将 Telegram Bot 连接到 OpenClaw。

## 创建 Telegram Bot

### 1. 与 BotFather 对话

1. 打开 Telegram
2. 搜索 @BotFather
3. 发送 /newbot 命令
4. 按照提示设置名称和用户名
5. 获取 API Token

### 2. 配置 OpenClaw

```bash
openclaw channels add telegram
```

或手动配置：

```json
{
  "channels": {
    "telegram": {
      "token": "YOUR_BOT_TOKEN",
      "allowFrom": ["USER_ID_1", "USER_ID_2"]
    }
  }
}
```

## 群组配置

### 添加 Bot 到群组

1. 在群组设置中添加 Bot
2. 授予管理员权限（可选）
3. 配置群组规则

### 群组权限配置

```json
{
  "channels": {
    "telegram": {
      "groups": {
        "*": {
          "requireMention": true
        }
      }
    }
  }
}
```

## 常用命令

| 命令 | 说明 |
|------|------|
| /start | 开始对话 |
| /help | 获取帮助 |
| /status | 检查状态 |
| /settings | 配置设置 |

---

*了解更多，请访问 [docs.openclaw.ai](https://docs.openclaw.ai)。*