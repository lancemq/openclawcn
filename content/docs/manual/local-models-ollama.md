---
title: 本地模型支持（Ollama）
description: 使用 Ollama 在本地运行大语言模型，实现隐私优先、零成本的 AI 助手体验。
category: 功能
updatedAt: 2026-03-13
sourceType: official
tags: [ollama, local-model, llm, privacy, self-hosted]
---

# 本地模型支持（Ollama）

Ollama 是 OpenClaw 官方支持的本地模型提供商之一。通过 Ollama，你可以在自己的机器上运行大语言模型，实现完全离线、隐私优先的 AI 助手体验。

## 为什么使用本地模型

| 优势 | 说明 |
|------|------|
| **隐私保护** | 数据不离开本地，适合敏感任务 |
| **零成本** | 无 API 调用费用，长期使用成本为零 |
| **离线可用** | 无需网络连接，随时随地使用 |
| **无限制** | 无速率限制、无内容审查 |
| **可定制** | 可加载自定义模型和微调模型 |

## 安装 Ollama

### macOS

```bash
# 官方安装脚本
curl -fsSL https://ollama.com/install.sh | sh

# 或使用 Homebrew
brew install ollama
```

### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Windows

下载安装包：https://ollama.com/download/windows

### 验证安装

```bash
ollama --version
```

## 启动 Ollama 服务

```bash
# 启动服务
ollama serve

# 或作为后台服务运行
# macOS/Linux: 通常安装后会自动启动
# Windows: 通过系统托盘管理
```

默认监听地址：`http://localhost:11434`

## 下载模型

### 推荐模型

| 模型 | 大小 | 内存需求 | 适用场景 |
|------|------|----------|----------|
| `llama3.2` | 2GB | 4GB | 轻量对话、快速响应 |
| `llama3.1:8b` | 4.7GB | 8GB | 平衡性能与质量 |
| `llama3.1:70b` | 40GB | 48GB | 高质量推理 |
| `qwen2.5:7b` | 4.7GB | 8GB | 中文优化 |
| `qwen2.5:14b` | 9GB | 16GB | 中文高质量 |
| `mistral` | 4.1GB | 8GB | 通用对话 |
| `codellama` | 4.7GB | 8GB | 代码生成 |
| `deepseek-coder` | 4.7GB | 8GB | 代码专用 |

### 下载命令

```bash
# 下载 Llama 3.2
ollama pull llama3.2

# 下载 Qwen 2.5（中文优化）
ollama pull qwen2.5:7b

# 下载 Mistral
ollama pull mistral

# 查看已下载模型
ollama list
```

### 测试模型

```bash
# 直接对话测试
ollama run llama3.2

# 退出对话
/bye
```

## 配置 OpenClaw 使用 Ollama

### 方式一：通过配置文件

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "providers": {
    "ollama": {
      "enabled": true,
      "baseUrl": "http://localhost:11434",
      "models": ["llama3.2", "qwen2.5:7b", "mistral"]
    }
  },
  "model": {
    "default": "ollama/llama3.2",
    "fallback": "ollama/qwen2.5:7b"
  }
}
```

### 方式二：设置默认 Agent 模型

```json
{
  "agent": {
    "default": {
      "name": "本地助手",
      "model": "ollama/llama3.2",
      "systemPrompt": "你是一个有帮助的本地助手，运行在用户的设备上。"
    }
  }
}
```

### 方式三：混合配置（云端 + 本地）

```json
{
  "providers": {
    "openai": {
      "enabled": true,
      "apiKey": "${OPENAI_API_KEY}"
    },
    "ollama": {
      "enabled": true,
      "baseUrl": "http://localhost:11434"
    }
  },
  "modelStrategy": {
    "chat": "openai/gpt-4",
    "summarization": "ollama/llama3.2",
    "fallback": {
      "enabled": true,
      "order": ["openai", "ollama"]
    }
  }
}
```

## 模型命名规则

在 OpenClaw 中使用 Ollama 模型时，采用 `ollama/模型名` 格式：

```json
{
  "model": "ollama/llama3.2"
}
```

支持的格式：

| Ollama 模型名 | OpenClaw 配置 |
|---------------|---------------|
| `llama3.2` | `ollama/llama3.2` |
| `llama3.1:8b` | `ollama/llama3.1:8b` |
| `qwen2.5:7b` | `ollama/qwen2.5:7b` |

## 高级配置

### 自定义 Ollama 地址

如果 Ollama 运行在其他地址：

```json
{
  "providers": {
    "ollama": {
      "enabled": true,
      "baseUrl": "http://192.168.1.100:11434"
    }
  }
}
```

### 环境变量配置

```bash
# 设置 Ollama 服务地址
export OLLAMA_HOST=0.0.0.0:11434

