---
title: 正式配置、环境变量和一次性 override 应该怎么分层
description: 结合最新官方 Configuration、Environment Variables、Logging 和 Debugging 文档，总结长期环境里怎么区分 on-disk config、env 注入、CLI 覆盖和 /debug 一次性改动，避免把临时修复留成永久配置。
category: 配置治理
difficulty: 高级
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/gateway/configuration
sourceName: OpenClaw Docs
sourceType: official
tags: [configuration, env, overrides, debugging, operations]
---

# 正式配置、环境变量和一次性 override 应该怎么分层

OpenClaw 最近的配置相关文档越来越明确地在鼓励一种分层思路：

- 正式配置一层
- 环境变量一层
- 一次性 override 再一层

如果这些层不分开，团队后面最容易遇到的就是：

- 临时修复留成长期状态
- 不知道现在到底是谁在生效
- 升级后没人敢动

## 第一原则：on-disk config 应该承载稳定默认

最适合放进 `openclaw.json` 的通常是：

- 你希望长期存在的默认策略
- agent / channel / tool / model 的稳定配置
- 团队都认可的正式行为

也就是说，这一层更像：

- 稳定意图

而不是：

- 临时调试开关

## 第二原则：环境变量更适合秘密和部署差异

官方现在已经把 env source 和 substitution 讲得很清楚了。

更适合放在 env 里的通常是：

- API keys
- token / password
- 不同环境之间变化很大的部署参数

因为这些东西往往：

- 不适合写死在磁盘配置里
- 也不适合靠聊天式 `/debug` 去改

## 第三原则：CLI override 更适合“一次启动就要不同”

官方 Logging 文档里其实给了很典型的模式：

- `OPENCLAW_LOG_LEVEL=debug`
- `openclaw --log-level debug gateway run`

这类覆盖最适合：

- 只对这一次运行生效
- 退出后就应该恢复原状

它的价值就在于：

- 不需要为了临时观察而改正式配置

## 第四原则：`/debug` 更适合会话期运行时试验

官方 Debugging 文档现在明确写到：

- `/debug` 改的是 runtime-only config overrides
- 在内存里，不写盘

这类方式特别适合：

- 临时试一个 obscure setting
- 验证某个 responsePrefix / runtime 行为
- 想快速回退

它最不适合做的，就是：

- 被当成正式配置管理手段

## 第五原则：不要让临时 override 成为“看不见的真相来源”

长期环境里最危险的一种情况是：

- 磁盘配置写的是 A
- 进程环境里是 B
- 当前命令又临时改成 C
- 聊天 session 里还有个 `/debug` 的 D

最后没有人能快速回答：

- 现在到底是谁在生效

所以更稳的做法是：

- 每一层都只承担自己的职责

## 第六原则：日志与诊断尤其适合一次性 override

像：

- `OPENCLAW_LOG_LEVEL`
- `OPENCLAW_DIAGNOSTICS`

这类官方明确支持的 env overrides，特别适合：

- 复现一次问题
- 看完就关

因为它们的价值就在于：

- 临时放大可观测性

而不是：

- 改变系统长期行为

## 第七原则：正式修复后要把临时层收回来

很多排障最后会经历：

1. 开 env override
2. 开 diagnostics
3. 用 `/debug` 试一个参数

但真正修好后，更重要的一步反而是：

- 把临时层全部清掉

不然你会在未来某天再次遇到：

- “为什么这台机器表现和配置文件不一样”

## 哪些东西更不该放在临时 override 里

长期策略类配置不适合长期挂在一次性层里，例如：

- agent 默认模型
- 组织级 routing / bindings
- 正式安全边界
- 长期 retention / maintenance 规则

这些更应该回到 on-disk config 或明确的部署注入层。

## 中文用户最容易踩的坑

### 1. 用 `/debug` 改出一个“终于能跑”的状态，然后忘了关

这会让会话级状态变成隐性配置。

### 2. 用环境变量长期覆盖正式配置，却没人知道

这在 launchd / systemd 场景里尤其常见。

### 3. 为了看一次问题，直接改磁盘配置

很多观察类需求其实用 CLI / env override 更合适。

## 一条更稳的分层方式

建议固定成这套：

1. 磁盘配置放长期默认
2. env 放秘密和部署差异
3. CLI / env override 放一次性运行差异
4. `/debug` 只放会话期实验

## 下一步推荐

- [环境变量从哪里来，优先级怎么排](/docs/reference/env-sources-and-precedence)
- [配置热重载、includes 与合并边界](/docs/operations/config-hot-reload-and-includes)
- [调试、运行时覆盖与开发排障](/docs/reference/debugging-and-runtime-overrides)
