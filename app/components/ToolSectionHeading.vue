<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="section-head">
    <div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <p v-if="description" class="section-copy">{{ description }}</p>
    </div>
  </div>
</template>
