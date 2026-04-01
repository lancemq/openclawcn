<script setup lang="ts">
import { sortBestPractices, sortDocs, sortNews } from '~/data/content'
import {
  actionOverview,
  bestPracticeOverview,
  docsOverview,
  extensionOverview,
  userRouteOverview,
} from '~/data/site'
import { featuredVideos } from '~/data/videos'
import { learningPaths, topicDefinitions } from '~/data/taxonomy'
const { trackAction } = useSiteTracking()

useSeo({
  title: 'OpenClaw 中文官网',
  description: '面向中文用户的 OpenClaw 介绍、文档、更新、视频教程和社区支持入口。',
  path: '/',
  type: 'website',
  schemaType: 'CollectionPage',
  itemList: userRouteOverview.slice(0, 6).map(item => ({
    title: item.title,
    to: item.to,
    description: item.description,
  })),
})

const { data: manifest } = await useContentManifest()

const latestDocs = computed(() => sortDocs((manifest.value?.collections.docs.items || []) as any[]).slice(0, 3))
const latestNews = computed(() => sortNews((manifest.value?.collections.news.items || []) as any[]).slice(0, 4))
const latestPractices = computed(() => sortBestPractices((manifest.value?.collections.bestPractices.items || []) as any[]).slice(0, 3))

const weeklyFocus = computed(() => [
  latestNews.value[0] && {
    title: latestNews.value[0].title,
    description: latestNews.value[0].description,
    to: latestNews.value[0].path,
    meta: `新闻 / ${latestNews.value[0].date || ''}`,
  },
  latestDocs.value[0] && {
    title: latestDocs.value[0].title,
    description: latestDocs.value[0].description,
    to: latestDocs.value[0].path,
    meta: `文档 / ${latestDocs.value[0].category || ''}`,
  },
  latestPractices.value[0] && {
    title: latestPractices.value[0].title,
    description: latestPractices.value[0].description,
    to: latestPractices.value[0].path,
    meta: `实践 / ${latestPractices.value[0].difficulty || ''}`,
  },
  featuredVideos[0] && {
    title: featuredVideos[0].title,
    description: featuredVideos[0].description,
    to: featuredVideos[0].to,
    meta: featuredVideos[0].meta,
  },
].filter(Boolean) as Array<{ title: string; description: string; to: string; meta: string }>)

const topicOverview = computed(() =>
  topicDefinitions.slice(0, 6).map(topic => ({
    title: topic.title,
    description: topic.description,
    to: `/topics?topic=${topic.slug}`,
    meta: '主题聚合',
  })),
)

const featuredTopic = computed(() => topicOverview.value[0])
const supportingTopics = computed(() => topicOverview.value.slice(1, 5))
const featuredPaths = computed(() => learningPaths.slice(0, 4))
const supportOverview = computed(() => actionOverview.slice(0, 3))
const compactExtensions = computed(() => extensionOverview.slice(0, 4))

function trackPathClick(target: string, label: string) {
  trackAction('homepage_path_click', {
    section: 'start',
    target,
    label,
  })
}
</script>

