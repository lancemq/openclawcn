---
title: 企业级安全配置
description: 企业环境中的安全配置最佳实践，包括 SSO、审计和合规性。
category: 企业部署
difficulty: 高级
updatedAt: 2026-03-11
sourceType: third-party
tags: [enterprise, security, sso, compliance]
---

# 企业级安全配置

本文介绍企业环境中的安全配置。

## SSO 集成

### SAML 配置

```json
{
  "auth": {
    "saml": {
      "enabled": true,
      "idp_metadata": "https://idp.example.com/metadata",
      "sp_entity_id": "openclaw.example.com",
      "attribute_mapping": {
        "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
        "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      }
    }
  }
}
```

### OAuth 配置

```json
{
  "auth": {
    "oauth": {
      "providers": [
        {
          "name": "google",
          "client_id": "${GOOGLE_CLIENT_ID}",
          "client_secret": "${GOOGLE_CLIENT_SECRET}"
        },
        {
          "name": "azure",
          "client_id": "${AZURE_CLIENT_ID}",
          "client_secret": "${AZURE_CLIENT_SECRET}"
        }
      ]
    }
  }
}
```

## 审计日志

### 审计配置

```json
{
  "audit": {
    "enabled": true,
    "retention": "365d",
    "events": [
      "login",
      "logout",
      "message_sent",
      "message_received",
      "config_changed",
      "skill_executed"
    ]
  }
}
```

### 审计查询

```bash
# 查询登录事件
openclaw audit query --event login --since 7d

# 查询配置变更
openclaw audit query --event config_changed --user admin
```

## 合规性

### 数据加密

```json
{
  "security": {
    "encryption": {
      "at_rest": {
        "enabled": true,
        "algorithm": "AES-256-GCM"
      },
      "in_transit": {
        "enabled": true,
        "min_tls": "1.2"
      }
    }
  }
}
```

### 访问控制

```json
{
  "security": {
    "access_control": {
      "ip_whitelist": ["10.0.0.0/8"],
      "ip_blacklist": ["192.168.1.100"],
      "mfa_required": true
    }
  }
}
```

## 下一步

- [安全配置基础](/docs/operations/safety-basics)
- [企业部署](/news/enterprise-deployment)
- [安全加固](/best-practices/security-hardening)
