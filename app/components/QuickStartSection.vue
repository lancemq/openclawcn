<template>
  <section class="section">
    <div class="container quick-start card">
      <div>
        <p class="eyebrow">5 分钟快速开始</p>
        <h2 class="section-title">先理解 OpenClaw，再开始中文资料站点的使用与维护。</h2>
      </div>

      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <div>
            <h3>安装依赖</h3>
            <pre><code>npm install</code></pre>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div>
            <h3>本地运行</h3>
            <pre><code>npm run dev</code></pre>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div>
            <h3>继续查看文档与新闻</h3>
            <pre><code>npm run build</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quick-start {
  display: grid;
  gap: 18px;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.step {
  display: flex;
  gap: 12px;
  padding-top: 4px;
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

pre {
  margin: 0;
  color: #f8f4ea;
  font-size: 0.84rem;
}

@media (max-width: 860px) {
  .steps {
    grid-template-columns: 1fr;
  }
}
</style>
