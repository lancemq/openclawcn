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
  gap: 12px;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
}

p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.more {
  color: var(--brand);
  font-weight: 600;
}
</style>
