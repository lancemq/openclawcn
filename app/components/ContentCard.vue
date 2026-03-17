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
      <div class="card-head">
        <span v-if="meta" class="tag">{{ meta }}</span>
        <span class="card-direction">专题阅读</span>
      </div>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>

      <div v-if="tags && tags.length > 0" class="card-tags">
        <span v-for="tag in tags.slice(0, 3)" :key="tag" class="tag-item">#{{ tag }}</span>
      </div>

      <span class="more">继续阅读</span>
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
  box-shadow: 0 18px 32px rgba(48, 39, 25, 0.12);
}

.card-content {
  display: grid;
  gap: 10px;
  padding: 10px 8px 6px;
  flex: 1;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.card-direction {
  color: var(--ink-soft);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h3 {
  margin: 0;
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.08rem;
  letter-spacing: -0.03em;
  line-height: 1.42;
  text-wrap: balance;
}

p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.64;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.91rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-item {
  font-size: 0.76rem;
  color: var(--brand);
  background: rgba(138, 90, 36, 0.1);
  padding: 3px 8px;
  border-radius: 999px;
}

.more {
  margin-top: auto;
  color: var(--brand);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.74rem;
}

@media (max-width: 640px) {
  .card-head {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
