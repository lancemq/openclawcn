---
title: 安装器方式和升级路径怎么选
description: 基于最新官方 Install 与 Updating 文档，整理 install.sh、install-cli.sh、PowerShell 安装器、全局包安装和 git 安装各自适合什么场景，以及后续升级时应该走哪条路径。
category: 安装
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/install
sourceName: OpenClaw Docs
sourceType: official
tags: [installation, updater, install-script, git, maintenance]
---

# 安装器方式和升级路径怎么选

官方最近的安装文档已经不只是“给一条命令”，而是在明确一件事：安装方式本身会决定你后面的升级路径。

这点很重要，因为很多升级事故都不是“OpenClaw 升坏了”，而是：

- 安装方式和升级方式没对上

## 最推荐的默认路径还是 install.sh

根据当前官方文档，最推荐的方式仍然是官网安装器：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

它适合大多数人，因为它会一起处理：

- Node 检测
- CLI 安装
- onboarding

如果你想要最少判断成本，这条路依然是默认首选。

## `install-cli.sh` 更适合什么人

官方还单独保留了 `install-cli.sh`，它更像一条“只装 CLI、不碰更多系统层”的路径。

更适合的场景通常是：

- 没有 root 权限
- 想装到独立前缀目录
- 只想先拿到 CLI，不想一次做完整初始化

它不是更高级，只是更适合受限环境。

## PowerShell 安装器的意义

Windows 这条线官方仍然保留：

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

但官方同时继续强调：

- 真正推荐的 Windows 使用方式仍然是 WSL2

所以更适合把 PowerShell 路径理解成“保底入口”，而不是最优长期路线。

## 直接全局安装 CLI 适合什么情况

如果你已经有稳定的 Node 环境，也可以直接：

```bash
npm install -g openclaw@latest
```

或：

```bash
pnpm add -g openclaw@latest
```

这更适合：

- 你已经管理好 Node
- 你知道自己不需要安装器帮你兜环境
- 你只是想快速拿到最新 CLI

但后面升级时，也更应该沿着这条路径维护，而不是突然切回别的安装模型。

## git 安装为什么不该和“普通安装”混着理解

官方文档对 git 安装的态度其实很清楚：

- 适合需要源码、调试、跟进 main 的人
- 不适合把它当成“更高级的普通安装”

因为一旦你走 git 路线，后面就会出现：

- 本地修改
- rebase / pull
- worktree 干净与否

这时维护模型已经完全不一样了。

## 升级时最重要的一条原则

更稳的升级方式通常是：

- 用和安装时一致的路径升级

例如：

- install.sh 装的，就优先重跑 install.sh
- 全局 npm 装的，就优先走包管理器升级
- git 装的，就按 git 路线维护

这样最不容易出现：

- CLI 更新了
- 状态目录逻辑没对上
- 安装器和手工升级各改一半

## install.sh 为什么特别适合长期维护

官方 Updating 文档当前最推荐的，依然是原地重跑安装器：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

这条路径的价值在于：

- 能识别已有安装
- 能处理原地升级
- 必要时串上 doctor

对多数稳定使用者来说，这比自己手工拼升级流程省心很多。

## 中文站建议怎么选

如果你现在在选安装方式，可以按这个顺序：

1. 普通使用者：优先 `install.sh`
2. 受限主机：再考虑 `install-cli.sh`
3. 已有成熟 Node 环境：可以直接全局装 CLI
4. 要看实现或跟 main：再走 git

只要一开始把安装方式选清楚，后面升级和卸载都会轻很多。

## 下一步推荐

- [安装器、更新与卸载](/docs/setup/installer-update-and-uninstall)
- [版本迁移与升级检查单](/docs/setup/migration-guide)
- [升级窗口怎么安排更稳](/best-practices/staged-upgrade-windows)

把这几页一起看，安装方式就不再只是“今天怎么装”，而是“后面怎么一直维护”。
