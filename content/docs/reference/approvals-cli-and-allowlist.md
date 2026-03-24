---
title: approvals CLI、网关与节点 allowlist 怎么管理
description: 基于最新官方 approvals CLI 与 Exec Approvals 文档，解释 openclaw approvals 在本机、Gateway 和 Node 上分别管理什么，以及 per-agent allowlist 最值得先守住哪些边界。
category: 参考
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/cli/approvals
sourceName: OpenClaw Docs
sourceType: official
tags: [approvals, allowlist, exec, gateway, node, reference]
---

# approvals CLI、网关与节点 allowlist 怎么管理

最近官方把 `openclaw approvals` 和 Exec Approvals 文档都补得更完整了。  
这说明执行审批已经不是“偶尔弹个确认框”，而是一套正式的宿主机执行治理面。

## `openclaw approvals` 现在管什么

根据当前官方文档，`openclaw approvals` 主要负责管理：

- 本机 approvals 文件
- Gateway 主机 approvals
- 指定 Node 主机 approvals

也就是说，它不是只改一个本地 JSON，而是在不同执行宿主之间切换治理目标。

## 最先要记住的一件事

默认情况下，命令指向：

- 当前本机 approvals 文件

如果你显式带上：

- `--gateway`
- `--node <id|name|ip>`

才会把目标改成 Gateway 或某个 Node。

这点很重要，因为很多团队一开始会误以为自己改的是统一全局策略，实际上改到的可能只是当前这台机器。

## 官方 CLI 现在给了哪些最直接的动作

当前官方文档列出的常用动作很直接：

```bash
openclaw approvals get
openclaw approvals get --gateway
openclaw approvals get --node <id|name|ip>

openclaw approvals set --file ./exec-approvals.json
openclaw approvals set --gateway --file ./exec-approvals.json
openclaw approvals set --node <id|name|ip> --file ./exec-approvals.json

openclaw approvals allowlist add "~/Projects/**/bin/rg"
openclaw approvals allowlist add --agent main --node <id|name|ip> "/usr/bin/uptime"
openclaw approvals allowlist remove "~/Projects/**/bin/rg"
```

从这个接口形态就能看出来，官方希望你把 approvals 当成一套可导入、可比对、可按 agent 管理的正式配置。

## approvals 文件到底放在哪里

当前官方文档明确写到：

```text
~/.openclaw/exec-approvals.json
```

而且是：

- 每个执行宿主各有一份

所以 Gateway 和 Node 不是自动共享一张 allowlist。

## per-agent allowlist 为什么越来越重要

官方最新文档把 allowlist 写得很清楚：

- allowlist 是 per-agent 的
- 路径匹配是大小写不敏感的 glob
- 应尽量匹配可执行文件路径，而不是只写 basename

这意味着更稳的理解方式不是：

- “谁都能复用一张命令白名单”

而是：

- “每个 agent 只拿到它真的需要的执行面”

## `main`、`*` 和默认项该怎么理解

CLI 文档里 `--agent` 默认是 `"*"`，表示对所有 agent 生效。  
但从长期治理角度看，更稳的顺序通常是：

1. 先给 `main` 做最小 allowlist
2. 再给特定运维 agent 或内容 agent 做单独条目
3. 最后才考虑是否需要 `"*"`

如果太早把 `"*"` 当默认策略，后面最容易出现：

- 一个 agent 的便利，变成所有 agent 的通行证

## 官方最新文档里最值的一条提醒

Exec Approvals 文档最近把这件事写得很直白：

- approvals 不是 per-user auth boundary

更准确地说，它更像：

- 已授权操作者对宿主机执行风险的最后一道运行时闸门

所以你不能把 approvals 当成完整身份系统，而要把它和：

- pairing
- gateway auth
- channel approver 范围

一起看。

## `allowlist`、`ask` 和 `safeBins` 不该混成一件事

官方最近已经把这三层分得更清楚了：

- `allowlist`：显式信任某条可执行路径
- `ask`：命中不到 allowlist 时是否继续弹审批
- `safeBins`：只适合极窄的 stdin-only 文本过滤器

尤其是 `safeBins`，官方明确提醒不要把：

- `python`
- `node`
- `bash`
- `zsh`

这类解释器直接塞进去。

## 中文团队更适合怎么落地

更稳的默认顺序通常是：

1. 先把 Gateway 和 Node 分开看
2. 先用 `get` 导出现状
3. 只给核心 agent 加最小 allowlist
4. 保持 `ask=on-miss`
5. 对解释器类命令继续保留显式审批

这样会比“先放开再慢慢收”更适合长期运维。

## 最容易踩的坑

### 1. 把 Gateway allowlist 当成 Node allowlist

不是同一份宿主配置。

### 2. 一上来就用 `--agent "*"`

后面很难再判断哪些命令到底该归谁。

### 3. 只看 allowlist，不看 fallback

如果 UI 不可达，`askFallback` 会直接影响最后是否放行。

## 下一步推荐

- [Exec 工具、apply_patch 与执行审批](/docs/manual/exec-tools-and-approvals)
- [OpenClaw 安全配置基础](/docs/operations/safety-basics)
- [团队里如何做 per-agent 执行白名单治理](/best-practices/per-agent-allowlist-governance)

