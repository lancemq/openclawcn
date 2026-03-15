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
  description: '从插件、执行权限、触发机制、自动化到排障，系统整理 OpenClaw 的扩展能力地图与阅读顺序。',
  path: '/tools',
})

const entryCount = computed(() => toolSeriesOverview.length)

const architectureGroups = [
  {
    title: '能力层',
    description: '先确认系统如何装进新能力，再去讨论怎样触发和长期运行。',
    items: ['/tools/plugins'],
    tone: 'brand' as const,
    kind: 'grid' as const,
  },
  {
    title: '运行层',
    description: '把事件触发、时间触发和执行边界拆开理解，自动化链路才会稳定。',
    items: ['/tools/exec-and-approvals', '/tools/triggers', '/tools/automation'],
    tone: 'accent' as const,
    kind: 'flow' as const,
  },
  {
    title: '治理层',
    description: '排障与组合方案不是附录，而是决定这套能力能否长期用下去的关键层。',
    items: ['/tools/diagnostics', '/tools/stacks'],
    tone: 'muted' as const,
    kind: 'shield' as const,
  },
]

const menuDecisions = [
  {
    title: '保留 6 个核心专题',
    description: '插件、执行边界、触发、自动化、排障和组合方案仍然各自独立，因为它们解决的是不同问题。',
  },
  {
    title: '合并重复入口',
    description: '`Hooks / Webhooks` 归并到“触发机制”，`工具排障` 归并到“诊断与排障”，旧路由保留兼容跳转。',
  },
  {
    title: '菜单改成主能力入口',
    description: '顶部“扩展”菜单不再塞进过多旁支内容，而是优先展示最常被直接进入的能力入口。',
  },
]

const companionLinks = [
  {
    to: '/skills',
    tag: 'Skills',
    title: 'Skills 与能力包',
    description: '更偏工作法、提示词与任务编排，不等于插件系统。',
  },
  {
    to: '/configurations',
    tag: 'Config',
    title: '关键配置',
    description: '真正落地时，扩展能力最后都会回到配置项与运行环境里。',
  },
  {
    to: '/ecosystem',
    tag: 'Ecosystem',
    title: '扩展生态',
    description: '如果你已经理解工具边界，这一页更适合你决定下一步接什么生态。',
  },
]

function getOverviewItem(path: string) {
  return toolSeriesOverview.find(item => item.to === path)
}

function getPathLabel(path: string) {
  if (path === '/tools') {
    return '工具系列总览'
  }

  return getOverviewItem(path)?.title || path
}
</script>

