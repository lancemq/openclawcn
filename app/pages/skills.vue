<script setup lang="ts">
useSeo({
  title: 'Skills 与扩展能力',
  description: '系统整理 OpenClaw 的热门技能方向、安装方式、加载位置、适用场景、风险边界与配置重点。',
  path: '/skills',
})

const marketSignals = [
  {
    label: '公开入口',
    value: 'ClawHub',
    note: '官方把公开技能发现、安装和同步集中在 ClawHub 这条路径里。',
  },
  {
    label: '私有来源',
    value: 'extraDirs',
    note: '团队技能和实验技能更适合从本地目录加载，而不是混进公共环境。',
  },
  {
    label: '正式管理',
    value: 'configure + JSON5',
    note: 'Skills 的加载、监听、单项开关最终都落在配置层，不应该只靠安装命令记忆。',
  },
  {
    label: '最重要原则',
    value: '少量高频优先',
    note: '第一次接触不要追求装得多，优先验证高频技能对当前工作流是否真的有帮助。',
  },
]

const quickStart = [
  {
    step: '01',
    title: '先查而不是先装',
    detail: '先用 search 确认能力方向、维护来源和说明质量，再决定是否安装。',
    command: 'openclaw skills search',
  },
  {
    step: '02',
    title: '列出当前技能面',
    detail: '先知道当前环境已经有哪些能力，避免重复安装和误判“没生效”。',
    command: 'openclaw skills list',
  },
  {
    step: '03',
    title: '只装一小批',
    detail: '第一次建议只装 3 到 5 个高频方向，先在独立 workspace 验证。',
    command: 'openclaw skills install <skill>',
  },
  {
    step: '04',
    title: '回到配置层收口',
    detail: '安装完成后进 configure，把来源目录、监听和启停都纳入正式配置。',
    command: 'openclaw configure',
  },
]

const skillTracks = [
  {
    title: '第一次扩展',
    badge: '推荐起点',
    summary: '优先选择低副作用、易验证收益的技能。',
    items: ['网页检索与资料归纳', '文档写作与 FAQ 整理', '代码审查与 diff 总结', '日报 / 周报摘要'],
  },
  {
    title: '开发与交付',
    badge: '开发者高频',
    summary: '更适合已经接上代码仓库、测试和终端工具链的使用者。',
    items: ['PR 复核', '测试补洞建议', '发布前检查', '回归清单生成'],
  },
  {
    title: '研究与知识沉淀',
    badge: '长期价值高',
    summary: '适合把信息查找、比较和归档整理成固定工作流。',
    items: ['主题研究', '来源比较', '知识摘要', '会议纪要与行动项'],
  },
  {
    title: '运维与自动化',
    badge: '谨慎启用',
    summary: '收益很强，但必须先看权限边界、日志和回滚方式。',
    items: ['部署巡检', '站点健康检查', '告警归类', '日志提炼'],
  },
]

