import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async () => {
  let manifest = null

  try {
    const manifestPath = path.join(process.cwd(), 'public', 'generated', 'content-manifest.json')
    const source = await fs.readFile(manifestPath, 'utf8')
    manifest = JSON.parse(source)
  }
  catch {
    manifest = null
  }

  return {
    status: 'ok',
    service: 'openclawcn',
    step: 3,
    features: ['content', 'search', 'feedback', 'community', 'faq', 'subscribe', 'rss', 'publishing'],
    contentManifest: manifest
      ? {
          generatedAt: manifest.generatedAt,
          totals: manifest.totals,
        }
      : null,
    timestamp: new Date().toISOString(),
  }
})
