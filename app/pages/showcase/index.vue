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

const stats = computed(() => [
  { label: '企业案例', value: String(enterpriseCases.value.length), note: '真实企业应用' },
  { label: '个人案例', value: String(personalCases.value.length), note: '个人使用经验' },
  { label: '行业覆盖', value: String(new Set(sortedItems.value.map((i: any) => i.industry)).size), note: '跨行业应用' },
  { label: '平均效率提升', value: '40%+', note: '用户反馈统计' },
])

// 行业应用数据
const quickCases = [
  { industry: '法律', case: '合同审查', time: '2.5小时→15分钟', saving: '90%' },
  { industry: '电商', case: '客服响应', time: '好评率4.1→4.6', saving: '转化提升' },
  { industry: '教育', case: '作业批改', time: '节省70%时间', saving: '老师减负' },
  { industry: '金融', case: '市场报告', time: '每日自动生成', saving: '分析师解放' },
  { industry: 'HR', case: '简历筛选', time: '批量自动化', saving: '效率20倍' },
  { industry: '房产', case: '客户跟进', time: '成交率+45%', saving: '佣金增加' },
  { industry: '制造', case: '库存管理', time: '缺货率12%→3%', saving: '年省¥320万' },
  { industry: '政务', case: '市民咨询', time: '等待12分钟→30秒', saving: '年省¥280万' },
]

