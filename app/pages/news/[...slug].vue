<script setup lang="ts">
import { getPrevNext, normalizeTags, sortNews } from '~/data/content'
import { learningPaths, matchesTopic, topicDefinitions } from '~/data/taxonomy'

const route = useRoute()
const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param.join('/') : String(param || '')
})

const pagePath = computed(() => `/news/${slug.value}`)

const { data: page } = await useAsyncData(`news:${slug.value}`, () =>
  queryCollection('news').path(pagePath.value).first(),
)

const { data: manifest } = await useContentManifest()

const breadcrumbItems = computed(() => [
  { label: '首页', to: '/' },
  { label: '新闻', to: '/news' },
  { label: String(page.value?.title || '新闻详情') },
])

const orderedNews = computed(() => sortNews((manifest.value?.collections.news.items || []) as any[]))

const newsNav = computed(() => getPrevNext(orderedNews.value, pagePath.value))

const pageTags = computed(() => normalizeTags(page.value?.tags as string[] | undefined))

const metaItems = computed(() => [
  typeof page.value?.date === 'string' && page.value.date
    ? { label: '发布时间', value: page.value.date }
    : null,
  typeof page.value?.updatedAt === 'string' && page.value.updatedAt
    ? { label: '最后更新', value: page.value.updatedAt }
    : null,
  typeof page.value?.sourceName === 'string' && page.value.sourceName
    ? {
        label: '内容来源',
        value: page.value.sourceName,
        href: typeof page.value?.source === 'string' ? page.value.source : undefined,
      }
    : null,
].filter(Boolean) as Array<{ label: string; value: string; href?: string }>)

const pageTopic = computed(() =>
  topicDefinitions.find(topic =>
    page.value
      ? matchesTopic(
          {
            title: String(page.value.title || ''),
            description: String(page.value.description || ''),
            category: String(page.value.category || ''),
            path: pagePath.value,
            tags: pageTags.value,
          },
          topic,
        )
      : false,
  ) || null,
)

const matchedPaths = computed(() =>
  learningPaths.filter(path =>
    pageTopic.value ? path.steps.some(step => step.to.includes(pageTopic.value!.slug) || step.to === `/topics?topic=${pageTopic.value!.slug}`) : false,
  ),
)

const stageRecommendations = computed(() => [
  pageTopic.value && {
    label: '同主题',
    title: pageTopic.value.title,
    description: pageTopic.value.description,
    to: `/topics?topic=${pageTopic.value.slug}`,
  },
  matchedPaths.value[0] && {
    label: '同路径',
    title: matchedPaths.value[0].title,
    description: matchedPaths.value[0].summary,
    to: `/paths#${matchedPaths.value[0].slug}`,
  },
  {
    label: '同阶段',
    title: '新闻与更新',
    description: '继续看最近动态，或者回到主题和实践把变化放回稳定结构里。',
    to: '/news',
  },
].filter(Boolean) as Array<{ label: string; title: string; description: string; to: string }>)

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
  articleType: 'NewsArticle',
  section: String(page.value.category || '产品更新'),
  publishedTime: String(page.value.date || ''),
  updatedTime: typeof page.value.updatedAt === 'string' ? page.value.updatedAt : undefined,
  author: typeof (page.value as any)?.author === 'string' ? String((page.value as any).author) : undefined,
  tags: pageTags.value,
  breadcrumbs: breadcrumbItems.value,
})
</script>

<template>
  <section class="section">
    <div class="container">
      <AppBreadcrumbs :items="breadcrumbItems" />

      <article class="card">
        <div class="news-meta">
          <span class="eyebrow">{{ page?.category || '动态' }}</span>
          <span class="tag">{{ page?.date }}</span>
        </div>
        <div v-if="pageTags.length" class="tag-row">
          <span v-for="tag in pageTags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
        <h1>{{ page?.title }}</h1>
        <p class="muted">{{ page?.description }}</p>
        <ContentMetaPanel :items="metaItems" />
        <ContentAIOverview
          :description="String(page?.description || '')"
          :tags="pageTags"
          :section="String(page?.category || '动态')"
          :updated-at="typeof page?.updatedAt === 'string' ? page.updatedAt : undefined"
          :source-name="typeof page?.sourceName === 'string' ? page.sourceName : undefined"
        />
        <MarkdownContent :content="page" />
      </article>

      <ContentNavigator
        section-label="继续阅读"
        section-title="先跟踪动态，再回到稳定方法"
        section-description="新闻适合快速掌握变化，实践和文档更适合沉淀长期方法。看完动态后，建议继续进入相关实践或更早一篇更新。"
        :previous="newsNav.previous"
        :next="newsNav.next"
      />

      <section class="card stage-card">
        <p class="eyebrow">关联入口</p>
        <h2>同主题、同路径、同阶段</h2>
        <div class="stage-grid">
          <NuxtLink v-for="item in stageRecommendations" :key="item.to" :to="item.to" class="stage-link">
            <span class="tag">{{ item.label }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

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

.stage-card,
.stage-grid {
  display: grid;
  gap: 12px;
}

.stage-card {
  margin-top: 16px;
}

.stage-card h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  letter-spacing: -0.03em;
}

.stage-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stage-link {
  display: grid;
  gap: 8px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  background: rgba(255, 255, 255, 0.46);
}

.stage-link strong {
  font-size: 0.94rem;
}

.stage-link p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.84rem;
  line-height: 1.58;
}

@media (max-width: 900px) {
  .stage-grid {
    grid-template-columns: 1fr;
  }
}
</style>
