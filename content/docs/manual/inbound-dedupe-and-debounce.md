---
title: 消息入口的去重、合并和排队是怎么工作的
description: 基于最新官方 Messages 文档，解释 OpenClaw 的 inbound dedupe、inbound debounce、active-run queue 和 outbound chunking 各自解决什么问题，避免把“回复慢”都误判成模型问题。
category: 功能
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/messages
sourceName: OpenClaw Docs
sourceType: official
tags: [messages, queueing, dedupe, debounce, delivery]
---

# 消息入口的去重、合并和排队是怎么工作的

站里已经有一页在讲消息投递和重试，但官方最近的 Messages 文档其实把更前面的一层也讲清楚了：

- 消息进入系统前，会先经过 dedupe、debounce 和 queueing

这很关键，因为很多“为什么它没立刻回”“为什么几条消息像被合并了”的问题，根本还没到模型输出那一层。

## 先看官方给出的高层流

Messages 文档现在把链路写得很直白：

```text
Inbound message
  -> routing / bindings
  -> session key
  -> queue (if a run is active)
  -> agent run
  -> outbound replies
```

这说明：

- 不是每条进来的消息都会立刻单独开跑
- 也不是一生成就一定马上送出去

## inbound dedupe 在解决什么

官方文档明确提到：

- 某些渠道在重连或恢复时会重复投递同一条消息

为了避免重复触发 agent run，OpenClaw 会做一个短时 dedupe cache，按：

- channel
- account
- peer
- session
- message id

这类维度去认同一条消息。

这意味着：

- “同一条消息被渠道补发一次”不该再触发第二轮 agent

## 为什么这点特别重要

因为如果没有这层，很多渠道场景都会出现：

- 机器人重复回复
- 同一条输入被多次处理
- 工具副作用重复发生

所以 dedupe 本质上是在保护：

- 输入幂等性

## inbound debounce 又在解决什么

dedupe 处理的是“同一条消息重复送达”。  
debounce 处理的是另一类问题：

- 同一个 sender 在很短时间内连续发多条补充消息

官方当前文档说明：

- rapid consecutive messages can be batched into a single agent turn

也就是说，它允许系统把短时间内连续到来的几条消息收成一轮输入，而不是每条都马上开一次新 run。

## 哪些场景最容易看到 debounce

更常见的通常是：

- 用户连发三四句补充
- 先发一句，再立刻补一张图或一句说明
- 移动端输入习惯导致多条短消息拼成一个意思

在这些场景里，debounce 往往会比“每条都独立响应”更像人类对话节奏。

## queueing 为什么不是卡住，而是保序

Messages 文档还明确提到：

- 如果当前 session 已经有 active run，新消息可能先进队列

这不是 bug，而是在保护：

- 同一 session 内的顺序性

如果一个 session 里当前还在跑工具、流式输出还没结束，后面新消息不一定马上并发插进去，而可能等前一轮结束或按系统规则排队。

## 为什么“回复慢”不一定是模型慢

从这条链看，延迟可能来自很多层：

- 消息先被 debounce 等待合并
- 当前 session 正在 active run，后面消息在排队
- 渠道重复投递被 dedupe
- outbound 还要走 chunking 和 channel caps

所以看到“不是秒回”，不要只查模型。

## outbound chunking 在后面又做了什么

官方 Messages 文档还把 outbound 这层写得更细：

- 不同渠道有不同长度上限
- 系统会做 chunking / block streaming / 渠道级 caps

这说明“生成出来一大段文本”也不等于“渠道一定按原样一次发完”。

尤其在 Telegram、Discord、Web surfaces 这类入口里，最终展示经常还会再受：

- 渠道长度限制
- 流式开关
- 多段发送策略

影响。

## mention / group 规则为什么也要一起看

如果是群聊场景，官方还把 `messages.*` 里的群组行为和 mention 规则并列出来。

这意味着：

- 有些“没进入 dedupe/debounce/queue”的问题
- 实际上更早就被 mention / group policy 挡住了

所以群聊排障时，更稳的顺序是：

1. 先看消息有没有被允许进入处理链
2. 再看有没有被 debounce / queue
3. 最后再看生成和投递

## 中文用户最容易踩的坑

### 1. 以为每条输入都应该立刻独立开跑

实际系统会为了稳定性和连续性做合并和排队。

### 2. 看到重复消息就怪模型“抽风”

很多时候渠道本身就在重复投递，dedupe 只是帮你拦住。

### 3. 只排 outbound，不看 inbound

回复问题很可能在进入系统前就已经决定了节奏。

## 一条更稳的理解顺序

建议按这个顺序看消息入口：

1. routing 和 session key 决定进哪个上下文桶
2. dedupe 决定是不是重复消息
3. debounce 决定要不要合并成一轮
4. queueing 决定何时真正开始 agent run
5. outbound chunking 决定怎样发出去

## 下一步推荐

- [消息投递、重试与响应行为](/docs/manual/message-retries-and-delivery)
- [频道与 Session 路由怎么决定上下文边界](/docs/manual/channel-routing-and-session-keys)
- [WebChat 的会话与只读边界](/docs/manual/webchat-session-and-readonly-mode)
