export const docsOverview = [
  {
    title: 'OpenClaw 是什么',
    description: '用中文快速理解 OpenClaw 的定位、使用方式和它与普通聊天产品的差别。',
    to: '/docs/getting-started/what-is-openclaw',
    meta: '产品',
  },
  {
    title: '快速入门',
    description: '用 5 到 10 分钟建立整体认识，并明确第一次上手时更稳妥的阅读和配置顺序。',
    to: '/docs/getting-started/getting-started',
    meta: '入门',
  },
  {
    title: '安装与环境',
    description: '整理环境准备、平台差异、网络注意点和首次安装后的最小验证步骤。',
    to: '/docs/setup/installation',
    meta: '安装',
  },
  {
    title: 'Gateway 架构概览',
    description: '从 Gateway、Nodes、Control UI 到入口层，建立理解 OpenClaw 的核心心智图。',
    to: '/docs/manual/architecture',
    meta: '架构',
  },
  {
    title: 'Models 应该怎么理解',
    description: '先区分模型层、工具层和 Gateway 层，再决定如何选择提供方与默认配置。',
    to: '/docs/manual/models-overview',
    meta: '模型',
  },
  {
    title: 'Gateway 运维与日常检查',
    description: '围绕状态检查、访问方式、日志与升级窗口，建立长期运行的最小运维习惯。',
    to: '/docs/operations/gateway-operations',
    meta: '运维',
  },
]

export const bestPracticeOverview = [
  {
    title: '多渠道接入节奏',
    description: '先跑通一个入口，再逐步扩展更多渠道，避免一开始就把配置复杂度拉满。',
    to: '/best-practices/multi-agent-routing',
    meta: '接入策略',
  },
  {
    title: '如何高质量反馈 OpenClaw 问题',
    description: '把自助排查、站内反馈和 GitHub Issues 用在正确阶段，减少无效沟通。',
    to: '/best-practices/feedback-loop',
    meta: '社区协作',
  },
  {
    title: '版本升级跟踪节奏',
    description: '建立看 release、判断影响和验证升级的固定节奏，而不是看见新版本就直接替换环境。',
    to: '/best-practices/upgrade-migration',
    meta: '更新跟踪',
  },
  {
    title: '首次接触 OpenClaw 的阅读顺序',
    description: '面对多渠道、Control UI、Hooks 和安全配置时，如何安排更稳妥的学习顺序。',
    to: '/best-practices/team-collaboration',
    meta: '入门策略',
  },
]

export const actionOverview = [
  {
    title: '站内搜索',
    description: '按关键词快速查找文档、新闻、最佳实践和常见问题。',
    to: '/search',
    meta: '搜索',
  },
  {
    title: '安全实践',
    description: '社区踩坑经验、三大灾难事故复盘和防御配置。',
    to: '/security',
    meta: '安全',
  },
  {
    title: '常见问题',
    description: '快速查看"先看哪里、怎么反馈、去哪里提问"等高频问题。',
    to: '/faq',
    meta: 'FAQ',
  },
  {
    title: '提交反馈',
    description: '如果你遇到文档缺失、理解障碍或翻译问题，可以直接提交反馈。',
    to: '/feedback',
    meta: '反馈',
  },
]

export const ecosystemOverview = [
  {
    title: '生态中心',
    description: '探索 ClawHub 技能市场、插件生态、第三方集成和社区项目。',
    to: '/ecosystem',
    meta: '生态',
  },
  {
    title: '二次开发专题',
    description: '从 Skills、插件、Hooks 到 ClawHub，系统整理适合开发者的二次开发资料入口。',
    to: '/secondary-development',
    meta: '开发',
  },
  {
    title: '案例展示',
    description: '真实的企业和个人使用案例，展示 OpenClaw 的实际应用效果。',
    to: '/showcase',
    meta: '案例',
  },
  {
    title: '行业应用',
    description: '法律、电商、教育、金融、医疗等行业的 OpenClaw 应用方案。',
    to: '/showcase',
    meta: '行业',
  },
  {
    title: '背景故事',
    description: '创始人 Peter Steinberger 的故事、命名大战、加入 OpenAI 的历程。',
    to: '/story',
    meta: '故事',
  },
  {
    title: '下载中心',
    description: '各平台安装包下载、一键安装命令和系统要求说明。',
    to: '/download',
    meta: '下载',
  },
  {
    title: '产品路线图',
    description: '了解 OpenClaw 的发展方向和即将到来的新功能。',
    to: '/roadmap',
    meta: '路线图',
  },
]

export const userRouteOverview = [
  {
    title: '我是新手，想先跑通',
    description: '从产品定位、安装、Onboarding 到第一条最小链路，一条路径走完。',
    to: '/paths',
    meta: '新手路径',
  },
  {
    title: '我已经部署，想继续扩展',
    description: '从工具系列、Skills、视频教程和最佳实践进入更实战的能力扩展。',
    to: '/tools',
    meta: '扩展路径',
  },
  {
    title: '我在长期运行，需要稳态方法',
    description: '聚合 Gateway 运维、安全、升级和监控相关内容。',
    to: '/topics?topic=gateway-ops',
    meta: '运维路径',
  },
]

export const extensionOverview = [
  {
    title: '工具系列',
    description: '把插件、Exec、审批、Hooks、自动化和排障整理成一组连续入口，帮助你先理解能力边界再扩展。',
    to: '/tools',
    meta: 'Tools',
  },
  {
    title: 'Skills',
    description: '整理 OpenClaw 当前常见、实用且讨论度高的 skills，给出适用场景、安装命令和使用提醒。',
    to: '/skills',
    meta: 'Skills',
  },
  {
    title: '关键配置',
    description: '把 SOUL、基础 openclaw.json、skills 配置和常见高频项整理成更易查阅的中文入口。',
    to: '/configurations',
    meta: 'Config',
  },
  {
    title: '模型选择指南',
    description: 'Claude/GPT/Gemini/DeepSeek/国产模型对比、智能路由配置和成本优化技巧。',
    to: '/models',
    meta: 'Models',
  },
  {
    title: '安全实践',
    description: '社区踩坑经验、三大灾难事故复盘和防御配置，避免真金白银的教训。',
    to: '/security',
    meta: 'Security',
  },
  {
    title: '生态中心',
    description: '探索 ClawHub 技能市场、插件生态、第三方集成和社区项目，了解 OpenClaw 的扩展能力。',
    to: '/ecosystem',
    meta: 'Ecosystem',
  },
]

export const newsOverview = [
  {
    title: 'OpenClaw 2026.3.7 版本观察',
    description: '梳理当前版本更新里最值得中文用户关注的能力变化与阅读入口。',
    to: '/news/openclaw-march-2026-update',
    meta: '2026-03-09',
  },
  {
    title: '项目更新与后续方向',
    description: '从版本变化、渠道能力到长期规划，概览当前最值得继续跟踪的方向。',
    to: '/news/project-update-march-2026',
    meta: '2026-03-09',
  },
]
