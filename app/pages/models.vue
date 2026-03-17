<script setup lang="ts">
useSeo({
  title: '模型选择指南',
  description: 'Claude/GPT/Gemini/DeepSeek/国产模型对比、智能路由配置和成本优化技巧。',
  path: '/models',
})

const modelCategories = [
  {
    title: 'Claude 系列',
    provider: 'Anthropic',
    description: 'OpenClaw 的首选模型，工具调用稳定、代码能力强',
    models: [
      { name: 'Claude Sonnet 4.6', id: 'claude-sonnet-4-6', best: true, features: ['工具调用最稳定', '代码能力顶级', '性价比最优'], price: '$3/$15', useCase: '主力模型' },
      { name: 'Claude 3.5 Haiku', id: 'claude-3-5-haiku', features: ['速度最快', '成本最低'], price: '$0.8/$4', useCase: '轻量任务' },
      { name: 'Claude Opus 4.6', id: 'claude-opus-4-6', features: ['推理能力最强', '复杂任务首选'], price: '$15/$75', useCase: '复杂推理' },
    ],
  },
  {
    title: 'GPT 系列',
    provider: 'OpenAI',
    description: '视觉理解最强，多模态场景首选',
    models: [
      { name: 'GPT-5.4', id: 'gpt-5.4', best: true, features: ['视觉理解最强', '计算机使用能力'], price: '$2.5/$10', useCase: '图片分析' },
      { name: 'GPT-4o-mini', id: 'gpt-4o-mini', features: ['极低成本', '批量处理首选'], price: '$0.15/$0.6', useCase: '批量处理' },
      { name: 'o3', id: 'o3', features: ['推理强化', '复杂数学'], price: '$20/$80', useCase: '复杂推理' },
    ],
  },
  {
    title: 'DeepSeek 系列',
    provider: 'DeepSeek',
    description: '中文场景性价比之王，价格仅为 Claude 的 1/10',
    models: [
      { name: 'DeepSeek-V4', id: 'deepseek-chat', best: true, features: ['1M上下文', '中文最优'], price: '$0.3/$0.5', useCase: '中文写作' },
      { name: 'DeepSeek-R1', id: 'deepseek-reasoner', features: ['推理增强', '媲美o1'], price: '$0.55/$2.19', useCase: '逻辑推理' },
    ],
  },
  {
    title: 'Gemini 系列',
    provider: 'Google',
    description: '长文档处理专家，百万级上下文',
    models: [
      { name: 'Gemini 3.1 Pro', id: 'gemini-3.1-pro', best: true, features: ['1M上下文', '多模态理解'], price: '$1.25/$5', useCase: '长文档' },
      { name: 'Gemini 2.0 Flash', id: 'gemini-2.0-flash', features: ['最便宜可用', '速度快'], price: '$0.075/$0.3', useCase: '简单任务' },
    ],
  },
  {
    title: '国产模型',
    provider: '阿里/腾讯/字节',
    description: '数据不出境，满足合规要求',
    models: [
      { name: 'Qwen2.5-72B', id: 'qwen2.5-72b', best: true, features: ['国内合规', '免费额度'], price: '¥4/¥12', useCase: '合规场景' },
      { name: '腾讯混元', id: 'hunyuan-pro', features: ['企微生态', 'QQ集成'], price: '¥4/¥12', useCase: '企微用户' },
      { name: '豆包 2.0', id: 'doubao-pro', features: ['飞书深度集成'], price: '¥0.8/¥2', useCase: '飞书用户' },
    ],
  },
]

const routingExamples = [
  {
    title: '双模型配置',
    desc: '主力模型 + 轻量模型，根据任务复杂度自动切换',
    code: `llm:
  primary:
    provider: anthropic
    model: claude-sonnet-4-6
  secondary:
    provider: anthropic
    model: claude-3-5-haiku
routing:
  simple_patterns: ["查询.*信息", "翻译", "格式化"]
  simple_model: secondary
  default_model: primary`,
  },
  {
    title: 'Fallback 链配置',
    desc: '主模型失败时自动切换备用模型',
    code: `{
  "llm": {
    "fallbackChain": [
      { "provider": "anthropic", "model": "claude-sonnet-4-6", "priority": 1 },
      { "provider": "openai", "model": "gpt-5.4", "priority": 2 },
      { "provider": "deepseek", "model": "deepseek-chat", "priority": 3 }
    ]
  }
}`,
  },
]

