<script setup lang="ts">
import { ecosystemQuickLinks, ecosystemSections, ecosystemSignals, ecosystemStats } from '~/data/ecosystem'

useSeo({
  title: '生态中心',
  description: '探索 OpenClaw 生态系统，包括 ClawHub 技能市场、插件生态、第三方集成和社区项目。',
  path: '/ecosystem',
  type: 'website',
})

const featuredItems = computed(() =>
  ecosystemSections.flatMap(section =>
    section.items.filter(item => item.featured).map(item => ({
      ...item,
      sectionTitle: section.title,
    })),
  ),
)
</script>

<template>
  <section class="section">
    <div class="container series-page">
      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Ecosystem</p>
          <h1 class="section-title">生态中心</h1>
          <p class="section-copy">
            OpenClaw 拥有丰富的生态系统，包括技能市场、插件系统、第三方集成和社区项目。这一页帮助你快速了解生态全貌，找到适合你的扩展方向。
          </p>

          <div class="series-grid-2">
            <article v-for="stat in ecosystemStats.slice(0, 2)" :key="stat.label" class="series-card">
              <div class="series-card-top">
                <SeriesGlyph kind="orbit" tone="accent" small />
                <span class="series-kicker">{{ stat.label }}</span>
              </div>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">生态概览</span>
            <strong>技能、插件、集成、社区四位一体</strong>
            <p>从 ClawHub 技能开始，再扩展到渠道接入和第三方系统集成，逐步构建你的专属助手。</p>
          </div>

          <div v-for="signal in ecosystemSignals.slice(0, 2)" :key="signal.label" class="series-signal">
            <span class="series-kicker">{{ signal.label }}</span>
            <p>{{ signal.value }}：{{ signal.note }}</p>
          </div>
        </aside>
      </section>

      <div class="series-grid-4">
        <article v-for="stat in ecosystemStats" :key="stat.label" class="series-stat-card stat-card">
          <span class="series-kicker">{{ stat.label }}</span>
          <span class="series-stat-value">{{ stat.value }}</span>
          <p>{{ stat.note }}</p>
        </article>
      </div>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Featured</p>
            <p class="section-copy">热门生态项目，帮助你快速上手。</p>
          </div>
        </div>
        <div class="series-grid-3">
          <article v-for="item in featuredItems" :key="item.title" class="series-card">
            <div class="series-card-top section-meta">
              <SeriesGlyph kind="spark" tone="accent" small />
              <div class="series-meta">
                <span class="series-tag">{{ item.category }}</span>
                <span v-if="item.stats" class="series-tag highlight">{{ item.stats }}</span>
              </div>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="series-card-copy">{{ item.description }}</p>
            <div class="series-tag-row">
              <span v-for="tag in item.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </article>
        </div>
      </section>

      <section v-for="section in ecosystemSections" :key="section.id" :id="section.id" class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">{{ section.eyebrow }}</p>
            <h2>{{ section.title }}</h2>
            <p class="section-copy">{{ section.description }}</p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in section.items" :key="item.title" class="series-card">
            <div class="series-card-top section-meta">
              <SeriesGlyph kind="grid" tone="brand" small />
              <div class="series-meta">
                <span class="series-tag">{{ item.category }}</span>
                <span v-if="item.stats" class="series-tag highlight">{{ item.stats }}</span>
              </div>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="series-card-copy">{{ item.description }}</p>
            <div class="series-tag-row">
              <span v-for="tag in item.tags.slice(0, 4)" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <a
              v-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noreferrer"
              class="series-pill-link"
            >
              {{ item.sourceLabel || '查看详情' }}
            </a>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Quick Links</p>
            <p class="section-copy">快速进入生态相关入口。</p>
          </div>
        </div>
        <div class="series-grid-3">
          <NuxtLink v-for="link in ecosystemQuickLinks" :key="link.to" :to="link.to" class="series-link-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="muted" small />
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
.stat-card {
  text-align: center;
}

.section-meta {
  align-items: flex-start;
}
</style>
