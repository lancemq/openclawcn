---
title: "OpenClaw 工作流观察：OpenProse 与 Lobster 的上下层分工正在变清楚"
description: "基于 2026 年 3 月 24 日可见的官方 Lobster 文档，最近最值得关注的信号是 OpenProse 与 Lobster 的边界正在被官方主动写清，多智能体准备和确定性执行不再混成一层。"
category: 生态观察
date: "2026-03-24"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/tools/lobster"
updatedAt: "2026-03-24"
sourceType: "official"
tags: ["openprose", "lobster", "workflow", "approvals", "multi-agent"]
---

官方最近这轮工作流文档里，最值得中文站注意的一个信号是：

- OpenProse 和 Lobster 的上下层分工正在被主动写清

过去很多人会把“多智能体协作”和“确定性执行”都看成同一类高级自动化。  
但最近 Lobster 文档已经给出更明确的搭配方向：

- 用 `/prose` 做多智能体准备
- 用 Lobster 做确定性执行和审批恢复

## 1. OpenClaw 正在把“准备”和“执行”分层

这不是措辞细节，而是架构信号。

更准确地说，官方最近在把复杂自动化拆成两层：

- 前层：调研、分工、候选结果生成
- 后层：固定步骤执行、审批和恢复

这会让很多原本混在一起的工作流，开始出现更清楚的交接线。

## 2. `resumeToken` 让执行层真正独立出来

Lobster 现在最关键的能力，不只是多步 pipeline，而是：

- `needs_approval`
- `resumeToken`
- `cancelled`

这意味着工作流暂停后可以恢复，而不用把前面所有步骤重跑一遍。

这类能力一旦出现，执行层就不再只是“Prompt 写长一点”，而是真正的 runtime。

## 3. 审批点开始从提示词移动到运行时

当前官方文档已经把 approval gate 写成 Lobster 的正式能力，而不是靠自然语言暗示。

这代表 OpenClaw 的工作流治理正在更接近：

- 可审计
- 可恢复
- 可复盘

而不是：

- 靠上下文记忆的即兴自动化

## 4. 这会改变中文团队的设计顺序

如果以前很多团队的顺序是：

- 先让 agent 自由协作
- 再看看能不能顺便执行

那现在更稳的顺序会变成：

1. 先用 Prose 准备和分工
2. 把候选结果收成结构化输入
3. 再交给 Lobster 跑固定执行段

这条线一旦守住，很多审批和恢复问题会简单很多。

## 这对中文站意味着什么

最近这波官方信号，说明 OpenClaw 的工作流能力正在从“会调用很多工具”继续往前走，开始形成：

- 多智能体准备层
- 确定性执行层
- 审批恢复层

这对团队自动化、内容流水线、值班辅助和外部系统接入都会有直接影响。

## 推荐延伸阅读

- [OpenProse 和 Lobster 的边界怎么分](/docs/manual/openprose-and-lobster-boundaries)
- [从 Prose 准备到 Lobster 执行，交接线怎么画](/best-practices/prose-to-lobster-handoff)
- [Lobster 的调用、审批和 resume token](/docs/reference/lobster-invoke-and-resume)

