<script setup lang="ts">
import { sortBestPractices, sortDocs, sortNews } from '~/data/content'
import {
  actionOverview,
  bestPracticeOverview,
  docsOverview,
  extensionOverview,
  newsOverview,
  userRouteOverview,
} from '~/data/site'
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
].filter(Boolean) as Array<{ title: string; description: string; to: string; meta: string }>)

const topicOverview = computed(() =>
  topicDefinitions.slice(0, 6).map(topic => ({
    title: topic.title,
    description: topic.description,
    to: `/topics?topic=${topic.slug}`,
    meta: '主题聚合',
  })),
)
</script>

<template>
  <div>
    <HeroSection />
    <QuickStartSection />
    <FeatureGrid />
    <ContentSpotlight />

    <section class="section content-section routes-section">
      <div class="container">
        <div class="home-head">
          <p class="eyebrow">用户分流</p>
          <p class="home-head-note">先判断自己处于哪个阶段，再选对应入口，不要第一次进入就把所有入口一起打开。</p>
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
    </section>

    <section class="section content-section paths-section">
      <div class="container">
        <div class="home-head">
          <p class="eyebrow">学习路径</p>
          <p class="home-head-note">从部署、Windows、Skills 扩展到团队运维，把零散内容接成连续路线。</p>
        </div>
        <div class="grid route-grid">
          <ContentCard
            v-for="path in learningPaths"
            :key="path.slug"
            :title="path.title"
            :description="path.summary"
            :to="path.next"
            :meta="'路径'"
          />
        </div>
      </div>
    </section>

    <section class="section content-section week-section">
      <div class="container">
        <div class="home-head">
          <p class="eyebrow">本周推荐</p>
          <p class="home-head-note">如果你只想快速知道最近最值得看的内容，从这里开始。</p>
        </div>
        <div class="grid practice-grid">
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
    </section>

    <section class="section content-section topics-section">
      <div class="container">
        <div class="home-head">
          <p class="eyebrow">主题中心</p>
          <p class="home-head-note">按安装、Gateway、渠道、Skills、模型和安全跨模块聚合内容。</p>
        </div>
        <div class="grid action-grid">
          <ContentCard
            v-for="item in topicOverview"
            :key="item.to"
            :title="item.title"
            :description="item.description"
            :to="item.to"
            :meta="item.meta"
          />
        </div>
      </div>
    </section>

    <section class="section content-section docs-section">
      <div class="container">
        <div class="home-head">
          <p class="eyebrow">文档入口</p>
          <p class="home-head-note">从定位、安装到架构与排错，按顺序建立完整理解。</p>
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
    </section>

    <section class="section content-section practice-section">
      <div class="container">
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
    </section>

    <section class="section content-section videos-section">
      <div class="container">
        <div class="home-head">
          <p class="eyebrow">视频教程</p>
          <p class="home-head-note">把官方 Showcase、YouTube 演示和 Bilibili 中文教程聚合在一个入口里，更适合先看演示再动手的人。</p>
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
    </section>

    <section class="section content-section news-section">
      <div class="container">
        <div class="home-head">
          <p class="eyebrow">最近更新</p>
          <p class="home-head-note">聚焦版本变化、能力更新和需要及时关注的使用提醒。</p>
        </div>
        <div class="grid news-grid">
          <ContentCard
            v-for="item in latestNews"
            :key="item.path"
            :title="item.title"
            :description="item.description"
            :to="item.path"
            :meta="item.date"
          />
        </div>
      </div>
    </section>

    <section class="section content-section extension-section">
      <div class="container">
        <div class="home-head">
          <p class="eyebrow">技能与配置</p>
          <p class="home-head-note">把常用 skills、SOUL 和关键配置项单独整理，减少在社区帖和零散文档里来回翻找。</p>
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
    </section>

    <section class="section content-section action-section">
      <div class="container">
        <div class="home-head">
          <p class="eyebrow">互动入口</p>
          <p class="home-head-note">通过搜索、FAQ、反馈和社区入口更快找到下一步动作。</p>
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
    </section>

    <section class="section">
      <div class="container subscribe-grid card">
        <div class="subscribe-copy">
          <p class="eyebrow">订阅更新</p>
          <p class="home-head-note">通过订阅和 RSS 持续跟踪版本动态、重点功能变化和新的中文资料。</p>
        </div>

        <SubscribeForm />
      </div>
    </section>
  </div>
</template>

<style scoped>
.content-section {
  padding-top: 14px;
  padding-bottom: 8px;
}

.home-head {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}

.home-head-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.5;
}

.docs-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.docs-grid > :first-child {
  grid-column: span 2;
}

.route-grid,
.action-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.news-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.practice-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.extension-grid {
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 14px;
}

.subscribe-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 12px;
}

.subscribe-copy {
  display: grid;
  gap: 6px;
  align-content: start;
}

@media (max-width: 980px) {
  .docs-grid,
  .route-grid,
  .news-grid,
  .practice-grid,
  .extension-grid,
  .action-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .docs-grid > :first-child {
    grid-column: span 2;
  }

  .subscribe-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .docs-grid,
  .route-grid,
  .news-grid,
  .practice-grid,
  .extension-grid,
  .action-grid {
    grid-template-columns: 1fr;
  }

  .docs-grid > :first-child {
    grid-column: span 1;
  }
}
</style>
