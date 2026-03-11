import { allowedSourceTypes, collectionRules, loadCollectionEntries } from './content-shared.mjs'

const errors = []
const warnings = []

function addError(message) {
  errors.push(message)
}

function addWarning(message) {
  warnings.push(message)
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().startsWith(value)
}

for (const collectionName of Object.keys(collectionRules)) {
  const rule = collectionRules[collectionName]
  const entries = await loadCollectionEntries(collectionName)
  const seenPaths = new Set()

  for (const entry of entries) {
    for (const field of rule.requiredFields) {
      const value = String(entry.data[field] || '').trim()
      if (!value) {
        addError(`[${collectionName}] ${entry.relativePath}: 缺少字段 "${field}"`)
      }
    }

    for (const field of rule.recommendedFields || []) {
      const rawValue = entry.data[field]
      const hasValue = Array.isArray(rawValue) ? rawValue.length > 0 : String(rawValue || '').trim() !== ''
      if (!hasValue) {
        addWarning(`[${collectionName}] ${entry.relativePath}: 建议补充字段 "${field}"`)
      }
    }

    if (!entry.body) {
      addError(`[${collectionName}] ${entry.relativePath}: 正文不能为空`)
    }

    if (seenPaths.has(entry.publicPath)) {
      addError(`[${collectionName}] ${entry.relativePath}: 检测到重复路径 ${entry.publicPath}`)
    }

    seenPaths.add(entry.publicPath)

    if (entry.slug.includes('--')) {
      addError(`[${collectionName}] ${entry.relativePath}: slug 不能包含连续短横线 "--"，当前路径为 ${entry.publicPath}`)
    }

    if (collectionName === 'news') {
      const dateValue = String(entry.data.date || '')
      if (dateValue && !isValidDate(dateValue)) {
        addError(`[news] ${entry.relativePath}: date 必须是 YYYY-MM-DD 格式`)
      }
    }

    const updatedAtValue = String(entry.data.updatedAt || '')
    if (updatedAtValue && !isValidDate(updatedAtValue)) {
      addError(`[${collectionName}] ${entry.relativePath}: updatedAt 必须是 YYYY-MM-DD 格式`)
    }

    if ('tags' in entry.data && !Array.isArray(entry.data.tags)) {
      addError(`[${collectionName}] ${entry.relativePath}: tags 必须是数组格式，例如 [tag-a, tag-b]`)
    }

    const sourceType = String(entry.data.sourceType || '').trim()
    if (sourceType && !allowedSourceTypes.includes(sourceType)) {
      addError(
        `[${collectionName}] ${entry.relativePath}: sourceType 必须是 ${allowedSourceTypes.join(', ')}`,
      )
    }
  }

  console.info(`[content:validate] ${collectionName}: ${entries.length} 篇内容已检查`)
}

if (errors.length > 0) {
  console.error('[content:validate] 检测到以下问题：')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

if (warnings.length > 0) {
  console.warn('[content:validate] 检测到以下建议补充项：')
  for (const warning of warnings) {
    console.warn(`- ${warning}`)
  }
}

console.info('[content:validate] 所有内容校验通过')
