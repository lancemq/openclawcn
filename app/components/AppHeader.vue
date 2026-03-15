<script setup lang="ts">
const route = useRoute()
const { openSearch } = useGlobalSearch()

const navGroups = [
  {
    label: '学习',
    slug: 'learn',
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
    items: [
      { label: '生态中心', to: '/ecosystem' },
      { label: '案例展示', to: '/showcase' },
      { label: '下载中心', to: '/download' },
      { label: '产品路线图', to: '/roadmap' },
    ],
  },
  {
    label: '资讯',
    slug: 'news',
    items: [
      { label: '新闻动态', to: '/news' },
      { label: '背景故事', to: '/story' },
      { label: '社区支持', to: '/community' },
    ],
  },
  {
    label: '辅助',
    slug: 'service',
    items: [
      { label: '站内搜索', to: '/search' },
      { label: '常见问题', to: '/faq' },
      { label: '提交反馈', to: '/feedback' },
    ],
  },
] as const

const homeItem = { label: '首页', to: '/' }

const { public: publicConfig } = useRuntimeConfig()

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
          <span class="brand-mark">OC</span>
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

          <button
            v-for="group in navGroups"
            :key="group.slug"
            type="button"
            class="group-link"
            :class="{ active: activeGroupSlug === group.slug }"
            @click="$router.push(group.items[0].to)"
          >
            {{ group.label }}
          </button>
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
          <a class="button secondary compact" :href="publicConfig.githubUrl" target="_blank" rel="noreferrer">
            GitHub
          </a>
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
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  font-size: 0.84rem;
  font-weight: 800;
  color: #fff8ef;
  background: linear-gradient(135deg, var(--accent) 0%, #c28b44 100%);
  box-shadow: 0 10px 18px rgba(166, 111, 44, 0.2);
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
