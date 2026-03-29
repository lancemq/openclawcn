---
title: 回复机器人消息也算 mention 吗，pending history 又什么时候会进上下文
description: 基于最新官方 Groups 与 Group Messages 文档，解释 OpenClaw 在群聊里怎样把 reply metadata 当成隐式 mention，以及未触发回复的群消息何时只进入 pending history、何时会被彻底丢弃。
category: 参考
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/channels/groups
sourceName: OpenClaw Docs
sourceType: official
tags: [groups, mentions, pending-history, reply, reference]
---

# 回复机器人消息也算 mention 吗，pending history 又什么时候会进上下文

群聊里最容易让人困惑的一类现象是：

- 明明没有 `@`
- 机器人却回了

或者反过来：

- 明明没回
- 但后面像是“记住了”前面的群消息

最新官方 `Groups` 和 `Group Messages` 文档，其实已经把这两件事拆得更清楚了。

## 第一层：reply metadata 也能算隐式 mention

官方当前明确写到：

- Replying to a bot message counts as an implicit mention

这意味着在支持 reply metadata 的渠道里，下面两种情况可能都会触发：

- 真正的 `@mention`
- 回复机器人上一条消息

所以“没写 `@` 也触发了”不一定是配置过宽，可能只是：

- 渠道把 reply 关系正确传进来了

## 第二层：没有正式唤起，不等于完全没进系统

官方现在也把另一件事写得很直白：

- 被 mention gating 挡住的消息，可能 still store for context only

也就是：

- 它不触发 agent run
- 但可能进入 pending-only history buffer

这也是很多人后面会觉得“它是不是偷听了群聊”的来源。  
更准确的理解是：

- 它没有正式回复
- 但保留了有限上下文，供下一次真正触发时注入

## 哪些消息会彻底丢掉

更早被挡住的消息，官方当前是按前序规则直接 drop：

- `groupPolicy = "disabled"`
- `groupPolicy = "allowlist"` 但群不在 allowlist
- sender 不满足当前 group allowlist / groupAllowFrom

这类消息不会走到 pending history 那一层。

## pending history 真正要解决什么

它的价值不是“偷偷攒更多上下文”，而是：

- 当群里隔了一段讨论后终于有人正式唤起机器人
- 机器人不至于只看到最后一句话

所以它更像：

- 触发前的有限上下文缓冲

而不是：

- 正式 session 历史本身

## 这和 session 里的群历史不是一回事

一旦某条消息真正触发了运行，后续看到的上下文来源就可能同时包括：

- 当前 group session 历史
- pending group history
- 当前触发消息

所以别把“pending buffer”误解成完整 session store。

## 对排障最有价值的判断顺序

如果你现在遇到的是“为什么这条群消息没回 / 却像被看到过”，更稳的判断顺序通常是：

1. 先看它有没有被 `groupPolicy` 或 allowlist 挡掉
2. 再看它是不是没满足 mention / reply 触发
3. 最后才判断它是不是只进了 pending history

## 推荐延伸阅读

- [Telegram forum topic、群 session 和 thread key 应该怎么一起看](/docs/manual/forum-topics-and-group-session-keys)
- [groupPolicy、allowlist 和 mention gating 的顺序应该怎么理解](/docs/reference/group-policy-and-mention-gating-order)
- [共享群入口更稳的放开顺序：allowlist、mention、activation 和 broadcast](/best-practices/shared-group-entry-rollout)
