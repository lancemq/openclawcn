---
title: 先分清入口职责，再选 Dashboard、WebChat 还是 API
description: 结合最新官方 Dashboard、WebChat、Session 和 API 文档，整理一套更稳的入口选择矩阵，帮助团队在控制面、会话面和集成面之间少走弯路。
category: 使用实践
difficulty: 中级
updatedAt: 2026-03-26
source: https://docs.openclaw.ai/web/webchat
sourceName: OpenClaw Docs
sourceType: official
tags: [gateway, dashboard, webchat, api, decision]
---

# 先分清入口职责，再选 Dashboard、WebChat 还是 API

很多团队把 OpenClaw 接到一定程度后，会开始出现一种“入口泛滥”的困扰：

- Dashboard 也能看状态
- WebChat 也能聊
- API 也能调
- CLI 也能管

这时候真正需要的往往不是再多一个入口，而是一张职责矩阵。

## 1. 控制面问题优先交给 Dashboard

如果你的问题本质上是：

- 这个实例现在是不是活着
- auth / pairing / 设备状态正不正常
- operator 该如何进入

那更适合优先用：

- Dashboard / Control UI

不要先绕去聊天面或 API。

## 2. 会话验证优先交给 WebChat

如果你的问题本质上是：

- 模型能不能聊起来
- 流式回复和会话回流正不正常
- 选定 agent 的主会话入口是不是稳定

那更适合优先用：

- WebChat

它会比把真实渠道、群治理和外部集成一起拉进来更干净。

## 3. 程序集成优先交给 API / SDK

如果你的问题本质上是：

- 另一个系统要来调你
- 你要做结构化读取或写入
- 你要把接口嵌进程序

那更适合优先用：

- HTTP API / SDK

不要先拿 WebChat 做自动化替身。

## 4. 状态不一致时先回到 Gateway

一旦出现：

- WebChat 看见的历史和你预期不同
- API 读到的状态和 UI 看到的不一致
- 远程 operator 说“我这边是好的”

更稳的动作通常不是先猜哪个入口错，而是回到：

- Gateway 才是 source of truth

## 一条更稳的选择顺序

建议按这个顺序问：

1. 我现在要解决的是控制、会话还是集成
2. 控制走 Dashboard
3. 会话走 WebChat
4. 集成走 API / SDK
5. 有分歧时回到 Gateway 状态

## 下一步推荐

- [WebChat、API 和控制面入口的边界怎么分](/docs/manual/webchat-api-and-control-surface-boundaries)
- [Gateway 为什么是 session source of truth](/docs/reference/gateway-session-source-of-truth)
- [Web 入口怎么选：Dashboard、WebChat、message CLI](/best-practices/web-entry-selection)