const industries = [
  {
    id: 'legal',
    title: '法律行业',
    icon: '⚖️',
    description: '合同审查、案例检索、法律咨询自动化',
    cases: [
      { title: '合同审查 Agent', pain: '一份标准合同需要2-4小时审查', result: '审查时间从2.5小时→15分钟', roi: '律所月收入增长 +340%' },
      { title: '案例检索 Agent', pain: '需要在几十个数据库查询', result: '胜诉率评估自动化', roi: '服务客户量从50个/月→200个/月' },
    ],
    soulExample: `你是一个专业的法律合同审查助手。

重要免责声明：
本系统的分析仅供律师参考，不构成正式法律意见。

审查标准：
1. 条款完整性（是否缺少关键条款）
2. 权利义务对等性（是否明显不公平）
3. 违约责任（是否清晰可执行）
4. 争议解决条款（管辖法院/仲裁）

输出格式：
- 高风险条款（红色）：需要立即修改
- 中风险条款（黄色）：建议修改
- 低风险提示（蓝色）：可以接受但需注意
- 总体评分：0-100分`,
  },
  {
    id: 'ecommerce',
    title: '电商行业',
    icon: '🛒',
    description: '选品分析、Listing优化、客服自动化',
    cases: [
      { title: '全链路电商 Agent', pain: '运营工作繁琐，客服响应慢', result: '好评率从4.1→4.6星，自然流量+180%', roi: '月净利润增长 ¥15,000' },
    ],
    soulExample: `你是一个专业的亚马逊电商运营助手。

核心工作：
1. 选品分析：查询BSR排名、月销量、竞争度
2. Listing优化：生成符合A9算法的标题、五点、描述
3. 关键词研究：找出高搜索量低竞争的关键词
4. 定价策略：分析竞品价格，给出定价建议

亚马逊政策合规：
- 不操纵评价（不刷单）
- 不使用禁止的关键词
- 遵守各国消费者保护法规`,
  },
  {
    id: 'education',
    title: '教育行业',
    icon: '📚',
    description: '个性化教学、作业批改、学情分析',
    cases: [
      { title: '个性化 AI 教师', pain: '一对一辅导成本高', result: '节省70%批改时间', roi: '月收入¥50,000（5所学校）' },
    ],
    soulExample: `你是一个专业的中学数学辅导老师。

教学原则：
1. 苏格拉底式引导：不直接给答案，引导学生思考
2. 从错误中学习：每道错题深度分析根本原因
3. 循序渐进：确保前置知识掌握再推进
4. 积极鼓励：保护学习兴趣，避免打击信心

具体规则：
- 解题时先问"你有什么思路？"
- 学生答对时给予具体表扬
- 一个知识点错误3次，切换教学方式`,
  },
  {
    id: 'finance',
    title: '金融行业',
    icon: '💰',
    description: '量化投资辅助、风险评估、报告生成',
    cases: [
      { title: '量化投资辅助 Agent', pain: '市场数据分散，分析耗时', result: '每日市场简报、每周策略报告自动化', roi: '个人版¥2000/月，机构版¥20,000/月' },
    ],
    soulExample: `你是一个专业的量化投资分析助手。

核心职责：
1. 市场分析：读取实时数据，分析技术指标和基本面
2. 策略研究：基于历史数据回测交易策略
3. 风险管理：计算VaR、最大回撤、Sharpe比率

重要限制：
- 你只能提供分析和建议，不能直接执行交易
- 所有交易决策必须由人类投资者最终确认
- 不保证任何投资收益`,
  },
  {
    id: 'hr',
    title: '人力资源',
    icon: '👥',
    description: '简历筛选、招聘自动化、员工服务',
    cases: [
      { title: 'AI 招聘助手', pain: 'HR筛选简历耗时', result: '分数>80自动发面试邀请', roi: '服务10家企业，月收入¥36,000' },
    ],
    soulExample: `你是一个专业的HR招聘助手。

简历筛选流程：
→ OpenClaw批量解析简历（PDF/Word/图片格式）
→ 与JD进行多维度匹配打分：
  ├── 技能匹配度（40%权重）
  ├── 工作经历相关性（30%权重）
  ├── 教育背景（15%权重）
  └── 工作稳定性（15%权重）
→ 生成候选人排名表（Excel格式）
→ 分数>80：自动发邮件预约面试
→ 分数<60：系统发感谢信`,
  },
  {
    id: 'healthcare',
    title: '医疗健康',
    icon: '🏥',
    description: '健康管理、用药提醒、慢病跟踪',
    cases: [
      { title: '健康管理 Agent', pain: '慢病患者管理困难', result: '血压血糖监测记录自动化', roi: '降低随访成本，提升患者依从性' },
    ],
    soulExample: `你是健康管理助手，帮助用户管理日常健康。

服务范围（仅限）：
1. 健康知识科普
2. 慢病自我管理指导（血压、血糖监测记录）
3. 用药提醒和药品信息查询
4. 预约挂号协助

严格禁止：
- 提供诊断结论
- 推荐特定治疗方案
- 建议调整处方药剂量

每次咨询末尾必须声明：
"以上信息仅供参考，不构成医疗建议。"`,
  },
  {
    id: 'realestate',
    title: '房产行业',
    icon: '🏠',
    description: '置业顾问、客户跟进、房源匹配',
    cases: [
      { title: 'AI 置业顾问', pain: '客户跟进效率低', result: 'S级客户每2天跟进一次', roi: '成交率提升45%，月佣金增加¥25,000' },
    ],
    soulExample: `你是一个专业的置业顾问AI助手。

客户分级管理：
- S级（成交概率>70%）：每2天跟进，新房源立即推送
- A级（成交概率30-70%）：每周跟进，市场行情简报
- B级（成交概率<30%）：每月跟进，保持存在感

专业建议原则：
- 优先考虑客户利益，不强推高佣金房源
- 客观呈现房源优缺点
- 明确告知市场风险`,
  },
  {
    id: 'government',
    title: '政务与公共服务',
    icon: '🏛️',
    description: '政务服务、政策解读、市民咨询',
    cases: [
      { title: '政务服务 AI 助手', pain: '12345热线压力大', result: 'AI解决率67%，等待从12分钟→30秒', roi: '年节省运营成本¥280万' },
    ],
    soulExample: `你是政务服务AI助手，帮助市民了解政策和办理事项。

服务承诺：
- 7×24小时在线
- 每条信息提供政策依据（文号/日期）
- 遇到不确定的信息，明确告知并引导转人工

禁止事项：
- 不提供个人意见影响政策解读
- 不泄露公民个人信息
- 不处理超出权限的行政决定`,
  },
]

const tips = [
  { title: '从小场景开始', desc: '先选择一个明确的、输入输出固定的场景，验证效果后再扩展', icon: '🎯' },
  { title: '设置安全边界', desc: '在 SOUL.md 中明确禁止事项，设置审批机制', icon: '🔒' },
  { title: '保留人工兜底', desc: '关键决策、高风险操作都需要人工介入', icon: '📊' },
  { title: '持续迭代优化', desc: '收集用户反馈，分析错误案例，持续优化', icon: '🔄' },
]

