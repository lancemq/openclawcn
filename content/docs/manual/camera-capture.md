---
title: Camera Capture 与拍照/短视频能力
description: 理解 OpenClaw 的 camera capture 如何通过 nodes 暴露给 agent，以及设备权限和用户设置为什么比命令本身更重要。
category: 功能
updatedAt: 2026-03-11
source: https://docs.openclaw.ai/nodes/camera
sourceName: OpenClaw Docs
sourceType: official
tags: [camera, nodes, mobile, macos, agent]
---

# Camera Capture 与拍照/短视频能力

OpenClaw 之所以和普通聊天型 agent 不一样，一个重要原因就是它可以通过 nodes 调动真实设备能力。`camera capture` 是其中最直观、也最容易被期待过高的一项：它确实能让 agent 通过 node 拍照、录制短视频，但前提是权限、平台和设置都清楚。

## Camera capture 在系统里是什么

官方当前的设计是：

- iOS node 可以拍照 / 录短视频
- Android node 可以拍照 / 录短视频
- macOS app node 也可以

这些都不是 Gateway 直接控制摄像头，而是通过 `node.invoke` 调用节点设备能力。

所以它的正确理解应该是：

- Gateway 负责编排
- Node 负责实际访问摄像头
- 用户设置决定是否允许

## 为什么这不是“默认永远可用”的能力

官方文档一开始就强调：所有 camera access 都受用户设置控制。

这意味着：

- 不是连上 node 就一定能拍
- 不是所有平台权限都相同
- 不是后台场景都能稳定录制

对中文用户来说，最重要的心理预期是：这是一项受平台和权限强约束的能力，不是无限制远程摄像头。

## Camera capture 能做什么

根据官方文档，核心能力包括：

- `camera.list`
- `camera.snap`
- `camera.video`

也就是：

- 列出可用相机
- 拍一张图
- 录一段短视频

这足够覆盖很多 agent 工作流里的“取证”“现场感知”“快速确认”场景。

## 更适合什么场景

### 1. 现场确认

例如让移动设备拍一张当前画面，供 agent 做判断。

### 2. 短视频片段采集

当静态图片不够时，用短视频补充上下文。

### 3. 和其他 node 能力联动

例如：

- 语音唤醒后触发拍照
- 远程节点接入后做现场确认

这时它才真正体现出“设备化代理”的价值。

## 为什么用户设置比命令更重要

很多人看到 `camera.snap` 会先想着怎么调用，但真正决定能不能稳用的是：

- 设备设置是否允许 camera
- 系统权限是否授予
- 当前 app / node 是否在合适状态

如果这三层没过，再熟悉命令也没有意义。

## Camera capture 的安全含义

它和普通文本消息完全不是一个敏感级别。

因为一旦开放：

- agent 可以请求真实世界图像
- 可能涉及隐私空间
- 还会和远程访问、node pairing 叠加

所以更合理的策略是：

- 默认按需开启
- 只给信任 node 开启
- 明确哪些设备允许摄像头能力

## 常见误区

### 1. 以为它是 Gateway 自己的原生能力

不是。它依赖 node 设备。

### 2. 以为拍照功能等于“远程监控”

官方当前设计仍然是以用户设置和设备权限为前提，不是无边界监控模型。

### 3. 一上来就想做复杂多设备相机调度

更稳的顺序是先让单设备、单动作跑通。

## 更适合的启用顺序

1. 先把 node pairing 跑通
2. 只选一台最常用设备
3. 先测试 `camera.list`
4. 再测试单次拍照
5. 最后再考虑短视频或和语音联动

## 下一步推荐

- 想理解 node 整体能力：看 [Nodes 与设备能力](/docs/manual/nodes-and-device-actions)
- 想结合语音入口：看 [语音唤醒与 Talk Mode](/docs/manual/voice-wake-and-talk-mode)
- 想理解授权边界：看 [配对审批与设备授权管理](/docs/reference/pairing-admin)
