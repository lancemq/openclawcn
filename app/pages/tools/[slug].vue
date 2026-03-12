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
    <div class="container tool-detail-page">
      <section class="detail-hero">
        <div class="card detail-main">
          <p class="eyebrow">{{ page?.eyebrow }}</p>
          <h1 class="section-title">{{ page?.heroTitle }}</h1>
          <p class="section-copy">{{ page?.summary }}</p>
        </div>

        <aside class="card detail-side">
          <div v-for="item in page?.signals" :key="item.label" class="signal-panel">
            <span class="mini-label">{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <p>{{ item.note }}</p>
          </div>
        </aside>
      </section>

      <section
        v-for="section in page?.sections"
        :key="section.title"
        class="card content-panel"
      >
        <div class="section-head">
          <div>
            <p class="eyebrow">{{ section.eyebrow || page?.title }}</p>
            <h2>{{ section.title }}</h2>
            <p class="section-copy">{{ section.description }}</p>
          </div>
        </div>

        <div class="grid section-grid">
          <article v-for="item in section.items" :key="item.title" class="section-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
            <small v-if="item.detail">{{ item.detail }}</small>
          </article>
        </div>
      </section>

      <section class="detail-dual-grid">
        <div class="card checklist-panel">
          <div class="section-head">
            <div>
              <p class="eyebrow">上线前检查</p>
              <p class="section-copy">下面这组检查更适合在你真正准备启用这类能力之前过一遍。</p>
            </div>
          </div>

          <div class="checklist">
            <article v-for="item in page?.checklist" :key="item.title" class="check-item">
              <strong>{{ item.title }}</strong>
              <p>{{ item.detail }}</p>
            </article>
          </div>
        </div>

        <div class="card related-panel">
          <div class="section-head">
            <div>
              <p class="eyebrow">相关入口</p>
              <p class="section-copy">这一页看完后，通常应该去这些相邻入口收口，而不是停留在单页理解上。</p>
            </div>
          </div>

          <div class="related-list">
            <NuxtLink v-for="item in page?.related" :key="item.to" :to="item.to" class="related-link">
              <span class="tag">{{ item.meta }}</span>
              <strong>{{ item.title }}</strong>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="card explore-panel">
        <div class="section-head">
          <div>
            <p class="eyebrow">继续浏览</p>
            <p class="section-copy">工具系列本来就是一组连续页面。看完当前专题后，最适合继续读的是这些相邻主题。</p>
          </div>
        </div>

        <div class="grid explore-grid">
          <NuxtLink v-for="item in neighborPages" :key="item.slug" :to="item.path" class="explore-card">
            <span class="tag">{{ item.eyebrow }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.tool-detail-page,
.detail-hero,
.content-panel,
.detail-dual-grid,
.checklist,
.related-list,
.explore-panel {
  display: grid;
  gap: 16px;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.tool-detail-page {
  gap: 22px;
}

.detail-hero {
  grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.9fr);
  align-items: start;
}

.detail-main,
.detail-side,
.content-panel,
.checklist-panel,
.related-panel,
.explore-panel {
  background:
    radial-gradient(circle at top right, rgba(198, 139, 68, 0.12), transparent 34%),
    linear-gradient(180deg, rgba(255, 251, 244, 0.98), rgba(248, 241, 229, 0.94)),
    var(--panel);
}

.detail-side,
.signal-panel,
.section-card,
.check-item,
.related-link,
.explore-card {
  display: grid;
  gap: 8px;
}

.signal-panel + .signal-panel {
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

.signal-panel strong,
.section-card strong,
.check-item strong,
.related-link strong,
.explore-card strong,
.section-head h2 {
  font-family: "Fraunces", "Times New Roman", serif;
  line-height: 1.28;
  letter-spacing: -0.03em;
}

.section-head h2 {
  margin: 0;
  font-size: 1.4rem;
}

.signal-panel p,
.section-card p,
.section-card small,
.check-item p,
.explore-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.6;
}

.section-grid,
.explore-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.section-card,
.check-item,
.related-link,
.explore-card {
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.5);
}

.detail-dual-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.related-list {
  gap: 10px;
}

.related-link,
.explore-card {
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.related-link:hover,
.explore-card:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
}

@media (max-width: 980px) {
  .detail-hero,
  .section-grid,
  .detail-dual-grid,
  .explore-grid {
    grid-template-columns: 1fr;
  }
}
</style>
