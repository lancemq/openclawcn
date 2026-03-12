<script setup lang="ts">
import { sortBestPractices, sortDocs, sortNews } from '~/data/content'
import {
  actionOverview,
  bestPracticeOverview,
  docsOverview,
  ecosystemOverview,
  extensionOverview,
  newsOverview,
  userRouteOverview,
} from '~/data/site'
import { informationLayers } from '~/data/information-architecture'
import { featuredVideos } from '~/data/videos'
import { learningPaths, topicDefinitions } from '~/data/taxonomy'

useSeo({
  title: 'OpenClaw 中文官网',
  description: '面向中文用户的 OpenClaw 介绍、文档、更新、视频教程和社区支持入口。',
  path: '/',
  type: 'website',
})

const { data: docs } = await useAsyncData('home:docs', () => queryCollection('docs').all())
const { data: news } = await useAsyncData('home:news', () => queryCollection('news').all())
const { data: practices } = await useAsyncData('home:practices', () => queryCollection('bestPractices').all())

const latestDocs = computed(() => sortDocs((docs.value || []) as any[]).slice(0, 3))
const latestNews = computed(() => sortNews((news.value || []) as any[]).slice(0, 4))
const latestPractices = computed(() => sortBestPractices((practices.value || []) as any[]).slice(0, 3))

const weeklyFocus = computed(() => [
  latestNews.value[0] && {
    title: latestNews.value[0].title,
    description: latestNews.value[0].description,
    to: latestNews.value[0].path,
    meta: `新闻 / ${latestNews.value[0].date || ''}`,
  },
  latestDocs.value[0] && {
    title: latestDocs.value[0].title,
    description: latestDocs.value[0].description,
    to: latestDocs.value[0].path,
    meta: `文档 / ${latestDocs.value[0].category || ''}`,
  },
  latestPractices.value[0] && {
    title: latestPractices.value[0].title,
    description: latestPractices.value[0].description,
    to: latestPractices.value[0].path,
    meta: `实践 / ${latestPractices.value[0].difficulty || ''}`,
  },
  featuredVideos[0] && {
    title: featuredVideos[0].title,
    description: featuredVideos[0].description,
    to: featuredVideos[0].to,
    meta: featuredVideos[0].meta,
  },
].filter(Boolean) as Array<{ title: string; description: string; to: string; meta: string }>)

const topicOverview = computed(() =>
  topicDefinitions.slice(0, 6).map(topic => ({
    title: topic.title,
    description: topic.description,
    to: `/topics?topic=${topic.slug}`,
    meta: '主题聚合',
  })),
)

const featuredTopic = computed(() => topicOverview.value[0])
const supportingTopics = computed(() => topicOverview.value.slice(1, 5))
</script>

