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
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.card-content {
  display: grid;
  gap: 12px;
  padding: 20px;
  flex: 1;
}

h3 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.15rem;
  letter-spacing: -0.03em;
  line-height: 1.4;
}

p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  font-size: 0.8rem;
  color: var(--brand);
  background: rgba(166, 111, 44, 0.1);
  padding: 4px 10px;
  border-radius: 999px;
}

.more {
  margin-top: auto;
  color: var(--brand);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.85rem;
}
</style>
