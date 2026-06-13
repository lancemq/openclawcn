---
title: Agent 运行时与工作区结构
description: 理解 OpenClaw 的 Agent 运行时如何工作，工作区里每个文件是干什么的，以及如何正确配置。
category: manual
updatedAt: 2026-06-10
sourceType: official
source: https://docs.openclaw.ai/concepts/agent
tags: [runtime, workspace, bootstrap, sessions]
---

# Agent 运行时与工作区结构

你已经知道 OpenClaw 是一个 Gateway + Agent 的架构。这一篇帮你搞清楚：当 Gateway 启动后，Agent 运行时内部到底在做什么，工作区里每个文件各自负责什么，以及你应该怎么配置它们。

## 一个形象的比喻

把 OpenClaw Agent 想象成一个新入职的员工：

- **工作区** = 他的工位（所有文件都在这里）
- **AGENTS.md** = 公司制度手册（告诉他怎么工作）
- **SOUL.md** = 他的性格卡（告诉他用什么语气说话）
- **BOOTSTRAP.md** = 入职第一天的任务清单（完成后就删掉）
- **IDENTITY.md** = 他的工牌（名字、风格、表情）
- **USER.md** = 你的联系方式（他要知道你叫什么）
- **TOOLS.md** = 工具使用说明（你希望他怎么用某个工具）

理解了这个比喻，接下来的内容就好懂了。

## 工作区是什么

OpenClaw 为每个 Agent 准备一个**工作区目录**——这是它唯一的工作空间。所有工具执行、上下文读取、文件操作都基于这个目录。

默认路径在配置里这样写：

```json5
{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",
    },
  },
}
```

`openclaw setup` 会自动帮你创建这个目录并初始化引导文件。如果你手动创建，确保里面有至少一个引导文件（比如 `AGENTS.md`），否则 OpenClaw 会认为这是一个全新工作区并尝试创建 `BOOTSTRAP.md`。

## 引导文件详解

每个引导文件在新会话的**第一轮**被注入系统提示的 Project Context。你写什么，Agent 就"记住"什么。

### AGENTS.md — 操作指令

这是最重要的文件。它告诉 Agent **怎么做事情**，而不是它是谁。

**写什么**：
- 工作规则和约定
- 工具使用偏好
- 回复格式要求
- 你希望它遵循的流程

**示例**：

```markdown
# Agents

## 工作方式

- 回答问题前，先思考是否有相关上下文可以引用
- 写代码时保持简洁，避免过度工程
- 不确定时先问，不要假设
- 每次修改文件后，确认修改是否生效

## 工具偏好

- 优先用 read 工具读取文件，不要用 cat
- 编辑文件用 edit 工具，不要用 sed
- 搜索用 grep，不要用 find
```

**注意**：`TOOLS.md` 不控制哪些工具存在——工具是否可用由系统工具策略决定。`TOOLS.md` 只是你对工具用法的指导说明。

### SOUL.md — 人设与语气

这个文件定义 Agent 的**性格和边界**。

**写什么**：
- 语气风格（友好？专业？简洁？）
- 回复长度偏好
- 绝对不能做的事
- 你希望它怎么称呼你

**示例**：

```markdown
# Soul

你是我的 AI 助手。

## 语气

- 友好但不啰嗦
- 用中文回复
- 不需要过度礼貌，直接说重点

## 边界

- 不要主动发消息给我，等我提问
- 不确定时说"我不确定"，不要编造答案
```

### IDENTITY.md — 工牌

给你的 Agent 起个名字，定义它的风格。

```markdown
# Identity

我的助手就叫"小助手"。
风格：简洁、专注、偶尔用表情符号。
```

### USER.md — 用户信息

让 Agent 知道你是谁，它才能更好地服务你。

```markdown
# User

## 关于我

- 名字：小明
- 职业：全栈开发者
- 主要技术栈：TypeScript, Python, Vue
- 时区：Asia/Shanghai
- 语言偏好：中文为主，技术术语可以用英文
```

### BOOTSTRAP.md — 首次运行仪式

这个文件**只在全新工作区时创建**。它是一次性的初始化任务清单。

**重要规则**：
- 完成后**应该删掉**它（Agent 会自动删除）
- 删除后下次启动**不会重新创建**
- 如果工作区被清除，启动时会拒绝静默重建——需要恢复工作区或重新 `openclaw onboard`

如果你想跳过引导文件创建（比如已经手动准备好了工作区）：

```json5
{ agents: { defaults: { skipBootstrap: true } } }
```

## 技能加载顺序

当你安装了技能，OpenClaw 会按以下优先级加载（高优先级覆盖低优先级）：

| 优先级 | 来源 | 路径 | 典型用途 |
|--------|------|------|---------|
| 1（最高） | 工作区技能 | `<workspace>/skills` | 项目特定定制 |
| 2 | 项目 Agent 技能 | `<workspace>/.agents/skills` | 多 Agent 共享 |
| 3 | 个人 Agent 技能 | `~/.agents/skills` | 个人跨项目使用 |
| 4 | 受管/本地技能 | `~/.openclaw/skills` | 所有 Agent 共享 |
| 5 | 内置技能 | 随安装附带 | 基础能力 |
| 6（最低） | 额外目录 | `skills.load.extraDirs` | 插件提供 |

**为什么要分级**：想象你有一个"天气查询"内置技能，但你团队的项目需要特殊的天气数据源。你可以把自定义版本放在工作区技能里，它会自动覆盖内置版本，不需要改任何配置。

## 模型引用格式

配置模型时，使用 `provider/model` 格式：

```json5
{
  agents: {
    defaults: {
      model: "anthropic/claude-sonnet-4-20250514",
    },
  },
}
```

常见格式：

| 格式 | 示例 |
|------|------|
| `provider/model` | `anthropic/claude-sonnet-4-20250514` |
| `openrouter/...` | `openrouter/moonshotai/kimi-k2` |
| `ollama/model:tag` | `ollama/qwen2.5:7b` |

**规则**：
- 通过第一个 `/` 分割 provider 和模型名
- 如果模型 ID 本身包含 `/`（如 OpenRouter），必须包含 provider 前缀
- 省略 provider 时，OpenClaw 先尝试别名匹配，再尝试唯一 provider 匹配

## 会话存储

每条会话以 JSONL 格式存储在：

```
~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl
```

会话 ID 由 OpenClaw 选定且稳定——同一个会话的所有消息都追加到同一个文件。

**备份建议**：定期备份 `~/.openclaw/agents/` 目录，特别是 `sessions/` 和 `agent/` 子目录。

## 最小配置

要让 Agent 跑起来，至少需要：

```json5
{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",
    },
  },
  channels: {
    whatsapp: {
      allowFrom: ["+8613800000000"],
    },
  },
}
```

但实际使用中，你通常还需要配置模型（`agents.defaults.model`）和至少一个消息渠道。

## 与入门教程的关系

| 这一页解释 | 入门教程里对应 |
|-----------|--------------|
| 工作区是什么 | [Agent 工作区结构说明](/docs/manual/agent-workspace) |
| 引导文件怎么写 | [创建第一个 Agent](/docs/getting-started/first-agent) |
| 技能怎么加载 | [添加第一个技能](/docs/getting-started/first-skill) |
| 会话怎么工作 | [会话管理](/docs/manual/session-management) |

如果你是第一次使用 OpenClaw，建议先走完 [快速入门](/docs/getting-started/getting-started)，再回来读这一页。
