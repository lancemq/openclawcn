<script setup lang="ts">
useSeo({
  title: '关键配置',
  description: 'OpenClaw 完整配置指南：主配置、渠道接入（WhatsApp/Telegram/Discord/飞书）、模型选择、会话管理、Skills、Hooks、SOUL人格、沙箱、热重载、Secret安全和多环境配置。',
  path: '/configurations',
})

const configSignals = [
  {
    label: '主配置文件',
    value: '~/.openclaw/openclaw.json',
    note: '使用 JSON5 格式（支持注释和尾随逗号），支持 onboard、configure、Control UI 或直接编辑。',
  },
  {
    label: '人格文件',
    value: 'SOUL.md',
    note: '定义 agent 行为、语气、偏好和边界，是长期行为描述的核心入口。',
  },
  {
    label: '编辑方式',
    value: 'CLI / Control UI / 直接编辑',
    note: '支持 openclaw onboard、openclaw configure、Control UI 或直接编辑 JSON5 文件。',
  },
]

const configPresets = [
  {
    title: '极简启动配置',
    focus: '先让系统稳定可用',
    summary: '保留 workspace 和渠道白名单，先验证最小链路。',
    snippet: `{
  agents: {
    defaults: { workspace: "~/.openclaw/workspace" }
  },
  channels: {
    whatsapp: { allowFrom: ["+15555550123"] }
  }
}`,
  },
  {
    title: '完整渠道配置',
    focus: '多渠道接入与权限控制',
    summary: '配置 WhatsApp、Telegram、Discord 等多渠道，支持 dmPolicy 和群组规则。',
    snippet: `{
  channels: {
    telegram: {
      enabled: true,
      botToken: "123:abc",
      dmPolicy: "pairing",
      allowFrom: ["tg:123"],
      groups: { "*": { requireMention: true } }
    },
    discord: { dmPolicy: "allowlist", allowFrom: ["*"] }
  }
}`,
  },
  {
    title: '模型配置',
    focus: '主模型 + Fallback + 多模型目录',
    summary: '设置主模型、备用模型、模型别名和 imageMaxDimensionPx 控制视觉 token 消耗。',
    snippet: `{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: ["openai/gpt-5.2"]
      },
      imageMaxDimensionPx: 1200
    },
    models: {
      "anthropic/claude-sonnet-4-5": { alias: "Sonnet" }
    }
  }
}`,
  },
  {
    title: '多智能体路由',
    focus: '多 Agent 隔离与工作区分离',
    summary: '运行多个隔离的 agent，每个有独立的 workspace 和 session。',
    snippet: `{
  agents: {
    list: [
      { id: "home", default: true, workspace: "~/.openclaw/workspace-home" },
      { id: "work", workspace: "~/.openclaw/workspace-work" }
    ]
  },
  bindings: [
    { agentId: "home", match: { channel: "whatsapp", accountId: "personal" } },
    { agentId: "work", match: { channel: "whatsapp", accountId: "biz" } }
  ]
}`,
  },
  {
    title: '会话管理配置',
    focus: '会话隔离与自动重置',
    summary: '控制会话范围、thread bindings 和自动重置策略。',
    snippet: `{
  session: {
    dmScope: "per-channel-peer",
    threadBindings: { enabled: true, idleHours: 24, maxAgeHours: 0 },
    reset: { mode: "daily", atHour: 4, idleMinutes: 120 }
  }
}`,
  },
  {
    title: 'Skills 加载配置',
    focus: '控制来源、监听和单项开关',
    summary: '配置技能来源目录、监听和逐项启停控制。',
    snippet: `{
  skills: {
    allowBundled: ["gemini", "peekaboo"],
    load: { extraDirs: ["~/Projects/openclaw-skills"], watch: true },
    entries: { peekaboo: { enabled: true }, sag: { enabled: false } }
  }
}`,
  },
  {
    title: '心跳配置',
    focus: '定期主动唤醒',
    summary: '设置 heartbeat 让 agent 主动找你汇报，适合需要定时任务的场景。',
    snippet: `{
  agents: {
    defaults: {
      heartbeat: { every: "30m", target: "last", directPolicy: "allow" }
    }
  }
}`,
  },
  {
    title: '定时任务配置',
    focus: 'Cron jobs 与自动执行',
    summary: '配置定时任务、会话保留和运行日志管理。',
    snippet: `{
  cron: {
    enabled: true,
    maxConcurrentRuns: 2,
    sessionRetention: "24h",
    runLog: { maxBytes: "2mb", keepLines: 2000 }
  }
}`,
  },
  {
    title: '沙箱配置',
    focus: 'Docker 隔离运行',
    summary: '在隔离的 Docker 容器中运行 agent sessions，提高安全性。',
    snippet: `{
  agents: {
    defaults: {
      sandbox: { mode: "non-main", scope: "agent" }
    }
  }
}`,
  },
  {
    title: 'Hooks 配置',
    focus: 'Webhooks 与自动化',
    summary: '启用 HTTP webhook 端点，配置 mappings 进行自定义自动化。',
    snippet: `{
  hooks: {
    enabled: true,
    token: "shared-secret",
    path: "/hooks",
    mappings: [
      { match: { path: "gmail" }, action: "agent", agentId: "main", deliver: true }
    ]
  }
}`,
  },
]

