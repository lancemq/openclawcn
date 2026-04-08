<script setup lang="ts">
import {
  getHermesRelatedPages,
  hermesSurfacePatterns,
  hermesSurfaces,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 的自动化、浏览器与入口',
  description: '解释 Hermes Agent 如何通过 CLI、消息入口、浏览器控制和自动化任务接触外部世界，并说明这些入口为什么会改变 agent 的工作方式。',
  path: '/hermes-agent/automation-and-surfaces',
  type: 'website',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent', to: '/hermes-agent' },
    { label: '自动化、浏览器与入口' },
  ],
})

const relatedPages = getHermesRelatedPages('automation-and-surfaces')
</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '自动化、浏览器与入口' },
      ]" />

      <HermesSeriesNav />

      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Surfaces</p>
          <h1 class="section-title">Hermes 如何接到任务，并接触真实世界</h1>
          <p class="section-copy">
            一旦 agent 能通过 CLI、消息、浏览器和自动化任务进入真实工作流，它就不再只是一个解释工具，
            而更像一个持续运转的执行面。这一页专门解释这些入口如何改变 Hermes 的工作方式。
          </p>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">这页负责什么</span>
            <strong>解释 Hermes 的外部接面</strong>
            <p>如果你更关心 Hermes 怎么接任务、怎么触发、怎么操作网页和自动推进，这一页最适合先看。</p>
          </div>
        </aside>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">四个接面</p>
            <h2>不同入口，不只是 UI 不同，而是工作结构不同</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesSurfaces" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="terminal" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">结构影响</p>
            <h2>入口越真实，Hermes 越像系统而不是聊天界面</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesSurfacePatterns" :key="item.title" class="series-card">
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
            <p class="eyebrow">继续阅读</p>
            <p class="section-copy">如果你已经理解入口与触发面，下一步通常会回到运行页或安全页继续判断。</p>
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
</style>
