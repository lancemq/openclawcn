type RebuildPayload = {
  source?: string
  reason?: string
}

function getTokenFromRequest(event) {
  const auth = getHeader(event, 'authorization')
  if (auth?.startsWith('Bearer ')) {
    return auth.slice(7).trim()
  }

  return String(getHeader(event, 'x-rebuild-token') || '').trim()
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const token = getTokenFromRequest(event)

  if (!config.contentRebuildToken) {
    throw createError({
      statusCode: 503,
      statusMessage: '未配置 CONTENT_REBUILD_TOKEN',
    })
  }

  if (token !== config.contentRebuildToken) {
    throw createError({
      statusCode: 401,
      statusMessage: '无效的重建令牌',
    })
  }

  const body = await readBody<RebuildPayload>(event)
  const payload = {
    source: String(body.source || 'manual'),
    reason: String(body.reason || 'content-update'),
    triggeredAt: new Date().toISOString(),
  }

  if (!config.vercelDeployHookUrl) {
    console.info('[rebuild.requested]', payload)

    return {
      ok: true,
      delivery: 'local-validation',
      ...payload,
    }
  }

  await $fetch(config.vercelDeployHookUrl, {
    method: 'POST',
    body: payload,
  })

  return {
    ok: true,
    delivery: 'vercel-deploy-hook',
    ...payload,
  }
})
