---
title: 创建第一个工作流
description: 学习如何使用 OpenClaw 的工作流功能，实现自动化任务处理。
category: 入门
updatedAt: 2026-05-26
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

### 工作流 vs 技能 vs Agent

这三个概念容易混淆，它们的区别是：

| 概念 | 类比 | 视角 |
|------|------|------|
| Agent | 员工 | 谁在工作 |
| 技能 | 能力 | 会做什么 |
| 工作流 | 流程 | 怎么完成 |

工作流不替代 Agent 和技能，而是在它们之上编排执行路径。

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

### 创建工作流的最佳顺序

建议按这个节奏创建第一个工作流：

1. **先在 CLI 中手动执行各步骤**，确认每个动作都能独立运行
2. **组装成工作流配置**，用 dry-run 模式验证流程逻辑
3. **用手动触发器跑一次**，观察输出是否符合预期
4. **再切换到定时或事件触发**，让它自动执行
5. **持续观察执行日志**，完善错误处理

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
| `0 */2 * * *` | 每 2 小时 |

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

### 触发器选择建议

| 任务类型 | 推荐触发器 | 原因 |
|---------|-----------|------|
| 固定时间执行 | schedule (cron) | 最确定、最可靠 |
| 响应外部事件 | event | 实时性最好 |
| 外部系统调用 | webhook | 集成灵活 |
| 测试和调试 | manual | 不依赖外部条件 |

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

### 步骤编排原则

组合多个步骤时，注意这些原则：

- **线性优先**：能用直线步骤完成的，不要引入分支
- **渐进复杂**：从 2-3 步的简单工作流开始，积累经验后再增加条件分支
- **单一出口**：每个工作流应该只有少数几个明确的结果输出点
- **变量一致**：步骤间的变量命名保持统一风格，方便追踪数据流

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

### 信息监控工作流

```json
{
  "id": "price-monitor",
  "name": "价格监控告警",
  "trigger": {
    "type": "schedule",
    "cron": "0 */6 * * *"
  },
  "steps": [
    {
      "id": "fetch-price",
      "type": "action",
      "action": "httpRequest",
      "params": {
        "url": "https://api.example.com/price",
        "method": "GET"
      }
    },
    {
      "id": "check-threshold",
      "type": "condition",
      "conditions": [
        {
          "if": "{{fetch-price.result.price}} < {{threshold.min}}",
          "then": ["alert-low"]
        },
        {
          "if": "{{fetch-price.result.price}} > {{threshold.max}}",
          "then": ["alert-high"]
        }
      ],
      "default": ["log-normal"]
    },
    {
      "id": "alert-low",
      "type": "action",
      "action": "sendMessage",
      "params": {
        "channel": "telegram",
        "message": "价格低于阈值：当前 {{fetch-price.result.price}}"
      }
    },
    {
      "id": "alert-high",
      "type": "action",
      "action": "sendMessage",
      "params": {
        "channel": "telegram",
        "message": "价格高于阈值：当前 {{fetch-price.result.price}}"
      }
    },
    {
      "id": "log-normal",
      "type": "action",
      "action": "saveFile",
      "params": {
        "path": "/logs/price-{{date}}.log",
        "content": "正常价格：{{fetch-price.result.price}}"
      }
    }
  ],
  "variables": {
    "threshold": {
      "min": 80,
      "max": 120
    }
  }
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

### 调试策略

工作流出问题时，按这个顺序排查：

1. **检查工作流是否已启用** — `openclaw workflows list` 查看状态
2. **用 dry-run 模式运行** — 不执行实际动作，验证逻辑
3. **查看执行历史** — 最近一次执行失败在了哪一步
4. **查看详细日志** — 失败的步骤返回了什么错误信息
5. **在 sandbox 中测试步骤** — 单独执行有问题的动作，确认参数和依赖正常

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

### 5. 幂等设计

工作流应该是幂等的——多次执行同一工作流不应产生重复或冲突的结果。设计时注意：

- 定时任务执行前，先检查上一次的结果是否已经处理完成
- 数据写入操作使用"检查是否存在"前置条件
- 消息推送使用去重标识

### 6. 从简单开始逐步复杂化

创建第一个工作流时，建议的复杂度演进路径：

1. **2 步线性工作流**：一个动作 + 一个结果输出
2. **3-4 步线性工作流**：获取数据 + 处理 + 保存 + 通知
3. **带条件分支**：在处理步骤后添加条件判断
4. **带循环步骤**：处理列表数据
5. **多工作流协作**：一个工作流触发另一个工作流

不要在第一个工作流中就把所有功能都用上。

## 工作流反模式

| 反模式 | 问题 | 正确做法 |
|-------|------|---------|
| 一个工作流做所有事 | 排查困难、失败影响面大 | 每个工作流只做一件事 |
| 不设错误处理 | 一步失败整个工作流中断 | 为关键步骤加 retry 和 fallback |
| 硬编码敏感信息 | 凭据泄露风险 | 使用环境变量或 secrets 管理 |
| 忽略执行频率限制 | API 限流或系统过载 | 评估外部服务的调用限制 |
| 没有日志记录 | 出问题时无法回溯 | 开启日志记录和关键步骤输出 |
| 条件分支太深 | 工作流逻辑难以理解和维护 | 拆分为多个工作流或简化条件 |
| 过度依赖 AI 步骤 | 结果不稳定、成本不可控 | 能用 action 完成的不用 AI |

### 反模式示例：一个工作流试图做所有事

```json
{
  "id": "do-everything",
  "name": "万能工作流",
  "steps": ["fetch-data", "process", "analyze", "save", "email", "notify", "backup", "cleanup", "report"]
}
```

这个工作流的问题：任何一个步骤失败都会阻塞后续所有步骤，难以定位问题，改动一个步骤影响全局。应拆分为多个独立工作流。

## 工作流测试策略

### 测试金字塔

```
     /\
    /  \        手动验证（生产环境观察）
   /    \
  /      \      dry-run 测试（逻辑验证）
 /________\
   单元测试（独立测试每个步骤）
