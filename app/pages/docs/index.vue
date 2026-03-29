<script setup lang="ts">
import { getDocCategoryLabel, sortDocs } from '~/data/content'

const route = useRoute()
const router = useRouter()

const { data: manifest, status } = await useContentManifest()
const items = computed(() => manifest.value?.collections.docs.items || [])
const isManifestReady = computed(() => status.value === 'success')

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
  const paths = items.value.map(item => item.path) || []
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

const decisionDocs = [
  {
    title: '我应该先从哪个页面开始',
    description: '如果你还不确定该先看文档、路径、主题、视频还是案例，先用这页完成入口判断。',
    to: '/docs/getting-started/which-page-should-i-start-with',
    meta: '入口判断',
  },
  {
    title: '我什么时候该开始接入渠道',
    description: '判断自己是否已经适合进入 Telegram、飞书、WhatsApp 等渠道接入。',
    to: '/docs/getting-started/when-to-connect-channels',
    meta: '接入时机',
  },
  {
    title: '我什么时候再上 Skills、Plugins 和多 Agent',
    description: '帮助区分该先补能力还是先稳住系统，避免基础链路未稳就堆复杂度。',
    to: '/docs/getting-started/when-to-add-skills-plugins-and-multi-agent',
    meta: '扩展时机',
  },
  {
    title: '模型、配置和安全这三页分别什么时候看',
    description: '最短区分模型页、配置页和安全页各自解决什么问题，减少走错入口。',
    to: '/docs/getting-started/when-to-read-models-config-security',
    meta: '专题分流',
  },
  {
    title: 'Dashboard、WebChat 和聊天渠道分别什么时候用',
    description: '先分清是在查状态、测试聊天，还是准备进入真实沟通软件。',
    to: '/docs/getting-started/when-to-use-dashboard-webchat-or-channels',
    meta: '入口选择',
  },
]

const longformDocs = [
  {
    title: '从第一次跑通到长期运行：完整系统地图',
    description: '把安装、Gateway、控制面、渠道、模型、记忆、自动化和维护放到同一条主线上，适合做总览和补结构。',
    to: '/docs/manual/from-first-run-to-long-running-system',
    meta: '系统长文',
  },
  {
    title: '从 Skills 到 Workflows：扩展栈完整地图',
    description: '把 Skills、Tools、插件、Hooks、ClawHub、OpenProse、Lobster 和 approvals 收成一张扩展地图。',
    to: '/docs/manual/extension-stack-full-map',
    meta: '扩展长文',
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
      <CollectionHero
        eyebrow="Documentation"
        title="文档中心"
        description="这里提供 OpenClaw 的产品定位、安装路径、功能专题、运维建议和参考资料。第一次访问时，优先按阅读顺序理解整体结构，而不是一开始钻进零散配置。"
        :stats="docStats.slice(0, 2)"
        summary-label="推荐阅读顺序"
        summary-title="先定位，再安装，最后进入运维与参考"
        summary-text="如果你是第一次接触 OpenClaw，优先看阅读路径、快速入门和安装文档，先建立完整地图再补专题。"
        :featured="featuredDocs.map(item => ({
          label: getDocCategoryLabel(String(item.path)),
          title: item.title,
          description: item.description,
          to: item.path,
        }))"
      />

      <CollectionFilters
        :groups="[
          { key: 'category', label: '分类', options: categories, selected: selectedCategory },
          { key: 'tag', label: '标签', options: tags, selected: selectedTag },
        ]"
        @update="(key, value) => updateFilters(key as 'category' | 'tag', value)"
      />

      <section class="entry-panel">
        <div class="result-group-head">
          <p class="eyebrow">先判断再进入</p>
          <p class="muted">第一次访问更适合先看这组决策文档</p>
        </div>
        <div class="entry-grid">
          <NuxtLink
            v-for="item in decisionDocs"
            :key="item.to"
            :to="item.to"
            class="entry-card"
          >
            <span class="tag">{{ item.meta }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <section class="entry-panel">
        <div class="result-group-head">
          <p class="eyebrow">深度长文</p>
          <p class="muted">适合已经有一些基础，想把分散页面重新连成完整结构时阅读</p>
        </div>
        <div class="entry-grid entry-grid-wide">
          <NuxtLink
            v-for="item in longformDocs"
            :key="item.to"
            :to="item.to"
            class="entry-card"
          >
            <span class="tag">{{ item.meta }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <div v-if="isManifestReady" class="masonry-grid collection-grid">
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

      <CollectionEmptyState v-else message="正在加载文档索引..." />

      <CollectionEmptyState
        v-if="isManifestReady && filteredItems.length === 0"
        message="没有找到匹配的文档，请尝试其他筛选条件。"
      />
    </div>
  </section>
</template>

<style scoped>
.entry-panel,
.entry-grid {
  display: grid;
  gap: 12px;
}

.entry-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.entry-grid-wide {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.entry-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(64, 73, 85, 0.12);
  background: rgba(255, 255, 255, 0.58);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.entry-card:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
  box-shadow: 0 12px 26px rgba(74, 56, 28, 0.08);
}

.entry-card strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.04rem;
  line-height: 1.38;
  text-wrap: balance;
}

.entry-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.66;
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

  .entry-grid-wide {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .entry-grid,
  .masonry-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .entry-grid-wide {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .entry-grid,
  .masonry-grid {
    grid-template-columns: 1fr;
  }

  .entry-grid-wide {
    grid-template-columns: 1fr;
  }
}
</style>
