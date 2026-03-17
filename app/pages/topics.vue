<script setup lang="ts">
import { informationLayers } from '~/data/information-architecture'
import { pickTopicItems, topicDefinitions } from '~/data/taxonomy'
import { getDocCategoryLabel, sortBestPractices, sortDocs, sortNews } from '~/data/content'
import { videoSections } from '~/data/videos'

useSeo({
  title: '主题中心',
  description: '按安装、Gateway 运维、渠道、Skills、模型和安全等主题跨文档、视频、新闻与实践聚合 OpenClaw 内容。',
  path: '/topics',
})

const route = useRoute()
const selectedTopic = computed(() =>
  typeof route.query.topic === 'string' ? route.query.topic : topicDefinitions[0]?.slug || '',
)

const { data: manifest } = await useContentManifest()
const sortedDocs = computed(() => sortDocs((manifest.value?.collections.docs.items || []) as any[]))
const sortedNews = computed(() => sortNews((manifest.value?.collections.news.items || []) as any[]))
const sortedPractices = computed(() => sortBestPractices((manifest.value?.collections.bestPractices.items || []) as any[]))

const activeTopic = computed(() =>
  topicDefinitions.find(item => item.slug === selectedTopic.value) || topicDefinitions[0],
)

const filteredVideos = computed(() => {
  const topic = activeTopic.value
  const keywords = topic.keywords.map(item => item.toLowerCase())
  const tagSet = new Set(topic.tags)

  return videoSections
    .flatMap(section => section.items)
    .filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase()
      return item.tags.some(tag => tagSet.has(tag)) || keywords.some(keyword => haystack.includes(keyword))
    })
    .slice(0, 6)
})

const topicNews = computed(() => pickTopicItems(sortedNews.value as any[], activeTopic.value.slug, 4))
const topicPractices = computed(() => pickTopicItems(sortedPractices.value as any[], activeTopic.value.slug, 4))

const topicPathMap: Record<string, { title: string; to: string; description: string }> = {
  installation: {
    title: '新手首次部署路径',
    to: '/paths#new-user',
    description: '先从定位、安装、Onboarding 和 Control UI 跑通一条最小链路。',
  },
  'gateway-ops': {
    title: '团队运维路径',
    to: '/paths#team-ops',
    description: '把 Gateway、升级、安全和监控放进长期运行视角里理解。',
  },
  channels: {
    title: '渠道接入路径',
    to: '/paths#channels-integration',
    description: '先理解入口边界，再接入 Telegram、WhatsApp、团队频道等真实渠道。',
  },
  'skills-tools': {
    title: 'Skills 与扩展路径',
    to: '/paths#expansion',
    description: '先看边界和扩展层，再决定安装技能、插件还是自动化触发。',
  },
  'context-sessions': {
    title: '团队运维路径',
    to: '/paths#team-ops',
    description: '优先建立上下文、会话隔离和长期协作的稳态方法。',
  },
  plugins: {
    title: 'Skills 与扩展路径',
    to: '/paths#expansion',
    description: '插件属于能力层扩展，适合在基础链路稳定后继续阅读。',
  },
  'memory-search': {
    title: 'Skills 与扩展路径',
    to: '/paths#expansion',
    description: '先理解记忆、索引和长期上下文边界，再做更深入的工作流设计。',
  },
  providers: {
    title: '新手首次部署路径',
    to: '/paths#new-user',
    description: '先把默认模型和 provider 路径理顺，再进入更复杂的回退和路由配置。',
  },
  models: {
    title: 'Skills 与扩展路径',
    to: '/paths#expansion',
    description: '适合在基础部署后，继续进入本地模型、Ollama 和成本优化。',
  },
  security: {
    title: '团队运维路径',
    to: '/paths#team-ops',
    description: '安全主题更适合放进长期运行和权限边界里一起理解。',
  },
  debugging: {
    title: '团队运维路径',
    to: '/paths#team-ops',
    description: '排障要和版本、状态检查、日志和长期维护方法放在一起看。',
  },
  network: {
    title: '远程网络与节点路径',
    to: '/paths#remote-network',
    description: '先理清配对、远程访问和 Tailnet 方案，再考虑多设备协同。',
  },
}

