<script setup lang="ts">
import { getDocCategoryLabel, sortDocs } from '~/data/content'

const route = useRoute()
const router = useRouter()

const { data: items } = await useAsyncData('docs:index', () => queryCollection('docs').all())

// 分类筛选
const selectedCategory = computed(() =>
  typeof route.query.category === 'string' ? route.query.category : '全部',
)

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

const tags = computed(() => {
  const tagCounts: Record<string, number> = {}

  ;(items.value || []).forEach((item: any) => {
    const itemTags = Array.isArray(item.tags) ? item.tags : []
    itemTags.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  // 只展示出现在至少3篇文章中的tag
  const MIN_TAG_COUNT = 3
  const filteredTags = Object.entries(tagCounts)
    .filter(([, count]) => count >= MIN_TAG_COUNT)
    .sort((a, b) => b[1] - a[1]) // 按文章数量降序排列
    .map(([tag]) => tag)

  return ['全部', ...filteredTags]
})

// 过滤文档
const filteredItems = computed(() => {
  const pathCategoryMap: Record<string, string> = {}
  const itemsList = sortDocs((items.value || []) as any[])
  
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
    const itemTags = Array.isArray(item.tags) ? (item.tags as string[]) : []
    const tagMatch = selectedTag.value === '全部' || itemTags.includes(selectedTag.value)

    return categoryMatch && tagMatch
  })
})

const orderedItems = computed(() => sortDocs((items.value || []) as any[]))

const featuredDocs = computed(() => orderedItems.value.slice(0, 3))

const learnEntries = [
  {
    title: '学习路径',
    description: '先按阶段选路线，避免第一次进入就自己拼学习顺序。',
    to: '/paths',
    meta: '主线',
  },
  {
    title: '主题中心',
    description: '如果你已经知道自己要看安装、渠道、模型或安全，优先从主题聚合页进入。',
    to: '/topics',
    meta: '按问题聚合',
  },
  {
    title: '视频教程',
    description: '适合先建立直觉，再回到文档确认命令和配置差异。',
    to: '/videos',
    meta: '演示',
  },
  {
    title: '最佳实践',
    description: '适合跑通基础链路后，再把方法沉淀成稳定做法。',
    to: '/best-practices',
    meta: '深化',
  },
]

const docStats = computed(() => [
  {
    label: '当前文档数',
    value: String(orderedItems.value.length),
    note: '覆盖入门、安装、能力、运维与参考',
  },
  {
    label: '推荐起点',
    value: '阅读路径',
    note: '先建立整体地图，再进入安装和运维细节',
  },
  {
    label: '更适合第一次访问',
    value: '入门教程',
    note: '先看定位、适用人群和最小验证链路',
  },
  {
    label: '后续重点',
    value: '排错与升级',
    note: '跑通基础链路后，再补长期维护能力',
  },
])

function updateFilters(key: 'category' | 'tag', value: string) {
  const query = {
    ...route.query,
    [key]: value === '全部' ? undefined : value,
  }
  router.replace({ query })
}

useSeo({
  title: '文档中心',
  description: 'OpenClaw 中文文档入口，包含产品介绍、快速开始、功能专题、运维与更新跟踪。',
  path: '/docs',
})
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Documentation</p>
          <h1 class="section-title">文档中心</h1>
          <p class="section-copy">
            这里提供 OpenClaw 的产品定位、安装路径、功能专题、运维建议和参考资料。第一次访问时，优先按阅读顺序理解整体结构，而不是一开始钻进零散配置。
          </p>

          <div class="collection-utility">
            <article v-for="stat in docStats.slice(0, 2)" :key="stat.label" class="collection-utility-item">
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">推荐阅读顺序</span>
            <strong>先定位，再安装，最后进入运维与参考</strong>
            <p>如果你是第一次接触 OpenClaw，优先看阅读路径、快速入门和安装文档，先建立完整地图再补专题。</p>
          </div>

          <NuxtLink
            v-for="item in featuredDocs"
            :key="item.path"
            :to="item.path"
            class="collection-utility-item utility-link"
          >
            <span class="mini-label">{{ getDocCategoryLabel(String(item.path)) }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </aside>
      </section>

      <section class="card entry-panel">
        <div class="section-head compact-head">
          <div>
            <p class="eyebrow">交叉访问</p>
            <p class="section-copy">文档中心负责完整结构，但你也可以随时切回路径、主题、视频和实践页，减少在站内来回找入口的成本。</p>
          </div>
        </div>

        <div class="entry-grid">
          <NuxtLink v-for="item in learnEntries" :key="item.to" :to="item.to" class="entry-card">
            <span class="tag">{{ item.meta }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
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
          <span class="filter-label">标签</span>
          <button
            v-for="tag in tags"
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

      <div class="masonry-grid collection-grid">
        <NuxtLink
          v-for="item in filteredItems"
          :key="item.path"
          :to="item.path"
          class="masonry-item card collection-card"
        >
          <div class="item-content collection-card-body">
            <div class="item-meta collection-meta">
              <span class="tag">{{ getDocCategoryLabel(String(item.path)) }}</span>
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

      <div v-if="filteredItems.length === 0" class="empty-state collection-empty">
        <p>没有找到匹配的文档，请尝试其他筛选条件。</p>
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

.entry-panel,
.entry-grid {
  display: grid;
  gap: 12px;
}

.entry-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.entry-card {
  display: grid;
  gap: 8px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  background: rgba(255, 255, 255, 0.5);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.entry-card:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
  box-shadow: 0 12px 26px rgba(74, 56, 28, 0.08);
}

.entry-card strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.98rem;
  line-height: 1.28;
}

.entry-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.84rem;
  line-height: 1.58;
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
  background: rgba(255, 255, 255, 0.62);
  padding: 2px 6px;
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .entry-grid,
  .masonry-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .entry-grid,
  .masonry-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .entry-grid,
  .masonry-grid {
    grid-template-columns: 1fr;
  }
}
</style>
