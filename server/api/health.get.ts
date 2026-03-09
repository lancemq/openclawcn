export default defineEventHandler(() => {
  return {
    status: 'ok',
    service: 'openclawcn',
    step: 2,
    features: ['content', 'search', 'feedback', 'community', 'faq', 'subscribe'],
    timestamp: new Date().toISOString(),
  }
})
