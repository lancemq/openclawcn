<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
  stats?: Array<{ label: string; value: string; note: string }>
  summaryLabel: string
  summaryTitle: string
  summaryText: string
  featured?: Array<{ label: string; title: string; description: string; to: string }>
}>()
</script>

<template>
  <section class="collection-hero">
    <div class="card collection-main">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 class="section-title">{{ title }}</h1>
      <p class="section-copy">
        {{ description }}
      </p>

      <div v-if="stats?.length" class="collection-utility">
        <article v-for="stat in stats" :key="stat.label" class="collection-utility-item">
          <span class="mini-label">{{ stat.label }}</span>
          <strong>{{ stat.value }}</strong>
          <p>{{ stat.note }}</p>
        </article>
      </div>
    </div>

    <aside class="card collection-side">
      <div class="collection-summary">
        <span class="mini-label">{{ summaryLabel }}</span>
        <strong>{{ summaryTitle }}</strong>
        <p>{{ summaryText }}</p>
      </div>

      <NuxtLink
        v-for="item in featured"
        :key="item.to"
        :to="item.to"
        class="collection-utility-item utility-link"
      >
        <span class="mini-label">{{ item.label }}</span>
        <strong>{{ item.title }}</strong>
        <p>{{ item.description }}</p>
      </NuxtLink>
    </aside>
  </section>
</template>

<style scoped>
.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.utility-link {
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.utility-link:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
  box-shadow: 0 12px 26px rgba(74, 56, 28, 0.08);
}
</style>
