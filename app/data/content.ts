export type NavItem = {
  title: string
  path: string
  description?: string
  category?: string
  date?: string
  difficulty?: string
  tags?: string[]
}

export const docCategoryLabels: Record<string, string> = {
  'getting-started': '入门教程',
  setup: '安装配置',
  manual: '功能手册',
  operations: '运维安全',
  reference: '参考资料',
}

const docsReadingOrder = [
  '/docs/getting-started/what-is-openclaw',
  '/docs/getting-started/who-is-openclaw-for',
  '/docs/getting-started/core-concepts',
  '/docs/getting-started/reading-path',
  '/docs/getting-started/getting-started',
  '/docs/setup/installation',
  '/docs/setup/windows-installation',
  '/docs/setup/macos-installation',
  '/docs/setup/linux-installation',
  '/docs/setup/deployment-options',
  '/docs/setup/china-cloud-deployment',
  '/docs/setup/installer-update-and-uninstall',
  '/docs/getting-started/onboarding-guide',
  '/docs/getting-started/first-agent',
  '/docs/getting-started/first-channel',
  '/docs/getting-started/first-skill',
  '/docs/getting-started/first-workflow',
  '/docs/manual/core-capabilities',
  '/docs/manual/agent-workspace',
  '/docs/manual/models-overview',
  '/docs/manual/providers-and-fallback',
  '/docs/manual/local-models-ollama',
  '/docs/manual/tools-overview',
  '/docs/manual/exec-tools-and-approvals',
  '/docs/manual/skills-system',
  '/docs/manual/skills-configuration',
  '/docs/manual/plugins-overview',
  '/docs/manual/control-ui',
  '/docs/manual/channels-overview',
  '/docs/manual/webchat-and-message-cli',
  '/docs/manual/telegram-and-whatsapp',
  '/docs/manual/discord-and-slack',
  '/docs/manual/signal-channel',
  '/docs/manual/bluebubbles-imessage',
  '/docs/manual/hooks-overview',
  '/docs/manual/camera-capture',
  '/docs/manual/voice-wake-and-talk-mode',
  '/docs/manual/architecture',
  '/docs/manual/nodes-and-device-actions',
  '/docs/manual/memory-system',
  '/docs/manual/memory-search-and-indexing',
  '/docs/manual/memory-tools-skills-playbook',
  '/docs/manual/session-and-pairing',
  '/docs/manual/system-prompt-context-and-compaction',
  '/docs/manual/message-retries-and-delivery',
  '/docs/operations/safety-basics',
  '/docs/operations/trusted-proxy-auth',
  '/docs/operations/gateway-operations',
  '/docs/operations/model-strategy-and-cost',
  '/docs/operations/remote-access',
  '/docs/operations/remote-operators-and-nodes',
  '/docs/operations/tailscale-serve-and-funnel',
  '/docs/operations/network-and-pairing',
  '/docs/operations/multiple-gateways',
  '/docs/operations/openclaw-security-best-practices',
  '/docs/operations/team-channel-session-strategy',
  '/docs/operations/release-tracking',
  '/docs/reference/troubleshooting',
  '/docs/reference/debugging-and-runtime-overrides',
  '/docs/reference/pairing-admin',
  '/docs/reference/cli-reference',
  '/docs/reference/configuration-reference',
  '/docs/reference/api-reference-overview',
  '/docs/reference/community',
  '/docs/setup/migration-guide',
]

function pathScore(path: string, order: string[]) {
  const exactIndex = order.indexOf(path)
  if (exactIndex !== -1) {
    return exactIndex
  }

  return order.length + 1000
}

export function sortDocs(items: NavItem[]) {
  return [...items].sort((left, right) => {
    const scoreDiff = pathScore(left.path, docsReadingOrder) - pathScore(right.path, docsReadingOrder)
    if (scoreDiff !== 0) {
      return scoreDiff
    }

    return left.title.localeCompare(right.title, 'zh-CN')
  })
}

export function sortNews(items: NavItem[]) {
  return [...items].sort((left, right) => {
    return String(right.date || '').localeCompare(String(left.date || ''))
  })
}

const difficultyOrder = ['入门', '基础', '进阶', '高级', '未分级']

export function sortBestPractices(items: NavItem[]) {
  return [...items].sort((left, right) => {
    const leftDifficulty = difficultyOrder.indexOf(String(left.difficulty || '未分级'))
    const rightDifficulty = difficultyOrder.indexOf(String(right.difficulty || '未分级'))

    if (leftDifficulty !== rightDifficulty) {
      return leftDifficulty - rightDifficulty
    }

    return left.title.localeCompare(right.title, 'zh-CN')
  })
}

export function sortShowcase(items: NavItem[]) {
  return [...items].sort((left, right) => {
    // 置顶的排在前面
    const leftFeatured = (left as any).featured ? 0 : 1
    const rightFeatured = (right as any).featured ? 0 : 1
    if (leftFeatured !== rightFeatured) {
      return leftFeatured - rightFeatured
    }

    // 按日期排序
    return String(right.date || '').localeCompare(String(left.date || ''))
  })
}

export function getPrevNext(items: NavItem[], currentPath: string) {
  const currentIndex = items.findIndex(item => item.path === currentPath)

  return {
    previous: currentIndex > 0 ? items[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < items.length - 1 ? items[currentIndex + 1] : null,
  }
}

export function normalizeTags(tags?: string[]) {
  return Array.isArray(tags) ? tags.filter(Boolean) : []
}

export function getDocCategoryLabel(path: string) {
  const match = String(path).match(/^\/docs\/([^/]+)/)
  if (!match) {
    return '文档'
  }

  return docCategoryLabels[match[1]] || match[1]
}

export function sharedTagCount(left?: string[], right?: string[]) {
  const leftTags = new Set(normalizeTags(left))
  return normalizeTags(right).filter(tag => leftTags.has(tag)).length
}