const expandedIndustry = ref<string | null>(null)

function toggleIndustry(id: string) {
  expandedIndustry.value = expandedIndustry.value === id ? null : id
}
</script>

<template>
  <section class="section">
    <div class="container showcase-page">
      <!-- Hero -->
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Showcase</p>
          <h1 class="section-title">案例展示</h1>
          <p class="section-copy">
            真实的使用案例比功能列表更有说服力。这里展示 OpenClaw 在企业和个人场景中的实际应用效果，涵盖法律、电商、教育、金融等多个行业。
          </p>

          <div class="collection-utility">
            <article v-for="stat in stats.slice(0, 2)" :key="stat.label" class="collection-utility-item">
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">案例分类</span>
            <strong>企业 / 个人 / 行业解决方案</strong>
            <p>按规模和场景分类，帮助你快速找到与自己情况相近的参考案例。</p>
          </div>
        </aside>
      </section>

      <!-- 统计数据 -->
      <div class="grid stats-grid">
        <article v-for="stat in stats" :key="stat.label" class="card stat-card">
          <span class="stat-value">{{ stat.value }}</span>
          <strong class="stat-label">{{ stat.label }}</strong>
          <p class="stat-note">{{ stat.note }}</p>
        </article>
      </div>

      <!-- 效果速览 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Quick Stats</p>
          <h2>效果速览</h2>
        </div>

        <div class="quick-stats-grid">
          <article v-for="stat in quickCases" :key="stat.industry + stat.case" class="stat-card-mini">
            <span class="industry">{{ stat.industry }}</span>
            <span class="case-name">{{ stat.case }}</span>
            <span class="time">{{ stat.time }}</span>
            <span class="saving">{{ stat.saving }}</span>
          </article>
        </div>
      </section>

      <!-- 行业应用详情 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Industries</p>
          <h2>行业应用方案</h2>
          <p class="section-copy">点击展开查看各行业的详细案例和 SOUL.md 配置示例。</p>
        </div>

        <div class="industries-list">
          <article 
            v-for="industry in industries" 
            :key="industry.id" 
            class="industry-item"
            :class="{ expanded: expandedIndustry === industry.id }"
          >
            <button class="industry-header" @click="toggleIndustry(industry.id)">
              <span class="industry-icon">{{ industry.icon }}</span>
              <div class="industry-info">
                <h4>{{ industry.title }}</h4>
                <p>{{ industry.description }}</p>
              </div>
              <span class="expand-icon">{{ expandedIndustry === industry.id ? '−' : '+' }}</span>
            </button>

            <div v-if="expandedIndustry === industry.id" class="industry-content">
              <div class="cases-grid">
                <article v-for="c in industry.cases" :key="c.title" class="case-card">
                  <h5>{{ c.title }}</h5>
                  <div class="case-details">
                    <div class="detail-row">
                      <span class="label">痛点</span>
                      <span>{{ c.pain }}</span>
                    </div>
                    <div class="detail-row">
                      <span class="label">效果</span>
                      <span>{{ c.result }}</span>
                    </div>
                    <div class="detail-row roi">
                      <span class="label">收益</span>
                      <span>{{ c.roi }}</span>
                    </div>
                  </div>
                </article>
              </div>

              <div class="soul-section">
                <h5>SOUL.md 示例</h5>
                <pre class="code-block"><code>{{ industry.soulExample }}</code></pre>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 精选案例 -->
      <section v-if="featuredCases.length" class="featured-section">
        <div class="home-head">
          <p class="eyebrow">Featured Cases</p>
          <p class="home-head-note">精选案例，展示 OpenClaw 的核心价值。</p>
        </div>
        <div class="grid featured-grid">
          <NuxtLink
            v-for="item in featuredCases"
            :key="item.path"
            :to="item.path"
            class="card featured-card"
          >
            <div class="featured-meta">
              <span class="tag">{{ item.industry }}</span>
              <span class="tag secondary">{{ item.scale }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div v-if="item.outcomes && item.outcomes.length" class="outcomes-list">
              <span v-for="outcome in item.outcomes.slice(0, 2)" :key="outcome" class="outcome-item">
                ✓ {{ outcome }}
              </span>
            </div>
            <div class="featured-tags">
              <span v-for="tag in (item.tags || []).slice(0, 3)" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- 企业案例 -->
      <section v-if="enterpriseCases.length" class="showcase-section">
        <div class="section-heading">
          <p class="eyebrow">Enterprise</p>
          <h2 class="section-title">企业应用案例</h2>
          <p class="section-copy">企业级部署和应用场景，展示 OpenClaw 在组织中的价值。</p>
        </div>

        <div class="grid showcase-grid">
          <NuxtLink
            v-for="item in enterpriseCases"
            :key="item.path"
            :to="item.path"
            class="card showcase-card"
          >
            <div class="showcase-meta">
              <span class="tag">{{ item.industry }}</span>
              <span class="tag secondary">{{ item.scale }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="showcase-summary">{{ item.description }}</p>

            <div class="showcase-details">
              <div class="detail-row">
                <span class="detail-label">场景</span>
                <span class="detail-value">{{ item.scenario }}</span>
              </div>
            </div>

            <div v-if="item.outcomes && item.outcomes.length" class="outcomes-section">
              <span class="outcomes-label">效果</span>
              <ul class="outcomes-list-full">
                <li v-for="outcome in item.outcomes" :key="outcome">{{ outcome }}</li>
              </ul>
            </div>

            <div class="showcase-tags">
              <span v-for="tag in (item.tags || []).slice(0, 4)" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- 个人案例 -->
      <section v-if="personalCases.length" class="showcase-section">
        <div class="section-heading">
          <p class="eyebrow">Personal</p>
          <h2 class="section-title">个人使用案例</h2>
          <p class="section-copy">个人用户的创新使用方式，展示 OpenClaw 的灵活性。</p>
        </div>

        <div class="grid showcase-grid">
          <NuxtLink
            v-for="item in personalCases"
            :key="item.path"
            :to="item.path"
            class="card showcase-card"
          >
            <div class="showcase-meta">
              <span class="tag">{{ item.industry }}</span>
              <span class="tag secondary">{{ item.scale }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="showcase-summary">{{ item.description }}</p>

            <div v-if="item.outcomes && item.outcomes.length" class="outcomes-section">
              <span class="outcomes-label">效果</span>
              <ul class="outcomes-list-full">
                <li v-for="outcome in item.outcomes" :key="outcome">{{ outcome }}</li>
              </ul>
            </div>

            <div class="showcase-tags">
              <span v-for="tag in (item.tags || []).slice(0, 4)" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- 实施建议 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Tips</p>
          <h2>实施建议</h2>
        </div>

        <div class="tips-grid">
          <article v-for="tip in tips" :key="tip.title" class="tip-card">
            <span class="tip-icon">{{ tip.icon }}</span>
            <h4>{{ tip.title }}</h4>
            <p>{{ tip.desc }}</p>
          </article>
        </div>
      </section>

      <!-- 相关链接 -->
      <section class="quick-links-section">
        <div class="home-head">
          <p class="eyebrow">Next Steps</p>
          <p class="home-head-note">继续探索 OpenClaw 的更多内容。</p>
        </div>
        <div class="grid quick-links-grid">
          <NuxtLink to="/best-practices" class="card quick-link-card">
            <span class="tag">实践指南</span>
            <strong>最佳实践</strong>
            <p>学习如何更好地使用 OpenClaw</p>
          </NuxtLink>
          <NuxtLink to="/videos" class="card quick-link-card">
            <span class="tag">教程</span>
            <strong>视频教程</strong>
            <p>观看真实使用演示</p>
          </NuxtLink>
          <NuxtLink to="/community" class="card quick-link-card">
            <span class="tag">社区</span>
            <strong>社区支持</strong>
            <p>与其他用户交流经验</p>
          </NuxtLink>
          <NuxtLink to="/feedback" class="card quick-link-card">
            <span class="tag">反馈</span>
            <strong>提交你的案例</strong>
            <p>分享你的使用经验</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.stat-card {
  display: grid;
  gap: 6px;
  padding: 20px;
  text-align: center;
}

.stat-value {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--brand);
  line-height: 1.1;
}

.stat-label {
  font-size: 0.95rem;
}

.stat-note {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.82rem;
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

/* Quick Stats */
.quick-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-card-mini {
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-card-mini .industry {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--brand);
  text-transform: uppercase;
}

.stat-card-mini .case-name {
  font-weight: 600;
  font-size: 0.85rem;
}

.stat-card-mini .time {
  font-size: 0.8rem;
  color: var(--success);
}

.stat-card-mini .saving {
  font-size: 0.7rem;
  color: var(--ink-soft);
}

/* Industries List */
.industries-list {
  display: grid;
  gap: 8px;
}

.industry-item {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
  overflow: hidden;
}

.industry-item.expanded {
  border-color: var(--brand);
}

.industry-header {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.industry-icon {
  font-size: 1.5rem;
}

.industry-info {
  flex: 1;
}

.industry-info h4 {
  margin: 0;
  font-size: 1rem;
}

.industry-info p {
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.expand-icon {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--brand);
}

.industry-content {
  padding: 0 16px 16px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

/* Cases */
.cases-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.case-card {
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(67, 73, 60, 0.08);
}

.case-card h5 {
  margin: 0 0 12px;
  font-size: 0.95rem;
  color: var(--brand);
}

.case-details {
  display: grid;
  gap: 8px;
}

.detail-row {
  display: flex;
  gap: 8px;
  font-size: 0.85rem;
}

.detail-row .label {
  color: var(--ink-soft);
  min-width: 40px;
}

.detail-row.roi .label {
  color: var(--success);
}

.detail-row.roi span:last-child {
  font-weight: 600;
  color: var(--success);
}

/* SOUL */
.soul-section {
  margin-top: 16px;
}

.soul-section h5 {
  margin: 0 0 8px;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.code-block {
  margin: 0;
  padding: 12px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.03);
  overflow-x: auto;
}

.code-block code {
  font-size: 0.75rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

/* Featured & Showcase */
.featured-section,
.showcase-section,
.quick-links-section {
  margin-top: 24px;
}

.section-heading {
  margin-bottom: 14px;
}

.featured-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.featured-card,
.showcase-card,
.quick-link-card {
  display: grid;
  gap: 10px;
  padding: 18px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.featured-card:hover,
.showcase-card:hover,
.quick-link-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(64, 49, 27, 0.1);
}

.featured-meta,
.showcase-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(166, 111, 44, 0.1);
  color: var(--brand);
}

.tag.secondary {
  background: rgba(67, 73, 60, 0.08);
  color: var(--ink-soft);
}

.featured-card h3,
.showcase-card h3,
.quick-link-card strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.featured-card p,
.showcase-card p,
.quick-link-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.55;
}

.outcomes-list {
  display: grid;
  gap: 4px;
}

.outcome-item {
  font-size: 0.84rem;
  color: var(--brand);
}

.outcomes-section {
  margin-top: 8px;
  padding-top: 10px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

.outcomes-label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.outcomes-list-full {
  margin: 0;
  padding-left: 16px;
  font-size: 0.86rem;
  color: var(--ink-soft);
  line-height: 1.6;
}

.outcomes-list-full li {
  margin-bottom: 4px;
}

.showcase-details {
  display: grid;
  gap: 6px;
}

.showcase-details .detail-row {
  display: flex;
  gap: 8px;
  font-size: 0.84rem;
}

.detail-label {
  color: var(--ink-soft);
}

.detail-value {
  font-weight: 600;
}

.featured-tags,
.showcase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.tag-item {
  font-size: 0.74rem;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.6);
  padding: 3px 8px;
  border-radius: 4px;
}

.showcase-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.quick-links-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

/* Tips */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.tip-card {
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(67, 73, 60, 0.1);
  text-align: center;
}

.tip-icon {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 8px;
}

.tip-card h4 {
  margin: 0 0 8px;
  font-size: 0.9rem;
}

.tip-card p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--ink-soft);
}

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .quick-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .quick-links-grid,
  .tips-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .stats-grid,
  .featured-grid,
  .showcase-grid,
  .quick-links-grid,
  .quick-stats-grid,
  .tips-grid {
    grid-template-columns: 1fr;
  }

  .cases-grid {
    grid-template-columns: 1fr;
  }
}
</style>