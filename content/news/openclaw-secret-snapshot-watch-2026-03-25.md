---
title: "OpenClaw Secret 观察：active snapshot 正在把密钥轮换从“即时取值”收成“原子切换”"
description: "基于 2026 年 3 月 25 日可见的官方 Secrets Management 文档，最近 secrets 层最值得关注的变化之一是 active snapshot 与 last-known-good 的边界越来越清楚。"
category: 生态观察
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/gateway/secrets"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["secretrefs", "snapshot", "rotation", "secrets", "operations"]
---

最近这轮官方 Secrets Management 文档里，一个很值得中文团队单独关注的点是：

- secret rotation 正在被官方继续写成 snapshot 切换问题

而不是：

- 请求时即时查 secret

## 1. active snapshot 的边界越来越清楚

当前官方信号已经很明确：

- 激活时 eager resolve
- 运行时读 active snapshot

这说明 secrets 层正在走向更强的运行时稳定性模型。

## 2. reload 失败时保留 last-known-good 非常关键

这代表 secret rotation 的失败模式，越来越不该被理解成：

- 线上立刻半坏

而更接近：

- 新快照没上来
- 老快照继续服务

## 3. 这会改变团队的轮换心智

如果以前很多团队会按“换一个 key 字段”来想，现在更稳的单位应该变成：

- 一整套可激活快照

## 推荐延伸阅读

- [Secret rotation 和 active snapshot 应该怎么配合](/best-practices/secret-rotation-with-active-snapshot)
- [SecretRefs 和运行时快照应该怎么理解](/docs/reference/secret-refs-and-runtime-snapshot)
- [环境变量从哪里来，优先级怎么排](/docs/reference/env-sources-and-precedence)

