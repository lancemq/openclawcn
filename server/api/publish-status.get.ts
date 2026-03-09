import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const manifestPath = path.join(process.cwd(), 'public', 'generated', 'content-manifest.json')

  let manifest = null

  try {
    const source = await fs.readFile(manifestPath, 'utf8')
    manifest = JSON.parse(source)
  }
  catch {
    manifest = null
  }

  return {
    ok: true,
    publishing: {
      manifestReady: Boolean(manifest),
      deployHookConfigured: Boolean(config.vercelDeployHookUrl),
      rebuildTokenConfigured: Boolean(config.contentRebuildToken),
    },
    manifest,
  }
})
