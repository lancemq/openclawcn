---
title: 从巡检到修复的排障阶梯应该怎么走
description: 结合最新官方 Doctor、Diagnostics Flags、Debugging 和 Troubleshooting 文档，总结一条更稳的 repair ladder，让 status、doctor、flags、repair 和 cleanup 各司其职。
category: 排障治理
difficulty: 高级
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/doctor
sourceName: OpenClaw Docs
sourceType: official
tags: [doctor, diagnostics, troubleshooting, repair, operations]
---

# 从巡检到修复的排障阶梯应该怎么走

很多团队一出问题就会直接做两件事之一：

- 要么只盯日志
- 要么直接 `doctor --repair`

但官方最近把 Doctor、Diagnostics Flags、Debugging、sessions cleanup 这些文档分别补清楚之后，更稳的做法其实已经很明确了：

- 先判断层
- 再选工具

也就是建立一条真正的 repair ladder。

## 第一层：先用轻量巡检确定问题在哪层

最稳的第一步通常还是：

- `status`
- `logs --follow`
- `models status --check`
- 必要时 `sessions cleanup --dry-run`

这一步的目标不是修，而是先判断：

- 是入口问题
- 是模型 / auth 问题
- 是 session / transcript 问题
- 还是 cron / maintenance 问题

## 第二层：再决定是不是需要 doctor

如果问题已经明显指向：

- config stale
- state dir / transcript mismatch
- OAuth / sandbox / service 残留

那就进入：

- `openclaw doctor`

但如果只是想看某个子系统多一点内部信号，直接上 doctor 不一定比定向日志更有效。

## 第三层：要观察细节时，用 diagnostics flags 而不是全局乱开

官方 Diagnostics Flags 文档现在给了一个很好的分层：

- status / logs 是基础可观测性
- diagnostics flags 是定向放大镜

这意味着排障更稳的方式是：

1. 先知道哪层大致出问题
2. 再只打开那个子系统的 flags

而不是一开始把全局日志全开。

## 第四层：repair 模式要按风险递进

官方 doctor 文档给出的模式阶梯其实很清楚：

1. `openclaw doctor`
2. `openclaw doctor --non-interactive`
3. `openclaw doctor --repair`
4. `openclaw doctor --repair --force`

这本身就是一条风险递进链。  
更稳的原则通常是：

- 越晚动写盘和覆盖动作越好

## 第五层：cleanup 和 repair 不要混成一回事

很多人会把：

- doctor
- sessions cleanup
- cron maintenance

都当成“修修修”。

但更准确的分工是：

- doctor：检查 + 迁移 + 修复建议
- sessions cleanup：session / transcript 生命周期维护
- cron maintenance：run sessions 和 run logs 维护

如果把这三者混起来，操作就很容易过头。

## 第六层：安全和运维修复也要分开看

还有一类常见误区是把：

- unauthorized
- trusted proxy
- allowlist / pairing

全都当成“环境坏了”。

但很多时候，这其实是：

- 安全边界按预期在拦

这类问题更该先跑：

- `security audit`
- auth / token / proxy 路径检查

而不是直接强修。

## 第七层：headless 环境更要保守

在：

- cron
- 远程 operator
- 无 TTY 环境

里，repair ladder 更应该保守，因为：

- 交互式修复不会完整出现
- 某些动作本来就需要人工确认

这时更稳的顺序通常是：

- `--non-interactive` 巡检
- 收集结果
- 再人工决定要不要进入 `--repair`

## 一个更稳的最小 repair ladder

建议把团队里的最小排障顺序固定成：

1. `status / logs / health`
2. 必要时 targeted diagnostics flags
3. `doctor`
4. 需要时 `doctor --repair`
5. 再处理 cleanup / maintenance

这样能显著减少“还没搞清楚问题就开始改状态”的风险。

## 中文用户最容易踩的坑

### 1. 直接 `--repair --force`

这会把本来可观察的问题直接推进成状态改动。

### 2. 把 targeted diagnostics 和 verbose logging 混为一谈

前者是定向放大，后者是整体放大。

### 3. 把 cleanup 当成修复入口

cleanup 更像生命周期整理，而不是通用故障修复。

## 下一步推荐

- [doctor 的 repair、force 和 non-interactive 应该怎么选](/docs/reference/doctor-repair-modes)
- [Diagnostics flags 和定向日志应该怎么用](/docs/reference/diagnostics-flags-and-targeted-logs)
- [sessions cleanup 和 session maintenance 应该怎么配合](/docs/operations/sessions-cleanup-and-maintenance)
