<script setup lang="ts">
const features = [
  {
    title: '先建立阅读顺序',
    description: '首页和文档优先回答先看什么、后看什么，而不是把所有入口并排堆在一起。',
  },
  {
    title: '按阶段组织内容',
    description: '把入门、部署、运维、排错和长期跟踪拆成不同层次，减少新手误入高级细节。',
  },
  {
    title: '列表页统一承接',
    description: '文档、实践、新闻用一致的卡片层级和筛选逻辑承接不同类型内容。',
  },
  {
    title: '内容可持续查阅',
    description: '通过阅读路径、内容尾部导航、FAQ 和搜索，把零散信息串成可长期使用的体系。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head compact-head">
        <p class="eyebrow">站点方向</p>
        <p class="head-note">把中文资料站做成可持续查阅的 OpenClaw 入口，而不是内容堆叠页。</p>
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
  gap: 12px;
  margin-top: 14px;
}

.feature-card {
  min-height: 164px;
  align-content: start;
  padding: 18px;
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
  font-size: 0.95rem;
  line-height: 1.65;
}

.feature-index {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  color: var(--accent);
  background: rgba(234, 212, 182, 0.46);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

h3 {
  margin: 0 0 8px;
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.08rem;
  letter-spacing: -0.03em;
  line-height: 1.38;
}

p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.92rem;
  line-height: 1.68;
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
