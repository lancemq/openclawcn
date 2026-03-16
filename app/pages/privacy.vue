<script setup lang="ts">
useSeo({
  title: '隐私政策',
  description: 'OpenClawCN 隐私政策，说明我们如何收集、使用和保护您的个人信息。',
  path: '/privacy',
})
</script>

<template>
  <section class="section">
    <div class="container legal-page">
      <div class="legal-header">
        <p class="eyebrow">Legal</p>
        <h1 class="section-title">隐私政策</h1>
        <p class="legal-update">最后更新：2026 年 3 月</p>
      </div>

      <div class="legal-content card">
        <h2>引言</h2>
        <p>OpenClawCN（以下简称"本站"）致力于保护您的隐私。本隐私政策说明我们如何收集、使用、存储和保护您的个人信息。</p>

        <h2>信息收集</h2>
        <p>本站可能收集以下类型的信息：</p>
        <ul>
          <li><strong>自动收集的信息</strong>：访问日志、IP 地址、浏览器类型、设备信息等，用于分析网站流量和改善用户体验。</li>
          <li><strong>您主动提供的信息</strong>：通过反馈表单、订阅表单提交的内容，包括邮箱地址、反馈内容等。</li>
        </ul>

        <h2>信息使用</h2>
        <p>我们使用收集的信息用于：</p>
        <ul>
          <li>提供、维护和改进网站服务</li>
          <li>响应您的反馈和请求</li>
          <li>发送您订阅的更新通知（如您已订阅）</li>
          <li>分析网站使用情况，优化内容和用户体验</li>
        </ul>

        <h2>信息存储与安全</h2>
        <p>本站部署在 Vercel 平台上，数据处理遵循相关安全标准。我们会采取合理的技术和组织措施保护您的信息安全，但请注意互联网传输并非完全安全。</p>

        <h2>Cookies</h2>
        <p>本站使用 Vercel Analytics 进行访问分析，可能会使用 Cookies 收集匿名统计数据。您可以在浏览器设置中管理 Cookies 偏好。</p>

        <h2>第三方服务</h2>
        <p>本站使用以下第三方服务：</p>
        <ul>
          <li><strong>Vercel</strong>：网站托管和分析服务</li>
        </ul>

        <h2>您的权利</h2>
        <p>您有权：</p>
        <ul>
          <li>访问我们持有的关于您的个人信息</li>
          <li>要求更正或删除您的个人信息</li>
          <li>取消订阅我们的邮件通知</li>
          <li>拒绝 Cookies 的使用（通过浏览器设置）</li>
        </ul>

        <h2>政策更新</h2>
        <p>我们可能会不时更新本隐私政策。重大变更将在本页面公布，建议您定期查看。</p>

        <h2>联系我们</h2>
        <p>如有关于隐私的问题或建议，请通过 <NuxtLink to="/feedback">反馈页面</NuxtLink> 联系我们。</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legal-page {
  display: grid;
  gap: 20px;
  max-width: 800px;
}

.legal-header {
  display: grid;
  gap: 8px;
}

.legal-update {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.86rem;
}

.legal-content {
  display: grid;
  gap: 16px;
  padding: 24px 28px;
}

.legal-content h2 {
  margin: 8px 0 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
}

.legal-content h2:first-child {
  margin-top: 0;
}

.legal-content p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
}

.legal-content ul {
  margin: 0;
  padding-left: 20px;
  color: var(--ink-soft);
  line-height: 1.8;
}

.legal-content li {
  margin: 4px 0;
}

.legal-content a {
  color: var(--brand);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.legal-content a:hover {
  color: var(--brand-bright);
}
</style>
