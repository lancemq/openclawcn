<script setup lang="ts">
import { pickTopicItems, topicDefinitions } from '~/data/taxonomy'
import { getDocCategoryLabel, sortBestPractices, sortDocs, sortNews } from '~/data/content'
import { videoSections } from '~/data/videos'

useSeo({
  title: '主题中心',
  description: '按安装、Gateway 运维、渠道、Skills、模型和安全等主题跨文档、视频、新闻与实践聚合 OpenClaw 内容。',
  path: '/topics',
  schemaType: 'CollectionPage',
  itemList: topicDefinitions.slice(0, 8).map(topic => ({
    title: topic.title,
    to: `/topics?topic=${topic.slug}`,
    description: topic.description,
  })),
})

const route = useRoute()
const selectedTopic = computed(() =>
  typeof route.query.topic === 'string' ? route.query.topic : topicDefinitions[0]?.slug || '',
)

const { data: manifest } = await useContentManifest()
const sortedDocs = computed(() => sortDocs((manifest.value?.collections.docs.items || []) as any[]))
const sortedNews = computed(() => sortNews((manifest.value?.collections.news.items || []) as any[]))
const sortedPractices = computed(() => sortBestPractices((manifest.value?.collections.bestPractices.items || []) as any[]))

const activeTopic = computed(() =>
  topicDefinitions.find(item => item.slug === selectedTopic.value) || topicDefinitions[0],
)

const filteredVideos = computed(() => {
  const topic = activeTopic.value
  const keywords = topic.keywords.map(item => item.toLowerCase())
  const tagSet = new Set(topic.tags)

  return videoSections
    .flatMap(section => section.items)
    .filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase()
      return item.tags.some(tag => tagSet.has(tag)) || keywords.some(keyword => haystack.includes(keyword))
    })
    .slice(0, 6)
})

const topicNews = computed(() => pickTopicItems(sortedNews.value as any[], activeTopic.value.slug, 4))
const topicPractices = computed(() => pickTopicItems(sortedPractices.value as any[], activeTopic.value.slug, 4))
const topicStats = computed(() => [
  {
    label: '相关文档',
    value: String(topicDocBuckets.value.reduce((count, bucket) => count + bucket.items.length, 0)),
    note: '集中覆盖这个主题下最常被查阅的说明、配置与参考资料。',
  },
  {
    label: '配套内容',
    value: `${topicPractices.value.length} 实践 / ${topicNews.value.length} 动态`,
    note: '同步整理相关视频、实践经验与近期动态。',
  },
])

const topicPublicHighlights = computed(() => [
  {
    title: '主题范围',
    summary: activeTopic.value.description,
  },
  {
    title: '常见关注点',
    summary: activeTopic.value.keywords.slice(0, 4).join(' / '),
  },
  {
    title: '资料覆盖',
    summary: `文档 ${topicDocBuckets.value.reduce((count, bucket) => count + bucket.items.length, 0)} 篇、视频 ${filteredVideos.value.length} 条、实践 ${topicPractices.value.length} 篇`,
  },
])

const topicDocBuckets = computed(() => {
  const matched = pickTopicItems(sortedDocs.value as any[], activeTopic.value.slug, 12)
  const bucketRules = [
    {
      id: 'start',
      title: '基础说明与启动',
      description: '涵盖入门认识、安装准备、首次启动和基础操作。',
      matcher: (item: any) => String(item.path).startsWith('/docs/getting-started/') || String(item.path).startsWith('/docs/setup/'),
    },
    {
      id: 'build',
      title: '功能机制与关键能力',
      description: '聚焦该主题相关的功能说明、配置方法和使用机制。',
      matcher: (item: any) => String(item.path).startsWith('/docs/manual/'),
    },
    {
      id: 'run',
      title: '运维、排障与参考',
      description: '补充长期运行、风险控制、排障方法和参考资料。',
      matcher: (item: any) => String(item.path).startsWith('/docs/operations/') || String(item.path).startsWith('/docs/reference/'),
    },
  ]

  const used = new Set<string>()

  const buckets = bucketRules.map((bucket) => {
    const items = matched.filter(item => !used.has(String(item.path)) && bucket.matcher(item)).slice(0, 4)
    items.forEach(item => used.add(String(item.path)))

    return {
      ...bucket,
      items,
    }
  })

  const remaining = matched.filter(item => !used.has(String(item.path))).slice(0, 4)
  if (remaining.length) {
    buckets.push({
      id: 'more',
      title: '补充资料',
      description: '延伸阅读与同主题补充说明。',
      items: remaining,
    })
  }

  return buckets.filter(bucket => bucket.items.length)
})

</script>

