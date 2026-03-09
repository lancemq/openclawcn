---
title: OpenClaw 安装与环境
description: 按官方推荐方式安装 OpenClaw，并根据本地开发、WSL2 和生产部署场景选择合适的安装路径。
category: 安装
---

# OpenClaw 安装与环境

这一页讲的是 OpenClaw 本身应该如何安装，而不是泛泛的环境准备。根据官方当前文档，最推荐的安装方式是使用官网提供的安装脚本，它会自动处理 Node 检测、OpenClaw CLI 安装，以及首次 onboarding。

## 官方推荐的系统要求

OpenClaw 当前的安装前提主要是：

- Node.js 22+
- macOS、Linux 或 Windows
- 如果你从源码构建，需要 `pnpm`

官方还特别强调了一点：如果你在 Windows 上运行 OpenClaw，强烈建议通过 **WSL2** 使用，而不是直接把 Windows 当作首选运行环境。

## 最推荐的安装方式：官网安装脚本

官方推荐使用安装脚本完成交互式安装。它会做这些事情：

- 检测并安装 Node.js 22+
- 安装 OpenClaw CLI
- 在合适的情况下直接进入 onboarding

macOS / Linux / WSL2 的推荐命令是：

```bash
curl -fsSL --proto '=https' --tlsv1.2 https://openclaw.ai/install.sh | bash
```

如果你想先看脚本参数：

```bash
curl -fsSL --proto '=https' --tlsv1.2 https://openclaw.ai/install.sh | bash -s -- --help
```

对绝大多数中文用户来说，这条路径比手工装 Node、再手工全局安装 CLI 更稳，因为它把依赖检查和 onboarding 串在了一起。

## 另一条常见路径：直接安装 CLI

如果你已经有稳定的 Node.js 22+ 环境，也可以直接安装：

```bash
npm install -g openclaw@latest
# 或
pnpm add -g openclaw@latest
```

安装后建议立即执行：

```bash
openclaw onboard --install-daemon
```

这是当前官方 quick start 里最常见的命令组合。

## Docker 安装方式

如果你更倾向于容器化部署，项目也提供了 Docker 支持：

```bash
# 克隆仓库
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 使用 docker-compose 启动
docker-compose up -d
```

这种方式适合：
- 快速原型体验
- 隔离环境的开发测试
- 已有 Docker 基础设施的团队

## 从源码安装（开发场景）

如果你想贡献代码或进行深度定制：

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install
pnpm ui:build
pnpm build

pnpm openclaw onboard --install-daemon
```

注意：从源码构建需要 `pnpm` 作为包管理器。

## 安装完成后怎么验证

官方给出的最小验证动作是：

```bash
openclaw doctor
openclaw status
openclaw dashboard
```

它们分别解决三个问题：

- `openclaw doctor`：检查配置和环境是否存在明显问题
- `openclaw status`：确认 gateway 是否在运行
- `openclaw dashboard`：打开 Control UI，完成第一次可见的使用验证

如果你只跑一条最小链路，建议优先把这三步跑通。

## 配置文件和路径在哪里

官方文档当前说明，默认配置位于：

```bash
~/.openclaw/openclaw.json
```

如果你需要调整默认路径，常见环境变量有：

- `OPENCLAW_HOME`
- `OPENCLAW_STATE_DIR`
- `OPENCLAW_CONFIG_PATH`

这些变量适合放在更进阶的部署和迁移场景里，第一次安装通常不需要改。

## 平台差异与建议

### macOS

最适合做第一次体验和日常桌面使用。官方安装脚本会在需要时补 Homebrew、Node.js 和 Git。

### Linux

适合长期运行、远程访问和服务器部署。apt/dnf/yum 路径都在官方安装脚本考虑范围内。

### Windows

官方强烈建议通过 WSL2 使用。这样可以避开不少 PATH、Git 和本地工具兼容性问题。

如果你在 Windows 上直接安装，官方故障排除里点名提到两类常见问题：

- `npm error spawn git / ENOENT`
- `openclaw is not recognized`

这两类问题本质上通常都是 Git 或 PATH 没配好。

## 生产环境怎么装

如果你要把 OpenClaw 放到长期运行的服务器上，官方推荐的生产部署方向不是手工拼命令，而是：

- 使用 `openclaw-ansible`
- 通过 Tailscale、UFW、防火墙和 systemd 做更完整的安全部署

官方给出的 Ansible 快速安装入口是：

```bash
curl -fsSL https://raw.githubusercontent.com/openclaw/openclaw-ansible/main/install.sh | bash
```

这条路径更适合：

- Debian / Ubuntu 服务器
- 需要持续运行的 Gateway
- 希望默认就有 SSH + Tailscale 安全边界的场景

### Tailscale 远程访问

OpenClaw 原生支持 Tailscale 远程访问：

- **Tailscale Serve** - 通过 HTTPS 安全暴露 dashboard，适合大多数远程场景
- **Tailscale Funnel** - 公网暴露模式，需要额外认证保护
- **Tailscale 身份认证** - 支持利用 Tailscale 身份头做认证 (`gateway.auth.allowTailscale`)

Tailscale 集成让你可以在保持 Gateway 本地运行的同时，通过加密通道从任何地方安全访问。

## 安装时最常见的几个坑

### `openclaw` 安装成功但命令找不到

官方文档指出，这通常是全局 npm 安装目录没有进入 `PATH`。应优先检查：

```bash
node -v
npm -v
npm prefix -g
echo "$PATH"
```

### Linux 上全局 npm 安装报 `EACCES`

这往往是 npm 的全局前缀指向 root 拥有目录。官方安装脚本会尝试切换前缀到用户目录。

### Windows 缺 Git

即使你走 npm 安装，某些依赖仍可能触发 git URL 相关安装逻辑，所以 Git 仍然是常见前置项。

## 一条适合新用户的安装顺序

1. 先用官网安装脚本完成安装
2. 跑 `openclaw onboard --install-daemon`
3. 跑 `openclaw doctor`
4. 跑 `openclaw status`
5. 跑 `openclaw dashboard`

如果到这一步都正常，再进入渠道、认证和远程访问配置。

## 下一步推荐

- [快速入门](/docs/getting-started)
- [Onboarding 引导流程说明](/docs/onboarding-guide)
- [Gateway 架构概览](/docs/architecture)
- [安全配置基础](/docs/safety-basics)
