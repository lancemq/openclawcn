---
title: WhatsApp 自动化工作流实战
description: 利用 OpenClaw 的 WhatsApp 渠道实现自动化工作流，包括自动回复、消息转发和定时提醒。
category: 渠道实践
difficulty: 中级
---

# WhatsApp 自动化工作流实战

本文介绍如何利用 OpenClaw 的 WhatsApp 渠道实现各种自动化工作流。

## 自动回复设置

### 基本自动回复

```json
{
  "channels": {
    "whatsapp": {
      "autoReply": {
        "enabled": true,
        "keywords": {
          "hello": "你好！有什么可以帮助你的？",
          "help": "你可以让我帮你查资料、管理日程等。"
        }
      }
    }
  }
}
```

### 智能自动回复

```python
async def handle_message(message):
    if "天气" in message.text:
        weather = await get_weather()
        return f"今天天气：{weather}"
    elif "日程" in message.text:
        schedule = await get_schedule()
        return format_schedule(schedule)
    return None
```

## 消息转发规则

### 跨渠道转发

```json
{
  "rules": {
    "forward": [
      {
        "from": "whatsapp",
        "to": ["telegram", "discord"],
        "condition": "contains_keyword:重要"
      }
    ]
  }
}
```

### 群组消息处理

```python
def process_group_message(message):
    # 只处理 @ 机器人的消息
    if message.get("is_mentioned"):
        return process_ai_request(message)
    return None
```

## 定时提醒功能

### 创建定时任务

```python
from openclaw import Cron

# 每天早上 8 点发送天气
@Cron.schedule("0 8 * * *")
async def morning_weather():
    weather = await get_weather()
    await openclaw.send_message(
        channel="whatsapp",
        to="+15555550123",
        message=f"早上好！今天天气：{weather}"
    )
```

### 会议提醒

```python
@Cron.schedule("0 9 * * 1-5")
async def meeting_reminder():
    meetings = await get_today_meetings()
    for meeting in meetings:
        await openclaw.send_message(
            channel="whatsapp",
            to=meeting["participant"],
            message=f"会议提醒：{meeting['title']} 在 {meeting['time']}"
        )
```

## 数据收集表单

### 自动收集反馈

```python
async def collect_feedback(message):
    if message.text.startswith("反馈"):
        feedback = message.text[2:].strip()
        await save_to_database("feedback", {
            "user": message.from,
            "content": feedback,
            "timestamp": message.timestamp
        })
        return "感谢您的反馈！"
```

## 常见场景

### 场景一：客户服务

1. 客户发送问题
2. AI 自动分类问题
3. 根据类型回复解决方案
4. 复杂问题转人工

### 场景二：订单通知

1. 订单状态更新
2. 自动发送通知到客户 WhatsApp
3. 客户可回复查询订单

### 场景三：日程管理

1. 语音输入创建日程
2. 自动添加到日历
3. 定时发送提醒

## 下一步

- [WhatsApp 连接指南](/news/whatsapp-connection)
- [技能开发指南](/best-practices/skills-development)
- [安全配置基础](/docs/operations/safety-basics)