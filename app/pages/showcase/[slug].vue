<script setup lang="ts">
import { getPrevNext, sortShowcase } from '~/data/content'

const route = useRoute()
const slug = computed(() => {
  const path = route.params.slug
  return Array.isArray(path) ? path.join('/') : path
})

const { data: allItems } = await useAsyncData('showcase:all', () => queryCollection('showcase').all())

const { data: item } = await useAsyncData(`showcase:${slug.value}`, () =>
  queryCollection('showcase').path(`/showcase/${slug.value}`).first(),
)

const sortedItems = computed(() => sortShowcase((allItems.value || []) as any[]))

const navigation = computed(() => getPrevNext(sortedItems.value, `/showcase/${slug.value}`))

const prevNav = computed(() =>
  navigation.value.previous
    ? {
        title: navigation.value.previous.title,
        path: navigation.value.previous.path,
        description: navigation.value.previous.description || '查看上一个案例',
      }
    : null,
)

const nextNav = computed(() =>
  navigation.value.next
    ? {
        title: navigation.value.next.title,
        path: navigation.value.next.path,
        description: navigation.value.next.description || '查看下一个案例',
      }
    : null,
)

useSeo({
  title: item.value?.title || '案例详情',
  description: item.value?.description || '',
  path: `/showcase/${slug.value}`,
  type: 'article',
})
</script>

<template>
  <section class="section">
    <div class="container article-page">
      <article v-if="item" class="article-content">
        <header class="article-header card">
          <div class="article-meta">
            <span class="tag">{{ item.industry }}</span>
            <span class="tag secondary">{{ item.scale }}</span>
            <span class="tag">{{ item.scenario }}</span>
          </div>
          <h1>{{ item.title }}</h1>
          <p class="article-description">{{ item.description }}</p>

          <div v-if="item.outcomes && item.outcomes.length" class="outcomes-section">
            <span class="outcomes-label">核心效果</span>
            <ul class="outcomes-list">
              <li v-for="outcome in item.outcomes" :key="outcome">{{ outcome }}</li>
            </ul>
          </div>

          <div class="article-info">
            <span v-if="item.date" class="info-item">发布于 {{ item.date }}</span>
            <span v-if="item.updatedAt" class="info-item">更新于 {{ item.updatedAt }}</span>
          </div>
        </header>

        <div class="article-body card">
          <MarkdownContent :content="item" />
        </div>

        <ContentNavigator
          section-label="案例导航"
          section-title="继续浏览案例"
          section-description="按顺序查看相邻案例，了解不同场景下的实际应用效果。"
          :previous="prevNav"
          :next="nextNav"
        />
      </article>

      <div v-else class="empty-state card">
        <p>案例不存在或已被删除。</p>
        <NuxtLink to="/showcase" class="button primary">返回案例列表</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.article-page {
  display: grid;
  gap: 16px;
}

.article-header {
  padding: 24px;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  font-size: 0.78rem;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(166, 111, 44, 0.12);
  color: var(--brand);
}

.tag.secondary {
  background: rgba(67, 73, 60, 0.08);
  color: var(--ink-soft);
}

.article-header h1 {
  margin: 0 0 12px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.article-description {
  margin: 0;
  color: var(--ink-soft);
  font-size: 1.05rem;
  line-height: 1.6;
}

.outcomes-section {
  margin-top: 20px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(19, 129, 125, 0.06);
}

.outcomes-label {
  display: block;
  margin-bottom: 10px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--brand);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.outcomes-list {
  margin: 0;
  padding-left: 20px;
}

.outcomes-list li {
  margin-bottom: 6px;
  color: var(--ink);
  font-size: 0.95rem;
  line-height: 1.5;
}

.article-info {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

.info-item {
  font-size: 0.84rem;
  color: var(--ink-soft);
}

.article-body {
  padding: 24px;
}

.empty-state {
  padding: 40px;
  text-align: center;
}

.empty-state p {
  margin-bottom: 16px;
  color: var(--ink-soft);
}
</style>