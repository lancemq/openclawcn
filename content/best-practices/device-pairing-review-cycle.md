---
title: 设备配对不是一次性批准，应该有定期复核周期
description: 结合最新官方 Devices CLI 与 Pairing 文档，整理浏览器、桌面设备、移动节点和远程 operator 环境里的设备复核节奏，避免已授权设备集合长期失控。
category: 安全治理
difficulty: 中级
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/channels/pairing
sourceName: OpenClaw Docs
sourceType: official
tags: [devices, pairing, review, revoke, rotate]
---

# 设备配对不是一次性批准，应该有定期复核周期

很多团队对设备 pairing 的默认心智是：

- 首次接入时批准一下

但从官方最近补强的 `devices` CLI 看，更稳的长期做法应该是：

- 设备授权要有持续复核周期

因为只要浏览器、桌面客户端、手机节点和远程 operator 在变化，已授权设备集合就一定会变化。

## 1. 先把设备分层

更适合先分成三类：

- 稳定主管理设备
- 临时远程设备
- 节点类设备

这三类的复核频率不该一样。

## 2. 主管理设备做低频复核

像固定办公电脑、主浏览器 profile 这类设备，更适合：

- 低频盘点
- 异常时及时 rotate

它们通常长期可信，但不能永远不查。

## 3. 临时远程设备做高频清理

像借用电脑、短期浏览器 profile、一次性远程 operator 设备，更适合：

- 使用后尽快 revoke

这类设备最大的风险不是被误批，而是：

- 用完之后长期留在已授权列表里

## 4. 节点类设备要额外看角色和能力面

手机 node、桌面 node、headless node 和普通浏览器的风险面并不一样。

所以节点类设备更适合：

- 结合角色和能力面一起复核

也就是说，不只是看“是不是我的设备”，还要看：

- 它现在还能做什么

## 5. rotate 应该成为日常动作之一

如果设备继续保留，但凭据已经变旧，或者经历过迁移、重装、共享环境使用，更适合：

- 不撤设备身份，先 rotate token

这样通常比“全删了重来”更平衡。

## 一条更稳的复核顺序

建议按这个顺序做：

1. 周期性 `devices list`
2. 临时设备先清
3. 高能力节点单独复核
4. 长期保留设备按周期 rotate

## 下一步推荐

- [设备 pairing、fresh token 和 revoke 应该怎么做日常运维](/docs/operations/device-pairing-token-lifecycle)
- [Control UI 设备配对与浏览器授权](/docs/reference/control-ui-device-pairing)
- [管理员常用 CLI 值班手册](/best-practices/admin-cli-playbook)
