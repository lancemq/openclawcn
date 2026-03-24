---
title: "OpenClaw 远程入口观察：trusted-proxy 正在被官方明确定义为高收益但高责任模式"
description: "基于 2026 年 3 月 24 日可见的官方 trusted-proxy auth 文档，最近最值得关注的不是怎么把页面转发出来，而是 OpenClaw 正在主动强调 trusted-proxy 的安全责任转移。"
category: 生态观察
date: "2026-03-24"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/gateway/trusted-proxy-auth"
updatedAt: "2026-03-24"
sourceType: "official"
tags: ["trusted-proxy", "security", "remote", "gateway", "auth"]
---

如果只看“怎么把 Gateway 挂到反向代理后面”，很容易错过最近官方 trusted-proxy 文档最核心的信号。

这轮文档更值得注意的重点其实是：

- trusted-proxy 不是便利性开关，而是安全责任转移

## 1. 官方在主动强调它是高风险模式

当前官方文档已经明确说明：

- `openclaw security audit` 会把 trusted-proxy 标成 critical

这不是因为它不可用，而是在提醒操作者：

- 你把认证边界前移给代理了

## 2. 这和“普通 HTTPS 反向代理”不是一回事

官方最近把两者的区别写得更清楚了：

- 普通代理负责 TLS 和转发
- trusted-proxy 负责身份信任链

这代表 OpenClaw 正在更明确地区分：

- 暴露网页
- 托付认证

## 3. `allowUsers`、`userHeader` 和 `trustedProxies` 正在成为关键三件套

trusted-proxy 文档里最近最值得中文用户注意的，不是某一行配置，而是这三层边界一起出现了：

- 来源是不是可信代理
- 用户身份 header 是否正确
- 被允许进入 Gateway 的用户范围是否明确

这说明官方已经把 trusted-proxy 从“概念能力”继续推进成“必须成套理解的部署模式”。

## 4. 这会影响中文团队的上线顺序

如果以前很多人会先把页面挂到代理后面，再看看要不要补身份，现在更稳的顺序应该反过来：

1. 先确认代理本身做了认证
2. 先确认 Gateway 没有旁路入口
3. 再决定是否切 trusted-proxy

## 这对中文站意味着什么

最近这轮官方信号其实在告诉团队用户一件事：

- trusted-proxy 当然能带来更统一的远程入口
- 但它不是“小改配置就能顺便得到”的能力

真正重要的是：

- 网络收口
- 身份收口
- 用户范围收口

## 推荐延伸阅读

- [Trusted Proxy Auth 怎么用](/docs/operations/trusted-proxy-auth)
- [Trusted Proxy 上线前应该过哪些检查](/best-practices/trusted-proxy-rollout-checklist)
- [security audit、--deep 和 --fix 该怎么配合](/docs/operations/security-audit-fix-and-review)

