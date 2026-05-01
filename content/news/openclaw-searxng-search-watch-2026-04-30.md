---
title: "OpenClaw 把 SearXNG 推进 bundled web_search provider，搜索层开始更适合自托管"
description: "官方近期上线的 SearXNG Search 文档，说明 OpenClaw 的 web_search 已经不只适合外部 API，也开始正式支持自托管聚合搜索。"
category: "生态观察"
date: "2026-04-30"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/tools/searxng-search"
updatedAt: "2026-04-30"
sourceType: "official"
tags: ["searxng", "search", "web-search", "self-hosted", "tools"]
---

OpenClaw 最近把 SearXNG 写成了正式文档，这个动作本身就说明：

- 官方开始认真对待自托管搜索层

而不是只把联网搜索理解成“接一个第三方 API”。

## 1. SearXNG 进入主线，意味着 web_search 的想象空间变了

一旦 SearXNG 成为 bundled provider，OpenClaw 的联网搜索就多了一条很不同的路径：

- 你可以自己控制搜索实例
- 你可以自己决定上游聚合策略
- 你不一定需要单独 API key

这对私有化和长期运营都更友好。

## 2. 对中文团队来说，这比单纯“多一个 provider”更有价值

因为很多团队真正在意的是：

- 成本
- 稳定性
- 边界可控

SearXNG 恰好落在这三个点上。

## 3. 它也说明 OpenClaw 正在把搜索层做成可治理基础设施

当官方开始写：

- Docker 起实例
- `SEARXNG_BASE_URL`
- provider 配置

本质上是在承认：

- 搜索不是附属功能，而是值得长期治理的一层

## 推荐延伸阅读

- [用 SearXNG 给 OpenClaw 配自托管 web_search](/docs/manual/searxng-search-provider)
- [Provider 故障时先按恢复阶梯排，不要直接乱切模型](/best-practices/provider-recovery-ladder)

