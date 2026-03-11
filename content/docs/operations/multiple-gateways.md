---
title: 多 Gateway 与隔离运行
description: 当一台机器上需要运行多个 OpenClaw 实例时，如何用 profile、独立端口和独立状态目录避免冲突。
category: 运维
updatedAt: 2026-03-11
source: https://docs.openclaw.ai/gateway/multiple-gateways
sourceName: OpenClaw Docs
sourceType: official
tags: [gateway, profile, multi-instance, isolation, operations]
---

# 多 Gateway 与隔离运行

大多数 OpenClaw 使用场景，一个 Gateway 就够了。但官方文档专门提供了 `multiple-gateways` 和 `gateway-lock` 说明，说明“多实例隔离”并不是边缘需求，而是当你准备做 rescue bot、测试环境、生产隔离或多 workspace 运行时必须认真处理的一层。

## 什么时候需要多个 Gateway

下面几种情况最常见：

- 想把测试环境和正式环境分开
- 想做一个 rescue bot 用来救援主实例
- 想让不同团队或不同项目使用独立配置
- 想把某些高风险实验和主实例隔离开

如果你只是想“多接几个渠道”，那通常不需要多个 Gateway。一个 Gateway 本来就能服务多个渠道连接。

## 为什么不能只复制一份命令就开跑

多个实例最容易出的问题不是“命令执行失败”，而是隐性冲突：

- 端口冲突
- 状态目录互相覆盖
- 凭证和会话混淆
- browser / canvas / CDP 这些派生端口撞车

这也是官方为什么强调“隔离 checklist”。

## 至少要隔离的几样东西

官方建议的隔离项包括：

- `OPENCLAW_CONFIG_PATH`
- `OPENCLAW_STATE_DIR`
- 默认 workspace
- `gateway.port`

只要这些里面有一项共用了，后面就可能出现配置竞争、会话串线或端口占用问题。

## 为什么 `--profile` 很重要

官方当前更推荐直接用 `--profile`，因为它会自动帮你把：

- state dir
- config path
- service name

按 profile 维度隔开。

这比你自己手写一堆环境变量更不容易出错。

## 一个更实用的多实例场景

### 主实例 + rescue 实例

这是官方很强调的一个模式。

主实例负责正常工作；rescue 实例则：

- 独立 profile
- 独立状态目录
- 独立 workspace
- 独立端口范围

这样即使主实例状态异常，rescue 实例仍能作为一个隔离良好的“维护入口”。

## 端口为什么要留足间隔

OpenClaw 并不只有一个 base port。除了 Gateway 本身，浏览器控制、Canvas、CDP 等能力还会派生出一组相关端口。

所以多实例时不应该只想“这个端口没重复就行”，而要考虑：

- base port 不同
- 派生端口也不撞
- 明确留出足够间隔

如果你只盯着主端口，很容易出现“Gateway 能起，但 browser/canvas 出问题”的情况。

## Gateway lock 在保护什么

官方 `gateway-lock` 文档强调了一点：同一 base port 上只能有一个 Gateway 实例拿到监听权。如果端口已被占用，启动就应该立即失败，而不是半残状态继续运行。

这对运维很重要，因为它避免了：

- 两个实例都以为自己启动成功
- 日志里混杂不清
- 端口被别的进程占住但你没有意识到

## 多实例最常见的误区

### 1. 把“多渠道”误解成“多 Gateway”

OpenClaw 的多渠道设计，本来就是让一个 Gateway 管多个渠道。不要在还没需要隔离前就把复杂度抬高。

### 2. profile 分开了，但 workspace 没分开

这样表面上看像隔离了，实际仍然可能互相污染工作区和状态。

### 3. 只改一个端口，其他派生端口没考虑

这在浏览器控制和 Canvas 相关能力里尤其常见。

## 更适合的实践顺序

1. 先确认单实例已稳定运行
2. 再定义“为什么需要第二个实例”
3. 用 `--profile` 做隔离，而不是手工复制粘贴
4. 检查端口、状态目录、workspace 是否都隔离
5. 启动后分别验证两个实例的状态与入口

## 什么情况下不值得做

如果你当前还在：

- 第一次安装
- 只跑最小链路
- 只接一个或几个渠道

那通常不值得急着做多 Gateway。先把一个实例跑稳，收益更高。

## 下一步推荐

- 想理解日常运维：看 [Gateway 运维与日常检查](/docs/operations/gateway-operations)
- 想处理安全边界：看 [OpenClaw 安全配置基础](/docs/operations/safety-basics)
- 想理解远程访问：看 [远程访问与 Tailscale / SSH](/docs/operations/remote-access)
