---
title: Skills 配置与热重载
description: 理解 OpenClaw 的 skills 配置项、allowBundled、extraDirs、watch、entries.enabled 和运行时环境注入边界。
category: 功能
updatedAt: 2026-03-18
source: https://docs.openclaw.ai/zh-CN/tools/skills-config
sourceName: OpenClaw Docs
sourceType: official
tags: [skills, config, allowBundled, watch, env]
---

# Skills 配置与热重载

上一篇 [Skills 系统怎么工作](/docs/manual/skills-system) 讲的是“Skills 是什么”。这一页补的是另一个高频缺口：**Skills 到底该怎么配置，哪些字段真的会影响运行时行为。**

根据官方 2026 年 3 月的 Skills 配置页，所有 Skills 相关配置都在：

```json
{
  "skills": {
    "allowBundled": ["peekaboo"],
    "load": {
      "extraDirs": ["~/Projects/team-skills/skills"],
      "watch": true,
      "watchDebounceMs": 250
    },
    "install": {
      "preferBrew": true,
      "nodeManager": "npm"
    },
    "entries": {
      "peekaboo": { "enabled": true },
      "deployPilot": { "enabled": false }
    }
  }
}
```

## 1. 先把 Skills 配置分成四层

更容易理解的方式不是死记字段名，而是按职责分层：

### 1. 候选集合

决定“哪些技能有资格进入候选池”：

- `allowBundled`
- `load.extraDirs`

### 2. 刷新方式

决定“技能变化后多久被重新看到”：

- `load.watch`
- `load.watchDebounceMs`

### 3. 单项启停

决定“候选池里的某个技能要不要真的启用”：

- `entries.<name>.enabled`

### 4. 安装方式

决定“依赖多的技能如何安装和构建”：

- `install.nodeManager`
- `install.preferBrew`

## 2. `allowBundled` 最容易被误解

官方当前写得很清楚：`allowBundled` 只作用于**内置 bundled skills**。

这意味着：

- 它不会限制工作区技能
- 不会限制 ClawHub 安装的技能
- 不会限制 `extraDirs` 挂进来的团队技能

所以它更像“收缩默认内置能力面”，而不是“全局技能白名单”。

更适合的用法通常是：

- 你只想保留极少数内置技能
- 你在做受控环境，希望把默认能力收窄
- 你不希望 bundled skills 自动越变越多

## 3. `extraDirs` 更适合团队技能仓库

官方 2026 年 3 月配置页把 `load.extraDirs` 明确列为正式入口。这很重要，因为它给了团队一个比“手工复制技能目录”更稳的共享路径。

它更适合：

- 团队统一技能仓库
- 私有技能包
- 本地开发中的实验技能集

但也要记住：

- 它的优先级低于工作区技能
- 适合“共享”，不适合“覆盖当前项目的特殊版本”

如果你需要项目级定制，还是更适合放到 `<workspace>/skills`。

## 4. `watch` 是热重载，不是实时魔法

官方当前对 `watch` 的说明很值得单独讲清楚：

- Skills 会在会话开始时做一次 snapshot
- 同一会话后续轮次会重用这份技能列表
- 开启 watcher 或出现新的可用远程节点时，技能列表可以在会话中刷新

这意味着：

- 改完 `SKILL.md` 并不等于当前轮立刻生效
- 更像“热重载”，而不是“每个 token 都重新扫目录”
- 真正的技能变化通常会在下一轮或下一会话更稳定地体现出来

## 5. `watchDebounceMs` 解决的是抖动

如果你在本地频繁修改技能目录、脚本或 `SKILL.md`，文件系统变化可能非常密集。`watchDebounceMs` 的作用是把一串快速变化合并成一次刷新，避免：

- 重复重载
- 提示词快照频繁抖动
- 本地调试体验变差

默认思路通常是：

- 本地开发可开
- 生产环境不一定需要一直开

## 6. `entries.<name>.enabled` 是最有效的治理开关

当 Skills 数量开始增加后，最稳的做法不是“继续装更多”，而是回到逐项开关。

例如：

```json
{
  "skills": {
    "entries": {
      "reviewer": { "enabled": true },
      "deployPilot": { "enabled": false },
      "browserQa": { "enabled": true }
    }
  }
}
```

这类配置特别适合：

- A/B 测试技能收益
- 暂停有风险或不稳定的技能
- 在不删除目录的前提下快速收窄能力面

## 7. `env` / `apiKey` 的边界必须讲清楚

官方 Skills 文档现在明确写明：当智能体运行开始时，OpenClaw 会把 `skills.entries.<key>.env` 或 `skills.entries.<key>.apiKey` 注入 `process.env`，运行结束后再恢复。

这件事很关键，因为它意味着：

- 注入范围是**一次智能体运行**
- 不是永久写进你的 shell 环境
- 但它仍然进入了宿主机进程，不是沙箱里的“假环境变量”

因此更适合的安全心智是：

- 只给你信任的技能注入 secret
- 不要把“能读 env 的技能”当成低风险技能
- 实验技能优先放到独立 workspace

## 8. `install.nodeManager` 不只是个人偏好

官方配置页把 `nodeManager` 明确限制在：

- `npm`
- `pnpm`
- `yarn`
- `bun`

同时也提醒了一点：**Gateway 运行时仍然是 Node，不推荐把 bun 当作主要运行假设。**

这意味着 `nodeManager` 更多是在决定：

- 依赖如何安装
- 技能脚本怎样构建
- 你的团队环境更接近哪种包管理器

如果你希望降低变异性，团队内最好统一这一项。

## 9. 一条更适合长期环境的配置顺序

建议按下面顺序推进：

1. 先只保留少量高频 bundled skills 或已知可靠技能
2. 再挂 `extraDirs` 接团队技能
3. 再用 `entries.<name>.enabled` 控制逐项启停
4. 本地开发时再考虑 `watch`
5. 最后才给特定技能注入 `env` / `apiKey`

这个顺序的好处是：你先控制能力面，再谈便利性。

## 10. 什么时候该把配置问题单独排查

出现下面这些现象时，不要先怀疑模型，而要回头看 Skills 配置：

- 技能目录明明存在，但始终不被调用
- 改了 `SKILL.md`，当前会话里效果没变
- 某个技能安装成功，但 Agent 看起来“不知道它存在”
- 同名技能覆盖关系和预期不一致

这些问题很多都不是“技能写坏了”，而是：

- 优先级理解错了
- `enabled` 没开
- watcher / snapshot 还没刷新
- secret 注入或安装方式没对齐

## 下一步推荐

- [Skills 系统怎么工作](/docs/manual/skills-system)
- [工具概览与能力边界](/docs/manual/tools-overview)
- [OpenClaw 安全配置基础](/docs/operations/safety-basics)
- [关键配置参考](/docs/reference/configuration-reference)
