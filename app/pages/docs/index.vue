<script setup lang="ts">
import { docsOverview } from '~/data/site'

useSeo({
  title: '文档中心',
  description: 'OpenClaw 中文文档入口，包含快速入门、安装说明和社区支持。',
  path: '/docs',
})
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Documentation</p>
      <h1 class="section-title">文档中心</h1>
      <p class="section-copy">
        第 1 步先交付可访问的文档目录，核心覆盖快速入门、安装准备和社区支持。
      </p>

      <div class="grid docs-grid">
        <ContentCard
          v-for="item in docsOverview"
          :key="item.to"
          :title="item.title"
          :description="item.description"
          :to="item.to"
          :meta="item.meta"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.docs-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 28px;
}

@media (max-width: 980px) {
  .docs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
