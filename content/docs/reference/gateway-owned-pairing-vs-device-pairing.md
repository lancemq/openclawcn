---
title: Gateway-owned pairing 和 device pairing 有什么区别
description: 基于最新官方 Pairing 与 Gateway-owned pairing 文档，解释 node.pair.* 这套旧式网关配对和当前 WS device pairing 的真实边界，避免把两套授权机制混成一套。
category: 参考
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/gateway/pairing
sourceName: OpenClaw Docs
sourceType: official
tags: [pairing, devices, gateway, nodes, reference]
---

# Gateway-owned pairing 和 device pairing 有什么区别

OpenClaw 的 pairing 文档现在已经很清楚，但团队里还是很容易把两套机制混在一起：

- `openclaw devices ...`
- `openclaw nodes pending/approve`

它们都像“节点配对”，但官方最近其实把边界写得更明确了。

## 先记住最重要的一句

对于当前 WebSocket nodes 来说，真正决定能不能接入的是：

- device pairing

而 `node.pair.*` 这套 Gateway-owned pairing，是另一套单独的 pairing store，不负责 WS 握手放行。

这条边界如果没记住，排障时很容易一直在错的地方找问题。

## device pairing 在控制什么

根据当前官方 Pairing 文档：

- 节点以 `role: node` 连接 Gateway
- Gateway 会生成 device pairing request
- 需要通过 `openclaw devices approve <requestId>` 批准

这套流程控制的是：

- 这台设备能不能作为 node 加入当前 Gateway 网络

它对应的状态文件也在独立位置：

- `~/.openclaw/devices/pending.json`
- `~/.openclaw/devices/paired.json`

## Gateway-owned pairing 又在控制什么

官方 Gateway-owned pairing 文档说得很直接：

- Gateway 是 membership 的 source of truth
- UI 只是批准或拒绝 pending request 的前端

但它同时也特别强调了一条边界：

- 只有显式调用 `node.pair.*` 的客户端才用这套流程

所以它不是“当前所有 node 都必须经过的底层总开关”。

## 为什么这两套会被混淆

因为它们表面上都像：

- 节点发起加入
- 网关侧看到 pending
- 管理员做 approve / reject

但它们控制的对象并不完全一样。

更稳的理解方式是：

- device pairing：当前主线 node 接入控制
- Gateway-owned pairing：特定客户端或旧式 pairing API 的独立成员存储

## 当前 WS node 真正该看哪条线

如果你现在在排：

- iOS / Android 节点接不进来
- macOS menubar app 作为 node 接不进来
- 浏览器提示设备未授权

那首先该看的不是 `node.pair.*`，而是：

- `openclaw devices list`
- `openclaw devices approve <requestId>`
- `~/.openclaw/devices/`

因为这才是当前 WS node 接入真正走的门。

## `node.pair.*` 更适合什么时候看

只有当你明确在使用官方文档里那条 Gateway-owned pairing 方案，或者某个客户端显式走 `node.pair.*` API 时，这条线才是你真正要排的对象。

否则你很可能会遇到这种错觉：

- 明明“approve 过了”
- 但节点还是连不上

本质上不是 pairing 失效，而是你批准的是另一套 store。

## token rotation 为什么值得注意

Gateway-owned pairing 文档里还提到一个容易被忽略的点：

- 重新 pair 时 token 会旋转

这意味着如果你真在用这套机制，就不应该把历史 token 当成长期稳定凭据。

中文站里更值得记住的是：

- pairing 不是一次静态授权
- 它本身也会改变设备凭据状态

## 团队里最容易踩的坑

### 1. 把 `nodes approve` 当成所有 node 问题的通用解法

现在不够准确。当前主线 WS node 更应该优先看 `devices`。

### 2. 以为 UI 里看到 pending 就代表和 CLI 是同一套后端

官方已经明确说明，不同 pairing 机制背后可以是不同 store。

### 3. 把 device pairing 和聊天入口 pairing 混成一套

DM pairing 管的是谁能给 bot 发消息；node/device pairing 管的是哪台设备能接入 Gateway。

## 一条更稳的排障顺序

建议按这个顺序看：

1. 先确认当前客户端到底走的是 WS device pairing，还是 `node.pair.*`
2. 如果是 WS node，优先看 `openclaw devices list`
3. 再看 `~/.openclaw/devices/` 是否有 pending / paired 状态
4. 只有明确用到 Gateway-owned pairing 时，再看 `node.pair.*`

## 下一步推荐

- [配对审批与设备授权管理](/docs/reference/pairing-admin)
- [Control UI 设备配对与浏览器授权](/docs/reference/control-ui-device-pairing)
- [Remote Operators 与多设备协作](/docs/operations/remote-operators-and-nodes)
