---
title: 模型提供商与故障转移
description: 基于官方 providers 文档，整理 OpenClaw 常见 provider、默认模型写法、fallback 思路和长期运行时的配置重点。
category: 功能
updatedAt: 2026-03-17
source: https://docs.openclaw.ai/zh-CN/providers
sourceName: OpenClaw Docs
sourceType: official
tags: [providers, models, fallback, openrouter, ollama]
---

# 模型提供商与故障转移

本站已经有“模型怎么选”的中文说明，但对官方 provider 体系、模型命名方式和 fallback 机制还不够完整。官方中文站现在把 providers 作为一个独立总入口，这说明模型问题在 OpenClaw 里不只是“选哪家强”，而是正式的系统配置层。

## OpenClaw 的模型写法是什么

官方文档给出的默认模型写法是：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-opus-4-5"
      }
    }
  }
}
```

它的核心规则很简单：

- 使用 `provider/model` 形式
- 先认证 provider
- 再把默认模型指到对应 provider 下的具体模型

这比只写“模型名”更稳，因为它把提供商边界写明了。

## 官方 provider 范围比很多人想象的大

根据官方中文 providers 页面截至 2026 年 3 月 17 日的目录，OpenClaw 不只是支持少数几家常见云模型。页面里明确列出的包括：

- Anthropic
- Amazon Bedrock
- Claude Max API 代理（社区工具）
- Deepgram（转录）
- GitHub Copilot
- GLM Models
- MiniMax
- Moonshot AI
- OpenCode
- Ollama
- OpenAI
- OpenRouter
- Qianfan
- Qwen
- Synthetic
- Venice AI
- Vercel AI Gateway
- Xiaomi MiMo
- Z.AI

而当前 providers 列表里还额外出现了：

- Cloudflare AI Gateway
- Hugging Face
- Kilocode
- LiteLLM
- Mistral
- NVIDIA
- Together AI
- vLLM

还有专门的转录提供商，例如 Deepgram。

这意味着“接 provider”本身已经是一个正式能力面，而不是第三方折腾。

## 官方现在把“统一网关型 provider”单独做出来了

最新 providers 页里已经不只是列 API 厂商，而是把下面这些也单独列入正式路径：

- LiteLLM
- Cloudflare AI Gateway
- Vercel AI Gateway

这说明 OpenClaw 已经把“上游模型厂商”和“统一网关/路由层”都当成正式 provider 入口来处理。

对长期运行来说，这特别有意义，因为它让你可以把：

- 成本统计
- 路由
- 缓存
- 多上游切换

放到更清晰的一层里理解。

## 官方对 Venice 的定位仍然很明确

中文 provider 文档里把 Venice 单独做了亮点推荐，用于隐私优先推理，并给出了默认模型和更强组合。

这说明官方并不只在推 OpenAI 或 Anthropic，而是在强调不同 provider 适合不同目标：

- 隐私
- 成本
- 稳定性
- 本地化或区域可达性

## Transcription provider 现在也不该和聊天 provider 混着理解

截至 2026 年 3 月 17 日，官方 providers 总页已经把 **Deepgram** 单独列到“转录提供商”部分。

这意味着：

- 聊天主模型 provider 是一层
- embeddings / memory 可能是另一层
- 音频转录 provider 又是另一层

所以“我已经配好了模型”并不等于“语音 / 转录 / 记忆相关 provider 都已经完整配置”。

## 为什么 fallback 应该被当成正式配置

虽然 provider 总览页更偏目录，但结合官方其他文档可以看出，长期运行环境里默认只依赖一个 provider 风险很高。

更适合的理解方式是：

- `primary` 负责主路径
- `fallback` 负责 provider 波动、限速或临时不可用时的兜底

尤其在真实渠道已经接入时，fallback 不是锦上添花，而是减少单点故障的基本手段。

## 本地 Ollama 在体系里是什么角色

官方把 Ollama 放进正式 provider 目录里，这一点很重要。它说明本地模型不是“站外玩法”，而是官方认可的提供商路径之一。

更适合本地模型的场景通常是：

- 实验
- 隐私敏感任务
- 预算有限时的补充
- 某些低风险离线路径

但如果你需要稳定工具调用和长期高质量主会话，仍然更适合保留一个稳定云端主 provider。

## Provider 认证和聊天授权不要混淆

官方其他页面已经多次体现出一条边界：聊天能用，不代表所有 provider 相关能力都自动可用。

例如：

- 聊天主模型认证
- embeddings 认证
- 转录 provider
- 远程或代理 provider

都可能是分开的，而且最新官方目录已经用页面结构把这件事表现得更清楚了。

所以“已经能聊天了”不等于“记忆搜索、本地转录和 fallback 都配置好了”。

## 更稳的 provider 配置顺序

如果你准备做长期运行，建议按这个顺序：

1. 先选一个主 provider
2. 确认认证和默认模型都正常
3. 再加一个 fallback
4. 最后再补本地模型或区域性 provider

不要一开始就把很多 provider 一起堆上去，否则排错会非常痛苦。

## 中文站建议怎么理解 provider 页面

官方 provider 总页更像一个“能力目录”，不是最终配置教程。更适合的使用方式是：

1. 先从总页确认支持哪些 provider
2. 再按你所在地区、预算和任务类型选几家
3. 最后再回到本站的模型策略文档做主力/fallback 设计

## 一个更贴近 2026 年 3 月官方目录的理解方式

如果你要快速给当前 provider 体系分层，可以这样看：

- **直接上游**：Anthropic、OpenAI、Moonshot、MiniMax、Qwen、GLM、Z.AI、Xiaomi 等
- **统一网关**：LiteLLM、Cloudflare AI Gateway、Vercel AI Gateway、OpenRouter
- **本地 / 自托管**：Ollama、vLLM
- **补充能力**：Deepgram 这类转录 provider
- **社区或兼容层**：Claude Max API Proxy、Synthetic 等

## 下一步推荐

- [OpenClaw 的 Models 应该怎么理解](/docs/manual/models-overview)
- [模型选型与成本控制](/docs/operations/model-strategy-and-cost)
- [记忆搜索与索引机制](/docs/manual/memory-search-and-indexing)
- [Gateway 运维与日常检查](/docs/operations/gateway-operations)
