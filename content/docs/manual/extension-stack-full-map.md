---
title: 从 Skills 到 Workflows：OpenClaw 扩展栈完整地图
description: 把 Skills、Tools、插件、Hooks、ClawHub、OpenProse、Lobster 和审批流程收成一张扩展地图，帮助你判断什么时候该引入哪一层复杂度。
category: 功能
updatedAt: 2026-03-29
source: https://docs.openclaw.ai
sourceName: OpenClaw Docs
sourceType: official
tags: [skills, tools, plugins, hooks, workflows, approvals]
---

# 从 Skills 到 Workflows：OpenClaw 扩展栈完整地图

OpenClaw 的扩展能力是最容易让人“越看越多、越看越像都能做”的部分。

因为你会同时看到这些词：

- Skills
- Tools
- Plugins
- Hooks
- Webhooks
- ClawHub
- OpenProse
- Lobster
- Workflows
- Approvals

如果只零散看单页，很容易出现两个极端：

- 还没跑稳基础链路，就过早堆复杂扩展
- 明明已经进入长期使用阶段，却还在用最原始的单点方式硬撑

这篇长文的目标，是把这整组能力按“进入顺序”和“运行职责边界”重新排出来。

## 1. 先给一个总判断：扩展栈不是一层，是六层

更适合把 OpenClaw 的扩展能力拆成下面六层：

1. Skills：给 agent 增加可复用能力片段
2. Tools：给 agent 增加可调用执行面
3. Plugins：把能力和集成打包成正式扩展件
4. Hooks / Webhooks：把事件和外部系统接进来
5. OpenProse / Lobster：把多步内容或执行流程结构化
6. Approvals / governance：把高风险动作纳入治理

如果你不先分层，后面就很容易把“我需要一个 Skill”误做成“我得写个插件”，或者把“我只需要一个 webhook”做成“我要上整套 workflow runtime”。

## 2. 第一层：Skills 最像“能力包”，不是“系统集成”

Skills 最适合解决的是：

- agent 在某类任务里怎么做更稳
- 如何复用一套提示、步骤和工作习惯
- 如何把常见任务沉淀成可调用的能力块

它特别适合：

- 资料检索
- 长文整理
- 分析框架
- 固定写作模板
- 常见问答流程

所以如果你现在的问题更像：

- agent 老是不会按我们的方式做

那多半先看 Skills，而不是先找插件。

延伸阅读：

- [Skills 系统](/docs/manual/skills-system)
- [Skills 配置](/docs/manual/skills-configuration)
- [Skills 页面](/skills)

## 3. 第二层：Tools 才是真正把能力伸到执行面

Tools 解决的是另一类问题：

- agent 能不能真的去做动作
- 它能用哪些执行能力
- 哪些动作要审批、哪些动作要收口

这一层的核心不是“会不会说”，而是：

- 能不能调用
- 调用范围有多大
- 风险边界怎么守

可以把它简单记成：

- Skills 更偏“怎么想、怎么做”
- Tools 更偏“能做什么”

延伸阅读：

- [Tools 概览](/docs/manual/tools-overview)
- [Exec tools 与 approvals](/docs/manual/exec-tools-and-approvals)
- [工具系列](/tools)

## 4. 第三层：Plugins 是正式扩展件，不只是“会被加载的一段配置”

当你开始需要：

- 把能力打包
- 做版本同步
- 做 manifest 和 package pack
- 让团队复用和安装

这时更适合进入插件层。

插件这一层真正值钱的不是“能装”，而是：

- 能被正式追踪
- 有 manifest
- 有版本和分发
- 能和 ClawHub、社区目录、hook pack 等体系接上

更适合一路串着看的是：

- [Plugins 概览](/docs/manual/plugins-overview)
- [Plugin manifest](/docs/manual/plugin-manifest)
- [Plugin package packs](/docs/manual/plugin-package-packs)
- [Community plugins directory](/docs/manual/community-plugins-directory)

## 5. 第四层：Hooks / Webhooks 是事件接入层，不是另一种插件

很多人会把 Hooks 当成插件的附属配置，但更准确的看法是：

