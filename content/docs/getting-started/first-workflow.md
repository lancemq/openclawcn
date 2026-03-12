---
title: 创建第一个工作流
description: 学习如何使用 OpenClaw 的工作流功能，实现自动化任务处理。
category: 入门
updatedAt: 2026-03-12
sourceType: official
tags: [workflow, automation, quickstart, tutorial]
---

# 创建第一个工作流

工作流 (Workflow) 让 OpenClaw 能够自动化执行一系列任务。这一页带你理解工作流的概念、创建方式，以及如何让工作流真正提升效率。

## 工作流是什么

工作流是一系列预定义的步骤，在特定条件下自动执行。比如：

- **每日摘要** - 每天早上自动汇总昨天的消息和任务
- **消息转发** - 将特定类型的消息自动转发到其他渠道
- **数据处理** - 定时获取数据、处理并生成报告
- **提醒系统** - 根据条件发送提醒通知

工作流的核心要素：

| 要素 | 说明 |
|------|------|
| 触发器 | 启动工作流的条件 |
| 步骤 | 工作流执行的动作序列 |
| 条件 | 控制执行路径的判断逻辑 |
| 输出 | 工作流的结果 |

## 创建简单工作流

### 通过 Control UI 创建

1. 打开 `openclaw dashboard`
2. 进入 Workflows 页面
3. 点击 "Create Workflow"
4. 配置触发器和步骤

### 通过配置文件创建

工作流配置文件位于 `~/.openclaw/workflows/`：

```json
{
  "id": "daily-summary",
  "name": "每日摘要",
  "description": "每天早上生成昨日活动摘要",
  "trigger": {
    "type": "schedule",
    "cron": "0 8 * * *"
  },
  "steps": [
    {
      "id": "collect-messages",
      "type": "action",
      "action": "getMessages",
      "params": {
        "timeRange": "yesterday"
      }
    },
    {
      "id": "generate-summary",
      "type": "ai",
      "prompt": "根据以下消息生成一份简洁的每日摘要：\n{{collect-messages.result}}"
    },
    {
      "id": "send-notification",
      "type": "action",
      "action": "sendMessage",
      "params": {
        "channel": "telegram",
        "message": "{{generate-summary.result}}"
      }
    }
  ]
}
```

## 触发器类型

### 定时触发

```json
{
  "trigger": {
    "type": "schedule",
    "cron": "0 8 * * *"
  }
}
```

常用 cron 表达式：

| 表达式 | 含义 |
|--------|------|
| `0 8 * * *` | 每天早上 8 点 |
| `0 9 * * 1` | 每周一早上 9 点 |
| `0 0 1 * *` | 每月 1 号 |
| `*/30 * * * *` | 每 30 分钟 |

### 事件触发

```json
{
  "trigger": {
    "type": "event",
    "event": "message.received",
    "filter": {
      "channel": "telegram",
      "contains": "urgent"
    }
  }
}
```

### 手动触发

```json
{
  "trigger": {
    "type": "manual"
  }
}
```

### Webhook 触发

```json
{
  "trigger": {
    "type": "webhook",
    "path": "/webhook/custom",
    "method": "POST"
  }
}
```

## 步骤类型

### AI 步骤

使用 AI 模型处理内容：

```json
{
  "id": "analyze",
  "type": "ai",
  "model": "gpt-4",
  "prompt": "分析以下内容的情感倾向：\n{{input.text}}",
  "output": "sentiment"
}
```

### 动作步骤

执行预定义动作：

```json
{
  "id": "send-email",
  "type": "action",
  "action": "sendEmail",
  "params": {
    "to": "user@example.com",
    "subject": "每日报告",
    "body": "{{generate-report.result}}"
  }
}
```

### 条件步骤

根据条件分支执行：

```json
{
  "id": "check-priority",
  "type": "condition",
  "conditions": [
    {
      "if": "{{message.priority}} == 'high'",
      "then": ["notify-urgent"]
    },
    {
      "if": "{{message.priority}} == 'normal'",
      "then": ["queue-normal"]
    }
  ],
  "default": ["queue-low"]
}
```

### 循环步骤

遍历处理数据：

```json
{
  "id": "process-items",
  "type": "loop",
  "over": "{{data.items}}",
  "steps": [
    {
      "id": "process-item",
      "type": "action",
      "action": "processItem",
      "params": {
        "item": "{{loop.current}}"
      }
    }
  ]
}
```

