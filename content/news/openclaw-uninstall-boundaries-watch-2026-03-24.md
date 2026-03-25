---
title: "OpenClaw 维护观察：卸载边界正在从“删包”变成“服务、状态、profile 与远程主机”的完整收口"
description: "基于 2026 年 3 月 24 日可见的官方 Updating 与 uninstall 文档，最近最值得关注的变化之一是 OpenClaw 的卸载和移除边界正在被官方主动写清，不再只是删除 CLI。"
category: 生态观察
date: "2026-03-24"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/cli/uninstall"
updatedAt: "2026-03-24"
sourceType: "official"
tags: ["uninstall", "maintenance", "profiles", "gateway", "state"]
---

如果只把 OpenClaw 卸载理解成“删一个全局包”，很容易低估最近官方维护文档最值得注意的变化。

最近官方对 uninstall 和 Updating 的表达，已经越来越明确地把卸载写成：

- 服务
- 状态目录
- profile
- 远程 Gateway 主机

一起参与的收口动作。

## 1. 官方已经把 `openclaw uninstall` 做成正式维护命令

这说明卸载不再只是手工删文件，而是正式的运维面。

## 2. profile 和远程主机会直接改变“你到底在卸哪台”

这条边界特别值得中文团队注意。  
因为很多“我明明删了怎么还在跑”的问题，本质上不是卸载失败，而是：

- 删错了 profile
- 删错了主机

## 3. 备份先于卸载正在成为官方明确建议

当前官方 uninstall 文档已经直接提醒：

- 先 `openclaw backup create`

这说明官方对卸载的心智也在变：

- 不是先删掉再说
- 而是先保留可恢复快照

## 推荐延伸阅读

- [安装器、更新与卸载](/docs/setup/installer-update-and-uninstall)
- [stable、beta、dev 更新通道该怎么选](/docs/operations/update-channels-and-safe-rollout)
- [版本迁移与升级检查单](/docs/setup/migration-guide)

