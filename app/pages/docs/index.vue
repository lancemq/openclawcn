<script setup lang="ts">
const { data: items } = await useAsyncData('docs:index', () => queryCollection('docs').all())

const featuredItems = computed(() =>
  (items.value || []).sort((left, right) => String(left.title || '').localeCompare(String(right.title || ''))),
)

useSeo({
  title: '文档中心',
  description: 'OpenClaw 中文文档入口，包含产品介绍、快速开始、功能专题、运维与更新跟踪。',
  path: '/docs',
})
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Documentation</p>
      <h1 class="section-title">文档中心</h1>
      <p class="section-copy">
        文档中心已经从最初的 MVP 目录，扩展为产品介绍、快速开始、功能专题、运维和更新跟踪的内容入口。
      </p>

      <div class="grid docs-grid">
        <ContentCard
          v-for="item in featuredItems"
          :key="item.path"
          :title="String(item.title || '')"
          :description="String(item.description || '')"
          :to="String(item.path || '')"
          :meta="String(item.category || '文档')"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.docs-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 28px;
}

@media (max-width: 980px) {
  .docs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .docs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
