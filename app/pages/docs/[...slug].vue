<script setup lang="ts">
import { getPrevNext, normalizeTags, sharedTagCount, sortDocs } from '~/data/content'
import { detailPageGuides } from '~/data/information-architecture'
import { learningPaths, matchesTopic, topicDefinitions } from '~/data/taxonomy'

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

const pageTags = computed(() => normalizeTags(page.value?.tags as string[] | undefined))

const pageToc = computed(() => {
  const links = (page.value?.body as any)?.toc?.links
  return Array.isArray(links) ? links : []
})

const relatedDocs = computed(() => {
  const category = String(page.value?.category || '')
  const tags = pageTags.value

  return orderedDocs.value
    .filter(item => item.path !== pagePath.value)
    .map((item) => {
      const score =
        (String(item.category || '') === category ? 5 : 0) +
        sharedTagCount(tags, item.tags) * 3 +
        (String(item.path).startsWith('/docs/getting-started/') ? 1 : 0)

      return {
        ...item,
        score,
      }
    })
    .filter(item => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(item => ({
      title: item.title,
      path: item.path,
      description: item.description,
      meta: String(item.category || '文档'),
    }))
})

const pageGuide = detailPageGuides.docs

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
    path.steps.some(step => step.to === pagePath.value) || path.next === pagePath.value,
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
    title: '文档中心',
    description: '继续按文档结构查找相邻知识点，不要直接跳到零散技巧。',
    to: '/docs',
  },
].filter(Boolean) as Array<{ label: string; title: string; description: string; to: string }>)

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
  type: 'article',
  section: String(page.value.category || '文档'),
  publishedTime: typeof page.value.date === 'string' ? page.value.date : undefined,
})
</script>

<template>
  <section class="section">
    <div class="container">
      <AppBreadcrumbs :items="breadcrumbItems" />

      <div class="content-detail-layout">
        <article class="card prose">
          <div class="content-header">
            <p class="eyebrow">{{ page?.category || '文档' }}</p>
            <div v-if="pageTags.length" class="content-tag-list">
              <span v-for="tag in pageTags" :key="tag" class="tag">#{{ tag }}</span>
            </div>
          </div>
          <h1>{{ page?.title }}</h1>
          <p class="muted">{{ page?.description }}</p>
          <div class="markdown-content">
            <ContentRenderer v-if="page" :value="page" />
          </div>
        </article>

        <div class="content-side">
          <ContentOutline title="本页目录" :links="pageToc" />

          <aside class="card content-side-card">
            <p class="eyebrow">站点层级</p>
            <h2>{{ pageGuide.title }}</h2>
            <p class="content-side-summary">{{ pageGuide.summary }}</p>
            <div class="content-side-links">
              <NuxtLink
                v-for="item in pageGuide.links"
                :key="item.to"
                :to="item.to"
                class="content-side-link"
              >
                <strong>{{ item.title }}</strong>
                <span>{{ item.description }}</span>
              </NuxtLink>
            </div>
          </aside>
        </div>
      </div>

      <ContentNavigator
        section-label="继续阅读"
        section-title="把文档串成一条阅读路径"
        section-description="如果你正在系统理解 OpenClaw，优先沿着文档顺序继续看；如果只是查某个点，也可以跳回文档中心按分类选择。"
        :previous="docNav.previous"
        :next="docNav.next"
        :related="relatedDocs"
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
    </div>
  </section>
</template>

<style scoped>
.content-detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 16px;
  align-items: start;
}

.content-header,
.content-tag-list,
.content-side,
.content-side-links {
  display: grid;
  gap: 10px;
}

.content-tag-list {
  grid-template-columns: repeat(auto-fit, minmax(0, max-content));
}

.content-side {
  gap: 14px;
}

.content-side-card {
  display: grid;
  gap: 10px;
}

.content-side-card h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.35;
  letter-spacing: -0.03em;
}

.content-side-summary {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.84rem;
  line-height: 1.58;
}

.content-side-link {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.44);
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.content-side-link:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
}

.content-side-link strong {
  font-size: 0.92rem;
}

.content-side-link span {
  color: var(--ink-soft);
  font-size: 0.82rem;
  line-height: 1.55;
}

.stage-card,
.stage-grid {
  display: grid;
  gap: 12px;
}

.stage-card {
  margin-top: 18px;
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

@media (max-width: 980px) {
  .content-detail-layout {
    grid-template-columns: 1fr;
  }

  .stage-grid {
    grid-template-columns: 1fr;
  }
}
</style>
