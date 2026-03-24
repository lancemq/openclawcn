---
title: 国内云部署思路
description: 面向中文团队整理 OpenClaw 在国内或面向国内网络环境部署时最该先判断的三件事：入口生态、模型端点和长期在线后的运维边界。
category: 安装
updatedAt: 2026-03-24
source: https://docs.openclaw.ai/zh-CN/install
sourceName: OpenClaw Docs
sourceType: official
tags: [china, cloud, deployment, feishu, qwen, qianfan]
---

# 国内云部署思路

中文用户在部署 OpenClaw 时，真正影响体验的通常不是“能不能跑起来”，而是：

- 入口是不是贴近自己的办公生态
- 模型端点在当前网络环境下是否稳定
- 长期在线后怎么做远程管理和安全收口

所以“国内云部署”更适合被理解成一套判断顺序，而不是某个固定模板。

## 第一步：先判断你到底是不是需要云

如果你只是：

- 想先学习 OpenClaw
- 还没确定自己会不会长期用
- 主要想跑通最小链路

那本地先跑通通常更划算。

只有当你已经明确需要下面这些目标时，云环境才会开始体现价值：

- 24/7 在线
- 多人协作
- 固定远程入口
- 渠道长期挂接

## 第二步：先看入口生态，再看机器价格

对中文团队来说，服务器本身只是底座。真正影响后续体验的，往往是你要接哪类入口。

### 更偏个人或技术团队

如果你主要依赖：

- Dashboard
- WebChat
- Telegram

那么海外或本地都可能够用，云只是在长期在线上更省心。

### 更偏中文办公协作

如果你主要想接：

- 飞书
- 企业沟通群组
- 团队值班与通知流

那更应该先看飞书链路是否顺、管理面如何收口，而不是先挑最低价主机。

官方现在的飞书通道已经支持：

- onboarding 向导接入
- `openclaw channels add` 交互式配置
- 长连接 WebSocket 事件订阅
- `domain: "lark"` 国际租户切换
- `typingIndicator` / `resolveSenderNames` 两个额度优化开关

对中文团队来说，这意味着飞书接入已经不再是“先搭 webhook 公网入口”的老思路。

## 第三步：模型端点要按网络环境分层选

很多人上云后第一反应是“机器稳定了”，但长期成本和可用性更容易受模型端点影响。

当前更值得中文用户关注的几类端点是：

### Moonshot / Kimi

官方已经区分了：

- Moonshot API
- Kimi Coding

两者不是同一个 provider，密钥、端点和模型引用都不同。

如果你面向国内网络环境，官方文档已经明确给出：

- 国际端点：`https://api.moonshot.ai/v1`
- 中国端点：`https://api.moonshot.cn/v1`

这类 provider 更适合你已经明确要把 Kimi 作为主力或备用模型时再接入。

### Qwen OAuth

官方 Qwen provider 现在更像“低门槛试用入口”：

- 走设备码 OAuth
- 默认是 `qwen-portal`
- 文档注明有每日请求额度上限

它更适合：

- 本地测试
- 快速验证 Qwen 路由
- 轻量试用

但不太适合一开始就被当成唯一长期主力。

### Qianfan

如果你本来就在百度云体系里，Qianfan 是更像“统一 MaaS 入口”的路线。

官方接入方式也已经很直接：

```bash
openclaw onboard --auth-choice qianfan-api-key
```

它更适合：

- 团队已经有百度云账号体系
- 想把模型接入放进统一平台
- 希望后续管理方式更接近企业 MaaS

## 第四步：国内云最容易忽略的不是启动，而是管理面

机器跑起来后，真正容易出问题的通常是：

- 直接暴露高权限入口
- 没有把 Dashboard / WebChat / 渠道边界拆开
- 没有定义谁能进浏览器控制面

更稳的顺序通常是：

1. 先把实例跑起来
2. 先只开放你真正需要的入口
3. 再补远程访问、配对、浏览器授权和 allowlist

不要把“云上能打开”当成“已经适合长期运行”。

## 2026 年 3 月 24 日的外部中文资料信号

除了官方文档，近期公开可访问的中文教程站也在集中讨论国内云部署、企业微信 / 微信入口和国内模型端点。这些资料对判断“中文团队到底会怎么落地”很有帮助，但更适合补场景，不适合替代官方配置真值。

我这轮整理时重点参考了：

- [OpenClaw 中文教程：部署与 Docker](https://openclawgithub.cc/guide/deploy/)
- [OpenClaw 中文教程：快速开始](https://openclawgithub.cc/guide/start/)
- [OpenClaw 中文教程：微信（WeChat）](https://openclawgithub.cc/guide/channels/wechat/)

从这些公开中文资料里，当前最明显的三个信号是：

1. 中文团队更常把“飞书 / 企业微信 / 微信入口”放在和“买哪台云主机”同等重要的位置  
2. 国内模型经常被和部署一起讨论，而不是等系统跑通后再选  
3. 很多中文教程仍会把“先开放端口再说”当成默认步骤

第三点尤其值得提醒：一些中文部署示例会直接开放 `18789` 端口甚至给出 `0.0.0.0/0` 的安全组示例。  
这类做法确实能更快验证联通性，但**按官方 2026 年 3 月的安全文档，更稳的默认方案仍然是 loopback + SSH tunnel / Tailscale Serve / 受控反向代理**，而不是直接把 Gateway 暴露成公网入口。

所以如果你在中文环境里参考外部教程，建议按这个顺序过滤：

1. 先用官方 docs 确认能力是否真实存在  
2. 再把中文教程当成“国内场景补充”  
3. 看到开放公网端口、宽松安全组、默认暴露控制面这类做法时，优先回到官方安全页重新核对

## 第五步：一条更稳的中文团队迁移路径

对多数中文团队来说，更实际的顺序通常是：

1. 先本地跑通 onboarding、Dashboard 和最小会话
2. 再确定主要入口是飞书、WebChat 还是其他渠道
3. 再决定主力模型走 Moonshot、Qianfan、Qwen 还是混合策略
4. 最后再把长期在线环境迁到云上

这样做的好处是：

- 入口问题不会和云问题混在一起
- 模型问题不会和部署问题混在一起
- 成本也更容易分层看清

## 如果你是第一次为中文团队上云

优先确认这 5 件事：

1. 团队主要入口是不是飞书
2. 主力模型是不是国内端点优先
3. 远程访问准备用什么方式
4. 浏览器控制面谁能进
5. 升级、备份和回滚谁负责

只要这几件事没有明确，云环境通常还不算真正“准备好了”。

## 下一步推荐

- [飞书 Bot 开发实战](/best-practices/feishu-bot-development)
- [Dashboard、WebChat 和聊天渠道分别什么时候用](/docs/getting-started/when-to-use-dashboard-webchat-or-channels)
- [模型选型与成本控制](/docs/operations/model-strategy-and-cost)
- [远程访问](/docs/operations/remote-access)
- [如何结合官方文档、GitHub 和中文渠道跟踪 OpenClaw](/docs/reference/external-sources-and-trust-levels)
