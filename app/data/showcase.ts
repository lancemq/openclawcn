export type ShowcaseItem = {
  title: string
  summary: string
  industry: string
  scale: string
  scenario: string
  outcomes: string[]
  tags: string[]
  featured?: boolean
}

export type ShowcaseSection = {
  id: string
  title: string
  eyebrow: string
  description: string
  items: ShowcaseItem[]
}

export const showcaseStats = [
  {
    label: '企业用户',
    value: '10,000+',
    note: '全球企业部署',
  },
  {
    label: '个人用户',
    value: '100,000+',
    note: '活跃个人使用',
  },
  {
    label: '行业覆盖',
    value: '20+',
    note: '跨行业应用',
  },
  {
    label: '平均效率提升',
    value: '40%',
    note: '用户反馈统计',
  },
]

export const showcaseSignals = [
  {
    label: '页面定位',
    value: '真实使用案例',
    note: '展示 OpenClaw 在个人和企业场景中的实际应用效果。',
  },
  {
    label: '适合谁看',
    value: '评估阶段的决策者',
    note: '如果你正在考虑是否采用 OpenClaw，这些案例可以帮助你判断适用性。',
  },
  {
    label: '阅读建议',
    value: '先看同行业案例',
    note: '优先关注与你行业和规模相近的案例，再扩展到其他场景。',
  },
]

