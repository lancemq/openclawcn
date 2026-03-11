<script setup lang="ts">
useSeo({
  title: '提交反馈',
  description: '向 OpenClawCN 提交文档问题、站点问题和社区建议。',
  path: '/feedback',
  noindex: true,
})
</script>

<template>
  <section class="section">
    <div class="container feedback-page">
      <div class="feedback-copy">
        <p class="eyebrow">Feedback</p>
        <h1 class="section-title">提交反馈</h1>
        <p class="section-copy">
          这里不仅可以报错，也可以提交“我还想看什么内容”。如果你觉得某篇文档不够清楚、缺视频、缺案例或缺某个主题，直接在这里归类反馈。
        </p>

        <div class="feedback-points">
          <article class="point-card">
            <span>文档与内容</span>
            <p>适合反馈表达不清、案例缺失、链接错误、术语难懂和阅读顺序问题。</p>
          </article>
          <article class="point-card">
            <span>站点与体验</span>
            <p>适合搜索异常、样式错乱、移动端问题、404 和结构导航问题。</p>
          </article>
          <article class="point-card">
            <span>社区与诉求</span>
            <p>适合反馈想看的教程、期望的频道入口、协作方式和中文资料方向。</p>
          </article>
        </div>
      </div>

      <FeedbackForm />
    </div>
  </section>
</template>

<style scoped>
.feedback-page {
  display: grid;
  gap: 24px;
}

.feedback-copy {
  display: grid;
  gap: 12px;
}

.feedback-points {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.point-card {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.42);
}

.point-card span {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.point-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.62;
}

@media (max-width: 820px) {
  .feedback-points {
    grid-template-columns: 1fr;
  }
}
</style>
