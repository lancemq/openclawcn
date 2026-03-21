---
title: ClawHub 的版本、锁文件和 sync 怎么理解
description: 基于最新官方 ClawHub 文档，整理 skill bundle 的版本化、.clawhub/lock.json 的作用、sync 的扫描规则，以及为什么 ClawHub 不只是“安装站”。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/tools/clawhub
sourceName: OpenClaw Docs
sourceType: official
tags: [clawhub, skills, sync, lockfile, versioning]
---

# ClawHub 的版本、锁文件和 sync 怎么理解

站里已经有一页在讲 Skills 系统，但官方最近的 ClawHub 文档把一个更具体也更实用的层面讲得很清楚了：

- ClawHub 不只是“找技能并装一下”
- 它其实已经是一个带版本、锁文件和同步能力的公开技能注册表

## ClawHub 现在到底是什么

根据最新官方文档，ClawHub 当前至少承担三种角色：

- 技能发现入口
- 技能 bundle 的版本仓库
- 本地技能与公开注册表之间的同步层

这意味着它已经不是一个“技能列表网页”，而是在向正式 registry 靠拢。

## 为什么 skill 是“bundle”这点很关键

官方文档当前明确写到：

- 每个 skill publish 的是一个 versioned bundle

也就是说，被版本化的不只是 `SKILL.md` 一段说明，而是整组技能文件。

这点很重要，因为它意味着：

- 安装的是一整份可审计内容
- 更新也是整份 bundle 的版本变化

## `.clawhub/lock.json` 在解决什么问题

这是当前官方文档里很值得中文站单独提醒的一点。

ClawHub 会把已安装技能记录在：

```text
.clawhub/lock.json
```

它的实际价值是：

- 记录本地装了哪些 skill
- 记住它们来自哪个 slug / 版本
- 给后续 `update` 和 `list` 提供事实来源

这意味着它不只是附带文件，而更像 skills 的安装账本。

## `clawhub update` 为什么不只是重新下载

官方文档当前说明，更新时会把本地文件和 registry 版本做 content hash 对比。

这就带来一个很重要的边界：

- 如果你本地技能已经手改到不匹配任何已发布版本
- `update` 会提醒或要求 `--force`

这意味着 ClawHub 不会假装“本地所有技能都没被改过”，它是在显式保护你的本地覆盖。

## `sync` 的意义比很多人以为的大

官方文档现在对 `clawhub sync` 写得非常细。

它不只是：

- 帮你扫一下本地技能

而是在做：

- 扫描
- 匹配版本
- 发现变更
- 必要时发布新版本

这让它更像：

- 本地 skills 和公开 registry 之间的同步器

而不只是安装器。

## `sync` 会扫哪些目录

根据当前官方文档，`sync` 会优先扫当前 workdir。

如果没找到，还会回退到一些 legacy 路径，例如：

- `~/openclaw/skills`
- `~/.openclaw/skills`

这点很值，因为它说明 ClawHub 已经在兼容旧技能布局，而不是只服务全新项目。

## `latest` tag 和 semver 为什么值得一起看

官方文档当前明确提到：

- 每个 publish 都有 semver
- tags 如 `latest` 可以移动

这意味着你在理解 ClawHub 版本时，最好区分两层：

- 真实版本号
- 指向哪个版本的 tag

对长期维护来说，这能帮助你理解：

- 为什么某个技能更新了
- 为什么 `latest` 并不一定等于你本地当前版本

## 中文站建议怎么使用 ClawHub

更稳的实践通常是：

1. 用 `search` 找技能
2. 用 `install` 装到当前 workspace
3. 用 `.clawhub/lock.json` 理解本地安装状态
4. 用 `update --all` 做例行更新
5. 需要备份或共享时再用 `sync`

这样会比把 ClawHub 当成“装完就忘”的工具更适合长期使用。

## 下一步推荐

- [Skills 系统怎么工作](/docs/manual/skills-system)
- [插件托管 hooks 与扩展能力边界](/docs/manual/plugin-managed-hooks)
- [团队里如何管理插件包和 Hook Pack](/best-practices/plugin-bundle-governance)

把这几页连起来看，skills、plugins 和 registry 之间的关系会更清楚。
