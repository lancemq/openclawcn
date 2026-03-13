import { readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

function collectMarkdownRoutes(baseDir: string, routePrefix: string) {
  const stack = [baseDir]
  const routes: string[] = []

  while (stack.length) {
    const currentDir = stack.pop()

    if (!currentDir) {
      continue
    }

    for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = join(currentDir, entry.name)

      if (entry.isDirectory()) {
        stack.push(fullPath)
        continue
      }

      if (!entry.name.endsWith('.md')) {
        continue
      }

      const slug = relative(baseDir, fullPath).replace(/\.md$/, '').split(sep).join('/')
      routes.push(`${routePrefix}/${slug}`)
    }
  }

  return routes.sort()
}

const contentRoutes = [
  ...collectMarkdownRoutes(join(process.cwd(), 'content', 'docs'), '/docs'),
  ...collectMarkdownRoutes(join(process.cwd(), 'content', 'news'), '/news'),
  ...collectMarkdownRoutes(join(process.cwd(), 'content', 'best-practices'), '/best-practices'),
]

const toolRoutes = [
  '/tools',
  '/tools/plugins',
  '/tools/exec-and-approvals',
  '/tools/hooks-and-webhooks',
  '/tools/automation',
  '/tools/troubleshooting',
  '/tools/stacks',
]

export default defineNuxtConfig({
  compatibilityDate: '2025-02-20',
  srcDir: 'app/',
  modules: ['@nuxt/content', '@nuxt/image', '@vercel/analytics/nuxt'],
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
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
          content: 'OpenClaw 中文官网，提供新闻资讯、文档教程、最佳实践与中文社区支持入口。',
        },
        {
          name: 'keywords',
          content: 'OpenClaw,OpenClaw中文,OpenClaw教程,OpenClaw文档,OpenClaw安装,OpenClaw Skills,OpenClaw SOUL,OpenClaw Gateway,OpenClaw最佳实践',
        },
        {
          name: 'author',
          content: 'OpenClawCN',
        },
        {
          name: 'applicable-device',
          content: 'pc,mobile',
        },
        {
          name: 'format-detection',
          content: 'telephone=no,email=no,address=no',
        },
        {
          name: 'referrer',
          content: 'strict-origin-when-cross-origin',
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
    vercelDeployHookUrl: process.env.VERCEL_DEPLOY_HOOK_URL || '',
    contentRebuildToken: process.env.CONTENT_REBUILD_TOKEN || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.openclawcn.xyz',
      githubUrl: process.env.NUXT_PUBLIC_GITHUB_URL || 'https://github.com/openclaw/openclaw',
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'OpenClawCN',
      siteDescription: process.env.NUXT_PUBLIC_SITE_DESCRIPTION || 'OpenClaw 中文官网，提供新闻资讯、文档教程、最佳实践与中文社区支持入口。',
      siteKeywords:
        process.env.NUXT_PUBLIC_SITE_KEYWORDS ||
        'OpenClaw,OpenClaw中文,OpenClaw教程,OpenClaw文档,OpenClaw安装,OpenClaw Skills,OpenClaw SOUL,OpenClaw Gateway,OpenClaw最佳实践',
      baiduSiteVerification: process.env.NUXT_PUBLIC_BAIDU_SITE_VERIFICATION || '',
      baiduVerifyFile: process.env.NUXT_PUBLIC_BAIDU_VERIFY_FILE || '',
      sogouSiteVerification: process.env.NUXT_PUBLIC_SOGOU_SITE_VERIFICATION || '',
      soSiteVerification: process.env.NUXT_PUBLIC_SO_SITE_VERIFICATION || '',
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/paths': { prerender: true },
    '/topics': { prerender: true },
    '/docs': { prerender: true },
    '/docs/getting-started': { redirect: '/docs/getting-started/getting-started' },
    '/videos': { prerender: true },
    '/derivatives': { prerender: true },
    '/news': { prerender: true },
    '/community': { prerender: true },
    '/search': { prerender: true },
    '/feedback': { prerender: true },
    '/faq': { prerender: true },
    '/best-practices': { prerender: true },
    '/robots.txt': {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=3600, s-maxage=3600',
      },
    },
    '/rss.xml': {
      headers: {
        'content-type': 'application/rss+xml; charset=utf-8',
        'cache-control': 'public, max-age=3600, s-maxage=3600',
      },
    },
    '/sitemap.xml': {
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'cache-control': 'public, max-age=3600, s-maxage=3600',
      },
    },
  },
  nitro: {
    preset: 'vercel',
    prerender: {
      routes: [...contentRoutes, ...toolRoutes],
    },
  },
})
