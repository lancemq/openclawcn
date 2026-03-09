<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: items } = await useAsyncData('docs:index', () => queryCollection('docs').all())

// 分类筛选
const selectedCategory = computed(() =>
  typeof route.query.category === 'string' ? route.query.category : '全部',
)

// Tag 筛选
const selectedTag = computed(() =>
  typeof route.query.tag === 'string' ? route.query.tag : '全部',
)

// 子目录作为分类
const categories = computed(() => {
  const cats = ['全部']
  const paths = items.value?.map(item => item.path) || []
  paths.forEach(path => {
    const match = path.match(/^\/docs\/([^/]+)/)
    if (match && match[1]) {
      const catName = {
        'getting-started': '入门教程',
        'setup': '安装配置',
        'manual': '功能手册',
        'operations': '运维安全',
        'reference': '参考资料',
      }[match[1]] || match[1]
      if (catName && !cats.includes(catName)) {
        cats.push(catName)
      }
    }
  })
  return cats
})

// 从所有文档中提取 tag
const allTags = computed(() => {
  const tags = ['全部']
  items.value?.forEach(item => {
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach((tag: string) => {
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
      })
    }
  })
  return tags.sort()
})

// 过滤文档
const filteredItems = computed(() => {
  const pathCategoryMap: Record<string, string> = {}
  const itemsList = items.value || []
  
  itemsList.forEach(item => {
    const match = String(item.path).match(/^\/docs\/([^/]+)/)
    if (match && match[1]) {
      const catName = {
        'getting-started': '入门教程',
        'setup': '安装配置',
        'manual': '功能手册',
        'operations': '运维安全',
        'reference': '参考资料',
      }[match[1]] || match[1]
      pathCategoryMap[String(item.path)] = catName
    }
  })
  
  return itemsList.filter((item) => {
    const categoryMatch =
      selectedCategory.value === '全部' || pathCategoryMap[String(item.path)] === selectedCategory.value
    
    const itemTags = item.tags || []
    const tagMatch =
      selectedTag.value === '全部' || itemTags.includes(selectedTag.value)
    
    return categoryMatch && tagMatch
  })
})

function updateFilters(key: 'category' | 'tag', value: string) {
  const query = {
    ...route.query,
    [key]: value === '全部' ? undefined : value,
  }
  router.replace({ query })
}

function getCategoryFromPath(path: string): string {
  const match = String(path).match(/^\/docs\/([^/]+)/)
  if (!match) return '文档'
  
  const catMap: Record<string, string> = {
    'getting-started': '入门教程',
    'setup': '安装配置',
    'manual': '功能手册',
    'operations': '运维安全',
    'reference': '参考资料',
  }
  return catMap[match[1]] || match[1]
}

useSeo({
  title: '文档中心',
  description: 'OpenClaw 中文文档入口，包含产品介绍、快速开始、功能专题、运维与更新跟踪。',
  path: '/docs',
})
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Documentation</p>
      <h1 class="section-title">文档中心</h1>
      <p class="section-copy">
        这里提供 OpenClaw 的产品介绍、快速开始、功能专题、运维建议和更新跟踪说明。
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
          <span class="filter-label">标签</span>
          <button
            v-for="tag in allTags"
            :key="tag"
            type="button"
            class="filter-chip"
            :class="{ active: selectedTag === tag }"
            @click="updateFilters('tag', tag)"
          >
            {{ tag }}
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
              <span class="tag">{{ getCategoryFromPath(String(item.path)) }}</span>
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
        <p>没有找到匹配的文档，请尝试其他筛选条件。</p>
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
  grid-template-columns: repeat(4, 1fr);
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
  -webkit-line-clamp: 4;
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
  color: var(--ink-soft);
  background: var(--surface);
  padding: 3px 8px;
  border-radius: 4px;
}

.empty-state {
  text-align: center;
  padding: 48px 24px;
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
