---
title: "OpenClaw 更新观察：stable、beta、dev 正在从版本标签变成正式 rollout 体系"
description: "基于 2026 年 3 月 24 日可见的官方 update CLI 与 Updating 文档，最近最值得关注的变化之一是更新通道和 auto-updater 行为已经被官方写成一套明确的 rollout 逻辑。"
category: 生态观察
date: "2026-03-24"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/cli/update"
updatedAt: "2026-03-24"
sourceType: "official"
tags: ["update", "stable", "beta", "dev", "rollout"]
---

最近这轮官方 update 文档里，一个很值得中文团队单独跟进的信号是：

- stable、beta、dev 已经不再只是三个名字

而是在变成：

- 正式 rollout 体系

## 1. 更新通道正在决定安装方式和更新行为

根据当前官方 CLI 文档：

- `dev` 会确保 git checkout
- `stable` / `beta` 则继续走 npm 轨道

这说明 channel 不只是“看哪个版本”，而是在影响整个 update path。

## 2. auto-updater 也开始区分三条节奏

官方现在明确写到：

- stable 带 delay + jitter
- beta 高频检查并快速应用
- dev 不自动 apply

这已经明显不是“有自动更新 / 没自动更新”两种状态，而是更成熟的分层。

## 3. 这会改变团队升级顺序

如果以前很多团队只看：

- 有没有新版本

那现在更应该先看：

- 哪台实例该跟哪条 channel

## 推荐延伸阅读

- [stable、beta、dev 更新通道该怎么选](/docs/operations/update-channels-and-safe-rollout)
- [团队里如何给 stable、beta、dev 分层](/best-practices/update-channel-staging)
- [安装器、更新与卸载](/docs/setup/installer-update-and-uninstall)