const popularSkills = [
  // 信息获取类
  {
    title: 'Web Search',
    stage: '新手必备',
    category: '搜索',
    description: '让 Agent 能够搜索互联网获取最新信息，突破模型知识截止日期限制。支持多种搜索引擎后端。',
    outcome: '适合需要实时信息的场景，如新闻查询、价格对比、技术文档检索。',
  },
  {
    title: 'Research Assistant',
    stage: '新手 / 二阶段都适合',
    category: '调研',
    description: '用于资料检索、来源对比、长文摘要、问题清单整理，是最容易快速体现 Skills 价值的方向。',
    outcome: '更适合拿来做主题调研、竞品梳理和问题前置分析。',
  },
  {
    title: 'Wikipedia',
    stage: '知识查询',
    category: '百科',
    description: '直接查询维基百科获取结构化知识，适合事实核查和背景了解。',
    outcome: '适合需要权威来源引用的场景。',
  },
  // 生产力工具类
  {
    title: 'Docs Writer',
    stage: '高频推荐',
    category: '文档',
    description: '把 README、FAQ、更新说明、教程草稿和内容清洗组织成稳定输出结构。',
    outcome: '适合站点内容维护、项目知识库和中文说明整理。',
  },
  {
    title: 'Briefing',
    stage: '个人生产力',
    category: '摘要',
    description: '做日程简报、邮件摘要、会议要点和轻量工作简报，适合日常高频使用。',
    outcome: '更适合个人或小团队的固定工作节奏。',
  },
  {
    title: 'Inbox Triage',
    stage: '高频协作',
    category: '协作',
    description: '围绕消息归类、待办拆解和后续动作建议做轻量分流。',
    outcome: '更适合把混乱入口收成可执行清单。',
  },
  {
    title: 'Calendar',
    stage: '日常管理',
    category: '日程',
    description: '管理日程安排、会议提醒和时间冲突检测。支持 Google Calendar 等主流日历服务。',
    outcome: '适合需要时间管理的个人和团队。',
  },
  {
    title: 'Task Manager',
    stage: '任务管理',
    category: '任务',
    description: '创建、跟踪和管理任务列表，支持优先级设置和进度追踪。',
    outcome: '适合项目管理和个人待办管理。',
  },
  // 开发者工具类
  {
    title: 'Code Review',
    stage: '开发工作台',
    category: '代码',
    description: '聚焦 PR 风险、行为回归、测试缺口和变更摘要，适合和终端、Git、测试链路一起使用。',
    outcome: '更容易形成可复用的"提交前复核"流程。',
  },
  {
    title: 'Test Sensei',
    stage: '开发二阶段',
    category: '测试',
    description: '帮助发现边界条件、补测试清单和回归风险，适合前端和服务端都有一定代码量的项目。',
    outcome: '适合把"写完了"推进到"更有把握上线"。',
  },
  {
    title: 'GitHub',
    stage: '开发者必备',
    category: 'Git',
    description: '直接操作 GitHub：创建 Issue、管理 PR、查看仓库状态、处理 CI/CD 结果。',
    outcome: '适合需要频繁与 GitHub 交互的开发者。',
  },
  {
    title: 'Docker',
    stage: 'DevOps',
    category: '容器',
    description: '管理 Docker 容器、镜像和 compose 项目，支持启动、停止、日志查看等操作。',
    outcome: '适合容器化部署和运维场景。',
  },
  // 运维与自动化类
  {
    title: 'Deploy Check',
    stage: '运维谨慎启用',
    category: '交付',
    description: '围绕构建、健康检查、部署结果和上线前 checklist 做自动确认。',
    outcome: '适合固定发布节奏的项目，但必须配清权限和审批。',
  },
  {
    title: 'DevOps Pilot',
    stage: '高权限方向',
    category: '运维',
    description: '更偏长期运维助手，适合处理状态汇总、巡检建议和告警阅读，但不适合盲装。',
    outcome: '适合有独立测试环境和高权限审查流程的团队。',
  },
  {
    title: 'Browser QA',
    stage: '桌面环境更强',
    category: '浏览器',
    description: '配合截图、浏览器和页面理解能力做巡检、视觉检查和基础体验验证。',
    outcome: '适合产品页、运营页和表单流的反复检查。',
  },
  // 数据处理类
  {
    title: 'Spreadsheet',
    stage: '数据处理',
    category: '表格',
    description: '读取、分析和处理 Excel/CSV 文件，支持数据清洗、格式转换和基础统计。',
    outcome: '适合需要处理表格数据的办公场景。',
  },
  {
    title: 'Analytics',
    stage: '数据分析',
    category: '分析',
    description: '数据可视化和分析报告生成，支持多种图表类型和数据源。',
    outcome: '适合需要数据洞察的业务场景。',
  },
  // 其他实用技能
  {
    title: 'Expense / Ledger',
    stage: '轻量事务',
    category: '事务',
    description: '用于消费记录、日常台账和个人事务归档，适合和长期记忆一起使用。',
    outcome: '适合个人工作台，而不是大规模团队协作。',
  },
  {
    title: 'Weather',
    stage: '日常查询',
    category: '天气',
    description: '查询实时天气、预报和空气质量，支持全球城市。',
    outcome: '适合日常信息查询和行程规划。',
  },
  {
    title: 'Translator',
    stage: '多语言',
    category: '翻译',
    description: '多语言翻译支持，结合上下文提供更准确的翻译结果。',
    outcome: '适合跨语言沟通和文档翻译。',
  },
  {
    title: 'Calculator',
    stage: '基础工具',
    category: '计算',
    description: '数学计算和单位换算，支持复杂表达式和科学计算。',
    outcome: '适合需要精确计算的场景。',
  },
  {
    title: 'ClawSouls Integration',
    stage: '二阶段尝试',
    category: '人格',
    description: '适合把人格模板、SOUL 切换和能力风格调整接进同一套工作流。',
    outcome: '适合已经理解 SOUL 和 Skills 边界之后再使用。',
  },
  {
    title: 'Release Notes',
    stage: '内容与发布',
    category: '发布',
    description: '把提交记录、变更摘要和用户可读说明整理成正式发布内容。',
    outcome: '非常适合中文站点、项目更新和版本周报。',
  },
]

