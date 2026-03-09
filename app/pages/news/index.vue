<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: items } = await useAsyncData('news:index', () => queryCollection('news').all())

const selectedCategory = computed(() =>
  typeof route.query.category === 'string' ? route.query.category : '全部',
)

const selectedArchive = computed(() =>
  typeof route.query.archive === 'string' ? route.query.archive : '全部',
)

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
    tag: undefined,
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

      <div class="masonry-grid">
        <NuxtLink
          v-for="item in filteredItems"
          :key="item.path"
          :to="item.path"
          class="masonry-item card"
        >
          <div class="item-content">
            <div class="item-meta">
              <span class="date">{{ item.date }}</span>
              <span class="tag">{{ item.category }}</span>
            </div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            
            <div v-if="item.tags && Array.isArray(item.tags)" class="item-tags">
              <span v-for="tag in (item.tags as string[]).slice(0, 4)" :key="tag" class="tag-item">
                #{{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-if="filteredItems.length === 0" class="empty-state">
        <p>没有找到匹配的新闻，请尝试其他筛选条件。</p>
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
  padding: 8px 14px;
  cursor: pointer;
  font: inherit;
  font-size: 0.85rem;
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

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 28px;
}

.masonry-item {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.masonry-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
}

.item-content {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  font-size: 0.8rem;
  color: var(--ink-soft);
}

.item-meta .tag {
  font-size: 0.75rem;
  padding: 4px 10px;
  background: rgba(166, 111, 44, 0.1);
  color: var(--brand);
  border-radius: 999px;
}

.masonry-item h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  line-height: 1.4;
}

.masonry-item p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.6;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.tag-item {
  font-size: 0.7rem;
  color: var(--brand);
  background: rgba(166, 111, 44, 0.1);
  padding: 3px 8px;
  border-radius: 4px;
}

.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: var(--ink-soft);
}

@media (max-width: 1000px) {
  .masonry-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .masonry-grid {
    grid-template-columns: 1fr;
  }
}
</style>
