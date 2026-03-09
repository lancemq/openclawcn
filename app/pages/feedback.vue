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
          第 2 步先提供可验证的反馈链路：前端表单、服务端校验接口，以及后续接入 webhook 或工单系统的扩展位。
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
