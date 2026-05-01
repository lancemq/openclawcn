---
title: "OpenClaw 2026.4.1 发布：/tasks、SearXNG、Bedrock Guardrails 和 Feishu 评论流进入主线"
description: "2026 年 4 月 1 日的 OpenClaw 2026.4.1 版本，把后台任务板、SearXNG 搜索、Bedrock Guardrails 和 Feishu Drive 评论流一起推进到了更成熟的位置。"
category: "产品更新"
date: "2026-04-01"
author: "OpenClawCN"
source: "https://github.com/openclaw/openclaw/releases/tag/v2026.4.1"
updatedAt: "2026-04-30"
sourceType: "github"
tags: ["release", "tasks", "searxng", "bedrock", "feishu", "guardrails"]
---

OpenClaw 在 2026 年 4 月 1 日发布了 `2026.4.1`。  
这一版最值得注意的不是单点修复，而是几条能力线同时进入了“更适合长期使用”的阶段。

## 这版最值得记住的 5 个变化

根据官方 release notes，这一版最重要的新增包括：

- `/tasks` 聊天内后台任务板
- SearXNG 作为 bundled `web_search` provider
- Amazon Bedrock Guardrails 支持
- macOS Voice Wake 可触发 Talk Mode
- Feishu Drive 评论事件流与 comment actions

把这五项放在一起看，你会发现 OpenClaw 正在同时强化：

- 后台工作可见性
- 自托管搜索
- provider 治理
- 多模态入口
- 企业协作接入

## 1. `/tasks` 让后台工作第一次更像正式系统面

这次 release 里最容易被低估的是：

- `/tasks` 不只是一个聊天命令

它代表 OpenClaw 现在开始把 ACP、subagent、cron 和 CLI detached work 统一收进 task ledger。

这对长期运行用户非常关键，因为以后“后台到底做了什么”不必再只靠聊天回复猜。

## 2. SearXNG 说明搜索层也开始支持更稳的自托管路径

这版把 SearXNG 放进 bundled `web_search` provider，意味着：

- 联网搜索不再只适合走外部 API

而是开始正式支持：

- 自托管
- key-free
- 可控上游聚合

这对中文团队和私有化部署都很有吸引力。

## 3. Bedrock Guardrails 说明 provider 治理正在前移

Guardrails 这项支持说明官方不再只关注：

- 模型能不能调通

而是在把：

- 内容过滤
- 主题拒绝
- 敏感信息过滤

推进到 provider 配置面。

这通常是产品从“能跑”走向“能控”的信号。

## 4. Feishu Drive 评论流说明飞书入口正在进入协作文档面

这一版最有中文环境意义的变化之一，就是：

- Feishu 不再只是一条聊天渠道

官方已经把 Drive comment event、comment thread context 和 `feishu_drive.reply_comment` 这些动作写进主线，说明 OpenClaw 已经在往：

- 文档协作
- 评论驱动流转

这类企业协作面延伸。

## 5. Voice Wake 继续强化“不是只有文字入口”

macOS Voice Wake 现在可以直接触发 Talk Mode，意味着：

- 语音入口正在变得更自然

它不只是单独的语音功能，而是在继续把 OpenClaw 做成多入口系统。

## 对中文站最直接的影响

这版 release 会直接影响我们站里哪些内容值得补？

至少有四类：

- task 体系
- SearXNG 搜索
- Bedrock Guardrails
- Feishu 协作文档流

也就是说，2026.4.1 不是那种“修几个边角”的版本，而是一版很适合补教程和补站内主题页的版本。

## 推荐延伸阅读

- [Background Tasks、/tasks 与 task flow 应该怎么用](/docs/manual/background-tasks-and-task-board)
- [用 SearXNG 给 OpenClaw 配自托管 web_search](/docs/manual/searxng-search-provider)
- [Feishu 扫码接入、群控边界与 Drive 评论流](/docs/manual/feishu-qr-login-and-drive-comments)
- [Amazon Bedrock 的 AWS 凭据链与 Guardrails 应该怎么配](/docs/manual/bedrock-guardrails-and-auth)

