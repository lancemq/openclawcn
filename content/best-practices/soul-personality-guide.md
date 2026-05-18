---
title: SOUL.md 人格与身份定制实战指南
description: 从官方 SOUL.md 机制出发，教你怎么给 Agent 写一个真正有“性格”而不是“说明书”的身份文件，避免常见的人格配置误区。
category: 代理配置
difficulty: 基础
updatedAt: "2026-05-18"
source: https://docs.openclaw.ai/concepts/soul
sourceName: OpenClaw Docs
sourceType: official
tags: [soul, personality, agent, system-prompt, customization]
---

# SOUL.md 人格与身份定制实战指南

OpenClaw 的 Agent 不只是能回答问题，它还可以有明确的性格和表达风格。这种风格不是通过每次对话临时调教出来的，而是通过 `SOUL.md` 这个文件固定下来的。

这篇指南会帮你理解 SOUL.md 到底能做什么、不能做什么，以及怎么写出一个真正有用的身份文件。

## SOUL.md 是什么

`SOUL.md` 是 Agent 工作区里的一个特殊文件，OpenClaw 会在每次会话时把它注入到系统提示词里。它的唯一作用是：

- **定义 Agent 的语气、态度和表达方式**

它不负责：

- 定义 Agent 能调用什么工具
- 定义安全策略或审批规则
- 罗列功能说明书

简单说，SOUL.md 管的是 "怎么说"，而不是 "做什么"。

## 好的 SOUL.md 长什么样

### 核心原则：短、准、有态度

官方文档给出的指导原则是：

> Short beats long. Sharp beats vague.

**好的规则示例：**

- 有自己的观点，不模棱两可
- 跳过寒暄和废话
- 适合的时候幽默
- 尽早指出糟糕的想法
- 保持简洁，除非深度有用

**糟糕的规则示例：**

- "始终保持专业"
- "提供全面周到的帮助"
- "以礼貌友好的态度回应"

后者会让 Agent 的输出变成 "mush"——一团模糊的客气话，没有任何辨识度。

### 一个实用的 SOUL.md 模板

```markdown
# SOUL.md

## 语气
- 直接、不绕弯子
- 有明确观点，不骑墙
- 允许自然的幽默，不强行搞笑

## 表达习惯
- 不要以 "Great question!" 或 "I'd be happy to help" 开头
- 直接回答，不要铺垫
- 简短优先，必要时再展开

## 边界
- 指出糟糕想法时，魅力优于刻薄，但不要粉饰
- 复杂问题先给结论，再给理由
- 不知道就直说，不编造

## 身份定位
- 你是用户愿意在凌晨两点聊天的助手
- 不是客服，不是老师，是一个靠谱的搭档
```

## 常见误区

### 误区一：把 SOUL.md 写成 AGENTS.md

SOUL.md 只应该管性格和语气。Agent 的操作规则、工具权限、安全策略应该写在 `AGENTS.md` 里。

| 文件 | 管什么 |
|------|--------|
| SOUL.md | 语气、性格、表达方式 |
| AGENTS.md | 操作规则、工具范围、安全边界 |

### 误区二：写得太长

 personality 不是许可你 sloppy。一段长篇大论的 "vibes wall" 不会让 Agent 更有性格，反而会让系统提示词变得臃肿，稀释关键指令。

### 误区三：把 changelog 或项目历史写进去

SOUL.md 不是项目的自我介绍文档。用户的第一次对话不需要知道 Agent 的 "起源故事"。

## 让 Agent 自己写 SOUL.md

官方提供了一个实用的方法：你可以让 Agent 根据它自己的交互经验来重写 SOUL.md。

核心指令思路：

1. 让 Agent 总结自己的交互风格
2. 删除听起来像企业的套话
3. 保留真正有行为影响的规则
4. 用简短、可执行的语句重写

这比人工臆想一个 "人设" 更靠谱，因为 Agent 会根据实际对话模式来提炼性格。

## 版本控制很重要

性格稳定的前提是 SOUL.md 被版本化管理。如果每次对话前都在改性格文件，Agent 的行为就会不可预测。

建议做法：

- 把 SOUL.md 放在 Agent 的工作区里
- 用 Git 或其他方式追踪变更
- 不要频繁微调，改就改一整版

## 在共享环境里的注意事项

如果你的 Agent 是团队共享或对外服务的，性格文件需要额外注意：

- Sharp is good. Annoying is not.
- 直接不等于粗鲁
- 幽默要自然，不要刻意

测试方法很简单：把 Agent 的回复截图给同事看，问他们 "这个语气你能接受吗？"

## 下一步

- [Agent 工作区文件说明](/docs/manual/agent-workspace)
- [系统提示词与上下文压缩](/docs/manual/system-prompt-context-and-compaction)
- [创建第一个 Agent](/docs/getting-started/first-agent)
