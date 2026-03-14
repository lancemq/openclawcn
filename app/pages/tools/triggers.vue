<script setup lang="ts">
useSeo({
  title: '触发机制',
  description: '深入理解 OpenClaw 的触发机制：Hooks、Webhooks、Mappings、事件驱动与时间驱动的区别和应用场景。',
  path: '/tools/triggers',
})

// 触发类型对比
const triggerTypes = [
  {
    type: 'Hooks',
    icon: '🪝',
    description: '系统内部生命周期钩子',
    trigger: '系统事件（消息接收、会话开始等）',
    useCase: '在关键时机插入规则、流程或内容替换',
    example: '消息预处理、响应后处理、会话初始化',
    risk: '低',
  },
  {
    type: 'Webhooks',
    icon: '🌐',
    description: '外部事件推送入口',
    trigger: '外部系统 HTTP 请求',
    useCase: '接收外部系统事件，触发自动化流程',
    example: '邮件通知、表单提交、CI/CD 事件',
    risk: '中',
  },
  {
    type: 'Cron',
    icon: '⏰',
    description: '时间驱动定时任务',
    trigger: '固定时间点或间隔',
    useCase: '周期性执行任务',
    example: '日报生成、健康检查、数据同步',
    risk: '中',
  },
  {
    type: 'Heartbeat',
    icon: '💓',
    description: '主动唤醒机制',
    trigger: '固定间隔主动触发',
    useCase: '让 agent 主动联系用户',
    example: '定时提醒、状态汇报、周期检查',
    risk: '低',
  },
]

// Hooks 详解
const hooksDetail = {
  lifecycle: [
    {
      event: 'onMessageReceived',
      description: '收到消息时触发',
      usage: '消息预处理、内容过滤、意图识别',
    },
    {
      event: 'onMessageSending',
      description: '发送消息前触发',
      usage: '响应修改、内容注入、格式转换',
    },
    {
      event: 'onMessageSent',
      description: '消息发送后触发',
      usage: '日志记录、状态更新、后续动作',
    },
    {
      event: 'onSessionStart',
      description: '会话开始时触发',
      usage: '初始化上下文、加载用户偏好',
    },
    {
      event: 'onSessionEnd',
      description: '会话结束时触发',
      usage: '清理资源、保存状态、生成摘要',
    },
    {
      event: 'onToolCall',
      description: '工具调用时触发',
      usage: '审批检查、参数验证、日志记录',
    },
  ],
  config: `{
  "hooks": {
    "enabled": true,
    "entries": {
      "content-filter": {
        "event": "onMessageReceived",
        "handler": "filterContent",
        "priority": 100
      },
      "log-response": {
        "event": "onMessageSent",
        "handler": "logMessage",
        "priority": 50
      }
    }
  }
}`,
}

// Webhooks 详解
const webhooksDetail = {
  endpoints: [
    {
      path: '/hooks/gmail',
      description: 'Gmail 邮件通知',
      action: '处理新邮件，生成摘要或提醒',
    },
    {
      path: '/hooks/github',
      description: 'GitHub 事件',
      action: '处理 PR、Issue、Push 等事件',
    },
    {
      path: '/hooks/form',
      description: '表单提交',
      action: '处理用户反馈、订单等表单数据',
    },
    {
      path: '/hooks/alert',
      description: '监控告警',
      action: '接收监控系统告警，触发响应流程',
    },
  ],
  config: `{
  "hooks": {
    "enabled": true,
    "token": "\${WEBHOOK_TOKEN}",
    "path": "/hooks",
    "mappings": [
      {
        "match": { "path": "gmail" },
        "action": "agent",
        "agentId": "email-assistant",
        "deliver": true
      },
      {
        "match": { "path": "github" },
        "action": "workflow",
        "workflowId": "github-handler"
      }
    ]
  }
}`,
  security: [
    '使用 token 验证请求来源',
    '限制允许的 IP 范围',
    '验证请求签名',
    '记录所有 webhook 请求日志',
  ],
}

