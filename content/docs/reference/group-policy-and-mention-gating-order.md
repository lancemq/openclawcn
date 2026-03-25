---
title: groupPolicy、allowlist 和 mention gating 的顺序应该怎么理解
description: 基于最新官方 Groups、Group Messages 和 Messages 文档，解释 OpenClaw 在群聊里如何按 groupPolicy、群组 allowlist 和 mention gating 三层顺序决定消息是丢弃、只进上下文，还是正式触发回复。
category: 参考
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/channels/groups
sourceName: OpenClaw Docs
sourceType: official
tags: [groups, mention, routing, allowlist, messages]
---

# groupPolicy、allowlist 和 mention gating 的顺序应该怎么理解

最近官方 Groups 和 Messages 文档把群聊入口的判断顺序写得很清楚了，这对中文用户很值，因为很多“为什么群里没回”或“为什么只记住了上下文却没出声”的问题，根本不是模型层，而是更早就在入口判断里决定了。

更准确的顺序是：

1. `groupPolicy`
2. 群组 allowlist
3. mention gating

这三层不是并列开关，而是一个固定判断链。

## 第一层：`groupPolicy` 决定群消息能不能进系统

当前官方文档给出的三种模式是：

- `disabled`
- `allowlist`
- `open`

它回答的是最外层问题：

- 这个渠道上的群消息，原则上要不要处理

如果这里已经是 `disabled`，后面所有 mention 和 routing 都不会再有机会生效。

## 第二层：群组 allowlist 决定“哪个群”和“谁”可以触发

当 `groupPolicy = "allowlist"` 时，还要继续看：

- 这个群是否在 `*.groups`
- sender 是否满足 `*.groupAllowFrom`

官方最近把这点写得更细了：

- DM pairing 的审批记录只对 DM 生效
- 群组 sender 授权仍然要显式走 group allowlist

这意味着：

- 你在私聊里已经放行某个人
- 不代表他在群里也自动拥有同等触发权

## 第三层：mention gating 决定“是否正式唤起一轮回复”

这层最容易被误会成“群权限本身”，但更准确地说，它控制的是：

- 允许进来的群消息，什么时候真正唤起 agent run

默认情况下，官方仍然推荐：

- 群聊要求 mention

如果没满足 mention 条件，当前消息可以：

- 不触发回复
- 但保留在 pending group history 里作为后续上下文

这也是很多人第一次看到时最容易惊讶的一点。

## 为什么“没回”和“没进系统”不是一回事

Messages 文档现在已经把 group history 机制写得很明白：

- 被 mention gating 挡住的群消息，可能仍然进入 pending-only history buffer

所以一条群消息可能出现三种不同命运：

- 被 `groupPolicy` 或 allowlist 直接丢掉
- 被 mention gating 挡住，只保留上下文
- 正式触发 agent run 并回复

把这三种状态分开，排障就会清楚很多。

## `mentionPatterns` 应该放在哪一层理解

`mentionPatterns` 不是权限规则，而是：

- 让系统在没有原生 mention 元数据时，仍然能识别“这是不是在叫我”

官方现在已经把它扩展到了：

- Telegram
- WhatsApp
- Slack
- Discord
- iMessage

也就是说，它更像 mention detection 的兼容层，而不是“多写几个正则就能开放群权限”。

## `/activation` 在哪种场景下成立

截至当前官方文档：

- `/activation mention`
- `/activation always`

这组 owner-only 指令当前主要是 WhatsApp 群组侧能力。

它改的是某个群的激活模式，而不是全局安全策略。

更准确地说：

- `/activation` 能改“这个群需要 mention 还是可 always”
- 但不会绕过 `groupPolicy` 和 allowlist

## 中文环境里最容易踩的坑

### 1. 把 `open` 理解成“万事大吉”

`groupPolicy: "open"` 只是跳过群 allowlist，mention gating 仍然在后面。

### 2. 以为被 mention gating 挡住就等于彻底没进系统

很多时候它只是没有回复，但仍可能进入群上下文缓冲。

### 3. 把 DM pairing 结果直接投射到群里

官方现在已经明确把 DM 准入和群触发拆开了。

## 一条更稳的排查顺序

遇到群里“没反应”时，建议按这个顺序看：

1. `groupPolicy` 是不是已经挡住了
2. 这个群或 sender 是否满足 allowlist
3. mention 是否被正确识别
4. 如果没回，是否只是被存进了 pending group history

## 下一步推荐

- [消息入口的去重、合并和排队是怎么工作的](/docs/manual/inbound-dedupe-and-debounce)
- [团队频道里的 Session 隔离策略](/docs/operations/team-channel-session-strategy)
- [Broadcast Groups 和普通 routing 的边界怎么区分](/docs/manual/broadcast-groups-and-routing-boundaries)
