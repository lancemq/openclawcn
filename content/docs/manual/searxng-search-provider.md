---
title: 用 SearXNG 给 OpenClaw 配自托管 web_search
description: 基于最新官方 SearXNG Search 文档，整理 OpenClaw 如何接入自托管 SearXNG 作为 web_search provider，以及生产环境里最该注意哪些边界。
category: 功能
updatedAt: 2026-04-30
source: https://docs.openclaw.ai/tools/searxng-search
sourceName: OpenClaw Docs
sourceType: official
tags: [searxng, web-search, tools, search, self-hosted]
---

# 用 SearXNG 给 OpenClaw 配自托管 web_search

最近官方把 SearXNG 单独做成了 `web_search` provider 文档，这件事很重要，因为它把：

- 自托管搜索
- 无 key 搜索
- 多搜索引擎聚合

正式纳入了 OpenClaw 的一等接入面。

## 为什么这件事值得单独看

很多人以前理解 `web_search` 时，默认会想到：

- 第三方 API
- 单一搜索引擎
- 一套固定成本

但 SearXNG 这条路代表另一种思路：

- 搜索本身由你控制
- OpenClaw 只把它当作 `web_search` provider

这对中文用户尤其有价值，因为很多团队更在意：

- 成本
- 私有化
- 可替换性

## 最小接入方式

官方当前给出的最短链路很直接：

```bash
docker run -d -p 8888:8080 searxng/searxng
export SEARXNG_BASE_URL="http://localhost:8888"
openclaw configure --section web
```

或者直接写配置：

```json
{
  "tools": {
    "web": {
      "search": {
        "provider": "searxng"
      }
    }
  }
}
```

这意味着：

- OpenClaw 侧的接入几乎是 provider 选择问题
- 复杂度主要在你如何运行和暴露 SearXNG

## `SEARXNG_BASE_URL` 和 plugin config 怎么分

官方现在给了两层入口：

- 环境变量自动发现
- plugin-level config

更稳的理解是：

- 环境变量适合先跑通
- plugin config 适合长期固定化

如果团队里有多个环境，最后最好还是回到正式配置里，不要一直依赖 shell 临时变量。

## 这条 provider 真正适合哪些场景

SearXNG 更适合下面几类用户：

- 想尽量减少外部 API 依赖
- 已经在自有主机或内网里运营搜索代理
- 需要可控的上游来源组合
- 希望把搜索能力纳入团队自己的运维边界

如果你只是偶尔用一下联网搜索，可能不一定非要先上 SearXNG。  
但如果你已经准备把搜索变成常驻能力，它很值得优先看。

## 生产部署时最该注意什么

官方文档虽然重点在接入，但对长期运行来说，真正关键的是这几层：

- SearXNG 实例本身是否稳定
- 上游引擎策略是否可控
- 内外网暴露面怎么收
- 网关到 SearXNG 的网络边界如何定义

也就是说，OpenClaw 这边的配置不复杂，真正容易出问题的是：

- 你把搜索 provider 放在什么网络位置

## 为什么不要把它当“免配置万能搜索”

SearXNG 的优势是灵活，不是免维护。

你需要额外考虑：

- 上游搜索源质量
- 某些引擎的限流或不稳定
- 结果一致性
- 自己这层实例的可观测性

所以更稳的心智不是：

- 装了就等于联网搜索自动完美

而是：

- 你在为 `web_search` 引入一层自己掌控的搜索网关

## 中文团队更适合怎么落地

更稳的顺序通常是：

1. 本地起一个最小 SearXNG 实例
2. 先确认 `web_search` 工具确实已切到 `searxng`
3. 再决定是否要把它放到共享主机或内网服务里
4. 最后才做更正式的搜索治理和上游组合

这比一上来就上生产实例更容易定位问题。

## 最容易踩的坑

### 1. 以为环境变量设上就等于 provider 已切换

更稳的做法还是确认：

- `tools.web.search.provider` 最终是不是 `searxng`

### 2. 把搜索异常都怪到 OpenClaw

有些问题其实发生在：

- SearXNG 实例
- 上游引擎
- 网络边界

### 3. 把它直接暴露成公网弱保护服务

如果 SearXNG 是你的内部搜索代理，就应该把它当正式服务来保护。

## 下一步推荐

- [OpenClaw 核心能力总览](/docs/manual/core-capabilities)
- [Provider 故障时先按恢复阶梯排，不要直接乱切模型](/best-practices/provider-recovery-ladder)
- [SearXNG Search](https://docs.openclaw.ai/tools/searxng-search)

