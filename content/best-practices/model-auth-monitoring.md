---
title: Model Health 与 Auth 监控怎么做
description: 结合最新官方 Models CLI、Auth Monitoring 和 Model Failover 文档，总结长期运行时怎样监控 OAuth 过期、缺失凭据和 profile 轮转问题。
category: 模型治理
difficulty: 高级
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/auth-monitoring
sourceName: OpenClaw Docs
sourceType: official
tags: [models, auth, monitoring, oauth, failover, operations]
---

# Model Health 与 Auth 监控怎么做

长期运行 OpenClaw 时，最容易被忽略的一类故障，不是模型配置错了，而是认证状态在慢慢变坏。

官方最近把这条线已经补得比较完整了：

- `models status --check`
- OAuth 过期可见性
- auth profile 轮转
- failover 与 cooldown 规则

这说明模型运维真正要看的，不只是“选了哪个模型”，而是“当前有没有稳定可用的认证路径”。

## 第一原则：先监控 auth，再监控回答质量

很多人会先从“回复变差”“工具没调起来”去猜问题，但长期运行里更常见的根因其实是：

- 某个 provider 没凭据
- OAuth 快过期
- 某个 profile 已被冷却或禁用
- 轮转顺序和你预期不一样

所以更稳的做法是：先把 auth health 做成基础巡检。

## 官方当前最值得直接用的入口

官方 Auth Monitoring 文档推荐得非常明确：

```bash
openclaw models status --check
```

这条命令最大的好处是：

- 不依赖额外脚本
- 适合 cron / systemd
- 直接用退出码表达状态

对大多数环境来说，这已经足够成为第一层告警。

## 为什么只看 API key 是否存在还不够

OpenClaw 现在的 auth profile 体系已经不是“有没有一把 key”这么简单了。

根据官方 Model Failover 文档，长期运行里还会涉及：

- 多 profile 共存
- OAuth 和 API key 混合
- 失败后的 cooldown
- 账单或额度异常后的 disable

所以哪怕配置文件里看起来“像是有凭据”，运行时也可能已经在坏状态。

## 监控里最该看的三类信号

### 1. 缺失或过期

这是最基础的一层。

如果 `models status --check` 非 `0`，首先就要确认：

- 是缺失凭据
- 还是 OAuth 已过期
- 还是进入预警窗口

### 2. provider 级不稳定

如果某个 provider 经常需要轮转 profile，通常说明：

- 配额吃紧
- 认证方式不稳
- 某种凭据更适合改成 API key

官方文档也明确提到，对 always-on gateway，API key 往往更可预测。

### 3. fallback 是否真的生效

长期运行里，auth failover 和 model fallback 是两层东西。

- 同 provider 内先做 auth profile 轮转
- 还不行才切到下一个 fallback model

所以监控时不要只看“有没有 fallback 配置”，还要看第一层 auth 有没有先失血。

## 一个更稳的监控节奏

如果你要给 Gateway 做最小可用监控，推荐这样安排：

1. 定时跑 `openclaw models status --check`
2. 非 `0` 时抓一次 `openclaw models status --json`
3. 再决定是补凭据、重登 OAuth，还是调整 provider 顺序

这样能把日常巡检和细节排错分开。

## 为什么 profile 轮转也值得纳入运维视角

官方 Model Failover 文档现在把 auth profile 轮转机制讲得很细，这意味着一件事：

- OpenClaw 并不是“坏了就彻底坏”

很多时候它会先尝试：

- 轮转到下一个 profile
- 把失败 profile 放入 cooldown
- 再必要时切模型 fallback

这很好，但也意味着如果你从来不看这层，就可能长期在“勉强活着”的状态里运行。

## 中文站建议的落地方式

如果你是个人或小团队环境，建议先做最小版本：

- 每小时或每天跑一次 `models status --check`
- 发现 `1/2` 就人工介入

如果你已经是长期运行环境，再加：

- 抓 JSON 输出
- 记录 provider/auth 状态变化
- 区分 dev / prod 的凭据与告警

这会比“等任务失败再查”轻很多。

## 下一步推荐

- [用 models status 做模型健康检查](/docs/operations/models-status-and-health-checks)
- [模型提供商与故障转移](/docs/manual/providers-and-fallback)
- [Deepgram 音频转录怎么接](/docs/manual/deepgram-audio-transcription)

把这几页连起来看，模型层、认证层和语音入口的可用性会更容易被你真正看见。
