---
title: 飞书 Bot 开发实战
description: 学习飞书开放平台的集成开发，包括消息卡片、审批流和定时任务。
category: 渠道实践
difficulty: 中级
---

# 飞书 Bot 开发实战

本文介绍飞书（Feishu/Lark）Bot 的开发实践。

## 消息类型

### 文本消息

```python
from openclaw.channels.feishu import TextMessage

message = TextMessage(
    text="你好！这是 OpenClaw 助手"
)
await bot.send_message(chat_id, message)
```

### 富文本消息

```python
from openclaw.channels.feishu import PostMessage, Element, Tag

post = PostMessage(
    zh_cn={
        "title": "AI 回答",
        "content": [
            [
                {"tag": "text", "text": "问题："},
                {"tag": "text", "text": "今天天气怎么样？", "color": "blue"}
            ],
            [
                {"tag": "text", "text": "回答："},
                {"tag": "text", "text": "今天晴天，25°C"}
            ]
        ]
    }
)
```

### 消息卡片

```python
from openclaw.channels.feishu import CardMessage, CardElement

card = CardMessage(
    config={"wide_mode": True},
    header={
        "title": {"tag": "plain_text", "content": "AI 助手响应"},
        "template": "blue"
    },
    elements=[
        {
            "tag": "div",
            "text": {"tag": "plain_text", "content": "这是 AI 的回答内容"}
        },
        {
            "tag": "action",
            "actions": [
                {
                    "tag": "button",
                    "text": {"tag": "plain_text", "content": "重新生成"},
                    "type": "primary",
                    "action_id": "regenerate"
                }
            ]
        }
    ]
)
```

## 交互事件

### 按钮回调

```python
@bot.event("action_callback")
async def handle_action_callback(callback):
    action_id = callback.action_id
    if action_id == "regenerate":
        # 重新生成逻辑
        await callback.reply("正在重新生成...")
```

### 消息订阅

```python
@bot.event("im.message.receive_v1")
async def handle_message(message):
    msg_type = message.message_type
    if msg_type == "text":
        text = message.content.text
        # 处理消息
        response = await openclaw.ask(text)
        await message.reply(response)
```

## 定时任务

### 创建定时提醒

```python
from openclaw import Cron

@Cron.schedule("0 9 * * 1-5")
async def morning_report():
    # 生成日报
    report = await generate_daily_report()
    
    # 发送到飞书群
    await bot.send_message(
        chat_id="oc_xxx",
        message=PostMessage(
            zh_cn={
                "title": "每日简报",
                "content": [[{"tag": "text", "text": report}]]
            }
        )
    )
```

## 审批流集成

### 发起审批

```python
async def create_approval(approval_data):
    approval = {
        "approval_code": "daily_report",
        "user_id": user_id,
        "node_id_list": ["node_1", "node_2"],
        "form": {
            "标题": approval_data["title"],
            "金额": approval_data["amount"],
            "申请人": approval_data["applicant"]
        }
    }
    result = await bot.create_approval(approval)
    return result
```

## 表格集成

### 数据查询

```python
async def query_bitable(table_id, conditions=None):
    query = {
        "filter": conditions,
        "field_names": ["名称", "状态", "金额"]
    }
    result = await bot.query_bitable(table_id, query)
    return result
```

## 常用场景

### 场景一：团队值班提醒

```python
@Cron.schedule("0 18 * * 1-5")
async def duty_reminder():
    duty_person = await get_duty_person()
    await bot.send_message(
        chat_id="work_group",
        message=TextMessage(
            text=f"提醒：明天 {duty_person['name']} 值班"
        )
    )
```

### 场景二：报销审批

```python
async def handle_expense_approval(callback):
    expense = callback.form_data
    if expense["amount"] < 1000:
        # 自动通过
        await callback.approve("金额较小，自动通过")
    else:
        # 转交人工审批
        await callback.transfer("manager")
```

## 下一步

- [飞书集成配置](/news/feishu-integration)
- [Slack 工作区](/news/slack-workspace)
- [企业部署指南](/news/enterprise-deployment)