---
title: diagnostics.enabled、flags 和 raw stream 该怎么分层
description: 结合最新官方 Diagnostics Flags、Debugging 与 Raw Stream 文档，整理一套更稳的诊断开关分层方法，避免把定向诊断、全局日志和原始流抓包混成一层。
category: 排障实践
difficulty: 高级
updatedAt: 2026-03-25
source: https://docs.openclaw.ai/diagnostics/flags
sourceName: OpenClaw Docs
sourceType: official
tags: [diagnostics, flags, raw-stream, logs, troubleshooting]
---

# diagnostics.enabled、flags 和 raw stream 该怎么分层

最近官方把 diagnostics flags、debugging 和 raw stream 几条文档都补得更完整以后，一个很值得中文团队单独守住的边界是：

- 不是所有“多看一点日志”的动作都在同一层

更稳的做法是把它至少分成三层：

- diagnostics 基础开关
- targeted flags
- raw stream

## 第一原则：先分“事件级诊断”和“原始流抓取”

更准确地说：

- diagnostics flags 更像子系统定向观察
- raw stream 更像底层证据抓取

两者都能帮排障，但风险和噪音完全不是一层。

## 第二原则：flags 优先于全局 verbose

官方已经把这条路径写得很清楚：

- 先 `status / logs / doctor`
- 再开 targeted diagnostics

这说明长期排障更推荐：

- 只放大你怀疑的那一层

而不是：

- 先把整站日志都打到很吵

## 第三原则：raw stream 只当临时证据

raw stream 很值，但也更敏感。  
它更适合：

- provider chunk 异常
- reasoning 混入输出
- 流式边界错乱

而不适合：

- 长期开着当监控

## 第四原则：diagnostics.enabled 不是“越开越好”

更稳的理解方式是：

- 它是让诊断链路可用
- 但真正的观测强度还要看 flags 和后续抓取层

也就是说，它不等于：

- 所有详细日志都会自动出来

## 推荐的分层方式

### 第一层：日常基础排障

- `status`
- `logs`
- `doctor`

### 第二层：子系统定向观察

- `diagnostics.flags`
- `OPENCLAW_DIAGNOSTICS`

### 第三层：底层证据抓取

- raw stream
- provider raw chunk

## 最容易踩的坑

### 1. 直接开 raw stream 排普通问题

很多时候 targeted flags 已经够了。

### 2. 把 flags 和全局 debug 混开

最后日志量会迅速失控。

### 3. 让 raw stream 长期开着

这会把隐私和存储风险一起拉高。

## 一条更稳的使用顺序

1. 先用 `status / logs / doctor`
2. 再只开相关子系统 flags
3. 确认仍不够时，再临时开 raw stream
4. 复现结束后及时回收

## 下一步推荐

- [Diagnostics flags 和定向日志应该怎么用](/docs/reference/diagnostics-flags-and-targeted-logs)
- [原始流日志怎么抓](/docs/reference/raw-stream-debugging)
- [调试、运行时覆盖与开发排障](/docs/reference/debugging-and-runtime-overrides)

