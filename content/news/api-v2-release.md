---
title: "OpenClaw API v2 正式发布"
description: "OpenClaw 发布全新 API v2 版本，带来更强大的功能、更好的性能和更完善的开发者体验。"
category: 产品更新
date: "2026-03-10"
author: "OpenClaw Team"
source: "github.com/openclaw/openclaw"
updatedAt: "2026-03-13"
sourceType: github
tags: ["api", "v2", "developer", "sdk"]
---

OpenClaw API v2 正式发布！新版本带来全面升级的 API 设计、更快的响应速度和更完善的开发者工具链。

## 主要更新

### 性能提升

| 指标 | v1 | v2 | 提升 |
|------|-----|-----|------|
| 平均响应时间 | 450ms | 180ms | 60% ↓ |
| 吞吐量 | 1000 req/s | 5000 req/s | 5x |
| 连接复用 | 不支持 | 支持 | - |
| 流式响应 | 有限支持 | 完整支持 | - |

### 新功能概览

- **流式响应增强** - 完整支持 Server-Sent Events
- **批量操作** - 单次请求处理多个任务
- **异步任务** - 长时间任务异步处理
- **Webhook 增强** - 更丰富的事件订阅
- **GraphQL 支持** - 灵活的查询语言

## API 设计

### RESTful 端点

```
基础 URL: https://api.openclaw.ai/v2

端点结构:
├── /agents          # Agent 管理
├── /conversations   # 对话管理
├── /messages        # 消息操作
├── /skills          # 技能管理
├── /memories        # 记忆管理
├── /files           # 文件操作
└── /tasks           # 异步任务
```

### 认证方式

```bash
# Bearer Token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.openclaw.ai/v2/agents

# API Key
curl -H "X-API-Key: YOUR_API_KEY" \
  https://api.openclaw.ai/v2/agents
```

## 核心功能

### 1. 对话 API

#### 创建对话

```bash
POST /v2/conversations
```

```json
{
  "agentId": "agent-123",
  "context": {
    "userId": "user-456",
    "metadata": {
      "source": "mobile-app",
      "locale": "zh-CN"
    }
  },
  "settings": {
    "model": "gpt-4",
    "temperature": 0.7,
    "maxTokens": 4096
  }
}
```

响应：

```json
{
  "id": "conv-789",
  "agentId": "agent-123",
  "createdAt": "2026-03-10T10:00:00Z",
  "status": "active"
}
```

#### 发送消息

```bash
POST /v2/conversations/{id}/messages
```

```json
{
  "content": "帮我分析这份报告",
  "attachments": [
    {
      "type": "file",
      "url": "https://example.com/report.pdf"
    }
  ],
  "stream": true
}
```

#### 流式响应

```javascript
const response = await fetch('/v2/conversations/conv-789/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: '你好',
    stream: true
  })
});

const reader = response.body.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = new TextDecoder().decode(value);
  // 处理 SSE 数据
  console.log(chunk);
}
```

### 2. Agent API

#### 创建 Agent

```bash
POST /v2/agents
```

```json
{
  "name": "客服助手",
  "description": "智能客服 Agent",
  "model": "gpt-4",
  "systemPrompt": "你是一个专业的客服助手...",
  "skills": ["knowledge-base", "ticket-system"],
  "settings": {
    "temperature": 0.3,
    "maxTokens": 2048,
    "memoryEnabled": true
  }
}
```

#### Agent 配置

```json
{
  "id": "agent-123",
  "name": "客服助手",
  "model": {
    "provider": "openai",
    "name": "gpt-4",
    "settings": {
      "temperature": 0.3,
      "maxTokens": 2048
    }
  },
  "skills": [
    {
      "id": "knowledge-base",
      "enabled": true,
      "config": {
        "index": "kb-001"
      }
    }
  ],
  "memory": {
    "enabled": true,
    "type": "conversation",
    "retention": "30d"
  }
}
```

### 3. 技能 API

#### 列出技能

```bash
GET /v2/skills?category=productivity&limit=20
```

```json
{
  "skills": [
    {
      "id": "web-search",
      "name": "网页搜索",
      "version": "2.1.0",
      "category": "information",
      "description": "搜索互联网获取信息",
      "author": "openclaw",
      "downloads": 150000,
      "rating": 4.8
    }
  ],
  "pagination": {
    "total": 400,
    "page": 1,
    "limit": 20
  }
}
```

#### 安装技能

```bash
POST /v2/agents/{agentId}/skills
```

```json
{
  "skillId": "web-search",
  "version": "2.1.0",
  "config": {
    "provider": "google",
    "maxResults": 10
  }
}
```

### 4. 批量操作

```bash
POST /v2/batch
```