- 插件是能力包装层
- Hooks 是事件接入层

Hooks 更像在回答：

- 什么时候触发
- 触发以后把什么事件送进来
- 是 Gateway 内部事件，还是外部 webhook

所以如果你的需求更像：

- 外部系统一有事件就想让 OpenClaw 接住
- 想把后台检查、提醒、同步、路由接进来

那应该先想 hooks / webhooks，而不是先堆 Skills。

更适合成组看的页面：

- [Hooks 概览](/docs/manual/hooks-overview)
- [Hook lifecycle events](/docs/manual/hook-lifecycle-events)
- [Webhooks external triggers](/docs/manual/webhooks-external-triggers)

## 6. 第五层：ClawHub 是发现与同步层，不是单纯扩展商店

ClawHub 很容易被简单理解成一个“下载扩展的地方”，但它真正更值得重视的是：

- 版本同步
- 发现机制
- 信任信号
- 团队里如何把扩展组织起来

也就是说，ClawHub 更像扩展生态的分发与治理层，而不只是一个市场页。

当你开始考虑：

- 哪些扩展值得引入
- 团队里怎么统一版本
- 如何判断社区资源可信度

这时 ClawHub 才真正进入主线。

延伸阅读：

- [ClawHub 版本同步](/docs/manual/clawhub-versioning-and-sync)
- [ClawHub 发现与信任信号](/docs/manual/clawhub-discovery-and-trust-signals)

## 7. 第六层：OpenProse 和 Lobster 让扩展从单点能力变成结构化流程

当你已经不满足于：

- 一个技能
- 一个工具
- 一个 webhook

而是开始需要：

- 多步执行
- 草稿到执行分层
- resume token
- 审批点
- 更结构化的 workflow runtime

这时才进入 OpenProse / Lobster 这一层。

OpenProse 更偏：

- 规划
- 结构化内容或流程组织

Lobster 更偏：

- typed workflow runtime
- run / resume
- 更正式的执行面

延伸阅读：

- [OpenProse 和 Lobster 的边界](/docs/manual/openprose-and-lobster-boundaries)
- [Lobster invoke / resume](/docs/reference/lobster-invoke-and-resume)

## 8. 第七层：Approvals 是整个扩展栈的治理门

扩展栈越往后走，真正决定系统能不能长期稳定运行的，越来越不是“功能够不够”，而是：

- 哪些动作需要人工 gate
- 哪些执行可以自动继续
- 哪些流程应该停在 approval 后再 resume

所以 approvals 不是附属小功能，而是扩展体系的治理门。

它和前面所有层都有关系：

- Tools 会碰到 exec approvals
- Workflows 会碰到 resumeToken 和 gate
- Chat channels 又可能承接 approvals forwarding

当你开始做：

- 自动化
- 高风险工具调用
- 团队协作

审批就不再是可选项。

延伸阅读：

- [Approvals CLI 与 allowlist](/docs/reference/approvals-cli-and-allowlist)
- [需要审批的自动化流程怎么设计](/best-practices/approval-gated-automation)

## 9. 一条更实用的进入顺序

如果你想知道什么时候该引入哪一层，更推荐按下面这条顺序：

### 第一步：先用 Skills 解决“方法不稳定”

### 第二步：再用 Tools 解决“能力不够”

### 第三步：需要正式分发时上 Plugins

### 第四步：需要事件驱动时上 Hooks / Webhooks

### 第五步：需要多步流程时上 OpenProse / Lobster

### 第六步：复杂度上来以后，把 approvals 和 governance 补齐

## 10. 最容易踩的四个坑

### 1. 用插件解决本来只需要 Skill 的问题

### 2. 用 webhook 硬撑本来需要 workflow runtime 的多步流程

### 3. 上了很多扩展，却没有版本和信任治理

### 4. 复杂自动化已经上线，审批却还是空白

## 结尾

OpenClaw 的扩展栈，不是“功能越多越好”，而是：

- 先补方法
- 再补能力
- 再补打包和接入
- 最后才补复杂流程和治理

按这个顺序进入，扩展体系才会长成一个系统，而不是一堆彼此打架的能力。
