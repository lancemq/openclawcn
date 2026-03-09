<script setup lang="ts">
useSeo({
  title: '页面不存在',
  description: '请求的页面不存在，请返回 OpenClawCN 首页继续浏览。',
  path: '/404',
})
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="card prose">
        <p class="eyebrow">404</p>
        <h1>页面不存在</h1>
        <p class="muted">当前链接没有对应内容，请返回首页或进入文档中心。</p>
        <div class="button-row">
          <NuxtLink class="button primary" to="/">返回首页</NuxtLink>
          <NuxtLink class="button secondary" to="/docs">查看文档</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
