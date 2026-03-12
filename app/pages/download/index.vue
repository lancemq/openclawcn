<script setup lang="ts">
import { downloadQuickLinks, downloadSections, downloadSignals, downloadStats, installCommands, systemRequirements, supportedPlatforms } from '~/data/download'

useSeo({
  title: '下载中心',
  description: '下载 OpenClaw 各平台安装包，支持 macOS、Windows、Linux、Docker 等多种部署方式。',
  path: '/download',
  type: 'website',
})

const copyCommand = async (command: string) => {
  try {
    await navigator.clipboard.writeText(command)
  } catch {
    // 复制失败处理
  }
}
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Download</p>
          <h1 class="section-title">下载中心</h1>
          <p class="section-copy">
            OpenClaw 支持多种平台和安装方式。首次安装推荐使用一键脚本，自动处理依赖和配置。生产环境建议使用容器化部署。
          </p>

          <div class="collection-utility">
            <article v-for="stat in downloadStats.slice(0, 2)" :key="stat.label" class="collection-utility-item">
              <span class="mini-label">{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <p>{{ stat.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">安装建议</span>
            <strong>一键脚本优先</strong>
            <p>首次安装推荐使用官方一键脚本，自动处理依赖和配置，避免手动配置错误。</p>
          </div>

          <div v-for="signal in downloadSignals.slice(0, 2)" :key="signal.label" class="collection-summary">
            <span class="mini-label">{{ signal.label }}</span>
            <p>{{ signal.value }}：{{ signal.note }}</p>
          </div>
        </aside>
      </section>

      <section class="install-commands">
        <div class="home-head">
          <p class="eyebrow">Quick Install</p>
          <p class="home-head-note">一键安装命令，复制粘贴即可开始。</p>
        </div>
        <div class="grid commands-grid">
          <article v-for="cmd in installCommands" :key="cmd.platform" class="card command-card">
            <div class="command-header">
              <strong>{{ cmd.platform }}</strong>
              <span class="command-note">{{ cmd.note }}</span>
            </div>
            <div class="command-body">
              <code class="command-code">{{ cmd.command }}</code>
              <button
                type="button"
                class="copy-button"
                title="复制命令"
                @click="copyCommand(cmd.command)"
              >
                复制
              </button>
            </div>
            <a
              v-if="cmd.href"
              :href="cmd.href"
              target="_blank"
              rel="noreferrer"
              class="command-link"
            >
              查看详情 →
            </a>
          </article>
        </div>
      </section>

      <section class="requirements-section">
        <div class="home-head">
          <p class="eyebrow">System Requirements</p>
          <p class="home-head-note">确保你的系统满足运行要求。</p>
        </div>
        <div class="grid requirements-grid">
          <div class="card requirement-card">
            <h3>最低要求</h3>
            <ul class="requirement-list">
              <li><strong>CPU:</strong> {{ systemRequirements.minimum.cpu }}</li>
              <li><strong>内存:</strong> {{ systemRequirements.minimum.memory }}</li>
              <li><strong>存储:</strong> {{ systemRequirements.minimum.storage }}</li>
              <li><strong>网络:</strong> {{ systemRequirements.minimum.network }}</li>
            </ul>
          </div>
          <div class="card requirement-card recommended">
            <h3>推荐配置</h3>
            <ul class="requirement-list">
              <li><strong>CPU:</strong> {{ systemRequirements.recommended.cpu }}</li>
              <li><strong>内存:</strong> {{ systemRequirements.recommended.memory }}</li>
              <li><strong>存储:</strong> {{ systemRequirements.recommended.storage }}</li>
              <li><strong>网络:</strong> {{ systemRequirements.recommended.network }}</li>
            </ul>
          </div>
        </div>

        <div class="platforms-card card">
          <h3>支持的平台</h3>
          <div class="platforms-grid">
            <div v-for="platform in supportedPlatforms" :key="platform.name" class="platform-item">
              <strong>{{ platform.name }}</strong>
              <ul>
                <li v-for="version in platform.versions" :key="version">{{ version }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section v-for="section in downloadSections" :key="section.id" :id="section.id" class="download-section">
        <div class="section-heading">
          <p class="eyebrow">{{ section.eyebrow }}</p>
          <h2 class="section-title">{{ section.title }}</h2>
          <p class="section-copy">{{ section.description }}</p>
        </div>

        <div class="grid download-grid">
          <article v-for="item in section.items" :key="item.platform" class="card download-card">
            <div class="download-meta">
              <span class="tag">{{ item.platform }}</span>
              <span class="tag secondary">{{ item.version }}</span>
              <span v-if="item.recommended" class="tag highlight">推荐</span>
            </div>

            <div class="download-info">
              <div class="info-row">
                <span class="info-label">发布日期</span>
                <span class="info-value">{{ item.releaseDate }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">大小</span>
                <span class="info-value">{{ item.size }}</span>
              </div>
            </div>

            <div v-if="item.command" class="command-section">
              <code class="inline-code">{{ item.command }}</code>
            </div>

            <div class="requirements-section-card">
              <span class="requirements-label">系统要求</span>
              <ul class="requirements-list">
                <li v-for="req in item.requirements" :key="req">{{ req }}</li>
              </ul>
            </div>

            <div class="notes-section">
              <span v-for="note in item.notes" :key="note" class="note-item">{{ note }}</span>
            </div>

            <div class="download-actions">
              <a
                v-if="item.href"
                :href="item.href"
                target="_blank"
                rel="noreferrer"
                class="button primary"
              >
                {{ item.command ? '查看详情' : '下载' }}
              </a>
              <button
                v-if="item.command"
                type="button"
                class="button secondary"
                @click="copyCommand(item.command)"
              >
                复制命令
              </button>
            </div>
          </article>
        </div>
      </section>

      <section class="quick-links-section">
        <div class="home-head">
          <p class="eyebrow">Help</p>
          <p class="home-head-note">安装遇到问题？查看这些资源。</p>
        </div>
        <div class="grid quick-links-grid">
          <NuxtLink v-for="link in downloadQuickLinks" :key="link.to" :to="link.to" class="card quick-link-card">
            <span class="tag">{{ link.meta }}</span>
            <strong>{{ link.title }}</strong>
            <p>{{ link.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.install-commands,
.requirements-section,
.download-section,
.quick-links-section {
  margin-top: 24px;
}

.section-heading {
  margin-bottom: 14px;
}

.commands-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.command-card {
  padding: 16px;
  display: grid;
  gap: 12px;
}

.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.command-header strong {
  font-size: 0.95rem;
}

.command-note {
  font-size: 0.78rem;
  color: var(--ink-soft);
}

.command-body {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
}

.command-code {
  display: block;
  padding: 12px;
  background: rgba(67, 73, 60, 0.06);
  border-radius: 8px;
  font-family: "SF Mono", "Monaco", "Inconsolata", monospace;
  font-size: 0.82rem;
  color: var(--brand);
  word-break: break-all;
  white-space: pre-wrap;
}

.copy-button {
  padding: 8px 12px;
  border: 1px solid rgba(67, 73, 60, 0.15);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 1);
}

.command-link {
  font-size: 0.84rem;
  color: var(--brand);
  font-weight: 600;
}

.requirements-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 14px;
}

.requirement-card {
  padding: 18px;
}

.requirement-card.recommended {
  border-color: rgba(19, 129, 125, 0.2);
  background: rgba(19, 129, 125, 0.04);
}

.requirement-card h3 {
  margin: 0 0 12px;
  font-size: 1rem;
}

.requirement-list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.requirement-list li {
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: var(--ink-soft);
}

.requirement-list li strong {
  color: var(--ink);
}

.platforms-card {
  padding: 18px;
}

.platforms-card h3 {
  margin: 0 0 14px;
  font-size: 1rem;
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.platform-item strong {
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.platform-item ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.platform-item li {
  margin-bottom: 4px;
  font-size: 0.84rem;
  color: var(--ink-soft);
}

.download-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.download-card,
.quick-link-card {
  display: grid;
  gap: 12px;
  padding: 18px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.download-card:hover,
.quick-link-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(64, 49, 27, 0.1);
}

.download-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(166, 111, 44, 0.1);
  color: var(--brand);
}

.tag.secondary {
  background: rgba(67, 73, 60, 0.08);
  color: var(--ink-soft);
}

.tag.highlight {
  background: linear-gradient(135deg, var(--brand) 0%, var(--brand-bright) 100%);
  color: #fff8ef;
}

.download-info {
  display: grid;
  gap: 6px;
}

.info-row {
  display: flex;
  gap: 8px;
  font-size: 0.86rem;
}

.info-label {
  color: var(--ink-soft);
}

.info-value {
  font-weight: 600;
}

.command-section {
  padding: 10px;
  background: rgba(67, 73, 60, 0.04);
  border-radius: 8px;
}

.inline-code {
  font-family: "SF Mono", "Monaco", monospace;
  font-size: 0.84rem;
  color: var(--brand);
  word-break: break-all;
}

.requirements-section-card {
  padding-top: 10px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

.requirements-label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.requirements-list {
  margin: 0;
  padding-left: 16px;
  font-size: 0.84rem;
  color: var(--ink-soft);
  line-height: 1.6;
}

.requirements-list li {
  margin-bottom: 2px;
}

.notes-section {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.note-item {
  font-size: 0.78rem;
  color: var(--ink-soft);
  background: rgba(255, 255, 255, 0.6);
  padding: 4px 8px;
  border-radius: 4px;
}

.download-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.quick-link-card strong {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.05rem;
  line-height: 1.3;
}

.quick-link-card p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.55;
}

.quick-links-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 1100px) {
  .commands-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .platforms-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .download-grid {
    grid-template-columns: 1fr;
  }

  .quick-links-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .commands-grid,
  .requirements-grid,
  .platforms-grid,
  .download-grid,
  .quick-links-grid {
    grid-template-columns: 1fr;
  }
}
</style>