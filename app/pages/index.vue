<script setup lang="ts">
import { actionOverview, bestPracticeOverview, docsOverview, newsOverview } from '~/data/site'

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
    <FeatureGrid />
    <QuickStartSection />
    <ContentSpotlight />

    <section class="section">
      <div class="container">
        <p class="eyebrow">文档入口</p>
        <h2 class="section-title">从产品介绍、入门文档和功能专题开始系统理解 OpenClaw。</h2>
        <div class="grid two-up">
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

    <section class="section">
      <div class="container">
        <p class="eyebrow">最新动态</p>
        <h2 class="section-title">通过版本更新、能力变化和使用提醒持续跟踪 OpenClaw。</h2>
        <div class="grid two-up">
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

    <section class="section">
      <div class="container">
        <p class="eyebrow">最佳实践</p>
        <h2 class="section-title">把常见的接入、运维和协作经验整理成更稳定的中文实践。</h2>
        <div class="grid two-up">
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

    <section class="section">
      <div class="container">
        <p class="eyebrow">互动入口</p>
        <h2 class="section-title">用搜索、FAQ、反馈和社区入口更快解决问题。</h2>
        <div class="grid three-up">
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
        <div>
          <p class="eyebrow">订阅更新</p>
          <h2 class="section-title">如果你想持续关注 OpenClaw 变化，可以订阅更新。</h2>
          <p class="section-copy">
            通过订阅和 RSS，你可以更轻松地跟踪版本动态、重点功能变化和新的中文资料。
          </p>
        </div>

        <SubscribeForm />
      </div>
    </section>
  </div>
</template>

<style scoped>
.two-up {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 16px;
}

.three-up {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 16px;
}

.subscribe-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
  gap: 18px;
}

@media (max-width: 980px) {
  .three-up {
    grid-template-columns: 1fr;
  }

  .subscribe-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .two-up {
    grid-template-columns: 1fr;
  }
}
</style>
