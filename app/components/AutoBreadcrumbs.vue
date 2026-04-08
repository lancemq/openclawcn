<script setup lang="ts">
const route = useRoute()

const hiddenPatterns = [
  /^\/$/,
  /^\/hermes-agent\/.+/,
  /^\/docs\/.+/,
  /^\/news\/.+/,
  /^\/best-practices\/.+/,
  /^\/showcase\/[^/]+$/,
  /^\/secondary-development$/,
]

const segmentLabels: Record<string, string> = {
  admin: '管理',
  feedback: '提交反馈',
  'best-practices': '最佳实践',
  community: '社区支持',
  configurations: '关键配置',
  derivatives: '衍生项目',
  disclaimer: '免责声明',
  docs: '文档中心',
  download: '下载中心',
  ecosystem: '生态项目',
  faq: '常见问题',
  models: '模型选择',
  news: '新闻动态',
  paths: '学习路径',
  privacy: '隐私政策',
  roadmap: '产品路线图',
  search: '站内搜索',
  security: '安全实践',
  'secondary-development': '二次开发专题',
  showcase: '案例展示',
  skills: 'Skills',
  story: '背景故事',
  terms: '服务条款',
  tools: '工具系列',
  topics: '主题中心',
  videos: '视频教程',
  automation: '自动化与定时任务',
  diagnostics: '诊断与排障',
  plugins: '插件系统',
  triggers: '触发机制',
  'exec-and-approvals': '执行边界',
  stacks: '组合方案',
}

const shouldShow = computed(() =>
  !hiddenPatterns.some(pattern => pattern.test(route.path)),
)

function fallbackLabel(segment: string) {
  return segment
    .split('-')
    .map(item => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ')
}

const items = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const breadcrumbs = [{ label: '首页', to: '/' }]

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    breadcrumbs.push({
      label: segmentLabels[segment] || fallbackLabel(segment),
      to: index === segments.length - 1 ? undefined : currentPath,
    })
  })

  return breadcrumbs
})
</script>

<template>
  <div v-if="shouldShow" class="auto-breadcrumbs-shell">
    <div class="container">
      <AppBreadcrumbs :items="items" />
    </div>
  </div>
</template>

<style scoped>
.auto-breadcrumbs-shell {
  padding-top: 18px;
}
</style>
