---
title: 插件安装 spec、--pin 和 update tracking 应该怎么理解
description: 基于最新官方 plugins CLI 文档，解释 ClawHub first、npm-safe spec、--pin、prerelease opt-in 和 plugins.installs 的跟踪逻辑，帮助团队判断插件后续会按什么规则更新。
category: 参考
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/cli/plugins
sourceName: OpenClaw Docs
sourceType: official
tags: [plugins, clawhub, npm, pin, updates, reference]
---

# 插件安装 spec、--pin 和 update tracking 应该怎么理解

官方最近把 `openclaw plugins` CLI 文档补得比以前细很多。  
这意味着插件安装已经不只是“装上就完”，而是一条正式的来源解析、版本跟踪和后续更新链路。

## 先记住一条总规则

对 bare npm-safe plugin spec，当前官方默认是：

- ClawHub first
- 没命中再回退到 npm

这说明安装来源本身，已经开始影响你后面的更新行为。

## `install <package>` 现在不只是 npm 安装

根据当前官方文档：

```bash
openclaw plugins install <package>
openclaw plugins install clawhub:<package>
openclaw plugins install <package> --pin
```

其中最重要的边界是：

- bare spec 会先查 ClawHub
- `clawhub:<package>` 只走 ClawHub

所以你不能再把“包名”简单理解成“就是 npm 包名”。

## 官方为什么强调 npm-safe spec

当前官方 CLI 文档已经明确写出：

- npm specs 只支持 registry-only 形式
- 允许 package name + exact version 或 dist-tag
- Git/URL/file specs 和 semver range 被拒绝

这意味着插件安装面在被主动收窄，好处是：

- 来源边界更清楚
- 跟踪和回放更稳定
- 风险更容易控制

## `--pin` 真正在解决什么

官方当前文档里，`--pin` 的意思不是“现在立刻更安全一点”这么简单，而是：

- 把解析后的 exact spec 存进 `plugins.installs`

也就是说，它会直接影响：

- 以后 `plugins update <id>`
- 以及这个插件后续沿哪条版本轨道走

## 为什么 prerelease 现在需要显式 opt-in

这也是最近文档里非常值的一条边界。

官方现在明确写到：

- bare spec 和 `@latest` 默认停留在 stable track
- 如果解析结果是 prerelease，会要求你显式 opt in

例如：

- `@beta`
- `@rc`
- 或精确 prerelease version

这说明官方在主动防止一种常见误伤：

- 你以为自己装的是稳定版本
- 实际上滑进了 prerelease

## `plugins.installs` 为什么值得单独理解

当前官方 CLI 文档里，插件更新已经明确依赖：

- tracked installs in `plugins.installs`

这意味着后续 update 不是重新猜你的来源，而是复用：

- 之前记录的 install spec
- 之前记录的源信息

也就是说，第一次怎么装，后面大概率就会决定“以后怎么跟”。

## `update <id>` 和 `update <npm-spec>` 的差别

更稳的理解方式是：

### `openclaw plugins update <id>`

更偏：

- 沿用当前已记录的 install spec

### `openclaw plugins update <npm-spec>`

更偏：

- 用新的 spec 覆盖后续跟踪轨道

官方文档当前明确说明：

- 之前记录的 dist-tag（例如 `@beta`）
- 或 exact pinned version

都会继续影响后面的 id-based update。

## integrity warning 这条线为什么重要

当前官方已经把这条行为讲清楚：

- 当 stored integrity hash 存在
- fetched artifact hash 变化

更新前会警告并请求确认。

这不是“偶尔多弹一步”，而是在说明插件更新已经带上了：

- 来源校验
- 工件漂移提醒

## 中文团队最容易踩的坑

### 1. 以为 bare install 永远就是 npm

现在已经不是这样了，默认会先查 ClawHub。

### 2. 装的时候没在意 spec，更新时才发现一直跟着 `@beta`

这通常是第一次 install spec 决定的。

### 3. 把 `--pin` 当成一次性行为

它其实会继续影响后续 update tracking。

## 一条更稳的安装顺序

通常更适合这样做：

1. 先明确来源是 ClawHub 还是 npm
2. 再明确是 stable 还是 prerelease
3. 需要稳定跟踪时用 `--pin`
4. 后续再用 `plugins update <id>` 沿原轨道更新

## 下一步推荐

- [OpenClaw 插件系统怎么用](/docs/manual/plugins-overview)
- [社区插件目录怎么用](/docs/manual/community-plugins-directory)
- [插件更新轨道和卸载回收应该怎么安排](/best-practices/plugin-lifecycle-governance)

