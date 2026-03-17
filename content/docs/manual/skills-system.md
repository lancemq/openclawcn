---
title: Skills 系统怎么工作
description: 理解 OpenClaw Skills 的三层来源、加载流程、ClawHub 风险，以及为什么不应该一次安装过多技能。
category: 功能
updatedAt: 2026-03-17
source: https://docs.openclaw.ai/zh-CN/tools/skills
sourceName: OpenClaw Docs
sourceType: official
tags: [skills, clawhub, tools, security]
---

# Skills 系统怎么工作

如果你把 OpenClaw 理解成“能做很多事情的 Agent”，那 Skills 就是把这些事情组织成可复用能力单元的核心机制之一。

但 Skills 的重点不只是“装什么”，更是：

- 从哪里加载
- 哪些会覆盖哪些
- 模型怎么知道当前有哪些能力
- 第三方技能到底有多大风险

## 1. Skills 的实际来源比“三层”更细

根据官方当前文档，Skills 更适合拆成下面几层：

### 工作区级 `<workspace>/skills`

只对当前项目或当前 workspace 生效，并且优先级最高。

这层最适合：

- 团队私有技能
- 项目特定流程
- 对共享技能或 bundled skills 的局部重写

### 共享 / 本地管理级 `~/.openclaw/skills`

这层更像“同一台机器上的公共技能区”。官方现在把它解释为 managed/local 技能覆盖层，适合：

- 机器级共享技能
- 本地 patch 或 pin 某个技能
- 不想直接改 bundled skills 时做覆盖

### 额外共享目录 `skills.load.extraDirs`

官方现在把它单独列为 Skills 配置的一部分。它适合挂团队技能包或统一技能仓库，但优先级低于工作区和本地管理级。

### 内置技能

随 OpenClaw 发布的 bundled skills，开箱即用。

### 插件附带技能

官方现在还明确说明：插件可以在 `openclaw.plugin.json` 里声明自己的 `skills` 目录。只要插件启用，这些技能也会进入正常的优先级系统。

## 2. 优先级为什么重要

如果同名 Skill 在多个来源同时存在，官方当前给出的优先级可以概括成：

1. 工作区级
2. 共享 / 本地管理级
3. `extraDirs`
4. bundled skills

这带来的实际意义是：

- 你可以在项目里重写一个全局技能
- 不需要修改底层内置技能
- 其他项目不会被一并影响

这也是为什么工作区级技能特别适合团队协作。

## 3. Skills 启动时会做什么

一个更容易理解的加载流程通常是：

1. 扫描可用技能目录
2. 读取每个技能的核心说明和元信息
3. 判断是否满足需要的环境变量或依赖
4. 结合启停配置过滤不可用项
5. 把可用能力注入当前 system prompt / 运行环境

真正关键的是最后一步：模型必须“知道自己能做什么”，否则技能即使存在，也未必能被正确调用。

## 4. ClawHub 现在不只是安装入口

ClawHub 更适合被理解成公开技能注册表，而不是默认可信白名单。

它的价值在于：

- 发现技能
- 安装技能
- 更新和管理版本
- 让社区共享能力方向

但它的风险也很明确：

- 公开生态质量参差不齐
- 重复和低质量内容很多
- 第三方技能天然带来执行权限风险

官方 2026 年 3 月版文档里，ClawHub 的常见流程已经很完整：

```bash
clawhub search "calendar"
clawhub install <skill-slug>
clawhub update --all
clawhub sync --all
```

同时它还补了几个很实用的细节：

- 默认安装到当前工作目录的 `./skills`
- 如果当前目录不是工作区，会回退到已配置的 OpenClaw workspace
- 已安装技能会记录在 `.clawhub/lock.json`
- `sync` 可以扫描旧技能目录并做发布/对齐

## 5. 为什么不能一次装太多 Skills

每增加一个 Skill，不只是“多一个功能”，还会带来额外成本：

- system prompt 更长
- 能力选择更复杂
- 排查变难
- 安全面扩大

因此更稳的做法通常是：

- 先装 3 到 5 个高频技能
- 跑熟后再逐步增加
- 不要为了“看起来很强”把几十个技能同时堆进去

## 6. 哪些 Skills 更适合先装

更适合第一批尝试的通常是：

- 检索与调研
- 文档整理
- 代码审查
- 轻量浏览器操作
- 与当前工作强相关的少量自动化能力

不建议第一批就大量接入的通常是：

- 高权限终端执行
- 生产部署操作
- 钱包、密钥、敏感账户集成

## 7. Skills 配置现在值得单独看

官方把 Skills 配置页拆得更细了，说明现在真正影响使用体验的，不只是“有没有装”，还包括：

- `skills.allowBundled`
- `skills.load.extraDirs`
- `skills.load.watch`
- `skills.load.watchDebounceMs`
- `skills.entries.<name>.enabled`
- `skills.install.nodeManager`

其中几个最容易忽略：

- `allowBundled` 只影响内置技能，不影响工作区或 ClawHub 安装的技能
- `watch: true` 可以在 `SKILL.md` 变化时自动刷新 skills snapshot
- `entries.<name>.enabled` 是控制复杂度最有效的逐项开关

## 8. 自建 Skill 应该怎么理解

一个 Skill 的核心不在于目录多复杂，而在于：

- 说明清不清楚
- 触发条件是否明确
- 所需环境变量是否写清
- 输出和副作用是否可控

很多时候，一个最小可用 Skill 只需要一个清晰的 `SKILL.md`。

官方创建 Skills 页面到 2026 年 3 月的核心定义仍然很清楚：

- Skill 本质上就是一个带 `SKILL.md` 的目录
- 可选带脚本和资源
- 重点是说明、边界、触发和副作用写得是否清楚

## 9. 第三方 Skills 最该防什么

比起“技能能不能运行”，更该优先判断的是：

- 是否要求额外下载可执行文件
- 是否要求运行不透明 shell 脚本
- 是否会修改长期记忆或人格文件
- 是否试图接触高权限目录、密钥或远程系统

一旦你把它装进系统，它就不再只是“内容”，而是实际执行能力的一部分。

官方 2026 年 3 月版 Skills 页还新增了一条很关键的安全边界：

- `skills.entries.*.env`
- `skills.entries.*.apiKey`

这些配置会把秘密注入**宿主机进程**，而不是沙箱。所以一旦技能本身不可信，风险会比很多人想象得更大。

## 10. 还要考虑 prompt 成本

官方 Skills 总页现在明确写了：只要有可用 Skills，OpenClaw 就会把一份紧凑的 skills 列表注入系统提示。也就是说：

- 技能越多，prompt 越长
- 描述越啰嗦，成本越高
- “装很多但不常用”的技能会长期抬高上下文负担

这也是为什么技能治理从来不是“越多越好”。

## 11. 一条更稳的使用路径

建议按下面顺序推进：

1. 先理解 Skills 来源和优先级
2. 先装少量高频技能
3. 先在独立 workspace 测试
4. 再考虑把技能带进长期环境
5. 需要定制时，再写项目级 Skill

## 下一步推荐

- [热门技能](/skills)
- [关键配置](/configurations)
- [OpenClaw 安全配置基础](/docs/operations/safety-basics)
- [Agent 工作区结构说明](/docs/manual/agent-workspace)
