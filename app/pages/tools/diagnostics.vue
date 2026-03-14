<script setup lang="ts">
useSeo({
  title: '诊断与排障',
  description: 'OpenClaw 工具层诊断与排障指南：问题定位流程、常见问题解决、日志分析、性能优化和调试技巧。',
  path: '/tools/diagnostics',
})

// 诊断流程
const diagnosticFlow = [
  {
    step: 1,
    title: '确认问题现象',
    description: '明确问题的具体表现，收集错误信息和复现步骤',
    actions: [
      '记录错误消息',
      '截图问题现象',
      '确定复现步骤',
      '评估影响范围',
    ],
  },
  {
    step: 2,
    title: '定位问题层级',
    description: '判断问题属于哪个层级：插件、配置、权限、环境',
    actions: [
      '检查是否已安装',
      '检查是否已启用',
      '检查配置是否正确',
      '检查环境是否满足',
    ],
  },
  {
    step: 3,
    title: '收集诊断信息',
    description: '使用诊断工具收集系统状态和日志',
    actions: [
      '运行诊断命令',
      '查看日志文件',
      '检查系统状态',
      '收集环境信息',
    ],
  },
  {
    step: 4,
    title: '分析根因',
    description: '根据收集的信息分析问题根本原因',
    actions: [
      '对比正常状态',
      '检查变更历史',
      '分析错误模式',
      '查阅已知问题',
    ],
  },
  {
    step: 5,
    title: '实施修复',
    description: '根据分析结果实施修复方案',
    actions: [
      '备份当前状态',
      '应用修复方案',
      '验证修复效果',
      '记录解决方案',
    ],
  },
]

// 诊断命令
const diagnosticCommands = [
  {
    command: 'openclaw doctor',
    description: '运行系统诊断，检查常见问题',
    output: `Running OpenClaw diagnostics...

✓ Configuration file exists
✓ Gateway is running
✓ Database connection OK
⚠ Plugin 'telegram' not enabled
✗ Missing environment variable: OPENAI_API_KEY

Summary: 3 passed, 1 warning, 1 error`,
  },
  {
    command: 'openclaw status',
    description: '查看系统运行状态',
    output: `OpenClaw Status
─────────────────────────────────
Version:     1.2.3
Uptime:      2d 4h 32m
Gateway:     Running (port 3000)
Agents:      2 active
Channels:    3 connected
Memory:      256MB / 1GB
CPU:         2.3%`,
  },
  {
    command: 'openclaw logs [type]',
    description: '查看系统日志',
    output: `# 查看所有日志
openclaw logs

# 查看错误日志
openclaw logs --level error

# 实时查看日志
openclaw logs --follow

# 查看特定组件日志
openclaw logs --component gateway`,
  },
  {
    command: 'openclaw config show',
    description: '显示当前配置',
    output: `Current Configuration
─────────────────────────────────
Gateway:
  Host: 0.0.0.0
  Port: 3000
  Auth: enabled

Agents:
  Default: assistant
  Model: claude-3-sonnet

Channels:
  telegram: enabled
  discord: disabled`,
  },
  {
    command: 'openclaw plugins list',
    description: '列出已安装插件',
    output: `Installed Plugins
─────────────────────────────────
telegram    v1.2.3   enabled
chroma      v0.8.1   enabled
whisper     v1.0.0   disabled`,
  },
  {
    command: 'openclaw health',
    description: '健康检查',
    output: `Health Check Results
─────────────────────────────────
✓ Gateway responding
✓ Database healthy
✓ Memory usage normal
✓ All channels connected
✓ No pending errors`,
  },
]

