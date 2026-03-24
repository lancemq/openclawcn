---
title: "OpenClaw 安全最佳实践"
description: "了解使用 OpenClaw 时的安全最佳实践，包括密码管理、权限控制和日志监控。"
category: 运维
date: "2026-03-09"
author: "Security Team"
source: "https://docs.openclaw.ai/zh-CN/gateway/security"
sourceName: "OpenClaw Docs"
updatedAt: 2026-03-24
sourceType: official
tags: ["security", "best-practices", "guide"]
---

本文档介绍使用 OpenClaw 时的安全最佳实践，帮助你构建安全的 AI 助手系统。

## 核心安全原则

### 1. 认证与授权

- 使用强密码或 token 认证
- 定期轮换认证凭据
- 启用多因素认证（如果支持）
- 最小权限原则

### 2. 网络安全

- Gateway 默认绑定到 loopback (127.0.0.1)
- 远程访问优先使用 SSH tunnel 或 Tailscale
- 避免直接公网暴露
- 配置防火墙规则

### 3. 数据保护

- 敏感数据加密存储
- 定期备份配置和凭据
- 清理临时文件和日志
- 遵循数据保留策略

### 4. 渠道安全

- 配置 allowFrom 限制访问来源
- 启用群组 mention 规则
- 定期检查渠道配对状态
- 限制机器人权限

官方 2026 年 3 月版安全页还把下面这条写得非常明确：

- **Loopback + SSH / Tailscale Serve 仍然是最安全的默认组合**

## Control UI 的最新安全边界

官方安全页最近补得最重要的一部分，其实不是“更复杂的加密”，而是浏览器控制入口的安全上下文要求。

### 优先保持 HTTPS 或 localhost

Control UI 需要安全上下文（HTTPS 或 localhost）来生成设备身份。官方当前明确建议：

- 本地优先用 `127.0.0.1`
- 远程优先用 Tailscale Serve 之类的 HTTPS 路径

### `allowInsecureAuth` 只适合临时救火

如果你开启 `gateway.controlUi.allowInsecureAuth`，Control UI 会退化为只靠 token 认证，并跳过设备身份相关的保护。这是**明确的安全降级**，不适合作为日常配置。

### `dangerouslyDisableDeviceAuth` 更不该常开

官方把 `gateway.controlUi.dangerouslyDisableDeviceAuth` 直接定义成严重安全降级，仅适合主动调试并能快速回滚的临时场景。

## 密码管理

### 使用强密码

```bash
# 生成强密码
openssl rand -base64 32
```

### 定期轮换

- 每 90 天更换一次密码
- 更换后更新所有客户端配置
- 记录更换日期以便跟踪

## 权限控制

### 技能权限

```yaml
permissions:
  - network: false  # 禁用网络访问
  - storage: true   # 仅允许本地存储
  - filesystem: false  # 禁用文件系统
  - commands: false    # 禁用命令执行
```

### 渠道权限

```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+15555550123", "+15555550124"]
    }
  }
}
```

## 反向代理不是只配 TLS 就结束了

如果你把 Gateway 放在 nginx、Caddy、Traefik 这类反向代理后面，官方现在非常强调 `gateway.trustedProxies`：

```yaml
gateway:
  trustedProxies:
    - "127.0.0.1"
  auth:
    mode: password
    password: ${OPENCLAW_GATEWAY_PASSWORD}
```

它解决的是“哪些 `X-Forwarded-For` / `X-Real-IP` 头可以被信任”的问题。否则代理流量可能被误判成来自 localhost，从而放大认证绕过风险。

同时还要注意：

- 只写你完全控制的代理 IP
- 代理要**覆盖**而不是追加 `X-Forwarded-For`
- 不能让用户绕过代理直接打到 Gateway 端口

## 日志监控

### 查看日志

```bash
# 查看最近日志
openclaw logs --recent

# 查看特定渠道日志
openclaw logs --channel telegram

# 实时日志
openclaw logs --follow
```

### 关键日志指标

- 认证失败次数
- 异常访问模式
- 渠道连接状态
- 技能执行结果

## 会话日志本身也是敏感数据

官方安全页新增了一条非常实用的提醒：OpenClaw 会把会话日志落到磁盘，例如 `~/.openclaw/agents/<agentId>/sessions/*.jsonl`。

