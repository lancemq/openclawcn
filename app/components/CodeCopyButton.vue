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
  <button class="copy-button" :class="{ copied }" type="button" @click="copyCode">
    <span class="copy-icon">{{ copied ? 'done' : 'copy' }}</span>
    <span class="copy-text">{{ copied ? '已复制' : '复制代码' }}</span>
  </button>
</template>

<style scoped>
.copy-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(67, 73, 60, 0.14);
  background: rgba(255, 251, 244, 0.92);
  color: var(--ink-soft);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease, transform 0.18s ease;
}

.copy-button:hover {
  transform: translateY(-1px);
  color: var(--brand);
  border-color: rgba(12, 108, 105, 0.28);
  background: rgba(255, 255, 255, 0.98);
}

.copy-button.copied {
  color: #0d6d53;
  border-color: rgba(13, 109, 83, 0.24);
  background: rgba(224, 248, 232, 0.96);
}

.copy-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(12, 108, 105, 0.08);
  font-size: 0.62rem;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
}

.copy-text {
  font-size: 0.72rem;
}
</style>
