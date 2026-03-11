<script setup lang="ts">
const stacks = [
  {
    title: '第一次了解 OpenClaw',
    desc: '先理解定位、能力结构和适用边界。',
    links: [
      { label: '什么是 OpenClaw', to: '/docs/getting-started/what-is-openclaw' },
      { label: '适合哪些用户', to: '/docs/getting-started/who-is-openclaw-for' },
      { label: '阅读路径', to: '/docs/getting-started/reading-path' },
    ],
  },
  {
    title: '准备开始部署',
    desc: '优先跑通安装、初始化和控制台检查链路。',
    links: [
      { label: '安装与环境', to: '/docs/setup/installation' },
      { label: '快速入门', to: '/docs/getting-started/getting-started' },
      { label: 'Onboarding', to: '/docs/getting-started/onboarding-guide' },
    ],
  },
  {
    title: '进入长期使用',
    desc: '把渠道、安全、升级和社区协作接起来。',
    links: [
      { label: '渠道概览', to: '/docs/manual/channels-overview' },
      { label: '安全基础', to: '/docs/operations/safety-basics' },
      { label: '社区支持', to: '/community' },
    ],
  },
]
</script>

<template>
  <section class="section">
    <div class="container spotlight">
      <div class="spotlight-copy card">
        <p class="eyebrow">重点导览</p>
        <p class="spotlight-note">把最常见的三种阅读目标拆成三条路径，避免第一次进入就平铺所有入口。</p>
        <div class="button-row">
          <NuxtLink class="button primary" to="/docs/getting-started/reading-path">开始了解 OpenClaw</NuxtLink>
          <NuxtLink class="button secondary" to="/community">查看社区支持</NuxtLink>
        </div>
      </div>

      <div class="spotlight-stacks">
        <article v-for="stack in stacks" :key="stack.title" class="card stack-card">
          <strong>{{ stack.title }}</strong>
          <p>{{ stack.desc }}</p>
          <div class="stack-links">
            <NuxtLink v-for="link in stack.links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.spotlight {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
  gap: 12px;
  align-items: stretch;
}

.spotlight-copy {
  display: grid;
  align-content: start;
  gap: 10px;
}

.spotlight-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.6;
}

.spotlight-stacks {
  display: grid;
  gap: 12px;
}

.stack-card {
  display: grid;
  gap: 8px;
  padding: 16px;
}

.stack-card strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.3;
}

.stack-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.58;
  font-size: 0.88rem;
}

.stack-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.stack-links a {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.6);
  color: var(--ink);
  font-size: 0.78rem;
  font-weight: 700;
}

@media (max-width: 900px) {
  .spotlight {
    grid-template-columns: 1fr;
  }
}
</style>
