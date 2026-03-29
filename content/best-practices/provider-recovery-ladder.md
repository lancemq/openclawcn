---
title: Provider 故障时先按恢复阶梯排，不要直接乱切模型
description: 结合最新官方 Model Failover、Gateway Troubleshooting、LiteLLM 和 Cloudflare AI Gateway 文档，总结模型调用异常时更稳的恢复顺序，避免把长上下文、认证轮转、网关鉴权和跨模型 fallback 混成一件事。
category: 模型治理
difficulty: 高级
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/concepts/model-failover
sourceName: OpenClaw Docs
sourceType: official
tags: [providers, failover, recovery, models, operations]
---

# Provider 故障时先按恢复阶梯排，不要直接乱切模型

模型层一出问题，最常见的反应往往是：

- 赶紧换模型

但把官方最近的 Model Failover、Gateway Troubleshooting、LiteLLM 和 Cloudflare AI Gateway 文档放在一起看，会发现更稳的做法其实是一条恢复阶梯。

## 第一层：先判断是不是“能力条件”问题

有些错误看起来像 provider 崩了，其实只是能力条件没满足。

最典型的例子就是官方单独列出来的：

- Anthropic `context1m` 429

这时更该先问的是：

- 是不是长上下文资格不够

而不是先全面切走 Anthropic。

## 第二层：再看 provider 内 auth profile 轮转

官方 Model Failover 文档已经把这条写得很清楚：

- 同 provider 内先轮转 auth profile
- profile 进入 cooldown 后再换下一个

所以如果你有多套凭据，这一层通常比“立刻跨模型 fallback”更便宜，也更接近原始意图。

## 第三层：再看是不是统一网关层挡住了

如果你走的是 LiteLLM、Cloudflare AI Gateway 这类统一入口，那问题可能根本不在上游模型本身，而在网关这一层。

例如：

- LiteLLM 路由或 virtual key 限额
- Cloudflare AI Gateway 的 `cf-aig-authorization`
- daemon 环境没把 provider key 带进去

这类问题如果你直接在 OpenClaw 里乱切 fallback，往往只会让日志更难读。

## 第四层：最后才是跨模型 fallback

官方现在已经把跨模型 fallback 明确定义成：

- 当前 provider 的 profile 都不行后
- 再去 `agents.defaults.model.fallbacks`

这说明 fallback 不是“第一反应”，而是恢复阶梯更后的一层。

## 一条更稳的恢复顺序

建议按这个顺序排：

1. 先看是不是能力门槛问题，例如 `context1m`
2. 再看 provider 内 auth profile 和 cooldown
3. 再看统一网关层的鉴权、路由和环境变量
4. 最后才判断跨模型 fallback 是否该接棒

这个顺序最大的价值是：

- 你能更快知道问题到底卡在哪一层
- 而不是把所有异常都粗暴归因成“主模型坏了”

## 哪些场景特别适合这样排

这条恢复阶梯特别适合这些环境：

- 多 provider 长期运行
- 有 auth profile 轮转
- 走 LiteLLM 或 Cloudflare 统一入口
- 对成本和稳定性都比较敏感

## 最容易犯的三个错误

### 1. 一看到 429 就立刻跨模型

有些 429 是长上下文资格问题，不是整条 provider 线都坏了。

### 2. 统一网关和 OpenClaw 两层都做复杂 fallback

这样真正故障时最难回答的问题就是：

- 这次到底是谁在切

### 3. 不看 daemon 环境，只看当前 shell

provider key、gateway token、Cloudflare header 在交互 shell 和守护进程环境里经常不是同一套可见性。

## 下一步推荐

- [Anthropic context1m 的 429 和 fallback 应该怎么处理](/docs/reference/anthropic-context1m-429-and-fallback)
- [Cloudflare AI Gateway 的双层鉴权头应该怎么配](/docs/reference/cloudflare-aig-dual-auth-headers)
- [团队里如何给 Provider 加统一网关层](/best-practices/provider-gateway-layering)
