---
title: 插件更新轨道和卸载回收应该怎么安排
description: 结合最新官方 plugins CLI 文档，整理一套更稳的插件生命周期治理方法，帮助团队管理 install spec、update track、卸载回收以及 memory slot 回退行为。
category: 扩展治理
difficulty: 高级
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/cli/plugins
sourceName: OpenClaw Docs
sourceType: official
tags: [plugins, lifecycle, updates, uninstall, governance]
---

# 插件更新轨道和卸载回收应该怎么安排

很多团队现在已经不只是“装不装插件”，而是开始碰到更实际的问题：

- 这个插件以后跟哪条版本轨道
- 卸载时会清掉什么
- 回滚后还有哪些残留

官方最近的 plugins CLI 文档，其实已经把这条插件生命周期链路讲得比以前清楚很多了。

## 第一原则：第一次 install spec 决定后续 update track

更稳的理解方式是：

- 安装时写下来的来源和 spec
- 会进入 `plugins.installs`
- 后续 `update <id>` 会复用这条记录

也就是说，第一次装的时候没想清楚，后面很容易一直沿着错误轨道更新。

## 第二原则：stable、beta、pin 要分开管理

插件层更适合至少分三种轨道：

- stable：默认长期依赖
- beta：少量试验插件
- pinned：关键插件固定版本

如果把三者混着用，后面最容易出现：

- 某个关键插件被 prerelease 顶掉
- 另一个试验插件又因为没 pin 无法稳定回放

## 第三原则：先看 tracked install，再做 `update --all`

官方现在已经把 update tracking 和 stored spec 讲清楚了。  
所以更稳的默认动作通常不是直接：

- `openclaw plugins update --all`

而是先确认：

- 哪些插件来自 ClawHub
- 哪些来自 npm
- 哪些被 pin
- 哪些已经在跟 `@beta`

## 第四原则：卸载要理解“记录清理”和“文件清理”是两层

根据当前官方文档，`plugins uninstall` 至少会移除：

- `plugins.entries`
- `plugins.installs`
- plugin allowlist
- 相关 `plugins.load.paths`

默认还会删掉安装目录。  
如果你用：

- `--keep-files`

则表示只清记录，不一定清磁盘文件。

## 第五原则：memory plugin 的卸载要单独看

这是最近文档里特别值的一条边界：

- 如果卸载的是 active memory plugin
- memory slot 会回退到 `memory-core`

这说明某些插件卸载不是“单纯少一个扩展”，而会牵动核心槽位回退行为。

## 第六原则：dry-run 应该成为正式卸载习惯

对于长期环境，更稳的顺序通常是：

```bash
openclaw plugins uninstall <id> --dry-run
```

先看会清哪些记录、哪些路径，再决定是否正式执行。

## 推荐的生命周期分层

### 核心长期插件

- 版本更保守
- 优先 stable / pin
- 变更前先在测试环境演练

### 试验插件

- 可以少量跟 beta
- 明确不进入正式工作流默认路径

### 高风险插件

- 需要额外回滚预案
- 卸载前先确认 config、allowlist 和 load.paths 的清理面

## 最容易踩的坑

### 1. 装的时候没在意来源

后面 update 行为就会变得不透明。

### 2. 把 `--keep-files` 当成“完全卸载”

它保留了文件层，后面仍可能让人误判环境状态。

### 3. 卸 memory plugin 前没看 slot 回退

这类变更更容易影响长期记忆体验。

## 一条更稳的团队节奏

1. 安装时明确来源和版本轨道
2. 周期性审一遍 tracked installs
3. 更新前先看哪些插件在跟 beta 或 pinned
4. 卸载前先 dry-run
5. 卸载后再做一次 list / inspect / doctor

## 下一步推荐

- [插件安装 spec、--pin 和 update tracking 应该怎么理解](/docs/reference/plugins-install-specs-and-update-tracking)
- [OpenClaw 插件系统怎么用](/docs/manual/plugins-overview)
- [社区插件目录怎么用](/docs/manual/community-plugins-directory)

