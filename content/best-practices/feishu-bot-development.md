---
title: 飞书 Bot 接入与团队使用实战
description: 结合官方 Feishu/Lark 文档，整理中文团队接入飞书 Bot 时最值得先确认的事项：长连接模式、群聊边界、额度优化和多人协作时的收口方式。
category: 渠道实践
difficulty: 中级
updatedAt: 2026-03-23
source: https://docs.openclaw.ai/channels/feishu
sourceName: OpenClaw Docs
sourceType: official
tags: [feishu, lark, bot, channels, enterprise]
---

# 飞书 Bot 接入与团队使用实战

对中文团队来说，飞书通常不是“可选渠道”而是主入口之一。

但真正让飞书接入顺不顺的，往往不是 Bot 能不能发消息，而是下面这些事：

- 你是把它当个人入口，还是团队入口
- 群聊是否需要 @mention
- 谁可以私聊机器人
- 后续额度和管理面怎么收口

## 第一原则：先用官方长连接模式，不要一上来就折腾公网 webhook

官方当前文档已经把飞书的推荐路径写得很清楚：

- 优先走 onboarding 或 `openclaw channels add`
- 事件订阅优先走长连接 WebSocket

这对中文团队很重要，因为它意味着：

- 不需要先暴露公网 webhook
- 本地或云上都更容易先跑通
- 飞书入口可以更快和 Gateway 本体问题拆开

如果你只是想先验证飞书是否能稳定收发消息，这条路通常最省心。

## 第二原则：DM 和群聊要分开设计

飞书入口最常见的误区，是把“Bot 能回复”直接当成“团队已经可以用了”。

更稳的做法通常是分成两层：

### 私聊层

更适合：

- 核心维护者
- 测试阶段用户
- 需要独立 session 的个人使用

官方默认的 `dmPolicy: "pairing"` 就是在帮你先收这层边界。

### 群聊层

更适合：

- 团队提醒
- 值班协作
- 轻量问答

但群聊一定要尽早决定：

- 是否默认要求 @mention
- 是否允许所有群
- 是否只允许指定 chat_id
- 是否要限制群内 sender allowlist

## 第三原则：群聊不要过早放开

飞书一旦进入团队群，最大的风险通常不是技术失败，而是：

- 机器人太吵
- 谁都能触发
- 成本难以控制
- 上下文越来越乱

更稳的顺序通常是：

1. 先只开私聊
2. 再开一个小范围测试群
3. 默认保留 `requireMention`
4. 需要时再按群逐个放开

这比一开始就让所有群都能直接触发稳很多。

## 第四原则：把额度优化开关当成长期设置的一部分

官方 Feishu 文档里有两个很实用、但很容易被忽略的开关：

- `typingIndicator`
- `resolveSenderNames`

它们的作用都和 API 调用次数有关。

如果你的目标是：

- 机器人长期在线
- 群聊较多
- 团队成员比较多

那这两个开关就值得尽早评估，而不是等额度或稳定性出问题后再回头看。

## 第五原则：国际租户和国内租户要一开始就分清

飞书和 Lark 在团队里经常被混着说，但官方配置上已经区分得很清楚。

如果你使用的是国际租户，需要显式设置：

```json
{
  "channels": {
    "feishu": {
      "domain": "lark"
    }
  }
}
```

这类问题很适合在最开始就确认，否则后面容易把“凭据问题”“事件问题”和“域名问题”混在一起。

## 第六原则：多人团队要尽早决定谁能进管理面，谁只用飞书

一旦飞书入口开始进入真实使用，团队很快就会出现两类角色：

- 需要看 Gateway / Dashboard / 配对和日志的人
- 只需要在飞书里使用的人

不要让所有人都为了飞书入口顺手拿到更高权限管理面。

更稳的方式通常是：

- 维护者进入 Dashboard / CLI
- 普通成员主要留在飞书入口
- 群聊和私聊分别定义可用范围

## 一条更适合中文团队的飞书接入顺序

1. 先用向导或 `openclaw channels add` 跑通
2. 先完成私聊 pairing
3. 再开一个测试群并保留 @mention
4. 再决定是否开放更多群或更多成员
5. 最后再补额度优化、多账号或多 Agent 路由

## 什么时候飞书最适合作为主入口

更适合的场景通常是：

- 团队本来就在飞书上协作
- 需要把 AI 助手放进值班、通知或内部问答流
- 不希望成员额外下载别的聊天工具

如果你只是想先验证一个远程入口，WebChat 或 Telegram 往往更轻。

## 下一步推荐

- [国内云部署思路](/docs/setup/china-cloud-deployment)
- [我什么时候该开始接入渠道](/docs/getting-started/when-to-connect-channels)
- [Dashboard、WebChat 和聊天渠道分别什么时候用](/docs/getting-started/when-to-use-dashboard-webchat-or-channels)
- [团队里如何管理 Gateway、Operator 与浏览器控制面](/best-practices/team-gateway-operator-playbook)
