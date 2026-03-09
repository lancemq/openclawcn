---
title: OpenClaw 安全加固指南
description: 生产环境中 OpenClaw 的安全加固最佳实践，包括认证、授权和网络配置。
category: 安全配置
difficulty: 高级
---

# OpenClaw 安全加固指南

本文介绍生产环境中 OpenClaw 的安全加固措施。

## 认证配置

### Token 认证

```json
{
  "gateway": {
    "auth": {
      "mode": "token",
      "token": "${OPENCLAW_GATEWAY_TOKEN}",
      "token_expiry": "90d"
    }
  }
}
```

### 密码认证

```json
{
  "gateway": {
    "auth": {
      "mode": "password",
      "password": "${OPENCLAW_PASSWORD}",
      "min_length": 12,
      "require_special": true
    }
  }
}
```

### 多因素认证

```json
{
  "gateway": {
    "auth": {
      "mode": "mfa",
      "methods": ["totp", "sms"],
      "trusted_devices": 5
    }
  }
}
```

## 授权控制

### 基于角色的访问

```json
{
  "authorization": {
    "roles": {
      "admin": {
        "permissions": ["*"]
      },
      "user": {
        "permissions": ["chat", "read"]
      },
      "guest": {
        "permissions": ["chat"]
      }
    }
  }
}
```

### 技能权限

```json
{
  "skills": {
    "permissions": {
      "network": {
        "allowed_domains": ["api.example.com"],
        "blocked_domains": ["*.evil.com"]
      },
      "filesystem": {
        "allowed_paths": ["/data/openclaw"],
        "max_size": "100MB"
      },
      "commands": {
        "allowed": ["git", "npm", "pnpm"],
        "denied": ["rm -rf", "sudo"]
      }
    }
  }
}
```

## 网络安全

### 绑定地址

```json
{
  "gateway": {
    "bind": "127.0.0.1",
    "port": 18789,
    "allowed_ips": ["127.0.0.1", "10.0.0.0/8"]
  }
}
```

### TLS 配置

```json
{
  "gateway": {
    "tls": {
      "enabled": true,
      "cert": "/path/to/cert.pem",
      "key": "/path/to/key.pem",
      "min_version": "1.2"
    }
  }
}
```

### 防火墙规则

```bash
# 只允许本地和内网访问
iptables -A INPUT -p tcp --dport 18789 -s 127.0.0.1 -j ACCEPT
iptables -A INPUT -p tcp --dport 18789 -s 10.0.0.0/8 -j ACCEPT
iptables -A INPUT -p tcp --dport 18789 -j DROP
```

## 渠道安全

### WhatsApp 安全

```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+15555550123", "+15555550124"],
      "require_encryption": true,
      "max_message_length": 4096
    }
  }
}
```

### Telegram 安全

```json
{
  "channels": {
    "telegram": {
      "allowed_users": ["user_id_1", "user_id_2"],
      "group_mode": "mention_only",
      "bot_commands": ["/start", "/help", "/status"]
    }
  }
}
```

## 审计日志

### 启用审计

```json
{
  "audit": {
    "enabled": true,
    "level": "detailed",
    "retention": "180d",
    "events": [
      "authentication",
      "authorization",
      "channel_access",
      "skill_execution",
      "data_access"
    ]
  }
}
```

### 日志格式

```json
{
  "audit": {
    "format": "json",
    "output": "file",
    "path": "/var/log/openclaw/audit.log",
    "rotate": {
      "max_size": "100MB",
      "max_files": 10
    }
  }
}
```

## 数据保护

### 加密存储

```json
{
  "storage": {
    "encryption": {
      "enabled": true,
      "algorithm": "AES-256-GCM",
      "key_rotation": "30d"
    }
  }
}
```

### 敏感数据

```json
{
  "security": {
    "mask_sensitive": true,
    "patterns": [
      "\\d{4}-\\d{4}-\\d{4}-\\d{4}",  # 信用卡
      "sk-[a-zA-Z0-9]+",  # API Key
      "password[=:]\\S+"  # 密码
    ]
  }
}
```

## 入侵检测

### 异常检测

```json
{
  "security": {
    "intrusion_detection": {
      "enabled": true,
      "failed_auth_threshold": 5,
      "rate_limit": {
        "requests_per_minute": 60,
        "burst": 10
      }
    }
  }
}
```

### 告警配置

```json
{
  "alerts": {
    "channels": ["email", "slack"],
    "rules": [
      {
        "event": "failed_auth",
        "threshold": 3,
        "action": "notify"
      },
      {
        "event": "suspicious_activity",
        "action": "block"
      }
    ]
  }
}
```

## 定期安全检查

### 检查清单

```bash
# 1. 检查认证配置
openclaw doctor --auth

# 2. 检查开放端口
netstat -tlnp | grep openclaw

# 3. 检查日志异常
openclaw logs --anomaly

# 4. 检查证书过期
openclaw cert check

# 5. 检查更新
openclaw update check
```

## 下一步

- [安全配置基础](/docs/operations/safety-basics)
- [故障排除](/docs/reference/troubleshooting)
- [运维监控](/docs/operations/release-tracking)