const topicVideoAnchorMap: Record<string, string> = {
  installation: '/videos#setup',
  'gateway-ops': '/videos#practice',
  channels: '/videos#integration',
  'skills-tools': '/videos#skills',
  'context-sessions': '/videos#practice',
  plugins: '/videos#skills',
  'memory-search': '/videos#skills',
  providers: '/videos#models',
  models: '/videos#models',
  security: '/videos#practice',
  debugging: '/videos#practice',
  network: '/videos#integration',
}

const topicDocBuckets = computed(() => {
  const matched = pickTopicItems(sortedDocs.value as any[], activeTopic.value.slug, 12)
  const bucketRules = [
    {
      id: 'start',
      title: '先看这些文档',
      description: '先建立结构和最小操作顺序，再进入更细节的专题。',
      matcher: (item: any) => String(item.path).startsWith('/docs/getting-started/') || String(item.path).startsWith('/docs/setup/'),
    },
    {
      id: 'build',
      title: '再看专题与机制',
      description: '把这个主题放回系统结构里理解，知道真正涉及哪些模块和边界。',
      matcher: (item: any) => String(item.path).startsWith('/docs/manual/'),
    },
    {
      id: 'run',
      title: '最后补运维与参考',
      description: '适合在开始使用后查看长期运行、风险控制和排障细节。',
      matcher: (item: any) => String(item.path).startsWith('/docs/operations/') || String(item.path).startsWith('/docs/reference/'),
    },
  ]

  const used = new Set<string>()

  const buckets = bucketRules.map((bucket) => {
    const items = matched.filter(item => !used.has(String(item.path)) && bucket.matcher(item)).slice(0, 4)
    items.forEach(item => used.add(String(item.path)))

    return {
      ...bucket,
      items,
    }
  })

  const remaining = matched.filter(item => !used.has(String(item.path))).slice(0, 4)
  if (remaining.length) {
    buckets.push({
      id: 'more',
      title: '同主题补充阅读',
      description: '如果上面几组已经看完，再继续从这些补充页延伸。',
      items: remaining,
    })
  }

  return buckets.filter(bucket => bucket.items.length)
})

