<script setup lang="ts">
useSeo({
  title: '社区支持',
  description: '查看 OpenClawCN 的社区入口、问题分流方式、贡献路径和中文社区协作现状。',
  path: '/community',
})

const primaryChannels = [
  {
    title: '先查资料',
    summary: '适合刚接触 OpenClaw、概念还不清晰，或者需要先确认是否已有答案。',
    detail: '从文档与 FAQ 开始，通常比直接发问更快。',
    href: '/docs',
    cta: '查看文档',
    tag: '推荐起点',
  },
  {
    title: '提交明确问题',
    summary: '适合 bug、功能异常、可复现问题、缺失页面或需要长期追踪的事项。',
    detail: '优先进入 GitHub Issues，方便公开跟踪和补充上下文。',
    href: 'https://github.com/openclaw/openclaw/issues',
    cta: '打开 Issues',
    tag: '公开跟踪',
  },
  {
    title: '反馈中文站内容',
    summary: '适合错别字、结构建议、内容缺失、链接异常或页面展示问题。',
    detail: '如果问题只和中文站有关，用站内反馈更高效。',
    href: '/feedback',
    cta: '提交反馈',
    tag: '站内入口',
  },
  {
    title: '持续跟踪动态',
    summary: '适合长期关注产品变化，不想靠手动刷新页面检查。',
    detail: 'RSS 和新闻页负责承接更新追踪。',
    href: '/rss.xml',
    cta: '订阅 RSS',
    tag: '持续订阅',
  },
]

const triageSteps = [
  {
    step: '01',
    title: '先判断问题属于哪一层',
    description: '产品能力、使用方法、站点内容、还是代码级 bug。先分层，才能走对入口。',
  },
  {
    step: '02',
    title: '再决定是否需要公开追踪',
    description: '需要复现、协作、补日志和后续回溯的，放到 GitHub；只涉及中文站内容时走站内反馈。',
  },
  {
    step: '03',
    title: '最后补齐上下文',
    description: '带上版本、页面路径、错误信息、复现步骤或预期行为，能显著减少来回沟通。',
  },
]

const scenarios = [
  {
    label: '看不懂概念',
    route: '文档 / FAQ',
    note: '先建立背景，再决定是否继续提问。',
  },
  {
    label: '中文站内容有问题',
    route: '反馈表单',
    note: '适合错别字、结构建议、缺图、链接错误。',
  },
  {
    label: '功能异常或 bug',
    route: 'GitHub Issues',
    note: '适合公开跟踪和补充复现信息。',
  },
  {
    label: '想持续关注更新',
    route: '新闻 / RSS',
    note: '适合版本变化、能力更新、里程碑追踪。',
  },
]

const contributionLanes = [
  {
    title: '内容修订',
    description: '纠正表达、补充案例、优化阅读路径，让中文资料更稳定。',
    action: '从反馈或文档页开始',
  },
  {
    title: '问题归档',
    description: '把零散的使用问题整理成 FAQ、最佳实践或更清晰的 Issue。',
    action: '优先形成可复用的问题描述',
  },
  {
    title: '能力验证',
    description: '围绕安装、渠道接入、运维、安全等主题补充真实使用反馈。',
    action: '用实践案例提升文档可信度',
  },
]

const communityStatus = [
  {
    label: '当前主入口',
    value: 'GitHub + 站内反馈',
  },
  {
    label: '适合提问的内容',
    value: '使用问题、缺失说明、站点异常、可复现 bug',
  },
  {
    label: '仍在补充',
    value: '更完整的中文讨论渠道与内容协作机制',
  },
]

const faqs = [
  {
    question: '我第一次接触 OpenClaw，应该从哪里开始？',
    answer: '先看文档首页和快速开始，再进入安装、功能手册或 FAQ。这样提问时上下文会更完整。',
  },
  {
    question: '我发现的是中文站问题，不是 OpenClaw 本身的问题，发哪里更合适？',
    answer: '直接走站内反馈。这样能更快区分是内容修订、结构优化还是页面 bug。',
  },
  {
    question: '什么情况下应该直接去 GitHub Issues？',
    answer: '当问题需要复现、公开讨论、附日志或长期跟踪时，GitHub Issues 比私下反馈更合适。',
  },
  {
    question: '现在有独立的中文社区群吗？',
    answer: '当前仍以 GitHub 和站内反馈为主。中文社区入口会随着内容与协作机制成熟逐步补充。',
  },
]
</script>

