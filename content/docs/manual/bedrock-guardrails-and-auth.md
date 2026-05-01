---
title: Amazon Bedrock 的 AWS 凭据链与 Guardrails 应该怎么配
description: 基于最新官方 Amazon Bedrock 文档，整理 OpenClaw 接入 Bedrock 时的凭据链、区域设置、自动发现和 Guardrails 配置重点。
category: 功能
updatedAt: 2026-04-30
source: https://docs.openclaw.ai/providers/bedrock
sourceName: OpenClaw Docs
sourceType: official
tags: [bedrock, aws, providers, guardrails, auth, models]
---

# Amazon Bedrock 的 AWS 凭据链与 Guardrails 应该怎么配

最近官方对 Amazon Bedrock 这一页补得很完整，最关键的变化不是“又多一个 provider”，而是：

- Bedrock 在 OpenClaw 里已经有了更像正式企业接入的形态

尤其是 Guardrails 这一段，说明官方已经把：

- 内容过滤
- 主题拒绝
- 敏感信息过滤
- contextual grounding

正式放进了 provider 层治理面。

## 先记住 Bedrock 的几个核心属性

当前官方文档给出的关键事实是：

- provider：`amazon-bedrock`
- API：`bedrock-converse-stream`
- 鉴权：AWS SDK default credential chain
- 默认区域：`us-east-1`

这意味着它和一般 API key 型 provider 的最大差别是：

- Bedrock 不是主要靠单个 API key 驱动，而是更依赖 AWS 运行环境本身

## 为什么 AWS credential chain 这点很重要

这会直接影响你怎么理解问题来源。

当 Bedrock 调不通时，先别急着看模型本身，更该先排查：

- 环境变量
- shared config
- profile
- instance role

也就是说，Bedrock 更像基础设施接入，而不是单纯模型接入。

## 最小环境变量长什么样

官方当前文档里的最小路径大致是：

```bash
export AWS_ACCESS_KEY_ID="AKIA..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_REGION="us-east-1"
```

可选项还包括：

- `AWS_SESSION_TOKEN`
- `AWS_PROFILE`
- `AWS_BEARER_TOKEN_BEDROCK`

这里最容易混淆的一点是：

- bearer token 不是唯一入口
- IAM / shared config 仍然是正式路径

## 自动发现模型这件事为什么有价值

官方现在明确写到，OpenClaw 可以自动发现：

- 支持 streaming
- 支持文本输出

的 Bedrock 模型。

这会降低第一次接入成本，但不代表你就可以完全跳过模型治理。  
自动发现解决的是：

- 先连上

不是：

- 长期模型策略就自动合理

## Guardrails 这次是真正值得单独补文档的部分

官方当前配置形态大致是：

```json
{
  "plugins": {
    "entries": {
      "amazon-bedrock": {
        "config": {
          "guardrail": {
            "guardrailIdentifier": "abc123",
            "guardrailVersion": "1",
            "streamProcessingMode": "sync",
            "trace": "enabled"
          }
        }
      }
    }
  }
}
```

几个关键字段里，最重要的是：

- `guardrailIdentifier`
- `guardrailVersion`

这说明 Guardrails 不是泛泛开关，而是显式绑定到某个 guardrail 对象和版本。

## `streamProcessingMode` 和 `trace` 该怎么理解

官方现在给了两个更适合运维视角的参数：

- `streamProcessingMode`
- `trace`

更稳的使用方式通常是：

- 生产默认更克制
- 只有在排查或验收时再打开更强 trace

不要把高可见度 trace 当成长期开启默认值。

## IAM 权限这一层不要漏

官方当前特别提醒：

- 运行 gateway 的 IAM principal 需要 `bedrock:ApplyGuardrail`

也就是说，就算模型调用权限没问题，如果 Guardrail 权限没配齐，最终也还是会表现成：

- 看起来 provider 能连，但治理层不生效

这类问题如果不先看 IAM，很容易排偏。

## 中文团队更适合怎么落地

更稳的顺序通常是：

1. 先用最小 AWS 凭据链跑通 Bedrock
2. 再确认区域、模型发现和基本推理正常
3. 然后再单独接 Guardrails
4. 最后才把 trace 和更严格策略带入正式环境

如果一开始就把：

- provider 接入
- 模型发现
- guardrail
- IAM

一起改，很难知道到底是哪层出了问题。

## 最容易踩的坑

### 1. 把 Bedrock 当成普通 API key provider

实际上它更像 AWS 环境接入面。

### 2. 模型能调通就以为 Guardrails 已经生效

两者不是同一层。

### 3. 忘了 IAM 的 `bedrock:ApplyGuardrail`

这会让 Guardrails 看起来“配置了但没工作”。

## 下一步推荐

- [OpenClaw 的 Models 应该怎么理解](/docs/manual/models-overview)
- [模型策略与成本](/docs/operations/model-strategy-and-cost)
- [Provider 故障时先按恢复阶梯排，不要直接乱切模型](/best-practices/provider-recovery-ladder)