const costTips = [
  { title: 'SOUL.md 最小化', saving: '节省 20-40%', desc: '精简系统提示，避免冗长的开场白' },
  { title: '开启 Prompt Caching', saving: '节省 40-60%', desc: 'Anthropic 支持对重复内容缓存' },
  { title: '对话历史压缩', saving: '节省 80%', desc: '定期清理或压缩对话历史' },
  { title: '批量处理', saving: '节省 ~99%', desc: '合并多条请求为一次 API 调用' },
  { title: '设置成本上限', saving: '避免灾难', desc: '防止意外暴涨，设置多道防线' },
]

const budgetPlans = [
  { title: '个人副业', budget: '$50/月', primary: 'Claude 3.5 Haiku', secondary: 'Gemini Flash', capacity: '每日约1000次调用' },
  { title: '小团队服务', budget: '$200/月', primary: 'Claude Sonnet 4.6 (60%)', secondary: 'Haiku (35%)', capacity: '支持2-10人团队' },
  { title: '内容创作工作室', budget: '$100/月', primary: 'DeepSeek-V4 (70%)', secondary: 'GPT-5.4 (20%)', capacity: '月产3000篇短文' },
  { title: '数据合规企业', budget: '¥1000/月', primary: 'Qwen2.5-72B', secondary: '本地Ollama', capacity: '数据不出境' },
  { title: '高可用生产系统', budget: '$500+/月', primary: '多模型冗余', secondary: '自动故障转移', capacity: '99.9%可用性' },
]

const codingPlans = [
  { platform: '阿里云百炼', model: 'Qwen2.5-Coder', free: '100万tokens/月', price: '¥2/M' },
  { platform: 'DeepSeek官方', model: 'DeepSeek-V3/R1', free: '注册送10元', price: '¥1/M' },
  { platform: '字节火山引擎', model: 'Doubao-pro', free: '50万tokens/月', price: '¥0.8/M' },
  { platform: '智谱AI', model: 'GLM-4-Flash', free: '永久免费', price: '¥0.1/M' },
]
</script>

