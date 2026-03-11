<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  preset?: 'default' | 'avatar' | 'thumbnail' | 'hero'
  sizes?: string
  loading?: 'lazy' | 'eager'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  preset: 'default',
  loading: 'lazy',
  sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
})

// 判断是否为外部图片
const isExternal = computed(() => {
  return props.src.startsWith('http://') || props.src.startsWith('https://')
})

// 外部图片使用原生 img
const isExternalImage = isExternal.value
</script>

<template>
  <template v-if="isExternalImage">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :class="$props.class"
      class="optimized-image"
    />
  </template>
  <NuxtImg
    v-else
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :preset="preset"
    :sizes="sizes"
    :loading="loading"
    :class="$props.class"
    class="optimized-image"
    placeholder
  />
</template>

<style scoped>
.optimized-image {
  max-width: 100%;
  height: auto;
}
</style>
