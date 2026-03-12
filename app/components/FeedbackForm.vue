<script setup lang="ts">
const route = useRoute()

const form = reactive({
  type: 'content',
  topic: 'docs',
  expectation: 'missing-guide',
  title: '',
  urgency: 'normal',
  name: '',
  email: '',
  page: typeof route.fullPath === 'string' && route.fullPath !== '/feedback' ? route.fullPath : '',
  message: '',
  website: '',
})

const pending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const receipt = ref<null | {
  id: string
  receivedAt: string
  delivery: string
  stored: boolean
}>(null)

const expectationOptions = {
  content: [
    { value: 'missing-guide', label: '补一篇教程' },
    { value: 'fix-content', label: '修正文案或链接' },
    { value: 'clarify-steps', label: '把步骤写清楚' },
  ],
  request: [
    { value: 'missing-guide', label: '新增专题指南' },
    { value: 'add-video', label: '补充视频教程' },
    { value: 'improve-workflow', label: '整理完整工作流' },
  ],
  bug: [
    { value: 'report-bug', label: '修站点问题' },
    { value: 'fix-content', label: '修正错误内容' },
    { value: 'clarify-steps', label: '补充复现与处理步骤' },
  ],
  community: [
    { value: 'improve-workflow', label: '改进入口与协作流程' },
    { value: 'missing-guide', label: '补社区说明或指南' },
    { value: 'clarify-steps', label: '把提问和分流写清楚' },
  ],
} as const

const selectedExpectations = computed(() => expectationOptions[form.type as keyof typeof expectationOptions] || expectationOptions.content)

const fieldErrors = computed(() => {
  const errors: Record<string, string> = {}

  if (!form.title.trim()) {
    errors.title = '请写一个简短标题'
  } else if (form.title.trim().length < 4) {
    errors.title = '标题至少 4 个字符'
  }

  if (!form.message.trim()) {
    errors.message = '请描述你的问题或建议'
  } else if (form.message.trim().length < 20) {
    errors.message = '内容至少 20 个字符，方便我们判断和处理'
  }

  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = '邮箱格式看起来不正确'
  }

  return errors
})

const isFormValid = computed(() => Object.keys(fieldErrors.value).length === 0)

const helperText = computed(() => {
  const map = {
    content: '适合文档不清楚、表达不准确、链接错误、案例缺失等问题。',
    request: '适合提出“还想看什么内容”或“希望补哪类教程”。',
    bug: '适合页面报错、样式异常、搜索异常、链接 404 等站点问题。',
    community: '适合反馈社区入口、协作流程、FAQ 和提问分流建议。',
  }

  return map[form.type as keyof typeof map] || map.content
})

watch(
  () => form.type,
  (value) => {
    const available = expectationOptions[value as keyof typeof expectationOptions] || expectationOptions.content
    if (!available.find(item => item.value === form.expectation)) {
      form.expectation = available[0]?.value || 'missing-guide'
    }
  },
)

function autofillCurrentPage() {
  form.page = route.fullPath || '/feedback'
}

