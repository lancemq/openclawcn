---
title: 节点位置能力怎么用
description: 基于最新官方 Location Command 文档，整理 OpenClaw 的 location.get 能力、权限模式、精确位置开关，以及它和普通聊天入口的边界。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/nodes/location-command
sourceName: OpenClaw Docs
sourceType: official
tags: [location, nodes, mobile, permissions, gps]
---

# 节点位置能力怎么用

官方最近把 `location.get` 单独做成一页，这一点很重要，因为它说明“设备位置”在 OpenClaw 里不是附带数据，而是一条独立的 node 能力线。

更适合记住的边界是：

- 位置能力来自 node
- 默认关闭
- 是否可用主要受设备权限和前台状态影响

## `location.get` 在系统里是什么

根据最新官方文档，`location.get` 是一个通过 `node.invoke` 调用的节点命令。

它不是：

- Gateway 自己推断出来的位置
- 渠道消息里的地理附件解析

而是：

- 真实节点设备暴露的位置能力

这意味着它天然比普通聊天文本更敏感。

## 为什么官方用“选择器”而不是一个开关

官方文档特别强调这点，是因为操作系统的位置权限本来就是分层的。

当前官方说明里最关键的边界是：

- iOS / macOS 可能支持 `While Using` 或更高系统授权
- Android 当前只支持前台使用
- `Precise Location` 还是单独的一层授权

所以应用里能选的，不等于操作系统最终真的给了什么。

## 当前最值得记住的设置模型

根据文档，截至 **2026 年 3 月 21 日**，节点侧最关键的字段可以这样理解：

- `location.enabledMode`: `off | whileUsing`
- `location.preciseEnabled`: `true | false`

这意味着位置能力不是单纯的“开 / 关”，而是至少分成两层：

- 什么时候允许取位置
- 给的是精确位置还是近似位置

## `location.get` 能返回什么

官方当前给的响应结构已经比较完整，常见字段包括：

- `lat`
- `lon`
- `accuracyMeters`
- `timestamp`
- `isPrecise`
- `source`

这说明它不只是“拿一个经纬度”，还会把：

- 精度
- 时间
- 来源类型

一起带回来。

对后续自动化和判断来说，这些元信息往往比坐标本身更重要。

## 参数怎么理解更合适

官方当前建议的调用参数包括：

- `timeoutMs`
- `maxAgeMs`
- `desiredAccuracy`

更实用的理解方式是：

- `timeoutMs`：最多等多久
- `maxAgeMs`：旧数据还能接受多久
- `desiredAccuracy`：你到底要粗略还是更精确

如果你只是想做“我现在大概在哪”，没必要默认追求最精确定位。

## Android 为什么更需要注意前台限制

官方文档写得很直接：

- Android app 在后台时会拒绝 `location.get`

也就是说，如果你在 Android 上做位置相关工作流，更稳的预期应该是：

- OpenClaw 需要处于打开状态
- 不是所有时候都能静默后台取位置

这一点很关键，因为它直接决定你能不能把位置能力接进长期自动化。

## 这些错误码最值得记住

官方文档当前列出的稳定错误码里，最实用的是这几个：

- `LOCATION_DISABLED`
- `LOCATION_PERMISSION_REQUIRED`
- `LOCATION_BACKGROUND_UNAVAILABLE`
- `LOCATION_TIMEOUT`
- `LOCATION_UNAVAILABLE`

对中文站用户来说，这些错误名本身就已经足够帮助你判断问题大概在哪一层：

- 设置没开
- 权限没给
- 后台场景不支持
- 系统当前拿不到定位

## 位置能力更适合什么场景

更适合优先尝试的位置场景通常包括：

- 出门或到站提醒
- 设备在场状态判断
- 和日程、地图或语音工作流联动
- 让 agent 根据地点选择下一步动作

但如果你还没把节点配对、远程访问和授权边界理清，通常不建议一开始就把位置能力放进高频自动化。

## 中文站建议怎么启用

更稳的顺序通常是：

1. 先把 node pairing 跑通
2. 先在一台常用设备上打开位置能力
3. 先用近似位置测试
4. 确认前台/后台边界后，再决定要不要开精确位置

这样会比一开始就默认精确定位和多设备共享更稳。

## 下一步推荐

- [Nodes 与设备能力](/docs/manual/nodes-and-device-actions)
- [语音唤醒与 Talk Mode](/docs/manual/voice-wake-and-talk-mode)
- [移动节点感知能力实战](/best-practices/mobile-node-sensors)

把这几页串起来看，会更容易把“移动设备只是聊天入口”和“移动设备是感知节点”区分开。
