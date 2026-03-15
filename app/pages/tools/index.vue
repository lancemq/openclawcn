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
    <div class="container series-page">
      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Tool Series</p>
          <h1 class="section-title">工具系列</h1>
          <p class="section-copy">
            这一组页面专门回答一个问题：OpenClaw 到底怎样从“能聊天”变成“能真正做事”。插件、执行工具、审批、Hooks、自动化和排障并不是分散技巧，而是一整套能力边界。
          </p>

          <div class="series-grid-3">
            <NuxtLink
              v-for="item in toolReadingPath"
              :key="item.to"
              :to="item.to"
              class="series-link-card"
            >
              <div class="series-card-top">
                <SeriesGlyph kind="flow" tone="brand" small />
                <span class="series-tag">{{ item.meta }}</span>
              </div>
              <strong>{{ item.title }}</strong>
            </NuxtLink>
          </div>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">当前结构</span>
            <strong>{{ entryCount }} 个专题入口</strong>
            <p>从总入口开始，再进入插件、权限、触发、自动化、排障和组合方案，适合已经开始扩展 OpenClaw 的用户。</p>
          </div>

          <div class="series-signal">
            <span class="series-kicker">建议顺序</span>
            <p>先理解边界，再做扩展。先分清楚能力层级，再决定是不是要装插件、开 Hooks 或做长期任务。</p>
          </div>
        </aside>
      </section>

      <div class="series-grid-3">
        <article v-for="item in toolSeriesSignals" :key="item.label" class="series-card signal-card">
          <div class="series-card-top">
            <SeriesGlyph kind="spark" tone="accent" small />
            <span class="series-kicker">{{ item.label }}</span>
          </div>
          <strong>{{ item.value }}</strong>
          <p>{{ item.note }}</p>
        </article>
      </div>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">能力地图</p>
            <p class="section-copy">把工具层拆开看，比把所有扩展都叫成“skills”更有效。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <NuxtLink v-for="item in toolSeriesOverview" :key="item.to" :to="item.to" class="series-link-card">
            <div class="series-card-top">
              <SeriesGlyph kind="grid" tone="brand" small />
              <span class="series-tag">{{ item.meta }}</span>
            </div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">先看哪一层</p>
            <p class="section-copy">不同阶段应该看的不是同一组内容。先按当前目标选入口，效率更高。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="track in toolAudienceTracks" :key="track.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="stack" tone="accent" small />
              <strong>{{ track.title }}</strong>
            </div>
            <p class="series-card-copy">{{ track.summary }}</p>
            <div class="series-chip-row">
              <NuxtLink
                v-for="pick in track.picks"
                :key="pick"
                :to="pick"
                class="series-pill-link"
              >
                {{ toolSeriesOverview.find(item => item.to === pick)?.title || pick }}
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">风险梯度</p>
            <p class="section-copy">工具层的价值不只是能力更多，而是知道哪些能力适合读、适合小范围执行、适合长期自动化。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in toolRiskBands" :key="item.title" class="series-card risk-card">
            <div class="series-card-top">
              <SeriesGlyph kind="shield" tone="muted" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p>{{ item.summary }}</p>
            <small>{{ item.detail }}</small>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">继续深入</p>
            <p class="section-copy">如果你已经确定自己要扩能力，下面这几组入口最适合和工具系列一起看。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <NuxtLink to="/skills" class="series-link-card">
            <div class="series-card-top">
              <SeriesGlyph kind="orbit" tone="accent" small />
              <span class="series-tag">Skills</span>
            </div>
            <strong>热门技能</strong>
            <p>把高频能力包和工作流层单独理解，别和插件层混在一起。</p>
          </NuxtLink>
          <NuxtLink to="/configurations" class="series-link-card">
            <div class="series-card-top">
              <SeriesGlyph kind="terminal" tone="brand" small />
              <span class="series-tag">Config</span>
            </div>
            <strong>关键配置</strong>
            <p>工具层最终都要落到配置上，这一页负责收口。</p>
          </NuxtLink>
          <NuxtLink to="/best-practices/automation-workflows" class="series-link-card">
            <div class="series-card-top">
              <SeriesGlyph kind="pulse" tone="muted" small />
              <span class="series-tag">Practice</span>
            </div>
            <strong>自动化实践</strong>
            <p>当你已经理解边界后，再回到实践页看具体做法，效果最好。</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.signal-card,
.risk-card {
  min-height: 100%;
}

.risk-card small {
  color: var(--ink-soft);
  line-height: 1.6;
}
</style>
