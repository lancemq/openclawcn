<script setup lang="ts">
useSeo({
  title: '模型选择指南',
  description: '面向新手、团队与企业的 OpenClaw 模型选择指南，覆盖默认模型、Fallback、成本治理与官方资料索引。',
  path: '/models',
})

const audienceTracks = [
  {
    tag: 'New User',
    title: '第一次部署的人',
    summary: '先选一个默认模型，把第一条链路跑通，再决定要不要多模型。',
    recommendation: '默认优先 Claude Sonnet 4 或 Gemini 2.5 Flash 这类稳定且不至于太贵的主力模型。',
    checklist: ['先跑单模型', '先不做自动路由', '先验证工具调用稳定性'],
  },
  {
    tag: 'Team',
    title: '已经在用的团队',
    summary: '重点不再是“哪个最强”，而是怎样把主力模型、轻量模型和备用链配合起来。',
    recommendation: '优先做主力 + 轻量 + fallback 三层结构，把成本和稳定性一起管起来。',
    checklist: ['主力模型', '轻量模型', '失败回退链'],
  },
  {
    tag: 'Enterprise',
    title: '企业与合规场景',
    summary: '真正需要先看的不是模型榜单，而是数据边界、供应商稳定性、法务和预算机制。',
    recommendation: '优先筛掉不合规的候选，再在可接受范围里比较效果、上下文、延迟和价格。',
    checklist: ['数据边界', '供应商 SLA', '成本上限与审计'],
  },
]

const heroSignals = [
  {
    label: '推荐起点',
    value: '默认模型先跑稳',
  },
  {
    label: '第二层',
    value: '轻量模型吃掉低风险任务',
  },
  {
    label: '最后再加',
    value: 'Fallback、缓存与预算治理',
  },
]

const decisionSteps = [
  {
    index: '01',
    title: '先定义默认模型',
    description: '默认模型决定了大多数任务的体验。只有默认模型稳定，后面的 fallback 和自动路由才值得加。',
  },
  {
    index: '02',
    title: '再补轻量模型',
    description: '把格式化、摘要、简单分类、批量重写这类任务切给便宜模型，通常比一上来做复杂路由更划算。',
  },
  {
    index: '03',
    title: '最后再上 fallback 与治理',
    description: '当你已经遇到限流、偶发失败、成本波动或多团队共享时，再把回退链、配额和缓存体系补齐。',
  },
]

const familySections = [
  {
    title: 'Anthropic / Claude',
    eyebrow: '稳定主力',
    description: '如果你的第一目标是工具调用稳定、代码辅助和长会话中的一致性，Claude 仍然是很稳的默认起点。',
    recommendation: '大多数 OpenClaw 使用者可以先从 Claude Sonnet 4 起步。',
    models: [
      {
        name: 'Claude Sonnet 4',
        role: '默认主力',
        why: 'Anthropic 官方模型总览在 2026 年 3 月仍把它放在主力位置，输入 $3 / 输出 $15 每百万 tokens，适合代码、工具调用和一般复杂任务。',
      },
      {
        name: 'Claude Haiku 3.5',
        role: '轻量任务',
        why: '输入 $0.8 / 输出 $4，每百万 tokens，适合简单分类、短摘要、格式化和低成本批处理。',
      },
      {
        name: 'Claude Opus 4.1',
        role: '高复杂度兜底',
        why: '适合极少数高复杂推理与高价值场景，但成本显著更高，不适合作为全天候默认模型。',
      },
    ],
    caution: 'Anthropic 官方总览同时标注了 Sonnet 3.5 已 deprecated，因此旧配置不建议继续作为新项目默认值。',
  },
  {
    title: 'OpenAI / GPT',
    eyebrow: '多模态与通用能力',
    description: '如果你的重点是视觉理解、通用 API 生态或和现有 OpenAI 工作流保持一致，GPT 系列更适合作为多模态主力。',
    recommendation: '当前更值得关注的是 GPT-5.4 这一档，而不是继续沿用老的 4o 主力思路。',
    models: [
      {
        name: 'GPT-5.4',
        role: '多模态主力',
        why: 'OpenAI 在 2026 年 3 月最新发布说明中给出 API 价格为输入 $2.5 / 输出 $15，每百万 tokens，适合通用主力与复杂协作任务。',
      },
      {
        name: 'GPT-5.4 Pro',
        role: '高复杂任务',
        why: '更适合极高价值推理、难度高的代码与复杂分析，但价格已经进入必须强约束预算的级别。',
      },
      {
        name: 'Mini 级模型',
        role: '低成本补位',
        why: '如果你在 OpenAI 体系里做批量处理、轻量摘要或低风险自动化，应优先选择当前控制台中可用的 mini 级模型补位。',
      },
    ],
    caution: 'OpenAI 模型更新节奏快，生产环境建议尽量锁定明确型号或快照，不要长期依赖“自动跟随最新”。',
  },
  {
    title: 'Google / Gemini',
    eyebrow: '长上下文与文档任务',
    description: '如果你经常处理长文档、长上下文检索、批量资料整理和带 grounding 的检索类任务，Gemini 更值得重点看。',
    recommendation: 'Gemini 2.5 Pro 适合高质量长文档，Gemini 2.5 Flash / Flash Lite 更适合成本敏感的流量层。',
    models: [
      {
        name: 'Gemini 2.5 Pro',
        role: '长文档主力',
        why: 'Vertex AI 官方价格页显示 <=200K 输入时输入 $1.25 / 输出 $10，每百万 tokens，适合长上下文分析与高质量总结。',
      },
      {
        name: 'Gemini 2.5 Flash',
        role: '轻量主力',
        why: '输入 $0.30 / 输出 $2.50，每百万 tokens，适合高并发、批处理和需要保留一定质量的低成本主力。',
      },
      {
        name: 'Gemini 2.5 Flash Lite',
        role: '低成本流量层',
        why: '输入 $0.10 / 输出 $0.40，每百万 tokens，适合分类、路由预判和大规模轻任务。',
      },
    ],
    caution: 'Gemini 的长上下文、grounding 与 batch 优势很明显，但如果你的主要价值来自工具调用一致性，仍要先做小规模验证。',
  },
  {
    title: 'DeepSeek 与国产合规路线',
    eyebrow: '中文成本与边界控制',
    description: '如果你的首要问题是中文成本、数据边界或国内供应商接入便利性，这一组模型通常更值得进入候选名单。',
    recommendation: '把这一类看成“合规 / 成本 / 中文体验”的方案池，而不是无条件替代国际主力模型。',
    models: [
      {
        name: 'DeepSeek Chat / Reasoner',
        role: '中文成本优先',
        why: 'DeepSeek 官方 API 文档长期强调其低成本与推理分层路线，适合中文写作、总结与成本敏感任务。',
      },
      {
        name: 'Qwen / 通义路线',
        role: '国内企业接入',
        why: '更适合要走国内云平台、审计流程和数据边界管理的团队，尤其是本来就运行在阿里云生态里的团队。',
      },
      {
        name: '混元 / 豆包等厂商模型',
        role: '平台协同',
        why: '如果你的办公和消息入口本来就强依赖企业微信、飞书或其他国内平台，模型选择往往应跟平台能力一起判断。',
      },
    ],
    caution: '这一路线不建议直接靠网上旧价目表拍板，应该以你实际接入的平台控制台报价、区域和合规要求为准。',
  },
]

