<script setup lang="ts">
import { hermesSeriesPages } from '~/data/hermes-agent'

const route = useRoute()

function isActive(to: string) {
  if (to === '/hermes-agent') {
    return route.path === to
  }

  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <nav class="hermes-series-nav card" aria-label="Hermes 专题导航">
    <div class="hermes-series-head">
      <span class="mini-label">Hermes 专题</span>
      <strong>从总览进入，再按层继续深入</strong>
    </div>
    <div class="hermes-series-links">
      <NuxtLink
        v-for="item in hermesSeriesPages"
        :key="item.to"
        :to="item.to"
        class="hermes-series-link"
        :class="{ active: isActive(item.to) }"
      >
        <span class="series-tag">{{ item.meta }}</span>
        <strong>{{ item.title }}</strong>
        <p>{{ item.description }}</p>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.hermes-series-nav {
  display: grid;
  gap: 14px;
}

.hermes-series-head {
  display: grid;
  gap: 6px;
}

.hermes-series-head strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1rem;
  line-height: 1.35;
}

.hermes-series-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.hermes-series-link {
  display: grid;
  gap: 8px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(64, 73, 85, 0.1);
  background: rgba(255, 255, 255, 0.62);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.hermes-series-link strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 0.98rem;
  line-height: 1.34;
}

.hermes-series-link p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.86rem;
  line-height: 1.58;
}

.hermes-series-link:hover {
  transform: translateY(-2px);
  border-color: rgba(15, 102, 116, 0.22);
  box-shadow: 0 16px 24px rgba(64, 49, 27, 0.08);
}

.hermes-series-link.active {
  border-color: rgba(15, 102, 116, 0.28);
  background:
    radial-gradient(circle at top right, rgba(19, 129, 125, 0.12), transparent 45%),
    rgba(255, 255, 255, 0.72);
}

@media (max-width: 980px) {
  .hermes-series-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .hermes-series-links {
    grid-template-columns: 1fr;
  }
}
</style>
