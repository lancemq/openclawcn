---
title: "OpenClaw 执行审批观察：CLI、per-agent allowlist 与聊天转发正在把宿主机执行面做成正式治理层"
description: "基于 2026 年 3 月 24 日可见的官方 approvals CLI 与 Exec Approvals 文档，最近最值得关注的信号不是“能不能审批”，而是宿主机执行边界已经开始形成一套完整治理面。"
category: 生态观察
date: "2026-03-24"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/tools/exec-approvals"
updatedAt: "2026-03-24"
sourceType: "official"
tags: ["approvals", "exec", "allowlist", "security", "gateway", "node"]
---

OpenClaw 最近这轮官方文档里，一个很值得中文站单独观察的变化是：

- 执行审批不再只是“危险命令前弹个框”

而是在逐步收敛成一套正式的宿主机执行治理层。

把最近可见的 approvals CLI 和 Exec Approvals 文档放在一起看，会发现至少有四个信号已经连起来了。

## 1. approvals 已经是正式 CLI 面，而不是隐藏配置

官方现在明确给出了：

- `openclaw approvals get`
- `openclaw approvals set`
- `openclaw approvals allowlist add/remove`

而且可以分别操作：

- 本机
- Gateway
- 指定 Node

这说明执行边界已经不是只能去手改 JSON 的“高级技巧”，而是在被做成正式运维接口。

## 2. per-agent allowlist 正在变成默认治理思路

Exec Approvals 文档最近最值的一点，是把 allowlist 明确写成：

- per-agent

这代表官方希望团队按 agent 划执行面，而不是按“整台机大概能跑什么”去管理。

这会直接影响团队后续怎么做：

- 内容 agent 的权限边界
- 运维 agent 的命令集
- 临时分析 agent 的审批策略

## 3. `safeBins`、`allowlist` 和 `ask` 终于被拆开了

过去很多团队容易把这几层都混成“安全放行”。  
但当前官方文档已经把它们分得很清楚：

- `safeBins` 是很窄的 stdin-only 快捷通道
- `allowlist` 是显式信任某条路径
- `ask` 和 `askFallback` 决定未命中时如何处理

这意味着 OpenClaw 的执行面，正在从“给不给跑”走向“具体按哪种治理方式跑”。

## 4. 审批转发已经不只是本地弹窗

Exec Approvals 文档当前明确支持把审批请求转发到聊天渠道，并用：

- `/approve <id> allow-once`
- `/approve <id> allow-always`
- `/approve <id> deny`

来处理。

这对远程部署和团队值守来说非常关键，因为它意味着：

- 宿主机执行审批已经可以作为正式运营动作流转

而不是只能守在同一台机器前手工点按钮。

## 这对中文团队意味着什么

如果你还把执行审批只理解成“防误触”的本地小功能，可能已经低估了它。  
从最近官方信号看，它更像一套逐渐成型的治理层：

- CLI 可管
- per-agent 可分
- Gateway / Node 可分宿主
- 聊天渠道可转发

这会让 OpenClaw 的高权限执行能力，越来越接近正式团队环境可运营的状态。

## 推荐延伸阅读

- [approvals CLI、网关与节点 allowlist 怎么管理](/docs/reference/approvals-cli-and-allowlist)
- [团队里如何做 per-agent 执行白名单治理](/best-practices/per-agent-allowlist-governance)
- [Exec 工具、apply_patch 与执行审批](/docs/manual/exec-tools-and-approvals)

