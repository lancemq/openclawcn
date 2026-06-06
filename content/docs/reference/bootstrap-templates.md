---
title: 引导文件模板系统
description: AGENTS.md、SOUL.md、BOOTSTRAP.md 等引导文件的用途、加载机制和最佳实践。
category: reference
updatedAt: 2026-06-06
sourceType: official
tags: [templates, bootstrap, agents, soul, identity, workspace]
---

# 引导文件模板系统

OpenClaw 工作区中的引导文件（Bootstrap Files）是 Agent 的"人格"和"记忆"来源。在新会话的第一轮，这些文件会被注入系统提示的 Project Context。

## 文件清单

| 文件 | 用途 | 是否必需 |
|------|------|---------|
| `AGENTS.md` | 操作指令 + "记忆" — Agent 如何工作、遵循什么规则 | 推荐 |
| `SOUL.md` | 人设、边界、语气 — Agent 的风格和个性 | 推荐 |
| `TOOLS.md` | 用户维护的工具说明 — 工具使用约定 | 可选 |
| `BOOTSTRAP.md` | 一次性首次运行仪式 — 完成后自动删除 | 仅创建时 |
| `IDENTITY.md` | Agent 名称/风格/表情符号 | 可选 |
| `USER.md` | 用户画像 + 联系方式 | 可选 |

## 加载规则

- 空文件会被跳过
- 大文件会被截断并添加标记（提示"如需完整内容请读取文件"）
- 缺失文件会注入一行"文件缺失"标记
- `openclaw setup` 会自动创建安全默认模板

## BOOTSTRAP.md 特殊行为

`BOOTSTRAP.md` 仅在**全新的工作区**（没有其他引导文件时）创建。当它待处理时，OpenClaw 将其保留在 Project Context 中。

完成后如果你删除它，下次启动不会重新创建。如果工作区被清除，启动时会拒绝静默重新创建 `BOOTSTRAP.md`——需要恢复工作区或使用完整的 onboard 重置。

关闭引导文件创建：

```json5
{ agents: { defaults: { skipBootstrap: true } } }
```

## 各文件模板

### AGENTS.md

```markdown
# Agents

你是我的个人 AI 助手。

## 工作方式

- 在回答问题前，先搜索我的笔记和记忆
- 写代码时保持代码简洁，不要过度工程
- 不确定时先问，不要假设
```

### SOUL.md

```markdown
# Soul

你是我的 AI 伙伴。

- 语气：友好、直接、专业
- 当你需要更多信息才能回答时，主动提问
- 你可以在需要时使用表情符号，但不要过度
```

### IDENTITY.md

```markdown
# Identity

我的助手就叫"助手"。
风格 - 简洁、专注。
```

### USER.md

```markdown
# User

## 关于我

- 名字：用户
- 技术背景：全栈开发者
- 主要语言：TypeScript、Python
- 时区：Asia/Shanghai
```

## 最佳实践

- **AGENTS.md 放规则**：告诉 Agent 怎么做，而不是它是谁
- **SOUL.md 放人格**：定义语气、风格和边界
- **保持简短**：每个文件控制在 20-30 行以内，避免上下文膨胀
- **定期更新**：随着使用习惯变化，更新引导文件让 Agent 更懂你
- **BOOTSTRAP.md 放引导**：首次运行时告诉 Agent 需要完成的初始化任务

## 相关文档

- [Agent 运行时与工作区结构](/docs/manual/agent-runtime)
- [Agent 工作区结构说明](/docs/manual/agent-workspace)
- [系统提示词、上下文与压缩](/docs/manual/system-prompt-context-and-compaction)
