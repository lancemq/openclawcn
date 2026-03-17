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

const learnEntries = [
  {
    title: '二次开发专题',
    description: '如果你不只是浏览生态，而是准备真正开始扩展，先进入技能、插件、Hooks 和 ClawHub 的开发专题。',
    to: '/secondary-development',
    meta: '开发',
  },
  {
    title: '工具系列',
    description: '把插件、自动化、Exec、Hooks 和扩展边界放在统一能力图里理解。',
    to: '/tools',
    meta: '工具',
  },
  {
    title: 'Skills',
    description: '如果你更关心现成能力和安装方式，继续到 Skills 页按类型和场景筛选。',
    to: '/skills',
    meta: '能力包',
  },
  {
    title: '案例展示',
    description: '想判断生态能力在真实场景里怎么落地，可以回到案例页继续看应用面。',
    to: '/showcase',
    meta: '案例',
  },
]
</script>

<template>
  <section class="section">
    <div class="container series-page">
      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Ecosystem</p>
          <h1 class="section-title">生态中心</h1>
          <p class="section-copy">
            这里主要帮你看清 OpenClaw 的生态全貌，再决定下一步是去装现成能力、研究工具边界，还是进入真正的二次开发。
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
            <p>先从现成能力建立直觉，再逐步进入渠道接入、第三方系统和更深入的扩展能力。</p>
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
            <p class="eyebrow">交叉访问</p>
            <p class="section-copy">生态中心负责看全貌，但真正行动时通常还要继续进入开发、工具、Skills 和案例页承接。</p>
          </div>
        </div>
        <div class="series-grid-4">
          <NuxtLink v-for="item in learnEntries" :key="item.to" :to="item.to" class="series-link-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="muted" small />
              <span class="series-tag">{{ item.meta }}</span>
            </div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Featured</p>
            <p class="section-copy">先看代表性项目，快速判断生态能力已经覆盖到什么程度。</p>
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
            <p class="eyebrow">更多入口</p>
            <p class="section-copy">如果你已经知道要往哪条线继续，就从这里切回更具体的承接页。</p>
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
