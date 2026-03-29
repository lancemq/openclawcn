---
title: 共享群入口更稳的放开顺序：allowlist、mention、activation 和 broadcast
description: 结合最新官方 Groups、Group Messages 和 Broadcast Groups 文档，总结团队在群聊里怎样从最窄入口逐步放开到 topic、多 agent 和 always activation，避免一开始就把共享群入口做成高噪音面。
category: 群入口治理
difficulty: 高级
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/channels/groups
sourceName: OpenClaw Docs
sourceType: official
tags: [groups, mentions, activation, broadcast, governance, best-practices]
---

# 共享群入口更稳的放开顺序：allowlist、mention、activation 和 broadcast

团队把 OpenClaw 放进群里时，最容易犯的错不是配不上，而是：

- 一开始就放太开

最新官方 `Groups`、`Group Messages` 和 `Broadcast Groups` 文档一起看，已经很适合整理成一条更稳的上线顺序。

## 第一步：先只放 allowlist 群

更稳的起点通常是：

- `groupPolicy: "allowlist"`
- 只加少数明确需要的群

这样做的意义不是保守，而是先把：

- 哪些群值得接入

和

- 哪些群只是“技术上能接”

分开。

## 第二步：默认保留 `requireMention`

哪怕群已经 allowlist 了，也别太快切掉 mention gating。  
因为在大多数群场景里，真正高成本的不是接入本身，而是：

- 噪音触发
- 无意义回复
- 成本和上下文污染

所以更稳的默认面通常还是：

- allowlist + requireMention

## 第三步：再评估 reply-to 是否足够自然

很多团队会急着改 `/activation always`，只是因为觉得：

- 用户懒得 `@`

但在支持 reply metadata 的渠道里，回复机器人上一条消息本身就可能算隐式 mention。  
所以更值的一步往往是先确认：

- reply-to 体验够不够顺

而不是直接全开 always。

## 第四步：topic / thread 多时，先做结构化再做放宽

如果是 Telegram forum 或其他多线程群面，更推荐先把：

- topic / thread 边界
- session key

利用起来，再考虑更宽的 activation。  
因为结构化程度越高，越容易知道：

- 哪个讨论线值得被更主动地响应

## 第五步：`/activation always` 应该是特例，不是默认

官方文档现在已经把 `mention` 和 `always` 的边界说得够清楚了。  
长期更稳的做法通常是：

- 绝大多数群保留 `mention`
- 只有极少数高信任、高价值群放到 `always`

这样能把“共享群入口”继续维持在：

- 低噪音协作层

## 第六步：broadcast 放在最后

如果你还没先把单 agent 群入口跑稳，就不急着上 broadcast。  
因为 broadcast 会进一步扩大：

- 触发后的运行面
- 回复数量
- 副作用复杂度

所以更稳的顺序通常是：

1. 先稳定单 agent 群入口
2. 再决定哪些群值得多 agent 协作

## 一个更稳的上线梯子

可以直接按这条顺序推进：

1. allowlist 少量群
2. 保留 requireMention
3. 验证 reply-to 作为隐式 mention 的体验
4. 利用 topic / thread 做结构化会话
5. 只给少数群开 `/activation always`
6. 最后才评估 broadcast

## 推荐延伸阅读

- [回复机器人消息也算 mention 吗，pending history 又什么时候会进上下文](/docs/reference/reply-mention-and-pending-history)
- [Telegram forum topic、群 session 和 thread key 应该怎么一起看](/docs/manual/forum-topics-and-group-session-keys)
- [Broadcast 和普通 bindings 谁先生效，什么时候该用哪一个](/docs/manual/broadcast-vs-binding-precedence)
