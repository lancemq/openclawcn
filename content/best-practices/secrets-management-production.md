---
title: Secrets 管理与生产环境密钥安全
description: 从官方 Secrets Management 文档出发，整理一套适合生产环境的密钥管理方法，涵盖 SecretRef、运行时快照、provider 配置和常见排障思路。
category: 安全治理
difficulty: 中级
updatedAt: "2026-05-18"
source: https://docs.openclaw.ai/gateway/secrets
sourceName: OpenClaw Docs
sourceType: official
tags: [secrets, security, production, secretrefs, operations]
---

# Secrets 管理与生产环境密钥安全

OpenClaw 的 Secrets 机制不是简单的 "把 API key 写进配置文件"。它围绕 SecretRef、运行时快照和 provider 抽象，设计了一套更适合长期运维的密钥管理体系。

这篇指南帮你把官方文档里的概念，转换成生产环境里的实际操作。

## 核心概念：三层结构

OpenClaw 的 Secrets 管理可以按三层理解：

| 层级 | 作用 | 示例 |
|------|------|------|
| Provider | 密钥的实际来源 | 环境变量、文件、Vault、KMS |
| SecretRef | 配置里的引用方式 | `{"$secretRef": "OPENAI_API_KEY"}` |
| Active Snapshot | 运行时的有效快照 | 内存中的解析后密钥集合 |

这种分层的好处是：配置文件里永远不会出现明文密钥，同时运行时性能不会受损。

## 配置 Secret Provider

OpenClaw 支持多种密钥来源：

### 环境变量 Provider（最常用）

```json
{
  "secrets": {
    "providers": [
      {
        "type": "env",
        "prefix": "OPENCLAW_"
      }
    ]
  }
}
```

这意味着 `OPENCLAW_OPENAI_API_KEY` 会被映射为 `OPENAI_API_KEY` 这个 secret。

### 文件 Provider

```json
{
  "secrets": {
    "providers": [
      {
        "type": "file",
        "path": "/run/secrets/"
      }
    ]
  }
}
```

适合 Docker Swarm 或 Kubernetes 的 secrets 挂载模式。

### 多 Provider 优先级

当配置了多个 provider 时，OpenClaw 会按顺序查找：

```json
{
  "secrets": {
    "providers": [
      { "type": "env", "priority": 1 },
      { "type": "file", "path": "/run/secrets/", "priority": 2 }
    ]
  }
}
```

先找环境变量，找不到再找文件。

## 在配置中使用 SecretRef

SecretRef 的语法很简单：

```json
{
  "providers": {
    "openai": {
      "apiKey": {
        "$secretRef": "OPENAI_API_KEY"
      }
    }
  }
}
```

OpenClaw 在以下时机解析 SecretRef：

1. **Gateway 启动时**
2. **配置 reload 时**
3. **显式调用 secrets apply 时**

解析后的值会进入 active snapshot，之后的请求都读这个快照，不会每次都去查 provider。

## Active Snapshot 的工作方式

理解 active snapshot 对生产运维至关重要：

```
Provider (env/file/vault)
        ↓
   解析时机：启动 / reload / apply
        ↓
Active Snapshot（内存中的完整密钥集合）
        ↓
   运行时请求直接读快照
```

这意味着：

- **密钥轮换不会即时生效** - 需要触发 reload 才能更新快照
- **快照失败不会破坏现有服务** - 如果新快照解析失败，OpenClaw 会保留上一个有效快照
- **运行时性能不受 provider 延迟影响**

## 生产环境配置模板

一个适合生产环境的完整 secrets 配置：

```json
{
  "secrets": {
    "providers": [
      {
        "type": "env",
        "prefix": "OPENCLAW_SECRET_"
      },
      {
        "type": "file",
        "path": "/etc/openclaw/secrets/",
        "required": false
      }
    ],
    "applyOnStart": true,
    "failOnMissing": true
  },
  "providers": {
    "openai": {
      "apiKey": { "$secretRef": "OPENAI_API_KEY" }
    },
    "anthropic": {
      "apiKey": { "$secretRef": "ANTHROPIC_API_KEY" }
    }
  }
}
```

关键参数说明：

- `applyOnStart: true` - 启动时自动应用 secrets
- `failOnMissing: true` - 如果必需的 secret 找不到，启动失败而不是静默忽略

## 密钥轮换操作步骤

生产环境轮换密钥的标准流程：

1. **更新 provider 中的密钥值**
   - 环境变量：修改系统 env
   - 文件：替换 secrets 文件内容
   - Vault：在 Vault 侧更新版本

2. **触发 OpenClaw reload**
   ```bash
   openclaw config reload
   # 或
   openclaw secrets apply
   ```

3. **验证新快照**
   ```bash
   openclaw secrets status
   ```
   确认新版本号或更新时间已变化。

4. **观察服务状态**
   - 检查 Gateway 日志
   - 确认模型调用正常
   - 确认没有 auth 错误

5. **保留旧密钥的 grace period**
   - 不要立刻删除旧密钥
   - 观察 10-30 分钟确认稳定
   - 再清理旧版本

## 常见排障场景

### SecretRef 解析失败

症状：启动时报 `Failed to resolve secret reference for OPENAI_API_KEY`

排查：
- 检查 provider 中是否有这个 key
- 检查 prefix 是否匹配（如 `OPENCLAW_OPENAI_API_KEY` vs `OPENAI_API_KEY`）
- 检查文件 provider 的路径权限

### Reload 后密钥没有更新

症状：`secrets status` 显示的还是旧版本

排查：
- 确认 provider 中的值确实已更新
- 检查 reload 是否成功完成（看日志）
- 确认没有 fallback 到上一个快照

### 运行时突然出现 auth 错误

症状：之前正常，突然大量模型调用失败

排查：
- 检查是否有人触发了 secrets reload 但新快照解析失败
- 检查 provider 是否不可用（如 Vault 连接中断）
- 查看 `openclaw secrets status` 的 snapshot age

## 安全建议

1. **不要把 secrets 文件提交到 Git**
   - 使用 `.gitignore`
   - 用模板文件（如 `secrets.json.example`）代替

2. **限制 secrets 文件权限**
   ```bash
   chmod 600 /etc/openclaw/secrets/*
   chown openclaw:openclaw /etc/openclaw/secrets/*
   ```

3. **定期审计 SecretRef 引用**
   - 检查是否有引用已不存在的 secret
   - 清理不再使用的密钥

4. **监控 secrets 相关事件**
   - reload 失败
   - snapshot 回退
   - provider 连接错误

## 下一步

- [Secret rotation 与 active snapshot 配合方法](/best-practices/secret-rotation-with-active-snapshot)
- [OpenClaw 安全最佳实践](/docs/operations/openclaw-security-best-practices)
- [模型策略与成本](/docs/operations/model-strategy-and-cost)
