---
title: 配置参考
description: OpenClaw 完整配置项参考文档，包含所有可配置选项的详细说明。
category: 参考
updatedAt: 2026-03-12
sourceType: official
tags: [configuration, reference, settings, options]
---

# 配置参考

这一页提供 OpenClaw 所有配置项的完整参考。配置文件默认位于 `~/.openclaw/openclaw.json`。

## 配置文件位置

| 文件 | 用途 |
|------|------|
| `~/.openclaw/openclaw.json` | 主配置文件 |
| `~/.openclaw/.env` | 环境变量（敏感信息） |
| `~/.openclaw/agents/` | Agent 配置目录 |
| `~/.openclaw/workflows/` | 工作流配置目录 |
| `~/.openclaw/skills/` | 技能配置目录 |

## 环境变量

可以通过环境变量覆盖配置：

```bash
OPENCLAW_HOME=~/.openclaw
OPENCLAW_STATE_DIR=~/.openclaw/state
OPENCLAW_CONFIG_PATH=~/.openclaw/custom-config.json
OPENCLAW_LOG_LEVEL=info
```

## 核心配置

### 基础设置

```json
{
  "version": "1.0",
  "environment": "development",
  "logLevel": "info",
  "dataDir": "~/.openclaw/data",
  "stateDir": "~/.openclaw/state"
}
```

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `version` | string | "1.0" | 配置文件版本 |
| `environment` | string | "development" | 运行环境 |
| `logLevel` | string | "info" | 日志级别 |
| `dataDir` | string | ~/.openclaw/data | 数据目录 |
| `stateDir` | string | ~/.openclaw/state | 状态目录 |

### Gateway 配置

```json
{
  "gateway": {
    "host": "0.0.0.0",
    "port": 3000,
    "baseUrl": "http://localhost:3000",
    "auth": {
      "enabled": true,
      "type": "token",
      "token": "${GATEWAY_TOKEN}",
      "allowTailscale": true
    },
    "cors": {
      "enabled": true,
      "origins": ["http://localhost:3000"]
    },
    "rateLimit": {
      "enabled": true,
      "maxRequests": 100,
      "windowMs": 60000
    }
  }
}
```

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `host` | string | "0.0.0.0" | 监听地址 |
| `port` | number | 3000 | 监听端口 |
| `baseUrl` | string | - | 外部访问 URL |
| `auth.enabled` | boolean | true | 是否启用认证 |
| `auth.type` | string | "token" | 认证类型 |
| `auth.token` | string | - | 认证令牌 |
| `auth.allowTailscale` | boolean | false | 允许 Tailscale 认证 |

## 模型配置

### 默认模型

```json
{
  "model": {
    "default": "gpt-4",
    "fallback": "gpt-3.5-turbo",
    "timeout": 60000,
    "maxRetries": 3
  }
}
```

### 提供商配置

```json
{
  "providers": {
    "openai": {
      "enabled": true,
      "apiKey": "${OPENAI_API_KEY}",
      "models": ["gpt-4", "gpt-3.5-turbo"],
      "baseUrl": "https://api.openai.com/v1"
    },
    "anthropic": {
      "enabled": true,
      "apiKey": "${ANTHROPIC_API_KEY}",
      "models": ["claude-3-opus", "claude-3-sonnet"]
    },
    "local": {
      "enabled": false,
      "baseUrl": "http://localhost:11434",
      "models": ["llama2", "mistral"]
    }
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `enabled` | boolean | 是否启用此提供商 |
| `apiKey` | string | API 密钥（建议使用环境变量） |
| `models` | array | 可用模型列表 |
| `baseUrl` | string | API 基础 URL（可选） |

### 模型策略

```json
{
  "modelStrategy": {
    "chat": "gpt-4",
    "summarization": "gpt-3.5-turbo",
    "embedding": "text-embedding-3-small",
    "fallback": {
      "enabled": true,
      "order": ["openai", "anthropic", "local"]
    }
  }
}
```

## Agent 配置

### 默认 Agent

```json
{
  "agent": {
    "default": {
      "name": "Assistant",
      "model": "gpt-4",
      "systemPrompt": "你是一个有帮助的助手。",
      "temperature": 0.7,
      "maxTokens": 4096,
      "memory": {
        "enabled": true,
        "type": "conversation",
        "maxMessages": 50
      },
      "tools": {
        "enabled": true,
        "requireApproval": ["delete", "send"]
      }
    }
  }
}
```

### Agent 配置项

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | string | "Assistant" | Agent 名称 |
| `model` | string | - | 使用的模型 |
| `systemPrompt` | string | - | 系统提示词 |
| `temperature` | number | 0.7 | 温度参数 |
| `maxTokens` | number | 4096 | 最大 token 数 |
| `memory.enabled` | boolean | true | 是否启用记忆 |
| `memory.type` | string | "conversation" | 记忆类型 |
| `memory.maxMessages` | number | 50 | 最大消息数 |
| `tools.enabled` | boolean | true | 是否启用工具 |
| `tools.requireApproval` | array | [] | 需要审批的工具 |

## 渠道配置

### Web Chat

```json
{
  "channels": {
    "webchat": {
      "enabled": true,
      "port": 3000,
      "path": "/webchat",
      "theme": "default",
      "title": "OpenClaw Chat",
      "welcomeMessage": "你好！有什么可以帮助你的？",
      "features": {
        "markdown": true,
        "codeHighlight": true,
        "fileUpload": false
      }
    }
  }
}
```

### Telegram

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "${TELEGRAM_BOT_TOKEN}",
      "allowedUsers": [],
      "allowedChats": [],
      "parseMode": "Markdown",
      "disableWebPagePreview": false
    }
  }
}
```

