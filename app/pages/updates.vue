<script setup lang="ts">
import { siteUpdates } from '~/data/site-updates'

useSeo({
  title: '网站更新',
  description: '集中查看 OpenClawCN 中文资料站近期的页面调整、内容补充、导航优化和体验更新记录。',
  path: '/updates',
})
</script>

<template>
  <section class="section">
    <div class="container updates-page">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: '支持', to: '/community' },
        { label: '网站更新' },
      ]" />

      <section class="collection-hero updates-hero">
        <div class="card collection-main updates-main">
          <p class="eyebrow">Website Updates</p>
          <h1 class="section-title">网站更新说明</h1>
          <p class="section-copy">
            这里集中记录中文站近期的页面调整、内容补充、导航修正和体验优化，方便快速了解站点最近有哪些变化。
          </p>

          <div class="updates-signals">
            <article class="signal-card">
              <span class="mini-label">更新范围</span>
              <strong>内容、结构、导航、性能</strong>
              <p>不仅记录新页面，也记录重要的修订、恢复、优化和问题修复。</p>
            </article>
            <article class="signal-card">
              <span class="mini-label">适合谁看</span>
              <strong>长期关注中文站的人</strong>
              <p>适合需要跟踪内容变化、判断新增入口或核对最近修正项的读者。</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side updates-side">
          <div class="updates-side-panel">
            <span class="mini-label">记录方式</span>
            <strong>按日期列出每次重要更新</strong>
            <p>每条记录都会列出摘要和具体变更项，后续会持续追加。</p>
          </div>

          <div class="updates-side-panel">
            <span class="mini-label">相关入口</span>
            <div class="updates-links">
              <NuxtLink to="/community" class="updates-link">
                <strong>社区支持</strong>
                <p>查看问题分流、协作入口和社区参与说明。</p>
              </NuxtLink>
              <NuxtLink to="/news" class="updates-link">
                <strong>新闻动态</strong>
                <p>查看 OpenClaw 产品、生态和中文信息跟踪内容。</p>
              </NuxtLink>
            </div>
          </div>
        </aside>
      </section>

      <section class="updates-list">
        <article v-for="item in siteUpdates" :key="`${item.date}-${item.title}`" class="card update-card">
          <div class="update-head">
            <span class="update-date">{{ item.date }}</span>
            <h2>{{ item.title }}</h2>
          </div>
          <p class="update-summary">{{ item.summary }}</p>
          <ul class="update-items">
            <li v-for="point in item.items" :key="point">{{ point }}</li>
          </ul>
        </article>
      </section>
    </div>
  </section>
</template>

<style scoped>
.updates-page,
.updates-hero,
.updates-main,
.updates-side,
.updates-side-panel,
.updates-links,
.updates-list {
  display: grid;
  gap: 18px;
}

.updates-page {
  gap: 24px;
}

.updates-signals {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.signal-card,
.updates-link {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.46);
}

.signal-card strong,
.updates-side-panel strong,
.updates-link strong,
.update-head h2 {
  font-family: "Fraunces", "Times New Roman", serif;
}

.signal-card strong,
.updates-side-panel strong,
.updates-link strong {
  font-size: 1rem;
  line-height: 1.32;
}

.signal-card p,
.updates-side-panel p,
.updates-link p,
.update-summary,
.update-items {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.66;
}

.update-card {
  display: grid;
  gap: 12px;
  padding: 20px 22px;
}

.update-head {
  display: grid;
  gap: 8px;
}

.update-date {
  display: inline-flex;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(234, 215, 182, 0.42);
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.update-head h2 {
  margin: 0;
  font-size: 1.12rem;
  line-height: 1.36;
  letter-spacing: -0.03em;
}

.update-items {
  padding-left: 18px;
}

.update-items li + li {
  margin-top: 6px;
}

@media (max-width: 860px) {
  .updates-signals {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .updates-page {
    gap: 18px;
  }

  .update-card {
    padding: 16px;
  }

  .signal-card,
  .updates-link {
    padding: 12px 14px;
  }

  .update-head h2,
  .signal-card strong,
  .updates-side-panel strong,
  .updates-link strong {
    font-size: 0.95rem;
    line-height: 1.38;
  }

  .signal-card p,
  .updates-side-panel p,
  .updates-link p,
  .update-summary,
  .update-items {
    font-size: 0.84rem;
    line-height: 1.56;
  }
}
</style>
