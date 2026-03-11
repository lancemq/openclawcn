---
title: "OpenClaw Tailscale 远程访问完全指南"
description: "了解如何使用 Tailscale 安全远程访问 OpenClaw，包括 Serve、Funnel 和身份认证。"
category: 功能介绍
date: "2026-03-09"
author: "OpenClaw Team"
source: "openclaw.ai"
updatedAt: "2026-03-11"
sourceType: official
tags: ["tailscale", "remote", "vpn", "security"]
---

OpenClaw 原生支持 Tailscale 远程访问，提供安全的远程连接方案。

## Tailscale 模式

### 1. Tailscale Serve

推荐的安全远程访问方式：

```bash
# 启用 Tailscale Serve
openclaw remote serve --tailscale

# 访问地址
# https://openclaw.tail-scale.ts.net
```

特点：
- Gateway 保持本地运行
- 通过 HTTPS 安全暴露 dashboard
- 适合大多数远程场景

### 2. Tailscale Funnel

公网暴露模式：

```bash
# 启用 Funnel
openclaw remote funnel --password=your_password
```

特点：
- 公网可访问
- 需要额外认证
- 适合特殊需求

### 3. Tailscale 身份认证

利用 Tailscale 身份头做认证：

```json
{
  "gateway": {
    "auth": {
      "allowTailscale": true
    }
  }
}
```

## 安全配置

### 推荐配置

```json
{
  "gateway": {
    "bind": "127.0.0.1",
    "auth": {
      "mode": "password",
      "allowTailscale": true
    }
  }
}
```

## 优势

- 无需公网 IP
- 端到端加密
- 简单配置
- 稳定连接

---

*了解更多，请访问 [docs.openclaw.ai](https://docs.openclaw.ai)。*
