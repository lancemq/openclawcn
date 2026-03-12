---
title: "OpenClaw 本地模型支持全面升级"
description: "OpenClaw 现已支持更多本地大语言模型，包括 Llama 3、Mistral、Qwen 等，让用户在保护隐私的同时享受 AI 能力。"
category: 产品更新
date: "2026-03-05"
author: "OpenClaw Team"
source: "github.com/openclaw/openclaw"
updatedAt: "2026-03-12"
sourceType: github
tags: ["local-model", "privacy", "llama", "mistral", "ollama"]
---

OpenClaw 宣布本地模型支持全面升级，用户现在可以更方便地使用本地大语言模型，在保护数据隐私的同时享受完整的 AI 助手能力。

## 支持的本地模型

### 推荐模型

| 模型 | 参数量 | 内存需求 | 特点 |
|------|--------|----------|------|
| Llama 3.1 | 8B/70B | 8GB/40GB | 综合能力强 |
| Mistral | 7B | 8GB | 效率高 |
| Qwen 2.5 | 7B/14B | 8GB/16GB | 中文友好 |
| Phi-3 | 3.8B | 4GB | 轻量级 |
| Gemma 2 | 9B | 10GB | 安全可靠 |

### 模型选择建议

| 使用场景 | 推荐模型 | 理由 |
|----------|----------|------|
| 日常对话 | Mistral 7B | 响应快，效果好 |
| 中文任务 | Qwen 2.5 | 中文理解优秀 |
| 代码辅助 | Llama 3.1 | 代码能力强 |
| 低配置设备 | Phi-3 | 资源占用少 |
| 企业部署 | Llama 3.1 70B | 能力全面 |

## 配置方式

### 使用 Ollama

Ollama 是最简单的本地模型运行方式：

```bash
# 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 下载模型
ollama pull llama3.1
ollama pull mistral
ollama pull qwen2.5

# 启动服务
ollama serve
```

### OpenClaw 配置

```json
{
  "providers": {
    "ollama": {
      "enabled": true,
      "baseUrl": "http://localhost:11434",
      "models": ["llama3.1", "mistral", "qwen2.5"]
    }
  },
  "model": {
    "default": "ollama:llama3.1",
    "fallback": "ollama:mistral"
  }
}
```

### 使用 vLLM

对于高性能部署：

```bash
# 安装 vLLM
pip install vllm

# 启动服务
vllm serve meta-llama/Llama-3.1-8B-Instruct --port 8000
```

配置：

```json
{
  "providers": {
    "vllm": {
      "enabled": true,
      "baseUrl": "http://localhost:8000",
      "models": ["Llama-3.1-8B-Instruct"]
    }
  }
}
```

## 性能优化

### 硬件建议

| 配置级别 | CPU | 内存 | GPU | 适用模型 |
|----------|-----|------|-----|----------|
| 入门 | 4核 | 8GB | 无 | Phi-3 |
| 标准 | 8核 | 16GB | RTX 3060 | Mistral, Qwen 7B |
| 高级 | 16核 | 32GB | RTX 4080 | Llama 3.1 8B |
| 专业 | 32核 | 64GB | RTX 4090 | Llama 3.1 70B (量化) |

### 量化选项

```json
{
  "localModel": {
    "quantization": {
      "enabled": true,
      "method": "4bit",
      "options": {
        "4bit": "最佳性能",
        "8bit": "平衡质量",
        "fp16": "最高质量"
      }
    }
  }
}
```

## 混合模式

OpenClaw 支持本地模型和云端模型混合使用：

```json
{
  "modelStrategy": {
    "chat": "ollama:llama3.1",
    "summarization": "ollama:mistral",
    "complex": "openai:gpt-4",
    "embedding": "ollama:nomic-embed"
  }
}
```

### 智能路由

根据任务复杂度自动选择模型：

```json
{
  "routing": {
    "simple": "ollama:mistral",
    "medium": "ollama:llama3.1",
    "complex": "openai:gpt-4",
    "thresholds": {
      "tokenCount": 2000,
      "complexity": "auto"
    }
  }
}
```

## 隐私优势

### 数据本地化

- 所有对话数据保留在本地
- 无需网络传输敏感信息
- 完全自主的数据控制

### 合规支持

- 满足数据本地化要求
- 支持行业合规需求
- 企业级隐私保护

## 常见问题

### 模型下载慢？

```bash
# 使用镜像源
export OLLAMA_MIRROR=https://mirror.example.com
ollama pull llama3.1
```

### 内存不足？

```bash
# 使用量化模型
ollama pull llama3.1:7b-q4

# 或调整上下文长度
ollama run llama3.1 --num-ctx 2048
```

### 响应慢？

- 检查 GPU 是否正确使用
- 尝试更小的模型
- 调整批处理大小

## 下一步

- [模型配置指南](/docs/manual/models-overview)
- [本地部署教程](/docs/setup/deployment-options)
- [性能优化建议](/best-practices/performance-tuning)