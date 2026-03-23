<script setup lang="ts">
useSeo({
  title: '常见问题',
  description: '查看 OpenClawCN 当前整理的常见问题与建议阅读路径。',
  path: '/faq',
})

const faqs = [
  {
    question: '第一次访问应该从哪里开始？',
    answer: '如果你还不确定入口，先看“我应该先从哪个页面开始”；如果目标是先跑通，就继续看快速入门和安装与环境。',
    category: '入门',
  },
  {
    question: '如果我已经知道自己是个人用户、开发团队或企业运维，该怎么进？',
    answer: '个人用户更适合先看个人入口页；开发团队先看结构和扩展顺序；企业运维先看 Gateway、远程边界、安全和升级治理。',
    category: '入门',
  },
  {
    question: '我现在应该先看文档、学习路径、主题中心还是视频？',
    answer: '想按顺序学就去学习路径；已经知道自己关心安装、模型或安全就去主题中心；更习惯先看演示就去视频教程；只想先跑通就直接从快速入门开始。',
    category: '入门',
  },
  {
    question: '什么时候才适合开始接渠道？',
    answer: '至少在本地最小链路已经跑通、能正常打开 Control UI、知道 Gateway 状态正常后，再进入渠道接入会更稳。',
    category: '入门',
  },
  {
    question: '什么时候再上 Skills、Plugins 或多 Agent？',
    answer: '当你已经稳定完成基础链路，且能明确说出当前缺的是哪类能力时，再少量增加 Skills 或扩展更合适；多 Agent 更适合放到长期稳定运行之后。',
    category: '进阶判断',
  },
  {
    question: '模型、配置和安全这三页我该先看哪个？',
    answer: '选模型去模型页，配系统去配置页，看入口和风险边界去安全页。如果三个问题混在一起，建议顺序是先配置，再模型，最后安全。',
    category: '进阶判断',
  },
  {
    question: 'Dashboard、WebChat 和聊天渠道我该先用哪个？',
    answer: '看系统状态和管理面先用 Dashboard；先测试聊天和上下文更适合 WebChat；只有确定要进入真实沟通软件时，再去接 Telegram、飞书或 WhatsApp。',
    category: '进阶判断',
  },
  {
    question: '为什么长期运行一段时间后，输出会越来越乱？',
    answer: '这通常不只是模型问题，也和 session、memory、compaction 和重置策略有关。长期运行时，需要把会话边界和记忆治理一起看。',
    category: '进阶判断',
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
  { title: '入口判断', to: '/docs/getting-started/which-page-should-i-start-with', desc: '先判断该从哪个入口进' },
  { title: '角色入口', to: '/docs/getting-started/who-is-openclaw-for', desc: '按个人 / 团队 / 运维进入' },
  { title: '快速入门', to: '/docs/getting-started/getting-started', desc: '5分钟建立整体认识' },
  { title: '渠道时机', to: '/docs/getting-started/when-to-connect-channels', desc: '判断什么时候接渠道更稳' },
  { title: '扩展时机', to: '/docs/getting-started/when-to-add-skills-plugins-and-multi-agent', desc: '判断什么时候再补能力' },
  { title: '模型 / 配置 / 安全', to: '/docs/getting-started/when-to-read-models-config-security', desc: '先分清该去哪个专题页' },
  { title: '入口选择', to: '/docs/getting-started/when-to-use-dashboard-webchat-or-channels', desc: '区分 Dashboard、WebChat 和渠道' },
  { title: '提交反馈', to: '/feedback', desc: '报告问题或建议' },
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
