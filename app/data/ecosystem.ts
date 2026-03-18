export type EcosystemItem = {
  title: string
  description: string
  category: string
  stats?: string
  href?: string
  sourceLabel?: string
  tags: string[]
  featured?: boolean
}

export type EcosystemSection = {
  id: string
  title: string
  eyebrow: string
  description: string
  items: EcosystemItem[]
}

export const ecosystemStats = [
  {
    label: 'GitHub 星标',
    value: '287,000+',
    note: '全球开发者关注',
  },
  {
    label: 'ClawHub 技能',
    value: '349',
    note: '开源技能市场',
  },
  {
    label: '渠道集成',
    value: '50+',
    note: '多平台消息入口',
  },
  {
    label: '衍生项目',
    value: '15+',
    note: '国内生态扩展',
  },
]

export const ecosystemSignals = [
  {
    label: '页面定位',
    value: 'OpenClaw 生态全景',
    note: '整合技能市场、插件生态、社区项目和第三方集成，帮助你快速了解 OpenClaw 的扩展能力。',
  },
  {
    label: '适合谁看',
    value: '已部署完成的用户',
    note: '如果你已经跑通基础链路，这一页适合用来决定下一步扩展方向。',
  },
  {
    label: '推荐做法',
    value: '先看技能，再看集成',
    note: '优先从 ClawHub 技能开始，再考虑渠道接入和第三方系统集成。',
  },
]

