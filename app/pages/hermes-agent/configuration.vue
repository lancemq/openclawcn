<script setup lang="ts">
import {
  hermesConfigChecklist,
  hermesConfigMistakes,
  hermesConfigOverview,
  hermesConfigSections,
} from '~/data/hermes-agent'

useSeo({
  title: 'Hermes Agent 配置与部署',
  description: '模型配置、运行环境、权限设定和入口参数——在启动 Hermes Agent 前理解关键配置点和常见错误。',
  path: '/hermes-agent/configuration',
  type: 'website',
  breadcrumbs: [
    { label: '首页', to: '/' },
    { label: 'Hermes Agent', to: '/hermes-agent' },
    { label: '配置与部署' },
  ],
})

</script>

<template>
  <section class="section">
    <div class="container series-page hermes-subpage">
      <AppBreadcrumbs :items="[
        { label: '首页', to: '/' },
        { label: 'Hermes Agent', to: '/hermes-agent' },
        { label: '配置与部署' },
      ]" />

      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">Configuration</p>
          <h1 class="section-title">Hermes Agent 的配置与部署</h1>
          <p class="section-copy">
            这一页不是安装命令的堆砌，而是帮你理解 Hermes 的配置结构：模型怎么接、环境怎么设、
            权限怎么管、入口怎么配。先理解配置逻辑，再动手操作会更稳。
          </p>
        </div>

        <aside class="card series-side">
          <div class="series-signal">
            <span class="series-kicker">这页负责什么</span>
            <strong>解释 Hermes 的配置体系</strong>
            <p>如果你正准备启动 Hermes，或者已经跑起来但不确定配置是否合理，这一页值得先看。</p>
          </div>
        </aside>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">配置概览</p>
            <h2>所有配置最终都落入这四个篮子</h2>
          </div>
        </div>

        <div class="series-grid-4">
          <article v-for="item in hermesConfigOverview" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="stack" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section v-for="section in hermesConfigSections" :key="section.title" class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">配置分类</p>
            <h2>{{ section.title }}</h2>
            <p class="section-copy">{{ section.description }}</p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in section.items" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="flow" tone="accent" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.body }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">启动前检查清单</p>
            <h2>在正式启动 Hermes 之前，先逐条核对这六件事</h2>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in hermesConfigChecklist" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="shield" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">常见配置错误</p>
            <h2>这几种配置方式，最容易为后续问题埋下隐患</h2>
          </div>
        </div>

        <div class="series-grid-2">
          <article v-for="item in hermesConfigMistakes" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="shield" tone="muted" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p class="series-card-copy">{{ item.detail }}</p>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.hermes-subpage {
  gap: 24px;
}
</style>