---
title: Discord Bot 高级功能开发
description: 深入学习 Discord Bot 的高级功能，包括 Slash 命令、Embed 消息和语音频道集成。
category: 渠道实践
difficulty: 中高级
updatedAt: 2026-03-11
sourceType: third-party
tags: [discord, bot, channels, advanced]
---

# Discord Bot 高级功能开发

本文介绍 Discord Bot 的高级开发技巧。

## Slash 命令

### 注册命令

```python
from discord import app_commands

@tree.command()
async def ask(interaction: Interaction, question: str):
    """向 AI 助手提问"""
    await interaction.response.defer()
    answer = await openclaw.ask(question)
    await interaction.followup.send(answer)
```

### 子命令

```python
@tree.command()
async def manage(interaction: Interaction):
    """管理设置"""
    pass

@manage.subcommand()
async def set_channel(interaction: Interaction, channel: TextChannel):
    """设置响应频道"""
    await interaction.response.send_message(f"已设置频道: {channel.mention}")
```

## Embed 消息

### 创建富文本消息

```python
from discord import Embed

async def send_ai_response(interaction, question):
    embed = Embed(
        title="🤖 AI 回答",
        description=question,
        color=0x5865F2
    )
    embed.add_field(
        name="答案",
        value="这是 AI 的回答内容...",
        inline=False
    )
    embed.set_footer(text="由 OpenClaw 提供")
    await interaction.response.send_message(embed=embed)
```

### 动态 Embed

```python
async def create_status_embed(status):
    colors = {
        "online": 0x57F287,
        "idle": 0xFEE75C,
        "dnd": 0xED4245
    }
    embed = Embed(
        title="系统状态",
        color=colors.get(status["state"], 0xFFFFFF)
    )
    for metric, value in status["metrics"].items():
        embed.add_field(name=metric, value=value)
    return embed
```

## 语音频道

### 语音状态检测

```python
@client.event
async def on_voice_state_update(member, before, after):
    if before.channel is None and after.channel is not None:
        # 用户加入语音频道
        await send_welcome(member, after.channel)
    elif before.channel is not None and after.channel is None:
        # 用户离开语音频道
        await log_leave(member, before.channel)
```

### 语音频道命令

```python
@tree.command()
async def join(interaction: Interaction):
    """加入语音频道"""
    voice_client = interaction.guild.voice_client
    if voice_client:
        await interaction.response.send_message("已在语音频道中")
        return
    
    if interaction.user.voice:
        channel = interaction.user.voice.channel
        await channel.connect()
        await interaction.response.send_message(f"已加入 {channel.name}")
    else:
        await interaction.response.send_message("请先加入语音频道")
```

## 按钮交互

### 交互式按钮

```python
from discord import ButtonStyle
from discord.ui import View, Button

class AIView(View):
    @discord.ui.button(label="重新生成", style=ButtonStyle.primary)
    async def regenerate(self, button, interaction):
        await interaction.response.edit_message(content="正在重新生成...")
        # 重新生成逻辑

    @discord.ui.button(label="停止", style=ButtonStyle.danger)
    async def stop(self, button, interaction):
        await interaction.response.edit_message(content="已停止")
```

## 选择菜单

### 下拉选择

```python
class ModelSelect(View):
    @discord.ui.select(
        placeholder="选择 AI 模型",
        options=[
            SelectOption(label="Claude 3.5", value="claude"),
            SelectOption(label="GPT-4", value="gpt4"),
            SelectOption(label="Gemini", value="gemini")
        ]
    )
    async def select_model(self, select, interaction):
        await interaction.response.send_message(f"已选择: {select.values[0]}")
```

## 事件处理

### 消息监听

```python
@client.event
async def on_message(message):
    if message.author.bot:
        return
    
    # 检查是否 @ 了 Bot
    if client.user in message.mentions:
        question = message.content.replace(f"@{client.user.mention}", "").strip()
        response = await openclaw.ask(question)
        await message.reply(response)
```

### 成员加入

```python
@client.event
async def on_member_join(member):
    channel = member.guild.system_channel
    embed = Embed(
        title="欢迎新成员！",
        description=f"欢迎 {member.mention} 加入服务器",
        color=0x57F287
    )
    await channel.send(embed=embed)
```

## 下一步

- [Discord 集成配置](/news/discord-integration)
- [Slack 工作区集成](/news/slack-workspace)
- [Telegram Bot 开发](/best-practices/telegram-bot-development)
