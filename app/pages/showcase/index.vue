<script setup lang="ts">
import { sortShowcase } from '~/data/content'

useSeo({
  title: '案例展示',
  description: '探索 OpenClaw 在企业和个人场景中的真实应用案例，涵盖法律、电商、教育、金融等行业。',
  path: '/showcase',
  type: 'website',
})

const { data: items } = await useAsyncData('showcase:index', () => queryCollection('showcase').all())

const sortedItems = computed(() => sortShowcase((items.value || []) as any[]))

const featuredCases = computed(() => sortedItems.value.filter((item: any) => item.featured))

const enterpriseCases = computed(() =>
  sortedItems.value.filter((item: any) => item.scale !== '个人'),
)

const personalCases = computed(() =>
  sortedItems.value.filter((item: any) => item.scale === '个人'),
)

const industryCount = computed(() =>
  new Set(sortedItems.value.map((item: any) => item.industry).filter(Boolean)).size,
)

const stats = computed(() => [
  { label: '企业案例', value: String(enterpriseCases.value.length), note: '组织化部署与团队协作' },
  { label: '个人案例', value: String(personalCases.value.length), note: '个人工作流与副业实践' },
  { label: '行业覆盖', value: String(industryCount.value), note: '从专业服务到公共服务' },
  { label: '典型效率提升', value: '40%+', note: '来自案例页的综合经验值' },
])

const heroSignals = [
  {
    title: '先看结果，再理解产品',
    description: '案例页承担的不是“功能介绍”，而是帮用户在真实场景里建立判断。',
    kind: 'pulse' as const,
  },
  {
    title: '从行业模板走向组织工作流',
    description: '好的案例不只展示结果，还要展示输入、边界、协作节点和风险控制。',
    kind: 'flow' as const,
  },
  {
    title: '给新访客一个“我也能做”的起点',
    description: '通过场景化叙事，让企业与个人用户都能快速找到代入位置。',
    kind: 'grid' as const,
  },
]

const quickCases = [
  { industry: '法律', case: '合同审查', metric: '2.5 小时 → 15 分钟', impact: '90% 提效' },
  { industry: '电商', case: '客服响应', metric: '4.1 星 → 4.6 星', impact: '转化提升' },
  { industry: '教育', case: '作业批改', metric: '节省 70% 时间', impact: '老师减负' },
  { industry: '金融', case: '市场报告', metric: '日报自动生成', impact: '分析师解放' },
  { industry: 'HR', case: '简历筛选', metric: '批量自动化', impact: '效率 20 倍' },
  { industry: '房产', case: '客户跟进', metric: '成交率 +45%', impact: '佣金增加' },
  { industry: '制造', case: '库存管理', metric: '缺货率 12% → 3%', impact: '年省 ¥320 万' },
  { industry: '政务', case: '市民咨询', metric: '12 分钟 → 30 秒', impact: '年省 ¥280 万' },
]

const archetypes = [
  {
    title: '替代重复劳动',
    description: '先把高频、低判断密度、可标准化的任务自动化，是最容易看到结果的一类切入点。',
    examples: '客服、批改、报告、信息整理',
    kind: 'stack' as const,
  },
  {
    title: '放大专业判断',
    description: '把法律、金融、HR 这类专业场景中的资料处理和初筛工作前置给 Agent，人类专注最终判断。',
    examples: '合同、风险、招聘、政策问答',
    kind: 'shield' as const,
  },
  {
    title: '重组服务体验',
    description: '当响应速度、跟进频率和信息完整度显著改善时，OpenClaw 会直接改变用户感知到的服务质量。',
    examples: '房产跟进、政务服务、健康管理',
    kind: 'orbit' as const,
  },
]

