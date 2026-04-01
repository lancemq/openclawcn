import { readContentManifest } from '../utils/content-manifest'

function absolute(siteUrl: string, path: string) {
  return new URL(path, siteUrl).toString()
}

function section(title: string, items: any[], siteUrl: string) {
  return [
    `## ${title}`,
    ...items.map((item) => {
      const meta = [item.category, item.difficulty, item.date, item.updatedAt].filter(Boolean).join(' / ')
      const tags = Array.isArray(item.tags) && item.tags.length
        ? ` | tags: ${item.tags.slice(0, 6).join(', ')}`
        : ''
      return `- [${item.title}](${absolute(siteUrl, String(item.path || '/'))}): ${item.description || ''}${meta ? ` | ${meta}` : ''}${tags}`
    }),
    '',
  ]
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')
  const manifest = await readContentManifest()

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    '# OpenClawCN Full AI Index',
    '',
    '> 扩展版 AI 入口文件。按文档、最佳实践和新闻三条线列出更多页面，适合需要更完整站点地图和摘要的生成式引擎、代理或检索系统。',
    '',
    ...section('Docs', manifest.collections.docs.items || [], siteUrl),
    ...section('Best Practices', manifest.collections.bestPractices.items || [], siteUrl),
    ...section('News', manifest.collections.news.items || [], siteUrl),
  ].join('\n')
})
