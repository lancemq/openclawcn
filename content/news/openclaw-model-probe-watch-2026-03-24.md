---
title: "OpenClaw 模型观察：models status 正在从状态展示继续长成探活入口"
description: "基于 2026 年 3 月 24 日可见的官方 CLI 文档，最近模型层最值得关注的变化之一是 models status 已经不只负责展示主模型和 fallback，而是开始承担 auth profile 探测。"
category: 生态观察
date: "2026-03-24"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/cli"
updatedAt: "2026-03-24"
sourceType: "official"
tags: ["models", "probe", "providers", "auth", "monitoring"]
---

OpenClaw 最近这轮 CLI 文档里，一个很值得中文团队注意的变化是：

- `models status` 不再只是状态展示

根据当前官方 CLI 文档，它现在已经明确支持：

- `--check`
- `--probe`
- `--probe-provider`

## 1. 模型层正在从“配置展示”走向“探活检查”

这不是小功能追加，而是模型运维心智在变。  
以前很多人看模型层，主要关心：

- 主模型是谁
- fallback 是谁

现在官方更像是在鼓励大家继续看：

- auth profile 现在能不能用
- 当前 provider 是否真的可达

## 2. `--probe` 让 auth profile 成为显式治理对象

这说明模型问题越来越不该只理解成“模型名写得对不对”，而要开始理解成：

- provider
- auth profile
- fallback

三层一起工作。

## 3. `--probe-provider` 让单 provider 定位更现实

官方没有把探测只做成全局动作，而是继续给出了：

- `--probe-provider <name>`

这代表模型层排障正在变得更适合长期运行：

- 先定界到单 provider
- 再看探测结果

## 这对中文团队意味着什么

如果你还停留在“配好 fallback 就差不多了”，可能已经低估了当前模型运维的复杂度。  
从最近官方信号看，更现实的模型层已经包括：

- 配置解析
- 凭据健康
- 单 provider 探活
- fallback 接棒

## 推荐延伸阅读

- [models status --probe 和 auth profiles 应该怎么看](/docs/reference/models-status-probe-and-auth-profiles)
- [用 models status 做模型健康检查](/docs/operations/models-status-and-health-checks)
- [Model Health 与 Auth 监控实践](/best-practices/model-auth-monitoring)