const industries = [
  {
    id: 'legal',
    title: '法律行业',
    description: '合同审查、案例检索、法律咨询自动化',
    position: '高专业度、高风险，需要严格边界和人工复核。',
    kind: 'shield' as const,
    cases: [
      { title: '合同审查 Agent', pain: '一份标准合同需要 2-4 小时人工审查', result: '审查时间从 2.5 小时缩短到 15 分钟', roi: '律所月收入增长 +340%' },
      { title: '案例检索 Agent', pain: '需要在多个数据库间反复切换', result: '胜诉率评估和相似判例检索自动化', roi: '服务客户量从 50 个/月提升到 200 个/月' },
    ],
    soulExample: `你是一个专业的法律合同审查助手。

重要免责声明：
本系统的分析仅供律师参考，不构成正式法律意见。

审查标准：
1. 条款完整性
2. 权利义务对等性
3. 违约责任可执行性
4. 争议解决条款完整度

输出格式：
- 高风险条款
- 中风险条款
- 低风险提示
- 总体评分：0-100分`,
  },
  {
    id: 'ecommerce',
    title: '电商行业',
    description: '选品分析、Listing 优化、客服自动化',
    position: '标准化流程多，适合快速验证 ROI。',
    kind: 'flow' as const,
    cases: [
      { title: '全链路电商 Agent', pain: '运营琐碎、客服响应慢、关键词管理分散', result: '好评率从 4.1 提升到 4.6，自然流量增长 180%', roi: '月净利润增长 ¥15,000' },
    ],
    soulExample: `你是一个专业的亚马逊电商运营助手。

核心工作：
1. 选品分析
2. Listing 优化
3. 关键词研究
4. 定价策略建议

平台合规要求：
- 不操纵评价
- 不使用禁止关键词
- 遵守消费者保护法规`,
  },
  {
    id: 'education',
    title: '教育行业',
    description: '个性化教学、作业批改、学情分析',
    position: '反馈频次高，最容易通过“减轻老师负担”体现价值。',
    kind: 'spark' as const,
    cases: [
      { title: '个性化 AI 教师', pain: '一对一辅导成本高，批改与反馈耗时', result: '节省 70% 批改时间，提升个性化反馈覆盖率', roi: '月收入 ¥50,000（服务 5 所学校）' },
    ],
    soulExample: `你是一个专业的中学数学辅导老师。

教学原则：
1. 苏格拉底式引导
2. 从错误中学习
3. 循序渐进
4. 保护学习兴趣

规则：
- 先问学生思路
- 正确时给出具体表扬
- 同一知识点连续错误三次时切换教学方式`,
  },
  {
    id: 'finance',
    title: '金融行业',
    description: '量化研究、风险评估、日报周报生成',
    position: '高信息密度场景，适合把“信息收集与总结”交给 Agent。',
    kind: 'pulse' as const,
    cases: [
      { title: '量化投资辅助 Agent', pain: '市场数据分散，人工分析周期长', result: '每日市场简报和每周策略报告自动化', roi: '个人版 ¥2,000/月，机构版 ¥20,000/月' },
    ],
    soulExample: `你是一个专业的量化投资分析助手。

核心职责：
1. 市场分析
2. 策略研究
3. 风险管理

重要限制：
- 只能提供分析建议
- 不直接执行交易
- 所有交易决策由人类确认`,
  },
  {
    id: 'hr',
    title: '人力资源',
    description: '简历筛选、招聘自动化、员工服务',
    position: '非常适合通过规则明确的评分机制建立第一版系统。',
    kind: 'grid' as const,
    cases: [
      { title: 'AI 招聘助手', pain: 'HR 每天处理大量简历和重复沟通', result: '分数 >80 自动发出面试邀请', roi: '服务 10 家企业，月收入 ¥36,000' },
    ],
    soulExample: `你是一个专业的 HR 招聘助手。

筛选维度：
- 技能匹配度 40%
- 经历相关性 30%
- 教育背景 15%
- 工作稳定性 15%

执行流程：
→ 批量解析简历
→ 与 JD 匹配打分
→ 生成候选人排序
→ 自动发面试或感谢信`,
  },
  {
    id: 'healthcare',
    title: '医疗健康',
    description: '健康管理、用药提醒、慢病随访',
    position: '必须把服务范围和禁止事项写得非常清楚。',
    kind: 'shield' as const,
    cases: [
      { title: '健康管理 Agent', pain: '慢病患者管理和随访依从性差', result: '血压血糖记录与提醒自动化', roi: '降低随访成本，提升患者依从性' },
    ],
    soulExample: `你是健康管理助手，帮助用户管理日常健康。

服务范围：
1. 健康知识科普
2. 慢病自我管理指导
3. 用药提醒
4. 预约挂号协助

严格禁止：
- 提供诊断结论
- 推荐治疗方案
- 调整处方剂量

每次咨询末尾必须声明：
"以上信息仅供参考，不构成医疗建议。"`,
  },
  {
    id: 'realestate',
    title: '房产行业',
    description: '置业顾问、客户分层跟进、房源匹配',
    position: '高价值成交场景，服务体验和跟进节奏直接影响转化。',
    kind: 'orbit' as const,
    cases: [
      { title: 'AI 置业顾问', pain: '客户跟进不稳定，房源匹配效率低', result: 'S 级客户每 2 天跟进一次', roi: '成交率提升 45%，月佣金增加 ¥25,000' },
    ],
    soulExample: `你是一个专业的置业顾问 AI 助手。

客户分级：
- S级：每2天跟进
- A级：每周跟进
- B级：每月跟进

原则：
- 优先考虑客户利益
- 客观呈现优缺点
- 明确告知市场风险`,
  },
  {
    id: 'government',
    title: '政务与公共服务',
    description: '政策解读、市民咨询、公共服务分流',
    position: '重点在于统一口径、透明出处和清晰转人工。',
    kind: 'stack' as const,
    cases: [
      { title: '政务服务 AI 助手', pain: '12345 热线压力大，排队时间长', result: 'AI 解决率 67%，等待从 12 分钟缩短到 30 秒', roi: '年节省运营成本 ¥280 万' },
    ],
    soulExample: `你是政务服务 AI 助手，帮助市民了解政策和办理事项。

服务承诺：
- 7×24 小时在线
- 每条信息提供政策依据
- 不确定时明确说明并转人工

禁止事项：
- 不提供个人意见影响政策解读
- 不泄露公民个人信息
- 不做超出权限的行政决定`,
  },
]

