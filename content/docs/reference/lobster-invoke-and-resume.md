---
title: Lobster 的调用、审批和 resume token
description: 基于最新官方 Lobster 文档，解释 OpenClaw 里如何用 openclaw.invoke 触发确定性工作流、何时进入 needs_approval，以及 resume token 在恢复流程里扮演什么角色。
category: 参考
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/tools/lobster
sourceName: OpenClaw Docs
sourceType: official
tags: [lobster, invoke, approvals, workflow, reference]
---

# Lobster 的调用、审批和 resume token

OpenClaw 最近这波工具生态里，一个很值得中文站单独拉出来讲的能力是：

- Lobster

它不是普通“再多一个工具”，而是把多步工具链压缩成一次确定性工作流调用，并把审批和恢复做成运行时的一部分。

## Lobster 到底在解决什么问题

官方当前给出的核心定位非常明确：

- 多步工具编排不再由 LLM 临时组织
- 而是交给一个 typed workflow runtime

这意味着当任务已经不是“一问一答”，而是明确的多步流程时，Lobster 更适合承担执行层。

## 为什么它和普通工具调用不一样

平时的工具调用更像：

- 模型一步一步决定下一步

而 Lobster 更像：

- 先把步骤写成可审计的管道
- 再一次性运行

这会带来三个直接好处：

- token 更省
- 行为更可预测
- 需要审批的地方可以显式停下来

## `openclaw.invoke` 在这里扮演什么角色

官方示例里反复出现一个很关键的模式：

- 小 CLI 输出 JSON
- 再通过 `openclaw.invoke` 把结果映射进后续工具动作

更容易理解的关系是：

- `openclaw.invoke` 负责把结构化输入喂给具体工具动作
- Lobster 负责把多步调用串成一个确定性流程

所以它们不是替代关系，而是经常一起出现。

## 最典型的调用形态是什么

当前官方文档把 Lobster 工具调用拆成两个主要动作：

- `run`
- `resume`

### `run`

用于启动一个新工作流。

适合传入的关键信息包括：

- `pipeline`
- `cwd`
- `timeoutMs`
- `maxStdoutBytes`
- `argsJson`

### `resume`

当工作流遇到审批点而暂停后，用 token 继续执行。

这时候最关键的输入是：

- `token`
- `approve`

## `needs_approval` 到底意味着什么

这不是普通报错，也不是流程失败。  
根据官方当前设计，Lobster 的输出状态通常分成：

- `ok`
- `needs_approval`
- `cancelled`

其中 `needs_approval` 的真实含义是：

- 流程还没结束
- 只是遇到了必须人工确认的副作用边界

例如：

- 发邮件
- 提交评论
- 执行会改状态的外部动作

## `resumeToken` 为什么这么关键

官方文档现在明确说明：

- 工作流暂停时会返回 `resumeToken`
- 审批后可以用它继续流程，而不用重跑前面的步骤

它真正解决的是两个问题：

- 不需要从头再执行一遍收集和分析步骤
- 审批和执行之间有了明确的、可恢复的状态边界

这让 Lobster 特别适合“前半段分析，后半段有副作用”的自动化流程。

## 工作流文件什么时候更合适

官方文档除了直接传 pipeline 字符串，也支持 `.lobster` 工作流文件。

如果你的流程开始出现下面这些特征，就更适合写文件：

- 步骤超过几层
- 有条件分支
- 有明确审批节点
- 想反复复用

文件化之后，更容易做：

- diff
- review
- 复盘
- 团队共享

## `approval: required` 的价值是什么

官方 workflow file 示例里，审批并不是靠 prompt 暗示，而是直接在步骤级别写成：

- `approval: required`

这意味着副作用边界是 runtime 规则，而不是靠模型自己记住“这里应该停一下”。

这对团队环境特别重要，因为它让工作流更接近：

- 可审计的操作流程

而不是：

- 会随模型发挥波动的脚本提示

## 什么时候适合用 Lobster

更适合 Lobster 的场景通常是：

- 固定步骤的多步自动化
- 中间需要审批的工作流
- 想保留恢复能力的流程
- 需要稳定复用的运维或内容流程

不那么适合 Lobster 的通常是：

- 一次性探索
- 依赖大量自由推理的开放任务
- 很短的单步工具调用

## OpenProse 和 Lobster 的边界

官方文档也给了很清楚的搭配方向：

- OpenProse 适合多智能体准备和组织
- Lobster 适合确定性执行和审批恢复

一个很稳的理解方式是：

- Prose 更像策划层
- Lobster 更像执行层

## 中文站建议怎么使用这条线

如果你已经发现某类工作会反复出现，建议按这个顺序推进：

1. 先把步骤拆成小 CLI 或清晰工具动作
2. 再用 Lobster 串成确定性工作流
3. 把副作用节点显式改成 approval gate
4. 最后再考虑用 Prose 做更上层的多智能体组织

## 下一步推荐

- [Exec 工具、apply_patch 与执行审批](/docs/manual/exec-tools-and-approvals)
- [Cron 和 Heartbeat 应该怎么分工](/docs/operations/cron-vs-heartbeat)
- [团队里如何管理插件包和 Hook Pack](/best-practices/plugin-bundle-governance)
