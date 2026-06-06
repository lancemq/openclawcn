---
title: 平台支持总览
description: OpenClaw 支持的操作系统和部署平台，包括 Gateway、桌面应用和移动节点。
category: manual
updatedAt: 2026-06-06
sourceType: official
source: https://docs.openclaw.ai/platforms
tags: [platforms, macos, ios, android, windows, linux, install]
---

# 平台支持总览

OpenClaw 核心使用 TypeScript 编写。**Node 是推荐运行时**。Bun 不推荐用于 Gateway——已知 WhatsApp 和 Telegram 频道存在问题。

## 操作系统选择

| 平台 | Gateway | 桌面应用 | 移动节点 |
|------|---------|---------|---------|
| macOS | ✅ 原生 | ✅ 菜单栏应用 | ✅ iOS 节点 |
| iOS | — | — | ✅ App |
| Android | — | — | ✅ App |
| Windows | ✅ 原生/WSL2 | ✅ Windows Hub | — |
| Linux | ✅ 原生 | 计划中 | — |

- macOS：[macOS 安装指南](/docs/setup/macos-installation)
- Windows：[Windows 安装指南](/docs/setup/windows-installation)
- Linux：[Linux 安装指南](/docs/setup/linux-installation)

## Gateway 服务安装

```bash
# 推荐方式（向导）
openclaw onboard --install-daemon

# 或直接安装
openclaw gateway install

# 修复/迁移
openclaw doctor
```

服务目标取决于操作系统：

| 操作系统 | 服务类型 |
|---------|---------|
| macOS | LaunchAgent (`ai.openclaw.gateway`) |
| Linux/WSL2 | systemd user service (`openclaw-gateway.service`) |
| Windows | Scheduled Task (`OpenClaw Gateway`) |

## VPS 与云部署

- [国内云部署思路](/docs/setup/china-cloud-deployment)
- [部署方式选择](/docs/setup/deployment-options)
- Docker：`openclaw install docker`
- Fly.io / Hetzner / GCP / Azure 均支持

## 移动节点

iOS 和 Android 节点支持：
- Canvas 画布
- Camera 拍照/短视频
- Voice 语音唤醒
- Location 位置命令

参见：[Nodes 与设备能力](/docs/manual/nodes-and-device-actions)

## 相关文档

- [安装与环境](/docs/setup/installation)
- [Gateway 运维](/docs/operations/gateway-operations)
- [远程访问](/docs/operations/remote-access)
