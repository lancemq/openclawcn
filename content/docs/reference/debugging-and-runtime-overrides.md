---
title: 调试、运行时覆盖与开发排障
description: 基于官方 debugging 和 FAQ 文档，整理 `/debug`、watch 模式、dev profile 以及排查流式输出异常时最值得先看的入口。
category: 排错
updatedAt: 2026-03-12
source: https://docs.openclaw.ai/zh-CN/help/debugging
sourceName: OpenClaw Docs
sourceType: official
tags: [debugging, debug, runtime-overrides, doctor, logs]
---

# 调试、运行时覆盖与开发排障

官方中文文档在 help 区单独放了 debugging 页面，这说明 OpenClaw 的调试方式不是“出错了看日志”这么简单，而是有专门的运行时覆盖和开发模式。

## `/debug` 解决的是什么问题

官方文档把 `/debug` 定义成运行时配置覆盖入口。它只改内存中的当前行为，不会把修改写回磁盘配置。

这很适合处理两类场景：

- 你想临时试一个设置，不想改 `openclaw.json`
- 你在排查某个奇怪行为，想快速切换一个不常用选项

官方给出的例子包括：

```text
/debug show
/debug set messages.responsePrefix="[openclaw]"
/debug unset messages.responsePrefix
/debug reset
```

其中 `/debug reset` 会把当前运行时覆盖清掉，回到磁盘配置状态。

## `/debug` 默认不是启用的

官方文档写得很明确：`/debug` 默认关闭，要通过：

```json
{
  "commands": {
    "debug": true
  }
}
```

来开启。

这意味着如果你在生产环境给团队成员开了这项能力，也要知道它是在给运行时配置增加即时修改入口。

## 什么时候更适合用运行时覆盖

更适合用 `/debug` 的通常是：

- 调试流式输出异常
- 临时验证一个消息前缀或响应选项
- 快速回退到磁盘配置

而不太适合：

- 长期配置管理
- 团队共享正式配置
- 版本化管理的系统设置

## watch 模式适合谁

官方 debugging 文档还提供了 Gateway 监视模式：

```bash
pnpm gateway:watch --force
```

它本质上是让 Gateway 在文件监视器下运行，适合：

- 本地开发
- 快速迭代
- 频繁验证配置或改动

如果你是源码安装并且要频繁调试，这个模式会比每次手动重启更顺。

## dev profile / dev gateway 的意义

虽然官方文档更偏开发者视角，但这里的核心思想对中文用户也很实用：

- 调试环境和正式环境不要混在一起
- 运行时试验不要直接污染长期使用实例

所以如果你准备尝试新 provider、新工具或高风险设置，更适合先放到 dev profile 或单独实例里。

## FAQ 给出的排查顺序仍然很重要

官方 FAQ 对“新手引导卡住”“wake up my friend 无响应”这类问题给了一套很实用的命令顺序：

```bash
openclaw gateway restart
openclaw status
openclaw models status
openclaw logs --follow
openclaw doctor
```

这条顺序很有价值，因为它比“只看一个报错”更能快速定位问题是在：

- Gateway 本身
- 模型认证
- 日志和运行状态
- 环境完整性

## 流式输出异常更该怎么看

官方 debugging 文档提到，这页特别适合处理“provider 把 reasoning 混进正常文本”之类的问题。

这说明如果你遇到：

- 回复文本夹杂异常推理内容
- 前缀不对
- 流式显示混乱

就不该只盯着前端，而要把它当成 provider 输出和运行时消息配置一起看的问题。

## 中文用户最容易忽略的点

### 把调试覆盖当正式配置

`/debug` 是运行时覆盖，不是最终配置管理。

### 在主环境直接开很多实验开关

这样排障时会搞不清是正式配置问题还是临时覆盖问题。

### 出问题只重试，不看状态命令

很多问题其实 `status`、`logs --follow` 和 `doctor` 很快就能给出方向。

## 更稳的调试顺序

1. 先用 `status` 和 `logs` 看系统是否健康
2. 必要时跑 `doctor`
3. 如果是行为类异常，再用 `/debug` 做临时覆盖验证
4. 真正确认后再改回正式配置

## 下一步推荐

- [故障排除与诊断思路](/docs/reference/troubleshooting)
- [Gateway 运维与日常检查](/docs/operations/gateway-operations)
- [Exec 工具、apply_patch 与执行审批](/docs/manual/exec-tools-and-approvals)
- [安装器、更新与卸载](/docs/setup/installer-update-and-uninstall)