<template>
  <section class="section">
    <div class="container collection-page topics-page">
      <section class="collection-hero topics-hero">
        <div class="card collection-main topics-main">
          <p class="eyebrow">Topics</p>
          <h1 class="section-title">主题中心</h1>
          <p class="section-copy">
            围绕安装、运维、渠道、模型、安全等主题，集中整理相关文档、视频、实践经验与近期动态，适合已经知道问题属于哪一层的人直接进入。
          </p>

          <div class="collection-utility">
            <article v-for="stat in topicStats" :key="stat.label" class="collection-utility-item">
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side topics-side">
          <div class="collection-summary">
            <span class="mini-label">内容说明</span>
            <strong>每个主题都会同步汇总文档、视频、实践和动态资料。</strong>
            <p>如果你已经知道自己在查安装、渠道、模型、安全或扩展问题，直接从主题进入通常会比在首页继续翻更快。</p>
          </div>
        </aside>
      </section>

      <div class="filters card topic-filters">
        <div class="filter-group">
          <span class="filter-label">主题</span>
          <NuxtLink
            v-for="topic in topicDefinitions"
            :key="topic.slug"
            class="filter-chip"
            :class="{ active: selectedTopic === topic.slug }"
            :to="{ path: '/topics', query: { topic: topic.slug } }"
          >
            {{ topic.title }}
          </NuxtLink>
        </div>
      </div>

      <section class="card topic-summary">
        <p class="eyebrow">{{ activeTopic.title }}</p>
        <p class="section-copy">{{ activeTopic.description }}</p>
        <div class="layer-summary-grid">
          <article v-for="item in topicPublicHighlights" :key="item.title" class="layer-summary-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.summary }}</p>
          </article>
        </div>
      </section>

      <section class="topic-block">
        <div class="home-head">
          <p class="eyebrow">文档安排</p>
          <p class="home-head-note">先看基础说明，再进入功能机制，最后补运维与参考，避免把同一主题的资料读散。</p>
        </div>
        <div class="topic-doc-stack">
          <article v-for="bucket in topicDocBuckets" :key="bucket.id" class="card topic-doc-bucket">
            <div class="topic-doc-head">
              <strong>{{ bucket.title }}</strong>
              <p>{{ bucket.description }}</p>
            </div>
            <div class="topic-grid compact">
              <NuxtLink v-for="item in bucket.items" :key="item.path" :to="item.path" class="card topic-card inner-card">
                <span class="tag">{{ getDocCategoryLabel(String(item.path)) }}</span>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <section class="topic-block">
        <div class="home-head">
          <p class="eyebrow">视频</p>
          <p class="home-head-note">精选与该主题直接相关的视频资料，适合先建立直观理解，再回到文档核对细节。</p>
        </div>
        <div class="topic-grid">
          <a v-for="item in filteredVideos" :key="item.href" :href="item.href" target="_blank" rel="noreferrer" class="card topic-card">
            <span class="tag">{{ item.platform }} / {{ item.level }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </a>
        </div>
      </section>

      <section class="topic-dual-grid">
        <div class="topic-block">
          <div class="home-head">
            <p class="eyebrow">最佳实践</p>
            <p class="home-head-note">结合真实使用场景，补充该主题在中文环境里的落地方法与经验。</p>
          </div>
          <div class="topic-grid compact">
            <NuxtLink v-for="item in topicPractices" :key="item.path" :to="item.path" class="card topic-card">
              <span class="tag">{{ item.category }} / {{ item.difficulty }}</span>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </NuxtLink>
          </div>
        </div>

        <div class="topic-block">
          <div class="home-head">
            <p class="eyebrow">新闻与更新</p>
            <p class="home-head-note">跟踪该主题相关的版本变化、案例进展和社区动态，帮助判断最近有没有值得插队看的变化。</p>
          </div>
          <div class="topic-grid compact">
            <NuxtLink v-for="item in topicNews" :key="item.path" :to="item.path" class="card topic-card">
              <span class="tag">{{ item.category }} / {{ item.date }}</span>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.topics-page,
.filters,
.topic-summary,
.topic-block,
.topic-doc-stack,
.topic-doc-bucket,
.topic-doc-head,
.cross-grid,
.topic-grid,
.topic-card,
.topic-dual-grid,
.filter-group {
  display: grid;
  gap: 12px;
}

.topics-page {
  gap: 28px;
}

.topics-hero {
  align-items: stretch;
  gap: 18px;
}

.topics-main {
  gap: 22px;
  padding: clamp(26px, 2.8vw, 36px);
  border-radius: 32px;
  background:
    radial-gradient(circle at top right, rgba(19, 129, 125, 0.14), transparent 32%),
    radial-gradient(circle at left bottom, rgba(166, 111, 44, 0.08), transparent 28%),
    linear-gradient(180deg, rgba(255, 252, 246, 0.98), rgba(246, 239, 228, 0.9));
}

.topics-side {
  justify-content: center;
  background:
    linear-gradient(180deg, rgba(255, 252, 247, 0.98), rgba(248, 244, 236, 0.9));
}

.collection-summary {
  display: grid;
  gap: 10px;
}

.collection-summary strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.06rem;
  line-height: 1.45;
}

.collection-summary p {
  margin: 0;
  color: var(--ink-soft);
}

