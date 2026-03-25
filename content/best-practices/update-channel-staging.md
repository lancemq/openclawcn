---
title: 团队里如何给 stable、beta、dev 分层
description: 结合最新官方 update CLI 与 Updating 文档，整理一套更稳的更新分层策略，帮助团队把 stable、beta、dev 变成有职责分工的 rollout 体系。
category: 运维治理
difficulty: 高级
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/cli/update
sourceName: OpenClaw Docs
sourceType: official
tags: [update, stable, beta, dev, staging, rollout]
---

# 团队里如何给 stable、beta、dev 分层

官方最近把 update channel 和 auto-updater 的行为写得更完整以后，很多团队真正需要的已经不是“会不会升级”，而是：

- 哪个环境跟哪条轨道

这不是小题大做，而是长期运行里最容易影响稳定性的基础决策之一。

## 第一原则：不要让所有环境跟同一条轨道

更稳的默认做法是：

- 正式环境跟 `stable`
- 试运行环境跟 `beta`
- 开发验证环境才考虑 `dev`

如果三层不分，后面所有插件、渠道、文档和运维判断都会被混在一起。

## 第二原则：把 `beta` 当成预发布验证层，不是“更快 stable”

`beta` 的价值更像：

- 提前感知风险
- 提前验证功能变化
- 给正式升级留观察窗口

而不是：

- 给所有人默认用的快捷通道

## 第三原则：把 `dev` 限定在源码责任人

官方文档已经明确说明 `dev` 牵涉：

- git checkout
- clean worktree
- fetch + rebase
- preflight lint/build

这意味着 `dev` 更适合：

- 跟上游的人
- 看实现和快速验证的人

而不是多数 operator。

## 第四原则：auto-updater 也要跟分层走

更稳的做法通常是：

- 正式实例：可以考虑 `stable` auto-updater
- beta 实例：允许更高频检查
- dev 实例：继续手动更新

这样做的好处是：

- 风险传播节奏被分散
- 出问题时更容易先锁定在哪一层

## 第五原则：插件和更新轨道要一起看

如果某个环境已经承担 `beta` 或 `dev` 角色，那它更适合同时承担：

- 插件升级验证
- 渠道回归验证
- Dashboard / WebChat 变更验证

否则你会出现一种很常见的混乱：

- 核心程序按 stable 走
- 插件却在另一条轨道里漂

## 推荐的三层模型

### 生产层

- `stable`
- 少量 pin 的关键插件
- auto-updater 可选开启

### 预发层

- `beta`
- 跟真实渠道和真实插件更接近
- 用来验证升级窗口

### 开发层

- `dev`
- 跟源码
- 允许更高频构建和回退

## 最容易踩的坑

### 1. 只有一个实例，却同时承担所有角色

这样一旦升级异常，所有链路都会一起受影响。

### 2. 正式环境开 dev

后面会把构建、doctor、插件同步和回滚都变复杂。

### 3. 开了 auto-updater 却没做实例分层

这会让变化同时打到所有面。

## 一条更稳的执行顺序

1. 先定义哪台实例是 stable / beta / dev
2. 再决定 auto-updater 是否开启
3. 再把插件和渠道验证也绑定到对应层
4. 最后才让正式环境跟进升级

## 下一步推荐

- [stable、beta、dev 更新通道该怎么选](/docs/operations/update-channels-and-safe-rollout)
- [安装器、更新与卸载](/docs/setup/installer-update-and-uninstall)
- [升级窗口怎么安排更稳](/best-practices/staged-upgrade-windows)

