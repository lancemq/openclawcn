<script setup lang="ts">
useSeo({
  title: '自动化与定时任务',
  description: '深入理解 OpenClaw 自动化能力：Cron 定时任务、Heartbeat 心跳、会话管理、日志监控和长期运行策略。',
  path: '/tools/automation',
})

// 自动化类型
const automationTypes = [
  {
    type: 'Cron Jobs',
    icon: '⏰',
    description: '时间驱动的定时任务',
    features: [
      '支持标准 cron 表达式',
      '可配置并发限制',
      '支持会话保留',
      '完整的执行日志',
    ],
    useCase: '日报生成、定期检查、数据同步',
  },
  {
    type: 'Heartbeat',
    icon: '💓',
    description: '主动唤醒机制',
    features: [
      '固定间隔触发',
      'Agent 主动联系用户',
      '支持条件判断',
      '灵活的目标配置',
    ],
    useCase: '定时提醒、状态汇报、周期检查',
  },
  {
    type: 'Workflows',
    icon: '🔄',
    description: '多步骤自动化流程',
    features: [
      '可视化流程设计',
      '条件分支支持',
      '错误处理机制',
      '状态持久化',
    ],
    useCase: '复杂业务流程、数据处理管道',
  },
  {
    type: 'Event Handlers',
    icon: '📨',
    description: '事件驱动的响应处理',
    features: [
      '实时响应事件',
      '灵活的路由配置',
      '支持多种事件源',
      '异步处理能力',
    ],
    useCase: '消息处理、告警响应、用户交互',
  },
]

// Cron 配置详解
const cronConfig = {
  expressions: [
    { expression: '* * * * *', description: '每分钟执行' },
    { expression: '0 * * * *', description: '每小时执行' },
    { expression: '0 8 * * *', description: '每天 8:00 执行' },
    { expression: '0 9 * * 1', description: '每周一 9:00 执行' },
    { expression: '0 0 1 * *', description: '每月 1 日 0:00 执行' },
    { expression: '*/15 * * * *', description: '每 15 分钟执行' },
    { expression: '0 9-17 * * *', description: '工作时间每小时执行' },
    { expression: '0 8 * * 1-5', description: '工作日 8:00 执行' },
  ],
  fullConfig: `{
  "cron": {
    "enabled": true,
    "maxConcurrentRuns": 2,
    "sessionRetention": "24h",

    "jobs": [
      {
        "id": "morning-briefing",
        "schedule": "0 8 * * *",
        "agentId": "assistant",
        "prompt": "生成今日工作简报，包括：日程安排、待办事项、重要提醒",
        "deliverTo": ["telegram:me"]
      },
      {
        "id": "health-check",
        "schedule": "*/15 * * * *",
        "agentId": "monitor",
        "prompt": "检查系统健康状态，如有异常发送告警",
        "onError": "alert"
      },
      {
        "id": "weekly-report",
        "schedule": "0 18 * * 5",
        "agentId": "reporter",
        "prompt": "生成本周工作总结报告",
        "sessionRetention": "168h"
      }
    ],

    "runLog": {
      "maxBytes": "10mb",
      "keepLines": 5000
    }
  }
}`,
}

// Heartbeat 配置详解
const heartbeatConfig = {
  modes: [
    {
      mode: 'interval',
      description: '固定间隔触发',
      example: `{ "every": "30m" }`,
    },
    {
      mode: 'schedule',
      description: '按时间表触发',
      example: `{ "at": ["09:00", "12:00", "18:00"] }`,
    },
    {
      mode: 'smart',
      description: '智能判断触发',
      example: `{ "every": "1h", "condition": "hasPendingTasks" }`,
    },
  ],
  fullConfig: `{
  "agents": {
    "defaults": {
      "heartbeat": {
        "enabled": true,
        "every": "30m",
        "target": "last",
        "directPolicy": "allow",
        "prompt": "检查是否有需要提醒用户的事项，如果有则发送提醒"
      }
    },

    "list": [
      {
        "id": "reminder",
        "heartbeat": {
          "every": "1h",
          "prompt": "检查待办事项，提醒即将到期的任务"
        }
      },
      {
        "id": "monitor",
        "heartbeat": {
          "every": "5m",
          "prompt": "检查系统状态，如有异常立即通知"
        }
      }
    ]
  }
}`,
}