<template>
  <section class="section">
    <div class="container models-page">
      <!-- Hero -->
      <section class="detail-hero">
        <div class="card hero-main">
          <p class="eyebrow">模型选择</p>
          <h1 class="section-title">如何选择最适合的模型</h1>
          <p class="section-copy">
            模型费用才是大头。选平台时重点看模型套餐价格，而不是只看服务器价格。
          </p>
        </div>

        <aside class="card hero-side">
          <div class="signal-panel">
            <span class="mini-label">核心原则</span>
            <strong>先确定默认模型</strong>
            <p>先跑通完整最小链路，再考虑多模型策略。</p>
          </div>
          <div class="signal-panel">
            <span class="mini-label">成本陷阱</span>
            <strong>对话历史无限增长</strong>
            <p>100轮对话后，历史可能消耗 20,000+ tokens。</p>
          </div>
        </aside>
      </section>

      <!-- 模型对比 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Models</p>
          <h2>主流模型对比</h2>
          <p class="section-copy">按提供商分类，快速找到适合你的模型。</p>
        </div>

        <div class="categories-grid">
          <article v-for="cat in modelCategories" :key="cat.title" class="category-block">
            <div class="category-header">
              <h3>{{ cat.title }}</h3>
              <span class="provider-tag">{{ cat.provider }}</span>
            </div>
            <p class="category-desc">{{ cat.description }}</p>
            <div class="models-list">
              <article 
                v-for="model in cat.models" 
                :key="model.id"
                class="model-item"
                :class="{ best: model.best }"
              >
                <div class="model-header">
                  <span class="model-name">{{ model.name }}</span>
                  <span v-if="model.best" class="best-tag">推荐</span>
                </div>
                <div class="model-features">
                  <span v-for="f in model.features" :key="f" class="feature-tag">{{ f }}</span>
                </div>
                <div class="model-meta">
                  <span class="price">输入/输出: {{ model.price }}</span>
                  <span class="use-case">{{ model.useCase }}</span>
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <!-- 智能路由 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Routing</p>
          <h2>智能模型路由配置</h2>
          <p class="section-copy">根据任务类型自动选择最优模型。</p>
        </div>

        <div class="routing-grid">
          <article v-for="ex in routingExamples" :key="ex.title" class="routing-card">
            <h4>{{ ex.title }}</h4>
            <p>{{ ex.desc }}</p>
            <pre class="code-block"><code>{{ ex.code }}</code></pre>
          </article>
        </div>
      </section>

      <!-- 成本优化 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Cost Optimization</p>
          <h2>成本优化五大技巧</h2>
          <p class="section-copy">真正省钱的是这些细节。</p>
        </div>

        <div class="tips-grid">
          <article v-for="tip in costTips" :key="tip.title" class="tip-item">
            <h4>{{ tip.title }}</h4>
            <span class="saving">{{ tip.saving }}</span>
            <p>{{ tip.desc }}</p>
          </article>
        </div>
      </section>

      <!-- 预算方案 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Budget Plans</p>
          <h2>五大场景预算方案</h2>
          <p class="section-copy">根据你的预算和场景选择配置。</p>
        </div>

        <div class="plans-grid">
          <article v-for="plan in budgetPlans" :key="plan.title" class="plan-card">
            <div class="plan-header">
              <h4>{{ plan.title }}</h4>
              <span class="budget">{{ plan.budget }}</span>
            </div>
            <div class="plan-models">
              <div class="model-row">
                <span class="label">主力:</span>
                <span>{{ plan.primary }}</span>
              </div>
              <div class="model-row">
                <span class="label">备用:</span>
                <span>{{ plan.secondary }}</span>
              </div>
            </div>
            <div class="plan-capacity">{{ plan.capacity }}</div>
          </article>
        </div>
      </section>

      <!-- Coding Plan -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Coding Plan</p>
          <h2>国内 Coding Plan 对比</h2>
          <p class="section-copy">国内模型厂商的开发者优惠计划。</p>
        </div>

        <div class="coding-plans-list">
          <article v-for="plan in codingPlans" :key="plan.platform" class="coding-plan-item">
            <span class="platform">{{ plan.platform }}</span>
            <span class="model">{{ plan.model }}</span>
            <span class="free">{{ plan.free }}</span>
            <span class="price">{{ plan.price }}</span>
          </article>
        </div>
      </section>

      <!-- ROI -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">ROI</p>
          <h2>ROI 计算公式</h2>
        </div>

        <div class="roi-block">
          <code class="formula">ROI = (产生的收益 - 模型成本) / 模型成本 × 100%</code>
        </div>

        <div class="roi-example">
          <h4>示例：自动生成产品描述</h4>
          <ul>
            <li><strong>产出：</strong>每条描述售价¥2，每天生成500条 = ¥1000/天</li>
            <li><strong>成本：</strong>GPT-4o-mini处理500条，约¥3/天</li>
            <li><strong>ROI：</strong>(1000-3)/3 × 100% = <strong class="highlight">33,233%</strong></li>
          </ul>
        </div>

        <div class="roi-principle">
          <p>原则：只要 ROI > 100%，就值得用模型。问题不是"哪个模型贵"，而是"哪个模型给你产生的价值最大"。</p>
        </div>
      </section>

      <!-- 相关链接 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Related</p>
          <h2>继续深入</h2>
        </div>

        <div class="related-grid">
          <NuxtLink to="/docs/manual/models-overview" class="related-link">
            <span class="tag">Docs</span>
            <strong>模型层理解</strong>
            <p>理解 OpenClaw 里模型层的角色。</p>
          </NuxtLink>
          <NuxtLink to="/docs/operations/model-strategy-and-cost" class="related-link">
            <span class="tag">Ops</span>
            <strong>模型策略与成本</strong>
            <p>运维层面的模型配置指南。</p>
          </NuxtLink>
          <NuxtLink to="/docs/manual/providers-and-fallback" class="related-link">
            <span class="tag">Config</span>
            <strong>提供商与 Fallback</strong>
            <p>多模型冗余配置。</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.models-page {
  display: grid;
  gap: 28px;
}

.detail-hero {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 22px;
  align-items: start;
}

.hero-main,
.hero-side {
  display: grid;
  gap: 16px;
}

.signal-panel {
  display: grid;
  gap: 8px;
}

