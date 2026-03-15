<script setup lang="ts">
useSeo({
  title: '插件系统',
  description: '深入理解 OpenClaw 插件系统：安装、配置、启停、更新、回滚，以及插件与 Skills、Tools 的边界区分。',
  path: '/tools/plugins',
})

const iconKind = (icon: string) => ({
  '📡': 'flow',
  '🧠': 'orbit',
  '🎤': 'pulse',
  '🔧': 'terminal',
  '🔗': 'grid',
  '🔍': 'spark',
  '📥': 'stack',
  '⚙️': 'grid',
  '✅': 'shield',
  '🔄': 'flow',
  '📋': 'stack',
  '🧪': 'pulse',
  '📝': 'terminal',
  '⏪': 'orbit',
}[icon] || 'grid')

const iconTone = (icon: string) => ({
  '📡': 'brand',
  '🧠': 'accent',
  '🎤': 'accent',
  '🔧': 'muted',
  '🔗': 'brand',
  '🔍': 'accent',
  '📥': 'brand',
  '⚙️': 'muted',
  '✅': 'brand',
  '🔄': 'accent',
  '📋': 'muted',
  '🧪': 'accent',
  '📝': 'muted',
  '⏪': 'muted',
}[icon] || 'brand')

// 插件类型分类
const pluginCategories = [
  {
    title: '渠道插件',
    icon: '📡',
    description: '扩展消息渠道接入能力',
    plugins: [
      { name: 'telegram', description: 'Telegram Bot 接入', status: 'stable' },
      { name: 'discord', description: 'Discord Bot 接入', status: 'stable' },
      { name: 'whatsapp', description: 'WhatsApp Business 接入', status: 'stable' },
      { name: 'feishu', description: '飞书机器人接入', status: 'stable' },
      { name: 'dingtalk', description: '钉钉机器人接入', status: 'beta' },
      { name: 'slack', description: 'Slack App 接入', status: 'stable' },
    ],
  },
  {
    title: '记忆插件',
    icon: '🧠',
    description: '扩展记忆存储和检索能力',
    plugins: [
      { name: 'chroma', description: 'Chroma 向量数据库', status: 'stable' },
      { name: 'pinecone', description: 'Pinecone 云向量库', status: 'stable' },
      { name: 'qdrant', description: 'Qdrant 向量数据库', status: 'stable' },
      { name: 'postgres', description: 'PostgreSQL 存储', status: 'stable' },
    ],
  },
  {
    title: '语音插件',
    icon: '🎤',
    description: '扩展语音识别和合成能力',
    plugins: [
      { name: 'whisper', description: 'OpenAI Whisper 语音识别', status: 'stable' },
      { name: 'elevenlabs', description: 'ElevenLabs 语音合成', status: 'stable' },
      { name: 'azure-speech', description: 'Azure 语音服务', status: 'stable' },
    ],
  },
  {
    title: '工具插件',
    icon: '🔧',
    description: '扩展执行和集成能力',
    plugins: [
      { name: 'browser', description: '浏览器自动化', status: 'stable' },
      { name: 'exec', description: '命令执行能力', status: 'stable' },
      { name: 'filesystem', description: '文件系统操作', status: 'stable' },
      { name: 'http', description: 'HTTP 请求能力', status: 'stable' },
    ],
  },
  {
    title: '集成插件',
    icon: '🔗',
    description: '扩展第三方系统集成',
    plugins: [
      { name: 'github', description: 'GitHub 集成', status: 'stable' },
      { name: 'notion', description: 'Notion 集成', status: 'stable' },
      { name: 'google', description: 'Google 服务集成', status: 'stable' },
      { name: 'linear', description: 'Linear 项目管理', status: 'beta' },
    ],
  },
]