这意味着：

- 任何能读到这些文件的本机进程/用户，都可能看到历史上下文
- 文件系统权限本身就是安全边界
- 如果需要更强隔离，应该考虑单独 OS 用户或单独主机

### 安全检查命令

```bash
# 审计当前配置中的高风险项
openclaw security audit

# 生成一个新的 gateway token
openclaw doctor --generate-gateway-token
```

`openclaw security audit` 是官方最近特别强调的入口之一，它会对明显的高风险配置做提醒，例如：

- Control UI 安全降级
- trusted-proxy 配置风险
- 过于宽松的 trusted proxies

## 2026 年 3 月 24 日的外部安全观察

这轮整理时，除了官方安全文档，我还对照了近期公开可访问的中文教程站和部署说明。  
从这些外部资料里，当前最值得写进长期文档的，不是“又多了哪些安全功能”，而是几个反复出现的真实风险点。

重点参考了：

- [OpenClaw 中文教程：部署与 Docker](https://openclawgithub.cc/guide/deploy/)
- [OpenClaw 中文教程：安装与环境](https://openclawgithub.cc/en/guide/install/)
- [官方安全文档](https://docs.openclaw.ai/zh-CN/gateway/security)

结合这些来源，当前最值得强调的提醒有三条：

### 1. 很多外部教程会把“先开放端口”写成默认动作

这在中文云主机场景里尤其常见。  
它确实能更快完成第一轮联通性验证，但如果你把这种临时做法直接带进长期环境，风险会明显放大。

更稳的默认顺序仍然是：

1. Gateway 尽量保持 loopback  
2. 远程优先走 SSH tunnel / Tailscale Serve / 受控反向代理  
3. 只有在真正明确边界后，再讨论公网入口

### 2. 中文团队更容易低估“控制面”本身的暴露风险

很多人把安全焦点只放在消息入口或模型密钥上，但在长期运行环境里，Control UI、Dashboard、WebChat 和反向代理后的浏览器控制面往往才是更敏感的边界。

如果你参考外部教程时看到下面这些做法，就应该立刻回到官方安全页核对：

- 直接把管理端口映射到公网
- 长期开启 `allowInsecureAuth`
- 把 `dangerouslyDisableDeviceAuth` 当成常规配置
- 把反向代理仅当成 TLS 终止，而不校验 trusted proxies

### 3. allowFrom、群组 mention 和本地文件权限经常被低估

中文教程更常关注“怎么接上渠道”，但对长期安全来说，下面这些配置往往更关键：

- `allowFrom`
- 群组 requireMention
- pairing 文件权限
- session 日志和本地凭据目录权限

也就是说，真正的安全边界往往不是“有没有开 HTTPS”，而是“谁能触发、谁能配对、谁能读本地状态文件”。

## 常见安全场景

### 场景一：家庭部署

- 本地运行，不暴露公网
- 使用强密码认证
- 定期备份配置

### 场景二：团队协作

- 配置团队认证
- 使用工作区技能
- 限制敏感操作

### 场景三：企业部署

- 使用 Ansible 自动化部署
- 集成企业身份认证
- 启用完整审计日志

### 场景四：反向代理或统一身份入口

- 只有在代理真正负责身份认证时，再考虑 `trusted-proxy` auth
- 如果代理只是做 TLS 终止，不应该把它当成认证层
- 高风险环境里优先限制 `allowUsers`，不要让“所有已认证用户”默认都能进

## 应急响应

### 发现安全问题时的处理步骤

1. 立即禁用相关渠道或技能
2. 检查日志确定攻击范围
3. 更新认证凭据
4. 重新配置安全规则
5. 监控后续活动

### 备份与恢复

```bash
# 备份配置
openclaw config backup

# 恢复配置
openclaw config restore <backup-file>
```

## 相关资源

- [安全配置基础](/docs/operations/safety-basics)
- [远程访问与 Tailscale / SSH](/docs/operations/remote-access)
- [故障排除与诊断思路](/docs/reference/troubleshooting)
- [Gateway 架构概览](/docs/manual/architecture)
- [国内云部署思路](/docs/setup/china-cloud-deployment)
