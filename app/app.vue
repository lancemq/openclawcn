<script setup lang="ts">
const { isOpen, openSearch, closeSearch } = useGlobalSearch()

function handleGlobalSearchKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()

    if (isOpen.value) {
      closeSearch()
    }
    else {
      openSearch()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalSearchKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalSearchKeydown)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <GlobalSearch />
  </ClientOnly>
</template>
