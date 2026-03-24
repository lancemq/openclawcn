---
title: 远程访问与 Tailscale / SSH
description: 把 OpenClaw 放到远程主机长期运行时，如何在 SSH、tailnet、Tailscale Serve 和直接 ws/wss 之间做选择。
category: 运维
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/gateway/remote
sourceName: OpenClaw Docs
sourceType: official
tags: [remote, ssh, tailscale, gateway, operations]
---

# 远程访问与 Tailscale / SSH

现有文档已经解释了 Gateway、Control UI 和安全边界，但如果你准备把 OpenClaw 长期放到另一台机器上运行，真正最容易踩坑的部分其实是远程访问。官方文档把这一块拆成了 `gateway/remote`、`gateway/tailscale` 和 macOS app 的 remote over SSH 说明，说明这不是附属功能，而是正式使用中的核心路径。到 2026 年 3 月，官方还把“智能体所在位置”和“操作员所在位置”分得更清楚了。

## 远程访问的核心原则

OpenClaw 的默认思路不是“把服务直接暴露到公网”，而是：

- Gateway 尽量仍然只绑定在 loopback
- 需要远程时优先用 SSH 隧道
- 长期团队访问时优先考虑 tailnet / VPN
- 只有在你清楚认证和暴露面时，才考虑直接 `ws://` 或 `wss://`

换句话说，远程访问的目标不是“让任何地方都能连上”，而是“让需要访问的人能安全地连上”。

## 三种最常见的远程模式

### 1. SSH 隧道

这是最通用、也最稳妥的默认方案。

适合场景：

- Gateway 跑在家里主机、迷你主机或 VPS 上
- 你只需要自己从笔记本远程访问
- 你想保留 loopback 绑定，不想公开暴露端口

这种模式下，Gateway 仍然只监听本机端口，例如默认的 `127.0.0.1:18789`。你只是把这个端口通过 SSH 转发到自己的电脑。

## 2. Tailnet / Tailscale Serve

如果你希望多设备更顺滑地访问同一个 Gateway，tailnet 往往比手工维护 SSH 隧道更舒服。

官方推荐的安全思路是：

- Gateway 仍保持 loopback 绑定
- 通过 Tailscale Serve 暴露 HTTPS 和 WebSocket
- 把访问限制在 tailnet 内

这种方式的好处是：

- 不必把服务直接公开到公网
- 访问体验比重复开 SSH 隧道更顺手
- 更适合桌面、笔记本和移动端一起连同一个实例

如果你已经在用 Tailscale，这通常是长期运行时更平衡的方案。

### 3. 直接 `ws://` / `wss://`

只有在你非常明确自己的反向代理、TLS 和鉴权边界时，才建议考虑这种方式。

它适合：

- 你已经有稳定的反向代理体系
- 你知道自己在做公网 HTTPS / WSS 暴露
- 你准备显式配置 token / password / TLS pinning

如果只是为了“先连上再说”，它通常不是最好的第一选择。

## 什么叫“远程主机”

在 OpenClaw 的模型里，远程主机就是“智能体真正所在的位置”。它持有：

- 会话
- 认证配置
- 渠道连接
- 状态与缓存
- 节点配对信息

所以远程访问不是简单的“看一个面板”，而是连接到真正持有系统状态的那台机器。

官方当前对这件事的表达非常直接：**Gateway 主机就是“智能体所在的位置”**。你的笔记本、桌面和节点只是连接过去。

## 官方推荐的典型组合

### 家庭服务器或 VPS 长期开机

如果你的笔记本经常睡眠，但你希望 OpenClaw 始终在线，最常见的做法是：

- 在家庭服务器或 VPS 上运行 Gateway
- 用 Tailscale 或 SSH 访问
- 保持 Gateway loopback-only

这条路径特别适合：

- 渠道长期在线
- 想随时从别的设备继续控制
- 不希望主机跟着笔记本一起离线

官方 `gateway/remote` 页面现在还明确举了这类例子：VPS 或家庭服务器在 tailnet 中长期在线，是最适合承接长期会话、渠道和状态的一类主机。

### 笔记本只是控制台，不是运行主机

这时更合理的做法是：

- Gateway 跑在远程机器
- 笔记本只作为 operator / Control UI 入口
- 优先用 app 的 Remote over SSH 或手工 SSH 隧道

这比在笔记本本地维护完整运行环境更稳。

## CLI 远程默认值现在更值得单独讲清楚

官方远程页最近把 `gateway.remote` 这组配置单独拿出来强调了：

```json
{
  "gateway": {
    "mode": "remote",
    "remote": {
      "url": "ws://127.0.0.1:18789",
      "token": "your-token"
    }
  }
}
```

这里最重要的边界是：

- `gateway.remote.token` 只是**远程 CLI 调用的客户端凭证来源**
- 它**不会**自动替代本地 Gateway 的认证配置
- 如果你是通过 SSH 隧道访问 loopback，URL 仍然应该写 `ws://127.0.0.1:18789`

官方文档强调过一件事：如果你显式指定远程 `url`，就不要再指望 CLI 去帮你隐式回退到本地配置或环境变量。远程调用应该把 URL 和认证方式写清楚。

