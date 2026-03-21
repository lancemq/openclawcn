---
title: OpenClaw 扩展层观察：ClawHub、插件托管 hooks 与 onboarding 勾选正在把扩展能力收拢成一条更完整链路
description: 基于 2026 年 3 月 21 日可见的官方 Skills、ClawHub、Plugins 与 Hooks 文档，整理最近最值得中文站关注的扩展层变化：技能 registry、插件托管 hooks，以及 onboarding 阶段对推荐 hooks 的直接引导。
category: 生态动态
date: 2026-03-21
author: OpenClawCN
source: https://docs.openclaw.ai/automation/hooks
sourceName: OpenClaw Docs
updatedAt: 2026-03-21
sourceType: official
tags: [skills, clawhub, plugins, hooks, extensions]
---

# OpenClaw 扩展层观察：ClawHub、插件托管 hooks 与 onboarding 勾选正在把扩展能力收拢成一条更完整链路

截至 **2026 年 3 月 21 日**，官方在扩展层这条线上最值得继续跟的，不再只是“又多了几个 skill 或 plugin”，而是不同扩展机制正在越来越像一套完整链路。

把最近的 Skills、ClawHub、Plugins 和 Hooks 文档放在一起看，会发现几个很清楚的方向：

- ClawHub 正在变成正式 registry
- 插件可以托管 hooks
- onboarding 已经开始直接引导推荐 hooks

## 1. ClawHub 已经不是“技能下载页”

官方最近的 ClawHub 文档里，最值得注意的一点是：

- skills 现在是 versioned bundles
- 有 `.clawhub/lock.json`
- 有 `sync`

这说明它已经不是简单的技能展示站，而是在往真正的技能注册表方向走。

## 2. 插件托管 hooks 让扩展层真正开始组合

另一个非常关键的变化，是插件现在可以直接注册或托管 hooks。

这件事的意义不小，因为它说明：

- 插件不再只负责“新增功能”
- 还能把事件驱动行为一起打包带进系统

从扩展生态角度看，这比单独多一个 hook 更重要。

## 3. onboarding 开始推荐 hooks，说明 hooks 已进入默认使用路径

官方 Hooks 文档现在明确提到：

- `openclaw onboard` 会发现可选 hooks
- 并提示启用推荐项

这说明 hooks 已经不再只是“高手自己写点自动化”的层，而是在被官方逐步纳入默认用户路径。

## 4. 这三件事放在一起意味着什么

如果把这三条变化放在一起看，一个很明显的结论是：

- OpenClaw 的扩展层正在从“很多分散机制”
- 走向“一套更完整的能力分发与治理链路”

大致可以概括成：

- ClawHub 负责分发
- Plugins 负责系统能力
- Hooks 负责行为扩展
- Onboarding 负责把推荐项引导进默认路径

这已经不是零散功能堆砌了。

## 中文站最值得继续承接的地方

这对中文站很重要，因为扩展层恰恰是最容易让新用户“知道很多词，但不知道顺序”的部分。

而官方最近这批文档已经开始给出更明确的结构：

- 技能怎么发现
- 插件怎么装
- hooks 怎么进入系统
- 哪些会在 onboarding 阶段就出现

这非常适合继续被中文站转成更可执行的路径。

## 中文站建议怎么继续看

如果你想顺着这条线继续理解，建议这样看：

1. 想理解 skills registry：看 [ClawHub 的版本、锁文件和 sync 怎么理解](/docs/manual/clawhub-versioning-and-sync)
2. 想理解插件和 hooks 的组合：看 [插件托管 hooks 与扩展能力边界](/docs/manual/plugin-managed-hooks)
3. 想实际开始扩：再看 [Hooks、插件和 Skills 的启用顺序怎么排](/best-practices/hooks-onboarding-sequence)

这批官方变化最值得注意的，不是哪一个新命令，而是扩展层已经越来越像一套完整生态，而不是各写各的几套扩展机制。
