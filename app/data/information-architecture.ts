export const informationLayers = [
  {
    id: 'start',
    title: '第一层：开始',
    summary: '先用学习路径、主题和视频建立方向感，不要第一次进入就面对全部栏目。',
    items: [
      { title: '学习路径', to: '/paths', meta: '路径' },
      { title: '主题中心', to: '/topics', meta: '主题' },
      { title: '视频教程', to: '/videos', meta: '视频' },
    ],
  },
  {
    id: 'docs',
    title: '第二层：文档',
    summary: '文档中心、关键配置、模型和安全属于稳定知识层，适合反复查阅和回看。',
    items: [
      { title: '文档中心', to: '/docs', meta: '文档' },
      { title: '关键配置', to: '/configurations', meta: '配置' },
      { title: '模型选择', to: '/models', meta: '模型' },
      { title: '安全实践', to: '/security', meta: '安全' },
    ],
  },
  {
    id: 'advanced',
    title: '第三层：进阶',
    summary: '最佳实践、工具系列、Skills、案例和二次开发更适合在你跑通基础链路后继续深入。',
    items: [
      { title: '最佳实践', to: '/best-practices', meta: '方法' },
      { title: '工具系列', to: '/tools', meta: '工具' },
      { title: 'Skills', to: '/skills', meta: '能力包' },
      { title: '案例展示', to: '/showcase', meta: '案例' },
    ],
  },
  {
    id: 'updates',
    title: '第四层：动态',
    summary: '新闻、路线图、生态项目和背景故事负责回答最近有什么变化、项目在往哪走。',
    items: [
      { title: '新闻动态', to: '/news', meta: '更新' },
      { title: '产品路线图', to: '/roadmap', meta: '规划' },
      { title: '生态项目', to: '/ecosystem', meta: '生态' },
      { title: '背景故事', to: '/story', meta: '故事' },
    ],
  },
  {
    id: 'support',
    title: '第五层：支持',
    summary: '搜索、FAQ、社区、反馈和下载属于动作入口，适合在你已经知道要解决什么问题时快速补位。',
    items: [
      { title: '站内搜索', to: '/search', meta: '搜索' },
      { title: '常见问题', to: '/faq', meta: 'FAQ' },
      { title: '社区支持', to: '/community', meta: '社区' },
      { title: '提交反馈', to: '/feedback', meta: '反馈' },
      { title: '下载中心', to: '/download', meta: '下载' },
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
