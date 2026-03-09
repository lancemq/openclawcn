<script setup lang="ts">
const features = [
  {
    title: '中文内容优先',
    description: '首页、文档、新闻全部按中文阅读习惯组织，降低初次理解门槛。',
  },
  {
    title: '产品理解优先',
    description: '先帮助用户理解 OpenClaw 的定位、能力边界和适用场景，再进入具体配置与接入。',
  },
  {
    title: 'Markdown 驱动',
    description: '新闻、教程和最佳实践都可以按内容文件持续扩充，不先依赖后台。',
  },
  {
    title: '持续更新',
    description: '通过文档、新闻、RSS 和社区反馈形成长期维护的中文资料体系。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">核心价值</p>
      <h2 class="section-title">把 OpenClaw 的中文介绍、文档与更新入口整理清楚。</h2>
      <p class="section-copy">
        网站的重点不是展示建设过程，而是让中文用户第一次进入后，就能顺着产品介绍、文档、更新和社区一路读下去。
      </p>

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
  gap: 16px;
  margin-top: 22px;
}

.feature-card {
  min-height: 180px;
  align-content: start;
}

.feature-index {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 16px;
  padding: 4px 8px;
  border-radius: 999px;
  color: var(--accent);
  background: rgba(234, 215, 182, 0.44);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

h3 {
  margin: 0 0 8px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.18rem;
  letter-spacing: -0.03em;
}

p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.62;
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
