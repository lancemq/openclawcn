<script setup lang="ts">
import { videoSections } from '~/data/videos'
import { topicDefinitions } from '~/data/taxonomy'

useSeo({
  title: '视频教程',
  description: '整理 OpenClaw 官网 Showcase、官方引用 YouTube 视频和中文高质量教程，覆盖总览、安装部署、Ollama 本地模型、Skills 扩展、渠道接入和进阶实战案例。',
  path: '/videos',
  type: 'website',
})

const quickFacts = [
  { label: '优先来源', value: '官网 + YouTube + Bilibili', note: '先官网与官方引用视频，再补中文部署教程' },
  { label: '覆盖方向', value: '总览 / 安装 / 模型 / Skills / 渠道', note: '从总览判断到部署、扩展和接入全链路覆盖' },
  { label: '更适合谁', value: '先看视频再上手的用户', note: '尤其适合第一次接触 OpenClaw 的中文用户' },
]

const config = useRuntimeConfig()

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'OpenClaw 视频教程',
        description: '整理 OpenClaw 官方 Showcase、YouTube 演示和 Bilibili 中文教程。',
        url: `${config.public.siteUrl}/videos`,
      }),
    },
  ],
})

const route = useRoute()
const router = useRouter()
const selectedPlatform = computed(() => typeof route.query.platform === 'string' ? route.query.platform : '全部')
const selectedLevel = computed(() => typeof route.query.level === 'string' ? route.query.level : '全部')
const selectedTopic = computed(() => typeof route.query.topic === 'string' ? route.query.topic : '全部')

const platforms = ['全部', 'Official', 'Bilibili', 'YouTube']
const levels = ['全部', '入门', '基础', '进阶']

const allVideos = computed(() =>
  videoSections.flatMap(section =>
    section.items.map(item => ({
      ...item,
      sectionTitle: section.title,
    })),
  ),
)

