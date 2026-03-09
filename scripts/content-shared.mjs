import { promises as fs } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const contentDir = path.join(rootDir, 'content')

export const collectionRules = {
  docs: {
    dir: path.join(contentDir, 'docs'),
    requiredFields: ['title', 'description', 'category'],
  },
  news: {
    dir: path.join(contentDir, 'news'),
    requiredFields: ['title', 'description', 'category', 'date'],
  },
  bestPractices: {
    dir: path.join(contentDir, 'best-practices'),
    requiredFields: ['title', 'description', 'category', 'difficulty'],
  },
}

export function resolvePath(...parts) {
  return path.join(rootDir, ...parts)
}

async function walkMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return walkMarkdownFiles(fullPath)
      }

      return entry.name.endsWith('.md') ? [fullPath] : []
    }),
  )

  return files.flat()
}

function parseScalar(rawValue) {
  const value = rawValue.trim()
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }

  return value
}

export function parseFrontmatter(source) {
  if (!source.startsWith('---\n')) {
    return { data: {}, body: source.trim() }
  }

  const endIndex = source.indexOf('\n---\n', 4)
  if (endIndex === -1) {
    return { data: {}, body: source.trim() }
  }

  const frontmatterSource = source.slice(4, endIndex).trim()
  const body = source.slice(endIndex + 5).trim()
  const data = {}

  for (const line of frontmatterSource.split('\n')) {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1)
    data[key] = parseScalar(value)
  }

  return { data, body }
}

export async function loadCollectionEntries(collectionName) {
  const rule = collectionRules[collectionName]
  const files = await walkMarkdownFiles(rule.dir)

  const entries = await Promise.all(
    files.map(async (filePath) => {
      const source = await fs.readFile(filePath, 'utf8')
      const { data, body } = parseFrontmatter(source)
      const relativePath = path.relative(rule.dir, filePath)
      const slug = relativePath.replace(/\.md$/, '').split(path.sep).join('/')
      const publicPath = `/${collectionName === 'bestPractices' ? 'best-practices' : collectionName}/${slug}`

      return {
        collection: collectionName,
        filePath,
        relativePath,
        slug,
        publicPath,
        data,
        body,
      }
    }),
  )

  return entries.sort((left, right) => left.relativePath.localeCompare(right.relativePath))
}
