<script setup lang="ts">
import { sortBestPractices, sortDocs, sortNews } from '~/data/content'
import { featuredVideos } from '~/data/videos'
import { learningPaths } from '~/data/taxonomy'

useSeo({
  title: '学习路径',
  description: '按新手部署、Windows/WSL、渠道接入、Skills 扩展和团队运维等目标整理 OpenClaw 的连续学习路径。',
  path: '/paths',
})

const { data: manifest } = await useContentManifest()

const pathEditorialMeta: Record<string, {
  lane: string
  duration: string
  goal: string
  outcome: string
  checkpoints: string[]
  related: { title: string; to: string; meta: string }[]
}> = {
  'new-user': {
    lane: '起步主线',
    duration: '20-40 分钟',
    goal: '先跑通第一条本地最小链路',
    outcome: '理解 OpenClaw 的定位，完成安装和 Onboarding，并知道下一步该继续看哪里。',
    checkpoints: ['知道 OpenClaw 是什么', '能完成安装', '能打开 Control UI', '知道问题该去哪排查'],
    related: [
      { title: '快速入门', to: '/docs/getting-started/getting-started', meta: '文档' },
      { title: '安装主题中心', to: '/topics?topic=installation', meta: '主题' },
      { title: '安装与部署合集', to: '/videos#setup', meta: '视频' },
      { title: '常见问题', to: '/faq', meta: 'FAQ' },
    ],
  },
  'channels-integration': {
    lane: '接入主线',
    duration: '30-60 分钟',
    goal: '把 OpenClaw 接进一个真实渠道',
    outcome: '明确渠道能力边界、登录方式和安全边界，完成第一次稳定接入。',
    checkpoints: ['知道支持哪些渠道', '理解 allowFrom / mention', '选定一个目标渠道', '完成一次接入验证'],
    related: [
      { title: '渠道接入视频', to: '/videos#integration', meta: '视频' },
      { title: '渠道接入专题', to: '/topics?topic=channels', meta: '主题' },
      { title: '多渠道接入节奏', to: '/best-practices/multi-agent-routing', meta: '实践' },
    ],
  },
  windows: {
    lane: '平台路径',
    duration: '25-45 分钟',
    goal: '在 Windows 环境中少走弯路',
    outcome: '建立更稳妥的 Windows / WSL 认知，避开首次安装时最常见的环境问题。',
    checkpoints: ['判断是否使用 WSL', '完成本地安装', '确认安全边界', '理解升级和迁移注意点'],
    related: [
      { title: '安装与环境', to: '/docs/setup/installation', meta: '文档' },
      { title: '安装主题中心', to: '/topics?topic=installation', meta: '主题' },
      { title: 'Windows/WSL 视频', to: '/videos#setup', meta: '视频' },
      { title: '迁移指南', to: '/docs/setup/migration-guide', meta: '迁移' },
    ],
  },
  expansion: {
    lane: '扩展主线',
    duration: '40-70 分钟',
    goal: '从“能跑”进入“能做事”',
    outcome: '理解 Skills、Tools、Hooks 的关系，并知道该怎样把它们扩到真实任务流里。',
    checkpoints: ['理解 Tools / Hooks 分工', '找到合适的 Skills', '看懂一个工作流案例', '避免高风险扩展方式'],
    related: [
      { title: 'Skills 与扩展能力', to: '/skills', meta: '技能' },
      { title: 'Skills 与 Tools 主题', to: '/topics?topic=skills-tools', meta: '主题' },
      { title: '关键配置', to: '/configurations', meta: '配置' },
      { title: '自动化实践', to: '/best-practices/automation-workflows', meta: '实践' },
    ],
  },
  'remote-network': {
    lane: '远程主线',
    duration: '30-60 分钟',
    goal: '把远程访问和多设备接入放进同一套边界里理解',
    outcome: '知道远程访问、Tailnet、配对与多 Gateway 隔离之间的关系，避免把远程化做成新的风险入口。',
    checkpoints: ['理解网络与配对', '知道远程访问方式', '能判断 serve / funnel 场景', '知道多设备如何隔离'],
    related: [
      { title: '网络与配对主题', to: '/topics?topic=network', meta: '主题' },
      { title: 'Tailscale 文档', to: '/docs/operations/tailscale-serve-and-funnel', meta: '文档' },
      { title: '团队频道策略', to: '/docs/operations/team-channel-session-strategy', meta: '运维' },
    ],
  },
  'team-ops': {
    lane: '稳态主线',
    duration: '45-80 分钟',
    goal: '把 OpenClaw 当长期运行系统来看',
    outcome: '建立 Gateway、安全、升级、监控和反馈的长期方法，不再只停留在安装成功。',
    checkpoints: ['理解 Gateway 架构', '知道暴露面和认证边界', '知道怎么升级', '知道怎么回收问题反馈'],
    related: [
      { title: 'Gateway 运维', to: '/docs/operations/gateway-operations', meta: '文档' },
      { title: '安全与权限主题', to: '/topics?topic=security', meta: '主题' },
      { title: '安全基础', to: '/docs/operations/safety-basics', meta: '安全' },
      { title: '监控与告警', to: '/best-practices/monitoring-alerting', meta: '实践' },
    ],
  },
}

