---
title: 管理员常用 CLI 值班手册
description: 结合最新官方 CLI Reference、Gateway protocol 和 Dashboard 文档，总结长期运行环境里管理员最常用的 CLI 值班顺序：先看 status、再看 health、最后进 logs 与 gateway RPC。
category: 运维实践
difficulty: 初级
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/cli
sourceName: OpenClaw Docs
sourceType: official
tags: [cli, admin, operations, logs, gateway]
---

# 管理员常用 CLI 值班手册

OpenClaw 的 CLI 现在已经足够强了，所以长期运行环境里，一个很现实的问题就出现了：

- 值班时先跑哪条命令最稳？

官方文档虽然把命令都列出来了，但真正适合管理员记住的，其实是一套顺序，而不是命令大全。

## 第一原则：值班先看“活不活”，不要先看“为什么坏”

更稳的第一步通常永远不是直接翻日志，而是先确认：

- Gateway 还活着吗
- 当前 CLI 看到的是哪一套实例

所以第一步更适合：

```bash
openclaw status
```

如果你需要一份更完整、方便转发的总览，再加：

```bash
openclaw status --all
```

## 第二原则：再看健康探针

确认总览之后，再看：

```bash
openclaw health
```

它更适合回答：

- Gateway 探针本身有没有过

对值班来说，这一步很重要，因为它能把“网页打不开”“某个渠道异常”和“Gateway 本体已经不健康”区分开。

## 第三原则：最后才看 logs

如果前两步已经确认：

- 有异常
- 但问题还不明确

这时再看：

```bash
openclaw logs --follow
```

或者：

```bash
openclaw logs --limit 200
```

这样你是在带着明确问题看日志，而不是被日志淹没。

## 第四原则：Gateway RPC 是值班后半段工具

只有在前面三步之后，你还需要更底层控制时，才更适合进入：

```bash
openclaw gateway status
openclaw gateway call ...
```

这是因为这组命令碰到的通常已经是：

- service 级问题
- config apply / patch
- 显式远程目标和凭据

它更像管理动作，不是第一眼巡检工具。

## 一套最小值班顺序

对多数环境来说，一套很稳的默认顺序就是：

1. `openclaw status`
2. `openclaw health`
3. `openclaw logs --follow`
4. 必要时 `openclaw gateway status`

如果还涉及模型或认证，再补：

5. `openclaw models status --check`

## 中文站建议怎么记

如果要把它压缩成一句话：

- 先看总览，再看探针，再看证据，最后再做控制动作

这基本就是值班时最不容易乱的顺序。

## 下一步推荐

- [status、health 和 logs 该怎么分工](/docs/reference/status-health-and-logs)
- [Gateway 命令与 RPC 该怎么用](/docs/reference/gateway-cli-and-rpc)
- [Dashboard 快速打开与认证行为](/docs/manual/dashboard-fast-path-and-auth)

把这几页连起来看，CLI 值班会更像一套流程，而不是一堆记忆碎片。
