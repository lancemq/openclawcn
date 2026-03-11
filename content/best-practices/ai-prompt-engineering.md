---
title: AI 提示词工程指南
description: 优化与 AI 助手的交互效果，包括提示词技巧、角色设定和上下文管理。
category: 进阶指南
difficulty: 初级
updatedAt: 2026-03-11
sourceType: third-party
tags: [prompting, context, workflow, ai]
---

# AI 提示词工程指南

本文介绍如何优化与 OpenClaw AI 助手的交互效果。

## 提示词基础

### 结构化提示

```python
# 好的提示词结构
prompt = """
角色：你是一位专业的技术顾问
任务：帮助用户解决编程问题
要求：
1. 提供清晰的解释
2. 包含代码示例
3. 给出最佳实践

问题：{user_question}
"""
```

### 上下文提供

```python
# 提供足够的上下文
prompt = """
当前项目：电商网站后端
技术栈：Python, FastAPI, PostgreSQL
问题：用户登录接口返回 500 错误
"""
```

## 提示词技巧

### 明确指令

```python
# ❌ 模糊
"帮我写个函数"

# ✅ 明确
"写一个 Python 函数，接受用户 ID 返回用户信息，使用 FastAPI 框架，返回 JSON 格式"
```

### 分步指令

```python
# 复杂任务分步
prompt = """
步骤 1：分析数据结构
步骤 2：设计 API 接口
步骤 3：实现代码
步骤 4：添加单元测试
"""
```

## 角色设定

### 系统角色

```json
{
  "system": {
    "role": "技术作家",
    "tone": "专业但易懂",
    "expertise": ["软件开发", "AI", "云计算"]
  }
}
```

### 场景角色

```python
# 编程助手
role = "你是一位资深软件工程师，擅长 Python 和 JavaScript"

# 生活助手
role = "你是一位贴心的生活助手，善于提供实用建议"

# 学习导师
role = "你是一位耐心的老师，善于用简单的方式解释复杂概念"
```

## 上下文管理

### 会话上下文

```python
# 保持上下文
async def continue_conversation():
    # 引用之前的对话
    context = """
    之前我们讨论了用户认证问题，
    你提到使用 JWT 进行令牌管理。
    现在我想了解如何实现刷新令牌。
    """
```

### 知识引用

```python
# 引用知识库
prompt = """
基于知识库中的最佳实践，
请帮我设计一个缓存策略。
"""
```

## 常见场景

### 代码审查

```python
review_prompt = """
请审查以下代码：
1. 检查潜在 bug
2. 指出性能问题
3. 建议改进方案

代码：
{code}
"""
```

### 问题排查

```python
debug_prompt = """
错误信息：{error_message}
当前代码：
{code}
请分析可能的原因并提供解决方案。
"""
```

## 下一步

- [核心能力总览](/docs/manual/core-capabilities)
- [记忆系统](/best-practices/memory-management)
- [API 参考](/docs/reference/api-reference-overview)