```

### 测试步骤

1. **单独测试每个步骤**：确认各动作和 AI 步骤能独立运行
2. **dry-run 验证流程**：确认步骤间的数据传递正确
3. **手动触发完整执行**：在实际环境中运行一次，观察每个步骤的输出
4. **异常场景测试**：故意让某一步骤失败，检查错误处理是否生效
5. **持续观察**：工作流上线后，至少观察前 3 次执行是否稳定

## 生产化注意事项

当工作流准备投入生产环境时，额外注意这些：

- **执行时间窗口**：定时触发器考虑时区设置，避免在系统维护窗口执行
- **并发限制**：如果工作流可能被频繁触发，设置并发执行限制
- **资源清理**：定期清理工作流的临时文件和中间结果
- **监控告警**：工作流连续失败时应通过消息渠道通知管理员
- **版本管理**：重要工作流变更前先备份当前配置
- **回滚方案**：新版本工作流出问题时，能快速切回旧版本

## 工作流设计检查清单

在创建或修改任何工作流之前，逐条确认：

- [ ] 工作流的职责是否聚焦在一件事上
- [ ] 关键步骤是否有错误处理和重试机制
- [ ] 敏感信息是否通过环境变量注入
- [ ] 日志是否已开启，级别是否合适
- [ ] 是否已经用 dry-run 验证过流程逻辑
- [ ] 触发器的时间/条件配置是否准确
- [ ] 是否已告知相关人员工作流的生效时间

## 常见问题

### 工作流不执行

检查：
- 触发器配置是否正确
- 工作流是否已启用
- 时区设置是否正确
- Gateway 是否在运行

### 步骤执行失败

检查：
- 参数是否正确
- 依赖服务是否可用
- 查看错误日志
- API Key 或凭据是否有效

### 性能问题

优化建议：
- 减少不必要的步骤
- 使用并行执行
- 缓存重复计算
- 避免在 AI 步骤中传递过长上下文

### 工作流重复执行

检查：
- 触发器是否被多次配置
- 事件触发是否产生了重复事件
- 工作流的幂等设计是否有缺陷

### 工作流结果不符合预期

检查：
- AI 步骤的 prompt 是否足够精确
- 条件步骤的判断逻辑是否正确
- 步骤间的变量引用是否匹配

## 下一步

- [自动化工作流最佳实践](/best-practices/automation-workflows)
- [工具配置指南](/docs/manual/tools-overview)
- [Hooks 概述](/docs/manual/hooks-overview)
