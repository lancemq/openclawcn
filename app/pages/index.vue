<script setup lang="ts">
import { actionOverview, bestPracticeOverview, docsOverview, extensionOverview, newsOverview } from '~/data/site'

useSeo({
  title: 'OpenClaw 中文官网',
  description: '面向中文用户的 OpenClaw 介绍、文档、更新和社区支持入口。',
  path: '/',
  type: 'website',
})
</script>

<template>
  <div>
    <HeroSection />
    <QuickStartSection />
    <FeatureGrid />
    <ContentSpotlight />

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

    <section class="section content-section news-section">
      <div class="container">
        <div class="home-head">
          <p class="eyebrow">最新动态</p>
          <p class="home-head-note">聚焦版本变化、能力更新和需要及时关注的使用提醒。</p>
        </div>
        <div class="grid news-grid">
          <ContentCard
            v-for="item in newsOverview"
            :key="item.to"
            :title="item.title"
            :description="item.description"
            :to="item.to"
            :meta="item.meta"
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

.news-grid {
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  gap: 14px;
}

.practice-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.practice-grid > :first-child {
  grid-column: span 2;
}

.action-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.action-grid > :first-child {
  grid-column: span 2;
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
  .docs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .docs-grid > :first-child {
    grid-column: span 2;
  }

  .news-grid,
  .practice-grid,
  .extension-grid,
  .action-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .practice-grid > :first-child,
  .action-grid > :first-child {
    grid-column: span 2;
  }

  .subscribe-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .docs-grid,
  .news-grid,
  .practice-grid,
  .extension-grid,
  .action-grid {
    grid-template-columns: 1fr;
  }

  .docs-grid > :first-child,
  .practice-grid > :first-child,
  .action-grid > :first-child {
    grid-column: span 1;
  }
}
</style>
