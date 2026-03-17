<script setup lang="ts">
const stacks = [
  {
    title: '第一次了解 OpenClaw',
    desc: '先理解定位、能力结构和适用边界，建立整体认知后再进入细节。',
    links: [
      { label: '什么是 OpenClaw', to: '/docs/getting-started/what-is-openclaw' },
      { label: '适合哪些用户', to: '/docs/getting-started/who-is-openclaw-for' },
      { label: '阅读路径', to: '/docs/getting-started/reading-path' },
      { label: '核心概念', to: '/docs/getting-started/core-concepts' },
    ],
  },
  {
    title: '准备开始部署',
    desc: '优先跑通安装、初始化和控制台检查链路，不要一开始就并行配置多条渠道。',
    links: [
      { label: '安装与环境', to: '/docs/setup/installation' },
      { label: '快速入门', to: '/docs/getting-started/getting-started' },
      { label: 'Onboarding', to: '/docs/getting-started/onboarding-guide' },
      { label: 'Control UI', to: '/docs/manual/control-ui' },
    ],
  },
  {
    title: '理解核心能力',
    desc: '掌握 Gateway、Models、Channels 等核心模块，建立对系统架构的完整理解。',
    links: [
      { label: '架构概览', to: '/docs/manual/architecture' },
      { label: '模型配置', to: '/docs/manual/models-overview' },
      { label: '渠道能力', to: '/docs/manual/channels-overview' },
      { label: '工具系列', to: '/tools' },
    ],
  },
  {
    title: '进入长期运维',
    desc: '把渠道扩展、安全边界、升级节奏和监控告警接起来，建立稳定的运维习惯。',
    links: [
      { label: 'Gateway 运维', to: '/docs/operations/gateway-operations' },
      { label: '安全基础', to: '/docs/operations/safety-basics' },
      { label: '版本升级', to: '/best-practices/upgrade-migration' },
      { label: '故障排除', to: '/docs/reference/troubleshooting' },
    ],
  },
  {
    title: '扩展与进阶',
    desc: '探索 Skills、Hooks、自动化和生态集成，解锁更多高级用法。',
    links: [
      { label: 'Skills 入门', to: '/skills' },
      { label: '触发机制', to: '/tools/triggers' },
      { label: '自动化配置', to: '/tools/automation' },
      { label: '生态中心', to: '/ecosystem' },
    ],
  },
]

const quickLinks = [
  {
    title: '新手路径',
    desc: '从零开始的学习路线',
    to: '/paths',
  },
  {
    title: '视频教程',
    desc: '看演示学操作',
    to: '/videos',
  },
  {
    title: '常见问题',
    desc: '快速找到答案',
    to: '/faq',
  },
  {
    title: '社区支持',
    desc: '获取帮助与交流',
    to: '/community',
  },
]
</script>

<template>
  <section class="section">
    <div class="container spotlight">
      <div class="spotlight-copy card">
        <p class="eyebrow">重点导览</p>
        <h2 class="spotlight-title">按目标选择阅读路径</h2>
        <p class="spotlight-note">把最常见的阅读目标拆成多条清晰路径，避免第一次进入就面对所有入口。先判断你当前阶段，再选择对应入口。</p>
        <div class="button-row">
          <NuxtLink class="button primary" to="/docs/getting-started/reading-path">开始了解 OpenClaw</NuxtLink>
          <NuxtLink class="button secondary" to="/community">查看社区支持</NuxtLink>
        </div>

        <div class="quick-links">
          <p class="quick-links-label">快速入口</p>
          <div class="quick-links-grid">
            <NuxtLink v-for="link in quickLinks" :key="link.to" :to="link.to" class="quick-link-item">
              <strong>{{ link.title }}</strong>
              <span>{{ link.desc }}</span>
            </NuxtLink>
          </div>
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
  grid-template-columns: minmax(0, 0.95fr) minmax(340px, 1.05fr);
  gap: 14px;
  align-items: stretch;
}

.spotlight-copy {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 24px;
}

.spotlight-title {
  margin: 0;
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.46rem;
  line-height: 1.26;
  letter-spacing: -0.03em;
}

.spotlight-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.96rem;
  line-height: 1.72;
}

.quick-links {
  display: grid;
  gap: 12px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid rgba(64, 73, 85, 0.1);
}

.quick-links-label {
  margin: 0;
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.quick-link-item {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(64, 73, 85, 0.1);
  background: rgba(255, 255, 255, 0.54);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.quick-link-item:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.25);
  box-shadow: 0 8px 16px rgba(74, 56, 28, 0.08);
}

.quick-link-item strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1rem;
  line-height: 1.32;
  color: var(--ink);
}

.quick-link-item span {
  font-size: 0.86rem;
  color: var(--ink-soft);
  line-height: 1.56;
}

.spotlight-stacks {
  display: grid;
  gap: 12px;
}

.stack-card {
  display: grid;
  gap: 8px;
  padding: 18px;
}

.stack-card strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.02rem;
  line-height: 1.4;
}

.stack-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.66;
  font-size: 0.9rem;
}

.stack-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.stack-links a {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.6);
  color: var(--ink);
  font-size: 0.76rem;
  font-weight: 700;
  transition: transform 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.stack-links a:hover {
  transform: translateY(-1px);
  border-color: rgba(12, 108, 105, 0.3);
  color: var(--brand);
}

@media (max-width: 980px) {
  .spotlight {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .quick-links-grid {
    grid-template-columns: 1fr;
  }
}
</style>
