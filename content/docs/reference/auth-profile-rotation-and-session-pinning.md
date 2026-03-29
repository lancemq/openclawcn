---
title: 认证配置文件怎么轮转，为什么 session 会“粘住”同一套凭据
description: 基于最新官方 Model Failover 文档，解释 OpenClaw 在同一 provider 内如何轮转 auth profiles、什么情况下会进入 cooldown，以及为什么同一个 session 往往会持续使用同一套凭据。
category: 参考
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/concepts/model-failover
sourceName: OpenClaw Docs
sourceType: official
tags: [auth, profiles, failover, sessions, reference]
---

# 认证配置文件怎么轮转，为什么 session 会“粘住”同一套凭据

很多人看到 OpenClaw 同时支持：

- API key
- OAuth
- 多个同 provider 账号

会直觉以为它每次请求都会随机挑一个。  
但最新官方 `Model Failover` 文档把规则讲得很清楚：不是随机，也不是每条消息都切。

## 先记住官方给出的两层故障转移

OpenClaw 当前把失败处理拆成两层：

1. 先在当前 provider 内轮转 auth profile
2. 当前 provider 全部失败后，再切到下一个 fallback model

也就是说，很多“为什么没有直接切到下一个模型”的问题，根因其实是：

- 它还在同 provider 内尝试其他 profile

## auth profiles 里存的到底是什么

官方现在明确说，OpenClaw 用 auth profiles 同时承载：

- API key 凭据
- OAuth token 凭据

而配置里的：

- `auth.profiles`
- `auth.order`

只是元数据和路由顺序，不保存真正 secret。

## profile 顺序是怎么决定的

同一个 provider 下，如果你有多套可用 profile，官方当前顺序是：

1. 先看显式配置的 `auth.order[provider]`
2. 再看 `auth.profiles` 里声明的 profile
3. 再看本地存储里的 profiles

如果你没手动指定顺序，系统会做 round-robin，但也不是完全平均轮转。  
官方当前还会参考：

- profile 类型，OAuth 优先于 API key
- `usageStats.lastUsed`
- cooldown / disabled 状态

## 为什么你觉得“OAuth 好像丢了”

这是官方最近专门点出来的一个现象。

如果你给同一 provider 同时配了：

- OAuth profile
- API key profile

那没有 pin 住时，系统可能会在多次消息之间切换，看起来像：

- “刚刚明明还是 OAuth”
- “怎么下一次像在用另一套凭据”

官方给出的稳定办法主要有两种：

- 用 `auth.order[provider]` 明确 pin 顺序
- 在支持的聊天面板里用 `/model ...@<profileId>` 绑定当前 session

## 为什么 session 会持续用同一套 profile

OpenClaw 现在会对 session 做 auth profile pinning。  
官方写得很明确：这是为了保持 provider cache 更热，而不是每次都重新挑。

通常会持续复用到以下情况发生为止：

- session 被 `/new` 或 `/reset`
- compaction 完成一次
- 当前 profile 进入 cooldown 或 disabled

这也是为什么你会看到：

- 同一串对话一直很稳定
- 但开新会话后选择结果变了

## cooldown 什么时候触发

官方当前把这些情况归到可轮转失败：

- auth 失败
- 限流
- 类似限流的 timeout
- 某些格式/stop reason 错误

这时 profile 会被放进 cooldown，然后系统尝试同 provider 的下一个 profile。

默认 backoff 是递增的：

- 1 分钟
- 5 分钟
- 25 分钟
- 1 小时上限

## billing 问题又为什么更像“禁用”而不是短暂冷却

如果失败原因是：

- credits 不足
- billing 不可用

官方不会只给一个短 cooldown，而是会把这个 profile 标记成更长时间的 disabled。  
因为这类错误通常不是瞬时抖动，而是：

- 账号状态本身有问题

## 对运维最有价值的理解

长期运行里，下面三件事不能混成一个问题：

- profile 轮转
- model fallback
- session pinning

它们分别回答的是：

- 同 provider 内先换谁
- 同 provider 全挂后切哪个模型
- 当前会话为什么暂时不切

## 什么时候最该看这套规则

如果你遇到下面这些现象，这页最值得先回来看：

- 某个 provider 偶尔恢复、偶尔失败
- 同 provider 有多套账号但表现不一致
- `/model status` 看着没问题，真实对话却像在换账号
- 你以为会立刻切 fallback，结果没有

## 推荐延伸阅读

- [模型 CLI 里的 allowlist、alias 和 image model 应该怎么理解](/docs/manual/model-allowlists-and-capability-gating)
- [模型状态检查、单 provider 探测与 auth profile 的关系](/docs/reference/models-status-probe-and-auth-profiles)
- [团队里怎么分层放开 provider、模型和 node 能力](/best-practices/provider-and-node-capability-lanes)
