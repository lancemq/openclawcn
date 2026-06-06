---
title: OAuth 认证与多账号管理
description: 了解 OpenClaw 的 OAuth 认证机制、Token 存储、多账号路由和常见问题排查。
category: manual
updatedAt: 2026-06-06
sourceType: official
source: https://docs.openclaw.ai/concepts/oauth
tags: [oauth, auth, codex, claude, profiles]
---

# OAuth 认证与多账号管理

OpenClaw 支持通过 OAuth 使用提供商订阅认证，目前主要支持 **OpenAI Codex (ChatGPT OAuth)**。

## Token 存储

OAuth 凭据存储在 Agent 认证存储中：

- **主要存储**：`~/.openclaw/agents/<agentId>/agent/openclaw-agent.sqlite`
- **旧版兼容**：`~/.openclaw/agents/<agentId>/agent/auth.json`
- **旧版导入**：`~/.openclaw/credentials/oauth.json`

所有路径也支持 `$OPENCLAW_STATE_DIR` 环境变量覆盖。

## 登录流程

### OpenAI Codex (ChatGPT OAuth)

OpenAI Codex OAuth 明确支持在 OpenClaw 等外部工具中使用。

```bash
openclaw models auth login --provider openai
```

使用 `--profile-id openai:<name>` 为同一个 Agent 配置多个账号。

流程（PKCE）：
1. 生成 PKCE verifier/challenge + 随机 state
2. 打开浏览器开始 OAuth 授权
3. 尝试捕获回调到 `http://127.0.0.1:1455/auth/callback`
4. 如果回调绑定失败（远程/无头环境），粘贴重定向 URL
5. 交换 Token 并存储

### Anthropic

Anthropic 的两种认证方式：

| 方式 | 说明 | 推荐场景 |
|------|------|---------|
| API Key | 标准 API 计费 | 生产环境推荐 |
| Claude CLI 复用 | 复用本地 Claude 登录 | 开发和个人使用 |

OpenClaw 现在支持 Anthropic Claude CLI token 复用。如果主机上已有本地 Claude 登录，onboarding/configure 可以直接复用它。

## 多账号管理

### 方式一：独立 Agent（推荐）

如果希望"个人"和"工作"完全隔离，使用独立 Agent：

```bash
openclaw agents add work
openclaw agents add personal
```

每个 Agent 拥有独立的会话、凭据和工作区。

### 方式二：单 Agent 多 Profile

`auth-profiles.json` 支持同一个提供商下的多个 profile ID。

配置路由优先级：

```json5
{
  auth: {
    order: {
      openai: ["openai:user@gmail.com", "openai:api-key-backup"],
    },
  },
}
```

会话级别覆盖：

- `/model Opus@anthropic:work` — 指定使用 work 账号

查看已有 profile ID：

```bash
openclaw channels list --json
```

## Token 刷新与过期

Profile 存储 `expires` 时间戳。运行时的刷新策略：
- 未过期 → 使用存储的 access token
- 已过期 → 自动刷新（文件锁保护），覆盖存储的凭据
- 辅助 Agent 读取主 Agent OAuth profile 时，刷新写回主 Agent 存储

## 常见问题

### 频繁登出

症状：在 OpenClaw 和 Claude Code / Codex CLI 之间频繁被登出。

原因：OAuth 提供商在登录/刷新期间可能使旧 refresh token 失效。

解决：OpenClaw 将 `auth-profiles.json` 视为 token sink，尽量保持本地 refresh token 的权威性。如果跨工具冲突仍频繁，考虑一个工具用 OAuth，另一个用 API Key。

### OAuth profile 轮转顺序

OpenClaw 按以下顺序选择 profile：
1. `auth.order` 显式配置
2. `auth.profiles` 按提供商过滤
3. SQLite 存储的 profile 条目

选择后，OpenClaw 会对 session **固定**选中的 profile，以保持提供商缓存。

## 相关文档

- [模型故障转移](/docs/manual/model-failover)
- [认证配置文件轮转](/docs/reference/auth-profile-rotation-and-session-pinning)
- [SecretRefs 与运行时快照](/docs/reference/secret-refs-and-runtime-snapshot)
