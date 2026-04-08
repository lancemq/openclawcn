<script setup lang="ts">
import {
  getHermesRelatedPages,
  hermesMemoryFitTasks,
  hermesMemoryLoops,
  hermesMemoryOverkill,
  hermesMemoryPillars,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 的记忆、技能与子 Agent',
  description: '解释 Hermes Agent 为什么会随着运行时间变强，重点说明长期记忆、技能积累和子 agent 协作如何形成持续复利。',
  path: '/hermes-agent/memory-and-skills',
  type: 'website',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent', to: '/hermes-agent' },
    { label: '记忆、技能与子 Agent' },
  ],
})

const relatedPages = getHermesRelatedPages('memory-and-skills')
</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '记忆、技能与子 Agent' },
      ]" />

      <HermesSeriesNav />

      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Memory, Skills, Subagents</p>
          <h1 class="section-title">为什么 Hermes 会随着运行时间变强</h1>
          <p class="section-copy">
            Hermes 最有辨识度的一层，不在于“能不能回答”，而在于它是否能在长期运行中逐渐积累能力。
            这页专门解释记忆、技能和子 agent 三者如何一起形成长期复利。
          </p>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">这页负责什么</span>
            <strong>解释 Hermes 的长期积累机制</strong>
            <p>如果你最在意它为什么不是一次性 agent，这一页和能力地图页一起构成 Hermes 的核心差异说明。</p>
          </div>
        </aside>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">四个判断</p>
            <h2>长期记忆、技能和子 Agent，不是附加项，而是 Hermes 的成长引擎</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesMemoryPillars" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="orbit" tone="accent" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">复利回路</p>
            <h2>Hermes 的“越跑越强”，不是抽象口号，而是一条连续回路</h2>
          </div>
        </div>

        <div class="memory-loop">
          <article v-for="item in hermesMemoryLoops" :key="item.step" class="series-card loop-card">
            <span class="loop-step">{{ item.step }}</span>
            <strong>{{ item.title }}</strong>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="hermes-dual-grid">
        <section class="card series-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">最适合体现价值的任务</p>
              <h2>这些任务最能看出长期积累的意义</h2>
            </div>
          </div>

          <div class="resource-stack">
            <article v-for="item in hermesMemoryFitTasks" :key="item.title" class="series-card">
              <div class="series-card-top">
                <SeriesGlyph kind="flow" tone="brand" small />
                <strong>{{ item.title }}</strong>
              </div>
              <p class="series-card-copy">{{ item.description }}</p>
            </article>
          </div>
        </section>

        <section class="card series-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">不值得开太重的场景</p>
              <h2>不是所有任务都需要完整的长期积累机制</h2>
            </div>
          </div>

          <div class="resource-stack">
            <article v-for="item in hermesMemoryOverkill" :key="item.title" class="series-card">
              <div class="series-card-top">
                <SeriesGlyph kind="shield" tone="muted" small />
                <strong>{{ item.title }}</strong>
              </div>
              <p class="series-card-copy">{{ item.description }}</p>
            </article>
          </div>
        </section>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">继续阅读</p>
            <p class="section-copy">理解完成长机制后，下一步通常会回到能力、运行、入口或安全页继续收口。</p>
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

.resource-stack {
  display: grid;
  gap: 16px;
}

.memory-loop {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.loop-step {
  display: inline-flex;
  width: fit-content;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(138, 90, 36, 0.12);
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.loop-card {
  align-content: start;
}

.hermes-dual-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 980px) {
  .memory-loop {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .memory-loop,
  .hermes-dual-grid {
    grid-template-columns: 1fr;
  }
}
</style>
