---
title: 自动化工作流设计
description: 使用 OpenClaw 构建自动化工作流，包括定时任务、事件触发和条件分支。
category: 自动化
difficulty: 中级
---

# 自动化工作流设计

本文介绍如何使用 OpenClaw 构建各种自动化工作流。

## 工作流基础

### 核心概念

- **触发器**：启动工作流的条件
- **动作**：执行的具体操作
- **条件**：判断是否执行
- **流程控制**：顺序、并行、循环

## 定时任务

### Cron 表达式

```python
from openclaw.scheduler import schedule

# 每天早上 9 点
@schedule.cron("0 9 * * *")
async def morning_task():
    await send_daily_report()

# 每周一早上
@schedule.cron("0 9 * * 1")
async def weekly_task():
    await send_weekly_summary()

# 每小时
@schedule.cron("0 * * * *")
async def hourly_task():
    await check_system_health()
```

### 间隔任务

```python
# 每 30 分钟
@schedule.interval(minutes=30)
async def periodic_check():
    await check_pending_tasks()
```

## 事件触发

### 消息事件

```python
@openclaw.event("message_received")
async def handle_new_message(message):
    if "紧急" in message.text:
        await escalate_to_manager(message)
```

### 渠道事件

```python
@openclaw.event("channel_connected")
async def handle_channel_connect(channel):
    await notify_admin(f"渠道 {channel.type} 已连接")

@openclaw.event("channel_disconnected")
async def handle_channel_disconnect(channel):
    await send_alert(f"渠道 {channel.type} 断开")
```

### 会话事件

```python
@openclaw.event("session_started")
async def handle_session_start(session):
    session.data["start_time"] = datetime.now()

@openclaw.event("session_ended")
async def handle_session_end(session):
    duration = datetime.now() - session.data["start_time"]
    await log_session_duration(session.user_id, duration)
```

## 条件分支

### 消息过滤

```python
@openclaw.filter()
async def filter_messages(message):
    # 过滤敏感词
    if contains_sensitive(message.text):
        return False
    
    # 只处理指定用户
    if message.user_id not in ALLOWED_USERS:
        return False
    
    return True
```

### 智能路由

```python
async def route_message(message):
    # 技术问题
    if contains_keywords(message.text, ["代码", "bug", "error"]):
        return "technical-agent"
    
    # 账户问题
    if contains_keywords(message.text, ["账号", "登录", "密码"]):
        return "support-agent"
    
    # 默认
    return "default-agent"
```

## 工作流示例

### 示例一：自动回复

```python
workflow = Workflow("auto_reply")

@workflow.trigger("message_received")
async def on_message(message):
    # 检查是否是工作时间
    if not is_working_hours():
        return
    
    # 生成回复
    response = await generate_reply(message.text)
    
    # 发送回复
    await message.reply(response)
```

### 示例二：工单处理

```python
workflow = Workflow("ticket_handler")

@workflow.trigger("message_received")
async def on_ticket(message):
    # 创建工单
    ticket = await create_ticket(message)
    
    # 分类工单
    category = await categorize(ticket)
    
    # 分配处理人
    handler = await assign_handler(category)
    
    # 通知处理人
    await notify_handler(handler, ticket)
    
    # 通知用户
    await message.reply(f"工单已创建: {ticket.id}")
```

### 示例三：数据收集

```python
workflow = Workflow("data_collection")

@workflow.trigger("scheduled")
@workflow.cron("0 10 * * *")
async def collect_data():
    # 获取数据源
    data = await fetch_data()
    
    # 处理数据
    processed = process_data(data)
    
    # 生成报告
    report = generate_report(processed)
    
    # 发送报告
    await send_email(
        to="team@example.com",
        subject="每日数据报告",
        body=report
    )
```

## 复杂工作流

### 并行执行

```python
async def parallel_workflow():
    # 并行执行多个任务
    results = await asyncio.gather(
        fetch_weather(),
        fetch_news(),
        fetch_stock()
    )
    
    # 汇总结果
    summary = summarize(results)
    
    # 发送汇总
    await send_message(summary)
```

### 错误处理

```python
workflow = Workflow("robust_process")

@workflow.step
async def step1():
    # 可能失败的操作
    result = await risky_operation()
    return result

@workflow.step(on_error="retry")
async def step2(data):
    # 失败后重试
    await process(data)

@workflow.step(on_error="skip")
async def step3(data):
    # 失败后跳过
    await optional_process(data)

@workflow.step(on_error="alert")
async def step4(data):
    # 失败后告警
    await critical_operation(data)
```

### 状态管理

```python
workflow = Workflow("multi_step")

@workflow.state
class OrderState:
    def __init__(self):
        self.order_id = None
        self.status = "pending"
        self.items = []

@workflow.step
async def create_order(state, message):
    order = await create_order_in_system(message)
    state.order_id = order.id
    state.status = "created"
    return state

@workflow.step
async def process_payment(state, message):
    await process_payment(order_id)
    state.status = "paid"
    return state

@workflow.step
async def ship_order(state):
    await ship_order(order_id)
    state.status = "shipped"
    return state
```

## 监控与日志

### 工作流日志

```python
@workflow.log
async def log_execution(context, result):
    await log.info(
        f"工作流: {workflow.name}, "
        f"执行: {context.exec_id}, "
        f"结果: {result}"
    )
```

### 性能监控

```python
@workflow.monitor
async def monitor_performance(context):
    duration = time.time() - context.start_time
    metrics.record("workflow_duration", duration)
    
    if duration > 30:
        await alert(f"工作流执行超时: {duration}s")
```

## 下一步

- [定时任务](/best-practices/skill-development-advanced)
- [技能开发](/best-practices/skills-development)
- [故障排除](/docs/reference/troubleshooting)