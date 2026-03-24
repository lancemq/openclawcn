<script setup lang="ts">
import { siteUpdates } from '~/data/site-updates'

useSeo({
  title: '网站更新',
  description: '集中查看 OpenClawCN 中文资料站近期的页面调整、内容补充、导航优化和体验更新记录。',
  path: '/updates',
})

const groupedUpdates = computed(() => {
  const groups = new Map<string, typeof siteUpdates>()

  for (const item of siteUpdates) {
    const [year, month] = item.date.split('-')
    const key = `${year} 年 ${month} 月`
    const items = groups.get(key) || []
    items.push(item)
    groups.set(key, items)
  }

  return Array.from(groups.entries()).map(([label, items]) => ({
    label,
    count: items.length,
    items,
  }))
})

const totalChanges = computed(() => siteUpdates.length)
const totalActions = computed(() => siteUpdates.reduce((sum, item) => sum + item.items.length, 0))
const updateTypes = computed(() => Array.from(new Set(siteUpdates.map(item => item.type))))
</script>

<template>
  <section class="section">
    <div class="container updates-page">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: '动态', to: '/news' },
        { label: '网站更新' },
      ]" />

      <section class="updates-hero">
        <div class="hero-main">
          <p class="eyebrow">Website Changelog</p>
          <h1 class="hero-title">把中文站近期的重要变化，整理成一份可追踪的更新日志。</h1>
          <p class="hero-copy">
            这里不只记录“新加了什么”，也记录结构调整、文案修订、性能优化、导航修复和内容补充，方便长期关注站点的人快速了解最近发生了什么。
          </p>

          <div class="hero-metrics">
            <article class="metric-card">
              <span class="metric-value">{{ totalChanges }}</span>
              <strong>更新记录</strong>
              <p>按日期持续追加，避免重要修订散落在多个页面里。</p>
            </article>
            <article class="metric-card">
              <span class="metric-value">{{ totalActions }}</span>
              <strong>具体变更项</strong>
              <p>每条记录都尽量拆成可识别的动作，而不是只给一个抽象标题。</p>
            </article>
          </div>
        </div>

        <aside class="hero-side">
          <section class="hero-panel card">
            <span class="mini-label">覆盖范围</span>
            <div class="type-cloud">
              <span v-for="item in updateTypes" :key="item" class="type-chip">{{ item }}</span>
            </div>
            <p>优先覆盖内容、导航、专题、性能和支持相关的重要修订。</p>
          </section>

          <section class="hero-panel card">
            <span class="mini-label">相关入口</span>
            <div class="entry-links">
              <NuxtLink to="/community" class="entry-link">
                <strong>社区支持</strong>
                <p>查看问题分流、协作入口和支持方式。</p>
              </NuxtLink>
              <NuxtLink to="/news" class="entry-link">
                <strong>新闻动态</strong>
                <p>查看 OpenClaw 产品、生态和中文信息跟踪内容。</p>
              </NuxtLink>
            </div>
          </section>
        </aside>
      </section>

      <section class="timeline-shell">
        <aside class="timeline-index card">
          <span class="mini-label">索引</span>
          <div class="month-nav">
            <a v-for="group in groupedUpdates" :key="group.label" :href="`#${group.label}`" class="month-link">
              <strong>{{ group.label }}</strong>
              <span>{{ group.count }} 条</span>
            </a>
          </div>
        </aside>

        <section class="timeline-groups">
          <section
            v-for="group in groupedUpdates"
            :id="group.label"
            :key="group.label"
            class="month-group"
          >
            <div class="month-head">
              <div>
                <p class="eyebrow">Monthly Log</p>
                <h2>{{ group.label }}</h2>
              </div>
              <span class="month-count">{{ group.count }} 条更新</span>
            </div>

            <div class="updates-list">
              <article v-for="item in group.items" :key="`${item.date}-${item.title}`" class="card update-card">
                <div class="update-rail" aria-hidden="true"></div>
                <div class="update-body">
                  <div class="update-head">
                    <div class="update-meta">
                      <span class="update-date">{{ item.date }}</span>
                      <span class="update-type">{{ item.type }}</span>
                      <span class="update-impact">{{ item.impact }}</span>
                    </div>
                    <h3>{{ item.title }}</h3>
                  </div>
                  <p class="update-summary">{{ item.summary }}</p>
                  <ul class="update-items">
                    <li v-for="point in item.items" :key="point">{{ point }}</li>
                  </ul>
                </div>
              </article>
            </div>
          </section>
        </section>
      </section>
    </div>
  </section>
</template>

<style scoped>
.updates-page,
.timeline-groups,
.updates-list,
.month-group,
.hero-side,
.hero-panel,
.entry-links,
.month-nav,
.hero-metrics {
  display: grid;
  gap: 18px;
}

.updates-page {
  gap: 24px;
}