const scenarios = [
  {
    title: '如果你在维护中文文档站',
    picks: ['Docs Writer', 'Research Assistant', 'Release Notes'],
    note: '先把调研、写作和更新摘要接起来，收益远高于一开始接复杂自动化。',
  },
  {
    title: '如果你主要在写代码和发版本',
    picks: ['Code Review', 'Test Sensei', 'Deploy Check'],
    note: '把“代码复核 + 测试提醒 + 发布前检查”串成一个闭环最稳。',
  },
  {
    title: '如果你想把 OpenClaw 当个人工作台',
    picks: ['Briefing', 'Inbox Triage', 'Expense / Ledger'],
    note: '先从日常高频事务入手，更容易形成粘性，而不是一开始挑战高权限技能。',
  },
  {
    title: '如果你准备做长期运维',
    picks: ['Deploy Check', 'DevOps Pilot', 'Browser QA'],
    note: '这组一定要放在隔离环境试，尤其要确认审批、日志和回滚路径。',
  },
]

const loadingPatterns = [
  {
    title: '公共市场试用',
    summary: '适合先摸清能力方向和社区常见技能。',
    snippet: `openclaw skills search
openclaw skills install <skill-name>
openclaw skills list`,
  },
  {
    title: '本地团队目录',
    summary: '适合团队私有技能和实验技能，不必混进公共来源。',
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
    title: '单项逐个启停',
    summary: '技能数量上来后，更稳的是逐个开关，而不是整包全开。',
    snippet: `{
  skills: {
    entries: {
      reviewer: { enabled: true },
      deployPilot: { enabled: false }
    }
  }
}`,
  },
]

const configGuide = [
  {
    name: 'allowBundled',
    detail: '控制默认 bundled skills 的暴露面，适合做最小能力收口。',
  },
  {
    name: 'load.extraDirs',
    detail: '接团队技能目录时最常用的入口，比手动复制文件更稳。',
  },
  {
    name: 'load.watch',
    detail: '本地迭代技能时很有用，减少反复重启和手工刷新。',
  },
  {
    name: 'entries.<name>.enabled',
    detail: '给单个技能做启停，是控制复杂度最有效的开关。',
  },
  {
    name: 'workspace 隔离',
    detail: '实验技能、高权限技能和日常稳定环境要分开，不要混在一个 workspace。',
  },
  {
    name: 'install.nodeManager',
    detail: '依赖多的技能要确认 Node 管理方式，避免版本漂移或构建失败。',
  },
]

const reviewChecklist = [
  '先看技能说明和依赖，再看安装命令，不要反过来。',
  '凡是涉及终端、浏览器、Webhook、写文件的技能，都按“可执行能力”审查。',
  '新技能先放到独立 workspace 验证，不要直接带进长期生产环境。',
  '技能数量一多，就回到配置层做逐项开关，不要继续无边界累加。',
]