async function submitFeedback() {
  if (!isFormValid.value) {
    errorMessage.value = Object.values(fieldErrors.value)[0] || '请先补全表单'
    return
  }

  pending.value = true
  successMessage.value = ''
  errorMessage.value = ''
  receipt.value = null

  try {
    const response = await $fetch<{
      ok: boolean
      id: string
      receivedAt: string
      delivery: string
      stored: boolean
    }>('/api/feedback', {
      method: 'POST',
      body: form,
    })

    successMessage.value =
      response.delivery === 'webhook'
        ? `反馈已提交，编号 ${response.id}，已进入站点处理流程。`
        : `反馈已提交，编号 ${response.id}，当前已由站点本地兜底保存。`

    receipt.value = response

    form.type = 'content'
    form.topic = 'docs'
    form.expectation = 'missing-guide'
    form.title = ''
    form.urgency = 'normal'
    form.name = ''
    form.email = ''
    form.page = route.fullPath !== '/feedback' ? route.fullPath : ''
    form.message = ''
    form.website = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '提交失败，请稍后重试。'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <form class="feedback-form card" @submit.prevent="submitFeedback">
    <div class="feedback-intro">
      <div class="intro-item">
        <span class="intro-label">我们优先处理什么</span>
        <p>文档错误、链接异常、站点 bug、阅读障碍和高频内容诉求。</p>
      </div>
      <div class="intro-item">
        <span class="intro-label">怎样更容易被处理</span>
        <p>写清标题、问题现象、相关页面和你期待的结果，越具体越容易直接进入修复。</p>
      </div>
    </div>

    <div class="field-grid">
      <label class="field">
        <span>反馈类型</span>
        <select v-model="form.type">
          <option value="content">内容建议</option>
          <option value="request">想看什么教程</option>
          <option value="bug">站点问题</option>
          <option value="community">社区诉求</option>
        </select>
        <small>{{ helperText }}</small>
      </label>

      <label class="field">
        <span>相关模块</span>
        <select v-model="form.topic">
          <option value="docs">文档</option>
          <option value="videos">视频教程</option>
          <option value="best-practices">最佳实践</option>
          <option value="news">新闻</option>
          <option value="site">整站体验</option>
        </select>
      </label>
    </div>

    <div class="field-grid">
      <label class="field">
        <span>反馈标题</span>
        <input v-model="form.title" type="text" maxlength="120" placeholder="例如：安装页缺少 Apple Silicon 说明" />
        <small v-if="fieldErrors.title" class="field-error">{{ fieldErrors.title }}</small>
      </label>

      <label class="field">
        <span>你希望得到什么</span>
        <select v-model="form.expectation">
          <option v-for="item in selectedExpectations" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </label>
    </div>

    <div class="field-grid">
      <label class="field">
        <span>紧急程度</span>
        <select v-model="form.urgency">
          <option value="low">低</option>
          <option value="normal">普通</option>
          <option value="high">高</option>
        </select>
      </label>

      <label class="field">
        <span>邮箱（可选）</span>
        <input v-model="form.email" type="email" placeholder="you@example.com" />
        <small v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email }}</small>
      </label>
    </div>

    <div class="field-grid">
      <label class="field">
        <span>姓名（可选）</span>
        <input v-model="form.name" type="text" placeholder="称呼或昵称" />
      </label>

      <label class="field">
        <span>相关页面（可选）</span>
        <div class="page-field">
          <input v-model="form.page" type="text" placeholder="/docs/getting-started" />
          <button class="button secondary compact-inline" type="button" @click="autofillCurrentPage">使用当前页</button>
        </div>
      </label>
    </div>

    <label class="field">
      <span>反馈内容</span>
      <textarea v-model="form.message" rows="7" placeholder="请描述你发现的问题、建议或希望补充的内容" />
      <small v-if="fieldErrors.message" class="field-error">{{ fieldErrors.message }}</small>
    </label>

    <label class="trap-field" aria-hidden="true" tabindex="-1">
      <span>网站</span>
      <input v-model="form.website" type="text" autocomplete="off" />
    </label>

    <div class="button-row">
      <button class="button primary" type="submit" :disabled="pending || !isFormValid">
        {{ pending ? '提交中...' : '提交反馈' }}
      </button>
    </div>

    <p v-if="successMessage" class="notice success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="notice error">{{ errorMessage }}</p>

    <div v-if="receipt" class="receipt">
      <strong>反馈编号：{{ receipt.id }}</strong>
      <span>接收时间：{{ new Date(receipt.receivedAt).toLocaleString('zh-CN') }}</span>
      <span>处理方式：{{ receipt.delivery === 'webhook' ? '已推送到处理 webhook' : '已保存到站点本地兜底记录' }}</span>
    </div>
  </form>
</template>

<style scoped>
.feedback-form {
  display: grid;
  gap: 18px;
}

.feedback-intro {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.intro-item {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.42);
}

.intro-item p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.62;
}

.intro-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: grid;
  gap: 8px;
}

.field span {
  font-weight: 600;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.72);
  color: var(--paper);
  padding: 14px 16px;
  font: inherit;
}

textarea {
  resize: vertical;
}

small {
  color: var(--ink-soft);
  line-height: 1.5;
}

.field-error {
  color: #fca5a5;
}

.page-field {
  display: flex;
  gap: 8px;
  align-items: center;
}

.compact-inline {
  min-height: 44px;
  flex: none;
}

.trap-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.notice {
  margin: 0;
  padding: 14px 16px;
  border-radius: 16px;
  line-height: 1.6;
}

.success {
  color: #0f5132;
  background: rgba(226, 248, 232, 0.96);
  border: 1px solid rgba(63, 134, 88, 0.28);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.error {
  color: #8f1d1d;
  background: rgba(254, 238, 238, 0.98);
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.receipt {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid rgba(12, 108, 105, 0.16);
  background: rgba(12, 108, 105, 0.08);
}

.receipt strong {
  font-family: "Fraunces", "Times New Roman", serif;
}

@media (max-width: 760px) {
  .feedback-intro,
  .field-grid {
    grid-template-columns: 1fr;
  }

  .page-field {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
