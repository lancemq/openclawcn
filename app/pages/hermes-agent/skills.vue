<script setup lang="ts">
import {
  hermesSkillsOverview,
  hermesSkillTypes,
  hermesSkillDevProcess,
  hermesSkillBestPractices,
  hermesSkillMistakes,
  hermesSkillCases,
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

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">案例印证</p>
            <h2>这些技能在真实场景中是怎么落地的</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesSkillCases" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="pulse" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.scenario }}</p>
            <div class="scenario-meta">
              <div>
                <span class="series-kicker">做法</span>
                <p>{{ item.approach }}</p>
              </div>
              <div>
                <span class="series-kicker">效果</span>
                <p>{{ item.result }}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">官方资源</p>
            <h2>更多技能开发参考</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="stack" tone="brand" small />
              <strong>ClawHub 技能市场</strong>
            </div>
            <p class="series-card-copy">浏览和安装社区贡献的 349+ 技能。</p>
            <a href="https://clawhub.ai" target="_blank" rel="noopener" class="series-link">访问 ClawHub →</a>
          </article>
          <article class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <strong>技能开发文档</strong>
            </div>
            <p class="series-card-copy">官方技能开发完整指南和 API 参考。</p>
            <a href="https://docs.openclaw.ai/tools/creating-skills" target="_blank" rel="noopener" class="series-link">查看文档 →</a>
          </article>
          <article class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="pulse" tone="brand" small />
              <strong>技能 Workshop</strong>
            </div>
            <p class="series-card-copy">Agent 起草技能提案，你审核后生效。</p>
            <a href="https://docs.openclaw.ai/tools/skill-workshop" target="_blank" rel="noopener" class="series-link">了解 Workshop →</a>
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

.scenario-meta {
  display: grid;
  gap: 12px;
}

.scenario-meta > div {
  display: grid;
  gap: 6px;
  padding-top: 10px;
  border-top: 1px solid rgba(64, 73, 85, 0.08);
}

.scenario-meta p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.6;
}

.series-link {
  display: inline-flex;
  align-items: center;
  margin-top: 8px;
  color: var(--brand);
  font-size: 0.84rem;
  font-weight: 600;
  text-decoration: none;
}

.series-link:hover {
  text-decoration: underline;
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