// 会话管理
const sessionManagement = [
  {
    title: '会话隔离',
    description: '每个定时任务使用独立的会话，避免上下文污染',
    config: `"session": {
  "dmScope": "per-job",
  "isolated": true
}`,
  },
  {
    title: '会话保留',
    description: '控制会话数据的保留时间，平衡存储和连续性',
    config: `"sessionRetention": "24h"`,
  },
  {
    title: '会话重置',
    description: '定期重置会话，防止长期运行的问题积累',
    config: `"reset": {
  "mode": "daily",
  "atHour": 4
}`,
  },
  {
    title: '最大消息数',
    description: '限制会话中的消息数量，控制上下文大小',
    config: `"maxMessages": 100`,
  },
]

// 日志与监控
const loggingConfig = {
  levels: ['debug', 'info', 'warn', 'error'],
  config: `{
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": ["console", "file"],

    "file": {
      "path": "~/.openclaw/logs/automation.log",
      "maxSize": "10m",
      "maxFiles": 5
    },

    "rotation": {
      "enabled": true,
      "period": "daily"
    }
  }
}`,
  metrics: [
    { name: '执行次数', description: '任务执行的总次数' },
    { name: '成功率', description: '成功执行的比例' },
    { name: '平均耗时', description: '任务执行的平均时间' },
    { name: '错误分布', description: '错误类型的分布情况' },
  ],
}

// 错误处理策略
const errorHandling = [
  {
    strategy: 'retry',
    icon: '🔄',
    description: '自动重试失败的任务',
    config: `"onError": {
  "retry": {
    "maxAttempts": 3,
    "delay": "1m",
    "backoff": "exponential"
  }
}`,
  },
  {
    strategy: 'alert',
    icon: '🚨',
    description: '发送告警通知',
    config: `"onError": {
  "alert": {
    "channels": ["telegram", "email"],
    "severity": "high"
  }
}`,
  },
  {
    strategy: 'fallback',
    icon: '🔄',
    description: '执行备用方案',
    config: `"onError": {
  "fallback": {
    "agentId": "backup-agent",
    "prompt": "主任务失败，执行备用方案"
  }
}`,
  },
  {
    strategy: 'skip',
    icon: '⏭️',
    description: '跳过本次执行',
    config: `"onError": {
  "skip": true,
  "log": true
}`,
  },
]

// 应用场景
const useCases = [
  {
    title: '日报生成',
    icon: '📊',
    schedule: '每天 8:00',
    description: '自动收集昨日数据，生成工作日报',
    steps: [
      '收集数据源信息',
      '分析关键指标',
      '生成报告内容',
      '发送到指定渠道',
    ],
  },
  {
    title: '系统健康检查',
    icon: '🏥',
    schedule: '每 15 分钟',
    description: '定期检查系统状态，异常时告警',
    steps: [
      '检查服务可用性',
      '检查资源使用率',
      '检查错误日志',
      '异常时发送告警',
    ],
  },
  {
    title: '内容同步',
    icon: '🔄',
    schedule: '每小时',
    description: '同步外部内容到本地系统',
    steps: [
      '获取外部数据',
      '解析和转换',
      '存储到本地',
      '更新索引',
    ],
  },
  {
    title: '待办提醒',
    icon: '🔔',
    schedule: '每 30 分钟',
    description: '检查待办事项，提醒即将到期的任务',
    steps: [
      '获取待办列表',
      '筛选即将到期',
      '生成提醒内容',
      '发送通知',
    ],
  },
]

// 最佳实践
const bestPractices = [
  {
    title: '从简单任务开始',
    description: '先用低风险任务验证自动化配置，再逐步扩展',
    icon: '🎯',
  },
  {
    title: '设置合理的并发限制',
    description: '避免多个任务同时执行导致资源竞争',
    icon: '⚡',
  },
  {
    title: '保留完整的执行日志',
    description: '日志是排查问题的关键，不要为了节省空间而删除',
    icon: '📋',
  },
  {
    title: '设计失败处理策略',
    description: '任何自动化都可能失败，提前设计好应对方案',
    icon: '🛡️',
  },
  {
    title: '定期检查任务价值',
    description: '自动化越多，越需要淘汰不再有价值的任务',
    icon: '🔍',
  },
  {
    title: '监控资源消耗',
    description: '长期运行的任务会消耗资源，定期检查和优化',
    icon: '📊',
  },
]

