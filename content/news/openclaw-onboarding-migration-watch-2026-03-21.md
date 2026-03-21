---
title: OpenClaw 接入观察：从 2026.1.29 的迁移信号到现在的 Onboarding Wizard，官方已经把“第一次跑通”做成更完整链路
description: 基于 2026 年 3 月 21 日可见的官方 Onboarding、Install 与 Releases 页面，整理 OpenClaw 从命名迁移、路径自动迁移到本地/远程 wizard 分流这条接入链路最近最值得注意的变化。
category: 生态动态
date: 2026-03-21
author: OpenClawCN
source: https://docs.openclaw.ai/start/wizard
sourceName: OpenClaw Docs
updatedAt: 2026-03-21
sourceType: official
tags: [onboarding, migration, install, upgrade, maintenance]
---

# OpenClaw 接入观察：从 2026.1.29 的迁移信号到现在的 Onboarding Wizard，官方已经把“第一次跑通”做成更完整链路

截至 **2026 年 3 月 21 日**，官方在接入和升级这条线上最值得中文站继续跟的，不再只是“安装命令变了没有”，而是整条首次接入链路已经明显成熟了。

把最近的 Onboarding、Install 和 Releases 放在一起看，会发现官方其实在持续补三件事：

- 首次安装怎么更稳地跑通
- 旧环境怎么自动迁移
- 本地和远程怎么明确分流

## 1. `2026.1.29` 这次迁移信号仍然非常关键

官方 release 记录里，`2026.1.29` 这版最值得记住的，不只是 rename 本身，而是它同时动了几层东西：

- npm 包和 CLI 名称统一到 `openclaw`
- 扩展移到 `@openclaw/*`
- legacy state/config path 开始自动迁移

这说明官方已经不再把“第一次装起来”和“老用户升级”当成完全分离的问题，而是在主动补迁移链路。

## 2. Wizard 现在已经不只是“新手提示框”

最新官方 Wizard 文档现在明确写出了：

- local mode
- remote mode
- QuickStart
- Advanced
- health check
- skills 安装

这说明 `openclaw onboard` 已经越来越像一条正式初始化流水线，而不是简单问几道题。

特别值得注意的是：

- remote mode 只配本地客户端，不碰远程主机

这让很多以前容易混掉的部署边界，现在终于说清楚了。

## 3. 安装器、onboarding 和 doctor 正在被串成一条维护链

从最新 Install 和 Updating 文档看，官方现在更明显地在推动这样一条路径：

- 安装器负责环境和 CLI
- wizard 负责第一次配置
- doctor 负责安装后和升级后的确认

这对中文站很重要，因为它意味着后面写教程时，不该再把这些分散看成互不相关的步骤。

## 4. “最快第一次聊天”这条线也被官方收得更紧了

最新 QuickStart 里，官方现在更直接地强调：

- 最快第一次聊天其实就是先开 Control UI

这件事的意义不小，因为它把首次成功体验从“先接一个渠道”收缩成了“先把 Gateway 跑起来并进入 dashboard”。

这对中文用户特别有帮助，因为它能显著减少第一次接入时的变量数量。

## 5. 这条链路透露出的共同趋势

把这些变化放在一起看，会发现官方在做的并不是“更多文档”，而是在把接入链路产品化：

- 安装更标准
- 初始化更明确
- 迁移更可控
- 首次成功路径更短

这就是为什么现在比起一味加更多“功能说明”，中文站更值得继续补“接入与维护链路”的原因。

## 中文站建议怎么跟进

如果你要顺着这条线继续看，建议这样读：

1. 想搞清第一次怎么开始：看 [Onboarding 的本地模式和远程模式怎么选](/docs/getting-started/onboarding-local-vs-remote)
2. 想搞清安装方式和后续升级如何对应：看 [安装器方式和升级路径怎么选](/docs/setup/installer-methods-and-upgrade-paths)
3. 想让升级更稳：再看 [升级窗口怎么安排更稳](/best-practices/staged-upgrade-windows)

这批官方变化最值得注意的，不是哪一个按钮或参数，而是“从零到长期维护”这条路径终于越来越像一套完整系统，而不是零散命令集合。
