---
title: 自定义技能开发指南
description: 从零开始开发 OpenClaw 自定义技能，包括项目结构、配置文件、处理逻辑、测试方法和发布流程。
category: 开发
difficulty: 中级
updatedAt: 2026-03-13
sourceType: official
tags: [skills, development, custom, tutorial]
---

# 自定义技能开发指南

当现有技能无法满足你的特定需求时，开发自定义技能是最好的解决方案。这篇指南将带你从零开始创建一个完整的 OpenClaw 技能。

## 什么时候需要自定义技能

| 场景 | 建议 |
|------|------|
| 需要调用内部 API 或私有服务 | ✅ 自定义技能 |
| 需要特定的数据处理逻辑 | ✅ 自定义技能 |
| 需要集成公司内部工具 | ✅ 自定义技能 |
| 现有技能功能接近但不完全满足 | 先看能否通过配置调整 |
| 只是需要简单的提示词增强 | 考虑 SOUL.md 或 Hooks |

## 技能项目结构

一个标准的技能项目结构如下：

```
my-skill/
├── skill.yaml          # 技能配置文件（必需）
├── skill.md            # 技能说明文档
├── handler.py          # Python 处理逻辑
├── handler.js          # 或 JavaScript 处理逻辑
├── requirements.txt    # Python 依赖
├── package.json        # JavaScript 依赖
├── tests/
│   └── test_handler.py # 测试文件
├── examples/
│   └── example-usage.md
└── README.md
```

## skill.yaml 配置文件

这是技能的核心配置文件：

```yaml
# 基本信息
name: my-custom-skill
version: 1.0.0
description:
  en: My custom skill for OpenClaw
  zh: 我的 OpenClaw 自定义技能
author: your-name
license: MIT

# 触发关键词
triggers:
  - "my skill"
  - "自定义技能"
  - "帮我处理"

# 参数定义
parameters:
  - name: input_text
    type: string
    required: true
    description:
      en: The text to process
      zh: 需要处理的文本

  - name: mode
    type: enum
    required: false
    default: "standard"
    options:
      - "standard"
      - "advanced"
    description:
      en: Processing mode
      zh: 处理模式

# 执行配置
execution:
  handler: handler.py
  timeout: 30
  memory: 256

# 权限声明
permissions:
  - network      # 网络访问
  - filesystem   # 文件系统
  - environment  # 环境变量

# 环境变量需求
environment:
  - name: API_KEY
    required: true
    description: API 密钥

  - name: API_URL
    required: false
    default: "https://api.example.com"
    description: API 地址
```

## 处理逻辑实现

### Python 实现

```python
# handler.py
import os
import json
from typing import Dict, Any

def execute(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    技能执行入口函数

    Args:
        params: 包含所有参数的字典

    Returns:
        包含结果的字典
    """
    input_text = params.get("input_text", "")
    mode = params.get("mode", "standard")

    # 获取环境变量
    api_key = os.environ.get("API_KEY")
    api_url = os.environ.get("API_URL", "https://api.example.com")

    try:
        # 处理逻辑
        result = process_text(input_text, mode)

        return {
            "success": True,
            "result": result,
            "metadata": {
                "mode": mode,
                "input_length": len(input_text)
            }
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

def process_text(text: str, mode: str) -> str:
    """核心处理逻辑"""
    if mode == "advanced":
        # 高级处理
        return text.upper()
    else:
        # 标准处理
        return text.title()
```

### JavaScript 实现

```javascript
// handler.js
module.exports = {
  async execute(params) {
    const { input_text, mode = 'standard' } = params

    const apiKey = process.env.API_KEY
    const apiUrl = process.env.API_URL || 'https://api.example.com'

    try {
      const result = await processText(input_text, mode)

      return {
        success: true,
        result,
        metadata: {
          mode,
          inputLength: input_text.length
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}

async function processText(text, mode) {
  if (mode === 'advanced') {
    return text.toUpperCase()
  }
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
```

## 技能说明文档 (skill.md)

