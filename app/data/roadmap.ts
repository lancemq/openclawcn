export type RoadmapItem = {
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'planned'
  category: string
  milestone?: string
  tags: string[]
}

export type RoadmapSection = {
  id: string
  title: string
  eyebrow: string
  description: string
  items: RoadmapItem[]
}

export const roadmapStats = [
  {
    label: '已完成功能',
    value: '45+',
    note: '持续迭代中',
  },
  {
    label: '进行中',
    value: '12',
    note: '正在开发',
  },
  {
    label: '计划中',
    value: '20+',
    note: '未来规划',
  },
  {
    label: '社区贡献',
    value: '200+',
    note: '贡献者参与',
  },
]

export const roadmapSignals = [
  {
    label: '路线图定位',
    value: '产品发展方向',
    note: '展示 OpenClaw 的功能演进和未来规划。',
  },
  {
    label: '更新频率',
    value: '按版本更新',
    note: '路线图会随版本发布持续更新。',
  },
  {
    label: '参与方式',
    value: '社区驱动',
    note: '欢迎通过 GitHub Issues 提出建议和反馈。',
  },
]

export const roadmapSections: RoadmapSection[] = [
  {
    id: 'completed',
    title: '已完成功能',
    eyebrow: 'Completed',
    description: '已经正式发布的功能和改进。',
    items: [
      {
        title: '多渠道消息接入',
        description: '支持 Telegram、WhatsApp、Discord、飞书等 50+ 渠道统一接入。',
        status: 'completed',
        category: '渠道能力',
        milestone: '2026.3',
        tags: ['渠道', '消息', '多平台'],
      },
      {
        title: 'ClawHub 技能市场',
        description: '官方技能市场上线，收录 349+ 开源技能。',
        status: 'completed',
        category: '生态建设',
        milestone: '2026.2',
        tags: ['技能', '市场', '生态'],
      },
      {
        title: 'VirusTotal 安全验证',
        description: '与 VirusTotal 合作，提供技能安全扫描能力。',
        status: 'completed',
        category: '安全能力',
        milestone: '2026.3',
        tags: ['安全', '验证', '合作'],
      },
      {
        title: 'Canvas 可视化交互',
        description: '支持图形化界面交互，提升用户体验。',
        status: 'completed',
        category: '用户体验',
        milestone: '2026.2',
        tags: ['UI', '可视化', '交互'],
      },
      {
        title: '语音唤醒与对话',
        description: '支持语音唤醒、语音识别和语音合成。',
        status: 'completed',
        category: '语音能力',
        milestone: '2026.2',
        tags: ['语音', 'TTS', 'ASR'],
      },
      {
        title: 'macOS 桌面伴侣应用',
        description: '原生 macOS 应用，提供更好的桌面体验。',
        status: 'completed',
        category: '客户端',
        milestone: '2026.1',
        tags: ['macOS', '桌面', '原生'],
      },
      {
        title: '记忆系统增强',
        description: '长期记忆、语义索引和知识管理能力。',
        status: 'completed',
        category: '核心能力',
        milestone: '2026.2',
        tags: ['记忆', '知识', '索引'],
      },
      {
        title: '多 Gateway 隔离',
        description: '支持多 Gateway 环境隔离和独立配置。',
        status: 'completed',
        category: '运维能力',
        milestone: '2026.1',
        tags: ['Gateway', '隔离', '运维'],
      },
    ],
  },
  {
    id: 'in-progress',
    title: '进行中',
    eyebrow: 'In Progress',
    description: '正在开发中的功能和改进。',
    items: [
      {
        title: '移动客户端优化',
        description: 'iOS 和 Android 客户端体验优化和新功能开发。',
        status: 'in-progress',
        category: '客户端',
        tags: ['移动', 'iOS', 'Android'],
      },
      {
        title: '企业级权限管理',
        description: '更细粒度的权限控制和团队协作能力。',
        status: 'in-progress',
        category: '企业能力',
        tags: ['权限', '企业', '协作'],
      },
      {
        title: '性能优化',
        description: '内存占用优化、响应速度提升和资源调度改进。',
        status: 'in-progress',
        category: '性能',
        tags: ['性能', '优化', '资源'],
      },
      {
        title: '更多渠道支持',
        description: '钉钉、QQ、企业微信等国内渠道接入。',
        status: 'in-progress',
        category: '渠道能力',
        tags: ['渠道', '国内', '接入'],
      },
      {
        title: '文档国际化',
        description: '多语言文档支持和本地化改进。',
        status: 'in-progress',
        category: '文档',
        tags: ['文档', '国际化', '翻译'],
      },
      {
        title: '调试工具增强',
        description: '更强大的调试和排障工具。',
        status: 'in-progress',
        category: '开发工具',
        tags: ['调试', '工具', '排障'],
      },
    ],
  },
  {
    id: 'planned',
    title: '计划中',
    eyebrow: 'Planned',
    description: '计划在未来版本中实现的功能。',
    items: [
      {
        title: 'Web 管理控制台',
        description: '完整的 Web 管理界面，支持配置管理和监控。',
        status: 'planned',
        category: '管理工具',
        tags: ['Web', '管理', '控制台'],
      },
      {
        title: '多租户支持',
        description: '企业级多租户架构和资源隔离。',
        status: 'planned',
        category: '企业能力',
        tags: ['多租户', '企业', '隔离'],
      },
      {
        title: '插件市场',
        description: '官方插件市场，支持插件发现和一键安装。',
        status: 'planned',
        category: '生态建设',
        tags: ['插件', '市场', '生态'],
      },
      {
        title: 'AI 模型微调支持',
        description: '支持自定义模型微调和部署。',
        status: 'planned',
        category: '模型能力',
        tags: ['模型', '微调', '自定义'],
      },
      {
        title: '工作流编排',
        description: '可视化工作流编排和自动化设计器。',
        status: 'planned',
        category: '自动化',
        tags: ['工作流', '编排', '可视化'],
      },
      {
        title: 'API 网关增强',
        description: '更完善的 API 网关能力，支持限流、认证等。',
        status: 'planned',
        category: 'API',
        tags: ['API', '网关', '认证'],
      },
      {
        title: '审计日志',
        description: '完整的操作审计和日志追踪能力。',
        status: 'planned',
        category: '安全能力',
        tags: ['审计', '日志', '安全'],
      },
      {
        title: '离线模式增强',
        description: '更完善的离线运行和本地模型支持。',
        status: 'planned',
        category: '核心能力',
        tags: ['离线', '本地', '模型'],
      },
    ],
  },
]

export const roadmapQuickLinks = [
  {
    title: 'GitHub Releases',
    description: '查看所有版本发布',
    to: 'https://github.com/openclaw/openclaw/releases',
    meta: '官方',
  },
  {
    title: '功能请求',
    description: '提交你的功能建议',
    to: 'https://github.com/openclaw/openclaw/issues',
    meta: '参与',
  },
  {
    title: '更新跟踪指南',
    description: '如何跟踪版本更新',
    to: '/docs/operations/release-tracking',
    meta: '文档',
  },
  {
    title: '新闻动态',
    description: '最新版本公告',
    to: '/news',
    meta: '新闻',
  },
]