---
title: 添加第一个技能
description: 学习如何为 OpenClaw Agent 添加和配置技能，让助手具备更多能力。
category: 入门
updatedAt: 2026-03-12
sourceType: official
tags: [skills, quickstart, tutorial, basics]
---

# 添加第一个技能

技能 (Skills) 是 OpenClaw 的核心能力扩展机制。这一页带你理解技能是什么、如何添加、以及如何让技能真正发挥作用。

## 技能是什么

技能是预定义的能力模块，让 Agent 能够执行特定类型的任务。比如：

- **网页搜索** - 让 Agent 能搜索互联网获取最新信息
- **天气查询** - 让 Agent 能查询天气信息
- **文件操作** - 让 Agent 能读写本地文件
- **代码执行** - 让 Agent 能运行代码片段

技能与工具的区别：
- **技能** - 预定义的能力包，开箱即用
- **工具** - 更底层的原子能力，需要更多配置

## 技能市场

OpenClaw 有一个丰富的技能市场，目前已有 **349+** 开源技能可供使用。

### 浏览可用技能

```bash
# 列出所有可用技能
openclaw skills list

# 搜索特定技能
openclaw skills search weather

# 查看技能详情
openclaw skills info web-search
```

### 通过 Control UI 浏览

1. 打开 `openclaw dashboard`
2. 进入 Skills 页面
3. 浏览分类或搜索关键词
4. 查看技能评分和使用量

## 安装技能

### 通过 CLI 安装

```bash
# 安装官方技能
openclaw skills install web-search

# 安装社区技能
openclaw skills install community/weather-alert

# 从本地路径安装
openclaw skills install ./my-custom-skill
```

### 通过配置文件

在 Agent 配置中添加：

```json
{
  "skills": [
    "web-search",
    "weather",
    "calculator"
  ]
}
```

## 配置技能

很多技能需要额外配置才能正常工作：

### API 密钥配置

```json
{
  "skills": {
    "web-search": {
      "provider": "google",
      "apiKey": "${GOOGLE_SEARCH_API_KEY}",
      "searchEngineId": "${SEARCH_ENGINE_ID}"
    }
  }
}
```

### 环境变量方式

推荐使用环境变量管理敏感信息：

```bash
# ~/.openclaw/.env
GOOGLE_SEARCH_API_KEY=your-api-key
SEARCH_ENGINE_ID=your-engine-id
```

然后在配置中引用：

```json
{
  "skills": {
    "web-search": {
      "apiKey": "${GOOGLE_SEARCH_API_KEY}"
    }
  }
}
```

## 常用技能推荐

### 信息获取类

| 技能 | 用途 | 难度 |
|------|------|------|
| web-search | 网页搜索 | 简单 |
| weather | 天气查询 | 简单 |
| wikipedia | 维基百科查询 | 简单 |
| news | 新闻获取 | 简单 |

### 生产力类

| 技能 | 用途 | 难度 |
|------|------|------|
| calendar | 日历管理 | 中等 |
| email | 邮件处理 | 中等 |
| notes | 笔记管理 | 简单 |
| tasks | 任务管理 | 简单 |

### 开发者类

| 技能 | 用途 | 难度 |
|------|------|------|
| code-exec | 代码执行 | 中等 |
| github | GitHub 操作 | 中等 |
| docker | Docker 管理 | 高级 |
| database | 数据库操作 | 高级 |

## 创建自定义技能

如果现有技能不能满足需求，可以创建自定义技能：

### 技能结构

```
my-skill/
├── skill.json       # 技能元数据
├── prompt.md        # 提示词模板
├── tools.json       # 工具定义
└── examples/        # 示例对话
    └── example1.md
```

### skill.json 示例

```json
{
  "name": "my-custom-skill",
  "version": "1.0.0",
  "description": "我的自定义技能",
  "author": "your-name",
  "tools": ["tool1", "tool2"],
  "prompts": ["prompt.md"],
  "examples": ["examples/example1.md"]
}
```

### 提示词模板

```markdown
# My Custom Skill

你是一个专业的助手，擅长处理以下任务：

1. 任务类型 A
2. 任务类型 B

当用户请求帮助时，你应该：
- 首先理解用户的具体需求
- 提供清晰、结构化的回答
- 必要时使用可用工具
```

## 测试技能

安装技能后，测试是否正常工作：

```bash
# 测试特定技能
openclaw skills test web-search --query "今天的新闻"

# 检查技能状态
openclaw skills status

# 查看技能日志
openclaw skills logs web-search
```

## 技能管理

### 更新技能

```bash
# 更新单个技能
openclaw skills update web-search

# 更新所有技能
openclaw skills update --all
```

### 禁用技能

```bash
# 临时禁用
openclaw skills disable web-search

# 重新启用
openclaw skills enable web-search
```

### 卸载技能

```bash
openclaw skills uninstall web-search
```

## 常见问题

### 技能安装失败

检查：
- 网络连接是否正常
- 技能名称是否正确
- 是否有必要的权限

### 技能不工作

检查：
- 配置是否正确
- API 密钥是否有效
- 查看技能日志排查问题

### 技能冲突

如果多个技能有重叠功能：
- 检查技能优先级配置
- 考虑只保留必要的技能
- 使用技能分组管理

## 下一步

- [技能系统详解](/docs/manual/skills-system)
- [自定义技能开发](/best-practices/skill-development-advanced)
- [工具配置指南](/docs/manual/tools-overview)
- [技能市场浏览](https://skills.openclaw.ai)