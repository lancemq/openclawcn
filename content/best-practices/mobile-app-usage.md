---
title: 移动端使用指南
description: 在 iOS 和 Android 设备上使用 OpenClaw 的完整指南。
category: 入门指南
difficulty: 初级
updatedAt: 2026-03-11
sourceType: third-party
tags: [mobile, ios, android, usage]
---

# 移动端使用指南

本文介绍如何在移动设备上使用 OpenClaw。

## iOS 安装

### App Store

```bash
# 在 App Store 搜索 "OpenClaw"
# 或直接下载
```

### 配对设置

```bash
# 在 Gateway 上获取配对码
openclaw pair generate

# 在 iOS 应用中输入配对码
```

## Android 安装

### Google Play

```bash
# 在 Google Play 搜索 "OpenClaw"
```

### APK 安装

```bash
# 下载 APK
# 设置 > 安全 > 允许未知来源安装
```

## 移动端功能

### 语音输入

```swift
// iOS 语音输入
voiceInput.startListening()

// Android 语音输入
voiceClient.startListening()
```

### 推送通知

```swift
// 启用推送
PushNotification.shared.enable()
```

### 离线支持

```json
{
  "offline": {
    "enabled": true,
    "sync_online": true,
    "cache_messages": true
  }
}
```

## 移动端配置

### 同步设置

```json
{
  "sync": {
    "sessions": true,
    "preferences": true,
    "history": true
  }
}
```

## 下一步

- [多平台客户端](/news/multiplatform-clients)
- [语音功能](/best-practices/voice-usage)
- [核心能力总览](/docs/manual/core-capabilities)
