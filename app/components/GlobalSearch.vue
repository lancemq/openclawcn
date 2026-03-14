<script setup lang="ts">
const { isOpen, closeSearch } = useGlobalSearch()
const query = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement>()
const resultsContainerRef = ref<HTMLDivElement>()

const { data: docs } = await useAsyncData('global-search:docs', () => queryCollection('docs').all())
const { data: news } = await useAsyncData('global-search:news', () => queryCollection('news').all())
const { data: bestPractices } = await useAsyncData('global-search:practices', () =>
  queryCollection('bestPractices').all(),
)

const allItems = computed(() => {
  const docItems = (docs.value || []).map((item) => ({
    title: String(item.title || ''),
    description: String(item.description || ''),
    category: String(item.category || '文档'),
    path: String(item.path || ''),
    kind: '文档',
  }))

  const newsItems = (news.value || []).map((item) => ({
    title: String(item.title || ''),
    description: String(item.description || ''),
    category: String(item.category || '新闻'),
    path: String(item.path || ''),
    kind: '新闻',
  }))

  const practiceItems = (bestPractices.value || []).map((item) => ({
    title: String(item.title || ''),
    description: String(item.description || ''),
    category: String(item.category || '最佳实践'),
    path: String(item.path || ''),
    kind: '最佳实践',
  }))

  return [...docItems, ...newsItems, ...practiceItems]
})

const results = computed(() => {
  const keyword = query.value.trim().toLowerCase()

  if (!keyword) {
    return allItems.value.slice(0, 8)
  }

  return allItems.value
    .map((item) => {
      const title = item.title.toLowerCase()
      const description = item.description.toLowerCase()
      const category = item.category.toLowerCase()
      const kind = item.kind.toLowerCase()
      const target = `${title} ${description} ${category} ${kind}`

      let score = 0

      if (title.includes(keyword)) {
        score += title.startsWith(keyword) ? 14 : 10
      }

      if (description.includes(keyword)) {
        score += 4
      }

      if (category.includes(keyword) || kind.includes(keyword)) {
        score += 3
      }

      if (!target.includes(keyword)) {
        score = 0
      }

      return { ...item, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
})

const groupedResults = computed(() => {
  const groups: Record<string, typeof results.value> = {}

  for (const item of results.value) {
    if (!groups[item.kind]) {
      groups[item.kind] = []
    }
    groups[item.kind].push(item)
  }

  return Object.entries(groups).map(([kind, items]) => ({ kind, items }))
})

function open() {
  isOpen.value = true
  query.value = ''
  selectedIndex.value = 0
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function close() {
  closeSearch()
  query.value = ''
  selectedIndex.value = 0
}

function selectItem(index: number) {
  selectedIndex.value = index
}

function goToSelected() {
  const item = results.value[selectedIndex.value]
  if (item) {
    close()
    navigateTo(item.path)
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (!isOpen.value)
    return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
      scrollToSelected()
      break
    case 'ArrowUp':
      e.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
      scrollToSelected()
      break
    case 'Enter':
      e.preventDefault()
      goToSelected()
      break
    case 'Escape':
      e.preventDefault()
      close()
      break
  }
}

function scrollToSelected() {
  nextTick(() => {
    const container = resultsContainerRef.value
    const selected = container?.querySelector('.result-item.selected')
    if (selected && container) {
      selected.scrollIntoView({ block: 'nearest' })
    }
  })
}

// 全局快捷键
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      if (isOpen.value) {
        close()
      }
      else {
        open()
      }
    }
  })
})

// 点击背景关闭
function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    close()
  }
}

// 获取 kind 的图标
function getKindIcon(kind: string) {
  const icons: Record<string, string> = {
    '文档': '📄',
    '新闻': '📰',
    '最佳实践': '💡',
  }
  return icons[kind] || '📄'
}
</script>

