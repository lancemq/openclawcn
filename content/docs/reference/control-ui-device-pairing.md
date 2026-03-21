---
title: Control UI 设备配对与浏览器授权
description: 基于最新官方 Control UI 与 Pairing 文档，解释为什么远程浏览器首次连接需要设备配对、设备身份如何记住，以及什么时候需要重新批准。
category: 参考
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/control-ui
sourceName: OpenClaw Docs
sourceType: official
tags: [control-ui, pairing, devices, browser, admin]
---

# Control UI 设备配对与浏览器授权

很多人第一次从另一台电脑或手机浏览器打开 Control UI 时，会被一个现象卡住：

- 明明 token 没问题
- 也在同一个 tailnet
- 结果还是提示 `pairing required`

这不是 bug，而是官方当前刻意设计的安全边界。

## 为什么浏览器也要做 device pairing

根据最新官方 Control UI 文档，远程浏览器第一次连接 Gateway 时，需要做一次设备配对审批。

它的目的很直接：

- 防止拿到网络连通性的人直接进入管理面
- 把“能访问地址”与“被批准成为管理设备”分开

所以即便你已经在同一个 tailnet，或者 `gateway.auth.allowTailscale: true`，也不代表浏览器会自动获得管理权限。

## 哪些情况会自动通过，哪些不会

官方当前写得很明确：

- `127.0.0.1` 本地连接：自动批准
- 远程连接：需要显式审批

这里的“远程”包括：

- 局域网
- tailnet
- 其他非本机浏览器

这就是为什么很多人本机打开一切正常，换另一台设备就突然要配对。

## 怎么批准一个浏览器设备

官方当前给的最直接命令是：

```bash
openclaw devices list
openclaw devices approve <requestId>
```

它批的不是“某个人”，而是“某个浏览器或设备实例”。

这点很重要，因为它意味着：

- 同一个人换浏览器，可能就是新设备
- 清空浏览器数据后，也可能要重新配对

## 浏览器身份是怎么记住的

官方文档现在明确提到，每个浏览器 profile 都会生成独立 device ID。

因此下面这些情况都可能触发重新配对：

- 换浏览器
- 换浏览器 profile
- 清空站点数据
- 切无痕模式

这也是为什么管理员视角里，更适合把它当作“设备授权”，而不是“一次登录”。

## 什么时候需要撤销或重配

如果你准备清理控制面授权，更适合记住这条：

```bash
openclaw devices revoke --device <id> --role <role>
```

这适合几种情况：

- 某台旧电脑不再使用
- 某个浏览器环境不再可信
- 你怀疑管理面曾被别人借用或复制过本地状态

长期运行里，定期清理不用的浏览器设备，是很有价值的习惯。

## 为什么这和 DM pairing 不是一回事

站里已经有一页在讲 pairing，但 Control UI 这条线更容易被误会。

这里批的是：

- 管理面浏览器设备

不是：

- 某个 Telegram / Discord 发消息的人
- 某台 node 能不能加入设备网络

从权限密度看，浏览器管理面其实非常敏感，因为它可能看到：

- 会话
- 配置
- 审批
- 控制入口

所以它需要单独看待。

## 中文站建议怎么管理这类授权

更稳的做法通常是：

1. 本机浏览器默认作为主管理入口
2. 远程浏览器逐台审批
3. 不用的浏览器设备及时 revoke
4. 不把 Control UI 当作“谁都能打开看一眼”的页面

这样后面多人协作时就不容易乱。

## 下一步推荐

- [配对审批与设备授权管理](/docs/reference/pairing-admin)
- [远程打开 Control UI 的正确方式](/docs/operations/control-ui-remote-access)
- [Remote Operators 与多设备协作](/docs/operations/remote-operators-and-nodes)

这三页串起来看，会更容易分清“聊天入口授权”“浏览器管理面授权”“设备节点授权”三条线。
