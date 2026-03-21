---
title: Hooks、插件和 Skills 的启用顺序怎么排
description: 结合最新官方 Hooks、Plugins、Skills 和 Onboarding 文档，总结第一次扩展 OpenClaw 时怎样安排 hooks、插件与 skills 的启用顺序，降低排障复杂度。
category: 扩展实践
difficulty: 初级
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/automation/hooks
sourceName: OpenClaw Docs
sourceType: official
tags: [hooks, plugins, skills, onboarding, extensions]
---

# Hooks、插件和 Skills 的启用顺序怎么排

OpenClaw 的扩展层现在已经很丰富了，但第一次开始真正扩的时候，最容易犯的错不是“不会配”，而是：

- 三层一起上

也就是同时装插件、开 hooks、再加一堆 skills。这样一旦出问题，你几乎很难判断问题到底出在哪一层。

## 第一原则：先扩能力，再扩行为，再扩组织方式

更稳的顺序通常是：

1. 先插件
2. 再 hooks
3. 最后 skills

原因很简单：

- 插件更偏“系统有没有这个能力”
- hooks 更偏“什么时候自动做”
- skills 更偏“怎么把这些东西教给 agent”

如果能力层都还没稳，就不该先堆行为层和组织层。

## 第二原则：先让默认 bundled hooks 跑通，再做自定义

根据最新官方 Hooks 文档，OpenClaw 当前自带几种 bundled hooks，例如：

- `session-memory`
- `bootstrap-extra-files`
- `command-logger`
- `boot-md`

这类 hooks 非常适合作为第一批观察对象，因为：

- 文档更完整
- 行为更稳定
- 更接近官方默认模型

比起一上来就写自定义 hook，先把 bundled hooks 跑一轮，能更快理解系统触发点。

## 第三原则：plugins 先少量启用，再看 hooks list

插件层更适合作为第一批能力入口，但也不建议一次装很多。

更稳的节奏通常是：

1. 装 1 个高频插件
2. 跑 `openclaw plugins list`
3. 再看 `openclaw hooks list`

这样你能更快看清：

- 哪些能力真被加进来了
- 哪些 hook 是插件带来的
- 哪些是独立 hooks

## 第四原则：skills 最后再加，是为了降低 prompt 复杂度

站里已经讲过 skill 本身会进入 system prompt，这意味着它不是“装了也没成本”。

如果你在插件和 hooks 还没稳定前就大量装 skill，问题通常会变成：

- prompt 变长
- 能力选择更乱
- 排障更难

所以第一次扩展时，让 skills 最后进场通常是最省事的。

## 一条更稳的第一次扩展路线

对大多数人来说，更适合的顺序通常是：

1. 先把 dashboard 和基本聊天链路跑通
2. 装一个插件
3. 启一个 bundled hook
4. 最后再装 1 到 2 个高频 skill

这条路径的好处是：每加一层，你都更容易知道是哪一层带来了变化。

## 中文站建议怎么记

如果要用一句话压缩：

- 先让系统会做，再让系统自动做，最后再让系统更会做

其中：

- 插件让系统会做
- hooks 让系统自动做
- skills 让系统更会做

## 下一步推荐

- [ClawHub 的版本、锁文件和 sync 怎么理解](/docs/manual/clawhub-versioning-and-sync)
- [插件托管 hooks 与扩展能力边界](/docs/manual/plugin-managed-hooks)
- [Skills 系统怎么工作](/docs/manual/skills-system)

把这几页串起来看，扩展层的启用顺序就会更清楚。