// 插件生命周期
const pluginLifecycle = [
  {
    stage: '发现',
    icon: '🔍',
    description: '查找和评估插件',
    steps: [
      '浏览官方插件市场',
      '查看插件文档和评分',
      '检查维护状态和更新频率',
      '确认与当前版本兼容性',
    ],
  },
  {
    stage: '安装',
    icon: '📥',
    description: '安装插件到系统',
    steps: [
      '选择安装源（npm/本地/git）',
      '执行安装命令',
      '验证安装成功',
      '检查依赖是否满足',
    ],
  },
  {
    stage: '配置',
    icon: '⚙️',
    description: '配置插件参数',
    steps: [
      '阅读配置文档',
      '设置必要参数',
      '配置凭证和密钥',
      '调整运行参数',
    ],
  },
  {
    stage: '启用',
    icon: '✅',
    description: '激活插件功能',
    steps: [
      '启用插件',
      '验证功能可用',
      '测试基本场景',
      '监控运行状态',
    ],
  },
  {
    stage: '维护',
    icon: '🔄',
    description: '更新和问题处理',
    steps: [
      '定期检查更新',
      '测试新版本兼容性',
      '处理运行问题',
      '必要时回滚版本',
    ],
  },
]

// CLI 命令参考
const cliCommands = [
  {
    command: 'openclaw plugins list',
    description: '列出所有已安装插件',
    example: `# 列出所有插件
$ openclaw plugins list

┌─────────────┬─────────┬─────────┬──────────┐
│ Plugin      │ Version │ Status  │ Enabled  │
├─────────────┼─────────┼─────────┼──────────┤
│ telegram    │ 1.2.3   │ active  │ true     │
│ chroma      │ 0.8.1   │ active  │ true     │
│ whisper     │ 1.0.0   │ active  │ false    │
└─────────────┴─────────┴─────────┴──────────┘`,
  },
  {
    command: 'openclaw plugins install <name>',
    description: '安装插件',
    example: `# 从 npm 安装
$ openclaw plugins install @openclaw/plugin-telegram

# 从本地目录安装
$ openclaw plugins install ./my-plugin

# 从 git 仓库安装
$ openclaw plugins install github:user/repo`,
  },
  {
    command: 'openclaw plugins enable <name>',
    description: '启用插件',
    example: `# 启用单个插件
$ openclaw plugins enable telegram

# 启用多个插件
$ openclaw plugins enable telegram discord`,
  },
  {
    command: 'openclaw plugins disable <name>',
    description: '禁用插件',
    example: `# 禁用插件（保留配置）
$ openclaw plugins disable telegram

# 禁用后可随时重新启用
$ openclaw plugins enable telegram`,
  },
  {
    command: 'openclaw plugins update <name>',
    description: '更新插件',
    example: `# 更新到最新版本
$ openclaw plugins update telegram

# 更新到指定版本
$ openclaw plugins update telegram@1.3.0`,
  },
  {
    command: 'openclaw plugins remove <name>',
    description: '移除插件',
    example: `# 移除插件（会提示确认）
$ openclaw plugins remove telegram

# 强制移除（不确认）
$ openclaw plugins remove telegram --force`,
  },
  {
    command: 'openclaw plugins info <name>',
    description: '查看插件详情',
    example: `# 查看插件详细信息
$ openclaw plugins info telegram

Name:        @openclaw/plugin-telegram
Version:     1.2.3
Author:      OpenClaw Team
Description: Telegram bot integration
Config:      ~/.openclaw/plugins/telegram.json
Status:      enabled`,
  },
]

// 配置位置说明
const configLocations = [
  {
    location: 'plugins.entries.<id>.config',
    description: '通用插件配置入口',
    example: `{
  "plugins": {
    "entries": {
      "my-plugin": {
        "enabled": true,
        "config": {
          "apiKey": "\${MY_PLUGIN_API_KEY}",
          "timeout": 30000
        }
      }
    }
  }
}`,
  },
  {
    location: 'channels.<channelId>',
    description: '渠道型插件配置',
    example: `{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "\${TELEGRAM_BOT_TOKEN}",
      "dmPolicy": "pairing"
    }
  }
}`,
  },
  {
    location: 'plugins.slots.memory',
    description: '记忆插件槽位配置',
    example: `{
  "plugins": {
    "slots": {
      "memory": {
        "provider": "chroma",
        "config": {
          "path": "~/.openclaw/data/chroma"
        }
      }
    }
  }
}`,
  },
  {
    location: '独立配置文件',
    description: '插件独立配置文件',
    example: `# ~/.openclaw/plugins/telegram.json
{
  "botToken": "xxx",
  "allowedUsers": [123456789],
  "parseMode": "Markdown"
}`,
  },
]

