---
title: "OpenClaw 正在把 secure DM mode 写成共享入口的默认安全心智"
description: "官方最近围绕 Session、Security 和 CLI Security 的更新，正在把 secure DM mode 从一个可选技巧，推成多人 DM 入口的基础隔离建议。"
category: "生态观察"
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/concepts/session"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["session", "security", "dmScope", "pairing", "shared-inbox"]
---

最近这轮官方 Session、Security 和 CLI Security 文档，一个越来越明显的信号是：OpenClaw 正在把 secure DM mode 写成共享入口场景里的基础安全心智，而不再只是“高级用户可选项”。

当前官方描述已经很直接：

- 默认 `dmScope: "main"` 适合单人连续使用
- 一旦多人都能给同一个 agent 发 DM，就应该认真考虑 secure DM mode

这里真正变化的，不只是配置示例更完整，而是官方把风险讲得更具体了。

## 1. 风险叙事已经从“可能串上下文”变成可复述场景

Session 文档现在直接给出多人共享 DM 的风险例子：

- Alice 先聊了一个私密话题
- Bob 再问“我们刚才聊到哪了”
- 如果两人的 DM 共用主会话，Bob 就可能吃到 Alice 的上下文

这让 secure DM mode 的必要性不再停留在抽象原则，而是变成可以立刻理解的泄漏路径。

## 2. 官方正在把 `per-channel-peer` 明确成推荐默认

在当前文档里，secure DM mode 几乎已经和下面这条配置绑定：

- `session.dmScope: "per-channel-peer"`

如果是多账号环境，再继续上调到：

- `per-account-channel-peer`

这说明官方现在更强调：

- 先把 sender 隔离清楚
- 再考虑跨渠道连续性

## 3. pairing、allowlist 和 secure DM 已经被拆成两层问题

官方安全文档最近最值的一点，是把这两个问题明显拆开了：

- 谁能给 bot 发私聊
- 允许进来的人是否共用同一个 DM 上下文

这意味着 pairing 和 allowlist 不再被默认为“已经足够安全”，因为它们首先解决的是准入，不是上下文隔离。

## 4. `openclaw security audit` 也开始把这个风险显性化

CLI Security 文档现在已经把 shared inbox 风险纳入审计提醒。

这很关键，因为它意味着 secure DM 不再只是文档建议，而是正在进入：

- 配置体检
- 上线前检查
- 持续治理

## 对中文用户最有价值的提醒

如果你的 OpenClaw 已经从“我自己用”变成：

- 多人配对审批
- 多人 DM allowlist
- 公开 DM 入口

那下一步最值得优先补的，已经不是更多 prompt 或更多工具，而是：

- 先把 `dmScope` 调到正确粒度

## 推荐延伸阅读

- [secure DM mode 和 owner pinning 应该怎么一起理解](/docs/reference/secure-dm-mode-and-owner-pinning)
- [dmScope 和 identityLinks 应该怎么一起用](/docs/reference/dm-scope-and-identity-links)
- [共享 DM 入口上线前的 secure DM 检查清单](/best-practices/secure-dm-rollout-checklist)
