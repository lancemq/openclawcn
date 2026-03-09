<script setup lang="ts">
const { public: publicConfig } = useRuntimeConfig()
</script>

<template>
  <section class="hero section">
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">OpenClaw 中文官网</p>
        <h1 class="hero-title">让中文用户更快理解 OpenClaw，并找到清晰的中文资料入口。</h1>
        <p class="hero-copy">
          这个 MVP 聚焦三个动作：快速看懂 OpenClaw、快速找到中文文档、快速进入社区与更新动态。
        </p>

        <div class="button-row">
          <NuxtLink class="button primary" to="/docs">查看文档</NuxtLink>
          <NuxtLink class="button secondary" to="/news">浏览最新动态</NuxtLink>
          <a class="button ghost" :href="publicConfig.githubUrl" target="_blank" rel="noreferrer">
            查看 GitHub
          </a>
        </div>

        <div class="hero-tags">
          <span class="tag">中文教程</span>
          <span class="tag">安装指引</span>
          <span class="tag">社区入口</span>
          <span class="tag">最新动态</span>
        </div>
      </div>

      <div class="hero-panel card">
        <div class="hero-panel-header">
          <span>Step 1 MVP</span>
          <span class="status">可验证</span>
        </div>
        <ol class="timeline">
          <li>
            <strong>建立中文官网入口</strong>
            <p>首页、文档和新闻列表可以直接访问。</p>
          </li>
          <li>
            <strong>补齐中文资料结构</strong>
            <p>安装、概念、社区与动态入口清晰可见。</p>
          </li>
          <li>
            <strong>准备后续扩展</strong>
            <p>为搜索、反馈、最佳实践和社区互动预留结构。</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 28px;
  align-items: center;
}

.hero-title {
  margin: 16px 0;
  font-size: clamp(2.5rem, 6vw, 4.9rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
}

.hero-copy {
  max-width: 640px;
  margin: 0 0 24px;
  color: var(--muted);
  font-size: 1.06rem;
  line-height: 1.8;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.hero-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  color: var(--muted);
}

.status {
  color: var(--brand);
}

.timeline {
  display: grid;
  gap: 18px;
  margin: 0;
  padding-left: 18px;
}

.timeline p {
  margin: 6px 0 0;
  color: var(--muted);
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}
</style>
