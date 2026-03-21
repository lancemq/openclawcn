---
title: 配置热重载与 include 合并怎么用
description: 基于最新官方 Configuration 文档，整理 OpenClaw 的 config hot reload、reload mode、include 深度合并和哪些改动需要重启。
category: 运维
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/gateway/configuration
sourceName: OpenClaw Docs
sourceType: official
tags: [configuration, hot-reload, includes, merge, restart]
---

# 配置热重载与 include 合并怎么用

官方最近的 Configuration 文档已经把一个很重要的事实讲清楚了：OpenClaw 的配置不是“改文件然后赌一下要不要重启”，而是有一套正式的热重载和合并模型。

这件事对长期运行特别重要，因为它决定了：

- 你能不能在不停机时改配置
- 多份配置怎么拆才不乱
- 哪些改动一定会触发重启

## Gateway 现在会自动监视配置文件

根据最新官方文档，Gateway 会监视：

```text
~/.openclaw/openclaw.json
```

对大多数配置来说，改完文件后会自动应用，不需要手工重启。

这意味着更适合的默认心智应该是：

- 不要把每次配置修改都当成“全量重启事件”
- 但也不要以为所有字段都能无感生效

## 四种 reload mode 应该怎么理解

官方文档当前给了四种模式：

- `hybrid`
- `hot`
- `restart`
- `off`

更容易理解的区别是：

### `hybrid`

默认模式。

- 能热应用的就热应用
- 必须重启的自动重启

如果你只是想“正常长期用”，这通常就是最稳的默认值。

### `hot`

- 只热应用安全改动
- 需要重启时只警告，不替你重启

这更适合你自己想严格控制重启时机的环境。

### `restart`

- 任何配置变化都触发重启

更适合你宁愿粗暴一点，也不想判断哪些能热更新的环境。

### `off`

- 不监视文件
- 只有手工重启才生效

适合非常保守或非常明确的部署场景。

## 哪些配置通常能热应用

根据官方当前文档，下面这些大类通常都可以无停机热应用：

- `channels.*`
- `agent` / `agents` / `models` / `routing`
- `hooks` / `cron` / `agent.heartbeat`
- `session` / `messages`
- `tools` / `browser` / `skills` / `audio` / `talk`
- `ui` / `logging` / `identity` / `bindings`

这意味着很多日常调参，其实没必要总抱着“先停服务再改”的心态。

## 哪些配置更应该预期会重启

官方现在也写得很明确，下面这些大类更应该预期会触发重启：

- `gateway.*`
- `discovery`
- `canvasHost`
- `plugins`

尤其是：

- 端口
- bind
- auth
- tailscale
- TLS
- HTTP

这些本来就属于“服务边界”层，重启是合理的。

## `gateway.reload` 和 `gateway.remote` 是两个值得记住的例外

官方文档特别指出：

- 改 `gateway.reload`
- 改 `gateway.remote`

不会因此触发一次重启。

这类细节很值，因为它能避免你在做远程接入或 reload 策略调整时多做无意义重启。

## include 合并为什么对团队环境很有价值

官方文档当前已经把 include 机制正式写进配置模型里，而且说明了几条很关键的规则：

- 单文件 include：替换所在对象
- 多文件 include：按顺序深度合并，后者覆盖前者
- sibling keys：会在 include 后再覆盖
- 支持嵌套 include
- 相对路径按包含文件位置解析

这意味着你已经可以更有结构地拆配置，而不是把所有东西都塞进一个大 JSON5。

## 更适合的拆分方式

如果你已经进入长期维护阶段，更适合的拆分通常是：

- 基础网关层
- 渠道层
- 模型/provider 层
- 团队私有覆盖层

这样做的价值在于：

- 变更范围更清楚
- 团队协作时冲突更少
- 热重载时更容易判断影响面

## 严格校验为什么反而是好事

官方当前对配置校验非常严格：

- 未知键不接受
- 类型不对不接受
- 非法值不接受

一旦失败：

- Gateway 不启动
- 只保留 `doctor / logs / health / status` 这类诊断命令

这会让第一次配置看起来更“严格”，但对长期运维其实是好事，因为它防止系统带着坏配置半工作半失效地跑着。

## 中文站建议怎么用这套机制

更稳的实践通常是：

1. 日常配置修改保持 `hybrid`
2. 把大配置拆成 include 结构
3. 改 gateway 边界类字段前，预期会触发重启
4. 配置校验失败时先跑 `openclaw doctor`

这样会比“一大份配置直接硬改 + 出问题再猜”稳定很多。

## 下一步推荐

- [配置参考](/docs/reference/configuration-reference)
- [调试、运行时覆盖与开发排障](/docs/reference/debugging-and-runtime-overrides)
- [Model Health 与 Auth 监控怎么做](/best-practices/model-auth-monitoring)

把这几页串起来看，配置层就会从“很多字段”变成“可维护的运行模型”。
