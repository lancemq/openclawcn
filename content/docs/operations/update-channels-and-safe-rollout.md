---
title: stable、beta、dev 更新通道该怎么选
description: 基于最新官方 update CLI 与 Updating 文档，解释 OpenClaw 的 stable、beta、dev 三条更新轨道、auto-updater 行为和更适合的长期 rollout 顺序。
category: 运维
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/cli/update
sourceName: OpenClaw Docs
sourceType: official
tags: [update, channels, stable, beta, dev, rollout]
---

# stable、beta、dev 更新通道该怎么选

最近官方把 `openclaw update` 和 Updating 文档补得更完整以后，一个非常值得中文团队单独理解的点是：

- OpenClaw 的更新已经不是“升不升级”两种状态

而是开始形成：

- stable
- beta
- dev

三条明确轨道。

## 先用一句话记住差别

- `stable`：更适合正式长期运行
- `beta`：更适合提前跟变化但仍保留版本轨道
- `dev`：更适合源码跟进和高频验证

## `openclaw update` 现在不只是升级命令

根据当前官方 CLI 文档，它已经同时承担：

- 更新
- 切 channel
- 切 tag / 版本目标
- 重启前后安全检查

常见入口包括：

```bash
openclaw update
openclaw update status
openclaw update wizard
openclaw update --channel beta
openclaw update --channel dev
openclaw update --dry-run
```

这说明更新逻辑已经越来越像正式运维面，而不是单次安装脚本附属功能。

## 三条通道在官方里分别怎么落

根据当前官方 CLI 文档：

- `stable`：checkout latest non-beta tag，随后 build + doctor
- `beta`：checkout latest `-beta` tag，随后 build + doctor
- `dev`：checkout `main`，然后 fetch + rebase

这意味着它们不是三个名字而已，而是三种不同更新行为。

## 为什么 `dev` 特别值得保守使用

官方现在已经把 dev checkout flow 写得很清楚：

- 需要 clean worktree
- 会做临时 worktree 里的 lint + TypeScript build 预检
- tip 失败时还会回退找最近的可构建 commit

这说明 `dev` 已经被当成：

- 持续跟随上游开发

而不是：

- 普通用户顺手切一下的体验模式

## auto-updater 现在怎么工作

Updating 文档当前明确说明：

- auto-updater 默认关闭

开启后，不同 channel 行为也不同：

- `stable`：等待 `stableDelayHours`，再配 deterministic jitter 分散 rollout
- `beta`：按 `betaCheckIntervalHours` 高频检查并立即应用
- `dev`：不自动应用，继续靠手动 `openclaw update`

这意味着“自动更新”本身也已经带上了不同风险节奏。

## 为什么 `stable` 更适合团队默认轨道

官方这套设计本身就已经在表达一个很现实的治理建议：

- 团队正式环境不应该和上游开发 tip 同步

`stable` 的延迟和抖动，本质上是在给：

- 风险分散
- 回看问题
- 留出观察窗口

## 什么时候可以考虑 `beta`

- 你想提前看新能力
- 你愿意承担更快变化
- 但仍希望保留明确发布轨道

它更像：

- 提前试运行层

而不是彻底开发态。

## 什么时候才适合 `dev`

- 你本身就在跟源码
- 你愿意接受更高变动频率
- 你能处理 clean worktree、构建和 doctor 这条线

如果不满足这些前提，`dev` 通常会把维护成本拉得很高。

## 一条更稳的 rollout 顺序

多数团队更适合按这条线推进：

1. 生产环境默认 `stable`
2. 一台试验实例先跟 `beta`
3. 真要看上游开发，再单独开 `dev`
4. 插件和渠道环境也跟着同一节奏验证

## 最容易踩的坑

### 1. 把 `beta` 和 `dev` 当成同一类“更快更新”

两者风险完全不是一层。

### 2. 正式环境直接切 `dev`

后面最容易把源码、插件和服务状态一起搅乱。

### 3. 开了 auto-updater 却没给实例分层

这样往往会让所有环境同时承担同样风险。

## 下一步推荐

- [安装器、更新与卸载](/docs/setup/installer-update-and-uninstall)
- [升级窗口怎么安排更稳](/best-practices/staged-upgrade-windows)
- [Release 跟踪到升级决策这条线怎么走](/best-practices/release-watch-to-upgrade-decision)

