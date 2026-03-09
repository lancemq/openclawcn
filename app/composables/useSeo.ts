export function useSeo(input: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  section?: string
  publishedTime?: string
}) {
  const config = useRuntimeConfig()
  const url = new URL(input.path, config.public.siteUrl).toString()
  const type = input.type || 'website'

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
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
  })
}
