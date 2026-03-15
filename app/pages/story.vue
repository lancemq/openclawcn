<script setup lang="ts">
useSeo({
  title: 'OpenClaw 背景故事',
  description: '从一小时原型到改变世界：Peter Steinberger 的创业故事、命名大战、加入 OpenAI 的历程。',
  path: '/story',
})

const timeline = [
  {
    date: '2025年11月',
    title: '项目诞生',
    description: 'Peter Steinberger 以「周末项目」发布 ClawdBot，名字致敬 Anthropic 的 Claude（Claw=爪子），选了龙虾作为吉祥物。',
    icon: '🦞',
  },
  {
    date: '2026年1月中旬',
    title: '爆发式增长',
    description: '72小时内获得6万 Stars，某天单日增长9,000 Stars，意味着平均每10秒就有一个开发者点下 Star。',
    icon: '🚀',
  },
  {
    date: '2026年1月27日',
    title: 'Anthropic 商标警告',
    description: '因名称与 Claude 过于相似，被迫改名 Moltbot（Molt=龙虾蜕壳）。',
    icon: '⚠️',
  },
  {
    date: '2026年1月30日',
    title: '再次改名 OpenClaw',
    description: '强调开源属性，保留龙虾主题。',
    icon: '✨',
  },
  {
    date: '2026年2月初',
    title: '安全危机双重爆发',
    description: 'CVE-2026-25253 RCE漏洞被发现（CVSS 8.8/10），同期 ClawHavoc 供应链攻击爆发。',
    icon: '🔒',
  },
  {
    date: '2026年2月14日',
    title: '创始人加入 OpenAI',
    description: 'Peter Steinberger 宣布加入 OpenAI。Sam Altman 亲自发推欢迎，称他为「genius」。',
    icon: '🎉',
  },
  {
    date: '2026年3月3日',
    title: '正式登顶 GitHub',
    description: 'Stars 超过 250K，超越 React 成为 GitHub 全球第一软件项目。',
    icon: '🏆',
  },
  {
    date: '2026年3月6日',
    title: '深圳全民养虾',
    description: '深圳腾讯云总部近千人排队体验 OpenClaw 安装，「全民养虾」登上新闻头条。',
    icon: '🌏',
  },
]

const growthComparison = [
  { project: 'React', time: '10年以上' },
  { project: 'Vue', time: '7年以上' },
  { project: 'TensorFlow', time: '5年以上' },
  { project: 'OpenClaw', time: '不到4个月', highlight: true },
]

const quotes = [
  {
    text: '我骨子里是个建造者。我想改变世界，而不是建一家大公司。',
    author: 'Peter Steinberger',
    context: '关于创业动机',
  },
  {
    text: '当你早上醒来没有任何期待、没有真正的挑战，会非常无聊。我不推荐"努力工作然后退休"的计划。',
    author: 'Peter Steinberger',
    context: 'Lex Fridman Podcast #491',
  },
]

const namingHistory = [
  { name: 'OpenCloud', status: 'failed', reason: '收到云服务商商标压力' },
  { name: 'Clade', status: 'failed', reason: '收到 Anthropic 法务团队邮件' },
  { name: 'Moltbot', status: 'failed', reason: '消息泄露，账号被抢注' },
  { name: 'OpenClaw', status: 'success', reason: '最终定名' },
]

const keyMoments = [
  {
    title: '从 PSPDFKit 到倦怠退休',
    content: 'Peter 花了 13 年时间将 PSPDFKit 从一个 PDF 显示库发展为一家运行在 10 亿台设备上的企业级产品公司。13年后，以一个好价格把公司卖掉，然后「精疲力竭地退休了」。',
  },
  {
    title: '一小时原型的诞生',
    content: '2025年11月，他坐下来写了第一行代码。整个原型用了一个小时：用 WhatsApp 的非官方 API 做消息入口，把消息传给 Claude Code CLI，CLI 执行后回传 WhatsApp。',
  },
  {
    title: '马拉喀什的顿悟时刻',
    content: 'Bot 没有内置语音识别功能——但它没有回复「我不支持语音」。它自己识别音频格式、尝试转换、调用 Whisper API 转录，全程约9秒。Peter：「我完全没有构建这个功能。它自己想出来的。」',
  },
]

