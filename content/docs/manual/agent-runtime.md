---
title: Agent 运行时与工作区结构
description: 了解 OpenClaw 的内嵌 Agent 运行时如何工作，工作区必须包含哪些文件，以及会话如何引导启动。
category: manual
updatedAt: 2026-06-06
sourceType: official
source: https://docs.openclaw.ai/concepts/agent
tags: [runtime, workspace, bootstrap, sessions]
---

# Agent 运行时与工作区结构

OpenClaw 运行一个**内嵌的 Agent 运行时**——每个 Gateway 一个 Agent 进程，拥有独立的工作区、引导文件和会话存储。这一页解释这个运行时契约。

## 工作区（必需）

OpenClaw 使用一个 Agent 工作区目录（`agents.defaults.workspace`）作为 Agent 唯一的**工作目录**（`cwd`）——工具执行和上下文都基于此。

工作区布局和备份指南：参见 [Agent 工作区结构说明](/docs/manual/agent-workspace)。

## 引导文件（注入）

在 `agents.defaults.workspace` 内，OpenClaw 期望这些用户可编辑的文件：

| 文件 | 用途 |
|------|------|
| `AGENTS.md` | 操作指令 + "记忆" |
| `SOUL.md` | 人设、边界、语气 |
| `TOOLS.md` | 用户维护的工具说明 |
| `BOOTSTRAP.md` | 一次性首次运行仪式（完成后自动删除） |
| `IDENTITY.md` | Agent 名称/风格/表情 |
| `USER.md` | 用户画像 + 联系方式 |

在新会话的第一轮，OpenClaw 将这些文件的内容注入系统提示的 Project Context。空文件会被跳过。大文件会被截断并添加标记。

`BOOTSTRAP.md` 仅在**全新的工作区**（没有其他引导文件）时创建。完成后如果被删除，下次启动不会重新创建。

## 内置工具

核心工具（read/exec/edit/write 及相关系统工具）始终可用，受工具策略约束。`apply_patch` 是可选的，由 `tools.exec.applyPatch` 控制。`TOOLS.md` **不控制**哪些工具存在——它只是你对工具用法的指导说明。

## 技能加载顺序

OpenClaw 按以下优先级加载技能（高优先级优先）：

1. 工作区技能：`<workspace>/skills`
2. 项目 Agent 技能：`<workspace>/.agents/skills`
3. 个人 Agent 技能：`~/.agents/skills`
4. 受管/本地技能：`~/.openclaw/skills`
5. 内置技能（随安装附带）
6. 额外技能目录：`skills.load.extraDirs`

## 会话

会话记录以 JSONL 格式存储在：

```
~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl
```

会话 ID 由 OpenClaw 选定且稳定。

## 运行中转向（steering）

运行中收到的消息默认会被转向到当前运行。转向在**当前 assistant turn 完成工具调用之后、下一次 LLM 调用之前**交付。

- `/queue steer` — 默认行为，消息进入活跃运行
- `/queue followup` — 等待当前运行结束再处理
- `/queue collect` — 在安静窗口后合并处理
- `/queue interrupt` — 中止当前运行

关于队列的完整说明：参见 [Queue 系统](/docs/manual/queue-system)。

## 模型引用

配置中的模型引用（如 `agents.defaults.model`）通过第一个 `/` 分割：

- 使用 `provider/model` 格式配置模型
- 如果模型 ID 本身包含 `/`（如 OpenRouter 风格），请包含 provider 前缀：`openrouter/moonshotai/kimi-k2`
- 省略 provider 时，OpenClaw 会先尝试别名匹配

## 最小配置

至少需要设置：

- `agents.defaults.workspace`
- `channels.whatsapp.allowFrom`（强烈建议）

## 相关文档

- [Agent 工作区结构说明](/docs/manual/agent-workspace)
- [多 Agent 路由](/docs/manual/multi-agent-routing)
- [会话管理](/docs/manual/session-management)