const configLayers = [
  {
    title: 'identity',
    description: '控制名字、语气和主题，是让 OpenClaw"像谁"的入口。',
  },
  {
    title: 'agent / agents.defaults',
    description: '决定默认 workspace、模型、sandbox、heartbeat 等全局行为。',
  },
  {
    title: 'channels',
    description: '配置 WhatsApp、Telegram、Discord、飞书、钉钉等入口及 allowFrom、群组规则。',
  },
  {
    title: 'models / agents.models',
    description: '定义模型目录、别名、imageMaxDimensionPx 等模型相关配置。',
  },
  {
    title: 'session',
    description: '控制会话隔离范围、thread bindings、自动重置策略。',
  },
  {
    title: 'skills',
    description: '决定从哪里加载技能、是否监听本地目录、哪些技能启用或禁用。',
  },
  {
    title: 'hooks',
    description: '在关键时机插入规则、流程或内容替换，实现自定义自动化。',
  },
  {
    title: 'auth / gateway',
    description: '决定谁能接入、端口、认证、远程访问和 TLS 配置。',
  },
  {
    title: 'cron / heartbeat',
    description: '定时任务和主动唤醒机制的配置。',
  },
  {
    title: 'sandbox',
    description: 'Docker 隔离运行配置，适合高安全要求场景。',
  },
]

const configChecklist = [
  {
    title: '第 1 层',
    items: 'workspace、primary model、allowFrom、dashboard 可访问性、端口配置',
  },
  {
    title: '第 2 层',
    items: 'identity、group mention 规则、dmPolicy、session.dmScope、日志配置',
  },
  {
    title: '第 3 层',
    items: 'skills.entries、extraDirs、SOUL.md、hooks、multi-agent 路由',
  },
  {
    title: '第 4 层',
    items: 'sandbox、cron、heartbeat、远程访问 (Tailscale)、TLS 配置',
  },
]

const soulDirections = [
  {
    title: '基础助手型 SOUL',
    description: '适合第一版人格，强调 helpful、resourceful、trustworthy 和清晰边界。',
  },
  {
    title: '工程执行型 SOUL',
    description: '强调清晰任务拆解、变更最小化、验证优先和谨慎操作。',
  },
  {
    title: '文档与解释型 SOUL',
    description: '适合 README、知识库、FAQ、教程和说明文档生产。',
  },
  {
    title: '研究与分析型 SOUL',
    description: '强调资料比较、来源意识、结论边界和下一步问题整理。',
  },
  {
    title: 'DevOps / 运维型 SOUL',
    description: '更适合巡检、发布前检查、部署核对和事故处理流程。',
  },
  {
    title: '实验型 SOUL',
    description: '适合创作、风格切换和实验玩法，但不建议直接用于稳定生产环境。',
  },
]

const soulGuides = [
  {
    title: 'Bootstrapping 会写入 SOUL.md',
    description: '首次引导阶段会把身份和偏好沉淀进 SOUL，属于长期行为描述。',
  },
  {
    title: 'SOUL 与 Skills 是两层',
    description: 'SOUL 决定"像谁、怎么判断"，Skills 决定"能做什么、调用什么工具"。',
  },
  {
    title: 'SOUL Evil Hook 更适合实验',
    description: '在特定条件下替换 SOUL 内容，适合创作和测试，不适合稳定生产。',
  },
  {
    title: '记忆系统三层架构',
    description: 'SOUL（人格）、TOOLS（工具）、MEMORY（记忆）构成完整的记忆系统。',
  },
]

