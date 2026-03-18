<script setup lang="ts">
const route = useRoute()
const { openSearch } = useGlobalSearch()

const navGroups = [
  {
    label: '开始',
    slug: 'start',
    to: '/paths',
    items: [
      { label: '学习路径', to: '/paths' },
      { label: '主题中心', to: '/topics' },
      { label: '视频教程', to: '/videos' },
    ],
  },
  {
    label: '文档',
    slug: 'docs',
    to: '/docs',
    items: [
      { label: '文档中心', to: '/docs' },
      { label: '关键配置', to: '/configurations' },
      { label: '模型选择', to: '/models' },
      { label: '安全实践', to: '/security' },
    ],
  },
  {
    label: '进阶',
    slug: 'advanced',
    to: '/best-practices',
    items: [
      { label: '最佳实践', to: '/best-practices' },
      { label: '工具系列', to: '/tools' },
      { label: 'Skills', to: '/skills' },
      { label: '案例展示', to: '/showcase' },
      { label: '二次开发专题', to: '/secondary-development' },
    ],
  },
  {
    label: '动态',
    slug: 'updates',
    to: '/news',
    items: [
      { label: '新闻动态', to: '/news' },
      { label: '产品路线图', to: '/roadmap' },
      { label: '生态项目', to: '/ecosystem' },
      { label: '背景故事', to: '/story' },
    ],
  },
  {
    label: '支持',
    slug: 'support',
    to: '/search',
    items: [
      { label: '站内搜索', to: '/search' },
      { label: '常见问题', to: '/faq' },
      { label: '社区支持', to: '/community' },
      { label: '提交反馈', to: '/feedback' },
      { label: '下载中心', to: '/download' },
    ],
  },
] as const

const homeItem = { label: '首页', to: '/' }

function isActive(to: string) {
  if (to === '/') {
    return route.path === '/'
  }

  return route.path === to || route.path.startsWith(`${to}/`)
}

function isSecondaryActive(to: string, index: number) {
  if (route.path === '/' && activeGroupSlug.value === 'start') {
    return index === 0
  }

  return isActive(to)
}

const activeGroupSlug = computed(() => {
  const matchedGroup = navGroups.find(group => group.items.some(item => isActive(item.to)))
  return matchedGroup?.slug || 'start'
})

const activeGroup = computed(() =>
  navGroups.find(group => group.slug === activeGroupSlug.value) || navGroups[0],
)
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <div class="header-ribbon">
        <span>OpenClawCN 中文资料站</span>
        <span>开始 · 文档 · 进阶 · 动态 · 支持</span>
      </div>

      <div class="header-top">
        <NuxtLink class="brand" to="/">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="headerBrandBg" x1="8" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#13817D" />
                  <stop offset="1" stop-color="#163938" />
                </linearGradient>
                <linearGradient id="headerBrandClaw" x1="36" y1="18" x2="54" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#F0DFC2" />
                  <stop offset="1" stop-color="#A66F2C" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="18" fill="url(#headerBrandBg)" />
              <rect x="2" y="2" width="60" height="60" rx="16" stroke="#EAD7B6" stroke-opacity=".34" />
              <path d="M38.35 17.5C35.39 14.87 31.52 13.28 27.3 13.28C18.18 13.28 10.79 20.67 10.79 29.79C10.79 38.91 18.18 46.3 27.3 46.3C31.48 46.3 35.32 44.76 38.23 42.19" stroke="#F8F3E9" stroke-width="5.2" stroke-linecap="round" />
              <path d="M32.98 21.88L47.82 16.26" stroke="url(#headerBrandClaw)" stroke-width="4.1" stroke-linecap="round" />
              <path d="M35.57 29.97L50.41 24.35" stroke="url(#headerBrandClaw)" stroke-width="4.1" stroke-linecap="round" />
              <path d="M33.04 38.15L47.88 43.93" stroke="url(#headerBrandClaw)" stroke-width="4.1" stroke-linecap="round" />
            </svg>
          </span>
          <span class="brand-copy">
            <strong>OpenClawCN</strong>
            <small>中文资料站</small>
          </span>
        </NuxtLink>

        <div class="header-primary">
          <NuxtLink
            :to="homeItem.to"
            class="top-link"
            :class="{ active: isActive(homeItem.to) }"
          >
            {{ homeItem.label }}
          </NuxtLink>

          <NuxtLink
            v-for="group in navGroups"
            :key="group.to"
            :to="group.to"
            class="group-link"
            :class="{ active: activeGroupSlug === group.slug }"
          >
            {{ group.label }}
          </NuxtLink>
        </div>

        <div class="header-actions">
          <button type="button" class="search-trigger" title="搜索 (⌘K)" @click="openSearch">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span class="search-trigger-text">搜索</span>
            <kbd>⌘K</kbd>
          </button>
        </div>
      </div>

      <div class="header-secondary" aria-label="二级导航">
        <span class="secondary-label">{{ activeGroup.label }}</span>
        <nav class="secondary-nav">
          <NuxtLink
            v-for="(item, index) in activeGroup.items"
            :key="item.to"
            :to="item.to"
            class="nav-link"
            :class="{ active: isSecondaryActive(item.to, index) }"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(14px);
  background: rgba(248, 244, 237, 0.9);
  border-bottom: 1px solid rgba(64, 73, 85, 0.1);
}

.header-inner {
  display: grid;
  gap: 10px;
  padding: 10px 0 14px;
}

.header-ribbon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 30px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(64, 73, 85, 0.08);
  color: var(--ink-soft);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 54px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex: none;
}

.brand-mark svg {
  width: 34px;
  height: 34px;
}

.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-copy strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1rem;
  letter-spacing: -0.03em;
}

.brand-copy small {
  margin-top: 1px;
  color: var(--ink-soft);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.header-primary {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.top-link,
.group-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--ink-soft);
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
}

.top-link.active,
.top-link:hover,
.group-link.active,
.group-link:hover {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.8);
}

.header-secondary {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 34px;
  padding: 10px 14px;
  border: 1px solid rgba(64, 73, 85, 0.1);
  border-radius: 20px;
  background: rgba(255, 252, 247, 0.76);
}

.secondary-label {
  display: inline-flex;
  align-items: center;
  flex: none;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(234, 212, 182, 0.5);
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.secondary-nav {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 0.86rem;
  font-weight: 600;
}

.nav-link.active,
.nav-link:hover {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.76);
}

.compact {
  min-height: 32px;
  padding-inline: 10px;
  font-size: 0.86rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid rgba(64, 73, 85, 0.14);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.62);
  color: var(--ink-soft);
  font-size: 0.84rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-trigger:hover {
  border-color: rgba(67, 73, 60, 0.25);
  background: rgba(255, 255, 255, 0.8);
  color: var(--ink);
}

.search-trigger svg {
  width: 16px;
  height: 16px;
}

.search-trigger-text {
  display: none;
}

.search-trigger kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.06);
  font-size: 0.68rem;
  font-weight: 600;
  font-family: inherit;
}

@media (min-width: 768px) {
  .search-trigger-text {
    display: inline;
  }
}

@media (max-width: 980px) {
  .header-ribbon {
    display: none;
  }

  .header-top {
    flex-wrap: wrap;
  }

  .header-primary {
    order: 3;
    width: 100%;
  }

  .header-actions {
    margin-left: auto;
  }

  .header-secondary {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
