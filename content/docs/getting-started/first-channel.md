---
title: 接入第一个渠道
description: 学习如何将 OpenClaw Agent 接入消息渠道，实现多平台统一管理。
category: 入门
updatedAt: 2026-03-12
sourceType: official
tags: [channels, quickstart, tutorial, basics]
---

# 接入第一个渠道

OpenClaw 的核心优势之一是支持多渠道接入。这一页带你理解渠道是什么、如何接入、以及如何管理多个渠道。

## 渠道是什么

渠道 (Channel) 是用户与 Agent 交互的入口。OpenClaw 支持 **50+** 种渠道接入，包括：

- **即时通讯** - Telegram、WhatsApp、Discord、Slack、微信
- **社交媒体** - Twitter、微博
- **企业应用** - 飞书、钉钉、企业微信
- **其他** - Web Chat、Email、API

通过渠道接入，你可以：
- 在一个地方管理所有消息
- 让同一个 Agent 服务于多个平台
- 统一对话历史和记忆

## 选择第一个渠道

对于第一次接入，推荐选择：

| 渠道 | 推荐理由 | 难度 |
|------|----------|------|
| Web Chat | 无需配置，开箱即用 | 简单 |
| Telegram | 配置简单，文档完善 | 简单 |
| Discord | 社区活跃，功能丰富 | 中等 |
| WhatsApp | 用户基数大，适合个人使用 | 中等 |

## 接入 Web Chat

Web Chat 是最简单的渠道，无需额外配置：

### 启动 Web Chat

```bash
# 启动内置 Web Chat
openclaw webchat start

# 指定端口
openclaw webchat start --port 3001
```

### 访问 Web Chat

打开浏览器访问 `http://localhost:3000/webchat`，即可开始对话。

### 配置选项

```json
{
  "webchat": {
    "enabled": true,
    "port": 3000,
    "theme": "default",
    "title": "我的助手",
    "welcomeMessage": "你好！有什么可以帮助你的吗？"
  }
}
```

## 接入 Telegram

Telegram 是配置最简单的即时通讯渠道之一：

### 第 1 步：创建 Bot

1. 在 Telegram 中搜索 `@BotFather`
2. 发送 `/newbot` 命令
3. 按提示设置 Bot 名称
4. 记录返回的 API Token

### 第 2 步：配置 OpenClaw

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "${TELEGRAM_BOT_TOKEN}",
      "allowedUsers": ["your-telegram-username"],
      "allowedChats": []
    }
  }
}
```

### 第 3 步：启动服务

```bash
# 设置环境变量
export TELEGRAM_BOT_TOKEN="your-bot-token"

# 启动 gateway
openclaw gateway start
```

### 第 4 步：测试

在 Telegram 中找到你的 Bot，发送消息测试。

## 接入 Discord

Discord 适合社区和团队使用：

### 第 1 步：创建 Discord 应用

1. 访问 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 "New Application"
3. 进入 Bot 页面，创建 Bot
4. 记录 Bot Token

### 第 2 步：邀请 Bot

生成邀请链接：

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=2048&scope=bot
```

### 第 3 步：配置 OpenClaw

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "botToken": "${DISCORD_BOT_TOKEN}",
      "clientId": "${DISCORD_CLIENT_ID}",
      "guilds": ["your-server-id"]
    }
  }
}
```

## 接入 WhatsApp

WhatsApp 适合个人和商业使用：

### 使用 WhatsApp Business API

```json
{
  "channels": {
    "whatsapp": {
      "enabled": true,
      "provider": "twilio",
      "accountSid": "${TWILIO_ACCOUNT_SID}",
      "authToken": "${TWILIO_AUTH_TOKEN}",
      "phoneNumber": "${WHATSAPP_PHONE_NUMBER}"
    }
  }
}
```

### 使用 WhatsApp Web (非官方)

OpenClaw 也支持通过 WhatsApp Web 协议接入，但需要注意合规性。

## 接入飞书

飞书适合中国企业用户：

### 第 1 步：创建飞书应用

1. 访问 [飞书开放平台](https://open.feishu.cn/)
2. 创建企业自建应用
3. 配置机器人能力
4. 获取 App ID 和 App Secret

### 第 2 步：配置 OpenClaw

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "${FEISHU_APP_ID}",
      "appSecret": "${FEISHU_APP_SECRET}",
      "encryptKey": "${FEISHU_ENCRYPT_KEY}",
      "verificationToken": "${FEISHU_VERIFICATION_TOKEN}"
    }
  }
}
```

### 第 3 步：配置事件订阅

在飞书开放平台配置事件订阅 URL：

```
https://your-domain.com/webhook/feishu
```

## 管理多个渠道

### 查看渠道状态

```bash
# 列出所有渠道
openclaw channels list

# 查看特定渠道状态
openclaw channels status telegram

# 查看渠道日志
openclaw channels logs telegram
```

### 渠道配置示例

```json
{
  "channels": {
    "webchat": {
      "enabled": true,
      "port": 3000
    },
    "telegram": {
      "enabled": true,
      "botToken": "${TELEGRAM_BOT_TOKEN}"
    },
    "discord": {
      "enabled": false,
      "botToken": "${DISCORD_BOT_TOKEN}"
    },
    "feishu": {
      "enabled": true,
      "appId": "${FEISHU_APP_ID}"
    }
  }
}
```

### 渠道路由

可以配置不同渠道使用不同的 Agent：

```json
{
  "routing": {
    "telegram": "personal-assistant",
    "discord": "community-bot",
    "feishu": "work-assistant",
    "webchat": "default"
  }
}
```

## 安全配置

### 用户白名单

```json
{
  "channels": {
    "telegram": {
      "allowedUsers": ["user1", "user2"],
      "allowedChats": ["chat1"]
    }
  }
}
```

### 消息过滤

```json
{
  "channels": {
    "telegram": {
      "messageFilter": {
        "maxLength": 4000,
        "allowedTypes": ["text", "photo"],
        "rateLimit": {
          "maxMessages": 100,
          "windowMs": 60000
        }
      }
    }
  }
}
```

## 常见问题

### Bot 无法接收消息

检查：
- Bot Token 是否正确
- 网络连接是否正常
- 是否被用户/服务器封禁

### 消息延迟

检查：
- Gateway 是否正常运行
- 网络延迟情况
- 模型响应时间

### 多渠道消息混乱

检查：
- 路由配置是否正确
- 是否使用了正确的 Agent
- 会话管理是否正常

## 下一步

- [渠道能力概览](/docs/manual/channels-overview)
- [Telegram 和 WhatsApp 配置](/docs/manual/telegram-and-whatsapp)
- [Discord 和 Slack 配置](/docs/manual/discord-and-slack)
- [飞书集成](/news/feishu-integration)