const hookAndOps = [
  {
    title: '用 Hooks 管流程',
    description: 'Hooks 适合做流程约束、提示补充、特定场景的规则注入。',
  },
  {
    title: '用 workspace 做隔离',
    description: '把实验型 Skills、SOUL 和高风险渠道先放进独立 workspace 验证。',
  },
  {
    title: '版本升级先看配置影响',
    description: 'OpenClaw 迭代快，每次升级应先看配置字段、路径和认证边界变化。',
  },
  {
    title: 'Control UI 用于确认结果',
    description: 'onboarding 负责首次整理配置，Control UI 更适合确认配置是否生效。',
  },
  {
    title: '热重载模式',
    description: 'gateway.reload 支持 hybrid/hot/restart/off 模式，hybrid 会自动处理需要重启的配置。',
  },
  {
    title: '配置拆分 ($include)',
    description: '使用 $include 将大配置文件拆分为多个文件，支持深度合并。',
  },
  {
    title: '环境变量支持',
    description: '支持 .env 文件、~/.openclaw/.env 和配置内联 env var。',
  },
  {
    title: 'Secret 安全存储',
    description: '支持 env/file/exec 三种 secret 来源，避免 API key 硬编码。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Configurations</p>
          <h1 class="section-title">关键配置</h1>
          <p class="section-copy">
            配置决定的不是“按钮在哪里”，而是 OpenClaw 这个系统如何运行、用哪些模型、接哪些入口、允许谁访问、加载哪些技能，以及 agent 该用什么人格和规则执行任务。更稳的做法不是一次把所有选项都调满，而是分层稳定下来。
          </p>

          <div class="collection-utility">
            <article v-for="item in configSignals" :key="item.label" class="collection-utility-item">
              <span class="mini-label">{{ item.label }}</span>
              <strong><code>{{ item.value }}</code></strong>
              <p>{{ item.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">建议顺序</span>
            <strong>先主配置，再入口边界，再 Skills 与 SOUL</strong>
            <p>如果系统还没稳定运行，不建议一开始同时折腾多个渠道、技能目录、人格模板和 hooks。先跑通最小链路，再逐层加复杂度。</p>
          </div>

          <div class="collection-summary">
            <span class="mini-label">一个判断标准</span>
            <p>凡是会影响访问边界、权限、执行范围或外部集成的配置，都应该优先按“生产能力”来管理，而不是按“可选个性化”处理。</p>
          </div>
        </aside>
      </section>

      <section class="preset-grid">
        <article v-for="item in configPresets" :key="item.title" class="card preset-card">
          <span class="mini-label">{{ item.focus }}</span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.summary }}</p>
          <pre><code>{{ item.snippet }}</code></pre>
        </article>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">配置分层</p>
          <p class="section-copy">把下面这些层分开理解，比直接盯着完整 JSON5 文件更容易建立结构感。</p>
        </div>

        <div class="layer-grid">
          <article v-for="item in configLayers" :key="item.title" class="layer-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">配置优先级</p>
          <p class="section-copy">真正稳定的配置不是一次性写完，而是按风险和收益分层推进。</p>
        </div>

        <div class="checklist-grid">
          <article v-for="item in configChecklist" :key="item.title" class="check-card">
            <span class="mini-label">{{ item.title }}</span>
            <p>{{ item.items }}</p>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">SOUL 方向</p>
          <p class="section-copy">SOUL 更像长期人格骨架。先有一个稳定基础版，再按任务方向做分化，会比直接堆很多模板更稳。</p>
        </div>

        <div class="soul-grid">
          <article v-for="item in soulDirections" :key="item.title" class="soul-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="guide-grid">
        <article v-for="item in soulGuides" :key="item.title" class="card guide-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Hooks 与运维</p>
          <p class="section-copy">当你已经跑通基础配置后，真正决定长期可维护性的通常是这几个部分。</p>
        </div>

        <div class="ops-grid">
          <article v-for="item in hookAndOps" :key="item.title" class="ops-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </article>
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

.preset-grid,
.layer-grid,
.checklist-grid,
.soul-grid,
.guide-grid,
.ops-grid {
  display: grid;
  gap: 12px;
}

.preset-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.layer-grid,
.ops-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.checklist-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.soul-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.guide-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.section-panel,
.preset-card,
.guide-card {
  display: grid;
  gap: 12px;
}

.section-head {
  display: grid;
  gap: 4px;
}

.layer-card,
.check-card,
.soul-card,
.ops-card {
  display: grid;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.42);
}

.preset-card h2,
.guide-card h3,
.soul-card h3,
.layer-card strong,
.ops-card strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.preset-card h2 {
  font-size: 1.06rem;
}

.guide-card h3,
.soul-card h3 {
  font-size: 0.98rem;
}

.preset-card p,
.guide-card p,
.soul-card p,
.layer-card p,
.check-card p,
.ops-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.58;
}

pre {
  overflow: auto;
  margin: 0;
  padding: 14px;
  border: 1px solid rgba(67, 73, 60, 0.14);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.56);
}

code {
  font-family: "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.84rem;
}

@media (max-width: 1100px) {
  .preset-grid,
  .layer-grid,
  .checklist-grid,
  .soul-grid,
  .guide-grid,
  .ops-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .preset-grid,
  .layer-grid,
  .checklist-grid,
  .soul-grid,
  .guide-grid,
  .ops-grid {
    grid-template-columns: 1fr;
  }
}
</style>
