<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: '首页', to: '/' },
  { label: '文档', to: '/docs' },
  { label: '实践', to: '/best-practices' },
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
  background: rgba(248, 244, 234, 0.78);
  border-bottom: 1px solid rgba(67, 73, 60, 0.1);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 68px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 800;
  color: #fff8ef;
  background: linear-gradient(135deg, var(--accent) 0%, #c28b44 100%);
  box-shadow: 0 14px 24px rgba(166, 111, 44, 0.22);
}

.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-copy strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  letter-spacing: -0.03em;
}

.brand-copy small {
  margin-top: 2px;
  color: var(--ink-soft);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
}

.nav-link {
  padding: 8px 12px;
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 0.9rem;
  font-weight: 600;
}

.nav-link.active,
.nav-link:hover {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.66);
}

.compact {
  min-height: 36px;
  padding-inline: 12px;
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
