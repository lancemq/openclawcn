<script setup lang="ts">
const year = new Date().getFullYear()

const footerLinks = {
  learn: {
    title: '学习',
    items: [
      { label: '学习路径', to: '/paths' },
      { label: '主题中心', to: '/topics' },
      { label: '文档中心', to: '/docs' },
      { label: '视频教程', to: '/videos' },
      { label: '最佳实践', to: '/best-practices' },
    ],
  },
  ecosystem: {
    title: '生态',
    items: [
      { label: '工具系列', to: '/tools' },
      { label: 'Skills', to: '/skills' },
      { label: '关键配置', to: '/configurations' },
      { label: '衍生生态', to: '/derivatives' },
    ],
  },
  community: {
    title: '社区',
    items: [
      { label: '新闻动态', to: '/news' },
      { label: '社区支持', to: '/community' },
      { label: '案例展示', to: '/showcase' },
    ],
  },
  support: {
    title: '支持',
    items: [
      { label: '站内搜索', to: '/search' },
      { label: '常见问题', to: '/faq' },
      { label: '提交反馈', to: '/feedback' },
      { label: 'RSS 订阅', to: '/rss.xml', external: true },
    ],
  },
}

const socialLinks = [
  { label: 'GitHub', icon: 'github', to: 'https://github.com/openclawcn' },
]

const { public: publicConfig } = useRuntimeConfig()
</script>

<template>
  <footer class="footer">
    <div class="footer-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
          fill="url(#footer-gradient)"
        />
        <defs>
          <linearGradient id="footer-gradient" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
            <stop stop-color="rgba(234, 224, 206, 0.36)" />
            <stop offset="1" stop-color="rgba(239, 231, 216, 0.1)" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div class="container footer-content">
      <div class="footer-brand">
        <NuxtLink class="brand-link" to="/">
          <span class="brand-mark">OC</span>
          <span class="brand-text">
            <strong>OpenClawCN</strong>
            <small>中文资料站</small>
          </span>
        </NuxtLink>
        <p class="brand-desc">
          面向中文用户的 OpenClaw 新闻、文档、最佳实践与社区支持入口，助力开发者高效使用 OpenClaw。
        </p>
        <div class="social-links">
          <a
            v-for="link in socialLinks"
            :key="link.icon"
            :href="link.to"
            target="_blank"
            rel="noreferrer"
            class="social-link"
            :aria-label="link.label"
          >
            <svg v-if="link.icon === 'github'" class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-links">
        <div v-for="(group, key) in footerLinks" :key="key" class="link-group">
          <h3 class="link-title">{{ group.title }}</h3>
          <ul class="link-list">
            <li v-for="item in group.items" :key="item.to">
              <NuxtLink
                v-if="!item.external"
                :to="item.to"
                class="link-item"
              >
                {{ item.label }}
              </NuxtLink>
              <a
                v-else
                :href="item.to"
                target="_blank"
                rel="noreferrer"
                class="link-item"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container footer-bottom">
      <div class="footer-bottom-main">
        <div class="footer-copy">
          <span>© {{ year }} OpenClawCN</span>
          <span class="divider">·</span>
          <span>面向中文用户的 OpenClaw 介绍站点</span>
        </div>
        <div class="footer-legal">
          <NuxtLink to="/privacy" class="legal-link">隐私政策</NuxtLink>
          <NuxtLink to="/terms" class="legal-link">服务条款</NuxtLink>
          <a :href="publicConfig.githubUrl" target="_blank" rel="noreferrer" class="legal-link">GitHub</a>
        </div>
      </div>
      <div class="footer-decoration" aria-hidden="true">
        <span class="decoration-text">OPENCLAW CN</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  margin-top: auto;
  padding-top: 0;
  background: linear-gradient(180deg, rgba(239, 231, 216, 0.1), rgba(234, 224, 206, 0.36));
}

.footer-wave {
  position: relative;
  width: 100%;
  height: 60px;
  overflow: hidden;
}

.footer-wave svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.4fr 2fr;
  gap: 48px;
  padding: 32px 0 40px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  font-size: 0.92rem;
  font-weight: 800;
  color: #fff8ef;
  background: linear-gradient(135deg, var(--accent) 0%, #c28b44 100%);
  box-shadow: 0 10px 18px rgba(166, 111, 44, 0.2);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.brand-text strong {
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.08rem;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.brand-text small {
  color: var(--ink-soft);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 2px;
}

.brand-desc {
  max-width: 320px;
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.75;
}

.social-links {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.social-link {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(67, 73, 60, 0.14);
  background: rgba(255, 251, 244, 0.6);
  color: var(--ink-soft);
  transition: all 0.2s ease;
}

.social-link:hover {
  color: var(--brand);
  border-color: rgba(19, 129, 125, 0.3);
  background: rgba(19, 129, 125, 0.08);
  transform: translateY(-2px);
}

.social-icon {
  width: 18px;
  height: 18px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-title {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.link-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link-item {
  display: inline-flex;
  align-items: center;
  color: var(--ink-soft);
  font-size: 0.88rem;
  transition: color 0.18s ease;
}

.link-item:hover {
  color: var(--brand);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 24px;
  border-top: 1px solid rgba(67, 73, 60, 0.1);
}

.footer-bottom-main {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-copy {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  color: var(--ink-soft);
  font-size: 0.84rem;
}

.footer-copy .divider {
  color: rgba(82, 96, 82, 0.4);
}

.footer-legal {
  display: flex;
  gap: 16px;
}

.legal-link {
  color: var(--ink-soft);
  font-size: 0.82rem;
  transition: color 0.18s ease;
}

.legal-link:hover {
  color: var(--brand);
}

.footer-decoration {
  display: flex;
  align-items: center;
}

.decoration-text {
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  color: rgba(29, 34, 29, 0.2);
  text-transform: uppercase;
}

@media (max-width: 960px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .footer-brand {
    max-width: 100%;
  }

  .brand-desc {
    max-width: 100%;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }
}

@media (max-width: 600px) {
  .footer-wave {
    height: 40px;
  }

  .footer-content {
    padding: 24px 0 32px;
    gap: 28px;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .link-group {
    gap: 10px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .footer-bottom-main {
    align-items: center;
  }

  .footer-copy {
    justify-content: center;
  }

  .footer-decoration {
    order: -1;
  }
}
</style>