// 常见问题分类
const commonIssues = [
  {
    category: '安装与启动',
    icon: '📦',
    issues: [
      {
        problem: '插件安装后不生效',
        causes: ['插件未启用', '需要重启 Gateway', '配置位置错误'],
        solutions: [
          '运行 openclaw plugins enable <name>',
          '重启 Gateway: openclaw restart',
          '检查配置是否在正确位置',
        ],
      },
      {
        problem: 'Gateway 启动失败',
        causes: ['端口被占用', '配置文件错误', '依赖缺失'],
        solutions: [
          '检查端口占用: lsof -i :3000',
          '验证配置: openclaw config validate',
          '安装依赖: npm install',
        ],
      },
      {
        problem: '配置修改后未生效',
        causes: ['需要重载配置', '配置格式错误', '配置位置错误'],
        solutions: [
          '重载配置: openclaw reload',
          '验证配置格式',
          '确认配置文件路径正确',
        ],
      },
    ],
  },
  {
    category: '渠道接入',
    icon: '📡',
    issues: [
      {
        problem: '消息收不到',
        causes: ['Webhook 未配置', 'Bot Token 无效', '权限不足'],
        solutions: [
          '检查 Webhook 配置',
          '验证 Bot Token 有效性',
          '确认 Bot 有必要权限',
        ],
      },
      {
        problem: '消息发送失败',
        causes: ['频率限制', '消息格式错误', '用户权限问题'],
        solutions: [
          '检查 API 限制',
          '验证消息格式',
          '确认用户允许接收消息',
        ],
      },
      {
        problem: '群组消息无响应',
        causes: ['未配置群组规则', '缺少 mention', '权限不足'],
        solutions: [
          '配置群组规则',
          '检查 requireMention 设置',
          '确认 Bot 在群组中的权限',
        ],
      },
    ],
  },
  {
    category: '执行与权限',
    icon: '🔐',
    issues: [
      {
        problem: '工具执行被拒绝',
        causes: ['审批策略限制', 'Sandbox 隔离', '权限不足'],
        solutions: [
          '检查审批配置',
          '确认 Sandbox 设置',
          '调整权限配置',
        ],
      },
      {
        problem: '文件操作失败',
        causes: ['路径不存在', '权限不足', 'Sandbox 限制'],
        solutions: [
          '确认文件路径正确',
          '检查文件权限',
          '调整 Sandbox 范围',
        ],
      },
      {
        problem: '命令执行超时',
        causes: ['命令执行时间过长', '资源不足', '网络问题'],
        solutions: [
          '增加超时时间',
          '检查系统资源',
          '检查网络连接',
        ],
      },
    ],
  },
  {
    category: '性能问题',
    icon: '⚡',
    issues: [
      {
        problem: '响应缓慢',
        causes: ['模型响应慢', '内存不足', '并发过高'],
        solutions: [
          '检查模型 API 延迟',
          '增加内存配置',
          '限制并发数量',
        ],
      },
      {
        problem: '内存占用过高',
        causes: ['会话过多', '日志过大', '内存泄漏'],
        solutions: [
          '清理旧会话',
          '清理日志文件',
          '重启服务',
        ],
      },
      {
        problem: 'CPU 占用过高',
        causes: ['任务过多', '死循环', '资源竞争'],
        solutions: [
          '减少并发任务',
          '检查任务逻辑',
          '优化配置',
        ],
      },
    ],
  },
]

// 日志分析
const logAnalysis = {
  logLevels: [
    { level: 'debug', color: '#6b7280', description: '调试信息，详细执行过程' },
    { level: 'info', color: '#3b82f6', description: '常规信息，正常操作记录' },
    { level: 'warn', color: '#f59e0b', description: '警告信息，潜在问题提示' },
    { level: 'error', color: '#ef4444', description: '错误信息，需要关注处理' },
  ],
  commonPatterns: [
    {
      pattern: 'ECONNREFUSED',
      meaning: '连接被拒绝',
      solution: '检查目标服务是否运行，端口是否正确',
    },
    {
      pattern: 'ETIMEDOUT',
      meaning: '连接超时',
      solution: '检查网络连接，增加超时时间',
    },
    {
      pattern: 'ENOENT',
      meaning: '文件不存在',
      solution: '确认文件路径正确，创建必要文件',
    },
    {
      pattern: 'EACCES',
      meaning: '权限不足',
      solution: '检查文件/目录权限，使用正确的用户运行',
    },
    {
      pattern: 'Unauthorized',
      meaning: '认证失败',
      solution: '检查 API Key 是否正确，是否过期',
    },
    {
      pattern: 'Rate limit',
      meaning: '频率限制',
      solution: '降低请求频率，等待限制重置',
    },
  ],
  logConfig: `{
  "logging": {
    "level": "debug",
    "format": "json",
    "outputs": ["console", "file"],
    "file": {
      "path": "~/.openclaw/logs/debug.log",
      "maxSize": "50m",
      "maxFiles": 10
    }
  }
}`,
}

