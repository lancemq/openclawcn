<script setup lang="ts">
useSeo({
  title: 'OpenClaw 背景故事',
  description: '从一小时原型到改变世界：Peter Steinberger 的创业故事、命名大战、加入 OpenAI 的历程。',
  path: '/story',
})

const signalStats = [
  { value: '1 小时', label: '第一版原型搭建时间' },
  { value: '< 4 个月', label: '冲上 GitHub 第一所用时间' },
  { value: '250K+', label: '2026 年 3 月突破 Stars' },
]

const storyAngles = [
  {
    title: '不是“创业励志故事”，而是产品时机故事',
    description: 'OpenClaw 的爆发不只因为创始人厉害，更因为它踩中了 Agent 工具从实验走向大众的那个窗口期。',
    kind: 'pulse' as const,
  },
  {
    title: '不是“功能堆叠”，而是体验阈值被突然击穿',
    description: '一小时可跑通、聊天式交互、能看见结果，这几件事叠在一起，瞬间改变了普通开发者的尝试成本。',
    kind: 'flow' as const,
  },
  {
    title: '不是“单点开源项目”，而是社区叙事引擎',
    description: '从养虾到 Moltbook，项目很快拥有了自己的行话、梗文化和传播仪式感，形成了更强的社交外溢。',
    kind: 'orbit' as const,
  },
]

const founderMoments = [
  {
    title: '13 年公司经营之后的空窗',
    content: 'Peter 把 PSPDFKit 做成运行在 10 亿设备上的企业产品，也因此完整经历了规模化公司带来的管理疲劳。他卖掉公司后没有立刻再创业，而是先进入了一段重新寻找挑战感的时期。',
  },
  {
    title: '“先能跑起来”优先于完美设计',
    content: 'OpenClaw 的第一版并不是一套宏大架构，而是一个用 WhatsApp 作为入口、再接 Claude Code CLI 的极简原型。正因为它轻，所以它很快；正因为它很快，所以它被真实世界验证。',
  },
  {
    title: '旅行途中意识到 Agent 已经跨过拐点',
    content: '马拉喀什那次语音输入事件很关键。系统在没有预置功能的情况下，自行想办法识别、转换、调用转录链路，给创始人带来了“它开始自己找路”的震感。',
  },
]

const quoteHighlights = [
  {
    text: '我骨子里是个建造者。我想改变世界，而不是建一家大公司。',
    author: 'Peter Steinberger',
    context: '关于为什么不愿意再次进入传统创业路径',
  },
  {
    text: '当你早上醒来没有任何期待、没有真正的挑战，会非常无聊。',
    author: 'Peter Steinberger',
    context: 'Lex Fridman Podcast #491',
  },
]

