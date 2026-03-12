---
title: 创建第一个 Agent
description: 从零开始创建你的第一个 OpenClaw Agent，理解 Agent 的基本概念和配置方式。
category: 入门
updatedAt: 2026-03-12
sourceType: official
tags: [agent, quickstart, tutorial, basics]
---

# 创建第一个 Agent

完成 OpenClaw 安装和 onboarding 后，下一步就是创建你的第一个 Agent。这一页会带你理解 Agent 是什么、如何创建、以及如何让它真正"动起来"。

## Agent 是什么

在 OpenClaw 里，Agent 可以理解为一个"有身份、有记忆、能调用工具"的助手实例。它不是单纯的聊天窗口，而是：

- 有自己的名字和角色设定
- 能记住之前的对话上下文
- 可以调用你配置的工具和技能
- 能接入不同的消息渠道

一个 OpenClaw 实例可以运行多个 Agent，每个 Agent 可以有不同的配置和能力。

## 创建 Agent 的最简方式

最简单的方式是通过 Control UI 创建：

1. 打开 dashboard：`openclaw dashboard`
2. 进入 Agents 页面
3. 点击"Create New Agent"
4. 填写基本信息

### 基本配置项

```json
{
  "name": "我的助手",
  "description": "一个简单的个人助手",
  "model": "gpt-4",
  "systemPrompt": "你是一个友好的个人助手，帮助用户处理日常任务。"
}
```

这些是最基础的配置，创建后 Agent 就可以开始对话了。

## 通过配置文件创建

如果你更喜欢用配置文件管理，可以直接编辑 `~/.openclaw/agents/` 目录：

```text
~/.openclaw/agents/
├── default.json
├── work-assistant.json
└── study-buddy.json
```

一个完整的 Agent 配置示例：

```json
{
  "id": "work-assistant",
  "name": "工作助手",
  "description": "帮助处理工作相关的任务",
  "model": "gpt-4",
  "systemPrompt": "你是一个专业的工作助手。你的职责是：
1. 帮助整理工作思路
2. 起草邮件和文档
3. 提醒重要事项
4. 回答工作相关问题",
  "skills": ["calendar", "email", "notes"],
  "memory": {
    "enabled": true,
    "type": "conversation"
  },
  "tools": {
    "enabled": true,
    "requireApproval": ["delete", "send"]
  }
}
```

## 让 Agent 有能力

创建 Agent 只是第一步。让 Agent 真正有用，需要给它配置能力：

### 添加技能 (Skills)

技能是预定义的能力模块：

```json
{
  "skills": [
    "web-search",      // 网页搜索
    "weather",         // 天气查询
    "calculator",      // 计算器
    "translator"       // 翻译
  ]
}
```

### 添加工具 (Tools)

工具是 Agent 可以调用的外部能力：

```json
{
  "tools": [
    {
      "name": "read_file",
      "description": "读取本地文件内容",
      "type": "local"
    },
    {
      "name": "send_email",
      "description": "发送邮件",
      "type": "api",
      "requireApproval": true
    }
  ]
}
```

### 配置记忆

记忆让 Agent 能记住之前的对话：

```json
{
  "memory": {
    "enabled": true,
    "type": "conversation",
    "maxTokens": 4000,
    "includeSystemPrompt": true
  }
}
```

## 测试你的 Agent

创建后，先在本地测试：

### 通过 Control UI 测试

1. 在 Agents 列表找到你的 Agent
2. 点击进入对话界面
3. 尝试一些基本问题
4. 观察回复是否符合预期

### 通过 CLI 测试

```bash
# 列出所有 Agent
openclaw agents list

# 与特定 Agent 对话
openclaw chat --agent work-assistant

# 检查 Agent 状态
openclaw agent status work-assistant
```

## 常见问题

### Agent 不回复或回复很慢

检查：
- 模型配置是否正确
- API 密钥是否有效
- 网络连接是否正常

### Agent 没有记忆

检查：
- `memory.enabled` 是否为 `true`
- 记忆类型是否正确配置
- 是否有足够的 token 预算

### 技能不生效

检查：
- 技能是否正确安装
- 配置中技能名称是否正确
- 是否有必要的 API 密钥

## 下一步

- [技能系统详解](/docs/manual/skills-system)
- [工具配置指南](/docs/manual/tools-overview)
- [记忆系统说明](/docs/manual/memory-system)
- [接入消息渠道](/docs/manual/channels-overview)