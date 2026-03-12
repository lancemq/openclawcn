---
title: Linux 安装指南
description: 在 Linux 服务器和桌面上安装和配置 OpenClaw 的详细指南。
category: 安装
updatedAt: 2026-03-12
sourceType: official
tags: [linux, installation, setup, server]
---

# Linux 安装指南

Linux 是运行 OpenClaw 的理想平台，特别适合长期运行的服务器部署。这一页提供在各种 Linux 发行版上安装 OpenClaw 的完整指南。

## 系统要求

| 要求 | 最低配置 | 推荐配置 |
|------|----------|----------|
| 发行版 | Ubuntu 20.04 / Debian 11 | Ubuntu 22.04 / Debian 12 |
| 内核 | 4.18+ | 5.15+ |
| 内存 | 2 GB | 4 GB 或更多 |
| 存储 | 5 GB | 20 GB 或更多 |
| CPU | 1 核 | 2 核或更多 |

## 支持的发行版

- Ubuntu 20.04 / 22.04 / 24.04
- Debian 11 / 12
- CentOS Stream 8 / 9
- Rocky Linux 8 / 9
- Fedora 38+
- Arch Linux

## Ubuntu / Debian 安装

### 方式一：官方安装脚本（推荐）

```bash
# 下载并执行安装脚本
curl -fsSL --proto '=https' --tlsv1.2 https://openclaw.ai/install.sh | bash
```

### 方式二：手动安装

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装依赖
sudo apt install -y curl git build-essential

# 安装 Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 验证 Node.js
node -v  # 应显示 v22.x.x

# 安装 OpenClaw
npm install -g openclaw@latest

# 验证安装
openclaw --version
```

## CentOS / Rocky Linux 安装

```bash
# 更新系统
sudo dnf update -y

# 安装依赖
sudo dnf install -y curl git gcc-c++ make

# 安装 Node.js 22
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs

# 安装 OpenClaw
npm install -g openclaw@latest
```

## Arch Linux 安装

```bash
# 更新系统
sudo pacman -Syu

# 安装依赖
sudo pacman -S --needed nodejs npm git

# 安装 OpenClaw
npm install -g openclaw@latest
```

## Fedora 安装

```bash
# 更新系统
sudo dnf update -y

# 安装 Node.js
sudo dnf install -y nodejs npm

# 安装 OpenClaw
npm install -g openclaw@latest
```

## 首次配置

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

# 检查运行状态
openclaw status
```

## 服务器部署

### 创建专用用户

```bash
# 创建 openclaw 用户
sudo useradd -r -s /bin/bash -m openclaw

# 切换用户
sudo su - openclaw

# 安装 OpenClaw
curl -fsSL --proto '=https' --tlsv1.2 https://openclaw.ai/install.sh | bash
```

### Systemd 服务配置

创建服务文件 `/etc/systemd/system/openclaw.service`：

```ini
[Unit]
Description=OpenClaw Gateway
After=network.target

[Service]
Type=simple
User=openclaw
Group=openclaw
WorkingDirectory=/home/openclaw
Environment="NODE_ENV=production"
ExecStart=/usr/bin/openclaw start --no-daemon
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启用服务：

```bash
# 重载 systemd
sudo systemctl daemon-reload

# 启用开机自启
sudo systemctl enable openclaw

# 启动服务
sudo systemctl start openclaw

# 查看状态
sudo systemctl status openclaw
```

### 日志管理

```bash
# 查看日志
sudo journalctl -u openclaw -f

# 查看最近 100 行
sudo journalctl -u openclaw -n 100
```

## Docker 部署

### 使用 Docker Compose

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - openclaw-data:/home/node/.openclaw
    environment:
      - NODE_ENV=production
      - OPENCLAW_LOG_LEVEL=info

volumes:
  openclaw-data:
```

启动：

```bash
docker-compose up -d
```

### 使用 Docker 命令

```bash
# 拉取镜像
docker pull openclaw/openclaw:latest

# 运行容器
docker run -d \
  --name openclaw \
  -p 3000:3000 \
  -v openclaw-data:/home/node/.openclaw \
  openclaw/openclaw:latest
```

## 防火墙配置

### UFW (Ubuntu)

```bash
# 允许 OpenClaw 端口
sudo ufw allow 3000/tcp

# 查看状态
sudo ufw status
```

### firewalld (CentOS/Rocky)

```bash
# 允许端口
sudo firewall-cmd --permanent --add-port=3000/tcp

# 重载配置
sudo firewall-cmd --reload
```

### iptables

```bash
# 允许端口
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT

# 保存规则
sudo iptables-save > /etc/iptables/rules.v4
```

## 反向代理配置

### Nginx

```nginx
server {
    listen 80;
    server_name openclaw.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Caddy

```
openclaw.example.com {
    reverse_proxy localhost:3000
}
```

## 安全加固

### 限制访问 IP

```bash
# 使用 iptables 限制访问
sudo iptables -A INPUT -p tcp --dport 3000 -s 192.168.1.0/24 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3000 -j DROP
```

### 配置认证

```json
{
  "gateway": {
    "auth": {
      "enabled": true,
      "type": "token",
      "token": "${GATEWAY_TOKEN}"
    }
  }
}
```

### 使用 Tailscale

```bash
# 安装 Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# 连接网络
sudo tailscale up

# 配置 OpenClaw 使用 Tailscale
# 在配置中设置：
# "gateway": { "auth": { "allowTailscale": true } }
```

## 常见问题

### 权限问题

```bash
# 如果 npm 全局安装需要 sudo
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### 内存不足

```bash
# 检查内存
free -h

# 添加 swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 永久启用
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 端口被占用

```bash
# 查找占用进程
sudo lsof -i :3000

# 终止进程
sudo kill -9 <PID>

# 或使用其他端口
openclaw start --port 3001
```

## 卸载

```bash
# 卸载 OpenClaw
npm uninstall -g openclaw

# 清理配置
rm -rf ~/.openclaw

# 停止并禁用服务
sudo systemctl stop openclaw
sudo systemctl disable openclaw
sudo rm /etc/systemd/system/openclaw.service
sudo systemctl daemon-reload
```

## 下一步

- [快速入门](/docs/getting-started/getting-started)
- [生产部署指南](/docs/setup/deployment-options)
- [安全最佳实践](/docs/operations/openclaw-security-best-practices)