<template>
  <section class="section community-page">
    <div class="container">
      <section class="hero-shell">
        <div class="hero-copy">
          <p class="eyebrow">Community Desk</p>
          <h1 class="hero-title">把问题分流、协作入口和更新追踪放到同一个工作台里。</h1>
          <p class="section-copy hero-description">
            社区页不该只是入口合集。这里优先回答三件事：你现在该去哪里、怎样提问更容易被处理、中文社区当前已经提供了什么。
          </p>

          <div class="hero-summary">
            <article class="summary-chip">
              <span>建议起点</span>
              <strong>先查文档，再决定是否公开提问</strong>
            </article>
            <article class="summary-chip">
              <span>目标</span>
              <strong>减少入口混用，让问题更快被归档和处理</strong>
            </article>
          </div>

          <div class="button-row hero-actions">
            <NuxtLink class="button primary" to="/docs">先看文档</NuxtLink>
            <a class="button secondary" href="https://github.com/openclaw/openclaw/issues" target="_blank" rel="noreferrer">
              提交 Issue
            </a>
            <NuxtLink class="button ghost" to="/feedback">反馈中文站</NuxtLink>
          </div>

          <div class="hero-signals">
            <div class="signal-pill">
              <strong>资料优先</strong>
              <span>概念不清先查文档与 FAQ</span>
            </div>
            <div class="signal-pill">
              <strong>问题公开化</strong>
              <span>可复现 bug 优先进入 GitHub</span>
            </div>
            <div class="signal-pill">
              <strong>持续更新</strong>
              <span>新闻页与 RSS 承接长期追踪</span>
            </div>
          </div>
        </div>

        <aside class="signal-board card">
          <div class="board-heading">
            <p class="board-kicker">社区工作台</p>
            <p class="board-summary">把入口、提问要点和当前协作状态放在一个更容易浏览的摘要面板里。</p>
          </div>
          <div class="board-grid">
            <article class="board-stat">
              <span class="board-label">优先入口</span>
              <strong>文档 / Issues / 反馈</strong>
              <p>先判断问题类型，再选择对应入口。</p>
            </article>
            <article class="board-stat">
              <span class="board-label">建议携带</span>
              <strong>版本、路径、现象、预期</strong>
              <p>信息越完整，越容易直接进入处理。</p>
            </article>
            <article class="board-stat">
              <span class="board-label">当前状态</span>
              <strong>中文支持持续建设中</strong>
              <p>当前以资料沉淀和问题归档为核心。</p>
            </article>
          </div>

          <div class="board-checklist">
            <span class="board-list-title">提问前快速检查</span>
            <ul>
              <li>是否已经看过对应文档或 FAQ</li>
              <li>是否能描述复现步骤与预期结果</li>
              <li>是否需要公开跟踪而不是一次性回复</li>
            </ul>
          </div>
        </aside>
      </section>

      <section class="priority-panel">
        <div class="section-heading">
          <p class="eyebrow">Priority Routes</p>
          <h2 class="section-title">先选正确入口，再开始沟通。</h2>
        </div>

        <div class="priority-grid">
          <a
            v-for="channel in primaryChannels"
            :key="channel.title"
            class="card route-card"
            :href="channel.href"
            :target="channel.href.startsWith('http') ? '_blank' : undefined"
            :rel="channel.href.startsWith('http') ? 'noreferrer' : undefined"
          >
            <span class="route-tag">{{ channel.tag }}</span>
            <h3>{{ channel.title }}</h3>
            <p>{{ channel.summary }}</p>
            <span class="route-detail">{{ channel.detail }}</span>
            <span class="route-cta">{{ channel.cta }}</span>
          </a>
        </div>
      </section>

      <section class="triage-layout">
        <div class="card triage-card">
          <div class="section-heading">
            <p class="eyebrow">Triage Flow</p>
            <h2 class="section-title">遇到问题时，按这个顺序判断。</h2>
          </div>

          <div class="triage-steps">
            <article v-for="item in triageSteps" :key="item.step" class="triage-step">
              <span class="triage-step-no">{{ item.step }}</span>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </article>
          </div>
        </div>

        <div class="card scenario-card">
          <div class="section-heading">
            <p class="eyebrow">Quick Map</p>
            <h2 class="section-title">常见场景对应入口</h2>
          </div>

          <div class="scenario-grid">
            <article v-for="scenario in scenarios" :key="scenario.label" class="scenario-item">
              <span class="scenario-label">{{ scenario.label }}</span>
              <strong>{{ scenario.route }}</strong>
              <p>{{ scenario.note }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="contribute-layout">
        <div class="card contribution-card">
          <div class="section-heading">
            <p class="eyebrow">Contribution</p>
            <h2 class="section-title">如果你想参与建设，优先做这些事。</h2>
          </div>

          <div class="lane-grid">
            <article v-for="lane in contributionLanes" :key="lane.title" class="lane-item">
              <h3>{{ lane.title }}</h3>
              <p>{{ lane.description }}</p>
              <span>{{ lane.action }}</span>
            </article>
          </div>
        </div>

        <div class="card status-card">
          <div class="section-heading">
            <p class="eyebrow">Status</p>
            <h2 class="section-title">中文社区当前状态</h2>
          </div>

          <div class="status-list">
            <article v-for="item in communityStatus" :key="item.label" class="status-item">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </article>
          </div>

          <div class="button-row status-actions">
            <NuxtLink class="button secondary" to="/docs/community">查看协作说明</NuxtLink>
            <NuxtLink class="button ghost" to="/news">查看新闻动态</NuxtLink>
          </div>
        </div>
      </section>

      <section class="faq-panel">
        <div class="section-heading">
          <p class="eyebrow">FAQ</p>
          <h2 class="section-title">把最容易重复的问题先说清楚。</h2>
        </div>

        <div class="faq-list">
          <details v-for="faq in faqs" :key="faq.question" class="card faq-item">
            <summary>{{ faq.question }}</summary>
            <p>{{ faq.answer }}</p>
          </details>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.community-page {
  --community-shadow: 0 24px 54px rgba(64, 49, 27, 0.12);
}

.hero-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(320px, 0.82fr);
  gap: 18px;
  align-items: start;
}