const implementationTips = [
  {
    title: '从一个窄场景打样',
    desc: '优先选输入输出清晰、成本容易量化的流程，不要一开始就覆盖整条业务链。',
    kind: 'spark' as const,
  },
  {
    title: '先写边界，再写能力',
    desc: 'SOUL.md 里最重要的往往不是“你会做什么”，而是“你绝对不能做什么”。',
    kind: 'shield' as const,
  },
  {
    title: '把人工节点设计进去',
    desc: '高风险决策、对外发送和费用动作都应该保留审批与回滚能力。',
    kind: 'flow' as const,
  },
  {
    title: '用真实反馈驱动下一轮',
    desc: '上线后记录失败案例、误判来源和人工接管原因，才会形成真正可复用的行业模板。',
    kind: 'pulse' as const,
  },
]

const nextLinks = [
  {
    to: '/best-practices',
    tag: 'Playbook',
    title: '最佳实践',
    description: '看案例之后，再去理解如何把这些结果稳定地做出来。',
  },
  {
    to: '/videos',
    tag: 'Demo',
    title: '视频教程',
    description: '用真实演示建立直觉，快速理解案例背后的操作方式。',
  },
  {
    to: '/community',
    tag: 'Community',
    title: '社区支持',
    description: '和其他团队或个人创作者交流配置、模板和试错经验。',
  },
  {
    to: '/feedback',
    tag: 'Submit',
    title: '提交你的案例',
    description: '把你的场景、指标和经验补进这份案例库，帮助更多后来者。',
  },
]

const expandedIndustry = ref<string>(industries[0]?.id ?? '')

function toggleIndustry(id: string) {
  expandedIndustry.value = expandedIndustry.value === id ? '' : id
}
</script>

