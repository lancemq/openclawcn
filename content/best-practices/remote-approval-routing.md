---
title: 远程值守时如何设计聊天审批路由
description: 结合最新官方 Exec Approvals 与 Remote Operators 文档，整理一套更稳的远程审批路由设计，避免把远程值守便利性直接变成高权限扩散。
category: 运维治理
difficulty: 高级
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/tools/exec-approvals
sourceName: OpenClaw Docs
sourceType: official
tags: [approvals, remote, telegram, discord, operators, routing]
---

# 远程值守时如何设计聊天审批路由

当 Gateway 跑在远程主机上以后，一个很现实的问题很快就会出现：

- 人不总在 Dashboard 或本地控制台前

这也是为什么官方最近把聊天审批转发和内建 approval client 都补得更清楚。  
但更方便，不代表应该更宽。

## 第一原则：通知面和批准面分开

更稳的做法通常不是：

- 谁能看到审批消息，谁就能批

而是：

- 通知面可以略宽
- 批准面继续很窄

这条原则在 Telegram 和 Discord 里都适用。

## 第二原则：先定主审批入口，再定兜底入口

远程值守最怕的是审批面四处分散，最后没人知道该去哪处理。

更稳的默认结构通常是：

- 一个主审批入口
- 一个兜底入口

例如：

- Telegram approver DM 做主审批
- Discord operator 频道做兜底通知

## 第三原则：默认优先 `allow-once`

远程场景里最容易因为图方便，过度使用 `allow-always`。  
但对大多数高权限宿主机动作来说，更稳的默认仍然是：

- `allow-once`

尤其是：

- 写文件
- 解释器执行
- 生产环境检查
- 不确定是否会长期反复出现的命令

## 第四原则：聊天审批范围要跟 operator 范围一起收

如果你的 operator 入口本来就很多、很多人都在看，那么聊天审批面更不该直接复用同一批成员。

更稳的做法是：

- operator 可以多一点
- approver 继续少一点

## 第五原则：高风险动作和低风险动作分开节奏

有些命令适合值守团队快速一次性放行，有些则更适合继续留在本地审批。

更适合聊天审批的通常是：

- 低频但可判断
- 描述清晰
- 风险可控

不太适合的通常是：

- 参数复杂
- 解释器 / shell 包装层太厚
- 真实影响面不容易在聊天里看清

## 一个更稳的默认拓扑

### Telegram

- 作为少数 approver 的 DM 审批面

### Discord

- 作为团队通知或二线值守面

### Dashboard / Control UI

- 作为最终的详细审查和配置面

这样会比“什么都丢进同一个群里批”更可治理。

## 最容易踩的坑

### 1. 把审批消息发到开放群

这通常会带来过宽的可见性和误批风险。

### 2. 所有审批都依赖同一个聊天入口

一旦那个入口不可用，值守就断掉。

### 3. 频繁用 `allow-always` 取代真正的治理

后面会让 allowlist 越堆越大。

## 一条更稳的实施顺序

1. 先在本地理解审批信息结构
2. 先选一个主审批入口
3. 先只开放给少量 approver
4. 默认优先 `allow-once`
5. 再根据值守频率决定是否补兜底入口

## 下一步推荐

- [Telegram 和 Discord 作为审批入口时该怎么收边界](/docs/manual/telegram-discord-approval-clients)
- [Exec approvals 转发到聊天渠道该怎么设计](/docs/operations/chat-approval-forwarding)
- [Remote Operators 与多设备协作](/docs/operations/remote-operators-and-nodes)