.layer-summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.layer-summary-card {
  display: grid;
  gap: 10px;
  padding: 18px 20px;
  border-radius: 22px;
  border: 1px solid rgba(64, 73, 85, 0.1);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(249, 243, 233, 0.62));
}

.layer-summary-card strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 0.98rem;
  line-height: 1.34;
}

.layer-summary-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.58;
}

.topic-filters {
  gap: 14px;
  padding: 18px 20px;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 252, 247, 0.96), rgba(246, 239, 228, 0.9));
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.filter-label {
  color: var(--ink-soft);
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.filter-chip {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.66);
  color: var(--ink);
  padding: 8px 14px;
  font-size: 0.84rem;
  font-weight: 700;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
}

.filter-chip:hover {
  transform: translateY(-1px);
  border-color: rgba(138, 90, 36, 0.22);
  box-shadow: 0 12px 24px rgba(63, 72, 46, 0.08);
}

.filter-chip.active {
  color: #fff8ef;
  border-color: transparent;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
}

.topic-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.topic-grid.compact {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.topic-doc-bucket {
  padding: 20px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(19, 129, 125, 0.08), transparent 24%),
    linear-gradient(180deg, rgba(255, 252, 247, 0.96), rgba(246, 240, 230, 0.9));
}

.topic-doc-head p {
  margin: 6px 0 0;
  color: var(--ink-soft);
  font-size: 0.92rem;
  line-height: 1.68;
}

.cross-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.topic-card {
  position: relative;
  align-content: start;
  gap: 10px;
  min-height: 100%;
  padding-bottom: 30px;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.topic-card::after {
  content: "→";
  position: absolute;
  right: 18px;
  bottom: 14px;
  color: rgba(15, 102, 116, 0.42);
  font-size: 0.95rem;
  transition: transform 0.18s ease, color 0.18s ease;
}

.inner-card {
  border-radius: 20px;
  border: 1px solid rgba(64, 73, 85, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 254, 250, 0.98), rgba(247, 242, 234, 0.92)),
    rgba(255, 255, 255, 0.42);
}

.topic-card strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.04rem;
  line-height: 1.42;
  letter-spacing: -0.02em;
  text-wrap: balance;
  padding-right: 18px;
}

.topic-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.92rem;
  line-height: 1.68;
  padding-right: 10px;
}

.topic-summary {
  gap: 20px;
  padding: 24px 26px;
  border-radius: 30px;
  background:
    radial-gradient(circle at top right, rgba(19, 129, 125, 0.1), transparent 28%),
    linear-gradient(180deg, rgba(255, 252, 247, 0.98), rgba(247, 241, 231, 0.92));
}

.topic-block {
  gap: 16px;
}

.topic-dual-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 18px;
}

.topic-card:hover {
  transform: translateY(-3px);
  border-color: rgba(12, 108, 105, 0.16);
  box-shadow: 0 18px 30px rgba(63, 72, 46, 0.08);
}

.topic-card:hover::after {
  transform: translateX(2px);
  color: rgba(15, 102, 116, 0.72);
}

@media (max-width: 980px) {
  .cross-grid,
  .topic-grid,
  .topic-grid.compact,
  .layer-summary-grid,
  .topic-dual-grid {
    grid-template-columns: 1fr;
  }

  .topics-page {
    gap: 24px;
  }

  .topics-main,
  .topic-summary,
  .topic-doc-bucket,
  .topic-filters {
    padding: 20px;
  }
}

@media (max-width: 720px) {
  .topics-page {
    gap: 20px;
  }

  .topics-main,
  .topics-side,
  .topic-summary,
  .topic-doc-bucket,
  .topic-filters {
    padding: 16px;
    border-radius: 22px;
  }

  .topic-summary {
    gap: 16px;
  }

  .collection-summary strong,
  .layer-summary-card strong,
  .topic-card strong {
    font-size: 0.98rem;
  }

  .collection-summary p,
  .layer-summary-card p,
  .topic-card p,
  .topic-doc-head p,
  .filter-label {
    font-size: 0.86rem;
    line-height: 1.6;
  }

  .filter-group {
    gap: 8px;
    align-items: flex-start;
  }

  .filter-label {
    width: 100%;
  }

  .filter-chip {
    padding: 7px 11px;
    font-size: 0.78rem;
  }

  .topic-card {
    padding-bottom: 26px;
  }

  .topic-card::after {
    right: 14px;
    bottom: 12px;
  }
}

@media (max-width: 560px) {
  .layer-summary-grid,
  .topic-grid,
  .topic-grid.compact,
  .topic-dual-grid {
    gap: 10px;
  }

  .layer-summary-card,
  .topic-card,
  .inner-card {
    border-radius: 18px;
  }

  .topic-card strong {
    line-height: 1.34;
    padding-right: 12px;
  }

  .topic-card p {
    font-size: 0.84rem;
    line-height: 1.56;
    padding-right: 0;
  }
}
</style>
