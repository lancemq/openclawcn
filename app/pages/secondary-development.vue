<script setup lang="ts">
import {
  secondaryDevelopmentReadingPath,
  secondaryDevelopmentScenarios,
  secondaryDevelopmentSignals,
  secondaryDevelopmentSources,
  secondaryDevelopmentStats,
  secondaryDevelopmentTracks,
} from '~/data/ecosystem-development'

useSeo({
  title: '二次开发',
  description: '围绕 Skills、Plugins、Hooks、HTTP Routes 和 ClawHub，整理 OpenClaw 二次开发的主要方向、应用场景与官方资料。',
  path: '/secondary-development',
  type: 'website',
})

const developmentBriefs = [
  {
    title: '适用对象',
    body: '面向需要扩展 OpenClaw 能力的开发者、技术团队和内部平台团队。',
  },
  {
    title: '典型产出',
    body: '技能包、插件包、Hook / Webhook 入口、HTTP 路由和可复用能力包。',
  },
  {
    title: '开发入口',
    body: '先看 Skills、Plugins、ClawHub 与 Plugin API，再确定本地调试或发布路径。',
  },
]

const developmentChooser = [
  {
    need: '封装任务流程、提示词规则和配套脚本',
    choose: 'Skills',
    note: '适合把能力打包成可复用的任务单元。',
  },
  {
    need: '接入新渠道、工具能力或运行时功能',
    choose: 'Plugins',
    note: '适合扩展 Gateway 能力和系统集成。',
  },
  {
    need: '接外部事件、回调和 Webhook 入口',
    choose: 'Hooks / HTTP Routes',
    note: '适合审批、工单、表单等系统回调场景。',
  },
  {
    need: '把能力公开分发给团队或社区',
    choose: 'ClawHub',
    note: '适合做版本化共享和公开分发。',
  },
]

const developmentChecklist = [
  {
    title: '环境准备',
    items: ['确认 OpenClaw 运行环境与版本', '准备本地调试目录或工作区', '确认依赖安装与基础命令可用'],
  },
  {
    title: '权限边界',
    items: ['明确需要访问的模型、工具和外部系统', '确认敏感操作是否需要审批', '避免在开发阶段默认放开全部权限'],
  },
  {
    title: '调试方式',
    items: ['先准备最小可复现样例', '优先从本地调试和日志查看开始', '对 Hook、HTTP 路由和事件入口单独验证'],
  },
  {
    title: '发布与复用',
    items: ['确定是内部共享还是公开分发', '准备基础更新说明', '公开能力包时补充安装与使用说明'],
  },
]

const developmentPitfalls = [
  {
    title: '把能做成 skill 的需求写成 plugin',
    risk: '开发复杂度被提前拉高，后续维护成本也会明显增加。',
    fix: '如果目标只是封装任务、提示词和脚本，优先从 Skills 开始。',
  },
  {
    title: '一开始就放开过多权限',
    risk: '调试虽然方便，但后续很难分清到底哪一层能力真正需要保留。',
    fix: '先按最小权限跑通最小样例，再逐步增加需要的模型、工具和外部访问能力。',
  },
  {
    title: '没有准备最小测试样例',
    risk: '一旦效果不对，很难判断是代码、配置还是输入问题。',
    fix: '为每个 Skill、Plugin 或 Hook 先准备一个最小可复现输入和预期输出。',
  },
  {
    title: '只写能力，不写说明',
    risk: '团队成员难以判断怎么安装、调用和升级，复用价值会迅速下降。',
    fix: '在发布或共享前补齐安装说明、输入输出示例和更新说明。',
  },
]

