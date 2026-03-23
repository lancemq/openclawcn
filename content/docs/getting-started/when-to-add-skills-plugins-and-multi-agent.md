---
title: 我什么时候再上 Skills、Plugins 和多 Agent
description: 帮你判断现在是否已经适合进入 Skills、Plugins、Hooks 或多 Agent 扩展，而不是在基础链路未稳定时过早堆复杂度。
category: 入门
updatedAt: 2026-03-23
sourceType: internal
tags: [skills, plugins, multi-agent, hooks, decision]
---

# 我什么时候再上 Skills、Plugins 和多 Agent

第一次部署成功后，很多人下一步就会想：

- 我要不要马上装 Skills
- 要不要接 Plugins / Hooks
- 要不要直接做多 Agent

更稳的答案通常是：先看你现在缺的是“能力”，还是“稳定性”。

## 先判断你处在哪个阶段

### 阶段 1：基础链路刚跑通

这个阶段建议：

- 不要先上多 Agent
- Skills 只装少量高频能力
- Plugins 和 Hooks 先了解，不急着一口气接全

重点是先把默认模型、入口和使用方式跑稳。

### 阶段 2：已经开始稳定使用

这个阶段可以开始：

- 增加 3 到 5 个高频 Skills
- 尝试单一方向的 Plugin 或 Hook
- 把配置项收回正式配置文件

重点不是装得多，而是知道每个扩展到底带来了什么收益。

### 阶段 3：已经有真实场景和长期运行需求

这个阶段才更适合：

- 做多 Agent 分工
- 接更复杂的自动化链路
- 建立 fallback、审批和长期治理

## 什么时候先上 Skills

适合在这些情况下开始：

- 你已经知道自己要补哪类能力
- 你需要搜索、写作、代码复核、摘要这类高频工作法
- 你准备先少量试用，而不是装满市场

优先入口：

- [Skills 与扩展能力](/skills)
- [Skills 系统怎么工作](/docs/manual/skills-system)

## 什么时候先上 Plugins / Hooks

适合在这些情况下开始：

- 你已经有明确的接入目标
- 你需要事件驱动、外部系统接入或工作流联动
- 你愿意一起看权限边界和运行风险

优先入口：

- [工具系列](/tools)
- [Plugins 概览](/docs/manual/plugins-overview)
- [Hooks 概览](/docs/manual/hooks-overview)

## 什么时候才建议做多 Agent

通常至少满足下面 3 条再开始：

1. 单 Agent 已经稳定
2. 默认模型和会话边界已经清楚
3. 你知道为什么必须拆分，而不是“觉得更高级”

多 Agent 更适合：

- 团队协作
- 多角色工作流
- 需要分开权限或上下文边界的场景

## 如果你只想记住一句话

先补高频能力，再补系统复杂度。  
如果当前问题还在“怎么稳定使用”，那就别太早进入多 Agent 和重型自动化。

## 推荐下一步

- [学习路径：Skills 与扩展路径](/paths#expansion)
- [关键配置](/configurations)
- [工具系列](/tools)