<template>
  <section class="section tools-shell">
    <div class="container series-page tools-index-page">
      <section class="series-hero tools-hero">
        <div class="card series-main tools-main">
          <div class="tools-kicker-row">
            <span class="series-kicker">Extension Map</span>
            <span class="tools-hero-note">先边界，后扩展，再长期运行</span>
          </div>

          <div class="tools-headline">
            <p class="eyebrow">工具系列</p>
            <h1 class="section-title">把“扩展”重新整理成一张更好理解的能力地图</h1>
            <p class="section-copy">
              这一组页面不只是讲插件、Hooks、自动化怎么用，更重要的是帮你分清楚: 哪些属于装能力、哪些属于触发能力、哪些属于运行边界、哪些属于长期治理。
            </p>
          </div>

          <div class="tools-reading-band">
            <NuxtLink
              v-for="item in toolReadingPath"
              :key="item.to"
              :to="item.to"
              class="tools-reading-card"
            >
              <SeriesGlyph kind="flow" tone="accent" small />
              <div>
                <span class="series-tag">{{ item.meta }}</span>
                <strong>{{ item.title }}</strong>
              </div>
            </NuxtLink>
          </div>
        </div>

        <aside class="card series-side tools-side">
          <div class="series-signal">
            <span class="series-kicker">当前目录</span>
            <strong>{{ entryCount }} 个核心专题</strong>
            <p>扩展目录保留核心主线，不再让重复页面分散判断。旧入口会兼容跳转到新的主专题。</p>
          </div>

          <div class="series-signal">
            <span class="series-kicker">最重要调整</span>
            <strong>触发机制和排障入口完成收口</strong>
            <p>现在用户不再需要判断 “Hooks 页面”和“触发机制页面”到底该先看哪一个。</p>
          </div>

          <div class="series-signal">
            <span class="series-kicker">阅读原则</span>
            <p>从执行边界开始建立安全感，再去装能力、接事件、做自动化，最后再看组合方案，通常是最稳的顺序。</p>
          </div>
        </aside>
      </section>

      <div class="series-grid-3">
        <article v-for="item in toolSeriesSignals" :key="item.label" class="series-card tools-signal-card">
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
            <p class="eyebrow">IA Decisions</p>
            <h2>这轮目录为什么这样重排</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in menuDecisions" :key="item.title" class="series-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Architecture</p>
            <h2>扩展能力应该按三层理解</h2>
          </div>
          <span class="tools-section-note">先分层，再进具体页面，信息噪音会低很多。</span>
        </div>

        <div class="architecture-stack">
          <article
            v-for="group in architectureGroups"
            :key="group.title"
            class="architecture-band"
          >
            <div class="architecture-band-head">
              <div class="architecture-band-title">
                <SeriesGlyph :kind="group.kind" :tone="group.tone" />
                <div>
                  <strong>{{ group.title }}</strong>
                  <p>{{ group.description }}</p>
                </div>
              </div>
            </div>

            <div class="series-grid-3 architecture-links">
              <NuxtLink
                v-for="path in group.items"
                :key="path"
                :to="path"
                class="series-link-card"
              >
                <span class="series-tag">{{ getOverviewItem(path)?.meta }}</span>
                <strong>{{ getOverviewItem(path)?.title }}</strong>
                <p>{{ getOverviewItem(path)?.description }}</p>
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Audience Paths</p>
            <h2>按你现在的阶段选入口</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="track in toolAudienceTracks" :key="track.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="stack" tone="brand" small />
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
                {{ getPathLabel(pick) }}
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <section class="tools-dual-grid">
        <section class="card series-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">Risk Bands</p>
              <h2>不是每一层都适合立即自动化</h2>
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
              <p class="eyebrow">Companions</p>
              <h2>和工具系列最常一起看的页面</h2>
            </div>
          </div>

          <div class="companion-stack">
            <NuxtLink
              v-for="link in companionLinks"
              :key="link.to"
              :to="link.to"
              class="series-link-card"
            >
              <span class="series-tag">{{ link.tag }}</span>
              <strong>{{ link.title }}</strong>
              <p>{{ link.description }}</p>
            </NuxtLink>
          </div>
        </section>
      </section>
    </div>
  </section>
</template>

<style scoped>
.tools-shell {
  background:
    radial-gradient(circle at 9% 8%, rgba(12, 108, 105, 0.08), transparent 24%),
    radial-gradient(circle at 92% 14%, rgba(166, 111, 44, 0.12), transparent 22%),
    linear-gradient(180deg, rgba(248, 241, 229, 0.48), rgba(255, 251, 244, 0));
}

.tools-index-page {
  gap: 28px;
}

.tools-main {
  position: relative;
  overflow: hidden;
}

.tools-main::after {
  content: "";
  position: absolute;
  right: -30px;
  bottom: -58px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(12, 108, 105, 0.14), transparent 68%);
  pointer-events: none;
}

.tools-kicker-row,
.architecture-band-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.tools-hero-note,
.tools-section-note {
  font-size: 0.78rem;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tools-headline {
  display: grid;
  gap: 10px;
  max-width: 44rem;
}

.tools-reading-band {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.tools-reading-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.56);
}

.tools-reading-card strong,
.architecture-band-title strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.3;
}

.tools-signal-card,
.risk-card {
  min-height: 100%;
}

.architecture-stack,
.companion-stack {
  display: grid;
  gap: 16px;
}

.architecture-band {
  display: grid;
  gap: 14px;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background:
    linear-gradient(180deg, rgba(255, 251, 244, 0.92), rgba(248, 241, 229, 0.9)),
    var(--panel);
}

.architecture-band-title {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: center;
}

.architecture-band-title p {
  margin: 4px 0 0;
  color: var(--ink-soft);
  line-height: 1.66;
}

.architecture-links {
  align-items: stretch;
}

.tools-dual-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.85fr);
  gap: 18px;
}

.risk-card small {
  color: var(--ink-soft);
  line-height: 1.6;
}

@media (max-width: 1100px) {
  .tools-reading-band,
  .tools-dual-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .tools-index-page {
    gap: 22px;
  }

  .tools-kicker-row,
  .architecture-band-head {
    display: grid;
    grid-template-columns: 1fr;
  }

  .tools-reading-card,
  .architecture-band-title {
    grid-template-columns: 1fr;
  }
}
</style>
