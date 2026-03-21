---
title: 用 Webhooks 接外部系统
description: 基于最新官方 Webhooks 文档，整理 OpenClaw 如何通过 /hooks 接收外部事件，重点解释 wake、agent、映射、投递和安全边界。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/automation/webhook
sourceName: OpenClaw Docs
sourceType: official
tags: [webhooks, hooks, automation, integrations, security]
---

# 用 Webhooks 接外部系统

Hooks 更像 Gateway 内部事件扩展，Webhooks 则是把外部系统的事件送进 OpenClaw。

最新官方文档已经把这一层做得很明确：当 `hooks.enabled=true` 时，Gateway 会在同一个 HTTP 服务上暴露一小组 `/hooks/*` 端点，外部系统可以通过共享 token 触发 agent、heartbeat 或指定映射。

## 最小启用方式

一个最基本的配置如下：

```json
{
  "hooks": {
    "enabled": true,
    "token": "shared-secret",
    "path": "/hooks",
    "allowedAgentIds": ["hooks", "main"]
  }
}
```

这里最重要的是三点：

- `hooks.token` 是必填
- `hooks.path` 默认是 `/hooks`
- 如果你允许外部请求指定 `agentId`，最好显式限制在少量 agent 上

## 认证怎么做才对

官方现在已经把认证边界写得很明确：

- 推荐 `Authorization: Bearer <token>`
- 也支持 `x-openclaw-token: <token>`
- query string 形式的 `?token=...` 会被直接拒绝

这意味着如果你在 Nginx、Cloudflare Workers 或内网服务里转发请求，不要再把 token 放在 URL 上。

## `/hooks/wake` 适合什么

`POST /hooks/wake` 更像“投递一个外部事件，让系统决定怎么处理”。

常见 payload 类似：

```json
{
  "text": "New ticket received",
  "wakeMode": "now",
  "deliver": true,
  "channel": "last"
}
```

官方文档里它的语义很清楚：

- 运行一个独立 agent turn
- 总会把摘要回贴到主会话
- 如果 `wakeMode=now`，会立即触发一次 heartbeat

所以它很适合：

- 新邮件
- 新工单
- 外部审批完成
- 某个后台任务结束

## 什么时候该用映射而不是裸 `/wake`

如果你的来源已经固定，比如 Gmail、GitHub、表单平台或企业内部系统，通常更适合写 `hooks.mappings`，而不是让每个外部系统都自己拼 prompt。

映射能控制：

- `match`
- `action`
- `name`
- `messageTemplate`
- `deliver`
- `channel` / `to`
- `agentId`
- `sessionKey`
- `transform.module`

这比把业务逻辑散落在多个外部系统里更稳，也更方便日后统一改动。

## `agentId`、`sessionKey` 为什么是风险点

最新官方文档特别强调了两个高风险入口：

- `agentId`
- `sessionKey`

默认情况下，外部请求并不应该随意指定 session。只有在你显式打开 `hooks.allowRequestSessionKey=true` 时，payload 才能传 `sessionKey`。

即便你真的需要开放，也最好再加：

- `hooks.allowedAgentIds`
- `hooks.allowedSessionKeyPrefixes`

例如只允许 `hook:` 前缀的会话 key。

否则外部调用方就可能把消息硬塞进不该碰的会话上下文。

## `deliver`、`channel`、`to` 怎么理解

这几个字段决定的不是“要不要处理”，而是“处理完要不要把结果送到聊天面”。

官方文档里的默认逻辑大致是：

- `deliver=true` 才会往聊天界面发
- `channel` 默认是 `last`
- 没指定 `to` 时，会优先使用主会话里的最后收件人

如果你在做企业内部接线，最好不要完全依赖 `last`，而是把目标渠道和收件人写死或通过映射计算出来。否则很容易把结果送错地方。

## 自定义 transform 适合什么

当固定模板已经不够用时，官方支持通过：

- `hooks.transformsDir`
- `transform.module`

加载 JS/TS 逻辑做自定义路由或 payload 处理。

最新文档里还补了两条安全边界：

- `hooks.transformsDir` 必须在有效 transforms 根目录内
- `transform.module` 也必须落在允许目录下，逃逸路径会被拒绝

这意味着即便你开放了变换逻辑，Gateway 也不会允许 transform 随意越界读取系统其他位置。

## 最值得记住的安全建议

官方安全建议里，下面几条最应该直接照做：

- Hook 入口尽量放在 loopback、tailnet 或可信反代后
- 单独使用 hook token，不要复用 Gateway 登录 token
- 默认保留 `hooks.allowRequestSessionKey=false`
- 如果允许多 agent 路由，显式限制 `hooks.allowedAgentIds`
- 把原始 payload 视为不可信内容

另外，官方默认会给外部 payload 包安全边界包装。只有极少数可信内部来源，才应该考虑 `allowUnsafeExternalContent: true`。

## 中文站建议的接法

如果你是第一次把外部系统接进 OpenClaw，推荐顺序是：

1. 先配最小 `hooks.enabled + token`
2. 用 `/hooks/wake` 跑通第一条事件
3. 再把固定来源改成 `hooks.mappings`
4. 最后才加 transform、agent 路由和会话控制

这样最容易定位问题，也不会一开始就把安全面打开太大。

## 下一步推荐

- [Hooks 能做什么](/docs/manual/hooks-overview)
- [Gmail Pub/Sub 接入 OpenClaw](/docs/operations/gmail-pubsub)
- [用 Heartbeat 和 Cron 做低噪音自动化](/best-practices/heartbeat-cron-composition)
