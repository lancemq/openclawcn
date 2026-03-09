---
title: 技能开发进阶：Hook 与事件处理
description: 学习 OpenClaw 技能系统的高级用法，包括 Hook、事件监听和自定义工作流。
category: 技能开发
difficulty: 高级
---

# 技能开发进阶：Hook 与事件处理

本文深入介绍 OpenClaw 的 Hook 机制和事件处理。

## Hook 类型

### 消息 Hook

```python
from openclaw.hooks import MessageHook

@MessageHook.on_receive
async def handle_message(message):
    """收到消息时触发"""
    # 消息预处理
    if contains_sensitive(message.text):
        await log_security_event(message)
    return message

@MessageHook.on_send
async def handle_send(message):
    """发送消息前触发"""
    # 消息后处理
    message.text = filter_emoji(message.text)
    return message
```

### 渠道 Hook

```python
from openclaw.hooks import ChannelHook

@ChannelHook.on_connect
async def on_channel_connect(channel):
    """渠道连接时触发"""
    await log_event(f"渠道 {channel.type} 已连接")

@ChannelHook.on_disconnect
async def on_channel_disconnect(channel):
    """渠道断开时触发"""
    await notify_admin(f"渠道 {channel.type} 已断开")
```

### 会话 Hook

```python
from openclaw.hooks import SessionHook

@SessionHook.on_create
async def on_session_create(session):
    """创建会话时触发"""
    session.context = {
        "created_at": datetime.now(),
        "message_count": 0
    }
    return session

@SessionHook.on_close
async def on_session_close(session):
    """关闭会话时触发"""
    await save_session_history(session)
```

## 事件系统

### 自定义事件

```python
from openclaw.events import EventEmitter

class MySkill:
    def __init__(self):
        self.events = EventEmitter()
    
    async def process(self, request):
        # 触发自定义事件
        await self.events.emit("before_process", request)
        
        result = await self.do_process(request)
        
        await self.events.emit("after_process", result)
        return result
```

### 事件监听

```python
@skill.event("user_action")
async def handle_user_action(action):
    """处理用户动作事件"""
    if action.type == "click":
        await handle_click(action)
    elif action.type == "submit":
        await handle_submit(action)
```

## 中间件

### 请求中间件

```python
async def auth_middleware(request, next):
    """认证中间件"""
    if not request.user.is_authenticated:
        return {"error": "未认证"}
    return await next(request)

async def rate_limit_middleware(request, next):
    """限流中间件"""
    key = f"rate:{request.user.id}"
    count = await redis.incr(key)
    if count > 100:
        return {"error": "请求过于频繁"}
    await redis.expire(key, 60)
    return await next(request)

# 注册中间件
skill.use(auth_middleware)
skill.use(rate_limit_middleware)
```

### 响应中间件

```python
async def log_middleware(request, response, next):
    """日志中间件"""
    start = time.time()
    result = await next(request, response)
    duration = time.time() - start
    
    await log.info(
        f"请求: {request.path}, "
        f"耗时: {duration:.2f}s, "
        f"状态: {result.get('status')}"
    )
    return result
```

## 工作流

### 定义工作流

```python
from openclaw.workflow import Workflow, Step

workflow = Workflow(
    name="数据处理流程",
    steps=[
        Step(name="获取数据", handler=fetch_data),
        Step(name="验证数据", handler=validate_data),
        Step(name="处理数据", handler=process_data),
        Step(name="保存结果", handler=save_result)
    ]
)

@workflow.on_error
async def handle_error(error, step):
    await notify_admin(f"工作流错误: {step.name} - {error}")
```

### 条件分支

```python
from openclaw.workflow import Condition

workflow = Workflow(
    steps=[
        Step(
            name="判断金额",
            handler=lambda ctx: "small" if ctx.amount < 1000 else "large"
        ),
        Condition(
            case="small",
            steps=[Step(name="快速处理", handler=quick_process)]
        ),
        Condition(
            case="large",
            steps=[
                Step(name="审批", handler=require_approval),
                Step(name="处理", handler=process)]
        )
    ]
)
```

## 定时任务

### Cron 表达式

```python
from openclaw.scheduler import schedule

@schedule.cron("0 9 * * 1-5")
async def morning_task():
    """工作日早上 9 点执行"""
    pass

@schedule.cron("0 */2 * *")
async def every_two_hours():
    """每 2 小时执行"""
    pass

@schedule.interval(hours=1)
async def hourly_task():
    """每小时执行"""
    pass
```

## 下一步

- [技能开发基础](/best-practices/skills-development)
- [API 参考](/docs/reference/api-reference-overview)
- [安全配置](/docs/operations/safety-basics)