// 插件 vs Skills vs Tools 对比
const comparisonTable = [
  {
    aspect: '定义',
    plugin: '系统级代码扩展，注册新能力到 Gateway',
    skill: '任务级能力包，组织提示词和工具调用',
    tool: '单个执行能力，如读文件、执行命令',
  },
  {
    aspect: '安装方式',
    plugin: 'npm install / 本地目录 / git',
    skill: '放入 skills 目录 / 配置加载',
    tool: '内置或通过插件注册',
  },
  {
    aspect: '配置位置',
    plugin: 'plugins.entries / channels / slots',
    skill: 'skills.entries / SOUL.md',
    tool: 'tools 配置项',
  },
  {
    aspect: '启停控制',
    plugin: 'enable / disable 命令',
    skill: 'enabled 字段控制',
    tool: 'tools.enabled 控制',
  },
  {
    aspect: '更新方式',
    plugin: 'plugins update 命令',
    skill: '替换文件 / git pull',
    tool: '随插件或系统更新',
  },
  {
    aspect: '风险等级',
    plugin: '高（代码级扩展）',
    skill: '中（提示词和流程）',
    tool: '取决于具体工具',
  },
]

// 最佳实践
const bestPractices = [
  {
    title: '先盘点再安装',
    description: '使用 `plugins list` 确认系统已有能力，避免重复安装功能相似的插件。',
    icon: '📋',
  },
  {
    title: '优先官方插件',
    description: '官方插件经过测试和维护，第三方插件需评估可信度和维护状态。',
    icon: '✅',
  },
  {
    title: '测试环境先行',
    description: '新插件先在测试环境验证，确认无问题后再部署到生产环境。',
    icon: '🧪',
  },
  {
    title: '记录配置变更',
    description: '插件配置变更应记录在版本控制中，便于回滚和问题追踪。',
    icon: '📝',
  },
  {
    title: '定期检查更新',
    description: '定期检查插件更新，但更新前需查看变更日志和兼容性说明。',
    icon: '🔄',
  },
  {
    title: '保留回滚路径',
    description: '更新前记录当前版本，确保可以快速回滚到稳定状态。',
    icon: '⏪',
  },
]

const heroSignals = [
  {
    label: '核心区别',
    value: '插件装能力，Skills 组织能力',
    note: '插件更接近系统级扩展，Skills 更接近任务打法和提示词层的能力包。',
  },
  {
    label: '典型场景',
    value: '渠道、语音、记忆、集成',
    note: '只要涉及 Gateway 里的真实运行代码，通常都更应该先看插件。',
  },
]

// 常见问题
const faqs = [
  {
    q: '插件安装后不生效怎么办？',
    a: '按以下顺序检查：1) 插件是否已启用；2) 是否需要重启 Gateway；3) 配置是否正确；4) 依赖是否满足。',
  },
  {
    q: '如何判断应该用插件还是 Skill？',
    a: '如果需要注册新的执行能力或系统集成，用插件。如果只是组织现有能力完成任务，用 Skill。',
  },
  {
    q: '插件配置写在哪里？',
    a: '取决于插件类型。通用配置在 plugins.entries，渠道配置在 channels，记忆配置在 plugins.slots。查看插件文档确认具体位置。',
  },
  {
    q: '如何开发自己的插件？',
    a: '参考官方插件模板，实现必要的接口，通过本地目录安装测试，稳定后可发布到 npm。',
  },
  {
    q: '插件更新后出现问题怎么办？',
    a: '使用 `plugins update <name>@<version>` 回滚到之前的稳定版本，然后查看变更日志定位问题。',
  },
  {
    q: '多个插件可以同时使用吗？',
    a: '可以，但需注意资源占用和潜在冲突。建议按需启用，不用的插件及时禁用。',
  },
]

