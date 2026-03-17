import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async () => {
  const manifestPath = path.join(process.cwd(), 'public', 'generated', 'content-manifest.json')
  const source = await fs.readFile(manifestPath, 'utf8')
  return JSON.parse(source)
})