// 调试技巧
const debugTips = [
  {
    title: '启用详细日志',
    description: '将日志级别设置为 debug，获取更多执行细节',
    icon: '📝',
  },
  {
    title: '使用测试环境',
    description: '在隔离的测试环境中复现问题，避免影响生产',
    icon: '🧪',
  },
  {
    title: '逐步排查',
    description: '从最简单的配置开始，逐步添加复杂度',
    icon: '🔍',
  },
  {
    title: '对比正常状态',
    description: '与正常工作的配置对比，找出差异点',
    icon: '⚖️',
  },
  {
    title: '检查变更历史',
    description: '查看最近的配置变更，定位问题引入时间',
    icon: '📜',
  },
  {
    title: '查阅文档和社区',
    description: '搜索官方文档和社区讨论，查找已知问题',
    icon: '📚',
  },
]

// 性能优化
const performanceTips = [
  {
    title: '优化模型调用',
    items: [
      '使用合适的模型，避免过度使用高成本模型',
      '控制上下文大小，避免过长的对话历史',
      '使用流式响应，提升用户体验',
    ],
  },
  {
    title: '优化资源使用',
    items: [
      '定期清理旧会话和日志',
      '限制并发任务数量',
      '使用缓存减少重复计算',
    ],
  },
  {
    title: '优化网络请求',
    items: [
      '使用连接池复用连接',
      '设置合理的超时时间',
      '实现请求重试机制',
    ],
  },
  {
    title: '优化存储',
    items: [
      '定期清理向量数据库',
      '压缩历史数据',
      '使用高效的存储格式',
    ],
  },
]

