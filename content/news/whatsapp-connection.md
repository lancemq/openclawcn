---
title: "OpenClaw WhatsApp 连接完全指南"
description: "详细了解如何将 WhatsApp 连接到 OpenClaw，包括配对、安全配置和常见问题解决。"
category: 渠道指南
date: "2026-03-09"
author: "OpenClaw Team"
source: "openclaw.ai"
tags: ["whatsapp", "channel", "baileys", "tutorial"]
---

本文详细介绍如何将 WhatsApp 连接到 OpenClaw。

## 前置要求

- OpenClaw Gateway 已运行
- WhatsApp 账户
- 已安装 OpenClaw CLI

## 连接步骤

### 1. 启动配对

```bash
openclaw channels login whatsapp
```

### 2. 扫描二维码

命令执行后会显示二维码，使用 WhatsApp 扫描配对。

### 3. 验证连接

```bash
openclaw channels status whatsapp
```

## 安全配置

### 白名单配置

```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+15555550123", "+15555550124"]
    }
  }
}
```

### 群组配置

```json
{
  "channels": {
    "whatsapp": {
      "groups": {
        "*": {
          "requireMention": true
        }
      }
    }
  }
}
```

## 常见问题

### 二维码无法扫描

- 检查网络连接
- 确保 WhatsApp 已登录
- 尝试重新生成二维码

### 消息发送失败

- 检查白名单配置
- 确认账户状态
- 查看日志详情

---

*了解更多渠道配置，请访问 [docs.openclaw.ai](https://docs.openclaw.ai)。*