// Mappings 配置详解
const mappingsConfig = [
  {
    type: 'agent',
    description: '路由到指定 Agent',
    example: `{
  "match": { "path": "support" },
  "action": "agent",
  "agentId": "support-bot"
}`,
  },
  {
    type: 'workflow',
    description: '触发工作流',
    example: `{
  "match": { "path": "deploy" },
  "action": "workflow",
  "workflowId": "deploy-pipeline"
}`,
  },
  {
    type: 'skill',
    description: '调用技能',
    example: `{
  "match": { "path": "summarize" },
  "action": "skill",
  "skillId": "summarizer"
}`,
  },
  {
    type: 'transform',
    description: '数据转换后投递',
    example: `{
  "match": { "path": "notify" },
  "action": "transform",
  "template": "收到新消息：{content}"
}`,
  },
]

// 事件驱动 vs 时间驱动
const triggerComparison = [
  {
    aspect: '触发方式',
    eventDriven: '外部事件或系统事件触发',
    timeDriven: '固定时间点或间隔触发',
  },
  {
    aspect: '响应速度',
    eventDriven: '实时响应，延迟低',
    timeDriven: '取决于调度周期',
  },
  {
    aspect: '资源消耗',
    eventDriven: '事件驱动，按需消耗',
    timeDriven: '持续轮询，固定消耗',
  },
  {
    aspect: '适用场景',
    eventDriven: '消息处理、告警响应、用户交互',
    timeDriven: '日报生成、定期检查、数据同步',
  },
  {
    aspect: '可靠性',
    eventDriven: '依赖事件源可靠性',
    timeDriven: '更可控，不依赖外部',
  },
  {
    aspect: '调试难度',
    eventDriven: '需要模拟事件，较复杂',
    timeDriven: '可预测，较简单',
  },
]

// 应用场景
const useCases = [
  {
    title: '消息预处理',
    icon: '📨',
    trigger: 'Hooks - onMessageReceived',
    description: '在消息进入 agent 前进行过滤、转换或增强',
    steps: [
      '接收原始消息',
      '执行内容过滤',
      '提取关键信息',
      '注入上下文',
      '传递给 agent',
    ],
  },
  {
    title: '外部系统集成',
    icon: '🔗',
    trigger: 'Webhooks',
    description: '接收外部系统事件并触发响应',
    steps: [
      '配置 webhook 端点',
      '外部系统推送事件',
      '验证请求合法性',
      '解析事件数据',
      '触发对应处理流程',
    ],
  },
  {
    title: '定时任务执行',
    icon: '⏰',
    trigger: 'Cron',
    description: '按固定时间表执行任务',
    steps: [
      '定义 cron 表达式',
      '配置任务内容',
      '设置并发限制',
      '配置失败处理',
      '记录执行日志',
    ],
  },
  {
    title: '主动提醒服务',
    icon: '🔔',
    trigger: 'Heartbeat',
    description: '让 agent 主动联系用户',
    steps: [
      '配置心跳间隔',
      '定义触发条件',
      '设置提醒内容',
      '指定目标用户',
      '处理用户响应',
    ],
  },
]

// 配置示例
const configExamples = [
  {
    title: '完整 Hooks 配置',
    description: '包含生命周期钩子和 webhook 映射',
    code: `{
  "hooks": {
    "enabled": true,
    "token": "\${HOOKS_TOKEN}",
    "path": "/hooks",

    // 生命周期钩子
    "entries": {
      "content-filter": {
        "event": "onMessageReceived",
        "handler": "./handlers/filter.js",
        "priority": 100
      },
      "logger": {
        "event": "onMessageSent",
        "handler": "./handlers/logger.js"
      }
    },

    // Webhook 映射
    "mappings": [
      {
        "match": { "path": "gmail" },
        "action": "agent",
        "agentId": "email-bot"
      },
      {
        "match": { "path": "alert" },
        "action": "workflow",
        "workflowId": "alert-handler"
      }
    ]
  }
}`,
  },
  {
    title: 'Cron 定时任务配置',
    description: '配置多个定时任务',
    code: `{
  "cron": {
    "enabled": true,
    "maxConcurrentRuns": 2,
    "sessionRetention": "24h",

    "jobs": [
      {
        "id": "daily-report",
        "schedule": "0 8 * * *",
        "agentId": "reporter",
        "prompt": "生成昨日工作日报"
      },
      {
        "id": "health-check",
        "schedule": "*/15 * * * *",
        "agentId": "monitor",
        "prompt": "检查系统健康状态"
      }
    ],

    "runLog": {
      "maxBytes": "2mb",
      "keepLines": 2000
    }
  }
}`,
  },
  {
    title: 'Heartbeat 心跳配置',
    description: '配置主动唤醒机制',
    code: `{
  "agents": {
    "defaults": {
      "heartbeat": {
        "every": "30m",
        "target": "last",
        "directPolicy": "allow",
        "prompt": "检查是否有需要提醒的事项"
      }
    }
  }
}`,
  },
]