<template>
  <div>
    <HeroSection />
    <QuickStartSection />
    <FeatureGrid />
    <ContentSpotlight />

    <section class="section content-section routes-section">
      <div class="container">
        <div class="stack-shell">
          <div class="layer-ribbon">
            <div v-for="layer in informationLayers" :key="layer.id" class="card layer-card">
              <span class="eyebrow">{{ layer.title }}</span>
              <p class="home-head-note">{{ layer.summary }}</p>
              <div class="layer-link-row">
                <NuxtLink
                  v-for="item in layer.items"
                  :key="item.to"
                  :to="item.to"
                  class="tag-item layer-link"
                >
                  {{ item.title }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="home-head head-inline">
            <p class="eyebrow">用户分流</p>
            <p class="section-title compact-title">先判断当前阶段，再进入对应入口。</p>
            <p class="home-head-note">不要第一次进入就把所有入口一起打开。先判断自己是在学习、扩展还是长期运行阶段，再走对应路线。</p>
          </div>
          <div class="grid route-grid">
            <ContentCard
              v-for="item in userRouteOverview"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section paths-section">
      <div class="container">
        <div class="feature-band card">
          <div class="home-head">
            <p class="eyebrow">学习路径</p>
            <p class="home-head-note">从部署、Windows、Skills 扩展到团队运维，把零散内容接成连续路线。</p>
          </div>
          <div class="path-rail">
            <NuxtLink
              v-for="(path, index) in learningPaths"
              :key="path.slug"
              :to="path.next"
              class="path-step"
            >
              <span class="path-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="path-copy">
                <strong>{{ path.title }}</strong>
                <p>{{ path.summary }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section week-section">
      <div class="container">
        <div class="stagger-shell">
          <div class="home-head">
            <p class="eyebrow">本周推荐</p>
            <p class="home-head-note">如果你只想快速知道最近最值得看的内容，从这里开始。</p>
          </div>
          <div class="grid spotlight-grid">
            <ContentCard
              v-for="item in weeklyFocus"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section topics-section">
      <div class="container">
        <div class="editorial-shell">
          <div class="home-head head-inline">
            <p class="eyebrow">主题中心</p>
            <p class="home-head-note">按安装、Gateway、渠道、扩展、模型和安全跨模块聚合内容。</p>
          </div>
          <div class="editorial-columns">
            <NuxtLink v-if="featuredTopic" :to="featuredTopic.to" class="card editorial-feature">
              <span class="eyebrow">主栏目</span>
              <h3>{{ featuredTopic.title }}</h3>
              <p>{{ featuredTopic.description }}</p>
              <span class="more-link">进入主题</span>
            </NuxtLink>

            <div class="editorial-side-grid">
              <NuxtLink
                v-for="item in supportingTopics"
                :key="item.to"
                :to="item.to"
                class="card editorial-mini"
              >
                <span class="tag">{{ item.meta }}</span>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section docs-section">
      <div class="container">
        <div class="stack-shell">
          <div class="home-head head-inline">
            <p class="eyebrow">文档入口</p>
            <p class="section-title compact-title">先建立完整地图，再钻进细节。</p>
            <p class="home-head-note">从定位、安装到架构与排错，按顺序建立理解，不要一开始就跳进零散配置。</p>
          </div>
          <div class="grid docs-grid">
            <ContentCard
              v-for="item in docsOverview"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section practice-section">
      <div class="container">
        <div class="feature-band subtle-band">
          <div class="home-head">
            <p class="eyebrow">最佳实践</p>
            <p class="home-head-note">把接入、运维、协作和升级经验整理成更稳定的中文方法。</p>
          </div>
          <div class="grid practice-grid">
            <ContentCard
              v-for="item in bestPracticeOverview"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section videos-section">
      <div class="container">
        <div class="stack-shell">
          <div class="home-head head-inline">
            <p class="eyebrow">视频教程</p>
            <p class="section-title compact-title">更适合先看演示，再回头确认细节。</p>
            <p class="home-head-note">把官方 Showcase、YouTube 演示和 Bilibili 中文教程聚合在一个入口里，优先帮助你建立使用直觉。</p>
          </div>
          <div class="grid extension-grid">
            <ContentCard
              v-for="item in featuredVideos"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section news-section">
      <div class="container">
        <div class="ticker-shell">
          <div class="home-head head-inline">
            <p class="eyebrow">最近更新</p>
            <p class="home-head-note">聚焦版本变化、能力更新和需要及时关注的使用提醒。</p>
          </div>
          <div class="news-timeline">
            <NuxtLink
              v-for="item in latestNews"
              :key="item.path"
              :to="item.path"
              class="timeline-item"
            >
              <div class="timeline-stem">
                <span class="timeline-dot" />
                <span class="timeline-line" />
              </div>
              <div class="card timeline-card">
                <span class="tag">{{ item.date }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section extension-section">
      <div class="container">
        <div class="stack-shell">
          <div class="home-head head-inline">
            <p class="eyebrow">扩展入口</p>
            <p class="home-head-note">把工具系列、Skills 和关键配置单独整理，减少在零散文档和社区讨论里来回翻找。</p>
          </div>
          <div class="grid extension-grid">
            <ContentCard
              v-for="item in extensionOverview"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section ecosystem-section">
      <div class="container">
        <div class="feature-band">
          <div class="home-head head-inline">
            <p class="eyebrow">生态入口</p>
            <p class="home-head-note">探索 OpenClaw 的生态系统，包括技能市场、案例展示、下载中心和产品路线图。</p>
          </div>
          <div class="grid ecosystem-grid">
            <ContentCard
              v-for="item in ecosystemOverview"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section action-section">
      <div class="container">
          <div class="feature-band">
            <div class="home-head head-inline">
            <p class="eyebrow">辅助入口</p>
            <p class="home-head-note">通过搜索、FAQ、反馈和社区支持更快找到下一步动作。</p>
            </div>
            <div class="grid action-grid">
            <ContentCard
              v-for="item in actionOverview"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container subscribe-grid card">
        <div class="subscribe-copy">
          <p class="eyebrow">订阅更新</p>
          <p class="home-head-note">这里分成两种方式：RSS 适合直接加到阅读器，邮箱订阅适合接收后续站点更新提醒。</p>
        </div>

        <SubscribeForm />
      </div>
    </section>
  </div>
</template>

<style scoped>
.content-section {
  padding-top: 8px;
  padding-bottom: 4px;
}

.stack-shell,
.feature-band,
.ticker-shell,
.stagger-shell,
.editorial-shell {
  display: grid;
  gap: 10px;
}

.stack-shell {
  gap: 6px;
}

.layer-ribbon {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 4px;
}

.layer-card {
  display: grid;
  gap: 8px;
  padding: 16px 18px;
}

.layer-link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.layer-link {
  background: rgba(19, 129, 125, 0.08);
}

.path-rail {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.path-step {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  padding: 10px 12px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  background: rgba(255, 255, 255, 0.42);
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.path-step:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
}

.path-index {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: #fff8ef;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.path-copy {
  display: grid;
  gap: 4px;
}

.path-copy strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.98rem;
  line-height: 1.3;
}

.path-copy p,
.editorial-feature p,
.editorial-mini p,
.timeline-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.84rem;
  line-height: 1.48;
}

.feature-band {
  padding: 10px 12px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.24);
}

.editorial-columns {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.9fr);
  gap: 10px;
}