const learnEntries = [
  {
    title: '二次开发专题',
    description: '如果你已经不只是安装技能，而是准备自己做技能、插件或 ClawHub 扩展，继续进开发专题。',
    to: '/secondary-development',
    meta: '开发',
  },
  {
    title: '工具系列',
    description: '把 Skills 和插件、自动化、Exec、Hooks 放回统一能力图里理解，边界会更清楚。',
    to: '/tools',
    meta: '能力图',
  },
  {
    title: 'Skills 系统文档',
    description: '回到正式文档确认加载机制、目录结构和运行时边界，而不是只记安装命令。',
    to: '/docs/manual/skills-system',
    meta: 'Docs',
  },
  {
    title: 'Skills 最佳实践',
    description: '如果你准备把技能接进长期环境，继续看更稳定的实践方法和治理方式。',
    to: '/best-practices/skills-development',
    meta: '方法深化',
  },
]
</script>

<template>
  <section class="section skills-page">
    <div class="container">
      <section class="skills-hero">
        <div class="card hero-main">
          <div class="hero-copy">
            <p class="eyebrow">Skills Atlas</p>
            <h1 class="section-title">把热门 Skills、安装路径和风险边界放进同一张技能地图。</h1>
            <p class="section-copy">
              Skills 不是越多越强，而是要知道哪些值得先装、哪些适合当前阶段、哪些会把权限边界明显抬高。
              这页把 OpenClaw 常见技能方向、安装方式、使用场景和配置重点收成一套更适合中文用户判断的工作台。
            </p>
          </div>

          <div class="signal-grid">
            <article v-for="item in marketSignals" :key="item.label" class="signal-card">
              <span class="mini-label">{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
              <p>{{ item.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card hero-side">
          <div class="side-block">
            <span class="mini-label">第一批建议</span>
            <strong>先从调研、写作、代码审查和摘要类技能开始</strong>
            <p>这些方向通常副作用更低，回报更快，也更容易判断“这个技能到底值不值得留在长期环境里”。</p>
          </div>

          <div class="side-block">
            <span class="mini-label">不建议一开始就装</span>
            <p>自动部署、生产巡检、改配置、外部 webhook、钱包或高权限终端相关技能。它们价值很高，但也更容易把风险直接带进环境。</p>
          </div>
        </aside>
      </section>

      <section class="card desk-panel">
        <div class="panel-head">
          <p class="eyebrow">交叉访问</p>
          <p class="section-copy">Skills 页适合先判断方向。真正开始安装、开发和长期治理时，通常还要继续回到开发专题、工具页和正式文档。</p>
        </div>

        <div class="config-grid entry-grid">
          <NuxtLink v-for="item in learnEntries" :key="item.to" :to="item.to" class="config-card entry-card">
            <span class="mini-label">{{ item.meta }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <section class="card desk-panel">
        <div class="panel-head">
          <p class="eyebrow">四步上手</p>
          <p class="section-copy">把搜索、确认、安装、收口走成固定动作，比到处零散装技能更稳。</p>
        </div>

        <div class="quick-grid">
          <article v-for="item in quickStart" :key="item.step" class="quick-card">
            <span class="step-chip">{{ item.step }}</span>
            <h2>{{ item.title }}</h2>
            <p>{{ item.detail }}</p>
            <code>{{ item.command }}</code>
          </article>
        </div>
      </section>

      <section class="track-shell">
        <div class="panel-head inline-head">
          <p class="eyebrow">技能赛道</p>
          <p class="section-copy">按使用阶段看技能，而不是按“名字够不够酷”来装。</p>
        </div>

        <div class="track-grid">
          <article v-for="item in skillTracks" :key="item.title" class="card track-card">
            <span class="track-badge">{{ item.badge }}</span>
            <h2>{{ item.title }}</h2>
            <p>{{ item.summary }}</p>
            <ul class="track-list">
              <li v-for="entry in item.items" :key="entry">{{ entry }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="selection-shell">
        <div class="selection-copy">
          <div class="panel-head inline-head">
            <p class="eyebrow">热门方向</p>
            <p class="section-copy">这里不是死记技能名，而是看哪些方向最常见、最容易带来实际收益。</p>
          </div>

          <div class="skill-grid">
            <article v-for="item in popularSkills" :key="item.title" class="card skill-card">
              <div class="skill-meta">
                <span class="tag">{{ item.category }}</span>
                <span class="skill-stage">{{ item.stage }}</span>
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <strong>{{ item.outcome }}</strong>
            </article>
          </div>
        </div>

        <aside class="card scenario-panel">
          <div class="panel-head">
            <p class="eyebrow">怎么选第一批</p>
            <p class="section-copy">如果你不想从十几个方向里自己猜，先按下面这几种常见场景选。</p>
          </div>

          <div class="scenario-list">
            <article v-for="item in scenarios" :key="item.title" class="scenario-card">
              <strong>{{ item.title }}</strong>
              <p>{{ item.note }}</p>
              <div class="scenario-tags">
                <span v-for="pick in item.picks" :key="pick" class="tag">{{ pick }}</span>
              </div>
            </article>
          </div>
        </aside>
      </section>

      <section class="loading-shell">
        <div class="panel-head inline-head">
          <p class="eyebrow">安装与加载</p>
          <p class="section-copy">真正决定体验的，不只是装没装，而是来源、监听和单项启停有没有组织清楚。</p>
        </div>

        <div class="loading-grid">
          <article v-for="item in loadingPatterns" :key="item.title" class="card loading-card">
            <h2>{{ item.title }}</h2>
            <p>{{ item.summary }}</p>
            <pre><code>{{ item.snippet }}</code></pre>
          </article>
        </div>
      </section>

      <section class="card config-panel">
        <div class="panel-head">
          <p class="eyebrow">配置重点</p>
          <p class="section-copy">下面这些字段比“装了多少技能”更值得经常回头看。</p>
        </div>

        <div class="config-grid">
          <article v-for="item in configGuide" :key="item.name" class="config-card">
            <strong>{{ item.name }}</strong>
            <p>{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="card review-panel">
        <div class="panel-head">
          <p class="eyebrow">审查清单</p>
          <p class="section-copy">如果你准备把 Skills 接进长期环境，下面这 4 条通常比“多装一个技能”更重要。</p>
        </div>

        <div class="review-list">
          <article v-for="item in reviewChecklist" :key="item" class="review-item">
            <span class="review-dot" />
            <p>{{ item }}</p>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.skills-page {
  padding-top: 36px;
}

.skills-page .container {
  display: grid;
  gap: 18px;
}

.skills-hero,
.selection-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(320px, 0.95fr);
  gap: 14px;
}

.hero-main,
.hero-side,
.desk-panel,
.track-card,
.skill-card,
.scenario-panel,
.loading-card,
.config-panel,
.review-panel {
  display: grid;
  gap: 14px;
}

.hero-main {
  padding: 26px;
  border-radius: 30px;
  background:
    linear-gradient(135deg, rgba(255, 250, 241, 0.98), rgba(241, 234, 219, 0.94)),
    var(--panel);
}

.hero-copy {
  display: grid;
  gap: 10px;
  max-width: 760px;
}

.hero-side {
  align-content: start;
  padding: 22px;
}

.side-block {
  display: grid;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(67, 73, 60, 0.1);
}

.side-block:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.side-block strong,
.quick-card h2,
.track-card h2,
.loading-card h2,
.skill-card h3,
.scenario-card strong,
.config-card strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  line-height: 1.24;
  letter-spacing: -0.03em;
}

.side-block p,
.quick-card p,
.track-card p,
.skill-card p,
.scenario-card p,
.config-card p,
.review-item p,
.signal-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.6;
}

.signal-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.signal-card {
  display: grid;
  gap: 8px;
  padding: 14px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  background: rgba(255, 255, 255, 0.44);
}

.signal-card strong {
  font-size: 0.96rem;
}

.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.panel-head {
  display: grid;
  gap: 6px;
}

.inline-head {
  margin-bottom: 2px;
}

.quick-grid,
.track-grid,
.skill-grid,
.loading-grid,
.config-grid {
  display: grid;
  gap: 12px;
}

.quick-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.quick-card {
  display: grid;
  gap: 10px;
  padding: 16px;
  border-radius: 20px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  background: rgba(255, 255, 255, 0.4);
}

.step-chip {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
  color: #f8f7f2;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.quick-card code,
.loading-card code {
  display: inline-block;
  padding: 9px 10px;
  border: 1px solid rgba(12, 108, 105, 0.14);
  border-radius: 12px;
  background: rgba(19, 129, 125, 0.08);
  color: #0d5f5b;
  font-size: 0.82rem;
  overflow-wrap: anywhere;
}

.track-shell,
.loading-shell {
  display: grid;
  gap: 12px;
}

.track-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.track-card {
  padding: 18px;
}

.track-badge,
.skill-stage {
  color: var(--brand);
  font-size: 0.78rem;
  font-weight: 700;
}

.track-list,
.review-list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.track-list li {
  position: relative;
  padding-left: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
}

.track-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--accent);
}

.selection-copy {
  display: grid;
  gap: 12px;
}

.skill-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.skill-card {
  padding: 18px;
  min-height: 220px;
}

.skill-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.skill-card strong {
  font-size: 0.88rem;
  color: var(--ink);
  line-height: 1.55;
}

.scenario-panel {
  padding: 22px;
  align-content: start;
}

.scenario-list {
  display: grid;
  gap: 10px;
}

.scenario-card {
  display: grid;
  gap: 8px;
  padding: 14px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  background: rgba(255, 255, 255, 0.4);
}

.scenario-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.loading-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.loading-card pre {
  margin: 0;
  padding: 14px;
  overflow: auto;
  border: 1px solid rgba(67, 73, 60, 0.14);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.52);
}

.config-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.config-card {
  display: grid;
  gap: 8px;
  padding: 14px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  background: rgba(255, 255, 255, 0.38);
}

.entry-card {
  text-decoration: none;
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.entry-card:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.18);
}