// FAQ
const faqs = [
  {
    q: '如何查看详细的错误信息？',
    a: '将日志级别设置为 debug，查看日志文件或使用 openclaw logs --level debug 命令。',
  },
  {
    q: '问题只在生产环境出现怎么办？',
    a: '检查生产环境与本地环境的差异：配置、环境变量、网络、资源等。使用 openclaw doctor 收集诊断信息。',
  },
  {
    q: '如何判断是插件问题还是配置问题？',
    a: '禁用插件后测试，如果问题消失则是插件问题。检查插件配置是否正确，查看插件日志。',
  },
  {
    q: 'Gateway 响应很慢怎么排查？',
    a: '检查系统资源使用、模型 API 延迟、网络连接状态。使用 openclaw status 查看运行状态。',
  },
  {
    q: '如何恢复到上一个稳定状态？',
    a: '使用版本控制管理配置文件，保留备份。插件可以使用 openclaw plugins update <name>@<version> 回滚。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container tools-detail-page">
      <!-- Hero -->
      <section class="detail-hero">
        <div class="card hero-main">
          <p class="eyebrow">Diagnostics</p>
          <h1 class="section-title">诊断与排障</h1>
          <p class="section-copy">
            工具排障最忌讳的是一出问题就重新安装。更高效的方法，是先判断问题出在层级、配置、权限、运行环境还是版本变化，然后针对性解决。
          </p>
        </div>

        <aside class="card hero-side">
          <div class="signal-panel">
            <span class="mini-label">最高频问题</span>
            <strong>装了但没生效</strong>
            <p>根因通常不是插件本身坏了，而是没启用、没重启、配错位置或装错机器。</p>
          </div>
          <div class="signal-panel">
            <span class="mini-label">最稳排障顺序</span>
            <strong>层级 → 权限 → 环境 → 版本</strong>
            <p>先判断问题属于哪一层，再动配置或重装，效率更高。</p>
          </div>
        </aside>
      </section>

      <!-- 诊断流程 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Process</p>
          <h2>诊断流程</h2>
          <p class="section-copy">按照这个流程系统性地定位和解决问题。</p>
        </div>

        <div class="flow-grid">
          <article v-for="step in diagnosticFlow" :key="step.step" class="flow-card">
            <div class="flow-number">{{ step.step }}</div>
            <div class="flow-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <ul>
                <li v-for="action in step.actions" :key="action">{{ action }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <!-- 诊断命令 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Commands</p>
          <h2>诊断命令参考</h2>
          <p class="section-copy">掌握这些命令，快速收集诊断信息。</p>
        </div>

        <div class="commands-grid">
          <article v-for="cmd in diagnosticCommands" :key="cmd.command" class="command-card">
            <div class="command-header">
              <code class="command-name">{{ cmd.command }}</code>
              <span class="command-desc">{{ cmd.description }}</span>
            </div>
            <pre class="command-output"><code>{{ cmd.output }}</code></pre>
          </article>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Common Issues</p>
          <h2>常见问题分类</h2>
          <p class="section-copy">按类别查找问题和解决方案。</p>
        </div>

        <div class="issues-grid">
          <article v-for="cat in commonIssues" :key="cat.category" class="issue-category">
            <div class="category-header">
              <span class="category-icon">{{ cat.icon }}</span>
              <h3>{{ cat.category }}</h3>
            </div>
            <div class="issues-list">
              <div v-for="issue in cat.issues" :key="issue.problem" class="issue-item">
                <h4>{{ issue.problem }}</h4>
                <div class="issue-details">
                  <div class="issue-causes">
                    <span class="label">可能原因：</span>
                    <ul>
                      <li v-for="cause in issue.causes" :key="cause">{{ cause }}</li>
                    </ul>
                  </div>
                  <div class="issue-solutions">
                    <span class="label">解决方案：</span>
                    <ol>
                      <li v-for="solution in issue.solutions" :key="solution">{{ solution }}</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 日志分析 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Log Analysis</p>
          <h2>日志分析</h2>
          <p class="section-copy">学会阅读和分析日志，快速定位问题。</p>
        </div>

        <div class="log-content">
          <div class="log-levels">
            <h3>日志级别</h3>
            <div class="levels-list">
              <div v-for="l in logAnalysis.logLevels" :key="l.level" class="level-item">
                <span class="level-badge" :style="{ backgroundColor: l.color }">{{ l.level }}</span>
                <span class="level-desc">{{ l.description }}</span>
              </div>
            </div>
          </div>

          <div class="log-patterns">
            <h3>常见错误模式</h3>
            <div class="patterns-table">
              <div class="pattern-header">
                <span>模式</span>
                <span>含义</span>
                <span>解决方案</span>
              </div>
              <div v-for="p in logAnalysis.commonPatterns" :key="p.pattern" class="pattern-row">
                <code>{{ p.pattern }}</code>
                <span>{{ p.meaning }}</span>
                <span>{{ p.solution }}</span>
              </div>
            </div>
          </div>

          <div class="log-config">
            <h3>日志配置</h3>
            <pre class="config-code"><code>{{ logAnalysis.logConfig }}</code></pre>
          </div>
        </div>
      </section>

      <!-- 调试技巧 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Tips</p>
          <h2>调试技巧</h2>
        </div>

        <div class="tips-grid">
          <article v-for="tip in debugTips" :key="tip.title" class="tip-card">
            <span class="tip-icon">{{ tip.icon }}</span>
            <h3>{{ tip.title }}</h3>
            <p>{{ tip.description }}</p>
          </article>
        </div>
      </section>

      <!-- 性能优化 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Performance</p>
          <h2>性能优化建议</h2>
        </div>

        <div class="performance-grid">
          <article v-for="p in performanceTips" :key="p.title" class="performance-card">
            <h3>{{ p.title }}</h3>
            <ul>
              <li v-for="item in p.items" :key="item">{{ item }}</li>
            </ul>
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
          <NuxtLink to="/tools/plugins" class="related-link">
            <span class="tag">Plugins</span>
            <strong>插件系统</strong>
            <p>插件安装和管理。</p>
          </NuxtLink>
          <NuxtLink to="/docs/reference/troubleshooting" class="related-link">
            <span class="tag">Docs</span>
            <strong>故障排除文档</strong>
            <p>官方故障排除指南。</p>
          </NuxtLink>
          <NuxtLink to="/community" class="related-link">
            <span class="tag">Community</span>
            <strong>社区支持</strong>
            <p>获取社区帮助。</p>
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

/* Flow */
.flow-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.flow-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.flow-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--brand);
  color: white;
  font-weight: 700;
}

.flow-content h3 {
  margin: 0 0 8px;
  font-size: 0.95rem;
}

.flow-content p {
  margin: 0 0 8px;
  font-size: 0.82rem;
  color: var(--ink-soft);
}

.flow-content ul {
  margin: 0;
  padding-left: 16px;
  font-size: 0.8rem;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* Commands */
.commands-grid {
  display: grid;
  gap: 16px;
}

.command-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.command-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.command-name {
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.05);
  font-size: 0.85rem;
  font-weight: 600;
}

.command-desc {
  font-size: 0.88rem;
  color: var(--ink-soft);
}

.command-output {
  margin: 0;
  padding: 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
  overflow-x: auto;
}

.command-output code {
  font-size: 0.75rem;
  line-height: 1.5;
  white-space: pre;
}

/* Issues */
.issues-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.issue-category {
  padding: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.4);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.category-icon {
  font-size: 1.5rem;
}

.category-header h3 {
  margin: 0;
  font-size: 1.05rem;
}

.issues-list {
  display: grid;
  gap: 12px;
}

.issue-item {
  padding: 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
}

.issue-item h4 {
  margin: 0 0 10px;
  font-size: 0.9rem;
}

.issue-details {
  display: grid;
  gap: 10px;
}

.issue-causes,
.issue-solutions {
  font-size: 0.82rem;
}

.issue-details .label {
  font-weight: 600;
  color: var(--ink);
}

.issue-details ul,
.issue-details ol {
  margin: 4px 0 0;
  padding-left: 18px;
  color: var(--ink-soft);
  line-height: 1.5;
}

/* Log Analysis */
.log-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
}

