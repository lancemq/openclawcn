export default defineNuxtConfig({
  compatibilityDate: '2025-02-20',
  srcDir: 'app/',
  modules: ['@nuxt/content', '@nuxt/image'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'OpenClawCN',
      titleTemplate: '%s | OpenClawCN',
      htmlAttrs: {
        lang: 'zh-CN',
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: 'OpenClaw 中文官网，提供新闻资讯、文档教程、最佳实践与 Vercel 部署指引。',
        },
        {
          name: 'theme-color',
          content: '#0f766e',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
      ],
    },
  },
  runtimeConfig: {
    feedbackWebhookUrl: process.env.FEEDBACK_WEBHOOK_URL || '',
    subscribeWebhookUrl: process.env.SUBSCRIBE_WEBHOOK_URL || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      githubUrl: process.env.NUXT_PUBLIC_GITHUB_URL || 'https://github.com/openclaw/openclaw',
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/docs': { prerender: true },
    '/news': { prerender: true },
    '/community': { prerender: true },
    '/search': { prerender: true },
    '/feedback': { prerender: true },
    '/faq': { prerender: true },
  },
  nitro: {
    preset: 'vercel',
  },
})
