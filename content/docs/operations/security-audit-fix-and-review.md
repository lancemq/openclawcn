---
title: security audit、--deep 和 --fix 该怎么配合
description: 基于最新官方安全文档，解释 openclaw security audit、--deep 与 --fix 各自适合什么阶段，哪些问题适合自动修复，哪些仍应人工复核。
category: 运维
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/gateway/security
sourceName: OpenClaw Docs
sourceType: official
tags: [security, audit, hardening, fix, operations]
---

# security audit、--deep 和 --fix 该怎么配合

官方最近在安全文档里，把 `openclaw security audit` 写成了非常明确的第一入口，而且已经补到了：

- `openclaw security audit`
- `openclaw security audit --deep`
- `openclaw security audit --fix`

这说明安全检查已经不只是“看一眼有没有报红”，而是逐渐变成一条正式的加固路径。

## 先用一句话记住三者分工

- `audit`：先看当前暴露面
- `--deep`：把检查做得更彻底
- `--fix`：自动收紧一批明确的高风险默认项

## 为什么 `security audit` 现在值得优先跑

官方安全文档当前明确把它当成：

- 修改配置后
- 暴露远程入口后
- 长期运行巡检时

都值得优先执行的入口。

这代表官方已经不希望你只靠：

- 记住几条安全建议

而是更希望你把风险检查做成正式动作。

## `--fix` 现在会自动处理哪些问题

根据当前官方文档，`--fix` 至少会处理这几类明确高风险项：

- 把常见渠道的 `groupPolicy="open"` 收紧成 `allowlist`
- 把 `logging.redactSensitive="off"` 恢复成 `"tools"`
- 收紧 `~/.openclaw`、配置文件和常见状态文件权限

这说明它更适合处理：

- 明确可以自动收紧的默认危险项

而不是替你完成全部安全设计。

## 哪些问题更适合自动修

- 文件权限过宽
- 明显过松的 redact 配置
- 常见渠道组策略过于开放

这些都属于：

- 有较清晰安全方向
- 不太依赖业务上下文

## 哪些问题更适合人工复核

像下面这些，通常不该只靠 `--fix`：

- trusted-proxy 代理信任链
- `allowUsers` 范围
- operator 浏览器入口
- approvals forwarding 批准权扩散
- Node / Gateway 的远程边界

因为这些问题更像：

- 架构边界
- 身份边界
- 组织边界

## 为什么 `--deep` 也值得单独看

更稳的理解方式是：

- 普通 `audit` 适合高频巡检
- `--deep` 更适合变更后或上线前复查

也就是说，`--deep` 更像一次：

- 发布前复盘
- 大改后的安全复核

## 一条更实用的使用顺序

通常更适合按这条线走：

1. 先跑 `openclaw security audit`
2. 看是否存在明显高风险项
3. 对明确可自动收紧的项再跑 `--fix`
4. 对远程访问、trusted-proxy、审批面等问题继续人工复核
5. 大改后再补一次 `--deep`

## 最容易踩的坑

### 1. 跑完 `--fix` 就当安全已经完成

自动修复不等于架构已经安全。

### 2. 只在首次部署时跑一次

很多风险恰恰发生在后续接渠道、开远程入口、放宽策略之后。

### 3. 把所有 critical 都当成“功能报错”

有些 critical 本来就是官方故意提醒你：你正在承担更高风险配置。

## 哪些时机最该再跑一次

- 新开一个聊天渠道后
- 新增 Node 或 remote operator 后
- 切到 trusted-proxy 后
- 放宽 approvals 或 allowlist 后

## 下一步推荐

- [OpenClaw 安全配置基础](/docs/operations/safety-basics)
- [Trusted Proxy Auth 怎么用](/docs/operations/trusted-proxy-auth)
- [Trusted Proxy 上线前应该过哪些检查](/best-practices/trusted-proxy-rollout-checklist)

