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
          这里集中整理 OpenClaw 的产品介绍、入门文档、功能专题、版本更新和社区入口，帮助中文用户连续地理解与使用它。
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
            <strong>先理解 OpenClaw 是什么</strong>
            <p>从定位、能力结构和适用人群开始建立整体认知。</p>
          </li>
          <li>
            <strong>再进入文档与功能专题</strong>
            <p>把安装、渠道、Control UI、Hooks 和安全基础按中文阅读习惯组织清楚。</p>
          </li>
          <li>
            <strong>持续跟踪更新与社区讨论</strong>
            <p>通过新闻、RSS、反馈与 GitHub 入口长期关注版本变化和实践经验。</p>
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
  font-size: clamp(1.82rem, 3.15vw, 3.18rem);
  line-height: 0.95;
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
