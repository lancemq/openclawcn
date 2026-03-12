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
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Ecosystem</p>
          <h1 class="section-title">生态中心</h1>
          <p class="section-copy">
            OpenClaw 拥有丰富的生态系统，包括技能市场、插件系统、第三方集成和社区项目。这一页帮助你快速了解生态全貌，找到适合你的扩展方向。
          </p>

          <div class="collection-utility">
            <article v-for="stat in ecosystemStats.slice(0, 2)" :key="stat.label" class="collection-utility-item">
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">生态概览</span>
            <strong>技能、插件、集成、社区四位一体</strong>
            <p>从 ClawHub 技能开始，再扩展到渠道接入和第三方系统集成，逐步构建你的专属助手。</p>
          </div>

          <div v-for="signal in ecosystemSignals.slice(0, 2)" :key="signal.label" class="collection-summary">
            <span class="mini-label">{{ signal.label }}</span>
            <p>{{ signal.value }}：{{ signal.note }}</p>
          </div>
        </aside>
      </section>

      <div class="grid stats-grid">
        <article v-for="stat in ecosystemStats" :key="stat.label" class="card stat-card">
          <span class="stat-value">{{ stat.value }}</span>
          <strong class="stat-label">{{ stat.label }}</strong>
          <p class="stat-note">{{ stat.note }}</p>
        </article>
      </div>

      <section class="featured-section">
        <div class="home-head">
          <p class="eyebrow">Featured</p>
          <p class="home-head-note">热门生态项目，帮助你快速上手。</p>
        </div>
        <div class="grid featured-grid">
          <article v-for="item in featuredItems" :key="item.title" class="card featured-card">
            <div class="featured-meta">
              <span class="tag">{{ item.category }}</span>
              <span v-if="item.stats" class="tag highlight">{{ item.stats }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="featured-tags">
              <span v-for="tag in item.tags.slice(0, 3)" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </article>
        </div>
      </section>

      <section v-for="section in ecosystemSections" :key="section.id" :id="section.id" class="ecosystem-section">
        <div class="section-heading">
          <p class="eyebrow">{{ section.eyebrow }}</p>
          <h2 class="section-title">{{ section.title }}</h2>
          <p class="section-copy">{{ section.description }}</p>
        </div>

        <div class="grid ecosystem-grid">
          <article v-for="item in section.items" :key="item.title" class="card ecosystem-card">
            <div class="ecosystem-meta">
              <span class="tag">{{ item.category }}</span>
              <span v-if="item.stats" class="tag highlight">{{ item.stats }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="ecosystem-tags">
              <span v-for="tag in item.tags.slice(0, 4)" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
            <a
              v-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noreferrer"
              class="ecosystem-link"
            >
              {{ item.sourceLabel || '查看详情' }}
            </a>
          </article>
        </div>
      </section>

      <section class="quick-links-section">
        <div class="home-head">
          <p class="eyebrow">Quick Links</p>
          <p class="home-head-note">快速进入生态相关入口。</p>
        </div>
        <div class="grid quick-links-grid">
          <NuxtLink v-for="link in ecosystemQuickLinks" :key="link.to" :to="link.to" class="card quick-link-card">
            <span class="tag">{{ link.meta }}</span>
            <strong>{{ link.title }}</strong>
            <p>{{ link.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
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
  font-size: 2rem;
  font-weight: 700;
  color: var(--brand);
  line-height: 1.1;
}

.stat-label {
  font-size: 0.95rem;
}

.stat-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.82rem;
}

.featured-section,
.ecosystem-section,
.quick-links-section {
  margin-top: 24px;
}

.section-heading {
  margin-bottom: 14px;
}

.featured-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.featured-card,
.ecosystem-card,
.quick-link-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.featured-card:hover,
.ecosystem-card:hover,
.quick-link-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(64, 49, 27, 0.1);
}

.featured-meta,
.ecosystem-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(166, 111, 44, 0.1);
  color: var(--brand);
}

.tag.highlight {
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
  color: #fff8ef;
}

.featured-card h3,
.ecosystem-card h3,
.quick-link-card strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.featured-card p,
.ecosystem-card p,
.quick-link-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.55;
}

.featured-tags,
.ecosystem-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-item {
  font-size: 0.74rem;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.6);
  padding: 3px 8px;
  border-radius: 4px;
}

.ecosystem-link {
  margin-top: auto;
  color: var(--brand);
  font-size: 0.84rem;
  font-weight: 700;
}

.ecosystem-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.quick-links-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .featured-grid,
  .ecosystem-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .quick-links-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .stats-grid,
  .featured-grid,
  .ecosystem-grid,
  .quick-links-grid {
    grid-template-columns: 1fr;
  }
}
</style>