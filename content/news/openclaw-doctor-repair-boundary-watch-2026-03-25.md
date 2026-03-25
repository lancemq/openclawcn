---
title: "OpenClaw 排障观察：doctor 正在从“检查器”继续长成带备份心智的修复入口"
description: "基于 2026 年 3 月 25 日可见的官方 Doctor 文档，最近排障层最值得关注的变化之一是 doctor 对 stale config、unknown keys 和 legacy 状态的处理边界越来越清楚。"
category: 生态观察
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/doctor"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["doctor", "repair", "config", "maintenance", "diagnostics"]
---

最近这轮官方 Doctor 文档里，一个很值得中文团队单独注意的变化是：

- doctor 已经不再只是检查器

它正在继续长成一个更明确的：

- 迁移
- 清理
- 修复

入口。

## 1. unknown keys 和 stale config 已经进入正式收口范围

这意味着很多“配置看起来奇怪”的问题，官方已经不再把它们留给人手工猜，而是在逐步收进 doctor 的修复心智里。

## 2. `--repair`、`--force`、`--non-interactive` 的分层也在变清楚

这代表官方正在主动阻止另一种常见误区：

- 把所有修复模式都理解成“只是力度不同”

实际上它们越来越像不同风险层级的入口。

## 3. 这会改变中文团队的排障顺序

如果以前很多团队会直接上来“强修一次看看”，现在更稳的顺序会变成：

1. 先看 doctor 输出到底在指向 stale config、unknown keys 还是 legacy 状态
2. 再决定是否进入 repair

## 推荐延伸阅读

- [doctor 的备份、unknown keys 清理和 --fix 该怎么理解](/docs/operations/doctor-fix-backups-and-unknown-keys)
- [doctor 的 repair、force 和 non-interactive 应该怎么选](/docs/reference/doctor-repair-modes)
- [后台维护任务应该怎么分 lane 和保留周期](/best-practices/maintenance-lanes-and-retention)

