---
title: Hooks 生命周期与事件类型
description: 基于最新官方 Hooks 文档，解释 agent:bootstrap、session start/end、/new、/reset 等生命周期事件分别适合放什么逻辑，以及什么时候该用 hook pack 或插件托管 hooks。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/automation/hooks
sourceName: OpenClaw Docs
sourceType: official
tags: [hooks, lifecycle, events, automation, plugins]
---

# Hooks 生命周期与事件类型

很多人第一次接触 Hooks，会把它理解成“某个时刻跑一段脚本”。但最新官方文档已经把 hooks 做成一套完整的生命周期事件系统，不同事件的用途差别非常大。

如果你不先区分事件类型，后面最容易出现的问题就是：逻辑能跑，但放错了地方。

## Hooks 现在覆盖哪些典型时机

根据最新官方文档，当前 hooks 主要覆盖三类触发点：

- 会话/命令生命周期
- agent 启动和上下文准备
- 系统内部关键动作后的延伸逻辑

文档里提到的典型例子包括：

- `/new`
- `/reset`
- session started / ended
- `agent:bootstrap`

这些事件虽然都叫 hook，但它们适合承载的逻辑完全不一样。

## `/new` 和 `/reset` 最适合什么

这两个事件更适合做“会话收尾”和“状态转移”相关动作，例如：

- 保存记忆快照
- 写审计日志
- 输出工作区摘要
- 清理某些临时状态

官方 bundled hook 里的 `session-memory` 就是典型例子：在你开启新会话时，把旧上下文保存到工作区记忆目录。

## `agent:bootstrap` 最适合什么

`agent:bootstrap` 是很值得单独理解的一类事件。

它适合处理：

- 注入额外文件
- 在会话开始时准备工作区环境
- 把某些固定资源放进 agent 初始上下文

官方文档里的 `bootstrap-extra-files` 和 `boot-md` 都属于这个方向。

这类事件的边界在于：

- 它更像“开局准备”
- 不适合承载高频业务逻辑
- 更适合做环境搭建，而不是持续触发

## session started / ended 适合什么

如果你要做更持续的运维或可观测性，session 生命周期事件通常比命令事件更合适。

例如：

- 会话开始时记录环境信息
- 会话结束时汇总关键结果
- 做持续审计或统计
- 标记某些长期流程的开始与结束

这类事件最容易和“自动化值守”“审计追踪”“交付统计”结合起来。

## 为什么官方会强调 hook pack

最新文档里，hooks 已经不仅支持单脚本，还支持成组管理的 hook pack。

它的价值很直接：

- 一组相关 hook 一起分发
- 统一配置与启停
- 更适合团队内部标准化

如果你已经从“写一个小 hook”走向“维护一套会话治理或审计能力”，hook pack 通常会比零散脚本更可控。

## 什么时候该放进插件里托管

官方文档也明确提到：hooks 可以由插件托管，而不是只放在独立 hooks 目录里。

更适合由插件托管的情况通常包括：

- hook 和某个插件能力强耦合
- 你希望安装插件时一并带上 hook
- 这组 hooks 需要共享插件配置或依赖
- 这其实已经是“一个能力包”，而不是零散脚本

也就是说：

- 单点自动化 -> 独立 hook
- 一组成套能力 -> hook pack
- 和扩展能力强绑定 -> 插件托管 hooks

## 什么时候不要把逻辑塞进 hook

hook 很强，但不是什么都该放进去。

不太适合 hook 的情况包括：

- 长时间运行的大任务
- 明确要求准点执行的调度任务
- 需要独立上下文的复杂分析

这些通常更适合：

- Heartbeat
- Cron main
- Cron isolated

如果你把调度逻辑、长任务和生命周期钩子混成一层，后续就会很难维护。

## 中文站建议的判断法

可以用下面这个顺序快速判断：

1. 这是“开局准备”还是“会话收尾”
2. 它是会随命令发生，还是会随 session 发生
3. 它是单个 hook，还是应该做成 pack
4. 它是否和某个插件能力强绑定

如果能先把这四步想清楚，再写 hook，后面的组织方式会清晰很多。

## 下一步推荐

- [Hooks 能做什么](/docs/manual/hooks-overview)
- [用 Webhooks 接外部系统](/docs/manual/webhooks-external-triggers)
- [用 Heartbeat 和 Cron 做低噪音自动化](/best-practices/heartbeat-cron-composition)