const options = [
  { title: '自己继续做', desc: '宁静生活，不融资', note: '第一选择，但太孤独' },
  { title: '成立公司融资', desc: '可能融资数亿美元', note: '不想重蹈13年覆辙' },
  { title: '加入大厂', desc: '项目保持开源', note: '最终选择', highlight: true },
]

const moltbookStats = [
  { value: '32,912', label: '注册 AI Agent' },
  { value: '2,364', label: '子社区' },
  { value: '3,130', label: '帖子' },
  { value: '22,046', label: '评论' },
]
</script>

<template>
  <section class="section">
    <div class="container story-page">
      <!-- Hero -->
      <section class="detail-hero">
        <div class="card hero-main">
          <p class="eyebrow">背景故事</p>
          <h1 class="section-title">从一小时原型到改变世界</h1>
          <p class="section-copy">
            OpenClaw 是如何在不到4个月内成为 GitHub 全球第一软件项目的？这是一个关于技术、社区和时代机遇的故事。
          </p>
        </div>

        <aside class="card hero-side">
          <div class="signal-panel">
            <span class="mini-label">创始人</span>
            <strong>Peter Steinberger</strong>
            <p>奥地利开发者，iOS/macOS 开发圈知名人物，PSPDFKit 创始人。</p>
          </div>
          <div class="signal-panel">
            <span class="mini-label">里程碑</span>
            <strong>278,932 Stars</strong>
            <p>不到4个月超越 React，成为 GitHub 全球第一软件项目。</p>
          </div>
        </aside>
      </section>

      <!-- 创始人故事 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Founder Story</p>
          <h2>创始人故事</h2>
        </div>

        <div class="moments-grid">
          <article v-for="moment in keyMoments" :key="moment.title" class="moment-card">
            <h3>{{ moment.title }}</h3>
            <p>{{ moment.content }}</p>
          </article>
        </div>
      </section>

      <!-- Peter 的哲学 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Philosophy</p>
          <h2>Peter 的哲学</h2>
        </div>

        <div class="quotes-grid">
          <article v-for="quote in quotes" :key="quote.text" class="quote-card">
            <blockquote>{{ quote.text }}</blockquote>
            <cite>— {{ quote.author }}</cite>
            <span class="context">{{ quote.context }}</span>
          </article>
        </div>
      </section>

      <!-- 命名大战 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Naming War</p>
          <h2>命名大战：从 ClawdBot 到 OpenClaw</h2>
          <p class="section-copy">OpenClaw 的名字经历了一段堪称惊险的历史。</p>
        </div>

        <div class="naming-timeline">
          <article 
            v-for="item in namingHistory" 
            :key="item.name"
            class="naming-item"
            :class="{ success: item.status === 'success' }"
          >
            <code class="name">{{ item.name }}</code>
            <span class="status">{{ item.status === 'success' ? '✓ 成功' : '✗ 失败' }}</span>
            <span class="reason">{{ item.reason }}</span>
          </article>
        </div>

        <div class="warning-block">
          <h4>⚠️ 最惊心动魄的一幕</h4>
          <p>当计划把账号名原子化地同时迁移到所有平台时，消息泄露了：</p>
          <ul>
            <li><strong>5秒内：</strong>GitHub 账号被抢注并开始传播恶意软件</li>
            <li><strong>30秒内：</strong>Peter 的个人 GitHub 账号被 rename 劫持</li>
            <li><strong>1分钟内：</strong>NPM 包被抢注</li>
          </ul>
          <p class="note">Peter 当时「差点哭出来」，一度想直接删除整个项目。</p>
        </div>
      </section>

      <!-- 加入 OpenAI -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Join OpenAI</p>
          <h2>加入 OpenAI：与 Zuck 和 Sam 的对话</h2>
        </div>

        <div class="options-grid">
          <article 
            v-for="opt in options" 
            :key="opt.title"
            class="option-card"
            :class="{ highlight: opt.highlight }"
          >
            <h4>{{ opt.title }}</h4>
            <p>{{ opt.desc }}</p>
            <span class="note">{{ opt.note }}</span>
          </article>
        </div>

        <div class="conversations-grid">
          <article class="conversation-card">
            <h4>与 Zuckerberg（Meta）</h4>
            <p>Mark 在 WhatsApp 上约他，「现在能打吗？」Peter 回复「等我先写完代码」，Zuck 说「好」。</p>
            <p class="note">两人随后争论了10分钟 Codex vs Claude Code 哪个更好。</p>
          </article>
          <article class="conversation-card">
            <h4>与 Sam Altman（OpenAI）</h4>
            <p>通过 OpenAI 内部人员接触。Peter 说 OpenAI 在 Codex 方面的工作让他有情感认同。</p>
            <p class="note">Meta 出价更高，但 Peter 选择了 OpenAI：「不是为钱，是为了乐趣和影响力。」</p>
          </article>
        </div>
      </section>

      <!-- 时间线 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Timeline</p>
          <h2>完整时间线</h2>
        </div>

        <div class="timeline-list">
          <article v-for="item in timeline" :key="item.date" class="timeline-item">
            <span class="timeline-icon">{{ item.icon }}</span>
            <div class="timeline-content">
              <span class="timeline-date">{{ item.date }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- 增长对比 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Growth</p>
          <h2>增长速度的历史对比</h2>
        </div>

        <div class="comparison-list">
          <article 
            v-for="item in growthComparison" 
            :key="item.project"
            class="comparison-item"
            :class="{ highlight: item.highlight }"
          >
            <span class="project">{{ item.project }}</span>
            <span class="time">达到25万 Stars：{{ item.time }}</span>
          </article>
        </div>
      </section>

      <!-- 养虾文化 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Culture</p>
          <h2>「养虾」文化</h2>
          <p class="section-copy">
            OpenClaw 的吉祥物是龙虾。中文社区将运行和维护 OpenClaw 实例称为「养虾」，用户自称「养虾人」。「你养龙虾了吗？」成了2026年 AI 圈的标准问候语。
          </p>
        </div>

        <div class="culture-points">
          <article class="culture-card">
            <h4>降低传播门槛</h4>
            <p>「养虾」比「部署 AI Agent」更容易向非技术人士解释</p>
          </article>
          <article class="culture-card">
            <h4>制造认同感</h4>
            <p>「养虾人」是一个有边界、有认同的社群</p>
          </article>
          <article class="culture-card">
            <h4>社交货币属性</h4>
            <p>在朋友圈晒「我养了一只虾」比晒「我部署了 OpenClaw」更有趣</p>
          </article>
        </div>

        <div class="moltbook-section">
          <h4>Moltbook：AI Agent 的社交网络</h4>
          <p>OpenClaw 生态中衍生出了一个叫 Moltbook 的社交平台，专供 AI Agent 使用。</p>
          <div class="stats-grid">
            <div v-for="stat in moltbookStats" :key="stat.label" class="stat-item">
              <span class="value">{{ stat.value }}</span>
              <span class="label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 相关链接 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Related</p>
          <h2>继续深入</h2>
        </div>

        <div class="related-grid">
          <NuxtLink to="/docs/getting-started/what-is-openclaw" class="related-link">
            <span class="tag">Overview</span>
            <strong>OpenClaw 是什么</strong>
            <p>理解 OpenClaw 的定位和核心能力。</p>
          </NuxtLink>
          <NuxtLink to="/docs/getting-started/who-is-openclaw-for" class="related-link">
            <span class="tag">Users</span>
            <strong>OpenClaw 适合哪些用户</strong>
            <p>判断 OpenClaw 是否适合你的场景。</p>
          </NuxtLink>
          <NuxtLink to="/community" class="related-link">
            <span class="tag">Community</span>
            <strong>社区与生态</strong>
            <p>加入养虾人社区。</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.story-page {
  display: grid;
  gap: 24px;
}

.detail-hero {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
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
  gap: 16px;
}

.section-head {
  display: grid;
  gap: 4px;
}

.section-head h2 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.4rem;
  line-height: 1.3;
}

