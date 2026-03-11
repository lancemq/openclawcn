<script setup lang="ts">
type RelatedItem = {
  title: string
  path: string
  description?: string
  meta?: string
}

defineProps<{
  sectionLabel: string
  sectionTitle: string
  sectionDescription: string
  previous?: RelatedItem | null
  next?: RelatedItem | null
  related?: RelatedItem[]
}>()
</script>

<template>
  <section class="content-nav card">
    <div class="content-nav-head">
      <p class="eyebrow">{{ sectionLabel }}</p>
      <h2 class="section-title">{{ sectionTitle }}</h2>
      <p class="section-copy">{{ sectionDescription }}</p>
    </div>

    <div class="prev-next-grid">
      <NuxtLink v-if="previous" :to="previous.path" class="nav-card">
        <span class="nav-direction">上一篇</span>
        <strong>{{ previous.title }}</strong>
        <p>{{ previous.description }}</p>
      </NuxtLink>

      <div v-else class="nav-card nav-card-muted">
        <span class="nav-direction">上一篇</span>
        <strong>已经是这一组的起点</strong>
        <p>可以直接继续当前内容，或者跳到后续专题。</p>
      </div>

      <NuxtLink v-if="next" :to="next.path" class="nav-card">
        <span class="nav-direction">下一篇</span>
        <strong>{{ next.title }}</strong>
        <p>{{ next.description }}</p>
      </NuxtLink>

      <div v-else class="nav-card nav-card-muted">
        <span class="nav-direction">下一篇</span>
        <strong>已经到这一组的末尾</strong>
        <p>可以回到列表页，继续选择更适合你的专题。</p>
      </div>
    </div>

    <div v-if="related && related.length" class="related-strip">
      <NuxtLink v-for="item in related" :key="item.path" :to="item.path" class="related-item">
        <span v-if="item.meta" class="tag">{{ item.meta }}</span>
        <strong>{{ item.title }}</strong>
        <p>{{ item.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.content-nav {
  display: grid;
  gap: 16px;
  margin-top: 22px;
}

.content-nav-head {
  display: grid;
  gap: 6px;
}

.prev-next-grid,
.related-strip {
  display: grid;
  gap: 12px;
}

.prev-next-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.related-strip {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding-top: 14px;
  border-top: 1px solid rgba(67, 73, 60, 0.12);
}

.nav-card,
.related-item {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.46);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.nav-card:hover,
.related-item:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
  box-shadow: 0 12px 26px rgba(74, 56, 28, 0.08);
}

.nav-card-muted {
  background: rgba(255, 255, 255, 0.3);
}

.nav-direction {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav-card strong,
.related-item strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.35;
  letter-spacing: -0.03em;
}

.nav-card p,
.related-item p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.62;
}

@media (max-width: 900px) {
  .prev-next-grid,
  .related-strip {
    grid-template-columns: 1fr;
  }
}
</style>
