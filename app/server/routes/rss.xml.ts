import { queryCollection } from '@nuxt/content/server'

type FeedItem = {
  title: string
  description: string
  path: string
  date?: string
  category?: string
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function toAbsoluteUrl(siteUrl: string, path: string) {
  return new URL(path, siteUrl).toString()
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')
  const feedUrl = toAbsoluteUrl(siteUrl, '/rss.xml')

  const [news, bestPractices] = await Promise.all([
    queryCollection(event, 'news').all(),
    queryCollection(event, 'bestPractices').all(),
  ])

  const items: FeedItem[] = [
    ...news.map((item) => ({
      title: String(item.title || ''),
      description: String(item.description || ''),
      path: String(item.path || ''),
      date: String(item.date || ''),
      category: String(item.category || '新闻'),
    })),
    ...bestPractices.map((item) => ({
      title: String(item.title || ''),
      description: String(item.description || ''),
      path: String(item.path || ''),
      category: `最佳实践 / ${String(item.category || '专题')}`,
    })),
  ]
    .filter((item) => item.title && item.path)
    .sort((left, right) => String(right.date || '').localeCompare(String(left.date || '')))

  const latestDate = items
    .map(item => item.date)
    .find((value) => {
      const parsed = new Date(String(value || ''))
      return !Number.isNaN(parsed.valueOf())
    })

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    '  <title>OpenClawCN 更新订阅</title>',
    `  <link>${escapeXml(siteUrl)}</link>`,
    '  <description>OpenClaw 中文站的新闻动态与最佳实践更新订阅。</description>',
    '  <language>zh-CN</language>',
    `  <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    `  <generator>${escapeXml(config.public.siteName)}</generator>`,
    ...(latestDate ? [`  <lastBuildDate>${new Date(latestDate).toUTCString()}</lastBuildDate>`] : []),
    ...items.map((item) => {
      const lines = [
        '  <item>',
        `    <title>${escapeXml(item.title)}</title>`,
        `    <link>${escapeXml(toAbsoluteUrl(siteUrl, item.path))}</link>`,
        `    <guid>${escapeXml(toAbsoluteUrl(siteUrl, item.path))}</guid>`,
        `    <description>${escapeXml(item.description)}</description>`,
      ]

      if (item.category) {
        lines.push(`    <category>${escapeXml(item.category)}</category>`)
      }

      if (item.date) {
        const parsed = new Date(item.date)
        if (!Number.isNaN(parsed.valueOf())) {
          lines.push(`    <pubDate>${parsed.toUTCString()}</pubDate>`)
        }
      }

      lines.push('  </item>')
      return lines.join('\n')
    }),
    '</channel>',
    '</rss>',
  ].join('\n')

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')

  return feed
})