// 最佳实践
const bestPractices = [
  {
    title: '先定义事件链',
    description: '事件从哪里来、交给谁、输出去哪，至少先写成三段。',
    icon: '📝',
  },
  {
    title: '优先最小 mapping',
    description: '先让一个路径只做一件事，再决定要不要扩成复杂流。',
    icon: '🎯',
  },
  {
    title: '保留人工兜底',
    description: '任何外部事件入口都应该有失败后人工查看和补处理的办法。',
    icon: '🛡️',
  },
  {
    title: '分层管理触发器',
    description: '事件触发、时间触发、主动唤醒三者最好不要揉成一个配置故事。',
    icon: '📊',
  },
  {
    title: '记录完整日志',
    description: '所有触发事件都应记录，便于事后排查和审计。',
    icon: '📋',
  },
  {
    title: '设置超时和重试',
    description: '外部调用要设置合理的超时时间和重试策略。',
    icon: '⏱️',
  },
]

// 常见问题
const faqs = [
  {
    q: 'Hooks 和 Webhooks 有什么区别？',
    a: 'Hooks 是系统内部的生命周期钩子，在特定事件发生时触发。Webhooks 是外部系统通过 HTTP 请求推送事件的入口。前者是内部事件驱动，后者是外部事件接入。',
  },
  {
    q: '什么时候用 Cron，什么时候用 Webhook？',
    a: '如果任务是固定时间执行的（如日报），用 Cron。如果任务是响应外部事件的（如收到邮件），用 Webhook。不要把 webhook 当 cron 用。',
  },
  {
    q: '如何保证 Webhook 安全？',
    a: '使用 token 验证、限制 IP 范围、验证请求签名、记录请求日志。不要直接暴露 webhook 端点到公网。',
  },
  {
    q: 'Heartbeat 和 Cron 有什么区别？',
    a: 'Cron 是时间驱动的定时任务，在固定时间点执行。Heartbeat 是 agent 主动唤醒机制，让 agent 按固定间隔主动联系用户，更像"定期汇报"。',
  },
  {
    q: '多个 Hooks 的执行顺序如何控制？',
    a: '通过 priority 字段控制优先级，数值越大越先执行。相同优先级的执行顺序不确定。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container tools-detail-page">
      <!-- Hero -->
      <section class="detail-hero">
        <div class="card hero-main">
          <p class="eyebrow">Triggers</p>
          <h1 class="section-title">触发机制</h1>
          <p class="section-copy">
            触发机制解决的是"什么时候把动作插进来"的问题。理解 Hooks、Webhooks、Cron 和 Heartbeat 的区别，才能设计出清晰可控的自动化流程。
          </p>
        </div>

        <aside class="card hero-side">
          <div class="signal-panel">
            <span class="mini-label">核心区别</span>
            <strong>事件驱动 vs 时间驱动</strong>
            <p>Hooks 和 Webhooks 是事件驱动，Cron 和 Heartbeat 是时间驱动，两者不应该混着理解。</p>
          </div>
          <div class="signal-panel">
            <span class="mini-label">最重要前提</span>
            <strong>先定义输入和出口</strong>
            <p>先知道事件从哪里进来、被路由给谁、失败后去哪看，比写复杂规则更重要。</p>
          </div>
        </aside>
      </section>

      <!-- 触发类型对比 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Trigger Types</p>
          <h2>四种触发类型</h2>
          <p class="section-copy">理解每种触发类型的特点，选择最适合场景的触发方式。</p>
        </div>

        <div class="trigger-types-grid">
          <article v-for="t in triggerTypes" :key="t.type" class="trigger-type-card">
            <div class="trigger-header">
              <span class="trigger-icon">{{ t.icon }}</span>
              <div>
                <h3>{{ t.type }}</h3>
                <span class="trigger-risk" :class="t.risk.toLowerCase()">{{ t.risk }}风险</span>
              </div>
            </div>
            <p class="trigger-desc">{{ t.description }}</p>
            <div class="trigger-details">
              <div class="trigger-detail">
                <span class="label">触发源</span>
                <span class="value">{{ t.trigger }}</span>
              </div>
              <div class="trigger-detail">
                <span class="label">用途</span>
                <span class="value">{{ t.useCase }}</span>
              </div>
              <div class="trigger-detail">
                <span class="label">示例</span>
                <span class="value">{{ t.example }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Hooks 详解 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Hooks</p>
          <h2>生命周期钩子</h2>
          <p class="section-copy">Hooks 在系统内部关键时机插入规则、流程或动作，是生命周期扩展的核心机制。</p>
        </div>

        <div class="hooks-content">
          <div class="hooks-events">
            <h3>可用事件</h3>
            <div class="events-list">
              <article v-for="e in hooksDetail.lifecycle" :key="e.event" class="event-item">
                <code class="event-name">{{ e.event }}</code>
                <p class="event-desc">{{ e.description }}</p>
                <span class="event-usage">{{ e.usage }}</span>
              </article>
            </div>
          </div>
          <div class="hooks-config">
            <h3>配置示例</h3>
            <pre class="config-code"><code>{{ hooksDetail.config }}</code></pre>
          </div>
        </div>
      </section>

      <!-- Webhooks 详解 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Webhooks</p>
          <h2>外部事件入口</h2>
          <p class="section-copy">Webhooks 让外部系统把事件推送进来，是外部集成的关键入口。</p>
        </div>

        <div class="webhooks-content">
          <div class="webhooks-endpoints">
            <h3>常用端点示例</h3>
            <div class="endpoints-list">
              <article v-for="e in webhooksDetail.endpoints" :key="e.path" class="endpoint-item">
                <code class="endpoint-path">{{ e.path }}</code>
                <p class="endpoint-desc">{{ e.description }}</p>
                <span class="endpoint-action">{{ e.action }}</span>
              </article>
            </div>
          </div>
          <div class="webhooks-config">
            <h3>配置示例</h3>
            <pre class="config-code"><code>{{ webhooksDetail.config }}</code></pre>
          </div>
        </div>

        <div class="webhooks-security">
          <h3>安全建议</h3>
          <div class="security-list">
            <div v-for="s in webhooksDetail.security" :key="s" class="security-item">
              <span class="security-icon">🔒</span>
              <span>{{ s }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Mappings 配置 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Mappings</p>
          <h2>事件路由映射</h2>
          <p class="section-copy">Mappings 把路径或事件映射到 agent、动作和投递方式上，是入口分发的关键配置。</p>
        </div>

        <div class="mappings-grid">
          <article v-for="m in mappingsConfig" :key="m.type" class="mapping-card">
            <h3><code>{{ m.type }}</code></h3>
            <p>{{ m.description }}</p>
            <pre class="mapping-example"><code>{{ m.example }}</code></pre>
          </article>
        </div>
      </section>

      <!-- 事件驱动 vs 时间驱动 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Comparison</p>
          <h2>事件驱动 vs 时间驱动</h2>
          <p class="section-copy">理解两种触发模式的区别，选择最适合场景的方式。</p>
        </div>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>维度</th>
                <th>事件驱动</th>
                <th>时间驱动</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in triggerComparison" :key="row.aspect">
                <td class="aspect-cell">{{ row.aspect }}</td>
                <td>{{ row.eventDriven }}</td>
                <td>{{ row.timeDriven }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 应用场景 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Use Cases</p>
          <h2>典型应用场景</h2>
          <p class="section-copy">根据场景选择合适的触发方式。</p>
        </div>

        <div class="usecases-grid">
          <article v-for="uc in useCases" :key="uc.title" class="usecase-card">
            <div class="usecase-header">
              <span class="usecase-icon">{{ uc.icon }}</span>
              <div>
                <h3>{{ uc.title }}</h3>
                <code class="usecase-trigger">{{ uc.trigger }}</code>
              </div>
            </div>
            <p class="usecase-desc">{{ uc.description }}</p>
            <ol class="usecase-steps">
              <li v-for="step in uc.steps" :key="step">{{ step }}</li>
            </ol>
          </article>
        </div>
      </section>

      <!-- 配置示例 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Examples</p>
          <h2>完整配置示例</h2>
          <p class="section-copy">参考这些配置示例，快速搭建触发系统。</p>
        </div>

        <div class="examples-grid">
          <article v-for="ex in configExamples" :key="ex.title" class="example-card">
            <h3>{{ ex.title }}</h3>
            <p>{{ ex.description }}</p>
            <pre class="example-code"><code>{{ ex.code }}</code></pre>
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
          <NuxtLink to="/tools/automation" class="related-link">
            <span class="tag">Automation</span>
            <strong>自动化与定时任务</strong>
            <p>深入了解 Cron 和 Heartbeat。</p>
          </NuxtLink>
          <NuxtLink to="/configurations" class="related-link">
            <span class="tag">Config</span>
            <strong>关键配置</strong>
            <p>触发器配置详解。</p>
          </NuxtLink>
          <NuxtLink to="/docs/manual/hooks-overview" class="related-link">
            <span class="tag">Docs</span>
            <strong>Hooks 文档</strong>
            <p>官方 Hooks 详细文档。</p>
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

/* Trigger Types */
.trigger-types-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.trigger-type-card {
  padding: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.5);
}

.trigger-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.trigger-icon {
  font-size: 2rem;
}

.trigger-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.trigger-risk {
  display: inline-block;
  margin-top: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
}

.trigger-risk.低 {
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
}

.trigger-risk.中 {
  background: rgba(234, 179, 8, 0.15);
  color: #ca8a04;
}

.trigger-desc {
  margin: 0 0 12px;
  color: var(--ink-soft);
}

.trigger-details {
  display: grid;
  gap: 8px;
}

.trigger-detail {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 8px;
  font-size: 0.85rem;
}

.trigger-detail .label {
  color: var(--ink-soft);
}

.trigger-detail .value {
  color: var(--ink);
}

/* Hooks */
.hooks-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.hooks-events h3,
.hooks-config h3,
.webhooks-endpoints h3,
.webhooks-config h3 {
  margin: 0 0 12px;
  font-size: 1rem;
}

.events-list,
.endpoints-list {
  display: grid;
  gap: 10px;
}

.event-item,
.endpoint-item {
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
}

.event-name,
.endpoint-path {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.05);
  font-size: 0.8rem;
  font-weight: 600;
}

.event-desc,
.endpoint-desc {
  margin: 8px 0 4px;
  font-size: 0.88rem;
}

.event-usage,
.endpoint-action {
  font-size: 0.8rem;
  color: var(--ink-soft);
}

.config-code,
.example-code {
  margin: 0;
  padding: 14px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.03);
  overflow-x: auto;
}

.config-code code,
.example-code code {
  font-size: 0.75rem;
  line-height: 1.5;
}

/* Webhooks */
.webhooks-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.webhooks-security {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.webhooks-security h3 {
  margin: 0 0 12px;
  font-size: 1rem;
}

.security-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.security-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
}

.security-icon {
  font-size: 1rem;
}

/* Mappings */
.mappings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.mapping-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.mapping-card h3 {
  margin: 0 0 8px;
  font-size: 0.95rem;
}

.mapping-card h3 code {
  font-size: 0.85rem;
}

.mapping-card > p {
  margin: 0 0 12px;
  font-size: 0.88rem;
  color: var(--ink-soft);
}

.mapping-example {
  margin: 0;
  padding: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
}

.mapping-example code {
  font-size: 0.75rem;
}

/* Comparison Table */
.comparison-table-wrapper {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.comparison-table th,
.comparison-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(67, 73, 60, 0.1);
}

.comparison-table th {
  background: rgba(255, 255, 255, 0.6);
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.comparison-table td {
  background: rgba(255, 255, 255, 0.3);
  line-height: 1.5;
}

.aspect-cell {
  font-weight: 600;
  white-space: nowrap;
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

.usecase-trigger {
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

/* Examples */
.examples-grid {
  display: grid;
  gap: 16px;
}

.example-card {
  padding: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.5);
}

.example-card h3 {
  margin: 0 0 8px;
  font-size: 1rem;
}

.example-card > p {
  margin: 0 0 12px;
  font-size: 0.88rem;
  color: var(--ink-soft);
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
  .trigger-types-grid,
  .hooks-content,
  .webhooks-content,
  .mappings-grid,
  .usecases-grid,
  .practices-grid,
  .related-grid {
    grid-template-columns: 1fr;
  }

  .security-list {
    grid-template-columns: 1fr;
  }
}
</style>