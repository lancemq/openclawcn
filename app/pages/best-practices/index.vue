<script setup lang="ts">
import { sortBestPractices } from '~/data/content'

const route = useRoute()
const router = useRouter()

const { data: manifest, status } = await useContentManifest()
const items = computed(() => manifest.value?.collections.bestPractices.items || [])
const isManifestReady = computed(() => status.value === 'success')

const selectedCategory = computed(() =>
  typeof route.query.category === 'string' ? route.query.category : '全部',
)

const selectedDifficulty = computed(() =>
  typeof route.query.difficulty === 'string' ? route.query.difficulty : '全部',
)

const categories = computed(() => [
  '全部',
  ...new Set((items.value || []).map((item) => String(item.category || '未分类'))),
])

const difficulties = computed(() => [
  '全部',
  ...new Set((items.value || []).map((item) => String(item.difficulty || '未分级'))),
])

const orderedItems = computed(() => sortBestPractices((items.value || []) as any[]))

const filteredItems = computed(() =>
  orderedItems.value.filter((item) => {
    const categoryMatch =
      selectedCategory.value === '全部' || String(item.category || '') === selectedCategory.value
    const difficultyMatch =
      selectedDifficulty.value === '全部' || String(item.difficulty || '') === selectedDifficulty.value

    return categoryMatch && difficultyMatch
  }),
)

const featuredPractices = computed(() => orderedItems.value.slice(0, 3))

const practiceStats = computed(() => [
  {
    label: '更适合谁',
    value: '已跑通基础链路的人',
    note: '实践内容更偏长期使用、协作和升级策略',
  },
  {
    label: '推荐读法',
    value: '先基础，再进阶',
    note: '优先按难度看入门与基础，再决定是否深入高级专题',
  },
])

function updateFilters(key: 'category' | 'difficulty', value: string) {
  const query = {
    ...route.query,
    tag: undefined,
    [key]: value === '全部' ? undefined : value,
  }
  router.replace({ query })
}

useSeo({
  title: '最佳实践',
  description: '查看 OpenClawCN 当前整理的 OpenClaw 接入、更新跟踪、安全与协作最佳实践。',
  path: '/best-practices',
  type: 'website',
})
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Best Practices</p>
          <h1 class="section-title">最佳实践</h1>
          <p class="section-copy">
            这里整理的是更偏长期使用和维护的经验，包括接入节奏、更新跟踪、安全基础和社区协作方式。它更适合已经理解 OpenClaw 基本结构，准备进入稳定使用阶段的读者。
          </p>

          <div class="collection-utility">
            <article v-for="stat in practiceStats" :key="stat.label" class="collection-utility-item">
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">阅读建议</span>
            <strong>先按难度过滤，再看和自己场景最接近的专题</strong>
            <p>如果你还处在第一次安装和初次验证阶段，建议先回到文档；实践页更适合跑通基础链路后再来补方法。</p>
          </div>

          <NuxtLink
            v-for="item in featuredPractices"
            :key="item.path"
            :to="item.path"
            class="collection-utility-item utility-link"
          >
            <span class="mini-label">{{ item.difficulty || '未分级' }}</span>
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
          <span class="filter-label">难度</span>
          <button
            v-for="difficulty in difficulties"
            :key="difficulty"
            type="button"
            class="filter-chip"
            :class="{ active: selectedDifficulty === difficulty }"
            @click="updateFilters('difficulty', difficulty)"
          >
            {{ difficulty }}
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
              <span class="tag">{{ item.category }}</span>
              <span class="difficulty">{{ item.difficulty }}</span>
            </div>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            
            <div v-if="item.tags && Array.isArray(item.tags)" class="item-tags">
              <span v-for="tag in (item.tags as string[]).slice(0, 4)" :key="tag" class="tag-item">
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="empty-state collection-empty">
        <p>正在加载实践索引...</p>
      </div>

      <div v-if="isManifestReady && filteredItems.length === 0" class="empty-state collection-empty">
        <p>没有找到匹配的实践内容，请尝试其他筛选条件。</p>
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
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.item-meta .tag {
  font-size: 0.72rem;
  padding: 3px 8px;
  background: rgba(166, 111, 44, 0.1);
  color: var(--brand);
  border-radius: 999px;
}

.difficulty {
  font-size: 0.72rem;
  color: var(--ink-soft);
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
  color: var(--ink-soft);
  background: var(--surface);
  padding: 2px 6px;
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .masonry-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .masonry-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .masonry-grid {
    grid-template-columns: 1fr;
  }
}
</style>
