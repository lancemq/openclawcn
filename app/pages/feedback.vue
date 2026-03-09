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
          如果你发现文档问题、信息缺失、翻译不准确或希望补充某个专题，可以直接在这里提交反馈。
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
