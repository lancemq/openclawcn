---
title: 安装器、更新与卸载
description: 基于官方安装器、更新和卸载文档，整理 OpenClaw 从首次安装到原地升级、服务移除和彻底卸载的完整维护路径。
category: 安装
updatedAt: 2026-03-12
source: https://docs.openclaw.ai/zh-CN/install/updating
sourceName: OpenClaw Docs
sourceType: official
tags: [installation, updater, uninstall, doctor, maintenance]
---

# 安装器、更新与卸载

很多中文用户第一次看 OpenClaw 时，会把安装理解成“一次性动作”。但从官方文档结构看，安装、更新和卸载是一条连续的维护链路，而不是三件互不相关的小事。

更稳的理解方式是：

- 安装器负责把 CLI、Gateway 和运行时环境放到正确位置
- 更新负责在现有环境上原地升级并做基本健康检查
- 卸载负责把服务、状态目录和工作区有边界地清掉

## 官方安装器到底做了什么

官方中文文档列出了三条正式安装器路径：

- `install.sh`：推荐安装器，默认走全局 npm 安装，也支持 `git` 安装
- `install-cli.sh`：无 root 权限的 CLI 安装器，安装到独立前缀目录
- `install.ps1`：Windows PowerShell 安装器

安装器不是只做“下载一个包”，而是会处理这些事情：

- 识别操作系统环境
- 检查并准备 `Node.js 22+`
- 决定安装方式是全局 npm 还是源码检出
- 在需要时继续进入 onboarding 或 `doctor`

如果你想先看安装器会做什么，官方建议直接看帮助：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --help
```

## 更新时最推荐的路径

官方当前最推荐的升级方法，不是自己手动拼命令，而是重新运行网站安装脚本，走原地升级：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

这条路径的意义在于：

- 能识别现有安装
- 会在原地升级
- 需要时会触发 `openclaw doctor`
- 比“自己改一半 npm、git 和服务”更不容易出状态不一致

如果你不希望再次走 onboarding，可以加：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

## 源码安装怎么更新

如果你走的是 `git` 安装，官方文档强调安装器只会在仓库干净时执行 `git pull --rebase`。这意味着：

- 源码安装更适合需要看实现和快速调试的人
- 但如果本地仓库有改动，更新不会帮你无脑覆盖

对应命令可以写成：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --install-method git --no-onboard
```

这比手工在不明确安装方式的情况下乱拉版本更稳。

## 更新前先确认哪几件事

官方文档把升级看成发布流程的一部分。更稳的顺序是：

1. 先确认自己当前是全局安装还是源码安装
2. 再确认是否有 profile、多 Gateway 或远程 Gateway
3. 更新后做 `doctor`、重启和验证
4. 最后再恢复日常流量和真实渠道

如果你把“更新”理解成只换一个包版本，后面遇到服务、状态目录和认证不一致会很难排。

## 为什么 `doctor` 很重要

官方多处文档都把 `openclaw doctor` 当成安装后、升级后和卡住时的通用检查入口。

它更适合回答这些问题：

- 运行时依赖是否齐全
- 当前环境是否有明显异常
- 某些安装步骤有没有漏掉

所以更稳的更新后动作通常是：

```bash
openclaw doctor
openclaw gateway restart
openclaw status
```

## 卸载不是只删一个包

官方卸载文档把卸载拆成了明确步骤，说明真正要清理的不只是 CLI。

简单路径是：

```bash
openclaw uninstall
```

如果你要非交互式执行：

```bash
openclaw uninstall --all --yes --non-interactive
```

或者：

```bash
npx -y openclaw uninstall --all --yes --non-interactive
```

## 手动卸载时要清哪些内容

官方说明的手动步骤本质上包括四层：

1. 停止 Gateway 服务
2. 卸载服务管理项
3. 删除状态目录和配置
4. 视需要删除工作区与 CLI 安装

常见动作包括：

- `openclaw gateway stop`
- `openclaw gateway uninstall`
- 删除 `OPENCLAW_STATE_DIR` 指向的状态目录
- 删除自定义 `OPENCLAW_CONFIG_PATH`
- 删除工作区目录
- 按安装方式运行 `npm rm -g openclaw` / `pnpm remove -g openclaw` / `bun remove -g openclaw`

## profile 和远程 Gateway 会改变什么

这也是中文用户最容易漏掉的部分。

如果你使用了：

- `--profile`
- `OPENCLAW_PROFILE`
- 远程 Gateway

那状态目录和服务并不一定在你当前这台机器的默认位置。官方文档明确提醒：

- profile 会让状态目录变成 `~/.openclaw-<profile>` 这样的独立位置
- 远程模式下，真正需要停服务和删状态目录的是 Gateway 主机

所以“本地删干净了但系统还在跑”通常不是怪事，而是删错了主机或删错了 profile。

## 什么时候更适合源码安装

结合官方文档和本站现有内容，更适合源码安装的场景通常是：

- 你需要看实现
- 你要跑 watch 模式调试
- 你经常跟进上游变化
- 你希望升级和排错都更可控

而对多数只想稳定使用的人，官方默认安装器会更省心。

## 中文站建议的维护顺序

如果你希望长期稳定使用 OpenClaw，推荐把维护动作固定成这个节奏：

1. 安装时记录安装方式
2. 升级时优先重跑官方安装器
3. 升级后跑 `doctor`、重启和验证
4. 需要彻底移除时先卸载服务，再删状态和工作区

## 下一步推荐

- [安装指南](/docs/setup/installation)
- [版本迁移与升级检查单](/docs/setup/migration-guide)
- [Gateway 运维与日常检查](/docs/operations/gateway-operations)
- [故障排除与诊断思路](/docs/reference/troubleshooting)
