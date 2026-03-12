export type DownloadItem = {
  platform: string
  version: string
  releaseDate: string
  size: string
  requirements: string[]
  notes: string[]
  href?: string
  command?: string
  recommended?: boolean
}

export type DownloadSection = {
  id: string
  title: string
  eyebrow: string
  description: string
  items: DownloadItem[]
}

export const downloadStats = [
  {
    label: '最新版本',
    value: '2026.3.7',
    note: '2026-03-05 发布',
  },
  {
    label: '支持平台',
    value: '5',
    note: 'macOS / Windows / Linux / Docker / 源码',
  },
  {
    label: '安装方式',
    value: '3+',
    note: '一键脚本 / 包管理器 / 手动安装',
  },
]

export const downloadSignals = [
  {
    label: '选择建议',
    value: '优先一键安装',
    note: '首次安装推荐使用官方一键脚本，自动处理依赖和配置。',
  },
  {
    label: '版本选择',
    value: '稳定版优先',
    note: '生产环境建议使用最新稳定版，开发测试可尝试预览版。',
  },
  {
    label: '安装前准备',
    value: '先看文档',
    note: '安装前建议先阅读安装文档，了解环境要求和注意事项。',
  },
]

export const installCommands = [
  {
    platform: 'macOS / Linux',
    command: 'curl -fsSL https://openclaw.ai/install.sh | bash',
    note: '一键安装脚本（推荐）',
    href: 'https://openclaw.ai/install.sh',
  },
  {
    platform: 'Windows (PowerShell)',
    command: 'irm https://openclaw.ai/install.ps1 | iex',
    note: 'PowerShell 一键安装',
    href: 'https://openclaw.ai/install.ps1',
  },
  {
    platform: 'Homebrew (macOS)',
    command: 'brew install openclaw',
    note: 'macOS 推荐方式',
    href: 'https://formulae.brew.sh/formula/openclaw',
  },
  {
    platform: 'Docker',
    command: 'docker run -d --name openclaw openclaw/openclaw:latest',
    note: '容器化部署',
    href: 'https://hub.docker.com/r/openclaw/openclaw',
  },
  {
    platform: 'npm',
    command: 'npm install -g @openclaw/cli',
    note: 'Node.js 全局安装',
    href: 'https://www.npmjs.com/package/@openclaw/cli',
  },
]

