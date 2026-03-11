<script setup lang="ts">
useSeo({
  title: '热门技能',
  description: '整理 OpenClaw 当前常见、实用且讨论度高的 skills，包含安装方式、适用场景和使用提醒。',
  path: '/skills',
})

const featuredSkills = [
  {
    title: 'Morning Briefing',
    slug: '/briefing',
    useCase: '每天汇总未读消息、日程、优先级和天气',
    install: 'clawhub install daily-briefing',
    why: '生产力场景里最容易立刻带来价值的技能类型，适合作为第一批 skills。',
    caution: '依赖记忆和日程上下文，没配置相关数据时价值会下降。',
    source: 'DoneClaw 热门技能整理',
  },
  {
    title: 'Expense Tracker',
    slug: '/expense',
    useCase: '自然语言记账、分类和月度统计',
    install: 'clawhub install expense-tracker',
    why: '低门槛、高频使用，很适合体现 OpenClaw 的长期记忆和结构化输出。',
    caution: '要明确数据保存位置和隐私边界，不建议直接混入敏感账务环境。',
    source: 'DoneClaw 热门技能整理',
  },
  {
    title: 'Code Review',
    slug: '/review',
    useCase: '对 diff 或 PR 做结构化审查',
    install: 'clawhub install code-reviewer',
    why: '开发者最容易理解的一类技能，和 OpenClaw 的工具调用能力契合度高。',
    caution: '不应替代人工审批，特别是安全、权限和架构决策仍要人工复核。',
    source: 'DoneClaw 热门技能整理',
  },
  {
    title: 'Research Assistant',
    slug: '/research',
    useCase: '做结构化调研、整理结论和后续问题',
    install: 'clawhub install research-assistant',
    why: '适合结合搜索工具、记忆和长期主题跟踪，是通用度很高的一类技能。',
    caution: '需要明确来源策略，避免把未核实信息当成稳定结论。',
    source: 'DoneClaw 热门技能整理',
  },
  {
    title: 'Deploy Checker',
    slug: '/deploy-check',
    useCase: '检查站点状态、响应时间和 SSL 有效期',
    install: 'clawhub install deploy-checker',
    why: '运维和独立开发场景下很实用，也符合 OpenClaw 的自动化检查定位。',
    caution: '涉及生产地址和告警时，建议配合最小权限和独立环境使用。',
    source: 'DoneClaw 热门技能整理',
  },
  {
    title: 'ClawSouls Skill',
    slug: 'souls-manager',
    useCase: '让 OpenClaw 直接管理和切换 SOUL.md 人格',
    install: 'clawhub install TomLeeLive/clawsouls',
    why: '把 skills 和 souls 两条生态连在一起，便于在同一工作流中切换人格。',
    caution: '切换 soul 会直接影响 agent 行为，建议先在测试工作区验证。',
    source: 'ClawSouls 安装页',
  },
]

const skillSignals = [
  {
    label: '官方基础',
    value: 'ClawHub 是公开技能注册表',
    note: '官方文档强调它提供搜索、安装、更新和同步能力，但也意味着技能来源开放。',
  },
  {
    label: '适合先装什么',
    value: '生产力 + 开发效率类技能',
    note: '相比高风险自动化，摘要、调研、审查、记账这类技能更容易先跑出稳定价值。',
  },
]

const skillSafetyNotes = [
  '优先阅读 skill 的 SKILL.md 和附带脚本，再决定是否安装。',
  '不要把来源不明的技能直接接入高权限环境、钱包、生产密钥或公开渠道。',
  '先在独立 workspace 测试，再决定是否进入长期使用环境。',
]
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Skills</p>
          <h1 class="section-title">热门技能</h1>
          <p class="section-copy">
            这里整理的是当前 OpenClaw 生态里更常见、实用度高的 skills 类型。它们并不等于“官方推荐榜单”，而是基于公开文档、社区讨论和第三方热门整理做出的精选入口。
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
            <span class="mini-label">使用提醒</span>
            <strong>技能市场是开放生态，不是无风险白名单</strong>
            <p>官方文档把 ClawHub 定义为公开技能注册表，适合发现和安装，但所有第三方技能都应按可执行能力来审查，而不是按普通文档来看待。</p>
          </div>

          <div class="collection-summary">
            <span class="mini-label">更适合先尝试</span>
            <p v-for="note in skillSafetyNotes" :key="note">{{ note }}</p>
          </div>
        </aside>
      </section>

      <section class="skill-grid">
        <article v-for="skill in featuredSkills" :key="skill.title" class="card skill-card">
          <div class="collection-meta">
            <span class="tag">{{ skill.slug }}</span>
            <span class="mini-label">{{ skill.source }}</span>
          </div>
          <h2>{{ skill.title }}</h2>
          <p class="skill-use">{{ skill.useCase }}</p>
          <div class="skill-block">
            <span class="mini-label">为什么常用</span>
            <p>{{ skill.why }}</p>
          </div>
          <div class="skill-block">
            <span class="mini-label">安装示例</span>
            <code>{{ skill.install }}</code>
          </div>
          <div class="skill-block">
            <span class="mini-label">注意点</span>
            <p>{{ skill.caution }}</p>
          </div>
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

.skill-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.skill-card {
  display: grid;
  gap: 10px;
}

.skill-card h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.12rem;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.skill-use,
.skill-block p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.62;
}

.skill-block {
  display: grid;
  gap: 5px;
}

code {
  padding: 8px 10px;
  border: 1px solid rgba(12, 108, 105, 0.14);
  border-radius: 10px;
  color: #0d5f5b;
  background: rgba(19, 129, 125, 0.08);
  font-size: 0.88rem;
}

@media (max-width: 900px) {
  .skill-grid {
    grid-template-columns: 1fr;
  }
}
</style>
