<script setup lang="ts">
const { public: publicConfig } = useRuntimeConfig()
</script>

<template>
  <section class="hero section">
    <div class="container hero-grid">
      <div class="hero-copy-column">
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
          <span>Editorial Frame</span>
          <span class="status">Live Structure</span>
        </div>
        <div class="hero-stats">
          <div>
            <strong>Docs</strong>
            <span>中文文档入口</span>
          </div>
          <div>
            <strong>News</strong>
            <span>持续更新动态</span>
          </div>
          <div>
            <strong>Community</strong>
            <span>集中社区支持</span>
          </div>
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
  grid-template-columns: minmax(0, 1.35fr) minmax(360px, 0.65fr);
  gap: 28px;
  align-items: center;
}

.hero-copy-column {
  position: relative;
  padding-left: 18px;
}

.hero-copy-column::before {
  content: "";
  position: absolute;
  left: 0;
  top: 6px;
  width: 3px;
  height: calc(100% - 12px);
  border-radius: 999px;
  background: linear-gradient(180deg, var(--accent), rgba(166, 111, 44, 0.16));
}

.hero-title {
  max-width: 900px;
  margin: 12px 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: clamp(2.4rem, 4.6vw, 4.6rem);
  line-height: 0.92;
  letter-spacing: -0.055em;
}

.hero-copy {
  max-width: 720px;
  margin: 0 0 18px;
  color: var(--ink-soft);
  font-size: 0.96rem;
  line-height: 1.72;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.hero-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  color: var(--ink-soft);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status {
  color: var(--brand);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.hero-stats div {
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(67, 73, 60, 0.08);
}

.hero-stats strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.94rem;
}

.hero-stats span {
  color: var(--ink-soft);
  font-size: 0.78rem;
}

.timeline {
  display: grid;
  gap: 14px;
  margin: 0;
  padding-left: 16px;
  font-size: 0.94rem;
}

.timeline p {
  margin: 4px 0 0;
  color: var(--ink-soft);
  font-size: 0.84rem;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-copy-column {
    padding-left: 18px;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }
}
</style>