/* Moments */
.moments-grid {
  display: grid;
  gap: 12px;
}

.moment-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
}

.moment-card h3 {
  margin: 0 0 8px;
  font-size: 1rem;
}

.moment-card p {
  margin: 0;
  font-size: 0.88rem;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* Quotes */
.quotes-grid {
  display: grid;
  gap: 12px;
}

.quote-card {
  padding: 16px;
  border-left: 3px solid var(--brand);
  border-radius: 0 16px 16px 0;
  background: rgba(255, 255, 255, 0.4);
}

.quote-card blockquote {
  margin: 0 0 8px;
  font-size: 1rem;
  font-style: italic;
  line-height: 1.5;
}

.quote-card cite {
  font-weight: 600;
  color: var(--brand);
}

.quote-card .context {
  display: block;
  margin-top: 4px;
  font-size: 0.8rem;
  color: var(--ink-soft);
}

/* Naming */
.naming-timeline {
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
}

.naming-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.4);
  border-left: 3px solid var(--error);
}

.naming-item.success {
  border-left-color: var(--success);
  background: rgba(34, 197, 94, 0.05);
}

.naming-item .name {
  font-weight: 600;
}

.naming-item .status {
  font-size: 0.8rem;
  font-weight: 600;
}

.naming-item .reason {
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.warning-block {
  padding: 16px;
  border-radius: 16px;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.warning-block h4 {
  margin: 0 0 8px;
  color: var(--error);
}

.warning-block p {
  margin: 0 0 8px;
  font-size: 0.88rem;
}

.warning-block ul {
  margin: 8px 0;
  padding-left: 20px;
}

.warning-block li {
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.warning-block .note {
  font-style: italic;
  color: var(--ink-soft);
}

/* Options */
.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.option-card {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
  text-align: center;
}

.option-card.highlight {
  border-color: var(--brand);
  background: rgba(19, 129, 125, 0.05);
}

.option-card h4 {
  margin: 0 0 4px;
  font-size: 0.95rem;
}

.option-card p {
  margin: 0 0 8px;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.option-card .note {
  font-size: 0.75rem;
  font-style: italic;
}

/* Conversations */
.conversations-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.conversation-card {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
}

.conversation-card h4 {
  margin: 0 0 8px;
  color: var(--brand);
  font-size: 0.95rem;
}

.conversation-card p {
  margin: 0 0 8px;
  font-size: 0.88rem;
}

.conversation-card .note {
  font-size: 0.8rem;
  font-style: italic;
  color: var(--ink-soft);
}

/* Timeline */
.timeline-list {
  display: grid;
  gap: 8px;
}

.timeline-item {
  display: flex;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
}

.timeline-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.timeline-content {
  flex: 1;
}

.timeline-date {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--brand);
}

.timeline-content h3 {
  margin: 4px 0;
  font-size: 0.95rem;
}

.timeline-content p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

/* Comparison */
.comparison-list {
  display: grid;
  gap: 8px;
}

.comparison-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
}

.comparison-item.highlight {
  border-color: var(--brand);
  background: rgba(19, 129, 125, 0.05);
}

.comparison-item .project {
  font-weight: 600;
}

.comparison-item .time {
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.comparison-item.highlight .project,
.comparison-item.highlight .time {
  color: var(--brand);
  font-weight: 600;
}

/* Culture */
.culture-points {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.culture-card {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
  text-align: center;
}

.culture-card h4 {
  margin: 0 0 8px;
  font-size: 0.9rem;
}

.culture-card p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.moltbook-section {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
}

.moltbook-section h4 {
  margin: 0 0 8px;
}

.moltbook-section > p {
  margin: 0 0 16px;
  font-size: 0.88rem;
  color: var(--ink-soft);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-item {
  text-align: center;
}

.stat-item .value {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--brand);
}

.stat-item .label {
  font-size: 0.75rem;
  color: var(--ink-soft);
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

@media (max-width: 980px) {
  .detail-hero {
    grid-template-columns: 1fr;
  }

  .options-grid,
  .conversations-grid,
  .culture-points,
  .related-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>