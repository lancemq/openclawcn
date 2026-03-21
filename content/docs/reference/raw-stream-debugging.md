---
title: 原始流日志怎么抓
description: 基于最新官方 Debugging 文档，整理 OpenClaw 的 raw stream、pi-mono raw chunk 日志分别该在什么场景开启，以及如何避免把调试日志变成隐私风险。
category: 排错
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/help/debugging
sourceName: OpenClaw Docs
sourceType: official
tags: [debugging, raw-stream, logs, providers, privacy]
---

# 原始流日志怎么抓

当你遇到“模型回复里混进奇怪 reasoning 文本”“流式显示乱掉”“某个 provider 好像把块格式发错了”这类问题时，普通应用日志往往不够。

官方最近的 Debugging 文档给出了两个非常关键的抓包入口：

- OpenClaw raw stream
- pi-mono raw chunk

这两者看起来像一回事，但实际观察层级不一样。

## 第一层：OpenClaw raw stream 在看什么

官方文档当前的定义很清楚：

- 它记录的是 OpenClaw 在过滤、格式化之前看到的原始 assistant stream

更适合用来判断：

- reasoning 是不是被当普通文本 delta 发出来了
- 块结构是不是在 OpenClaw 这一层就已经异常
- 最终 UI 异常是不是源头在上游流数据

开启方式是：

```bash
pnpm gateway:watch --raw-stream
```

或者：

```bash
OPENCLAW_RAW_STREAM=1
```

## 第二层：pi-mono raw chunk 在看什么

官方文档还给了更底一层的抓法：

```bash
PI_RAW_STREAM=1
```

它记录的是：

- OpenAI-compatible provider 返回的原始 chunk

也就是在它们被解析成更高层 block 之前的内容。

这更适合判断：

- provider 本身 chunk 就有问题
- 还是解析阶段出了问题

## 两者什么时候该用哪个

更容易理解的判断方式是：

### 先用 OpenClaw raw stream

适合大多数场景：

- 回复样式异常
- reasoning 混入正文
- 流式显示怪异

### 再用 pi-mono raw chunk

当你已经怀疑：

- 不是 UI 问题
- 也不只是 OpenClaw 上层格式化问题
- 而是底层 OpenAI-compat chunk 本身不对

再往下抓这一层。

## 默认日志文件在哪

根据官方文档当前说明：

- OpenClaw raw stream 默认写到 `~/.openclaw/logs/raw-stream.jsonl`
- pi-mono raw chunk 默认写到 `~/.pi-mono/logs/raw-openai-completions.jsonl`

两者都支持自定义路径。

如果你是临时调试，建议尽量单独指定文件，便于事后清理。

## 为什么这类日志要格外谨慎

官方文档对安全提醒写得非常直接：

- 日志里可能包含完整 prompt
- 可能包含工具输出
- 可能包含用户数据

也就是说，它们不是普通技术日志，而是潜在高敏感调试材料。

## 更稳的调试顺序

建议按这个顺序来：

1. 先用普通 `status / logs / doctor`
2. 确认不是基础运行问题
3. 再临时开 raw stream
4. 只有必要时再下钻到 pi-mono raw chunk

这样能避免一开始就把太多敏感数据落盘。

## 开启后最值得看什么

如果你在排 provider 输出异常，更适合重点看：

- reasoning 是作为普通文本还是独立 block 出现
- 有没有重复 chunk
- 有没有顺序错乱
- 有没有明显被截断或拼接异常

不要一开始就试图逐行读完所有输出，先找结构性异常更有效。

## 调试结束后该做什么

这类日志不适合长期常开。

更稳的习惯通常是：

1. 问题复现时开启
2. 采够最小复现片段
3. 关掉日志
4. 清理本地文件或脱敏后再分享

这样既够定位问题，也不会把调试手段变成长期风险。

## 下一步推荐

- [调试、运行时覆盖与开发排障](/docs/reference/debugging-and-runtime-overrides)
- [故障排除与诊断思路](/docs/reference/troubleshooting)
- [Raw Stream 调试的安全做法](/best-practices/safe-debug-capture)

把这几页一起看，会更容易建立一套不伤隐私的排障习惯。
