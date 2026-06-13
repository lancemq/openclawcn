<script setup lang="ts">
import {
  hermesBrowserAndAutomationNotes,
  hermesSurfaceCases,
  hermesSurfaceAntiPatterns,
  hermesSurfaceMatrix,
  hermesSurfacePath,
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

</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '自动化、浏览器与入口' },
      ]" />

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
            <p class="eyebrow">入口选择矩阵</p>
            <h2>不同接面更适合承接不同类型的任务</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesSurfaceMatrix" :key="item.surface" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="terminal" tone="brand" small />
              <strong>{{ item.surface }}</strong>
            </div>
            <p class="series-card-copy">{{ item.bestFor }}</p>
            <small>{{ item.tradeoff }}</small>
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
            <p class="eyebrow">浏览器与自动化补充</p>
            <h2>这两类能力最容易让 Hermes 从“解释者”变成“执行者”</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesBrowserAndAutomationNotes" :key="item.title" class="series-card">
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
            <p class="eyebrow">案例印证</p>
            <h2>真实世界中入口是怎么组合使用的</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesSurfaceCases" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="terminal" tone="brand" small />
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
            <p class="eyebrow">反模式</p>
            <h2>入口配置中这些做法最容易出问题</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesSurfaceAntiPatterns" :key="item.title" class="series-card">
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
            <p class="eyebrow">实操路径</p>
            <h2>入口启用的推荐顺序</h2>
          </div>
        </div>

        <div class="series-grid-4">
          <article v-for="item in hermesSurfacePath" :key="item.step" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <span class="process-step">{{ item.step }}</span>
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">官方资源</p>
            <h2>更多入口和自动化参考</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="stack" tone="brand" small />
              <strong>频道配置文档</strong>
            </div>
            <p class="series-card-copy">官方频道接入完整指南，覆盖 Telegram、WhatsApp、Discord 等。</p>
            <a href="https://docs.openclaw.ai/channels" target="_blank" rel="noopener" class="series-link">查看频道文档 →</a>
          </article>
          <article class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <strong>自动化文档</strong>
            </div>
            <p class="series-card-copy">定时任务、Cron 和事件触发的完整配置。</p>
            <a href="https://docs.openclaw.ai/automation" target="_blank" rel="noopener" class="series-link">查看自动化文档 →</a>
          </article>
          <article class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="pulse" tone="brand" small />
              <strong>浏览器控制</strong>
            </div>
            <p class="series-card-copy">浏览器能力和多步骤网页操作指南。</p>
            <a href="https://docs.openclaw.ai/tools/browser" target="_blank" rel="noopener" class="series-link">查看浏览器文档 →</a>
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
</style>
