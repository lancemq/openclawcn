---
title: identityLinks 更适合当成“身份映射表”，而不是联系人备注
description: 结合最新官方 Session、Configuration Reference 和 Security 文档，总结团队里怎样把 identityLinks 当成正式变更对象来维护，避免跨渠道身份映射越配越乱。
category: 会话治理
difficulty: 高级
updatedAt: 2026-03-29
source: https://docs.openclaw.ai/concepts/session
sourceName: OpenClaw Docs
sourceType: official
tags: [identityLinks, session, routing, governance, best-practices]
---

# identityLinks 更适合当成“身份映射表”，而不是联系人备注

OpenClaw 的 `identityLinks` 很容易被误解成：

- 联系人备注
- 便捷别名
- 顺手补一下的映射

但如果站在长期运行角度看，它更像一张正式的：

- 身份映射表

因为它会直接影响：

- 跨渠道时哪些 DM 会折叠到同一 canonical identity

## 第一原则：只映射“你真的确认是同一个人”的身份

这听起来像废话，但团队里最容易出问题的就是：

- 看到名字像
- 渠道头像像
- 操作员口头说“应该是同一个人”

就把两条 identity link 到一起。

一旦映射错了，后果不是展示错误，而是：

- 上下文被并桶
- 历史被共享
- 路由判断更难拆

## 第二原则：把变更理由写出来

更稳的做法不是只改配置，而是至少记录：

- 为什么判定这是同一个人
- 是哪两个或哪几个渠道身份
- 谁批准了这次映射
- 如果以后要回滚，受影响的会话范围是什么

因为 `identityLinks` 一旦多起来，最难的不是新增，而是：

- 几周后没人知道当初为什么这样连

## 第三原则：先定 dmScope，再谈 identityLinks

官方现在已经把这层关系说得很清楚：

- `dmScope` 决定分桶粒度
- `identityLinks` 决定跨渠道折叠

所以团队里别把两件事反过来做。  
更稳的顺序是：

1. 先确认 DM 应该按什么粒度隔离
2. 再决定哪些跨渠道身份真的要归并

## 第四原则：高风险入口不要急着做跨渠道合并

如果当前入口本身就处在更敏感的治理面，比如：

- shared inbox
- 多 operator 协作
- secure DM 刚上线
- 多账号 / 多工作区并行

那 `identityLinks` 往往更适合保守一点。  
因为这时你最需要的是：

- 先看边界是否稳定

而不是：

- 尽快让所有入口都连续

## 第五原则：把 identityLinks 当成“少而准”的对象

长期更稳的状态通常不是越多越好，而是：

- 少量、稳定、确认过的映射

如果映射表开始快速膨胀，通常说明团队正在把本该靠：

- clearer routing
- 更细 dmScope
- 更清楚的入口设计

解决的问题，转嫁给 `identityLinks`。

## 第六原则：每次改完都看“有没有多并”

identityLinks 的风险很多时候不是“没生效”，而是：

- 生效太多了

所以每次变更后，更值得检查的是：

- 某些原本该分开的 DM 是否突然共享上下文
- 多账号入口有没有被意外折叠
- shared inbox 场景里是否把不该连续的人类身份合并了

## 推荐延伸阅读

- [dmScope 和 identityLinks 应该怎么一起用](/docs/reference/dm-scope-and-identity-links)
- [secure DM mode 和 owner pinning 应该怎么一起理解](/docs/reference/secure-dm-mode-and-owner-pinning)
- [哪些配置会被官方当成 shared-user ingress 信号](/docs/reference/shared-user-ingress-signals)
