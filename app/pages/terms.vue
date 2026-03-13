<script setup lang="ts">
useSeo({
  title: '服务条款',
  description: 'OpenClawCN 服务条款，说明使用本网站的条件和规则。',
  path: '/terms',
})
</script>

<template>
  <section class="section">
    <div class="container legal-page">
      <div class="legal-header">
        <p class="eyebrow">Legal</p>
        <h1 class="section-title">服务条款</h1>
        <p class="legal-update">最后更新：2026 年 3 月</p>
      </div>

      <div class="legal-content card">
        <h2>接受条款</h2>
        <p>访问和使用 OpenClawCN（以下简称"本站"）即表示您同意遵守本服务条款。如果您不同意这些条款，请勿使用本站。</p>

        <h2>服务说明</h2>
        <p>本站是一个面向中文用户的 OpenClaw 信息资源网站，提供：</p>
        <ul>
          <li>产品介绍和文档</li>
          <li>新闻和更新</li>
          <li>最佳实践和教程</li>
          <li>社区支持入口</li>
        </ul>

        <h2>使用规则</h2>
        <p>使用本站时，您同意：</p>
        <ul>
          <li>仅将本站内容用于合法目的</li>
          <li>不尝试破坏或干扰本站的正常运行</li>
          <li>不通过自动化手段大量抓取本站内容（除非获得明确授权）</li>
          <li>在反馈和社区互动中保持尊重和建设性</li>
        </ul>

        <h2>知识产权</h2>
        <p>本站内容（包括文字、图片、代码示例等）受版权保护。您可以：</p>
        <ul>
          <li>为个人学习和参考目的使用本站内容</li>
          <li>在注明来源的情况下引用本站内容</li>
          <li>不得将本站内容用于商业目的，除非获得明确授权</li>
        </ul>
        <p>OpenClaw 是开源项目，其代码遵循相应的开源许可证。</p>

        <h2>免责声明</h2>
        <p>本站内容按"现状"提供，不提供任何明示或暗示的保证。我们不对以下情况承担责任：</p>
        <ul>
          <li>因使用本站内容而产生的任何损失或损害</li>
          <li>本站内容的准确性、完整性或及时性</li>
          <li>第三方网站或服务的内容</li>
        </ul>

        <h2>服务变更</h2>
        <p>我们保留随时修改、暂停或终止本站服务的权利，恕不另行通知。</p>

        <h2>条款更新</h2>
        <p>我们可能会不时更新本服务条款。重大变更将在本页面公布，继续使用本站即表示您接受更新后的条款。</p>

        <h2>适用法律</h2>
        <p>本服务条款受中华人民共和国法律管辖，并按其解释。</p>

        <h2>联系我们</h2>
        <p>如有关于服务条款的问题或建议，请通过 <NuxtLink to="/feedback">反馈页面</NuxtLink> 联系我们。</p>
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