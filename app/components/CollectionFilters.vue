<script setup lang="ts">
defineProps<{
  groups: Array<{
    key: string
    label: string
    options: string[]
    selected: string
  }>
}>()

const emit = defineEmits<{
  update: [key: string, value: string]
}>()
</script>

<template>
  <div class="filters card collection-filters">
    <div v-for="group in groups" :key="group.key" class="filter-group">
      <span class="filter-label">{{ group.label }}</span>
      <button
        v-for="option in group.options"
        :key="option"
        type="button"
        class="filter-chip"
        :class="{ active: group.selected === option }"
        @click="emit('update', group.key, option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.filters {
  margin-top: 0;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.filter-label {
  color: var(--ink-soft);
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.filter-chip {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.66);
  color: var(--ink);
  padding: 6px 12px;
  cursor: pointer;
  font: inherit;
  font-size: 0.82rem;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
}

.filter-chip:hover {
  transform: translateY(-1px);
  border-color: rgba(166, 111, 44, 0.22);
}

.filter-chip.active {
  color: #fff8ef;
  border-color: transparent;
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
}
</style>