.hero-copy {
  position: relative;
  padding: 28px 30px 28px;
  border: 1px solid rgba(12, 108, 105, 0.14);
  border-radius: 32px;
  background:
    radial-gradient(circle at top left, rgba(19, 129, 125, 0.14), transparent 32%),
    radial-gradient(circle at 88% 22%, rgba(166, 111, 44, 0.18), transparent 24%),
    linear-gradient(180deg, rgba(255, 252, 247, 0.94), rgba(247, 240, 227, 0.98));
  box-shadow: var(--community-shadow);
  overflow: hidden;
}

.hero-copy::after {
  content: "";
  position: absolute;
  right: -32px;
  bottom: -42px;
  width: 180px;
  height: 180px;
  border-radius: 28px;
  background:
    linear-gradient(145deg, rgba(19, 129, 125, 0.12), rgba(255, 255, 255, 0.16)),
    rgba(255, 255, 255, 0.44);
  border: 1px solid rgba(255, 255, 255, 0.6);
  transform: rotate(18deg);
}

.hero-title {
  max-width: 22ch;
  margin: 14px 0 10px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: clamp(1.4rem, 1.9vw, 2.05rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.hero-description {
  max-width: 58ch;
}

.hero-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}

.summary-chip {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.58);
}

.summary-chip span,
.board-list-title {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.summary-chip strong {
  font-size: 0.95rem;
  line-height: 1.45;
}

.hero-actions {
  margin-top: 18px;
}

.hero-signals {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}

.signal-pill {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-height: auto;
  padding: 12px 14px 13px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.66);
}

.signal-pill strong,
.board-stat strong,
.route-card h3,
.triage-step h3,
.scenario-item strong,
.lane-item h3,
.status-item strong,
.faq-item summary {
  font-family: "Fraunces", "Times New Roman", serif;
}

.signal-pill strong {
  font-size: 0.9rem;
}

.signal-pill span,
.board-stat p,
.route-card p,
.triage-step p,
.scenario-item p,
.lane-item p,
.faq-item p {
  color: var(--ink-soft);
  line-height: 1.68;
}

.signal-board {
  padding: 22px;
}

.board-heading {
  margin-bottom: 14px;
}

