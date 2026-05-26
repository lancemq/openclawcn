<script setup lang="ts">
import {
  hermesLogging,
  hermesMetrics,
  hermesMonitoringOverview,
  hermesTroubleshooting,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 性能与监控',
  description: '日志、指标、状态观察和问题排查——确保长期运行的 Hermes Agent 始终处于可观测的健康状态。',
  path: '/hermes-agent/monitoring',
  type: 'website',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent', to: '/hermes-agent' },
    { label: '性能与监控' },
  ],
})

</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '性能与监控' },
      ]" />

      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Monitoring</p>
          <h1 class="section-title">Hermes Agent 的性能与监控</h1>
          <p class="section-copy">
            长期在线的 agent 如果不被观察，就是一个黑箱。这一页解释应该关注哪些指标、
            如何设计日志体系、常见问题怎么排查——确保 Hermes 始终处于你"看得见"的状态。
          </p>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">这页负责什么</span>
            <strong>确保 Hermes 可观测</strong>
            <p>如果你已经让 Hermes 长期运行，或者正准备把它推向生产环境，这一页不应该跳过。</p>
          </div>
        </aside>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">监控认知</p>
            <h2>为什么长期在线的 agent 必须有监控</h2>
          </div>
        </div>

        <div class="series-grid-4">
          <article v-for="item in hermesMonitoringOverview" :key="item.title" class="series-card">
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
            <p class="eyebrow">核心指标</p>
            <h2>这六个指标最能反映 Hermes 的健康状况</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesMetrics" :key="item.title" class="series-card">
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
            <p class="eyebrow">日志体系</p>
            <h2>好的日志设计，是排查问题的第一道防线</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesLogging" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">常见问题排查</p>
            <h2>这些是最常见的问题及其排查思路</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesTroubleshooting" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="shield" tone="muted" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.hermes-subpage {
  gap: 24px;
}
</style>