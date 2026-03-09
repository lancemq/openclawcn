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
]

const faqs = [
  '我应该先看文档还是先看新闻？建议先看快速入门，再看安装与环境。',
  '发现错别字或内容缺失怎么办？直接提交反馈即可。',
  '社区入口目前在哪？当前以 GitHub 和站内反馈为主，后续会补充中文社区渠道。',
]
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Community</p>
      <h1 class="section-title">社区支持</h1>
      <p class="section-copy">
        第 2 步开始补齐与用户互动相关的入口。当前先提供问题反馈、GitHub 协作和基础 FAQ，后续再扩展讨论与贡献机制。
      </p>

      <div class="grid four-up cards">
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
}

.four-up {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.channel-card {
  display: grid;
  gap: 12px;
}

.channel-card h2,
.faq h2 {
  margin: 0;
}

.channel-card p,
.faq li {
  color: var(--muted);
  line-height: 1.7;
}

.more {
  color: var(--brand);
  font-weight: 600;
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
  .four-up {
    grid-template-columns: 1fr;
  }
}
</style>