export const showcaseSections: ShowcaseSection[] = [
  {
    id: 'enterprise',
    title: '企业应用案例',
    eyebrow: 'Enterprise',
    description: '企业级部署和应用场景，展示 OpenClaw 在组织中的价值。',
    items: [
      {
        title: '某科技公司客服自动化',
        summary: '通过 OpenClaw 接入飞书和企微渠道，实现智能客服响应，人工介入率降低 60%。',
        industry: '科技互联网',
        scale: '500-1000人',
        scenario: '客户服务',
        outcomes: [
          '人工介入率降低 60%',
          '响应时间缩短至 30 秒内',
          '客户满意度提升 25%',
          '7×24 小时在线服务',
        ],
        tags: ['客服', '飞书', '企微', '自动化'],
        featured: true,
      },
      {
        title: '某金融机构知识管理',
        summary: '构建内部知识库助手，帮助员工快速检索政策文档和业务流程。',
        industry: '金融服务',
        scale: '1000-5000人',
        scenario: '知识管理',
        outcomes: [
          '文档检索时间缩短 70%',
          '新员工培训周期缩短 30%',
          '知识复用率提升 40%',
          '合规风险降低',
        ],
        tags: ['知识库', '文档', '合规', '培训'],
        featured: true,
      },
      {
        title: '某制造企业运维监控',
        summary: '集成监控系统，实现异常自动告警和初步诊断，提升运维效率。',
        industry: '制造业',
        scale: '500-1000人',
        scenario: '运维监控',
        outcomes: [
          '故障响应时间缩短 50%',
          '误报率降低 35%',
          '运维人力节省 2 人',
          '系统可用性提升至 99.9%',
        ],
        tags: ['运维', '监控', '告警', '自动化'],
      },
      {
        title: '某电商平台内容运营',
        summary: '自动化商品描述生成和内容审核，提升运营效率。',
        industry: '电商零售',
        scale: '100-500人',
        scenario: '内容运营',
        outcomes: [
          '商品描述生成效率提升 5 倍',
          '内容审核准确率 95%',
          '运营人力节省 30%',
          '内容质量显著提升',
        ],
        tags: ['电商', '内容', '运营', '自动化'],
      },
    ],
  },
  {
    id: 'personal',
    title: '个人使用案例',
    eyebrow: 'Personal',
    description: '个人用户的创新使用方式，展示 OpenClaw 的灵活性。',
    items: [
      {
        title: '独立开发者日常助手',
        summary: '集成 GitHub、Notion 和 Telegram，管理开发任务和个人知识库。',
        industry: '个人开发',
        scale: '个人',
        scenario: '开发辅助',
        outcomes: [
          '每日任务管理自动化',
          '代码审查效率提升',
          '知识库持续积累',
          '跨平台消息统一',
        ],
        tags: ['开发', 'GitHub', 'Notion', '效率'],
        featured: true,
      },
      {
        title: '内容创作者写作助手',
        summary: '辅助研究、大纲生成和内容优化，提升创作效率。',
        industry: '内容创作',
        scale: '个人',
        scenario: '写作辅助',
        outcomes: [
          '研究时间缩短 40%',
          '写作效率提升 2 倍',
          '内容质量稳定提升',
          '多平台内容适配',
        ],
        tags: ['写作', '研究', '内容', '创作'],
      },
      {
        title: '研究人员文献助手',
        summary: '自动化文献检索、摘要生成和知识整理。',
        industry: '学术研究',
        scale: '个人',
        scenario: '研究辅助',
        outcomes: [
          '文献检索效率提升 3 倍',
          '知识体系化整理',
          '跨语言文献理解',
          '研究笔记自动化',
        ],
        tags: ['研究', '文献', '学术', '知识'],
      },
      {
        title: '远程工作者效率工具',
        summary: '日程管理、会议纪要和任务追踪的统一入口。',
        industry: '远程办公',
        scale: '个人',
        scenario: '效率工具',
        outcomes: [
          '日程管理自动化',
          '会议效率提升',
          '任务追踪可视化',
          '工作生活平衡改善',
        ],
        tags: ['远程', '效率', '日程', '管理'],
      },
    ],
  },
  {
    id: 'industry',
    title: '行业解决方案',
    eyebrow: 'Industry Solutions',
    description: '针对特定行业的深度解决方案，展示 OpenClaw 的专业应用。',
    items: [
      {
        title: '医疗健康：患者问答助手',
        summary: '为医疗机构提供患者常见问题解答和预约提醒服务。',
        industry: '医疗健康',
        scale: '医疗机构',
        scenario: '患者服务',
        outcomes: [
          '常见问题自动解答率 80%',
          '预约效率提升 50%',
          '医护人员工作量减轻',
          '患者满意度提升',
        ],
        tags: ['医疗', '问答', '预约', '服务'],
      },
      {
        title: '教育培训：学习辅导助手',
        summary: '为学生提供个性化学习辅导和答疑服务。',
        industry: '教育培训',
        scale: '教育机构',
        scenario: '学习辅导',
        outcomes: [
          '答疑响应即时化',
          '学习路径个性化',
          '教师工作量减轻',
          '学习效果提升',
        ],
        tags: ['教育', '学习', '辅导', '答疑'],
      },
      {
        title: '法律服务：合同审查助手',
        summary: '辅助律师进行合同审查和法律文书生成。',
        industry: '法律服务',
        scale: '律所',
        scenario: '合同审查',
        outcomes: [
          '合同审查效率提升 3 倍',
          '风险点识别准确率 90%',
          '文书生成标准化',
          '律师工作价值提升',
        ],
        tags: ['法律', '合同', '审查', '文书'],
      },
      {
        title: '人力资源：招聘筛选助手',
        summary: '自动化简历筛选和候选人沟通。',
        industry: '人力资源',
        scale: '企业HR',
        scenario: '招聘筛选',
        outcomes: [
          '简历筛选效率提升 5 倍',
          '候选人沟通自动化',
          '招聘周期缩短 30%',
          'HR 工作价值提升',
        ],
        tags: ['HR', '招聘', '筛选', '沟通'],
      },
    ],
  },
]

export const showcaseQuickLinks = [
  {
    title: '最佳实践',
    description: '学习如何更好地使用 OpenClaw',
    to: '/best-practices',
    meta: '实践指南',
  },
  {
    title: '视频教程',
    description: '观看真实使用演示',
    to: '/videos',
    meta: '教程',
  },
  {
    title: '社区支持',
    description: '与其他用户交流经验',
    to: '/community',
    meta: '社区',
  },
  {
    title: '提交你的案例',
    description: '分享你的使用经验',
    to: '/feedback',
    meta: '反馈',
  },
]