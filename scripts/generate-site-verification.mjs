import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const verifyFile = String(process.env.NUXT_PUBLIC_BAIDU_VERIFY_FILE || '').trim()

if (!verifyFile) {
  console.log('[site:verify] 未配置 NUXT_PUBLIC_BAIDU_VERIFY_FILE，跳过生成')
  process.exit(0)
}

if (!/^[A-Za-z0-9._-]+\.txt$/i.test(verifyFile)) {
  console.error('[site:verify] NUXT_PUBLIC_BAIDU_VERIFY_FILE 格式无效，必须是单个 .txt 文件名')
  process.exit(1)
}

const publicDir = join(process.cwd(), 'public')
const outputPath = join(publicDir, verifyFile)
const content = verifyFile.replace(/\.txt$/i, '')

mkdirSync(publicDir, { recursive: true })
writeFileSync(outputPath, content, 'utf8')

console.log(`[site:verify] 已生成 ${outputPath}`)