const filteredSections = computed(() =>
  videoSections
    .map(section => {
      const items = section.items.filter((item) => {
        const platformMatch = selectedPlatform.value === '全部' || item.platform === selectedPlatform.value
        const levelMatch = selectedLevel.value === '全部' || item.level === selectedLevel.value
        const currentTopic = topicDefinitions.find(topic => topic.slug === selectedTopic.value)
        const topicMatch =
          selectedTopic.value === '全部' ||
          (currentTopic
            ? item.tags.some(tag => currentTopic.tags.includes(tag)) ||
              currentTopic.keywords.some(keyword =>
                `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase().includes(keyword.toLowerCase()),
              )
            : true)

        return platformMatch && levelMatch && topicMatch
      })

      return {
        ...section,
        items,
      }
    })
    .filter(section => section.items.length > 0),
)

const relatedTopics = computed(() =>
  topicDefinitions.map(topic => ({
    ...topic,
    count: allVideos.value.filter(item =>
      item.tags.some(tag => topic.tags.includes(tag) || topic.keywords.some(keyword => tag.includes(keyword.toLowerCase()))),
    ).length,
  })),
)

function updateFilter(key: 'platform' | 'level' | 'topic', value: string) {
  router.replace({
    query: {
      ...route.query,
      [key]: value === '全部' ? undefined : value,
    },
  })
}
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Video Tutorials</p>
          <h1 class="section-title">视频教程</h1>
          <p class="section-copy">
            这一页把 OpenClaw 相关的视频资料按“官方入口、YouTube 英文主线、中文部署教程、Skills 扩展、渠道接入”拆成几组，
            避免你在官网、YouTube 和 Bilibili 之间来回搜索。第一次接触 OpenClaw，先看官网 Showcase 和官方引用视频，再选一条最接近你环境的部署教程就够了。
          </p>

          <div class="collection-utility">
            <article v-for="fact in quickFacts.slice(0, 2)" :key="fact.label" class="collection-utility-item">
              <span class="mini-label">{{ fact.label }}</span>
              <strong>{{ fact.value }}</strong>
              <p>{{ fact.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">推荐观看顺序</span>
            <strong>先官网入口，再看 YouTube 主线，最后补中文实操</strong>
            <p>第一次上手先看 Showcase 和完整 setup；基础链路稳定后，再进入 Skills、渠道和模型类视频。</p>
          </div>

          <div class="collection-summary">
            <span class="mini-label">建议做法</span>
            <p>跟视频操作时，只照着完成一条最小链路，不要在第一次尝试时同时接多种模型、渠道和 Skills。</p>
          </div>
        </aside>
      </section>

      <div class="grid video-overview-grid">
        <article v-for="fact in quickFacts" :key="fact.label" class="card overview-card">
          <span class="mini-label">{{ fact.label }}</span>
          <strong>{{ fact.value }}</strong>
          <p>{{ fact.note }}</p>
        </article>
      </div>

      <div class="filters card">
        <div class="filter-group">
          <span class="filter-label">平台</span>
          <button
            v-for="platform in platforms"
            :key="platform"
            type="button"
            class="filter-chip"
            :class="{ active: selectedPlatform === platform }"
            @click="updateFilter('platform', platform)"
          >
            {{ platform }}
          </button>
        </div>

        <div class="filter-group">
          <span class="filter-label">难度</span>
          <button
            v-for="level in levels"
            :key="level"
            type="button"
            class="filter-chip"
            :class="{ active: selectedLevel === level }"
            @click="updateFilter('level', level)"
          >
            {{ level }}
          </button>
        </div>

        <div class="filter-group">
          <span class="filter-label">主题</span>
          <button
            v-for="topic in ['全部', ...topicDefinitions.map(item => item.slug)]"
            :key="topic"
            type="button"
            class="filter-chip"
            :class="{ active: selectedTopic === topic }"
            @click="updateFilter('topic', topic)"
          >
            {{ topic === '全部' ? '全部' : topicDefinitions.find(item => item.slug === topic)?.title }}
          </button>
        </div>
      </div>

      <section v-for="section in filteredSections" :id="section.id" :key="section.id" class="video-section">
        <div class="home-head">
          <p class="eyebrow">{{ section.title }}</p>
          <p class="home-head-note">{{ section.description }}</p>
        </div>

        <div class="grid video-grid">
          <article v-for="item in section.items" :key="item.href" class="card video-card">
            <div class="video-card-head">
              <span class="tag">{{ item.platform }}</span>
              <span class="tag">{{ item.level }}</span>
              <span v-if="item.duration" class="tag">{{ item.duration }}</span>
              <span v-if="item.views" class="tag">{{ item.views }}</span>
            </div>

            <h2>{{ item.title }}</h2>
            <p class="video-copy">{{ item.description }}</p>

            <div class="video-meta">
              <span v-if="item.publishedAt">发布时间：{{ item.publishedAt }}</span>
              <span v-if="item.note">{{ item.note }}</span>
            </div>

            <div class="video-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag-item">#{{ tag }}</span>
            </div>

            <a class="button secondary video-link" :href="item.href" target="_blank" rel="noreferrer">
              打开视频
            </a>
          </article>
        </div>
      </section>

      <section class="card watch-tips">
        <div>
          <p class="eyebrow">观看建议</p>
          <h2 class="section-title">先用视频建立直觉，再回到文档做确认</h2>
        </div>

        <div class="tips-grid">
          <article class="tip-card">
            <strong>第一次部署时</strong>
            <p>边看视频边保留官方文档，遇到版本差异时以官方文档和 release 说明为准。</p>
          </article>
          <article class="tip-card">
            <strong>看完安装视频后</strong>
            <p>回到站内文档中心继续看安装、Onboarding 和 Gateway 运维，不要只停留在视频步骤。</p>
            <NuxtLink class="video-inline-link" to="/docs">进入文档中心</NuxtLink>
          </article>
          <article class="tip-card">
            <strong>做渠道和 Skills 扩展前</strong>
            <p>先确认本地最小链路已跑通，再进入飞书、钉钉、QQ、Ollama 或 Skills 类视频。</p>
          </article>
        </div>

        <div class="related-topic-row">
          <NuxtLink
            v-for="topic in relatedTopics.filter(item => item.count > 0)"
            :key="topic.slug"
            class="tag-item related-topic-link"
            :to="`/topics?topic=${topic.slug}`"
          >
            {{ topic.title }} · {{ topic.count }}
          </NuxtLink>
        </div>
      </section>
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

.video-overview-grid,
.video-grid,
.tips-grid,
.filter-group {
  display: grid;
  gap: 14px;
}

.video-overview-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.filters {
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
  font-size: 0.82rem;
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
}

.filter-chip.active {
  color: #fff8ef;
  border-color: transparent;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
}

.overview-card,
.video-card,
.watch-tips,
.tip-card {
  display: grid;
  gap: 10px;
}

.overview-card strong,
.tip-card strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.35;
}

.overview-card p,
.tip-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.62;
}

.video-section {
  display: grid;
  gap: 10px;
}

.home-head {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.home-head-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.5;
}

.video-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.video-card-head,
.video-meta,
.video-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.video-card h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.06rem;
  line-height: 1.35;
  letter-spacing: -0.03em;
}

.video-copy {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.65;
  font-size: 0.9rem;
}

.video-meta {
  color: var(--ink-soft);
  font-size: 0.8rem;
  line-height: 1.55;
}

.tag-item {
  font-size: 0.74rem;
  color: var(--brand);
  background: rgba(166, 111, 44, 0.1);
  padding: 3px 8px;
  border-radius: 999px;
}

.video-link {
  width: fit-content;
}

.video-inline-link {
  color: var(--brand);
  font-size: 0.84rem;
  font-weight: 700;
}

.tips-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.related-topic-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.related-topic-link {
  border: 1px solid rgba(67, 73, 60, 0.12);
}

@media (max-width: 980px) {
  .video-overview-grid,
  .video-grid,
  .tips-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .video-overview-grid,
  .video-grid,
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