const releaseChecklist = [
  {
    title: '功能验证',
    items: ['确认核心功能在最小样例下可用', '检查输入输出是否符合预期', '确认失败场景有明确提示或回退方式'],
  },
  {
    title: '权限检查',
    items: ['核对模型、工具和外部系统权限范围', '确认高风险能力没有默认放开', '对需要审批的动作保留人工确认链路'],
  },
  {
    title: '文档交付',
    items: ['补齐安装步骤和调用方式', '提供最小使用示例', '说明版本要求、依赖和更新事项'],
  },
  {
    title: '发布准备',
    items: ['确认内部共享或公开发布路径', '准备版本说明或变更记录', '对公开能力包核对命名、说明和可见内容'],
  },
]

const sectionNav = [
  { label: '选型', href: '#chooser' },
  { label: '准备', href: '#prep' },
  { label: '形态', href: '#types' },
  { label: '流程', href: '#process' },
  { label: '踩坑', href: '#pitfalls' },
  { label: '发布', href: '#release' },
  { label: '资料', href: '#sources' },
]
</script>

<template>
  <section class="section">
    <div class="container collection-page development-page">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: '生态中心', to: '/ecosystem' },
        { label: '二次开发' },
      ]" />

      <section class="collection-hero development-hero">
        <div class="card collection-main development-main">
          <p class="eyebrow">Secondary Development</p>
          <h1 class="section-title">OpenClaw 二次开发</h1>
          <p class="section-copy">
            围绕 Skills、Plugins、Hooks、HTTP Routes 和 ClawHub，整理 OpenClaw 常见的二次开发方向、场景与官方资料入口。
          </p>

          <div class="collection-utility">
            <article
              v-for="stat in secondaryDevelopmentStats.slice(0, 2)"
              :key="stat.label"
              class="collection-utility-item"
            >
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side development-side">
          <div class="collection-summary">
            <span class="mini-label">内容来源</span>
            <strong>本页基于 2026 年 3 月 16 日可访问的公开官方资料整理。</strong>
            <p>主要参考 OpenClaw 官方文档中的 Skills、Plugins、ClawHub 与 Plugin API 页面。</p>
          </div>

          <div v-for="signal in secondaryDevelopmentSignals" :key="signal.label" class="collection-summary">
            <span class="mini-label">{{ signal.label }}</span>
            <p>{{ signal.value }}：{{ signal.note }}</p>
          </div>
        </aside>
      </section>

      <section class="hero-data-band">
        <div class="grid stats-grid">
          <article v-for="stat in secondaryDevelopmentStats" :key="stat.label" class="card stat-card">
            <span class="stat-value">{{ stat.value }}</span>
            <strong class="stat-label">{{ stat.label }}</strong>
            <p class="stat-note">{{ stat.note }}</p>
          </article>
        </div>

        <section class="brief-grid">
          <article v-for="item in developmentBriefs" :key="item.title" class="card brief-card">
            <span class="mini-label">{{ item.title }}</span>
            <p>{{ item.body }}</p>
          </article>
        </section>
      </section>

      <nav class="page-nav card" aria-label="二次开发页内导航">
        <div class="page-nav-head">
          <span class="mini-label">目录</span>
          <strong>按开发过程快速跳转</strong>
        </div>
        <div class="page-nav-links">
          <a v-for="item in sectionNav" :key="item.href" :href="item.href" class="page-nav-link">
            {{ item.label }}
          </a>
        </div>
      </nav>

      <section id="chooser" class="card series-panel series-panel-featured chooser-panel">
        <div class="series-head">
          <div>
            <span class="section-step">01</span>
            <p class="eyebrow">Development Chooser</p>
            <h2>开发选型对照</h2>
            <p class="section-copy">根据目标选择开发方式，可以更快判断应从 Skills、Plugins、Hooks 还是 ClawHub 开始。</p>
          </div>
        </div>

        <div class="chooser-grid">
          <article v-for="item in developmentChooser" :key="item.need" class="chooser-card">
            <span class="mini-label">想做什么</span>
            <p class="chooser-need">{{ item.need }}</p>
            <span class="mini-label">建议路径</span>
            <strong>{{ item.choose }}</strong>
            <p>{{ item.note }}</p>
          </article>
        </div>
      </section>

      <section id="prep" class="card series-panel">
        <div class="series-head">
          <div>
            <span class="section-step">02</span>
            <p class="eyebrow">Preparation Checklist</p>
            <h2>开发前准备清单</h2>
            <p class="section-copy">在开始写 Skills、Plugins 或 Hook 之前，先把环境、权限、调试和发布方式准备清楚。</p>
          </div>
        </div>

        <div class="prep-grid">
          <article v-for="item in developmentChecklist" :key="item.title" class="prep-card">
            <span class="mini-label">{{ item.title }}</span>
            <ul>
              <li v-for="point in item.items" :key="point">{{ point }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="types" class="card series-panel">
        <div class="series-head">
          <div>
            <span class="section-step">03</span>
            <p class="eyebrow">Development Types</p>
            <h2>主要开发形态</h2>
            <p class="section-copy">根据任务封装、能力接入、事件联动和公开分发等目标，二次开发通常会落到下面几类形态。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="track in secondaryDevelopmentTracks" :key="track.title" class="series-card development-track">
            <div class="series-card-top">
              <SeriesGlyph kind="grid" tone="brand" small />
              <span class="series-tag">{{ track.title }}</span>
            </div>
            <p class="series-card-copy">{{ track.description }}</p>
            <div class="track-meta">
              <div>
                <span class="mini-label">常见场景</span>
                <p>{{ track.fit }}</p>
              </div>
              <div>
                <span class="mini-label">交付形式</span>
                <p>{{ track.output }}</p>
              </div>
            </div>
            <div class="track-links">
              <template v-for="link in track.links" :key="link.label">
                <a
                  v-if="'href' in link"
                  :href="link.href"
                  target="_blank"
                  rel="noreferrer"
                  class="series-pill-link"
                >
                  {{ link.label }}
                </a>
                <NuxtLink
                  v-else
                  :to="link.to"
                  class="series-pill-link"
                >
                  {{ link.label }}
                </NuxtLink>
              </template>
            </div>
          </article>
        </div>
      </section>

      <section id="process" class="card series-panel">
        <div class="series-head">
          <div>
            <span class="section-step">04</span>
            <p class="eyebrow">Development Process</p>
            <h2>常见开发流程</h2>
            <p class="section-copy">从明确目标到确定运行边界，再到分发与复用，是更常见的推进方式。</p>
          </div>
        </div>

        <div class="reading-path">
          <article v-for="(item, index) in secondaryDevelopmentReadingPath" :key="item.title" class="path-card">
            <span class="path-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="pitfalls" class="card series-panel">
        <div class="series-head">
          <div>
            <span class="section-step">05</span>
            <p class="eyebrow">Common Pitfalls</p>
            <h2>常见踩坑</h2>
            <p class="section-copy">下面这些问题最常见，提前避开会比后期返工轻松很多。</p>
          </div>
        </div>

        <div class="pitfall-grid">
          <article v-for="item in developmentPitfalls" :key="item.title" class="pitfall-card">
            <span class="mini-label">常见问题</span>
            <h3>{{ item.title }}</h3>
            <p><strong>风险：</strong>{{ item.risk }}</p>
            <p><strong>修正：</strong>{{ item.fix }}</p>
          </article>
        </div>
      </section>

      <section id="release" class="card series-panel series-panel-featured release-panel">
        <div class="series-head">
          <div>
            <span class="section-step">06</span>
            <p class="eyebrow">Release Checklist</p>
            <h2>发布前检查</h2>
            <p class="section-copy">在共享或发布前，把功能、权限、文档和版本说明核对一遍。</p>
          </div>
        </div>

        <div class="release-grid">
          <article v-for="item in releaseChecklist" :key="item.title" class="release-card">
            <span class="mini-label">{{ item.title }}</span>
            <ul>
              <li v-for="point in item.items" :key="point">{{ point }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <span class="section-step">07</span>
            <p class="eyebrow">Scenarios</p>
            <h2>常见应用场景</h2>
          </div>
        </div>

        <div class="series-grid-2 scenario-grid">
          <article v-for="item in secondaryDevelopmentScenarios" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <span class="series-tag highlight">{{ item.path }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="series-card-copy">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section id="sources" class="card series-panel series-panel-reference sources-panel">
        <div class="series-head">
          <div>
            <span class="section-step">08</span>
            <p class="eyebrow">Official Sources</p>
            <h2>官方资料索引</h2>
            <p class="section-copy">下面这些公开资料可直接用于了解 Skills、Plugins、Hook 与 HTTP 接口能力。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="source in secondaryDevelopmentSources" :key="source.href" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="spark" tone="accent" small />
              <span class="series-tag">{{ source.source }}</span>
            </div>
            <h3>{{ source.title }}</h3>
            <p class="series-card-copy">{{ source.summary }}</p>
            <a :href="source.href" target="_blank" rel="noreferrer" class="series-pill-link">
              打开原文
            </a>
          </article>
        </div>
      </section>

    </div>
  </section>
</template>

<style scoped>
.development-page,
.development-side,
.track-meta,
.track-links,
.reading-path,
.brief-grid,
.chooser-grid,
.prep-grid,
.pitfall-grid,
.release-grid,
.hero-data-band {
  display: grid;
  gap: 16px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.hero-data-band {
  gap: 14px;
}

.series-panel {
  scroll-margin-top: 108px;
  padding: 22px;
  background:
    linear-gradient(180deg, rgba(255, 250, 242, 0.76), rgba(255, 255, 255, 0.54)),
    rgba(255, 255, 255, 0.58);
}

.series-panel-featured {
  position: relative;
  background:
    linear-gradient(180deg, rgba(247, 252, 249, 0.88), rgba(255, 255, 255, 0.58)),
    rgba(255, 255, 255, 0.62);
  border-color: rgba(15, 118, 110, 0.14);
}

.series-panel-featured::before,
.series-panel-reference::before {
  content: "";
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 4px;
  border-radius: 999px 999px 0 0;
}

.series-panel-featured::before {
  background: linear-gradient(90deg, rgba(15, 118, 110, 0.78), rgba(213, 160, 63, 0.52));
}

.series-panel-reference {
  position: relative;
  background:
    linear-gradient(180deg, rgba(255, 249, 241, 0.9), rgba(255, 255, 255, 0.58)),
    rgba(255, 255, 255, 0.62);
  border-color: rgba(170, 118, 46, 0.14);
}

.series-panel-reference::before {
  background: linear-gradient(90deg, rgba(170, 118, 46, 0.76), rgba(15, 118, 110, 0.34));
}

.series-head {
  margin-bottom: 6px;
}

.section-step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 30px;
  margin-bottom: 10px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.1);
  color: var(--accent);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.series-panel-featured .section-step {
  background: rgba(15, 118, 110, 0.14);
}

.series-panel-reference .section-step {
  background: rgba(170, 118, 46, 0.14);
  color: #8d5a17;
}

.stat-card {
  display: grid;
  gap: 6px;
  padding: 20px;
  text-align: center;
}

.stat-value {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.8rem;
  color: var(--brand);
  line-height: 1.1;
}

.stat-label {
  font-size: 0.95rem;
}

.stat-note,
.brief-card p,
.track-meta p,
.path-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.65;
}

.brief-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.brief-card {
  display: grid;
  gap: 8px;
  padding: 18px;
}

.page-nav {
  gap: 14px;
  padding: 16px 18px 18px;
  background:
    linear-gradient(135deg, rgba(255, 248, 236, 0.9), rgba(247, 242, 232, 0.82)),
    rgba(255, 255, 255, 0.68);
}

.page-nav-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.page-nav-head strong {
  font-size: 0.98rem;
  letter-spacing: 0.01em;
}

.page-nav-links {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 10px;
}

.page-nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 252, 247, 0.86);
  color: var(--ink);
  font-size: 0.84rem;
  font-weight: 700;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.page-nav-link:hover {
  transform: translateY(-1px);
  border-color: rgba(12, 108, 105, 0.2);
  background: rgba(255, 255, 255, 0.74);
}

.chooser-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.prep-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.pitfall-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.release-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.chooser-card {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.46);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32);
}