<template>
  <div>
    <HeroSection />

    <section class="section content-section routes-section">
      <div class="container">
        <div class="stack-shell">
          <div class="home-head head-inline">
            <p class="eyebrow">开始</p>
            <p class="home-head-note">首页先只回答两件事：你该从哪个入口进，以及最常见的几条学习路径怎么走，不先把你带去最热的话题页。</p>
          </div>
          <div class="feature-band start-band">
            <div class="start-intro">
              <div class="grid route-grid">
                <ContentCard
                  v-for="item in userRouteOverview"
                  :key="item.to"
                  :title="item.title"
                  :description="item.description"
                  :to="item.to"
                  :meta="item.meta"
                />
              </div>
            </div>

            <div class="start-paths">
              <div class="home-head">
                <p class="eyebrow">学习路径</p>
                <p class="home-head-note">只保留最常见的 4 条路径，先帮你判断当前阶段；其他更细的场景继续放在完整路径页里。</p>
              </div>
              <div class="compact-path-grid">
                <NuxtLink
                  v-for="(path, index) in featuredPaths"
                  :key="path.slug"
                  :to="path.next"
                  class="path-step compact-path-step"
                  @click="trackPathClick(path.next, path.title)"
                >
                  <span class="path-index">{{ String(index + 1).padStart(2, '0') }}</span>
                  <div class="path-copy">
                    <strong>{{ path.title }}</strong>
                    <p>{{ path.summary }}</p>
                  </div>
                </NuxtLink>
              </div>
              <NuxtLink to="/paths" class="start-more" @click="trackPathClick('/paths', '查看完整路径')">查看完整路径</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section topics-section">
      <div class="container">
        <div class="editorial-shell">
          <div class="home-head head-inline">
            <p class="eyebrow">开始 / 主题中心</p>
            <p class="home-head-note">当你已经知道自己在找安装、渠道、模型或安全时，直接从主题进入会比顺着首页继续往下翻更快；如果还没判断清楚，就先回到路径页。</p>
          </div>
          <div class="editorial-columns">
            <NuxtLink v-if="featuredTopic" :to="featuredTopic.to" class="card editorial-feature">
              <span class="eyebrow">主栏目</span>
              <h3>{{ featuredTopic.title }}</h3>
              <p>{{ featuredTopic.description }}</p>
              <span class="more-link">进入主题</span>
            </NuxtLink>

            <div class="editorial-side-grid">
              <NuxtLink
                v-for="item in supportingTopics"
                :key="item.to"
                :to="item.to"
                class="card editorial-mini"
              >
                <span class="tag">{{ item.meta }}</span>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section docs-section">
      <div class="container">
        <div class="stack-shell">
          <div class="home-head head-inline">
            <p class="eyebrow">文档</p>
            <p class="home-head-note">首页只保留最常用的文档入口，优先解决“先看哪类文档”这个问题；剩下更细的分类和全文索引继续放在文档中心里完成。</p>
          </div>
          <div class="grid docs-grid">
            <ContentCard
              v-for="item in docsOverview"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section practice-section">
      <div class="container">
        <div class="feature-band subtle-band">
          <div class="home-head">
            <p class="eyebrow">进阶 / 最佳实践</p>
            <p class="home-head-note">如果你已经跑通基础链路，这里给出更稳定的方法入口；但首页不再展开过多进阶分支。</p>
          </div>
          <div class="grid practice-grid">
            <ContentCard
              v-for="item in bestPracticeOverview"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section videos-section">
      <div class="container">
        <div class="feature-band subtle-band">
          <div class="home-head head-inline">
            <p class="eyebrow">开始 / 视频教程</p>
            <p class="home-head-note">视频入口保留在首页，但只作为补充入口，不再和开始、文档、动态一起争抢注意力。</p>
          </div>
          <div class="grid practice-grid">
            <ContentCard
              v-for="item in featuredVideos.slice(0, 3)"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
          <NuxtLink to="/videos" class="start-more">查看全部视频</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section content-section extension-section">
      <div class="container">
        <div class="stack-shell">
          <div class="home-head head-inline">
            <p class="eyebrow">进阶 / 能力扩展</p>
            <p class="home-head-note">这里只保留最常用的 4 个扩展入口，更完整的能力树继续放到进阶频道页里。</p>
          </div>
          <div class="grid extension-grid">
            <ContentCard
              v-for="item in compactExtensions"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section news-section">
      <div class="container">
        <div class="updates-shell">
          <div class="home-head">
            <p class="eyebrow">动态</p>
            <p class="home-head-note">先看本周最值得注意的内容，再决定是否继续进入完整新闻流或相关专题；动态适合补信号，不适合作为第一入口。</p>
          </div>
          <div class="updates-grid">
            <div class="grid spotlight-grid">
              <ContentCard
                v-for="item in weeklyFocus"
                :key="item.to"
                :title="item.title"
                :description="item.description"
                :to="item.to"
                :meta="item.meta"
              />
            </div>

            <div class="updates-side">
              <div class="side-head">
                <p class="eyebrow">最近更新</p>
                <NuxtLink to="/news" class="more-link">查看全部新闻</NuxtLink>
              </div>

              <div class="news-timeline">
                <NuxtLink
                  v-for="item in latestNews"
                  :key="item.path"
                  :to="item.path"
                  class="timeline-item"
                >
                  <div class="timeline-stem">
                    <span class="timeline-dot" />
                    <span class="timeline-line" />
                  </div>
                  <div class="card timeline-card">
                    <span class="tag">{{ item.date }}</span>
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section content-section action-section">
      <div class="container">
          <div class="feature-band">
            <div class="home-head head-inline">
            <p class="eyebrow">支持</p>
            <p class="home-head-note">把最直接的动作入口留在首页底部，避免在前半段不断打断主线阅读。</p>
            </div>
            <div class="grid action-grid">
            <ContentCard
              v-for="item in supportOverview"
              :key="item.to"
              :title="item.title"
              :description="item.description"
              :to="item.to"
              :meta="item.meta"
            />
          </div>
          <NuxtLink to="/community" class="start-more">查看完整支持入口</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container subscribe-grid card">
        <div class="subscribe-copy">
          <p class="eyebrow">支持 / 订阅更新</p>
          <p class="home-head-note">这里分成两种方式：RSS 适合直接加到阅读器，邮箱订阅适合接收后续站点更新提醒。</p>
        </div>

        <SubscribeForm />
      </div>
    </section>
  </div>
</template>

<style scoped>
.content-section {
  padding-top: 16px;
  padding-bottom: 10px;
}

.stack-shell,
.feature-band,
.updates-shell,
.editorial-shell {
  display: grid;
  gap: 10px;
}

.stack-shell {
  gap: 12px;
}

.start-band {
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 16px;
  align-items: start;
}

.layer-ribbon {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 6px;
}

.layer-card {
  display: grid;
  gap: 10px;
  min-height: 100%;
  padding: 20px 20px 18px;
}

