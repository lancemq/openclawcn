<script setup lang="ts">
const { public: publicConfig } = useRuntimeConfig()
const { trackAction } = useSiteTracking()
const route = useRoute()
const rssUrl = computed(() => new URL('/rss.xml', publicConfig.siteUrl).toString())
const email = ref('')
const pending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const rssMessage = ref('')

async function submitSubscription() {
  pending.value = true
  successMessage.value = ''
  errorMessage.value = ''
  rssMessage.value = ''

  try {
    const response = await $fetch<{
      ok: boolean
      email: string
      delivery: string
    }>('/api/subscribe', {
      method: 'POST',
      body: {
        email: email.value,
        page: route.path,
        section: 'subscribe',
        cta: 'email-subscribe',
        entryType: 'email',
      },
    })

    trackAction('subscription_submit', {
      section: 'subscribe',
      entryType: 'email',
      delivery: response.delivery,
    })

    successMessage.value =
      response.delivery === 'webhook'
        ? '订阅请求已提交，后续更新会进入订阅流程。'
        : '订阅请求已提交，后续可通过邮件或更新提醒继续跟踪内容变化。'
    email.value = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '订阅失败，请稍后重试。'
  } finally {
    pending.value = false
  }
}

async function copyRssUrl() {
  rssMessage.value = ''

  try {
    await navigator.clipboard.writeText(rssUrl.value)
    trackAction('subscription_rss_copy', {
      section: 'subscribe',
      entryType: 'rss',
    })
    rssMessage.value = 'RSS 链接已复制，可以直接粘贴到阅读器里。'
  } catch {
    rssMessage.value = '复制失败，请手动复制下方 RSS 链接。'
  }
}

function openRss() {
  trackAction('subscription_rss_open', {
    section: 'subscribe',
    entryType: 'rss',
  })
}
</script>

<template>
  <form class="subscribe-form" @submit.prevent="submitSubscription">
    <div class="rss-panel">
      <div class="rss-copy">
        <span>RSS 订阅</span>
        <p>适合直接添加到 Feedly、Follow、NetNewsWire 等阅读器，不需要提交邮箱。</p>
      </div>

      <div class="rss-actions">
        <a class="button secondary" :href="rssUrl" target="_blank" rel="noreferrer" @click="openRss">打开 RSS</a>
        <button class="button ghost" type="button" @click="copyRssUrl">复制链接</button>
      </div>

      <code class="rss-url">{{ rssUrl }}</code>
      <p v-if="rssMessage" class="notice rss-note">{{ rssMessage }}</p>
    </div>

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
  gap: 10px;
}

.rss-panel {
  display: grid;
  gap: 10px;
  padding: 14px;
  border: 1px solid rgba(67, 73, 60, 0.14);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.28);
}

.rss-copy {
  display: grid;
  gap: 4px;
}

.rss-copy span {
  font-weight: 700;
  font-size: 0.92rem;
}

.rss-copy p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.55;
}

.rss-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rss-url {
  display: block;
  overflow-wrap: anywhere;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(19, 129, 125, 0.08);
  color: var(--ink);
  font-size: 0.82rem;
}

.subscribe-field {
  display: grid;
  gap: 6px;
}

.subscribe-field span {
  font-weight: 600;
  font-size: 0.9rem;
}

.subscribe-field input {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.72);
  color: var(--paper);
  padding: 12px 14px;
  font: inherit;
  font-size: 0.94rem;
}

.notice {
  margin: 0;
  padding: 10px 12px;
  border-radius: 14px;
  line-height: 1.55;
  font-size: 0.88rem;
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

.rss-note {
  color: var(--ink);
  background: rgba(19, 129, 125, 0.08);
  border: 1px solid rgba(19, 129, 125, 0.14);
}
</style>
