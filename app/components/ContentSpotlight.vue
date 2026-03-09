<script setup lang="ts">
const items = [
  '什么是 OpenClaw，以及它更适合哪些用户和团队',
  '第一次安装时最值得先看哪些内容，避免一开始就陷入复杂配置',
  'Control UI、Channels、Hooks 和安全边界分别该怎么理解',
  '升级、排错和社区支持应该从哪里开始查找',
]
</script>

<template>
  <section class="section">
    <div class="container spotlight">
      <div>
        <p class="eyebrow">重点导览</p>
        <h2 class="section-title">先把第一次使用最需要的答案放在前面。</h2>
        <p class="section-copy">
          如果你是第一次接触 OpenClaw，最需要的不是一次看完所有细节，而是先找到正确的入门顺序和查阅路径。
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
  gap: 22px;
  align-items: stretch;
}

.spotlight-list {
  display: grid;
  gap: 14px;
  margin: 0;
  padding-left: 20px;
  color: var(--ink-soft);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .spotlight {
    grid-template-columns: 1fr;
  }
}
</style>
