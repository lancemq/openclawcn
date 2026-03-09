type FeedbackPayload = {
  type?: string
  name?: string
  email?: string
  page?: string
  message?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<FeedbackPayload>(event)
  const config = useRuntimeConfig(event)

  const type = String(body.type || '').trim()
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const page = String(body.page || '').trim()
  const message = String(body.message || '').trim()

  if (!type || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: '反馈类型和反馈内容不能为空',
    })
  }

  if (message.length < 10) {
    throw createError({
      statusCode: 400,
      statusMessage: '反馈内容至少需要 10 个字符',
    })
  }

  if (email && !isValidEmail(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: '邮箱格式不正确',
    })
  }

  const payload = {
    id: `fb_${Date.now()}`,
    type,
    name,
    email,
    page,
    message,
    source: 'openclawcn',
    receivedAt: new Date().toISOString(),
  }

  if (config.feedbackWebhookUrl) {
    await $fetch(config.feedbackWebhookUrl, {
      method: 'POST',
      body: payload,
    })

    return {
      ok: true,
      id: payload.id,
      receivedAt: payload.receivedAt,
      delivery: 'webhook',
    }
  }

  console.info('[feedback.accepted]', payload)

  return {
    ok: true,
    id: payload.id,
    receivedAt: payload.receivedAt,
    delivery: 'local-validation',
  }
})
