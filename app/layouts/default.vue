<template>
  <div class="site-shell">
    <AppHeader />
    <main>
      <AutoBreadcrumbs />
      <slot />
    </main>
    <AppFooter />
    <CodeBlockEnhancer />
  </div>
</template>