const scenarioMatrix = [
  {
    title: '默认主力配置',
    audience: '适合新手 / 小团队',
    answer: 'Claude Sonnet 4 或 GPT-5.4',
    note: '优先选你最容易稳定接入、调试和结算的一家，不要第一天就同时接三家。',
  },
  {
    title: '长文档与知识库问答',
    audience: '适合资料型团队',
    answer: 'Gemini 2.5 Pro',
    note: '当文档长度和上下文压缩能力开始成为关键变量时，Gemini 路线通常更值得单独评估。',
  },
  {
    title: '高并发轻量任务',
    audience: '适合内容流水线',
    answer: 'Claude Haiku 3.5 / Gemini 2.5 Flash / Flash Lite',
    note: '把便宜模型放在摘要、分类、改写和格式化这类任务上，节省往往比换一家主力模型更直接。',
  },
  {
    title: '合规与数据边界优先',
    audience: '适合企业',
    answer: '国产模型 + 本地模型池',
    note: '先过数据与法务要求，再在合规范围内做效果和成本比较。',
  },
  {
    title: '复杂推理或高价值审批',
    audience: '适合高风险流程',
    answer: '主力模型 + 高级兜底模型',
    note: '不要把高价模型放到所有流量上，而是把它保留给极少数必须高质量处理的节点。',
  },
  {
    title: '视觉与截图理解',
    audience: '适合多模态工作流',
    answer: 'GPT-5.4',
    note: '如果你的工作流经常要看界面、图片、截图和复杂视觉输入，OpenAI 路线会更自然。',
  },
]

