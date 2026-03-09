---
title: "OpenClaw 飞书集成配置"
description: "了解如何将 OpenClaw 集成到飞书，实现企业协作。"
category: 渠道指南
date: "2026-03-09"
author: "OpenClaw Team"
source: "openclaw.ai"
tags: ["feishu", "lark", "channel", "enterprise", "tutorial"]
---

本文介绍如何将 OpenClaw 集成到飞书（Feishu/Lark）。

## 创建飞书应用

### 1. 创建应用

1. 访问 [飞书开放平台](https://open.feishu.cn/)
2. 创建企业应用
3. 获取 App ID 和 App Secret

### 2. 配置权限

添加以下权限：
- im:message:send_as_bot
- im:message:receive
- im:chat:readonly

### 3. 发布版本

1. 创建版本并提交
2. 等待企业管理员审核
3. 发布应用

## 配置 OpenClaw

```json
{
  "channels": {
    "feishu": {
      "appId": "YOUR_APP_ID",
      "appSecret": "YOUR_APP_SECRET",
      "allowFrom": ["USER_ID", "GROUP_ID"]
    }
  }
}
```

## 使用方式

### 群聊机器人

1. 将机器人添加到群聊
2. @机器人发送消息
3. 支持富文本消息

### 私聊

1. 搜索机器人并发起对话
2. 直接发送消息

## 消息类型

| 类型 | 说明 |
|------|------|
| text | 纯文本 |
| post | 富文本 |
| image | 图片 |
| file | 文件 |

---

*了解更多，请访问 [docs.openclaw.ai](https://docs.openclaw.ai)。*