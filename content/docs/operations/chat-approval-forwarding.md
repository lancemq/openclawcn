---
title: Exec approvals 转发到聊天渠道该怎么设计
description: 基于最新官方 approvals 文档，解释 OpenClaw 如何把 exec approval 请求转发到聊天渠道、/approve 命令怎么工作，以及为什么它适合远程值班但不适合无限扩散批准权。
category: 运维
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/cli/approvals
sourceName: OpenClaw Docs
sourceType: official
tags: [approvals, exec, chat, forwarding, operations]
---

# Exec approvals 转发到聊天渠道该怎么设计

OpenClaw 最近把 approvals 文档补得更细以后，一个很值得中文站单独展开的点是：

- exec approval 不一定非要在本地控制台前点

官方已经把“转发到聊天渠道再批准”的链路做成了正式能力，这对远程值班特别有用。

## 这条能力到底在解决什么问题

很多 Gateway 不再跑在操作者手边，而是：

- 跑在远程主机
- 跑在家庭服务器
- 跑在团队共用节点

这时如果所有 exec approval 都要求：

- 你人必须坐在原控制台前

实际运营成本会很高。

官方 approvals forwarding 正是在解决：

- 执行请求出现在远程环境
- 但批准动作可以从受控聊天入口完成

## 转发后你能看到什么

根据官方文档，approval request 本身会带比较完整的元信息，例如：

- 命令和参数
- 当前工作目录
- agent id
- 解析后的可执行文件路径

这很重要，因为聊天里做批准，最怕的是：

- 只看到一句“要不要批准”
- 却不知道真正会执行什么

官方现在这套设计，本质上是在尽量把关键判断信息也一起带过去。

## `/approve` 在这里扮演什么角色

当前官方文档明确列出了聊天渠道里的命令形态：

```text
/approve <id> allow-once
/approve <id> allow-always
/approve <id> deny
```

这意味着聊天渠道里的批准，不是模糊自然语言，而是：

- 显式的、带 id 的操作

这对可审计性和误操作控制都更好。

## 三种动作应该怎么理解

### `allow-once`

更适合：

- 一次性高风险动作
- 临时诊断
- 你还不想把这类命令长期放进白名单

### `allow-always`

更适合：

- 你已经非常清楚这类命令的范围
- 它会频繁出现

但它的风险也最高，因为它会把本来逐次审查的动作变成持久放行。

### `deny`

这不是失败分支，而是正式安全动作。

越是远程和值班场景，越应该把“拒绝”当成正常路径。

## 为什么这条线特别适合远程值班

因为远程环境里最常见的现实是：

- 你不总在 Dashboard 前
- 但又不能让 exec 完全无人批准

官方 approvals forwarding 恰好让这两件事可以同时成立：

- 继续保留人工门
- 又不要求操作者总在同一台机器前

## 为什么它不适合无限扩散批准权

聊天里可批，不等于谁都该能批。

更稳的做法通常是：

- 把 forwarding 发到受控 operator 入口
- 只有少量核心成员拥有 `/approve` 权限

否则你会把原本集中在主机侧的高权限执行，扩散到太多聊天成员手里。

## 转发和 allowlist / pairing 要一起看

这条边界很重要。

因为如果你的聊天入口本身：

- pairing 太宽
- allowlist 太松
- 群组过大

那 approval forwarding 的安全边界也会被同步放大。

所以更稳的顺序应该是：

1. 先把聊天入口收紧
2. 再考虑把审批消息转发进去

## 哪些动作更适合只允许 `allow-once`

更适合逐次批准的通常是：

- 文件改动范围不确定的命令
- 包含宿主机写操作的动作
- 生产环境诊断
- 你还没决定是否长期信任的执行模式

这些场景下，直接给 `allow-always` 很容易过头。

## 中文用户最容易踩的坑

### 1. 觉得“转发了”就等于更安全

转发只是改变批准入口，不会自动替你收紧权限。

### 2. 在开放群里做 approvals

这几乎总比在受控 operator 入口里做更危险。

### 3. 频繁用 `allow-always` 替代真正的规则治理

这会让审批系统慢慢退化成“先放开再说”。

## 一条更稳的落地顺序

建议按这个顺序：

1. 先在本地或 Dashboard 理解 approval 对象和命令信息
2. 再把 forwarding 发到受控聊天入口
3. 默认优先 `allow-once`
4. 只有高频、低风险且范围明确的命令再考虑 `allow-always`

## 下一步推荐

- [Exec 工具、apply_patch 与执行审批](/docs/manual/exec-tools-and-approvals)
- [需要审批的自动化流程应该怎么设计](/best-practices/approval-gated-automation)
- [多人协作时怎么管理 Operator 浏览器入口](/best-practices/operator-browser-discipline)
