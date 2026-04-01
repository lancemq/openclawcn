export function useSeo(input: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  section?: string
  publishedTime?: string
  updatedTime?: string
  author?: string
  tags?: string[]
  breadcrumbs?: Array<{ label: string; to?: string }>
  noindex?: boolean
}) {
  const config = useRuntimeConfig()
  const url = new URL(input.path, config.public.siteUrl).toString()
  const type = input.type || 'website'
  const logoUrl = new URL('/favicon.svg', config.public.siteUrl).toString()
  const baseSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.public.siteName,
      url: config.public.siteUrl,
      logo: logoUrl,
      sameAs: [config.public.githubUrl].filter(Boolean),
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
          dateModified: input.updatedTime || input.publishedTime,
          articleSection: input.section,
          inLanguage: 'zh-CN',
          mainEntityOfPage: url,
          image: `${config.public.siteUrl}/og-cover.svg`,
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
          '@type': 'WebPage',
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
  const websiteSchema =
    input.path === '/'
      ? {
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
        }
      : null
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
  const schema = [
    ...baseSchemas,
    pageSchema,
    ...(websiteSchema ? [websiteSchema] : []),
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
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
    ogImage: `${config.public.siteUrl}/og-cover.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: `${config.public.siteUrl}/og-cover.svg`,
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
        type: 'application/ld+json',
        children: JSON.stringify(schema),
      },
    ],
  })
}