// 常见问题
const faqs = [
  {
    q: 'Cron 任务执行失败会怎样？',
    a: '根据配置的错误处理策略，可以自动重试、发送告警、执行备用方案或跳过。建议为重要任务配置重试和告警。',
  },
  {
    q: '如何避免任务重叠执行？',
    a: '设置 maxConcurrentRuns 限制并发数，或使用锁机制确保同一时间只有一个实例运行。',
  },
  {
    q: 'Heartbeat 和 Cron 有什么区别？',
    a: 'Cron 是时间驱动的定时任务，在固定时间点执行。Heartbeat 是 agent 主动唤醒机制，让 agent 按固定间隔主动联系用户，更像"定期汇报"。',
  },
  {
    q: '如何调试定时任务？',
    a: '查看执行日志，使用手动触发功能测试，检查会话状态，确认配置正确。',
  },
  {
    q: '任务执行时间过长怎么办？',
    a: '设置超时限制，优化任务逻辑，考虑拆分为多个小任务，或使用异步处理。',
  },
  {
    q: '如何管理多个定时任务？',
    a: '使用任务分组、标签分类，统一配置日志和监控，定期审查和清理无用任务。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container tools-detail-page">
      <!-- Hero -->
      <section class="detail-hero">
        <div class="card hero-main">
          <p class="eyebrow">Automation</p>
          <h1 class="section-title">自动化与定时任务</h1>
          <p class="section-copy">
            从被动响应进入主动运行阶段后，真正重要的就不是"能不能自动跑"，而是运行节奏、日志、失败处理、会话隔离和人工接管。这一页帮你建立长期稳定的自动化能力。
          </p>
        </div>

        <aside class="card hero-side">
          <div class="signal-panel">
            <span class="mini-label">核心机制</span>
            <strong>Cron + Heartbeat</strong>
            <p>一个偏时间驱动，一个偏主动唤醒；前者像定时任务，后者更像固定节奏的助手回访。</p>
          </div>
          <div class="signal-panel">
            <span class="mini-label">关键配套</span>
            <strong>日志、并发、保留策略</strong>
            <p>没有 run log、session retention 和并发限制，任务越多越容易把系统拖乱。</p>
          </div>
        </aside>
      </section>

      <!-- 自动化类型 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Types</p>
          <h2>四种自动化类型</h2>
          <p class="section-copy">根据场景选择合适的自动化方式。</p>
        </div>

        <div class="automation-types-grid">
          <article v-for="t in automationTypes" :key="t.type" class="automation-type-card">
            <div class="type-header">
              <span class="type-icon">{{ t.icon }}</span>
              <h3>{{ t.type }}</h3>
            </div>
            <p class="type-desc">{{ t.description }}</p>
            <ul class="type-features">
              <li v-for="f in t.features" :key="f">{{ f }}</li>
            </ul>
            <div class="type-usecase">
              <span class="label">适用场景</span>
              <span class="value">{{ t.useCase }}</span>
            </div>
          </article>
        </div>
      </section>

      <!-- Cron 配置 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Cron</p>
          <h2>Cron 定时任务配置</h2>
          <p class="section-copy">Cron 是时间驱动的定时任务，适合固定时间执行的周期性任务。</p>
        </div>

        <div class="cron-content">
          <div class="cron-expressions">
            <h3>常用 Cron 表达式</h3>
            <div class="expressions-table">
              <div class="expression-header">
                <span>表达式</span>
                <span>说明</span>
              </div>
              <div v-for="e in cronConfig.expressions" :key="e.expression" class="expression-row">
                <code>{{ e.expression }}</code>
                <span>{{ e.description }}</span>
              </div>
            </div>
          </div>
          <div class="cron-config">
            <h3>完整配置示例</h3>
            <pre class="config-code"><code>{{ cronConfig.fullConfig }}</code></pre>
          </div>
        </div>
      </section>

      <!-- Heartbeat 配置 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Heartbeat</p>
          <h2>Heartbeat 心跳配置</h2>
          <p class="section-copy">Heartbeat 让 agent 按固定间隔主动联系用户，适合提醒和汇报场景。</p>
        </div>

        <div class="heartbeat-content">
          <div class="heartbeat-modes">
            <h3>触发模式</h3>
            <div class="modes-grid">
              <article v-for="m in heartbeatConfig.modes" :key="m.mode" class="mode-card">
                <h4>{{ m.mode }}</h4>
                <p>{{ m.description }}</p>
                <pre class="mode-example"><code>{{ m.example }}</code></pre>
              </article>
            </div>
          </div>
          <div class="heartbeat-config">
            <h3>完整配置示例</h3>
            <pre class="config-code"><code>{{ heartbeatConfig.fullConfig }}</code></pre>
          </div>
        </div>
      </section>

      <!-- 会话管理 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Session</p>
          <h2>会话管理</h2>
          <p class="section-copy">合理的会话管理是长期稳定运行的关键。</p>
        </div>

        <div class="session-grid">
          <article v-for="s in sessionManagement" :key="s.title" class="session-card">
            <h3>{{ s.title }}</h3>
            <p>{{ s.description }}</p>
            <pre class="session-config"><code>{{ s.config }}</code></pre>
          </article>
        </div>
      </section>

      <!-- 日志与监控 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Logging</p>
          <h2>日志与监控</h2>
          <p class="section-copy">完整的日志和监控是排查问题的基础。</p>
        </div>

        <div class="logging-content">
          <div class="logging-config">
            <h3>日志配置</h3>
            <pre class="config-code"><code>{{ loggingConfig.config }}</code></pre>
          </div>
          <div class="logging-metrics">
            <h3>关键指标</h3>
            <div class="metrics-list">
              <div v-for="m in loggingConfig.metrics" :key="m.name" class="metric-item">
                <strong>{{ m.name }}</strong>
                <span>{{ m.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 错误处理 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Error Handling</p>
          <h2>错误处理策略</h2>
          <p class="section-copy">任何自动化都可能失败，提前设计好应对方案。</p>
        </div>

        <div class="error-grid">
          <article v-for="e in errorHandling" :key="e.strategy" class="error-card">
            <div class="error-header">
              <span class="error-icon">{{ e.icon }}</span>
              <h3>{{ e.strategy }}</h3>
            </div>
            <p>{{ e.description }}</p>
            <pre class="error-config"><code>{{ e.config }}</code></pre>
          </article>
        </div>
      </section>

      <!-- 应用场景 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Use Cases</p>
          <h2>典型应用场景</h2>
          <p class="section-copy">这些场景适合作为自动化的起点。</p>
        </div>

        <div class="usecases-grid">
          <article v-for="uc in useCases" :key="uc.title" class="usecase-card">
            <div class="usecase-header">
              <span class="usecase-icon">{{ uc.icon }}</span>
              <div>
                <h3>{{ uc.title }}</h3>
                <code class="usecase-schedule">{{ uc.schedule }}</code>
              </div>
            </div>
            <p class="usecase-desc">{{ uc.description }}</p>
            <ol class="usecase-steps">
              <li v-for="step in uc.steps" :key="step">{{ step }}</li>
            </ol>
          </article>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Best Practices</p>
          <h2>最佳实践</h2>
        </div>

        <div class="practices-grid">
          <article v-for="p in bestPractices" :key="p.title" class="practice-card">
            <span class="practice-icon">{{ p.icon }}</span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.description }}</p>
          </article>
        </div>
      </section>

      <!-- FAQ -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">FAQ</p>
          <h2>常见问题</h2>
        </div>

        <div class="faq-list">
          <article v-for="item in faqs" :key="item.q" class="faq-item">
            <h3>{{ item.q }}</h3>
            <p>{{ item.a }}</p>
          </article>
        </div>
      </section>

      <!-- 相关链接 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Related</p>
          <h2>继续深入</h2>
        </div>

        <div class="related-grid">
          <NuxtLink to="/tools" class="related-link">
            <span class="tag">Tools</span>
            <strong>工具系列总览</strong>
            <p>回到工具系列总入口。</p>
          </NuxtLink>
          <NuxtLink to="/tools/triggers" class="related-link">
            <span class="tag">Triggers</span>
            <strong>触发机制</strong>
            <p>了解 Hooks 和 Webhooks。</p>
          </NuxtLink>
          <NuxtLink to="/best-practices/automation-workflows" class="related-link">
            <span class="tag">Practice</span>
            <strong>自动化实践</strong>
            <p>实际案例和最佳实践。</p>
          </NuxtLink>
          <NuxtLink to="/configurations" class="related-link">
            <span class="tag">Config</span>
            <strong>关键配置</strong>
            <p>Cron 和 Heartbeat 配置详解。</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.tools-detail-page {
  display: grid;
  gap: 24px;
}

.detail-hero {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
  align-items: start;
}

.hero-main,
.hero-side {
  display: grid;
  gap: 16px;
}

.signal-panel {
  display: grid;
  gap: 8px;
}

.signal-panel + .signal-panel {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-panel {
  display: grid;
  gap: 16px;
}

.section-head {
  display: grid;
  gap: 4px;
}

.section-head h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.4rem;
  line-height: 1.3;
}

/* Automation Types */
.automation-types-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.automation-type-card {
  padding: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.5);
}

.type-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.type-icon {
  font-size: 1.8rem;
}

.type-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.type-desc {
  margin: 0 0 12px;
  color: var(--ink-soft);
}

.type-features {
  margin: 0 0 12px;
  padding-left: 18px;
  font-size: 0.85rem;
  color: var(--ink-soft);
  line-height: 1.6;
}

.type-usecase {
  display: flex;
  gap: 8px;
  padding: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
  font-size: 0.85rem;
}

.type-usecase .label {
  color: var(--ink-soft);
}

.type-usecase .value {
  font-weight: 600;
}

/* Cron */
.cron-content,
.heartbeat-content,
.logging-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
}

