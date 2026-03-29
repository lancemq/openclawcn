---
title: Anthropic context1m 的 429 和 fallback 应该怎么处理
description: 基于最新官方 Gateway Troubleshooting 与 Model Failover 文档，解释 Anthropic 长上下文 429 为什么常只在长 session 里出现、什么时候该关掉 context1m，以及怎样用 fallback 把这类拒绝变成可恢复事件。
category: 参考
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/gateway/troubleshooting
sourceName: OpenClaw Docs
sourceType: official
tags: [anthropic, "429", context1m, failover, reference]
---

# Anthropic context1m 的 429 和 fallback 应该怎么处理

官方 Gateway Troubleshooting 页最近把一个很具体的问题单独拎了出来：

- `HTTP 429: rate_limit_error: Extra usage is required for long context requests`

这说明它已经不是零散边缘问题，而是 Anthropic 长上下文运行时值得正式处理的一类故障。

## 这类 429 为什么经常显得“很随机”

官方排障页给出的判断很明确，这类报错通常同时满足三件事：

- 当前选中的 Anthropic Opus / Sonnet 模型启用了 `params.context1m: true`
- 当前凭据没有 long-context 使用资格
- 失败主要出现在长 session 或需要 1M beta 路径的 run

所以它看起来像“有时好有时坏”，其实常常不是整体 provider 坏了，而是：

- 普通上下文可用
- 长上下文那条能力线被拒绝

## 为什么不要把它直接当成“普通速率限制”

这类 429 和“瞬时打满速率上限”并不完全一样。

官方给的修复建议很直接：

1. 关掉 `context1m`
2. 换成有 billing / extra usage 资格的 Anthropic 凭据
3. 配好 fallback，让长上下文请求被拒时还能继续跑

这说明它更像“能力资格不满足”，而不只是暂时拥堵。

## 最应该先看的不是日志量，而是模型配置

碰到这类 429 时，更适合先看：

```bash
openclaw logs --follow
openclaw models status
openclaw config get agents.defaults.models
```

因为真正关键的是：

- 你当前是不是在走带 `context1m` 的 Anthropic 模型
- fallback 有没有准备

## 什么时候更适合直接关掉 `context1m`

如果你的场景是：

- 大多数任务并不真的需要 1M 长上下文
- 当前账号又没有稳定 long-context 资格
- 你更在意整体稳定，而不是极限上下文窗口

那官方建议里第一条其实就很实用：

- 直接禁用 `context1m`

让请求回到普通上下文窗口，往往比长期让主路径踩这类 429 更稳。

## 什么时候更适合保留 `context1m`，但给出 fallback

如果你确实需要长上下文能力，例如：

- 长会话归纳
- 大文档推理
- 超长项目历史分析

那更稳的做法通常不是完全放弃它，而是：

- 让 Anthropic 长上下文继续当主力
- 但在 `agents.defaults.model.fallbacks` 里准备后备模型

这样当长上下文资格没满足时，run 还能继续而不是整条链路直接失败。

## 这类 429 在 failover 里属于哪一层

结合官方 Model Failover 文档，更适合把它看成两层判断：

### 第一层：同 provider 内 auth/profile 轮转

如果你同一个 Anthropic provider 下有多套可用 profile，系统会先尝试 profile 轮转。

### 第二层：跨模型 fallback

如果当前 provider 的 profile 都不行，才会进入 `fallbacks`。

也就是说，它不是一碰到 429 就必然立刻跨模型，而是先走 provider 内的恢复路径。

## 哪些误判最常见

### 1. 以为 Anthropic 整体不可用

很多时候只是 1M 长上下文资格不满足，普通上下文并不一定坏。

### 2. 只盯着 429，不看 `context1m`

如果你不先确认模型参数，很容易把问题错判成通用限流。

### 3. 以为 fallback 已配就一定会接住

如果 provider 内 profile 轮转、allowlist 或 fallback 本身没配完整，仍然可能断在中间。

## 更稳的恢复顺序

建议按下面顺序处理：

1. 先确认当前模型是否启用了 `params.context1m: true`
2. 看当前 Anthropic credential 是否具备相应资格
3. 确认 provider 内 profile 轮转是否可用
4. 再确认 `fallbacks` 是否真的存在且允许被选中

## 下一步推荐

- [models status --probe 和 auth profiles 应该怎么看](/docs/reference/models-status-probe-and-auth-profiles)
- [认证配置文件怎么轮转，为什么 session 会“粘住”同一套凭据](/docs/reference/auth-profile-rotation-and-session-pinning)
- [模型提供商与故障转移](/docs/manual/providers-and-fallback)
