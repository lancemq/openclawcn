---
title: 客户服务场景应用
description: 使用 OpenClaw 构建智能客服系统，包括自动回复、工单管理和满意度调查。
category: 应用场景
difficulty: 中级
---

# 客户服务场景应用

本文介绍如何使用 OpenClaw 构建智能客服系统。

## 客服系统架构

### 多渠道接入

```json
{
  "customer_service": {
    "channels": ["whatsapp", "telegram", "webchat"],
    "unified_inbox": true,
    "routing": "skill_based"
  }
}
```

### 智能路由

```python
async def route_customer(customer, message):
    # 识别客户
    customer_info = await identify_customer(customer)
    
    # 判断问题类型
    issue_type = await classify_issue(message)
    
    # 选择处理方式
    if issue_type == "simple":
        return await auto_reply(message)
    elif issue_type == "technical":
        return await route_to_technical(customer)
    else:
        return await route_to_general(customer)
```

## 自动回复

### 知识库回复

```python
async def auto_reply(message):
    # 搜索知识库
    results = await knowledge.search(message.text, limit=3)
    
    if results:
        # 返回最佳匹配
        return format_knowledge_reply(results[0])
    
    # 无法回答，转人工
    return await transfer_to_agent(message)
```

### 常见问题

```python
faq_responses = {
    "如何重置密码": "请访问 https://example.com/reset",
    "工作时间": "我们的工作时间是周一至周五 9:00-18:00",
    "退款政策": "请查看我们的退款政策页面..."
}
```

## 工单管理

### 创建工单

```python
async def create_ticket(message, customer):
    ticket = {
        "id": generate_ticket_id(),
        "customer": customer.id,
        "subject": message.text[:100],
        "description": message.text,
        "status": "open",
        "priority": determine_priority(message),
        "created_at": datetime.now()
    }
    
    await save_ticket(ticket)
    return ticket
```

### 工单升级

```python
async def escalate_ticket(ticket, reason):
    ticket.status = "escalated"
    ticket.escalation_reason = reason
    ticket.escalated_at = datetime.now()
    
    # 通知主管
    await notify_supervisor(ticket)
    
    return ticket
```

## 满意度调查

### 自动调查

```python
@workflow.trigger("ticket_closed")
async def send_survey(ticket):
    # 发送满意度调查
    await send_message(
        channel=ticket.channel,
        template="survey",
        data={
            "ticket_id": ticket.id,
            "url": f"https://survey.example.com/{ticket.id}"
        }
    )
```

## 下一步

- [自动化工作流](/best-practices/automation-workflows)
- [团队协作](/best-practices/team-collaboration)
- [渠道集成](/news/whatsapp-connection)