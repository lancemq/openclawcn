---
title: "OpenClaw 正在把团队入口治理拆成更细的几层"
description: "官方最近围绕 security audit、session、broadcast groups 和 channel routing 的文档更新，正在把 shared-user ingress、identityLinks、broadcast precedence 和 shared inbox 硬化拆成更清楚的治理面。"
category: 生态观察
date: "2026-03-29"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/cli/security"
updatedAt: "2026-03-29"
sourceType: "official"
tags: ["shared-inbox", "identityLinks", "broadcast", "routing", "security"]
---

最近把 OpenClaw 的 `security audit`、`session`、`broadcast groups` 和 `channel routing` 文档放在一起看，会发现一个越来越清楚的趋势：

- 官方不再把“多人会不会打进来”当成单个配置问题
- 而是在把团队入口治理拆成更细的几层

这几层现在至少包括：

- shared-user ingress 信号
- DM 会话分桶
- 跨渠道身份归并
- 单 agent routing 与 broadcast precedence

## 1. security audit 已经开始主动识别 shared-user ingress

官方最近最值得注意的一点，是 `security audit` 不只检查明显错误，还会发出：

- `security.trust_model.multi_user_heuristic`

这意味着只要配置长得像多人共享入口，官方就希望你主动把它看成：

- 治理问题

而不是普通聊天功能。

## 2. secure DM 和 identityLinks 被拆成两层

Session 文档现在已经很明确：

- `dmScope` 负责隔离粒度
- `identityLinks` 负责跨渠道折叠

这会让团队更容易避免一个常见误区：

- 试图用 identityLinks 去补 secure DM 没做好的边界

## 3. broadcast 和 bindings 的关系也被说清了

Broadcast Groups 文档最近把一个很关键的点写得很直白：

- broadcast 不绕过 allowlists 和 mention gating
- 且在命中时优先于普通 bindings

这说明官方正在把：

- 单 agent 归属
- 多 agent 协作

明确拆成两种不同配置面。

## 4. shared inbox 的边界越来越不像“默认多用户模式”

Security 文档和相关说明一起看，会更容易看出官方态度：

- shared inbox 可以硬化
- 但默认 trust model 仍然是 personal assistant

也就是说，shared inbox 被支持，但被当成：

- 协作入口加固

而不是：

- 互不信任多租户的正式承诺

## 对中文团队最有价值的提醒

如果你现在已经在做：

- 多人协作入口
- 多账号或多渠道 DM
- shared inbox
- broadcast agent 组合

那接下来最值得补的不是更多技巧，而是先把这几层边界拆清。

## 推荐延伸阅读

- [哪些配置会被官方当成 shared-user ingress 信号](/docs/reference/shared-user-ingress-signals)
- [Broadcast 和普通 bindings 谁先生效，什么时候该用哪一个](/docs/manual/broadcast-vs-binding-precedence)
- [identityLinks 更适合当成“身份映射表”，而不是联系人备注](/best-practices/identity-links-change-control)
