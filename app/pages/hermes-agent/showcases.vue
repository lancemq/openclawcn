<script setup lang="ts">
import {
  getHermesRelatedPages,
  hermesShowcases,
  hermesShowcasePatterns,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 实战案例',
  description: '从研究跟踪、自动巡检、跨渠道消息处理到数据流水线的真实场景拆解，看 Hermes Agent 在不同任务中的实际落地方式。',
  path: '/hermes-agent/showcases',
  type: 'website',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent', to: '/hermes-agent' },
    { label: '实战案例' },
  ],
})

const relatedPages = getHermesRelatedPages('showcases')
</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '实战案例' },
      ]" />

      <HermesSeriesNav />

      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Showcases</p>
          <h1 class="section-title">Hermes Agent 实战案例</h1>
          <p class="section-copy">
            概念讲再多，不如看真实案例。这一页收集了 Hermes 在不同场景中的实际落地方式——
            从研究跟踪到自动巡检，从跨渠道处理到数据流水线，每个案例都附带场景、做法和实际效果。
          </p>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">这页负责什么</span>
            <strong>用真实场景证明 Hermes 的价值</strong>
            <p>如果你还在判断 Hermes 是否适合你的场景，这一页用实际案例帮你更快做决定。</p>
          </div>
        </aside>
      </section>

      <section v-for="item in hermesShowcases" :key="item.title" class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">{{ item.category }}</p>
            <h2>{{ item.title }}</h2>
          </div>
          <span class="showcase-tag">{{ item.fit }}</span>
        </div>

        <div class="showcase-content">
          <div class="showcase-block">
            <span class="series-kicker">场景</span>
            <p>{{ item.scenario }}</p>
          </div>
          <div class="showcase-block">
            <span class="series-kicker">做法</span>
            <p>{{ item.approach }}</p>
          </div>
          <div class="showcase-block showcase-highlight">
            <span class="series-kicker">实际效果</span>
            <p>{{ item.highlight }}</p>
          </div>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">案例规律</p>
            <h2>这些成功案例的共同特征</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesShowcasePatterns" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="pulse" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">继续阅读</p>
            <p class="section-copy">看完案例后，下一步适合回能力地图页建立系统理解，或去监控页了解如何保障长期运行。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <NuxtLink v-for="item in relatedPages" :key="item.to" :to="item.to" class="series-link-card">
            <div class="series-card-top">
              <SeriesGlyph kind="grid" tone="brand" small />
              <span class="series-tag">{{ item.meta }}</span>
            </div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.hermes-subpage {
  gap: 24px;
}

.showcase-tag {
  display: inline-flex;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(15, 102, 116, 0.1);
  color: var(--brand);
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
}

.showcase-content {
  display: grid;
  gap: 16px;
}

.showcase-block {
  display: grid;
  gap: 6px;
}

.showcase-block p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
}

.showcase-highlight {
  padding-top: 12px;
  border-top: 1px solid rgba(64, 73, 85, 0.08);
}

.showcase-highlight p {
  color: var(--ink);
  font-weight: 500;
}
</style>