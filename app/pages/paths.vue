<script setup lang="ts">
import { learningPaths } from '~/data/taxonomy'

useSeo({
  title: '学习路径',
  description: '按新手部署、Windows/WSL、Skills 扩展和团队运维等目标整理 OpenClaw 的连续学习路径。',
  path: '/paths',
})
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Learning Paths</p>
          <h1 class="section-title">学习路径</h1>
          <p class="section-copy">
            如果你不想在文档、视频、新闻和最佳实践之间自己拼路线，这里把更常见的目标拆成几条连续路径。先选适合你的目标，再顺着同一条链路往下走。
          </p>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">怎么用</span>
            <strong>先选目标，再走完一条路径</strong>
            <p>不要第一次上手就同时看安装、运维、模型、渠道和 Skills。选一条最贴近当前问题的路径，先走完再扩展。</p>
          </div>
        </aside>
      </section>

      <section class="path-grid">
        <article v-for="path in learningPaths" :key="path.slug" class="card path-card">
          <div class="path-head">
            <span class="tag">{{ path.audience }}</span>
            <h2>{{ path.title }}</h2>
            <p>{{ path.summary }}</p>
          </div>

          <ol class="path-steps">
            <li v-for="step in path.steps" :key="step.to">
              <NuxtLink :to="step.to">{{ step.title }}</NuxtLink>
            </li>
          </ol>

          <NuxtLink class="button secondary path-next" :to="path.next">继续这条路径</NuxtLink>
        </article>
      </section>
    </div>
  </section>
</template>

<style scoped>
.path-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.path-card,
.path-head {
  display: grid;
  gap: 10px;
}

.path-card h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.16rem;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.path-card p,
.path-steps {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.62;
}

.path-steps {
  padding-left: 18px;
  display: grid;
  gap: 8px;
}

.path-steps a {
  color: var(--brand);
  font-weight: 600;
}

.path-next {
  width: fit-content;
  margin-top: auto;
}

@media (max-width: 900px) {
  .path-grid {
    grid-template-columns: 1fr;
  }
}
</style>