<template>
  <Teleport to="body">
    <Transition name="search">
      <div v-if="isOpen" class="search-overlay" @click="handleBackdropClick" @keydown="handleKeydown">
        <div class="search-container">
          <div class="search-box">
            <div class="search-input-wrapper">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                class="search-input"
                placeholder="搜索文档、新闻、最佳实践..."
                @input="selectedIndex = 0"
              />
              <kbd class="search-shortcut">ESC</kbd>
            </div>

            <div v-if="results.length" ref="resultsContainerRef" class="search-results">
              <div v-for="group in groupedResults" :key="group.kind" class="result-group">
                <div class="result-group-header">
                  <span class="result-group-icon">{{ getKindIcon(group.kind) }}</span>
                  <span class="result-group-title">{{ group.kind }}</span>
                  <span class="result-group-count">{{ group.items.length }}</span>
                </div>

                <NuxtLink
                  v-for="(item, index) in group.items"
                  :key="item.path"
                  :to="item.path"
                  class="result-item"
                  :class="{ selected: selectedIndex === results.indexOf(item) }"
                  @click="close"
                  @mouseenter="selectItem(results.indexOf(item))"
                >
                  <div class="result-content">
                    <span class="result-title">{{ item.title }}</span>
                    <span class="result-description">{{ item.description }}</span>
                  </div>
                  <span class="result-category">{{ item.category }}</span>
                </NuxtLink>
              </div>
            </div>

            <div v-else-if="query" class="search-empty">
              <p>没有找到匹配的结果</p>
              <p class="search-empty-hint">尝试使用其他关键词</p>
            </div>

            <div v-else class="search-hints">
              <div class="hint-group">
                <span class="hint-label">快捷键</span>
                <div class="hint-items">
                  <div class="hint-item">
                    <kbd>↑</kbd><kbd>↓</kbd>
                    <span>导航</span>
                  </div>
                  <div class="hint-item">
                    <kbd>Enter</kbd>
                    <span>选择</span>
                  </div>
                  <div class="hint-item">
                    <kbd>Esc</kbd>
                    <span>关闭</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.search-container {
  width: 100%;
  max-width: 640px;
  margin: 0 16px;
}

.search-box {
  overflow: hidden;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.search-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  font-weight: 500;
  color: #1f2937;
  outline: none;
}

.search-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.search-shortcut {
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 6px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 0.7rem;
  font-weight: 600;
  font-family: inherit;
}

.search-results {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
}

.result-group {
  margin-bottom: 8px;
}

.result-group:last-child {
  margin-bottom: 0;
}

.result-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px 4px;
}

.result-group-icon {
  font-size: 0.9rem;
}

.result-group-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.result-group-count {
  margin-left: auto;
  font-size: 0.7rem;
  color: #9ca3af;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.15s ease;
}

.result-item:hover,
.result-item.selected {
  background: #f3f4f6;
}

.result-item.selected {
  background: #e5e7eb;
}

.result-content {
  flex: 1;
  min-width: 0;
}

.result-title {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-description {
  display: block;
  margin-top: 2px;
  font-size: 0.8rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-category {
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 6px;
  background: #f3f4f6;
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
}

.search-empty {
  padding: 32px 20px;
  text-align: center;
}

.search-empty p {
  margin: 0;
  color: #6b7280;
}

.search-empty-hint {
  margin-top: 4px !important;
  font-size: 0.85rem;
  color: #9ca3af !important;
}

.search-hints {
  padding: 12px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.hint-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hint-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hint-items {
  display: flex;
  gap: 16px;
}

.hint-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #6b7280;
}

.hint-item kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 5px;
  background: #f3f4f6;
  font-size: 0.7rem;
  font-weight: 600;
  font-family: inherit;
  color: #374151;
}

/* Transition */
.search-enter-active,
.search-leave-active {
  transition: opacity 0.2s ease;
}

.search-enter-active .search-box,
.search-leave-active .search-box {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}

.search-enter-from .search-box,
.search-leave-to .search-box {
  transform: scale(0.95) translateY(-10px);
  opacity: 0;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .search-box {
    background: rgba(31, 41, 55, 0.98);
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .search-input-wrapper {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .search-input {
    color: #f9fafb;
  }

  .search-input::placeholder {
    color: #6b7280;
  }

  .search-shortcut {
    background: #374151;
    color: #9ca3af;
  }

  .result-group-title {
    color: #9ca3af;
  }

  .result-item:hover,
  .result-item.selected {
    background: #374151;
  }

  .result-title {
    color: #f9fafb;
  }

  .result-description {
    color: #9ca3af;
  }

  .result-category {
    background: #374151;
    color: #9ca3af;
  }

  .search-hints {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .hint-item {
    color: #9ca3af;
  }

  .hint-item kbd {
    background: #374151;
    color: #d1d5db;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .search-overlay {
    padding-top: 10vh;
  }

  .search-container {
    margin: 0 8px;
  }

  .search-input {
    font-size: 1rem;
  }
}
</style>