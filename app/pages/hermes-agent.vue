<script setup lang="ts">
import {
  hermesAudienceRoutes,
  hermesCapabilityFlow,
  hermesCoreBeliefs,
  hermesFaqItems,
  hermesHeroSignals,
  hermesInternalLinks,
  hermesOverviewComparisons,
  hermesResourceLinks,
  hermesSeriesPages,
  hermesScenarios,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 专题',
  description: '用中文快速理解 Hermes Agent 的定位、长期运行方式、记忆与能力积累逻辑，以及最值得先看的官方资料入口。',
  path: '/hermes-agent',
  type: 'website',
  schemaType: 'CollectionPage',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent' },
  ],
  itemList: [
    {
      title: '核心认知',
      to: '/hermes-agent#beliefs',
      description: '理解 Hermes Agent 为什么不是普通聊天 agent。',
    },
    {
      title: '能力主轴',
      to: '/hermes-agent#capabilities',
      description: '按连续工作链理解 Hermes 的长期运行方式。',
    },
    {
      title: '典型场景',
      to: '/hermes-agent#scenarios',
      description: '用代表性场景判断 Hermes 更适合什么任务。',
    },
    {
      title: '专题地图',
      to: '/hermes-agent#map',
      description: '从总览进入后续 5 个深读分页。',
    },
  ],
})

const heroActions = [
  {
    label: '查看快速开始',
    href: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart/',
    variant: 'primary',
  },
  {
    label: '浏览核心能力',
    href: '#capabilities',
    variant: 'secondary',
  },
] as const
</script>

<template>
  <section class="section">
    <div class="container series-page hermes-page">
      <section class="series-hero hermes-hero">
        <div class="card series-main hermes-main">
          <div class="hermes-kicker-row">
            <span class="series-kicker">Agent Spotlight</span>
            <span class="hermes-hero-note">长期在线、持续积累、持续推进</span>
          </div>

          <div class="hermes-headline">
            <p class="eyebrow">Hermes Agent</p>
            <h1 class="section-title">一个不只会聊天，而是能持续工作的自治 Agent 系统</h1>
            <p class="section-copy">
              Hermes Agent 更接近一个长期在线、会积累记忆与技能、能持续推进任务的工作系统，
              而不是把一次 prompt 包装成聊天窗口。对已经理解 OpenClaw 基础的用户来说，这一页最重要的作用，
              是先把它和普通聊天 agent、一次性 workflow、单轮 copilot 区分清楚。
            </p>
          </div>

          <div class="button-row">
            <a
              v-for="action in heroActions"
              :key="action.label"
              class="button"
              :class="action.variant"
              :href="action.href"
              :target="action.href.startsWith('http') ? '_blank' : undefined"
              :rel="action.href.startsWith('http') ? 'noreferrer' : undefined"
            >
              {{ action.label }}
            </a>
            <a
              class="hermes-inline-link"
              href="https://github.com/NousResearch/hermes-agent"
              target="_blank"
              rel="noreferrer"
            >
              查看 GitHub
            </a>
          </div>

          <div class="series-grid-3 hermes-summary-grid">
            <article
              v-for="item in hermesCoreBeliefs.slice(0, 3)"
              :key="item.title"
              class="series-card hermes-mini-card"
            >
              <div class="series-card-top">
                <SeriesGlyph :kind="item.kind" :tone="item.tone" small />
                <strong>{{ item.title }}</strong>
              </div>
              <p class="series-card-copy">{{ item.description }}</p>
            </article>
          </div>
        </div>

        <aside class="card series-side hermes-side">
          <div class="series-signal">
            <span class="series-kicker">这一页帮你看清什么</span>
            <strong>Hermes 为什么更像长期工作系统，而不是一次性助手</strong>
            <p>先立住整体认知，再决定要不要进入 Quickstart、Features 或 Security。</p>
          </div>

          <div v-for="signal in hermesHeroSignals" :key="signal.label" class="series-signal">
            <span class="series-kicker">{{ signal.label }}</span>
            <strong>{{ signal.value }}</strong>
            <p>{{ signal.note }}</p>
          </div>
        </aside>
      </section>

      <HermesSeriesNav />

      <section id="map" class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">专题地图</p>
            <h2>Hermes 已经从一张认知页，扩成一组可继续深入的专题</h2>
            <p class="section-copy">
              总览页先帮你建立判断，后面的 5 个分页分别承接能力、运行、长期积累、外部入口和安全边界。
            </p>
          </div>
        </div>

        <div class="series-grid-3">
          <NuxtLink v-for="item in hermesSeriesPages.slice(1)" :key="item.to" :to="item.to" class="series-link-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="brand" small />
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
            <p class="eyebrow">高信号对比</p>
            <h2>先分清 Hermes 不是哪一类东西</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesOverviewComparisons" :key="item.title" class="series-card compare-card">
            <div class="series-card-top">
              <SeriesGlyph kind="shield" tone="accent" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.description }}</p>
            <small>{{ item.contrast }}</small>
          </article>
        </div>
      </section>

      <section id="beliefs" class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">核心认知</p>
            <h2>先把 Hermes Agent 的四个基本判断钉住</h2>
            <p class="section-copy">
              如果第一层判断没立住，后面的技能、浏览器、自动化、子 agent 和多入口能力都会看起来像散乱功能。
            </p>
          </div>
        </div>

        <div class="series-grid-2 beliefs-grid">
          <article v-for="item in hermesCoreBeliefs" :key="item.title" class="series-card belief-card">
            <div class="series-card-top">
              <SeriesGlyph :kind="item.kind" :tone="item.tone" />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section id="capabilities" class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">能力主轴</p>
            <h2>把 Hermes 看成一条连续工作的能力链</h2>
            <p class="section-copy">
              这一段不平铺 feature list，而是按 Hermes 如何接单、积累、行动、推进和回报来组织。
            </p>
          </div>
          <span class="hermes-section-note">越像连续系统，越能看出它和单轮 agent 的区别。</span>
        </div>

        <div class="capability-flow">
          <article v-for="item in hermesCapabilityFlow" :key="item.step" class="series-card flow-card">
            <span class="flow-step">{{ item.step }}</span>
            <strong>{{ item.title }}</strong>
            <p class="series-card-copy">{{ item.description }}</p>
            <small>{{ item.detail }}</small>
          </article>
        </div>
      </section>

      <section id="scenarios" class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">典型场景</p>
            <h2>这些场景最能证明 Hermes 的价值</h2>
            <p class="section-copy">
              场景在这里的作用是证明它为什么成立，而不是把页面扩展成完整案例库。
            </p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesScenarios" :key="item.title" class="series-card scenario-card">
            <div class="series-card-top">
              <SeriesGlyph kind="terminal" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.summary }}</p>
            <div class="scenario-meta">
              <div>
                <span class="series-kicker">Hermes 在这里更适合因为</span>
                <p>{{ item.fit }}</p>
              </div>
              <div>
                <span class="series-kicker">普通 agent 常见短板</span>
                <p>{{ item.gap }}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">阅读分流</p>
            <h2>你现在更适合先往哪一页继续</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <NuxtLink v-for="item in hermesAudienceRoutes" :key="item.to" :to="item.to" class="series-link-card">
            <div class="series-card-top">
              <SeriesGlyph kind="orbit" tone="muted" small />
              <span class="series-tag">{{ item.meta }}</span>
            </div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <section class="hermes-dual-grid">
        <section class="card series-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">下一步入口</p>
              <h2>按你现在最想做的事继续走</h2>
            </div>
          </div>

          <div class="resource-stack">
            <article v-for="item in hermesResourceLinks" :key="item.title" class="series-link-card resource-card">
              <div class="series-card-top">
                <SeriesGlyph kind="flow" tone="accent" small />
                <span class="series-tag">{{ item.meta }}</span>
              </div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
              <div class="resource-actions">
                <a :href="item.href" target="_blank" rel="noreferrer" class="series-pill-link">打开入口</a>
                <a
                  v-if="item.secondaryHref"
                  :href="item.secondaryHref"
                  target="_blank"
                  rel="noreferrer"
                  class="series-pill-link secondary"
                >
                  {{ item.secondaryLabel }}
                </a>
              </div>
            </article>
          </div>
        </section>

        <section class="card series-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">站内回流</p>
              <h2>如果你要继续在本站里看</h2>
            </div>
          </div>

          <div class="resource-stack">
            <NuxtLink v-for="item in hermesInternalLinks" :key="item.to" :to="item.to" class="series-link-card">
              <div class="series-card-top">
                <SeriesGlyph kind="stack" tone="muted" small />
                <span class="series-tag">{{ item.meta }}</span>
              </div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </NuxtLink>
          </div>
        </section>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">认知边界</p>
            <h2>最后把最容易混淆的点收一遍</h2>
          </div>
        </div>

        <div class="faq-stack">
          <article v-for="item in hermesFaqItems" :key="item.question" class="series-card faq-card">
            <div class="series-card-top">
              <SeriesGlyph kind="shield" tone="brand" small />
              <strong>{{ item.question }}</strong>
            </div>
            <p class="series-card-copy">{{ item.answer }}</p>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.hermes-page {
  gap: 30px;
}

