<script setup lang="ts">
useSeo({
  title: '免责声明',
  description: '说明 OpenClawCN 的内容来源、使用边界以及权利人联系处理方式。',
  path: '/disclaimer',
})
</script>

<template>
  <section class="section">
    <div class="container legal-page">
      <div class="legal-header">
        <p class="eyebrow">Legal</p>
        <h1 class="section-title">免责声明</h1>
        <p class="legal-update">最后更新：2026 年 3 月 16 日</p>
      </div>

      <div class="legal-content card">
        <h2>内容来源说明</h2>
        <p>
          OpenClawCN 旨在为中文用户提供面向公开网络信息的整理、索引、解读与导航服务。本站所展示的新闻、资料摘要、外部项目说明、版本动态及相关介绍，可能来源于公开可获取的网络信息、官方文档、公开仓库、社区讨论及站内编辑整理内容。
        </p>

        <h2>信息使用边界</h2>
        <p>
          我们会尽量以审慎、克制和可核验的方式整理内容，但本站内容主要用于信息参考、学习导航与资料归档，不构成任何形式的官方声明、专业建议、法律意见或商业承诺。对于因信息更新滞后、第三方页面调整、外部来源变化等原因造成的偏差，本站不对其完整性、实时性或绝对准确性作明示保证。
        </p>

        <h2>知识产权与权利保护</h2>
        <p>
          本站尊重原始内容提供方及相关权利人的合法权益。若本站在转载、引用、整理、摘要、链接展示或资料归档过程中，存在可能影响您合法权益的内容，包括但不限于著作权、商标权、名称权、肖像权、数据权益或其他相关权利，请及时与我们联系。
        </p>

        <h2>处理机制</h2>
        <p>如您认为本站相关内容存在侵权、不当引用、来源标注不准确或其他需要处理的情形，请通过 <NuxtLink to="/feedback">反馈页面</NuxtLink> 提交说明，并尽量补充以下信息：</p>
        <ul>
          <li>相关页面链接或具体内容位置</li>
          <li>权利主体或代理主体身份说明</li>
          <li>需要更正、删除、下线或补充标注的具体理由</li>
          <li>必要的证明材料或可供核验的信息</li>
        </ul>
        <p>
          我们在收到明确通知后，会尽快完成核查，并根据实际情况采取删除、修订、补充来源说明或其他必要处理措施。
        </p>

        <h2>第三方内容说明</h2>
        <p>
          本站可能包含指向第三方网站、平台或公开资料的链接。相关内容由第三方独立提供和维护，其准确性、可用性、合法性及后续变更不受本站控制。用户在访问第三方内容时，应自行判断其适用性并遵循对应平台规则。
        </p>

        <h2>免责声明更新</h2>
        <p>
          我们可能根据网站内容结构、资料来源范围和处理机制的调整，对本页面进行更新。更新后的版本将直接在本站公布，并自公布之日起生效。
        </p>
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
