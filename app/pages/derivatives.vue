<script setup lang="ts">
import { derivativeRecommendations, derivativeSections, derivativeSignals } from '~/data/derivatives'

useSeo({
  title: '衍生品与二次开发',
  description: '聚合国内围绕 OpenClaw 的二次开发、轻量封装、本地化分发和实验工具，帮助中文用户快速判断不同项目的定位与适用场景。',
  path: '/derivatives',
  type: 'website',
})

const config = useRuntimeConfig()

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'OpenClaw 衍生品与二次开发',
        description: '聚合围绕 OpenClaw 的国内二次开发、轻量封装和本地化入口。',
        url: `${config.public.siteUrl}/derivatives`,
      }),
    },
  ],
})

const totalProjects = computed(() => derivativeSections.reduce((count, section) => count + section.items.length, 0))
</script>

<template>
  <section class="section">
    <div class="container collection-page derivatives-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Derivatives</p>
          <h1 class="section-title">衍生品与二次开发</h1>
          <p class="section-copy">
            OpenClaw 在中文社区里已经不只是一条官方主线，还逐渐出现了桌面包装、轻量发行、本地化入口、自动化平台化方案和硬件实验方向。这一页的作用不是替代官方文档，而是帮你快速判断这些项目分别解决什么问题、适合谁，以及它们和 OpenClaw 主项目是什么关系。
          </p>

          <div class="collection-utility">
            <article v-for="item in derivativeSignals" :key="item.label" class="collection-utility-item">
              <span class="mini-label">{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
              <p>{{ item.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">当前收录</span>
            <strong>{{ totalProjects }} 个公开可讨论项目</strong>
            <p>页面优先收录中文社区里已经形成辨识度的名字，并区分“官网 / GitHub 可见”和“目前主要见于社区报道”的不同可信度。</p>
          </div>

          <div class="collection-summary">
            <span class="mini-label">阅读原则</span>
            <p>先判断它是入口层、平台化方案还是实验方向，再决定是否跟进。不要只因为名字里带 Claw 就默认它与 OpenClaw 主线等价。</p>
          </div>
        </aside>
      </section>

      <div class="grid overview-grid">
        <article v-for="item in derivativeRecommendations" :key="item.title" class="card overview-card">
          <span class="mini-label">怎么选</span>
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
        </article>
      </div>

      <section v-for="section in derivativeSections" :id="section.id" :key="section.id" class="derivative-section">
        <div class="section-head">
          <div>
            <p class="eyebrow">{{ section.title }}</p>
            <p class="section-copy">{{ section.description }}</p>
          </div>
        </div>

        <div class="grid derivative-grid">
          <article v-for="item in section.items" :key="item.title" class="card derivative-card">
            <div class="card-head">
              <span class="tag">{{ item.type }}</span>
              <span class="tag">{{ item.maturity }}</span>
            </div>

            <h2>{{ item.title }}</h2>
            <p class="card-copy">{{ item.summary }}</p>

            <dl class="meta-list">
              <div>
                <dt>适合人群</dt>
                <dd>{{ item.audience }}</dd>
              </div>
              <div>
                <dt>与 OpenClaw 的关系</dt>
                <dd>{{ item.relation }}</dd>
              </div>
              <div>
                <dt>来源类型</dt>
                <dd>{{ item.sourceType }}</dd>
              </div>
            </dl>

            <div class="tag-row">
              <span v-for="tag in item.tags" :key="tag" class="tag-item">#{{ tag }}</span>
            </div>

            <p class="note">{{ item.note }}</p>

            <a
              v-if="item.href"
              class="button secondary compact-button"
              :href="item.href"
              target="_blank"
              rel="noreferrer"
            >
              {{ item.sourceLabel || '查看公开入口' }}
            </a>
            <span v-else class="pending-text">目前以社区讨论和公开报道为主，适合先观察。</span>
          </article>
        </div>
      </section>

      <section class="card compare-panel">
        <div class="section-head">
          <p class="eyebrow">如何判断是否值得跟进</p>
          <p class="section-copy">看衍生项目时，先回答下面四个问题，比直接比较功能点更有效。</p>
        </div>

        <div class="compare-grid">
          <article class="compare-card">
            <strong>它解决的是入口问题，还是能力问题？</strong>
            <p>如果只是更友好的 UI 或更轻的安装方式，它更像入口层；如果引入新工作流、平台化调度或硬件形态，才算真正改变能力边界。</p>
          </article>
          <article class="compare-card">
            <strong>它和上游版本同步快不快？</strong>
            <p>越偏包装层的项目，越要关心它是否紧跟 OpenClaw 上游版本，否则可能只在演示阶段体验不错。</p>
          </article>
          <article class="compare-card">
            <strong>它有没有替你隐藏风险？</strong>
            <p>有些衍生项目会把复杂配置包起来，这能降低门槛，但也可能让模型、权限和升级路径变得更不透明。</p>
          </article>
          <article class="compare-card">
            <strong>它适合拿来做主环境吗？</strong>
            <p>入口型和实验型项目更适合先试用；长期主环境仍建议保留对上游文档、配置和 release 节奏的直接理解。</p>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.derivatives-page {
  display: grid;
  gap: 22px;
}

.collection-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(260px, 0.9fr);
  gap: 18px;
}

.collection-main,
.collection-side,
.overview-card,
.derivative-card,
.compare-panel {
  background:
    linear-gradient(180deg, rgba(255, 251, 244, 0.98), rgba(248, 241, 229, 0.94)),
    var(--panel);
}

.collection-utility {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.collection-utility-item,
.collection-summary,
.compare-card {
  display: grid;
  gap: 8px;
}

.collection-summary + .collection-summary {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(67, 73, 60, 0.08);
}

.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.overview-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.overview-card strong {
  font-size: 1rem;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.derivative-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.derivative-card {
  display: grid;
  gap: 14px;
  min-height: 100%;
}

.card-head,
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.derivative-card h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.18rem;
  letter-spacing: -0.03em;
}

.card-copy,
.note,
.pending-text,
.meta-list dd,
.compare-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.72;
}

.meta-list {
  display: grid;
  gap: 12px;
  margin: 0;
}

.meta-list div {
  display: grid;
  gap: 4px;
}

.meta-list dt {
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brand);
}

.tag-item {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(19, 129, 125, 0.08);
  color: var(--brand);
  font-size: 0.74rem;
  font-weight: 700;
}

.compact-button {
  min-height: 34px;
  width: fit-content;
  padding-inline: 12px;
}

.pending-text {
  font-size: 0.88rem;
}

.compare-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.compare-card strong {
  font-size: 0.96rem;
}

@media (max-width: 1040px) {
  .collection-hero,
  .collection-utility,
  .derivative-grid,
  .compare-grid,
  .overview-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .collection-hero,
  .collection-utility,
  .derivative-grid,
  .compare-grid,
  .overview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
