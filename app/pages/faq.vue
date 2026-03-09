<script setup lang="ts">
useSeo({
  title: '常见问题',
  description: '查看 OpenClawCN 当前整理的常见问题与建议阅读路径。',
  path: '/faq',
})

const faqs = [
  {
    question: '第一次访问应该从哪里开始？',
    answer: '建议先看快速入门，再看安装与环境，最后按需求进入新闻或社区支持。',
    category: '入门',
  },
  {
    question: '如果中文资料不完整怎么办？',
    answer: '可以先在站内搜索已有内容，仍然没有的话直接提交反馈。',
    category: '内容',
  },
  {
    question: '站点问题和 OpenClaw 本体问题怎么区分？',
    answer: '站点排版、链接、搜索等归站点问题；功能使用、安装和能力边界更适合进入文档或 GitHub。',
    category: '问题分流',
  },
  {
    question: '社区入口目前有哪些？',
    answer: '当前以 GitHub、站内反馈和社区支持页为主，后续会逐步补充更多中文交流渠道。',
    category: '社区',
  },
  {
    question: '如何快速找到需要的文档？',
    answer: '使用顶部搜索功能，或按文档分类筛选。文档按入门、配置、功能、运维等分类组织。',
    category: '导航',
  },
  {
    question: '如何订阅更新通知？',
    answer: '首页底部提供邮件订阅表单，也可通过 RSS 订阅新闻动态。',
    category: '订阅',
  },
]

const quickLinks = [
  { title: '快速入门', to: '/docs/getting-started', desc: '5分钟建立整体认识' },
  { title: '安装配置', to: '/docs/installation', desc: '环境准备与首次安装' },
  { title: '提交反馈', to: '/feedback', desc: '报告问题或建议' },
  { title: '社区支持', to: '/community', desc: '获取更多帮助' },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <p class="eyebrow">FAQ</p>
      <h1 class="section-title">常见问题</h1>
      <p class="section-copy">
        这里整理的是最常见的入门疑问、反馈路径和信息查找方式，适合第一次进入站点时快速扫一遍。
      </p>

      <div class="quick-links">
        <NuxtLink v-for="link in quickLinks" :key="link.to" :to="link.to" class="quick-link card">
          <span class="link-title">{{ link.title }}</span>
          <span class="link-desc">{{ link.desc }}</span>
        </NuxtLink>
      </div>

      <div class="grid faq-grid">
        <article v-for="faq in faqs" :key="faq.question" class="card faq-card">
          <span class="faq-category">{{ faq.category }}</span>
          <h2>{{ faq.question }}</h2>
          <p>{{ faq.answer }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quick-links {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.quick-link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.quick-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.link-title {
  font-weight: 700;
  color: var(--brand);
  font-size: 0.95rem;
}

.link-desc {
  color: var(--ink-soft);
  font-size: 0.82rem;
}

.faq-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 20px;
}

.faq-card {
  display: grid;
  gap: 8px;
  padding: 16px;
}

.faq-category {
  display: inline-flex;
  width: fit-content;
  padding: 3px 8px;
  background: rgba(166, 111, 44, 0.1);
  color: var(--brand);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.faq-card h2 {
  margin: 0;
  font-size: 1.08rem;
}

.faq-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
  font-size: 0.92rem;
}

@media (max-width: 900px) {
  .quick-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }

  .quick-links {
    grid-template-columns: 1fr;
  }
}
</style>
