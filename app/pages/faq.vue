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
  { title: '快速入门', to: '/docs/getting-started/getting-started', desc: '5分钟建立整体认识' },
  { title: '安装配置', to: '/docs/setup/installation', desc: '环境准备与首次安装' },
  { title: '提交反馈', to: '/feedback', desc: '报告问题或建议' },
  { title: '社区支持', to: '/community', desc: '获取更多帮助' },
]

const faqRoutes = [
  {
    title: '问题还很模糊',
    description: '先看 FAQ，确认你该去路径、主题、搜索还是反馈。',
    to: '/faq',
    meta: '当前页',
  },
  {
    title: '已经知道关键词',
    description: '直接进入搜索页，用更短的主题词快速定位内容。',
    to: '/search',
    meta: '搜索',
  },
  {
    title: '已经知道阶段',
    description: '从学习路径选一条主线，避免自己拼阅读顺序。',
    to: '/paths',
    meta: '路径',
  },
]

const groupedFaqs = Object.entries(
  faqs.reduce<Record<string, typeof faqs>>((acc, item) => {
    acc[item.category] ||= []
    acc[item.category].push(item)
    return acc
  }, {}),
)
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">FAQ</p>
          <h1 class="section-title">常见问题</h1>
          <p class="section-copy">
            这里整理的是最常见的入门疑问、反馈路径和信息查找方式。它更适合在你问题还比较模糊时，先快速判断下一步该看哪里或去哪提问。
          </p>

          <div class="collection-utility">
            <article class="collection-utility-item">
              <span class="mini-label">适合什么时候看</span>
              <strong>第一次访问或入口不清时</strong>
              <p>FAQ 负责快速分流，而不是替代完整文档。</p>
            </article>
            <article class="collection-utility-item">
              <span class="mini-label">如果问题更具体</span>
              <strong>转到搜索或对应专题</strong>
              <p>一旦你已经知道自己要找什么，文档和搜索通常更高效。</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">FAQ 结构</span>
            <strong>先按问题类型分组，再给出下一步入口</strong>
            <p>这里把入门、内容、社区、导航和订阅问题拆开，避免所有问题混在同一块里。</p>
          </div>
        </aside>
      </section>

      <section class="faq-layout">
        <div class="quick-links">
          <NuxtLink v-for="link in quickLinks" :key="link.to" :to="link.to" class="quick-link card">
            <span class="link-title">{{ link.title }}</span>
            <span class="link-desc">{{ link.desc }}</span>
          </NuxtLink>
        </div>

        <aside class="faq-side-stack">
          <div class="card route-card">
            <span class="mini-label">分流方式</span>
            <div class="route-list">
              <NuxtLink v-for="item in faqRoutes" :key="item.to" :to="item.to" class="route-item">
                <span class="tag">{{ item.meta }}</span>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
              </NuxtLink>
            </div>
          </div>
        </aside>
      </section>

      <section class="faq-sections">
        <div v-for="[category, items] in groupedFaqs" :key="category" class="faq-section">
          <div class="result-group-head">
            <p class="eyebrow">{{ category }}</p>
            <p class="muted">{{ items.length }} 个问题</p>
          </div>

          <div class="faq-list">
            <details v-for="faq in items" :key="faq.question" class="card faq-item">
              <summary>{{ faq.question }}</summary>
              <p>{{ faq.answer }}</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 0;
}

.faq-layout,
.faq-side-stack,
.route-list {
  display: grid;
  gap: 14px;
}

.faq-layout {
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  align-items: start;
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

.route-card,
.route-item {
  display: grid;
  gap: 8px;
}

.route-item {
  padding: 12px 14px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.46);
}

.route-item strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.98rem;
  line-height: 1.25;
}

.route-item p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.84rem;
  line-height: 1.58;
}

.faq-sections {
  display: grid;
  gap: 18px;
}

.faq-list {
  display: grid;
  gap: 12px;
}

.result-group-head {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}

.faq-item {
  padding: 0;
}

.faq-item summary {
  cursor: pointer;
  list-style: none;
  padding: 18px 20px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.35;
  letter-spacing: -0.03em;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item[open] summary {
  border-bottom: 1px solid rgba(67, 73, 60, 0.12);
}

.faq-item p {
  margin: 0;
  padding: 16px 20px 20px;
  color: var(--ink-soft);
  line-height: 1.65;
  font-size: 0.92rem;
}

@media (max-width: 900px) {
  .faq-layout,
  .quick-links {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .quick-links {
    grid-template-columns: 1fr;
  }
}
</style>
