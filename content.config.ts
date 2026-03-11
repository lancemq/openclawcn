import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const sourceTypeSchema = z.enum(['official', 'github', 'community', 'media', 'third-party', 'internal'])

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        date: z.string().optional(),
        updatedAt: z.string().optional(),
        source: z.string().optional(),
        sourceName: z.string().optional(),
        sourceType: sourceTypeSchema.optional(),
        tags: z.array(z.string()).optional(),
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
        updatedAt: z.string().optional(),
        author: z.string().optional(),
        source: z.string().optional(),
        sourceName: z.string().optional(),
        sourceType: sourceTypeSchema.optional(),
        tags: z.array(z.string()).optional(),
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
        date: z.string().optional(),
        updatedAt: z.string().optional(),
        source: z.string().optional(),
        sourceName: z.string().optional(),
        sourceType: sourceTypeSchema.optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
