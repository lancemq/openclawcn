import { queryCollection } from '@nuxt/content/server'

type SitemapUrl = {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: string
}

function toAbsoluteUrl(siteUrl: string, path: string) {
  return new URL(path, siteUrl).toString()
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')

  const [docs, news, bestPractices] = await Promise.all([
    queryCollection(event, 'docs').all(),
    queryCollection(event, 'news').all(),
    queryCollection(event, 'bestPractices').all(),
  ])

  const urls: SitemapUrl[] = [
    { loc: toAbsoluteUrl(siteUrl, '/'), changefreq: 'daily', priority: '1.0' },
    { loc: toAbsoluteUrl(siteUrl, '/paths'), changefreq: 'weekly', priority: '0.8' },
    { loc: toAbsoluteUrl(siteUrl, '/topics'), changefreq: 'weekly', priority: '0.8' },
    { loc: toAbsoluteUrl(siteUrl, '/docs'), changefreq: 'weekly', priority: '0.9' },
    { loc: toAbsoluteUrl(siteUrl, '/videos'), changefreq: 'weekly', priority: '0.8' },
    { loc: toAbsoluteUrl(siteUrl, '/derivatives'), changefreq: 'weekly', priority: '0.7' },
    { loc: toAbsoluteUrl(siteUrl, '/ecosystem'), changefreq: 'weekly', priority: '0.8' },
    { loc: toAbsoluteUrl(siteUrl, '/skills'), changefreq: 'weekly', priority: '0.8' },
    { loc: toAbsoluteUrl(siteUrl, '/configurations'), changefreq: 'weekly', priority: '0.8' },
    { loc: toAbsoluteUrl(siteUrl, '/models'), changefreq: 'weekly', priority: '0.7' },
    { loc: toAbsoluteUrl(siteUrl, '/security'), changefreq: 'weekly', priority: '0.7' },
    { loc: toAbsoluteUrl(siteUrl, '/story'), changefreq: 'monthly', priority: '0.6' },
    { loc: toAbsoluteUrl(siteUrl, '/roadmap'), changefreq: 'weekly', priority: '0.6' },
    { loc: toAbsoluteUrl(siteUrl, '/showcase'), changefreq: 'weekly', priority: '0.7' },
    { loc: toAbsoluteUrl(siteUrl, '/download'), changefreq: 'weekly', priority: '0.7' },
    { loc: toAbsoluteUrl(siteUrl, '/news'), changefreq: 'daily', priority: '0.9' },
    { loc: toAbsoluteUrl(siteUrl, '/best-practices'), changefreq: 'weekly', priority: '0.8' },
    { loc: toAbsoluteUrl(siteUrl, '/community'), changefreq: 'monthly', priority: '0.6' },
    { loc: toAbsoluteUrl(siteUrl, '/feedback'), changefreq: 'monthly', priority: '0.4' },
    { loc: toAbsoluteUrl(siteUrl, '/faq'), changefreq: 'weekly', priority: '0.6' },
    ...docs.map((item) => ({
      loc: toAbsoluteUrl(siteUrl, String(item.path || '')),
      changefreq: 'monthly',
      priority: '0.7',
    })),
    ...news.map((item) => ({
      loc: toAbsoluteUrl(siteUrl, String(item.path || '')),
      lastmod: String(item.date || ''),
      changefreq: 'daily',
      priority: '0.8',
    })),
    ...bestPractices.map((item) => ({
      loc: toAbsoluteUrl(siteUrl, String(item.path || '')),
      changefreq: 'weekly',
      priority: '0.7',
    })),
  ]

  const uniqueUrls = Array.from(new Map(urls.map((item) => [item.loc, item])).values())

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...uniqueUrls.map((item) => {
      const lines = ['  <url>', `    <loc>${escapeXml(item.loc)}</loc>`]

      if (item.lastmod) {
        lines.push(`    <lastmod>${escapeXml(item.lastmod)}</lastmod>`)
      }

      if (item.changefreq) {
        lines.push(`    <changefreq>${escapeXml(item.changefreq)}</changefreq>`)
      }

      if (item.priority) {
        lines.push(`    <priority>${escapeXml(item.priority)}</priority>`)
      }

      lines.push('  </url>')
      return lines.join('\n')
    }),
    '</urlset>',
  ].join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return xml
})
