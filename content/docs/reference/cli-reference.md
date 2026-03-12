---
title: CLI 命令参考
description: OpenClaw 命令行工具完整参考，包含所有命令和选项说明。
category: 参考
updatedAt: 2026-03-12
sourceType: official
tags: [cli, reference, commands, terminal]
---

# CLI 命令参考

OpenClaw 提供了完整的命令行工具，用于管理、配置和操作 OpenClaw 实例。

## 全局选项

```bash
openclaw [options] <command>

选项：
  -c, --config <path>    指定配置文件路径
  -e, --env <path>       指定环境变量文件路径
  -v, --verbose          显示详细输出
  -q, --quiet            静默模式
  --version              显示版本号
  --help                 显示帮助信息
```

## 核心命令

### openclaw onboard

初始化 OpenClaw 并完成首次配置。

```bash
openclaw onboard [options]

选项：
  --install-daemon    安装后台守护进程
  --skip-model        跳过模型配置
  --skip-channels     跳过渠道配置
  --non-interactive   非交互模式
```

**示例：**

```bash
# 完整初始化
openclaw onboard --install-daemon

# 非交互模式
openclaw onboard --non-interactive
```

### openclaw start

启动 OpenClaw Gateway。

```bash
openclaw start [options]

选项：
  -d, --detach        后台运行
  -p, --port <port>   指定端口
  --no-daemon         前台运行
```

**示例：**

```bash
# 前台启动
openclaw start

# 后台启动
openclaw start --detach

# 指定端口
openclaw start --port 8080
```

### openclaw stop

停止 OpenClaw Gateway。

```bash
openclaw stop [options]

选项：
  --force    强制停止
  --wait     等待完全停止
```

### openclaw restart

重启 OpenClaw Gateway。

```bash
openclaw restart [options]

选项：
  --force    强制重启
```

### openclaw status

查看运行状态。

```bash
openclaw status [options]

选项：
  --json     JSON 格式输出
  --watch    实时监控
```

**输出示例：**

```
Gateway Status: Running
  PID: 12345
  Uptime: 2h 30m
  Memory: 256 MB
  CPU: 2.5%
  
Channels:
  webchat: active
  telegram: active
  discord: inactive
  
Agents:
  default: active
  work-assistant: active
```

### openclaw dashboard

打开 Control UI。

```bash
openclaw dashboard [options]

选项：
  --port <port>    指定端口
  --no-open        不自动打开浏览器
```

### openclaw doctor

诊断系统问题。

```bash
openclaw doctor [options]

选项：
  --fix    自动修复问题
```

**检查项目：**

- Node.js 版本
- 配置文件完整性
- 环境变量设置
- 网络连接
- 模型 API 连接
- 渠道配置

## Agent 命令

### openclaw agents list

列出所有 Agent。

```bash
openclaw agents list [options]

选项：
  --json    JSON 格式输出
```

### openclaw agents create

创建新 Agent。

```bash
openclaw agents create <name> [options]

选项：
  -m, --model <model>       指定模型
  -s, --system <prompt>     系统提示词
  --skills <skills>         技能列表（逗号分隔）
```

**示例：**

```bash
openclaw agents create my-assistant --model gpt-4
```

### openclaw agents show

显示 Agent 详情。

```bash
openclaw agents show <name>
```

### openclaw agents update

更新 Agent 配置。

```bash
openclaw agents update <name> [options]

选项：
  -m, --model <model>       更新模型
  -s, --system <prompt>     更新系统提示词
  --enable-skills <skills>  启用技能
  --disable-skills <skills> 禁用技能
```

### openclaw agents delete

删除 Agent。

```bash
openclaw agents delete <name> [options]

选项：
  --force    跳过确认
```

### openclaw chat

与 Agent 对话。

```bash
openclaw chat [options]

选项：
  -a, --agent <name>    指定 Agent
  -m, --message <text>  发送消息（非交互模式）
```

**示例：**

```bash
# 交互模式
openclaw chat

# 指定 Agent
openclaw chat --agent work-assistant

# 单条消息
openclaw chat -m "今天天气怎么样？"
```

## 渠道命令

### openclaw channels list

列出所有渠道。

```bash
openclaw channels list [options]

选项：
  --json    JSON 格式输出
```

### openclaw channels status

查看渠道状态。

```bash
openclaw channels status [channel]
```

### openclaw channels enable

启用渠道。

```bash
openclaw channels enable <channel>
```

### openclaw channels disable

禁用渠道。

```bash
openclaw channels disable <channel>
```

### openclaw channels logs

查看渠道日志。

