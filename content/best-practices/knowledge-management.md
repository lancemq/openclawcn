---
title: 知识库管理
description: 构建和管理 OpenClaw 知识库，包括知识导入、检索和更新。
category: 进阶指南
difficulty: 中级
updatedAt: 2026-03-11
sourceType: third-party
tags: [knowledge, retrieval, memory, content]
---

# 知识库管理

本文介绍 OpenClaw 知识库的管理和使用。

## 知识库概念

### 什么是知识库

知识库是 OpenClaw 的长期记忆系统：
- 存储结构化知识
- 支持语义搜索
- 持续学习和更新

## 知识导入

### 导入文档

```bash
# 导入 Markdown 文件
openclaw knowledge import --type markdown --path ./docs/

# 导入 PDF 文件
openclaw knowledge import --type pdf --path ./documents/

# 导入网页
openclaw knowledge import --type web --url https://example.com/docs
```

### 导入格式

```json
{
  "knowledge": [
    {
      "id": "doc1",
      "title": "OpenClaw 入门指南",
      "content": "OpenClaw 是一个...",
      "tags": ["入门", "基础"],
      "source": "manual"
    }
  ]
}
```

## 知识检索

### 语义搜索

```python
# 语义搜索
results = await knowledge.search(
    query="如何安装 OpenClaw",
    limit=5,
    threshold=0.8
)
```

### 过滤搜索

```python
# 按标签过滤
results = await knowledge.search(
    query="配置",
    tags=["进阶", "高级"],
    limit=10
)
```

## 知识更新

### 自动更新

```json
{
  "knowledge": {
    "auto_update": {
      "enabled": true,
      "schedule": "0 2 * * *",
      "sources": ["github", "web"]
    }
  }
}
```

### 手动更新

```bash
# 更新知识
openclaw knowledge update --id doc1 --content "新内容"

# 删除知识
openclaw knowledge delete --id doc1
```

## 知识分类

### 分类管理

```bash
# 创建分类
openclaw knowledge category create --name "开发指南"

# 添加知识到分类
openclaw knowledge add --category "开发指南" --file guide.md
```

## 下一步

- [记忆系统](/best-practices/memory-management)
- [技能开发](/best-practices/skills-development)
- [API 参考](/docs/reference/api-reference-overview)
