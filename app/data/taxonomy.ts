import type { NavItem } from '~/data/content'

export type TopicDefinition = {
  slug: string
  title: string
  description: string
  keywords: string[]
  tags: string[]
  categories: string[]
}

export const topicDefinitions: TopicDefinition[] = [
  {
    slug: 'installation',
    title: '安装与启动',
    description: '覆盖安装、Onboarding、快速开始和第一次跑通最小链路。',
    keywords: ['安装', 'onboarding', 'quickstart', 'setup', '启动'],
    tags: ['installation', 'quickstart', 'onboarding', 'setup', 'install-script', 'npm'],
    categories: ['安装', '入门'],
  },
  {
    slug: 'gateway-ops',
    title: 'Gateway 与运维',
    description: '围绕 Gateway 状态、日常检查、升级窗口和长期运行维护。',
    keywords: ['gateway', '运维', 'status', 'logs', 'operations'],
    tags: ['gateway', 'operations', 'status', 'logs', 'maintenance'],
    categories: ['运维', '更新', '架构'],
  },
  {
    slug: 'channels',
    title: '渠道接入',
    description: '整理 WhatsApp、Telegram、飞书、钉钉、QQ 等渠道接入与使用路径。',
    keywords: ['channel', 'telegram', 'whatsapp', 'discord', '飞书', '钉钉', 'qq'],
    tags: ['channels', 'telegram', 'whatsapp', 'discord', 'feishu', 'lark'],
    categories: ['功能'],
  },
  {
    slug: 'skills-tools',
    title: 'Skills 与 Tools',
    description: '适合已经跑通基础链路，准备理解 Skills、Tools、Hooks 与自动化扩展的人。',
    keywords: ['skills', 'tools', 'hooks', 'automation'],
    tags: ['skills', 'tools', 'hooks', 'automation', 'workflows'],
    categories: ['功能', '自动化'],
  },
  {
    slug: 'models',
    title: '模型与本地推理',
    description: '围绕 Models、Provider 选择、Ollama 和本地模型接入。',
    keywords: ['model', 'models', 'ollama', 'provider', 'llm'],
    tags: ['models', 'llm', 'providers', 'routing', 'ollama'],
    categories: ['功能', '产品'],
  },
  {
    slug: 'security',
    title: '安全与权限',
    description: '覆盖认证、暴露面、allowlist、Tailscale/SSH 和技能安全边界。',
    keywords: ['security', 'auth', '安全', 'tailscale', 'ssh'],
    tags: ['security', 'auth', 'tailscale', 'dashboard', 'best-practices'],
    categories: ['运维'],
  },
]

export const learningPaths = [
  {
    slug: 'new-user',
    title: '新手首次部署路径',
    audience: '第一次接触 OpenClaw，希望先跑通本地最小链路的用户。',
    summary: '先理解产品，再完成安装与 Onboarding，最后进入 Gateway 和 Control UI。',
    steps: [
      { title: '理解产品定位', to: '/docs/getting-started/what-is-openclaw' },
      { title: '看阅读路径', to: '/docs/getting-started/reading-path' },
      { title: '完成安装', to: '/docs/setup/installation' },
      { title: '跑通 Onboarding', to: '/docs/getting-started/onboarding-guide' },
      { title: '看一个部署视频', to: '/videos#setup' },
    ],
    next: '/docs/getting-started/getting-started',
  },
  {
    slug: 'windows',
    title: 'Windows / WSL 路径',
    audience: '主要在 Windows 环境使用，想避免环境差异带来的卡点。',
    summary: '优先选择更稳定的 Windows/WSL 教程和安装文档，再进入安全与升级检查。',
    steps: [
      { title: '安装与环境', to: '/docs/setup/installation' },
      { title: 'Windows/WSL 视频', to: '/videos#setup' },
      { title: '安全基础', to: '/docs/operations/safety-basics' },
      { title: '升级检查单', to: '/docs/setup/migration-guide' },
    ],
    next: '/docs/operations/gateway-operations',
  },
  {
    slug: 'expansion',
    title: 'Skills 与扩展路径',
    audience: '已经部署完成，准备往 Skills、Tools、自动化和渠道接入扩展的人。',
    summary: '先理解 Tools 与 Hooks，再通过视频和最佳实践进入更实战的扩展方法。',
    steps: [
      { title: 'Tools 概览', to: '/docs/manual/tools-overview' },
      { title: 'Hooks 概览', to: '/docs/manual/hooks-overview' },
      { title: '热门技能', to: '/skills' },
      { title: 'Skills 视频', to: '/videos#skills' },
      { title: '自动化实践', to: '/best-practices/automation-workflows' },
    ],
    next: '/topics?topic=skills-tools',
  },
  {
    slug: 'team-ops',
    title: '团队运维路径',
    audience: '需要长期运行、版本升级、权限控制和团队协作方法的人。',
    summary: '先理解 Gateway 架构和安全边界，再建立升级、监控和反馈闭环。',
    steps: [
      { title: 'Gateway 架构', to: '/docs/manual/architecture' },
      { title: 'Gateway 运维', to: '/docs/operations/gateway-operations' },
      { title: '安全基础', to: '/docs/operations/safety-basics' },
      { title: '更新跟踪', to: '/docs/operations/release-tracking' },
      { title: '内容与问题反馈', to: '/feedback' },
    ],
    next: '/best-practices/monitoring-alerting',
  },
]

export function matchesTopic(item: NavItem & { tags?: string[] }, topic: TopicDefinition) {
  const haystack = `${item.title} ${item.description || ''} ${item.category || ''} ${item.path}`.toLowerCase()
  const tags = (item.tags || []).map(tag => tag.toLowerCase())

  if (topic.categories.includes(String(item.category || ''))) {
    return true
  }

  if (tags.some(tag => topic.tags.includes(tag))) {
    return true
  }

  return topic.keywords.some(keyword => haystack.includes(keyword.toLowerCase()))
}

export function pickTopicItems<T extends NavItem & { tags?: string[] }>(items: T[], topicSlug: string, limit?: number) {
  const topic = topicDefinitions.find(item => item.slug === topicSlug)
  if (!topic) {
    return []
  }

  const matched = items.filter(item => matchesTopic(item, topic))
  return typeof limit === 'number' ? matched.slice(0, limit) : matched
}