<template>
  <section class="section showcase-shell">
    <div class="container showcase-page series-page">
      <section class="series-hero showcase-hero">
        <div class="card series-main showcase-main">
          <div class="showcase-kicker-row">
            <span class="series-kicker">Showcase Atlas</span>
            <span class="showcase-note">企业落地 · 个人实践 · 行业模板</span>
          </div>

          <div class="showcase-headline">
            <p class="eyebrow">案例展示</p>
            <h1 class="section-title">把 OpenClaw 放进真实工作里看，价值才会变具体</h1>
            <p class="section-copy">
              这个页面不是“成功学陈列馆”，而是帮助你判断 OpenClaw 在什么场景里最值得上、需要哪些边界、能换来什么样的效率和体验变化。
            </p>
          </div>

          <div class="showcase-hero-band">
            <article v-for="item in heroSignals" :key="item.title" class="showcase-hero-card">
              <SeriesGlyph :kind="item.kind" tone="accent" small />
              <div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
              </div>
            </article>
          </div>
        </div>

        <aside class="card series-side showcase-side">
          <div class="series-signal">
            <span class="series-kicker">Coverage</span>
            <strong>{{ industryCount }} 个行业视角，企业与个人双线展开</strong>
            <p>你可以先按行业找近似场景，再回到真实案例条目里看更具体的场景与结果。</p>
          </div>

          <div class="series-signal">
            <span class="series-kicker">How To Read</span>
            <strong>先看 archetype，再看案例，再看 SOUL 模板</strong>
            <p>这样更容易判断一个案例到底是“适合拿来复制”，还是只是值得参考思路。</p>
          </div>

          <div class="showcase-stat-rail">
            <article v-for="stat in stats" :key="stat.label" class="series-stat-card">
              <span class="series-stat-value">{{ stat.value }}</span>
              <strong>{{ stat.label }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </aside>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Case Patterns</p>
            <h2>先把案例看成三类工作重构</h2>
          </div>
          <span class="showcase-subnote">很多行业不同，但成功模式其实很相似。</span>
        </div>

        <div class="series-grid-3">
          <article v-for="item in archetypes" :key="item.title" class="series-card showcase-archetype-card">
            <div class="series-card-top">
              <SeriesGlyph :kind="item.kind" tone="brand" />
              <strong>{{ item.title }}</strong>
            </div>
            <p>{{ item.description }}</p>
            <span class="series-tag">{{ item.examples }}</span>
          </article>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Quick Wins</p>
            <h2>8 个最容易感知到价值的使用结果</h2>
          </div>
        </div>

        <div class="showcase-quick-grid">
          <article v-for="stat in quickCases" :key="stat.industry + stat.case" class="quick-case-card">
            <span class="quick-case-industry">{{ stat.industry }}</span>
            <strong>{{ stat.case }}</strong>
            <p>{{ stat.metric }}</p>
            <span class="quick-case-impact">{{ stat.impact }}</span>
          </article>
        </div>
      </section>

      <section class="showcase-split-grid">
        <section class="card series-panel industry-panel">
          <div class="series-head">
            <div>
              <p class="eyebrow">Industry Blueprints</p>
              <h2>按行业看场景、收益和 SOUL 模板</h2>
            </div>
          </div>

          <div class="industry-list">
            <article
              v-for="industry in industries"
              :key="industry.id"
              class="industry-entry"
              :class="{ expanded: expandedIndustry === industry.id }"
            >
              <button class="industry-toggle" @click="toggleIndustry(industry.id)">
                <div class="industry-toggle-main">
                  <SeriesGlyph :kind="industry.kind" :tone="expandedIndustry === industry.id ? 'brand' : 'muted'" />
                  <div>
                    <strong>{{ industry.title }}</strong>
                    <p>{{ industry.description }}</p>
                  </div>
                </div>
                <span class="industry-toggle-note">{{ expandedIndustry === industry.id ? '收起' : '展开' }}</span>
              </button>

              <div v-if="expandedIndustry === industry.id" class="industry-body">
                <div class="industry-position">
                  <span class="series-kicker">Positioning</span>
                  <p>{{ industry.position }}</p>
                </div>

                <div class="industry-cases">
                  <article v-for="c in industry.cases" :key="c.title" class="industry-case-card">
                    <h3>{{ c.title }}</h3>
                    <div class="industry-detail-grid">
                      <div>
                        <span>痛点</span>
                        <p>{{ c.pain }}</p>
                      </div>
                      <div>
                        <span>效果</span>
                        <p>{{ c.result }}</p>
                      </div>
                      <div>
                        <span>收益</span>
                        <p class="accent">{{ c.roi }}</p>
                      </div>
                    </div>
                  </article>
                </div>

                <div class="industry-soul">
                  <div class="industry-soul-head">
                    <span class="series-kicker">SOUL.md</span>
                    <strong>适合这个行业的边界写法</strong>
                  </div>
                  <pre class="industry-code"><code>{{ industry.soulExample }}</code></pre>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="showcase-side-column">
          <section v-if="featuredCases.length" class="card series-panel">
            <div class="series-head">
              <div>
                <p class="eyebrow">Featured</p>
                <h2>精选案例</h2>
              </div>
            </div>

            <div class="showcase-featured-stack">
              <NuxtLink
                v-for="item in featuredCases"
                :key="item.path"
                :to="item.path"
                class="series-link-card feature-case-card"
              >
                <div class="series-tag-row">
                  <span class="series-tag highlight">{{ item.industry }}</span>
                  <span class="series-tag">{{ item.scale }}</span>
                </div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
                <div v-if="item.outcomes && item.outcomes.length" class="feature-outcomes">
                  <span v-for="outcome in item.outcomes.slice(0, 2)" :key="outcome">{{ outcome }}</span>
                </div>
              </NuxtLink>
            </div>
          </section>

          <section class="card series-panel">
            <div class="series-head">
              <div>
                <p class="eyebrow">Implementation</p>
                <h2>落地提醒</h2>
              </div>
            </div>

            <div class="implementation-stack">
              <article v-for="tip in implementationTips" :key="tip.title" class="implementation-card">
                <SeriesGlyph :kind="tip.kind" tone="accent" small />
                <div>
                  <strong>{{ tip.title }}</strong>
                  <p>{{ tip.desc }}</p>
                </div>
              </article>
            </div>
          </section>
        </section>
      </section>

      <section v-if="enterpriseCases.length" class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Enterprise Library</p>
            <h2>企业案例库</h2>
          </div>
          <span class="showcase-subnote">关注部署、流程协作和组织收益。</span>
        </div>

        <div class="showcase-card-grid">
          <NuxtLink
            v-for="item in enterpriseCases"
            :key="item.path"
            :to="item.path"
            class="series-link-card showcase-record"
          >
            <div class="series-tag-row">
              <span class="series-tag highlight">{{ item.industry }}</span>
              <span class="series-tag">{{ item.scale }}</span>
            </div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
            <div class="record-meta">
              <span>场景</span>
              <b>{{ item.scenario }}</b>
            </div>
            <ul v-if="item.outcomes && item.outcomes.length" class="record-outcomes">
              <li v-for="outcome in item.outcomes.slice(0, 3)" :key="outcome">{{ outcome }}</li>
            </ul>
            <div class="record-tags">
              <span v-for="tag in (item.tags || []).slice(0, 4)" :key="tag">{{ tag }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section v-if="personalCases.length" class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">Personal Library</p>
            <h2>个人案例库</h2>
          </div>
          <span class="showcase-subnote">关注灵活性、副业价值与个人效率。</span>
        </div>

        <div class="showcase-card-grid personal-grid">
          <NuxtLink
            v-for="item in personalCases"
            :key="item.path"
            :to="item.path"
            class="series-link-card showcase-record personal-record"
          >
            <div class="series-tag-row">
              <span class="series-tag">{{ item.industry }}</span>
              <span class="series-tag">{{ item.scale }}</span>
            </div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
            <ul v-if="item.outcomes && item.outcomes.length" class="record-outcomes">
              <li v-for="outcome in item.outcomes.slice(0, 3)" :key="outcome">{{ outcome }}</li>
            </ul>
            <div class="record-tags">
              <span v-for="tag in (item.tags || []).slice(0, 4)" :key="tag">{{ tag }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section class="card series-panel">
        <div class="series-head">
          <div>
            <p class="eyebrow">交叉访问</p>
            <h2>继续把案例页里的结果转成你的实施路径</h2>
            <p class="section-copy">案例页负责帮你建立“值不值得做”的判断，真正继续落地时再切回实践、演示、社区和反馈入口。</p>
          </div>
        </div>

        <div class="series-grid-4 showcase-next-grid">
          <NuxtLink
            v-for="link in nextLinks"
            :key="link.to"
            :to="link.to"
            class="series-link-card"
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
.showcase-shell {
  background:
    radial-gradient(circle at 8% 10%, rgba(12, 108, 105, 0.08), transparent 24%),
    radial-gradient(circle at 92% 12%, rgba(166, 111, 44, 0.1), transparent 20%),
    linear-gradient(180deg, rgba(250, 243, 231, 0.45), rgba(255, 251, 244, 0));
}

.showcase-page {
  gap: 28px;
}

.showcase-main {
  position: relative;
  overflow: hidden;
}

.showcase-main::after {
  content: "";
  position: absolute;
  right: -48px;
  bottom: -64px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(166, 111, 44, 0.16), transparent 68%);
  pointer-events: none;
}

.showcase-kicker-row,
.record-meta,
.industry-soul-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.showcase-note,
.showcase-subnote,
.industry-toggle-note,
.record-meta span,
.industry-detail-grid span {
  font-size: 0.78rem;
  color: var(--ink-soft);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.showcase-headline {
  display: grid;
  gap: 10px;
  max-width: 44rem;
}

.showcase-hero-band {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.showcase-hero-card,
.quick-case-card,
.implementation-card,
.industry-entry,
.industry-case-card {
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.56);
}

.showcase-hero-card,
.implementation-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  padding: 16px;
  border-radius: 18px;
}

.showcase-hero-card strong,
.quick-case-card strong,
.industry-toggle strong,
.industry-case-card h3,
.implementation-card strong,
.feature-case-card strong,
.showcase-record strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.showcase-hero-card p,
.quick-case-card p,
.industry-toggle p,
.industry-position p,
.industry-case-card p,
.implementation-card p,
.record-outcomes,
.showcase-record p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.66;
}

.showcase-stat-rail,
.showcase-featured-stack,
.implementation-stack,
.industry-list {
  display: grid;
  gap: 12px;
}

.showcase-quick-grid,
.showcase-card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.quick-case-card {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 18px;
}

.quick-case-industry {
  font-size: 0.75rem;
  color: var(--brand);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.quick-case-impact {
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 700;
}

.showcase-split-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.82fr);
  gap: 18px;
  align-items: start;
}

