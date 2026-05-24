<script setup lang="ts">
import {
  getHermesRelatedPages,
  hermesSubagentBestPractices,
  hermesSubagentOrchestration,
  hermesSubagentOverview,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 子 Agent 编排',
  description: '子 Agent 的分工模式、通信机制和编排策略，让 Hermes 能高效并行处理复杂任务。',
  path: '/hermes-agent/subagents',
  type: 'website',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent', to: '/hermes-agent' },
    { label: '子 Agent 编排' },
  ],
})

const relatedPages = getHermesRelatedPages('subagents')
</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '子 Agent 编排' },
      ]" />

      <HermesSeriesNav />

      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Subagents</p>
          <h1 class="section-title">Hermes Agent 的子 Agent 编排</h1>
          <p class="section-copy">
            子 Agent 是 Hermes 处理复杂任务的关键机制。这一页解释子 Agent 的工作方式、
            四种编排模式各自适合什么场景，以及让子 Agent 协作更稳定的最佳实践。
          </p>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">这页负责什么</span>
            <strong>解释子 Agent 的编排策略</strong>
            <p>如果你的任务需要并行处理、拆分协作或分阶段接力，这一页帮你理解子 Agent 的设计方式。</p>
          </div>
        </aside>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">基础认知</p>
            <h2>先把子 Agent 的角色和边界搞清楚</h2>
          </div>
        </div>

        <div class="series-grid-4">
          <article v-for="item in hermesSubagentOverview" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="stack" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">编排模式</p>
            <h2>四种编排策略，对应不同的任务结构</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesSubagentOrchestration" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.summary }}</p>
            <ul class="pillar-list">
              <li v-for="point in item.items" :key="point">{{ point }}</li>
            </ul>
            <small>{{ item.fit }}</small>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">最佳实践</p>
            <h2>这些原则能让子 Agent 协作更稳定</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesSubagentBestPractices" :key="item.title" class="series-card">
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
            <p class="section-copy">理解子 Agent 编排后，下一步适合回到配置部署或进入实战案例页。</p>
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

.pillar-list {
  margin: 0;
  padding-left: 18px;
  color: var(--ink-soft);
  line-height: 1.7;
}

.series-card small {
  color: var(--ink-soft);
  line-height: 1.6;
}
</style>