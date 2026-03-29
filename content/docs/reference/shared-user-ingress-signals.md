---
title: 哪些配置会被官方当成 shared-user ingress 信号
description: 基于最新官方 security audit 文档，解释 OpenClaw 为什么会把开放 DM、群目标和 wildcard sender 规则识别成 shared-user ingress 信号，以及这些提醒真正想让你检查什么。
category: 参考
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/cli/security
sourceName: OpenClaw Docs
sourceType: official
tags: [security, shared-inbox, audit, ingress, reference]
---

# 哪些配置会被官方当成 shared-user ingress 信号

OpenClaw 最近的 `security audit` 文档有一个很值的变化：  
它不再只在“已经出问题”时提醒，而是开始根据配置形态判断：

- 你这里是不是很像一个多人共享入口

官方给这个判断起的名字是：

- `security.trust_model.multi_user_heuristic`

## 这不是在说“你配置错了”

先记住一点，官方发这个信号时，意思不是：

- 配置非法
- 功能不能用

它真正想表达的是：

- 你的入口形态已经不像单人 personal-assistant 了

既然默认 trust model 还是个人助理，这种偏离就值得被单独审计。

## 官方当前会看哪些信号

根据最新文档，下面这些都会被当成 shared-user ingress 迹象：

- open 的 DM 或 group policy
- 配置了群目标
- 使用 wildcard sender 规则

它们的共同点都不是“危险配置”本身，而是：

- 更多人可能同时打进来

## open policy 为什么是强信号

如果你把：

- `dmPolicy`
- `groupPolicy`

设得更开放，系统就很难再默认假设：

- 只有 owner 或极少数已知协作者会触达这个入口

这时官方更关心的不是“能不能回复”，而是：

- 回复进来的这些人是不是还在共享同一个会话边界

## 配置 group targets 为什么也会触发

只要系统发现你明确把一些群聊或房间放进配置里，它就会倾向于认为：

- 这已经不是纯粹的一对一私聊入口

群入口天然意味着：

- 多 sender
- 更松的触达面
- 更复杂的 mention / activation 条件

所以官方会把它当成一个治理信号，而不是只看成普通路由项。

## wildcard sender 规则为什么更值得警惕

这类规则最容易给人一种错觉：

- “只是少写点 allowFrom”

但从安全角度看，它实际意味着：

- 谁能进来的边界正在变得模糊

一旦 sender 集合本身就不稳定，再配上：

- `session.dmScope = "main"`
- 宽松 group policy

shared inbox 风险就会明显升高。

## 这个信号最想让你检查什么

看到 heuristic 提醒后，最值得检查的通常不是单个字段，而是这 4 件事：

1. 现在是不是已经有多人会进同一个入口
2. `dmScope` 还适不适合继续用 `main`
3. 有没有把 shared inbox 当成互不信任多租户来用
4. sandbox、workspace scope 和敏感凭据是否还过宽

## 什么时候不用太紧张

如果你的场景本来就是：

- 同一团队内部协作
- 明确接受共享上下文或共享入口
- 已经启用 secure DM 和更窄的权限边界

那这个提醒更多是在提示：

- 你已经进入多用户治理面了

而不是说你必须立刻停用。

## 推荐延伸阅读

- [shared inbox 的运营边界和信任模型](/docs/operations/shared-inbox-trust-boundaries)
- [secure DM mode 和 owner pinning 应该怎么一起理解](/docs/reference/secure-dm-mode-and-owner-pinning)
- [identityLinks 更适合当成“身份映射表”，而不是联系人备注](/best-practices/identity-links-change-control)
