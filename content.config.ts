import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
      }),
    }),
    news: defineCollection({
      type: 'page',
      source: 'news/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        date: z.string(),
      }),
    }),
    bestPractices: defineCollection({
      type: 'page',
      source: 'best-practices/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        difficulty: z.string(),
      }),
    }),
  },
})