### Discord

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "botToken": "${DISCORD_BOT_TOKEN}",
      "clientId": "${DISCORD_CLIENT_ID}",
      "guilds": [],
      "intents": ["Guilds", "GuildMessages", "DirectMessages"],
      "prefix": "!"
    }
  }
}
```

### WhatsApp

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

### 飞书

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

## 记忆配置

```json
{
  "memory": {
    "enabled": true,
    "type": "conversation",
    "storage": "sqlite",
    "embedding": {
      "enabled": true,
      "model": "text-embedding-3-small",
      "dimensions": 1536
    },
    "search": {
      "enabled": true,
      "type": "semantic",
      "topK": 5
    },
    "retention": {
      "enabled": true,
      "maxAge": 30,
      "maxMessages": 10000
    }
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | string | 记忆类型：conversation, summary, vector |
| `storage` | string | 存储方式：sqlite, postgres, memory |
| `embedding.enabled` | boolean | 是否启用向量嵌入 |
| `search.enabled` | boolean | 是否启用记忆搜索 |
| `retention.maxAge` | number | 记忆保留天数 |

## 工具配置

```json
{
  "tools": {
    "enabled": true,
    "approvalMode": "selective",
    "requireApproval": ["delete", "send", "execute"],
    "timeout": 30000,
    "maxConcurrent": 5,
    "builtin": {
      "webSearch": {
        "enabled": true,
        "provider": "google"
      },
      "codeExecution": {
        "enabled": true,
        "sandbox": true
      },
      "fileOperations": {
        "enabled": true,
        "allowedPaths": ["~/Documents", "~/Downloads"]
      }
    }
  }
}
```

## 技能配置

```json
{
  "skills": {
    "enabled": true,
    "autoUpdate": true,
    "registry": "https://skills.openclaw.ai",
    "installed": [
      "web-search",
      "weather",
      "calculator"
    ],
    "config": {
      "web-search": {
        "provider": "google",
        "apiKey": "${GOOGLE_API_KEY}"
      }
    }
  }
}
```

## 安全配置

```json
{
  "security": {
    "encryption": {
      "enabled": true,
      "algorithm": "aes-256-gcm"
    },
    "audit": {
      "enabled": true,
      "logFile": "~/.openclaw/logs/audit.log"
    },
    "rateLimit": {
      "enabled": true,
      "maxRequests": 100,
      "windowMs": 60000
    },
    "contentFilter": {
      "enabled": true,
      "patterns": ["api-key", "password", "secret"]
    }
  }
}
```

## 日志配置

```json
{
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": ["console", "file"],
    "file": {
      "path": "~/.openclaw/logs/openclaw.log",
      "maxSize": "10m",
      "maxFiles": 5
    }
  }
}
```

## 完整配置示例

```json
{
  "version": "1.0",
  "environment": "production",
  "logLevel": "info",
  
  "gateway": {
    "host": "0.0.0.0",
    "port": 3000,
    "auth": {
      "enabled": true,
      "token": "${GATEWAY_TOKEN}"
    }
  },
  
  "model": {
    "default": "gpt-4",
    "fallback": "gpt-3.5-turbo"
  },
  
  "providers": {
    "openai": {
      "apiKey": "${OPENAI_API_KEY}"
    }
  },
  
  "agent": {
    "default": {
      "model": "gpt-4",
      "memory": {
        "enabled": true
      }
    }
  },
  
  "channels": {
    "webchat": {
      "enabled": true
    },
    "telegram": {
      "enabled": true,
      "botToken": "${TELEGRAM_BOT_TOKEN}"
    }
  },
  
  "memory": {
    "enabled": true
  },
  
  "tools": {
    "enabled": true
  },
  
  "skills": {
    "enabled": true
  }
}
```

## 下一步

- [API 参考](/docs/reference/api-reference-overview)
- [故障排除](/docs/reference/troubleshooting)
- [安全最佳实践](/docs/operations/openclaw-security-best-practices)