---
title: Cloudflare AI Gateway 的双层鉴权头应该怎么配
description: 基于最新官方 Cloudflare AI Gateway 文档，解释 provider API key 和 cf-aig-authorization 为什么是两层不同凭据，以及 daemon 场景里最常见的缺失点。
category: 参考
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/providers/cloudflare-ai-gateway
sourceName: OpenClaw Docs
sourceType: official
tags: [cloudflare-ai-gateway, headers, auth, providers, reference]
---

# Cloudflare AI Gateway 的双层鉴权头应该怎么配

Cloudflare AI Gateway 这一页官方文档里最容易被忽略、但实际最容易踩坑的点，是它其实可能需要两层不同凭据：

- provider API key
- `cf-aig-authorization`

如果把这两层混成一层，排障时会非常绕。

## 第一层是 provider API key

官方页面写得很直接：

- `CLOUDFLARE_AI_GATEWAY_API_KEY` 用来承载“请求通过 Gateway 打到上游 provider”所需的 provider API key

对 Anthropic 路径来说，官方当前给的说明就是：

- 这里用你的 Anthropic API key

所以这层本质上还是：

- 上游模型厂商凭据

不是 Cloudflare 网关登录票据。

## 第二层才是 Gateway 自己的鉴权头

官方同页又补了另一条：

- 如果你在 Cloudflare 侧启用了 Gateway authentication
- 还要额外加 `cf-aig-authorization: Bearer <token>`

这说明这层是在证明：

- 你被 Cloudflare 这个网关允许通过

它和上游 provider key 不是一回事。

## 为什么这叫“双层鉴权”

把它拆开看最清楚：

### 第一层：Cloudflare 允许你进网关

通过 `cf-aig-authorization`

### 第二层：上游 provider 允许这次模型请求

通过 provider API key

少任意一层，都可能导致“明明 URL 对了，但就是不工作”。

## 最常见的误判

### 1. 以为只配 Cloudflare token 就够了

不是。官方文档明确说，这层是在 provider API key 之外再加的。

### 2. 以为只配 provider API key 就够了

如果 Cloudflare Gateway 自己启用了认证，那还需要额外的 `cf-aig-authorization`。

### 3. 交互 shell 里能跑，daemon 里却不行

官方还特意补了一条环境说明：

- 如果 Gateway 作为 daemon 跑
- 要确保 `CLOUDFLARE_AI_GATEWAY_API_KEY` 对那个进程真实可见

这类问题经常不是配置语法错，而是：

- 你在当前 shell 里有环境变量
- 但 `launchd/systemd` 进程里没有

## 配置时更适合怎么想

更稳的理解方式通常是：

- `baseUrl` 决定请求去哪
- provider API key 决定上游肯不肯接
- `cf-aig-authorization` 决定 Cloudflare 网关肯不肯放

三个层面都对上，链路才完整。

## daemon 场景为什么特别容易出错

因为这时最常发生的是：

- 你在终端里手工调试成功
- 真正的守护进程环境却读不到 key

官方给出的建议也很明确：

- 放到 `~/.openclaw/.env`
- 或通过 `env.shellEnv` 传进去

这样守护进程和交互 shell 才不会出现“同一台机器两种结果”。

## 下一步推荐

- [团队里如何给 Provider 加统一网关层](/best-practices/provider-gateway-layering)
- [模型提供商与故障转移](/docs/manual/providers-and-fallback)
- [models status --probe 和 auth profiles 应该怎么看](/docs/reference/models-status-probe-and-auth-profiles)
