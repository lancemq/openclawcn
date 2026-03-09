<script setup lang="ts">
useSeo({
  title: '站内搜索',
  description: '搜索 OpenClawCN 的文档、新闻和社区资料。',
  path: '/search',
})

const route = useRoute()
const router = useRouter()

const searchInput = ref(typeof route.query.q === 'string' ? route.query.q : '')

const { data: docs } = await useAsyncData('search:docs', () => queryCollection('docs').all())
const { data: news } = await useAsyncData('search:news', () => queryCollection('news').all())

const normalizedQuery = computed(() => searchInput.value.trim().toLowerCase())

const allItems = computed(() => {
  const docItems = (docs.value || []).map((item) => ({
    title: String(item.title || ''),
    description: String(item.description || ''),
    category: String(item.category || '文档'),
    path: String(item.path || ''),
    kind: '文档',
  }))

  const newsItems = (news.value || []).map((item) => ({
    title: String(item.title || ''),
    description: String(item.description || ''),
    category: String(item.category || '新闻'),
    path: String(item.path || ''),
    kind: '新闻',
  }))

  return [...docItems, ...newsItems]
})

const filteredItems = computed(() => {
  const keyword = normalizedQuery.value

  if (!keyword) {
    return allItems.value
  }

  return allItems.value.filter((item) => {
    const target = `${item.title} ${item.description} ${item.category} ${item.kind}`.toLowerCase()
    return target.includes(keyword)
  })
})

const hasQuery = computed(() => normalizedQuery.value.length > 0)

watch(
  searchInput,
  (value) => {
    router.replace({
      query: value ? { q: value } : {},
    })
  },
  { flush: 'post' },
)
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Search</p>
      <h1 class="section-title">站内搜索</h1>
      <p class="section-copy">
        目前先按标题、描述和分类进行搜索，足够覆盖第 2 步的文档与新闻查找需求。
      </p>

      <div class="card search-shell">
        <label class="search-field">
          <span>关键词</span>
          <input v-model="searchInput" type="text" placeholder="例如：安装、社区、OpenClaw" />
        </label>
        <p class="muted">共找到 {{ filteredItems.length }} 条结果</p>
      </div>

      <div v-if="filteredItems.length" class="grid results">
        <NuxtLink v-for="item in filteredItems" :key="item.path" :to="item.path" class="card result-card">
          <span class="tag">{{ item.kind }} / {{ item.category }}</span>
          <h2><HighlightedText :text="item.title" :query="searchInput" /></h2>
          <p><HighlightedText :text="item.description" :query="searchInput" /></p>
        </NuxtLink>
      </div>

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
.search-shell {
  display: grid;
  gap: 12px;
  margin-top: 24px;
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
  color: var(--text);
  padding: 14px 16px;
  font: inherit;
}

.results {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 24px;
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
  color: var(--muted);
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
