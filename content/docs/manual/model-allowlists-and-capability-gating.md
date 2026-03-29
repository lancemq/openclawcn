---
title: 模型 allowlist、alias 和图片能力门控应该怎么理解
description: 基于最新官方 Models CLI 文档，整理 agents.defaults.models、primary、fallbacks、imageModel 和 imageGenerationModel 的职责，帮助团队理解模型白名单和共享能力门控到底会影响什么。
category: 使用说明
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/concepts/models
sourceName: OpenClaw Docs
sourceType: official
tags: [models, allowlist, aliases, image, gating, manual]
---

# 模型 allowlist、alias 和图片能力门控应该怎么理解

OpenClaw 最近的 Models CLI 文档有一个很重要的信号：  
模型配置已经不只是“默认用哪个模型”，而是在逐渐变成一层正式的能力门控。

官方当前把几组配置职责拆得很清楚：

- `agents.defaults.model.primary`
- `agents.defaults.model.fallbacks`
- `agents.defaults.models`
- `agents.defaults.imageModel`
- `agents.defaults.imageGenerationModel`

## primary 和 fallbacks 决定主路径

这两组最容易理解：

- `primary` 是默认主模型
- `fallbacks` 是主模型失效后按顺序尝试的后备模型

官方当前还明确写了一个顺序：

1. 先选 primary
2. 再按顺序尝试 fallbacks
3. provider 内的 auth failover 会先于跨模型 fallback 发生

所以 fallback 不是“先换账号”，而是：

- 当前 provider 内轮转完了，再换模型

## `agents.defaults.models` 不只是目录，它还是 allowlist

这是这页里最值得注意的一点。

官方现在明确说：

- `agents.defaults.models` 是 allowlist/catalog

也就是说，一旦你配置了它，它不只是给 `/model` 做展示目录，还会直接限制：

- `/model`
- session override

如果用户选了一个不在里面的模型，系统会直接返回：

- `Model "provider/model" is not allowed. Use /model to list available models.`

这也是很多人会误会成“机器人没回复”的原因。

## alias 的真实价值不是好看，而是收口入口

团队里真正有用的往往不是把所有模型原名都暴露出来，而是：

- 给固定入口起稳定 alias
- 把允许使用的模型集合收在少数几个别名后面

这样做的价值在于：

- 用户更容易记
- UI 入口更干净
- 迁移 provider 或小版本时，外层名字可以尽量不动

## imageModel 和 imageGenerationModel 是两层不同能力

官方最近把这两层区分也写得更清楚了。

### `imageModel`

它解决的是：

- 当主模型不支持图像输入时，用哪套模型来接图像理解

### `imageGenerationModel`

它解决的是：

- 共享图片生成能力应该走哪个 provider/model

这意味着“主模型能聊天”并不等于：

- 图像理解一定可用
- 图片生成一定可用

## 为什么这已经是“能力门控”，不只是模型设置

如果你把官方这几组键放在一起看，会发现它们已经在决定：

- 哪些模型能被用户手动切换
- 哪些 provider 能出现在模型选择器里
- 哪些图片相关能力可以真正落地

所以这层配置的本质更像：

- 能力边界声明

而不是：

- 纯展示目录

## 什么时候最容易踩“Model is not allowed”

常见场景通常有这些：

- 你给团队设了 allowlist，但忘了把新 fallback 加进去
- 你在聊天里手动切到 provider/model，结果它没进 allowlist
- 你只改了 `primary`，没同步更新 `agents.defaults.models`

这类问题发生时，更稳的排查顺序是：

1. 先看 `primary` 和 `fallbacks`
2. 再看 `agents.defaults.models` 里有没有这个 ref
3. 最后再看 alias 是否还指向旧模型

## 更稳的团队做法

长期运行里，更推荐这样分层：

- `primary` 决定默认主路径
- `fallbacks` 决定故障兜底
- `models` 决定用户可见和可切换范围
- `imageModel` / `imageGenerationModel` 单独管理多模态能力

这样你就不会把：

- 默认模型
- 图片能力
- 用户可切换范围

混成一团。

## 推荐延伸阅读

- [认证配置文件怎么轮转，为什么 session 会“粘住”同一套凭据](/docs/reference/auth-profile-rotation-and-session-pinning)
- [模型提供商与故障转移](/docs/manual/providers-and-fallback)
- [团队里怎么分层放开 provider、模型和 node 能力](/best-practices/provider-and-node-capability-lanes)
