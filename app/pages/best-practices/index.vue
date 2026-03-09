<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: items } = await useAsyncData('best-practices:index', () =>
  queryCollection('bestPractices').all(),
)

const selectedCategory = computed(() => (typeof route.query.category === 'string' ? route.query.category : '全部'))
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
    [key]: value === '全部' ? undefined : value,
  }

  router.replace({ query })
}

useSeo({
  title: '最佳实践',
  description: '查看 OpenClawCN 当前整理的中文内容运营、反馈闭环和站点协作最佳实践。',
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
        这是第 3 步先落下来的第一块内容：把中文站点运营、反馈闭环和社区协作中比较稳定的方法先整理成专题。
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

      <div class="grid practice-grid">
        <NuxtLink v-for="item in filteredItems" :key="item.path" :to="item.path" class="card practice-card">
          <span class="tag">{{ item.category }} / {{ item.difficulty }}</span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </NuxtLink>
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

.practice-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 24px;
}

.practice-card {
  display: grid;
  gap: 12px;
}

.practice-card h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.74rem;
  letter-spacing: -0.03em;
}

.practice-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .practice-grid {
    grid-template-columns: 1fr;
  }
}
</style>
