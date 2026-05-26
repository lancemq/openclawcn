<script setup lang="ts">
import {
  hermesOperationEntryChoices,
  hermesOperationPath,
  hermesOperationSignals,
  hermesOperationsMistakes,
  hermesOperationsModes,
  hermesOperationsCases,
  hermesOperationsGuide,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 运行与使用',
  description: '解释 Hermes Agent 的典型运行形态、任务入口和长期运行思路，帮助中文用户先建立使用判断，再进入官方快速开始与功能资料。',
  path: '/hermes-agent/operations',
  type: 'website',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent', to: '/hermes-agent' },
    { label: '运行与使用' },
  ],
})

</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '运行与使用' },
      ]" />

      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Operations</p>
          <h1 class="section-title">Hermes Agent 的运行与使用</h1>
          <p class="section-copy">
            这一页不是安装教程，而是帮助你理解 Hermes 真正在怎样的运行语境下成立：它从哪里接任务、
            哪些入口更适合起步、什么时候算进入长期运行，以及人类应该如何低成本接管。
          </p>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">这页负责什么</span>
            <strong>解释 Hermes 真正怎么跑</strong>
            <p>如果你最关心“这套系统实际怎么用”，这一页比能力地图页更适合先读。</p>
          </div>
        </aside>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">运行形态</p>
            <h2>不要只问它能不能启动，更要问它在什么形态下成立</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesOperationsModes" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="pulse" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.summary }}</p>
            <ul class="pillar-list">
              <li v-for="point in item.signals" :key="point">{{ point }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">从启动到长期运行</p>
            <h2>更稳的理解路径，不是“装完就长期在线”</h2>
          </div>
        </div>

        <div class="series-grid-4">
          <article v-for="item in hermesOperationPath" :key="item.title" class="series-card">
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
            <p class="eyebrow">入口判断</p>
            <h2>不同入口，不只是体验不同，而是工作方式不同</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesOperationEntryChoices" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="terminal" tone="accent" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.fit }}</p>
            <small>{{ item.why }}</small>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">常见误区</p>
            <h2>这几种误解，会让 Hermes 看起来比实际更难用</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesOperationsMistakes" :key="item.title" class="series-card">
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
            <p class="eyebrow">真正该观察什么</p>
            <h2>一套系统是否已经进入“可长期运行”状态，通常看这三件事</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesOperationSignals" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="pulse" tone="muted" small />
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
            <h2>从零开始运行 Hermes，建议按这个节奏推进</h2>
          </div>
        </div>

        <div class="series-grid-4">
          <article v-for="item in hermesOperationsGuide" :key="item.step" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="brand" small />
              <span class="flow-step">{{ item.step }}</span>
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
            <h2>真实团队是怎么选择入口和运行方式的</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesOperationsCases" :key="item.title" class="series-card">
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
</style>
