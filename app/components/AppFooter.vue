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
          <li><NuxtLink to="/best-practices">最佳实践</NuxtLink></li>
          <li><NuxtLink to="/news">新闻</NuxtLink></li>
          <li><NuxtLink to="/community">社区支持</NuxtLink></li>
          <li><NuxtLink to="/search">站内搜索</NuxtLink></li>
          <li><a href="/rss.xml" target="_blank" rel="noreferrer">RSS 订阅</a></li>
        </ul>
      </div>

      <div>
        <h3>关注</h3>
        <ul>
          <li><NuxtLink to="/docs/getting-started/what-is-openclaw">产品介绍</NuxtLink></li>
          <li><NuxtLink to="/docs/getting-started/onboarding-guide">入门路径</NuxtLink></li>
          <li><NuxtLink to="/docs/operations/release-tracking">更新跟踪</NuxtLink></li>
          <li><NuxtLink to="/feedback">内容反馈</NuxtLink></li>
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
  padding: 32px 0 22px;
  border-top: 1px solid rgba(67, 73, 60, 0.12);
  background: linear-gradient(180deg, rgba(239, 231, 216, 0.1), rgba(234, 224, 206, 0.36));
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 20px;
}

.footer-copy {
  max-width: 400px;
  color: var(--ink-soft);
  line-height: 1.7;
  font-size: 0.92rem;
}

h3 {
  margin: 0 0 10px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.2rem;
  letter-spacing: -0.03em;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li + li {
  margin-top: 8px;
}

li a {
  font-size: 0.92rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding-top: 20px;
  margin-top: 22px;
  color: var(--ink-soft);
  border-top: 1px solid rgba(67, 73, 60, 0.08);
  font-size: 0.86rem;
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
