---
title: 多个 operator 轮流进 Dashboard 时，浏览器交接不要靠记忆
description: 结合最新官方 Dashboard、Control UI 和设备 pairing 文档，整理团队里多个 operator 轮流接管浏览器控制面的交接顺序，避免把 gateway URL、token 来源和已配对浏览器状态混成口口相传的经验。 
category: 协作治理
difficulty: 中级
updatedAt: 2026-03-26
source: https://docs.openclaw.ai/web/dashboard
sourceName: OpenClaw Docs
sourceType: official
tags: [operators, dashboard, browser, pairing, handoff]
---

# 多个 operator 轮流进 Dashboard 时，浏览器交接不要靠记忆

团队里只要开始出现：

- 白天一个人看 Dashboard
- 晚上另一个人接手
- 手机、笔记本、值班机轮流上

就很容易出现一种表面正常、实际很乱的状态：

- 每个人都“好像知道怎么进去”
- 但没人能稳定说清当前该连哪台 gateway、token 从哪来、浏览器是不是已经配对过

这类问题最好的解法不是记忆力更好，而是把浏览器交接做成固定顺序。

## 1. 先交接“实例归属”，不是先交接 URL

URL 只是结果，不是事实来源。

更应该先交接的是：

- 当前主 gateway 是哪台
- 日常入口走 SSH tunnel、Tailscale Serve，还是其他固定路径
- 当前值班是否有临时切换

如果这一步没确认，后面即使 URL 能打开，也不代表进的是正确实例。

## 2. token 来源要写成固定规则

团队里最忌讳的是：

- 有人觉得去配置文件里抄
- 有人觉得 rerun `openclaw dashboard`
- 有人觉得从旧链接里翻

更稳的做法是固定一条：

- 明文 token 从哪拿
- SecretRef token 由谁解析
- 什么场景优先 rerun `openclaw dashboard`

这样交接时不会每次都重新猜。

## 3. 浏览器是否已配对要单独确认

Control UI 和 Dashboard 这条线里，一个很容易被低估的问题是：

- 浏览器设备授权本身就是独立状态

所以交接时要明确：

- 当前这台机器 / 这个 profile 是否已经完成 device pairing
- 如果没有，谁来 approve

不要把“某个人以前用过这台电脑”当成当前一定还能直接进的依据。

## 4. 不要复用来源不明的旧 token 化链接

尤其在团队环境里，更不适合把：

- 聊天记录里的旧链接
- 截图里的旧地址
- 不知道何时生成的 token 化 URL

当成正式交接方式。

更稳的做法仍然是：

- 回到当前可验证的入口和 token 来源

## 5. 交接时顺带做一次最小核对

建议至少核对这三件事：

- 当前 gateway URL
- 当前 operator 设备是否已配对
- 当前入口是否需要重新建立 auth

这一步虽然简单，但能挡掉很多“以为只是浏览器问题”的误判。

## 一条更稳的交接顺序

建议按这个顺序走：

1. 确认当前主 gateway
2. 确认本次访问路径
3. 确认 token 来源
4. 确认浏览器 pairing 状态
5. 再进入 Dashboard

## 下一步推荐

- [Dashboard 的 SecretRef token、sessionStorage 和非 token 化 URL 应该怎么理解](/docs/reference/dashboard-secretref-and-sessionstorage)
- [Dashboard 遇到 unauthorized、1008 和 AUTH_TOKEN_MISMATCH 时怎么恢复](/docs/operations/dashboard-auth-mismatch-recovery)
- [团队里如何管理 Gateway、Operator 与浏览器控制面](/best-practices/team-gateway-operator-playbook)
