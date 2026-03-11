<script setup lang="ts">
useSeo({
  title: '关键配置',
  description: '系统整理 OpenClaw 的基础配置、工作区与身份、Skills 加载、SOUL、Hooks、安全边界和多环境配置重点。',
  path: '/configurations',
})

const configSignals = [
  {
    label: '主配置文件',
    value: '~/.openclaw/openclaw.json',
    note: '官方文档当前说明 OpenClaw 使用 JSON5 配置，可通过 onboard、configure、Control UI 或手动编辑维护。',
  },
  {
    label: '人格文件',
    value: 'SOUL.md',
    note: 'SOUL.md 不是装饰项，而是 agent 行为、语气、偏好和边界的长期描述入口。',
  },
  {
    label: '配置方式',
    value: '先跑通，再分层扩展',
    note: '第一次应该先解决 workspace、模型、入口和认证，再去加 Skills、Hooks 和实验型人格玩法。',
  },
]

const configPresets = [
  {
    title: '极简启动配置',
    focus: '先让系统稳定可用',
    summary: '保留 workspace 和渠道白名单，先验证最小链路，不急着同时配置多个入口。',
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
    title: 'Starter 配置',
    focus: '补 identity、model 和群组规则',
    summary: '在最小配置上补齐 name、theme、emoji、primary model 和 requireMention。',
    snippet: `{
  identity: {
    name: "Clawd",
    theme: "helpful assistant",
    emoji: "🦞"
  },
  agent: {
    workspace: "~/.openclaw/workspace",
    model: { primary: "anthropic/claude-sonnet-4-5" }
  },
  channels: {
    whatsapp: {
      allowFrom: ["+15555550123"],
      groups: { "*": { requireMention: true } }
    }
  }
}`,
  },
  {
    title: 'Skills 加载配置',
    focus: '控制来源、监听和单项开关',
    summary: '技能变多后，要把来源、目录监听和逐项启停纳入正式配置，而不是全靠手动记忆。',
    snippet: `{
  skills: {
    allowBundled: ["gemini", "peekaboo"],
    load: {
      extraDirs: ["~/Projects/openclaw-skills"],
      watch: true
    },
    entries: {
      peekaboo: { enabled: true },
      sag: { enabled: false }
    }
  }
}`,
  },
]

const configLayers = [
  {
    title: 'identity',
    description: '控制名字、语气和主题，是你第一次让 OpenClaw“像谁”的入口。',
  },
  {
    title: 'agent / agents.defaults',
    description: '决定默认 workspace、模型和一些全局行为，是最该先稳定下来的层。',
  },
  {
    title: 'channels',
    description: '配置 WhatsApp、Telegram、飞书等入口，同时决定 allowFrom、群组 mention 等边界。',
  },
  {
    title: 'skills',
    description: '决定从哪里加载技能、是否监听本地目录、哪些技能启用或禁用。',
  },
  {
    title: 'hooks',
    description: '用来在关键时机插入规则、流程或内容替换，适合做更进阶的工作流控制。',
  },
  {
    title: 'auth / gateway 边界',
    description: '决定谁能接入你的系统、哪些入口对外开放，是长期运行阶段必须补上的层。',
  },
]

const configChecklist = [
  {
    title: '第 1 层',
    items: 'workspace、primary model、allowFrom、dashboard 可访问性',
  },
  {
    title: '第 2 层',
    items: 'identity、group mention 规则、日志与状态检查、版本信息',
  },
  {
    title: '第 3 层',
    items: 'skills.entries、extraDirs、SOUL.md、自定义 hooks 和远程访问',
  },
]

const soulDirections = [
  {
    title: '基础助手型 SOUL',
    description: '适合作为第一版人格，强调 helpful、resourceful、trustworthy 和 clear boundaries。',
  },
  {
    title: '工程执行型 SOUL',
    description: '更强调清晰任务拆解、变更最小化、验证优先和谨慎操作。',
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
    description: '首次引导阶段会把身份和偏好沉淀进 SOUL，因此它属于长期行为描述，不是一次性临时文本。',
  },
  {
    title: 'SOUL 与 Skills 是两层',
    description: 'SOUL 决定“像谁、怎么判断、怎样表达”，Skills 决定“能做什么、调用什么工具”。',
  },
  {
    title: 'SOUL Evil Hook 更适合实验',
    description: '这类玩法能在特定条件下替换 SOUL 内容，但更适合创作和测试，不适合稳定生产。',
  },
]

const hookAndOps = [
  {
    title: '用 Hooks 管流程',
    description: 'Hooks 更适合做流程约束、提示补充、特定场景的规则注入，而不是把所有人格都塞进主配置。',
  },
  {
    title: '用 workspace 做隔离',
    description: '把实验型 Skills、SOUL 和高风险渠道先放进独立 workspace，验证后再进入正式环境。',
  },
  {
    title: '版本升级先看配置影响',
    description: 'OpenClaw 迭代快，每次升级都应先看配置字段、路径和认证边界有没有变化。',
  },
  {
    title: 'Control UI 用于确认结果',
    description: 'onboarding 负责第一次整理配置，Control UI 更适合确认配置是否真正生效。',
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
