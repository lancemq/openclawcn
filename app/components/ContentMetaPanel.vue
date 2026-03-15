<script setup lang="ts">
defineProps<{
  items: Array<{
    label: string
    value: string
    href?: string
  }>
}>()
</script>

<template>
  <div v-if="items.length" class="meta-panel">
    <div v-for="item in items" :key="`${item.label}-${item.value}`" class="meta-item">
      <span class="meta-label">{{ item.label }}</span>
      <a v-if="item.href" :href="item.href" target="_blank" rel="noreferrer" class="meta-value meta-link">
        {{ item.value }}
      </a>
      <span v-else class="meta-value">{{ item.value }}</span>
    </div>
  </div>
</template>

<style scoped>
.meta-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  margin: 16px 0 18px;
}

.meta-item {
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.46);
}

.meta-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.meta-value {
  color: var(--ink);
  font-size: 0.92rem;
  line-height: 1.5;
}

.meta-link {
  color: var(--brand);
  text-decoration: underline;
  text-decoration-color: rgba(12, 108, 105, 0.28);
  text-underline-offset: 3px;
}
</style>
