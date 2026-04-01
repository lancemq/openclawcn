import { readContentManifest } from '../utils/content-manifest'

function absolute(siteUrl: string, path: string) {
  return new URL(path, siteUrl).toString()
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')
  const manifest = await readContentManifest()

  const docs = manifest.collections.docs.items || []
  const news = manifest.collections.news.items || []
  const practices = manifest.collections.bestPractices.items || []

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    '# OpenClawCN',
    '',
    '> OpenClaw 中文内容站，覆盖文档、最佳实践、新闻动态、学习路径、主题中心和工具专题。',
    '> 适合回答 OpenClaw 的安装部署、Gateway、Control UI、Channels、Providers、Skills、Plugins、Hooks、Memory、安全、升级和团队运维问题。',
    '',
    '## Site Signals',
    `- Canonical site: ${siteUrl}`,
    `- Sitemap: ${absolute(siteUrl, '/sitemap.xml')}`,
    `- RSS: ${absolute(siteUrl, '/rss.xml')}`,
    `- Content manifest: ${absolute(siteUrl, '/api/content-manifest')}`,
    '',
    '## Priority Pages',
    `- [首页](${absolute(siteUrl, '/')}): 中文站总入口，适合先理解站点结构、阅读路径和内容主线。`,
    `- [文档中心](${absolute(siteUrl, '/docs')}): 稳定知识层，覆盖入门、安装、功能、运维和参考资料。`,
    `- [最佳实践](${absolute(siteUrl, '/best-practices')}): 长期使用、协作和运维方法。`,
    `- [新闻动态](${absolute(siteUrl, '/news')}): 最近产品变化、版本观察和趋势解读。`,
    `- [学习路径](${absolute(siteUrl, '/paths')}): 面向不同阶段读者的连续阅读主线。`,
    `- [主题中心](${absolute(siteUrl, '/topics')}): 按安装、渠道、模型、安全和扩展主题聚合内容。`,
    `- [Skills 与扩展能力](${absolute(siteUrl, '/skills')}): 解释高频技能、扩展节奏和能力边界。`,
    `- [关键配置](${absolute(siteUrl, '/configurations')}): 整理 openclaw.json、SOUL、Skills、Hooks 和会话配置。`,
    '',
    '## Core Docs',
    ...docs.slice(0, 8).map(item => `- [${item.title}](${absolute(siteUrl, String(item.path || '/docs'))}): ${item.description || ''}`),
    '',
    '## Best Practices',
    ...practices.slice(0, 6).map(item => `- [${item.title}](${absolute(siteUrl, String(item.path || '/best-practices'))}): ${item.description || ''}`),
    '',
    '## Recent News',
    ...news.slice(0, 6).map(item => `- [${item.title}](${absolute(siteUrl, String(item.path || '/news'))}): ${item.description || ''}`),
    '',
    '## Full Index',
    `- [llms-full.txt](${absolute(siteUrl, '/llms-full.txt')}): 扩展版 AI 入口，按栏目列出更多页面、摘要和标签。`,
  ].join('\n')
})