const timeline = [
  {
    date: '2025 年 11 月',
    title: 'ClawdBot 作为周末项目发布',
    description: '名字借了 Claude 的语义联想，龙虾吉祥物在这个阶段就已经成形，项目从一开始就带着鲜明人格。',
    kind: 'spark' as const,
    tone: 'accent' as const,
  },
  {
    date: '2026 年 1 月中旬',
    title: '72 小时内暴涨 6 万 Stars',
    description: '增长速度让 OpenClaw 从“圈内热门项目”直接变成“全行业都要知道它”的现象级仓库。',
    kind: 'pulse' as const,
    tone: 'brand' as const,
  },
  {
    date: '2026 年 1 月 27 日',
    title: '收到 Anthropic 商标警告',
    description: '项目必须临时更名为 Moltbot，团队第一次意识到命名本身就是一场产品危机。',
    kind: 'shield' as const,
    tone: 'muted' as const,
  },
  {
    date: '2026 年 1 月 30 日',
    title: '正式定名 OpenClaw',
    description: 'Open 和 Claw 把开源属性与龙虾意象同时保住，这个名字也更容易承载后续社区叙事。',
    kind: 'grid' as const,
    tone: 'accent' as const,
  },
  {
    date: '2026 年 2 月初',
    title: '漏洞与供应链攻击同时爆发',
    description: '安全事件迫使项目从“快增长”快速切换到“高压治理”，也让社区第一次认真面对 Agent 工具链的风险。',
    kind: 'shield' as const,
    tone: 'brand' as const,
  },
  {
    date: '2026 年 2 月 14 日',
    title: 'Peter 宣布加入 OpenAI',
    description: '在 Meta 更高报价的对照下，他最终选择了更符合个人技术判断与乐趣感的组织。',
    kind: 'orbit' as const,
    tone: 'brand' as const,
  },
  {
    date: '2026 年 3 月 3 日',
    title: 'Stars 超过 25 万，登顶 GitHub',
    description: 'OpenClaw 从热门项目完成跃迁，进入“历史级软件现象”的讨论范围。',
    kind: 'stack' as const,
    tone: 'accent' as const,
  },
  {
    date: '2026 年 3 月 6 日',
    title: '深圳“全民养虾”成为新闻事件',
    description: 'OpenClaw 已经不只是 GitHub 上的仓库，而是一种跨越开发者圈层的流行文化符号。',
    kind: 'flow' as const,
    tone: 'muted' as const,
  },
]

const namingHistory = [
  {
    name: 'OpenCloud',
    status: 'failed',
    reason: '与云服务领域已有品牌冲突，无法继续推进。',
    note: '想法对，但太泛。',
  },
  {
    name: 'Clade',
    status: 'failed',
    reason: '收到 Anthropic 法务邮件，品牌边界风险过高。',
    note: '语义聪明，但风险不可控。',
  },
  {
    name: 'Moltbot',
    status: 'failed',
    reason: '更名方案在执行时泄露，多个关键平台账号被瞬间抢注。',
    note: '最接近成功，也最接近崩盘。',
  },
  {
    name: 'OpenClaw',
    status: 'success',
    reason: '保留龙虾意象、强化开源属性，也更利于社区传播。',
    note: '最终稳定品牌名。',
  },
]

const namingIncident = [
  { time: '5 秒内', detail: 'GitHub 账号被抢注并开始传播恶意软件。' },
  { time: '30 秒内', detail: 'Peter 的个人 GitHub rename 受到劫持影响。' },
  { time: '1 分钟内', detail: 'NPM 包被同步抢注，供应链风险急剧放大。' },
]

const decisionTracks = [
  {
    title: '自己继续做',
    description: '保留自由度，不融资，不扩大组织规模。',
    note: '最符合生活理想，但太孤独。',
  },
  {
    title: '成立公司融资',
    description: '有机会拿到数亿美元融资，做出新一代 AI 平台公司。',
    note: '路径熟悉，但也是他最不想回去的一条路。',
  },
  {
    title: '加入大厂',
    description: '让项目继续开源，自己把精力投入更大的技术平台。',
    note: '最终选择。不是因为钱，而是因为节奏、乐趣与影响力。',
    highlight: true,
  },
]

const growthComparison = [
  { project: 'React', time: '10 年以上' },
  { project: 'Vue', time: '7 年以上' },
  { project: 'TensorFlow', time: '5 年以上' },
  { project: 'OpenClaw', time: '不到 4 个月', highlight: true },
]

const growthDrivers = [
  {
    title: '体验门槛突然变低',
    description: '从命令行实验到聊天交互，更多人第一次能“看着 Agent 干活”。',
  },
  {
    title: '产品人格异常鲜明',
    description: '龙虾、养虾、Moltbook 这些符号，让它不是冰冷技术名词，而是可复述的故事。',
  },
  {
    title: '传播天然适合社交媒体',
    description: '截图、演示、夸张增长数字、命名风波，本身就适合被转发和讨论。',
  },
  {
    title: '社区提供了二次扩散能力',
    description: '插件、触发器、案例和教程层层叠加，让 OpenClaw 很快从项目变成生态。',
  },
]