## 实用工作流示例

### 自动回复工作流

```json
{
  "id": "auto-reply",
  "name": "智能自动回复",
  "trigger": {
    "type": "event",
    "event": "message.received",
    "filter": {
      "hours": { "outside": "9-18" }
    }
  },
  "steps": [
    {
      "id": "classify",
      "type": "ai",
      "prompt": "判断这条消息是否需要立即回复：\n{{message.text}}\n\n回复 yes 或 no"
    },
    {
      "id": "check-urgent",
      "type": "condition",
      "conditions": [
        {
          "if": "{{classify.result}} == 'yes'",
          "then": ["reply-urgent"]
        }
      ],
      "default": ["reply-later"]
    },
    {
      "id": "reply-urgent",
      "type": "action",
      "action": "sendMessage",
      "params": {
        "channel": "{{message.channel}}",
        "message": "收到您的消息，我会尽快处理。"
      }
    },
    {
      "id": "reply-later",
      "type": "action",
      "action": "sendMessage",
      "params": {
        "channel": "{{message.channel}}",
        "message": "感谢您的消息，我会在工作时间回复您。"
      }
    }
  ]
}
```

### 数据收集工作流

```json
{
  "id": "data-collection",
  "name": "每日数据收集",
  "trigger": {
    "type": "schedule",
    "cron": "0 6 * * *"
  },
  "steps": [
    {
      "id": "fetch-analytics",
      "type": "action",
      "action": "httpRequest",
      "params": {
        "url": "https://api.example.com/analytics",
        "method": "GET"
      }
    },
    {
      "id": "process-data",
      "type": "ai",
      "prompt": "根据以下数据生成简报：\n{{fetch-analytics.result}}"
    },
    {
      "id": "save-report",
      "type": "action",
      "action": "saveFile",
      "params": {
        "path": "/reports/daily-{{date}}.md",
        "content": "{{process-data.result}}"
      }
    },
    {
      "id": "notify",
      "type": "action",
      "action": "sendMessage",
      "params": {
        "channel": "telegram",
        "message": "每日报告已生成：{{process-data.result}}"
      }
    }
  ]
}
```

## 管理工作流

### 查看工作流

```bash
# 列出所有工作流
openclaw workflows list

# 查看工作流详情
openclaw workflows show daily-summary

# 查看执行历史
openclaw workflows history daily-summary
```

### 手动执行

```bash
# 立即执行工作流
openclaw workflows run daily-summary

# 带参数执行
openclaw workflows run daily-summary --param date=2026-03-12
```

### 启用/禁用

```bash
# 禁用工作流
openclaw workflows disable daily-summary

# 启用工作流
openclaw workflows enable daily-summary
```

## 调试工作流

### 测试模式

```bash
# 测试运行（不执行实际动作）
openclaw workflows test daily-summary --dry-run

# 查看详细日志
openclaw workflows test daily-summary --verbose
```

### 日志查看

```bash
# 查看工作流日志
openclaw workflows logs daily-summary

# 实时监控
openclaw workflows logs daily-summary --follow
```

## 最佳实践

### 1. 保持简单

每个工作流专注于单一目标，避免过于复杂的逻辑。

### 2. 添加错误处理

```json
{
  "steps": [
    {
      "id": "risky-action",
      "type": "action",
      "action": "externalApi",
      "onError": {
        "retry": 3,
        "fallback": "notify-error"
      }
    }
  ]
}
```

### 3. 使用变量

```json
{
  "variables": {
    "reportPath": "/reports/{{date}}",
    "recipients": ["user1@example.com", "user2@example.com"]
  }
}
```

### 4. 记录执行

```json
{
  "logging": {
    "enabled": true,
    "level": "info",
    "includeSteps": true
  }
}
```

## 常见问题

### 工作流不执行

检查：
- 触发器配置是否正确
- 工作流是否已启用
- 时区设置是否正确

### 步骤执行失败

检查：
- 参数是否正确
- 依赖服务是否可用
- 查看错误日志

### 性能问题

优化建议：
- 减少不必要的步骤
- 使用并行执行
- 缓存重复计算

## 下一步

- [自动化工作流最佳实践](/best-practices/automation-workflows)
- [工具配置指南](/docs/manual/tools-overview)
- [Hooks 概述](/docs/manual/hooks-overview)