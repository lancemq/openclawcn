<template>
  <section class="section">
    <div class="container quick-start card">
      <div>
        <p class="eyebrow">5 分钟快速开始</p>
        <h2 class="section-title">先理解定位，再按更稳的顺序开始上手。</h2>
      </div>

      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-body">
            <h3>理解 OpenClaw 是什么</h3>
            <p>先建立对产品定位、适用人群和核心能力的整体认识，避免一开始就陷入配置细节。</p>
            <div class="step-links">
              <NuxtLink to="/docs/what-is-openclaw">产品定位</NuxtLink>
              <NuxtLink to="/docs/who-is-openclaw-for">适用人群</NuxtLink>
              <NuxtLink to="/docs/core-capabilities">核心能力</NuxtLink>
            </div>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-body">
            <h3>完成安装与初始化</h3>
            <p>再进入安装、Onboarding 和 Control UI，先跑通最小链路，再决定是否扩展渠道和工具。</p>
            <div class="step-links">
              <NuxtLink to="/docs/installation">安装与环境</NuxtLink>
              <NuxtLink to="/docs/onboarding-guide">Onboarding</NuxtLink>
              <NuxtLink to="/docs/control-ui">Control UI</NuxtLink>
            </div>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div class="step-body">
            <h3>再扩展渠道与排错</h3>
            <p>完成基础使用后，再看渠道、安全、升级和排错内容，建立长期使用和维护的基本方法。</p>
            <div class="step-links">
              <NuxtLink to="/docs/channels-overview">渠道能力</NuxtLink>
              <NuxtLink to="/docs/safety-basics">安全基础</NuxtLink>
              <NuxtLink to="/docs/troubleshooting">故障排除</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quick-start {
  display: grid;
  gap: 14px;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.step {
  display: flex;
  gap: 12px;
  padding-top: 4px;
}

.step-body {
  display: grid;
  gap: 8px;
}

.step-number {
  display: grid;
  flex: none;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  color: #fff8ef;
  font-size: 0.84rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent) 0%, #c28b44 100%);
  box-shadow: 0 14px 24px rgba(166, 111, 44, 0.2);
}

h3 {
  margin: 0 0 8px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.08rem;
  letter-spacing: -0.03em;
}

.step-body p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.65;
}

.step-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.step-links a {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.58);
  color: var(--ink);
  font-size: 0.8rem;
  font-weight: 700;
  transition: transform 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}

.step-links a:hover {
  transform: translateY(-1px);
  border-color: rgba(12, 108, 105, 0.28);
  color: var(--brand);
}

@media (max-width: 860px) {
  .steps {
    grid-template-columns: 1fr;
  }
}
</style>
