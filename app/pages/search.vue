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

const { allItems } = useSiteSearchIndex()

const normalizedQuery = computed(() => searchInput.value.trim().toLowerCase())
const selectedKind = computed(() =>
  typeof route.query.kind === 'string' ? route.query.kind : '全部',
)

const filteredItems = computed(() =>
  searchSiteItems(allItems.value, {
    query: normalizedQuery.value,
    kind: selectedKind.value,
  }),
)

const hasQuery = computed(() => normalizedQuery.value.length > 0)

const groupedResults = computed(() => groupSiteSearchResults(filteredItems.value))

const kindFilters = ['全部', '文档', '最佳实践', '新闻']

const searchTips = [
  '先搜产品定位和阅读路径，再搜具体功能名词',
  '排错时优先搜安装、gateway、control、channels 等关键词',
  '如果搜不到合适内容，直接去社区页或反馈页说明你想找什么',
]

const searchRoutes = [
  {
    title: '先走学习路径',
    description: '如果你还不确定问题属于哪一层，先从路径页判断阶段。',
    to: '/paths',
    meta: '路径',
  },
  {
    title: '按主题进入',
    description: '如果你只知道自己在找安装、渠道、模型或安全，主题中心更快。',
    to: '/topics',
    meta: '主题',
  },
  {
    title: '直接提问或反馈',
    description: '当搜索不到合适内容时，直接进入社区支持或提交反馈。',
    to: '/community',
    meta: '支持',
  },
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

      <section class="search-layout">
        <div class="card search-shell search-main-panel">
          <div class="search-shell-head">
            <div>
              <p class="eyebrow">Search Desk</p>
              <p class="section-copy">先输入主题词，再按类型收窄。当前搜索只覆盖文档、新闻和最佳实践。</p>
            </div>
            <div class="search-count-box">
              <span class="mini-label">当前结果</span>
              <strong>{{ filteredItems.length }}</strong>
            </div>
          </div>

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
        </div>

        <aside class="search-side-stack">
          <div class="card side-panel">
            <span class="mini-label">不会搜时</span>
            <strong>优先用短词，再根据结果跳转</strong>
            <p>先搜“安装、渠道、模型、安全”这类短词，再逐步缩小，不要一开始就输入完整自然语言问题。</p>
          </div>

          <div class="card route-panel">
            <span class="mini-label">辅助入口</span>
            <div class="route-panel-grid">
              <NuxtLink v-for="item in searchRoutes" :key="item.to" :to="item.to" class="route-panel-link">
                <span class="tag">{{ item.meta }}</span>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
              </NuxtLink>
            </div>
          </div>
        </aside>
      </section>

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

.search-layout,
.search-side-stack,
.route-panel-grid {
  display: grid;
  gap: 14px;
}

.search-layout {
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  align-items: start;
}

.search-main-panel {
  padding: 18px;
}

.search-shell-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: end;
}

.search-count-box {
  display: grid;
  gap: 2px;
  padding: 12px 14px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(234, 215, 182, 0.28));
  min-width: 110px;
}

.search-count-box strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.5rem;
  line-height: 1;
}

.side-panel,
.route-panel {
  display: grid;
  gap: 10px;
}

.side-panel strong,
.route-panel-link strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.28;
}

.side-panel p,
.route-panel-link p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.58;
  font-size: 0.84rem;
}

.route-panel-link {
  display: grid;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.48);
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
  .search-layout,
  .results {
    grid-template-columns: 1fr;
  }

  .search-shell-head {
    display: grid;
  }
}
</style>
