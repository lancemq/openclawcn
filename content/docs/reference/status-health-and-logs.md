---
title: status、health 和 logs 该怎么分工
description: 基于最新官方 CLI reference，整理 openclaw status、health、logs 三组命令各自应该回答什么问题，以及值班和排障时更稳的使用顺序。
category: 参考
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/cli
sourceName: OpenClaw Docs
sourceType: official
tags: [cli, status, health, logs, troubleshooting]
---

# status、health 和 logs 该怎么分工

OpenClaw 的 CLI 现在已经越来越完整了，所以很多人第一次会有一个常见困惑：

- 我现在该先跑 `status`，还是 `health`，还是直接看 `logs`？

官方最新 CLI 文档其实已经把这三者的职责分得很清楚了，只是中文站很值得把这层“使用顺序”明确说出来。

## `status` 最适合回答什么问题

根据当前官方 CLI reference，`openclaw status` 更偏：

- 总览
- 当前实例状态
- 最近会话与入口健康
- 在需要时补更深诊断

也就是说，它更适合回答：

- 这套实例现在整体还活着吗
- 我连的是哪一个 Gateway
- 当前有没有明显异常

如果你刚接手一个环境，通常最先跑的应该就是它。

## `health` 最适合回答什么问题

官方当前把 `openclaw health` 定位得更像：

- 一个更窄、更明确的健康探针

它更适合回答：

- Gateway 现在能不能给健康响应
- 自动化或探针是不是该判断为正常

所以它更像：

- 监控或脚本入口

而不是全面排障入口。

## `logs` 最适合回答什么问题

`openclaw logs` 现在更像一条运行时证据链。

它最适合回答：

- 刚刚到底发生了什么
- 某个组件具体报了什么
- 某个渠道有没有实际进入处理链

所以它不是第一眼总览，而是：

- 你已经知道大概哪里不对
- 现在要看细节证据

## 更稳的默认顺序应该是什么

对大多数排障场景来说，更稳的顺序通常是：

1. `openclaw status`
2. `openclaw health`
3. `openclaw logs`

原因很简单：

- 先看总览
- 再看健康探针
- 最后才看细节流

如果一上来就扎进 logs，常常会被大量细节冲散判断。

## `status --all` 和 `status --deep` 什么时候值钱

官方现在给 `status` 增加了不少细化选项，尤其值得注意的是：

- `--all`
- `--deep`
- `--usage`

更适合这样理解：

- `--all`：更完整、适合粘贴和留档
- `--deep`：去做更深的 probe
- `--usage`：看 provider usage / quota

所以如果你是在值班或帮别人远程看问题，`status --all` 往往会比普通输出更有用。

## `health` 为什么不该被当成唯一真相

这是很多人容易误解的一点。

`health` 很重要，但它通常只能说明：

- Gateway 探针有没有过

它不一定能说明：

- 某个渠道是不是正常
- 某个模型是不是能工作
- 某个浏览器控制面是不是认证正常

所以它更像“最低层活性”，不是全系统一切正常的证明。

## `logs` 现在有哪些更实用的用法

根据当前官方 CLI reference，`openclaw logs` 已经支持几种很实用的模式：

- `--follow`
- `--limit`
- `--plain`
- `--json`
- `--no-color`

这意味着它已经不只是“终端里滚一屏字”，而是可以：

- 给人看
- 给脚本看
- 给后续分析导出

如果你在做运维值班，`--json` 和 `--follow` 的价值会特别大。

## 中文站建议怎么记这三个入口

如果要用一句话概括：

- `status` 看全局
- `health` 看探针
- `logs` 看证据

只要先把这三句记住，很多排障动作就会自然更有顺序。

## 下一步推荐

- [Gateway 命令与 RPC 该怎么用](/docs/reference/gateway-cli-and-rpc)
- [原始流日志怎么抓](/docs/reference/raw-stream-debugging)
- [故障排除与诊断思路](/docs/reference/troubleshooting)

把这几页串起来看，CLI 的值班和排障节奏会更顺。
