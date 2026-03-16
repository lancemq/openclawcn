<script setup lang="ts">
type FeedbackItem = {
  id: string
  type: string
  topic: string
  expectation: string
  title: string
  urgency: string
  name: string
  email: string
  page: string
  message: string
  source: string
  userAgent: string
  ip: string
  receivedAt: string
}

type FeedbackResponse = {
  ok: boolean
  count: number
  generatedAt: string
  storage: string
  storageDir: string
  items: FeedbackItem[]
}

const route = useRoute()
const token = computed(() => String(route.query.token || '').trim())
const typeFilter = ref('all')
const urgencyFilter = ref('all')
const topicFilter = ref('all')

useSeo({
  title: '反馈记录',
  description: '管理员反馈记录汇总页，仅用于内部查看网站反馈提交内容。',
  path: '/admin/feedback',
  noindex: true,
})

const { data, pending, error, refresh } = await useAsyncData<FeedbackResponse | null>(
  'admin-feedback-records',
  () => {
    if (!token.value) {
      return Promise.resolve(null)
    }

    return $fetch('/api/admin/feedback', {
      query: {
        token: token.value,
      },
    })
  },
  {
    watch: [token],
    default: () => null,
  },
)

const allItems = computed(() => data.value?.items || [])

const summary = computed(() => {
  const items = allItems.value
  const latestItem = items[0]

  return {
    total: items.length,
    bugCount: items.filter(item => item.type === 'bug').length,
    highUrgencyCount: items.filter(item => item.urgency === 'high').length,
    latestAt: latestItem?.receivedAt || '',
  }
})

const typeOptions = computed(() => ['all', ...new Set(allItems.value.map(item => item.type).filter(Boolean))])
const urgencyOptions = computed(() => ['all', ...new Set(allItems.value.map(item => item.urgency).filter(Boolean))])
const topicOptions = computed(() => ['all', ...new Set(allItems.value.map(item => item.topic).filter(Boolean))])

const filteredItems = computed(() =>
  allItems.value.filter((item) => {
    if (typeFilter.value !== 'all' && item.type !== typeFilter.value) {
      return false
    }

    if (urgencyFilter.value !== 'all' && item.urgency !== urgencyFilter.value) {
      return false
    }

    if (topicFilter.value !== 'all' && item.topic !== topicFilter.value) {
      return false
    }

    return true
  }),
)

