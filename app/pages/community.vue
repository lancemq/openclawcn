<script setup lang="ts">
useSeo({
  title: '社区支持',
  description: '查看 OpenClawCN 的社区入口、问题反馈方式、贡献路径和后续中文社区规划。',
  path: '/community',
})

const channels = [
  {
    title: 'GitHub 仓库',
    description: '查看源码、版本动态、Issue 和 PR 记录。',
    href: 'https://github.com/openclaw/openclaw',
  },
  {
    title: 'GitHub Issues',
    description: '如果是明确的问题、缺失内容或 bug，直接进入 Issue 更适合形成后续跟踪。',
    href: 'https://github.com/openclaw/openclaw/issues',
  },
  {
    title: '问题反馈',
    description: '如果你发现文档问题或站点 bug，可以直接提交反馈。',
    href: '/feedback',
  },
  {
    title: '贡献与协作',
    description: '后续会补齐中文贡献指南、翻译说明和社区协作规则。',
    href: '/docs/community',
  },
  {
    title: 'FAQ',
    description: '先查看常见问题，再决定去文档、反馈还是 GitHub。',
    href: '/faq',
  },
  {
    title: '更新订阅',
    description: '通过 RSS 跟踪新闻与最佳实践更新，适合长期关注站点内容演进。',
    href: '/rss.xml',
  },
]

const faqs = [
  '我应该先看文档还是先看新闻？建议先看快速入门，再看安装与环境。',
  '发现错别字或内容缺失怎么办？直接提交反馈即可。',
  '社区入口目前在哪？当前以 GitHub 和站内反馈为主，后续会补充中文社区渠道。',
]

const workflows = [
  {
    title: '先判断问题类型',
    description: '内容建议适合站内反馈，明确 bug 或缺失条目更适合进入 GitHub Issues。',
  },
  {
    title: '再决定公开或私下提交',
    description: '需要讨论上下文和后续追踪时，优先走 GitHub；仅内容修订建议时可直接反馈表单。',
  },
  {
    title: '持续跟踪更新',
    description: '通过 RSS 订阅新闻和最佳实践更新，不需要反复手动回到站点检查。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Community</p>
      <h1 class="section-title">社区支持</h1>
      <p class="section-copy">
        这里集中整理 GitHub、FAQ、内容反馈和更新订阅入口，方便中文用户持续跟踪 OpenClaw 并参与讨论。
      </p>

      <div class="grid cards">
        <a
          v-for="channel in channels"
          :key="channel.title"
          class="card channel-card"
          :href="channel.href"
          :target="channel.href.startsWith('http') ? '_blank' : undefined"
          :rel="channel.href.startsWith('http') ? 'noreferrer' : undefined"
        >
          <h2>{{ channel.title }}</h2>
          <p>{{ channel.description }}</p>
          <span class="more">进入</span>
        </a>
      </div>

      <div class="grid lower-grid">
        <section class="card workflow-card">
          <h2>推荐参与路径</h2>
          <div class="workflow-list">
            <article v-for="(workflow, index) in workflows" :key="workflow.title" class="workflow-item">
              <span class="workflow-index">0{{ index + 1 }}</span>
              <div>
                <h3>{{ workflow.title }}</h3>
                <p>{{ workflow.description }}</p>
              </div>
            </article>
          </div>
        </section>

        <section class="card subscribe-card">
          <h2>内容更新订阅</h2>
          <p>
            如果你主要关心站点内容是否有更新，可以直接订阅 RSS，而不是依赖站内搜索或手动刷新。
          </p>
          <div class="button-row">
            <a class="button primary" href="/rss.xml" target="_blank" rel="noreferrer">打开 RSS</a>
            <NuxtLink class="button secondary" to="/news">查看新闻动态</NuxtLink>
          </div>
        </section>
      </div>

      <div class="faq card">
        <h2>常见问题</h2>
        <ul>
          <li v-for="faq in faqs" :key="faq">{{ faq }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards {
  margin-top: 28px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.lower-grid {
  grid-template-columns: 1.3fr 0.7fr;
  margin-top: 20px;
}

.channel-card {
  display: grid;
  gap: 12px;
}

.channel-card h2,
.faq h2,
.workflow-card h2,
.subscribe-card h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.42rem;
  letter-spacing: -0.03em;
}

.channel-card p,
.faq li,
.workflow-item p,
.subscribe-card p {
  color: var(--ink-soft);
  line-height: 1.7;
}

.more {
  color: var(--brand);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.workflow-list {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.workflow-item {
  display: flex;
  gap: 12px;
}

.workflow-index {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  flex: none;
  color: var(--accent);
  background: rgba(234, 215, 182, 0.44);
  font-size: 0.7rem;
  font-weight: 800;
}

.workflow-item h3 {
  margin: 0 0 4px;
  font-size: 1rem;
}

.subscribe-card {
  align-content: start;
}

.faq {
  margin-top: 24px;
}

.faq ul {
  margin: 18px 0 0;
  padding-left: 20px;
  display: grid;
  gap: 12px;
}

@media (max-width: 980px) {
  .cards,
  .lower-grid {
    grid-template-columns: 1fr;
  }
}
</style>
