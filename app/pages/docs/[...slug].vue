<script setup lang="ts">
import { getPrevNext, sortDocs } from '~/data/content'

const route = useRoute()
const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param.join('/') : String(param || '')
})

const pagePath = computed(() => `/docs/${slug.value}`)

const { data: page } = await useAsyncData(`docs:${slug.value}`, () =>
  queryCollection('docs').path(pagePath.value).first(),
)

const { data: allDocs } = await useAsyncData('docs:all', () => queryCollection('docs').all())

const breadcrumbItems = computed(() => [
  { label: '首页', to: '/' },
  { label: '文档', to: '/docs' },
  { label: String(page.value?.title || '文档详情') },
])

const orderedDocs = computed(() => sortDocs((allDocs.value || []) as any[]))

const docNav = computed(() => getPrevNext(orderedDocs.value, pagePath.value))

const relatedDocs = computed(() => {
  const category = String(page.value?.category || '')
  return orderedDocs.value
    .filter(item => item.path !== pagePath.value)
    .filter(item => String(item.category || '') === category || item.path.startsWith('/docs/getting-started/'))
    .slice(0, 3)
    .map(item => ({
      title: item.title,
      path: item.path,
      description: item.description,
      meta: String(item.category || '文档'),
    }))
})

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
      <AppBreadcrumbs :items="breadcrumbItems" />

      <article class="card prose">
        <p class="eyebrow">{{ page?.category || '文档' }}</p>
        <h1>{{ page?.title }}</h1>
        <p class="muted">{{ page?.description }}</p>
        <div class="markdown-content">
          <ContentRenderer v-if="page" :value="page" />
        </div>
      </article>

      <ContentNavigator
        section-label="继续阅读"
        section-title="把文档串成一条阅读路径"
        section-description="如果你正在系统理解 OpenClaw，优先沿着文档顺序继续看；如果只是查某个点，也可以跳回文档中心按分类选择。"
        :previous="docNav.previous"
        :next="docNav.next"
        :related="relatedDocs"
      />
    </div>
  </section>
</template>
