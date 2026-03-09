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
</style>