export const downloadSections: DownloadSection[] = [
  {
    id: 'quick-install',
    title: '一键安装',
    eyebrow: 'Quick Install',
    description: '最简单的安装方式，复制命令执行即可自动完成安装。',
    items: [
      {
        platform: 'macOS / Linux',
        version: '2026.3.7',
        releaseDate: '2026-03-05',
        size: '自动下载',
        requirements: ['curl 命令', 'bash 环境', '网络连接'],
        notes: ['自动检测系统架构', '自动安装依赖', '支持卸载和更新'],
        command: 'curl -fsSL https://openclaw.ai/install.sh | bash',
        href: 'https://openclaw.ai/install.sh',
        recommended: true,
      },
      {
        platform: 'Windows (PowerShell)',
        version: '2026.3.7',
        releaseDate: '2026-03-05',
        size: '自动下载',
        requirements: ['PowerShell 5.1+', '管理员权限（可选）', '网络连接'],
        notes: ['自动检测系统架构', '支持 WSL 环境检测', '可配置安装路径'],
        command: 'irm https://openclaw.ai/install.ps1 | iex',
        href: 'https://openclaw.ai/install.ps1',
        recommended: true,
      },
    ],
  },
  {
    id: 'package-managers',
    title: '包管理器安装',
    eyebrow: 'Package Managers',
    description: '使用系统包管理器安装，便于版本管理和更新。',
    items: [
      {
        platform: 'Homebrew (macOS)',
        version: '2026.3.7',
        releaseDate: '2026-03-05',
        size: '~150 MB',
        requirements: ['Homebrew 已安装', 'macOS 12.0+'],
        notes: ['自动处理依赖', 'brew upgrade 更新', 'brew uninstall 卸载'],
        command: 'brew install openclaw',
        href: 'https://formulae.brew.sh/formula/openclaw',
        recommended: true,
      },
      {
        platform: 'npm (Node.js)',
        version: '2026.3.7',
        releaseDate: '2026-03-05',
        size: '~100 MB',
        requirements: ['Node.js 20 LTS', 'npm 或 pnpm'],
        notes: ['全局安装 CLI', '适合开发者', '支持 npx 运行'],
        command: 'npm install -g @openclaw/cli',
        href: 'https://www.npmjs.com/package/@openclaw/cli',
      },
      {
        platform: 'Nix Flake',
        version: '2026.3.7',
        releaseDate: '2026-03-05',
        size: 'N/A',
        requirements: ['Nix 包管理器', 'Flakes 支持'],
        notes: ['可复现构建', '适合 NixOS 用户', '开发环境友好'],
        command: 'nix profile install github:openclaw/openclaw',
        href: 'https://github.com/openclaw/openclaw',
      },
    ],
  },
  {
    id: 'docker',
    title: 'Docker 部署',
    eyebrow: 'Docker',
    description: '容器化部署，适合生产环境和多实例部署。',
    items: [
      {
        platform: 'Docker Hub',
        version: '2026.3.7',
        releaseDate: '2026-03-05',
        size: '~400 MB',
        requirements: ['Docker 20.10+', '4GB+ 可用内存', '持久化存储卷'],
        notes: ['预配置环境', '支持多架构', '易于扩展'],
        command: 'docker run -d --name openclaw openclaw/openclaw:latest',
        href: 'https://hub.docker.com/r/openclaw/openclaw',
        recommended: true,
      },
      {
        platform: 'Docker Compose',
        version: '2026.3.7',
        releaseDate: '2026-03-05',
        size: '~400 MB',
        requirements: ['Docker Compose v2', 'docker-compose.yml'],
        notes: ['完整服务栈', '包含数据库', '一键启动'],
        href: 'https://github.com/openclaw/openclaw/tree/main/docker',
      },
    ],
  },
  {
    id: 'source',
    title: '源码编译',
    eyebrow: 'Source',
    description: '从源码编译安装，适合开发者自定义构建。',
    items: [
      {
        platform: 'GitHub Release',
        version: '2026.3.7',
        releaseDate: '2026-03-05',
        size: '源码 ~50 MB',
        requirements: ['Node.js 20 LTS', 'pnpm 8.0+', 'Git'],
        notes: ['完整源码', '可自定义构建', '适合贡献者'],
        href: 'https://github.com/openclaw/openclaw/releases',
      },
      {
        platform: 'Git Clone',
        version: 'main 分支',
        releaseDate: '最新',
        size: '源码 ~50 MB',
        requirements: ['Node.js 20 LTS', 'pnpm 8.0+', 'Git'],
        notes: ['最新开发版', '可能不稳定', '适合测试新功能'],
        command: 'git clone https://github.com/openclaw/openclaw.git',
        href: 'https://github.com/openclaw/openclaw',
      },
    ],
  },
]

export const downloadQuickLinks = [
  {
    title: '安装文档',
    description: '详细的安装步骤和环境配置',
    to: '/docs/setup/installation',
    meta: '文档',
  },
  {
    title: '版本更新日志',
    description: '查看各版本的更新内容',
    to: '/news?category=产品更新',
    meta: '更新日志',
  },
  {
    title: '系统要求',
    description: '了解各平台的详细要求',
    to: '/docs/setup/installation#requirements',
    meta: '参考',
  },
  {
    title: '常见问题',
    description: '安装过程中的常见问题',
    to: '/faq',
    meta: 'FAQ',
  },
]

export const systemRequirements = {
  minimum: {
    cpu: '2 核',
    memory: '4 GB',
    storage: '10 GB',
    network: '互联网连接',
  },
  recommended: {
    cpu: '4 核+',
    memory: '8 GB+',
    storage: '20 GB+',
    network: '稳定网络',
  },
}

export const supportedPlatforms = [
  { name: 'macOS', versions: ['12.0 (Monterey)+', 'Apple Silicon (M1/M2/M3)', 'Intel x64'] },
  { name: 'Windows', versions: ['Windows 10 1809+', 'Windows 11', 'WSL2 支持'] },
  { name: 'Linux', versions: ['Ubuntu 20.04+', 'Debian 11+', 'Fedora 35+'] },
  { name: 'Docker', versions: ['Docker 20.10+', 'Docker Compose v2'] },
]