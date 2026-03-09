---
title: Telegram Bot 开发进阶指南
description: 深入学习 Telegram Bot 的高级功能，包括自定义键盘、Inline 模式和群组管理。
category: 渠道实践
difficulty: 中高级
---

# Telegram Bot 开发进阶指南

本文介绍 Telegram Bot 的高级功能和开发技巧。

## 自定义键盘

### 回复键盘

```python
from openclaw.channels.telegram import ReplyKeyboardMarkup, KeyboardButton

keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="📅 日历"), KeyboardButton(text="📝 笔记")],
        [KeyboardButton(text="🌤️ 天气"), KeyboardButton(text="⚙️ 设置")]
    ],
    resize_keyboard=True,
    one_time_keyboard=True
)
```

### Inline 键盘

```python
from openclaw.channels.telegram import InlineKeyboardMarkup, InlineKeyboardButton

inline_keyboard = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text="👍 点赞", callback_data="like"),
            InlineKeyboardButton(text="👎 反对", callback_data="dislike")
        ],
        [InlineKeyboardButton(text="🔗 了解更多", url="https://openclaw.ai")]
    ]
)
```

## Inline 模式

### 搜索功能

```python
async def handle_inline_query(inline_query):
    results = [
        {
            "type": "article",
            "id": "1",
            "title": "OpenClaw 是什么",
            "description": "了解 OpenClaw AI 助手",
            "input_message_content": {
                "message_text": "OpenClaw 是一个开源 AI 助手..."
            }
        }
    ]
    await answer_inline_query(inline_query.id, results)
```

### GIF 和图片搜索

```python
async def handle_inline_media(inline_query):
    results = [
        {
            "type": "photo",
            "id": "1",
            "photo_url": "https://example.com/image.jpg",
            "thumb_url": "https://example.com/thumb.jpg"
        }
    ]
```

## 群组管理

### 欢迎消息

```python
async def handle_new_member(update):
    for member in update.new_chat_members:
        welcome_text = f"欢迎 {member.first_name} 加入本群！"
        await bot.send_message(
            chat_id=update.chat.id,
            text=welcome_text,
            reply_markup=get_welcome_keyboard()
        )
```

### 权限管理

```python
async def handle_group_permission(update):
    if "违规" in update.message.text:
        await bot.restrict_chat_member(
            chat_id=update.chat.id,
            user_id=update.message.from_user.id,
            permissions=ChatPermissions(can_send_messages=False),
            until_date=datetime.now() + timedelta(hours=1)
        )
```

## 命令处理

### 斜杠命令

```python
COMMANDS = {
    "/start": "欢迎使用 OpenClaw",
    "/help": "获取帮助信息",
    "/settings": "打开设置",
    "/status": "查看状态"
}

async def handle_command(update):
    command = update.message.text.split()[0]
    if command in COMMANDS:
        await bot.send_message(
            chat_id=update.chat.id,
            text=COMMANDS[command]
        )
```

### 命令别名

```python
command_aliases = {
    "帮助": "/help",
    "状态": "/status",
    "设置": "/settings"
}
```

## 投票和测验

### 创建投票

```python
async def create_poll(update):
    await bot.send_poll(
        chat_id=update.chat.id,
        question="你更喜欢哪个 AI 助手？",
        options=["OpenClaw", "ChatGPT", "Claude", "其他"],
        is_anonymous=False,
        allows_multiple_answers=False
    )
```

## 常见问题

### 1. Bot 无法加入群组

- 检查 Bot 权限
- 确认群组设置允许添加 Bot

### 2. Inline 模式不工作

- 需要在 BotFather 启用 Inline 模式

### 3. 消息发送失败

- 检查是否被限制
- 确认聊天权限

## 下一步

- [Telegram 配置指南](/news/telegram-bot)
- [Discord 集成](/news/discord-integration)
- [Slack 工作区](/news/slack-workspace)