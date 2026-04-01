export function useSeo(input: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  schemaType?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'FAQPage' | 'ContactPage'
  articleType?: 'Article' | 'TechArticle' | 'NewsArticle'
  section?: string
  publishedTime?: string
  updatedTime?: string
  author?: string
  tags?: string[]
  breadcrumbs?: Array<{ label: string; to?: string }>
  itemList?: Array<{ title: string; to: string; description?: string }>
  noindex?: boolean
}) {
  const config = useRuntimeConfig()
  const url = new URL(input.path, config.public.siteUrl).toString()
  const type = input.type || 'website'
  const logoUrl = new URL('/favicon.svg', config.public.siteUrl).toString()
  const ogImageUrl = `${config.public.siteUrl}/og-cover.svg`
  const baseSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.public.siteName,
      url: config.public.siteUrl,
      logo: logoUrl,
      sameAs: [config.public.githubUrl].filter(Boolean),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: config.public.siteName,
      url: config.public.siteUrl,
      description: config.public.siteDescription,
      inLanguage: 'zh-CN',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${config.public.siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]
  const pageSchema =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': input.articleType || 'Article',
          headline: input.title,
          description: input.description,
          url,
          datePublished: input.publishedTime,
          dateModified: input.updatedTime || input.publishedTime,
          articleSection: input.section,
          inLanguage: 'zh-CN',
          mainEntityOfPage: url,
          image: ogImageUrl,
          author: input.author
            ? {
                '@type': 'Person',
                name: input.author,
              }
            : {
                '@type': 'Organization',
                name: config.public.siteName,
              },
          publisher: {
            '@type': 'Organization',
            name: config.public.siteName,
            logo: {
              '@type': 'ImageObject',
              url: logoUrl,
            },
          },
          keywords: input.tags?.join(', '),
          about: (input.tags || []).map(tag => ({
            '@type': 'Thing',
            name: tag,
          })),
          isAccessibleForFree: true,
        }
      : {
          '@context': 'https://schema.org',
          '@type': input.schemaType || 'WebPage',
          name: input.title,
          description: input.description,
          url,
          inLanguage: 'zh-CN',
          isPartOf: {
            '@type': 'WebSite',
            name: config.public.siteName,
            url: config.public.siteUrl,
          },
        }
  const breadcrumbSchema =
    input.breadcrumbs && input.breadcrumbs.length > 1
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: input.breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: item.to ? new URL(item.to, config.public.siteUrl).toString() : url,
          })),
        }
      : null
  const itemListSchema =
    input.itemList && input.itemList.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${input.title} 导览`,
          itemListElement: input.itemList.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.title,
            url: new URL(item.to, config.public.siteUrl).toString(),
            description: item.description,
          })),
        }
      : null
  const schema = [
    ...baseSchemas,
    pageSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...(itemListSchema ? [itemListSchema] : []),
  ]

  useSeoMeta({
    title: input.title,
    description: input.description,
    applicationName: config.public.siteName,
    author: config.public.siteName,
    keywords: input.tags?.length ? input.tags.join(', ') : config.public.siteKeywords,
    ogTitle: input.title,
    ogDescription: input.description,
    ogUrl: url,
    ogType: type,
    ogSiteName: config.public.siteName,
    ogLocale: 'zh_CN',
    ogImage: ogImageUrl,
    ogImageAlt: `${config.public.siteName} 页面分享图`,
    twitterCard: 'summary_large_image',
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: ogImageUrl,
    twitterImageAlt: `${config.public.siteName} 页面分享图`,
    articleSection: input.section,
    articlePublishedTime: input.publishedTime,
    articleModifiedTime: input.updatedTime,
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
        key: `schema:${input.path}`,
        type: 'application/ld+json',
        children: JSON.stringify(schema),
      },
    ],
  })
}
