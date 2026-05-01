---
title: "OpenClaw 的 Feishu 入口正在从聊天机器人走向文档协作流"
description: "官方近期更新的 Feishu 文档，把扫码接入、群控边界和 Drive 评论线程动作都写进了主线，说明 Feishu 已经不只是简单聊天入口。"
category: "生态观察"
date: "2026-04-30"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/channels/feishu"
updatedAt: "2026-04-30"
sourceType: "official"
tags: ["feishu", "lark", "drive", "comments", "channels", "collaboration"]
---

最近官方对 Feishu 这页的更新有一个很明确的信号：

- 飞书入口正在从“能聊天的 bot”走向“能承接协作流的工作入口”

## 1. 扫码接入降低了第一次启用门槛

官方现在把：

```bash
openclaw channels login --channel feishu
```

作为推荐起点，这让 Feishu 接入更像 onboarding surface，而不是只适合会手工配 app 的用户。

## 2. Drive comments 让飞书开始进入文档原位协作

这次最关键的新面不是普通消息，而是：

- `drive.notice.comment_add_v1`

这意味着 OpenClaw 可以把评论、文档上下文和线程关系一起纳入处理流。  
一旦再配合 `feishu_drive.reply_comment`，它就不只是“收到通知再去别处回复”，而是能在评论线程原位完成协作。

## 3. 对中文团队来说，这比新增一个聊天渠道更重要

因为很多中文团队真正高频使用飞书的地方，不只是聊天，而是：

- 文档审阅
- 评论流转
- 协作反馈

官方把这一层写进主线，说明 Feishu 已经越来越像正式工作入口。

## 推荐延伸阅读

- [Feishu 扫码接入、群控边界与 Drive 评论流](/docs/manual/feishu-qr-login-and-drive-comments)
- [OpenClaw 渠道能力概览](/docs/manual/channels-overview)

