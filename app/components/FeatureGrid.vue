<script setup lang="ts">
const features = [
  {
    title: '中文内容优先',
    description: '首页、文档、新闻全部按中文阅读习惯组织，降低初次理解门槛。',
  },
  {
    title: '介绍站点优先',
    description: '站点对外重点是介绍 OpenClaw 本身，而不是介绍本站如何部署。',
  },
  {
    title: 'Markdown 驱动',
    description: '新闻、教程和最佳实践都可以按内容文件持续扩充，不先依赖后台。',
  },
  {
    title: '可持续扩展',
    description: '第 1 步先交付可访问 MVP，第 2 步再逐步引入搜索、反馈和社区能力。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">核心价值</p>
      <h2 class="section-title">第一阶段先解决可上线、可阅读、可预览。</h2>
      <p class="section-copy">
        这个阶段不追求大而全，而是先把官网内容结构、页面层级和中文信息表达做对。
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