.layer-link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.layer-link {
  background: rgba(19, 129, 125, 0.08);
}

.compact-path-grid {
  display: grid;
  gap: 12px;
}

.path-step {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 16px 16px 18px;
  border-radius: 22px;
  border: 1px solid rgba(64, 73, 85, 0.12);
  background: rgba(255, 255, 255, 0.48);
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.path-step:hover {
  transform: translateY(-2px);
  border-color: rgba(15, 102, 116, 0.22);
}

.path-index {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: #fff8ef;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.path-copy {
  display: grid;
  gap: 4px;
}

.path-copy strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.02rem;
  line-height: 1.3;
}

.path-copy p,
.editorial-feature p,
.editorial-mini p,
.timeline-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.84rem;
  line-height: 1.48;
}

.start-paths {
  display: grid;
  gap: 12px;
  align-content: start;
}

.compact-path-step {
  padding: 14px 14px 16px;
}

.start-more {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  width: fit-content;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(19, 129, 125, 0.18);
  color: var(--brand);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: rgba(19, 129, 125, 0.06);
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.start-more:hover {
  transform: translateY(-1px);
  border-color: rgba(19, 129, 125, 0.28);
  background: rgba(19, 129, 125, 0.1);
}

.feature-band {
  padding: 18px 20px;
  border: 1px solid rgba(64, 73, 85, 0.1);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.28);
}

.editorial-columns {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.9fr);
  gap: 12px;
}

.editorial-feature,
.editorial-mini,
.timeline-card {
  display: grid;
  gap: 8px;
}

.updates-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 14px;
  align-items: start;
}

.updates-side {
  display: grid;
  gap: 10px;
}

.side-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.editorial-feature {
  padding: 20px;
  align-content: start;
}

.editorial-feature h3,
.timeline-card h3 {
  margin: 0;
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.18rem;
  line-height: 1.25;
  letter-spacing: -0.03em;
}

.more-link {
  color: var(--brand);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.editorial-side-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.editorial-mini strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1rem;
  line-height: 1.28;
}

.news-timeline {
  display: grid;
  gap: 12px;
}

.home-head {
  display: grid;
  gap: 8px;
}

.head-inline {
  align-items: end;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px 18px;
}

.home-head-note {
  margin: 0;
  max-width: 72ch;
  color: var(--ink-soft);
  font-size: 0.96rem;
  line-height: 1.7;
}

.timeline-item {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 10px;
  align-items: stretch;
}

.timeline-stem {
  display: grid;
  justify-items: center;
  grid-template-rows: 16px 1fr;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--brand);
  box-shadow: 0 0 0 4px rgba(19, 129, 125, 0.12);
}

.timeline-line {
  width: 1px;
  background: rgba(67, 73, 60, 0.18);
  min-height: 100%;
}

.timeline-item:last-child .timeline-line {
  opacity: 0;
}

.timeline-card {
  padding: 16px 18px;
}

.subtle-band {
  background: linear-gradient(180deg, rgba(255, 250, 241, 0.58), rgba(255, 255, 255, 0.18));
}

.docs-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px;
}

.spotlight-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.route-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.action-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.practice-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.extension-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.ecosystem-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.subscribe-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 14px;
}

.subscribe-copy {
  display: grid;
  gap: 6px;
  align-content: start;
}

@media (max-width: 980px) {
  .docs-grid,
  .spotlight-grid,
  .layer-ribbon,
  .route-grid,
  .practice-grid,
  .extension-grid,
  .ecosystem-grid,
  .action-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .start-band,
  .updates-grid,
  .editorial-columns,
  .editorial-side-grid {
    grid-template-columns: 1fr;
  }

  .head-inline {
    grid-template-columns: 1fr;
  }

  .subscribe-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .docs-grid,
  .spotlight-grid,
  .route-grid,
  .practice-grid,
  .extension-grid,
  .ecosystem-grid,
  .action-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .feature-band {
    padding: 16px;
  }

  .home-head {
    gap: 6px;
  }

  .home-head-note {
    font-size: 0.92rem;
    line-height: 1.62;
  }

  .editorial-feature,
  .timeline-card {
    padding: 16px;
  }

  .timeline-item {
    gap: 8px;
  }

  .timeline-card h3,
  .editorial-feature h3 {
    font-size: 1.06rem;
  }

  .compact-path-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .docs-grid,
  .spotlight-grid,
  .route-grid,
  .practice-grid,
  .extension-grid,
  .ecosystem-grid,
  .action-grid {
    grid-template-columns: 1fr;
  }

  .path-step {
    grid-template-columns: 36px minmax(0, 1fr);
    gap: 10px;
    padding: 14px;
  }

  .path-index {
    width: 36px;
    height: 36px;
    font-size: 0.82rem;
  }

  .path-copy strong {
    font-size: 0.96rem;
  }

  .path-copy p,
  .editorial-feature p,
  .editorial-mini p,
  .timeline-card p {
    font-size: 0.82rem;
    line-height: 1.46;
  }

  .start-more {
    width: 100%;
    justify-content: center;
  }
}
</style>
