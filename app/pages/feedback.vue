<script setup lang="ts">
useSeo({
  title: '提交反馈',
  description: '向 OpenClawCN 提交文档问题、站点问题和社区建议。',
  path: '/feedback',
})
</script>

<template>
  <section class="section">
    <div class="container feedback-page">
      <div>
        <p class="eyebrow">Feedback</p>
        <h1 class="section-title">提交反馈</h1>
        <p class="section-copy">
          这里不仅可以报错，也可以提交“我还想看什么内容”。如果你觉得某篇文档不够清楚、缺视频、缺案例或缺某个主题，直接在这里归类反馈。
        </p>
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
</style>
