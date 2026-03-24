---
title: "OpenClaw 安全观察：security audit 已经从提醒工具继续长成加固入口"
description: "基于 2026 年 3 月 24 日可见的官方安全文档，最近最值得关注的信号是 openclaw security audit 不再只是列问题，而是在形成 audit、deep、fix 三段式加固路径。"
category: 生态观察
date: "2026-03-24"
author: "OpenClawCN"
source: "https://docs.openclaw.ai/gateway/security"
updatedAt: "2026-03-24"
sourceType: "official"
tags: ["security", "audit", "fix", "hardening", "operations"]
---

官方最近这轮安全文档里，一个很明显的变化是：

- `openclaw security audit` 已经不再只是提醒工具

而是在慢慢形成：

- audit
- deep
- fix

三段式加固路径。

## 1. 官方已经把它写成日常入口

根据当前官方文档，安全审计更像：

- 修改配置后先跑
- 暴露网络入口后再跑
- 长期运行时定期跑

这说明安全检查正在从“看文档记原则”走向“做正式动作”。

## 2. `--fix` 让一部分高风险项开始可自动收紧

官方目前已经明确写出，`--fix` 会收紧一批明确的危险默认项，例如：

- 开放式 groupPolicy
- 过松的敏感日志配置
- 常见状态文件权限

这代表官方在把一部分通用安全收口，直接做成产品能力。

## 3. 但它仍然不是“自动安全”

更值得注意的是，官方同时又把：

- trusted-proxy
- break-glass 风险开关
- 远程控制面

继续保留在显式高风险提示里。

这说明官方最近的方向不是：

- 一键全包安全

而是：

- 自动收紧明显问题
- 同时继续逼你正视架构级边界

## 这对中文团队意味着什么

如果你还把 `security audit` 只当成“出问题时顺手跑一下”，可能已经低估了它。  
从最近官方信号看，它更适合被放进：

- 部署后检查
- 远程入口变更检查
- 周期性巡检

成为长期运维的一部分。

## 推荐延伸阅读

- [security audit、--deep 和 --fix 该怎么配合](/docs/operations/security-audit-fix-and-review)
- [OpenClaw 安全配置基础](/docs/operations/safety-basics)
- [Trusted Proxy 上线前应该过哪些检查](/best-practices/trusted-proxy-rollout-checklist)

