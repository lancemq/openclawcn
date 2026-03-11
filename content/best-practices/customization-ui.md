---
title: 界面定制与主题
description: 定制 OpenClaw Control UI 的界面和主题。
category: 定制开发
difficulty: 初级
updatedAt: 2026-03-11
sourceType: third-party
tags: [ui, customization, themes, control-ui]
---

# 界面定制与主题

本文介绍如何定制 OpenClaw 的用户界面。

## 主题配置

### 颜色主题

```json
{
  "ui": {
    "theme": {
      "mode": "dark",
      "primary": "#5865F2",
      "secondary": "#99AAB5",
      "background": "#2C2F33",
      "surface": "#23272A",
      "text": "#FFFFFF",
      "error": "#ED4245",
      "success": "#57F287"
    }
  }
}
```

### 自定义 CSS

```css
/* custom.css */
.openclaw-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.message-bubble {
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## 布局定制

### 侧边栏

```json
{
  "ui": {
    "sidebar": {
      "visible": true,
      "width": 280,
      "collapsible": true,
      "sections": [
        {"id": "chats", "label": "对话"},
        {"id": "channels", "label": "渠道"},
        {"id": "settings", "label": "设置"}
      ]
    }
  }
}
```

### 消息列表

```json
{
  "ui": {
    "messages": {
      "show_timestamps": true,
      "show_avatars": true,
      "max_height": "70vh"
    }
  }
}
```

## 功能开关

### 功能配置

```json
{
  "ui": {
    "features": {
      "voice_input": true,
      "file_upload": true,
      "canvas_view": true,
      "code_highlight": true
    }
  }
}
```

## 下一步

- [Control UI 指南](/docs/manual/control-ui)
- [核心能力总览](/docs/manual/core-capabilities)
- [API 参考](/docs/reference/api-reference-overview)
