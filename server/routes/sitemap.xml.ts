import { queryCollection } from '@nuxt/content/server'

type SitemapUrl = {
  loc: string
  lastmod?: string
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
    { loc: toAbsoluteUrl(siteUrl, '/') },
    { loc: toAbsoluteUrl(siteUrl, '/paths') },
    { loc: toAbsoluteUrl(siteUrl, '/topics') },
    { loc: toAbsoluteUrl(siteUrl, '/docs') },
    { loc: toAbsoluteUrl(siteUrl, '/videos') },
    { loc: toAbsoluteUrl(siteUrl, '/news') },
    { loc: toAbsoluteUrl(siteUrl, '/best-practices') },
    { loc: toAbsoluteUrl(siteUrl, '/community') },
    { loc: toAbsoluteUrl(siteUrl, '/search') },
    { loc: toAbsoluteUrl(siteUrl, '/feedback') },
    { loc: toAbsoluteUrl(siteUrl, '/faq') },
    ...docs.map((item) => ({
      loc: toAbsoluteUrl(siteUrl, String(item.path || '')),
    })),
    ...news.map((item) => ({
      loc: toAbsoluteUrl(siteUrl, String(item.path || '')),
      lastmod: String(item.date || ''),
    })),
    ...bestPractices.map((item) => ({
      loc: toAbsoluteUrl(siteUrl, String(item.path || '')),
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

      lines.push('  </url>')
      return lines.join('\n')
    }),
    '</urlset>',
  ].join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return xml
})