.board-kicker {
  margin: 0;
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.board-summary {
  margin: 8px 0 0;
  color: var(--ink-soft);
  line-height: 1.6;
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.board-stat {
  padding: 14px 15px 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.48);
}

.board-stat:last-child {
  grid-column: 1 / -1;
}

.board-label,
.route-tag,
.triage-step-no,
.scenario-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.board-label {
  margin-bottom: 8px;
  color: var(--brand);
}

.board-stat strong {
  display: block;
  margin-bottom: 6px;
  font-size: 1.02rem;
  line-height: 1.2;
}

.board-stat p {
  margin: 0;
  font-size: 0.92rem;
}

.board-checklist {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(67, 73, 60, 0.12);
}

.board-checklist ul {
  margin: 10px 0 0;
  padding-left: 18px;
  color: var(--ink-soft);
}

.board-checklist li + li {
  margin-top: 7px;
}

.priority-panel,
.faq-panel {
  margin-top: 20px;
}

.section-heading {
  margin-bottom: 14px;
}

.priority-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.route-card {
  display: grid;
  align-content: start;
  gap: 10px;
  min-height: 220px;
  padding: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.route-card:hover {
  transform: translateY(-4px);
  border-color: rgba(12, 108, 105, 0.18);
  box-shadow: 0 22px 36px rgba(64, 49, 27, 0.12);
}

.route-tag {
  width: fit-content;
  padding: 5px 10px;
  color: var(--accent);
  background: rgba(234, 215, 182, 0.44);
}

.route-card h3 {
  margin: 0;
  font-size: 1.15rem;
  letter-spacing: -0.03em;
  line-height: 1.4;
}

.route-card p,
.route-detail {
  margin: 0;
  font-size: 0.96rem;
}

.route-detail {
  color: var(--ink);
  font-weight: 600;
}

.route-cta {
  margin-top: auto;
  color: var(--brand);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.triage-layout,
.contribute-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
  gap: 14px;
  margin-top: 18px;
}

.triage-card,
.scenario-card,
.contribution-card,
.status-card {
  padding-top: 20px;
}

.triage-steps,
.status-list {
  display: grid;
  gap: 12px;
}

.triage-step {
  display: grid;
  grid-template-columns: 60px minmax(0, 1fr);
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid rgba(67, 73, 60, 0.12);
}

.triage-step:first-child {
  border-top: 0;
}

.triage-step-no {
  width: 46px;
  height: 46px;
  color: #f8f4ea;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
}

.triage-step h3,
.lane-item h3 {
  margin: 0 0 5px;
  font-size: 1.02rem;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.triage-step p,
.lane-item p,
.status-item span,
.status-item strong {
  margin: 0;
}

.scenario-grid,
.lane-grid {
  display: grid;
  gap: 10px;
}

.scenario-item,
.lane-item {
  padding: 14px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.46);
}

.scenario-label {
  width: fit-content;
  margin-bottom: 6px;
  padding: 3px 8px;
  color: var(--accent);
  background: rgba(234, 215, 182, 0.42);
}

.scenario-item strong {
  display: block;
  margin-bottom: 3px;
  font-size: 1rem;
  letter-spacing: -0.03em;
}

.lane-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.lane-item span {
  display: inline-flex;
  margin-top: 8px;
  color: var(--brand);
  font-size: 0.8rem;
  font-weight: 700;
}

.status-list {
  margin-top: 4px;
}

.status-item {
  display: grid;
  gap: 5px;
  padding: 12px 0;
  border-top: 1px solid rgba(67, 73, 60, 0.12);
}

.status-item:first-child {
  border-top: 0;
}

.status-item span {
  color: var(--ink-soft);
  font-size: 0.82rem;
}

.status-item strong {
  font-size: 1.02rem;
  line-height: 1.3;
  letter-spacing: -0.04em;
}

.status-actions {
  margin-top: 14px;
}

.faq-list {
  display: grid;
  gap: 12px;
}

.faq-item {
  padding: 0;
}

.faq-item summary {
  cursor: pointer;
  list-style: none;
  padding: 18px 22px;
  font-size: 1.05rem;
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
  padding: 16px 22px 22px;
}

@media (max-width: 1180px) {
  .priority-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lane-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 980px) {
  .hero-shell,
  .triage-layout,
  .contribute-layout {
    grid-template-columns: 1fr;
  }

  .hero-summary,
  .board-grid,
  .hero-signals {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .hero-copy {
    padding: 24px 20px 26px;
    border-radius: 26px;
  }

  .priority-grid {
    grid-template-columns: 1fr;
  }

  .triage-step {
    grid-template-columns: 1fr;
  }
}
</style>
