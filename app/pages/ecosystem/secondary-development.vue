<script setup lang="ts">
import {
  secondaryDevelopmentCrossLinks,
  secondaryDevelopmentReadingPath,
  secondaryDevelopmentScenarios,
  secondaryDevelopmentSignals,
  secondaryDevelopmentSources,
  secondaryDevelopmentStats,
  secondaryDevelopmentTracks,
} from '~/data/ecosystem-development'

useSeo({
  title: '二次开发专题',
  description: '围绕 Skills、Plugins、Hooks、HTTP Routes 和 ClawHub，整理 OpenClaw 二次开发的官方资料、实现路径和阅读顺序。',
  path: '/ecosystem/secondary-development',
  type: 'website',
})
</script>

<template>
  <section class="section">
    <div class="container collection-page development-page">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: '生态中心', to: '/ecosystem' },
        { label: '二次开发专题' },
      ]" />

      <section class="collection-hero development-hero">
        <div class="card collection-main development-main">
          <p class="eyebrow">Secondary Development</p>
          <h1 class="section-title">OpenClaw 二次开发专题</h1>
          <p class="section-copy">
            这一页不是泛泛而谈“能不能扩展”，而是帮你判断: 你的需求更适合写
            skill、写 plugin、接 hook，还是只做一个可控的 HTTP / webhook 入口。
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
            <span class="mini-label">资料边界</span>
            <strong>本专题以 2026 年 3 月 16 日可访问的官方资料为主。</strong>
            <p>优先采用 OpenClaw 官方文档中的 Skills、Plugins、ClawHub 和 Plugin API 页面，不混用二手教程。</p>
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

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Choose Path</p>
            <h2>先选扩展形态，再开始动手</h2>
            <p class="section-copy">很多“二开”其实不需要上来就写完整插件。先选对形态，后面的维护成本会差很多。</p>
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
                <span class="mini-label">适合场景</span>
                <p>{{ track.fit }}</p>
              </div>
              <div>
                <span class="mini-label">典型产物</span>
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
            <p class="eyebrow">Reading Path</p>
            <h2>更稳的阅读顺序</h2>
            <p class="section-copy">如果你要把这个专题发给团队同事，建议按下面的顺序看，不容易一开始就把工程复杂度拉满。</p>
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
            <h2>常见二开需求，应该从哪条路切入</h2>
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
            <p class="section-copy">下面这些是这次专题整理时最值得直接打开的原始资料。</p>
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

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Cross Access</p>
            <h2>继续回到站内相关专题</h2>
            <p class="section-copy">二次开发最终还是要和站内已有的插件、触发、技能和配置内容交叉阅读。</p>
          </div>
        </div>

        <div class="series-grid-2">
          <NuxtLink
            v-for="link in secondaryDevelopmentCrossLinks"
            :key="link.to"
            :to="link.to"
            class="series-link-card"
          >
            <div class="series-card-top">
              <SeriesGlyph kind="orbit" tone="muted" small />
              <span class="series-tag">{{ link.meta }}</span>
            </div>
            <strong>{{ link.title }}</strong>
            <p>{{ link.description }}</p>
          </NuxtLink>
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
.reading-path {
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
.track-meta p,
.path-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.65;
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
  .track-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .stats-grid,
  .track-links,
  .path-card {
    grid-template-columns: 1fr;
  }
}
</style>
