---
title: OAuth 认证与多账号管理
description: 理解 OpenClaw 如何处理 OAuth 认证、Token 存储和多账号路由，以及常见问题排查。
category: manual
updatedAt: 2026-06-10
sourceType: official
source: https://docs.openclaw.ai/concepts/oauth
tags: [oauth, auth, codex, claude, profiles]
---

# OAuth 认证与多账号管理

你的 Agent 需要调用模型 API，而 API 调用需要认证。OpenClaw 支持两种认证方式：**API Key** 和 **OAuth**。这一篇帮你搞清楚 OAuth 是怎么回事，Token 存在哪里，以及多账号怎么管理。

## 先搞清楚：你需要 OAuth 吗？

| 场景 | 推荐方式 | 原因 |
|------|---------|------|
| 个人使用，有 ChatGPT Plus/Pro 订阅 | OAuth | 直接用订阅额度，不需要额外付费 |
| 团队/生产环境 | API Key | 稳定、可控、不会被意外登出 |
| 用 Anthropic Claude | API Key | 更稳定，OAuth 目前还在实验阶段 |
| 需要多个账号 | OAuth + Profile | 每个账号一个 Profile，按需切换 |

**结论**：如果你是个人用户，有 ChatGPT 订阅，想省点钱，OAuth 是个好选择。如果是生产环境，优先用 API Key。

## Token 存在哪里

OpenClaw 把 OAuth Token 存在 SQLite 数据库里：

```
~/.openclaw/agents/<agentId>/agent/openclaw-agent.sqlite
```

**为什么要用 SQLite 而不是 JSON 文件**：OAuth 提供商在刷新 Token 时可能会使旧 Token 失效。如果多个客户端（OpenClaw、Claude Code、Codex CLI）同时用同一个 Token，就会互相"踢下线"。SQLite 支持文件锁，确保同一时刻只有一个进程在刷新 Token。

**旧版兼容**：如果你之前用过旧版 OpenClaw，Token 可能还在 `~/.openclaw/credentials/oauth.json` 或 `~/.openclaw/agents/<agentId>/agent/auth.json` 里。运行 `openclaw doctor --fix` 可以自动迁移。

## 登录流程：OpenAI Codex

OpenAI Codex OAuth 明确支持在 OpenClaw 中使用。登录命令：

```bash
openclaw models auth login --provider openai
```

流程（PKCE）：
1. OpenClaw 生成 PKCE verifier/challenge + 随机 state
2. 打开浏览器，跳转到 `https://auth.openai.com/oauth/authorize?...`
3. 尝试在 `http://127.0.0.1:1455/auth/callback` 捕获回调
4. 如果你是远程/无头环境，浏览器会显示一个 URL，手动复制粘贴回来
5. 交换 Token 并存储

**多账号**：用 `--profile-id openai:<name>` 为不同账号创建不同 Profile：

```bash
# 个人账号
openclaw models auth login --provider openai --profile-id openai:personal

# 工作账号
openclaw models auth login --provider openai --profile-id openai:work
```

## 登录流程：Anthropic

Anthropic 目前有两种方式：

### 方式一：API Key（推荐）

```bash
openclaw models auth login --provider anthropic
# 按提示输入 API Key
```

### 方式二：Claude CLI 复用

如果你主机上已经有本地 Claude 登录（通过 `claude` 命令），OpenClaw 可以直接复用它，不需要重新登录。

```bash
# 验证复用是否成功
openclaw models auth status --provider anthropic
```

**注意**：Claude CLI 复用是个人开发场景最方便的方式，但生产环境建议用 API Key。

## 多账号管理

### 方式一：独立 Agent（推荐新手）

最简单的方式——每个账号用一个独立 Agent：

```bash
# 创建个人 Agent
openclaw agents add personal

# 创建工作 Agent
openclaw agents add work
```

每个 Agent 有独立的会话、凭据和工作区，完全隔离。

### 方式二：单 Agent 多 Profile（进阶）

如果你想在一个 Agent 里管理多个账号，用 Profile 路由：

```json5
{
  auth: {
    order: {
      openai: ["openai:user@gmail.com", "openai:api-key-backup"],
    },
  },
}
```

**优先级顺序**：
1. `auth.order` 显式配置的顺序
2. `auth.profiles` 按提供商过滤
3. SQLite 存储的 Profile 条目

**会话级别切换**：

```
/model openai/gpt-4@openai:work
```

**查看已有 Profile**：

```bash
openclaw channels list --json
```

## Token 刷新机制

OpenClaw 在以下情况自动刷新 Token：

- Token 过期时（检查 `expires` 时间戳）
- 刷新时使用文件锁保护，防止多进程冲突
- 刷新后的 Token 写回 SQLite 存储

**关键规则**：
- 主 Agent 刷新 Token 时，辅助 Agent 读取到的也是最新 Token
- 辅助 Agent 不会把刷新后的 Token 写回主 Agent 存储——它只读取
- 外部 CLI（如 Codex CLI）的 Token 管理是独立的，OpenClaw 会尽量协调

## 常见问题

### 问题一：频繁被登出

**症状**：在 OpenClaw 和 Claude Code / Codex CLI 之间使用时，经常被踢下线。

**原因**：OAuth 提供商在登录/刷新期间可能使旧 Refresh Token 失效。如果你同时用多个客户端，它们会互相"踢"。

**解决方案**：
1. 检查是否同时在多个客户端登录同一个账号
2. 用 `openclaw doctor --fix` 检查 Token 状态
3. 如果冲突持续，考虑一个工具用 OAuth，另一个用 API Key

### 问题二：远程环境登录困难

**症状**：在无头服务器上运行 OpenClaw，无法打开浏览器完成 OAuth。

**解决方案**：
1. 在本地电脑完成 OAuth 登录
2. 把 `~/.openclaw/agents/<agentId>/agent/openclaw-agent.sqlite` 复制到服务器
3. 或者用 API Key 代替 OAuth

### 问题三：Profile 切换不生效

**症状**：用 `/model` 切换了 Profile，但 Agent 似乎还在用旧的。

**原因**：OpenClaw 会对会话固定选中的 Profile（为了缓存效率）。切换后需要新会话才生效。

**解决方案**：切换 Profile 后，发送 `/new` 开始新会话。

## 相关文档

- [模型故障转移](/docs/manual/model-failover)
- [认证配置文件轮转](/docs/reference/auth-profile-rotation-and-session-pinning)
- [SecretRefs 与运行时快照](/docs/reference/secret-refs-and-runtime-snapshot)
