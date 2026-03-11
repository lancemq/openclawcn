---
title: 版本升级与迁移
description: OpenClaw 版本升级步骤、迁移指南和回滚方案。
category: 运维管理
difficulty: 中级
updatedAt: 2026-03-11
sourceType: official
tags: [upgrade, migration, rollback, maintenance]
---

# 版本升级与迁移

本文介绍 OpenClaw 的版本升级和迁移流程。

## 升级前准备

### 检查当前版本

```bash
openclaw --version
openclaw status
```

### 查看可用更新

```bash
openclaw update check

# 输出
# 当前版本: 2026.3.6
# 最新版本: 2026.3.7
# 更新内容:
# - 性能优化
# - 新技能系统
# - 安全修复
```

### 备份配置

```bash
# 完整备份
openclaw backup full --output backup-$(date +%Y%m%d).tar.gz
```

## 升级步骤

### 自动升级

```bash
# 一键升级
openclaw update

# 指定版本
openclaw update --version 2026.3.7
```

### 手动升级

```bash
# 停止服务
openclaw stop

# 更新 CLI
npm update -g openclaw

# 启动服务
openclaw start
```

### Docker 升级

```bash
# 拉取新镜像
docker pull openclaw/openclaw:latest

# 重启容器
docker-compose up -d

# 查看日志
docker-compose logs -f
```

## 迁移指南

### 配置迁移

```bash
# 导出旧配置
openclaw config export --output old-config.json

# 导入新配置
openclaw config import --input old-config.json

# 验证配置
openclaw config validate
```

### 数据迁移

```bash
# 导出数据
openclaw data export --output data/

# 导入数据
openclaw data import --input data/

# 验证数据
openclaw data verify
```

## 回滚方案

### 自动回滚

```bash
# 启用自动回滚
openclaw update --auto-rollback

# 回滚到上一版本
openclaw rollback
```

### 手动回滚

```bash
# 停止当前版本
openclaw stop

# 安装上一版本
npm install -g openclaw@2026.3.6

# 恢复配置
openclaw config restore --version previous

# 启动服务
openclaw start
```

## 升级检查清单

### 升级前

- [ ] 备份配置和数据
- [ ] 检查系统要求
- [ ] 阅读发布说明
- [ ] 测试新功能

### 升级中

- [ ] 停止服务
- [ ] 执行升级
- [ ] 验证配置
- [ ] 检查日志

### 升级后

- [ ] 验证服务状态
- [ ] 测试核心功能
- [ ] 检查渠道连接
- [ ] 监控性能

## 下一步

- [备份恢复](/best-practices/backup-recovery)
- [故障排除](/docs/reference/troubleshooting)
- [Docker 部署](/best-practices/docker-deployment)