const culturePoints = [
  {
    title: '“养虾”把复杂部署变成生活化动作',
    description: '相比“部署 AI Agent”，“养一只虾”显然更容易被朋友圈、播客和群聊传播。',
  },
  {
    title: '社群身份比产品功能更先形成',
    description: '人们先成为“养虾人”，再慢慢理解它背后的模型、技能和工作流系统。',
  },
  {
    title: '中文社区放大了这个梗的感染力',
    description: '从深圳排队体验到各类教程、直播和二创内容，OpenClaw 在中文互联网迅速长出自己的在地表达。',
  },
]

const moltbookStats = [
  { value: '32,912', label: '注册 AI Agent' },
  { value: '2,364', label: '子社区' },
  { value: '3,130', label: '帖子' },
  { value: '22,046', label: '评论' },
]

const relatedLinks = [
  {
    to: '/docs/getting-started/what-is-openclaw',
    tag: 'Overview',
    title: 'OpenClaw 是什么',
    description: '用更系统的方式理解 OpenClaw 的定位、能力和边界。',
  },
  {
    to: '/ecosystem',
    tag: 'Ecosystem',
    title: '扩展与生态',
    description: '继续看 OpenClaw 的插件、工作流、社群工具和扩展方向。',
  },
  {
    to: '/showcase',
    tag: 'Showcase',
    title: '真实案例与实践',
    description: '看这个项目是如何从热度走向使用场景与团队落地的。',
  },
]
</script>

