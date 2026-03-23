type SearchKind = '文档' | '新闻' | '最佳实践'

export type SiteSearchItem = {
  title: string
  description: string
  category: string
  tags: string[]
  path: string
  kind: SearchKind
  score?: number
}

type SearchOptions = {
  query?: string
  kind?: string
  limit?: number
}

const resultOrder: SearchKind[] = ['文档', '最佳实践', '新闻']

export function useSiteSearchIndex() {
  const { data: manifest, pending, error, refresh, status } = useContentManifest()

  const allItems = computed<SiteSearchItem[]>(() => {
    const docItems = (manifest.value?.collections.docs.items || []).map(item => ({
      title: String(item.title || ''),
      description: String(item.description || ''),
      category: String(item.category || '文档'),
      tags: Array.isArray(item.tags) ? (item.tags as string[]) : [],
      path: String(item.path || ''),
      kind: '文档' as const,
    }))

    const newsItems = (manifest.value?.collections.news.items || []).map(item => ({
      title: String(item.title || ''),
      description: String(item.description || ''),
      category: String(item.category || '新闻'),
      tags: Array.isArray(item.tags) ? (item.tags as string[]) : [],
      path: String(item.path || ''),
      kind: '新闻' as const,
    }))

    const practiceItems = (manifest.value?.collections.bestPractices.items || []).map(item => ({
      title: String(item.title || ''),
      description: String(item.description || ''),
      category: String(item.category || '最佳实践'),
      tags: Array.isArray(item.tags) ? (item.tags as string[]) : [],
      path: String(item.path || ''),
      kind: '最佳实践' as const,
    }))

    return [...docItems, ...practiceItems, ...newsItems]
  })

  return {
    manifest,
    pending,
    error,
    refresh,
    status,
    allItems,
  }
}

export function searchSiteItems(items: SiteSearchItem[], options: SearchOptions = {}) {
  const keyword = String(options.query || '').trim().toLowerCase()
  const selectedKind = String(options.kind || '全部')
  const limit = options.limit

  const ranked = items
    .map((item) => {
      const title = item.title.toLowerCase()
      const description = item.description.toLowerCase()
      const category = item.category.toLowerCase()
      const kind = item.kind.toLowerCase()
      const tags = item.tags.join(' ').toLowerCase()
      const target = `${title} ${description} ${category} ${kind} ${tags}`

      let score = 0

      if (!keyword) {
        score = 1
      }
      else {
        if (title.includes(keyword)) {
          score += title.startsWith(keyword) ? 14 : 10
        }

        if (description.includes(keyword)) {
          score += 4
        }

        if (category.includes(keyword) || kind.includes(keyword)) {
          score += 3
        }

        if (tags.includes(keyword)) {
          score += 5
        }

        if (!target.includes(keyword)) {
          score = 0
        }
      }

      if (selectedKind !== '全部' && item.kind !== selectedKind) {
        score = 0
      }

      return {
        ...item,
        score,
      }
    })
    .filter(item => item.score > 0)
    .sort((left, right) =>
      right.score - left.score
      || resultOrder.indexOf(left.kind) - resultOrder.indexOf(right.kind)
      || left.title.localeCompare(right.title, 'zh-CN'),
    )

  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked
}

export function groupSiteSearchResults(items: SiteSearchItem[]) {
  return resultOrder
    .map(kind => ({
      kind,
      items: items.filter(item => item.kind === kind),
    }))
    .filter(group => group.items.length > 0)
}

export function buildSearchSuggestions(items: SiteSearchItem[], limit = 8) {
  return searchSiteItems(items, { limit })
}
