---
title: "OpenClaw 正在把 provider、模型和远程执行分成不同治理层"
description: "官方最近围绕 Models、Model Failover 和 node 的文档更新，正在把 provider auth、模型 allowlist、多模态能力和远程 node 执行拆成更清楚的治理层。"
category: 生态观察
date: "2026-03-29"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/concepts/models"
updatedAt: "2026-03-29"
sourceType: "official"
tags: ["providers", "models", "nodes", "auth", "governance"]
---

最近把 OpenClaw 的 `Models`、`Model Failover` 和 `node` 文档放在一起看，会看到一个很清楚的趋势：

- provider auth 在被单独定义
- model allowlist 在被单独定义
- image / generation 能力在被单独定义
- remote node execution 又被单独放到更高风险层

这说明官方已经越来越不把“能调用模型”理解成一个单一能力，而是在把整套运行面拆成更清楚的治理层。

## 1. provider 故障转移已经不是“随便换号”

`Model Failover` 文档最近最重要的信号之一，是把 provider 内 auth profile rotation 和跨模型 fallback 明确分开了。

这意味着运行时处理失败时，先问的是：

- 同 provider 内还有没有可用 profile

而不是直接问：

- 要不要立刻切下一个模型

## 2. `agents.defaults.models` 已经明确是 allowlist

Models 文档现在直接把它定义成：

- allowlist / catalog

这会让模型配置不再只是“展示模型列表”，而变成：

- 真正控制哪些模型允许被切换和暴露

## 3. image 能力正在从聊天模型里拆出来

`imageModel` 和 `imageGenerationModel` 的职责被单独写清后，一个很现实的信号是：

- 多模态能力不该默认等同于聊天主模型

这对团队运维尤其重要，因为它意味着：

- 你可以先开放聊天
- 再单独决定要不要开放图像理解和图片生成

## 4. remote node 被放在更高风险的治理面

`openclaw node` 文档最近强调了几件事：

- node 暴露的是执行面
- 有 local exec approvals
- 还有 per-agent allowlists
- browser proxy 还能用 allowProfiles 收口

这说明官方已经在把 remote node 当成：

- 需要单独治理的远程执行层

而不是普通功能开关。

## 对中文站最有价值的提醒

如果你现在正在做：

- 多 provider 组合
- 团队统一模型入口
- 图片能力扩展
- 远程 node 或远程浏览器接入

那接下来最值得补的不是再接更多能力，而是先把这四层拆清。

## 推荐延伸阅读

- [认证配置文件怎么轮转，为什么 session 会“粘住”同一套凭据](/docs/reference/auth-profile-rotation-and-session-pinning)
- [模型 allowlist、alias 和图片能力门控应该怎么理解](/docs/manual/model-allowlists-and-capability-gating)
- [团队里怎么分层放开 provider、模型和 node 能力](/best-practices/provider-and-node-capability-lanes)
