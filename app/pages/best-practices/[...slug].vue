<script setup lang="ts">
const route = useRoute()
const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param.join('/') : String(param || '')
})

const pagePath = computed(() => `/best-practices/${slug.value}`)

const { data: page } = await useAsyncData(`best-practices:${slug.value}`, () =>
  queryCollection('bestPractices').path(pagePath.value).first(),
)

const { data: relatedPractices } = await useAsyncData(`best-practices:related:${slug.value}`, async () => {
  const items = await queryCollection('bestPractices').all()
  return items
    .filter((item) => String(item.path) !== pagePath.value)
    .slice(0, 3)
})

const breadcrumbItems = computed(() => [
  { label: '首页', to: '/' },
  { label: '最佳实践', to: '/best-practices' },
  { label: String(page.value?.title || '最佳实践详情') },
])

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '最佳实践不存在',
  })
}

useSeo({
  title: page.value.title as string,
  description: (page.value.description as string) || 'OpenClawCN 最佳实践页面',
  path: pagePath.value,
  type: 'article',
  section: String(page.value.category || '最佳实践'),
})
</script>

<template>
  <section class="section">
    <div class="container">
      <AppBreadcrumbs :items="breadcrumbItems" />

      <article class="card prose">
        <div class="practice-meta">
          <span class="eyebrow">{{ page?.category || '最佳实践' }}</span>
          <span class="tag">{{ page?.difficulty }}</span>
        </div>
        <h1>{{ page?.title }}</h1>
        <p class="muted">{{ page?.description }}</p>
        <div class="markdown-content">
          <ContentRenderer v-if="page" :value="page" />
        </div>
      </article>

      <section class="related-block">
        <div class="related-head">
          <h2>继续深入</h2>
          <p class="muted">如果这篇实践对你有帮助，下一步可以继续看相关专题，或者直接进入反馈与社区入口。</p>
        </div>

        <div class="cta-row">
          <NuxtLink class="button secondary" to="/community">进入社区支持</NuxtLink>
          <NuxtLink class="button ghost" to="/feedback">提交反馈</NuxtLink>
          <a class="button secondary" href="/rss.xml" target="_blank" rel="noreferrer">订阅更新</a>
        </div>

        <div class="related-grid">
          <NuxtLink
            v-for="item in relatedPractices"
            :key="item.path"
            :to="item.path"
            class="card related-card"
          >
            <span class="tag">{{ item.category }} / {{ item.difficulty }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.practice-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.related-block {
  margin-top: 24px;
}

.related-head h2 {
  margin: 0 0 10px;
}

.cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 18px 0;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.related-card {
  display: grid;
  gap: 10px;
}

.related-card h3,
.related-card p {
  margin: 0;
}

.related-card p {
  color: var(--ink-soft);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
