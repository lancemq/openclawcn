<script setup lang="ts">
useSeo({
  title: '站内搜索',
  description: '搜索 OpenClawCN 的文档、新闻和社区资料。',
  path: '/search',
  noindex: true,
})

const route = useRoute()
const router = useRouter()

const searchInput = ref(typeof route.query.q === 'string' ? route.query.q : '')

const { data: docs } = await useAsyncData('search:docs', () => queryCollection('docs').all())
const { data: news } = await useAsyncData('search:news', () => queryCollection('news').all())
const { data: bestPractices } = await useAsyncData('search:best-practices', () =>
  queryCollection('bestPractices').all(),
)

const normalizedQuery = computed(() => searchInput.value.trim().toLowerCase())
const selectedKind = computed(() =>
  typeof route.query.kind === 'string' ? route.query.kind : '全部',
)

const allItems = computed(() => {
  const docItems = (docs.value || []).map((item) => ({
    title: String(item.title || ''),
    description: String(item.description || ''),
    category: String(item.category || '文档'),
    tags: Array.isArray(item.tags) ? (item.tags as string[]) : [],
    path: String(item.path || ''),
    kind: '文档',
  }))

  const newsItems = (news.value || []).map((item) => ({
    title: String(item.title || ''),
    description: String(item.description || ''),
    category: String(item.category || '新闻'),
    tags: Array.isArray(item.tags) ? (item.tags as string[]) : [],
    path: String(item.path || ''),
    kind: '新闻',
  }))

  const practiceItems = (bestPractices.value || []).map((item) => ({
    title: String(item.title || ''),
    description: String(item.description || ''),
    category: String(item.category || '最佳实践'),
    tags: Array.isArray(item.tags) ? (item.tags as string[]) : [],
    path: String(item.path || ''),
    kind: '最佳实践',
  }))

  return [...docItems, ...newsItems, ...practiceItems]
})

const filteredItems = computed(() => {
  const keyword = normalizedQuery.value
  const kind = selectedKind.value

  if (!keyword && kind === '全部') {
    return allItems.value
  }

  return allItems.value
    .map((item) => {
      const title = item.title.toLowerCase()
      const description = item.description.toLowerCase()
      const category = item.category.toLowerCase()
      const kindText = item.kind.toLowerCase()
      const tags = item.tags.join(' ').toLowerCase()
      const target = `${title} ${description} ${category} ${kindText} ${tags}`

      let score = 0

      if (!keyword) {
        score = 1
      } else if (title.includes(keyword)) {
        score += title.startsWith(keyword) ? 14 : 10
      }

      if (description.includes(keyword)) {
        score += 4
      }

      if (category.includes(keyword) || kindText.includes(keyword)) {
        score += 3
      }

      if (tags.includes(keyword)) {
        score += 5
      }

      if (!target.includes(keyword) && keyword) {
        score = 0
      }

      if (kind !== '全部' && item.kind !== kind) {
        score = 0
      }

      return {
        ...item,
        score,
      }
    })
    .filter(item => item.score > 0)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title, 'zh-CN'))
})

const hasQuery = computed(() => normalizedQuery.value.length > 0)

const groupedResults = computed(() => {
  const groups = ['文档', '最佳实践', '新闻'] as const

  return groups
    .map((kind) => ({
      kind,
      items: filteredItems.value.filter(item => item.kind === kind),
    }))
    .filter(group => group.items.length > 0)
})

const kindFilters = ['全部', '文档', '最佳实践', '新闻']

const searchTips = [
  '先搜产品定位和阅读路径，再搜具体功能名词',
  '排错时优先搜安装、gateway、control、channels 等关键词',
  '如果搜不到合适内容，直接去社区页或反馈页说明你想找什么',
]

watch(
  searchInput,
  (value) => {
    router.replace({
      query: {
        ...route.query,
        q: value || undefined,
      },
    })
  },
  { flush: 'post' },
)

