---
title: 配对审批与设备授权管理
description: 从管理员视角理解 OpenClaw 的 DM pairing、设备 pairing、allowFrom 文件和审批命令，避免把授权边界搞乱。
category: 参考
updatedAt: 2026-03-11
source: https://docs.openclaw.ai/channels/pairing
sourceName: OpenClaw Docs
sourceType: official
tags: [pairing, devices, allowFrom, credentials, admin]
---

# 配对审批与设备授权管理

OpenClaw 的 pairing 并不是一个小功能，而是整个安全模型里最关键的显式授权步骤。官方现在把 pairing 文档写得很细，是因为它实际上涉及两条完全不同的授权线：

1. 谁可以给 bot 发消息
2. 哪些设备可以作为 node 加入 Gateway

如果把这两条混在一起理解，后面几乎一定会出问题。

## Pairing 到底保护什么

Pairing 的核心不是“麻烦一点更安全”，而是把授权从“隐式接受”变成“显式批准”。

这在 OpenClaw 里非常重要，因为一旦接入：

- 渠道消息
- 设备节点
- 远程访问

你的系统就不再是本地单机实验，而是一个真实有边界的入口系统。

## 两类 pairing

### 1. DM pairing

用来决定：

- 哪些发送者可以和 bot 对话
- 哪些陌生人先拿 pairing code，再等待批准

### 2. Node device pairing

用来决定：

- 哪台 iOS / Android / macOS / headless node 可以加入 Gateway

它们不是一回事，也不应该共用一套操作心智。

## DM pairing 怎么工作

官方当前的行为是：

- 未知发送者先收到一个短 code
- 该 code 通常 1 小时失效
- 只有批准后，对方消息才会真正进入处理流程

典型命令是：

```bash
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

这类命令的意义，是在“聊天入口”层做显式授权。

## Device pairing 怎么工作

节点这边则是另一套审批面：

```bash
openclaw devices list
openclaw devices approve <requestId>
openclaw devices reject <requestId>
```

这里审批的是设备，而不是聊天发送者。

一台设备一旦通过 pairing，它能带来的能力通常比一个普通 DM sender 大得多，因为它可能暴露：

- 相机
- 语音
- 位置
- 其他 node actions

## State 存在哪里

官方文档给得很明确：

- 渠道 pairing 和 allowFrom 状态：`~/.openclaw/credentials/`
- 设备 pairing 状态：`~/.openclaw/devices/`

这两组文件都应该被当作敏感状态数据，而不是普通缓存。

## 为什么 allowFrom 和 pairing 要一起理解

很多人会把两者对立起来，其实它们更像两种授权路径：

- `allowFrom`：你预先明确知道谁可以进来
- `pairing`：未知来源先拿 code，再人工批准

更稳的实践通常是：

- 核心协作者直接进 allowFrom
- 其他人走 pairing

这样既不会过度开放，也不会每次都手工维护所有账号。

## Pairing code 的设计意义

官方文档特别提到：

- code 为 8 位
- 全大写
- 避开易混字符
- 1 小时失效

这不是细枝末节，而是在平衡：

- 易于人工传递
- 不至于太弱
- 不会长期有效

## Node pairing 为什么更值得谨慎

因为一个被批准的 node，通常比一个被批准的 DM sender 拥有更高能力密度。

如果你不清楚设备来源和权限边界，就不该轻易批准。

## 最常见的管理员误区

### 1. 把 devices approve 当作“随手点一下”

这实际上是在批准一个新的硬件/软件节点加入系统。

### 2. 不清楚 pairing state 存哪

一旦状态文件管理混乱，排错会非常困难。

### 3. 所有渠道都改成 open

短期看省事，长期几乎一定带来成本和风险问题。

## 更适合的管理习惯

1. 核心账号走 allowFrom
2. 其他人走 pairing
3. 设备 pairing 单独审查
4. 定期检查 credentials 和 devices 目录中的状态是否仍然有效
5. 不再使用的入口及时移除

## 下一步推荐

- 想看会话边界：看 [Session 与配对机制](/docs/manual/session-and-pairing)
- 想看节点能力：看 [Nodes 与设备能力](/docs/manual/nodes-and-device-actions)
- 想看安全模型：看 [OpenClaw 安全配置基础](/docs/operations/safety-basics)
