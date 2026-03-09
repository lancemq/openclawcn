export function useSeo(input: {
  title: string
  description: string
  path: string
}) {
  const config = useRuntimeConfig()
  const url = new URL(input.path, config.public.siteUrl).toString()

  useSeoMeta({
    title: input.title,
    description: input.description,
    ogTitle: input.title,
    ogDescription: input.description,
    ogUrl: url,
    ogType: 'website',
    ogImage: `${config.public.siteUrl}/og-cover.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: `${config.public.siteUrl}/og-cover.svg`,
  })
}
