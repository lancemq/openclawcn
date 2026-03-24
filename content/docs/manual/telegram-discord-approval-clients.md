---
title: Telegram 和 Discord 作为审批入口时该怎么收边界
description: 基于最新官方 Exec Approvals 文档，解释 Telegram 与 Discord 作为 exec approval 客户端时分别扮演什么角色、哪些配置值得先看，以及为什么它们适合作为受控审批入口而不是普通开放群聊。
category: 功能
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/tools/exec-approvals
sourceName: OpenClaw Docs
sourceType: official
tags: [telegram, discord, approvals, channels, exec, security]
---

# Telegram 和 Discord 作为审批入口时该怎么收边界

最近官方 Exec Approvals 文档里，一个很值得中文团队单独关注的变化是：

- Telegram 和 Discord 可以作为显式 exec approval 客户端

这意味着它们不再只是聊天渠道，还可以承担：

- 接收审批请求
- 执行 `/approve`
- 参与远程值守

## 先记住它们在这里的角色

当 Telegram 或 Discord 被配置成审批入口时，它们更像：

- 受控 operator surface

而不是：

- 普通聊天群或普通 bot 频道

这是理解这条能力最关键的一步。

## 官方现在支持到什么程度

根据当前官方文档：

- Discord 和 Telegram 都可以作为内建 exec approval 客户端
- 只有显式启用后，OpenClaw 才会把它们当成审批面
- 未开启时，不会因为“当前正在这个渠道聊天”就自动获得审批能力

这条边界很重要，因为它说明审批权不是默认继承聊天入口。

## Telegram 更适合什么

官方文档当前特别提到，Telegram 默认更偏：

- approver DMs

这对多数个人或小团队场景很合适，因为它更容易形成：

- 点对点审批
- 明确 approver 身份
- 更少的群组噪音

如果需要，也可以改成：

- `channel`
- `both`

但默认思路依然是优先受控私域，而不是先开放到群里。

## Discord 更适合什么

Discord 更适合：

- 团队值守
- 明确频道治理
- 少量 operator 共用审批面

它比 Telegram 更容易接进：

- 团队频道
- 专门审批频道
- 值班群组

但也因此更需要先把频道范围和 approver 范围收紧。

## 这两者和“聊天里转发审批”有什么区别

官方文档其实区分了两层：

- 审批消息转发到聊天渠道
- 聊天渠道本身作为内建 exec approval 客户端

前者更像：

- delivery routing

后者更像：

- 正式审批入口

如果把这两层混成一件事，后面最容易搞不清：

- 到底是谁有资格批准
- 哪些聊天面只是收通知，哪些才是真审批面

## 为什么官方会强调 approver 范围

Exec Approvals 文档已经写得很明确：

- only configured approvers can approve or deny

这说明官方在主动避免一种危险设计：

- 谁能看到审批消息，谁就能批

更稳的现实做法应该是：

- 让通知范围可以略宽
- 让批准范围继续很窄

## 哪些场景更适合 Telegram

- 个人远程运维
- 核心成员数量很少
- 更希望审批动作在 DM 中完成

## 哪些场景更适合 Discord

- 团队值守
- 需要专门 operator 频道
- 需要保留群组化协作感

## 最容易踩的坑

### 1. 把审批入口放到普通群聊

审批面和普通使用面最好分开。

### 2. 让大量成员都拥有 `/approve`

这会让宿主机执行批准权扩散得过快。

### 3. 以为“当前聊天发生在这个渠道”就自然能批

官方设计不是这样，是否能批取决于显式配置。

## 中文团队更稳的默认策略

通常更适合这样落地：

1. Telegram 先走 approver DM
2. Discord 先开独立审批频道
3. 只给极少数 operator 批准权
4. 默认优先 `allow-once`
5. 批准面和普通讨论面分开

## 下一步推荐

- [Exec approvals 转发到聊天渠道该怎么设计](/docs/operations/chat-approval-forwarding)
- [Exec 工具、apply_patch 与执行审批](/docs/manual/exec-tools-and-approvals)
- [远程值守时如何设计聊天审批路由](/best-practices/remote-approval-routing)

