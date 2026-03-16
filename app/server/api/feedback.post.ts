import { persistFeedbackRecord } from '../utils/feedback-storage'

type FeedbackPayload = {
  type?: string
  topic?: string
  expectation?: string
  title?: string
  urgency?: string
  name?: string
  email?: string
  page?: string
  message?: string
  website?: string
}

const allowedTypes = new Set(['content', 'request', 'bug', 'community'])
const allowedTopics = new Set(['docs', 'videos', 'best-practices', 'news', 'site'])
const allowedExpectations = new Set([
  'missing-guide',
  'fix-content',
  'add-video',
  'clarify-steps',
  'report-bug',
  'improve-workflow',
])
const allowedUrgencies = new Set(['low', 'normal', 'high'])
const rateLimitWindowMs = 10 * 60 * 1000
const rateLimitMax = 5
const feedbackRateLimit = new Map<string, { count: number, resetAt: number }>()

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function normalizeText(value: unknown, maxLength: number) {
  return String(value || '').trim().slice(0, maxLength)
}

function normalizePagePath(value: string) {
  if (!value || !value.startsWith('/')) {
    return ''
  }

  return value.slice(0, 240)
}

function getRateLimitState(key: string) {
  const now = Date.now()
  const existing = feedbackRateLimit.get(key)

  if (!existing || existing.resetAt <= now) {
    const next = {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    }
    feedbackRateLimit.set(key, next)
    return next
  }

  existing.count += 1
  feedbackRateLimit.set(key, existing)
  return existing
}

export default defineEventHandler(async (event) => {
  const body = await readBody<FeedbackPayload>(event)
  const config = useRuntimeConfig(event)
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const userAgent = getHeader(event, 'user-agent') || ''

  const type = normalizeText(body.type, 40)
  const topic = normalizeText(body.topic, 60)
  const expectation = normalizeText(body.expectation, 60)
  const title = normalizeText(body.title, 120)
  const urgency = normalizeText(body.urgency, 20)
  const name = normalizeText(body.name, 60)
  const email = normalizeText(body.email, 120)
  const page = normalizePagePath(normalizeText(body.page, 240))
  const message = normalizeText(body.message, 4000)
  const website = normalizeText(body.website, 240)

  // Honeypot: act as if accepted so bots don't learn the rule.
  if (website) {
    return {
      ok: true,
      id: `fb_${Date.now()}`,
      receivedAt: new Date().toISOString(),
      delivery: 'bot-trap',
      stored: false,
    }
  }

  const rateLimitState = getRateLimitState(ip)

  if (rateLimitState.count > rateLimitMax) {
    throw createError({
      statusCode: 429,
      statusMessage: '提交过于频繁，请稍后再试。',
    })
  }

  if (!type || !title || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: '反馈类型、标题和反馈内容不能为空',
    })
  }

  if (!allowedTypes.has(type)) {
    throw createError({
      statusCode: 400,
      statusMessage: '反馈类型无效',
    })
  }

  if (topic && !allowedTopics.has(topic)) {
    throw createError({
      statusCode: 400,
      statusMessage: '相关模块无效',
    })
  }

  if (expectation && !allowedExpectations.has(expectation)) {
    throw createError({
      statusCode: 400,
      statusMessage: '反馈诉求无效',
    })
  }

  if (urgency && !allowedUrgencies.has(urgency)) {
    throw createError({
      statusCode: 400,
      statusMessage: '紧急程度无效',
    })
  }

  if (title.length < 4) {
    throw createError({
      statusCode: 400,
      statusMessage: '反馈标题至少需要 4 个字符',
    })
  }

  if (message.length < 20) {
    throw createError({
      statusCode: 400,
      statusMessage: '反馈内容至少需要 20 个字符',
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
    topic,
    expectation,
    title,
    urgency: urgency || 'normal',
    name,
    email,
    page,
    message,
    source: 'openclawcn',
    userAgent,
    ip,
    receivedAt: new Date().toISOString(),
  }

  if (config.feedbackWebhookUrl) {
    try {
      await $fetch(config.feedbackWebhookUrl, {
        method: 'POST',
        body: payload,
      })

      return {
        ok: true,
        id: payload.id,
        receivedAt: payload.receivedAt,
        delivery: 'webhook',
        stored: true,
      }
    }
    catch (error) {
      console.error('[feedback.webhook_failed]', error)
    }
  }

  try {
    const storedAt = await persistFeedbackRecord(payload, event)

    console.info('[feedback.accepted]', {
      ...payload,
      storedAt,
    })

    return {
      ok: true,
      id: payload.id,
      receivedAt: payload.receivedAt,
      delivery: config.feedbackWebhookUrl ? 'local-file-fallback' : 'local-file',
      stored: true,
    }
  }
  catch (error) {
    console.error('[feedback.persist_failed]', error)

    return {
      ok: true,
      id: payload.id,
      receivedAt: payload.receivedAt,
      delivery: config.feedbackWebhookUrl ? 'accepted-without-fallback' : 'accepted-without-storage',
      stored: false,
    }
  }
})