const pathSignals = [
  {
    label: '页面作用',
    value: '把零散知识接成路线',
    note: '你不需要自己在文档、视频、实践和 FAQ 之间拼图，这一页先帮你决定顺序。',
  },
  {
    label: '最适合谁',
    value: '已经知道自己当前问题的人',
    note: '先判断你现在是首次部署、环境受限、想接渠道，还是需要长期运维。',
  },
  {
    label: '推荐方法',
    value: '一次只走完一条路径',
    note: '不要在第一次上手时同时看模型、渠道、自动化和安全。先完成一条闭环，再进入下一条。',
  },
]

const nowDocs = computed(() => sortDocs((manifest.value?.collections.docs.items || []) as any[]))
const nowNews = computed(() => sortNews((manifest.value?.collections.news.items || []) as any[]))
const nowPractices = computed(() => sortBestPractices((manifest.value?.collections.bestPractices.items || []) as any[]))

const pathStats = computed(() => [
  { label: '学习路径', value: String(learningPaths.length) },
  { label: '文档节点', value: String(nowDocs.value.length) },
  { label: '实践参考', value: String(nowPractices.value.length) },
  { label: '更新动态', value: String(nowNews.value.length) },
])

const pathCards = computed(() =>
  learningPaths.map((path, index) => {
    const editorial = pathEditorialMeta[path.slug]

    return {
      ...path,
      index,
      lane: editorial?.lane || '学习路线',
      duration: editorial?.duration || '20-40 分钟',
      goal: editorial?.goal || '按顺序完成一条学习闭环',
      outcome: editorial?.outcome || path.summary,
      checkpoints: editorial?.checkpoints || [],
      related: editorial?.related || [],
    }
  }),
)

const latestSignals = computed(() => [
  nowDocs.value[0] && {
    title: nowDocs.value[0].title,
    description: nowDocs.value[0].description || '从文档开始建立结构。',
    to: nowDocs.value[0].path,
    meta: '文档更新',
  },
  nowPractices.value[0] && {
    title: nowPractices.value[0].title,
    description: nowPractices.value[0].description || '从实践里理解更稳定的方法。',
    to: nowPractices.value[0].path,
    meta: '实践补充',
  },
  nowNews.value[0] && {
    title: nowNews.value[0].title,
    description: nowNews.value[0].description || '跟踪最近变化。',
    to: nowNews.value[0].path,
    meta: '最近更新',
  },
  featuredVideos[0] && {
    title: featuredVideos[0].title,
    description: featuredVideos[0].description,
    to: featuredVideos[0].to,
    meta: '视频入口',
  },
].filter(Boolean) as Array<{ title: string; description: string; to: string; meta: string }>)

const chooserCards = [
  {
    title: '第一次部署，先求跑通',
    description: '优先选“新手首次部署路径”。它解决的是理解产品、完成安装和第一次进入 Control UI。',
    to: '#new-user',
  },
  {
    title: '我在 Windows 环境里卡住',
    description: '优先选“Windows / WSL 路径”。它比泛泛教程更适合先判断环境差异和迁移方式。',
    to: '#windows',
  },
  {
    title: '我已经跑通，想接渠道',
    description: '优先选“渠道接入路径”。先搞清楚入口和安全边界，再做具体集成。',
    to: '#channels-integration',
  },
  {
    title: '我想扩能力，不只停留在安装',
    description: '优先选“Skills 与扩展路径”。它会把 Tools、Hooks、配置和实践串起来。',
    to: '#expansion',
  },
  {
    title: '我准备长期运行或团队使用',
    description: '优先选“团队运维路径”。它对应的是稳态方法，不是一次性搭建清单。',
    to: '#team-ops',
  },
]
</script>

