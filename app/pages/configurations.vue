<script setup lang="ts">
useSeo({
  title: '关键配置',
  description: '把 OpenClaw 的主配置、模型、渠道、会话、Skills、Gateway 和安全边界放进同一套可执行的配置判断结构里。',
  path: '/configurations',
})

const heroFacts = [
  {
    label: '主配置文件',
    value: '~/.openclaw/openclaw.json',
    note: '默认主配置文件使用 JSON5。最稳妥的做法是先跑通一条最小链路，再逐层加复杂度。',
  },
  {
    label: '推荐入口',
    value: 'onboard / configure / config',
    note: '首次配置优先用向导或 CLI helper，避免一开始直接在大文件里手改所有字段。',
  },
  {
    label: '真正高风险',
    value: 'Gateway、认证、渠道白名单',
    note: '凡是改变访问边界、执行权限和远程入口的配置，都应该先按生产能力来管理。',
  },
]

const editWays = [
  {
    title: '首次安装或重整配置',
    command: 'openclaw onboard',
    detail: '适合第一次把模型、Gateway、UI 和基础能力串起来。先用它建立可运行基线。',
  },
  {
    title: '交互式调整配置',
    command: 'openclaw configure',
    detail: '适合模型、渠道、Skills 和 Gateway 的增量调整，比手写整段 JSON5 更稳。',
  },
  {
    title: '非交互式修改或排查',
    command: 'openclaw config get|set|unset|validate',
    detail: '适合脚本化、远程维护和精确定位单个配置项，不需要整个向导流程。',
  },
  {
    title: 'Control UI 或直接编辑',
    command: 'Control UI / 编辑 openclaw.json',
    detail: '更适合确认结果或做少量改动。大范围改动前先确保你已经理解字段边界。',
  },
]

const configLayers = [
  {
    title: 'Gateway 与认证',
    kicker: '入口边界',
    description: '决定服务如何暴露、走什么认证、Control UI 用什么安全上下文，以及远程访问是否经过受控通道。',
    focus: ['host / bind', 'auth.mode', 'controlUi', 'trustedProxies'],
  },
  {
    title: 'agents.defaults',
    kicker: '全局默认',
    description: '决定默认模型、workspace、工具行为和系统级运行基线。大多数“为什么表现不对”都先回到这里看。',
    focus: ['model.primary', 'fallbacks', 'workspace', 'bootstrap limits'],
  },
  {
    title: '模型目录与 allowlist',
    kicker: '模型边界',
    description: '决定默认模型、备用链和 `/model` 可选范围。只有真正允许的模型才应该暴露给会话切换。',
    focus: ['agents.models', 'agents.defaults.models', 'provider auth'],
  },
  {
    title: 'channels',
    kicker: '消息入口',
    description: '决定哪些渠道接入、私信怎么处理、群里何时响应、哪些用户或聊天可以触发系统。',
    focus: ['dmPolicy', 'allowFrom', 'groups.*.requireMention', 'accountId'],
  },
  {
    title: 'session',
    kicker: '上下文隔离',
    description: '决定私信按什么粒度合并、线程怎么绑定、什么时候自动重置。这个层直接影响“记忆串不串台”。',
    focus: ['dmScope', 'identityLinks', 'threadBindings', 'reset'],
  },
  {
    title: 'skills 与工具扩展',
    kicker: '能力加载',
    description: '决定内置技能是否启用、额外目录从哪里加载、是否监听本地变化，以及单项技能是否启停。',
    focus: ['allowBundled', 'load.extraDirs', 'load.watch', 'entries.enabled'],
  },
]

const presets = [
  {
    title: '先跑通最小链路',
    summary: '适合第一次搭好模型、workspace 和单一入口，不要一开始同时上多渠道和多模型。',
    snippet: `{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",
      model: { primary: "anthropic/claude-sonnet-4-6" }
    }
  },
  gateway: {
    host: "127.0.0.1"
  }
}`,
  },
  {
    title: '多模型但仍可控',
    summary: '主力模型负责稳定任务，备用模型负责限速和不可用场景，allowlist 决定会话里能切哪些模型。',
    snippet: `{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-sonnet-4-6",
        fallbacks: ["openai/gpt-5.4"]
      },
      models: [
        "anthropic/claude-sonnet-4-6",
        "openai/gpt-5.4"
      ]
    }
  }
}`,
  },
  {
    title: '多渠道但先收入口',
    summary: '接入渠道后，优先配置 allowFrom、dmPolicy 和群组 mention 规则，避免机器人变成公开入口。',
    snippet: `{
  channels: {
    telegram: {
      dmPolicy: "pairing",
      allowFrom: ["tg:123456"],
      groups: {
        "*": { requireMention: true }
      }
    }
  }
}`,
  },
  {
    title: '本地 Skills 开发',
    summary: '用额外目录和 watch 支持本地迭代，同时明确哪些 bundled skills 真正允许加载。',
    snippet: `{
  skills: {
    allowBundled: ["peekaboo"],
    load: {
      extraDirs: ["~/Projects/openclaw-skills"],
      watch: true
    },
    entries: {
      peekaboo: { enabled: true }
    }
  }
}`,
  },
]

