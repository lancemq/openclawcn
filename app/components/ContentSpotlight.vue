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
      <div class="spotlight-copy card">
        <p class="eyebrow">重点导览</p>
        <p class="spotlight-note">第一次进入时，优先解决阅读顺序和查阅路径，而不是一次看完全部细节。</p>
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
  gap: 14px;
  align-items: stretch;
}

.spotlight-copy {
  display: grid;
  align-content: start;
  gap: 12px;
}

.spotlight-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.92rem;
  line-height: 1.64;
}

.spotlight-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding-left: 20px;
  color: var(--ink-soft);
  line-height: 1.62;
}

@media (max-width: 900px) {
  .spotlight {
    grid-template-columns: 1fr;
  }
}
</style>
