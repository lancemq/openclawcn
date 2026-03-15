<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title?: string
  items: {
    to: string
    meta: string
    title: string
    description: string
  }[]
}>()
</script>

<template>
  <section class="card section-panel">
    <ToolSectionHeading :eyebrow="eyebrow || 'Related'" :title="title || '继续深入'" />

    <div class="related-grid">
      <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="related-link">
        <span class="tag">{{ item.meta }}</span>
        <strong>{{ item.title }}</strong>
        <p>{{ item.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
