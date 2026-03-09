<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: '首页', to: '/' },
  { label: '文档', to: '/docs' },
  { label: '新闻', to: '/news' },
  { label: '社区', to: '/community' },
  { label: '搜索', to: '/search' },
]

const { public: publicConfig } = useRuntimeConfig()

function isActive(to: string) {
  if (to === '/') {
    return route.path === '/'
  }

  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <NuxtLink class="brand" to="/">
        <span class="brand-mark">OC</span>
        <span class="brand-copy">
          <strong>OpenClawCN</strong>
          <small>中文官网 MVP</small>
        </span>
      </NuxtLink>

      <nav class="nav" aria-label="主导航">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <a class="button secondary compact" :href="publicConfig.githubUrl" target="_blank" rel="noreferrer">
          GitHub
        </a>
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
  background: rgba(8, 18, 27, 0.75);
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 76px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  font-weight: 800;
  color: #042f2e;
  background: linear-gradient(135deg, var(--brand) 0%, #99f6e4 100%);
}

.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-copy small {
  color: var(--muted);
}

.nav {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
}

.nav-link {
  padding: 10px 14px;
  border-radius: 999px;
  color: var(--muted);
}

.nav-link.active,
.nav-link:hover {
  color: var(--text);
  background: rgba(148, 163, 184, 0.08);
}

.compact {
  min-height: 40px;
  padding-inline: 14px;
}

@media (max-width: 860px) {
  .header-inner {
    flex-wrap: wrap;
    padding: 12px 0;
  }

  .nav {
    order: 3;
    width: 100%;
  }

  .header-actions {
    margin-left: auto;
  }
}
</style>
