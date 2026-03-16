import { listFeedbackRecords, resolveFeedbackStorageDir } from '../../utils/feedback-storage'

function readAdminToken(event: Parameters<typeof getQuery>[0]) {
  const query = getQuery(event)
  const queryToken = typeof query.token === 'string' ? query.token.trim() : ''
  const headerToken = getHeader(event, 'x-admin-token')?.trim() || ''

  return queryToken || headerToken
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  if (!config.feedbackAdminToken) {
    throw createError({
      statusCode: 503,
      statusMessage: '管理员反馈查看 token 尚未配置',
    })
  }

  const accessToken = readAdminToken(event)

  if (!accessToken || accessToken !== config.feedbackAdminToken) {
    throw createError({
      statusCode: 401,
      statusMessage: '管理员 token 无效',
    })
  }

  const items = await listFeedbackRecords(event)

  return {
    ok: true,
    count: items.length,
    generatedAt: new Date().toISOString(),
    storage: 'local-file',
    storageDir: resolveFeedbackStorageDir(event),
    items,
  }
})