const modelCategories = [
  {
    title: 'Claude 系列',
    provider: 'Anthropic',
    description: 'OpenClaw 默认主力里最稳的一组，工具调用和代码辅助表现通常更可预期。',
    models: [
      { name: 'Claude Sonnet 4.6', id: 'claude-sonnet-4-6', best: true, features: ['工具调用稳定', '代码能力强', '主力默认值'], price: '$3/$15', useCase: '主力模型' },
      { name: 'Claude 3.5 Haiku', id: 'claude-3-5-haiku', features: ['速度快', '成本低'], price: '$0.8/$4', useCase: '轻量任务' },
      { name: 'Claude Opus 4.6', id: 'claude-opus-4-6', features: ['推理最强', '复杂任务兜底'], price: '$15/$75', useCase: '复杂推理' },
    ],
  },
  {
    title: 'GPT 系列',
    provider: 'OpenAI',
    description: '多模态和视觉理解更突出，适合截图、界面和复杂图像输入工作流。',
    models: [
      { name: 'GPT-5.4', id: 'gpt-5.4', best: true, features: ['多模态主力', '视觉理解', '通用能力强'], price: '$2.5/$15', useCase: '图片分析 / 通用主力' },
      { name: 'GPT mini 级', id: 'gpt-mini', features: ['低成本', '批量处理'], price: '视控制台而定', useCase: '轻量批量任务' },
      { name: 'GPT-5.4 Pro', id: 'gpt-5-4-pro', features: ['高复杂度', '高价值任务'], price: '高价位', useCase: '复杂推理' },
    ],
  },
  {
    title: 'DeepSeek 系列',
    provider: 'DeepSeek',
    description: '中文成本表现突出，适合总结、写作和成本敏感型内容流水线。',
    models: [
      { name: 'DeepSeek Chat', id: 'deepseek-chat', best: true, features: ['中文性价比', '低成本'], price: '$0.3/$0.5', useCase: '中文写作' },
      { name: 'DeepSeek Reasoner', id: 'deepseek-reasoner', features: ['推理增强', '复杂分析'], price: '$0.55/$2.19', useCase: '逻辑推理' },
    ],
  },
  {
    title: 'Gemini 系列',
    provider: 'Google',
    description: '长上下文和资料处理更有优势，适合知识库和长文档工作流。',
    models: [
      { name: 'Gemini 2.5 Pro', id: 'gemini-2-5-pro', best: true, features: ['长上下文', '文档理解'], price: '$1.25/$10', useCase: '长文档' },
      { name: 'Gemini 2.5 Flash', id: 'gemini-2-5-flash', features: ['高并发', '速度快'], price: '$0.3/$2.5', useCase: '简单任务' },
      { name: 'Gemini 2.5 Flash Lite', id: 'gemini-2-5-flash-lite', features: ['超低成本', '大规模轻任务'], price: '$0.1/$0.4', useCase: '分类 / 路由' },
    ],
  },
  {
    title: '国产模型',
    provider: '阿里 / 腾讯 / 字节',
    description: '更适合要把数据边界、平台接入和合规要求一起考虑的团队。',
    models: [
      { name: 'Qwen2.5-72B', id: 'qwen2.5-72b', best: true, features: ['国内合规', '云平台友好'], price: '¥4/¥12', useCase: '合规场景' },
      { name: '腾讯混元', id: 'hunyuan-pro', features: ['企业生态', '平台协同'], price: '¥4/¥12', useCase: '企微用户' },
      { name: '豆包 Pro', id: 'doubao-pro', features: ['飞书生态', '低成本'], price: '¥0.8/¥2', useCase: '飞书用户' },
    ],
  },
]

const routingPatterns = [
  {
    title: '单模型起步',
    description: '适合第一次部署或还没稳定跑通的团队。先把默认模型、最大 tokens 和错误处理跑顺。',
    code: `{
  "llm": {
    "provider": "anthropic",
    "model": "claude-sonnet-4"
  }
}`,
  },
  {
    title: '主力 + 轻量分层',
    description: '把批量摘要、格式化、短改写交给轻量模型，把真实复杂任务留给主力模型。',
    code: `{
  "llm": {
    "default": { "provider": "anthropic", "model": "claude-sonnet-4" },
    "cheap": { "provider": "google", "model": "gemini-2.5-flash" }
  },
  "routing": {
    "simplePatterns": ["摘要", "格式化", "提炼要点"],
    "simpleModel": "cheap",
    "defaultModel": "default"
  }
}`,
  },
  {
    title: '主力 + Fallback 链',
    description: '适合已经有真实流量、不能接受单一供应商偶发失败的团队。',
    code: `{
  "llm": {
    "fallbackChain": [
      { "provider": "anthropic", "model": "claude-sonnet-4", "priority": 1 },
      { "provider": "openai", "model": "gpt-5.4", "priority": 2 },
      { "provider": "google", "model": "gemini-2.5-flash", "priority": 3 }
    ]
  }
}`,
  },
]

const governancePanels = [
  {
    title: '别先做复杂路由',
    emphasis: '先把默认模型跑稳',
    description: '许多团队一开始的问题不是“模型选错了”，而是配置、权限、网络、SOUL 和上下文策略都还没稳定。',
  },
  {
    title: '真正贵的是长上下文',
    emphasis: '不是单次单价，而是累计历史',
    description: '系统提示过长、对话历史无限累积、重复重试和无缓存，通常比模型单价更容易把预算吃光。',
  },
  {
    title: '把高价模型留给高价值节点',
    emphasis: '高复杂任务才值得高单价',
    description: '审批、复杂分析、代码审查和重要对外生成可以用高等级模型，但不要让它处理所有低风险流水任务。',
  },
]

