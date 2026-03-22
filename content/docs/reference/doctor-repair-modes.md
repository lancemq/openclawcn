---
title: doctor 的 repair、force 和 non-interactive 应该怎么选
description: 基于最新官方 Doctor 文档，解释 openclaw doctor 在 interactive、--repair、--force、--yes、--non-interactive 和 --deep 之间各自会做什么，避免把修复模式混成“越猛越好”。
category: 参考
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/doctor
sourceName: OpenClaw Docs
sourceType: official
tags: [doctor, repair, diagnostics, migrations, reference]
---

# doctor 的 repair、force 和 non-interactive 应该怎么选

站里已经多次提到 `openclaw doctor`，但官方最近把它正式定义成：

- repair + migration tool

这很重要，因为它说明 doctor 早就不只是“看看健康状态”，而是真正会：

- 检查
- 迁移
- 修复

所以不同模式的边界一定要分清。

## 先记住 doctor 现在到底在干什么

根据最新官方文档，doctor 会处理很多不同层面的事情，例如：

- stale config / state
- health checks
- actionable repair steps
- legacy state migrations

也就是说，它不是一个单点检查器，而更像：

- 安装后、升级后和故障时的综合维修入口

## 默认 `openclaw doctor` 适合什么

默认模式更适合：

- 先看状态
- 让你逐步确认
- 在交互式环境里做有提示的修复

如果你人在终端前，这通常是最稳的起点。

## `--yes` 和 `--repair` 不完全一样

这两个很容易混。

### `--yes`

官方文档当前解释为：

- 接受默认提示

它适合：

- 你还想保留整套交互流程
- 只是希望减少逐项确认

### `--repair`

更明确地表示：

- 直接应用推荐修复

而且官方现在写得很清楚：

- repairs + restarts where safe

所以它的动作性更强。

## `--repair --force` 为什么要更谨慎

官方文档明确说明：

- `--force` 会应用 aggressive repairs
- 例如覆盖自定义 supervisor configs

这意味着它不是“更彻底一点”的普通增强，而是：

- 会跨过一些本来应该更保守的边界

更适合的场景通常是：

- 你已经确认环境就是坏状态
- 推荐修复不够
- 你也接受覆盖某些自定义服务配置

## `--non-interactive` 不等于“无人值守全自动修好”

这是最容易误判的一点。

官方当前明确写到：

- `--non-interactive` 只做 safe migrations
- 会跳过需要人工确认的 restart / service / sandbox 动作

这意味着它更像：

- 无提示巡检 + 安全迁移

而不是：

- 完整自动维修

所以 headless 场景里，如果你以为 `--non-interactive` 会帮你把所有问题都修完，预期就会错。

## `--deep` 在补哪一层

官方最近给 `--deep` 的定位也很值：

- 扫系统服务里额外的 gateway installs
- launchd / systemd / schtasks 都会看

这说明它在补的是：

- “机器上到底还有没有别的 OpenClaw 安装或旧服务残留”

当你遇到：

- 明明改了配置却没生效
- Gateway 像在读别的 state dir
- 升级后还是有旧服务抢占

这类问题时，`--deep` 很有价值。

## 官方现在最值得注意的几类修复对象

从最新 Doctor 文档看，比较有价值的检查点包括：

- state dir 缺失或不可写
- session dirs 缺失
- recent transcript mismatch
- main session 只有 1 行 JSONL
- 多个 state dirs 分裂
- OAuth profile 过期或 cooldown / disable
- sandbox 镜像缺失
- legacy gateway service 残留
- trusted / DM policy 类高风险配置

这已经远超“看个端口是不是开着”。

## headless / cron 场景为什么要保守选模式

官方 doctor 文档还明确提醒：

- 某些交互修复只有在 TTY 下才会出现

所以在：

- cron
- Telegram 远程触发
- 无终端 headless 环境

这些场景里，更稳的思路通常是：

- 先 `--non-interactive` 做安全检查和迁移
- 再人工决定是否进 `--repair`

## 中文用户最容易踩的坑

### 1. 觉得 `--non-interactive` 比 `--repair` 更“自动”

其实它更保守，不会替你做所有需要人工确认的动作。

### 2. 把 `--force` 当成默认修复手段

它更像最后手段，而不是日常巡检入口。

### 3. 不理解 `--deep` 的价值

很多“奇怪的双安装 / 双状态目录 / 旧服务残留”问题，只有它更容易发现。

## 一条更稳的选择顺序

建议按这个顺序用：

1. 先 `openclaw doctor`
2. 需要无人值守检查时用 `--non-interactive`
3. 确认修复范围后再用 `--repair`
4. 只有确认需要强覆盖时才用 `--repair --force`
5. 怀疑有多安装或服务残留时再补 `--deep`

## 下一步推荐

- [调试、运行时覆盖与开发排障](/docs/reference/debugging-and-runtime-overrides)
- [sessions cleanup 和 session maintenance 应该怎么配合](/docs/operations/sessions-cleanup-and-maintenance)
- [后台维护任务应该怎么分 lane 和保留周期](/best-practices/maintenance-lanes-and-retention)
