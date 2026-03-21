---
title: 频道与 Session 路由怎么决定上下文边界
description: 基于最新官方 Channel Routing 文档，整理 OpenClaw 的 session key 形状、DM/main 合并、线程隔离、binding 优先级，以及为什么 routing 不是模型自己决定的。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/channels/channel-routing
sourceName: OpenClaw Docs
sourceType: official
tags: [routing, session, channels, bindings, groups]
---

# 频道与 Session 路由怎么决定上下文边界

站里已经有团队频道 session 隔离的说明，但官方最近的 Channel Routing 文档把更底层的机制讲得非常清楚了：

- 回复发回哪个渠道不是模型自己决定的
- 上下文落在哪个 session 里也是确定性的

这件事非常关键，因为它直接决定“为什么这条消息会共用上下文、另一条却不会”。

## routing 到底是谁在决定

根据当前官方文档，reply routing 是 deterministic 的，由宿主配置控制。

也就是说：

- 模型不会自己挑一个渠道回消息
- 渠道和 agent 的选择来自 host configuration

这点特别重要，因为它把 routing 从“模型行为”拉回到“系统配置”。

## session key 为什么是理解上下文边界的核心

官方文档现在把 session key 的形状写得很细，这非常值。

它本质上回答的是：

- 这条消息到底会落进哪个上下文桶里

而不是：

- 这条消息看起来来自哪个页面或哪个人

## DM、群组、频道、线程各自长什么样

根据最新官方文档，更值得记住的是这几种形状：

### Direct message

默认会折叠到 agent 主会话：

```text
agent:<agentId>:<mainKey>
```

### Group

群组会独立：

```text
agent:<agentId>:<channel>:group:<id>
```

### Channel / room

频道或房间会独立：

```text
agent:<agentId>:<channel>:channel:<id>
```

### Thread

Slack / Discord 线程会在基础 key 后再追加：

```text
:thread:<threadId>
```

Telegram forum topic 也会把 topic 编进 key。

## 为什么这套 key 设计很重要

因为它意味着：

- group 不会天然混进 DM 主会话
- thread 也不会天然污染整个频道

换句话说，很多“上下文隔离”不是靠额外约定，而是默认就被 session key 结构编码好了。

## DM 合并到 main session 有什么好处和风险

官方文档当前说明：

- direct messages 默认可以折叠进 agent 主会话

好处是：

- 私聊连续性更强
- 个人使用体验更自然

但官方也补了一条很关键的保护：

- 当 `session.dmScope = "main"` 时，会尝试通过 `allowFrom` 推断 pinned owner
- 如果非 owner DM 进来，不会随便改 main session 的 `lastRoute`

这说明官方已经意识到：

- “共享 main session” 很方便
- 但也很容易被别的私聊来源污染

## binding 的优先级为什么值得记住

官方当前给的 routing 规则优先级很清楚：

1. 精确 peer match
2. parent peer / thread inheritance
3. guild + roles
4. guild
5. team
6. account
7. channel
8. default agent

这意味着你在排“为什么进了这个 agent”时，不该只看默认 agent，而是要沿这条优先级往上排。

## WebChat 为什么会看到 cross-channel context

官方文档里一个很值的细节是：

- WebChat 附着到选定 agent
- 默认使用该 agent 的 main session

所以它会看到：

- 这个 agent 在不同渠道沉淀下来的主会话上下文

这也解释了为什么 WebChat 不只是一个“网页聊天框”，而更像一个面向 agent 主会话的入口。

## 中文站建议怎么理解 routing

如果要把它压成一句最有用的话：

- routing 决定 agent
- session key 决定上下文桶

只要先把这两层分开，很多“为什么它记得这个、不记得那个”的问题都会变得更好解释。

## 下一步推荐

- [团队频道里的 Session 隔离策略](/docs/operations/team-channel-session-strategy)
- [记忆文件怎么分层加载](/docs/manual/memory-files-and-loading-boundaries)
- [系统提示词、上下文与压缩](/docs/manual/system-prompt-context-and-compaction)

把这几页连起来看，长期上下文、渠道边界和记忆层会更容易真正拼起来。
