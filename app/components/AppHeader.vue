<script setup lang="ts">
const route = useRoute()
const { openSearch } = useGlobalSearch()

const navGroups = [
  {
    label: '学习',
    slug: 'learn',
    to: '/paths',
    items: [
      { label: '学习路径', to: '/paths' },
      { label: '主题中心', to: '/topics' },
      { label: '文档中心', to: '/docs' },
      { label: '视频教程', to: '/videos' },
      { label: '最佳实践', to: '/best-practices' },
    ],
  },
  {
    label: '扩展',
    slug: 'tools',
    to: '/tools',
    items: [
      { label: '能力地图', to: '/tools' },
      { label: 'Skills', to: '/skills' },
      { label: '插件系统', to: '/tools/plugins' },
      { label: '触发与自动化', to: '/tools/triggers' },
      { label: '执行边界', to: '/tools/exec-and-approvals' },
      { label: '关键配置', to: '/configurations' },
    ],
  },
  {
    label: '生态',
    slug: 'ecosystem',
    to: '/ecosystem',
    items: [
      { label: '生态中心', to: '/ecosystem' },
      { label: '二次开发专题', to: '/ecosystem/secondary-development' },
      { label: '案例展示', to: '/showcase' },
      { label: '下载中心', to: '/download' },
      { label: '产品路线图', to: '/roadmap' },
    ],
  },
  {
    label: '资讯',
    slug: 'news',
    to: '/news',
    items: [
      { label: '新闻动态', to: '/news' },
      { label: '背景故事', to: '/story' },
      { label: '社区支持', to: '/community' },
    ],
  },
  {
    label: '辅助',
    slug: 'service',
    to: '/search',
    items: [
      { label: '站内搜索', to: '/search' },
      { label: '常见问题', to: '/faq' },
      { label: '提交反馈', to: '/feedback' },
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

const activeGroupSlug = computed(() => {
  const matchedGroup = navGroups.find(group => group.items.some(item => isActive(item.to)))
  return matchedGroup?.slug || 'learn'
})

const activeGroup = computed(() =>
  navGroups.find(group => group.slug === activeGroupSlug.value) || navGroups[0],
)
</script>

<template>
  <header class="header">
    <div class="container header-inner">
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
            v-for="item in activeGroup.items"
            :key="item.to"
            :to="item.to"
            class="nav-link"
            :class="{ active: isActive(item.to) }"
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
  backdrop-filter: blur(12px);
  background: rgba(248, 244, 234, 0.88);
  border-bottom: 1px solid rgba(67, 73, 60, 0.1);
}

.header-inner {
  display: grid;
  gap: 8px;
  padding: 10px 0 12px;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 48px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.98rem;
  letter-spacing: -0.03em;
}

.brand-copy small {
  margin-top: 1px;
  color: var(--ink-soft);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
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
  min-height: 32px;
  padding: 0 10px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--ink-soft);
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
}

.top-link.active,
.top-link:hover,
.group-link.active,
.group-link:hover {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.72);
}

.header-secondary {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 34px;
  padding: 8px 12px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 18px;
  background: rgba(255, 251, 244, 0.7);
}

.secondary-label {
  display: inline-flex;
  align-items: center;
  flex: none;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(234, 215, 182, 0.46);
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
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
  font-size: 0.84rem;
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
  min-height: 32px;
  padding: 0 10px;
  border: 1px solid rgba(67, 73, 60, 0.15);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  color: var(--ink-soft);
  font-size: 0.82rem;
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