const riskCards = [
  {
    title: '把 Gateway 直接绑到公网地址',
    detail: '如果只是想远程访问，优先 SSH tunnel 或 Tailscale Serve。先开公网再补认证，顺序反了。',
  },
  {
    title: 'Control UI 长期开启不安全模式',
    detail: '`gateway.controlUi.allowInsecureAuth` 和 `dangerouslyDisableDeviceAuth` 都只适合临时救火，不是日常配置。',
  },
  {
    title: 'trustedProxies 写得过宽',
    detail: '只有你完全控制的代理 IP 才应该被信任。否则转发头会把边界一起放宽。',
  },
  {
    title: '渠道接入后不做 allowFrom',
    detail: '没有白名单和 mention 规则，消息入口很容易从受控机器人变成谁都能触发的执行入口。',
  },
  {
    title: '一开始就堆多 Agent 与复杂绑定',
    detail: '在默认模型、session 和单一渠道都还没稳定前，多 agent 和 bindings 会放大排查成本。',
  },
  {
    title: '把 SOUL 当成万能配置',
    detail: 'SOUL 决定行为风格和边界，但不能替代模型、权限、审批、白名单和 Gateway 安全配置。',
  },
]

const commandBlocks = [
  {
    title: 'CLI helper',
    body: `# 查看当前配置文件路径
openclaw config file

# 查看某个配置值
openclaw config get gateway.auth.mode

# 设置某个配置值
openclaw config set gateway.host "127.0.0.1"

# 移除某个配置值
openclaw config unset channels.telegram.allowFrom

# 校验当前配置
openclaw config validate`,
  },
  {
    title: '更稳的配置顺序',
    body: `1. 先跑 onboard / configure，建立可运行基线
2. 再确认 gateway / auth / channels 边界
3. 然后确定默认模型与 fallback
4. 最后再加 session、skills、hooks 和多 agent`,
  },
]

const routeGuides = [
  {
    title: '第一次配置',
    summary: '先确认主配置文件、默认模型、workspace 和 Gateway 入口，不要先陷进大量模板。',
    to: '/docs/setup/installation',
    meta: 'Setup',
  },
  {
    title: '模型与 fallback',
    summary: '如果你在配置主模型、备用链和 provider，继续看模型与 provider 文档更准确。',
    to: '/docs/manual/providers-and-fallback',
    meta: 'Models',
  },
  {
    title: 'Skills 配置',
    summary: '如果你已经到了技能目录、watch、allowBundled 和 entries.enabled 这一层，单独主题页更完整。',
    to: '/docs/manual/skills-configuration',
    meta: 'Skills',
  },
  {
    title: '安全边界',
    summary: '凡是涉及 Gateway、trusted proxies、远程访问和 Control UI 安全降级，都应该继续回到安全页一起判断。',
    to: '/security',
    meta: 'Security',
  },
]

