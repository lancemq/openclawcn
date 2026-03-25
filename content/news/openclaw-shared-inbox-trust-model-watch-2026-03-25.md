---
title: "OpenClaw 正在把 shared inbox 明确限定为协作硬化，而不是多租户承诺"
description: "官方最新 security audit 文档正在更明确地区分协作型 shared inbox 与互不信任多租户环境，并把 secure DM、sandbox 和 workspace-scoped access 组合成更完整的加固建议。"
category: "生态观察"
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/cli/security"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["security", "shared-inbox", "trust-model", "sandbox", "gateway"]
---

OpenClaw 最近的 `security audit` 文档，一个很重要的变化是：shared inbox 的边界开始被说得非常明确。

官方现在的态度不是“shared inbox 不可用”，而是：

- 它适合协作型共享入口
- 但不应被误读成互不信任多租户承诺

这对中文团队尤其重要，因为很多人会自然把“多人都能用”理解成“已经有完整多用户隔离”。

## 1. 文档开始把默认信任模型说透了

当前审计文档直接提醒：

- OpenClaw 默认是 personal-assistant trust model

这会把很多原本模糊的边界一下拉直：

- shared inbox 是对 personal-assistant 模型的硬化扩展
- 不是天然适合所有多组织、多客户场景

## 2. shared inbox 的建议不再只停在 `dmScope`

官方现在给出的 shared inbox 建议已经是一整组动作：

- secure DM mode
- sandbox all sessions
- filesystem access workspace-scoped
- personal/private identities 不进共享 runtime

这说明官方在把 shared inbox 当成一个完整运营面，而不是单个 session 参数问题。

## 3. “直接拆 gateway”第一次被说得更明确

对 mutually untrusted 或 adversarial operators，官方现在明确建议：

- separate gateways
- 或 separate OS users / hosts

这意味着当共享入口已经跨越信任边界时，继续在一套 gateway 上堆更多配置，不再是首选答案。

## 对中文用户最有价值的提醒

如果你现在的场景已经接近：

- 多客户
- 多组织
- 高敏感凭据分属不同 operator

那最值得优先做的，往往不是再细调一层 shared inbox 配置，而是：

- 先重新定义 trust boundary

## 推荐延伸阅读

- [shared inbox 的运营边界和信任模型](/docs/operations/shared-inbox-trust-boundaries)
- [shared inbox 能共用入口，但不要共用不该共用的边界](/best-practices/shared-inbox-operator-separation)
- [secure DM mode 和 owner pinning 应该怎么一起理解](/docs/reference/secure-dm-mode-and-owner-pinning)