const costPractices = [
  {
    title: '缩短 SOUL 与系统提示',
    saving: '20% - 40%',
    detail: '把人格设定和规则写得清楚，不等于写得越长越好。能结构化的内容尽量结构化。',
  },
  {
    title: '压缩历史上下文',
    saving: '最常见的成本拐点',
    detail: '长会话最好配摘要、阶段归档或清理策略，不要让所有历史都一直原样保留。',
  },
  {
    title: '用轻量模型吞掉批量任务',
    saving: '显著降低平均成本',
    detail: '摘要、分类、标题生成、格式清洗这类任务不该长期占用最贵的主力模型。',
  },
  {
    title: '对重复内容启用缓存',
    saving: 'Anthropic / Google 路线更明显',
    detail: '固定前缀、长说明、重复模板和大文档场景更值得用缓存或 batch 能力。',
  },
  {
    title: '设预算与告警',
    saving: '避免灾难性超支',
    detail: '真正的企业策略不是“希望不要超”，而是设置硬阈值、分环境限额和供应商配额。',
  },
]

const costTips = [
  { title: 'SOUL / 系统提示最小化', saving: '节省 20% - 40%', desc: '精简前置提示，把能结构化的规则写成清晰短句，避免长篇开场白。' },
  { title: '开启 Prompt Caching', saving: '节省 40% - 60%', desc: '对重复前缀、固定模板和长文档处理尤其有效。' },
  { title: '对话历史压缩', saving: '节省 80%', desc: '长会话应该做摘要、阶段归档或清理，不要无限原样累积。' },
  { title: '批量处理', saving: '节省接近 99%', desc: '能合并的任务尽量合并，不要把一串小请求拆成重复调用。' },
  { title: '设置成本上限', saving: '避免灾难性超支', desc: '成本控制不是愿望，要靠硬阈值、告警和预算分层。' },
]

const budgetPlans = [
  { title: '个人副业', budget: '$50/月', primary: 'Claude 3.5 Haiku', secondary: 'Gemini Flash', capacity: '每日约 1000 次轻量调用' },
  { title: '小团队服务', budget: '$200/月', primary: 'Claude Sonnet 4.6（60%）', secondary: 'Haiku（35%）', capacity: '支持 2-10 人团队' },
  { title: '内容创作工作室', budget: '$100/月', primary: 'DeepSeek Chat（70%）', secondary: 'GPT-5.4（20%）', capacity: '月产数千条短内容' },
  { title: '数据合规企业', budget: '¥1000/月', primary: 'Qwen2.5-72B', secondary: '本地 Ollama', capacity: '数据不出境优先' },
  { title: '高可用生产系统', budget: '$500+/月', primary: '多模型冗余', secondary: '自动故障转移', capacity: '面向稳定性与 SLA' },
]

const codingPlans = [
  { platform: '阿里云百炼', model: 'Qwen2.5-Coder', free: '100 万 tokens / 月', price: '¥2 / M' },
  { platform: 'DeepSeek 官方', model: 'DeepSeek-V3 / R1', free: '注册送体验金', price: '¥1 / M' },
  { platform: '字节火山引擎', model: 'Doubao-pro', free: '50 万 tokens / 月', price: '¥0.8 / M' },
  { platform: '智谱 AI', model: 'GLM-4-Flash', free: '长期免费额度', price: '¥0.1 / M' },
]

const enterpriseChecklist = [
  '数据是否允许出境，或者必须走指定区域 / 指定云平台',
  '是否需要供应商级别的审计、对账、SLA 和采购流程',
  '是否要给不同业务线分配独立模型配额和成本中心',
  '是否需要把高风险任务和低风险任务拆到不同模型层',
  '是否需要本地模型或私有部署作为兜底能力',
]

const sourceCards = [
  {
    title: 'OpenAI: GPT-5.4 发布说明',
    description: '确认 GPT-5.4 与 GPT-5.4 Pro 的最新能力和 API 价格。',
    href: 'https://openai.com/index/introducing-gpt-5-4/',
    meta: 'OpenAI',
  },
  {
    title: 'Anthropic: Claude Models Overview',
    description: '确认 Claude 4 / 3.5 系列的当前价格、上下文和 deprecated 状态。',
    href: 'https://docs.anthropic.com/en/docs/about-claude/models/overview',
    meta: 'Anthropic',
  },
  {
    title: 'Google: Vertex AI Gemini Pricing',
    description: '确认 Gemini 2.5 Pro / Flash / Flash Lite 的当前计费与长上下文价格。',
    href: 'https://cloud.google.com/vertex-ai/generative-ai/pricing',
    meta: 'Google Cloud',
  },
  {
    title: 'DeepSeek: Pricing',
    description: '核对 DeepSeek 官方 API 价格与模型分层，不建议长期引用旧截图或二手价目表。',
    href: 'https://api-docs.deepseek.com/quick_start/pricing',
    meta: 'DeepSeek',
  },
]

