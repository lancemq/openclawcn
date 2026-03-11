<script setup lang="ts">
const props = defineProps<{
  code: string
}>()

const copied = ref(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<template>
  <button class="copy-button" :class="{ copied }" @click="copyCode">
    <span v-if="copied" class="copy-icon">✓</span>
    <span v-else class="copy-icon">📋</span>
    <span class="copy-text">{{ copied ? '已复制' : '复制' }}</span>
  </button>
</template>

<style scoped>
.copy-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.copy-button.copied {
  background: rgba(34, 197, 94, 0.3);
  border-color: rgba(34, 197, 94, 0.5);
  color: #4ade80;
}

.copy-icon {
  font-size: 0.9rem;
}

.copy-text {
  font-size: 0.75rem;
}
</style>
