<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  meta?: string
}>()
</script>

<template>
  <NuxtLink :to="to" class="content-card card">
    <span v-if="meta" class="tag">{{ meta }}</span>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <span class="more">查看详情</span>
  </NuxtLink>
</template>

<style scoped>
.content-card {
  display: grid;
  gap: 14px;
  min-height: 100%;
}

h3 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.18rem;
  letter-spacing: -0.03em;
}

p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
}

.more {
  margin-top: auto;
  color: var(--brand);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
</style>