.log-levels h3,
.log-patterns h3,
.log-config h3 {
  margin: 0 0 12px;
  font-size: 1rem;
}

.levels-list {
  display: grid;
  gap: 8px;
}

.level-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
}

.level-badge {
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.level-desc {
  color: var(--ink-soft);
}

.patterns-table {
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.pattern-header,
.pattern-row {
  display: grid;
  grid-template-columns: 120px 1fr 1.5fr;
  gap: 12px;
  padding: 10px 14px;
  font-size: 0.85rem;
}

.pattern-header {
  background: rgba(0, 0, 0, 0.03);
  font-weight: 600;
  font-size: 0.8rem;
}

.pattern-row {
  border-top: 1px solid rgba(67, 73, 60, 0.08);
}

.pattern-row code {
  font-size: 0.75rem;
}

.config-code {
  margin: 0;
  padding: 14px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.03);
}

.config-code code {
  font-size: 0.75rem;
}

/* Tips */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.tip-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  text-align: center;
}

.tip-icon {
  font-size: 1.8rem;
  display: block;
  margin-bottom: 8px;
}

.tip-card h3 {
  margin: 0 0 8px;
  font-size: 0.95rem;
}

.tip-card p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

/* Performance */
.performance-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.performance-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.performance-card h3 {
  margin: 0 0 12px;
  font-size: 0.95rem;
}

.performance-card ul {
  margin: 0;
  padding-left: 18px;
  font-size: 0.85rem;
  color: var(--ink-soft);
  line-height: 1.6;
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

@media (max-width: 1200px) {
  .flow-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1100px) {
  .detail-hero,
  .issues-grid,
  .log-content,
  .tips-grid,
  .performance-grid,
  .related-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .flow-grid {
    grid-template-columns: 1fr;
  }
}
</style>