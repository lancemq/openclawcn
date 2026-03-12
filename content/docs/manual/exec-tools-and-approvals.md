---
title: Exec 工具、apply_patch 与执行审批
description: 基于官方 exec、apply_patch 和 exec approvals 文档，解释高权限工具如何工作，为什么审批是硬边界，以及哪些配置最值得先看。
category: 功能
updatedAt: 2026-03-12
source: https://docs.openclaw.ai/zh-CN/tools/exec
sourceName: OpenClaw Docs
sourceType: official
tags: [exec, apply-patch, approvals, tools, security]
---

# Exec 工具、apply_patch 与执行审批

OpenClaw 的工具体系里，`exec` 是风险和能力都最高的一层之一。官方中文站现在已经把 `exec`、`apply_patch` 和执行审批拆成独立文档，这说明它们不是普通扩展技巧，而是正式的权限边界。

## 为什么 `exec` 需要单独理解

`exec` 的意义不只是“能跑命令”，而是把模型建议转成真实系统动作。它带来的价值和风险都非常直接：

- 能读写文件
- 能执行脚本
- 能修改项目状态
- 也可能误操作高权限路径

所以官方把硬边界更多放在工具策略、审批和沙箱，而不是只靠 system prompt 提醒。

## `apply_patch` 是什么

官方 `apply_patch` 文档把它定义成 `exec` 的子工具，用于结构化地修改文件。它适合：

- 多文件编辑
- 多段 patch
- 单次 `edit` 容易脆弱的场景

补丁格式是显式结构化的，例如：

```text
*** Begin Patch
*** Update File: src/index.ts
@@
-const foo = 1
+const foo = 2
*** End Patch
```

它的价值在于更稳地表达“改哪些文件、怎么改”，而不是让模型自由输出一大段模糊 diff。

## `apply_patch` 默认不是一直开着

官方文档明确写了几条重要边界：

- 它是实验性功能
- 默认关闭
- 通过 `tools.exec.applyPatch.enabled` 打开
- 仅适用于 OpenAI / OpenAI Codex 路线

这意味着如果你看到有人在社区里直接用 `apply_patch`，不代表你的环境默认就能跑。

## 官方示例里最值得看的配置点

`apply_patch` 相关配置位于：

- `tools.exec.applyPatch.enabled`
- `tools.exec.applyPatch.allowModels`

而且 `allow: ["exec"]` 会隐式允许 `apply_patch`。  
所以如果你已经放开了 `exec`，也要顺带意识到补丁式文件修改能力可能已经在边界之内。

## 执行审批为什么是硬边界

官方执行审批文档很明确：审批对话框不是“多一个提醒”，而是把真实执行权从模型建议中分离出来。

审批时会展示的信息包括：

- 命令和参数
- 当前工作目录
- 智能体 id
- 解析后的可执行文件路径
- 主机和策略元数据

这让操作者能判断：

- 这条命令到底会在什么地方运行
- 是不是跨了预期边界
- 是否值得一次性允许或长期允许

## 审批支持哪些动作

官方文档列出的审批动作包括：

- `Allow once`
- `Always allow`
- `Deny`

同时还支持把审批转发到聊天渠道，并通过 `/approve` 处理，例如：

```text
/approve <id> allow-once
/approve <id> allow-always
/approve <id> deny
```

这对于远程环境和团队值守很实用。

## 聊天渠道审批适合什么场景

官方审批转发配置适合这些场景：

- Gateway 跑在远程机器
- 你不总在控制台前
- 团队里有人专门负责批准高风险执行

这说明 OpenClaw 对“高权限动作要不要人工确认”是认真设计过的，不只是本地单机玩法。

## 审批与 system prompt 的关系

官方 system prompt 文档还特别提醒过：提示词里的安全约束只是建议性防护，不是硬执行。真正的硬边界来自：

- 工具策略
- 执行审批
- 沙箱隔离
- allowlist

这条边界非常关键，因为它直接影响你怎么理解安全。

## 中文用户最容易踩的坑

### 以为开了 `exec` 就只是能跑少量命令

实际上这已经是非常强的系统动作能力。

### 只看模型提示词，不配审批

高权限执行更应该靠硬边界，而不是“希望模型别做错”。

### 打开 `apply_patch` 但没限制模型或工作区

这样会显著扩大文件改动面的风险。

## 更稳的实践顺序

1. 先理解 [Tools 概览](/docs/manual/tools-overview)
2. 再决定是否真的需要 `exec`
3. 打开 `exec` 后优先配审批
4. 最后再考虑启用 `apply_patch`

## 下一步推荐

- [OpenClaw 的 Tools 与扩展能力概览](/docs/manual/tools-overview)
- [OpenClaw 插件系统怎么用](/docs/manual/plugins-overview)
- [OpenClaw 安全配置基础](/docs/operations/safety-basics)
- [调试、运行时覆盖与开发排障](/docs/reference/debugging-and-runtime-overrides)
