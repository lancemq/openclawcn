export const informationLayers = [
  {
    id: 'core',
    title: '第一层：主线学习',
    summary: '先理解路径、主题和文档，这三项构成站点的核心知识入口。',
    items: [
      { title: '学习路径', to: '/paths', meta: '路径' },
      { title: '主题中心', to: '/topics', meta: '主题' },
      { title: '文档中心', to: '/docs', meta: '文档' },
    ],
  },
  {
    id: 'support',
    title: '第二层：补充深化',
    summary: '视频、最佳实践和工具系列适合作为理解加深、能力扩展和长期使用入口。',
    items: [
      { title: '视频教程', to: '/videos', meta: '视频' },
      { title: '最佳实践', to: '/best-practices', meta: '实践' },
      { title: '工具系列', to: '/tools', meta: '工具' },
    ],
  },
  {
    id: 'service',
    title: '第三层：服务入口',
    summary: '新闻、社区、搜索和反馈帮助你跟踪变化、解决问题和补内容缺口。',
    items: [
      { title: '新闻', to: '/news', meta: '更新' },
      { title: '社区支持', to: '/community', meta: '社区' },
      { title: '站内搜索', to: '/search', meta: '搜索' },
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
    title: '新闻位于服务入口层',
    summary: '新闻适合快速感知变化，看完后更应该回到路径、主题、文档或实践里建立稳定理解。',
    links: [
      { title: '主题中心', to: '/topics', description: '按主题把动态重新放回知识结构里。' },
      { title: '最佳实践', to: '/best-practices', description: '把动态里的变化转成更稳定的方法。' },
      { title: '学习路径', to: '/paths', description: '如果你还没建立主线，不要只追新闻。' },
    ],
  },
  bestPractices: {
    title: '最佳实践位于补充深化层',
    summary: '最佳实践更适合在你已经理解主线后阅读，用来把方法稳定下来，而不是替代基础文档。',
    links: [
      { title: '学习路径', to: '/paths', description: '先判断自己是否已经走完基础主线。' },
      { title: '主题中心', to: '/topics', description: '按主题把实践放回结构里理解。' },
      { title: '文档中心', to: '/docs', description: '遇到配置和机制问题时，优先回到文档确认。' },
    ],
  },
}