function formatDate(value: string) {
  if (!value) {
    return '暂无'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function formatLabel(value: string, fallback = '未填写') {
  return value || fallback
}
</script>

<template>
  <section class="section">
    <div class="container admin-feedback-page">
      <section class="collection-hero admin-feedback-hero">
        <div class="card collection-main admin-main">
          <p class="eyebrow">Admin</p>
          <h1 class="section-title">反馈记录台</h1>
          <p class="section-copy">
            这里汇总站点通过反馈工具提交的记录，仅用于管理员查看、筛选和回溯问题来源。
          </p>

          <div class="admin-hero-meta">
            <span>访问方式：`/admin/feedback?token=你的管理员 token`</span>
            <span>数据来源：本地文件存储汇总</span>
          </div>
        </div>

        <aside class="card collection-side admin-side">
          <div class="admin-side-panel">
            <span class="mini-label">访问限制</span>
            <strong>页面不会进入公开导航，也不会加入搜索和 sitemap。</strong>
            <p>真正的访问控制在服务端接口上，只有携带有效 token 才能看到记录内容。</p>
          </div>

          <div class="admin-side-panel">
            <span class="mini-label">当前状态</span>
            <p v-if="token">已携带 token，可请求管理员接口。</p>
            <p v-else>当前未携带 token，页面只会显示访问说明。</p>
          </div>
        </aside>
      </section>

      <section v-if="!token" class="card access-panel">
        <p class="mini-label">需要授权</p>
        <h2>请通过管理员 token 访问</h2>
        <p>
          直接在地址后附加查询参数即可，例如
          <code>/admin/feedback?token=your-secret-token</code>。
        </p>
      </section>

      <section v-else-if="error" class="card access-panel">
        <p class="mini-label">访问失败</p>
        <h2>{{ error.statusCode === 401 ? 'token 无效或已失效' : '暂时无法读取反馈记录' }}</h2>
        <p>{{ error.statusMessage || '请检查管理员 token 与服务端配置。' }}</p>
        <button class="ghost-button" type="button" @click="refresh()">重新尝试</button>
      </section>

      <template v-else>
        <section class="stats-grid">
          <article class="card stat-card">
            <span>总记录</span>
            <strong>{{ summary.total }}</strong>
          </article>
          <article class="card stat-card">
            <span>高优先级</span>
            <strong>{{ summary.highUrgencyCount }}</strong>
          </article>
          <article class="card stat-card">
            <span>Bug 反馈</span>
            <strong>{{ summary.bugCount }}</strong>
          </article>
          <article class="card stat-card">
            <span>最近提交</span>
            <strong>{{ formatDate(summary.latestAt) }}</strong>
          </article>
        </section>

        <section class="card filter-panel">
          <div class="filter-head">
            <div>
              <p class="mini-label">筛选</p>
              <h2>按类型、紧急程度和主题查看</h2>
            </div>
            <p class="filter-meta" v-if="data">
              共 {{ data.count }} 条，当前展示 {{ filteredItems.length }} 条
            </p>
          </div>

          <div class="filter-grid">
            <label class="filter-field">
              <span>反馈类型</span>
              <select v-model="typeFilter">
                <option v-for="option in typeOptions" :key="option" :value="option">
                  {{ option === 'all' ? '全部' : option }}
                </option>
              </select>
            </label>

            <label class="filter-field">
              <span>紧急程度</span>
              <select v-model="urgencyFilter">
                <option v-for="option in urgencyOptions" :key="option" :value="option">
                  {{ option === 'all' ? '全部' : option }}
                </option>
              </select>
            </label>

            <label class="filter-field">
              <span>主题模块</span>
              <select v-model="topicFilter">
                <option v-for="option in topicOptions" :key="option" :value="option">
                  {{ option === 'all' ? '全部' : option }}
                </option>
              </select>
            </label>
          </div>
        </section>

        <section v-if="pending" class="card access-panel">
          <p class="mini-label">正在读取</p>
          <h2>反馈记录加载中</h2>
          <p>正在整理管理员可查看的反馈数据。</p>
        </section>

        <section v-else-if="filteredItems.length === 0" class="card access-panel">
          <p class="mini-label">暂无结果</p>
          <h2>当前筛选条件下没有反馈记录</h2>
          <p>你可以切换筛选条件，或确认本环境是否已经保存过反馈文件。</p>
        </section>

        <section v-else class="feedback-list">
          <article v-for="item in filteredItems" :key="item.id" class="card feedback-record">
            <div class="record-head">
              <div class="record-title">
                <div class="record-badges">
                  <span class="record-badge">{{ formatLabel(item.type, 'unknown') }}</span>
                  <span class="record-badge record-badge-soft">{{ formatLabel(item.urgency, 'normal') }}</span>
                  <span v-if="item.topic" class="record-badge record-badge-topic">{{ item.topic }}</span>
                </div>
                <h2>{{ item.title }}</h2>
              </div>

              <div class="record-time">
                <span>{{ formatDate(item.receivedAt) }}</span>
                <code>{{ item.id }}</code>
              </div>
            </div>

            <div class="record-grid">
              <div class="record-meta">
                <span>提交人</span>
                <strong>{{ formatLabel(item.name) }}</strong>
              </div>
              <div class="record-meta">
                <span>邮箱</span>
                <strong>{{ formatLabel(item.email) }}</strong>
              </div>
              <div class="record-meta">
                <span>来源页面</span>
                <strong>{{ formatLabel(item.page) }}</strong>
              </div>
              <div class="record-meta">
                <span>诉求类型</span>
                <strong>{{ formatLabel(item.expectation) }}</strong>
              </div>
            </div>

            <div class="record-message">
              <span class="mini-label">反馈内容</span>
              <p>{{ item.message }}</p>
            </div>

            <details class="record-extra">
              <summary>查看技术信息</summary>
              <div class="record-extra-grid">
                <div>
                  <span>来源标识</span>
                  <strong>{{ formatLabel(item.source) }}</strong>
                </div>
                <div>
                  <span>IP</span>
                  <strong>{{ formatLabel(item.ip) }}</strong>
                </div>
                <div class="record-user-agent">
                  <span>User Agent</span>
                  <strong>{{ formatLabel(item.userAgent) }}</strong>
                </div>
                <div class="record-user-agent">
                  <span>存储位置</span>
                  <strong>{{ data?.storageDir || '未知' }}</strong>
                </div>
              </div>
            </details>
          </article>
        </section>
      </template>
    </div>
  </section>
</template>

<style scoped>
.admin-feedback-page,
.admin-feedback-hero,
.admin-main,
.admin-side,
.admin-side-panel,
.feedback-list,
.filter-panel {
  display: grid;
  gap: 16px;
}

.admin-hero-meta,
.stats-grid,
.filter-grid,
.record-grid,
.record-extra-grid {
  display: grid;
  gap: 12px;
}

.admin-hero-meta {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  color: var(--ink-soft);
  font-size: 0.88rem;
}

.access-panel,
.stat-card,
.filter-panel,
.feedback-record {
  display: grid;
  gap: 12px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stat-card span,
.record-meta span,
.record-extra-grid span {
  color: var(--ink-soft);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.stat-card strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.5rem;
}

.filter-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.filter-head h2,
.record-title h2,
.access-panel h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.2rem;
  line-height: 1.25;
}

.filter-meta {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
}

.filter-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.filter-field {
  display: grid;
  gap: 8px;
}

.filter-field span {
  color: var(--ink-soft);
  font-size: 0.82rem;
  font-weight: 700;
}

.filter-field select,
.ghost-button {
  min-height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  background: rgba(255, 255, 255, 0.72);
  color: var(--ink);
  padding: 0 14px;
}

.ghost-button {
  cursor: pointer;
  justify-self: start;
  font-weight: 700;
}

.record-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: start;
}

.record-title,
.record-message {
  display: grid;
  gap: 10px;
}

.record-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.record-badge {
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.12);
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
}

