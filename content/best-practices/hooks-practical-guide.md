---
title: Hooks 实战指南
description: 通过实际案例学习 OpenClaw Hooks 的使用，包括消息处理、自动化触发、内容过滤和外部集成。
category: 实践
difficulty: 中级
updatedAt: 2026-03-13
sourceType: official
tags: [hooks, automation, workflows, integration]
---

# Hooks 实战指南

Hooks 是 OpenClaw 中最强大的自动化扩展点之一。通过 Hooks，你可以在系统的关键节点插入自定义逻辑，实现消息处理、自动化触发、内容过滤等功能。

## Hooks 能做什么

| 场景 | Hook 类型 | 说明 |
|------|-----------|------|
| 消息预处理 | pre-process | 在模型处理前修改或过滤消息 |
| 响应后处理 | post-process | 在发送响应前修改内容 |
| 事件触发 | event-trigger | 基于特定事件执行动作 |
| 外部集成 | webhook | 与外部系统对接 |
| 内容审计 | content-filter | 过滤敏感内容或添加水印 |

## Hook 配置基础

### 基本配置结构

```json
{
  "hooks": {
    "enabled": true,
    "token": "your-secure-token",
    "path": "/hooks",
    "mappings": [
      {
        "match": { "path": "gmail" },
        "action": "agent",
        "agentId": "main",
        "deliver": true
      }
    ]
  }
}
```

### Hook 类型说明

```json
{
  "hooks": {
    "entries": {
      "my-hook": {
        "enabled": true,
        "type": "pre-process",
        "handler": "./hooks/my-hook.js",
        "priority": 10
      }
    }
  }
}
```

## 实战案例

### 案例 1：消息预处理 - 添加时间戳

在每条消息前自动添加时间戳：

```javascript
// hooks/timestamp-hook.js
module.exports = {
  name: 'timestamp-hook',
  type: 'pre-process',

  async execute(context) {
    const { message } = context
    const now = new Date().toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai'
    })

    // 在消息前添加时间戳
    message.content = `[${now}] ${message.content}`

    return { success: true, message }
  }
}
```

配置：

```json
{
  "hooks": {
    "entries": {
      "timestamp": {
        "enabled": true,
        "type": "pre-process",
        "handler": "./hooks/timestamp-hook.js"
      }
    }
  }
}
```

### 案例 2：响应后处理 - 添加签名

在每条回复后自动添加签名：

```javascript
// hooks/signature-hook.js
module.exports = {
  name: 'signature-hook',
  type: 'post-process',

  async execute(context) {
    const { response } = context
    const signature = '\n\n---\n*由 OpenClaw 助手提供*'

    // 检查是否是文本响应
    if (response.content && typeof response.content === 'string') {
      response.content += signature
    }

    return { success: true, response }
  }
}
```

### 案例 3：敏感词过滤

过滤消息中的敏感词：

```javascript
// hooks/content-filter.js
const sensitiveWords = ['敏感词1', '敏感词2', '敏感词3']

module.exports = {
  name: 'content-filter',
  type: 'pre-process',

  async execute(context) {
    const { message } = context
    let content = message.content

    // 替换敏感词
    for (const word of sensitiveWords) {
      const regex = new RegExp(word, 'gi')
      content = content.replace(regex, '***')
    }

    message.content = content
    message.filtered = true

    return { success: true, message }
  }
}
```

### 案例 4：Webhook 集成 - 发送到外部服务

将消息发送到外部服务：

```json
{
  "hooks": {
    "enabled": true,
    "token": "webhook-secret-token",
    "path": "/hooks",
    "mappings": [
      {
        "match": { "path": "notify" },
        "action": "webhook",
        "url": "https://api.example.com/notify",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer ${WEBHOOK_TOKEN}",
          "Content-Type": "application/json"
        }
      }
    ]
  }
}
```

### 案例 5：定时任务触发

配置定时执行的任务：

```json
{
  "cron": {
    "enabled": true,
    "entries": [
      {
        "id": "daily-report",
        "schedule": "0 9 * * *",
        "action": "agent",
        "agentId": "main",
        "message": "请生成今日工作简报"
      },
      {
        "id": "weekly-summary",
        "schedule": "0 18 * * 5",
        "action": "webhook",
        "url": "https://api.example.com/weekly-summary"
      }
    ]
  }
}
```

### 案例 6：条件触发 - 关键词监控

监控特定关键词并触发动作：

```javascript
// hooks/keyword-monitor.js
const keywords = ['紧急', '重要', 'ASAP', 'urgent']
const notifyUrl = process.env.NOTIFY_URL

module.exports = {
  name: 'keyword-monitor',
  type: 'pre-process',

  async execute(context) {
    const { message } = context
    const content = message.content.toLowerCase()

    // 检查关键词
    const found = keywords.filter(kw =>
      content.includes(kw.toLowerCase())
    )

    if (found.length > 0) {
      // 发送通知
      await fetch(notifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: found,
          message: message.content,
          timestamp: new Date().toISOString()
        })
      })

      message.priority = 'high'
    }

    return { success: true, message }
  }
}
```

### 案例 7：渠道路由 - 多 Agent 分发

根据消息来源路由到不同的 Agent：

