---
title: "OpenClaw 安全最佳实践"
description: "了解使用 OpenClaw 时的安全最佳实践，包括密码管理、权限控制和日志监控。"
category: 运维
date: "2026-03-09"
author: "Security Team"
source: "openclaw.ai/docs"
updatedAt: 2026-03-11
sourceType: official
tags: ["security", "best-practices", "guide"]
---

本文档介绍使用 OpenClaw 时的安全最佳实践，帮助你构建安全的 AI 助手系统。

## 核心安全原则

### 1. 认证与授权

- 使用强密码或 token 认证
- 定期轮换认证凭据
- 启用多因素认证（如果支持）
- 最小权限原则

### 2. 网络安全

- Gateway 默认绑定到 loopback (127.0.0.1)
- 远程访问优先使用 SSH tunnel 或 Tailscale
- 避免直接公网暴露
- 配置防火墙规则

### 3. 数据保护

- 敏感数据加密存储
- 定期备份配置和凭据
- 清理临时文件和日志
- 遵循数据保留策略

### 4. 渠道安全

- 配置 allowFrom 限制访问来源
- 启用群组 mention 规则
- 定期检查渠道配对状态
- 限制机器人权限

## 密码管理

### 使用强密码

```bash
# 生成强密码
openssl rand -base64 32
```

### 定期轮换

- 每 90 天更换一次密码
- 更换后更新所有客户端配置
- 记录更换日期以便跟踪

## 权限控制

### 技能权限

```yaml
permissions:
  - network: false  # 禁用网络访问
  - storage: true   # 仅允许本地存储
  - filesystem: false  # 禁用文件系统
  - commands: false    # 禁用命令执行
```

### 渠道权限

```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+15555550123", "+15555550124"]
    }
  }
}
```

## 日志监控

### 查看日志

```bash
# 查看最近日志
openclaw logs --recent

# 查看特定渠道日志
openclaw logs --channel telegram

# 实时日志
openclaw logs --follow
```

### 关键日志指标

- 认证失败次数
- 异常访问模式
- 渠道连接状态
- 技能执行结果

## 安全验证

### VirusTotal 集成

OpenClaw 已与 VirusTotal 合作，为技能提供安全验证：

- 静态代码分析
- 多引擎病毒扫描
- 行为监控
- 社区评分

### 安全检查命令

```bash
# 检查技能安全评分
openclaw skills security <skill-name>

# 检查系统安全状态
openclaw doctor --security
```

## 常见安全场景

### 场景一：家庭部署

- 本地运行，不暴露公网
- 使用强密码认证
- 定期备份配置

### 场景二：团队协作

- 配置团队认证
- 使用工作区技能
- 限制敏感操作

### 场景三：企业部署

- 使用 Ansible 自动化部署
- 集成企业身份认证
- 启用完整审计日志

## 应急响应

### 发现安全问题时的处理步骤

1. 立即禁用相关渠道或技能
2. 检查日志确定攻击范围
3. 更新认证凭据
4. 重新配置安全规则
5. 监控后续活动

### 备份与恢复

```bash
# 备份配置
openclaw config backup

# 恢复配置
openclaw config restore <backup-file>
```

## 相关资源

- [安全配置基础](/docs/operations/safety-basics)
- [故障排除与诊断思路](/docs/reference/troubleshooting)
- [Gateway 架构概览](/docs/manual/architecture)
