---
title: 通知系统配置
description: 配置 OpenClaw 的通知系统，包括邮件、短信、推送和 Webhook 通知。
category: 运维管理
difficulty: 中级
---

# 通知系统配置

本文介绍 OpenClaw 通知系统的配置和使用。

## 通知渠道

### 邮件通知

```json
{
  "notifications": {
    "email": {
      "enabled": true,
      "smtp": {
        "host": "smtp.example.com",
        "port": 587,
        "secure": true,
        "auth": {
          "user": "notifications@example.com",
          "password": "${SMTP_PASSWORD}"
        }
      },
      "from": "OpenClaw <notifications@example.com>",
      "to": ["admin@example.com"]
    }
  }
}
```

### 短信通知

```json
{
  "notifications": {
    "sms": {
      "enabled": true,
      "provider": "twilio",
      "account_sid": "${TWILIO_SID}",
      "auth_token": "${TWILIO_TOKEN}",
      "from": "+15555550123",
      "to": ["+15555550124"]
    }
  }
}
```

### 推送通知

```json
{
  "notifications": {
    "push": {
      "enabled": true,
      "provider": "apns",
      "key_id": "${APNS_KEY_ID}",
      "team_id": "${APNS_TEAM_ID}",
      "bundle_id": "ai.openclaw.app"
    }
  }
}
```

## 通知类型

### 系统通知

```json
{
  "notifications": {
    "system": {
      "gateway_down": {
        "enabled": true,
        "channels": ["email", "sms"],
        "severity": "critical"
      },
      "disk_space_low": {
        "enabled": true,
        "channels": ["email"],
        "threshold": "10%"
      },
      "new_version": {
        "enabled": true,
        "channels": ["email"]
      }
    }
  }
}
```

### 渠道通知

```json
{
  "notifications": {
    "channels": {
      "channel_connected": {
        "enabled": true,
        "channels": ["email"]
      },
      "channel_disconnected": {
        "enabled": true,
        "channels": ["email", "sms"],
        "severity": "high"
      }
    }
  }
}
```

## 自定义通知

### 创建通知规则

```python
from openclaw.notifications import NotificationRule

rule = NotificationRule(
    name="high_error_rate",
    condition="errors_total / requests_total > 0.1",
    channels=["email", "slack"],
    template="error_alert"
)

# 注册规则
NotificationManager.register(rule)
```

### 通知模板

```json
{
  "notifications": {
    "templates": {
      "error_alert": {
        "subject": "⚠️ OpenClaw 错误告警",
        "body": """
错误率: {{error_rate}}
时间: {{timestamp}}
详情: {{details}}
        """
      },
      "channel_down": {
        "subject": "🔴 渠道断开: {{channel}}",
        "body": """
渠道: {{channel}}
状态: {{status}}
最后活跃: {{last_active}}
        """
      }
    }
  }
}
```

## Webhook 通知

### 配置 Webhook

```json
{
  "notifications": {
    "webhook": {
      "enabled": true,
      "url": "https://your-server.com/webhook",
      "events": ["error", "channel_status", "backup_complete"],
      "secret": "${WEBHOOK_SECRET}"
    }
  }
}
```

### Webhook 格式

```json
{
  "event": "error",
  "timestamp": "2026-03-09T10:00:00Z",
  "data": {
    "type": "error",
    "message": "Gateway 连接失败",
    "details": {...}
  }
}
```

## 下一步

- [安全配置](/docs/operations/safety-basics)
- [故障排除](/docs/reference/troubleshooting)
- [监控配置](/best-practices/performance-tuning)