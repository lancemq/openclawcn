<script setup lang="ts">
import { newsOverview } from '~/data/site'

useSeo({
  title: '新闻动态',
  description: 'OpenClawCN 项目动态与里程碑记录，当前聚焦官网 MVP 和中文内容建设。',
  path: '/news',
})
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">News</p>
      <h1 class="section-title">新闻动态</h1>
      <p class="section-copy">
        第 1 步用最小新闻体系记录阶段推进，后续可以直接扩展为完整博客和更新日志。
      </p>

      <div class="grid news-grid">
        <ContentCard
          v-for="item in newsOverview"
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
.news-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 28px;
}

@media (max-width: 760px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
