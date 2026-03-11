import { promises as fs } from 'node:fs'
import { loadCollectionEntries, resolvePath } from './content-shared.mjs'

const [docs, news, bestPractices] = await Promise.all([
  loadCollectionEntries('docs'),
  loadCollectionEntries('news'),
  loadCollectionEntries('bestPractices'),
])

const manifest = {
  generatedAt: new Date().toISOString(),
  collections: {
    docs: {
      count: docs.length,
      items: docs.map((entry) => ({
        title: String(entry.data.title || ''),
        path: entry.publicPath,
        category: String(entry.data.category || ''),
        updatedAt: String(entry.data.updatedAt || ''),
        sourceType: String(entry.data.sourceType || ''),
        tags: Array.isArray(entry.data.tags) ? entry.data.tags : [],
      })),
    },
    news: {
      count: news.length,
      latestDate: news
        .map((entry) => String(entry.data.date || ''))
        .sort((left, right) => right.localeCompare(left))[0] || null,
      items: news.map((entry) => ({
        title: String(entry.data.title || ''),
        path: entry.publicPath,
        category: String(entry.data.category || ''),
        date: String(entry.data.date || ''),
        updatedAt: String(entry.data.updatedAt || ''),
        sourceType: String(entry.data.sourceType || ''),
        source: String(entry.data.source || ''),
        tags: Array.isArray(entry.data.tags) ? entry.data.tags : [],
      })),
    },
    bestPractices: {
      count: bestPractices.length,
      items: bestPractices.map((entry) => ({
        title: String(entry.data.title || ''),
        path: entry.publicPath,
        category: String(entry.data.category || ''),
        difficulty: String(entry.data.difficulty || ''),
        updatedAt: String(entry.data.updatedAt || ''),
        sourceType: String(entry.data.sourceType || ''),
        tags: Array.isArray(entry.data.tags) ? entry.data.tags : [],
      })),
    },
  },
  totals: {
    all: docs.length + news.length + bestPractices.length,
    docs: docs.length,
    news: news.length,
    bestPractices: bestPractices.length,
  },
}

const outputPath = resolvePath('public', 'generated', 'content-manifest.json')

await fs.mkdir(resolvePath('public', 'generated'), { recursive: true })
await fs.writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

console.info(`[content:manifest] 已生成 ${outputPath}`)
