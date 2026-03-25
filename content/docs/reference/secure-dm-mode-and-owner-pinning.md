---
title: secure DM mode 和 owner pinning 应该怎么一起理解
description: 基于最新官方 Session 与 Security 文档，解释 OpenClaw 的 secure DM mode、owner pinning、pairing / allowlist / open 三类 DM 入口，以及什么时候该从连续主会话切到隔离模式。
category: 参考
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/concepts/session
sourceName: OpenClaw Docs
sourceType: official
tags: [session, security, dmScope, pairing, allowlist]
---

# secure DM mode 和 owner pinning 应该怎么一起理解

官方最近把 Session 和 Security 两组文档写得更完整了，中文用户现在更容易把一件事看清楚：

- DM 能不能进来，是 access policy 问题
- DM 进来后会不会共用上下文，是 session boundary 问题

这两层如果混在一起看，就很容易把 secure DM mode 误解成“只是更严格一点的允许名单”。

## 先把三层东西分开

更稳的理解方式是：

- `dmPolicy` 决定陌生人能不能先把 DM 打进来
- `allowFrom` / pairing approval 决定谁被允许触达
- `session.dmScope` 决定允许进来的 DM 共享哪个上下文桶

secure DM mode 实际指向的是第三层。

## 为什么默认 `main` 在单人环境里是成立的

当前官方文档仍然把：

- `session.dmScope: "main"`

作为默认值。

它的好处很直接：

- 你在不同 DM 入口之间能保持连续上下文
- WebChat、手机端和其他私聊入口更像在共用一个个人主会话

如果这个 agent 只服务你一个人，这种连续性通常是有价值的。

## secure DM mode 到底在改什么

官方现在把 secure DM mode 直接定义成：

- `session.dmScope: "per-channel-peer"`

也就是每个“渠道 + 发送者”组合有自己的 DM 上下文。

它解决的不是“谁能来找你”，而是：

- Alice 的私聊上下文不会和 Bob 的私聊上下文混在一起

这是共享 DM 入口里最关键的一层保护。

## 什么情况下应该尽快开 secure DM mode

根据当前官方文档，更值得立刻切到隔离模式的通常是：

- pairing 审批过不止一个 sender
- DM allowlist 里本来就有多个人
- 你把 `dmPolicy` 设成了 `open`
- 同一个 bot/account 会被多人触达

这几种情况的共同点是：

- “谁都能进主会话”已经不再是合理假设

## multi-account 场景为什么还要再往上一层

如果你在同一渠道上接了多个账号，官方现在更明确推荐：

- `per-account-channel-peer`

原因不是更复杂，而是为了避免：

- 同一 sender 在不同账号下被误判成同一个 DM 桶

这在多 bot、多号码或多 workspace 入口里很重要。

## `identityLinks` 应该放在哪一层理解

`identityLinks` 不是 secure DM mode 的替代品。

它真正解决的是：

- 同一个人跨不同渠道联系你时，哪些身份要折叠到同一 canonical identity

所以更准确的关系是：

- `dmScope` 决定分桶粒度
- `identityLinks` 决定跨渠道时哪些 peer 可以折叠

如果你要的是共享入口隔离，先改 `dmScope`；如果你要的是同一个人跨渠道连续，再补 `identityLinks`。

## owner pinning 为什么值得一起看

官方 Channel Routing 文档提到一个很值的细节：

- 当 `session.dmScope = "main"` 时，系统会尝试通过 `allowFrom` 推断 pinned owner
- 非 owner DM 不会随便改主会话的 `lastRoute`

这说明官方也在保护一个事实：

- 默认主会话虽然连续，但它不能被任意 DM 入口随便“夺走”

不过要注意，这仍然不是 secure DM mode 的替代方案。

更准确地说：

- owner pinning 只是降低 main 会话被错误重定向的风险
- secure DM mode 才是在根上把不同 sender 的上下文拆开

## pairing / allowlist / open 应该怎么选

从当前官方安全建议看，更稳的顺序通常是：

### pairing

适合：

- 私有入口
- 先确认身份，再允许 DM

这是当前官方默认路径。

### allowlist

适合：

- 你已经明确知道哪些人能来找这个 bot
- 不需要额外配对流程

### open

适合：

- 公开入口
- 已经明确接受陌生人 DM

但一旦走到这一步，更应该同时把 `dmScope` 调到隔离模式。

## 中文环境里最容易踩的坑

### 1. 以为 pairing 已经等于安全隔离

pairing 解决的是“谁能进来”，不是“进来后共不共用主会话”。

### 2. 只记得 `per-peer`，忘了 `per-channel-peer`

多人共享入口里，按渠道再加一层通常更稳。

### 3. 把 owner pinning 当成 secure DM mode

owner pinning 只能减少 main route 漂移，不能替代 sender 级上下文隔离。

## 一条更稳的选择顺序

建议按这个顺序判断：

1. 这个 DM 入口是不是只服务你一个人
2. 会不会有多个人能直接 DM 这个 agent
3. 是否存在多账号共享同一渠道
4. 是否希望同一个人跨多个渠道保持连续

前两题决定你先不先开 secure DM mode，后两题决定用哪种隔离粒度和要不要加 `identityLinks`。

## 下一步推荐

- [dmScope 和 identityLinks 应该怎么一起用](/docs/reference/dm-scope-and-identity-links)
- [频道与 Session 路由怎么决定上下文边界](/docs/manual/channel-routing-and-session-keys)
- [OpenClaw 安全最佳实践](/docs/operations/openclaw-security-best-practices)
