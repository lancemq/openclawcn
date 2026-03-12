<script setup lang="ts">
import { roadmapQuickLinks, roadmapSections, roadmapSignals, roadmapStats } from '~/data/roadmap'

useSeo({
  title: '产品路线图',
  description: '了解 OpenClaw 的产品发展方向，查看已完成、进行中和计划中的功能。',
  path: '/roadmap',
  type: 'website',
})

const statusConfig = {
  completed: { label: '已完成', class: 'status-completed' },
  'in-progress': { label: '进行中', class: 'status-in-progress' },
  planned: { label: '计划中', class: 'status-planned' },
}

const completedItems = computed(() =>
  roadmapSections.find(s => s.id === 'completed')?.items || [],
)

const inProgressItems = computed(() =>
  roadmapSections.find(s => s.id === 'in-progress')?.items || [],
)

const plannedItems = computed(() =>
  roadmapSections.find(s => s.id === 'planned')?.items || [],
)
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Roadmap</p>
          <h1 class="section-title">产品路线图</h1>
          <p class="section-copy">
            OpenClaw 持续演进中。这一页展示产品的功能规划，帮助你了解发展方向和即将到来的新能力。
          </p>

          <div class="collection-utility">
            <article v-for="stat in roadmapStats.slice(0, 2)" :key="stat.label" class="collection-utility-item">
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">路线图说明</span>
            <strong>社区驱动，持续迭代</strong>
            <p>路线图会随版本发布持续更新，欢迎通过 GitHub 提出建议和反馈。</p>
          </div>

          <div v-for="signal in roadmapSignals.slice(0, 2)" :key="signal.label" class="collection-summary">
            <span class="mini-label">{{ signal.label }}</span>
            <p>{{ signal.value }}：{{ signal.note }}</p>
          </div>
        </aside>
      </section>

      <div class="grid stats-grid">
        <article v-for="stat in roadmapStats" :key="stat.label" class="card stat-card">
          <span class="stat-value">{{ stat.value }}</span>
          <strong class="stat-label">{{ stat.label }}</strong>
          <p class="stat-note">{{ stat.note }}</p>
        </article>
      </div>

      <section class="status-overview">
        <div class="grid status-grid">
          <div class="card status-card completed">
            <div class="status-header">
              <span class="status-dot" />
              <strong>已完成</strong>
              <span class="status-count">{{ completedItems.length }}</span>
            </div>
            <p>已经正式发布的功能和改进</p>
          </div>
          <div class="card status-card in-progress">
            <div class="status-header">
              <span class="status-dot" />
              <strong>进行中</strong>
              <span class="status-count">{{ inProgressItems.length }}</span>
            </div>
            <p>正在开发中的功能</p>
          </div>
          <div class="card status-card planned">
            <div class="status-header">
              <span class="status-dot" />
              <strong>计划中</strong>
              <span class="status-count">{{ plannedItems.length }}</span>
            </div>
            <p>未来版本规划的功能</p>
          </div>
        </div>
      </section>

      <section v-for="section in roadmapSections" :key="section.id" :id="section.id" class="roadmap-section">
        <div class="section-heading">
          <div class="heading-row">
            <p class="eyebrow">{{ section.eyebrow }}</p>
            <span :class="['status-badge', statusConfig[section.items[0]?.status]?.class]">
              {{ statusConfig[section.items[0]?.status]?.label }}
            </span>
          </div>
          <h2 class="section-title">{{ section.title }}</h2>
          <p class="section-copy">{{ section.description }}</p>
        </div>

        <div class="grid roadmap-grid" :class="section.id">
          <article v-for="item in section.items" :key="item.title" class="card roadmap-card">
            <div class="roadmap-meta">
              <span class="tag">{{ item.category }}</span>
              <span v-if="item.milestone" class="tag milestone">{{ item.milestone }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="roadmap-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </article>
        </div>
      </section>

      <section class="quick-links-section">
        <div class="home-head">
          <p class="eyebrow">Get Involved</p>
          <p class="home-head-note">参与 OpenClaw 的发展。</p>
        </div>
        <div class="grid quick-links-grid">
          <a
            v-for="link in roadmapQuickLinks"
            :key="link.to"
            :href="link.to.startsWith('http') ? link.to : undefined"
            :target="link.to.startsWith('http') ? '_blank' : undefined"
            :rel="link.to.startsWith('http') ? 'noreferrer' : undefined"
            class="card quick-link-card"
          >
            <span class="tag">{{ link.meta }}</span>
            <strong>{{ link.title }}</strong>
            <p>{{ link.description }}</p>
          </a>
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

.status-overview {
  margin-top: 24px;
}

.status-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.status-card {
  padding: 18px;
}

.status-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
}

.status-card.completed .status-dot {
  background: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
}

.status-card.in-progress .status-dot {
  background: #f59e0b;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.2);
}

.status-card.planned .status-dot {
  background: #6b7280;
  box-shadow: 0 0 0 4px rgba(107, 114, 128, 0.2);
}

.status-card strong {
  font-size: 1rem;
}

.status-count {
  margin-left: auto;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ink-soft);
}

.status-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.86rem;
}

.roadmap-section {
  margin-top: 24px;
}

.section-heading {
  margin-bottom: 14px;
}

.heading-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.status-badge {
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 700;
}

.status-badge.status-completed {
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
}

.status-badge.status-in-progress {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}

.status-badge.status-planned {
  background: rgba(107, 114, 128, 0.15);
  color: #4b5563;
}

.roadmap-grid {
  gap: 14px;
}

.roadmap-grid.completed {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.roadmap-grid.in-progress,
.roadmap-grid.planned {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.roadmap-card,
.quick-link-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.roadmap-card:hover,
.quick-link-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(64, 49, 27, 0.1);
}

.roadmap-meta {
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

.tag.milestone {
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
  color: #fff8ef;
}

.roadmap-card h3,
.quick-link-card strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.roadmap-card p,
.quick-link-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.55;
}

.roadmap-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.tag-item {
  font-size: 0.74rem;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.6);
  padding: 3px 8px;
  border-radius: 4px;
}

.quick-links-section {
  margin-top: 24px;
}

.quick-links-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 1200px) {
  .roadmap-grid.completed {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1000px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .status-grid {
    grid-template-columns: 1fr;
  }

  .roadmap-grid.completed,
  .roadmap-grid.in-progress,
  .roadmap-grid.planned {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .quick-links-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .stats-grid,
  .roadmap-grid.completed,
  .roadmap-grid.in-progress,
  .roadmap-grid.planned,
  .quick-links-grid {
    grid-template-columns: 1fr;
  }
}
</style>