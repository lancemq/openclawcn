<script setup lang="ts">
import { getToolPageBySlug, toolPages } from '~/data/tools'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const page = computed(() => getToolPageBySlug(slug.value))

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool page not found',
  })
}

const config = useRuntimeConfig()
const canonicalUrl = computed(() => new URL(page.value!.path, config.public.siteUrl).toString())
const neighborPages = computed(() => toolPages.filter(item => item.slug !== slug.value))

useSeoMeta({
  title: () => `${page.value!.title} | 工具系列`,
  description: () => page.value!.description,
  ogTitle: () => `${page.value!.title} | 工具系列`,
  ogDescription: () => page.value!.description,
  ogUrl: () => canonicalUrl.value,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${page.value!.title} | 工具系列`,
  twitterDescription: () => page.value!.description,
  robots: 'index, follow',
})

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${page.value!.title} | 工具系列`,
          description: page.value!.description,
          url: canonicalUrl.value,
          inLanguage: 'zh-CN',
        },
      ]),
    },
  ],
}))
</script>

<template>
  <section class="section">
    <div class="container series-page">
      <section class="series-hero">
        <div class="card series-main">
          <p class="eyebrow">{{ page?.eyebrow }}</p>
          <h1 class="section-title">{{ page?.heroTitle }}</h1>
          <p class="section-copy">{{ page?.summary }}</p>
        </div>

        <aside class="card series-side">
          <div v-for="item in page?.signals" :key="item.label" class="series-signal">
            <span class="series-kicker">{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <p>{{ item.note }}</p>
          </div>
        </aside>
      </section>

      <section
        v-for="section in page?.sections"
        :key="section.title"
        class="card series-panel"
      >
        <div class="series-head">
          <div>
            <p class="eyebrow">{{ section.eyebrow || page?.title }}</p>
            <h2>{{ section.title }}</h2>
            <p class="section-copy">{{ section.description }}</p>
          </div>
        </div>

        <div class="series-grid-3">
          <article v-for="item in section.items" :key="item.title" class="series-card">
            <div class="series-card-top">
              <SeriesGlyph kind="grid" tone="brand" small />
              <strong>{{ item.title }}</strong>
            </div>
            <p>{{ item.description }}</p>
            <small v-if="item.detail">{{ item.detail }}</small>
          </article>
        </div>
      </section>

      <section class="series-grid-2">
        <div class="card series-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">上线前检查</p>
              <p class="section-copy">下面这组检查更适合在你真正准备启用这类能力之前过一遍。</p>
            </div>
          </div>

          <div class="checklist">
            <article v-for="item in page?.checklist" :key="item.title" class="series-card">
              <div class="series-card-top">
                <SeriesGlyph kind="shield" tone="accent" small />
                <strong>{{ item.title }}</strong>
              </div>
              <p>{{ item.detail }}</p>
            </article>
          </div>
        </div>

        <div class="card series-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">相关入口</p>
              <p class="section-copy">这一页看完后，通常应该去这些相邻入口收口，而不是停留在单页理解上。</p>
            </div>
          </div>

          <div class="checklist">
            <NuxtLink v-for="item in page?.related" :key="item.to" :to="item.to" class="series-link-card">
              <div class="series-card-top">
                <SeriesGlyph kind="flow" tone="muted" small />
                <span class="series-tag">{{ item.meta }}</span>
              </div>
              <strong>{{ item.title }}</strong>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">继续浏览</p>
            <p class="section-copy">工具系列本来就是一组连续页面。看完当前专题后，最适合继续读的是这些相邻主题。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <NuxtLink v-for="item in neighborPages" :key="item.slug" :to="item.path" class="series-link-card">
            <div class="series-card-top">
              <SeriesGlyph kind="stack" tone="brand" small />
              <span class="series-tag">{{ item.eyebrow }}</span>
            </div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.checklist {
  display: grid;
  gap: 12px;
}

.series-card small {
  color: var(--ink-soft);
  line-height: 1.6;
}
</style>
