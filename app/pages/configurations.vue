<script setup lang="ts">
useSeo({
  title: '关键配置',
  description: '整理 OpenClaw 当前最值得先看的基础配置、skills 配置、SOUL 模板和热门 soul 方向。',
  path: '/configurations',
})

const configPresets = [
  {
    title: '极简启动配置',
    focus: '先让 OpenClaw 可用',
    summary: '只保留 workspace 和消息入口白名单，适合第一次跑通最小链路。',
    snippet: `{
  agents: { defaults: { workspace: "~/.openclaw/workspace" } },
  channels: { whatsapp: { allowFrom: ["+15555550123"] } },
}`,
    note: '官方配置文档里的最小示例，适合验证基础链路。',
  },
  {
    title: '推荐 Starter 配置',
    focus: '补 identity、model 和群组规则',
    summary: '在最小配置上加入 name / theme / emoji、primary model 和 requireMention。',
    snippet: `{
  identity: { name: "Clawd", theme: "helpful assistant", emoji: "🦞" },
  agent: { workspace: "~/.openclaw/workspace", model: { primary: "anthropic/claude-sonnet-4-5" } },
  channels: { whatsapp: { allowFrom: ["+15555550123"], groups: { "*": { requireMention: true } } } },
}`,
    note: '适合把“能启动”推进到“可以稳定用”。',
  },
  {
    title: 'Skills 配置',
    focus: '控制 skills 的加载、安装和单项覆盖',
    summary: '用 allowBundled、load.extraDirs、install.nodeManager 和 entries 管理技能生命周期。',
    snippet: `{
  skills: {
    allowBundled: ["gemini", "peekaboo"],
    load: { extraDirs: ["~/Projects/skills"], watch: true },
    entries: { peekaboo: { enabled: true }, sag: { enabled: false } },
  },
}`,
    note: '适合多工作区、技能较多或需要逐项开关的时候。',
  },
]

const popularSouls = [
  {
    title: 'surgical-coder',
    install: 'npx clawsouls install clawsouls/surgical-coder',
    useCase: '最小 diff、精准改动、偏工程纪律的编程人格。',
  },
  {
    title: 'api-architect',
    install: 'npx clawsouls install clawsouls/api-architect',
    useCase: '适合接口设计、OpenAPI、资源模型和边界梳理。',
  },
  {
    title: 'docs-writer',
    install: 'npx clawsouls install clawsouls/docs-writer',
    useCase: '适合 README、API 文档、操作说明和站点内容润色。',
  },
  {
    title: 'test-sensei',
    install: 'npx clawsouls install clawsouls/test-sensei',
    useCase: '适合测试驱动、测试清单和回归验证导向的工作流。',
  },
  {
    title: 'devops-pilot',
    install: 'npx clawsouls install clawsouls/devops-pilot',
    useCase: '适合 Docker、CI/CD、部署和基础云运维场景。',
  },
]

const soulGuides = [
  {
    title: '官方 SOUL.md 模板',
    description: 'OpenClaw 官方模板强调 helpful、resourceful、trustworthy 和 clear boundaries，更适合作为第一版 soul 的骨架。',
  },
  {
    title: 'Bootstrapping 会写入 SOUL.md',
    description: '首次 bootstrapping 会把 identity 与偏好写进 SOUL.md，因此 soul 不是附属文件，而是 agent 行为的核心组成。',
  },
  {
    title: 'SOUL Evil Hook 属于实验型玩法',
    description: '官方有 soul-evil hook，可以在特定时段或概率下替换 SOUL 内容，但更适合实验和创作，不适合稳定生产环境。',
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
            这里把 OpenClaw 最值得优先掌握的配置分成两层：一层是官方高频配置，一层是社区最常见的 SOUL 方向。前者决定系统怎么跑，后者决定 agent 像谁、怎么说、如何行动。
          </p>

          <div class="collection-utility">
            <article class="collection-utility-item">
              <span class="mini-label">配置文件</span>
              <strong><code>~/.openclaw/openclaw.json</code></strong>
              <p>官方配置文档明确说明 OpenClaw 读取 JSON5 配置，并支持 `onboard`、`configure`、Control UI 和直接编辑。</p>
            </article>
            <article class="collection-utility-item">
              <span class="mini-label">人格文件</span>
              <strong><code>SOUL.md</code></strong>
              <p>官方模板和 bootstrapping 都把 SOUL.md 视为 agent 的人格核心，不只是可选装饰项。</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">先配什么</span>
            <strong>先最小配置，再 starter，再按 skills 和 soul 深化</strong>
            <p>如果系统还没稳定运行，不建议一开始就同时折腾多个 channel、skills 和人格模板。先跑通最小链路，再逐步变复杂。</p>
          </div>

          <div class="collection-summary">
            <span class="mini-label">配置优先级</span>
            <p>第一层先解决 workspace、channel 白名单、model 和基础 identity。第二层再补 skills.entries、extraDirs、SOUL.md 和实验型 hooks。</p>
          </div>
        </aside>
      </section>

      <section class="config-grid">
        <article v-for="item in configPresets" :key="item.title" class="card config-card">
          <span class="mini-label">{{ item.focus }}</span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.summary }}</p>
          <pre><code>{{ item.snippet }}</code></pre>
          <p class="config-note">{{ item.note }}</p>
        </article>
      </section>

      <section class="souls-panel card">
        <div class="souls-head">
          <p class="eyebrow">Popular Souls</p>
          <h2 class="section-title">社区常见 SOUL 方向</h2>
          <p class="section-copy">
            下面这些 soul 名称来自 ClawSouls 当前页面展示的热门示例。它们更像人格模板方向，而不是官方默认项，适合在稳定配置后再尝试。
          </p>
        </div>

        <div class="soul-grid">
          <article v-for="item in popularSouls" :key="item.title" class="soul-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.useCase }}</p>
            <code>{{ item.install }}</code>
          </article>
        </div>
      </section>

      <section class="guide-grid">
        <article v-for="item in soulGuides" :key="item.title" class="card guide-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
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

.config-grid,
.guide-grid {
  display: grid;
  gap: 14px;
}

.config-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.config-card,
.guide-card {
  display: grid;
  gap: 10px;
}

.config-card h2,
.guide-card h3,
.soul-card strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.config-card p,
.guide-card p,
.soul-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.62;
}

pre {
  overflow: auto;
  margin: 0;
  padding: 14px;
  border: 1px solid rgba(67, 73, 60, 0.14);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.56);
}

pre code,
.soul-card code,
.collection-utility-item code {
  font-family: "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.84rem;
}

.config-note {
  color: var(--brand);
}

.souls-panel {
  display: grid;
  gap: 16px;
}

.souls-head {
  display: grid;
  gap: 6px;
}

.soul-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.soul-card {
  display: grid;
  gap: 8px;
  padding: 14px 16px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.42);
}

@media (max-width: 1000px) {
  .config-grid {
    grid-template-columns: 1fr;
  }

  .soul-grid {
    grid-template-columns: 1fr;
  }
}
</style>
