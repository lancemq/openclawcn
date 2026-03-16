export type ManifestDocItem = {
  title: string
  description: string
  path: string
  category: string
  updatedAt: string
  sourceType: string
  tags: string[]
}

export type ManifestNewsItem = {
  title: string
  description: string
  path: string
  category: string
  date: string
  updatedAt: string
  sourceType: string
  source: string
  tags: string[]
}

export type ManifestBestPracticeItem = {
  title: string
  description: string
  path: string
  category: string
  difficulty: string
  updatedAt: string
  sourceType: string
  tags: string[]
}

type ContentManifest = {
  generatedAt: string
  collections: {
    docs: {
      count: number
      items: ManifestDocItem[]
    }
    news: {
      count: number
      latestDate: string | null
      items: ManifestNewsItem[]
    }
    bestPractices: {
      count: number
      items: ManifestBestPracticeItem[]
    }
  }
  totals: {
    all: number
    docs: number
    news: number
    bestPractices: number
  }
}

export function useContentManifest() {
  return useAsyncData<ContentManifest>(
    'content-manifest',
    async () => {
      if (import.meta.server) {
        const [{ readFile }, { join }] = await Promise.all([
          import('node:fs/promises'),
          import('node:path'),
        ])
        const manifestPath = join(process.cwd(), 'public', 'generated', 'content-manifest.json')
        const raw = await readFile(manifestPath, 'utf8')
        return JSON.parse(raw) as ContentManifest
      }

      return await $fetch('/generated/content-manifest.json')
    },
    {
      default: () => ({
        generatedAt: '',
        collections: {
          docs: { count: 0, items: [] },
          news: { count: 0, latestDate: null, items: [] },
          bestPractices: { count: 0, items: [] },
        },
        totals: {
          all: 0,
          docs: 0,
          news: 0,
          bestPractices: 0,
        },
      }),
    },
  )
}