这意味着你在做远程运维时，最好明确区分：

- 本地默认实例
- 远程 Gateway
- 当前命令到底打到哪一个实例

一旦这层边界混了，排错会很痛苦。

## WebChat 和远程访问的关系

WebChat 不再是单独一套 HTTP 页面，它本质上也是连接 Gateway WebSocket 的客户端。因此，远程访问一旦没设计清楚，WebChat、Control UI、节点连接都会一起受影响。

更实用的理解方式是：

- 远程访问不是只影响 CLI
- 它会影响聊天、控制、节点和健康检查的整体体验

官方远程页现在还单独点出了一条很实用的结论：通过 SSH 使用聊天 UI 时，转发的仍然是 `18789` 这个 Gateway WebSocket 端口，因为 WebChat 已经不再依赖单独 HTTP 端口。

## Tailscale / Funnel 什么时候用

官方对 Tailscale 的建议非常明确：

- `serve`：tailnet-only，默认更安全
- `funnel`：公网 HTTPS，必须更谨慎，且需要更强认证边界

如果你只是想自己和少量设备访问，优先考虑 `serve`。  
如果你准备把访问开放到公网，就不该再用“本地默认配置够了”的思路。

## `wss://` 场景下还要考虑 TLS 指纹

远程页最新补充了一条很多人会忽略的配置：如果你最终走的是 `wss://`，可以用 `gateway.remote.tlsFingerprint` 固定远程 TLS 证书。

它适合：

- 公网 `wss://`
- 明确要防止证书被替换或中间层变更
- 想把远程连接边界写得更死一点

## 安全上最重要的几条

- 默认保持 `gateway.bind: "loopback"`
- 远程访问必须明确认证方式
- token / password 是远程边界，不要混同于本地信任
- 通过反向代理或 Tailscale 时，要清楚 trusted proxies / identity headers 是否生效
- 不要为了省事把高权限控制入口直接裸露到公网

再补一条官方 2026 年 3 月最新强调的边界：

- 如果 `gateway.auth.allowTailscale: true`，Serve 可以靠 Tailscale 身份头为 Control UI / WebSocket 做认证；但这并不等于所有 HTTP API 都自动免密

## 常见误区

### 1. 能打开 UI 就等于远程配置正确

有时只是某个入口能访问，不代表 CLI、WebChat、节点和 auth 逻辑都正常。

### 2. 同时改绑定、代理、认证和端口

远程配置一旦一次改太多变量，很难判断到底是哪一层出了问题。

### 3. 用公网暴露替代私网或 SSH

这看似方便，但长期运维成本和风险都更高。

## 更适合的实践顺序

1. 先本地跑通 Gateway 和 Control UI
2. 再用 SSH 隧道验证远程可访问
3. 如果需要长期多设备访问，再考虑 tailnet / Tailscale Serve
4. 只有在明确知道自己为什么要公开暴露时，才考虑 direct `wss://`

如果你是浏览器控制场景，官方当前的建议也更明确了：

- 浏览器在另一台机器上时，更适合在那里跑一个节点主机
- 不要把 Funnel 当成浏览器远控的默认主路径

## 2026 年 3 月 24 日的中文远程运维观察

近期公开可访问的中文教程站和部署文章，在远程访问这件事上有一个反复出现的倾向：会先教你“怎样连上”，再补“怎样收口”。  
这对第一次验证很友好，但如果你把临时验证方式直接带到长期环境，问题通常会出得很快。

这轮整理时重点参考了：

- [OpenClaw 中文教程：部署与 Docker](https://openclawgithub.cc/guide/deploy/)
- [OpenClaw 中文教程：安装与环境](https://openclawgithub.cc/en/guide/install/)

结合官方资料和中文外部资料，当前更值得长期保留的提醒有三条：

### 1. “能打开”不等于“远程边界已经设计好”

很多中文教程会优先强调：

- 端口是否联通
- 控制面能否打开
- Web 页面是否可见

但长期运行更关键的往往是：

- Gateway 还是否保持 loopback
- 认证边界是不是清楚
- 是不是所有入口都走了同一条受控路径

### 2. SSH / Tailscale Serve 仍然比公网入口更适合多数中文团队

如果你只是自己用，或者少量成员需要管理入口，当前更稳的默认组合仍然是：

- SSH tunnel
- Tailnet
- Tailscale Serve

而不是一开始就做公网 `wss://` 或直接暴露控制面。

### 3. 浏览器控制面和消息入口不要混成同一条暴露路径

中文环境里最常见的问题之一，是把：

- Control UI
- WebChat
- Webhooks
- 公网反向代理

一起挂到同一个公开入口上。  
这种做法虽然看上去方便，但也会让排障、认证和暴露面同时变复杂。

## 下一步推荐

- 想理解 Gateway 本身：看 [Gateway 运维与日常检查](/docs/operations/gateway-operations)
- 想处理安全边界：看 [OpenClaw 安全配置基础](/docs/operations/safety-basics)
- 想理解控制入口：看 [Control UI 是什么](/docs/manual/control-ui)
