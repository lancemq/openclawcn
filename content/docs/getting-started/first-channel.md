---
title: 接入第一个渠道
description: 学习如何将 OpenClaw Agent 接入消息渠道，实现多平台统一管理。
category: 入门
updatedAt: 2026-05-26
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

| 渠道 | 推荐理由 | 难度 | 配置时间 | 适用场景 |
|------|----------|------|---------|---------|
| Web Chat | 无需额外配置，开箱即用 | 简单 | 5 分钟 | 本地测试、开发验证 |
| Telegram | 文档完善，BOT API 成熟 | 简单 | 15 分钟 | 个人使用、快速原型 |
| Discord | 社区活跃，权限管理完善 | 中等 | 20 分钟 | 团队协作、社区管理 |
| WhatsApp | 用户基数大 | 中等 | 30 分钟 | 个人助手、客服场景 |
| 飞书 | 中国企业友好 | 中等 | 25 分钟 | 企业内部使用 |

建议首次接入按这个顺序来：

1. 先用 **Web Chat** 验证 Agent 行为（最快）
2. 再用 **Telegram** 接入真实消息流（最稳）
3. 确认稳定后再扩展其他渠道

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

### Telegram 配置注意事项

- Bot Token 妥善保管，泄露后任何人都能控制你的 Bot
- 建议通过环境变量注入 Token，而不是写在配置文件中
- `allowedUsers` 可以限制只允许特定用户使用
- 首次配置完成后，先由自己测试再开放给其他人

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

### Discord vs Telegram 选哪个

| 对比维度 | Telegram | Discord |
|---------|----------|---------|
| 配置复杂度 | 低 | 中 |
| 权限控制 | 基础 | 完善 |
| 群组功能 | 简单群组 | 完整频道体系 |
| 文件分享 | 支持 | 支持 |
| 适合场景 | 个人使用 | 社区/团队 |

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

### 渠道逐步扩展策略

不建议一次性接入所有渠道。推荐的分阶段策略：

**阶段一（第 1 周）**：只用一个渠道验证 Agent 行为
- 推荐用 Web Chat 或 Telegram
- 确认消息收发、技能调用、记忆功能正常

**阶段二（第 2-3 周）**：增加第二个渠道
- 选择与第一个渠道差异较大的平台
- 观察跨渠道的状态一致性

**阶段三（第 4 周后）**：按需扩展
- 根据使用反馈决定新增哪个渠道
- 每个新渠道至少稳定运行 3 天再开下一个

## 渠道选择决策矩阵

| 你的需求 | 推荐优先接入 | 第二选择 |
|---------|------------|---------|
| 个人日常使用 | Telegram | WhatsApp |
| 团队内部协作 | Discord | 飞书/钉钉 |
| 客户服务场景 | WhatsApp | Web Chat |
| 社区运营 | Discord | Telegram |
| 企业内部系统 | 飞书/钉钉 | Slack |
| 本地开发测试 | Web Chat | CLI |

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

### 渠道安全最佳实践

- **Token 管理**：所有 Bot Token 和 API 密钥通过环境变量注入，不硬编码
- **最小权限**：每个渠道只开启它需要的权限，不使用的渠道保持禁用
- **白名单优先**：先用白名单限制用户范围，确认稳定后逐步放宽
- **频率限制**：对公开渠道设置消息频率限制，防止滥用
- **日志审计**：定期查看渠道日志，及时发现异常行为

## 常见渠道配置误区

| 误区 | 问题 | 正确做法 |
|------|------|---------|
| 同时接入所有渠道 | 排查困难、状态分散 | 从 1 个渠道开始，稳定后再加 |
| Token 直接写在配置文件 | 凭据泄露风险 | 使用环境变量注入 |
| 不设白名单就开放 | 被恶意用户滥用 | 先限制在可信用户范围 |
| 多个渠道共用一个 Agent 配置 | 不同场景需求不同 | 使用渠道路由分配给不同 Agent |
| 渠道出问题时先改代码 | 可能是配置或网络问题 | 先检查渠道状态和日志 |
| 忽略 Webhook 的 HTTPS | 消息内容可能被截获 | 生产环境确保 Webhook URL 使用 HTTPS |

## 跨渠道使用提醒

当你的 Agent 接入多个渠道后，注意这些事项：

- **记忆统一**：如果所有渠道共享同一个 Agent，对话历史也会跨渠道共享。这在某些场景下是优点，但在场景分离时可能造成上下文污染
- **回复风格**：不同渠道的用户对回复风格的期望不同（如 Telegram 更轻量、飞书更正式），可以通过不同 Agent 分别配置
- **消息长度**：各渠道对消息长度限制不同，Agent 的回复应根据渠道自动适配
- **渠道特有功能**：部分渠道支持 Markdown、按钮、图片等特色功能，不同渠道间的表现可能不一致

## 常见问题

### Bot 无法接收消息

检查：
- Bot Token 是否正确
- 网络连接是否正常
- 是否被用户/服务器封禁
- Gateway 是否在运行

### 消息延迟

检查：
- Gateway 是否正常运行
- 网络延迟情况
- 模型响应时间
- 渠道 API 的限流是否触发

### 多渠道消息混乱

检查：
- 路由配置是否正确
- 是否使用了正确的 Agent
- 会话管理是否正常
- 记忆是否跨渠道共享了不应共享的内容

### 渠道连接频繁断开

检查：
- 网络稳定性
- Bot Token 是否被重置
- 渠道平台的 API 状态
- Webhook URL 是否有变化

## 渠道接入前检查清单

在正式启用任何渠道之前，建议逐条确认：

- [ ] Bot Token / API 密钥已通过环境变量注入
- [ ] 白名单已配置为最小可信范围
- [ ] 消息频率限制已设置
- [ ] 至少用一个 Agent 完成了渠道消息收发测试
- [ ] 渠道日志可以正常查看
- [ ] 知道如何临时禁用该渠道

## 下一步

- [渠道能力概览](/docs/manual/channels-overview)
- [Telegram 和 WhatsApp 配置](/docs/manual/telegram-and-whatsapp)
- [Discord 和 Slack 配置](/docs/manual/discord-and-slack)
- [飞书集成](/news/feishu-integration)