```json
{
  "bindings": [
    {
      "agentId": "work-agent",
      "match": {
        "channel": "slack",
        "channelId": "work-channel-id"
      }
    },
    {
      "agentId": "personal-agent",
      "match": {
        "channel": "telegram",
        "accountId": "personal-account"
      }
    },
    {
      "agentId": "support-agent",
      "match": {
        "channel": "discord",
        "guildId": "support-guild-id"
      }
    }
  ]
}
```

### 案例 8：消息转换 - 格式适配

将消息转换为特定格式：

```javascript
// hooks/format-adapter.js
module.exports = {
  name: 'format-adapter',
  type: 'post-process',

  async execute(context) {
    const { response, channel } = context

    // 根据渠道转换格式
    if (channel === 'telegram') {
      // Telegram Markdown 格式
      response.content = convertToTelegramMarkdown(response.content)
    } else if (channel === 'discord') {
      // Discord 格式
      response.content = convertToDiscordFormat(response.content)
    }

    return { success: true, response }
  }
}

function convertToTelegramMarkdown(text) {
  // 转换逻辑
  return text
    .replace(/\*\*(.+?)\*\*/g, '*$1*')
    .replace(/__(.+?)__/g, '_$1_')
}

function convertToDiscordFormat(text) {
  // 转换逻辑
  return text
    .replace(/\*(.+?)\*/g, '_$1_')
}
```

## 高级配置

### Hook 链式执行

多个 Hook 按优先级顺序执行：

```json
{
  "hooks": {
    "entries": {
      "filter": {
        "enabled": true,
        "type": "pre-process",
        "handler": "./hooks/filter.js",
        "priority": 1
      },
      "transform": {
        "enabled": true,
        "type": "pre-process",
        "handler": "./hooks/transform.js",
        "priority": 2
      },
      "log": {
        "enabled": true,
        "type": "pre-process",
        "handler": "./hooks/log.js",
        "priority": 3
      }
    }
  }
}
```

### 条件匹配

使用条件控制 Hook 执行：

```json
{
  "hooks": {
    "entries": {
      "work-hours-only": {
        "enabled": true,
        "type": "pre-process",
        "handler": "./hooks/work-hours.js",
        "condition": {
          "time": {
            "start": "09:00",
            "end": "18:00",
            "timezone": "Asia/Shanghai"
          },
          "days": ["monday", "tuesday", "wednesday", "thursday", "friday"]
        }
      }
    }
  }
}
```

### 错误处理

配置 Hook 错误处理策略：

```json
{
  "hooks": {
    "entries": {
      "my-hook": {
        "enabled": true,
        "handler": "./hooks/my-hook.js",
        "errorHandling": {
          "strategy": "continue",  // continue | stop | fallback
          "fallback": "./hooks/fallback.js",
          "retry": {
            "maxAttempts": 3,
            "delay": 1000
          }
        }
      }
    }
  }
}
```

## 调试与监控

### 启用 Hook 日志

```json
{
  "hooks": {
    "enabled": true,
    "logging": {
      "enabled": true,
      "level": "debug",
      "includePayload": true
    }
  }
}
```

### 查看 Hook 状态

```bash
# 列出所有 Hooks
openclaw hooks list

# 查看特定 Hook 详情
openclaw hooks info my-hook

# 测试 Hook
openclaw hooks test my-hook --input '{"message": "test"}'

# 查看 Hook 日志
openclaw logs --filter hooks
```

## 最佳实践

### 1. 保持 Hook 简单

每个 Hook 只做一件事：

```
✅ 好：一个 Hook 过滤敏感词，另一个 Hook 添加签名
❌ 差：一个 Hook 同时做过滤、转换、签名
```

### 2. 使用优先级控制执行顺序

```json
{
  "hooks": {
    "entries": {
      "validation": { "priority": 1 },   // 先验证
      "transform": { "priority": 10 },   // 再转换
      "logging": { "priority": 100 }     // 最后记录
    }
  }
}
```

### 3. 处理异步操作

```javascript
// 正确处理异步
async execute(context) {
  try {
    const result = await fetchData()
    return { success: true, data: result }
  } catch (error) {
    console.error('Hook error:', error)
    return { success: false, error: error.message }
  }
}
```

### 4. 避免阻塞操作

```javascript
// ❌ 阻塞操作
function execute(context) {
  const data = syncFetch(url)  // 阻塞
  return { success: true, data }
}

// ✅ 非阻塞操作
async function execute(context) {
  const data = await fetch(url)  // 非阻塞
  return { success: true, data }
}
```

### 5. 设置合理的超时

```json
{
  "hooks": {
    "entries": {
      "external-api": {
        "enabled": true,
        "handler": "./hooks/api.js",
        "timeout": 5000
      }
    }
  }
}
```

## 常见问题

### Hook 不执行

1. 检查 `hooks.enabled` 是否为 `true`
2. 检查 Hook 的 `enabled` 字段
3. 检查条件匹配是否正确
4. 查看日志确认错误信息

### Hook 执行顺序错误

1. 检查 `priority` 设置
2. 数字越小优先级越高
3. 相同优先级按字母顺序执行

### Hook 超时

1. 增加 `timeout` 设置
2. 优化 Hook 逻辑
3. 使用异步操作

## 下一步

- [Hooks 概览](/docs/manual/hooks-overview)
- [自定义技能开发](/best-practices/custom-skill-development)
- [自动化工作流](/best-practices/automation-workflows)
- [配置参考](/docs/reference/configuration-reference)