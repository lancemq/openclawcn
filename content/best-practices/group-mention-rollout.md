---
title: 群聊入口上线时，先把 mention 触发策略跑稳
description: 结合最新官方 Groups、Group Messages 和 Messages 文档，整理群聊入口从 allowlist、requireMention 到 /activation 的上线顺序，避免把群机器人一接上就变成高噪声、高成本入口。
category: 渠道治理
difficulty: 中级
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/channels/groups
sourceName: OpenClaw Docs
sourceType: official
tags: [groups, mention, rollout, channels, operations]
---

# 群聊入口上线时，先把 mention 触发策略跑稳

很多团队第一次把 OpenClaw 接进群聊时，最容易先关注的是：

- 能不能回

但真正决定群入口是不是可长期运行的，通常不是“能不能回”，而是：

- 什么时候回
- 谁能触发
- 不回时是否仍会把消息当上下文

这三件事如果上线前没定清楚，群入口很快就会变成高噪声和高成本来源。

## 1. 第一步先停在 `allowlist + requireMention`

更稳的默认起点通常是：

- `groupPolicy: "allowlist"`
- `groups: { "*": { requireMention: true } }`

这套组合的意义是：

- 先只允许明确纳入治理的群
- 再要求明确提及才唤起 agent

这是绝大多数团队群的更安全起点。

## 2. 不要一上来就把 `groupPolicy` 设成 `open`

`open` 看起来省事，但它会直接跳过群 allowlist。

如果这时 mention 策略、sender 范围和工具权限又还没收口，群入口就很容易变成：

- 谁都能把你叫起来
- 但你还没准备好这个入口的运行成本和风险

## 3. 先验证 mention detection 是否稳定

上线前至少验证这几种情况：

- 原生 @ 提及
- reply-to-bot 是否被视为隐式 mention
- 没有原生 mention 元数据时，`mentionPatterns` 是否能补上

因为 mention gating 只有在“系统能识别 mention”时才真正成立。

## 4. `mentionPatterns` 只解决识别，不解决治理

很多人会把 `mentionPatterns` 当成万能开关，但它更准确的作用是：

- 在没有原生 mention 元数据的渠道上，补一层识别能力

它不会替代：

- 群 allowlist
- sender allowlist
- 工具限制

## 5. 把 `/activation always` 当成例外，不当成默认

截至当前官方文档，WhatsApp 群的 owner 可以切：

- `/activation mention`
- `/activation always`

更稳的做法通常是：

- 先长期跑 `mention`
- 只有在少数低噪声、强约束群里才评估 `always`

因为 `always` 带来的不是单纯“更积极”，而是更高的上下文摄入量和更高的运行成本。

## 6. 验证“没回复”时系统是否仍在收上下文

这一步很容易被漏掉。

官方当前已经明确：

- 被 mention gating 挡住的群消息，可能仍进入 pending group history

所以上线前要确认：

- 这种行为是不是符合你的预期

如果你希望“没 mention 就完全不进上下文”，那就要额外评估历史缓冲设置，而不是只看表面是否回复。

## 7. 先把工具权限收在群级别

群聊入口和私聊入口通常不该拥有同样的工具面。

更稳的做法是：

- 群里默认只给低风险、低副作用工具
- 高风险工具仍保留在私聊或更受控入口

这样即使 mention 策略偶尔出现误触，损失面也更小。

## 一条更稳的上线顺序

建议按这个顺序走：

1. 先定群 allowlist
2. 再定 `requireMention`
3. 验证 mention detection
4. 收紧群工具权限
5. 最后才评估要不要对个别群放开 `/activation always`

## 下一步推荐

- [groupPolicy、allowlist 和 mention gating 的顺序应该怎么理解](/docs/reference/group-policy-and-mention-gating-order)
- [团队频道里的 Session 隔离策略](/docs/operations/team-channel-session-strategy)
- [消息入口的去重、合并和排队是怎么工作的](/docs/manual/inbound-dedupe-and-debounce)
