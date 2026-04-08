<script setup lang="ts">
import {
  hermesCapabilityAntiPatterns,
  hermesCapabilityArchitecture,
  getHermesRelatedPages,
  hermesCapabilityConnections,
  hermesCapabilityFitMatrix,
  hermesCapabilityPillars,
  hermesCapabilitySections,
  hermesCapabilityFlow,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 能力地图',
  description: '系统解释 Hermes Agent 的长期运行、记忆、执行、自动推进和多入口协作能力，说明它为什么更像一个长期工作的自治 agent 系统。',
  path: '/hermes-agent/capabilities',
  type: 'website',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent', to: '/hermes-agent' },
    { label: '能力地图' },
  ],
  itemList: hermesCapabilitySections.map(section => ({
    title: section.title,
    to: '/hermes-agent/capabilities',
    description: section.description,
  })),
})

const relatedPages = getHermesRelatedPages('capabilities')
</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '能力地图' },
      ]" />

      <HermesSeriesNav />

      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Capabilities</p>
          <h1 class="section-title">Hermes Agent 的能力地图</h1>
          <p class="section-copy">
            这一页不把 Hermes 拆成零散 feature list，而是解释为什么长期运行、记忆、执行、自动推进和多入口协作拼在一起后，
            它更像一个长期工作的自治 agent 系统。
          </p>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">这页负责什么</span>
            <strong>解释 Hermes 为什么成立</strong>
            <p>如果你只想先搞懂“为什么它不是普通聊天 agent”，这一页是最值得先看的分页。</p>
          </div>
          <div class="series-signal">
            <span class="series-kicker">建议读法</span>
            <p>先看 4 个能力支柱，再看各能力层如何彼此支撑，最后再决定去运行、记忆或入口页继续深挖。</p>
          </div>
        </aside>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">能力架构</p>
            <h2>把 Hermes 当成四层架构理解，比按功能列表记忆更稳</h2>
          </div>
        </div>

        <div class="series-grid-4">
          <article v-for="item in hermesCapabilityArchitecture" :key="item.layer" class="series-card">
            <span class="series-tag">{{ item.layer }}</span>
            <strong>{{ item.title }}</strong>
            <p class="series-card-copy">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">连续能力链</p>
            <h2>先从一条完整工作链看 Hermes，比分别看 feature 更容易理解</h2>
          </div>
        </div>

        <div class="capability-flow-grid">
          <article v-for="item in hermesCapabilityFlow" :key="item.step" class="series-card flow-card">
            <span class="flow-step">{{ item.step }}</span>
            <strong>{{ item.title }}</strong>
            <p class="series-card-copy">{{ item.description }}</p>
            <small>{{ item.detail }}</small>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">四个支柱</p>
            <h2>Hermes 成立，不是因为 feature 多，而是因为能力层能拼成系统</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesCapabilityPillars" :key="item.title" class="series-card pillar-card">
            <div class="series-card-top">
              <SeriesGlyph kind="stack" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.summary }}</p>
            <ul class="pillar-list">
              <li v-for="point in item.items" :key="point">{{ point }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section v-for="section in hermesCapabilitySections" :key="section.title" class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">能力分层</p>
            <h2>{{ section.title }}</h2>
            <p class="section-copy">{{ section.description }}</p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in section.items" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.body }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">能力之间的关系</p>
            <h2>真正的差异，来自这些层是互相支撑的</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesCapabilityConnections" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="orbit" tone="muted" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">适配任务矩阵</p>
            <h2>理解哪些任务最能发挥 Hermes，哪些任务不值得开太重</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesCapabilityFitMatrix" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="terminal" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <ul class="pillar-list">
              <li v-for="point in item.examples" :key="point">{{ point }}</li>
            </ul>
            <small>{{ item.note }}</small>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">反模式</p>
            <h2>这几种理解方式最容易把 Hermes 的优势“用没”</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesCapabilityAntiPatterns" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="shield" tone="muted" small />
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
            <p class="section-copy">如果这一页已经帮你立住了能力判断，下一步更适合继续看这些分页。</p>
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

.capability-flow-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}

.flow-card {
  align-content: start;
}

.flow-step {
  display: inline-flex;
  width: fit-content;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(15, 102, 116, 0.1);
  color: var(--brand);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.series-card small {
  color: var(--ink-soft);
  line-height: 1.6;
}

@media (max-width: 1120px) {
  .capability-flow-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .capability-flow-grid {
    grid-template-columns: 1fr;
  }
}
</style>