const relatedLinks = [
  {
    title: '模型层理解',
    description: '先把 provider、模型、上下文和工具层之间的关系理顺。',
    to: '/docs/manual/models-overview',
    meta: 'Docs',
  },
  {
    title: '模型策略与成本',
    description: '从长期运行视角理解默认模型、缓存、上下文与预算。',
    to: '/docs/operations/model-strategy-and-cost',
    meta: 'Ops',
  },
  {
    title: 'Provider 与 Fallback',
    description: '继续看多提供商配置、回退链与认证方式。',
    to: '/docs/manual/providers-and-fallback',
    meta: 'Config',
  },
  {
    title: '关键配置',
    description: '回到统一配置页核对 openclaw.json、SOUL 与 provider 配置。',
    to: '/configurations',
    meta: 'Config',
  },
]
</script>

<template>
  <section class="section models-feature">
    <div class="container models-shell">
      <section class="hero-dossier">
        <div class="hero-copy">
          <p class="eyebrow">Model Dossier</p>
          <h1 class="section-title">根据任务类型、预算和边界选择更合适的模型</h1>
          <p class="section-copy">
            这里整理的是不同模型在
            <strong>默认模型</strong>、<strong>轻量模型</strong>、<strong>备用链</strong>、
            <strong>预算</strong> 和 <strong>合规边界</strong> 上的常见取舍，方便你按自己的使用场景做判断。
          </p>

          <div class="hero-note">
            <span class="mini-label">资料时点</span>
            <p>以下对公开模型与价格的整理，基于 2026 年 3 月 18 日可查到的官方资料。真正上线前，仍建议你在各供应商控制台再核一遍可用型号和计费口径。</p>
          </div>

          <div class="hero-signal-strip">
            <article v-for="item in heroSignals" :key="item.label" class="hero-signal-card">
              <span class="mini-label">{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </article>
          </div>
        </div>

        <aside class="hero-margin">
          <div class="margin-card">
            <span class="mini-label">一句话建议</span>
            <strong>先定默认模型，再补便宜模型，最后才做自动路由。</strong>
            <p>多数团队最开始的问题不是模型不够强，而是链路还不稳、上下文太长、预算没设上限。</p>
          </div>
          <div class="margin-card">
            <span class="mini-label">如何使用</span>
            <strong>先按你的角色看，再看模型家族。</strong>
            <p>如果你是第一次部署，先看默认模型；如果你已经在跑真实流量，再看轻量模型、Fallback 和预算治理。</p>
          </div>
        </aside>
      </section>

      <section class="audience-ribbon">
        <article v-for="item in audienceTracks" :key="item.title" class="audience-card">
          <span class="audience-tag">{{ item.tag }}</span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.summary }}</p>
          <strong>{{ item.recommendation }}</strong>
          <div class="chip-row">
            <span v-for="point in item.checklist" :key="point" class="chip">{{ point }}</span>
          </div>
        </article>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Decision Path</p>
          <h2>更稳的决策顺序</h2>
          <p class="section-copy">选模型时，先把默认模型跑稳，再逐步补轻量模型、Fallback 和预算控制，通常比一次做全更可靠。</p>
        </div>

        <div class="step-column">
          <article v-for="step in decisionSteps" :key="step.index" class="step-card">
            <span class="step-index">{{ step.index }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="editorial-grid">
        <div class="editorial-main">
          <section
            v-for="family in familySections"
            :key="family.title"
            class="card section-panel family-panel"
          >
            <div class="section-head family-head">
              <div>
                <p class="eyebrow">{{ family.eyebrow }}</p>
                <h2>{{ family.title }}</h2>
              </div>
              <p class="family-recommendation">{{ family.recommendation }}</p>
            </div>

            <p class="section-copy">{{ family.description }}</p>

            <div class="family-models">
              <article v-for="model in family.models" :key="model.name" class="family-model-card">
                <div class="family-model-top">
                  <h3>{{ model.name }}</h3>
                  <span class="role-pill">{{ model.role }}</span>
                </div>
                <p>{{ model.why }}</p>
              </article>
            </div>

            <div class="family-caution">
              <span class="mini-label">判断提醒</span>
              <p>{{ family.caution }}</p>
            </div>
          </section>
        </div>

        <aside class="editorial-side">
          <section class="card sidebar-panel">
            <p class="eyebrow">Quick Matrix</p>
            <h2>典型场景怎么选</h2>
            <div class="matrix-list">
              <article v-for="item in scenarioMatrix" :key="item.title" class="matrix-item">
                <span class="mini-label">{{ item.audience }}</span>
                <strong>{{ item.title }}</strong>
                <p class="matrix-answer">{{ item.answer }}</p>
                <p>{{ item.note }}</p>
              </article>
            </div>
          </section>

          <section class="card sidebar-panel">
            <p class="eyebrow">Enterprise</p>
            <h2>企业先问这 5 个问题</h2>
            <ul class="checklist">
              <li v-for="item in enterpriseChecklist" :key="item">{{ item }}</li>
            </ul>
          </section>
        </aside>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Routing Patterns</p>
          <h2>推荐从这三种配置阶段进入</h2>
          <p class="section-copy">不要把单模型、轻量分流和 fallback 混在第一天一起做。分阶段推进更容易排错。</p>
        </div>

        <div class="routing-layout">
          <article v-for="pattern in routingPatterns" :key="pattern.title" class="routing-card">
            <h3>{{ pattern.title }}</h3>
            <p>{{ pattern.description }}</p>
            <pre class="code-block"><code>{{ pattern.code }}</code></pre>
          </article>
        </div>
      </section>

      <section class="governance-band">
        <article v-for="panel in governancePanels" :key="panel.title" class="governance-card">
          <span class="mini-label">{{ panel.title }}</span>
          <strong>{{ panel.emphasis }}</strong>
          <p>{{ panel.description }}</p>
        </article>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Comparison Appendix</p>
          <h2>按型号做一轮横向对比</h2>
          <p class="section-copy">如果你已经完成了上面的判断，还想进一步横向看各模型家族的价格、定位和典型用途，这一块可以作为对照附录。</p>
        </div>

        <div class="comparison-grid">
          <article v-for="cat in modelCategories" :key="cat.title" class="comparison-card">
            <div class="comparison-head">
              <div>
                <h3>{{ cat.title }}</h3>
                <p>{{ cat.description }}</p>
              </div>
              <span class="provider-tag">{{ cat.provider }}</span>
            </div>

            <div class="comparison-models">
              <article
                v-for="model in cat.models"
                :key="model.id"
                class="comparison-model"
                :class="{ best: model.best }"
              >
                <div class="comparison-model-top">
                  <strong>{{ model.name }}</strong>
                  <span v-if="model.best" class="best-tag">推荐</span>
                </div>
                <div class="chip-row">
                  <span v-for="f in model.features" :key="f" class="chip">{{ f }}</span>
                </div>
                <div class="comparison-meta">
                  <span>成本：{{ model.price }}</span>
                  <span>{{ model.useCase }}</span>
                </div>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Cost Governance</p>
          <h2>真正能省钱的不是换一家模型，而是把系统行为管住</h2>
        </div>

        <div class="cost-grid">
          <article v-for="item in costPractices" :key="item.title" class="cost-card">
            <h3>{{ item.title }}</h3>
            <span class="saving-pill">{{ item.saving }}</span>
            <p>{{ item.detail }}</p>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Quick Savings</p>
          <h2>上一版保留的成本优化抓手</h2>
          <p class="section-copy">这几项更像是落到日常操作层的“立刻能做的事”，和上面的治理策略可以一起看。</p>
        </div>

        <div class="tips-grid">
          <article v-for="tip in costTips" :key="tip.title" class="tip-item">
            <h3>{{ tip.title }}</h3>
            <span class="saving-pill">{{ tip.saving }}</span>
            <p>{{ tip.desc }}</p>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Budget Plans</p>
          <h2>预算方案恢复版</h2>
          <p class="section-copy">这部分保留旧版的预算感知，帮助你快速把“预算”和“模型组合”连起来看。</p>
        </div>

        <div class="plans-grid">
          <article v-for="plan in budgetPlans" :key="plan.title" class="plan-card">
            <div class="plan-header">
              <h3>{{ plan.title }}</h3>
              <span class="budget-pill">{{ plan.budget }}</span>
            </div>
            <div class="plan-models">
              <div class="model-row">
                <span class="label">主力</span>
                <span>{{ plan.primary }}</span>
              </div>
              <div class="model-row">
                <span class="label">备用</span>
                <span>{{ plan.secondary }}</span>
              </div>
            </div>
            <p class="plan-capacity">{{ plan.capacity }}</p>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Coding Plans</p>
          <h2>国内 Coding Plan 参考</h2>
          <p class="section-copy">保留这部分是为了方便你做国内模型试用和代码场景的成本摸底，它不替代实际控制台报价。</p>
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

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Official Sources</p>
          <h2>建议直接核对的一手资料</h2>
          <p class="section-copy">如果你要做采购、上线或长期策略判断，最好直接回到这些官方页面核对可用型号、计费方式和最新能力。</p>
        </div>

        <div class="source-grid">
          <article v-for="item in sourceCards" :key="item.href" class="source-card">
            <span class="source-meta">{{ item.meta }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <a :href="item.href" target="_blank" rel="noreferrer" class="source-link">打开原文</a>
          </article>
        </div>
      </section>

      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Cross Access</p>
          <h2>把模型问题放回完整结构里</h2>
          <p class="section-copy">真正落地时，模型从来不是孤立决策。你还需要回到文档、配置和运维链路里继续核对。</p>
        </div>

        <div class="related-grid">
          <NuxtLink v-for="item in relatedLinks" :key="item.to" :to="item.to" class="related-card">
            <span class="source-meta">{{ item.meta }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.models-feature {
  background:
    radial-gradient(circle at top left, rgba(12, 108, 105, 0.09), transparent 34%),
    radial-gradient(circle at top right, rgba(196, 166, 97, 0.11), transparent 28%);
}

.models-shell {
  display: grid;
  gap: 24px;
}

.hero-dossier {
  display: grid;
  grid-template-columns: minmax(0, 1.72fr) minmax(280px, 0.88fr);
  gap: 16px;
  align-items: start;
}

.hero-copy {
  display: grid;
  gap: 16px;
  padding: clamp(22px, 2.6vw, 30px);
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(255, 251, 245, 0.88), rgba(249, 244, 234, 0.72));
  box-shadow: 0 20px 48px rgba(74, 56, 28, 0.08);
}

.hero-copy .section-title {
  margin: 0;
}

.hero-note,
.margin-card,
.audience-card,
.step-card,
.family-model-card,
.sidebar-panel,
.routing-card,
.governance-card,
.cost-card,
.source-card,
.related-card {
  display: grid;
  gap: 10px;
}

.hero-note {
  padding-top: 14px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

.hero-note p,
.family-model-card p,
.family-caution p,
.routing-card p,
.governance-card p,
.cost-card p,
.source-card p,
.related-card p,
.matrix-item p,
.audience-card p,
.step-card p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.7;
}

.hero-margin,
.matrix-list {
  display: grid;
  gap: 14px;
}

.hero-signal-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.hero-signal-card {
  display: grid;
  gap: 6px;
  padding: 12px 14px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.54);
}

.hero-signal-card strong {
  font-family: "Fraunces", "Noto Serif SC", "Songti SC", serif;
  font-size: 0.96rem;
  line-height: 1.35;
}

.margin-card {
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.6);
}

