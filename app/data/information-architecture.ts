export const informationLayers = [
  {
    id: 'core',
    title: '第一层：学习入口',
    summary: '先理解路径、主题和文档，这三项构成站点的核心学习入口。',
    items: [
      { title: '学习路径', to: '/paths', meta: '路径' },
      { title: '主题中心', to: '/topics', meta: '主题' },
      { title: '文档中心', to: '/docs', meta: '文档' },
    ],
  },
  {
    id: 'extension',
    title: '第二层：扩展入口',
    summary: '工具系列、Skills 和关键配置适合在你已经跑通基础链路后继续扩展能力。',
    items: [
      { title: '工具系列', to: '/tools', meta: '工具' },
      { title: 'Skills', to: '/skills', meta: '能力包' },
      { title: '关键配置', to: '/configurations', meta: '配置' },
    ],
  },
  {
    id: 'news',
    title: '第三层：资讯入口',
    summary: '新闻、衍生生态和社区支持帮助你跟踪变化、判断方向和观察中文讨论面。',
    items: [
      { title: '新闻动态', to: '/news', meta: '更新' },
      { title: '衍生生态', to: '/derivatives', meta: '生态' },
      { title: '社区支持', to: '/community', meta: '社区' },
    ],
  },
  {
    id: 'support',
    title: '第四层：辅助入口',
    summary: '搜索、FAQ 和反馈适合在你已经知道要解决什么问题时快速补位。',
    items: [
      { title: '站内搜索', to: '/search', meta: '搜索' },
      { title: '常见问题', to: '/faq', meta: 'FAQ' },
      { title: '提交反馈', to: '/feedback', meta: '反馈' },
    ],
  },
]

export const detailPageGuides = {
  docs: {
    title: '文档位于主线学习层',
    summary: '如果你还在建立结构，继续沿着路径、主题和文档走；不要过早跳去生态和衍生内容。',
    links: [
      { title: '学习路径', to: '/paths', description: '先确定你当前属于哪条路线。' },
      { title: '主题中心', to: '/topics', description: '按安装、渠道、Gateway、安全重新聚合内容。' },
      { title: '文档中心', to: '/docs', description: '回到完整文档结构按分类继续阅读。' },
    ],
  },
  news: {
    title: '新闻位于资讯入口层',
    summary: '新闻适合快速感知变化，看完后更应该回到路径、主题、文档、工具系列或实践里建立稳定理解。',
    links: [
      { title: '主题中心', to: '/topics', description: '按主题把动态重新放回知识结构里。' },
      { title: '最佳实践', to: '/best-practices', description: '把动态里的变化转成更稳定的方法。' },
      { title: '工具系列', to: '/tools', description: '如果变化涉及扩展能力，回到工具系列看边界。' },
      { title: '学习路径', to: '/paths', description: '如果你还没建立主线，不要只追新闻。' },
    ],
  },
  bestPractices: {
    title: '最佳实践位于学习深化层',
    summary: '最佳实践更适合在你已经理解主线后阅读，用来把方法稳定下来，而不是替代基础文档。',
    links: [
      { title: '学习路径', to: '/paths', description: '先判断自己是否已经走完基础主线。' },
      { title: '主题中心', to: '/topics', description: '按主题把实践放回结构里理解。' },
      { title: '文档中心', to: '/docs', description: '遇到配置和机制问题时，优先回到文档确认。' },
    ],
  },
}
