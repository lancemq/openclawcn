<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="empty-state collection-empty">
    <p>{{ message }}</p>
  </div>
</template>
