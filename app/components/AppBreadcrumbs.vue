<script setup lang="ts">
defineProps<{
  items: Array<{
    label: string
    to?: string
  }>
}>()
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs-list">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`" class="breadcrumbs-item">
        <NuxtLink v-if="item.to && index !== items.length - 1" :to="item.to" class="breadcrumbs-link">
          {{ item.label }}
        </NuxtLink>
        <span v-else class="breadcrumbs-current">{{ item.label }}</span>
        <span v-if="index !== items.length - 1" class="breadcrumbs-separator" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>
