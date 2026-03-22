---
title: WebChat 的 history、inject 和展示边界
description: 基于最新官方 WebChat 文档，整理 chat.history 的截断/占位规则、chat.inject 的真实用途，以及为什么 WebChat 看见的 transcript 不是原始 JSONL 的一比一镜像。
category: 参考
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/web/webchat
sourceName: OpenClaw Docs
sourceType: official
tags: [webchat, history, inject, transcript, reference]
---

# WebChat 的 history、inject 和展示边界

WebChat 现在已经不只是“网页聊天框”了，但中文用户最容易误解的一点仍然是：

- WebChat 里看到的 transcript
- 并不等于磁盘上原始会话记录的一比一镜像

官方最近的 WebChat 文档把这条边界写得比以前清楚很多。

## `chat.history` 不是无限完整回放

官方当前明确说明：

- `chat.history` 是 bounded 的

也就是说，它不是把 Gateway 里的原始会话记录无条件整段搬过来，而是面向 UI 做了稳定性限制。

## 具体会怎么被裁剪

根据当前官方文档，至少会发生几类处理：

- 过长文本可能被截断
- 过重 metadata 可能被省略
- 超大消息可能被替换成占位提示

这意味着如果你在 WebChat 里看到：

- 某段工具输出不完整
- 某些 metadata 没展示
- 某条超大内容只剩提示

这不一定是数据丢了，而更可能是：

- UI 历史接口主动减重

## 为什么官方要这么做

因为 WebChat 是要稳定工作的浏览器入口，不是日志导出器。

如果 history 接口直接把：

- 巨型工具结果
- 全量 metadata
- 超长 transcript

都原样塞进浏览器，最容易坏掉的是：

- 页面性能
- 历史加载速度
- 远程连接稳定性

所以 bounded history 更像：

- 面向交互体验的投影视图

## `chat.inject` 真正是干什么的

官方文档里这一点很值：

- `chat.inject` 不是普通用户输入
- 它是把 assistant note 直接插进 transcript，并广播给 UI

这意味着它更像：

- 系统级注入
- 管理面注入
- 后台插入一条 assistant note

而不是：

- 又走了一遍完整 agent run

## 为什么这点重要

因为很多人看到 WebChat 里多出一条 assistant 风格消息，会下意识以为：

- 模型刚才又跑了一轮

但有些消息其实可能来自：

- `chat.inject`
- 中断留下的 partial assistant text
- 其他系统级事件

不是每条都代表一次完整推理回合。

## abort partial 为什么值得一起理解

官方最近还明确提到：

- 如果运行被中止，但已经有部分输出缓冲
- partial assistant text 仍可能写进 transcript

这对 WebChat 用户很关键，因为它解释了为什么有时候会看到：

- 半截回复
- 带有中止痕迹的消息

这不是 UI 显示错了，而是系统保留了运行事实。

## WebChat 和原始会话记录的关系更适合怎么理解

更稳的心智模型是：

- 原始事实层在 Gateway / transcript
- WebChat 的 `chat.history` 是给交互界面看的受限视图

所以它们是：

- 同源

但不是：

- 完全等形

## 哪些场景最容易误判

### 1. 想拿 WebChat 当完整审计台

它更适合聊天和调试，不适合替代底层 transcript / session 文件审计。

### 2. 看到 injected note 以为模型自己突然说了句话

有些内容可能是系统或管理员直接注入的。

### 3. 看到半截回复就以为历史损坏

官方当前设计里，partial aborted text 是允许保留的。

## 中文用户最值得记住的一句

如果要压成一句最有用的话，就是：

- WebChat 展示的是 Gateway 会话的可交互视图，不是原始记录的全量镜像

## 下一步推荐

- [WebChat 的会话与只读边界](/docs/manual/webchat-session-and-readonly-mode)
- [WebChat 与 message CLI](/docs/manual/webchat-and-message-cli)
- [消息投递、重试与响应行为](/docs/manual/message-retries-and-delivery)
