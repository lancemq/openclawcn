---
title: vLLM 本地模型 Provider 怎么接
description: 基于最新官方 vLLM provider 文档，整理 OpenClaw 如何接入 vLLM、本地自动发现和手动模型声明各自适合什么场景。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/providers/vllm
sourceName: OpenClaw Docs
sourceType: official
tags: [vllm, local-models, providers, self-hosted, inference]
---

# vLLM 本地模型 Provider 怎么接

官方最近把 `vLLM` 单独列进正式 provider 目录，这一点很重要，因为它说明 OpenClaw 对“本地或自托管 OpenAI 兼容推理服务”的支持已经进入正式能力层。

如果你已经知道 Ollama，这页更适合你把 `vLLM` 理解成另一条路线：

- Ollama 更适合本机快速起步
- vLLM 更适合更明确的服务化推理
- OpenClaw 则把它们都当成正式 provider

## vLLM 在 OpenClaw 里的基本定位

官方文档当前给出的核心信息很清楚：

- provider 名称是 `vllm`
- 默认基址是 `http://127.0.0.1:8000/v1`
- 使用 `openai-completions` 接口适配
- 模型写法仍然是 `provider/model`

所以最小理解方式可以是：

- vLLM 负责暴露 OpenAI 兼容接口
- OpenClaw 负责把它纳入模型目录和默认模型配置

## 最快的接法：先让 OpenClaw 自动发现模型

官方现在支持一种很实用的“隐式 provider”方式：

1. 启动 vLLM 的 OpenAI 兼容服务
2. 设置 `VLLM_API_KEY`
3. 不显式声明 `models.providers.vllm`
4. 直接把默认模型写成 `vllm/你的模型 ID`

文档里特别提到，如果你的 vLLM 服务没启用鉴权，`VLLM_API_KEY` 甚至可以只是一个占位值。

这条路径的价值在于：你不用一开始就手写整段 provider 配置，特别适合先确认服务能不能跑通。

## 官方自动发现到底做了什么

在满足条件时，OpenClaw 会去查询：

```text
GET http://127.0.0.1:8000/v1/models
```

然后把返回的模型 ID 转成可选模型项。

这意味着自动发现更适合：

- 本机或固定地址的 vLLM
- 先验证服务联通性
- 模型列表会随 vLLM 实例变化的环境

如果你只是想尽快跑通一台本地推理机，这种方式会比先手写模型元数据轻很多。

## 什么时候更适合显式配置

官方文档也明确给了另一条路：手动声明 `models.providers.vllm`。

更适合手动配置的情况包括：

- vLLM 跑在别的主机或端口
- 你要自己控制 `contextWindow` 和 `maxTokens`
- 你的服务需要真实 API key
- 你希望把模型列表固定下来，避免自动发现带来的漂移

如果你已经进入团队环境或长期运行环境，通常就更适合走显式配置。

## 为什么它和 Ollama 不该混着理解

站里已经有 Ollama 中文页，但 vLLM 的适配边界并不一样。

根据当前官方文档，可以把两者大致这样理解：

- Ollama 走的是自己的原生接口能力
- vLLM 走的是 OpenAI 兼容接口能力
- vLLM 更像“服务化推理后端”
- Ollama 更像“本地模型运行时”

所以如果你在追求：

- 更可控的服务部署
- 更明确的模型服务入口
- 更接近统一推理后端的组织方式

那 vLLM 会比“只在本机起一个模型”更合适。

## 一个更容易理解的最小配置

如果你不走自动发现，而是手动配置，官方文档当前的关键字段可以压缩成这样理解：

```json
{
  "models": {
    "providers": {
      "vllm": {
        "baseUrl": "http://127.0.0.1:8000/v1",
        "apiKey": "${VLLM_API_KEY}",
        "api": "openai-completions",
        "models": [
          {
            "id": "your-model-id",
            "name": "Local vLLM Model",
            "contextWindow": 128000,
            "maxTokens": 8192
          }
        ]
      }
    }
  }
}
```

这里最值得记住的不是字段有多少，而是：

- `baseUrl` 要直指 `/v1`
- `api` 要和官方文档保持一致
- 模型 ID 要和 vLLM 返回值一致

## 排错时先看什么

官方页里给的第一个排错动作非常直接：

```bash
curl http://127.0.0.1:8000/v1/models
```

如果这一步都不通，后面通常就不是 OpenClaw 的问题，而是：

- vLLM 没启动
- 端口不对
- 路径不是 `/v1`
- API key 或 header 没对上

所以更稳的顺序始终是：

1. 先确认 `/v1/models` 可访问
2. 再确认 OpenClaw 能看到 provider
3. 最后才调默认模型和回退链路

## 中文站建议怎么选

如果你现在在本地模型这条线上选型，可以这样看：

- 想最快跑通本机模型：先看 [Ollama 本地模型接入](/docs/manual/local-models-ollama)
- 想做更服务化的本地推理：优先看 vLLM
- 想做多 provider 编排：再接 [模型提供商与故障转移](/docs/manual/providers-and-fallback)

把它们分层理解之后，就不太容易再把“本地模型运行时”和“统一模型 provider 配置”混成一件事。
