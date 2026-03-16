import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

type FeedbackRecord = {
  id: string
  type: string
  topic?: string
  expectation?: string
  title: string
  urgency: string
  name?: string
  email?: string
  page?: string
  message: string
  source?: string
  userAgent?: string
  ip?: string
  receivedAt: string
}

function normalizeStorageDir(input: string) {
  return input.trim().replace(/\/+$/, '')
}

export function resolveFeedbackStorageDir(event?: Parameters<typeof useRuntimeConfig>[0]) {
  const config = useRuntimeConfig(event)
  const configuredDir = normalizeStorageDir(config.feedbackStorageDir || '')

  if (configuredDir) {
    return configuredDir
  }

  return join(tmpdir(), 'openclawcn', 'feedback')
}

export async function persistFeedbackRecord(
  payload: Record<string, unknown>,
  event?: Parameters<typeof useRuntimeConfig>[0],
) {
  const baseDir = resolveFeedbackStorageDir(event)
  const datePrefix = new Date().toISOString().slice(0, 10)
  const targetDir = join(baseDir, datePrefix)

  await mkdir(targetDir, { recursive: true })

  const filePath = join(targetDir, `${payload.id}.json`)
  await writeFile(filePath, JSON.stringify(payload, null, 2), 'utf8')

  return filePath
}

async function collectJsonFiles(dir: string): Promise<string[]> {
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    const files = await Promise.all(entries.map(async (entry) => {
      const fullPath = join(dir, entry.name)

      if (entry.isDirectory()) {
        return collectJsonFiles(fullPath)
      }

      return entry.name.endsWith('.json') ? [fullPath] : []
    }))

    return files.flat()
  }
  catch {
    return []
  }
}

export async function listFeedbackRecords(event?: Parameters<typeof useRuntimeConfig>[0]) {
  const baseDir = resolveFeedbackStorageDir(event)
  const files = await collectJsonFiles(baseDir)

  const items = await Promise.all(files.map(async (filePath) => {
    try {
      const raw = await readFile(filePath, 'utf8')
      const parsed = JSON.parse(raw) as Partial<FeedbackRecord>

      if (!parsed.id || !parsed.title || !parsed.message || !parsed.receivedAt) {
        return null
      }

      return {
        id: parsed.id,
        type: parsed.type || 'unknown',
        topic: parsed.topic || '',
        expectation: parsed.expectation || '',
        title: parsed.title,
        urgency: parsed.urgency || 'normal',
        name: parsed.name || '',
        email: parsed.email || '',
        page: parsed.page || '',
        message: parsed.message,
        source: parsed.source || '',
        userAgent: parsed.userAgent || '',
        ip: parsed.ip || '',
        receivedAt: parsed.receivedAt,
      }
    }
    catch {
      return null
    }
  }))

  return items
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())
}
