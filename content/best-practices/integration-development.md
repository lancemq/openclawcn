---
title: API 集成与二次开发
description: 使用 OpenClaw API 进行二次开发，包括 REST API、WebSocket 和扩展开发。
category: 开发指南
difficulty: 中高级
---

# API 集成与二次开发

本文介绍 OpenClaw API 的使用和二次开发方法。

## API 概述

### API 类型

| 类型 | 说明 | 用途 |
|------|------|------|
| REST API | HTTP 接口 | 管理和配置 |
| WebSocket | 实时通信 | 聊天和事件 |
| CLI | 命令行 | 运维管理 |

### 基础 URL

```
本地：http://127.0.0.1:18789
远程：https://openclaw.tail-scale.ts.net
```

## REST API

### 认证

```bash
# 使用 Token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://127.0.0.1:18789/api/status

# 使用环境变量
export OPENCLAW_TOKEN=YOUR_TOKEN
curl http://127.0.0.1:18789/api/status
```

### 常用接口

#### 获取状态

```bash
GET /api/status

# 响应
{
  "status": "running",
  "version": "2026.3.7",
  "uptime": 3600,
  "channels": {
    "telegram": "connected",
    "whatsapp": "connected"
  }
}
```

#### 发送消息

```bash
POST /api/chat
Content-Type: application/json

{
  "message": "你好",
  "channel": "telegram",
  "user_id": "user123"
}

# 响应
{
  "response": "你好！有什么可以帮助你的？",
  "session_id": "sess_abc123"
}
```

#### 管理会话

```bash
# 获取会话列表
GET /api/sessions

# 获取会话历史
GET /api/sessions/{session_id}/history

# 发送消息到会话
POST /api/sessions/{session_id}/send
{
  "message": "继续"
}
```

### Python SDK

```python
from openclaw import OpenClaw

client = OpenClaw(
    token="YOUR_TOKEN",
    base_url="http://127.0.0.1:18789"
)

# 发送消息
response = client.chat.send(
    message="你好",
    channel="telegram"
)

# 获取状态
status = client.status.get()

# 管理技能
skills = client.skills.list()
```

## WebSocket API

### 连接

```python
import asyncio
import websockets

async def connect():
    uri = "ws://127.0.0.1:18789/ws"
    async with websockets.connect(uri) as ws:
        # 认证
        await ws.send({
            "type": "auth",
            "token": "YOUR_TOKEN"
        })
        
        # 接收消息
        async for message in ws:
            print(message)

asyncio.run(connect())
```

### 消息格式

```json
{
  "type": "message",
  "data": {
    "content": "你好",
    "channel": "telegram",
    "user_id": "user123"
  }
}
```

### 事件类型

| 事件 | 说明 |
|------|------|
| message | 收到消息 |
| response | AI 响应 |
| error | 错误 |
| typing | 正在输入 |
| presence | 状态变化 |

## 二次开发

### 创建自定义渠道

```python
from openclaw.channels import BaseChannel

class MyChannel(BaseChannel):
    name = "my_channel"
    
    async def connect(self):
        # 连接逻辑
        pass
    
    async def send(self, message):
        # 发送消息
        pass
    
    async def receive(self):
        # 接收消息
        pass
    
    async def disconnect(self):
        # 断开连接
        pass

# 注册渠道
ChannelRegistry.register(MyChannel)
```

### 创建自定义工具

```python
from openclaw.tools import BaseTool

class MyTool(BaseTool):
    name = "my_tool"
    description = "自定义工具"
    
    async def execute(self, params):
        # 执行逻辑
        result = do_something(params)
        return result
    
    def validate(self, params):
        # 参数验证
        return validate_params(params)

# 注册工具
ToolRegistry.register(MyTool)
```

### 创建自定义代理

```python
from openclaw.agents import BaseAgent

class MyAgent(BaseAgent):
    name = "my_agent"
    model = "claude-3-5-sonnet"
    
    async def process(self, message):
        # 处理消息
        response = await self.llm.chat(message)
        return response
    
    async def on_session_start(self, session):
        # 会话开始
        pass
    
    async def on_session_end(self, session):
        # 会话结束
        pass

# 注册代理
AgentRegistry.register(MyAgent)
```

## Webhook

### 配置 Webhook

```json
{
  "webhooks": {
    "enabled": true,
    "url": "https://your-server.com/webhook",
    "events": ["message", "session_start", "session_end"],
    "secret": "your_secret"
  }
}
```

### Webhook 处理

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    data = request.json
    event_type = data.get('type')
    
    if event_type == 'message':
        handle_message(data['data'])
    elif event_type == 'session_start':
        handle_session_start(data['data'])
    
    return jsonify({'status': 'ok'})

def handle_message(message):
    print(f"收到消息: {message['content']}")
```

## 扩展开发

### 扩展结构

```
my-extension/
├── extension.yaml
├── src/
│   ├── __init__.py
│   ├── channel.py
│   ├── tool.py
│   └── agent.py
└── tests/
```

### extension.yaml

```yaml
name: my-extension
version: 1.0.0
description: 我的自定义扩展

components:
  channels:
    - src/channel.py
  tools:
    - src/tool.py
  agents:
    - src/agent.py
```

## 下一步

- [API 参考](/docs/reference/api-reference-overview)
- [技能开发](/best-practices/skills-development)
- [安全配置](/docs/operations/safety-basics)