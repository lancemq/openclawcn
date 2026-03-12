---
title: OpenClaw 插件系统怎么用
description: 基于官方插件与 CLI 文档，解释插件和 Skills、Tools 的边界，说明安装、启用、更新与风险控制的基本方法。
category: 功能
updatedAt: 2026-03-12
source: https://docs.openclaw.ai/zh-CN/tools/plugin
sourceName: OpenClaw Docs
sourceType: official
tags: [plugins, extensions, skills, tools, cli]
---

# OpenClaw 插件系统怎么用

如果 Skills 更像“提示词层和工作流层的能力组织”，那插件更像“把新代码能力接进 OpenClaw”的正式扩展机制。它们都能扩展系统，但边界并不一样。

更稳妥的理解方式是：

- Tools：模型当前可直接调用的能力接口
- Skills：组织任务、规则和工作流的方法
- Plugins：把新的命令、工具或 Gateway RPC 真正装进系统的代码模块

这也是为什么官方把插件单独做成一套正式文档和 CLI，而不是把它混进 Skills 概念里。

## 插件适合解决什么问题

更适合用插件来补的，通常是：

- 核心安装里默认不带的可选功能
- 需要在 Gateway 内运行的渠道或集成功能
- 需要独立安装、更新和启停的扩展模块

官方文档里提到的典型例子包括：

- `@openclaw/voice-call`
- `@openclaw/msteams`
- `@openclaw/zalouser`

其中一个值得注意的变化是：从 `2026-01-15` 起，Microsoft Teams 已经改为仅作为插件提供。这意味着插件不是边缘能力，而是 OpenClaw 正式能力演进的一部分。

## 插件和 Skills 不要混着配

更容易踩坑的地方不是“不会装”，而是把插件和 Skills 当成同一层。

一个更实用的判断方式是：

- 如果你要增加执行能力、CLI 命令、渠道接入或 Gateway 内部扩展，优先看插件
- 如果你要整理任务流程、角色约束、输出风格或项目级工作法，优先看 Skills

很多团队会把两者组合起来用：

1. 先通过插件把能力装进系统
2. 再通过 Skills 规定什么时候该调用这些能力

## 先看系统里已经有什么

官方推荐的第一步不是直接安装，而是先列出当前已加载的插件：

```bash
openclaw plugins list
```

如果你已经知道某个插件的 id，可以继续查看详情：

```bash
openclaw plugins info <id>
```

这一步的价值在于先判断三件事：

- 这个能力是不是已经存在
- 它当前是否启用
- 它需要的配置入口在哪里

## 最常用的插件操作

### 安装插件

可以从 npm 安装官方或第三方插件：

```bash
openclaw plugins install @openclaw/voice-call
```

也可以从本地目录安装，适合开发或私有扩展：

```bash
openclaw plugins install ./extensions/my-plugin
```

安装后通常需要重启 Gateway，配置才会真正生效。

### 启用和停用

```bash
openclaw plugins enable <id>
openclaw plugins disable <id>
```

这比手工到处改配置更适合做试运行和回滚。

### 更新与诊断

```bash
openclaw plugins update <id>
openclaw plugins update --all
openclaw plugins doctor
```

如果你怀疑插件版本、依赖或声明文件有问题，`doctor` 往往比盲目重装更有效。

## 配置通常放在哪里

官方文档特别强调了一点：插件不是都用同一套配置位置。

常见情况包括：

- 插件本身配置写在 `plugins.entries.<id>.config`
- 某些渠道插件会把配置挂到 `channels.<channelId>`
- 记忆相关插件还会影响 `plugins.slots.memory`

所以更稳的顺序是：

1. 先看插件文档
2. 确认配置挂载位置
3. 再修改配置和重启 Gateway

如果你只凭习惯把所有内容都塞进 `plugins.entries.*`，很容易配了但没生效。

## 记忆插件是一个特别重要的例子

官方把记忆搜索能力也做成了可插拔槽位：

- 默认启用的是 `memory-core`
- 如果你要长期记忆召回，可以切到 `memory-lancedb`
- 如果你完全不想启用记忆插件，可以设为 `plugins.slots.memory = "none"`

这说明插件并不只是“外围扩展”，有些插件直接参与 OpenClaw 的核心工作方式。

## 插件安装在什么位置

这个问题和远程部署强相关。

如果你使用远程 Gateway，那么插件必须安装在运行 Gateway 的那台机器上，而不是你当前操作的笔记本上。像 Zalo、语音通话、渠道桥接这一类插件，真正执行代码的是 Gateway 进程。

所以远程环境下更适合的理解方式是：

- 本地机器只是控制台
- Gateway 主机才是插件真正运行的位置

## 插件声明文件有什么用

官方插件机制会读取插件清单，例如 `openclaw.plugin.json`，再结合配置 schema 判断插件暴露了什么能力、需要哪些参数、支持哪些入口。

你不一定要手写复杂插件，但至少应该知道：

- 插件不是只靠一个 npm 包名就结束
- 它通常带有元信息、配置结构和运行入口
- 这些声明会直接影响 CLI、Gateway 和配置校验行为

## 安全上最该看什么

插件的风险通常高于 Skills，因为它是代码，不只是文本规则。

安装前至少要看：

- 来源是否可信
- 是否要求你额外执行不透明安装脚本
- 会不会接触账号、渠道或凭证
- 是否运行在 Gateway 进程内
- 出问题时能不能快速停用

一个更稳的实践方式是：

1. 先只装少量高频插件
2. 先在测试环境启用
3. 确认配置和日志正常
4. 再带到长期运行环境

## 中文站建议的使用路径

如果你刚准备开始扩展 OpenClaw，推荐按这个顺序看：

1. 先理解 [Tools 概览](/docs/manual/tools-overview)
2. 再理解 [Skills 系统怎么工作](/docs/manual/skills-system)
3. 然后看这篇插件文档，明确哪层该用哪种机制
4. 最后再结合 [关键配置](/configurations) 和具体插件说明落地

## 下一步推荐

- [Tools 概览](/docs/manual/tools-overview)
- [Skills 系统怎么工作](/docs/manual/skills-system)
- [记忆搜索与索引机制](/docs/manual/memory-search-and-indexing)
- [远程访问与 Tailscale / SSH](/docs/operations/remote-access)
