export function useSeo(input: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  section?: string
  publishedTime?: string
  noindex?: boolean
}) {
  const config = useRuntimeConfig()
  const url = new URL(input.path, config.public.siteUrl).toString()
  const type = input.type || 'website'
  const baseSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.public.siteName,
      url: config.public.siteUrl,
    },
  ]
  const pageSchema =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: input.title,
          description: input.description,
          url,
          datePublished: input.publishedTime,
          articleSection: input.section,
          inLanguage: 'zh-CN',
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: input.title,
          description: input.description,
          url,
          inLanguage: 'zh-CN',
        }
  const websiteSchema =
    input.path === '/'
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: config.public.siteName,
          url: config.public.siteUrl,
          description: config.public.siteDescription,
          inLanguage: 'zh-CN',
        }
      : null
  const schema = [...baseSchemas, pageSchema, ...(websiteSchema ? [websiteSchema] : [])]

  useSeoMeta({
    title: input.title,
    description: input.description,
    applicationName: config.public.siteName,
    author: config.public.siteName,
    keywords: config.public.siteKeywords,
    ogTitle: input.title,
    ogDescription: input.description,
    ogUrl: url,
    ogType: type,
    ogSiteName: config.public.siteName,
    ogLocale: 'zh_CN',
    ogImage: `${config.public.siteUrl}/og-cover.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: `${config.public.siteUrl}/og-cover.svg`,
    articleSection: input.section,
    articlePublishedTime: input.publishedTime,
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow',
  })

  useHead({
    meta: [
      ...(config.public.baiduSiteVerification
        ? [
            {
              name: 'baidu-site-verification',
              content: config.public.baiduSiteVerification,
            },
          ]
        : []),
      ...(config.public.sogouSiteVerification
        ? [
            {
              name: 'sogou_site_verification',
              content: config.public.sogouSiteVerification,
            },
          ]
        : []),
      ...(config.public.soSiteVerification
        ? [
            {
              name: '360-site-verification',
              content: config.public.soSiteVerification,
            },
          ]
        : []),
    ],
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema),
      },
    ],
  })
}