function updateKindFilter(kind: string) {
  router.replace({
    query: {
      ...route.query,
      kind: kind === '全部' ? undefined : kind,
      q: searchInput.value || undefined,
    },
  })
}
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Search</p>
          <h1 class="section-title">站内搜索</h1>
          <p class="section-copy">
            你可以按标题、描述和分类搜索文档、新闻与最佳实践。搜索更适合“已经知道自己在找什么”，如果你还不确定问题属于哪一层，社区页和 FAQ 往往更快。
          </p>

          <div class="collection-utility">
            <article class="collection-utility-item">
              <span class="mini-label">适合搜索什么</span>
              <strong>概念、功能、安装、排错、更新</strong>
              <p>按关键词快速回到对应内容，而不是从列表页一张张翻。</p>
            </article>
            <article class="collection-utility-item">
              <span class="mini-label">找不到时</span>
              <strong>转到 FAQ / 社区 / 反馈</strong>
              <p>当需求还很模糊时，结构化入口比纯搜索更有效。</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">搜索建议</span>
            <strong>先搜主题词，再缩小到具体模块</strong>
            <p>例如先搜“安装”或“渠道”，再根据结果进入更细的专题；这比直接搜一句完整问题更稳定。</p>
          </div>

          <div class="collection-summary">
            <span class="mini-label">推荐关键词</span>
            <p v-for="tip in searchTips" :key="tip">{{ tip }}</p>
          </div>
        </aside>
      </section>

      <div class="card search-shell">
        <label class="search-field">
          <span>关键词</span>
          <input v-model="searchInput" type="text" placeholder="例如：安装、社区、OpenClaw" />
        </label>
        <div class="filter-group">
          <span class="filter-label">类型</span>
          <button
            v-for="kind in kindFilters"
            :key="kind"
            type="button"
            class="filter-chip"
            :class="{ active: selectedKind === kind }"
            @click="updateKindFilter(kind)"
          >
            {{ kind }}
          </button>
        </div>
        <p class="muted">共找到 {{ filteredItems.length }} 条结果</p>
      </div>

      <section v-if="filteredItems.length" class="results-groups">
        <div v-for="group in groupedResults" :key="group.kind" class="result-group">
          <div class="result-group-head">
            <p class="eyebrow">{{ group.kind }}</p>
            <p class="muted">{{ group.items.length }} 条结果</p>
          </div>

          <div class="grid results">
            <NuxtLink v-for="item in group.items" :key="item.path" :to="item.path" class="card result-card">
              <span class="tag">{{ item.kind }} / {{ item.category }}</span>
              <h2><HighlightedText :text="item.title" :query="searchInput" /></h2>
              <p><HighlightedText :text="item.description" :query="searchInput" /></p>
            </NuxtLink>
          </div>
        </div>
      </section>

      <div v-else-if="hasQuery" class="card empty-state">
        <h2>没有找到匹配结果</h2>
        <p class="muted">可以尝试更短的关键词，或者直接进入社区页和反馈页告诉我们你想找什么内容。</p>
        <div class="button-row">
          <NuxtLink class="button secondary" to="/community">查看社区支持</NuxtLink>
          <NuxtLink class="button ghost" to="/feedback">提交内容建议</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.search-shell {
  display: grid;
  gap: 12px;
  margin-top: 0;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.filter-label {
  color: var(--ink-soft);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.filter-chip {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.66);
  color: var(--ink);
  padding: 6px 12px;
  cursor: pointer;
  font: inherit;
  font-size: 0.82rem;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
}

.filter-chip:hover {
  transform: translateY(-1px);
  border-color: rgba(166, 111, 44, 0.22);
}

.filter-chip.active {
  color: #fff8ef;
  border-color: transparent;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
}

.search-field {
  display: grid;
  gap: 8px;
}

.search-field span {
  font-weight: 600;
}

.search-field input {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.72);
  color: var(--paper);
  padding: 14px 16px;
  font: inherit;
}

.results {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.results-groups {
  display: grid;
  gap: 18px;
}

.result-group {
  display: grid;
  gap: 10px;
}

.result-group-head {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.result-card {
  display: grid;
  gap: 12px;
}

.result-card h2 {
  margin: 0;
  font-size: 1.15rem;
}

.result-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
}

.empty-state {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

.empty-state h2 {
  margin: 0;
}

@media (max-width: 760px) {
  .results {
    grid-template-columns: 1fr;
  }
}
</style>
