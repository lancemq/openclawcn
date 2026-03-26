---
title: Dashboard 遇到 unauthorized、1008 和 AUTH_TOKEN_MISMATCH 时怎么恢复
description: 基于最新官方 Dashboard 文档，整理 OpenClaw 在 Dashboard 认证失败时更稳的恢复顺序，尤其是 AUTH_TOKEN_MISMATCH、trusted retry、SecretRef token 和远程实例混淆这几类问题。
category: 运维
updatedAt: 2026-03-26
source: https://docs.openclaw.ai/web/dashboard
sourceName: OpenClaw Docs
sourceType: official
tags: [dashboard, auth, unauthorized, 1008, operations]
---

# Dashboard 遇到 unauthorized、1008 和 AUTH_TOKEN_MISMATCH 时怎么恢复

官方最近对 Dashboard 文档的一个明显补强，是把认证失败这条线从“常见报错说明”推进成了更完整的恢复路径。  
这很值，因为很多中文用户看到：

- `unauthorized`
- `1008`
- `AUTH_TOKEN_MISMATCH`

时，第一反应往往还是“页面坏了”。

实际上，这几类问题更接近：

- 认证链路漂移
- 实例归属混淆
- 浏览器 tab 状态与 Gateway 当前状态不一致

## 先把 `unauthorized` 和 `AUTH_TOKEN_MISMATCH` 分开

更稳的理解方式是：

- `unauthorized`：当前连接没有通过认证
- `AUTH_TOKEN_MISMATCH`：客户端手里有 token，但它和当前 gateway 期待的不一致

第二种更像“带了旧钥匙来开新门”，而不是“完全没钥匙”。

## trusted retry 在解决什么

官方最近把一条很关键的细节写进了 Dashboard 文档：

- 当 gateway 返回 retry hints 时
- 客户端可以尝试一次 trusted retry，用缓存的 device token 再试

这说明当前 Dashboard 已经不是“认证失败就只会一刀切报错”，而是在尝试：

- 自动修复一部分轻度漂移

但要注意，官方也明确说了：

- 如果 trusted retry 后仍失败，就该人工处理 drift

## 最稳的恢复第一步：先确认实例归属

看到 unauthorized 时，最值得先问的不是“token 对不对”，而是：

- 我现在连的是哪台 gateway

因为很多问题其实来自：

- 本地和远程 URL 混了
- SSH tunnel 和 tailnet URL 混了
- 你以为连的是当前环境，实际还在连旧实例

这一步不先确认，后面所有 token 动作都可能是在错实例上做努力。

## 第二步：确认 token 来源

当前官方给出的恢复路径已经很清楚：

- 明文配置：`openclaw config get gateway.auth.token`
- SecretRef 管理：回到外部 secret provider 或在当前 shell 导出 `OPENCLAW_GATEWAY_TOKEN`
- 根本没配：`openclaw doctor --generate-gateway-token`

这意味着：

- token 漂移问题首先是来源问题
- 不是简单“浏览器刷新一下”就能解决

## 第三步：再决定重新跑 `openclaw dashboard` 还是手动补 token

更稳的经验通常是：

- localhost 场景优先重新跑 `openclaw dashboard`
- SecretRef 或远程场景先确认 token 来源，再手动补或重新引导

因为如果 token 本身就没解析成功，直接重复打开 Dashboard 也不会凭空修复。

## 为什么浏览器 tab 状态也值得查

官方当前写法已经说明：

- Dashboard auth 更偏当前 tab 的 `sessionStorage`

这意味着：

- 关闭 tab
- 换 tab
- 切到别的 gateway URL

都可能让你看到与“我明明之前刚连上”不一致的认证表现。

## 中文环境里最容易踩的坑

### 1. 一看到 1008 就只清浏览器缓存

如果根本连错实例，清缓存不会解决问题。

### 2. SecretRef token 场景还期待 URL 自动带完整 token

官方当前恰恰是在避免这种暴露。

### 3. 误把 trusted retry 当成“系统会自动修好所有 drift”

它只是一轮受控重试，不是完整恢复机制。

## 一条更稳的恢复顺序

建议按这个顺序走：

1. 先确认当前连接的是哪台 gateway
2. 再确认 token 来源是明文、SecretRef 还是尚未生成
3. 看是否只是当前 tab 的 auth 状态丢了
4. 必要时重新跑 `openclaw dashboard`
5. 如果仍是 `AUTH_TOKEN_MISMATCH`，按 token drift 人工恢复

## 下一步推荐

- [Dashboard 的 SecretRef token、sessionStorage 和非 token 化 URL 应该怎么理解](/docs/reference/dashboard-secretref-and-sessionstorage)
- [Dashboard 快速打开与认证行为](/docs/manual/dashboard-fast-path-and-auth)
- [Dashboard 认证引导与 token 漂移该怎么处理](/best-practices/dashboard-auth-bootstrap-and-drift)
