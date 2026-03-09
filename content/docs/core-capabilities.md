---
title: OpenClaw 核心能力总览
description: 用一页理解 OpenClaw 当前最重要的能力结构，包括渠道、控制台、扩展和运行边界。
category: 产品
---

# OpenClaw 核心能力总览

官方文档当前把 OpenClaw 的能力组织成若干块：开始使用、渠道、agents、tools、models、platforms、gateway 与运维、帮助与参考。对中文用户来说，这说明它不是单一功能，而是一整套围绕助手运行的结构。

## 1. 渠道接入

OpenClaw 的一大特点是渠道能力。你不一定只通过一个网页和它交互，而可能通过不同消息入口与同一个助手体系连接。

这带来的意义是：

- 入口不再单一
- 助手能力更贴近日常通信方式
- 同一套配置和逻辑可以服务多个使用场景

## 2. 控制界面

除了聊天渠道，OpenClaw 还提供 Control UI 这类更适合管理和观察系统状态的入口。

这类入口通常更适合：

- 首次完成配置
- 查看系统是否正常运行
- 调整能力和运行参数
- 做排查和检查

## 3. 引导与配置

OpenClaw 官方文档强调 onboarding 和 setup 路径，这说明它希望用户先经过一轮可理解的初始化，而不是一开始就手写全部配置。

这对第一次使用很重要，因为它降低了理解系统结构时的门槛。

## 4. 工具与扩展

OpenClaw 的价值还在于它不是只调用模型。它还包含工具、hooks、平台能力以及后续可扩展的结构。

从中文站点角度看，这一层是后续最值得持续扩写的内容，因为很多用户真正卡住的地方，往往都在“怎么接进去”和“怎么安全使用”。

## 5. 模型与运行边界

模型并不是 OpenClaw 的全部，但它是运行体系的一部分。更准确地说，OpenClaw 关心的是：

- 模型从哪里来
- 怎么和工具、渠道、配置结合
- 如何在自己的部署边界里运行

这也是它和单纯聊天网页最大的区别之一。

## 6. 运维与网关

当你开始把它长期运行起来，就会进入 gateway、远程访问、安全和运维问题。

很多用户会在这一层意识到：OpenClaw 不只是一个“AI 功能集合”，而是一套需要被管理的长期系统。

## 建议的理解顺序

最推荐的顺序是：

1. 先理解定位
2. 再理解渠道和 Control UI
3. 再理解 onboarding、工具和 hooks
4. 最后再进入平台、模型和运维

## 下一步推荐

- [渠道能力概览](/Users/maqi/code/openclawcn/content/docs/channels-overview.md)
- [Control UI 是什么](/Users/maqi/code/openclawcn/content/docs/control-ui.md)
- [Hooks 能做什么](/Users/maqi/code/openclawcn/content/docs/hooks-overview.md)
