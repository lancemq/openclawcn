<script setup lang="ts">
const form = reactive({
  type: 'content',
  name: '',
  email: '',
  page: '',
  message: '',
})

const pending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

async function submitFeedback() {
  pending.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await $fetch<{
      ok: boolean
      id: string
      receivedAt: string
      delivery: string
    }>('/api/feedback', {
      method: 'POST',
      body: form,
    })

    successMessage.value =
      response.delivery === 'webhook'
        ? '反馈已提交，已进入站点处理流程。'
        : '反馈已提交，我们会用于后续内容整理与问题修正。'

    form.name = ''
    form.email = ''
    form.page = ''
    form.message = ''
    form.type = 'content'
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '提交失败，请稍后重试。'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <form class="feedback-form card" @submit.prevent="submitFeedback">
    <div class="field-grid">
      <label class="field">
        <span>反馈类型</span>
        <select v-model="form.type">
          <option value="content">内容建议</option>
          <option value="bug">站点问题</option>
          <option value="community">社区诉求</option>
        </select>
      </label>

      <label class="field">
        <span>邮箱（可选）</span>
        <input v-model="form.email" type="email" placeholder="you@example.com" />
      </label>
    </div>

    <div class="field-grid">
      <label class="field">
        <span>姓名（可选）</span>
        <input v-model="form.name" type="text" placeholder="称呼或昵称" />
      </label>

      <label class="field">
        <span>相关页面（可选）</span>
        <input v-model="form.page" type="text" placeholder="/docs/getting-started" />
      </label>
    </div>

    <label class="field">
      <span>反馈内容</span>
      <textarea v-model="form.message" rows="7" placeholder="请描述你发现的问题、建议或希望补充的内容" />
    </label>

    <div class="button-row">
      <button class="button primary" type="submit" :disabled="pending">
        {{ pending ? '提交中...' : '提交反馈' }}
      </button>
    </div>

    <p v-if="successMessage" class="notice success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="notice error">{{ errorMessage }}</p>
  </form>
</template>

<style scoped>
.feedback-form {
  display: grid;
  gap: 18px;
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
  color: var(--text);
  padding: 14px 16px;
  font: inherit;
}

textarea {
  resize: vertical;
}

.notice {
  margin: 0;
  padding: 14px 16px;
  border-radius: 16px;
  line-height: 1.6;
}

.success {
  color: #bbf7d0;
  background: rgba(34, 197, 94, 0.14);
  border: 1px solid rgba(34, 197, 94, 0.25);
}

.error {
  color: #fecaca;
  background: rgba(239, 68, 68, 0.14);
  border: 1px solid rgba(239, 68, 68, 0.25);
}

@media (max-width: 760px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
}
</style>