```bash
openclaw channels logs <channel> [options]

选项：
  -f, --follow    实时跟踪
  -n, --lines     显示行数
```

## 技能命令

### openclaw skills list

列出可用技能。

```bash
openclaw skills list [options]

选项：
  --installed    只显示已安装
  --json         JSON 格式输出
```

### openclaw skills search

搜索技能。

```bash
openclaw skills search <query>
```

### openclaw skills info

显示技能详情。

```bash
openclaw skills info <skill>
```

### openclaw skills install

安装技能。

```bash
openclaw skills install <skill> [options]

选项：
  --version <version>    指定版本
```

### openclaw skills uninstall

卸载技能。

```bash
openclaw skills uninstall <skill>
```

### openclaw skills update

更新技能。

```bash
openclaw skills update [skill] [options]

选项：
  --all    更新所有技能
```

### openclaw skills test

测试技能。

```bash
openclaw skills test <skill> [options]

选项：
  --query <text>    测试查询
```

## 工作流命令

### openclaw workflows list

列出所有工作流。

```bash
openclaw workflows list [options]

选项：
  --json    JSON 格式输出
```

### openclaw workflows show

显示工作流详情。

```bash
openclaw workflows show <workflow>
```

### openclaw workflows run

执行工作流。

```bash
openclaw workflows run <workflow> [options]

选项：
  --param <key=value>    传递参数
  --dry-run              测试运行
```

### openclaw workflows enable

启用工作流。

```bash
openclaw workflows enable <workflow>
```

### openclaw workflows disable

禁用工作流。

```bash
openclaw workflows disable <workflow>
```

### openclaw workflows logs

查看工作流日志。

```bash
openclaw workflows logs <workflow> [options]

选项：
  -f, --follow    实时跟踪
```

## 工具命令

### openclaw tools list

列出可用工具。

```bash
openclaw tools list [options]

选项：
  --enabled    只显示已启用
```

### openclaw tools enable

启用工具。

```bash
openclaw tools enable <tool>
```

### openclaw tools disable

禁用工具。

```bash
openclaw tools disable <tool>
```

## 配置命令

### openclaw config get

获取配置值。

```bash
openclaw config get <key>
```

**示例：**

```bash
openclaw config get model.default
openclaw config get channels.telegram.enabled
```

### openclaw config set

设置配置值。

```bash
openclaw config set <key> <value>
```

**示例：**

```bash
openclaw config set model.default gpt-4
openclaw config set logLevel debug
```

### openclaw config list

列出所有配置。

```bash
openclaw config list [options]

选项：
  --json    JSON 格式输出
```

## 记忆命令

### openclaw memory stats

查看记忆统计。

```bash
openclaw memory stats
```

### openclaw memory search

搜索记忆。

```bash
openclaw memory search <query> [options]

选项：
  -l, --limit    结果数量限制
```

### openclaw memory clear

清除记忆。

```bash
openclaw memory clear [options]

选项：
  --agent <name>    指定 Agent
  --all             清除所有
  --force           跳过确认
```

## 日志命令

### openclaw logs

查看系统日志。

```bash
openclaw logs [options]

选项：
  -f, --follow         实时跟踪
  -n, --lines <n>      显示行数
  --level <level>      日志级别过滤
  --since <time>       时间范围
```

**示例：**

```bash
# 实时查看日志
openclaw logs --follow

# 查看最近 100 行
openclaw logs -n 100

# 只看错误日志
openclaw logs --level error
```

## 更新命令

### openclaw update

更新 OpenClaw。

```bash
openclaw update [options]

选项：
  --check    只检查更新
  --force    强制更新
```

### openclaw version

显示版本信息。

```bash
openclaw version
```

## 帮助命令

### openclaw help

显示帮助信息。

```bash
openclaw help [command]
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `OPENCLAW_HOME` | 主目录路径 |
| `OPENCLAW_CONFIG_PATH` | 配置文件路径 |
| `OPENCLAW_STATE_DIR` | 状态目录路径 |
| `OPENCLAW_LOG_LEVEL` | 日志级别 |
| `OPENCLAW_PORT` | 默认端口 |
| `OPENCLAW_API_KEY` | API 密钥 |

## 快捷命令别名

| 别名 | 完整命令 |
|------|----------|
| `o` | `openclaw` |
| `o s` | `openclaw status` |
| `o d` | `openclaw dashboard` |
| `o c` | `openclaw chat` |

## 下一步

- [配置参考](/docs/reference/configuration-reference)
- [故障排除](/docs/reference/troubleshooting)
- [快速入门](/docs/getting-started/getting-started)