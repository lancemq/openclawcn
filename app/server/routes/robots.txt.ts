export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /api/',
    'Disallow: /admin/',
    'Disallow: /search',
    '',
    'User-agent: Baiduspider',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /admin/',
    'Disallow: /search',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    `Sitemap: ${siteUrl}/rss.xml`,
    `LLMs: ${siteUrl}/llms.txt`,
    `LLMs-Full: ${siteUrl}/llms-full.txt`,
    `Host: ${new URL(siteUrl).host}`,
  ].join('\n')
})
