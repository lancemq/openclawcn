---
title: "OpenClaw 工作流治理能力继续成型"
description: "官方最近的 ClawHub、Lobster、OpenProse 与 Exec approvals 文档，正在把技能发现、确定性执行和审批恢复串成更完整的一条线。"
category: 生态观察
date: "2026-03-22"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/tools/lobster"
updatedAt: "2026-03-22"
sourceType: "official"
tags: ["workflow", "lobster", "clawhub", "approvals", "governance"]
---

最近这轮官方文档的一个明显趋势是：OpenClaw 不再只是把能力点各自放在那里，而是在把“发现扩展、组织流程、审批副作用、恢复执行”这几件事逐步串成一条完整链路。

中文站这边看下来，最值得注意的是四个点开始对上了：

- ClawHub 负责公开技能注册表、搜索和 bundle 版本
- OpenProse 负责多智能体准备和流程组织
- Lobster 负责确定性执行、审批节点和恢复
- Exec approvals 负责真实宿主机上的硬权限边界

这意味着 OpenClaw 的自动化能力，正在从“会调用很多工具”走向“有治理边界的工作流系统”。

## 1. 技能发现已经不只是安装体验

ClawHub 现在的官方定位越来越像正式 registry，而不是单纯下载页。

它已经明确具备：

- 搜索与 tags
- stars / downloads 这类 usage signals
- 举报与 moderation
- bundle 版本和 lockfile

这说明扩展生态的重点，已经不只是“有没有技能”，而是“怎么找到、怎么判断、怎么长期管理”。

## 2. 工作流运行时开始独立出来

Lobster 文档最近把下面几件事说得很清楚：

- 多步工具调用可以压成一次运行
- 副作用节点可以显式停下审批
- 暂停后能用 token 恢复，而不是从头再跑

这和早期“让模型自己一步步调工具”是不同阶段的能力。

它更接近：

- 结构化工作流运行时

而不是：

- 即兴工具编排

## 3. 审批边界正在从提示词转向运行时规则

Exec approvals 和 Lobster approval gate 最近都在强化同一件事：

- 风险边界不该只写在提示词里

一个控制的是：

- 宿主机命令能不能执行

另一个控制的是：

- 流程里的副作用是否继续

这两层开始清楚之后，OpenClaw 的“安全自动化”才真正有基础。

## 4. Prose 和 Lobster 的关系也更清楚了

官方最近的写法越来越像是在给出一个推荐组合：

- Prose 用来做多智能体准备、研究和分工
- Lobster 用来做最终执行和审批恢复

这会让复杂流程出现更清楚的上下层分工。

## 这对中文用户意味着什么

如果你还停留在“装几个技能 + 写几条 prompt”，接下来最值得补的认知已经不是更多单点技巧，而是：

- 哪些能力属于扩展发现
- 哪些能力属于流程组织
- 哪些动作应该进审批门
- 哪些执行应该由确定性 runtime 接管

这条线一旦理解清楚，后面你做团队自动化、内容流水线、值班流程和消息分发，都会稳很多。

## 推荐延伸阅读

- [ClawHub 的搜索、信号和信任边界](/docs/manual/clawhub-discovery-and-trust-signals)
- [Lobster 的调用、审批和 resume token](/docs/reference/lobster-invoke-and-resume)
- [需要审批的自动化流程应该怎么设计](/best-practices/approval-gated-automation)