.showcase-side-column {
  display: grid;
  gap: 18px;
}

.industry-entry {
  border-radius: 20px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.industry-entry.expanded {
  border-color: rgba(12, 108, 105, 0.18);
  box-shadow: 0 16px 30px rgba(64, 49, 27, 0.06);
}

.industry-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
  padding: 18px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.industry-toggle-main {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: center;
}

.industry-body {
  display: grid;
  gap: 16px;
  padding: 0 18px 18px;
}

.industry-position {
  padding: 16px;
  border-radius: 18px;
  background: rgba(249, 244, 235, 0.84);
  border: 1px solid rgba(166, 111, 44, 0.1);
}

.industry-cases {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.industry-case-card {
  display: grid;
  gap: 12px;
  padding: 16px;
  border-radius: 18px;
}

.industry-detail-grid {
  display: grid;
  gap: 10px;
}

.industry-detail-grid p.accent {
  color: var(--brand);
  font-weight: 700;
}

.industry-soul {
  display: grid;
  gap: 10px;
  padding: 16px;
  border-radius: 20px;
  background: rgba(26, 25, 23, 0.96);
  color: rgba(247, 241, 230, 0.92);
}

.industry-code {
  margin: 0;
  overflow-x: auto;
  font-size: 0.8rem;
  line-height: 1.7;
  white-space: pre-wrap;
}

.feature-outcomes {
  display: grid;
  gap: 6px;
  color: var(--brand);
  font-size: 0.84rem;
}

.showcase-record {
  min-height: 100%;
}

.record-meta {
  padding-top: 2px;
}

.record-meta b {
  font-size: 0.92rem;
  color: var(--ink);
}

.record-outcomes {
  padding-left: 18px;
  font-size: 0.9rem;
}

.record-outcomes li + li {
  margin-top: 4px;
}

.record-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.record-tags span {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.62);
  color: var(--ink-soft);
  font-size: 0.74rem;
}

.personal-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.personal-record {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.62), rgba(247, 243, 236, 0.78));
}