.signal-panel + .signal-panel {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-panel {
  display: grid;
  gap: 18px;
}

.section-head {
  display: grid;
  gap: 4px;
}

.section-head h2 {
  margin: 0;
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: clamp(1.22rem, 1.6vw, 1.54rem);
  line-height: 1.28;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

/* Categories */
.categories-grid {
  display: grid;
  gap: 16px;
}

.category-block {
  padding: 20px;
  border: 1px solid rgba(64, 73, 85, 0.1);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.5);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.category-header h3 {
  margin: 0;
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1.16rem;
  line-height: 1.34;
}

.provider-tag {
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(19, 129, 125, 0.1);
  color: var(--brand);
  font-size: 0.75rem;
  font-weight: 600;
}

.category-desc {
  margin: 0 0 12px;
  font-size: 0.92rem;
  color: var(--ink-soft);
  line-height: 1.66;
}

.models-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.model-item {
  padding: 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(64, 73, 85, 0.08);
}

.model-item.best {
  border-color: var(--brand);
  background: rgba(19, 129, 125, 0.05);
}

.model-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.model-name {
  font-weight: 700;
  font-size: 0.94rem;
  line-height: 1.4;
}

.best-tag {
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--brand);
  color: white;
  font-size: 0.65rem;
  font-weight: 600;
}

.model-features {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 8px;
}

.feature-tag {
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(64, 73, 85, 0.06);
  font-size: 0.72rem;
}

.model-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--ink-soft);
}

/* Routing */
.routing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.routing-card {
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(64, 73, 85, 0.1);
}

.routing-card h4 {
  margin: 0 0 4px;
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: 1rem;
  line-height: 1.38;
}

.routing-card p {
  margin: 0 0 12px;
  font-size: 0.9rem;
  color: var(--ink-soft);
  line-height: 1.64;
}

.code-block {
  margin: 0;
  padding: 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
  overflow-x: auto;
}

.code-block code {
  font-size: 0.75rem;
  line-height: 1.5;
}

/* Tips */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.tip-item {
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(64, 73, 85, 0.1);
  text-align: center;
}

.tip-item h4 {
  margin: 0 0 4px;
  font-size: 0.85rem;
}

.tip-item .saving {
  display: block;
  margin-bottom: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--success);
}

.tip-item p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--ink-soft);
}

/* Plans */
.plans-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.plan-card {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.plan-header h4 {
  margin: 0;
  font-size: 0.9rem;
}

.plan-header .budget {
  font-weight: 700;
  color: var(--brand);
  font-size: 0.85rem;
}

.plan-models {
  margin-bottom: 12px;
}

.model-row {
  display: flex;
  gap: 4px;
  font-size: 0.8rem;
  margin-bottom: 4px;
}

.model-row .label {
  color: var(--ink-soft);
}

.plan-capacity {
  font-size: 0.75rem;
  color: var(--brand);
  padding-top: 8px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

/* Coding Plans */
.coding-plans-list {
  display: grid;
  gap: 8px;
}

.coding-plan-item {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 0.6fr;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
  font-size: 0.85rem;
}

.coding-plan-item .platform {
  font-weight: 600;
}

.coding-plan-item .model {
  color: var(--ink-soft);
}

.coding-plan-item .free {
  color: var(--success);
}

.coding-plan-item .price {
  color: var(--ink-soft);
}

/* ROI */
.roi-block {
  padding: 16px;
  border-radius: 12px;
  background: var(--brand);
  text-align: center;
  margin-bottom: 16px;
}

.roi-block .formula {
  color: white;
  font-size: 0.95rem;
}

.roi-example {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
  margin-bottom: 12px;
}

.roi-example h4 {
  margin: 0 0 8px;
}

.roi-example ul {
  margin: 0;
  padding-left: 20px;
}

.roi-example li {
  margin-bottom: 4px;
  font-size: 0.88rem;
}

.roi-example .highlight {
  color: var(--success);
  font-weight: 700;
}

.roi-principle {
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(19, 129, 125, 0.05);
  border-left: 3px solid var(--brand);
}

.roi-principle p {
  margin: 0;
  font-weight: 500;
  font-size: 0.9rem;
}

/* Related */
.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.related-link {
  display: grid;
  gap: 8px;
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.related-link:hover {
  transform: translateY(-2px);
  border-color: rgba(12, 108, 105, 0.22);
}

.related-link strong {
  font-family: "Fraunces", serif;
  font-size: 0.95rem;
}

.related-link p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--ink-soft);
}

@media (max-width: 1100px) {
  .detail-hero,
  .routing-grid {
    grid-template-columns: 1fr;
  }

  .tips-grid,
  .plans-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .tips-grid,
  .plans-grid {
    grid-template-columns: 1fr;
  }

  .coding-plan-item {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .models-list {
    grid-template-columns: 1fr;
  }
}
</style>
