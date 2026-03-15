<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  summary: string
  signals: {
    label: string
    value: string
    note: string
  }[]
}>()
</script>

<template>
  <section class="detail-hero">
    <div class="card hero-main">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 class="section-title">{{ title }}</h1>
      <p class="section-copy">{{ summary }}</p>
    </div>

    <aside class="card hero-side">
      <div v-for="signal in signals" :key="signal.label" class="signal-panel">
        <span class="mini-label">{{ signal.label }}</span>
        <strong>{{ signal.value }}</strong>
        <p>{{ signal.note }}</p>
      </div>
    </aside>
  </section>
</template>
