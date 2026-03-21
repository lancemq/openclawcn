---
title: 用 models status 做模型健康检查
description: 基于最新官方 Models CLI 与 Auth Monitoring 文档，整理 openclaw models status 在日常运维里的正确用法、退出码含义和适合接入监控的检查方式。
category: 运维
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/models
sourceName: OpenClaw Docs
sourceType: official
tags: [models, health-check, auth, oauth, monitoring]
---

# 用 models status 做模型健康检查

官方最近把 `openclaw models status` 的定位讲得比以前清楚很多了。它已经不只是“看一下当前模型是谁”，而是正式承担模型和认证层的健康检查入口。

如果你只记一件事，建议记这个：

- 想看当前主模型和 fallback，`models status`
- 想做自动化监控，`models status --check`

## 这条命令现在到底会看什么

根据最新官方 Models CLI 文档，`openclaw models status` 会输出：

- 当前解析后的主模型
- 当前 fallback 列表
- image model
- provider 认证概况
- OAuth 过期状态

也就是说，它看的已经不是单一模型，而是“模型 + 认证 + 退路”这一整层。

## 为什么这比只看配置文件更可靠

很多人排查时会先去翻配置，但长期运行环境里，真正影响可用性的往往不只是配置本身，还包括：

- provider 当前有没有可用凭据
- OAuth 有没有快过期
- 某些 profile 是否已经失效
- fallback 是否真的存在

`models status` 的价值就在这里：它给的是更接近运行时的现状，而不只是静态配置。

## `--check` 最适合拿来做什么

官方 Auth Monitoring 文档已经把推荐方式写得很直接：

```bash
openclaw models status --check
```

它最适合接到：

- cron
- systemd timer
- 轻量告警脚本
- 远程巡检

因为这条命令本身就会用退出码表达状态，不需要你自己再去解析一大堆文本。

## 退出码应该怎么理解

根据官方 Auth Monitoring 文档，截至 **2026 年 3 月 21 日**，这条命令的退出码含义是：

- `0`：正常
- `1`：凭据缺失或已过期
- `2`：即将过期

这点很重要，因为它意味着你完全可以把它当成一条标准健康检查命令，而不是只给人手动看。

## 日常运维里最实用的三种看法

### 第一种：只看当前主模型

如果你只想快速确认“现在到底跑的是谁”，可以用：

```bash
openclaw models status --plain
```

它适合临时排查或把结果喂给别的脚本。

### 第二种：看完整状态

如果你要查：

- 主模型
- fallback
- image model
- auth 概况

那就直接跑：

```bash
openclaw models status
```

### 第三种：给监控系统用

如果你要让系统判断“现在需不需要报警”，更适合：

```bash
openclaw models status --check
```

这是官方当前最推荐的自动化入口。

## 为什么 OAuth 过期检查特别值得用它

官方文档现在明确提到，`models status` 会显示 auth store 里 profile 的 OAuth 过期状态，并在默认 24 小时窗口里提前告警。

这对长期运行很关键，因为很多“怎么忽然不能用了”的问题，本质上都不是模型崩了，而是：

- OAuth 过期了
- profile 丢了
- 某个 provider 缺凭据

如果你不提前看这层，问题常常会在真正要用的时候才爆出来。

## 一个更稳的巡检顺序

如果你要给 Gateway 做最小日常巡检，更适合按这个顺序：

1. `openclaw models status --check`
2. 如果异常，再看 `openclaw models status`
3. 需要更细时，再看 `--json`

这样不会一开始就陷进大量细节里。

## 什么时候还要结合 models list 一起看

如果你怀疑的问题不是“凭据坏了”，而是“允许使用的模型集合不对”，那就要把 `models list` 一起看。

例如：

- 模型没出现在 allowlist
- 当前 provider 没暴露你以为有的模型
- 本地 provider 没被正确发现

这类问题只看 `status` 不一定够。

## 中文站建议怎么用这条命令

如果你现在是个人或小团队环境，最实用的用法通常就是：

```bash
openclaw models status --check
```

每天或每小时跑一次。

如果返回非 `0`，再决定是：

- 补 API key
- 重新 OAuth
- 调整 fallback
- 检查 provider 网络

这会比等到聊天或自动化任务真的失败后再排查，轻松很多。

## 下一步推荐

- [模型提供商与故障转移](/docs/manual/providers-and-fallback)
- [Model Health 与 Auth 监控实践](/best-practices/model-auth-monitoring)
- [记忆搜索与 embeddings 该看什么](/docs/manual/memory-search-and-indexing)

把这几页一起看，模型层的“可用性”就会比只看配置完整得多。
