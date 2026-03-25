---
title: include 合并时，数组和 sibling override 到底怎么生效
description: 基于最新官方 Configuration 文档，解释 OpenClaw 在 $include 合并时数组、对象和 sibling keys 的真实处理顺序，帮助团队避免把 include 当成“总是深合并”的黑盒。
category: 参考
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/gateway/configuration
sourceName: OpenClaw Docs
sourceType: official
tags: [configuration, include, merge, arrays, reference]
---

# include 合并时，数组和 sibling override 到底怎么生效

站里已经有一页在讲配置热重载和 include，但最近官方文档里还有一层非常值得单独拆开的边界：

- include 并不是“任何内容都无脑深合并”

尤其是：

- 数组怎么处理
- sibling keys 在什么阶段覆盖

这两件事如果不分清，团队环境最容易出现“我明明 include 了，为什么最后配置不是我以为的样子”。

## 先记住最重要的两句话

- 对象可以按顺序深度合并
- 数组通常不是追加，而更接近替换

更准确地说，OpenClaw 的 include 更像：

- 有规则的组合模型

而不是：

- 把几份 JSON 魔法拼接

## 单文件 include 和多文件 include 不是一回事

根据当前官方文档：

- 单文件 include：更接近先把那个对象整体放进来
- 多文件 include：按顺序依次合并，后者覆盖前者

所以如果你把一条 include 从单文件改成多文件，最后结果可能会明显变化。

## sibling keys 在什么时候生效

这是很多人最容易忽略的一层。

官方当前文档明确说明：

- sibling keys 会在 include 之后再覆盖

也就是说，更稳的理解顺序是：

1. 先解析 include
2. 先得到合并后的基础对象
3. 再用当前对象里并列写下的字段覆盖

这意味着 sibling keys 本质上更像：

- 局部最终修正层

## 数组为什么值得单独警惕

团队最容易误判的通常不是对象字段，而是数组。

比如你可能直觉会以为：

- 两份 include 里的数组会自动拼起来

但更稳的预期应该是：

- 数组更接近后者替换前者

这对：

- allowlist
- flags
- 模型 fallback 列表
- 某些 hooks / routing 列表

尤其重要。

## 为什么官方会这样设计

因为如果数组也默认做智能追加，长期运维里会更难判断：

- 这一项到底从哪来的
- 为什么重复了
- 为什么顺序变了

对正式配置系统来说，可预测性通常比“自动帮你拼起来”更重要。

## 一个更稳的拆分方式

如果你准备长期用 include，更适合这样拆：

- 对象型稳定默认：放 base include
- 环境差异：放 env include
- 当前实例最终修正：留给 sibling keys

而不要期望靠多个 include 去“自然叠加很多数组条目”。

## 最容易踩的坑

### 1. 以为数组会自动叠加

最后经常得到的是覆盖，不是拼接。

### 2. 以为 sibling keys 先于 include 生效

真实顺序恰好相反。

### 3. 用 include 叠很多局部小碎片

最后虽然没报错，但已经没人能快速判断最终配置长什么样。

## 一条更稳的判断顺序

看 include 配置时，建议按这个顺序想：

1. 这是对象还是数组
2. 这是单文件 include 还是多文件 include
3. 后面有没有 sibling keys 再覆盖
4. 最终是不是仍然容易让团队读懂

## 下一步推荐

- [配置热重载与 include 合并怎么用](/docs/operations/config-hot-reload-and-includes)
- [环境变量从哪里来，优先级怎么排](/docs/reference/env-sources-and-precedence)
- [正式配置、环境变量和一次性 override 应该怎么分层](/best-practices/config-layering-and-oneoff-overrides)

