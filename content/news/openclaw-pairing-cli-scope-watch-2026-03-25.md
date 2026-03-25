---
title: "OpenClaw 的 pairing CLI 正在从单条 approve 命令长成正式入口治理面"
description: "官方最近把 pairing CLI 的 list、clear、--account 和 --notify 等行为写得更完整了，也让聊天入口审批越来越像一套正式的运营控制面。"
category: "生态观察"
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/channels/pairing"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["pairing", "allowFrom", "channels", "account", "operations"]
---

OpenClaw 最近这轮 Pairing 文档，一个很明显的变化是：`openclaw pairing` 已经不再只是“第一次接入时随手 approve 一次”的命令，而是在逐步长成一套正式的聊天入口治理面。

当前官方已经把这组命令补得更完整：

- `list`
- `approve`
- `reject`
- `clear --pending`
- `--account`
- `--notify`

这让 pairing 更像一套持续运营面，而不是一次性授权动作。

## 1. 多账号入口终于有了更清楚的 CLI 心智

随着 `--account` 被官方写清楚，多账号渠道的 pairing 不再适合继续按默认账号来理解。

这对 Telegram 多 bot、WhatsApp 多号码这类场景很重要，因为它意味着：

- pairing pending 队列本身就属于某个具体账号

## 2. pairing 状态和 allowFrom 开始更像两条并行控制面

官方现在也把 account-scoped allowFrom 文件名规则写清楚了。  
这会让运维更容易分清：

- 谁在 pending 队列里等待批准
- 谁已经被显式写入 allowFrom

两者相关，但不再容易被混成一件事。

## 3. 审批动作开始更像真正的运营动作

`--notify` 这类选项的加入，也让 pairing 审批更像一套“是否反馈给对端”的操作面，而不是只能静默改状态。

这说明官方已经在把聊天入口审批当成长期运行时对象，而不是一次性初始化步骤。

## 对中文用户最有价值的提醒

如果你已经在同一渠道上跑多个入口，下一步最值得统一的不是更多 bot 配置，而是：

- pairing 队列按账号看
- allowFrom 按账号管

## 推荐延伸阅读

- [频道 pairing CLI 和 account scope 应该怎么一起看](/docs/reference/channel-pairing-cli-and-account-scope)
- [多账号渠道的 pairing 和 allowFrom 需要分开治理](/best-practices/multi-account-pairing-operations)
- [配对审批与设备授权管理](/docs/reference/pairing-admin)
