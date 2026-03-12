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
        <h3>学习</h3>
        <ul>
          <li><NuxtLink to="/paths">学习路径</NuxtLink></li>
          <li><NuxtLink to="/topics">主题中心</NuxtLink></li>
          <li><NuxtLink to="/docs">文档中心</NuxtLink></li>
          <li><NuxtLink to="/videos">视频教程</NuxtLink></li>
          <li><NuxtLink to="/best-practices">最佳实践</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3>扩展与资讯</h3>
        <ul>
          <li><NuxtLink to="/tools">工具系列</NuxtLink></li>
          <li><NuxtLink to="/skills">Skills</NuxtLink></li>
          <li><NuxtLink to="/configurations">关键配置</NuxtLink></li>
          <li><NuxtLink to="/news">新闻动态</NuxtLink></li>
          <li><NuxtLink to="/derivatives">衍生生态</NuxtLink></li>
          <li><NuxtLink to="/community">社区支持</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3>辅助</h3>
        <ul>
          <li><NuxtLink to="/search">站内搜索</NuxtLink></li>
          <li><NuxtLink to="/faq">常见问题</NuxtLink></li>
          <li><NuxtLink to="/feedback">提交反馈</NuxtLink></li>
          <li><a href="/rss.xml" target="_blank" rel="noreferrer">RSS 订阅</a></li>
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
