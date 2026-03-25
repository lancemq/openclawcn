---
title: 共享 DM 入口上线前的 secure DM 检查清单
description: 结合最新官方 Session、Security 和 CLI Security 文档，整理共享 DM、配对审批、多账号入口和跨渠道身份映射的上线前核查清单，避免把单人默认配置直接带进多人环境。
category: 安全治理
difficulty: 中级
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/gateway/security
sourceName: OpenClaw Docs
sourceType: official
tags: [security, dmScope, pairing, session, rollout]
---

# 共享 DM 入口上线前的 secure DM 检查清单

很多中文团队第一次把 OpenClaw 从“自己用”扩到“几个人都能私聊这个 bot”时，最容易漏掉的一件事是：

- 默认配置还是按单人连续主会话设计的

这在个人环境很顺手，但一旦进入共享 DM 入口，就该把 secure DM 当成上线项，而不是后补项。

## 1. 先确认这是不是共享 DM 入口

更需要开 secure DM mode 的通常包括：

- pairing 审批会批准多个人
- DM allowlist 里本来就不止一个人
- `dmPolicy` 设成 `open`
- 一个渠道下接了多个账号或号码

如果答案是“会有多个人直接 DM 这个 agent”，就不要再默认停在 `main`。

## 2. 把 `dmScope` 从默认值切到合适粒度

更稳的选择通常是：

- 多人共享入口：`per-channel-peer`
- 同渠道多账号：`per-account-channel-peer`

不要把这一步拖到上线后，因为主会话一旦已经混入多人的上下文，后面再切会更难排。

## 3. 把 access policy 和 session policy 分开检查

上线前要分别回答两件事：

- 谁能 DM 进来
- 进来之后是不是各自隔离

也就是分别检查：

- `dmPolicy`
- `allowFrom` / pairing approvals
- `session.dmScope`

前两项解决准入，后一项解决上下文边界。

## 4. 多账号环境不要只看 sender id

如果同一渠道有多个 bot/account，要重点检查：

- 是否需要 `per-account-channel-peer`

否则“同一个 sender id”可能在不同账号入口下被错误折叠到一起。

## 5. 跨渠道连续性只在确认隔离后再做

如果你希望同一个人跨 Telegram、Discord 或其他渠道保持连续，再补：

- `session.identityLinks`

顺序不要反过来。

更稳的做法始终是：

- 先保证多人隔离
- 再决定哪些身份要跨渠道折叠

## 6. 用 `openclaw security audit` 做上线前自检

官方 CLI Security 文档已经明确把 shared inbox 风险纳入检查项。

上线前建议至少跑一次：

```bash
openclaw security audit
```

如果配置上存在多 sender 共用主会话的迹象，当前审计会提示：

- 推荐切到 secure DM mode

这一步非常适合做成部署前固定动作。

## 7. 给 owner 和非 owner 的能力边界单独过一遍

如果入口里既有 owner，也有非 owner sender，要额外确认：

- 非 owner 是否不应获得高风险工具入口
- 默认主会话是否仍在被当成私人主会话使用

owner pinning 能减少主会话 route 漂移，但不能替代 sender 级隔离。

## 8. 把切换后的验证场景跑全

至少验证这几组：

- Alice 和 Bob 分别私聊后，历史不互相污染
- 同一人跨两个渠道联系时，是否按预期折叠或分离
- 多账号环境下，相同 sender 在不同账号是否保持隔离
- WebChat 是否仍只附着在你预期的 agent 主会话

## 一条更稳的上线顺序

建议按这个顺序走：

1. 先定义谁能进来
2. 再定义 DM 应该按什么粒度隔离
3. 再决定哪些跨渠道身份可以折叠
4. 最后跑 `security audit` 和几组真实 DM 验证

## 下一步推荐

- [secure DM mode 和 owner pinning 应该怎么一起理解](/docs/reference/secure-dm-mode-and-owner-pinning)
- [dmScope 和 identityLinks 应该怎么一起用](/docs/reference/dm-scope-and-identity-links)
- [OpenClaw 安全最佳实践](/docs/operations/openclaw-security-best-practices)