<template>
  <section class="section story-shell">
    <div class="container story-page series-page">
      <section class="series-hero story-hero">
        <div class="card series-main story-hero-main">
          <div class="story-kicker-row">
            <span class="series-kicker">Story Chronicle</span>
            <span class="story-period">2025.11 - 2026.03</span>
          </div>

          <div class="story-headline">
            <p class="eyebrow">背景故事</p>
            <h1 class="section-title">从一小时原型到全球现象级软件项目</h1>
            <p class="section-copy">
              这不是一条普通的开源增长曲线。OpenClaw 的崛起同时包含创始人的二次选择、AI Agent
              的产品拐点、命名危机、安全事件，以及中文社区把技术项目改造成文化符号的全过程。
            </p>
          </div>

          <div class="story-highlight-band">
            <article
              v-for="angle in storyAngles"
              :key="angle.title"
              class="story-highlight-card"
            >
              <SeriesGlyph :kind="angle.kind" tone="accent" small />
              <div>
                <strong>{{ angle.title }}</strong>
                <p>{{ angle.description }}</p>
              </div>
            </article>
          </div>
        </div>

        <aside class="card series-side story-hero-side">
          <div class="series-signal">
            <span class="series-kicker">Founder</span>
            <strong>Peter Steinberger</strong>
            <p>PSPDFKit 创始人，经历过长期创业、出售公司和短暂退休后，再次被 AI Agent 的可能性点燃。</p>
          </div>

          <div class="series-signal">
            <span class="series-kicker">Status</span>
            <strong>开源项目，文化事件，行业分水岭</strong>
            <p>OpenClaw 爆火的意义并不只在 Star 数，而是它把 Agent 从“会写代码的工具”变成了大众可感知的产品品类。</p>
          </div>

          <div class="hero-stat-stack">
            <article v-for="stat in signalStats" :key="stat.label" class="series-stat-card">
              <span class="series-stat-value">{{ stat.value }}</span>
              <p>{{ stat.label }}</p>
            </article>
          </div>
        </aside>
      </section>

      <section class="card series-panel story-opening">
        <div class="series-head">
          <div>
            <p class="eyebrow">Why This Story Matters</p>
            <h2>一个项目为什么会在这么短时间里成为时代切面</h2>
          </div>
          <div class="series-tag-row">
            <span class="series-tag highlight">Builder</span>
            <span class="series-tag">Open Source</span>
            <span class="series-tag">Culture</span>
            <span class="series-tag">AI Agents</span>
          </div>
        </div>

        <div class="story-opening-grid">
          <div class="story-editorial">
            <p>
              如果把 OpenClaw 仅仅看作一个“增长极快的 GitHub 项目”，就会低估这件事真正的分量。它的重要性在于，它让一大批人第一次以低门槛、强反馈、可分享的方式接触到 Agent 工作流。
            </p>
            <p>
              Peter 本人的经历又让这件事多出一层张力: 这是一个已经赢过一次、也厌倦过一次的人，再次选择投入构建的故事。所以它既有关技术，也有关人在技术浪潮里怎样重新确认自己。
            </p>
          </div>

          <div class="story-fast-facts">
            <article class="story-fact-card">
              <span class="story-fact-label">原型入口</span>
              <strong>WhatsApp + Claude Code CLI</strong>
              <p>不是复杂产品体系，而是一个极简可运行链路。</p>
            </article>
            <article class="story-fact-card">
              <span class="story-fact-label">转折信号</span>
              <strong>语音消息被系统自主处理</strong>
              <p>创始人第一次感到 Agent 在真实环境里“会自己找路”。</p>
            </article>
            <article class="story-fact-card">
              <span class="story-fact-label">文化破圈</span>
              <strong>“养虾”成为中文社区共同语言</strong>
              <p>这一步让 OpenClaw 从工具名变成了社会化传播符号。</p>
            </article>
          </div>
        </div>
      </section>

      <section class="story-dual-grid">
        <section class="card series-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">Founder Arc</p>
              <h2>创始人的三段弧线</h2>
            </div>
          </div>

          <div class="series-grid-3 story-moments-grid">
            <article v-for="moment in founderMoments" :key="moment.title" class="series-card story-moment-card">
              <h3>{{ moment.title }}</h3>
              <p>{{ moment.content }}</p>
            </article>
          </div>
        </section>

        <section class="card series-panel quote-column">
          <div class="series-head">
            <div>
              <p class="eyebrow">Voice</p>
              <h2>Peter 的判断与性格</h2>
            </div>
          </div>

          <article v-for="quote in quoteHighlights" :key="quote.text" class="story-quote-card">
            <blockquote>{{ quote.text }}</blockquote>
            <footer>
              <strong>{{ quote.author }}</strong>
              <span>{{ quote.context }}</span>
            </footer>
          </article>
        </section>
      </section>

      <section class="card series-panel story-timeline-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Timeline</p>
            <h2>不到四个月里发生了什么</h2>
          </div>
          <span class="timeline-caption">从项目原型到 GitHub 第一，再到文化现象。</span>
        </div>

        <div class="story-timeline">
          <article
            v-for="(item, index) in timeline"
            :key="item.date"
            class="story-timeline-item"
            :class="{ reverse: index % 2 === 1 }"
          >
            <div class="story-timeline-node">
              <SeriesGlyph :kind="item.kind" :tone="item.tone" />
            </div>
            <div class="story-timeline-card">
              <span class="story-timeline-date">{{ item.date }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="story-dual-grid story-middle-grid">
        <section class="card series-panel naming-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">Naming War</p>
              <h2>名字差点把项目拖进深坑</h2>
            </div>
          </div>

          <div class="naming-ladder">
            <article
              v-for="item in namingHistory"
              :key="item.name"
              class="naming-step"
              :class="{ success: item.status === 'success' }"
            >
              <div class="naming-step-top">
                <code>{{ item.name }}</code>
                <span>{{ item.status === 'success' ? '最终采用' : '放弃' }}</span>
              </div>
              <p>{{ item.reason }}</p>
              <small>{{ item.note }}</small>
            </article>
          </div>

          <div class="naming-incident">
            <strong>更名泄露后的 60 秒</strong>
            <div class="incident-list">
              <article v-for="item in namingIncident" :key="item.time" class="incident-card">
                <span>{{ item.time }}</span>
                <p>{{ item.detail }}</p>
              </article>
            </div>
          </div>
        </section>

        <section class="card series-panel decision-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">Decision</p>
              <h2>为什么最后是 OpenAI</h2>
            </div>
          </div>

          <div class="decision-stack">
            <article
              v-for="track in decisionTracks"
              :key="track.title"
              class="decision-card"
              :class="{ highlight: track.highlight }"
            >
              <div class="decision-card-top">
                <strong>{{ track.title }}</strong>
                <span>{{ track.highlight ? 'Final' : 'Option' }}</span>
              </div>
              <p>{{ track.description }}</p>
              <small>{{ track.note }}</small>
            </article>
          </div>

          <div class="conversation-strip">
            <article class="conversation-card">
              <span class="series-kicker">Meta</span>
              <strong>和 Zuckerberg 的对话很直接</strong>
              <p>消息发在 WhatsApp，语气像开发者之间的快速确认。Meta 给得更高，但并没有改变 Peter 对未来几年工作方式的判断。</p>
            </article>
            <article class="conversation-card">
              <span class="series-kicker">OpenAI</span>
              <strong>真正打动他的是方向一致</strong>
              <p>Peter 更看重 Codex 所代表的产品方向和创造乐趣。他最后选的是“更想参与的未来”，而不是单纯更大的报价。</p>
            </article>
          </div>
        </section>
      </section>

      <section class="card series-panel growth-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Why It Exploded</p>
            <h2>为什么 OpenClaw 会爆成这样</h2>
          </div>
        </div>

        <div class="growth-grid">
          <div class="series-grid-2 growth-drivers">
            <article v-for="driver in growthDrivers" :key="driver.title" class="series-card">
              <h3>{{ driver.title }}</h3>
              <p>{{ driver.description }}</p>
            </article>
          </div>

          <div class="growth-comparison-board">
            <strong>达到 25 万 Stars 的速度对比</strong>
            <div class="comparison-stack">
              <article
                v-for="item in growthComparison"
                :key="item.project"
                class="comparison-row"
                :class="{ highlight: item.highlight }"
              >
                <span>{{ item.project }}</span>
                <b>{{ item.time }}</b>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="story-dual-grid story-culture-grid">
        <section class="card series-panel culture-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">Culture</p>
              <h2>“养虾”如何让它走出技术圈</h2>
            </div>
          </div>

          <div class="culture-layout">
            <article v-for="point in culturePoints" :key="point.title" class="culture-card">
              <h3>{{ point.title }}</h3>
              <p>{{ point.description }}</p>
            </article>
          </div>
        </section>

        <section class="card series-panel moltbook-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">Moltbook</p>
              <h2>从项目到社交生态</h2>
            </div>
          </div>

          <p class="moltbook-copy">
            Moltbook 让“Agent 与 Agent 的社区”这件事从玩笑概念变成了真实产品，也进一步加深了 OpenClaw 的世界观完整度。
          </p>

          <div class="series-grid-2 moltbook-stats">
            <article v-for="stat in moltbookStats" :key="stat.label" class="series-stat-card">
              <span class="series-stat-value">{{ stat.value }}</span>
              <p>{{ stat.label }}</p>
            </article>
          </div>
        </section>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">交叉访问</p>
            <h2>继续把这段故事放回产品、生态和案例结构里</h2>
            <p class="section-copy">故事页负责解释“为什么会发生”，如果你准备继续看产品、生态或实际落地，就从这些入口切出去。</p>
          </div>
        </div>

        <div class="series-grid-3">
          <NuxtLink
            v-for="link in relatedLinks"
            :key="link.to"
            :to="link.to"
            class="series-link-card story-related-card"
          >
            <span class="series-tag">{{ link.tag }}</span>
            <strong>{{ link.title }}</strong>
            <p>{{ link.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.story-shell {
  background:
    radial-gradient(circle at top left, rgba(12, 108, 105, 0.08), transparent 26%),
    radial-gradient(circle at 92% 12%, rgba(166, 111, 44, 0.12), transparent 22%),
    linear-gradient(180deg, rgba(247, 240, 228, 0.52), rgba(255, 251, 244, 0));
}

.story-page {
  gap: 28px;
}

.story-hero-main {
  position: relative;
  overflow: hidden;
}

.story-hero-main::after {
  content: "";
  position: absolute;
  inset: auto -8% -28% auto;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(12, 108, 105, 0.16), transparent 68%);
  pointer-events: none;
}

.story-kicker-row,
.decision-card-top,
.naming-step-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.story-period,
.timeline-caption,
.story-fact-label,
.incident-card span,
.decision-card-top span,
.naming-step-top span {
  font-size: 0.76rem;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.story-headline {
  display: grid;
  gap: 10px;
  max-width: 44rem;
}

.story-highlight-band {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.story-highlight-card,
.story-fact-card,
.comparison-row,
.incident-card,
.conversation-card,
.culture-card {
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.54);
}

.story-highlight-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  padding: 16px;
  border-radius: 18px;
}

.story-highlight-card strong,
.story-fact-card strong,
.story-moment-card h3,
.growth-panel h3,
.culture-card h3 {
  margin: 0 0 6px;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.story-highlight-card p,
.story-editorial p,
.story-fact-card p,
.story-quote-card footer span,
.story-timeline-card p,
.naming-step p,
.decision-card p,
.conversation-card p,
.growth-panel p,
.culture-card p,
.moltbook-copy {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.68;
}

.hero-stat-stack,
.decision-stack,
.conversation-strip {
  display: grid;
  gap: 12px;
}

.story-opening-grid,
.growth-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.85fr);
  gap: 18px;
}

.story-editorial {
  display: grid;
  gap: 14px;
  font-size: 1rem;
}

.story-fast-facts {
  display: grid;
  gap: 12px;
}

.story-fact-card {
  padding: 18px;
  border-radius: 18px;
}

.story-dual-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
  gap: 18px;
}