const faqs = [
  {
    q: '配置文件默认放在哪里？',
    a: '默认主配置文件是 `~/.openclaw/openclaw.json`。敏感信息更适合放到环境变量或专门的 secret 引用里，而不是直接硬编码。',
  },
  {
    q: '优先用向导还是直接改文件？',
    a: '首次配置优先 `openclaw onboard` 或 `openclaw configure`。只有在你已经知道目标字段时，才建议直接编辑或用 `openclaw config set`。',
  },
  {
    q: '怎么验证配置是否真的生效？',
    a: '先用 `openclaw config validate` 看结构是否通过，再通过 Control UI、日志或实际渠道行为确认运行时结果。',
  },
  {
    q: '修改配置后都需要重启吗？',
    a: '不一定。是否热应用取决于具体配置项和 reload 行为，但涉及 Gateway、认证或高风险入口变化时，应该按需要重启来处理。',
  },
  {
    q: 'SOUL 应该放在这页的什么位置理解？',
    a: 'SOUL 是行为层配置，不是整套关键配置的中心。更稳的顺序是先把模型、入口、权限和会话跑稳，再调 SOUL。',
  },
  {
    q: '多 agent 和 bindings 什么时候再上？',
    a: '至少在单 agent、默认模型、session.dmScope 和单一渠道都稳定后再做。否则你很难判断问题来自配置结构还是业务逻辑。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container configurations-page">
      <section class="config-hero">
        <div class="card hero-main">
          <p class="eyebrow">Configurations</p>
          <h1 class="section-title">关键配置不是字段大全，而是系统边界</h1>
          <p class="section-copy">
            这页的重点不是把所有配置项一次性背下来，而是先建立判断顺序：哪些配置决定入口边界，哪些决定默认行为，哪些适合在系统稳定后再加上去。
          </p>

          <div class="hero-facts">
            <article v-for="item in heroFacts" :key="item.label" class="hero-fact">
              <span class="mini-label">{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
              <p>{{ item.note }}</p>
            </article>
          </div>
        </div>

        <aside class="hero-side">
          <div class="card summary-card">
            <span class="mini-label">推荐顺序</span>
            <strong>先入口，后模型，再扩展</strong>
            <p>先稳定 Gateway、认证、默认模型和单一渠道，再处理 session、Skills、SOUL、Hooks 和多 agent。</p>
          </div>
          <div class="card summary-card warm">
            <span class="mini-label">页面作用</span>
            <strong>帮你判断先改哪里，不是替代完整参考文档</strong>
            <p>如果你已经知道具体字段名，继续去配置参考页更高效；如果你还在判断阶段，这页更适合做入口。</p>
          </div>
        </aside>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Edit Paths</p>
          <h2>4 种更稳的改配置方式</h2>
          <p class="section-copy">先选对入口，能减少很多无效排查。第一次配置、日常调整、脚本化维护和直接编辑，不该混成同一种操作习惯。</p>
        </div>

        <div class="edit-grid">
          <article v-for="item in editWays" :key="item.command" class="edit-card">
            <h3>{{ item.title }}</h3>
            <code>{{ item.command }}</code>
            <p>{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Layers</p>
          <h2>先按配置分层理解</h2>
          <p class="section-copy">把配置看成六层结构，比直接从一大份 JSON5 文件里找问题更稳，也更适合长期维护。</p>
        </div>

        <div class="layer-grid">
          <article v-for="item in configLayers" :key="item.title" class="layer-card">
            <span class="layer-kicker">{{ item.kicker }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="layer-tags">
              <span v-for="tag in item.focus" :key="tag" class="layer-tag">{{ tag }}</span>
            </div>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Presets</p>
          <h2>从 4 种典型场景开始，比空白起步更稳</h2>
        </div>

        <div class="preset-grid">
          <article v-for="item in presets" :key="item.title" class="preset-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
            <pre><code>{{ item.snippet }}</code></pre>
          </article>
        </div>
      </section>

      <section class="config-columns">
        <section class="card section-panel">
          <div class="section-head">
            <p class="eyebrow">Risk</p>
            <h2>最常见的 6 个配置误区</h2>
          </div>

          <div class="risk-grid">
            <article v-for="item in riskCards" :key="item.title" class="risk-card">
              <strong>{{ item.title }}</strong>
              <p>{{ item.detail }}</p>
            </article>
          </div>
        </section>

        <section class="card section-panel">
          <div class="section-head">
            <p class="eyebrow">Commands</p>
            <h2>先把这些命令跑顺</h2>
          </div>

          <div class="command-stack">
            <article v-for="item in commandBlocks" :key="item.title" class="command-card">
              <h3>{{ item.title }}</h3>
              <pre><code>{{ item.body }}</code></pre>
            </article>
          </div>
        </section>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">FAQ</p>
          <h2>配置页里最值得先澄清的问题</h2>
        </div>

        <div class="faq-grid">
          <article v-for="item in faqs" :key="item.q" class="faq-card">
            <h3>{{ item.q }}</h3>
            <p>{{ item.a }}</p>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Cross Links</p>
          <h2>继续把配置问题放回对应主题里</h2>
          <p class="section-copy">这页负责判断顺序。到了具体模型、Skills、安全边界和安装路径时，继续回到对应主题页会更准确。</p>
        </div>

        <div class="related-grid">
          <NuxtLink v-for="item in routeGuides" :key="item.to" :to="item.to" class="related-link">
            <span class="tag">{{ item.meta }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.summary }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.configurations-page {
  display: grid;
  gap: 24px;
}

.config-hero,
.config-columns {
  display: grid;
  grid-template-columns: minmax(0, 1.42fr) minmax(320px, 0.92fr);
  gap: 18px;
  align-items: start;
}

.hero-main,
.hero-side,
.section-panel {
  display: grid;
  gap: 18px;
}

.hero-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.hero-fact,
.summary-card,
.edit-card,
.layer-card,
.preset-card,
.risk-card,
.command-card,
.faq-card,
.related-link {
  position: relative;
  overflow: hidden;
}

.hero-fact {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.38);
  border: 1px solid rgba(64, 73, 85, 0.1);
}

.hero-fact strong,
.summary-card strong,
.edit-card h3,
.layer-card h3,
.preset-card h3,
.command-card h3,
.faq-card h3,
.related-link strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
}

.hero-fact strong {
  font-size: 1rem;
  line-height: 1.36;
}

.hero-fact p,
.summary-card p,
.edit-card p,
.layer-card p,
.risk-card p,
.faq-card p,
.related-link p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.66;
}

.summary-card {
  display: grid;
  gap: 10px;
  padding: 22px;
  border: 1px solid rgba(15, 102, 116, 0.12);
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(248, 252, 251, 0.95), rgba(238, 246, 244, 0.88)),
    rgba(255, 255, 255, 0.6);
}

.summary-card.warm {
  border-color: rgba(138, 90, 36, 0.16);
  background:
    linear-gradient(180deg, rgba(255, 249, 242, 0.96), rgba(249, 240, 227, 0.9)),
    rgba(255, 255, 255, 0.58);
}

.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-panel {
  gap: 20px;
}

.section-head {
  display: grid;
  gap: 4px;
}

.section-head h2 {
  margin: 0;
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: clamp(1.22rem, 1.6vw, 1.58rem);
  line-height: 1.28;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.edit-grid,
.layer-grid,
.preset-grid,
.risk-grid,
.faq-grid,
.related-grid {
  display: grid;
  gap: 14px;
}

.edit-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.edit-card,
.layer-card,
.risk-card,
.faq-card,
.related-link {
  display: grid;
  gap: 10px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.42);
  border: 1px solid rgba(64, 73, 85, 0.1);
}

.edit-card h3,
.layer-card h3,
.preset-card h3,
.command-card h3,
.faq-card h3 {
  margin: 0;
  font-size: 1rem;
  line-height: 1.36;
}

.edit-card code,
.layer-tag,
.layer-kicker {
  justify-self: start;
}

.edit-card code {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 102, 116, 0.08);
  color: var(--brand);
  font-size: 0.82rem;
  font-weight: 700;
}

