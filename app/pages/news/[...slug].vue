<script setup lang="ts">
import { getPrevNext, normalizeTags, sharedTagCount, sortBestPractices, sortNews } from '~/data/content'

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

const { data: allNews } = await useAsyncData('news:all', () => queryCollection('news').all())

const { data: relatedPractices } = await useAsyncData(`news:related-practices:${slug.value}`, async () => {
  const items = await queryCollection('bestPractices').all()
  return items.slice(0, 2)
})

const breadcrumbItems = computed(() => [
  { label: '首页', to: '/' },
  { label: '新闻', to: '/news' },
  { label: String(page.value?.title || '新闻详情') },
])

const orderedNews = computed(() => sortNews((allNews.value || []) as any[]))

const newsNav = computed(() => getPrevNext(orderedNews.value, pagePath.value))

const pageTags = computed(() => normalizeTags(page.value?.tags as string[] | undefined))

const relatedNewsCards = computed(() => {
  const category = String(page.value?.category || '')

  return orderedNews.value
    .filter(item => item.path !== pagePath.value)
    .map((item) => ({
      ...item,
      score:
        (String(item.category || '') === category ? 4 : 0) +
        sharedTagCount(pageTags.value, item.tags) * 3,
    }))
    .filter(item => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(item => ({
      title: item.title,
      path: item.path,
      description: item.description,
      meta: `${item.category || '新闻'} / ${item.date || ''}`,
    }))
})

const curatedPractices = computed(() =>
  sortBestPractices((relatedPractices.value || []) as any[])
    .slice(0, 3)
    .map(item => ({
      title: item.title,
      path: item.path,
      description: item.description,
      meta: `最佳实践 / ${item.category || '专题'}`,
    })),
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
  type: 'article',
  section: String(page.value.category || '产品更新'),
  publishedTime: String(page.value.date || ''),
})
</script>

<template>
  <section class="section">
    <div class="container">
      <AppBreadcrumbs :items="breadcrumbItems" />

      <article class="card prose">
        <div class="news-meta">
          <span class="eyebrow">{{ page?.category || '动态' }}</span>
          <span class="tag">{{ page?.date }}</span>
        </div>
        <div v-if="pageTags.length" class="tag-row">
          <span v-for="tag in pageTags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
        <h1>{{ page?.title }}</h1>
        <p class="muted">{{ page?.description }}</p>
        <div class="markdown-content">
          <ContentRenderer v-if="page" :value="page" />
        </div>
      </article>

      <ContentNavigator
        section-label="继续阅读"
        section-title="先跟踪动态，再回到稳定方法"
        section-description="新闻适合快速掌握变化，实践和文档更适合沉淀长期方法。看完动态后，建议继续进入相关实践或更早一篇更新。"
        :previous="newsNav.previous"
        :next="newsNav.next"
        :related="[...relatedNewsCards, ...curatedPractices].slice(0, 3)"
      />

      <div class="cta-row">
        <NuxtLink class="button secondary" to="/community">进入社区支持</NuxtLink>
        <NuxtLink class="button ghost" to="/feedback">提交反馈</NuxtLink>
        <a class="button secondary" href="/rss.xml" target="_blank" rel="noreferrer">订阅更新</a>
      </div>
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

.tag-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}
</style>
