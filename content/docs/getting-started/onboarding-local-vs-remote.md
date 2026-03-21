---
title: Onboarding 的本地模式和远程模式怎么选
description: 基于最新官方 Onboarding Wizard 文档，整理 openclaw onboard 在 local 与 remote 两种模式下分别会做什么、不会做什么，以及第一次使用更适合走哪条路。
category: 入门
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/start/wizard
sourceName: OpenClaw Docs
sourceType: official
tags: [onboarding, remote, local, gateway, wizard]
---

# Onboarding 的本地模式和远程模式怎么选

官方最近把 `openclaw onboard` 写得比以前清楚很多，最重要的变化不是多了哪个选项，而是它把两条完全不同的路径明确拆开了：

- local mode
- remote mode

如果第一次就把这两条线混了，后面最容易出现“本地以为自己在配置整个系统，实际上只改了客户端”这种问题。

## 两种模式最核心的区别

根据最新官方 Wizard 文档：

- `local` 模式是在当前机器上配置并运行 Gateway
- `remote` 模式只是把当前机器配置成去连接别处的 Gateway

更直白一点说：

- local 会碰运行环境本身
- remote 不会改远程主机

这就是最重要的边界。

## local mode 会做什么

官方当前文档列出的 local flow 很完整，主要会覆盖：

- 模型和认证
- workspace 与 bootstrap 文件
- gateway 端口、bind、auth、tailscale
- channels 与 providers
- daemon 安装
- health check
- skills 安装

所以 local mode 更像一轮“正式初始化”，它会把当前机器真正变成 OpenClaw 的运行主机。

## remote mode 不会做什么

官方文档这次特别强调了一点：

- remote mode 不会安装也不会修改远程主机

这意味着它不会：

- 帮你在 VPS 上装 OpenClaw
- 帮你改远程 Gateway 配置
- 帮你在远程机器安装 daemon

它只是在当前这台机器上写“如何连接到那台已经存在的 Gateway”。

## 第一次使用时更适合走哪条路

对大多数第一次接触 OpenClaw 的用户来说，更适合先走：

- `local`

原因很简单：

- 你更容易看清系统到底跑在哪
- 更容易跑通 Control UI
- 排错变量更少

只有当你已经明确知道：

- Gateway 要跑在另一台长期在线机器

时，remote mode 才更合适。

## QuickStart 和 Advanced 的区别也值得一起理解

官方当前 wizard 还把流程分成：

- QuickStart
- Advanced

更适合的理解方式是：

- QuickStart：先用推荐默认值跑通最小链路
- Advanced：你已经知道自己要改哪些边界

如果你还在纠结“local 还是 remote”，通常也不太适合一开始就走 Advanced。

## re-run wizard 到底会不会把现有环境清掉

官方文档这次把这点说得很清楚：

- 重新运行 wizard 不会自动清空现有环境
- 除非你显式选择 `Reset`
- 或者传 `--reset`

这对维护者特别重要，因为它意味着：

- `onboard` 不是一次性命令
- 后面你完全可以用它重新整理配置

但前提是你要知道自己是在改 local 还是 remote。

## local mode 更适合哪些场景

更适合 local 的通常包括：

- 本机首次体验
- 单人使用
- 想先把 Control UI 跑起来
- 想把排错变量压到最少

## remote mode 更适合哪些场景

更适合 remote 的通常包括：

- Gateway 已经跑在 VPS / 家庭服务器
- 这台机器只是 operator 入口
- 你不希望本机持有主会话和渠道状态

## 中文站建议的判断顺序

如果你现在还没决定怎么开始，建议按这个顺序判断：

1. 这台机器是不是最终的 Gateway 主机
2. 如果是，先走 local
3. 如果不是，而且远程主机已经准备好了，再走 remote

只要先把这一步想清楚，后面很多安装、Control UI 和远程访问问题都会少很多。

## 下一步推荐

- [Onboarding 引导流程说明](/docs/getting-started/onboarding-guide)
- [OpenClaw 安装与环境](/docs/setup/installation)
- [远程访问与 Tailscale / SSH](/docs/operations/remote-access)

把这几页连起来看，第一次接入就更不容易把“在哪运行”和“从哪控制”混掉。
