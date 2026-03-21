---
title: Raw Stream 调试的安全做法
description: 结合最新官方 Debugging 文档，总结在 OpenClaw 里抓 raw stream、provider chunk 和诊断日志时，怎样控制范围、保留最小样本并避免泄露 prompt、密钥和用户数据。
category: 排障治理
difficulty: 中级
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/help/debugging
sourceName: OpenClaw Docs
sourceType: official
tags: [debugging, logging, privacy, security, troubleshooting]
---

# Raw Stream 调试的安全做法

OpenClaw 的调试能力最近越来越完整了，但这也带来一个现实问题：你抓到的排障材料，往往本身就是高敏感数据。

官方 Debugging 文档已经明确提醒：

- raw stream 可能包含完整 prompt
- 可能包含工具输出
- 可能包含用户数据

所以这条线最值得补的，不是“怎么开日志”，而是“怎么安全地开日志”。

## 第一原则：只为一个明确问题抓日志

最糟糕的做法通常是：

- 出现一点异常
- 直接把 raw stream 常开
- 然后几天后才回来看

这样得到的通常不是更好排障，而是一堆难以处理的敏感数据。

更稳的做法是先明确：

- 我要定位哪个问题
- 这个问题需要哪一层日志
- 预计抓多长时间

## 第二原则：优先抓最上层、最短时长

如果只是：

- 回复里混进 reasoning
- 流式显示怪异

通常先抓 OpenClaw raw stream 就够了。

不要一开始就同时开：

- raw stream
- provider raw chunk
- debug 全量日志

这只会放大数据暴露面。

## 第三原则：先本地保存，再决定要不要分享

官方文档建议日志尽量留在本地，这一点非常值。

更稳的流程通常是：

1. 本地复现
2. 本地采样
3. 本地筛出最小片段
4. 必要时再脱敏分享

而不是一抓完就整个文件丢给别人。

## 第四原则：最先脱敏的几类内容

如果你真的需要分享调试材料，最先该处理的通常包括：

- API key
- token / password
- prompt 中的私有业务说明
- 工具返回的用户数据
- 文件路径、域名、账号标识

因为这些往往比模型输出本身更敏感。

## 第五原则：调试文件要有“关闭动作”

很多团队的问题不在“开了日志”，而在“调试结束后忘了关”。

更稳的习惯通常是：

- 开启前就写下关闭条件
- 复现完立刻关
- 删除临时日志文件

这能显著减少后面“为什么磁盘里还躺着一堆原始对话记录”的问题。

## 第六原则：把 raw stream 当临时证据，不当长期监控

raw stream 特别适合做：

- 一次性复现
- 确认 provider 行为
- 抓结构异常

但不适合做：

- 常驻业务分析
- 长期审计留存
- 团队默认监控

因为它承载的内容密度太高了。

## 一套更稳的安全排障流程

对大多数团队来说，更适合这样做：

1. 先 `status / doctor / logs`
2. 必要时开 OpenClaw raw stream
3. 还不够时再开更底层 provider chunk
4. 取最小样本
5. 脱敏
6. 关日志并清理文件

这套顺序会比“先全开再慢慢筛”安全很多。

## 中文站建议的默认习惯

如果你在维护长期在线实例，建议默认把这条线当成一条“受控调试流程”，而不是日常开关：

- 谁能开 raw stream
- 什么时候允许开
- 谁负责清理

只要这三件事想清楚，调试就不容易变成安全隐患。

## 下一步推荐

- [原始流日志怎么抓](/docs/reference/raw-stream-debugging)
- [调试、运行时覆盖与开发排障](/docs/reference/debugging-and-runtime-overrides)
- [OpenClaw 安全配置基础](/docs/operations/safety-basics)

把这几页串起来看，会更容易形成一套既能定位问题、又不轻易泄露数据的排障方式。