export const ecosystemSections: EcosystemSection[] = [
  {
    id: 'skills-market',
    title: 'ClawHub 技能市场',
    eyebrow: 'Skills Market',
    description: 'OpenClaw 官方技能市场，收录社区贡献的开源技能，覆盖自动化、内容处理、开发辅助等多个领域。',
    items: [
      {
        title: 'Research 技能包',
        description: '帮助 OpenClaw 进行网络搜索、资料整理和内容摘要，适合研究和信息收集场景。',
        category: '研究分析',
        stats: '热门技能',
        tags: ['研究', '搜索', '摘要'],
        featured: true,
      },
      {
        title: 'Code 技能包',
        description: '代码审查、重构建议、测试生成等开发辅助能力，提升编程效率。',
        category: '开发辅助',
        stats: '热门技能',
        tags: ['代码', '开发', '审查'],
        featured: true,
      },
      {
        title: 'Docs 技能包',
        description: '文档生成、格式转换、内容整理等文档处理能力。',
        category: '文档处理',
        tags: ['文档', '写作', '格式'],
      },
      {
        title: 'Memory 技能包',
        description: '增强 OpenClaw 的记忆能力，支持长期上下文保持和知识管理。',
        category: '记忆增强',
        tags: ['记忆', '上下文', '知识'],
      },
      {
        title: 'Voice 技能包',
        description: '语音识别、语音合成和语音交互能力，支持多语言。',
        category: '语音交互',
        tags: ['语音', 'TTS', 'ASR'],
      },
      {
        title: 'Automation 技能包',
        description: '自动化工作流、定时任务和事件触发能力。',
        category: '自动化',
        tags: ['自动化', '工作流', '定时'],
      },
    ],
  },
  {
    id: 'plugins',
    title: '插件生态',
    eyebrow: 'Plugins',
    description: '扩展 OpenClaw 核心能力的插件系统，支持渠道接入、模型适配、工具集成等。',
    items: [
      {
        title: 'Telegram 插件',
        description: '将 OpenClaw 接入 Telegram，支持私聊和群组消息处理。',
        category: '渠道接入',
        stats: '官方支持',
        tags: ['Telegram', '渠道', '消息'],
        featured: true,
      },
      {
        title: 'WhatsApp 插件',
        description: 'WhatsApp Business API 集成，支持消息收发和多媒体处理。',
        category: '渠道接入',
        stats: '官方支持',
        tags: ['WhatsApp', '渠道', '消息'],
      },
      {
        title: 'Discord 插件',
        description: 'Discord 机器人集成，支持服务器管理和社区互动。',
        category: '渠道接入',
        stats: '官方支持',
        tags: ['Discord', '渠道', '社区'],
      },
      {
        title: '飞书插件',
        description: '飞书机器人集成，支持企业办公场景。',
        category: '渠道接入',
        tags: ['飞书', '企业', '办公'],
      },
      {
        title: 'Ollama 插件',
        description: '本地模型运行支持，实现完全离线的 AI 能力。',
        category: '模型适配',
        stats: '热门',
        tags: ['Ollama', '本地模型', '离线'],
        featured: true,
      },
      {
        title: 'OpenRouter 插件',
        description: '多模型路由支持，灵活切换不同 LLM 提供商。',
        category: '模型适配',
        tags: ['OpenRouter', '模型', '路由'],
      },
    ],
  },
  {
    id: 'integrations',
    title: '第三方集成',
    eyebrow: 'Integrations',
    description: '与外部系统和服务的集成能力，扩展 OpenClaw 的应用场景。',
    items: [
      {
        title: 'Tailscale 集成',
        description: '通过 Tailscale 实现安全的远程访问和网络穿透。',
        category: '网络访问',
        stats: '官方支持',
        tags: ['Tailscale', '远程', '网络'],
        featured: true,
      },
      {
        title: 'VirusTotal 集成',
        description: '技能安全验证，扫描第三方技能的潜在风险。',
        category: '安全验证',
        stats: '官方合作',
        tags: ['安全', '验证', '扫描'],
      },
      {
        title: 'GitHub 集成',
        description: '代码仓库操作、Issue 管理和 PR 审查能力。',
        category: '开发工具',
        tags: ['GitHub', '代码', 'Issue'],
      },
      {
        title: 'Notion 集成',
        description: '笔记和知识库管理，支持内容同步和组织。',
        category: '知识管理',
        tags: ['Notion', '笔记', '知识库'],
      },
      {
        title: 'Slack 集成',
        description: '团队协作和消息通知，支持工作区集成。',
        category: '团队协作',
        tags: ['Slack', '团队', '协作'],
      },
      {
        title: 'Signal 集成',
        description: '注重隐私的消息渠道，端到端加密通信。',
        category: '渠道接入',
        tags: ['Signal', '隐私', '加密'],
      },
    ],
  },
  {
    id: 'community',
    title: '社区项目',
    eyebrow: 'Community',
    description: '由社区贡献的开源项目和工具，丰富 OpenClaw 生态。',
    items: [
      {
        title: 'ClawHub',
        description: '官方技能市场，收录和分享社区贡献的技能包。',
        category: '技能市场',
        stats: '官方',
        href: 'https://github.com/openclaw/clawhub',
        sourceLabel: 'GitHub',
        tags: ['技能', '市场', '开源'],
        featured: true,
      },
      {
        title: 'OpenClaw Desktop',
        description: 'macOS 桌面伴侣应用，提供原生桌面体验。',
        category: '桌面应用',
        stats: '官方',
        tags: ['桌面', 'macOS', '原生'],
      },
      {
        title: 'OpenClaw Mobile',
        description: 'iOS 和 Android 移动客户端，随时随地访问助手。',
        category: '移动应用',
        tags: ['移动', 'iOS', 'Android'],
      },
      {
        title: '社区文档翻译',
        description: '多语言文档翻译项目，降低全球用户使用门槛。',
        category: '文档贡献',
        tags: ['翻译', '文档', '多语言'],
      },
      {
        title: '技能开发模板',
        description: '快速创建新技能的脚手架和最佳实践模板。',
        category: '开发工具',
        tags: ['模板', '开发', '脚手架'],
      },
      {
        title: '部署脚本集',
        description: '各平台一键部署脚本，简化安装和配置流程。',
        category: '部署工具',
        tags: ['部署', '脚本', '自动化'],
      },
    ],
  },
]

export const ecosystemQuickLinks = [
  {
    title: '二次开发',
    description: '围绕 Skills、Plugins、Hooks 与 ClawHub，查看 OpenClaw 二次开发的主要方向和官方资料。',
    to: '/secondary-development',
    meta: '开发',
  },
  {
    title: 'ClawHub 技能市场',
    description: '浏览和安装 349+ 开源技能',
    to: 'https://github.com/openclaw/clawhub',
    meta: '官方市场',
  },
  {
    title: '插件开发指南',
    description: '学习如何开发自定义插件',
    to: '/docs/manual/plugins-overview',
    meta: '文档',
  },
  {
    title: '技能开发教程',
    description: '从零开始创建你的第一个技能',
    to: '/best-practices/skill-development-advanced',
    meta: '教程',
  },
  {
    title: '衍生项目',
    description: '探索国内生态扩展项目',
    to: '/derivatives',
    meta: '生态',
  },
]
