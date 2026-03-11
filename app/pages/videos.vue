<script setup lang="ts">
import { videoSections } from '~/data/videos'

useSeo({
  title: '视频教程',
  description: '整理 OpenClaw 官方 Showcase、YouTube 演示和 Bilibili 中文教程，覆盖安装、部署、Skills、渠道接入和模型扩展。',
  path: '/videos',
  type: 'website',
})

const quickFacts = [
  { label: '内容来源', value: '官方 + YouTube + Bilibili', note: '优先保留可直接上手的高信息密度教程' },
  { label: '覆盖方向', value: '安装 / Skills / 渠道 / 模型', note: '从第一次部署到更进阶的接入路径' },
  { label: '更适合谁', value: '先看视频再上手的用户', note: '尤其适合第一次接触 OpenClaw 的中文用户' },
]
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Video Tutorials</p>
          <h1 class="section-title">视频教程</h1>
          <p class="section-copy">
            这一页把 OpenClaw 相关的视频资料按“官方总览、安装部署、Skills 扩展、渠道接入”拆成几组，避免你在 Bilibili、
            YouTube 和官方文档之间来回搜索。第一次接触 OpenClaw，建议先看官方 Showcase，再选一条与你设备环境最接近的部署视频。
          </p>

          <div class="collection-utility">
            <article v-for="fact in quickFacts.slice(0, 2)" :key="fact.label" class="collection-utility-item">
              <span class="mini-label">{{ fact.label }}</span>
              <strong>{{ fact.value }}</strong>
              <p>{{ fact.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">推荐观看顺序</span>
            <strong>先官方总览，再按设备路径选择部署教程</strong>
            <p>如果你是第一次上手，优先看 Showcase 和完整安装视频；如果已经部署完成，再进入 Skills、渠道与模型接入。</p>
          </div>

          <div class="collection-summary">
            <span class="mini-label">建议做法</span>
            <p>跟视频操作时，只照着完成一条最小链路，不要在第一次尝试时同时接多种模型、渠道和 Skills。</p>
          </div>
        </aside>
      </section>

      <div class="grid video-overview-grid">
        <article v-for="fact in quickFacts" :key="fact.label" class="card overview-card">
          <span class="mini-label">{{ fact.label }}</span>
          <strong>{{ fact.value }}</strong>
          <p>{{ fact.note }}</p>
        </article>
      </div>

      <section v-for="section in videoSections" :id="section.id" :key="section.id" class="video-section">
        <div class="home-head">
          <p class="eyebrow">{{ section.title }}</p>
          <p class="home-head-note">{{ section.description }}</p>
        </div>

        <div class="grid video-grid">
          <article v-for="item in section.items" :key="item.href" class="card video-card">
            <div class="video-card-head">
              <span class="tag">{{ item.platform }}</span>
              <span class="tag">{{ item.level }}</span>
              <span v-if="item.duration" class="tag">{{ item.duration }}</span>
              <span v-if="item.views" class="tag">{{ item.views }}</span>
            </div>

            <h2>{{ item.title }}</h2>
            <p class="video-copy">{{ item.description }}</p>

            <div class="video-meta">
              <span v-if="item.publishedAt">发布时间：{{ item.publishedAt }}</span>
              <span v-if="item.note">{{ item.note }}</span>
            </div>

            <div class="video-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag-item">#{{ tag }}</span>
            </div>

            <a class="button secondary video-link" :href="item.href" target="_blank" rel="noreferrer">
              打开视频
            </a>
          </article>
        </div>
      </section>

      <section class="card watch-tips">
        <div>
          <p class="eyebrow">观看建议</p>
          <h2 class="section-title">先用视频建立直觉，再回到文档做确认</h2>
        </div>

        <div class="tips-grid">
          <article class="tip-card">
            <strong>第一次部署时</strong>
            <p>边看视频边保留官方文档，遇到版本差异时以官方文档和 release 说明为准。</p>
          </article>
          <article class="tip-card">
            <strong>看完安装视频后</strong>
            <p>回到站内文档中心继续看安装、Onboarding 和 Gateway 运维，不要只停留在视频步骤。</p>
            <NuxtLink class="video-inline-link" to="/docs">进入文档中心</NuxtLink>
          </article>
          <article class="tip-card">
            <strong>做渠道和 Skills 扩展前</strong>
            <p>先确认本地最小链路已跑通，再进入飞书、钉钉、QQ、Ollama 或 Skills 类视频。</p>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.video-overview-grid,
.video-grid,
.tips-grid {
  display: grid;
  gap: 14px;
}

.video-overview-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.overview-card,
.video-card,
.watch-tips,
.tip-card {
  display: grid;
  gap: 10px;
}

.overview-card strong,
.tip-card strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.35;
}

.overview-card p,
.tip-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.62;
}

.video-section {
  display: grid;
  gap: 10px;
}

.home-head {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.home-head-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.5;
}

.video-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.video-card-head,
.video-meta,
.video-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.video-card h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.06rem;
  line-height: 1.35;
  letter-spacing: -0.03em;
}

.video-copy {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.65;
  font-size: 0.9rem;
}

.video-meta {
  color: var(--ink-soft);
  font-size: 0.8rem;
  line-height: 1.55;
}

.tag-item {
  font-size: 0.74rem;
  color: var(--brand);
  background: rgba(166, 111, 44, 0.1);
  padding: 3px 8px;
  border-radius: 999px;
}

.video-link {
  width: fit-content;
}

.video-inline-link {
  color: var(--brand);
  font-size: 0.84rem;
  font-weight: 700;
}

.tips-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 980px) {
  .video-overview-grid,
  .video-grid,
  .tips-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .video-overview-grid,
  .video-grid,
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
