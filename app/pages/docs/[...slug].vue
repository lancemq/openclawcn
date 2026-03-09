<script setup lang="ts">
const route = useRoute()
const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param.join('/') : String(param || '')
})

const pagePath = computed(() => `/docs/${slug.value}`)

const { data: page } = await useAsyncData(`docs:${slug.value}`, () =>
  queryCollection('docs').path(pagePath.value).first(),
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文档不存在',
  })
}

useSeo({
  title: page.value.title as string,
  description: (page.value.description as string) || 'OpenClawCN 文档页面',
  path: pagePath.value,
})
</script>

<template>
  <section class="section">
    <div class="container">
      <article class="card prose">
        <p class="eyebrow">{{ page?.category || '文档' }}</p>
        <h1>{{ page?.title }}</h1>
        <p class="muted">{{ page?.description }}</p>
        <ContentRenderer v-if="page" :value="page" />
      </article>
    </div>
  </section>
</template>