.story-moments-grid {
  align-items: stretch;
}

.story-moment-card,
.growth-drivers .series-card {
  min-height: 100%;
}

.quote-column {
  align-content: start;
}

.story-quote-card {
  display: grid;
  gap: 16px;
  padding: 20px;
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(255, 251, 244, 0.94), rgba(249, 241, 228, 0.92)),
    var(--panel);
  border: 1px solid rgba(166, 111, 44, 0.14);
}

.story-quote-card + .story-quote-card {
  margin-top: 12px;
}

.story-quote-card blockquote {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.3rem;
  line-height: 1.45;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.story-quote-card footer {
  display: grid;
  gap: 4px;
}

.story-timeline-panel {
  position: relative;
  overflow: hidden;
}

.story-timeline {
  position: relative;
  display: grid;
  gap: 16px;
}

.story-timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50% - 1px);
  width: 2px;
  background: linear-gradient(180deg, rgba(166, 111, 44, 0.22), rgba(12, 108, 105, 0.18));
}

.story-timeline-item {
  display: grid;
  grid-template-columns: 1fr 64px 1fr;
  align-items: center;
}

.story-timeline-item.reverse .story-timeline-card {
  grid-column: 1;
}

.story-timeline-item.reverse .story-timeline-node {
  grid-column: 2;
}