.record-badge-soft {
  background: rgba(196, 166, 97, 0.18);
  color: #7d5e13;
}

.record-badge-topic {
  background: rgba(67, 73, 60, 0.08);
  color: var(--ink-soft);
}

.record-time {
  display: grid;
  gap: 6px;
  justify-items: end;
  color: var(--ink-soft);
  font-size: 0.84rem;
}

.record-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.record-meta {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.46);
  border: 1px solid rgba(67, 73, 60, 0.1);
}

.record-meta strong,
.record-extra-grid strong {
  line-height: 1.5;
  word-break: break-word;
}

.record-message p,
.admin-side-panel p,
.access-panel p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
}

.record-extra {
  display: grid;
  gap: 10px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
  padding-top: 12px;
}

.record-extra summary {
  cursor: pointer;
  color: var(--accent);
  font-weight: 700;
}

.record-extra-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.record-extra-grid > div {
  display: grid;
  gap: 4px;
}

.record-user-agent {
  grid-column: span 2;
}

.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 960px) {
  .stats-grid,
  .filter-grid,
  .record-grid,
  .record-extra-grid,
  .admin-hero-meta {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .stats-grid,
  .filter-grid,
  .record-grid,
  .record-extra-grid,
  .admin-hero-meta {
    grid-template-columns: 1fr;
  }

  .record-head,
  .filter-head {
    grid-template-columns: 1fr;
    display: grid;
  }

  .record-time {
    justify-items: start;
  }

  .record-user-agent {
    grid-column: auto;
  }
}
</style>