.layer-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.layer-kicker {
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.layer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.layer-tag {
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(138, 90, 36, 0.08);
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
}

.preset-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.preset-card,
.command-card {
  display: grid;
  gap: 12px;
  padding: 20px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.44);
  border: 1px solid rgba(64, 73, 85, 0.1);
}

.preset-card p,
.command-card p {
  margin: 0;
  color: var(--ink-soft);
}

.preset-card pre,
.command-card pre {
  margin: 0;
  padding: 16px;
  border-radius: 16px;
  background: rgba(19, 28, 35, 0.95);
  color: rgba(244, 239, 230, 0.96);
  overflow-x: auto;
}

.preset-card code,
.command-card code {
  font-size: 0.78rem;
  line-height: 1.68;
  white-space: pre-wrap;
}

.risk-grid,
.faq-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.risk-card strong {
  font-size: 1rem;
  line-height: 1.45;
}

.command-stack {
  display: grid;
  gap: 14px;
}

.related-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.related-link {
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.related-link:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
  background: rgba(255, 255, 255, 0.62);
}

.related-link strong {
  font-size: 0.98rem;
  line-height: 1.42;
}

@media (max-width: 1180px) {
  .config-hero,
  .config-columns {
    grid-template-columns: 1fr;
  }

  .hero-facts,
  .edit-grid,
  .layer-grid,
  .preset-grid,
  .risk-grid,
  .faq-grid,
  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .hero-facts,
  .edit-grid,
  .layer-grid,
  .preset-grid,
  .risk-grid,
  .faq-grid,
  .related-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .configurations-page {
    gap: 18px;
  }

  .hero-main,
  .summary-card,
  .edit-card,
  .layer-card,
  .risk-card,
  .faq-card,
  .related-link,
  .preset-card,
  .command-card {
    padding: 14px;
    border-radius: 18px;
  }

  .hero-facts,
  .edit-grid,
  .layer-grid,
  .preset-grid,
  .risk-grid,
  .faq-grid,
  .related-grid,
  .command-stack,
  .config-columns {
    gap: 10px;
  }

  .edit-card h3,
  .layer-card h3,
  .preset-card h3,
  .command-card h3,
  .faq-card h3,
  .related-link strong,
  .risk-card strong {
    font-size: 0.94rem;
    line-height: 1.36;
  }

  .hero-fact p,
  .summary-card p,
  .edit-card p,
  .layer-card p,
  .preset-card p,
  .command-card p,
  .risk-card p,
  .faq-card p,
  .related-link p {
    font-size: 0.84rem;
    line-height: 1.56;
  }

  .edit-card code,
  .layer-tag {
    font-size: 0.76rem;
  }

  .preset-card pre,
  .command-card pre {
    padding: 14px;
    border-radius: 14px;
  }

  .preset-card code,
  .command-card code {
    font-size: 0.74rem;
    line-height: 1.6;
  }
}
</style>