.margin-card strong,
.governance-card strong,
.matrix-item strong,
.step-card h3,
.routing-card h3,
.cost-card h3,
.source-card h3 {
  font-family: "Fraunces", "Noto Serif SC", "Songti SC", serif;
  line-height: 1.3;
}

.audience-ribbon {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.audience-card {
  padding: 20px;
  border-radius: 24px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.58);
}

.audience-card h2 {
  margin: 0;
  font-family: "Fraunces", "Noto Serif SC", "Songti SC", serif;
  font-size: 1.08rem;
}

.audience-card strong {
  font-size: 0.92rem;
  line-height: 1.65;
}

.audience-tag,
.source-meta {
  display: inline-flex;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.12);
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip,
.role-pill,
.saving-pill {
  display: inline-flex;
  width: fit-content;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(67, 73, 60, 0.08);
  color: var(--ink-soft);
  font-size: 0.76rem;
  font-weight: 700;
}

.section-panel {
  display: grid;
  gap: 18px;
}

.section-head {
  display: grid;
  gap: 4px;
}

.section-head h2,
.sidebar-panel h2 {
  margin: 0;
  font-family: "Fraunces", "Noto Serif SC", "Songti SC", serif;
  font-size: clamp(1.2rem, 1.8vw, 1.65rem);
  line-height: 1.25;
}

