<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  meta?: string
  tags?: string[]
}>()
</script>

<template>
  <NuxtLink :to="to" class="content-card card">
    <div class="card-content">
      <span v-if="meta" class="tag">{{ meta }}</span>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      
      <div v-if="tags && tags.length > 0" class="card-tags">
        <span v-for="tag in tags.slice(0, 3)" :key="tag" class="tag-item">#{{ tag }}</span>
      </div>
      
      <span class="more">查看详情 →</span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.content-card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: grid;
  gap: 10px;
  padding: 16px;
  flex: 1;
}

h3 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.1rem;
  letter-spacing: -0.03em;
  line-height: 1.4;
}

p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.92rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-item {
  font-size: 0.78rem;
  color: var(--brand);
  background: rgba(166, 111, 44, 0.1);
  padding: 3px 8px;
  border-radius: 999px;
}

.more {
  margin-top: auto;
  color: var(--brand);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.82rem;
}
</style>
