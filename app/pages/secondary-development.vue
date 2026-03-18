<script setup lang="ts">
import {
  secondaryDevelopmentReadingPath,
  secondaryDevelopmentScenarios,
  secondaryDevelopmentSignals,
  secondaryDevelopmentSources,
  secondaryDevelopmentStats,
  secondaryDevelopmentTracks,
} from '~/data/ecosystem-development'

useSeo({
  title: '二次开发',
  description: '围绕 Skills、Plugins、Hooks、HTTP Routes 和 ClawHub，整理 OpenClaw 二次开发的主要方向、应用场景与官方资料。',
  path: '/secondary-development',
  type: 'website',
})

const developmentBriefs = [
  {
    title: '适用对象',
    body: '面向希望扩展 OpenClaw 能力的开发者、技术团队、内部平台团队与自动化工作流维护者。',
  },
  {
    title: '典型产出',
    body: '技能包、插件包、Hook / Webhook 入口、HTTP 路由、公开分发的能力包与团队内部复用组件。',
  },
  {
    title: '开发入口',
    body: '优先查看 Skills、Plugins、ClawHub 与 Plugin API 文档，再根据接入目标选择本地调试或公开发布路径。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container collection-page development-page">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: '生态中心', to: '/ecosystem' },
        { label: '二次开发' },
      ]" />

      <section class="collection-hero development-hero">
        <div class="card collection-main development-main">
          <p class="eyebrow">Secondary Development</p>
          <h1 class="section-title">OpenClaw 二次开发</h1>
          <p class="section-copy">
            围绕 Skills、Plugins、Hooks、HTTP Routes 和 ClawHub，集中整理 OpenClaw 常见的二次开发方向、应用场景和官方资料入口。
          </p>

          <div class="collection-utility">
            <article
              v-for="stat in secondaryDevelopmentStats.slice(0, 2)"
              :key="stat.label"
              class="collection-utility-item"
            >
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side development-side">
          <div class="collection-summary">
            <span class="mini-label">内容来源</span>
            <strong>本页基于 2026 年 3 月 16 日可访问的公开官方资料整理。</strong>
            <p>相关说明主要来自 OpenClaw 官方文档中的 Skills、Plugins、ClawHub 与 Plugin API 页面。</p>
          </div>

          <div v-for="signal in secondaryDevelopmentSignals" :key="signal.label" class="collection-summary">
            <span class="mini-label">{{ signal.label }}</span>
            <p>{{ signal.value }}：{{ signal.note }}</p>
          </div>
        </aside>
      </section>

      <div class="grid stats-grid">
        <article v-for="stat in secondaryDevelopmentStats" :key="stat.label" class="card stat-card">
          <span class="stat-value">{{ stat.value }}</span>
          <strong class="stat-label">{{ stat.label }}</strong>
          <p class="stat-note">{{ stat.note }}</p>
        </article>
      </div>

      <section class="brief-grid">
        <article v-for="item in developmentBriefs" :key="item.title" class="card brief-card">
          <span class="mini-label">{{ item.title }}</span>
          <p>{{ item.body }}</p>
        </article>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Development Types</p>
            <h2>主要开发形态</h2>
            <p class="section-copy">根据任务封装、能力接入、事件联动和公开分发等不同目标，OpenClaw 的二次开发通常会落到下面几类形态。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="track in secondaryDevelopmentTracks" :key="track.title" class="series-card development-track">
            <div class="series-card-top">
              <SeriesGlyph kind="grid" tone="brand" small />
              <span class="series-tag">{{ track.title }}</span>
            </div>
            <p class="series-card-copy">{{ track.description }}</p>
            <div class="track-meta">
              <div>
                <span class="mini-label">常见场景</span>
                <p>{{ track.fit }}</p>
              </div>
              <div>
                <span class="mini-label">交付形式</span>
                <p>{{ track.output }}</p>
              </div>
            </div>
            <div class="track-links">
              <template v-for="link in track.links" :key="link.label">
                <a
                  v-if="'href' in link"
                  :href="link.href"
                  target="_blank"
                  rel="noreferrer"
                  class="series-pill-link"
                >
                  {{ link.label }}
                </a>
                <NuxtLink
                  v-else
                  :to="link.to"
                  class="series-pill-link"
                >
                  {{ link.label }}
                </NuxtLink>
              </template>
            </div>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Development Process</p>
            <h2>常见开发流程</h2>
            <p class="section-copy">从明确目标到确定运行边界，再到分发与复用，是 OpenClaw 二次开发中更常见的推进方式。</p>
          </div>
        </div>

        <div class="reading-path">
          <article v-for="(item, index) in secondaryDevelopmentReadingPath" :key="item.title" class="path-card">
            <span class="path-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Scenarios</p>
            <h2>常见应用场景</h2>
          </div>
        </div>

        <div class="series-grid-2 scenario-grid">
          <article v-for="item in secondaryDevelopmentScenarios" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <span class="series-tag highlight">{{ item.path }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="series-card-copy">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Official Sources</p>
            <h2>官方资料索引</h2>
            <p class="section-copy">下面这些公开资料可直接用于了解 OpenClaw 二次开发中的技能、插件、Hook 与 HTTP 接口能力。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="source in secondaryDevelopmentSources" :key="source.href" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="spark" tone="accent" small />
              <span class="series-tag">{{ source.source }}</span>
            </div>
            <h3>{{ source.title }}</h3>
            <p class="series-card-copy">{{ source.summary }}</p>
            <a :href="source.href" target="_blank" rel="noreferrer" class="series-pill-link">
              打开原文
            </a>
          </article>
        </div>
      </section>

    </div>
  </section>
</template>

<style scoped>
.development-page,
.development-side,
.track-meta,
.track-links,
.reading-path,
.brief-grid {
  display: grid;
  gap: 16px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.stat-card {
  display: grid;
  gap: 6px;
  padding: 20px;
  text-align: center;
}

.stat-value {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.8rem;
  color: var(--brand);
  line-height: 1.1;
}

.stat-label {
  font-size: 0.95rem;
}

.stat-note,
.brief-card p,
.track-meta p,
.path-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.65;
}

.brief-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.brief-card {
  display: grid;
  gap: 8px;
  padding: 18px;
}

.development-track,
.path-card {
  display: grid;
  gap: 12px;
}

.track-links {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.path-card {
  grid-template-columns: auto 1fr;
  align-items: start;
  padding: 16px 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.46);
}

.path-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.12);
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.path-card strong {
  display: block;
  margin-bottom: 6px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.04rem;
}

.scenario-grid {
  gap: 14px;
}

@media (max-width: 960px) {
  .stats-grid,
  .track-links,
  .brief-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .stats-grid,
  .track-links,
  .brief-grid,
  .path-card {
    grid-template-columns: 1fr;
  }
}
</style>