.showcase-next-grid {
  align-items: stretch;
}

@media (max-width: 1180px) {
  .showcase-hero-band,
  .showcase-card-grid,
  .personal-grid,
  .showcase-next-grid,
  .showcase-split-grid,
  .industry-cases {
    grid-template-columns: 1fr;
  }

  .showcase-quick-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .showcase-page {
    gap: 22px;
  }

  .showcase-quick-grid,
  .showcase-kicker-row,
  .record-meta,
  .industry-soul-head,
  .industry-toggle {
    grid-template-columns: 1fr;
    display: grid;
  }

  .industry-toggle-main,
  .showcase-hero-card,
  .implementation-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .showcase-page {
    gap: 18px;
  }

  .showcase-hero-card,
  .implementation-card,
  .industry-entry,
  .industry-position,
  .industry-case-card,
  .industry-soul,
  .showcase-record,
  .personal-record,
  .showcase-next-card {
    border-radius: 18px;
  }

  .showcase-hero-card,
  .implementation-card,
  .industry-toggle,
  .industry-body,
  .industry-position,
  .industry-case-card,
  .industry-soul,
  .showcase-record,
  .personal-record,
  .showcase-next-card {
    padding: 14px;
  }

  .showcase-quick-grid,
  .showcase-card-grid,
  .personal-grid,
  .showcase-next-grid,
  .industry-cases {
    gap: 10px;
  }

  .industry-toggle {
    gap: 10px;
  }

  .industry-toggle h3,
  .industry-case-card strong,
  .showcase-record h3,
  .showcase-next-card strong {
    font-size: 0.94rem;
    line-height: 1.36;
  }

  .section-copy,
  .industry-position p,
  .industry-detail-grid p,
  .record-outcomes,
  .showcase-record p,
  .showcase-next-card p {
    font-size: 0.84rem;
    line-height: 1.56;
  }

  .industry-code {
    font-size: 0.74rem;
    line-height: 1.6;
  }
}
</style>
