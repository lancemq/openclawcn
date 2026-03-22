---
title: "OpenClaw 的诊断与修复工作流正在成型"
description: "官方最近围绕 Doctor、Diagnostics Flags、Debugging 和 sessions cleanup 的文档更新，正在把 OpenClaw 的排障方式从“看日志猜”推进到更清楚的 repair ladder。"
category: 生态观察
date: "2026-03-22"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/doctor"
updatedAt: "2026-03-22"
sourceType: "official"
tags: ["doctor", "diagnostics", "repair", "debugging", "operations"]
---

最近这轮官方 Doctor、Diagnostics Flags、Debugging 和 sessions cleanup 文档，一个很明显的趋势是：OpenClaw 的排障方式正在从“出问题后看日志猜”走向更清楚的 repair ladder。

现在几条原本容易混在一起的能力，已经开始被拆得更清楚：

- doctor 负责检查、迁移和修复建议
- diagnostics flags 负责定向放大某个子系统
- runtime debug overrides 负责临时改运行时行为
- sessions cleanup 负责 session / transcript 生命周期维护

这意味着长期运行里的“修”和“看”，开始不再是同一件事。

## 1. doctor 已经不是轻量检查器了

官方最近对 doctor 的定位已经很明确：

- repair + migration tool

再加上它现在能处理 orphan transcripts、legacy cron shape、OAuth 健康、sandbox 镜像、服务残留等问题，它已经明显不是“看看环境变量”的级别了。

## 2. diagnostics flags 把排障从全局 verbose 拉回定向观察

Diagnostics Flags 文档最近最值得看的，是它强调：

- 不需要为了看某个子系统，就把所有地方都调成更吵

这会让 OpenClaw 的调试方式更像一个有控制面的系统，而不是只能靠“大喊大叫式日志”。

## 3. cleanup 也被正式纳入修复链条

sessions cleanup 最近的文档边界非常清楚：

- 它不等于 doctor
- 也不等于 cron maintenance

这会让长期运行后的维护终于不再只是“删删目录看有没有用”。

## 4. repair ladder 的层次开始出现

如果把这几页一起看，官方越来越像在鼓励一种更成熟的顺序：

- 先用 status / logs / flags 确认问题层级
- 再用 doctor 判断是否需要修复或迁移
- 最后再做 cleanup 或更强的 repair

这比一上来就 `--repair --force` 稳很多。

## 对中文用户最有价值的提醒

如果你已经开始：

- 长期跑 Gateway
- 远程维护环境
- 经常改配置、接插件、跑 cron

那接下来最值得补的认知不是更多“奇技淫巧”，而是：

- 什么该先观察
- 什么该先修
- 什么其实只是 lifecycle 维护

## 推荐延伸阅读

- [doctor 的 repair、force 和 non-interactive 应该怎么选](/docs/reference/doctor-repair-modes)
- [Diagnostics flags 和定向日志应该怎么用](/docs/reference/diagnostics-flags-and-targeted-logs)
- [从巡检到修复的排障阶梯应该怎么走](/best-practices/repair-ladder-playbook)
