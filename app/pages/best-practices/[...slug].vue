<script setup lang="ts">
import { getPrevNext, normalizeTags, sharedTagCount, sortBestPractices } from '~/data/content'

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

const { data: allPractices } = await useAsyncData('best-practices:all', () =>
  queryCollection('bestPractices').all(),
)

const breadcrumbItems = computed(() => [
  { label: '首页', to: '/' },
  { label: '最佳实践', to: '/best-practices' },
  { label: String(page.value?.title || '最佳实践详情') },
])

const orderedPractices = computed(() =>
  sortBestPractices((allPractices.value || []) as any[]),
)

const practiceNav = computed(() => getPrevNext(orderedPractices.value, pagePath.value))

const pageTags = computed(() => normalizeTags(page.value?.tags as string[] | undefined))

const relatedCards = computed(() =>
  sortBestPractices((relatedPractices.value || []) as any[])
    .map((item) => ({
      ...item,
      score:
        (String(item.category || '') === String(page.value?.category || '') ? 4 : 0) +
        sharedTagCount(pageTags.value, item.tags) * 3,
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(item => ({
      title: item.title,
      path: item.path,
      description: item.description,
      meta: `${item.category || '实践'} / ${item.difficulty || '未分级'}`,
    })),
)

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
        section-label="继续深入"
        section-title="把零散经验接成稳定方法"
        section-description="最佳实践更适合在你已经跑通基础链路后阅读。可以顺着前后文继续看，也可以回到实践列表按难度和场景筛选。"
        :previous="practiceNav.previous"
        :next="practiceNav.next"
        :related="relatedCards"
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
.practice-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.tag-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 18px 0;
}
</style>
