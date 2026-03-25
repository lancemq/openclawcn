---
title: shared inbox 能共用入口，但不要共用不该共用的边界
description: 结合最新官方 Security 与 Groups 文档，整理 shared inbox 场景下 operator、工具、宿主文件系统和私有身份的分层建议，避免把协作入口误用成弱隔离的多租户平台。
category: 安全治理
difficulty: 高级
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/cli/security
sourceName: OpenClaw Docs
sourceType: official
tags: [shared-inbox, security, sandbox, operators, governance]
---

# shared inbox 能共用入口，但不要共用不该共用的边界

shared inbox 最容易出现的误区是：

- 既然大家都能用同一个入口，那很多边界是不是也可以一起共用

官方最近的 Security 文档给出的答案其实相反：

- 共享入口可以做
- 但越是共享入口，越要把不该共用的边界提前拆开

## 1. 入口可以共享，信任边界不能假装天然共享

如果几个 operator 本来就在同一信任边界里，shared inbox 可以是效率很高的协作入口。

但如果已经接近：

- 不同客户
- 不同组织
- 互不信任的小团队

那更稳的方案通常不是继续在一套 gateway 上做更多补丁，而是直接拆 gateway。

## 2. 先把 DM 和群入口都收成“最小触达”

共享入口上线时，至少先收这几项：

- `dmScope` 不再用 `main`
- 群入口默认 `allowlist + requireMention`
- sender 范围不要放 wildcard

这几项虽然基础，但它们决定了“谁能进来”和“进来后是否混桶”。

## 3. 把运行时权限收得比单人环境更紧

shared inbox 最不该保留的，就是单人环境里那种：

- 默认高权限工具
- 默认全宿主可见
- 默认可触达私人 identity

更稳的 shared inbox 结构通常是：

- sandbox 开启
- filesystem 收到 workspace 范围
- 高风险工具只给特定 agent 或完全不进共享入口

## 4. 私人身份和私有凭据不要继续留在共享 runtime

官方现在已经直接提醒：

- keep personal/private identities or credentials off that runtime

这点非常关键，因为很多看起来“已经收口”的 shared inbox，最后真正的问题都不是路由，而是：

- 共享 runtime 里还保留了私人数据面

## 5. operator 之间最好仍保留职责分层

即使是同一团队，也不建议让所有 operator 在 shared inbox 场景里都拥有完全相同的动作面。

更稳的分法通常像这样：

- 普通协作者：消息和低风险工具
- 运维 / owner：高风险修复、配置修改、发布动作

这比“大家都能做所有事”更容易长期维护。

## 6. 用审计把它变成持续动作，而不是一次性上线动作

shared inbox 不是上线时看一眼就结束的事。

更稳的做法是把：

```bash
openclaw security audit
```

变成固定巡检项。

尤其在这些变化之后要重跑：

- 接入新群
- 开放新 sender
- 调整 sandbox
- 增加新工具或插件

## 一条更稳的治理顺序

建议按这个顺序走：

1. 先判断是不是同一信任边界
2. 再收入口和会话边界
3. 再收运行时和工具边界
4. 最后把审计固定成持续动作

## 下一步推荐

- [shared inbox 的运营边界和信任模型](/docs/operations/shared-inbox-trust-boundaries)
- [共享 DM 入口上线前的 secure DM 检查清单](/best-practices/secure-dm-rollout-checklist)
- [OpenClaw 安全最佳实践](/docs/operations/openclaw-security-best-practices)
