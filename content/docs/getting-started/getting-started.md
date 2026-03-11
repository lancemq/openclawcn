---
title: 快速入门
description: 按官方推荐链路，在本机完成 OpenClaw 的安装、初始化、状态检查和第一次进入 Control UI。
category: 入门
updatedAt: 2026-03-11
sourceType: official
tags: [quickstart, installation, onboarding, dashboard]
---

# 快速入门

这页的目标不是继续解释概念，而是带你用一条最短路径真正把 OpenClaw 跑起来。按照官方当前的入门链路，第一次上手最稳的顺序是：

1. 安装 OpenClaw
2. 运行 onboarding
3. 检查 gateway 状态
4. 打开 dashboard
5. 从 Control UI 开始第一次使用

如果你只是第一次体验，不要一开始就接多个渠道、多个模型或远程入口。先把本机最小链路跑通，后面再扩展。

## 开始前准备

在执行命令前，先确认：

- 当前机器已经安装可用的 Node.js 环境
- 终端可以正常访问 npm 和 GitHub
- 本机浏览器可正常打开本地地址
- 你准备先在本地完成第一次使用，而不是直接部署到远程服务器

如果你还没确认这些前置条件，先看 [安装与环境](/docs/setup/installation)。

## 第 1 步：安装 OpenClaw

官方当前推荐直接通过 npm 安装 CLI：

```bash
npm install -g openclaw
```

安装完成后，可以先确认命令已经可用：

```bash
openclaw --version
```

如果这里就报错，优先检查：

- Node.js 版本是否过旧
- 全局 npm 安装路径是否在 `PATH` 中
- 企业网络、代理或镜像源是否拦截了安装过程

## 第 2 步：运行 onboarding

OpenClaw 当前的推荐第一次初始化方式是执行 onboarding，并在需要时安装 daemon：

```bash
openclaw onboard --install-daemon
```

这一步的目标不是“配置完所有能力”，而是让系统进入一个可启动、可检查的状态。第一次使用时，你只需要重点关注两件事：

- onboarding 是否顺利完成
- 当前是否已经提示你继续进入 dashboard 或下一步状态检查

如果这里失败，不要立刻去接渠道，先看 [Onboarding 引导流程说明](/docs/getting-started/onboarding-guide) 和 [故障排除与诊断思路](/docs/reference/troubleshooting)。

## 第 3 步：检查运行状态

完成 onboarding 后，先不要急着聊天，先检查 gateway 是否已经正常运行：

```bash
openclaw gateway status
```

理想状态下，你应该能看到当前 gateway 的基本状态信息。如果这里不正常，说明问题大概率还在本机环境、初始化或运行状态上，而不是聊天入口本身。

## 第 4 步：打开 dashboard

确认状态正常后，再打开 dashboard：

```bash
openclaw dashboard
```

对大多数第一次接触 OpenClaw 的用户来说，dashboard 也就是最合适的第一站。因为它更像 Control UI，适合做这些事情：

- 看当前系统是否已经正常运行
- 确认 onboarding 结果是否生效
- 检查还缺哪些配置
- 从一个更可见、可控的入口开始第一次使用

如果你更关心 Control UI 的角色，可以继续看 [Control UI 是什么](/docs/manual/control-ui)。

## 第 5 步：完成第一次最小体验

当 dashboard 可以正常打开后，第一次使用建议只做下面几件事：

1. 看当前系统是否健康
2. 确认自己已经知道主要入口在哪里
3. 只体验一条最小链路，不同时扩展多个功能

第一次上手最常见的错误，不是“不会用”，而是一次做得太多。只要本地最小链路已经跑通，你就已经完成了这次快速入门。

## 跑通之后下一步看什么

根据你的目标，下一步建议这样选：

- 想理解整体结构：看 [OpenClaw 核心能力总览](/docs/manual/core-capabilities)
- 想继续理解初始化流程：看 [Onboarding 引导流程说明](/docs/getting-started/onboarding-guide)
- 想理解控制台作用：看 [Control UI 是什么](/docs/manual/control-ui)
- 想准备扩展入口：看 [渠道能力概览](/docs/manual/channels-overview)
- 想先降低风险：看 [安全配置基础](/docs/operations/safety-basics)

## 快速入门常见问题

### 安装成功了，但 `openclaw` 命令不能用

优先检查全局安装路径是否进入 `PATH`，以及 npm 是否装到了当前 shell 可见的位置。

### onboarding 成功了，但 dashboard 打不开

先回头检查 `openclaw gateway status` 是否正常，再判断是不是本地端口、权限或认证问题。

### 是否应该先接消息渠道

不建议。第一次使用更稳的方式，是先在本机通过 dashboard 或 Control UI 跑通最小链路，再进入渠道接入。

## 一条最短命令清单

如果你已经理解上面的说明，最短路径就是这三条：

```bash
npm install -g openclaw
openclaw onboard --install-daemon
openclaw dashboard
```

只是更推荐你在第二步和第三步之间加一次状态检查：

```bash
openclaw gateway status
```
