---
title: Windows 安装指南
description: 在 Windows 上安装和配置 OpenClaw 的详细指南，推荐使用 WSL2。
category: 安装
updatedAt: 2026-03-12
sourceType: official
tags: [windows, installation, setup, wsl2]
---

# Windows 安装指南

官方强烈建议 Windows 用户通过 **WSL2** 使用 OpenClaw。这一页提供完整的安装指南。

## 为什么推荐 WSL2

| 对比项 | WSL2 | 原生 Windows |
|--------|------|--------------|
| 兼容性 | ✅ 完全兼容 | ⚠️ 部分功能受限 |
| 性能 | ✅ 接近原生 | ⚠️ 可能有损耗 |
| 文档支持 | ✅ 完整 | ⚠️ 有限 |
| 问题排查 | ✅ 社区经验丰富 | ⚠️ 较少参考 |

## 方式一：WSL2 安装（推荐）

### 第 1 步：启用 WSL2

以管理员身份打开 PowerShell：

```powershell
# 启用 WSL
wsl --install

# 或手动安装
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

重启电脑后继续。

### 第 2 步：安装 Linux 发行版

```powershell
# 安装 Ubuntu（推荐）
wsl --install -d Ubuntu-22.04

# 查看可用发行版
wsl --list --online
```

### 第 3 步：配置 WSL2

创建或编辑 `%USERPROFILE%\.wslconfig`：

```ini
[wsl2]
memory=8GB
processors=4
swap=2GB
localhostForwarding=true
```

### 第 4 步：在 WSL2 中安装 OpenClaw

进入 WSL2：

```powershell
wsl
```

然后执行：

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 OpenClaw
curl -fsSL --proto '=https' --tlsv1.2 https://openclaw.ai/install.sh | bash
```

### 第 5 步：初始化

```bash
openclaw onboard --install-daemon
openclaw dashboard
```

## 方式二：原生 Windows 安装

如果你必须使用原生 Windows：

### 前置要求

- Windows 10 64位 (版本 2004+) 或 Windows 11
- PowerShell 5.1 或更高版本
- Git for Windows

### 安装步骤

#### 1. 安装 Git

```powershell
# 使用 winget
winget install Git.Git

# 或下载安装包
# https://git-scm.com/download/win
```

#### 2. 安装 Node.js

```powershell
# 使用 winget
winget install OpenJS.NodeJS.LTS

# 或使用 Chocolatey
choco install nodejs-lts

# 或下载安装包
# https://nodejs.org/
```

#### 3. 安装 OpenClaw

```powershell
# 使用 npm
npm install -g openclaw@latest

# 验证安装
openclaw --version
```

#### 4. 初始化

```powershell
openclaw onboard --install-daemon
```

## 常见问题

### `npm error spawn git / ENOENT`

这是 Git 未正确配置 PATH 的常见问题：

```powershell
# 检查 Git 是否在 PATH 中
git --version

# 如果找不到，添加到 PATH
$env:Path += ";C:\Program Files\Git\cmd"

# 永久添加
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\Git\cmd", "User")
```

### `openclaw is not recognized`

```powershell
# 检查 npm 全局路径
npm config get prefix

# 添加到 PATH
$env:Path += ";$(npm config get prefix)"

# 永久添加
[Environment]::SetEnvironmentVariable("Path", $env:Path, "User")
```

### WSL2 网络问题

```bash
# 在 WSL2 中检查网络
ping google.com

# 如果无法访问，尝试重置网络
# 在 Windows PowerShell 中：
wsl --shutdown
# 然后重新打开 WSL
```

### Windows 防火墙

首次运行时，Windows 可能阻止 OpenClaw：

1. 控制面板 → Windows Defender 防火墙
2. 允许应用通过防火墙
3. 添加 `node.exe` 或 `openclaw`

### PowerShell 执行策略

```powershell
# 如果脚本执行被阻止
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 访问 WSL2 服务

### 从 Windows 访问 WSL2 服务

WSL2 自动转发端口，可以直接访问：

```
http://localhost:3000
```

### 从其他设备访问

```bash
# 在 WSL2 中获取 IP
ip addr show eth0

# 配置端口转发（Windows PowerShell 管理员）
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=<WSL_IP>
```

## Windows Terminal 配置

推荐使用 Windows Terminal 获得更好的体验：

### 安装 Windows Terminal

```powershell
winget install Microsoft.WindowsTerminal
```

### 添加 OpenClaw 配置文件

在 Windows Terminal 设置中添加：

```json
{
  "name": "OpenClaw",
  "commandline": "wsl -d Ubuntu-22.04 -e openclaw dashboard",
  "icon": "🤖",
  "startingDirectory": "~"
}
```

## VS Code 集成

### 安装 WSL 扩展

1. 安装 "WSL" 扩展
2. 安装 "Remote - WSL" 扩展

### 在 WSL 中打开项目

```powershell
# 在 WSL 目录中
code .
```

## 卸载

### 卸载 OpenClaw

```powershell
# npm 方式
npm uninstall -g openclaw

# 清理配置
Remove-Item -Recurse -Force "$env:USERPROFILE\.openclaw"
```

### 卸载 WSL

```powershell
# 卸载发行版
wsl --unregister Ubuntu-22.04

# 禁用 WSL
wsl --uninstall
```

## 下一步

- [快速入门](/docs/getting-started/getting-started)
- [macOS 安装指南](/docs/setup/macos-installation)
- [Linux 安装指南](/docs/setup/linux-installation)