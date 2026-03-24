---
title: OpenProse 和 Lobster 的边界怎么分
description: 基于最新官方 Lobster 文档，整理 OpenProse 与 Lobster 在多智能体准备、确定性执行和审批恢复上的分工，帮助中文团队判断什么时候该用 /prose，什么时候该转成工作流运行时。
category: 功能
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/tools/lobster
sourceName: OpenClaw Docs
sourceType: official
tags: [openprose, lobster, multi-agent, approvals, workflow]
---

# OpenProse 和 Lobster 的边界怎么分

官方最近在 Lobster 文档里给了一条非常值得中文站单独展开的线：

- OpenProse 适合多智能体准备
- Lobster 适合确定性执行和审批恢复

这句话看起来很短，但它其实直接决定了很多团队的自动化架构怎么分层。

## 先用一句话记住

- `/prose` 更像策划层
- Lobster 更像执行层

如果把两者混成一层，最后往往会出现：

- 前面分析不稳
- 后面执行不可审计

## OpenProse 更适合解决什么问题

从官方当前描述看，OpenProse 的价值更接近：

- 多智能体准备和组织

这意味着它更适合这些场景：

- 先拆问题
- 先做调研
- 先收集多方输入
- 先产出候选方案

它解决的是“怎么把复杂任务准备好”，而不是“怎么把副作用动作安全落地”。

## Lobster 更适合解决什么问题

Lobster 当前官方定位非常明确：

- typed workflow runtime
- 多步流程一次运行
- 带审批 gate
- 支持 resume token

也就是说，它更适合承担：

- 固定步骤执行
- 可审计副作用
- 暂停后恢复

## 两者最大的差别不在“是否多步”

很多人第一次看会误以为：

- OpenProse 和 Lobster 都是多步流程，所以差不多

但真正的区别在于：

- OpenProse 更偏开放式准备
- Lobster 更偏收束后的确定性执行

一个更像：

- 研究、拆解、组织

另一个更像：

- 执行、审批、恢复

## 什么时候先上 `/prose`

如果你的任务先天带这些特征，通常更适合先走 OpenProse：

- 要先收集资料
- 要做多角度分析
- 需要多个 agent 分工
- 还不能直接确定执行动作

例如：

- 先研究一轮竞品资料
- 先整理邮件或工单候选方案
- 先做内容选题和素材归档

## 什么时候该转成 Lobster

如果任务已经进入下面这些状态，就不该继续只停留在 `/prose`：

- 步骤已经明确
- 输出结构已经稳定
- 存在真正副作用
- 需要审批和恢复

例如：

- 发邮件
- 改工单状态
- 批量提交评论
- 生成并执行固定周报流程

## 为什么官方会强调 approval 和 resume

Lobster 最近最值的一点，不是“还能再写一套 DSL”，而是把下面几件事做成了运行时内建能力：

- `needs_approval`
- `resumeToken`
- `cancelled`

这说明官方在明确鼓励一种更稳的自动化形态：

- 先分析
- 再预览
- 再审批
- 再恢复执行

## 更稳的组合方式是什么

从最近官方写法看，更推荐的结构通常是：

1. 用 `/prose` 做准备和分工
2. 让各 agent 产出结构化候选结果
3. 把最终流程改写成 Lobster pipeline
4. 在副作用节点加 `approval`
5. 通过 `resumeToken` 恢复，而不是从头再跑

## 什么时候不必强行上 Lobster

如果你的任务仍然是：

- 一次性探索
- 大量开放推理
- 路径还没稳定

那继续停留在 `/prose` 或普通 agent 协作往往更合适。

过早把还没定型的流程写成 Lobster，最后只会让：

- 工作流很僵
- 维护成本上升

## 中文团队最容易踩的坑

### 1. 让 `/prose` 直接承担最终执行

这样会让执行边界不清，审批点也更难审计。

### 2. 还没稳定的流程就写成 Lobster

最后会不断重写 pipeline。

### 3. 只看“能跑起来”，不看恢复能力

真正的团队流程往往最怕中途暂停后只能从头重来。

## 一条更稳的判断线

你可以直接按这个顺序判断：

1. 现在是在准备阶段，还是执行阶段
2. 输出是否已经结构化
3. 是否存在副作用
4. 是否需要审批后恢复

如果答案逐步变成：

- 是的，已经在执行
- 是的，输出稳定
- 是的，存在副作用
- 是的，需要恢复

那就该从 `/prose` 转到 Lobster。

## 下一步推荐

- [Lobster 的调用、审批和 resume token](/docs/reference/lobster-invoke-and-resume)
- [需要审批的自动化流程应该怎么设计](/best-practices/approval-gated-automation)
- [从 Prose 准备到 Lobster 执行，交接线怎么画](/best-practices/prose-to-lobster-handoff)

