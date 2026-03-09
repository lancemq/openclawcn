<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <p class="eyebrow">OpenClawCN</p>
        <p class="footer-copy">
          面向中文用户的 OpenClaw 新闻、文档、最佳实践与社区支持入口。
        </p>
      </div>

      <div>
        <h3>内容</h3>
        <ul>
          <li><NuxtLink to="/docs">文档</NuxtLink></li>
          <li><NuxtLink to="/news">新闻</NuxtLink></li>
          <li><NuxtLink to="/community">社区支持</NuxtLink></li>
          <li><NuxtLink to="/search">站内搜索</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3>阶段状态</h3>
        <ul>
          <li>第 1 步：MVP 已实现</li>
          <li>第 2 步：搜索与反馈开发中</li>
          <li>第 3 步：运营增强待开发</li>
        </ul>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© {{ year }} OpenClawCN</span>
      <span>面向中文用户的 OpenClaw 介绍站点</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 40px 0 28px;
  border-top: 1px solid rgba(148, 163, 184, 0.12);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 24px;
}

.footer-copy {
  max-width: 420px;
  color: var(--muted);
  line-height: 1.8;
}

h3 {
  margin: 0 0 12px;
  font-size: 1rem;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li + li {
  margin-top: 10px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-top: 26px;
  margin-top: 28px;
  color: var(--muted);
  border-top: 1px solid rgba(148, 163, 184, 0.08);
}

@media (max-width: 760px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
  }
}
</style>
