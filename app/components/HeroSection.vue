<script setup lang="ts">
const { public: publicConfig } = useRuntimeConfig()
</script>

<template>
  <section class="hero section">
    <div class="container hero-grid">
      <div class="hero-copy-column">
        <div class="hero-heading-row">
          <p class="eyebrow">OpenClaw 中文官网</p>
          <span class="hero-kicker">成熟、稳定、可持续查阅的中文入口</span>
        </div>
        <h1 class="hero-title">OpenClaw 中文资料与更新导航</h1>
        <p class="hero-copy">
          以更紧凑的方式组织产品介绍、安装路径、关键能力、版本变化和社区入口，减少第一次进入时的信息噪音。
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

        <div class="hero-summary-grid">
          <article>
            <strong>先读什么</strong>
            <p>产品定位、安装、Control UI。</p>
          </article>
          <article>
            <strong>持续关注什么</strong>
            <p>版本变化、能力更新、排错路径。</p>
          </article>
        </div>
      </div>

      <div class="hero-panel card">
        <div class="hero-panel-header">
          <span>OpenClaw Guide</span>
          <span class="status">Ready to Explore</span>
        </div>
        <div class="hero-stats">
          <div>
            <strong>Docs</strong>
            <span>从入门到排错</span>
          </div>
          <div>
            <strong>News</strong>
            <span>版本与变化观察</span>
          </div>
          <div>
            <strong>Community</strong>
            <span>反馈与讨论入口</span>
          </div>
        </div>
        <ol class="timeline">
          <li>
            <strong>先理解 OpenClaw 是什么</strong>
            <p>从定位、能力结构和适用人群开始建立整体认知。</p>
          </li>
          <li>
            <strong>再进入文档与功能专题</strong>
            <p>优先看安装、Onboarding、Control UI、Channels 和安全边界。</p>
          </li>
          <li>
            <strong>持续跟踪更新与社区讨论</strong>
            <p>通过新闻、FAQ、反馈和 GitHub 入口持续跟踪版本变化与使用经验。</p>
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
  gap: 16px;
  align-items: start;
}

.hero-copy-column {
  position: relative;
  display: grid;
  gap: 10px;
  padding: 16px 18px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 22px;
  background: rgba(255, 251, 244, 0.72);
  box-shadow: 0 14px 32px rgba(74, 56, 28, 0.08);
}

.hero-heading-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.hero-kicker {
  color: var(--ink-soft);
  font-size: 0.8rem;
  letter-spacing: 0.03em;
}

.hero-title {
  max-width: 20ch;
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: clamp(1.4rem, 2vw, 2rem);
  line-height: 1;
  letter-spacing: -0.04em;
}

.hero-copy {
  max-width: 60ch;
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.94rem;
  line-height: 1.6;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.hero-summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.hero-summary-grid article {
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.46);
}

.hero-summary-grid strong {
  display: block;
  margin-bottom: 3px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.96rem;
}

.hero-summary-grid p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.82rem;
  line-height: 1.55;
}

.hero-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: var(--ink-soft);
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status {
  color: var(--brand);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 10px;
}

.hero-stats div {
  display: grid;
  gap: 3px;
  padding: 8px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(67, 73, 60, 0.08);
}

.hero-stats strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.92rem;
}

.hero-stats span {
  color: var(--ink-soft);
  font-size: 0.76rem;
}

.timeline {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 14px;
  font-size: 0.88rem;
}

.timeline p {
  margin: 3px 0 0;
  color: var(--ink-soft);
  font-size: 0.82rem;
  line-height: 1.55;
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .hero-summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
