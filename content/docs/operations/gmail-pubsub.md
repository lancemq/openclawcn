---
title: Gmail Pub/Sub 接入 OpenClaw
description: 根据最新官方自动化文档，整理 Gmail watch、Google Pub/Sub、Webhook 映射和 Tailscale Funnel 的接入顺序，帮助你把 Gmail 事件稳定送进 OpenClaw。
category: 运维
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/zh-CN/automation/gmail-pubsub
sourceName: OpenClaw Docs
sourceType: official
tags: [gmail, pubsub, webhooks, automation, tailscale]
---

# Gmail Pub/Sub 接入 OpenClaw

如果你想让 OpenClaw 在“新邮件到达”时自动做摘要、提醒或分发，最新官方方案已经不再是简单轮询，而是：

Gmail watch -> Google Pub/Sub -> `gog gmail watch serve` -> OpenClaw hooks

这条链路更实时，也更适合长期运行，但配置点比普通 webhook 多得多。官方文档已经把它整理成一套可操作流程。

## 先理解这条链路在做什么

核心思路可以拆成四段：

1. Gmail 用 watch 机制监控指定邮箱
2. 变更事件通过 Google Pub/Sub 推送出来
3. `gog gmail watch serve` 接住推送并整理事件
4. 它再把结果发送给 OpenClaw 的 `/hooks/gmail`

也就是说，OpenClaw 并不直接和 Gmail push 对接，而是通过 `gog` 这个中间层完成历史拉取、正文裁剪和 hook 投递。

## 前置条件

根据最新官方文档，至少需要：

- 已安装并登录 `gcloud`
- 已安装并授权 `gog` / `gogcli`
- 已在 OpenClaw 启用 hooks
- 已登录 `tailscale`

当前官方支持的公网入口方案仍然优先推荐 Tailscale Funnel。其他隧道方案不是完全不能用，但都属于自行接线、官方不重点兜底的模式。

## hooks 怎么配

Gmail 接入不是单独系统，而是跑在 OpenClaw hooks 之上。

一个最小配置通常类似：

```json
{
  "hooks": {
    "enabled": true,
    "token": "OPENCLAW_HOOK_TOKEN",
    "path": "/hooks",
    "presets": ["gmail"]
  }
}
```

如果你希望邮件摘要直接送到某个聊天界面，而不只是留在系统里，还要加映射：

```json
{
  "hooks": {
    "enabled": true,
    "token": "OPENCLAW_HOOK_TOKEN",
    "presets": ["gmail"],
    "mappings": [
      {
        "match": { "path": "gmail" },
        "action": "agent",
        "wakeMode": "now",
        "name": "Gmail",
        "sessionKey": "hook:gmail:{{messages[0].id}}",
        "messageTemplate": "New email from {{messages[0].from}}",
        "deliver": true,
        "channel": "last"
      }
    ]
  }
}
```

这里最关键的不是模板本身，而是你要提前决定：

- 只触发 agent 处理
- 还是同时把摘要投递到指定渠道
- 还是固定发到某个 `channel + to`

## 官方最推荐的接线方式

现在最稳的入口不是全手工操作，而是官方助手命令：

```bash
openclaw webhooks gmail setup --account you@gmail.com
```

这条命令的价值在于一次性把下面几件事接起来：

- 写入 `hooks.gmail` 相关配置
- 启用 Gmail 预设映射
- 生成 `openclaw webhooks gmail run` 所需配置
- 在 macOS 场景下用 Homebrew 安装依赖

如果你只是想先跑通一条官方支持路径，这条命令优先级明显高于手工一个一个拼配置。

## 为什么官方一直提 Tailscale Funnel

原因不只是“方便”，而是 Gmail Pub/Sub 最终需要一个可访问的 HTTPS 推送入口。

官方目前把推荐方案定成：

- 本地 `gog gmail watch serve` 监听本机
- Tailscale Funnel 暴露稳定 HTTPS 地址
- OpenClaw 接收来自该服务的 hook

文档还特别提醒了一个路径细节：

- 当 `tailscale.mode` 启用时，OpenClaw 会自动把 `hooks.gmail.serve.path` 设成 `/`
- 公网路径保留在 `hooks.gmail.tailscale.path`，默认是 `/gmail-pubsub`

如果你强行改路径，又没同步后端 target，很容易出现“公网请求到了，但后端路径对不上”的问题。

## 一次性 GCP 设置别漏掉什么

官方给出的最低顺序是：

1. 选择正确的 GCP 项目
2. 启用 Gmail API 和 Pub/Sub API
3. 创建 topic
4. 给 Gmail push 服务账号发布权限

示例命令：

```bash
gcloud services enable gmail.googleapis.com pubsub.googleapis.com
gcloud pubsub topics create gog-gmail-watch
gcloud pubsub topics add-iam-policy-binding gog-gmail-watch \
  --member=serviceAccount:gmail-api-push@system.gserviceaccount.com \
  --role=roles/pubsub.publisher
```

官方文档特别强调：Gmail watch 使用的 topic 必须和 `gog` OAuth 客户端在同一个 GCP 项目里。这个项目不对，后面很多报错都只是连锁反应。

## watch 和 run 各负责什么

Gmail 接入里有两个容易混淆的动作：

### 启动 watch

```bash
gog gmail watch start \
  --account you@gmail.com \
  --label INBOX \
  --topic projects/<project-id>/topics/gog-gmail-watch
```

它负责告诉 Gmail “开始监控这个邮箱和标签”。

### 启动推送处理

```bash
openclaw webhooks gmail run
```

或者手工：

```bash
gog gmail watch serve \
  --account you@gmail.com \
  --bind 127.0.0.1 \
  --port 8788 \
  --path /gmail-pubsub \
  --hook-url http://127.0.0.1:18789/hooks/gmail \
  --hook-token OPENCLAW_HOOK_TOKEN
```

它负责把 Pub/Sub 推送整理后送进 OpenClaw。

两者缺一个都不行。

## 最新文档里值得注意的几个新细节

和很多旧教程相比，最近官方文档补了几条很值得直接记住的规则：

- `hooks.gmail.model` 和 `hooks.gmail.thinking` 可以专门给 Gmail runs 单独指定模型/思考等级
- 如果启用了 `agents.defaults.models` 白名单，Gmail 使用的模型也必须被允许
- Gmail hook 默认带外部内容安全边界包装；关闭它属于危险行为
- 当 `hooks.enabled=true` 且设置了 `hooks.gmail.account` 时，Gateway 可以在启动时自动拉起 watcher 并自动续期
- 不要同时运行自动 watcher 和手动 daemon，否则很容易端口冲突

## 常见报错该怎么理解

官方文档列出的几个典型报错都很实用：

- `Invalid topicName`：通常是 GCP 项目不匹配
- `User not authorized`：Pub/Sub topic 缺少 Gmail push 发布权限
- 空消息：Gmail push 只给 `historyId`，需要继续用 `gog gmail history` 取具体内容
- `bind: address already in use`：通常是 watcher 被同时启动了两次

## 中文站建议的落地顺序

如果你要把 Gmail 做成长期自动化入口，更稳的顺序是：

1. 先确认 [Webhooks](/docs/manual/hooks-overview) 和 token 认证已经理解
2. 再跑 `openclaw webhooks gmail setup`
3. 再检查 Tailscale Funnel 和路径是否打通
4. 最后才去调消息模板、投递目标和模型成本

这样能避免“消息已经进来了，但 delivery / model / channel 三层一起错位”的典型问题。