.hermes-main {
  gap: 24px;
}

.hermes-kicker-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.hermes-hero-note,
.hermes-section-note {
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.6;
}

.hermes-headline {
  display: grid;
  gap: 12px;
}

.hermes-inline-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--accent);
  font-weight: 700;
}

.hermes-summary-grid {
  align-items: stretch;
}

.hermes-mini-card {
  background: rgba(255, 255, 255, 0.68);
}

.beliefs-grid,
.resource-stack,
.faq-stack {
  display: grid;
  gap: 16px;
}

.belief-card,
.flow-card,
.scenario-card,
.compare-card,
.resource-card,
.faq-card {
  align-content: start;
}

.capability-flow {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}

.flow-step {
  display: inline-flex;
  width: fit-content;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(15, 102, 116, 0.1);
  color: var(--brand);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.flow-card small,
.compare-card small,
.scenario-meta p {
  color: var(--ink-soft);
  line-height: 1.6;
}

.scenario-meta {
  display: grid;
  gap: 12px;
}

.scenario-meta > div {
  display: grid;
  gap: 6px;
  padding-top: 10px;
  border-top: 1px solid rgba(64, 73, 85, 0.08);
}

.scenario-meta p {
  margin: 0;
}

.resource-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}

.resource-actions .secondary {
  background: rgba(255, 255, 255, 0.72);
}

.hermes-dual-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 1120px) {
  .capability-flow {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .hermes-page {
    gap: 18px;
  }

  .capability-flow,
  .hermes-dual-grid,
  .beliefs-grid {
    grid-template-columns: 1fr;
  }

  .hermes-main,
  .hermes-side,
  .series-panel,
  .series-card,
  .series-link-card {
    padding: 16px;
  }

  .hermes-inline-link {
    min-height: auto;
  }
}
</style>
