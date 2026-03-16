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
    description: '适合已经跑通基础链路，准备理解 Skills、Tools、Hooks、插件与自动化扩展的人。',
    keywords: ['skills', 'tools', 'hooks', 'automation'],
    tags: ['skills', 'tools', 'hooks', 'automation', 'workflows'],
    categories: ['功能', '自动化'],
  },
  {
    slug: 'context-sessions',
    title: '上下文与会话',
    description: '围绕 system prompt、context、compaction、session pruning 和长期会话运行。',
    keywords: ['system prompt', 'context', 'compaction', 'session', 'pruning'],
    tags: ['system-prompt', 'context', 'compaction', 'pruning', 'sessions'],
    categories: ['功能'],
  },
  {
    slug: 'plugins',
    title: '插件与扩展',
    description: '围绕插件安装、启停、升级、配置入口，以及它和 Skills / Tools 的边界。',
    keywords: ['plugin', 'plugins', '扩展', 'voice-call', 'msteams', 'openclaw plugins'],
    tags: ['plugins', 'extensions', 'skills', 'tools', 'cli'],
    categories: ['功能'],
  },
  {
    slug: 'memory-search',
    title: '记忆与搜索',
    description: '覆盖 MEMORY、每日日志、语义索引、embeddings provider 和长期记忆召回。',
    keywords: ['memory', 'memory_search', 'index', 'embeddings', 'lancedb'],
    tags: ['memory', 'search', 'indexing', 'embeddings', 'lancedb'],
    categories: ['功能'],
  },
  {
    slug: 'providers',
    title: '模型提供商',
    description: '围绕 provider 认证、默认模型写法、fallback 和本地/云端模型组合。',
    keywords: ['provider', 'providers', 'fallback', 'openrouter', 'ollama'],
    tags: ['providers', 'models', 'fallback', 'openrouter', 'ollama'],
    categories: ['功能', '运维'],
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
  {
    slug: 'debugging',
    title: '调试与排障',
    description: '覆盖 doctor、logs、/debug、watch 模式和常见运行时排障顺序。',
    keywords: ['debug', 'debugging', 'doctor', 'logs', 'runtime overrides'],
    tags: ['debugging', 'debug', 'doctor', 'logs', 'runtime-overrides'],
    categories: ['排错', '运维'],
  },
  {
    slug: 'network',
    title: '网络与配对',
    description: '围绕 localhost、tailnet、设备发现、配对审批和远程节点接入。',
    keywords: ['network', 'pairing', 'identity', 'tailnet', 'discovery', 'mdns'],
    tags: ['network', 'pairing', 'identity', 'tailnet', 'mdns'],
    categories: ['运维', '功能'],
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
    slug: 'channels-integration',
    title: '渠道接入路径',
    audience: '已经跑通基础链路，准备连接 Telegram、WhatsApp、飞书等渠道的用户。',
    summary: '先确认渠道能力和登录方式，再结合视频与最佳实践完成第一次稳定接入。',
    steps: [
      { title: '渠道概览', to: '/docs/manual/channels-overview' },
      { title: '安全边界', to: '/docs/operations/safety-basics' },
      { title: '接入视频', to: '/videos#integration' },
      { title: '渠道案例', to: '/topics?topic=channels' },
      { title: '高级实践', to: '/best-practices/integration-development' },
    ],
    next: '/docs/manual/channels-overview',
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
    summary: '先通过工具系列理解边界，再进入 Skills、Hooks、插件和更实战的扩展方法。',
    steps: [
      { title: '工具系列总览', to: '/tools' },
      { title: 'Tools 概览', to: '/docs/manual/tools-overview' },
      { title: 'Exec 与审批', to: '/docs/manual/exec-tools-and-approvals' },
      { title: '插件系统', to: '/docs/manual/plugins-overview' },
      { title: 'Hooks 概览', to: '/docs/manual/hooks-overview' },
      { title: '热门技能', to: '/skills' },
      { title: 'Skills 视频', to: '/videos#skills' },
      { title: '自动化实践', to: '/best-practices/automation-workflows' },
    ],
    next: '/tools',
  },
  {
    slug: 'remote-network',
    title: '远程网络与节点路径',
    audience: '准备把 OpenClaw 放到远程主机、tailnet 或多设备环境中长期运行的人。',
    summary: '先理解网络模型和配对，再选择远程访问方式，最后进入多 Gateway 和环境隔离。',
    steps: [
      { title: '网络与配对', to: '/docs/operations/network-and-pairing' },
      { title: '远程访问', to: '/docs/operations/remote-access' },
      { title: 'Tailscale 选择', to: '/docs/operations/tailscale-serve-and-funnel' },
      { title: '多 Gateway 隔离', to: '/docs/operations/multiple-gateways' },
    ],
    next: '/topics?topic=network',
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
      { title: '调试与排障', to: '/docs/reference/debugging-and-runtime-overrides' },
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
