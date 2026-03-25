---
title: models status --probe 和 auth profiles 应该怎么看
description: 基于最新官方 Models CLI 文档，解释 openclaw models status --probe、--probe-provider 与认证 profile 的关系，帮助团队区分“配置看起来对”和“当前真的能连通”。
category: 参考
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/cli
sourceName: OpenClaw Docs
sourceType: official
tags: [models, probe, auth, providers, reference]
---

# models status --probe 和 auth profiles 应该怎么看

站里已经有一页在讲 `openclaw models status`，但最近官方 CLI 文档又补了一层很值得单独展开的能力：

- `--probe`
- `--probe-provider`

这条线很关键，因为它把“当前解析出来的模型配置”继续往前推进成了：

- 当前认证 profile 是否真的能探活

## 先记住 `status` 和 `probe` 的差别

更容易理解的方式是：

- `status` 更偏当前解析结果和认证概况
- `--probe` 更偏对已配置 auth profile 做一次主动探测

如果只看 `status`，你可能知道：

- 当前主模型是谁
- fallback 是谁
- 有没有 profile

但还不一定知道：

- 这些 profile 现在是否真的能通

## 官方现在给了哪些用法

根据当前官方 CLI 文档，`models status` 现在已经支持：

```bash
openclaw models status
openclaw models status --check
openclaw models status --probe
openclaw models status --probe-provider <name>
```

这说明模型检查已经不再只是一层静态状态，而是在逐渐变成正式的连通性检查面。

## `--probe` 更适合解决什么问题

它更适合这些场景：

- 你怀疑某个 provider 的 auth profile 已经失效
- OAuth 看着还在，但你想确认当前探活结果
- fallback 配了很多层，但不确定是不是都还能用
- 你刚做过 profile 轮转或重登，想快速验证

## `--probe-provider` 又适合什么

如果你现在的问题已经基本定位到单个 provider，就不一定要探全局。  
这时更适合：

```bash
openclaw models status --probe-provider <name>
```

它更适合：

- 单 provider 定位
- 只排 Anthropic / OpenAI / OpenRouter 其中一层
- 降低巡检噪音

## 为什么这条能力值得单独看

因为很多模型问题根本不是配置写错，而是：

- auth profile 过期
- OAuth 实际不可用
- 某个 provider 当前网络或认证状态异常

如果只看配置和 `status`，你会知道“应该能用”；  
加上 `--probe`，你才更接近知道“现在真的能用”。

## auth profiles 更适合怎么理解

更稳的理解方式不是：

- 一个 provider 对应一个永远有效的凭据

而是：

- 一个 provider 下面可能有一组会变化、会轮换、会过期的 auth profile

这也是为什么官方最近会把：

- auth monitoring
- OAuth 过期窗口
- `status --check`
- `status --probe`

连成一条线。

## 什么时候只看 `--check` 就够

如果你要的是：

- 轻量告警
- 定时巡检
- 非 0 就报警

那 `--check` 往往已经够了。

## 什么时候该再补 `--probe`

更适合加 `--probe` 的通常是：

- 大改 provider 顺序后
- 重做 auth profile 后
- 某个 provider 最近常抖
- 你要确认 fallback 是否真能接棒

## 一条更稳的巡检顺序

通常更适合按这条线走：

1. 先跑 `openclaw models status --check`
2. 有异常再看 `openclaw models status`
3. 仍不确定时，再补 `--probe`
4. 已经知道问题 provider 时，用 `--probe-provider`

## 最容易踩的坑

### 1. 以为有 profile 就等于当前能用

profile 存在，不等于探活成功。

### 2. 每次都全局 `--probe`

这会让巡检噪音偏大，很多时候单 provider 探测更合适。

### 3. 只看模型 fallback，不看 auth profile 层

有时根本不是 fallback 设计问题，而是第一层认证已经先坏了。

## 下一步推荐

- [用 models status 做模型健康检查](/docs/operations/models-status-and-health-checks)
- [模型提供商与故障转移](/docs/manual/providers-and-fallback)
- [Model Health 与 Auth 监控实践](/best-practices/model-auth-monitoring)

