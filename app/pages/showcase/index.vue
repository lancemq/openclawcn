<script setup lang="ts">
import { sortShowcase } from '~/data/content'

useSeo({
  title: '案例展示',
  description: '探索 OpenClaw 在企业和个人场景中的真实应用案例，了解如何提升效率和创造价值。',
  path: '/showcase',
  type: 'website',
})

const { data: items } = await useAsyncData('showcase:index', () => queryCollection('showcase').all())

const sortedItems = computed(() => sortShowcase((items.value || []) as any[]))

const featuredCases = computed(() => sortedItems.value.filter((item: any) => item.featured))

const enterpriseCases = computed(() =>
  sortedItems.value.filter((item: any) => item.scale !== '个人'),
)

const personalCases = computed(() =>
  sortedItems.value.filter((item: any) => item.scale === '个人'),
)

const stats = computed(() => [
  { label: '企业案例', value: String(enterpriseCases.value.length), note: '真实企业应用' },
  { label: '个人案例', value: String(personalCases.value.length), note: '个人使用经验' },
  { label: '行业覆盖', value: String(new Set(sortedItems.value.map((i: any) => i.industry)).size), note: '跨行业应用' },
  { label: '平均效率提升', value: '40%+', note: '用户反馈统计' },
])
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Showcase</p>
          <h1 class="section-title">案例展示</h1>
          <p class="section-copy">
            真实的使用案例比功能列表更有说服力。这里展示 OpenClaw 在企业和个人场景中的实际应用效果，帮助你判断它是否适合你的需求。
          </p>

          <div class="collection-utility">
            <article v-for="stat in stats.slice(0, 2)" :key="stat.label" class="collection-utility-item">
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">案例分类</span>
            <strong>企业 / 个人 / 行业解决方案</strong>
            <p>按规模和场景分类，帮助你快速找到与自己情况相近的参考案例。</p>
          </div>
        </aside>
      </section>

      <div class="grid stats-grid">
        <article v-for="stat in stats" :key="stat.label" class="card stat-card">
          <span class="stat-value">{{ stat.value }}</span>
          <strong class="stat-label">{{ stat.label }}</strong>
          <p class="stat-note">{{ stat.note }}</p>
        </article>
      </div>

      <section v-if="featuredCases.length" class="featured-section">
        <div class="home-head">
          <p class="eyebrow">Featured Cases</p>
          <p class="home-head-note">精选案例，展示 OpenClaw 的核心价值。</p>
        </div>
        <div class="grid featured-grid">
          <NuxtLink
            v-for="item in featuredCases"
            :key="item.path"
            :to="item.path"
            class="card featured-card"
          >
            <div class="featured-meta">
              <span class="tag">{{ item.industry }}</span>
              <span class="tag secondary">{{ item.scale }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div v-if="item.outcomes && item.outcomes.length" class="outcomes-list">
              <span v-for="outcome in item.outcomes.slice(0, 2)" :key="outcome" class="outcome-item">
                ✓ {{ outcome }}
              </span>
            </div>
            <div class="featured-tags">
              <span v-for="tag in (item.tags || []).slice(0, 3)" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section v-if="enterpriseCases.length" class="showcase-section">
        <div class="section-heading">
          <p class="eyebrow">Enterprise</p>
          <h2 class="section-title">企业应用案例</h2>
          <p class="section-copy">企业级部署和应用场景，展示 OpenClaw 在组织中的价值。</p>
        </div>

        <div class="grid showcase-grid">
          <NuxtLink
            v-for="item in enterpriseCases"
            :key="item.path"
            :to="item.path"
            class="card showcase-card"
          >
            <div class="showcase-meta">
              <span class="tag">{{ item.industry }}</span>
              <span class="tag secondary">{{ item.scale }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="showcase-summary">{{ item.description }}</p>

            <div class="showcase-details">
              <div class="detail-row">
                <span class="detail-label">场景</span>
                <span class="detail-value">{{ item.scenario }}</span>
              </div>
            </div>

            <div v-if="item.outcomes && item.outcomes.length" class="outcomes-section">
              <span class="outcomes-label">效果</span>
              <ul class="outcomes-list-full">
                <li v-for="outcome in item.outcomes" :key="outcome">{{ outcome }}</li>
              </ul>
            </div>

            <div class="showcase-tags">
              <span v-for="tag in (item.tags || []).slice(0, 4)" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section v-if="personalCases.length" class="showcase-section">
        <div class="section-heading">
          <p class="eyebrow">Personal</p>
          <h2 class="section-title">个人使用案例</h2>
          <p class="section-copy">个人用户的创新使用方式，展示 OpenClaw 的灵活性。</p>
        </div>

        <div class="grid showcase-grid">
          <NuxtLink
            v-for="item in personalCases"
            :key="item.path"
            :to="item.path"
            class="card showcase-card"
          >
            <div class="showcase-meta">
              <span class="tag">{{ item.industry }}</span>
              <span class="tag secondary">{{ item.scale }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="showcase-summary">{{ item.description }}</p>

            <div v-if="item.outcomes && item.outcomes.length" class="outcomes-section">
              <span class="outcomes-label">效果</span>
              <ul class="outcomes-list-full">
                <li v-for="outcome in item.outcomes" :key="outcome">{{ outcome }}</li>
              </ul>
            </div>

            <div class="showcase-tags">
              <span v-for="tag in (item.tags || []).slice(0, 4)" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section class="quick-links-section">
        <div class="home-head">
          <p class="eyebrow">Next Steps</p>
          <p class="home-head-note">继续探索 OpenClaw 的更多内容。</p>
        </div>
        <div class="grid quick-links-grid">
          <NuxtLink to="/best-practices" class="card quick-link-card">
            <span class="tag">实践指南</span>
            <strong>最佳实践</strong>
            <p>学习如何更好地使用 OpenClaw</p>
          </NuxtLink>
          <NuxtLink to="/videos" class="card quick-link-card">
            <span class="tag">教程</span>
            <strong>视频教程</strong>
            <p>观看真实使用演示</p>
          </NuxtLink>
          <NuxtLink to="/community" class="card quick-link-card">
            <span class="tag">社区</span>
            <strong>社区支持</strong>
            <p>与其他用户交流经验</p>
          </NuxtLink>
          <NuxtLink to="/feedback" class="card quick-link-card">
            <span class="tag">反馈</span>
            <strong>提交你的案例</strong>
            <p>分享你的使用经验</p>
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
.showcase-section,
.quick-links-section {
  margin-top: 24px;
}

.section-heading {
  margin-bottom: 14px;
}

.featured-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.featured-card,
.showcase-card,
.quick-link-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.featured-card:hover,
.showcase-card:hover,
.quick-link-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(64, 49, 27, 0.1);
}

.featured-meta,
.showcase-meta {
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

.tag.secondary {
  background: rgba(67, 73, 60, 0.08);
  color: var(--ink-soft);
}

.featured-card h3,
.showcase-card h3,
.quick-link-card strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.featured-card p,
.showcase-card p,
.quick-link-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.55;
}

.outcomes-list {
  display: grid;
  gap: 4px;
}

.outcome-item {
  font-size: 0.84rem;
  color: var(--brand);
}

.outcomes-section {
  margin-top: 8px;
  padding-top: 10px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

.outcomes-label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.outcomes-list-full {
  margin: 0;
  padding-left: 16px;
  font-size: 0.86rem;
  color: var(--ink-soft);
  line-height: 1.6;
}

.outcomes-list-full li {
  margin-bottom: 4px;
}

.showcase-details {
  display: grid;
  gap: 6px;
}

.detail-row {
  display: flex;
  gap: 8px;
  font-size: 0.84rem;
}

.detail-label {
  color: var(--ink-soft);
}

.detail-value {
  font-weight: 600;
}

.featured-tags,
.showcase-tags {
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

.showcase-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
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

  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .quick-links-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .stats-grid,
  .featured-grid,
  .showcase-grid,
  .quick-links-grid {
    grid-template-columns: 1fr;
  }
}
</style>