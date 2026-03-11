---
title: "OpenClaw 支持多种 AI 模型选择"
description: "OpenClaw 支持 Anthropic Claude、OpenAI GPT 和本地模型，为用户提供灵活的 AI 选择。"
category: 功能介绍
date: "2026-03-09"
author: "OpenClaw Team"
source: "openclaw.ai"
updatedAt: "2026-03-11"
sourceType: official
tags: ["ai", "models", "claude", "gpt", "local"]
---

OpenClaw 的核心优势之一是支持多种 AI 模型，为用户提供灵活的选择。

## 支持的模型

### 云端模型

| 模型 | 提供商 | 特点 |
|------|--------|------|
| Claude 3.5 | Anthropic | 强大的推理能力 |
| GPT-4o | OpenAI | 多模态支持 |
| GPT-4 Turbo | OpenAI | 高性能 |
| Gemini Pro | Google | 快速响应 |

### 本地模型

- **Llama 3** - Meta 开源大模型
- **Mistral** - 高效开源模型
- **Qwen** - 阿里云开源模型
- **Phi-3** - Microsoft 小型模型

## 模型配置

```json
{
  "models": {
    "default": "claude-3-5-sonnet",
    "providers": {
      "anthropic": {
        "apiKey": "${ANTHROPIC_API_KEY}",
        "defaultModel": "claude-3-5-sonnet"
      },
      "openai": {
        "apiKey": "${OPENAI_API_KEY}",
        "defaultModel": "gpt-4o"
      }
    }
  }
}
```

## 选择建议

| 场景 | 推荐模型 |
|------|----------|
| 日常对话 | Claude 3.5 Sonnet |
| 代码生成 | GPT-4o |
| 离线使用 | Llama 3 70B |
| 低资源设备 | Phi-3 Mini |

## 成本优化

- 使用本地模型节省 API 费用
- 合理设置上下文长度
- 启用流式响应减少等待时间

---

*了解更多，请访问 [openclaw.ai](https://openclaw.ai)。*
