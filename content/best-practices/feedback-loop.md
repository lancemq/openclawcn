---
title: 如何高质量反馈 OpenClaw 问题
description: 把自助排查、站内反馈和 GitHub Issues 用在正确阶段，减少无效沟通并提高问题处理效率。
category: 社区协作
difficulty: 中级
---

# 如何高质量反馈 OpenClaw 问题

很多问题并不是没人回答，而是问题描述太散、入口选错了，或者还没完成最基本的自助排查。对 OpenClaw 这类持续演进的系统来说，反馈质量会直接决定问题处理速度。

## 更推荐的反馈路径

1. 先用 FAQ 和搜索自助查找
2. 仍然找不到时提交站内反馈，说明缺了什么文档或说明
3. 对源码、功能和长期讨论问题再进入 GitHub Issues 或 Discussions

## 为什么这样更有效

- 用户不需要一上来就判断"这是不是 bug"
- 中文站可以先沉淀常见理解和使用问题
- GitHub 更适合承接需要公开追踪和修复的问题

## 提问时至少带上这些信息

1. **当前使用的版本** - `openclaw --version`
2. **操作系统与运行环境** - macOS/Windows/Linux，芯片类型
3. **复现步骤** - 清晰的操作步骤
4. **关键报错或日志** - 完整的错误信息
5. **是否只影响某个渠道，还是整体不可用**

## 自助排查清单

在提交反馈前，请先完成以下检查：

### 基础检查

```bash
# 检查版本
openclaw --version

# 检查状态
openclaw doctor

# 查看日志
openclaw logs --recent
```

### 环境检查

- [ ] Gateway 是否正常运行
- [ ] 网络连接是否稳定
- [ ] 认证是否过期
- [ ] 磁盘空间是否充足

### 配置检查

- [ ] 配置文件语法正确
- [ ] 环境变量已设置
- [ ] 渠道配置有效

## 最常见的低质量反馈

- ❌ 只说"不能用了"，但没有版本和环境
- ❌ 不说明做了什么操作
- ❌ 把文档理解问题、渠道配置问题和源码 bug 混在一起
- ❌ 重复提交相同问题

## 高质量反馈示例

### 示例一：功能不可用

**版本：** OpenClaw 2026.3.7
**环境：** macOS 15.2 (Apple Silicon)
**操作：** 通过 Telegram 发送消息
**问题：** 消息发送后没有收到回复
**日志：**
```
[2026-03-09 10:00:00] INFO: Message received from Telegram
[2026-03-09 10:00:00] ERROR: Failed to process message: Connection timeout
```

### 示例二：功能建议

**类型：** 功能建议
**场景：** 希望添加定时任务功能
**理由：**
- 现有技能需要每天固定时间执行
- 手动触发不够方便
**期望：** 支持类似 cron 的定时任务配置

## 推荐做法

| 问题类型 | 推荐入口 | 原因 |
|----------|----------|------|
| 文档不清晰 | 站内反馈 | 完善中文资料 |
| 配置问题 | 站内反馈/社区 | 常见问题沉淀 |
| 功能 bug | GitHub Issues | 公开追踪 |
| 功能建议 | GitHub Discussions | 社区讨论 |
| 安全漏洞 | 私下联系维护者 | 安全保障 |

## 社区资源

- [GitHub Issues](https://github.com/openclaw/openclaw/issues)
- [GitHub Discussions](https://github.com/openclaw/openclaw/discussions)
- [官方文档](https://docs.openclaw.ai)
- [社区论坛](/docs/community)

这样比所有问题都直接扔进一个入口更稳，也更容易让维护者真正处理到位。