.chooser-panel .chooser-card:first-child,
.release-panel .release-card:first-child {
  background:
    linear-gradient(135deg, rgba(244, 251, 247, 0.94), rgba(255, 255, 255, 0.6)),
    rgba(255, 255, 255, 0.5);
  border-color: rgba(15, 118, 110, 0.16);
}

.prep-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.46);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32);
}

.pitfall-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.46);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32);
}

.release-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.46);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32);
}

.release-card ul {
  margin: 0;
  padding-left: 18px;
  color: var(--ink-soft);
  line-height: 1.7;
}

.sources-panel :deep(.series-pill-link) {
  background: rgba(255, 248, 239, 0.88);
  border-color: rgba(170, 118, 46, 0.16);
}

.sources-panel :deep(.series-pill-link:hover) {
  background: rgba(255, 252, 247, 0.98);
  border-color: rgba(170, 118, 46, 0.24);
}

.pitfall-card h3,
.pitfall-card p {
  margin: 0;
}

.pitfall-card h3 {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.4;
}

.pitfall-card p {
  color: var(--ink-soft);
  line-height: 1.68;
}

.prep-card ul {
  margin: 0;
  padding-left: 18px;
  color: var(--ink-soft);
  line-height: 1.7;
}

.chooser-need,
.chooser-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.65;
}

