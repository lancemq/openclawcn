<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: items } = await useAsyncData('news:index', () => queryCollection('news').all())

const selectedCategory = computed(() => (typeof route.query.category === 'string' ? route.query.category : '全部'))
const selectedArchive = computed(() => (typeof route.query.archive === 'string' ? route.query.archive : '全部'))

const categories = computed(() => [
  '全部',
  ...new Set((items.value || []).map((item) => String(item.category || '未分类'))),
])

const archives = computed(() => [
  '全部',
  ...new Set((items.value || []).map((item) => String(item.date || '').slice(0, 7))),
])

const filteredItems = computed(() =>
  (items.value || []).filter((item) => {
    const categoryMatch =
      selectedCategory.value === '全部' || String(item.category || '') === selectedCategory.value
    const archiveMatch =
      selectedArchive.value === '全部' || String(item.date || '').startsWith(selectedArchive.value)

    return categoryMatch && archiveMatch
  }),
)

function updateFilters(key: 'category' | 'archive', value: string) {
  const query = {
    ...route.query,
    [key]: value === '全部' ? undefined : value,
  }

  router.replace({ query })
}

useSeo({
  title: '新闻动态',
  description: 'OpenClawCN 持续跟踪 OpenClaw 的版本更新、使用提醒和中文解读。',
  path: '/news',
  type: 'website',
})
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">News</p>
      <h1 class="section-title">新闻动态</h1>
      <p class="section-copy">
        这里主要发布 OpenClaw 的版本更新、功能变化、使用提醒和中文解读，帮助你持续跟踪产品演进。
      </p>

      <div class="filters card">
        <div class="filter-group">
          <span class="filter-label">分类</span>
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="filter-chip"
            :class="{ active: selectedCategory === category }"
            @click="updateFilters('category', category)"
          >
            {{ category }}
          </button>
        </div>

        <div class="filter-group">
          <span class="filter-label">归档</span>
          <button
            v-for="archive in archives"
            :key="archive"
            type="button"
            class="filter-chip"
            :class="{ active: selectedArchive === archive }"
            @click="updateFilters('archive', archive)"
          >
            {{ archive }}
          </button>
        </div>
      </div>

      <div class="grid news-grid">
        <ContentCard
          v-for="item in filteredItems"
          :key="item.to"
          :title="String(item.title || '')"
          :description="String(item.description || '')"
          :to="String(item.path || '')"
          :meta="`${item.date} / ${item.category}`"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters {
  display: grid;
  gap: 16px;
  margin-top: 24px;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.filter-label {
  color: var(--ink-soft);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.filter-chip {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.66);
  color: var(--ink);
  padding: 10px 14px;
  cursor: pointer;
  font: inherit;
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

.news-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 28px;
}

@media (max-width: 980px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