</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Topics</p>
          <h1 class="section-title">主题中心</h1>
          <p class="section-copy">
            把文档、视频、新闻和最佳实践按同一主题聚合，适合已经知道自己要解决什么问题，但不想在多个模块里来回切换的用户。
          </p>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">适合什么时候用</span>
            <strong>知道自己要看“安装、渠道、Skills、安全”这类主题时</strong>
            <p>如果你还不知道从哪开始，先看学习路径；如果你已经知道主题，但不知道该先看文档、视频还是实践，再来这里。</p>
          </div>
        </aside>
      </section>

      <div class="filters card">
        <div class="filter-group">
          <span class="filter-label">主题</span>
          <NuxtLink
            v-for="topic in topicDefinitions"
            :key="topic.slug"
            class="filter-chip"
            :class="{ active: selectedTopic === topic.slug }"
            :to="{ path: '/topics', query: { topic: topic.slug } }"
          >
            {{ topic.title }}
          </NuxtLink>
        </div>
      </div>

      <section class="card topic-summary">
        <p class="eyebrow">{{ activeTopic.title }}</p>
        <p class="section-copy">{{ activeTopic.description }}</p>
        <div class="layer-summary-grid">
          <article v-for="layer in informationLayers" :key="layer.id" class="layer-summary-card">
            <strong>{{ layer.title }}</strong>
            <p>{{ layer.summary }}</p>
          </article>
        </div>
      </section>

      <section class="topic-block">
        <div class="home-head">
          <p class="eyebrow">文档安排</p>
          <p class="home-head-note">不再平铺一组文档，而是按“先看什么、再深化什么、最后补什么”来读。</p>
        </div>
        <div class="topic-doc-stack">
          <article v-for="bucket in topicDocBuckets" :key="bucket.id" class="card topic-doc-bucket">
            <div class="topic-doc-head">
              <strong>{{ bucket.title }}</strong>
              <p>{{ bucket.description }}</p>
            </div>
            <div class="topic-grid compact">
              <NuxtLink v-for="item in bucket.items" :key="item.path" :to="item.path" class="card topic-card inner-card">
                <span class="tag">{{ getDocCategoryLabel(String(item.path)) }}</span>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <section class="topic-block">
        <div class="home-head">
          <p class="eyebrow">视频</p>
          <p class="home-head-note">适合先建立直觉再回到文档确认。</p>
        </div>
        <div class="topic-grid">
          <a v-for="item in filteredVideos" :key="item.href" :href="item.href" target="_blank" rel="noreferrer" class="card topic-card">
            <span class="tag">{{ item.platform }} / {{ item.level }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </a>
        </div>
      </section>

      <section class="topic-dual-grid">
        <div class="topic-block">
          <div class="home-head">
            <p class="eyebrow">最佳实践</p>
            <p class="home-head-note">适合跑通基础链路后继续深化。</p>
          </div>
          <div class="topic-grid compact">
            <NuxtLink v-for="item in topicPractices" :key="item.path" :to="item.path" class="card topic-card">
              <span class="tag">{{ item.category }} / {{ item.difficulty }}</span>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </NuxtLink>
          </div>
        </div>

        <div class="topic-block">
          <div class="home-head">
            <p class="eyebrow">新闻与更新</p>
            <p class="home-head-note">适合快速判断最近有什么变化。</p>
          </div>
          <div class="topic-grid compact">
            <NuxtLink v-for="item in topicNews" :key="item.path" :to="item.path" class="card topic-card">
              <span class="tag">{{ item.category }} / {{ item.date }}</span>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.filters,
.topic-summary,
.topic-block,
.topic-doc-stack,
.topic-doc-bucket,
.topic-doc-head,
.cross-grid,
.topic-grid,
.topic-card,
.topic-dual-grid,
.filter-group {
  display: grid;
  gap: 12px;
}

.layer-summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.layer-summary-card {
  display: grid;
  gap: 8px;
  padding: 16px 18px;
  border-radius: 20px;
  border: 1px solid rgba(64, 73, 85, 0.1);
  background: rgba(255, 255, 255, 0.5);
}

.layer-summary-card strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 0.98rem;
  line-height: 1.34;
}

.layer-summary-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.64;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
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
  padding: 7px 13px;
  font-size: 0.84rem;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.filter-chip:hover {
  transform: translateY(-1px);
  border-color: rgba(138, 90, 36, 0.22);
}

.filter-chip.active {
  color: #fff8ef;
  border-color: transparent;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
}

.topic-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.topic-grid.compact {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.topic-doc-bucket {
  padding: 20px;
  border-radius: 28px;
}

.topic-doc-head p {
  margin: 6px 0 0;
  color: var(--ink-soft);
  font-size: 0.92rem;
  line-height: 1.68;
}

.cross-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.topic-card {
  align-content: start;
  gap: 10px;
  min-height: 100%;
}

.inner-card {
  border-radius: 20px;
  border: 1px solid rgba(64, 73, 85, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 254, 250, 0.98), rgba(247, 242, 234, 0.92)),
    rgba(255, 255, 255, 0.42);
}

.topic-card strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.04rem;
  line-height: 1.42;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.topic-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.92rem;
  line-height: 1.68;
}

.topic-summary {
  gap: 18px;
}

.topic-block {
  gap: 14px;
}

.topic-dual-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
}

@media (max-width: 980px) {
  .cross-grid,
  .topic-grid,
  .topic-grid.compact,
  .layer-summary-grid,
  .topic-dual-grid {
    grid-template-columns: 1fr;
  }
}
</style>
