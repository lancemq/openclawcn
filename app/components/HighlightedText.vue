<script setup lang="ts">
const props = defineProps<{
  text: string
  query?: string
}>()

const parts = computed(() => {
  const text = props.text || ''
  const query = (props.query || '').trim()

  if (!query) {
    return [{ value: text, highlight: false }]
  }

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'ig')

  return text
    .split(regex)
    .filter(Boolean)
    .map((value) => ({
      value,
      highlight: value.toLowerCase() === query.toLowerCase(),
    }))
})
</script>

<template>
  <span>
    <template v-for="(part, index) in parts" :key="`${part.value}-${index}`">
      <mark v-if="part.highlight" class="highlight">{{ part.value }}</mark>
      <template v-else>{{ part.value }}</template>
    </template>
  </span>
</template>

<style scoped>
.highlight {
  padding: 0 4px;
  border-radius: 6px;
  color: #052423;
  background: rgba(94, 234, 212, 0.9);
}
</style>
