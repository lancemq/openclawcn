---
title: 团队里如何做 per-agent 执行白名单治理
description: 结合最新官方 approvals CLI 与 Exec Approvals 文档，整理一套更稳的 per-agent allowlist 管理方法，避免一个 agent 的执行权限外溢到整个团队。
category: 安全治理
difficulty: 高级
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/tools/exec-approvals
sourceName: OpenClaw Docs
sourceType: official
tags: [approvals, allowlist, exec, security, governance]
---

# 团队里如何做 per-agent 执行白名单治理

官方最近把 Exec Approvals 的 per-agent allowlist、safe bins 和 approvals CLI 都补得更具体了。  
这背后的信号很明确：

- 执行白名单不该再按“整台机放开多少”来理解

而更应该按：

- 哪个 agent 需要什么执行面

来治理。

## 第一原则：权限跟 agent 走，不跟团队口头约定走

如果一条命令只是某个内容 agent、运维 agent 或代码 agent 会用到，就不该默认变成所有 agent 的通行证。

更稳的做法通常是：

- `main` 只保留最小通用能力
- 专门 agent 再单独加路径 allowlist

## 第二原则：先分 Gateway 和 Node，再谈统一策略

官方当前明确说明 approvals 是按执行宿主分别存储的。  
这意味着：

- Gateway 一套
- 每个 Node 可能又是一套

如果你还没先把宿主边界分清，后面的 allowlist 审计会非常乱。

## 第三原则：解释器和脚本入口优先保守

最新官方文档特别强调了：

- `node -e`
- `python -c`
- `osascript -e`

这类 inline eval 即便解释器本身 allowlisted，也仍应尽量保留显式审批。

这说明更稳的治理方式不是：

- “放开 `node` 就都方便了”

而是：

- “路径能放开的放路径，解释器代码执行继续走审批”

## 第四原则：`safeBins` 只给窄场景，不给泛化能力

官方把 safe bins 定位得很窄：

- stdin-only
- 文本过滤
- 不是通用执行通道

所以更稳的用法是：

- 给 `head`、`tail`、`tr`、`wc` 这类轻过滤器

而不是：

- 把 `bash`、`node`、`python`、`jq` 全部塞进去当快捷白名单

## 第五原则：审批日志要能追溯到 agent

官方文档已经把 allowlist 条目的最近使用信息、最近命中命令和解析路径都做出来了。  
这意味着团队运维时不该只问：

- “这条命令有人批过吗”

更该问：

- “哪个 agent 在什么宿主上频繁用这条命令”

## 一个更稳的默认策略

对多数团队，一个实用的起点通常是：

1. `defaults.security=deny`
2. 核心 agent 用 `allowlist`
3. `ask=on-miss`
4. `askFallback=deny`
5. inline eval 保留显式审批

这样既不会把整个执行面一次性放开，也不会让值守团队被每次低风险命令都反复打断。

## 推荐的落地分层

### `main`

只放：

- 常规只读诊断
- 少量稳定工具路径

### `ops`

放：

- 运维巡检
- 服务状态检查
- 有明确宿主边界的固定命令

### `content` / `research`

尽量少放，必要时更多依赖：

- safe bins
- allow-once
- 审批转发

## 最容易踩的三个坑

### 1. 直接给 `"*"` 放宽路径

后面几乎一定会出现权限外溢。

### 2. 把 allowlist 当成完整身份控制

官方已经明确提醒它不是 per-user auth boundary。

### 3. 只顾效率，不看漂移风险

解释器、wrapper、runtime file 这些地方最容易让“原本以为允许的是 A，最后跑的是 B”。

## 一条实用的审计顺序

每次审 approvals，可以按这条线走：

1. 先看宿主是 Gateway 还是 Node
2. 再看命中的是哪个 agent
3. 再看是 allowlist、safe bins 还是 ask 放行
4. 最后再决定是否继续长期保留

## 下一步推荐

- [approvals CLI、网关与节点 allowlist 怎么管理](/docs/reference/approvals-cli-and-allowlist)
- [Exec 工具、apply_patch 与执行审批](/docs/manual/exec-tools-and-approvals)
- [OpenClaw 的安全运维边界继续细化](/news/openclaw-approvals-surface-watch-2026-03-24)

