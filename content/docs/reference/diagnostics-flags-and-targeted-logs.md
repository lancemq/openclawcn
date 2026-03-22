---
title: Diagnostics flags 和定向日志应该怎么用
description: 基于最新官方 Diagnostics Flags 与 Logging 文档，解释 OpenClaw 如何用 diagnostics.flags 和 OPENCLAW_DIAGNOSTICS 打开定向调试日志，以及为什么这比全局 verbose 更适合长期排障。
category: 参考
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/diagnostics/flags
sourceName: OpenClaw Docs
sourceType: official
tags: [diagnostics, logging, flags, debug, reference]
---

# Diagnostics flags 和定向日志应该怎么用

OpenClaw 最近把 diagnostics flags 单独做成了一页，这很值。  
因为它解决的是一个非常实际的问题：

- 你想多看一点内部信号
- 但又不想把全局日志直接开到很吵

官方现在给出的答案是：

- targeted debug logs

## diagnostics flags 到底是什么

根据最新官方文档：

- flags 是字符串
- 不区分大小写
- 支持通配符

它们只有在某个子系统明确检查这些 flag 时才会生效。

这意味着它不是：

- 全局 log level 的另一种写法

而更像：

- 某个子系统的定向观察开关

## 为什么它比直接开 verbose 更稳

如果你只是把全局日志级别一路调高，最容易出现的是：

- 噪音极大
- 很难定位真正有价值的行
- 长期开着成本高

diagnostics flags 的价值就在于：

- 只放大你关心的那一小块

所以更适合长期使用或重复排障。

## 怎么通过配置启用

官方当前给出的配置形态很简单：

```json
{
  "diagnostics": {
    "flags": ["telegram.http"]
  }
}
```

也可以一次开多个：

```json
{
  "diagnostics": {
    "flags": ["telegram.http", "gateway.*"]
  }
}
```

## 环境变量覆盖更适合一次性复现

官方还明确给了 env override：

```bash
OPENCLAW_DIAGNOSTICS=telegram.http,telegram.payload
```

要全部禁掉则可以：

```bash
OPENCLAW_DIAGNOSTICS=0
```

这很适合：

- 你只想复现一次问题
- 不想改磁盘配置
- 想临时在某台机器上打开定向信号

## 通配符为什么特别实用

官方文档明确支持：

- `telegram.*`
- `*`

这意味着你可以：

- 只观察某个子系统整组信号
- 而不是知道每一个具体 flag 名称后逐个加

但也正因为如此，`*` 通常不适合长期留着。

## 日志最终写到哪里

官方当前说明：

- flags 仍然写到标准 diagnostics log file
- 默认是 `/tmp/openclaw/openclaw-YYYY-MM-DD.log`
- 如果配置了 `logging.file`，就走那个路径

而且输出格式仍然是：

- JSONL

这很重要，因为它说明：

- 定向日志并没有绕开现有日志基础设施
- 它只是往同一条日志链路里增加了更细的事件

## redaction 还会不会生效

会。官方文档明确写到：

- redaction still applies based on `logging.redactSensitive`

这对安全排障很关键，因为它意味着：

- 你可以开更细的诊断
- 但不应该因此默认把敏感信息裸打出来

## 常见排障姿势怎么搭配

官方现在给的典型操作其实很实用：

1. 先选当天最新日志文件
2. 再用 `rg` 过滤目标子系统
3. 复现时用 `tail -f` 跟看

这比全量翻日志要高效很多。

## logging.level 和 flags 的关系也要记住

官方还特别提醒：

- 如果 `logging.level` 设得高于 `warn`，某些 diagnostics logs 可能被压掉

也就是说：

- 开了 flag 不代表一定会看到
- 还要看全局日志级别是否允许它出现

## 中文用户最容易踩的坑

### 1. 只会开全局 debug，不会开 targeted flags

这样日志很容易直接变成信息洪水。

### 2. 以为 flags 会绕过敏感信息脱敏

官方没有这么设计，redaction 仍会生效。

### 3. 把 `*` 当长期配置

这通常只适合短时排障。

## 一条更稳的使用路径

建议按这个顺序：

1. 先用 `status / logs / doctor` 确认问题大致在哪层
2. 再只打开对应子系统的 diagnostics flag
3. 用 env override 做一次性复现
4. 问题结束后及时关掉

## 下一步推荐

- [调试、运行时覆盖与开发排障](/docs/reference/debugging-and-runtime-overrides)
- [原始流日志怎么抓](/docs/reference/raw-stream-debugging)
- [高级排障与性能诊断](/best-practices/troubleshooting-advanced)
