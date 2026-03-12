---
title: 网络模型、发现与配对
description: 基于官方网络中心、配对和 Gateway 拥有的配对文档，梳理 localhost、tailnet、发现、身份和审批之间的关系。
category: 运维
updatedAt: 2026-03-12
source: https://docs.openclaw.ai/zh-CN/network
sourceName: OpenClaw Docs
sourceType: official
tags: [network, pairing, identity, tailnet, mdns]
---

# 网络模型、发现与配对

OpenClaw 的网络设计并不是“设备能连上就行”。官方把网络、发现、配对、身份和节点运维拆成一整组文档，说明这套体系本身就是产品能力的一部分。

如果只记一个结论，更适合记这句：

- 发现负责找到彼此
- 传输负责建立连接
- 配对负责决定谁被允许进入

把这三层混在一起，是远程部署最常见的理解偏差。

## Gateway 是网络中心

官方中文网络中心把 Gateway 放在整个系统的中心位置。它不仅是一个 WebSocket 端点，还承担：

- 设备和客户端接入入口
- 节点连接和转发中心
- 配对请求的审批来源
- 身份和认证边界

所以很多“网络问题”本质上其实是 Gateway 的绑定、配对或认证问题。

## 发现、传输、配对分别是什么

### 发现

发现解决的是“设备怎么知道彼此存在”。

官方网络页列出的相关主题包括：

- Bonjour / mDNS
- 局域网发现
- tailnet 场景
- 远程访问入口

发现能成功，只代表双方能找到对方。

### 传输

传输解决的是“找到之后通过什么协议通信”。

在当前体系里，更应该优先围绕 Gateway 的 WebSocket 连接去理解，而不是沿用旧的桥接思路。官方文档也明确把旧版 TCP bridge 视为已弃用或移除的历史路径。

### 配对

配对解决的是“即使连上了，是否允许加入”。

官方把配对定义成显式 owner approval，也就是所有权审批步骤。它至少出现于两类场景：

- DM pairing：谁可以给机器人发私信
- Node pairing：哪些设备或节点可以加入 Gateway 网络

## 本地信任是怎么工作的

官方中文网络页提到一个很关键的机制：本地连接可以自动批准配对，以保持同主机体验流畅。

更准确地说，通常满足这类条件的请求更可能被视为本地：

- loopback
- Gateway 主机自己的 tailnet 地址

而非本地的 tailnet 或局域网客户端，通常仍然需要显式审批。

这点很重要，因为很多人会误以为“都在同一个 tailnet 里”就等于自动信任。官方文档并不是这么定义的。

## 配对码和审批模型要怎么理解

官方 pairing 文档给出了一套很明确的审批模型：

- 未知发送方在 DM policy 为 `pairing` 时，会先收到配对码
- 配对码默认 8 位、1 小时过期
- 每个渠道默认会限制待处理请求数量
- 只有审批通过后，消息才进入真正处理流程

这说明配对不是“确认一下身份”的装饰步骤，而是正式的访问控制。

## Gateway 拥有的节点配对是什么意思

官方还有一篇专门文档讲 Gateway-owned pairing。核心思路是：

- Gateway 才是决定哪些节点被允许加入的唯一信息源
- UI 只是审批或拒绝请求的前端
- 传输层可以转发请求，但不决定成员资格

这对团队环境尤其重要，因为它把“谁有审批权”和“谁只是发起连接”区分开了。

## 为什么配对和传输要分开看

一个非常常见的误区是：

- WebSocket 握手成功
- 页面能打开
- 就以为节点已经被正式纳入系统

但从官方模型看，连接成功不等于成员资格成立。尤其在节点和设备管理上，真正该看的仍然是：

- 有没有待审批请求
- 请求是被谁批准的
- token 是否已经签发或轮换

## CLI 在网络和配对里承担什么角色

官方网络与 pairing 文档一直把 CLI 当正式控制面，而不是“仅供调试”的附属工具。它通常适合做这些事：

- 列出待审批配对请求
- 审批或拒绝 DM pairing
- 轮换或管理设备 token
- 对节点和连接状态做排查

如果你准备做远程多设备运维，CLI 通常会比只盯着 UI 更可靠。

## 更稳的网络理解顺序

建议把 OpenClaw 的网络理解拆成这条路径：

1. 先确定 Gateway 绑定模式
2. 再确认设备如何发现它
3. 再确认连接协议和入口
4. 最后再看配对审批和 token 轮换

如果把顺序倒过来，排障时会一直混淆“连不上”和“没批准”。

## 中文站建议的配对排查顺序

当你遇到“设备明明能看到 Gateway，但就是不好用”时，更建议按下面的顺序排：

1. 确认 Gateway 当前 bind 和访问模式
2. 确认是 localhost、局域网、tailnet 还是公网场景
3. 确认是否属于本地信任范围
4. 检查是否存在待审批 DM / Node pairing 请求
5. 再检查 token、客户端和节点状态

## 下一步推荐

- [远程访问与 Tailscale / SSH](/docs/operations/remote-access)
- [Tailscale Serve / Funnel 怎么选](/docs/operations/tailscale-serve-and-funnel)
- [Session 与配对机制](/docs/manual/session-and-pairing)
- [多 Gateway 与环境隔离](/docs/operations/multiple-gateways)
