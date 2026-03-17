<script setup lang="ts">
const year = new Date().getFullYear()

const footerLinks = {
  start: {
    title: '开始',
    items: [
      { label: '学习路径', to: '/paths' },
      { label: '主题中心', to: '/topics' },
      { label: '视频教程', to: '/videos' },
    ],
  },
  docs: {
    title: '文档',
    items: [
      { label: '文档中心', to: '/docs' },
      { label: '关键配置', to: '/configurations' },
      { label: '模型选择', to: '/models' },
      { label: '安全实践', to: '/security' },
    ],
  },
  advanced: {
    title: '进阶',
    items: [
      { label: '最佳实践', to: '/best-practices' },
      { label: '工具系列', to: '/tools' },
      { label: 'Skills', to: '/skills' },
      { label: '案例展示', to: '/showcase' },
      { label: '二次开发专题', to: '/secondary-development' },
    ],
  },
  updates: {
    title: '动态',
    items: [
      { label: '新闻动态', to: '/news' },
      { label: '产品路线图', to: '/roadmap' },
      { label: '生态项目', to: '/ecosystem' },
      { label: '背景故事', to: '/story' },
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
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="footerBrandBg" x1="8" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#13817D" />
                  <stop offset="1" stop-color="#163938" />
                </linearGradient>
                <linearGradient id="footerBrandClaw" x1="36" y1="18" x2="54" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#F0DFC2" />
                  <stop offset="1" stop-color="#A66F2C" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="18" fill="url(#footerBrandBg)" />
              <rect x="2" y="2" width="60" height="60" rx="16" stroke="#EAD7B6" stroke-opacity=".34" />
              <path d="M38.35 17.5C35.39 14.87 31.52 13.28 27.3 13.28C18.18 13.28 10.79 20.67 10.79 29.79C10.79 38.91 18.18 46.3 27.3 46.3C31.48 46.3 35.32 44.76 38.23 42.19" stroke="#F8F3E9" stroke-width="5.2" stroke-linecap="round" />
              <path d="M32.98 21.88L47.82 16.26" stroke="url(#footerBrandClaw)" stroke-width="4.1" stroke-linecap="round" />
              <path d="M35.57 29.97L50.41 24.35" stroke="url(#footerBrandClaw)" stroke-width="4.1" stroke-linecap="round" />
              <path d="M33.04 38.15L47.88 43.93" stroke="url(#footerBrandClaw)" stroke-width="4.1" stroke-linecap="round" />
            </svg>
          </span>
          <span class="brand-text">
            <strong>OpenClawCN</strong>
            <small>中文资料站</small>
          </span>
        </NuxtLink>
        <p class="brand-desc">
          面向中文用户的 OpenClaw 新闻、文档、最佳实践与社区支持入口，助力开发者高效使用 OpenClaw。
        </p>
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
          <NuxtLink to="/disclaimer" class="legal-link">免责声明</NuxtLink>
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
}

.brand-mark svg {
  width: 40px;
  height: 40px;
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

.footer-links {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
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
