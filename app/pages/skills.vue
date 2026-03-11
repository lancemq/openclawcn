<script setup lang="ts">
useSeo({
  title: 'Skills 与扩展能力',
  description: '系统整理 OpenClaw 的 Skills 生态、安装方式、加载位置、常见能力类型、配置边界与安全注意点。',
  path: '/skills',
})

const skillSignals = [
  {
    label: '官方入口',
    value: 'ClawHub',
    note: '官方文档把 ClawHub 作为公开技能注册表，用于搜索、安装、同步和发现新技能。',
  },
  {
    label: '本地来源',
    value: 'bundled + extraDirs',
    note: '除了官方或社区分发，也可以从本地目录加载 skills，适合团队私有技能和实验技能。',
  },
  {
    label: '管理方式',
    value: 'configure + JSON5',
    note: '技能是否启用、从哪里加载、是否监听目录变化，最终都落到 OpenClaw 配置层。',
  },
]

const quickCommands = [
  {
    title: '搜索与发现',
    command: 'openclaw skills search',
    note: '先查能力名和来源，再决定是否安装。',
  },
  {
    title: '列出已装技能',
    command: 'openclaw skills list',
    note: '适合排查“明明装了但没生效”的问题。',
  },
  {
    title: '安装技能',
    command: 'openclaw skills install <skill>',
    note: '从 ClawHub 或配置好的来源安装到当前环境。',
  },
  {
    title: '打开 Skills 配置',
    command: 'openclaw configure',
    note: '把 skills 的加载和单项开关纳入正式配置。',
  },
]

const skillFamilies = [
  {
    title: '检索与调研类',
    examples: '网页检索、文档索引、问答回溯、结果汇总',
    value: '最适合先装的第一批',
    why: '门槛低、风险相对可控，能很快体现 Tools + 记忆 + 输出结构化的价值。',
  },
  {
    title: '代码与工程类',
    examples: '代码审查、diff 总结、测试辅助、发布检查',
    value: '开发者最容易感知价值',
    why: '和终端、Git、测试、编辑等工具链契合度高，但一定要注意执行权限范围。',
  },
  {
    title: '办公与生产力类',
    examples: '日程摘要、日报、记账、消息归档、任务回顾',
    value: '高频但依赖上下文',
    why: '一旦接上本地数据或日历，就会形成很强的长期使用粘性。',
  },
  {
    title: '自动化与运维类',
    examples: '健康检查、部署巡检、告警摘要、日志提炼',
    value: '最需要审查权限边界',
    why: '这类技能常常会碰到生产地址、Webhook、密钥或服务器状态，不适合盲装。',
  },
  {
    title: '多模态与浏览器类',
    examples: '截图理解、页面巡检、视觉 QA、录屏分析',
    value: '体验强但依赖环境',
    why: '通常需要浏览器、截图或图像能力，适合在桌面环境或专用工作区使用。',
  },
  {
    title: '人格与工作流联动类',
    examples: 'SOUL 切换、角色化写作、不同人格协同',
    value: '适合二阶段尝试',
    why: '这类能力更像“改变行为风格”，不适合作为第一次接触 Skills 的入口。',
  },
]

const installPaths = [
  {
    title: '从 ClawHub 直接安装',
    summary: '最适合先试用公开生态里的常见技能。',
    snippet: `openclaw skills search
openclaw skills install <skill-name>
openclaw skills list`,
  },
  {
    title: '从本地目录加载',
    summary: '更适合团队私有技能或你自己写的实验技能。',
    snippet: `{
  skills: {
    load: {
      extraDirs: ["~/Projects/openclaw-skills"],
      watch: true
    }
  }
}`,
  },
  {
    title: '按条目单独开关',
    summary: '技能太多时，不要一次全开，先逐个启用验证。',
    snippet: `{
  skills: {
    entries: {
      peekaboo: { enabled: true },
      sag: { enabled: false }
    }
  }
}`,
  },
]

const skillConfigPoints = [
  {
    title: 'allowBundled',
    description: '控制官方或随附技能是否允许加载，适合限制默认暴露面。',
  },
  {
    title: 'load.extraDirs',
    description: '把团队自建技能目录接进 OpenClaw，便于长期维护私有扩展。',
  },
  {
    title: 'load.watch',
    description: '本地开发时监听技能目录变化，减少反复重启或手动重载。',
  },
  {
    title: 'entries.<name>.enabled',
    description: '对单个技能逐条开关，是比“全目录开放”更稳的做法。',
  },
  {
    title: 'install.nodeManager',
    description: '安装依赖较多的技能时，需要明确 Node 管理方式，避免版本漂移。',
  },
  {
    title: 'workspace 隔离',
    description: '不同 workspace 可配不同技能集合，避免把实验技能直接带进长期环境。',
  },
]

const popularDirections = [
  {
    title: '文档写作与整理',
    install: '适合搭配 docs-writer 一类方向',
    useCase: 'README、FAQ、操作说明、版本摘要、翻译润色。',
  },
  {
    title: '代码审查与测试',
    install: '适合搭配 code-review / test-sensei 方向',
    useCase: 'PR 复核、回归清单、边界条件提醒、测试补洞。',
  },
  {
    title: '部署与运维巡检',
    install: '适合搭配 deploy-check / devops-pilot 方向',
    useCase: '构建结果确认、站点状态检查、部署清单、告警归类。',
  },
  {
    title: 'SOUL 切换与人格控制',
    install: '适合搭配 ClawSouls 方向',
    useCase: '把技能工作流和人格模板切换放进同一入口中管理。',
  },
  {
    title: 'Research 与知识提炼',
    install: '适合搭配 research-assistant 方向',
    useCase: '做一轮主题调研、来源梳理、问答补充和后续行动项整理。',
  },
  {
    title: '个人事务与摘要',
    install: '适合搭配 briefing / expense 等生产力方向',
    useCase: '日程、简报、归档、轻量记账和个人信息回顾。',
  },
]

