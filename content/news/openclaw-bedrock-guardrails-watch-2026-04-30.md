---
title: "OpenClaw 的 Amazon Bedrock 接入开始把 Guardrails 正式推到 provider 层"
description: "官方近期完善的 Amazon Bedrock 文档，把 AWS credential chain、自动发现和 Guardrails 全部写到了同一页里，说明 Bedrock 正在从能接入走向能治理。"
category: "生态观察"
date: "2026-04-30"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/providers/bedrock"
updatedAt: "2026-04-30"
sourceType: "official"
tags: ["bedrock", "aws", "guardrails", "providers", "governance"]
---

官方最近把 Amazon Bedrock 文档补得更完整之后，一个很清楚的变化是：

- Bedrock 在 OpenClaw 里开始更像正式企业 provider

而不只是“又能接一个模型源”。

## 1. Guardrails 是这轮最值得注意的新增面

文档现在明确支持在 `amazon-bedrock` plugin config 下配置：

- `guardrailIdentifier`
- `guardrailVersion`
- `streamProcessingMode`
- `trace`

这说明官方正在把治理能力前移到 provider 层，而不是留到聊天层补救。

## 2. AWS credential chain 也让它和普通 API key provider 很不一样

Bedrock 的问题诊断路径天然更偏基础设施：

- env vars
- shared config
- instance role
- IAM 权限

这会让它更适合进入企业环境，但也意味着排障方式和普通模型源不一样。

## 3. `bedrock:ApplyGuardrail` 这类 IAM 细节值得被单独看见

官方现在把 Guardrail 相关权限写得更明确，这其实是在提醒用户：

- 模型能调通，不代表治理层已经工作

这是企业接入里很关键的一步成熟化。

## 推荐延伸阅读

- [Amazon Bedrock 的 AWS 凭据链与 Guardrails 应该怎么配](/docs/manual/bedrock-guardrails-and-auth)
- [模型策略与成本](/docs/operations/model-strategy-and-cost)

