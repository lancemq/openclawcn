---
title: Feishu 扫码接入、群控边界与 Drive 评论流
description: 基于最新官方 Feishu 文档，整理 OpenClaw 2026.4.10 之后的飞书扫码接入、群聊控制、Drive 评论事件和 reply_comment 工作流。
category: 功能
updatedAt: 2026-04-30
source: https://docs.openclaw.ai/channels/feishu
sourceName: OpenClaw Docs
sourceType: official
tags: [feishu, lark, channels, drive, comments, collaboration]
---

# Feishu 扫码接入、群控边界与 Drive 评论流

最近官方把 Feishu 文档明显往“正式协作入口”推进了一步。  
最大的两个变化是：

- 2026.4.10 起支持 `openclaw channels login --channel feishu` 的扫码接入路径
- Feishu Drive 评论流已经被正式纳入运行时 action surface

这意味着飞书不再只是一个普通聊天渠道，而更像企业协作入口。

## 新接入方式为什么值得重视

当前官方文档给出的推荐起点已经变成：

```bash
openclaw channels login --channel feishu
openclaw gateway restart
```

这和以前主要围绕 app 凭据、手工填配置的心智不太一样。  
它表达的是：

- 飞书接入正在越来越像正式 onboarding surface

对中文用户来说，这个变化很重要，因为它明显降低了第一次把飞书接进来的阻力。

## 什么时候该用扫码路径

如果你现在的目标是：

- 先跑通一个飞书入口
- 让团队尽快进入试用
- 避免第一次就陷进太多手工凭据配置

那扫码路径更适合。

如果你是非常强调自定义 app、事件订阅和更细权限控制的团队，后面仍然要回到更完整的 app 配置和运维治理上。

## 飞书在 OpenClaw 里已经不只是 DM bot

官方当前文档把支持面写得很清楚：

- 私聊
- 群聊
- inline reply
- topic thread reply
- 图片 / 文件 / 音频 / 视频
- interactive cards

这意味着飞书已经不是“能收发文本”的实验插件，而是足以承担正式协作入口的渠道。

## 最该先看的不是“能不能接”，而是谁能说话

在中文团队场景里，飞书最容易出的问题通常不是接不通，而是权限边界没有先收住。

官方当前明确给出了几层控制面：

- `dmPolicy`
- `allowFrom`
- `groupPolicy`
- `groupAllowFrom`
- `requireMention`

更稳的上线顺序通常是：

1. 先把 DM 和群聊边界分开
2. 群里默认保留 mention gating
3. 只对白名单组逐步放开

## Drive 评论流为什么是这轮最值得注意的新能力

官方现在明确支持：

- `drive.notice.comment_add_v1`

当有人在 Feishu Docs / Sheets 这类 Drive 文档上加评论时，OpenClaw 可以接收到：

- 评论文本
- 发送人
- 文档标题 / 类型 / URL
- 评论线程上下文

这件事的价值不在“多了一个事件”，而在：

- OpenClaw 已经开始进入文档协作流

也就是说，飞书入口不再只是聊天消息，而是评论驱动的文档工作流。

## `feishu_drive` 现在能做什么

官方列出的 comment actions 包括：

- `list_comments`
- `list_comment_replies`
- `add_comment`
- `reply_comment`

如果你的团队想做：

- 评论驱动协作
- 文档审阅回流
- 表格 / 文档内的 agent 辅助回复

这套 action surface 就很值得单独看。

## 为什么 `reply_comment` 很关键

官方当前特别强调：

- 处理完 Drive comment 之后，应该优先用 `feishu_drive.reply_comment` 回到原线程

而不是简单发一条普通聊天回复。

这说明 Feishu Drive 这条链路的真正价值是：

- 保持协作发生在评论线程原位

而不是把上下文打散到别的聊天面里。

## `NO_REPLY` 的静默令牌不要忽略

官方当前还明确要求，在某些 Drive comment 处理流里：

- 完成 `reply_comment` 后输出精确的 `NO_REPLY` / `no_reply`

这不是小细节，而是为了避免：

- 评论线程里已经回了
- 聊天面又重复发一份

如果你后面要做飞书文档协作自动化，这个约束最好直接记住。

## 中文团队最适合怎么落地

更稳的顺序通常是：

1. 先用扫码路径跑通 Feishu bot
2. 先控制 DM 和群聊入口边界
3. 再决定是否开放 Drive 工具
4. 最后才进入评论驱动工作流

不要第一天就同时打开：

- 群聊放开
- Drive comment 触发
- 高权限文档动作

这样会让定位问题非常困难。

## 最容易踩的坑

### 1. 只看聊天消息，不看评论线程边界

Drive comments 的上下文和普通聊天入口不是同一件事。

### 2. 一接通就把群聊开放得太宽

中文团队最容易被群噪音拖垮。

### 3. 忘了在文档协作流里使用 `reply_comment`

这样会让真正需要被通知的人看不到原位回复。

## 下一步推荐

- [OpenClaw 渠道能力概览](/docs/manual/channels-overview)
- [我什么时候该开始接入渠道](/docs/getting-started/when-to-connect-channels)
- [用 Webhooks 接外部系统](/docs/manual/webhooks-external-triggers)

