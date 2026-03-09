<script setup lang="ts">
const route = useRoute()
const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param.join('/') : String(param || '')
})

const pagePath = computed(() => `/news/${slug.value}`)

const { data: page } = await useAsyncData(`news:${slug.value}`, () =>
  queryCollection('news').path(pagePath.value).first(),
)

const { data: relatedNews } = await useAsyncData(`news:related:${slug.value}`, async () => {
  const items = await queryCollection('news').all()
  return items
    .filter((item) => String(item.path) !== pagePath.value)
    .slice(0, 3)
})

const { data: relatedPractices } = await useAsyncData(`news:related-practices:${slug.value}`, async () => {
  const items = await queryCollection('bestPractices').all()
  return items.slice(0, 2)
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '新闻不存在',
  })
}

useSeo({
  title: page.value.title as string,
  description: (page.value.description as string) || 'OpenClawCN 新闻页面',
  path: pagePath.value,
  type: 'article',
  section: String(page.value.category || '站点更新'),
  publishedTime: String(page.value.date || ''),
})
</script>

<template>
  <section class="section">
    <div class="container">
      <article class="card prose">
        <div class="news-meta">
          <span class="eyebrow">{{ page?.category || '动态' }}</span>
          <span class="tag">{{ page?.date }}</span>
        </div>
        <h1>{{ page?.title }}</h1>
        <p class="muted">{{ page?.description }}</p>
        <ContentRenderer v-if="page" :value="page" />
      </article>

      <section class="related-block">
        <div class="related-head">
          <h2>继续阅读</h2>
          <p class="muted">看完这条动态后，可以继续进入相关更新或更稳定的最佳实践专题。</p>
        </div>

        <div class="related-grid">
          <NuxtLink
            v-for="item in relatedNews"
            :key="item.path"
            :to="item.path"
            class="card related-card"
          >
            <span class="tag">新闻 / {{ item.category }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </NuxtLink>

          <NuxtLink
            v-for="item in relatedPractices"
            :key="item.path"
            :to="item.path"
            class="card related-card"
          >
            <span class="tag">最佳实践 / {{ item.category }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.news-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.related-block {
  margin-top: 28px;
}

.related-head h2 {
  margin: 0 0 10px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
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
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 760px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
