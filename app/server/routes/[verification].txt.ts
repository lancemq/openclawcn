export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'verification')
  const config = useRuntimeConfig(event)
  const baiduVerifyFile = String(config.public.baiduVerifyFile || '').trim()

  if (!slug || !baiduVerifyFile) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }

  const expected = baiduVerifyFile.replace(/\.txt$/i, '')

  if (slug !== expected) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=3600')

  return expected
})
