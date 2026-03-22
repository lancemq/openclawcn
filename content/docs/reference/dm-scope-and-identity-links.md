---
title: dmScope 和 identityLinks 应该怎么一起用
description: 基于最新官方会话管理文档，解释 OpenClaw 的 dmScope 四种模式、identityLinks 的真实作用，以及为什么多人 DM、跨渠道私聊和多账户环境不能只改一个开关。
category: 参考
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/concepts/session
sourceName: OpenClaw Docs
sourceType: official
tags: [session, dmScope, identityLinks, routing, reference]
---

# dmScope 和 identityLinks 应该怎么一起用

OpenClaw 的 session 文档最近把一个很关键、但很容易被中文用户低估的点写得更清楚了：

- DM 连续性不是只有“开”或“关”
- 它其实取决于 `dmScope` 和 `identityLinks` 的组合

如果只改其中一个，很多多渠道和多人 DM 问题都不会真正解决。

## 先记住 `dmScope` 控制的是什么

`dmScope` 控制的是：

- 私聊消息如何落到 session key

也就是：

- 哪些 DM 会共用一个上下文桶

它不直接回答“这是不是同一个人”，只是决定默认怎样分桶。

## 四种 `dmScope` 应该怎么理解

根据当前官方文档，更适合记成下面四种场景。

### `main`

所有 DM 折叠到 agent 主会话。

适合：

- 单人使用
- 你希望多个个人入口共用连续上下文

风险是：

- 如果多个不同的人都能 DM，这个主会话就可能被污染

### `per-peer`

按发送者身份分桶。

适合：

- 同一个人可能跨多个渠道找你
- 你希望按“人”而不是按“渠道”隔离

### `per-channel-peer`

按渠道加发送者分桶。

适合：

- 多人共享一个机器人入口
- 同一个 sender id 在不同渠道里不该被当成同一个上下文

官方也把它明确列成多用户 inbox 的推荐模式。

### `per-account-channel-peer`

按账号、渠道、发送者三层分桶。

适合：

- 一个网关接了多个同类账号
- 你不希望不同 bot/account 之间的 DM 意外串起来

这也是多账户环境更稳的默认思路。

## `identityLinks` 真正解决什么问题

官方文档当前写得很直接：

- `identityLinks` 用来把带 provider 前缀的 peer id 映射到规范身份

也就是说，它不是在控制“要不要隔离”，而是在控制：

- 跨渠道时哪些身份应该被视为同一个人

例如同一个人可能同时通过：

- `telegram:123456789`
- `discord:987654321012345678`

来找同一个 agent。

如果你想让这两条 DM 共享同一个人类身份层，就要靠 `identityLinks`。

## 为什么 `identityLinks` 不能代替 `dmScope`

这是最容易混淆的点。

更准确的关系是：

- `dmScope` 决定分桶形状
- `identityLinks` 决定跨渠道时哪些 peer 可折叠到同一身份

所以：

- 只配 `identityLinks` 但 `dmScope` 还是 `main`，多人 DM 仍可能混进一个主会话
- 只改 `dmScope` 但不配 `identityLinks`，同一个人跨渠道也可能被拆成多个上下文

## 哪些组合更常见

### 单人 personal assistant

更常见的是：

- `dmScope: "main"`

因为你要的是：

- 手机、WebChat、不同私聊入口都尽量连续

### 多人共享机器人

更稳的是：

- `dmScope: "per-channel-peer"`

因为你首先要避免的是：

- 不同人的 DM 彼此污染

### 多账户团队环境

更稳的是：

- `dmScope: "per-account-channel-peer"`

因为这能防止：

- 不同 bot/account 的 sender 在 session 层被错误合并

### 同一个人跨多个渠道联系你

这时更值得加上：

- `identityLinks`

否则 Telegram 上的 Alice 和 Discord 上的 Alice 只会被当成两个独立 peer。

## 为什么 secure DM mode 值得重视

官方 FAQ 和 Security 文档最近都在强调同一件事：

- 如果多个不同的人都能给 bot 发私信，就应该考虑 secure DM mode

它本质上指向的就是：

- 把 `dmScope` 从 `main` 换到更隔离的模式

这不是风格偏好，而是直接关系到：

- 会不会发生跨用户上下文泄漏

## 中文用户最容易踩的坑

### 1. 只知道 `main` 和“非 main”

实际还有两层更细的隔离强度：`per-channel-peer` 和 `per-account-channel-peer`。

### 2. 以为 `identityLinks` 是联系人备注

它实际会影响跨渠道 DM 是否共享同一身份上下文。

### 3. 多人入口还坚持 `dmScope: "main"`

这在个人环境很顺手，在共享入口里风险很高。

## 一条更稳的选择顺序

建议按这个顺序做判断：

1. 是不是只有你一个人会 DM 这个 agent
2. 是否存在多个渠道同时私聊
3. 是否接了多个同类账号
4. 是否希望同一个人跨渠道保持连续性

这四个问题答完后，`dmScope` 和 `identityLinks` 一般就很好定了。

## 下一步推荐

- [频道与 Session 路由怎么决定上下文边界](/docs/manual/channel-routing-and-session-keys)
- [Session 与配对机制](/docs/manual/session-and-pairing)
- [团队频道里的 Session 隔离策略](/docs/operations/team-channel-session-strategy)