```markdown
# My Custom Skill

## 功能说明

这个技能用于处理文本，支持标准和高级两种模式。

## 使用方法

### 基本用法

```
请用自定义技能处理这段文字：你好世界
```

### 指定模式

```
请用自定义技能的高级模式处理：hello world
```

## 参数说明

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| input_text | string | 是 | 需要处理的文本 |
| mode | enum | 否 | 处理模式：standard 或 advanced |

## 示例

输入：`请用自定义技能处理：hello world`
输出：`Hello World`

输入：`请用自定义技能的高级模式处理：hello world`
输出：`HELLO WORLD`
```

## 本地测试

### 使用 CLI 测试

```bash
# 测试技能
openclaw skills test my-skill --input '{"input_text": "hello world"}'

# 指定模式测试
openclaw skills test my-skill --input '{"input_text": "hello world", "mode": "advanced"}'

# 查看详细输出
openclaw skills test my-skill --input '{"input_text": "test"}' --verbose
```

### 单元测试

```python
# tests/test_handler.py
import pytest
from handler import execute

def test_standard_mode():
    result = execute({"input_text": "hello world"})
    assert result["success"] is True
    assert result["result"] == "Hello World"

def test_advanced_mode():
    result = execute({"input_text": "hello world", "mode": "advanced"})
    assert result["success"] is True
    assert result["result"] == "HELLO WORLD"

def test_empty_input():
    result = execute({"input_text": ""})
    assert result["success"] is True
    assert result["result"] == ""
```

运行测试：

```bash
pytest tests/
```

## 安装与部署

### 本地安装

```bash
# 从本地目录安装
openclaw skills install ./my-skill

# 验证安装
openclaw skills list | grep my-skill
```

### 配置环境变量

```bash
# 在 .env 文件中添加
API_KEY=your-api-key-here
API_URL=https://api.example.com
```

或在配置文件中：

```json
{
  "skills": {
    "entries": {
      "my-custom-skill": {
        "enabled": true,
        "config": {
          "apiKey": "${API_KEY}",
          "apiUrl": "${API_URL}"
        }
      }
    }
  }
}
```

## 发布到 ClawHub

### 准备发布

1. 确保技能完整且经过测试
2. 更新版本号
3. 准备 README 和文档

### 打包

```bash
openclaw skills pack my-skill -o my-skill.ocpkg
```

### 发布

```bash
# 登录 ClawHub
openclaw skills login

# 发布技能
openclaw skills publish my-skill.ocpkg
```

## 最佳实践

### 1. 保持单一职责

每个技能应该只做一件事，并且做好它。

```
✅ 好：一个技能只处理 PDF 转换
❌ 差：一个技能处理 PDF、Word、Excel 转换
```

### 2. 提供清晰的错误信息

```python
def execute(params):
    if not params.get("input_text"):
        return {
            "success": False,
            "error": "缺少必需参数：input_text",
            "hint": "请提供需要处理的文本，例如：处理这段文字：你好"
        }
```

### 3. 支持中英文

```yaml
description:
  en: Process text with custom logic
  zh: 使用自定义逻辑处理文本
```

### 4. 合理的超时设置

```yaml
execution:
  timeout: 30  # 简单操作 30 秒足够
  # timeout: 300  # 复杂操作可以更长
```

### 5. 最小权限原则

只申请必要的权限：

```yaml
# ✅ 只需要网络访问
permissions:
  - network

# ❌ 不要申请不必要的权限
permissions:
  - network
  - filesystem  # 如果不需要文件访问
  - environment # 如果不需要环境变量
```

## 常见问题

### 技能安装后不生效

1. 检查技能是否启用：`openclaw skills list`
2. 检查配置是否正确：`openclaw skills info my-skill`
3. 重启 Gateway：`openclaw restart`

### 环境变量读取失败

1. 确认 .env 文件位置正确
2. 检查变量名是否匹配
3. 使用 `${VAR_NAME}` 格式引用

### 执行超时

1. 增加 timeout 设置
2. 优化处理逻辑
3. 考虑异步处理

## 下一步

- [Skills 系统详解](/docs/manual/skills-system)
- [Hooks 实战指南](/best-practices/hooks-practical-guide)
- [配置参考](/docs/reference/configuration-reference)