.step-column {
  display: grid;
  gap: 12px;
}

.step-card {
  grid-template-columns: auto 1fr;
  align-items: start;
  padding: 18px 20px;
  border-radius: 22px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.48);
}

.step-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: rgba(196, 166, 97, 0.18);
  color: #7d5e13;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.step-card h3 {
  margin: 0 0 6px;
  font-size: 1rem;
}

.editorial-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  gap: 18px;
  align-items: start;
}

.editorial-main,
.editorial-side {
  display: grid;
  gap: 18px;
}

.family-panel {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 251, 244, 0.56));
}

.family-head {
  grid-template-columns: minmax(0, 1fr) minmax(220px, 0.7fr);
  gap: 14px;
  align-items: end;
}

.family-recommendation {
  margin: 0;
  color: var(--brand);
  font-weight: 700;
  line-height: 1.6;
}

.family-models {
  display: grid;
  gap: 12px;
}

.family-model-card {
  padding: 16px 18px;
  border-radius: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.5);
}

.family-model-top {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.family-model-top h3 {
  margin: 0;
  font-size: 1.02rem;
  font-family: "Fraunces", "Noto Serif SC", "Songti SC", serif;
}

.family-caution {
  padding-top: 10px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

.sidebar-panel {
  padding: 20px;
}

.matrix-item + .matrix-item {
  padding-top: 12px;
  border-top: 1px solid rgba(67, 73, 60, 0.08);
}

.matrix-answer {
  color: var(--brand) !important;
  font-weight: 700;
}

.checklist {
  margin: 0;
  padding-left: 20px;
  color: var(--ink-soft);
  line-height: 1.8;
}

.routing-layout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.routing-card {
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.46);
}

.routing-card h3,
.cost-card h3,
.source-card h3 {
  margin: 0;
  font-size: 1rem;
}

.code-block {
  margin: 0;
  padding: 14px;
  border-radius: 16px;
  background: rgba(28, 35, 34, 0.94);
  color: rgba(246, 242, 234, 0.94);
  overflow-x: auto;
}

.code-block code {
  font-size: 0.76rem;
  line-height: 1.6;
}

.governance-band {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.governance-card {
  padding: 20px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(12, 108, 105, 0.08), rgba(255, 255, 255, 0.64));
  border: 1px solid rgba(12, 108, 105, 0.12);
}

.cost-grid,
.comparison-grid,
.source-grid,
.related-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.comparison-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.comparison-card,
.cost-card,
.source-card,
.related-card {
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.46);
}

