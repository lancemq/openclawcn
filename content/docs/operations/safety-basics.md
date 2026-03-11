---
title: OpenClaw 安全配置基础
description: 从 Gateway auth、allowlist、Control UI 暴露方式和 Tailscale/SSH 接入策略理解 OpenClaw 的基础安全边界。
category: 运维
tags: [security, auth, tailscale, dashboard]
---

# OpenClaw 安全配置基础

OpenClaw 的安全重点，不在“有没有一个安全页”，而在于你是否真正理解了 Gateway 的暴露面。官方文档反复强调同一件事：**Gateway 和 dashboard 都是高权限入口，不应该默认暴露到公网。**

## 先记住三条总原则

1. Gateway 默认应尽量保持 loopback 绑定
2. dashboard 属于管理面，不是普通访客页面
3. 渠道一旦接通，就要立即考虑 allowlist、提及规则和认证方式

这三条比任何“安全 checklist”都更重要。

## 1. 先保护 Gateway 和 dashboard

官方 dashboard 文档讲得非常直接：

- dashboard 是 admin surface
- 它不仅能聊天，还能改配置、看会话、处理执行审批
- 不应直接公开暴露

因此，最安全的默认姿势是：

- `gateway.bind` 保持在 loopback
- 本地直接访问 `127.0.0.1`
- 远程访问优先走 SSH tunnel 或 Tailscale Serve

如果你一开始就把 Gateway 或 dashboard 直接绑到公网地址，再去补 auth，风险会明显更高。

## 2. 认证方式要先于远程访问

官方文档当前把认证重点放在 `gateway.auth` 上。你至少应该知道：

- token 模式
- password 模式
- trusted-proxy 模式

### token / password

对大多数个人或小团队场景，token 或 password 是最直接的基础认证方式。

### trusted-proxy

官方明确把它标成安全敏感功能。只有在这些前提都满足时才适合使用：

- 你的反向代理本身已经做完身份认证
- Gateway 只有这一条代理入口
- `trustedProxies` 只包含最小代理 IP 范围
- 代理会覆盖而不是拼接转发头

如果你不完全确定这些条件，就不要启用 trusted-proxy。

## 3. 渠道接入后优先做 allowlist

官方首页当前给出的第一批“锁定配置”建议非常明确：先从 `channels.whatsapp.allowFrom` 和群组 mention 规则开始。

一个典型例子是：

```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+15555550123"],
      "groups": {
        "*": { "requireMention": true }
      }
    }
  },
  "messages": {
    "groupChat": {
      "mentionPatterns": ["@openclaw"]
    }
  }
}
```

这类配置的核心意义是：

- 限定谁可以和你的助手交互
- 限定群聊里什么时候才响应
- 避免渠道一接通就变成“谁都能触发的机器人”

## 4. 远程访问首选 SSH / Tailscale

官方 remote access 文档把远程访问的安全路径写得很清楚：**优先保留 Gateway 在专用主机，客户端通过 SSH tunnel 或 Tailscale 接入。**

### SSH

它是最通用、最稳的远程接入方式。典型命令是：

```bash
ssh -N -L 18789:127.0.0.1:18789 user@host
```

### Tailscale Serve

官方把它视为比较好的远程 dashboard 路径，因为它允许：

- Gateway 继续保持 loopback
- 通过 HTTPS 暴露 dashboard
- 在开启 `gateway.auth.allowTailscale` 时利用 Tailscale 身份头做认证

### Tailscale Funnel

官方允许，但要求更严格，而且必须配 password。因为这已经涉及公网暴露，不适合作为第一次接入的默认路径。

## 5. Control UI / dashboard 的 token 怎么看

官方 dashboard 文档说明，首次连接时如果遇到未授权，可以：

- 运行 `openclaw dashboard`
- 或读取 `gateway.auth.token`
- 或通过 `OPENCLAW_GATEWAY_TOKEN` 提供

token 会被前端保存到本地存储里，所以浏览器本身也属于敏感环境。不要在不受控的公共机器上长期登录。

## 6. 生产环境更推荐的安全路径

如果你准备长期运行 OpenClaw，官方推荐的生产部署方向是：

- 使用 `openclaw-ansible`
- 配合 UFW、防火墙、Docker 沙箱、systemd
- 通过 SSH + Tailscale 暴露管理能力

这一套路径比“自己手工开端口、自己记 token”更可靠。

## 7. 最容易踩的安全坑

### 把 dashboard 当成普通聊天入口

它本质上是管理员界面，权限高于普通渠道。

### 先开公网，再慢慢补认证

顺序反了。应该先把认证、隧道和 allowlist 想清楚，再决定是否远程开放。

### trusted-proxy 配置过宽

官方安全清单明确反对把 `trustedProxies` 配成大网段或不可信代理。

### 渠道接通后不做 allowFrom

这会让你的 Gateway 很快暴露给不该访问的人。

## 一条适合新用户的最小安全路径

1. 本地安装并跑通 dashboard
2. Gateway 保持 loopback
3. 只接一个渠道
4. 配好 `allowFrom`
5. 需要远程访问时优先 SSH tunnel 或 Tailscale Serve

## 下一步推荐

- [Gateway 架构概览](/docs/manual/architecture)
- [OpenClaw 渠道能力概览](/docs/manual/channels-overview)
- [Control UI 是什么](/docs/manual/control-ui)
- [故障排除与诊断思路](/docs/reference/troubleshooting)
