<script setup lang="ts">
const email = ref('')
const pending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

async function submitSubscription() {
  pending.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await $fetch<{
      ok: boolean
      email: string
      delivery: string
    }>('/api/subscribe', {
      method: 'POST',
      body: {
        email: email.value,
      },
    })

    successMessage.value =
      response.delivery === 'webhook'
        ? '订阅请求已提交，后续更新会进入订阅流程。'
        : '订阅请求已通过接口校验，当前处于本地可验证模式。'
    email.value = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '订阅失败，请稍后重试。'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <form class="subscribe-form" @submit.prevent="submitSubscription">
    <label class="subscribe-field">
      <span>邮箱订阅</span>
      <input v-model="email" type="email" placeholder="输入邮箱，接收后续更新" />
    </label>

    <button class="button primary" type="submit" :disabled="pending">
      {{ pending ? '提交中...' : '订阅更新' }}
    </button>

    <p v-if="successMessage" class="notice success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="notice error">{{ errorMessage }}</p>
  </form>
</template>

<style scoped>
.subscribe-form {
  display: grid;
  gap: 14px;
}

.subscribe-field {
  display: grid;
  gap: 8px;
}

.subscribe-field span {
  font-weight: 600;
}

.subscribe-field input {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.72);
  color: var(--text);
  padding: 14px 16px;
  font: inherit;
}

.notice {
  margin: 0;
  padding: 12px 14px;
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
</style>
