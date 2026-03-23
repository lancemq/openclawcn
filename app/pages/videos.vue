<script setup lang="ts">
import { videoSections } from '~/data/videos'
import { topicDefinitions } from '~/data/taxonomy'

useSeo({
  title: '视频教程',
  description: '查看 OpenClaw 的视频教程与演示内容，覆盖安装部署、本地模型、Skills 扩展、渠道接入和进阶案例。',
  path: '/videos',
  type: 'website',
})

const quickFacts = [
  { label: '视频来源', value: 'Official / YouTube / Bilibili', note: '包含官方演示、英文主线视频和中文实操内容' },
  { label: '覆盖方向', value: '总览 / 安装 / 模型 / Skills / 渠道', note: '适合从基础了解一路看到部署、扩展和接入' },
  { label: '适合人群', value: '想先看演示再动手的用户', note: '尤其适合第一次接触 OpenClaw 或在找具体操作示例时观看' },
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
        description: 'OpenClaw 视频教程与演示内容，包含官方视频、YouTube 视频和中文实操教程。',
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

const totalVideoCount = computed(() => allVideos.value.length)

const stageGuides = [
  {
    title: '第一次接触 OpenClaw',
    description: '先看官方入口和安装视频，建立最小认知，不要一上来就钻进复杂玩法。',
    section: 'official',
    link: '/docs/getting-started/getting-started',
    linkLabel: '看快速入门',
  },
  {
    title: '已经跑通，准备继续扩展',
    description: '把重点切到 Skills、自动化和本地模型，先补能力边界，再继续堆复杂度。',
    section: 'skills',
    link: '/docs/getting-started/when-to-add-skills-plugins-and-multi-agent',
    linkLabel: '看扩展时机',
  },
  {
    title: '准备接入真实办公流',
    description: '优先看飞书、钉钉、微信等入口视频，并同步核对对应的文档边界和权限说明。',
    section: 'integration',
    link: '/docs/getting-started/when-to-connect-channels',
    linkLabel: '看渠道时机',
  },
]

const roleGuides = computed(() => [
  {
    title: '个人用户',
    description: '先看总览、安装和一个最常用入口，再决定是否继续看本地模型或 Skills。',
    items: allVideos.value
      .filter(item => ['Official', 'Bilibili'].includes(item.platform) && ['入门', '基础'].includes(item.level))
      .filter(item => item.tags.some(tag => ['热点', '部署', '国内办公', '实用', '中文'].includes(tag)))
      .slice(0, 3),
    to: '/docs/getting-started/personal-user-entry',
    meta: '个人入口',
  },
  {
    title: '开发团队',
    description: '更适合先看安装、Skills、自动化和工作流类视频，建立结构感再扩能力。',
    items: allVideos.value
      .filter(item => item.tags.some(tag => ['Skills', '自动化', '多Agent', '案例', 'Discord'].includes(tag)))
      .slice(0, 3),
    to: '/docs/getting-started/developer-team-entry',
    meta: '开发团队',
  },
  {
    title: '企业运维',
    description: '优先看飞书、远程部署、长期在线和团队协作入口，先建立稳定运行边界。',
    items: allVideos.value
      .filter(item => item.tags.some(tag => ['飞书', 'VPS', '远程部署', '自动化', '国内办公'].includes(tag)))
      .slice(0, 3),
    to: '/docs/getting-started/enterprise-ops-entry',
    meta: '企业运维',
  },
])

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

const sectionStats = computed(() => [
  { label: '视频总数', value: String(totalVideoCount.value), note: '覆盖官方入口、中文教程和英文主线视频' },
  { label: '平台来源', value: '3 类', note: 'Official / Bilibili / YouTube' },
  { label: '内容分组', value: String(videoSections.length), note: '从总览、安装到 Skills、渠道和进阶案例' },
])

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
            这里汇总了 OpenClaw 相关的视频教程与演示内容，覆盖产品总览、安装部署、本地模型、Skills 扩展、渠道接入和进阶案例。
            如果你是第一次接触 OpenClaw，建议先看总览和安装视频，再进入更具体的模型、Skills 和渠道主题。
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
            <strong>先看总览与安装，再进入模型、Skills 和渠道</strong>
            <p>先建立基础认识，再根据你当前要解决的问题选择更具体的视频内容。</p>
          </div>

          <div class="collection-summary">
            <span class="mini-label">建议做法</span>
            <p>第一次跟视频操作时，优先完成一条最小可用链路，再逐步增加模型、渠道和 Skills 配置。</p>
          </div>
        </aside>
      </section>

      <div class="grid video-overview-grid">
        <article v-for="fact in [...quickFacts, ...sectionStats]" :key="fact.label" class="card overview-card">
          <span class="mini-label">{{ fact.label }}</span>
          <strong>{{ fact.value }}</strong>
          <p>{{ fact.note }}</p>
        </article>
      </div>

      <section class="card watch-guide-panel">
        <div class="home-head">
          <p class="eyebrow">按阶段观看</p>
          <p class="home-head-note">如果你不想自己在各类视频里来回挑，先按当前阶段走一条最像你的观看线。</p>
        </div>

        <div class="tips-grid">
          <article v-for="item in stageGuides" :key="item.title" class="tip-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
            <div class="video-card-head">
              <span class="tag">推荐分区</span>
              <span class="tag">{{ videoSections.find(section => section.id === item.section)?.title }}</span>
            </div>
            <NuxtLink class="video-inline-link" :to="item.link">{{ item.linkLabel }}</NuxtLink>
          </article>
        </div>
      </section>

      <section class="card watch-guide-panel">
        <div class="home-head">
          <p class="eyebrow">按角色看</p>
          <p class="home-head-note">如果你已经知道自己更像个人用户、开发团队还是企业运维，可以直接从这组视频开始。</p>
        </div>

        <div class="role-guide-grid">
          <article v-for="guide in roleGuides" :key="guide.title" class="card role-guide-card">
            <div class="video-card-head">
              <span class="tag">{{ guide.meta }}</span>
            </div>
            <strong>{{ guide.title }}</strong>
            <p>{{ guide.description }}</p>

            <div class="role-video-list">
              <a
                v-for="item in guide.items"
                :key="guide.title + item.href"
                :href="item.href"
                target="_blank"
                rel="noreferrer"
                class="role-video-link"
              >
                <span>{{ item.title }}</span>
                <b>{{ item.platform }} / {{ item.level }}</b>
              </a>
            </div>

            <NuxtLink class="video-inline-link" :to="guide.to">继续看对应入口</NuxtLink>
          </article>
        </div>
      </section>

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
          <h2 class="section-title">按当前问题选择更合适的视频内容</h2>
        </div>

        <div class="tips-grid">
          <article class="tip-card">
            <strong>第一次部署时</strong>
            <p>优先看安装和基础设置视频，边操作边核对当前版本要求与环境差异。</p>
          </article>
          <article class="tip-card">
            <strong>看完安装视频后</strong>
            <p>如果你还需要更完整的步骤说明、参数解释或排错路径，可以继续查看文档中心。</p>
            <NuxtLink class="video-inline-link" to="/docs">进入文档中心</NuxtLink>
          </article>
          <article class="tip-card">
            <strong>做渠道和 Skills 扩展前</strong>
            <p>先确认基础链路已稳定，再进入飞书、钉钉、QQ、Ollama 或 Skills 相关视频，会更容易跟上。</p>
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

.watch-guide-panel,
.role-guide-grid,
.role-video-list,
.role-guide-card {
  display: grid;
  gap: 14px;
}

.role-guide-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.role-guide-card {
  align-content: start;
}

.role-video-link {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(15, 24, 46, 0.08);
  background: rgba(255, 255, 255, 0.56);
  color: inherit;
  text-decoration: none;
}

.role-video-link span {
  font-weight: 700;
  line-height: 1.45;
}

.role-video-link b {
  color: var(--ink-soft);
  font-size: 0.78rem;
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
  .role-guide-grid,
  .video-grid,
  .tips-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .video-overview-grid,
  .role-guide-grid,
  .video-grid,
  .tips-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .collection-main,
  .collection-side,
  .overview-card,
  .video-card,
  .watch-tips,
  .tip-card,
  .filters {
    padding: 14px;
    border-radius: 18px;
  }

  .video-overview-grid,
  .role-guide-grid,
  .video-grid,
  .tips-grid,
  .filters {
    gap: 10px;
  }

  .home-head {
    gap: 6px;
    align-items: flex-start;
  }

  .home-head-note,
  .overview-card p,
  .tip-card p,
  .video-copy,
  .video-meta,
  .collection-summary p {
    font-size: 0.84rem;
    line-height: 1.56;
  }

  .overview-card strong,
  .tip-card strong,
  .video-card h2,
  .collection-summary strong {
    font-size: 0.94rem;
    line-height: 1.34;
  }

  .filter-group {
    gap: 8px;
    align-items: flex-start;
  }

  .filter-label {
    width: 100%;
    font-size: 0.78rem;
  }

  .filter-chip {
    padding: 6px 10px;
    font-size: 0.78rem;
  }

  .video-card-head,
  .video-meta,
  .video-tags,
  .related-topic-row {
    gap: 6px;
  }

  .video-link {
    width: 100%;
    justify-content: center;
  }
}
</style>