.editorial-feature,
.editorial-mini,
.timeline-card {
  display: grid;
  gap: 8px;
}

.editorial-feature {
  padding: 14px;
  align-content: start;
}

.editorial-feature h3,
.timeline-card h3 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.1rem;
  line-height: 1.25;
  letter-spacing: -0.03em;
}

.more-link {
  color: var(--brand);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.editorial-side-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.editorial-mini strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.98rem;
  line-height: 1.28;
}

.news-timeline {
  display: grid;
  gap: 8px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 10px;
  align-items: stretch;
}

.timeline-stem {
  display: grid;
  justify-items: center;
  grid-template-rows: 16px 1fr;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--brand);
  box-shadow: 0 0 0 4px rgba(19, 129, 125, 0.12);
}

.timeline-line {
  width: 1px;
  background: rgba(67, 73, 60, 0.18);
  min-height: 100%;
}

.timeline-item:last-child .timeline-line {
  opacity: 0;
}

.timeline-card {
  padding: 12px 14px;
}

.subtle-band {
  background: linear-gradient(180deg, rgba(255, 250, 241, 0.58), rgba(255, 255, 255, 0.18));
}

.head-inline {
  margin-bottom: 2px;
}

.compact-title {
  margin: 0;
  font-size: 1.16rem;
  line-height: 1.06;
}

.home-head {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 6px;
}

.home-head-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.82rem;
  line-height: 1.42;
}

.docs-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}

.spotlight-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.route-grid,
.action-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.practice-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.extension-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.ecosystem-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.subscribe-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 10px;
}

.subscribe-copy {
  display: grid;
  gap: 6px;
  align-content: start;
}

@media (max-width: 980px) {
  .docs-grid,
  .spotlight-grid,
  .layer-ribbon,
  .route-grid,
  .practice-grid,
  .extension-grid,
  .ecosystem-grid,
  .action-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .path-rail,
  .editorial-columns,
  .editorial-side-grid {
    grid-template-columns: 1fr;
  }

  .subscribe-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .docs-grid,
  .spotlight-grid,
  .route-grid,
  .practice-grid,
  .extension-grid,
  .ecosystem-grid,
  .action-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .feature-band {
    padding: 8px;
  }

  .path-rail {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .docs-grid,
  .spotlight-grid,
  .route-grid,
  .practice-grid,
  .extension-grid,
  .ecosystem-grid,
  .action-grid {
    grid-template-columns: 1fr;
  }
}
</style>