const safetyNotes = [
  '不要把来源不清楚的 skill 直接连到生产地址、钱包、私有仓库或高权限终端。',
  '先读 skill 的说明、脚本和依赖，再决定是否安装；不要把它当成普通内容页。',
  '新技能先放在独立 workspace 测试，验证输入、输出和副作用后再进入常用环境。',
  '涉及浏览器、终端、Webhook、文件写入的技能，要优先确认权限边界和日志留存方式。',
]
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Skills</p>
          <h1 class="section-title">Skills 与扩展能力</h1>
          <p class="section-copy">
            OpenClaw 的 Skills 不只是“插件列表”，更像把特定任务能力、工具调用和工作流约束打包成可复用模块。真正值得先掌握的，不是装得越多越好，而是知道哪些技能适合当前阶段、应该从哪里加载，以及怎样把权限边界控制在可接受范围内。
          </p>

          <div class="collection-utility">
            <article v-for="item in skillSignals" :key="item.label" class="collection-utility-item">
              <span class="mini-label">{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
              <p>{{ item.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">先装什么</span>
            <strong>优先从检索、写作、代码审查这类低风险高回报技能开始</strong>
            <p>第一次接触 Skills，不建议直接从自动部署、改配置、外部 webhook 这类高副作用能力下手。先从调研、摘要、代码审查和文档整理切入，更容易验证价值。</p>
          </div>

          <div class="collection-summary">
            <span class="mini-label">一个原则</span>
            <p>技能市场是开放生态，不是天然可信白名单。所有第三方 skills 都应该按“可执行能力”审查，而不是按“内容资源”对待。</p>
          </div>
        </aside>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Quick Commands</p>
          <p class="section-copy">先掌握发现、安装、列出和配置四个基本动作，再去扩展技能数量。</p>
        </div>

        <div class="command-grid">
          <article v-for="item in quickCommands" :key="item.title" class="command-card">
            <span class="mini-label">{{ item.title }}</span>
            <code>{{ item.command }}</code>
            <p>{{ item.note }}</p>
          </article>
        </div>
      </section>

      <section class="family-grid">
        <article v-for="item in skillFamilies" :key="item.title" class="card family-card">
          <span class="mini-label">{{ item.value }}</span>
          <h2>{{ item.title }}</h2>
          <p class="family-examples">{{ item.examples }}</p>
          <p>{{ item.why }}</p>
        </article>
      </section>

      <section class="path-grid">
        <article v-for="item in installPaths" :key="item.title" class="card path-card">
          <span class="mini-label">安装与接入</span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.summary }}</p>
          <pre><code>{{ item.snippet }}</code></pre>
        </article>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">配置要点</p>
          <p class="section-copy">真正决定技能怎么工作的，往往不是“装没装”，而是这些配置项有没有被正确组织。</p>
        </div>

        <div class="points-grid">
          <article v-for="item in skillConfigPoints" :key="item.title" class="point-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">热门方向</p>
          <p class="section-copy">下面这些不是“唯一正确的技能名”，而是当前社区中更常被拿来讨论和安装的能力方向。</p>
        </div>

        <div class="direction-grid">
          <article v-for="item in popularDirections" :key="item.title" class="direction-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.useCase }}</p>
            <span class="direction-note">{{ item.install }}</span>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">安全边界</p>
          <p class="section-copy">如果你准备把 Skills 接进长期环境，下面这几个原则比“多装几个技能”更重要。</p>
        </div>

        <div class="safety-list">
          <article v-for="note in safetyNotes" :key="note" class="safety-item">
            <span class="safety-dot" />
            <p>{{ note }}</p>
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

.section-panel,
.collection-main,
.collection-side,
.family-card,
.path-card {
  display: grid;
  gap: 12px;
}

.section-head {
  display: grid;
  gap: 4px;
}

.command-grid,
.family-grid,
.path-grid,
.points-grid,
.direction-grid {
  display: grid;
  gap: 12px;
}

.command-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.family-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.path-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.points-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.direction-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.command-card,
.point-card,
.direction-card,
.safety-item {
  display: grid;
  gap: 8px;
}

.command-card {
  padding: 12px 14px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.42);
}

.family-card h2,
.path-card h2,
.direction-card h3,
.point-card strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  line-height: 1.28;
  letter-spacing: -0.03em;
}

.family-card h2,
.path-card h2 {
  font-size: 1.05rem;
}

.direction-card h3 {
  font-size: 0.98rem;
}

.family-card p,
.path-card p,
.point-card p,
.direction-card p,
.command-card p,
.safety-item p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.56;
}

.family-examples,
.direction-note {
  color: var(--brand);
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

.command-card code {
  padding: 8px 10px;
  border: 1px solid rgba(12, 108, 105, 0.14);
  border-radius: 10px;
  color: #0d5f5b;
  background: rgba(19, 129, 125, 0.08);
}

.safety-list {
  display: grid;
  gap: 10px;
}

.safety-item {
  grid-template-columns: 14px minmax(0, 1fr);
  align-items: start;
}

.safety-dot {
  width: 8px;
  height: 8px;
  margin-top: 7px;
  border-radius: 999px;
  background: var(--brand);
}

@media (max-width: 1100px) {
  .command-grid,
  .family-grid,
  .path-grid,
  .points-grid,
  .direction-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .command-grid,
  .family-grid,
  .path-grid,
  .points-grid,
  .direction-grid {
    grid-template-columns: 1fr;
  }
}
</style>
