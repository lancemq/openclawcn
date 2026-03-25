---
title: Secret rotation 和 active snapshot 应该怎么配合
description: 结合最新官方 Secrets Management 文档，整理一套更稳的密钥轮换方法，帮助团队理解 SecretRef eager resolve、active snapshot 和 reload 失败时的 last-known-good 边界。
category: 安全治理
difficulty: 高级
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/gateway/secrets
sourceName: OpenClaw Docs
sourceType: official
tags: [secretrefs, secrets, rotation, snapshot, operations]
---

# Secret rotation 和 active snapshot 应该怎么配合

站里已经有一页在讲 SecretRefs 和运行时快照，但最近官方这条线里还有一个更适合长期运维单独记住的重点：

- secret rotation 不是请求时即时切换
- 而是围绕 active snapshot 做原子替换

## 第一原则：先接受“请求时不用现拉密钥”

更稳的理解方式是：

- SecretRef 在激活或 reload 时解析
- 运行时请求读的是 active snapshot

这意味着 rotation 的关键不在于：

- 某个 secret provider 这秒钟给没给出值

而在于：

- 新一轮 reload 能不能生成完整新快照

## 第二原则：rotation 要按“整套快照切换”来想

如果你当前在轮换：

- provider API key
- OAuth profile 引用
- 多渠道 token

更适合的心智不是逐字段想，而是：

- 新快照能不能完整激活

## 第三原则：reload 失败时别误判成线上已经切坏

官方当前文档明确写到：

- reload 使用 atomic swap
- 失败时继续保留 last-known-good

这说明 secret rotation 失败时，更可能出现的是：

- 新配置没生效

而不是：

- 当前线上半新半旧地坏掉

## 第四原则：rotation 前先做可见性预检查

更稳的默认动作通常是：

1. 先确认新的 env/provider refs 已经可见
2. 再做 reload
3. 再用状态检查确认新快照是否上线

这样会比“直接切 secret，再等线上报错”稳很多。

## 第五原则：不要把 SecretRef 当 runtime fallback

这是最容易误判的一点。

SecretRef 更像：

- 激活期解析

而不是：

- 请求失败时自动去找另一份 secret

如果把它误解成 fallback 机制，后面设计轮换策略时会走偏。

## 最容易踩的坑

### 1. 以为 secret provider 抖一下，当前请求就一定立刻挂

已有 active snapshot 可能还在继续服务。

### 2. 以为 reload 失败会把系统切进半坏状态

官方当前模型不是这样设计的。

### 3. rotation 时只看单个字段，不看整套快照能否激活

这会让你低估配置原子性要求。

## 一条更稳的轮换顺序

1. 准备新 secret refs
2. 先验证上游可见性
3. 再触发 reload
4. 确认新快照成为 active snapshot
5. 最后再废弃旧引用

## 下一步推荐

- [SecretRefs 和运行时快照应该怎么理解](/docs/reference/secret-refs-and-runtime-snapshot)
- [环境变量从哪里来，优先级怎么排](/docs/reference/env-sources-and-precedence)
- [OpenClaw 安全最佳实践](/docs/operations/openclaw-security-best-practices)