```json
{
  "operations": [
    {
      "method": "POST",
      "path": "/conversations",
      "body": { "agentId": "agent-1" }
    },
    {
      "method": "POST",
      "path": "/conversations/conv-1/messages",
      "body": { "content": "消息1" }
    },
    {
      "method": "POST",
      "path": "/conversations/conv-1/messages",
      "body": { "content": "消息2" }
    }
  ]
}
```

### 5. 异步任务

#### 创建任务

```bash
POST /v2/tasks
```

```json
{
  "type": "analysis",
  "input": {
    "fileUrl": "https://example.com/data.csv",
    "operations": ["summarize", "visualize"]
  },
  "callback": {
    "url": "https://your-app.com/webhook",
    "headers": {
      "X-Signature": "sha256=..."
    }
  }
}
```

#### 查询任务状态

```bash
GET /v2/tasks/{taskId}
```

```json
{
  "id": "task-123",
  "status": "completed",
  "progress": 100,
  "result": {
    "summary": "...",
    "charts": ["chart1.png", "chart2.png"]
  },
  "createdAt": "2026-03-10T10:00:00Z",
  "completedAt": "2026-03-10T10:05:00Z"
}
```

## Webhook 事件

### 支持的事件

| 事件 | 描述 |
|------|------|
| `conversation.created` | 对话创建 |
| `message.received` | 收到消息 |
| `message.sent` | 发送消息 |
| `task.completed` | 任务完成 |
| `task.failed` | 任务失败 |
| `skill.installed` | 技能安装 |
| `agent.updated` | Agent 更新 |

### Webhook 配置

```bash
POST /v2/webhooks
```

```json
{
  "url": "https://your-app.com/webhooks/openclaw",
  "events": ["message.received", "task.completed"],
  "secret": "your-webhook-secret"
}
```

### 签名验证

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return signature === `sha256=${expectedSignature}`;
}
```

## SDK 支持

### Python SDK

```bash
pip install openclaw-sdk
```

```python
from openclaw import Client

client = Client(api_key="your-api-key")

# 创建对话
conversation = client.conversations.create(
    agent_id="agent-123"
)

# 发送消息
response = client.messages.send(
    conversation_id=conversation.id,
    content="你好，请帮我分析数据",
    stream=True
)

for chunk in response:
    print(chunk.content, end="")
```

### TypeScript SDK

```bash
npm install @openclaw/sdk
```

```typescript
import { OpenClaw } from '@openclaw/sdk';

const client = new OpenClaw({ apiKey: 'your-api-key' });

// 创建 Agent
const agent = await client.agents.create({
  name: '助手',
  model: 'gpt-4',
  skills: ['web-search']
});

// 流式对话
const stream = await client.conversations.stream({
  agentId: agent.id,
  message: '你好'
});

for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}
```

### Go SDK

```bash
go get github.com/openclaw/go-sdk
```

```go
package main

import (
    "context"
    "fmt"
    "github.com/openclaw/go-sdk/openclaw"
)

func main() {
    client := openclaw.NewClient("your-api-key")
    
    conv, _ := client.Conversations.Create(context.Background(), &openclaw.ConversationRequest{
        AgentID: "agent-123",
    })
    
    resp, _ := client.Messages.Send(context.Background(), conv.ID, &openclaw.MessageRequest{
        Content: "你好",
    })
    
    fmt.Println(resp.Content)
}
```

## 迁移指南

### 从 v1 迁移

```bash
# 检查兼容性
openclaw api check-compatibility --from v1 --to v2

# 自动迁移配置
openclaw api migrate --from v1 --to v2
```

### 主要变更

| v1 | v2 | 说明 |
|-----|-----|------|
| `/chat` | `/conversations/{id}/messages` | 端点重构 |
| `session_id` | `conversation_id` | 命名统一 |
| `bot_id` | `agent_id` | 命名统一 |
| 有限流式 | 完整 SSE | 流式增强 |

## 速率限制

| 计划 | 请求/分钟 | 并发 | 批量大小 |
|------|-----------|------|----------|
| Free | 60 | 5 | 10 |
| Pro | 600 | 20 | 50 |
| Enterprise | 无限制 | 无限制 | 100 |

## 定价

| 计划 | 月费 | 包含 | 超额 |
|------|------|------|------|
| Free | $0 | 10K tokens/月 | - |
| Pro | $29 | 1M tokens/月 | $0.02/1K tokens |
| Enterprise | 定制 | 无限制 | 定制 |

## 相关资源

- [API 文档](https://docs.openclaw.ai/api/v2)
- [SDK 仓库](https://github.com/openclaw/sdk)
- [迁移指南](/docs/reference/api-migration)
- [变更日志](https://github.com/openclaw/openclaw/blob/main/CHANGELOG.md)

---

*API v2 现已上线，立即升级体验更强大的功能！*