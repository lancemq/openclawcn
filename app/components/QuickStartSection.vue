<template>
  <section class="section">
    <div class="container quick-start card">
      <div class="quick-start-head">
        <p class="eyebrow">5 分钟快速开始</p>
        <p class="quick-start-note">按照“定位、安装、扩展”三步推进，比一开始铺开所有配置更稳。</p>
      </div>

      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-body">
            <h3>先确定你属于哪类读者</h3>
            <p>先判断自己是第一次了解、准备安装，还是已经开始使用后需要排错和长期维护。</p>
            <div class="step-links">
              <NuxtLink to="/docs/getting-started/what-is-openclaw">产品定位</NuxtLink>
              <NuxtLink to="/docs/getting-started/who-is-openclaw-for">适用人群</NuxtLink>
              <NuxtLink to="/docs/getting-started/reading-path">阅读路径</NuxtLink>
            </div>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-body">
            <h3>只跑通一条最小链路</h3>
            <p>先完成安装、Onboarding 和 Control UI 的最小验证，不要一开始就并行接多条渠道。</p>
            <div class="step-links">
              <NuxtLink to="/docs/setup/installation">安装与环境</NuxtLink>
              <NuxtLink to="/docs/getting-started/onboarding-guide">Onboarding</NuxtLink>
              <NuxtLink to="/docs/manual/control-ui">Control UI</NuxtLink>
            </div>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div class="step-body">
            <h3>再进入扩展、排错和升级</h3>
            <p>基础链路稳定后，再补渠道、安全、升级和排错方法，建立长期使用的维护节奏。</p>
            <div class="step-links">
              <NuxtLink to="/docs/manual/channels-overview">渠道能力</NuxtLink>
              <NuxtLink to="/docs/operations/safety-basics">安全基础</NuxtLink>
              <NuxtLink to="/docs/reference/troubleshooting">故障排除</NuxtLink>
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
  gap: 10px;
}

.quick-start-head {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.quick-start-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.86rem;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.step {
  display: flex;
  gap: 10px;
  padding-top: 3px;
}

.step-body {
  display: grid;
  gap: 6px;
}

.step-number {
  display: grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  color: #fff8ef;
  font-size: 0.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent) 0%, #c28b44 100%);
  box-shadow: 0 10px 18px rgba(166, 111, 44, 0.18);
}

h3 {
  margin: 0 0 6px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 0.96rem;
  letter-spacing: -0.03em;
}

.step-body p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.86rem;
  line-height: 1.6;
}

.step-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.step-links a {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.58);
  color: var(--ink);
  font-size: 0.78rem;
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
