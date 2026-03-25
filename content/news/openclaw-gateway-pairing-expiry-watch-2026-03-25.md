---
title: "OpenClaw 正在把 gateway-owned pairing 的过期与轮换边界说清楚"
description: "官方最新 Gateway-owned pairing 文档把 pending request 的 5 分钟过期、fresh token 生成和 UI 只是审批前端这几层边界写得更清楚了。"
category: "生态观察"
date: "2026-03-25"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/gateway/pairing"
updatedAt: "2026-03-25"
sourceType: "official"
tags: ["gateway", "pairing", "pending", "token", "nodes"]
---

OpenClaw 最近这轮 Gateway-owned pairing 文档，一个很清楚的变化是：这条旧式 pairing 线的过期、轮换和前后端边界都被写得更具体了。

当前官方文档已经明确几件事：

- pending request 约 5 分钟过期
- UI 只是 approve / reject 的前端
- pairing 通过后会生成 fresh token

这会让很多以前模糊的“明明配对过了为什么又不行”更容易解释。

## 1. pending request 不再适合被当成长期挂起状态

5 分钟左右的过期窗口，意味着 gateway-owned pairing 的 pending 更接近：

- 短时等待批准对象

而不是：

- 可以一直挂着慢慢处理的长期队列

这会直接影响管理员处理 pending 的节奏。

## 2. UI 被明确限定为前端，不是 source of truth

官方现在更明确地写出：

- membership 的 source of truth 在 gateway pairing store

这让这条 pairing 线更像：

- 网关侧状态机
- UI 只是批准入口

## 3. fresh token 进一步强调 pairing 不是静态授权

pairing 通过后生成 fresh token，这条写法也再次强化了一个趋势：

- 配对动作本身会改变凭据状态

也就是说，gateway-owned pairing 更不适合被理解成“点一次批准，以后就永远稳定不变”。

## 对中文用户最有价值的提醒

如果你明确还在使用 `node.pair.*` 这条线，下一步最值得补的已经不是更多 UI 操作，而是：

- pending 过期窗口
- token 轮换心智
- UI 与 pairing store 的边界

## 推荐延伸阅读

- [Gateway-owned pairing 和 device pairing 有什么区别](/docs/reference/gateway-owned-pairing-vs-device-pairing)
- [设备 pairing、fresh token 和 revoke 应该怎么做日常运维](/docs/operations/device-pairing-token-lifecycle)
- [网络模型、发现与配对](/docs/operations/network-and-pairing)
