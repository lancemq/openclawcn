export type NavItem = {
  title: string
  path: string
  description?: string
  category?: string
  date?: string
  difficulty?: string
  tags?: string[]
}

const docsReadingOrder = [
  '/docs/getting-started/what-is-openclaw',
  '/docs/getting-started/who-is-openclaw-for',
  '/docs/getting-started/reading-path',
  '/docs/getting-started/getting-started',
  '/docs/setup/installation',
  '/docs/getting-started/onboarding-guide',
  '/docs/manual/core-capabilities',
  '/docs/manual/models-overview',
  '/docs/manual/tools-overview',
  '/docs/manual/plugins-overview',
  '/docs/manual/control-ui',
  '/docs/manual/channels-overview',
  '/docs/manual/hooks-overview',
  '/docs/manual/architecture',
  '/docs/manual/memory-system',
  '/docs/manual/memory-search-and-indexing',
  '/docs/manual/session-and-pairing',
  '/docs/operations/safety-basics',
  '/docs/operations/gateway-operations',
  '/docs/operations/remote-access',
  '/docs/operations/tailscale-serve-and-funnel',
  '/docs/operations/network-and-pairing',
  '/docs/operations/multiple-gateways',
  '/docs/operations/openclaw-security-best-practices',
  '/docs/operations/release-tracking',
  '/docs/reference/troubleshooting',
  '/docs/reference/pairing-admin',
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

export function sharedTagCount(left?: string[], right?: string[]) {
  const leftTags = new Set(normalizeTags(left))
  return normalizeTags(right).filter(tag => leftTags.has(tag)).length
}
