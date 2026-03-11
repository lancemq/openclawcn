<script setup lang="ts">
import { pickTopicItems, topicDefinitions } from '~/data/taxonomy'
import { sortBestPractices, sortDocs, sortNews } from '~/data/content'
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

const { data: docs } = await useAsyncData('topics:docs', () => queryCollection('docs').all())
const { data: news } = await useAsyncData('topics:news', () => queryCollection('news').all())
const { data: practices } = await useAsyncData('topics:practices', () => queryCollection('bestPractices').all())
const sortedDocs = computed(() => sortDocs((docs.value || []) as any[]))
const sortedNews = computed(() => sortNews((news.value || []) as any[]))
const sortedPractices = computed(() => sortBestPractices((practices.value || []) as any[]))

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

const topicDocs = computed(() => pickTopicItems(sortedDocs.value as any[], activeTopic.value.slug, 6))
const topicNews = computed(() => pickTopicItems(sortedNews.value as any[], activeTopic.value.slug, 4))
const topicPractices = computed(() => pickTopicItems(sortedPractices.value as any[], activeTopic.value.slug, 4))
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
      </section>

      <section class="topic-block">
        <div class="home-head">
          <p class="eyebrow">文档</p>
          <p class="home-head-note">优先建立结构和操作顺序。</p>
        </div>
        <div class="topic-grid">
          <NuxtLink v-for="item in topicDocs" :key="item.path" :to="item.path" class="card topic-card">
            <span class="tag">{{ item.category }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
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
.topic-grid,
.topic-card,
.topic-dual-grid,
.filter-group {
  display: grid;
  gap: 12px;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
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
  font-size: 0.82rem;
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

.topic-card strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.35;
}

.topic-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.6;
}

.topic-dual-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
}

@media (max-width: 980px) {
  .topic-grid,
  .topic-grid.compact,
  .topic-dual-grid {
    grid-template-columns: 1fr;
  }
}
</style>
