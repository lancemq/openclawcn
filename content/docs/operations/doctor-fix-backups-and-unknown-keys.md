---
title: doctor 的备份、unknown keys 清理和 --fix 该怎么理解
description: 基于最新官方 Doctor 文档，解释 openclaw doctor 在修复 stale config、unknown keys 和 legacy 状态时的备份与收口方式，帮助团队区分安全修复和强制覆盖。
category: 运维
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/doctor
sourceName: OpenClaw Docs
sourceType: official
tags: [doctor, repair, backups, config, unknown-keys]
---

# doctor 的备份、unknown keys 清理和 --fix 该怎么理解

站里已经有一页在讲 `doctor` 的 repair、force 和 non-interactive 模式，但最近官方文档里还有一层很值的边界：

- doctor 在修 stale config、unknown keys 和 legacy 状态时，不只是“改一改”

而是在做一套更明确的：

- 备份
- 清理
- 修复

流程。

## 先记住 doctor 最近更像什么

更稳的理解方式不是：

- 一个健康检查器

而是：

- 一个带迁移和修复能力的维护入口

这点在处理：

- unknown config keys
- 旧状态残留
- 多 state dir 分裂

时尤其明显。

## 为什么 unknown keys 值得单独看

官方配置模型本来就很严格。  
这意味着一旦环境里残留：

- 旧字段
- 拼错字段
- 已废弃字段

后面很多现象都可能看起来像：

- 配置写了但没按预期工作
- 启动失败
- 某些层像在读旧配置

所以 doctor 清 unknown keys，不是小清洁，而是正式配置收口的一部分。

## 备份在这里为什么重要

doctor 最近文档里一个很值得长期记住的方向，是它并不鼓励你把修复理解成：

- 直接覆盖再说

更稳的心智应该是：

- 在做配置和状态收口前，要保留可回看痕迹

这也是为什么：

- repair
- deep
- force

应该分层使用，而不是上来就猛修。

## `--repair` 更适合修什么

更适合进入 `--repair` 的通常是：

- stale config / state
- 明确的可行动修复
- 安全范围内的 restart / restart-adjacent 动作

它更像：

- 推荐修复入口

## `--repair --force` 又在跨什么边界

当前官方文档已经明确说明：

- `--force` 会应用更 aggressive 的修复

这代表它可能跨过：

- 本来应该更保守的人为确认边界

例如：

- 覆盖某些自定义 supervisor configs
- 更强地重写遗留状态

所以它不该成为日常“顺手带上”的参数。

## `--non-interactive` 为什么修得更少

这点和很多人的直觉相反。

官方当前明确写到：

- `--non-interactive` 只做 safe migrations

也就是说，它更像：

- 安全迁移器

而不是：

- 无人值守全自动修复器

## 哪些场景更适合先看再修

- 升级后异常
- 怀疑 legacy state 干扰
- 怀疑当前实例读到了旧 config
- 远程值守环境下不确定修复面有多大

这时更稳的顺序通常是：

1. 先 `openclaw doctor`
2. 再确认修复建议
3. 再进入 `--repair`

## 中文团队最容易踩的坑

### 1. 把 unknown keys 当成“无伤大雅”

对严格配置系统来说，往往不是。

### 2. 以为 `--non-interactive` 会自动替你做完所有修复

它反而更保守。

### 3. 直接把 `--force` 当默认修法

这会把日常收口和最后手段混成一件事。

## 一条更稳的使用顺序

1. 先看 doctor 输出里是不是 stale config / unknown keys / legacy 状态
2. 先确认当前实例和 state dir 归属
3. 需要正式修时再进 `--repair`
4. 只有确认需要强覆盖时才用 `--repair --force`

## 下一步推荐

- [doctor 的 repair、force 和 non-interactive 应该怎么选](/docs/reference/doctor-repair-modes)
- [配置热重载与 include 合并怎么用](/docs/operations/config-hot-reload-and-includes)
- [后台维护任务应该怎么分 lane 和保留周期](/best-practices/maintenance-lanes-and-retention)

