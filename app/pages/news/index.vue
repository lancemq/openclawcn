<script setup lang="ts">
import { sortNews } from '~/data/content'

const route = useRoute()
const router = useRouter()

const { data: manifest, status } = await useContentManifest()
const items = computed(() => manifest.value?.collections.news.items || [])
const isManifestReady = computed(() => status.value === 'success')

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

const orderedItems = computed(() => sortNews((items.value || []) as any[]))

const filteredItems = computed(() =>
  orderedItems.value.filter((item) => {
    const categoryMatch =
      selectedCategory.value === '全部' || String(item.category || '') === selectedCategory.value

    const archiveMatch =
      selectedArchive.value === '全部' || String(item.date || '').startsWith(selectedArchive.value)

    return categoryMatch && archiveMatch
  }),
)

const featuredNews = computed(() => orderedItems.value.slice(0, 3))

const newsStats = computed(() => [
  {
    label: '最新视角',
    value: '版本变化',
    note: '优先承接版本更新、能力变化与使用提醒',
  },
  {
    label: '浏览方式',
    value: '按月份归档',
    note: '适合回看某一段时间内的连续变化',
  },
])

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
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">News</p>
          <h1 class="section-title">新闻动态</h1>
          <p class="section-copy">
            这里主要发布 OpenClaw 的版本更新、功能变化、使用提醒和中文解读。更适合已经开始关注产品变化、希望持续跟踪版本节奏的读者。
          </p>

          <div class="collection-utility">
            <article v-for="stat in newsStats" :key="stat.label" class="collection-utility-item">
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">重点更新</span>
            <strong>先看最近发布，再决定是否深入专题</strong>
            <p>如果你只想快速判断哪些变化和自己有关，优先看最近几条动态，再通过最佳实践和文档补长期方案。</p>
          </div>

          <NuxtLink
            v-for="item in featuredNews"
            :key="item.path"
            :to="item.path"
            class="collection-utility-item utility-link"
          >
            <span class="mini-label">{{ item.date }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </aside>
      </section>

      <div class="filters card collection-filters">
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

      <div v-if="isManifestReady" class="masonry-grid collection-grid">
        <NuxtLink
          v-for="item in filteredItems"
          :key="item.path"
          :to="item.path"
          class="masonry-item card collection-card"
        >
          <div class="item-content collection-card-body">
            <div class="item-meta collection-meta">
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

      <div v-else class="empty-state collection-empty">
        <p>正在加载新闻索引...</p>
      </div>

      <div v-if="isManifestReady && filteredItems.length === 0" class="empty-state collection-empty">
        <p>没有找到匹配的新闻，请尝试其他筛选条件。</p>
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

.utility-link {
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.utility-link:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
  box-shadow: 0 12px 26px rgba(74, 56, 28, 0.08);
}

.filters {
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
  font-size: 0.88rem;
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

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.date {
  font-size: 0.78rem;
  color: var(--ink-soft);
}

.item-meta .tag {
  font-size: 0.72rem;
  padding: 3px 8px;
  background: rgba(166, 111, 44, 0.1);
  color: var(--brand);
  border-radius: 999px;
}

.masonry-item p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 2px;
}

.tag-item {
  font-size: 0.68rem;
  color: var(--brand);
  background: rgba(166, 111, 44, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
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
