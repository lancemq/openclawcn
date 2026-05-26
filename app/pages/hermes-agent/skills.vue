<script setup lang="ts">
import {
  hermesSkillsOverview,
  hermesSkillTypes,
  hermesSkillDevProcess,
  hermesSkillBestPractices,
  hermesSkillMistakes,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 技能开发指南',
  description: '从技能类型、开发流程到发布部署的完整指南，帮助你为 Hermes Agent 编写可复用的自定义技能。',
  path: '/hermes-agent/skills',
  type: 'website',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent', to: '/hermes-agent' },
    { label: '技能开发指南' },
  ],
})

</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '技能开发指南' },
      ]" />

      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Skills</p>
          <h1 class="section-title">Hermes Agent 的技能开发指南</h1>
          <p class="section-copy">
            技能是把 Hermes 从"开箱能用"推向"越用越强"的关键机制。这一页专门讲怎么写技能、
            有哪些类型的技能、开发流程怎么走，以及最容易踩的坑。
          </p>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">这页负责什么</span>
            <strong>指导你编写 Hermes 技能</strong>
            <p>如果你已经跑通了 Hermes 的基础链路，想开始为它添加自定义能力，这一页最适合你。</p>
          </div>
        </aside>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">技能认知</p>
            <h2>先搞清技能是什么，不是什么</h2>
          </div>
        </div>

        <div class="series-grid-4">
          <article v-for="item in hermesSkillsOverview" :key="item.title" class="series-card">
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
            <p class="eyebrow">技能分类</p>
            <h2>不同任务适合不同类型的技能</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesSkillTypes" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.summary }}</p>
            <ul class="pillar-list">
              <li v-for="ex in item.examples" :key="ex">{{ ex }}</li>
            </ul>
            <small>{{ item.note }}</small>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">开发流程</p>
            <h2>从想法到可调用技能，通常走这五步</h2>
          </div>
        </div>

        <div class="skill-process">
          <article v-for="item in hermesSkillDevProcess" :key="item.stage" class="series-card process-card">
            <span class="process-step">{{ item.stage }}</span>
            <strong>{{ item.title }}</strong>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">最佳实践</p>
            <h2>值得长期坚持的几条技能编写原则</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesSkillBestPractices" :key="item.title" class="series-card">
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
            <p class="eyebrow">常见误区</p>
            <h2>这些写法最容易让技能的价值打折扣</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesSkillMistakes" :key="item.title" class="series-card">
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

.skill-process {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}

.process-card {
  align-content: start;
}

.process-step {
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

@media (max-width: 1120px) {
  .skill-process {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .skill-process {
    grid-template-columns: 1fr;
  }
}
</style>