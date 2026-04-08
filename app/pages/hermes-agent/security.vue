<script setup lang="ts">
import {
  getHermesRelatedPages,
  hermesSecurityChecklist,
  hermesSecurityLadder,
  hermesSecurityLinks,
  hermesSecurityRisks,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 的安全与边界',
  description: '把 Hermes Agent 的长期运行风险、执行面边界和更稳的启用顺序放回同一套判断框架里，帮助中文用户在真正长期运行前先建立风险认知。',
  path: '/hermes-agent/security',
  type: 'website',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent', to: '/hermes-agent' },
    { label: '安全与边界' },
  ],
})

const relatedPages = getHermesRelatedPages('security')
</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '安全与边界' },
      ]" />

      <HermesSeriesNav />

      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Security</p>
          <h1 class="section-title">长期在线且会行动的 Agent，为什么不能把安全当附录</h1>
          <p class="section-copy">
            Hermes 的安全问题不只是“有没有密码”这么简单。长期运行、真实执行、多入口和自动推进组合在一起后，
            风险会从“说错”变成“持续做错”。这一页先帮你建立边界判断，再承接官方 Security。
          </p>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">这页负责什么</span>
            <strong>把长期在线 agent 的风险面讲清楚</strong>
            <p>如果你准备真正长期运行 Hermes，这一页不应该被放到最后才看。</p>
          </div>
        </aside>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">风险来源</p>
            <h2>Hermes 的风险，不来自某个单点，而来自这些能力叠加之后</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesSecurityRisks" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="shield" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">更稳的启用顺序</p>
            <h2>让 Hermes 真正长期运行前，先按风险梯子往上走</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesSecurityLadder" :key="item.step" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <span class="series-tag">{{ item.step }}</span>
            </div>
            <strong>{{ item.title }}</strong>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">运行前检查</p>
            <h2>如果你准备把 Hermes 从演示推向长期运行，至少先确认这四件事</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesSecurityChecklist" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="shield" tone="muted" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="hermes-dual-grid">
        <section class="card series-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">官方入口</p>
              <h2>真正开始启用前，至少先核对这几份资料</h2>
            </div>
          </div>

          <div class="resource-stack">
            <article v-for="item in hermesSecurityLinks" :key="item.href" class="series-link-card">
              <div class="series-card-top">
                <SeriesGlyph kind="orbit" tone="muted" small />
                <strong>{{ item.title }}</strong>
              </div>
              <p>{{ item.description }}</p>
              <a :href="item.href" target="_blank" rel="noreferrer" class="series-pill-link">打开入口</a>
            </article>
          </div>
        </section>

        <section class="card series-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">继续阅读</p>
              <h2>如果你要回到专题体系里继续看</h2>
            </div>
          </div>

          <div class="resource-stack">
            <NuxtLink v-for="item in relatedPages" :key="item.to" :to="item.to" class="series-link-card">
              <div class="series-card-top">
                <SeriesGlyph kind="grid" tone="brand" small />
                <span class="series-tag">{{ item.meta }}</span>
              </div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </NuxtLink>
          </div>
        </section>
      </section>
    </div>
  </section>
</template>

<style scoped>
.hermes-subpage {
  gap: 24px;
}

.resource-stack {
  display: grid;
  gap: 16px;
}

.hermes-dual-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 760px) {
  .hermes-dual-grid {
    grid-template-columns: 1fr;
  }
}
</style>