.story-timeline-item:not(.reverse) .story-timeline-card {
  grid-column: 3;
}

.story-timeline-node {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.story-timeline-card {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.58);
  box-shadow: 0 14px 30px rgba(64, 49, 27, 0.05);
}

.story-timeline-date {
  font-size: 0.8rem;
  color: var(--brand);
  font-weight: 700;
  letter-spacing: 0.04em;
}

.story-timeline-card h3,
.naming-step code,
.decision-card strong,
.growth-comparison-board strong,
.conversation-card strong,
.moltbook-panel h2 {
  margin: 0;
}

.story-middle-grid {
  align-items: start;
}

.naming-ladder {
  display: grid;
  gap: 12px;
}

.naming-step {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(139, 92, 246, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.62), rgba(250, 244, 235, 0.82));
  transform: translateX(0);
}

.naming-step:nth-child(2) {
  transform: translateX(12px);
}

.naming-step:nth-child(3) {
  transform: translateX(24px);
}

.naming-step:nth-child(4) {
  transform: translateX(36px);
}

.naming-step.success {
  border-color: rgba(12, 108, 105, 0.18);
  background:
    radial-gradient(circle at top right, rgba(12, 108, 105, 0.14), transparent 40%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.74), rgba(238, 250, 245, 0.94));
}