const relatedLinks = [
  { to: '/tools', meta: 'Tools', title: '工具系列总览', description: '回到工具系列总入口，了解完整能力地图。' },
  { to: '/skills', meta: 'Skills', title: '热门技能', description: '了解 Skills 如何组织能力完成任务。' },
  { to: '/configurations', meta: 'Config', title: '关键配置', description: '插件配置最终都要落到配置文件中。' },
  { to: '/docs/manual/plugins-overview', meta: 'Docs', title: '插件文档', description: '查看官方插件系统详细文档。' },
]
</script>

<template>
  <section class="section">
    <div class="container tools-detail-page">
      <ToolTopicHero
        eyebrow="Plugins"
        title="插件系统"
        summary="插件是 OpenClaw 的系统级扩展机制。它解决的是&quot;把新的代码能力装进系统&quot;，而不是&quot;把工作流写得更长&quot;。理解插件的安装、配置、启停和更新，是扩展 OpenClaw 能力的第一步。"
        :signals="heroSignals"
      />

      <!-- 插件分类 -->
      <section class="card section-panel">
        <ToolSectionHeading eyebrow="插件分类" title="按功能分类的插件生态" description="OpenClaw 插件覆盖渠道接入、记忆存储、语音处理、工具执行和第三方集成等多个领域。" />

        <div class="category-grid">
          <article v-for="cat in pluginCategories" :key="cat.title" class="category-card">
            <div class="category-header">
              <span class="category-icon">
                <SeriesGlyph :kind="iconKind(cat.icon)" :tone="iconTone(cat.icon)" small />
              </span>
              <div>
                <h3>{{ cat.title }}</h3>
                <p>{{ cat.description }}</p>
              </div>
            </div>
            <div class="plugin-list">
              <div v-for="p in cat.plugins" :key="p.name" class="plugin-item">
                <span class="plugin-name">{{ p.name }}</span>
                <span class="plugin-desc">{{ p.description }}</span>
                <span class="plugin-status" :class="p.status">{{ p.status }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 插件生命周期 -->
      <section class="card section-panel">
        <ToolSectionHeading eyebrow="Lifecycle" title="插件生命周期管理" description="从发现到维护，插件管理遵循一套完整的生命周期流程。" />

        <div class="lifecycle-flow">
          <article v-for="(stage, index) in pluginLifecycle" :key="stage.stage" class="lifecycle-stage">
            <div class="stage-number">{{ index + 1 }}</div>
            <div class="stage-content">
              <div class="stage-header">
                <span class="stage-icon">
                  <SeriesGlyph :kind="iconKind(stage.icon)" :tone="iconTone(stage.icon)" small />
                </span>
                <h3>{{ stage.stage }}</h3>
              </div>
              <p class="stage-desc">{{ stage.description }}</p>
              <ul class="stage-steps">
                <li v-for="step in stage.steps" :key="step">{{ step }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <!-- CLI 命令参考 -->
      <section class="card section-panel">
        <ToolSectionHeading eyebrow="CLI Reference" title="命令行参考" description="掌握这些命令，完成插件的日常管理操作。" />

        <div class="commands-list">
          <article v-for="cmd in cliCommands" :key="cmd.command" class="command-item">
            <div class="command-header">
              <code class="command-name">{{ cmd.command }}</code>
              <span class="command-desc">{{ cmd.description }}</span>
            </div>
            <pre class="command-example"><code>{{ cmd.example }}</code></pre>
          </article>
        </div>
      </section>

      <!-- 配置位置 -->
      <section class="card section-panel">
        <ToolSectionHeading eyebrow="Configuration" title="配置位置说明" description="插件配置不一定都写在同一个位置，这是最常见的踩坑点之一。" />

        <div class="config-grid">
          <article v-for="loc in configLocations" :key="loc.location" class="config-card">
            <h3><code>{{ loc.location }}</code></h3>
            <p>{{ loc.description }}</p>
            <pre class="config-example"><code>{{ loc.example }}</code></pre>
          </article>
        </div>
      </section>

      <!-- 对比表 -->
      <section class="card section-panel">
        <ToolSectionHeading eyebrow="Comparison" title="插件 vs Skills vs Tools" description="理解三者的区别，才能选择正确的扩展方式。" />

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>维度</th>
                <th>Plugin</th>
                <th>Skill</th>
                <th>Tool</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparisonTable" :key="row.aspect">
                <td class="aspect-cell">{{ row.aspect }}</td>
                <td>{{ row.plugin }}</td>
                <td>{{ row.skill }}</td>
                <td>{{ row.tool }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="card section-panel">
        <ToolSectionHeading eyebrow="Best Practices" title="最佳实践" description="遵循这些实践，让插件管理更加稳健。" />

        <div class="practices-grid">
          <article v-for="p in bestPractices" :key="p.title" class="practice-card">
            <span class="practice-icon">
              <SeriesGlyph :kind="iconKind(p.icon)" :tone="iconTone(p.icon)" small />
            </span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.description }}</p>
          </article>
        </div>
      </section>

      <ToolFaqSection :items="faqs" />
      <ToolRelatedSection :items="relatedLinks" />
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

/* Category Grid */
.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.category-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.5);
}

