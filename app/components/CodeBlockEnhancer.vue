<script setup lang="ts">
// 为代码块添加复制按钮
function enhanceCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre')

  codeBlocks.forEach((pre) => {
    // 避免重复包装同一个代码块
    if (pre.closest('.code-block-wrapper')) return

    const code = pre.querySelector('code')
    if (!code) return

    const codeText = code.textContent || ''

    // 创建头部容器
    const header = document.createElement('div')
    header.className = 'code-block-header'

    // 检测语言
    const langClass = code.className.match(/language-(\w+)/)
    const lang = langClass ? langClass[1] : 'code'

    const langLabel = document.createElement('span')
    langLabel.className = 'code-lang'
    langLabel.textContent = lang

    const copyContainer = document.createElement('div')
    copyContainer.className = 'code-copy-container'
    header.appendChild(langLabel)
    header.appendChild(copyContainer)

    // 使用原生按钮实现复制功能
    const button = document.createElement('button')
    button.className = 'code-copy-btn'
    button.innerHTML = '<span>📋</span><span>复制</span>'
    button.onclick = async () => {
      try {
        await navigator.clipboard.writeText(codeText)
        button.classList.add('copied')
        button.innerHTML = '<span>✓</span><span>已复制</span>'
        setTimeout(() => {
          button.classList.remove('copied')
          button.innerHTML = '<span>📋</span><span>复制</span>'
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    }
    copyContainer.appendChild(button)

    // 包装 pre
    const wrapper = document.createElement('div')
    wrapper.className = 'code-block-wrapper'
    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)
    wrapper.insertBefore(header, pre)
  })
}

// 监听 DOM 变化，自动增强新添加的代码块
onMounted(() => {
  enhanceCodeBlocks()

  // 使用 MutationObserver 监听内容变化
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const hasNewPre = Array.from(mutation.addedNodes).some(
          (node) =>
            node.nodeName === 'PRE' ||
            (node instanceof Element && node.querySelector('pre')),
        )
        if (hasNewPre) {
          enhanceCodeBlocks()
        }
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<template>
  <!-- 这是一个无渲染组件，只提供功能 -->
</template>
