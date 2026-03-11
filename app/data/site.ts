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
    title: '视频教程',
    description: '汇总官方 Showcase、YouTube 与 Bilibili 教程，覆盖安装、Skills 与渠道接入。',
    to: '/videos',
    meta: '视频',
  },
  {
    title: '站内搜索',
    description: '按关键词快速查找文档、新闻、最佳实践和常见问题。',
    to: '/search',
    meta: '搜索',
  },
  {
    title: '提交反馈',
    description: '如果你遇到文档缺失、理解障碍或翻译问题，可以直接提交反馈。',
    to: '/feedback',
    meta: '反馈',
  },
  {
    title: '进入社区',
    description: '查看 GitHub、FAQ、反馈入口和当前可用的社区支持路径。',
    to: '/community',
    meta: '社区',
  },
  {
    title: '常见问题',
    description: '快速查看“先看哪里、怎么反馈、去哪里提问”等高频问题。',
    to: '/faq',
    meta: 'FAQ',
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
    description: '从 Skills、Tools、视频教程和最佳实践进入更实战的能力扩展。',
    to: '/topics?topic=skills-tools',
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
    title: '热门技能',
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
    title: '衍生品聚合',
    description: '汇总国内围绕 OpenClaw 的二次开发、轻量封装、本地化分发和实验工具，方便快速判断该看哪一支生态。',
    to: '/derivatives',
    meta: 'Derivative',
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