.category-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.category-icon {
  display: inline-flex;
  flex-shrink: 0;
}

.category-header h3 {
  margin: 0;
  font-size: 1rem;
}

.category-header p {
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.plugin-list {
  display: grid;
  gap: 8px;
}

.plugin-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
}

.plugin-name {
  font-weight: 600;
  font-family: "SFMono-Regular", monospace;
}

.plugin-desc {
  flex: 1;
  color: var(--ink-soft);
}

.plugin-status {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.plugin-status.stable {
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
}

.plugin-status.beta {
  background: rgba(234, 179, 8, 0.15);
  color: #ca8a04;
}

/* Lifecycle */
.lifecycle-flow {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.lifecycle-stage {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.stage-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--brand);
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stage-icon {
  display: inline-flex;
  flex-shrink: 0;
}

.stage-header h3 {
  margin: 0;
  font-size: 0.95rem;
}

.stage-desc {
  margin: 0;
  font-size: 0.82rem;
  color: var(--ink-soft);
}

.stage-steps {
  margin: 0;
  padding-left: 16px;
  font-size: 0.8rem;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* Commands */
.commands-list {
  display: grid;
  gap: 16px;
}

.command-item {
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
  font-size: 0.9rem;
  color: var(--ink-soft);
}

.command-example {
  margin: 0;
  padding: 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
  overflow-x: auto;
}

.command-example code {
  font-size: 0.78rem;
  line-height: 1.5;
}

/* Config */
.config-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.config-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.config-card h3 {
  margin: 0 0 8px;
  font-size: 0.9rem;
}

.config-card h3 code {
  font-size: 0.82rem;
}

.config-card > p {
  margin: 0 0 12px;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.config-example {
  margin: 0;
  padding: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
}

.config-example code {
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
  letter-spacing: 0.05em;
}

.comparison-table td {
  background: rgba(255, 255, 255, 0.3);
  line-height: 1.5;
}

.aspect-cell {
  font-weight: 600;
  white-space: nowrap;
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
  display: inline-flex;
  justify-content: center;
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
  .category-grid,
  .config-grid,
  .practices-grid,
  .related-grid {
    grid-template-columns: 1fr;
  }

  .lifecycle-flow {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .lifecycle-flow {
    grid-template-columns: 1fr;
  }
}
</style>
