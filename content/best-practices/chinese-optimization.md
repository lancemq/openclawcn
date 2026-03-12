---
title: OpenClaw 中文优化指南
description: 针对中文用户的 OpenClaw 优化配置，包括模型选择、提示词优化和中文技能推荐。
category: 最佳实践
difficulty: 中级
updatedAt: 2026-03-12
sourceType: third-party
tags: [chinese, optimization, localization, tips]
---

# OpenClaw 中文优化指南

本文为中文用户提供 OpenClaw 的优化配置建议，帮助获得更好的中文交互体验。

## 模型选择

### 推荐模型

| 模型 | 中文能力 | 推荐场景 |
|------|----------|----------|
| GPT-4 | ⭐⭐⭐⭐⭐ | 复杂任务、专业写作 |
| Claude 3 | ⭐⭐⭐⭐⭐ | 长文本、分析任务 |
| Qwen 2.5 | ⭐⭐⭐⭐⭐ | 本地部署、中文优先 |
| DeepSeek | ⭐⭐⭐⭐ | 代码、技术问答 |
| GLM-4 | ⭐⭐⭐⭐ | 国产模型、合规需求 |

### 配置示例

```json
{
  "providers": {
    "openai": {
      "models": ["gpt-4", "gpt-4-turbo"]
    },
    "anthropic": {
      "models": ["claude-3-opus", "claude-3-sonnet"]
    },
    "ollama": {
      "models": ["qwen2.5", "deepseek-coder"]
    }
  },
  "modelStrategy": {
    "chat": "gpt-4",
    "chinese": "qwen2.5",
    "code": "deepseek-coder"
  }
}
```

## 系统提示词优化

### 中文助手提示词

```markdown
你是一个专业的中文 AI 助手。

## 沟通风格
- 使用自然流畅的中文表达
- 避免翻译腔和生硬表达
- 适当使用中文习惯用语

## 回答原则
- 直接回答问题，避免冗长铺垫
- 使用清晰的段落和列表结构
- 必要时提供示例说明

## 特殊处理
- 技术术语保留英文或提供中英对照
- 代码注释使用中文
- 文件路径和命令保持原样
```

### 专业领域提示词

```markdown
你是一个专业的技术文档助手。

## 写作规范
- 使用简体中文
- 技术术语首次出现时标注英文
- 代码示例添加中文注释
- 步骤说明清晰明确

## 格式要求
- 使用 Markdown 格式
- 标题层级不超过三级
- 列表项简洁明了
```

## 中文技能推荐

### 信息获取

```json
{
  "skills": [
    "baidu-search",      // 百度搜索
    "zhihu-search",      // 知乎搜索
    "weibo-search",      // 微博搜索
    "bilibili-search"    // B站搜索
  ]
}
```

### 内容处理

```json
{
  "skills": [
    "chinese-nlp",       // 中文 NLP
    "pinyin-convert",    // 拼音转换
    "simplified-traditional", // 简繁转换
    "chinese-summarizer" // 中文摘要
  ]
}
```

### 本地服务

```json
{
  "skills": [
    "wechat-work",       // 企业微信
    "dingtalk",          // 钉钉
    "feishu",            // 飞书
    "aliyun-oss"         // 阿里云 OSS
  ]
}
```

## 渠道配置

### 飞书配置

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "${FEISHU_APP_ID}",
      "appSecret": "${FEISHU_APP_SECRET}",
      "encryptKey": "${FEISHU_ENCRYPT_KEY}",
      "messageFormat": "markdown"
    }
  }
}
```

### 企业微信配置

```json
{
  "channels": {
    "wechat-work": {
      "enabled": true,
      "corpId": "${WECHAT_CORP_ID}",
      "agentId": "${WECHAT_AGENT_ID}",
      "secret": "${WECHAT_SECRET}",
      "token": "${WECHAT_TOKEN}",
      "encodingAESKey": "${WECHAT_AES_KEY}"
    }
  }
}
```

## 性能优化

### 响应速度

```json
{
  "performance": {
    "streaming": true,
    "chunkSize": 50,
    "timeout": 30000
  }
}
```

### 缓存配置

```json
{
  "cache": {
    "enabled": true,
    "ttl": 3600,
    "maxSize": "100MB"
  }
}
```

## 常见问题

### 中文乱码

确保系统编码设置正确：

```bash
export LANG=zh_CN.UTF-8
export LC_ALL=zh_CN.UTF-8
```

### 分词效果差

安装中文分词工具：

```bash
pip install jieba
```

配置：

```json
{
  "nlp": {
    "tokenizer": "jieba",
    "language": "zh"
  }
}
```

### 时区问题

```json
{
  "timezone": "Asia/Shanghai",
  "dateFormat": "YYYY-MM-DD",
  "timeFormat": "HH:mm:ss"
}
```

## 下一步

- [模型配置详解](/docs/manual/models-overview)
- [飞书集成指南](/news/feishu-integration)
- [企业部署方案](/best-practices/enterprise-security)