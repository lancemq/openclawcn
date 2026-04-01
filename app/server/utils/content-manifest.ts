import { promises as fs } from 'node:fs'
import path from 'node:path'

type ManifestItem = {
  title?: string
  description?: string
  path?: string
  category?: string
  difficulty?: string
  date?: string
  updatedAt?: string
  tags?: string[]
}

export type ContentManifest = {
  generatedAt: string
  collections: {
    docs: {
      count: number
      items: ManifestItem[]
    }
    news: {
      count: number
      latestDate: string | null
      items: ManifestItem[]
    }
    bestPractices: {
      count: number
      items: ManifestItem[]
    }
  }
  totals: {
    all: number
    docs: number
    news: number
    bestPractices: number
  }
}

const emptyManifest: ContentManifest = {
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
}

export async function readContentManifest(): Promise<ContentManifest> {
  try {
    const manifestPath = path.join(process.cwd(), 'public', 'generated', 'content-manifest.json')
    const source = await fs.readFile(manifestPath, 'utf8')
    return {
      ...emptyManifest,
      ...JSON.parse(source),
    }
  }
  catch {
    return emptyManifest
  }
}
