<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title?: string
  items: {
    q: string
    a: string
  }[]
}>()
</script>

<template>
  <section class="card section-panel">
    <ToolSectionHeading :eyebrow="eyebrow || 'FAQ'" :title="title || '常见问题'" />

    <div class="faq-list">
      <article v-for="item in items" :key="item.q" class="faq-item">
        <h3>{{ item.q }}</h3>
        <p>{{ item.a }}</p>
      </article>
    </div>
  </section>
</template>
