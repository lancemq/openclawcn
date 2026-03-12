<script setup lang="ts">
import {
  toolAudienceTracks,
  toolReadingPath,
  toolRiskBands,
  toolSeriesOverview,
  toolSeriesSignals,
} from '~/data/tools'

useSeo({
  title: '工具系列',
  description: '从插件、执行权限、Hooks、自动化到排障，系统整理 OpenClaw 的工具层地图与阅读顺序。',
  path: '/tools',
})

const entryCount = computed(() => toolSeriesOverview.length)
</script>

<template>
  <section class="section">
    <div class="container tools-page">
      <section class="tools-hero">
        <div class="card hero-main">
          <p class="eyebrow">Tool Series</p>
          <h1 class="section-title">工具系列</h1>
          <p class="section-copy">
            这一组页面专门回答一个问题：OpenClaw 到底怎样从“能聊天”变成“能真正做事”。插件、执行工具、审批、hooks、自动化和排障并不是分散技巧，而是一整套能力边界。
          </p>

          <div class="hero-route">
            <NuxtLink
              v-for="item in toolReadingPath"
              :key="item.to"
              :to="item.to"
              class="route-step"
            >
              <span class="tag">{{ item.meta }}</span>
              <strong>{{ item.title }}</strong>
            </NuxtLink>
          </div>
        </div>

        <aside class="card hero-side">
          <div class="summary-panel">
            <span class="mini-label">当前结构</span>
            <strong>{{ entryCount }} 个专题入口</strong>
            <p>从总入口开始，再进入插件、权限、触发、自动化、排障和组合方案，适合已经开始扩展 OpenClaw 的用户。</p>
          </div>

          <div class="summary-panel">
            <span class="mini-label">建议顺序</span>
            <p>先理解边界，再做扩展。先分清楚能力层级，再决定是不是要装插件、开 hooks 或做长期任务。</p>
          </div>
        </aside>
      </section>

      <div class="grid signal-grid">
        <article v-for="item in toolSeriesSignals" :key="item.label" class="card signal-card">
          <span class="mini-label">{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <p>{{ item.note }}</p>
        </article>
      </div>

      <section class="card map-panel">
        <div class="section-head">
          <div>
            <p class="eyebrow">能力地图</p>
            <p class="section-copy">把工具层拆开看，比把所有扩展都叫成“skills”更有效。</p>
          </div>
        </div>

        <div class="grid map-grid">
          <NuxtLink v-for="item in toolSeriesOverview" :key="item.to" :to="item.to" class="card map-card">
            <span class="tag">{{ item.meta }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <section class="audience-shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">先看哪一层</p>
            <p class="section-copy">不同阶段应该看的不是同一组内容。先按当前目标选入口，效率更高。</p>
          </div>
        </div>

        <div class="grid audience-grid">
          <article v-for="track in toolAudienceTracks" :key="track.title" class="card audience-card">
            <strong>{{ track.title }}</strong>
            <p>{{ track.summary }}</p>
            <div class="pick-row">
              <NuxtLink
                v-for="pick in track.picks"
                :key="pick"
                :to="pick"
                class="pick-chip"
              >
                {{ toolSeriesOverview.find(item => item.to === pick)?.title || pick }}
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <section class="card risk-panel">
        <div class="section-head">
          <div>
            <p class="eyebrow">风险梯度</p>
            <p class="section-copy">工具层的价值不只是能力更多，而是知道哪些能力适合读、适合小范围执行、适合长期自动化。</p>
          </div>
        </div>

        <div class="grid risk-grid">
          <article v-for="item in toolRiskBands" :key="item.title" class="risk-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.summary }}</p>
            <small>{{ item.detail }}</small>
          </article>
        </div>
      </section>

      <section class="card next-panel">
        <div class="section-head">
          <div>
            <p class="eyebrow">继续深入</p>
            <p class="section-copy">如果你已经确定自己要扩能力，下面这几组入口最适合和工具系列一起看。</p>
          </div>
        </div>

        <div class="next-grid">
          <NuxtLink to="/skills" class="next-link">
            <span class="tag">Skills</span>
            <strong>热门技能</strong>
            <p>把高频能力包和工作流层单独理解，别和插件层混在一起。</p>
          </NuxtLink>
          <NuxtLink to="/configurations" class="next-link">
            <span class="tag">Config</span>
            <strong>关键配置</strong>
            <p>工具层最终都要落到配置上，这一页负责收口。</p>
          </NuxtLink>
          <NuxtLink to="/best-practices/automation-workflows" class="next-link">
            <span class="tag">Practice</span>
            <strong>自动化实践</strong>
            <p>当你已经理解边界后，再回到实践页看具体做法，效果最好。</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.tools-page,
.tools-hero,
.signal-grid,
.audience-shell,
.risk-panel,
.next-panel,
.hero-route,
.pick-row,
.next-grid {
  display: grid;
  gap: 14px;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.tools-page {
  gap: 22px;
}

.tools-hero {
  grid-template-columns: minmax(0, 1.8fr) minmax(270px, 0.85fr);
  align-items: start;
}

.hero-main,
.hero-side,
.signal-card,
.map-panel,
.audience-card,
.risk-panel,
.next-panel {
  background:
    radial-gradient(circle at top left, rgba(19, 129, 125, 0.1), transparent 36%),
    linear-gradient(180deg, rgba(255, 251, 244, 0.98), rgba(248, 241, 229, 0.94)),
    var(--panel);
}

.hero-route {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 18px;
}

.route-step,
.next-link,
.map-card {
  display: grid;
  gap: 8px;
  padding: 14px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.52);
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.route-step:hover,
.next-link:hover,
.map-card:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
}

.route-step strong,
.map-card strong,
.audience-card strong,
.risk-card strong,
.next-link strong,
.summary-panel strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.28;
}

.route-step strong {
  font-size: 0.94rem;
}

.route-step,
.summary-panel,
.signal-card,
.map-card,
.audience-card,
.risk-card,
.next-link {
  display: grid;
  gap: 8px;
}

.summary-panel + .summary-panel {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(67, 73, 60, 0.08);
}

.signal-grid,
.map-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.signal-card p,
.map-card p,
.audience-card p,
.risk-card p,
.risk-card small,
.next-link p,
.summary-panel p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.6;
}

.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pick-row {
  display: flex;
  flex-wrap: wrap;
}

.pick-chip {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(19, 129, 125, 0.08);
  color: var(--brand);
  font-size: 0.78rem;
  font-weight: 700;
}

.risk-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.risk-card {
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.48);
}

.next-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 980px) {
  .tools-hero,
  .signal-grid,
  .map-grid,
  .audience-grid,
  .risk-grid,
  .next-grid,
  .hero-route {
    grid-template-columns: 1fr;
  }
}
</style>
