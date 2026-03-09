<script setup lang="ts">
const items = [
  '什么是 OpenClaw，以及它适合哪些用户',
  '安装、配置和基础概念应该如何分层组织',
  '中文社区、GitHub 和问题反馈入口如何集中展示',
  '新闻、教程和最佳实践如何持续扩充',
]
</script>

<template>
  <section class="section">
    <div class="container spotlight">
      <div>
        <p class="eyebrow">内容结构</p>
        <h2 class="section-title">先把中文用户真正会找的内容摆在前面。</h2>
        <p class="section-copy">
          首页的目标是说明 OpenClaw 是什么、能做什么、如何开始，以及中文用户接下来应该去哪里继续了解。
        </p>
        <div class="button-row">
          <NuxtLink class="button primary" to="/docs/getting-started">开始了解 OpenClaw</NuxtLink>
          <NuxtLink class="button secondary" to="/community">查看社区支持</NuxtLink>
        </div>
      </div>

      <div class="card">
        <ul class="spotlight-list">
          <li v-for="item in items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.spotlight {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 24px;
  align-items: stretch;
}

.spotlight-list {
  display: grid;
  gap: 16px;
  margin: 0;
  padding-left: 20px;
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .spotlight {
    grid-template-columns: 1fr;
  }
}
</style>
