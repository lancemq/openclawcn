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
  const schema =
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

  useSeoMeta({
    title: input.title,
    description: input.description,
    ogTitle: input.title,
    ogDescription: input.description,
    ogUrl: url,
    ogType: type,
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