.review-item {
  display: grid;
  grid-template-columns: 14px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
}

.review-dot {
  width: 8px;
  height: 8px;
  margin-top: 8px;
  border-radius: 999px;
  background: var(--brand);
}

.tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid var(--line);
  padding: 4px 8px;
  font-size: 0.72rem;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.46);
}

@media (max-width: 1180px) {
  .skills-hero,
  .selection-shell {
    grid-template-columns: 1fr;
  }

  .signal-grid,
  .quick-grid,
  .track-grid,
  .skill-grid,
  .loading-grid,
  .config-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .skills-page {
    padding-top: 18px;
  }

  .hero-main,
  .hero-side,
  .desk-panel,
  .scenario-panel,
  .review-panel,
  .config-panel {
    padding: 18px;
  }

  .signal-grid,
  .quick-grid,
  .track-grid,
  .skill-grid,
  .loading-grid,
  .config-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .skills-page {
    gap: 18px;
  }

  .hero-main,
  .hero-side,
  .desk-panel,
  .scenario-panel,
  .review-panel,
  .config-panel,
  .skill-card,
  .scenario-card,
  .config-card {
    padding: 14px;
    border-radius: 18px;
  }

  .signal-grid,
  .quick-grid,
  .track-grid,
  .skill-grid,
  .loading-grid,
  .config-grid,
  .scenario-list {
    gap: 10px;
  }

  .skill-card {
    min-height: 0;
  }

  .hero-main .section-title,
  .section-head h2 {
    line-height: 1.14;
  }

  .skill-card strong,
  .scenario-card strong,
  .config-card strong {
    font-size: 0.9rem;
    line-height: 1.42;
  }

  .section-copy,
  .skill-card p,
  .scenario-card p,
  .config-card p,
  .review-item p {
    font-size: 0.84rem;
    line-height: 1.56;
  }

  .loading-card pre {
    padding: 12px;
    border-radius: 16px;
  }
}
</style>
