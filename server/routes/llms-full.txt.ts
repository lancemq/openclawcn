function absolute(siteUrl: string, path: string) {
  return new URL(path, siteUrl).toString()
}

function section(title: string, items: any[], siteUrl: string) {
  return [
    `## ${title}`,
    ...items.map((item) => {
      const meta = [item.category, item.updatedAt].filter(Boolean).join(' / ')
      const tags = Array.isArray(item.tags) && item.tags.length ? ` | tags: ${item.tags.slice(0, 6).join(', ')}` : ''
      return `- [${item.title}](${absolute(siteUrl, item.path)}): ${item.description}${meta ? ` | ${meta}` : ''}${tags}`
    }),
    '',
  ]
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

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    '# OpenClawCN Full AI Index',
    '',
    '> 扩展版 AI 入口文件。以下内容按文档、最佳实践、新闻三条线列出，适合需要更完整站点地图和摘要的生成式引擎或检索代理。',
    '',
    ...section('Docs', docs, siteUrl),
    ...section('Best Practices', practices, siteUrl),
    ...section('News', news, siteUrl),
  ].join('\n')
})
