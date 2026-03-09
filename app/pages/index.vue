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
        <h2 class="section-title">通过搜索、反馈和社区入口持续补齐中文用户真正需要的内容。</h2>
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
          <h2 class="section-title">如果你希望跟进中文资料更新，可以先留下订阅邮箱。</h2>
          <p class="section-copy">
            你可以通过订阅和 RSS 持续跟踪文档、最佳实践和重要更新，不必每次手动回到站点查看。
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
  margin-top: 24px;
}

.three-up {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 24px;
}

.subscribe-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
  gap: 24px;
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
