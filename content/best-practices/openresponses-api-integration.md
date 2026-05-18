---
title: OpenResponses API 接入与第三方集成
description: 把 OpenClaw Gateway 当成 OpenAI 兼容的 API 后端使用，让第三方应用和工具链直接调用你的自托管 Agent 能力。
category: 集成开发
difficulty: 中级
updatedAt: "2026-05-18"
source: https://docs.openclaw.ai/gateway/open-responses
sourceName: OpenClaw Docs
sourceType: official
tags: [api, integration, openresponses, openai-compatible, gateway]
---

# OpenResponses API 接入与第三方集成

OpenClaw 不只是聊天渠道的中转站。通过 OpenResponses API，你的 Gateway 可以变成一个 OpenAI 兼容的 API 服务端，让第三方应用、脚本、甚至其他 AI 工具直接调用你自托管的 Agent 能力。

这篇指南会帮你理解这个能力能做什么、怎么启用、以及常见的接入模式。

## 什么是 OpenResponses API

OpenResponses 是 OpenClaw Gateway 提供的一套 HTTP API，设计目标是：

- **兼容 OpenAI 的 Responses API 格式** - 已有支持 OpenAI 的工具可以直接切过来
- **暴露 Agent 能力** - 不只是纯模型调用，还能触发技能、工具和工作流
- **保持自托管优势** - 数据不经过第三方，全部在你的 Gateway 上处理

简单说，它让 OpenClaw 从 "一个聊天机器人" 变成了 "一个可编程的 AI 后端"。

## 启用 OpenResponses API

### 基础配置

在 Gateway 配置里启用：

```json
{
  "gateway": {
    "openResponses": {
      "enabled": true,
      "port": 8080,
      "auth": {
        "type": "bearer",
        "token": {
          "$secretRef": "OPENRESPONSES_API_TOKEN"
        }
      }
    }
  }
}
```

关键参数：

- `port` - API 监听端口，默认 8080
- `auth.type` - 认证方式，支持 `bearer`、`none`（不推荐生产环境）
- `auth.token` - Bearer token，建议用 SecretRef

### 启动验证

配置完成后重启 Gateway：

```bash
openclaw gateway restart
```

验证 API 是否可用：

```bash
curl http://localhost:8080/v1/responses \
  -H "Authorization: Bearer $OPENRESPONSES_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "default-agent",
    "input": "Hello from API"
  }'
```

如果返回正常响应，说明 OpenResponses 已启用。

## 核心 API 用法

### 发起对话

```bash
curl http://localhost:8080/v1/responses \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "work-assistant",
    "input": "帮我总结今天的未读邮件",
    "tools": ["email_reader"]
  }'
```

注意这里的 `model` 参数实际上是 Agent ID。OpenClaw 会把请求路由到对应的 Agent。

### 流式响应

和 OpenAI 一样，支持 SSE 流式输出：

```bash
curl http://localhost:8080/v1/responses \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "default-agent",
    "input": "写一段 Python 代码读取 CSV",
    "stream": true
  }'
```

### 多轮对话

通过 `previous_response_id` 保持上下文：

```bash
# 第一轮
curl http://localhost:8080/v1/responses \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "default-agent",
    "input": "北京今天天气怎么样"
  }'

# 假设返回的 response id 是 resp_abc123

# 第二轮
curl http://localhost:8080/v1/responses \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "default-agent",
    "input": "那明天呢",
    "previous_response_id": "resp_abc123"
  }'
```

## 常见接入场景

### 场景一：把 OpenClaw 接进内部工具

如果你的内部系统已经支持 OpenAI API，切换成本几乎为零：

```python
import openai

client = openai.OpenAI(
    base_url="http://your-gateway:8080/v1",
    api_key="your-openclaw-token"
)

response = client.responses.create(
    model="work-assistant",
    input="分析这份销售数据",
    tools=[{"type": "data_analyzer"}]
)
```

### 场景二：让另一个 AI 应用调用 OpenClaw

某些支持自定义 API 端点的 AI 客户端（如某些 Obsidian 插件、VS Code 扩展），可以直接指向你的 Gateway：

```
API Base URL: http://your-gateway:8080/v1
API Key: your-openclaw-token
Model: default-agent
```

### 场景三：自动化脚本和工作流

用 OpenResponses API 把 OpenClaw 接入自动化流程：

```bash
#!/bin/bash
# daily-report.sh

REPORT=$(curl -s http://localhost:8080/v1/responses \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "data-assistant",
    "input": "生成昨日数据摘要"
  }' | jq -r '.output[0].content[0].text')

echo "$REPORT" | mail -s "Daily Report" team@company.com
```

## 安全配置要点

### 网络隔离

OpenResponses API 默认监听在所有网络接口上。生产环境建议：

```json
{
  "gateway": {
    "openResponses": {
      "enabled": true,
      "host": "127.0.0.1",
      "port": 8080
    }
  }
}
```

只监听 localhost，然后通过反向代理（Nginx/Caddy）暴露，这样可以加 TLS 和 IP 白名单。

### Token 管理

- 每个集成方使用独立的 token
- 定期轮换
- 用 SecretRef 管理，不要写死在配置里

### 请求限流

防止单个客户端耗尽 Gateway 资源：

```json
{
  "gateway": {
    "openResponses": {
      "rateLimit": {
        "requestsPerMinute": 60,
        "requestsPerHour": 1000
      }
    }
  }
}
```

## 与渠道能力的区别

| 接入方式 | 适合场景 | 用户感知 |
|----------|----------|----------|
| 聊天渠道 (WhatsApp/Telegram) | 人机对话 | 用户在聊天应用里 |
| OpenResponses API | 程序调用 | 用户无感知，结果是数据 |
| Control UI | 管理和调试 | 管理员在浏览器里 |

OpenResponses 的核心价值是：让 OpenClaw 的能力可以被代码调用，而不只是被人聊天触发。

## 排障

### API 返回 401 Unauthorized

- 检查 Bearer token 是否正确
- 检查 SecretRef 是否解析成功（`openclaw secrets status`）
- 检查 token 是否过期或已被轮换

### API 返回 404 Not Found

- 确认 `openResponses.enabled` 为 true
- 确认 Gateway 已重启
- 检查 URL 路径是否正确（`/v1/responses`）

### 请求成功但 Agent 没有触发工具

- 检查 Agent 配置中是否启用了对应工具
- 检查 `tools` 参数是否在请求体中正确传递
- 查看 Gateway 日志确认工具调用是否被识别

### 流式响应断开

- 检查反向代理的超时设置（Nginx 默认 60s）
- 长响应建议增加 `proxy_read_timeout`

## 下一步

- [HTTP API vs Gateway WebSocket vs SDK](/docs/reference/http-api-vs-gateway-websocket-vs-sdk)
- [远程访问与 Gateway 配置](/docs/operations/remote-access)
- [Secrets 管理与生产环境密钥安全](/best-practices/secrets-management-production)
