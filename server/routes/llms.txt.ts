function absolute(siteUrl: string, path: string) {
  return new URL(path, siteUrl).toString()
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl
  const manifest = await $fetch<{ collections?: Record<string, { items?: any[] }> }>(
    absolute(siteUrl, '/api/content-manifest'),
  ).catch(() => ({ collections: {} }))

  const docs = manifest.collections?.docs?.items || []
  const news = manifest.collections?.news?.items || []
  const practices = manifest.collections?.bestPractices?.items || []

  const topDocs = docs.slice(0, 8)
  const topPractices = practices.slice(0, 6)
  const topNews = news.slice(0, 6)

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    '# OpenClawCN',
    '',
    '> OpenClaw 中文内容站，覆盖文档、最佳实践、新闻动态、学习路径和扩展专题。',
    '> 适合回答 OpenClaw 的安装、Gateway、控制面、渠道接入、模型 provider、Skills、插件、Hooks、自动化、记忆和团队运维问题。',
    '',
    '## Priority Pages',
    `- [首页](${absolute(siteUrl, '/')}): 中文站总入口，适合先理解站点结构与主要阅读路径。`,
    `- [文档中心](${absolute(siteUrl, '/docs')}): 稳定知识层，覆盖入门、安装、功能、运维与参考。`,
    `- [最佳实践](${absolute(siteUrl, '/best-practices')}): 长期使用、协作和运维方法。`,
    `- [新闻动态](${absolute(siteUrl, '/news')}): 最近产品变化、版本观察与趋势解读。`,
    `- [学习路径](${absolute(siteUrl, '/paths')}): 面向不同阶段读者的阅读主线。`,
    `- [主题中心](${absolute(siteUrl, '/topics')}): 按 Gateway、渠道、模型、安全、记忆等主题聚合内容。`,
    `- [工具系列](${absolute(siteUrl, '/tools')}): Skills、Tools、插件、Hooks、自动化和执行边界。`,
    '',
    '## Longform Guides',
    `- [从第一次跑通到长期运行：OpenClaw 的完整系统地图](${absolute(siteUrl, '/docs/manual/from-first-run-to-long-running-system')}): 把安装、控制面、渠道、模型、记忆、自动化和维护放到一条主线。`,
    `- [从 Skills 到 Workflows：OpenClaw 扩展栈完整地图](${absolute(siteUrl, '/docs/manual/extension-stack-full-map')}): 解释 Skills、Tools、插件、Hooks、ClawHub、OpenProse、Lobster 和 approvals 的进入顺序。`,
    `- [团队长期运行蓝图：把 OpenClaw 从可用做成可运营](${absolute(siteUrl, '/best-practices/production-operations-blueprint')}): 面向团队运维、值班、控制面和 provider 治理。`,
    `- [内容网络编辑手册](${absolute(siteUrl, '/best-practices/content-network-editorial-playbook')}): 解释本站如何把文档、实践、新闻和专题织成知识网络。`,
    '',
    '## Core Docs',
    ...topDocs.map(item => `- [${item.title}](${absolute(siteUrl, item.path)}): ${item.description}`),
    '',
    '## Best Practices',
    ...topPractices.map(item => `- [${item.title}](${absolute(siteUrl, item.path)}): ${item.description}`),
    '',
    '## Recent News',
    ...topNews.map(item => `- [${item.title}](${absolute(siteUrl, item.path)}): ${item.description}`),
    '',
    '## Full Index',
    `- [llms-full.txt](${absolute(siteUrl, '/llms-full.txt')}): 扩展版 AI 入口，按栏目列出更多页面和摘要。`,
  ].join('\n')
})
