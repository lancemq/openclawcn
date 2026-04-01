<script setup lang="ts">
defineProps<{
  title?: string
  description: string
  tags?: string[]
  section?: string
  updatedAt?: string
  sourceName?: string
}>()
</script>

<template>
  <section class="content-ai-overview card">
    <div class="content-ai-overview__head">
      <p class="eyebrow">AI 摘要</p>
      <h2>{{ title || '这页重点' }}</h2>
    </div>
    <div class="content-ai-overview__grid">
      <div class="content-ai-overview__item">
        <strong>核心结论</strong>
        <p>{{ description }}</p>
      </div>
      <div class="content-ai-overview__item">
        <strong>适用主题</strong>
        <p>{{ section || 'OpenClaw 知识库' }}</p>
      </div>
      <div class="content-ai-overview__item">
        <strong>高频关键词</strong>
        <p>{{ tags && tags.length ? tags.slice(0, 6).join(' / ') : 'OpenClaw / 中文文档 / 实践 / 更新' }}</p>
      </div>
      <div class="content-ai-overview__item">
        <strong>可信信号</strong>
        <p>
          <span v-if="updatedAt">最后更新 {{ updatedAt }}</span>
          <span v-if="updatedAt && sourceName">，</span>
          <span v-if="sourceName">来源 {{ sourceName }}</span>
          <span v-if="!updatedAt && !sourceName">站内整理与持续校对</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-ai-overview,
.content-ai-overview__head,
.content-ai-overview__grid,
.content-ai-overview__item {
  display: grid;
  gap: 10px;
}

.content-ai-overview {
  margin: 18px 0 20px;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(12, 108, 105, 0.14);
  background:
    radial-gradient(circle at top right, rgba(15, 118, 110, 0.08), transparent 34%),
    linear-gradient(180deg, rgba(245, 251, 250, 0.96), rgba(255, 255, 255, 0.96));
}

.content-ai-overview__head h2,
.content-ai-overview__item strong {
  margin: 0;
}

.content-ai-overview__head h2 {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.05rem;
  letter-spacing: -0.03em;
}

.content-ai-overview__grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.content-ai-overview__item {
  padding: 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(64, 73, 85, 0.08);
}

.content-ai-overview__item strong {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-soft);
}

.content-ai-overview__item p {
  margin: 0;
  color: var(--ink);
  line-height: 1.68;
}

@media (max-width: 900px) {
  .content-ai-overview__grid {
    grid-template-columns: 1fr;
  }
}
</style>
