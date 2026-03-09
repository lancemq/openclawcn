<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: items } = await useAsyncData('best-practices:index', () =>
  queryCollection('bestPractices').all(),
)

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

const filteredItems = computed(() =>
  (items.value || []).filter((item) => {
    const categoryMatch =
      selectedCategory.value === '全部' || String(item.category || '') === selectedCategory.value
    const difficultyMatch =
      selectedDifficulty.value === '全部' || String(item.difficulty || '') === selectedDifficulty.value

    return categoryMatch && difficultyMatch
  }),
)

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
    <div class="container">
      <p class="eyebrow">Best Practices</p>
      <h1 class="section-title">最佳实践</h1>
      <p class="section-copy">
        这里整理的是更偏长期使用和维护的经验，包括接入节奏、更新跟踪、安全基础和社区协作方式。
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

      <!-- 瀑布流布局 -->
      <div class="masonry-grid">
        <NuxtLink
          v-for="item in filteredItems"
          :key="item.path"
          :to="item.path"
          class="masonry-item card"
        >
          <div class="item-content">
            <div class="item-meta">
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

      <div v-if="filteredItems.length === 0" class="empty-state">
        <p>没有找到匹配的实践内容，请尝试其他筛选条件。</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters {
  display: grid;
  gap: 12px;
  margin-top: 18px;
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

/* 瀑布流布局 */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 20px;
}

.masonry-item {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.masonry-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
}

.item-content {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.masonry-item h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.04rem;
  letter-spacing: -0.02em;
  line-height: 1.35;
}

.masonry-item p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.55;
  font-size: 0.88rem;
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

.empty-state {
  text-align: center;
  padding: 36px 18px;
  color: var(--ink-soft);
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
