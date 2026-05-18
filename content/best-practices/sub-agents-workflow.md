---
title: Sub-agents 子代理工作流与任务拆分
description: 学习如何把复杂任务拆给多个子代理处理，让 OpenClaw 的主 Agent 变成任务调度器而不是所有事都自己干。
category: 高级用法
difficulty: 高级
updatedAt: "2026-05-18"
source: https://docs.openclaw.ai/tools/sub-agents
sourceName: OpenClaw Docs
sourceType: official
tags: [sub-agents, workflow, multi-agent, delegation, tasks]
---

# Sub-agents 子代理工作流与任务拆分

当 Agent 需要同时处理多件复杂事情时，一个常见的陷阱是让主 Agent 把所有逻辑都扛在身上。结果往往是上下文过长、注意力分散、输出质量下降。

OpenClaw 的 Sub-agents 机制提供了一条更干净的路径：让主 Agent 做调度，把具体任务委派给专门的子代理。

## 什么时候该用 Sub-agents

不是每个任务都需要拆。适合拆分的信号：

| 场景 | 建议 |
|------|------|
| 任务涉及多个独立领域（如搜索、分析、写作） | 每个领域一个子代理 |
| 任务需要并行处理多条线索 | 子代理可以并行执行 |
| 某些步骤需要隔离上下文 | 子代理有独立会话 |
| 主 Agent 上下文快满了 | 把子任务外包出去 |
| 需要不同性格或专业度的回复 | 子代理可以配置不同 SOUL.md |

不适合的场景：

- 简单的一问一答
- 需要全局一致性的连续对话
- 子任务之间高度耦合、必须实时共享状态

## Sub-agents 的基本工作原理

在 OpenClaw 里，Sub-agents 可以理解成：

- 主 Agent 是一个 "项目经理"
- Sub-agents 是 "专项执行者"
- 它们之间通过工具调用或消息机制协作

关键特性：

1. **隔离上下文** - 子代理有自己的会话上下文，不会污染主 Agent 的记忆
2. **独立配置** - 可以为不同子代理配置不同的模型、技能和性格
3. **结果回传** - 子代理完成后，结果可以汇总回主 Agent

## 一个实际的拆分示例

假设你要让 Agent 完成 "研究某个话题并写一份报告"：

### 主 Agent 配置

```json
{
  "id": "research-coordinator",
  "name": "研究协调员",
  "systemPrompt": "你是一个任务协调员。你的职责是把研究任务拆给专门的子代理，然后整合它们的输出。不要自己做研究，要委派。",
  "tools": ["delegate_research", "delegate_analysis", "delegate_writing"],
  "subAgents": ["web-researcher", "data-analyst", "report-writer"]
}
```

### 子代理配置

```json
[
  {
    "id": "web-researcher",
    "name": "网络研究员",
    "systemPrompt": "你是一个专业的网络研究员。你的任务是搜索和收集信息。只输出事实和数据，不输出观点。",
    "skills": ["web-search", "web-fetch"],
    "model": "gpt-4"
  },
  {
    "id": "data-analyst",
    "name": "数据分析师",
    "systemPrompt": "你是一个数据分析师。你的任务是分析提供的数据，找出模式和洞察。用中文输出分析结论。",
    "skills": ["calculator", "data-viz"],
    "model": "claude-3"
  },
  {
    "id": "report-writer",
    "name": "报告撰写员",
    "systemPrompt": "你是一个技术报告撰写员。你的任务是把研究和分析结果整理成结构清晰的报告。",
    "skills": ["markdown", "pdf-tool"],
    "model": "gpt-4"
  }
]
```

### 执行流程

1. 用户给主 Agent 一个研究课题
2. 主 Agent 调用 `delegate_research`，把课题给 `web-researcher`
3. `web-researcher` 返回收集到的资料
4. 主 Agent 调用 `delegate_analysis`，把资料给 `data-analyst`
5. `data-analyst` 返回分析结论
6. 主 Agent 调用 `delegate_writing`，把素材给 `report-writer`
7. `report-writer` 返回最终报告
8. 主 Agent 汇总并呈现给用户

## 在 Control UI 里怎么配置

通过 Control UI 配置 Sub-agents 的步骤：

1. 先创建各个子代理（和创建普通 Agent 一样）
2. 在主 Agent 的配置里添加 `subAgents` 字段，引用子代理的 ID
3. 确保主 Agent 有调用子代理的权限

配置文件的 `subAgents` 字段支持：

```json
{
  "subAgents": [
    {
      "id": "web-researcher",
      "description": "负责网络信息收集",
      "trigger": "当需要搜索或收集外部信息时调用"
    },
    {
      "id": "data-analyst",
      "description": "负责数据分析",
      "trigger": "当需要对数据进行统计或模式识别时调用"
    }
  ]
}
```

## 常见坑点

### 拆得太细

如果每个子任务只有一两句话就能完成，拆成子代理反而增加开销。拆分的成本是上下文切换和协调开销，收益是隔离和专业化。

### 子代理之间直接通信

默认情况下，子代理之间不应该直接对话。所有协调应该通过主 Agent 完成。如果子代理需要共享状态，应该由主 Agent 传递。

### 忽略错误处理

子代理可能失败。主 Agent 的 system prompt 里应该包含：

- 如果子代理返回错误，怎么处理
- 如果子代理超时，是否重试
- 如果结果不符合预期，怎么反馈

## 进阶：并行子代理

某些场景下，多个子任务可以并行执行：

```
用户请求："同时分析 A 公司和 B 公司的财报"

主 Agent 可以：
- 同时启动两个子代理
- 一个分析 A 公司
- 一个分析 B 公司
- 等两个都返回后，做对比总结
```

这需要在主 Agent 的配置里启用并行执行能力。

## 下一步

- [多代理路由配置指南](/best-practices/multi-agent-routing)
- [自定义技能开发指南](/best-practices/custom-skill-development)
- [工具系统概览](/docs/manual/tools-overview)
