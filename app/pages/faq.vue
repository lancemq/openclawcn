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
  },
  {
    question: '如果中文资料不完整怎么办？',
    answer: '可以先在站内搜索已有内容，仍然没有的话直接提交反馈。',
  },
  {
    question: '站点问题和 OpenClaw 本体问题怎么区分？',
    answer: '站点排版、链接、搜索等归站点问题；功能使用、安装和能力边界更适合进入文档或 GitHub。',
  },
  {
    question: '社区入口目前有哪些？',
    answer: '当前以 GitHub、站内反馈和社区支持页为主，后续会逐步补充更多中文交流渠道。',
  },
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

      <div class="grid faq-grid">
        <article v-for="faq in faqs" :key="faq.question" class="card faq-card">
          <h2>{{ faq.question }}</h2>
          <p>{{ faq.answer }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 24px;
}

.faq-card {
  display: grid;
  gap: 10px;
}

.faq-card h2 {
  margin: 0;
  font-size: 1.15rem;
}

.faq-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 760px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>
