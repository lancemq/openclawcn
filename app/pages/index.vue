<script setup lang="ts">
import { actionOverview, bestPracticeOverview, docsOverview, newsOverview } from '~/data/site'

useSeo({
  title: 'OpenClaw 中文官网',
  description: '面向中文用户的 OpenClaw 官网 MVP，包含新闻、文档和社区支持入口。',
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
        <h2 class="section-title">从文档和新闻开始验证站点价值。</h2>
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
        <h2 class="section-title">第一阶段的变更先用新闻列表沉淀。</h2>
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
        <h2 class="section-title">第 3 步先从最核心的中文站点实践沉淀开始。</h2>
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
        <h2 class="section-title">第 2 步开始补齐搜索、反馈和社区能力。</h2>
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
            当前订阅接口先提供可验证链路，后续可接入真实邮件系统、Webhook 或自动化流程。
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