.cron-expressions h3,
.heartbeat-modes h3,
.heartbeat-config h3,
.cron-config h3,
.logging-config h3,
.logging-metrics h3 {
  margin: 0 0 12px;
  font-size: 1rem;
}

.expressions-table {
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.expression-header,
.expression-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px;
  padding: 10px 14px;
}

.expression-header {
  background: rgba(0, 0, 0, 0.03);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.expression-row {
  border-top: 1px solid rgba(67, 73, 60, 0.08);
  font-size: 0.85rem;
}

.expression-row code {
  font-size: 0.8rem;
}

.config-code {
  margin: 0;
  padding: 14px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.03);
  overflow-x: auto;
}

.config-code code {
  font-size: 0.75rem;
  line-height: 1.5;
}

/* Heartbeat Modes */
.modes-grid {
  display: grid;
  gap: 12px;
}

.mode-card {
  padding: 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
}

.mode-card h4 {
  margin: 0 0 4px;
  font-size: 0.9rem;
  text-transform: capitalize;
}

.mode-card p {
  margin: 0 0 8px;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.mode-example {
  margin: 0;
  padding: 8px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.03);
}

.mode-example code {
  font-size: 0.75rem;
}

/* Session */
.session-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.session-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.session-card h3 {
  margin: 0 0 8px;
  font-size: 0.95rem;
}

