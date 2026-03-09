<script setup lang="ts">
const features = [
  {
    title: '快速理解定位',
    description: '先用中文说明 OpenClaw 是什么、适合谁、和普通聊天工具有什么区别。',
  },
  {
    title: '更稳地开始使用',
    description: '把安装、Onboarding、Control UI 和渠道接入按更容易上手的顺序整理清楚。',
  },
  {
    title: '聚焦关键能力',
    description: '围绕渠道、Hooks、安全、升级和排错等真正会影响使用体验的主题展开说明。',
  },
  {
    title: '跟踪版本变化',
    description: '通过新闻、FAQ 和社区入口，持续了解 OpenClaw 的版本更新和使用提醒。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head compact-head">
        <p class="eyebrow">核心价值</p>
        <p class="head-note">先回答中文用户最关心的四件事。</p>
      </div>

      <div class="feature-grid">
        <article v-for="(feature, index) in features" :key="feature.title" class="card feature-card">
          <span class="feature-index">0{{ index + 1 }}</span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.feature-card {
  min-height: 130px;
  align-content: start;
  padding: 14px;
}

.compact-head {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.head-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.84rem;
}

.feature-index {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 10px;
  padding: 2px 6px;
  border-radius: 999px;
  color: var(--accent);
  background: rgba(234, 215, 182, 0.44);
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

h3 {
  margin: 0 0 5px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.98rem;
  letter-spacing: -0.03em;
}

p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.86rem;
  line-height: 1.55;
}

@media (max-width: 980px) {
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
