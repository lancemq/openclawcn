---
title: 消息投递、重试与响应行为
description: 基于官方 retry、messages 和 FAQ 文档，解释消息发送失败时 OpenClaw 会重试什么，不会重试什么，以及为什么群聊和渠道行为会不同。
category: 功能
updatedAt: 2026-03-12
source: https://docs.openclaw.ai/zh-CN/concepts/retry
sourceName: OpenClaw Docs
sourceType: official
tags: [messages, retry, delivery, telegram, discord]
---

# 消息投递、重试与响应行为

很多人遇到“没回复”时，会直觉认为是模型没工作。但官方文档把消息、重试和渠道行为单独拆开，说明在 OpenClaw 里，“能不能成功把消息送出去”本身就是一层独立机制。

更适合的理解方式是：

- 模型生成只是中间环节
- 发送到渠道还要经过投递层
- 重试按单次 HTTP 请求发生，而不是整个多步骤流程一起重来

## 官方重试策略的核心原则

官方中文文档明确给了三条目标：

- 按 HTTP 请求重试，而不是按整个流程重试
- 只重试当前失败步骤，尽量保持顺序
- 避免重复执行非幂等动作

这意味着如果一个复杂流程里前面两步已经成功，OpenClaw 不会为了最后一步失败就把整条链全部重做。

## 默认重试参数怎么理解

官方文档给出的默认值是：

- 尝试次数：`3`
- 最大延迟：`30000 ms`
- 抖动：`0.1`

并且对不同渠道给了默认最小延迟：

- Telegram：`400 ms`
- Discord：`500 ms`

这说明渠道重试并不是“无限重试直到成功”，而是有限次数、有限延迟的保护机制。

## Discord 和 Telegram 的行为不一样

官方文档把两个渠道的重试条件写得很清楚。

### Discord

Discord 只会在速率限制错误，也就是 `HTTP 429` 时重试。  
如果返回了 `retry_after`，就按它来；否则走指数退避。

### Telegram

Telegram 会对更多“瞬时问题”做重试，例如：

- `429`
- 超时
- 连接重置
- 连接关闭
- 临时不可用

同样，如果有 `retry_after` 会优先使用；否则走指数退避。

另外一个很实用的细节是：Markdown 解析错误不会重试，而是回退为纯文本。

这能解释很多“为什么 Telegram 最后发出去了，但格式没了”的情况。

## 配置应该放在哪里

官方给出的重试配置挂在具体渠道下，例如：

```json
{
  "channels": {
    "telegram": {
      "retry": {
        "attempts": 3,
        "minDelayMs": 400,
        "maxDelayMs": 30000,
        "jitter": 0.1
      }
    }
  }
}
```

也就是说，重试不是全局一个开关，而更适合按渠道分别调。

## 重试适用于哪些动作

官方文档特别提醒：重试是按请求应用的。它适用于：

- 消息发送
- 媒体上传
- 表情回应
- 投票
- 贴纸

但组合流程不会把已经成功的步骤再重来。

这条边界很重要，因为它能避免很多重复发送或重复执行的副作用。

## 为什么群聊看起来更容易“没反应”

从官方首页和消息相关文档来看，群聊本来就常常有额外门槛，例如：

- `allowFrom`
- 提及要求
- `messages.groupChat.mentionPatterns`

所以“群里没回复”不一定是重试没工作，也可能是消息根本没有被判定为应该进入生成流程。

## FAQ 里最值得记的一点

官方 FAQ 对“卡在 wake up my friend”这类问题给了一个很关键的排查顺序：

```bash
openclaw gateway restart
openclaw status
openclaw models status
openclaw logs --follow
openclaw doctor
```

这组命令的意义是把问题拆成三层：

- Gateway 有没有真正起来
- 模型和认证有没有正常工作
- 投递链有没有报错

## 中文用户最常见的误区

### 看到没回复就只查模型

很多时候其实是投递层、速率限制或渠道权限问题。

### 以为重试会把整条流程全部重跑

官方并不是这么设计的，它更偏“只补当前失败请求”。

### 群聊没回复就怀疑系统坏了

群聊场景还受提及规则和 allowlist 约束，先看消息是否真的进入了处理链。

## 更稳的排查顺序

1. 先看消息是否被允许进入
2. 再看模型是否有正常生成
3. 最后再看渠道投递和重试

如果你直接把“未回复”归因为某一层，排障成本会很高。

## 下一步推荐

- [Channels 概览](/docs/manual/channels-overview)
- [Session 与配对机制](/docs/manual/session-and-pairing)
- [故障排除与诊断思路](/docs/reference/troubleshooting)
- [安全基础](/docs/operations/safety-basics)
