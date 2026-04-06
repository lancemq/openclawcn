<script setup lang="ts">
import { sortDocs } from '~/data/content'

const { data: manifest, status } = await useContentManifest()
const allDocs = computed(() => manifest.value?.collections.docs.items || [])
const gettingStartedDocs = computed(() =>
  sortDocs((allDocs.value || []).filter(item => String(item.path).startsWith('/docs/getting-started/')) as any[]),
)

const featuredDocs = computed(() => gettingStartedDocs.value.slice(0, 4))
const entryDocs = computed(() => gettingStartedDocs.value.filter(item =>
  [
    '/docs/getting-started/which-page-should-i-start-with',
    '/docs/getting-started/what-is-openclaw',
    '/docs/getting-started/who-is-openclaw-for',
    '/docs/getting-started/getting-started',
  ].includes(String(item.path)),
))
const onboardingDocs = computed(() => gettingStartedDocs.value.filter(item =>
  [
    '/docs/getting-started/onboarding-guide',
    '/docs/getting-started/onboarding-local-vs-remote',
    '/docs/getting-started/first-agent',
    '/docs/getting-started/first-channel',
    '/docs/getting-started/first-skill',
    '/docs/getting-started/first-workflow',
  ].includes(String(item.path)),
))
const decisionDocs = computed(() => gettingStartedDocs.value.filter(item =>
  [
    '/docs/getting-started/when-to-connect-channels',
    '/docs/getting-started/when-to-add-skills-plugins-and-multi-agent',
    '/docs/getting-started/when-to-read-models-config-security',
    '/docs/getting-started/when-to-use-dashboard-webchat-or-channels',
  ].includes(String(item.path)),
))

const docStats = computed(() => [
  {
    label: '入门文档数',
    value: String(gettingStartedDocs.value.length),
    note: '覆盖定位、角色入口、快速验证和扩展判断',
  },
  {
    label: '推荐起点',
    value: '入口判断',
    note: '先分清自己要解决什么，再进入具体页面',
  },
])

useSeo({
  title: '入门教程',
  description: 'OpenClaw 中文站入门教程总入口，先完成定位、角色判断与最小验证，再进入渠道、技能和配置专题。',
  path: '/docs/getting-started',
  schemaType: 'CollectionPage',
  itemList: featuredDocs.value.map(item => ({
    title: item.title,
    to: item.path,
    description: item.description,
  })),
})
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <CollectionHero
        eyebrow="Getting Started"
        title="入门教程"
        description="这一组页面专门解决第一次接触 OpenClaw 时最容易乱的几件事：它到底适不适合你、应该从哪条入口开始、先验证什么、什么时候再进入渠道和扩展能力。"
        :stats="docStats"
        summary-label="推荐顺序"
        summary-title="先判断入口，再跑最小链路"
        summary-text="如果你是第一次访问中文站，建议先看入口判断、产品定位、适用人群和快速入门。把最小链路跑通之后，再决定是否接渠道、上技能或进入配置专题。"
        :featured="featuredDocs.map(item => ({
          label: '入门教程',
          title: item.title,
          description: item.description,
          to: item.path,
        }))"
      />

      <section class="entry-panel">
        <div class="result-group-head">
          <p class="eyebrow">先看这组</p>
          <p class="muted">更适合第一次访问时快速完成判断和启动</p>
        </div>
        <div class="entry-grid">
          <NuxtLink
            v-for="item in entryDocs"
            :key="item.path"
            :to="item.path"
            class="entry-card"
          >
            <span class="tag">推荐起点</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <section class="entry-panel">
        <div class="result-group-head">
          <p class="eyebrow">上手与验证</p>
          <p class="muted">先理解 onboarding，再逐步完成第一个 agent、渠道、技能和工作流</p>
        </div>
        <div class="entry-grid entry-grid-wide">
          <NuxtLink
            v-for="item in onboardingDocs"
            :key="item.path"
            :to="item.path"
            class="entry-card"
          >
            <span class="tag">最小链路</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <section class="entry-panel">
        <div class="result-group-head">
          <p class="eyebrow">继续判断</p>
          <p class="muted">当基础链路已跑通，再用这组页面决定是否进入渠道、技能、配置和安全专题</p>
        </div>
        <div class="entry-grid">
          <NuxtLink
            v-for="item in decisionDocs"
            :key="item.path"
            :to="item.path"
            class="entry-card"
          >
            <span class="tag">下一步</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <div v-if="status === 'success'" class="masonry-grid collection-grid">
        <NuxtLink
          v-for="item in gettingStartedDocs"
          :key="item.path"
          :to="item.path"
          class="masonry-item card collection-card"
        >
          <div class="item-content collection-card-body">
            <div class="item-meta collection-meta">
              <span class="tag">入门教程</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
