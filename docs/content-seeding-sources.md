# OpenClawCN 冷启动内容来源清单

目标不是复制官方文档，而是基于一手资料整理成适合中文用户阅读的介绍、教程、FAQ、更新解读和案例内容。

## 一手来源

### 1. 官方文档

主站：
- https://docs.openclaw.ai/

适合转化的内容方向：
- 产品介绍与定位
- 安装与快速开始
- 渠道与平台能力
- 工具、插件、技能与扩展
- 配置、安全、故障排查

当前已确认的文档入口包括：
- Home / Getting Started / Onboarding
- Channels
- Agents
- Tools
- Models
- Platforms
- Gateway & Ops
- Reference
- Help

适合优先转成中文站点内容。

### 2. 官方 GitHub 仓库

仓库：
- https://github.com/openclaw/openclaw

适合获取：
- README 产品说明
- CHANGELOG / Releases 更新日志
- Discussions 社区讨论方向
- Issues 高频问题与真实痛点
- docs/ 和 repo 内辅助说明

### 3. 官方 Releases

发布页：
- https://github.com/openclaw/openclaw/releases

当前已确认：
- 最新 release 为 `openclaw 2026.3.7`，发布时间为 `2026-03-08`

适合转化：
- 中文版本更新速览
- breaking changes 解读
- 新功能专题页
- 升级提醒与迁移建议

### 4. 官方 Showcase / 场景页

示例入口：
- https://docs.openclaw.ai/start/showcase

适合转化：
- 使用场景介绍
- 面向中文用户的“适合谁 / 不适合谁”
- 行业和个人使用案例模板

## 二手来源

这部分只能作为补充，必须明确标注为“社区经验”或“非官方”。

可用来源：
- 社区 runbook / setup guide
- GitHub Discussions 高质量问答
- 社区安全配置文章
- 公开 gist 和教程仓库

使用原则：
- 只提炼经验，不直接照搬长文
- 与官方文档冲突时以官方为准
- 页面中注明“社区实践”而非“官方能力”

## 推荐冷启动内容结构

### A. 产品介绍层

建议先补 8 到 12 篇：
- OpenClaw 是什么
- OpenClaw 与普通聊天机器人有什么区别
- OpenClaw 适合哪些人
- OpenClaw 的核心能力总览
- OpenClaw 的多渠道接入能力
- OpenClaw 的插件与扩展机制
- OpenClaw 的安全边界
- OpenClaw 的本地运行与自托管价值

### B. 快速开始层

建议先补 10 到 15 篇：
- 安装前准备
- Node 版本与环境要求
- 5 分钟快速开始
- `openclaw onboard` 中文解读
- Control UI 如何使用
- 常见初始配置
- 常见启动失败排查
- 本地访问与远程访问方式

### C. 功能专题层

建议先补 15 到 20 篇：
- WhatsApp 接入说明
- Telegram 接入说明
- Discord 接入说明
- iMessage 能力边界
- 多 agent / 多 session 路由
- Media 支持能力
- Plugins 使用方式
- ClawHub 是什么
- OpenProse 是什么
- Doctor 命令怎么用
- memory / routing / onboarding 等 release 新特性解读

### D. 运维与安全层

建议先补 10 到 15 篇：
- 常见配置项中文说明
- 安全配置建议
- allowlist / token / auth 基础解释
- 网关与远程访问风险
- 升级和迁移注意事项
- 版本 breaking changes 汇总
- FAQ / troubleshooting

### E. 更新内容层

建议持续补：
- 每个 release 的中文摘要
- 重要 breaking change 说明
- 新插件 / 新平台支持
- 已知问题与规避方式

## 建议的获取方式

### 方式 1：人工高质量整理

适合首页、产品介绍、中文教程、FAQ。

流程：
1. 从官方 docs 或 GitHub 选一篇原始内容
2. 提取结构与事实
3. 重写为中文面向用户的页面
4. 补充“适合谁 / 怎么选 / 常见误区”

### 方式 2：半自动更新流

适合新闻、版本更新、功能变更。

来源：
- GitHub Releases
- CHANGELOG
- docs 新增页面或更新页面

输出：
- `/news` 下的版本更新摘要
- `/best-practices` 下的迁移和升级建议

### 方式 3：问题驱动内容扩充

适合 FAQ 和社区支持内容。

来源：
- GitHub Issues
- GitHub Discussions
- 用户反馈表单
- 订阅与社区入口的用户问题

输出：
- FAQ
- 常见报错页
- “为什么这样设计”解释页

## 采集优先级

第一优先级：
- 官方 docs 首页和 Getting Started
- GitHub README
- 最新 5 到 10 个 Releases
- Showcase

第二优先级：
- Plugins / ClawHub / OpenProse / Doctor
- Help / Troubleshooting
- 安全和配置相关文档

第三优先级：
- 社区 runbook
- 高质量 issue / discussion
- 第三方教程与案例

## 执行建议

最稳妥的冷启动方式是先做一轮“30 篇基础内容包”：
- 10 篇产品介绍与入门
- 10 篇功能专题
- 5 篇 FAQ / troubleshooting
- 5 篇版本更新与升级说明

再做第二轮“20 篇场景与运维内容包”。
