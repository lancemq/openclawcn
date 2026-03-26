---
title: Dashboard 出现授权漂移时，先走恢复梯子，不要上来就重装
description: 结合最新官方 Dashboard 文档，整理一套更稳的 Dashboard 恢复梯子，把 localhost、远程、SecretRef token、trusted retry 和实例混淆分开排，避免把简单 drift 升级成大修。 
category: 运维实践
difficulty: 中级
updatedAt: 2026-03-26
source: https://docs.openclaw.ai/web/dashboard
sourceName: OpenClaw Docs
sourceType: official
tags: [dashboard, recovery, auth, drift, operations]
---

# Dashboard 出现授权漂移时，先走恢复梯子，不要上来就重装

Dashboard 认证出问题时，很多人最容易做两类过度动作：

- 直接重装
- 直接全清浏览器、全换 token

但从官方最近补强的 Dashboard 文档看，更稳的处理方式应该是一条恢复梯子，而不是大开大合地重置环境。

## 第一层：先确认是不是连错实例

更稳的第一步不是清 token，而是确认：

- 当前是 localhost 还是远程
- 当前 URL 指向的是不是预期 gateway

很多看起来像 auth 问题的故障，第一层其实是实例归属漂了。

## 第二层：让 trusted retry 先发挥作用

如果是轻度 token 漂移，当前客户端在收到 retry hints 后可能完成一次 trusted retry。

所以在第一层确认实例没错之后，不要立刻做大动作，先看：

- 是不是已经属于可自动恢复的轻度漂移

## 第三层：再回到 token 来源

如果仍然是 `AUTH_TOKEN_MISMATCH` 或 unauthorized，这时再去区分：

- 明文 token
- SecretRef token
- 尚未生成 token

这一层不分清，后面只会反复在错误入口上试。

## 第四层：优先重跑 `openclaw dashboard`

在 localhost 场景里，重新跑：

```bash
openclaw dashboard
```

往往比手工拼链接更稳，因为它会按当前环境给出更合适的引导。

## 第五层：最后才做更重的浏览器和设备清理

只有当前面几层都确认无效时，才更值得去检查：

- 当前 tab 的 sessionStorage 状态
- 浏览器是否需要重新配对
- 是否存在旧设备授权需要清理

这比一开始就“全清”更能保留上下文，也更利于排障。

## 一条更稳的恢复梯子

建议按这个顺序走：

1. 先确认实例归属
2. 等 trusted retry 或轻量重连
3. 再确认 token 来源
4. localhost 优先 rerun `openclaw dashboard`
5. 最后再清理浏览器或设备授权状态

## 下一步推荐

- [Dashboard 遇到 unauthorized、1008 和 AUTH_TOKEN_MISMATCH 时怎么恢复](/docs/operations/dashboard-auth-mismatch-recovery)
- [Dashboard 认证引导与 token 漂移该怎么处理](/best-practices/dashboard-auth-bootstrap-and-drift)
- [Control UI 设备配对与浏览器授权](/docs/reference/control-ui-device-pairing)