# 设置模型存储路径
export OLLAMA_MODELS=~/.ollama/models

# 设置并发请求数
export OLLAMA_NUM_PARALLEL=4
```

### GPU 加速

Ollama 自动检测并使用 GPU：

- **macOS**: 自动使用 Metal (Apple Silicon)
- **Linux**: 自动使用 CUDA (NVIDIA GPU)
- **Windows**: 自动使用 CUDA 或 ROCm

检查 GPU 使用情况：

```bash
# NVIDIA
nvidia-smi

# 或查看 Ollama 日志
ollama logs
```

## 性能优化

### 内存配置

```bash
# 设置模型加载到 GPU 的层数
# 值越大，GPU 使用越多，速度越快
export OLLAMA_NUM_GPU=35

# 设置上下文窗口大小
export OLLAMA_CONTEXT_LENGTH=4096
```

### 批处理优化

```json
{
  "providers": {
    "ollama": {
      "enabled": true,
      "options": {
        "num_ctx": 4096,
        "num_batch": 512,
        "num_thread": 8
      }
    }
  }
}
```

## 中文模型推荐

针对中文用户，推荐以下模型：

### Qwen 2.5 系列

```bash
# 7B 版本（推荐）
ollama pull qwen2.5:7b

# 14B 版本（更高质量）
ollama pull qwen2.5:14b

# 32B 版本（需要更多资源）
ollama pull qwen2.5:32b
```

### DeepSeek 系列

```bash
# 通用版本
ollama pull deepseek-v2:16b

# 代码专用
ollama pull deepseek-coder:6.7b
```

## 常见问题

### Ollama 服务无法启动

```bash
# 检查端口是否被占用
lsof -i :11434

# 手动启动
ollama serve
```

### 模型下载失败

```bash
# 检查网络连接
ping ollama.com

# 使用代理
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
ollama pull llama3.2
```

### 内存不足

```bash
# 使用更小的模型
ollama pull llama3.2:1b

# 或使用量化版本
ollama pull llama3.1:8b-q4_0
```

### 响应速度慢

1. 确认 GPU 是否被正确使用
2. 尝试更小的模型
3. 减少 `num_ctx` 参数
4. 增加系统内存

### OpenClaw 无法连接 Ollama

```bash
# 确认 Ollama 正在运行
curl http://localhost:11434/api/tags

# 检查 OpenClaw 配置中的 baseUrl
# 确保地址和端口正确
```

## 使用场景建议

### 适合本地模型的场景

- 隐私敏感的对话和文档处理
- 离线环境使用
- 高频简单任务（减少 API 成本）
- 开发和测试
- 学习和实验

### 不适合本地模型的场景

- 需要最强推理能力的复杂任务
- 多模态任务（图像、音频处理）
- 需要最新知识库的任务
- 对响应质量要求极高的生产环境

## 混合策略建议

最佳实践是结合云端和本地模型：

```json
{
  "modelStrategy": {
    "chat": "openai/gpt-4",
    "summarization": "ollama/llama3.2",
    "draft": "ollama/qwen2.5:7b",
    "fallback": {
      "enabled": true,
      "order": ["openai", "anthropic", "ollama"]
    }
  }
}
```

这样可以在保证质量的同时，降低成本并增加可用性。

## 下一步

- [模型提供商与故障转移](/docs/manual/providers-and-fallback)
- [模型选型与成本控制](/docs/operations/model-strategy-and-cost)
- [配置参考](/docs/reference/configuration-reference)