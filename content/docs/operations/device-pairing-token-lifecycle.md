---
title: 设备 pairing、fresh token 和 revoke 应该怎么做日常运维
description: 基于最新官方 Pairing 与 Devices CLI 文档，解释 openclaw devices list、approve、rotate、revoke 和 fresh token 的真实边界，以及为什么设备授权不该被当成一次性静态批准。
category: 运维
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/channels/pairing
sourceName: OpenClaw Docs
sourceType: official
tags: [devices, pairing, token, revoke, operations]
---

# 设备 pairing、fresh token 和 revoke 应该怎么做日常运维

OpenClaw 的设备 pairing 现在已经不只是“第一次连上时点一下 approve”。官方最近把 `devices` 这条 CLI 补得更完整之后，更值得把它理解成：

- 设备身份和 token 的生命周期管理面

这对长期运行环境尤其重要，因为浏览器、手机、桌面客户端和 node 都会留下持续存在的设备授权状态。

## 先记住最常用的命令面

根据当前官方文档，更常见的动作已经包括：

```bash
openclaw devices list
openclaw devices approve <requestId>
openclaw devices reject <requestId>
openclaw devices revoke --device <id> --role <role>
openclaw devices rotate --device <id> --role <role>
```

从这个接口就能看出来，设备授权已经覆盖：

- 新设备接入
- 已批准设备移除
- 设备 token 轮换

## `list` 不只是“看 pending”

当前 `devices list` 的价值，不只是找待批准请求。

它更适合同时回答：

- 当前有哪些 pending
- 哪些设备已经 paired
- 角色分布是否符合预期

这使它更像设备授权总览，而不是一次性审批命令的附属视图。

## `approve` 和 `reject` 在治理上分别意味着什么

它们批准或拒绝的是：

- 某个具体设备实例

不是：

- 某个人永久通过

所以更准确的理解是：

- approve：把这台设备纳入当前 gateway 的已授权设备集合
- reject：明确拒绝当前这次配对请求

一旦你把它理解成“设备实例级授权”，很多浏览器 profile、换机和重装后的行为就更好解释了。

## `revoke` 和 `rotate` 为什么要单独看

这两条命令体现的是官方越来越明确的一个趋势：

- 设备 pairing 不是静态授权

更适合这样理解：

### `revoke`

适合：

- 某台旧设备不再可信
- 某个浏览器 profile 不再使用
- 你怀疑本地状态被复制或借用过

### `rotate`

适合：

- 设备仍然可信，但希望更换凭据
- 周期性安全维护
- 某次 token 外泄后继续保留设备身份

## fresh token 在哪种场景里成立

官方当前文档已经把 fresh token 这一层写得更明确了。

更值得记住的是：

- 批准、重 pair 或 rotate 后，设备凭据并不应该被当成永久不变的静态值

这也是为什么设备 pairing 更像“身份 + token”双层状态，而不是单纯一条是否通过的布尔值。

## 设备状态文件为什么也要当敏感数据看

站内已有文档提到，设备 pairing 状态落在：

- `~/.openclaw/devices/pending.json`
- `~/.openclaw/devices/paired.json`

这些文件不该被当成普通缓存，因为它们本质上记录的是：

- 哪些设备当前被视为可信成员

在共享宿主、多人运维和备份迁移场景里，这层尤其要小心。

## 中文环境里最容易踩的坑

### 1. 批准一次后就再也不看设备面

长期运行里，设备集合会持续变化。

### 2. 只知道 approve，不知道 revoke / rotate

这会让授权面越来越老化，却没有清理动作。

### 3. 把设备 pairing 当成“用户登录”

它更接近设备身份授权，而不是单次会话登录。

## 一条更稳的运维顺序

建议按这个顺序做：

1. 定期 `devices list` 盘点已授权设备
2. 新设备接入时显式 approve / reject
3. 不再使用的设备及时 revoke
4. 高价值设备按周期 rotate

## 下一步推荐

- [Control UI 设备配对与浏览器授权](/docs/reference/control-ui-device-pairing)
- [Gateway-owned pairing 和 device pairing 有什么区别](/docs/reference/gateway-owned-pairing-vs-device-pairing)
- [网络模型、发现与配对](/docs/operations/network-and-pairing)