.updates-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.22fr) minmax(300px, 0.78fr);
  gap: 18px;
  align-items: start;
}

.hero-main {
  position: relative;
  display: grid;
  gap: 20px;
  padding: 30px 32px;
  border: 1px solid rgba(12, 108, 105, 0.14);
  border-radius: 34px;
  background:
    radial-gradient(circle at top left, rgba(19, 129, 125, 0.14), transparent 32%),
    radial-gradient(circle at 92% 18%, rgba(166, 111, 44, 0.16), transparent 26%),
    linear-gradient(180deg, rgba(255, 252, 247, 0.96), rgba(247, 240, 227, 0.98));
  box-shadow: 0 26px 54px rgba(64, 49, 27, 0.12);
  overflow: hidden;
}

.hero-main::after {
  content: "";
  position: absolute;
  right: -36px;
  bottom: -46px;
  width: 180px;
  height: 180px;
  border-radius: 32px;
  transform: rotate(18deg);
  background:
    linear-gradient(145deg, rgba(19, 129, 125, 0.12), rgba(255, 255, 255, 0.16)),
    rgba(255, 255, 255, 0.44);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.hero-title {
  max-width: 16ch;
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: clamp(1.52rem, 2.4vw, 2.45rem);
  line-height: 1.04;
  letter-spacing: -0.05em;
}

.hero-copy {
  max-width: 62ch;
  margin: 0;
  color: var(--ink-soft);
  font-size: 1rem;
  line-height: 1.76;
}

.hero-metrics {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.metric-card,
.entry-link {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.62);
}

.metric-value {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.9rem;
  line-height: 1;
  color: var(--brand);
}

.metric-card strong,
.hero-panel strong,
.entry-link strong,
.month-head h2,
.update-head h3,
.month-link strong {
  font-family: "Fraunces", "Times New Roman", serif;
}

.metric-card strong,
.hero-panel strong,
.entry-link strong {
  font-size: 1rem;
  line-height: 1.34;
}

.metric-card p,
.hero-panel p,
.entry-link p,
.update-summary,
.update-items,
.month-link span {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.66;
}

.hero-panel {
  padding: 18px;
}

.type-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.type-chip,
.update-date,
.update-type,
.update-impact,
.month-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.type-chip,
.update-date {
  background: rgba(234, 215, 182, 0.42);
  color: var(--accent);
}

.timeline-shell {
  display: grid;
  grid-template-columns: minmax(220px, 0.34fr) minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.timeline-index {
  position: sticky;
  top: 130px;
  padding: 18px;
}

.month-nav {
  gap: 10px;
}

.month-link {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.48);
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.month-link:hover {
  transform: translateY(-1px);
  border-color: rgba(12, 108, 105, 0.18);
  background: rgba(255, 255, 255, 0.72);
}

.month-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
}

.month-head h2 {
  margin: 0;
  font-size: 1.26rem;
  line-height: 1.24;
  letter-spacing: -0.04em;
}

.month-count {
  background: rgba(15, 118, 110, 0.08);
  color: var(--brand);
}

.update-card {
  display: grid;
  grid-template-columns: 8px minmax(0, 1fr);
  gap: 16px;
  padding: 18px 20px;
}

.update-rail {
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(15, 118, 110, 0.86), rgba(166, 111, 44, 0.42));
}

.update-body,
.update-head {
  display: grid;
  gap: 10px;
}

.update-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.update-type {
  background: rgba(15, 118, 110, 0.08);
  color: var(--brand);
}

.update-impact {
  background: rgba(59, 86, 127, 0.08);
  color: #35557a;
}

.update-head h3 {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.38;
  letter-spacing: -0.03em;
}

.update-items {
  padding-left: 18px;
}

.update-items li + li {
  margin-top: 6px;
}

@media (max-width: 1024px) {
  .updates-hero,
  .timeline-shell {
    grid-template-columns: 1fr;
  }

  .timeline-index {
    position: static;
  }

  .month-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .hero-metrics,
  .month-nav {
    grid-template-columns: 1fr;
  }

  .hero-main {
    padding: 24px 20px 26px;
    border-radius: 28px;
  }

  .update-card {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .update-rail {
    height: 6px;
  }
}

@media (max-width: 560px) {
  .updates-page {
    gap: 18px;
  }

  .month-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-title,
  .month-head h2,
  .update-head h3,
  .metric-card strong,
  .hero-panel strong,
  .entry-link strong,
  .month-link strong {
    font-size: 0.98rem;
    line-height: 1.36;
  }

  .hero-copy,
  .metric-card p,
  .hero-panel p,
  .entry-link p,
  .update-summary,
  .update-items,
  .month-link span {
    font-size: 0.84rem;
    line-height: 1.56;
  }

  .metric-value {
    font-size: 1.56rem;
  }

  .hero-panel,
  .timeline-index,
  .update-card {
    padding: 14px;
  }
}
</style>