<template>
  <section class="section">
    <div class="container collection-page paths-page">
      <section class="collection-hero paths-hero">
        <div class="card collection-main hero-main">
          <p class="eyebrow">Learning Paths</p>
          <h1 class="section-title">学习路径</h1>
          <p class="section-copy">
            学习 OpenClaw 最容易浪费时间的地方，不是内容太少，而是入口太多。这个页面把现有文档、视频、最佳实践和更新信号重新组织成几条连续路径，让你先选问题，再顺着路线往下走。
          </p>

          <div class="hero-map">
            <div class="hero-line" />
            <NuxtLink
              v-for="item in pathCards"
              :key="item.slug"
              :to="`#${item.slug}`"
              class="hero-node"
            >
              <span class="hero-index">{{ String(item.index + 1).padStart(2, '0') }}</span>
              <div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.goal }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>

        <aside class="hero-side">
          <div class="card stat-panel">
            <article v-for="item in pathStats" :key="item.label" class="stat-item">
              <span class="mini-label">{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </article>
          </div>

          <div class="card signal-panel">
            <article v-for="item in pathSignals" :key="item.label" class="signal-item">
              <span class="mini-label">{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
              <p>{{ item.note }}</p>
            </article>
          </div>
        </aside>
      </section>

      <section class="chooser-shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">先判断自己在哪个阶段</p>
            <p class="section-copy">如果你不确定该先看哪条路线，从这里直接选最像你当前问题的一项。</p>
          </div>
        </div>

        <div class="grid chooser-grid">
          <NuxtLink v-for="item in chooserCards" :key="item.title" :to="item.to" class="card chooser-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <section class="path-stack">
        <article
          v-for="path in pathCards"
          :id="path.slug"
          :key="path.slug"
          class="card path-card"
        >
          <div class="path-shell">
            <div class="path-column intro-column">
              <span class="path-number">{{ String(path.index + 1).padStart(2, '0') }}</span>
              <span class="tag">{{ path.lane }}</span>
              <h2>{{ path.title }}</h2>
              <p class="path-audience">{{ path.audience }}</p>
              <p class="path-summary">{{ path.summary }}</p>

              <div class="path-meta-grid">
                <article class="meta-box">
                  <span class="mini-label">目标</span>
                  <p>{{ path.goal }}</p>
                </article>
                <article class="meta-box">
                  <span class="mini-label">预计节奏</span>
                  <p>{{ path.duration }}</p>
                </article>
                <article class="meta-box wide">
                  <span class="mini-label">完成后你应该得到什么</span>
                  <p>{{ path.outcome }}</p>
                </article>
              </div>

              <NuxtLink class="button primary route-entry" :to="path.next">从这条路径开始</NuxtLink>
            </div>

            <div class="path-column steps-column">
              <div class="section-head compact-head">
                <div>
                  <p class="eyebrow">路径步骤</p>
                  <p class="section-copy">按这个顺序走，不要随意打乱。每一步都对应一个明确页面。</p>
                </div>
              </div>

              <ol class="step-list">
                <li v-for="(step, stepIndex) in path.steps" :key="step.to" class="step-item">
                  <span class="step-index">{{ stepIndex + 1 }}</span>
                  <NuxtLink :to="step.to" class="step-link">
                    <strong>{{ step.title }}</strong>
                    <span>{{ step.to }}</span>
                  </NuxtLink>
                </li>
              </ol>

              <div class="checkpoint-box">
                <p class="eyebrow">完成检查</p>
                <div class="checkpoint-grid">
                  <span v-for="item in path.checkpoints" :key="item" class="checkpoint-item">{{ item }}</span>
                </div>
              </div>
            </div>

            <div class="path-column related-column">
              <div class="section-head compact-head">
                <div>
                  <p class="eyebrow">补充资源</p>
                  <p class="section-copy">这几项适合作为这一条路径的补充，而不是起点。</p>
                </div>
              </div>

              <div class="related-grid">
                <NuxtLink
                  v-for="item in path.related"
                  :key="item.to"
                  :to="item.to"
                  class="related-card"
                >
                  <span class="tag">{{ item.meta }}</span>
                  <strong>{{ item.title }}</strong>
                </NuxtLink>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section class="signal-shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">路径之外，先看这些更新信号</p>
            <p class="section-copy">如果你已经选好路径，这些更新能帮你判断最近有没有新的资料值得插队看一眼。</p>
          </div>
        </div>

        <div class="grid signal-grid">
          <NuxtLink v-for="item in latestSignals" :key="item.to" :to="item.to" class="card resource-card">
            <span class="tag">{{ item.meta }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.paths-page {
  display: grid;
  gap: 22px;
}

.paths-hero {
  align-items: stretch;
}

.hero-main {
  display: grid;
  gap: 18px;
}

.hero-side {
  display: grid;
  gap: 16px;
}

.stat-panel,
.signal-panel {
  display: grid;
  gap: 12px;
}

.stat-panel {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.stat-item,
.signal-item {
  display: grid;
  gap: 6px;
}

.stat-item strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.6rem;
  line-height: 1;
  letter-spacing: -0.04em;
}

.signal-item strong,
.chooser-card strong,
.resource-card strong,
.related-card strong {
  font-size: 0.98rem;
}

.signal-item p,
.chooser-card p,
.resource-card p,
.path-audience,
.path-summary,
.meta-box p,
.related-card,
.step-link span {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.68;
}

.hero-map {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  padding-top: 8px;
}

.hero-line {
  position: absolute;
  left: 18px;
  right: 18px;
  top: 20px;
  height: 1px;
  background: linear-gradient(90deg, rgba(19, 129, 125, 0.16), rgba(166, 111, 44, 0.3), rgba(19, 129, 125, 0.16));
}

.hero-node {
  position: relative;
  display: grid;
  gap: 10px;
  padding: 10px 12px 0 0;
}

.hero-index,
.path-number,
.step-index {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.92rem;
  color: #fff9f0;
  background: linear-gradient(135deg, var(--brand) 0%, #a66f2c 100%);
  box-shadow: 0 14px 26px rgba(63, 72, 46, 0.12);
}

.hero-node strong,
.path-card h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  letter-spacing: -0.03em;
}

.hero-node strong {
  font-size: 0.96rem;
}

.hero-node p {
  margin: 4px 0 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.58;
}

.chooser-shell,
.signal-shell {
  display: grid;
  gap: 14px;
}

.chooser-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.chooser-card {
  display: grid;
  gap: 8px;
  min-height: 100%;
}

.path-stack {
  display: grid;
  gap: 16px;
}

.path-card {
  padding: 18px;
}

.path-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.2fr) minmax(260px, 0.8fr);
  gap: 18px;
}

.path-column {
  display: grid;
  align-content: start;
  gap: 14px;
}

.intro-column {
  padding-right: 4px;
}

.path-number {
  width: 42px;
  height: 42px;
}

.path-card h2 {
  font-size: 1.44rem;
  line-height: 1.02;
}

.path-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.meta-box {
  display: grid;
  gap: 6px;
  padding: 12px 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.46);
  border: 1px solid rgba(67, 73, 60, 0.08);
}

.meta-box.wide {
  grid-column: 1 / -1;
}

.route-entry {
  width: fit-content;
}

.compact-head {
  margin-bottom: 0;
}

.step-list {
  position: relative;
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.step-item {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}

.step-link {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.52);
}

.step-link strong {
  font-size: 0.98rem;
}

.step-link span {
  font-size: 0.78rem;
  word-break: break-all;
}

.checkpoint-box {
  display: grid;
  gap: 10px;
  padding-top: 4px;
}

.checkpoint-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.checkpoint-item {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(19, 129, 125, 0.08);
  color: var(--brand);
  font-size: 0.8rem;
  font-weight: 700;
}

.related-grid {
  display: grid;
  gap: 10px;
}

.related-card {
  display: grid;
  gap: 8px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 250, 243, 0.72);
}

.signal-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.resource-card {
  display: grid;
  gap: 8px;
}

.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 1180px) {
  .learn-switch-grid,
  .hero-map,
  .chooser-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .path-shell {
    grid-template-columns: 1fr;
  }

  .signal-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 780px) {
  .stat-panel,
  .learn-switch-grid,
  .hero-map,
  .chooser-grid,
  .signal-grid,
  .path-meta-grid {
    grid-template-columns: 1fr;
  }
}
</style>
