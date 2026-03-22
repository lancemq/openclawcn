---
title: 环境变量从哪里来，优先级怎么排
description: 基于最新官方 Environment Variables 与 Configuration 文档，解释 OpenClaw 会从哪些来源读取环境变量、为什么默认不覆盖已有值，以及 `.env`、config env 和 shell import 之间真正的优先级。
category: 参考
updatedAt: 2026-03-22
source: https://docs.openclaw.ai/help/environment
sourceName: OpenClaw Docs
sourceType: official
tags: [env, configuration, precedence, shell, reference]
---

# 环境变量从哪里来，优先级怎么排

OpenClaw 最近把 Environment Variables 单独做成了一页，这非常值。  
因为很多中文用户对配置出问题的第一反应都是：

- “我明明在 `.env` 写了”
- “我 config 里也写了，为什么没生效”

而官方这页其实把核心规则写得很直接：

- never override existing values

## 最重要的一句先记住

OpenClaw 会从多个来源读 env，但默认原则不是“后面的覆盖前面的”，而是：

- 只有缺失时才补

这和很多人对 dotenv 的直觉不一样。

## 官方当前给出的优先级

根据最新官方文档，从高到低是：

1. 进程环境
2. 当前工作目录 `.env`
3. 全局 `~/.openclaw/.env`
4. 配置文件里的 `env` block
5. 可选的 shell env import

但要注意，这条优先级并不意味着“后者能覆盖前者”，而更像：

- 按顺序补齐缺项

## 进程环境为什么永远最强

如果 Gateway 进程是被：

- 当前 shell
- systemd / launchd
- Docker / 容器运行器

这些父进程带着 env 启动的，那这些值就是最上层事实来源。

官方最近还特别提醒了一个很实用的坑：

- macOS 的 `launchctl setenv` 可能长期覆盖你的 config，导致 persistent unauthorized

这说明很多“为什么配置改了没用”，实际根因并不在 JSON，而在父进程环境。

## 当前目录 `.env` 和全局 `.env` 的关系

官方当前把两层 `.env` 分得很清楚：

### 当前工作目录 `.env`

更适合：

- 当前项目临时运行
- 当前 workspace 特定变量

### 全局 `~/.openclaw/.env`

更适合：

- 机器级共享缺省值
- 同一台主机上多个项目复用的凭据

它们都只会：

- 补不存在的键

不会抢掉已经在进程环境里的值。

## config 里的 `env` block 在什么位置

官方现在明确支持在配置里直接写：

```json
{
  "env": {
    "OPENROUTER_API_KEY": "sk-or-...",
    "vars": {
      "GROQ_API_KEY": "gsk-..."
    }
  }
}
```

但这层的语义仍然是：

- applied only if missing

所以它更像：

- 配置里的 fallback env

而不是：

- 最终强制覆盖源

## shell env import 为什么放在最后

官方当前把它列成可选项，而且写得很明确：

- 只在 expected keys 缺失时才运行

配置形态是：

```json
{
  "env": {
    "shellEnv": {
      "enabled": true,
      "timeoutMs": 15000
    }
  }
}
```

等价的 env 开关是：

```bash
OPENCLAW_LOAD_SHELL_ENV=1
```

这说明 shell import 不是日常主要来源，而更像：

- 最后补缺项的兜底层

## env substitution 和 env source 不是一回事

官方配置文档最近还明确支持：

```json
{
  "gateway": { "auth": { "token": "${OPENCLAW_GATEWAY_TOKEN}" } }
}
```

这只是：

- 在配置字符串里引用现有 env

而不是：

- 再创造一套新的 env 覆盖规则

所以这两件事要分开理解：

- env 从哪里来
- config 怎么引用 env

## 为什么“不覆盖已有值”这条规则很重要

它真正解决的是：

- 你可以给不同层放默认值
- 但不容易把显式注入的生产凭据悄悄覆盖掉

这对：

- CI/CD
- system service
- 多环境部署

尤其重要。

## 中文用户最容易踩的坑

### 1. 以为 `.env` 一定会压过进程环境

官方默认不是这么设计的。

### 2. 以为 config 里的 `env` 比 `.env` 更强

其实它仍然只是在补缺。

### 3. 忘了 launchd / systemd 这类父进程环境才是真正上游

这会让你在磁盘上改半天配置却没有变化。

## 一条更稳的使用路径

建议按这个顺序理解和排查：

1. 先看当前进程环境是否已经有值
2. 再看项目 `.env`
3. 再看全局 `~/.openclaw/.env`
4. 再看 config `env` block
5. 最后才确认 shell import 是否参与

## 下一步推荐

- [配置热重载、includes 与合并边界](/docs/operations/config-hot-reload-and-includes)
- [调试、运行时覆盖与开发排障](/docs/reference/debugging-and-runtime-overrides)
- [doctor 的 repair、force 和 non-interactive 应该怎么选](/docs/reference/doctor-repair-modes)