.chooser-card strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
}

.development-track,
.path-card {
  display: grid;
  gap: 12px;
}

.track-links {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.path-card {
  grid-template-columns: auto 1fr;
  align-items: start;
  padding: 16px 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 20px;
  background:
    linear-gradient(135deg, rgba(255, 249, 240, 0.74), rgba(255, 255, 255, 0.48)),
    rgba(255, 255, 255, 0.46);
}

.path-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.12);
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.path-card strong {
  display: block;
  margin-bottom: 6px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.04rem;
}

.scenario-grid {
  gap: 14px;
}

@media (max-width: 960px) {
  .stats-grid,
  .track-links,
  .brief-grid,
  .chooser-grid,
  .prep-grid,
  .pitfall-grid,
  .release-grid,
  .page-nav-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .stats-grid,
  .track-links,
  .brief-grid,
  .chooser-grid,
  .prep-grid,
  .pitfall-grid,
  .release-grid,
  .page-nav-links,
  .path-card {
    grid-template-columns: 1fr;
  }

  .page-nav {
    padding: 14px;
  }

  .page-nav-head {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 560px) {
  .development-page {
    gap: 18px;
  }

  .development-main,
  .development-side,
  .stat-card,
  .brief-card,
  .development-track,
  .path-card {
    padding: 14px;
    border-radius: 18px;
  }

  .stats-grid,
  .brief-grid,
  .reading-path,
  .track-links,
  .scenario-grid,
  .hero-data-band,
  .page-nav {
    gap: 10px;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .series-panel {
    padding: 16px;
  }

  .stat-label,
  .path-card strong,
  .series-card h3 {
    font-size: 0.94rem;
    line-height: 1.36;
  }

  .stat-note,
  .brief-card p,
  .track-meta p,
  .path-card p,
  .series-card-copy,
  .collection-summary p {
    font-size: 0.84rem;
    line-height: 1.56;
  }

  .path-index {
    width: 36px;
    height: 36px;
    font-size: 0.78rem;
  }
}
</style>
