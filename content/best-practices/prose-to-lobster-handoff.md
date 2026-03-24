---
title: 从 Prose 准备到 Lobster 执行，交接线怎么画
description: 结合最新官方 Lobster 文档，整理一套从多智能体准备到确定性执行的交接方法，避免 OpenProse 和 Lobster 混层使用。
category: 工作流实践
difficulty: 高级
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/tools/lobster
sourceName: OpenClaw Docs
sourceType: official
tags: [openprose, lobster, workflow, approvals, multi-agent]
---

# 从 Prose 准备到 Lobster 执行，交接线怎么画

很多团队并不是不会用 OpenProse 或 Lobster，而是不会判断：

- 哪一段还应该继续开放式准备
- 哪一段必须收口成确定性执行

官方最近在 Lobster 文档里把这条线讲得更清楚了。  
真正稳的做法，不是二选一，而是把交接线画出来。

## 第一原则：把任务拆成“准备段”和“执行段”

更稳的默认拆法通常是：

### 准备段

- 收集资料
- 分工调研
- 生成候选结果
- 做草稿和预览

### 执行段

- 固定步骤运行
- 需要审批的副作用
- 明确可恢复的流程

准备段更适合 `/prose`，执行段更适合 Lobster。

## 第二原则：候选结果一定要结构化

如果 Prose 阶段的产物还是一大段自然语言，后面很难无缝交给 Lobster。

更稳的做法是让准备段尽量产出：

- JSON
- 明确字段
- 已分组候选动作
- 可预览列表

这样后面 Lobster 才能把它接成：

- JSON pipes
- approval preview
- deterministic step chain

## 第三原则：审批只放在最小副作用单元前

如果审批太早，操作者看不清自己在批什么；审批太晚，又可能已经做了不该做的动作。

更稳的落点通常是：

- 候选结果已经生成
- 预览已经准备好
- 下一步就是外发或写入

这也是为什么官方最近强调：

- `approve --preview-from-stdin`
- `resumeToken`

## 第四原则：取消要当成正式出口

Lobster 当前输出不只有成功，还有：

- `needs_approval`
- `cancelled`

这说明取消不是异常，而是正式结果。

所以在交接设计上，准备段就该提前考虑：

- 如果审批不通过，是否仍要保留分析结果
- 是否需要回到人工处理

## 一条很实用的落地结构

### 第一步：Prose 收集与拆解

让多个 agent 做：

- 资料整理
- 分类
- 候选动作生成

### 第二步：收束成结构化输入

把最终候选结果压成：

- 一组对象
- 一组 action items
- 一段固定 schema

### 第三步：Lobster 执行

把后半段改成：

- 固定命令链
- 审批预览
- 审批后恢复

## 特别适合这样做的场景

- 邮件分流后再发送回复
- 工单预分类后再改状态
- 内容候选生成后再发布
- 周报收集后再对外发送

这些流程共同特点都是：

- 前半段需要智能判断
- 后半段需要明确边界

## 中文团队最常见的误区

### 1. 让 `/prose` 直接执行副作用

结果是边界不稳，也不易审计。

### 2. 还没收口就强行写 Lobster pipeline

流程一变就得重写。

### 3. 没有明确交接对象

如果没有结构化产物，Lobster 很难真正稳定接手。

## 推荐的交接检查表

在把任务从 Prose 交给 Lobster 前，至少确认：

1. 步骤是否已经稳定
2. 候选结果是否结构化
3. 审批点是否明确
4. 取消后是否有正式收口
5. 恢复时是否不需要重跑前段

## 下一步推荐

- [OpenProse 和 Lobster 的边界怎么分](/docs/manual/openprose-and-lobster-boundaries)
- [Lobster 的调用、审批和 resume token](/docs/reference/lobster-invoke-and-resume)
- [需要审批的自动化流程应该怎么设计](/best-practices/approval-gated-automation)