.session-card p {
  margin: 0 0 12px;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.session-config {
  margin: 0;
  padding: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
}

.session-config code {
  font-size: 0.75rem;
}

/* Logging Metrics */
.metrics-list {
  display: grid;
  gap: 10px;
}

.metric-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  font-size: 0.88rem;
}

.metric-item strong {
  min-width: 80px;
}

.metric-item span {
  color: var(--ink-soft);
}

/* Error Handling */
.error-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.error-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.error-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.error-icon {
  font-size: 1.4rem;
}

.error-header h3 {
  margin: 0;
  font-size: 0.95rem;
  text-transform: capitalize;
}

.error-card > p {
  margin: 0 0 12px;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.error-config {
  margin: 0;
  padding: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
}

.error-config code {
  font-size: 0.72rem;
}

/* Use Cases */
.usecases-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.usecase-card {
  padding: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.5);
}

.usecase-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.usecase-icon {
  font-size: 1.8rem;
}

.usecase-header h3 {
  margin: 0;
  font-size: 1rem;
}

.usecase-schedule {
  display: block;
  margin-top: 4px;
  font-size: 0.75rem;
  color: var(--accent);
}

.usecase-desc {
  margin: 0 0 12px;
  font-size: 0.88rem;
  color: var(--ink-soft);
}

.usecase-steps {
  margin: 0;
  padding-left: 20px;
  font-size: 0.85rem;
  color: var(--ink-soft);
  line-height: 1.7;
}

/* Practices */
.practices-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.practice-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  text-align: center;
}

.practice-icon {
  font-size: 1.8rem;
  display: block;
  margin-bottom: 8px;
}

.practice-card h3 {
  margin: 0 0 8px;
  font-size: 0.95rem;
}

.practice-card p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

/* FAQ */
.faq-list {
  display: grid;
  gap: 12px;
}

.faq-item {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.faq-item h3 {
  margin: 0 0 8px;
  font-size: 0.95rem;
}

.faq-item p {
  margin: 0;
  font-size: 0.88rem;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* Related */
.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.related-link {
  display: grid;
  gap: 8px;
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.related-link:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
}

.related-link strong {
  font-family: "Fraunces", serif;
  font-size: 0.95rem;
}

.related-link p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--ink-soft);
}

@media (max-width: 1100px) {
  .detail-hero,
  .automation-types-grid,
  .cron-content,
  .heartbeat-content,
  .logging-content,
  .session-grid,
  .error-grid,
  .usecases-grid,
  .practices-grid,
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>