---
title: 记忆系统配置与使用
description: 深入了解 OpenClaw 的记忆系统，包括短期记忆、长期记忆和上下文管理。
category: 进阶指南
difficulty: 中高级
---

# 记忆系统配置与使用

本文详细介绍 OpenClaw 的记忆系统。

## 记忆类型

### 短期记忆

- 当前会话上下文
- 最近 N 条消息
- 临时变量

### 长期记忆

- 用户偏好设置
- 历史交互记录
- 知识库

### 持久记忆

- 跨会话记忆
- 用户画像
- 技能知识

## 配置选项

### 基本配置

```json
{
  "memory": {
    "short_term": {
      "max_messages": 20,
      "window_tokens": 8000
    },
    "long_term": {
      "enabled": true,
      "storage": "local",
      "retention": "90d"
    }
  }
}
```

## 记忆操作

### 保存记忆

```python
# 保存用户偏好
await memory.save(
    key="user_preference",
    value={
        "language": "zh-CN",
        "notifications": True,
        "theme": "dark"
    },
    scope="user",
    user_id="user123"
)
```

### 读取记忆

```python
# 读取用户偏好
preference = await memory.get(
    key="user_preference",
    scope="user",
    user_id="user123"
)
```

### 搜索记忆

```python
# 搜索相关记忆
results = await memory.search(
    query="上次说的项目",
    scope="user",
    user_id="user123",
    limit=5
)
```

## 上下文管理

### 会话上下文

```python
# 设置会话上下文
session.context = {
    "task": "数据分析",
    "data_source": "sales_2024",
    "goal": "生成月度报告"
}

# 获取上下文
task = session.context.get("task")
```

### 上下文窗口

```json
{
  "context": {
    "window_strategy": "sliding",
    "max_tokens": 16000,
    "priority": "recent"
  }
}
```

## 用户画像

### 创建画像

```python
user_profile = {
    "id": "user123",
    "name": "张三",
    "role": "工程师",
    "interests": ["技术", "AI", "编程"],
    "preferences": {
        "response_style": "简洁",
        "detail_level": "详细"
    },
    "history": {
        "total_conversations": 150,
        "topics": ["Python", "AI", "DevOps"]
    }
}

await memory.save_profile(user_profile)
```

### 使用画像

```python
# 获取用户画像
profile = await memory.get_profile("user123")

# 根据画像调整响应
if profile.preferences.detail_level == "详细":
    response = await generate_detailed_response(query)
else:
    response = await generate_brief_response(query)
```

## 知识库

### 添加知识

```python
knowledge = {
    "id": "project_alpha",
    "content": "Project Alpha 是一个 AI 项目...",
    "tags": ["AI", "项目", "2024"],
    "source": "documentation"
}

await memory.add_knowledge(knowledge)
```

### 查询知识

```python
# 基于语义搜索
results = await memory.search_knowledge(
    query="AI 项目相关信息",
    tags=["AI", "项目"],
    limit=10
)
```

## 记忆策略

### 自动摘要

```python
@memory.event("session_end")
async def summarize_session(session):
    # 提取关键信息
    summary = await summarize(session.messages)
    
    # 保存摘要
    await memory.save(
        key=f"session_summary_{session.id}",
        value=summary,
        scope="long_term"
    )
```

### 记忆衰减

```json
{
  "memory": {
    "decay": {
      "enabled": true,
      "importance_threshold": 0.3,
      "decay_rate": 0.1
    }
  }
}
```

## 隐私控制

### 数据隔离

```json
{
  "memory": {
    "isolation": {
      "user_data_separated": true,
      "encryption_at_rest": true,
      "export_control": true
    }
  }
}
```

### 数据删除

```python
# 删除用户所有记忆
await memory.delete_all(user_id="user123")

# 删除特定记忆
await memory.delete(key="preference", user_id="user123")
```

## 下一步

- [核心能力总览](/docs/manual/core-capabilities)
- [API 参考](/docs/reference/api-reference-overview)
- [安全配置](/docs/operations/safety-basics)