---
title: shared inbox 的运营边界和信任模型
description: 基于最新官方 Security、Session 和 Groups 文档，解释 OpenClaw 对 shared inbox 的默认安全假设、适合的协作硬化方式，以及为什么真正的互不信任多租户场景更应该拆成独立 gateway。
category: 运维
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/cli/security
sourceName: OpenClaw Docs
sourceType: official
tags: [security, shared-inbox, trust-model, gateway, operations]
---

# shared inbox 的运营边界和信任模型

官方最近的 `openclaw security audit` 文档把 shared inbox 的边界讲得比以前清楚很多了。最关键的一句话其实不是某个配置，而是这条信任假设：

- OpenClaw 默认是 personal-assistant trust model

这意味着 shared inbox 可以做，但它首先被当成：

- 协作型共享入口的加固问题

而不是：

- 完整的互不信任多租户架构

## 先记住官方在提醒什么

当前 `security audit` 已经会在多 sender 共用主会话时报警，并推荐：

- `session.dmScope = "per-channel-peer"`
- 多账号时用 `per-account-channel-peer`

同时，官方还会对这些信号给出 shared-user ingress 提醒：

- `groupPolicy` 或 `dmPolicy` 过于开放
- 配置了群目标
- 使用了 wildcard sender 规则

这说明官方已经把“多人共用一个入口”的风险看成正式治理对象。

## shared inbox 适合什么，不适合什么

更适合的通常是：

- 同一团队内部的协作型入口
- 已知协作者之间共享一个 agent
- 明确接受共同上下文边界的一组 operator

不适合的通常是：

- 互不信任的多个租户共用一套 gateway
- 不同组织共享同一运行时
- 希望用一套配置隔离所有高敏感身份和凭据

官方文档现在也明确写了：

- mutually untrusted / adversarial operators 不建议共用一个 gateway

## 为什么 secure DM 只是第一层

很多人看到 shared inbox，就先想到：

- 把 `dmScope` 调细

这当然是对的，但它只解决：

- DM 上下文不要互相污染

它还没有解决：

- operator 是否共用同一宿主机
- 文件系统和工具权限是否仍在一个 trust boundary 内
- 私人身份、私有凭据和个人 workspace 是否仍然可被间接触达

所以 secure DM 是必要条件，但不是全部。

## 官方更推荐的 shared inbox 硬化顺序

从当前 Security 文档看，更稳的顺序通常是：

1. 先切 secure DM mode
2. 群聊入口收敛到 allowlist + mention gating
3. 对会话启用 sandbox
4. 把 filesystem access 收到 workspace 范围
5. 不在共享 runtime 里放私人 identity 或高敏感凭据

这条顺序的重点在于：

- 先隔离入口
- 再隔离运行时

## 为什么 sandbox 和 workspace scope 值得一起看

官方现在已经把 shared-user setups 的建议说得很直接：

- sandbox all sessions
- keep filesystem access workspace-scoped

这意味着共享入口更适合：

- 把高风险工具、宿主文件系统和私人资料从默认面上移开

如果还保留“所有人都能打进来，但仍能触达全宿主”的结构，shared inbox 很容易变成高风险入口。

## 什么情况下该直接拆 gateway

如果你的场景接近下面几类，通常更值得直接拆成独立 gateway、独立 OS 用户，甚至独立主机：

- 不同客户或外部合作方共用同一系统
- 不同团队之间互不信任
- 不同入口绑定了不同敏感凭据或专属数据面
- 需要审计上严格区分 operator 权限

这些情况里，再细的 `dmScope` 或 mention gating 都不够。

## 中文环境里最容易踩的坑

### 1. 把 shared inbox 理解成“多用户模式已经官方完整支持”

官方当前更准确的表述是协作硬化，而不是通用多租户平台。

### 2. 只收入口，不收运行时

`allowFrom`、group allowlist 和 mention gating 只是第一层，宿主和工具边界仍然要单独治理。

### 3. 共享运行时里仍然放个人身份和私人资料

这会让很多“理论上隔离”的边界在实际操作里失效。

## 一条更稳的决策顺序

建议按这个顺序判断：

1. 这些 operator 是不是同一信任边界内的协作者
2. 如果是，先做 shared inbox 硬化
3. 如果不是，直接拆成独立 gateway / host

## 下一步推荐

- [secure DM mode 和 owner pinning 应该怎么一起理解](/docs/reference/secure-dm-mode-and-owner-pinning)
- [共享 DM 入口上线前的 secure DM 检查清单](/best-practices/secure-dm-rollout-checklist)
- [OpenClaw 安全最佳实践](/docs/operations/openclaw-security-best-practices)
