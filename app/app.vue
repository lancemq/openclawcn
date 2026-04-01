<script setup lang="ts">
const { isOpen, openSearch, closeSearch } = useGlobalSearch()
const config = useRuntimeConfig()

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

useHead({
  link: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'OpenClawCN RSS',
      href: new URL('/rss.xml', config.public.siteUrl).toString(),
    },
    {
      rel: 'alternate',
      type: 'text/plain',
      title: 'OpenClawCN LLMs',
      href: new URL('/llms.txt', config.public.siteUrl).toString(),
    },
    {
      rel: 'alternate',
      type: 'text/plain',
      title: 'OpenClawCN LLMs Full',
      href: new URL('/llms-full.txt', config.public.siteUrl).toString(),
    },
    {
      rel: 'sitemap',
      type: 'application/xml',
      href: new URL('/sitemap.xml', config.public.siteUrl).toString(),
    },
  ],
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
