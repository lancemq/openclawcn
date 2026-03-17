type SubscribePayload = {
  email?: string
  page?: string
  section?: string
  cta?: string
  entryType?: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SubscribePayload>(event)
  const config = useRuntimeConfig(event)
  const email = String(body.email || '').trim()
  const page = String(body.page || '').trim().slice(0, 120)
  const section = String(body.section || '').trim().slice(0, 80)
  const cta = String(body.cta || '').trim().slice(0, 80)
  const entryType = String(body.entryType || '').trim().slice(0, 40)

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: '邮箱不能为空',
    })
  }

  if (!isValidEmail(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: '邮箱格式不正确',
    })
  }

  const payload = {
    id: `sub_${Date.now()}`,
    email,
    source: 'openclawcn',
    receivedAt: new Date().toISOString(),
    page,
    section,
    cta,
    entryType,
  }

  if (config.subscribeWebhookUrl) {
    await $fetch(config.subscribeWebhookUrl, {
      method: 'POST',
      body: {
        type: 'subscription',
        ...payload,
      },
    })

    return {
      ok: true,
      email,
      delivery: 'webhook',
    }
  }

  console.info('[subscription.accepted]', payload)

  return {
    ok: true,
    email,
    delivery: 'local-validation',
  }
})
