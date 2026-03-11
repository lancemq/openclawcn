<script setup lang="ts">
const route = useRoute()

const navGroups = [
  {
    label: '学习',
    slug: 'learn',
    items: [
      { label: '路径', to: '/paths' },
      { label: '主题', to: '/topics' },
      { label: '文档', to: '/docs' },
      { label: '视频', to: '/videos' },
      { label: '实践', to: '/best-practices' },
    ],
  },
  {
    label: '工具',
    slug: 'tools',
    items: [
      { label: '技能', to: '/skills' },
      { label: '配置', to: '/configurations' },
    ],
  },
  {
    label: '生态',
    slug: 'ecosystem',
    items: [
      { label: '衍生品', to: '/derivatives' },
      { label: '新闻', to: '/news' },
      { label: '社区', to: '/community' },
    ],
  },
  {
    label: '服务',
    slug: 'service',
    items: [
      { label: '搜索', to: '/search' },
      { label: '反馈', to: '/feedback' },
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
