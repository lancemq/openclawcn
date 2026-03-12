---
title: macOS 安装指南
description: 在 macOS 上安装和配置 OpenClaw 的详细指南。
category: 安装
updatedAt: 2026-03-12
sourceType: official
tags: [macos, installation, setup, apple]
---

# macOS 安装指南

macOS 是体验 OpenClaw 的最佳平台之一。这一页提供在 macOS 上安装和配置 OpenClaw 的完整指南。

## 系统要求

| 要求 | 最低配置 | 推荐配置 |
|------|----------|----------|
| macOS 版本 | macOS 12 (Monterey) | macOS 14 (Sonoma) |
| 芯片 | Intel Core i5 | Apple Silicon (M1/M2/M3) |
| 内存 | 8 GB | 16 GB 或更多 |
| 存储空间 | 5 GB | 10 GB 或更多 |

## 安装方式

### 方式一：官方安装脚本（推荐）

打开终端，执行：

```bash
curl -fsSL --proto '=https' --tlsv1.2 https://openclaw.ai/install.sh | bash
```

这个脚本会：
- 检测并安装 Node.js 22+
- 安装 OpenClaw CLI
- 引导完成首次配置

### 方式二：Homebrew

如果你使用 Homebrew：

```bash
# 添加 tap
brew tap openclaw/tap

# 安装 OpenClaw
brew install openclaw
```

### 方式三：npm 全局安装

如果你已有 Node.js 22+ 环境：

```bash
npm install -g openclaw@latest
```

## Apple Silicon 优化

### 原生 ARM64 支持

OpenClaw 完全支持 Apple Silicon (M1/M2/M3) 原生运行：

```bash
# 验证架构
node -p "process.arch"
# 应输出: arm64
```

### 性能优势

Apple Silicon 芯片在以下方面表现优异：
- 本地模型推理速度
- 内存效率
- 电池续航

## 配置环境

### 安装 Node.js

推荐使用 nvm 管理 Node.js：

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 安装 Node.js 22
nvm install 22
nvm use 22
nvm alias default 22

# 验证
node -v  # 应显示 v22.x.x
```

或使用 Homebrew：

```bash
brew install node@22
```

### 配置 Git

```bash
# 安装 Xcode Command Line Tools
xcode-select --install

# 配置 Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

## 首次运行

### 初始化

```bash
# 运行 onboarding
openclaw onboard --install-daemon
```

### 验证安装

```bash
# 检查状态
openclaw doctor

# 查看版本
openclaw version

# 启动服务
openclaw start

# 打开控制台
openclaw dashboard
```

## macOS Companion App

OpenClaw 提供了原生 macOS 应用，提供更好的桌面体验：

### 功能特点

- 原生 macOS 界面
- 菜单栏快捷访问
- 系统通知集成
- 快捷键支持
- 自动启动选项

### 安装方式

```bash
# 通过 Homebrew 安装
brew install --cask openclaw

# 或下载 DMG
# https://openclaw.ai/download/macos
```

### 配置自动启动

```bash
# 设置开机启动
openclaw autostart enable

# 取消开机启动
openclaw autostart disable
```

## 权限配置

### 文件系统访问

macOS 可能需要授权文件系统访问：

1. 系统偏好设置 → 安全性与隐私 → 隐私
2. 选择"完全磁盘访问"
3. 添加 Terminal 或 OpenClaw 应用

### 网络权限

首次启动时，macOS 会请求网络权限：
- 允许传入连接（用于本地服务）
- 允许传出连接（用于 API 调用）

## 常见问题

### "无法验证开发者"

如果遇到安全提示：

```bash
# 允许运行
xattr -cr /Applications/OpenClaw.app

# 或在系统偏好设置中允许
```

### Homebrew 安装失败

```bash
# 更新 Homebrew
brew update

# 清理缓存
brew cleanup

# 重新安装
brew reinstall openclaw
```

### Node.js 版本问题

```bash
# 检查 Node 版本
node -v

# 如果版本过低，更新 Node
brew upgrade node

# 或使用 nvm
nvm install 22
nvm use 22
```

### 端口被占用

```bash
# 查找占用端口的进程
lsof -i :3000

# 终止进程
kill -9 <PID>

# 或使用其他端口
openclaw start --port 3001
```

## 卸载

### 通过 Homebrew 卸载

```bash
brew uninstall openclaw
brew untap openclaw/tap
```

### 通过 npm 卸载

```bash
npm uninstall -g openclaw
```

### 清理配置文件

```bash
# 删除配置目录
rm -rf ~/.openclaw

# 删除数据目录
rm -rf ~/Library/Application\ Support/OpenClaw
```

## 下一步

- [快速入门](/docs/getting-started/getting-started)
- [Windows 安装指南](/docs/setup/windows-installation)
- [Linux 安装指南](/docs/setup/linux-installation)