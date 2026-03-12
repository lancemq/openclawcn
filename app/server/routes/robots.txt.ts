export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /api/',
    'Disallow: /search',
    '',
    'User-agent: Baiduspider',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /search',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join('\n')
})
