---
title: 创建第一个 Agent
description: 从零开始创建你的第一个 OpenClaw Agent，理解 Agent 的基本概念和配置方式。
category: 入门
updatedAt: 2026-05-26
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

### Agent 与 Gateway 的关系

理解 Agent 和 Gateway 的区别是关键：

- **Gateway** 是整个系统的运行中枢，负责接收请求、路由、调用模型和管理状态
- **Agent** 是运行在 Gateway 之上的具体助手实例，决定"谁在工作"

简单说：Gateway 是引擎，Agent 是驾驶这辆引擎的司机。

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

### 创建后的验证

创建完成后，建议做这些检查：

- 在 Agents 列表中能看到新创建的 Agent
- 在对话界面中能发送消息并收到回复
- Agent 回复的内容与你设定的 systemPrompt 一致

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

### 能力配置的先后顺序

给 Agent 加能力时，建议按这个顺序逐步添加：

1. 先配好基础模型和 systemPrompt
2. 添加 1-2 个最核心的技能，测试是否生效
3. 确认记忆功能按预期工作
4. 再逐步添加工具和其他技能
5. 最后接入渠道

不要一口气把所有能力都配上去。每加一个能力就验证一次，这样出问题时能更快定位。

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

### 测试检查清单

完成基础测试后，逐条确认：

- [ ] Agent 能正确理解并执行 systemPrompt 中的指令
- [ ] 配置的技能能在对话中被正确触发
- [ ] 记忆功能生效，上下轮对话能衔接
- [ ] 如果配置了工具，工具调用正常返回结果
- [ ] 多个 Agent 之间不互相干扰

## Agent 设计模式

在实际使用中，几种常见的 Agent 设计模式值得了解：

### 通用助手型

一个 Agent 处理所有日常需求。适合个人使用场景。

```json
{
  "name": "通用助手",
  "systemPrompt": "你是一个通用的个人助手，帮助用户处理日常任务。",
  "skills": ["web-search", "weather", "notes", "calendar"]
}
```

### 角色分离型

按职责拆分为多个 Agent，每个负责特定领域。

```json
{
  "agents": {
    "work-assistant": {
      "name": "工作助手",
      "systemPrompt": "专注工作相关任务，包括邮件、文档和项目管理。",
      "skills": ["email", "calendar", "tasks"]
    },
    "study-buddy": {
      "name": "学习伙伴",
      "systemPrompt": "帮助用户学习和研究，解释概念和推荐资源。",
      "skills": ["web-search", "wikipedia", "notes"]
    }
  }
}
```

适合场景：工作和个人使用需求差异大，或需要不同的模型配置。

### 渠道分离型

不同渠道绑定不同的 Agent。

```json
{
  "routing": {
    "telegram": "personal-assistant",
    "discord": "community-bot",
    "webchat": "default"
  }
}
```

适合场景：消息入口的使用场景不同，比如 Telegram 用于个人、Discord 用于团队。

## 常见 Agent 配置误区

| 误区 | 问题 | 正确做法 |
|------|------|---------|
| systemPrompt 写得过于模糊 | Agent 行为不可控 | 明确指定职责、边界和行为规则 |
| 同时开启太多技能 | Agent 上下文混乱 | 只开启当前场景真正需要的技能 |
| 所有 Agent 用同一个模型 | 资源浪费或能力不足 | 根据任务复杂度选择适合的模型 |
| 忽略 memory 配置 | Agent 每次对话都"失忆" | 根据场景开启并调优记忆参数 |
| 创建完不测试直接上线 | 问题被掩藏到真实使用 | 先在本机测试，确认可用再对接渠道 |

## 多 Agent 协作建议

当你开始使用多个 Agent 时，注意这几点：

- **职责不重叠**：每个 Agent 的职责范围应该清晰区分，避免两个 Agent 处理同一类任务
- **命名有规律**：使用一致的命名规范，方便在 CLI 和配置中管理
- **权限独立**：如果 Agent 使用不同的工具，确保各自的权限配置独立且最小化
- **定期回顾**：运行一段时间后检查各 Agent 的实际使用情况，关闭不必要的 Agent

## 常见问题

### Agent 不回复或回复很慢

检查：
- 模型配置是否正确
- API 密钥是否有效
- 网络连接是否正常
- Gateway 是否在运行

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

### 多个 Agent 的回复混淆

检查：
- 渠道路由配置是否正确
- 每个 Agent 的 systemPrompt 是否有明确边界
- 会话是否分配到了正确的 Agent

## 下一步

- [技能系统详解](/docs/manual/skills-system)
- [工具配置指南](/docs/manual/tools-overview)
- [记忆系统说明](/docs/manual/memory-system)
- [接入消息渠道](/docs/manual/channels-overview)
