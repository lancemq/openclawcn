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
  <button class="code-copy-btn" :class="{ copied }" type="button" @click="copyCode">
    <span class="code-copy-btn-mark" aria-hidden="true">
      <span />
      <span />
    </span>
    <span class="code-copy-btn-label">{{ copied ? '已复制' : '复制代码' }}</span>
  </button>
</template>
