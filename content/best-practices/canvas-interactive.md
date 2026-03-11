---
title: Canvas 交互式界面开发
description: 学习使用 A2UI 语法创建交互式 Canvas 界面，包括表单、图表和数据展示。
category: 可视化开发
difficulty: 中级
updatedAt: 2026-03-11
sourceType: third-party
tags: [canvas, a2ui, ui, visualization]
---

# Canvas 交互式界面开发

本文介绍如何使用 A2UI 语法创建交互式 Canvas 界面。

## A2UI 基础

### 语法概述

A2UI 是 OpenClaw 的声明式 UI 语法，用于生成 Canvas 界面。

```json
{
  "type": "container",
  "props": {
    "direction": "vertical",
    "gap": 16
  },
  "children": []
}
```

## 基础组件

### 文本

```json
{
  "type": "text",
  "props": {
    "content": "欢迎使用 OpenClaw",
    "size": "xl",
    "weight": "bold",
    "color": "primary"
  }
}
```

### 按钮

```json
{
  "type": "button",
  "props": {
    "label": "点击这里",
    "variant": "primary",
    "size": "md",
    "disabled": false
  },
  "action": {
    "type": "submit",
    "handler": "handle_click"
  }
}
```

### 输入框

```json
{
  "type": "input",
  "props": {
    "placeholder": "请输入内容",
    "type": "text",
    "required": true
  },
  "validation": {
    "minLength": 2,
    "maxLength": 100
  }
}
```

## 表单组件

### 下拉选择

```json
{
  "type": "select",
  "props": {
    "placeholder": "选择选项",
    "options": [
      {"label": "选项一", "value": "1"},
      {"label": "选项二", "value": "2"},
      {"label": "选项三", "value": "3"}
    ]
  }
}
```

### 单选/复选

```json
{
  "type": "radio",
  "props": {
    "options": [
      {"label": "A", "value": "a"},
      {"label": "B", "value": "b"},
      {"label": "C", "value": "c"}
    ]
  }
}

{
  "type": "checkbox",
  "props": {
    "options": [
      {"label": "选项一", "value": "1"},
      {"label": "选项二", "value": "2"}
    ]
  }
}
```

### 开关

```json
{
  "type": "switch",
  "props": {
    "label": "启用通知",
    "checked": true
  }
}
```

## 数据展示

### 表格

```json
{
  "type": "table",
  "props": {
    "columns": [
      {"key": "name", "label": "名称"},
      {"key": "status", "label": "状态"},
      {"key": "actions", "label": "操作"}
    ],
    "data": [
      {"name": "项目A", "status": "进行中", "actions": "编辑"},
      {"name": "项目B", "status": "已完成", "actions": "查看"}
    ]
  }
}
```

### 列表

```json
{
  "type": "list",
  "props": {
    "items": [
      {"title": "标题一", "description": "描述内容"},
      {"title": "标题二", "description": "描述内容"}
    ]
  }
}
```

### 卡片

```json
{
  "type": "card",
  "props": {
    "title": "信息卡片",
    "image": "https://example.com/image.jpg",
    "content": "卡片内容描述",
    "actions": [
      {"label": "查看详情", "action": "view_detail"}
    ]
  }
}
```

## 图表组件

### 柱状图

```json
{
  "type": "chart",
  "props": {
    "chartType": "bar",
    "data": {
      "labels": ["1月", "2月", "3月", "4月"],
      "datasets": [{
        "label": "销售额",
        "data": [100, 200, 150, 300]
      }]
    },
    "options": {
      "responsive": true,
      "plugins": {
        "legend": {"position": "top"}
      }
    }
  }
}
```

### 折线图

```json
{
  "type": "chart",
  "props": {
    "chartType": "line",
    "data": {
      "labels": ["周一", "周二", "周三", "周四", "周五"],
      "datasets": [{
        "label": "访问量",
        "data": [120, 190, 150, 200, 180]
      }]
    }
  }
}
```

### 饼图

```json
{
  "type": "chart",
  "props": {
    "chartType": "pie",
    "data": {
      "labels": ["A", "B", "C"],
      "datasets": [{
        "data": [30, 50, 20],
        "backgroundColor": ["#FF6384", "#36A2EB", "#FFCE56"]
      }]
    }
  }
}
```

## 布局组件

### 容器

```json
{
  "type": "container",
  "props": {
    "direction": "vertical",
    "gap": 16,
    "padding": 20,
    "background": "#ffffff"
  }
}
```

### 网格

```json
{
  "type": "grid",
  "props": {
    "columns": 2,
    "gap": 16,
    "children": [
      {"type": "card", "props": {...}},
      {"type": "card", "props": {...}}
    ]
  }
}
```

### 分隔线

```json
{
  "type": "divider",
  "props": {
    "color": "#e0e0e0",
    "spacing": 16
  }
}
```

## 事件处理

### 表单提交

```python
async def handle_form_submit(data):
    # 处理表单数据
    result = await process_data(data)
    return {
        "type": "toast",
        "message": "提交成功"
    }
```

### 动态更新

```python
async def handle_select_change(value):
    # 根据选择更新内容
    data = await fetch_data(value)
    return {
        "type": "update",
        "target": "table",
        "data": data
    }
```

## 下一步

- [Canvas 功能详解](/news/canvas-a2ui)
- [核心能力总览](/docs/manual/core-capabilities)
- [API 参考](/docs/reference/api-reference-overview)
