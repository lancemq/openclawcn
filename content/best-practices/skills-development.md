---
title: 技能开发指南
description: 深入了解 OpenClaw 技能系统，学习如何开发和自定义专属技能。
category: 进阶指南
difficulty: 中高级
---

# 技能开发指南

OpenClaw 的技能（Skills）系统是其扩展能力的核心。本文将帮助你理解技能系统并学会如何开发自定义技能。

## 技能系统概述

OpenClaw 提供了灵活的技能系统，让你能够扩展助手的能力。

### 技能类型

#### 1. 捆绑技能 (Bundled Skills)

开箱即用的内置技能：

- 日历管理
- 待办事项
- 笔记记录
- 天气查询
- 翻译功能
- 计算器

#### 2. 托管技能 (Hosted Skills)

用户自行部署的技能：

- 可完全自定义
- 独立运行
- 可分享给他人

#### 3. 工作区技能 (Workspace Skills)

团队共享的技能：

- 团队成员共享
- 统一管理
- 权限控制

### 技能的工作原理

```
用户输入 → 技能匹配 → 技能执行 → 返回结果
    │
    ▼
意图识别 ←───────────────
```

技能系统会分析用户输入，匹配最合适的技能，然后执行并返回结果。

## 如何使用现有技能

### 技能发现

在 Control UI 中查看可用技能：

```bash
openclaw skills list
```

### 技能调用

使用自然语言调用技能：

- "帮我记录今天的会议要点"
- "明天天气怎么样"
- "设置一个下午三点的提醒"

### 技能配置

每个技能都有自己的配置项：

- API 密钥
- 默认参数
- 触发关键词

## 开发自定义技能

### 基本结构

一个典型的技能包含：

```
my-skill/
├── skill.yaml      # 技能配置
├── handler.py      # 处理逻辑
└── requirements.txt
```

### skill.yaml 示例

```yaml
name: my-first-skill
version: 1.0.0
description: 我的第一个自定义技能
triggers:
  - "hello"
  - "你好"
actions:
  - respond
permissions:
  - network
  - storage
```

### handler.py 示例

```python
async def handle(request):
    intent = request.intent
    if intent == "greet":
        return {
            "message": "你好！我是你的新技能。"
        }
    return {"error": "未知的意图"}
```

## 技能开发最佳实践

### 1. 明确的触发条件

```yaml
triggers:
  - "查天气"
  - "天气怎么样"
  - "今天冷不冷"
```

### 2. 完善的错误处理

```python
async def handle(request):
    try:
        # 执行逻辑
        return success_response()
    except NetworkError:
        return error_response("网络连接失败")
    except ValidationError as e:
        return error_response(f"参数错误: {e}")
    except Exception:
        return error_response("未知错误")
```

### 3. 日志记录

```python
import logging

logger = logging.getLogger(__name__)

async def handle(request):
    logger.info(f"处理请求: {request.intent}")
    # ... 处理逻辑
```

### 4. 异步处理

```python
async def handle(request):
    # 使用异步 API
    result = await fetch_external_data()
    return result
```

### 5. 响应格式化

```python
return {
    "format": "text",  # 或 "canvas", "json"
    "content": "...",
    "actions": [
        {"type": "button", "label": "查看更多", "action": "show_more"}
    ]
}
```

## 技能安全

### 权限控制

技能可以请求不同权限：

```yaml
permissions:
  - network:     # 网络访问
  - storage:     # 本地存储
  - filesystem: # 文件系统
  - commands:   # 执行命令
```

### 敏感信息处理

- 使用环境变量存储密钥
- 不在代码中硬编码凭证
- 定期轮换 API 密钥

### 审计日志

记录技能的所有操作：

- 何时被调用
- 处理了什么数据
- 返回了什么结果

### VirusTotal 安全验证

OpenClaw 已与 VirusTotal 合作，为技能提供安全验证服务。

#### 验证流程

提交到 ClawHub 的技能会经过以下验证：

1. **静态分析** - 检查代码中的可疑模式
2. **多引擎扫描** - 使用 70+ 杀毒引擎检测
3. **行为分析** - 监控技能运行时的行为
4. **社区评分** - 参考社区反馈

#### 查看安全报告

```bash
# 查看技能安全评分
openclaw skills security my-skill
```

#### 提高技能信任度

- 通过 VirusTotal 安全验证
- 提供完整的源代码
- 获得社区正面评价
- 及时响应安全问题

#### 安全最佳实践

```yaml
# 建议的安全配置
security:
  # 启用沙盒模式
  sandbox: true
  
  # 限制网络访问
  allowed_domains:
    - api.example.com
  
  # 记录所有操作
  audit_log: true
  
  # 超时设置
  timeout: 30
```

## 技能分享

### 打包技能

```bash
openclaw skills pack my-skill -o my-skill.ocpkg
```

### 发布技能

```bash
openclaw skills publish my-skill.ocpkg
```

### 安装他人技能

```bash
openclaw skills install <skill-id>
```

## 调试技巧

### 本地测试

```bash
# 测试技能
openclaw skills test my-skill --input "hello"
```

### 日志查看

```bash
# 查看技能日志
openclaw logs --skill my-skill
```

### 交互式调试

```python
# 在 handler 中添加断点
async def handle(request):
    import pdb; pdb.set_trace()
    # ...
```

## 常见问题

### 技能不触发

- 检查触发词是否正确
- 确认技能已启用
- 查看意图识别结果

### 响应太慢

- 优化异步处理
- 添加缓存
- 检查外部 API 延迟

### 权限被拒绝

- 检查 skill.yaml 配置
- 重新安装技能
- 联系管理员

## 进阶主题

### Canvas 集成

技能可以返回 Canvas 界面：

```python
return {
    "format": "canvas",
    "components": [
        {"type": "chart", "data": ...},
        {"type": "button", "label": "导出", "action": "export"}
    ]
}
```

### 事件监听

```python
async def on_event(event):
    if event.type == "message_received":
        # 处理消息事件
        pass
```

### 多语言支持

```yaml
name:
  en: My Skill
  zh: 我的技能
description:
  en: A sample skill
  zh: 示例技能
```

## 小结

技能系统是 OpenClaw 强大扩展能力的体现。通过开发自定义技能，你可以让助手完美适配自己的需求。

## 下一步

- [核心能力总览](/docs/core-capabilities)
- [API 参考文档](/docs/api-reference-overview)
- [Hooks 机制](/docs/hooks-overview)