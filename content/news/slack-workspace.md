---
title: "OpenClaw Slack 工作区集成"
description: "了解如何将 OpenClaw 集成到 Slack 工作区，实现团队协作。"
category: 渠道指南
date: "2026-03-09"
author: "OpenClaw Team"
source: "openclaw.ai"
updatedAt: "2026-03-11"
sourceType: official
tags: ["slack", "workspace", "channel", "tutorial"]
---

本文介绍如何将 OpenClaw 集成到 Slack 工作区。

## 创建 Slack 应用

### 1. 创建应用

1. 访问 [Slack API](https://api.slack.com/apps)
2. 点击 "Create New App"
3. 选择 "From scratch"
4. 设置应用名称和工作区

### 2. 配置权限

添加以下 OAuth Scope：
- chat:write
- channels:read
- users:read
- app_mentions:read

### 3. 安装应用

1. 转到 "Install to Workspace"
2. 授权应用
3. 获取 Bot User OAuth Token

## 配置 OpenClaw

```json
{
  "channels": {
    "slack": {
      "token": "xoxb-YOUR-TOKEN",
      "signingSecret": "YOUR-SECRET",
      "allowFrom": ["CHANNEL_ID"]
    }
  }
}
```

## 使用方式

### @ 提及

在频道中 @OpenClaw 即可触发：

```
@OpenClaw 帮我查一下今天的会议安排
```

### DM 私信

可以直接发送私信给 Bot

## 工作区模式

```json
{
  "channels": {
    "slack": {
      "workspaceMode": true,
      "defaultAgent": "team-assistant"
    }
  }
}
```

---

*了解更多，请访问 [docs.openclaw.ai](https://docs.openclaw.ai)。*