.naming-step code {
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
}

.naming-step small,
.decision-card small {
  color: var(--brand);
  font-size: 0.82rem;
}

.naming-incident {
  display: grid;
  gap: 12px;
  margin-top: 18px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(122, 28, 28, 0.04);
  border: 1px solid rgba(239, 68, 68, 0.16);
}

.incident-list {
  display: grid;
  gap: 10px;
}

.incident-card {
  display: grid;
  grid-template-columns: 86px 1fr;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
}

.decision-card {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.56);
}

.decision-card.highlight {
  border-color: rgba(12, 108, 105, 0.2);
  background:
    radial-gradient(circle at top right, rgba(12, 108, 105, 0.12), transparent 42%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(239, 248, 244, 0.9));
}

.conversation-strip {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 16px;
}

.conversation-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  border-radius: 18px;
}

.growth-comparison-board {
  display: grid;
  gap: 14px;
  align-content: start;
  padding: 18px;
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(255, 250, 243, 0.92), rgba(248, 240, 228, 0.92)),
    var(--panel);
  border: 1px solid rgba(166, 111, 44, 0.12);
}

.comparison-stack {
  display: grid;
  gap: 10px;
}

.comparison-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
}

.comparison-row.highlight {
  border-color: rgba(12, 108, 105, 0.22);
  background: rgba(12, 108, 105, 0.08);
}

.comparison-row b {
  color: var(--brand);
  font-family: "Fraunces", "Times New Roman", serif;
}

.story-culture-grid {
  align-items: start;
}

.culture-layout {
  display: grid;
  gap: 12px;
}

.culture-card {
  padding: 18px;
  border-radius: 18px;
}

.moltbook-copy {
  margin-bottom: 6px;
}

.story-related-card {
  min-height: 100%;
}

@media (max-width: 1100px) {
  .story-highlight-band,
  .story-dual-grid,
  .story-opening-grid,
  .growth-grid,
  .conversation-strip {
    grid-template-columns: 1fr;
  }

  .story-timeline::before {
    left: 23px;
  }

  .story-timeline-item,
  .story-timeline-item.reverse {
    grid-template-columns: 48px 1fr;
    gap: 12px;
  }

  .story-timeline-item .story-timeline-node,
  .story-timeline-item.reverse .story-timeline-node {
    grid-column: 1;
  }

  .story-timeline-item .story-timeline-card,
  .story-timeline-item.reverse .story-timeline-card {
    grid-column: 2;
  }
}

@media (max-width: 720px) {
  .story-page {
    gap: 22px;
  }

  .story-quote-card blockquote {
    font-size: 1.1rem;
  }

  .naming-step,
  .naming-step:nth-child(2),
  .naming-step:nth-child(3),
  .naming-step:nth-child(4) {
    transform: none;
  }

  .incident-card,
  .comparison-row,
  .story-kicker-row,
  .decision-card-top,
  .naming-step-top {
    grid-template-columns: 1fr;
    display: grid;
  }
}
</style>