.comparison-card {
  display: grid;
  gap: 14px;
}

.comparison-head {
  display: flex;
  gap: 12px;
  align-items: start;
  justify-content: space-between;
}

.comparison-head h3,
.tip-item h3,
.plan-header h3 {
  margin: 0;
  font-family: "Fraunces", "Noto Serif SC", "Songti SC", serif;
  font-size: 1rem;
  line-height: 1.35;
}

.comparison-head p {
  margin: 6px 0 0;
  color: var(--ink-soft);
}

.provider-tag {
  display: inline-flex;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.1);
  color: var(--brand);
  font-size: 0.74rem;
  font-weight: 800;
}

.comparison-models,
.tips-grid,
.plans-grid,
.coding-plans-list {
  display: grid;
  gap: 12px;
}

.comparison-model,
.tip-item,
.plan-card {
  display: grid;
  gap: 10px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  background: rgba(255, 255, 255, 0.56);
}

.comparison-model.best {
  border-color: rgba(12, 108, 105, 0.2);
  background: linear-gradient(180deg, rgba(12, 108, 105, 0.06), rgba(255, 255, 255, 0.58));
}

.comparison-model-top {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.best-tag,
.budget-pill {
  display: inline-flex;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 800;
}

.best-tag {
  background: rgba(12, 108, 105, 0.14);
  color: var(--brand);
}

.comparison-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--ink-soft);
  font-size: 0.82rem;
}

.saving-pill {
  background: rgba(196, 166, 97, 0.18);
  color: #7d5e13;
}

.tips-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.tip-item {
  text-align: center;
}

.plans-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.plan-header {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.budget-pill {
  background: rgba(15, 118, 110, 0.1);
  color: var(--brand);
}

.plan-models {
  display: grid;
  gap: 8px;
}

.model-row {
  display: flex;
  gap: 8px;
  font-size: 0.84rem;
}

.model-row .label {
  color: var(--ink-soft);
  min-width: 36px;
}

.plan-capacity {
  margin: 0;
  padding-top: 8px;
  border-top: 1px solid rgba(67, 73, 60, 0.08);
  color: var(--brand);
  font-size: 0.8rem;
}

.coding-plan-item {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 0.6fr;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.48);
  border: 1px solid rgba(67, 73, 60, 0.1);
  font-size: 0.85rem;
}

.coding-plan-item .platform {
  font-weight: 700;
}

.coding-plan-item .model,
.coding-plan-item .price {
  color: var(--ink-soft);
}

.coding-plan-item .free {
  color: var(--brand);
}

.source-link {
  color: var(--brand);
  font-weight: 700;
}

.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 1100px) {
  .hero-dossier,
  .editorial-grid,
  .routing-layout,
  .governance-band,
  .comparison-grid,
  .cost-grid,
  .source-grid,
  .related-grid {
    grid-template-columns: 1fr;
  }

  .audience-ribbon,
  .tips-grid,
  .plans-grid {
    grid-template-columns: 1fr;
  }

  .hero-signal-strip {
    grid-template-columns: 1fr;
  }

  .family-head {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .step-card,
  .coding-plan-item {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .models-shell {
    gap: 18px;
  }

  .hero-copy,
  .margin-card,
  .audience-card,
  .sidebar-panel,
  .routing-card,
  .governance-card,
  .comparison-card,
  .cost-card,
  .source-card,
  .related-card,
  .tip-item,
  .plan-card {
    padding: 14px;
    border-radius: 18px;
  }

  .hero-copy,
  .section-panel {
    gap: 14px;
  }

  .hero-copy .section-title,
  .section-head h2,
  .sidebar-panel h2 {
    line-height: 1.16;
  }

  .hero-note p,
  .family-model-card p,
  .family-caution p,
  .routing-card p,
  .governance-card p,
  .cost-card p,
  .source-card p,
  .related-card p,
  .matrix-item p,
  .audience-card p,
  .step-card p,
  .comparison-head p,
  .plan-capacity,
  .model-row {
    font-size: 0.84rem;
    line-height: 1.6;
  }

  .audience-card h2,
  .family-model-top h3,
  .comparison-head h3,
  .tip-item h3,
  .plan-header h3,
  .routing-card h3,
  .cost-card h3,
  .source-card h3,
  .step-card h3 {
    font-size: 0.96rem;
    line-height: 1.36;
  }

  .step-card {
    padding: 14px;
    border-radius: 18px;
  }

  .step-index {
    width: 38px;
    height: 38px;
  }

  .family-model-card {
    padding: 14px;
    border-radius: 18px;
  }

  .comparison-model,
  .tip-item,
  .plan-card {
    padding: 14px;
    border-radius: 16px;
  }

  .comparison-model-top,
  .plan-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .coding-plan-item {
    padding: 12px 14px;
    gap: 6px;
    border-radius: 14px;
    font-size: 0.82rem;
  }
}
</style>
