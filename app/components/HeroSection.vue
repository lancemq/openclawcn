<script setup lang="ts">
const { trackAction } = useSiteTracking()

const digestItems = [
  {
    label: '文档索引',
    value: '从入门到排障',
    note: '优先建立整体地图，再深入配置。',
  },
  {
    label: '动态追踪',
    value: '新闻与版本观察',
    note: '把短期变化重新接回长期知识结构。',
  },
  {
    label: '实践方法',
    value: '部署与协作经验',
    note: '适合已经跑通链路后的持续优化。',
  },
]

const primaryRoutes = [
  {
    title: '新用户先看什么',
    detail: '先理解定位、阅读顺序和安装路线，再进入具体能力。',
    to: '/docs/getting-started/reading-path',
  },
  {
    title: '本周重点更新',
    detail: '快速掌握最近值得关注的版本变化、生态动向和新能力。',
    to: '/news',
  },
  {
    title: '长期运行怎么查',
    detail: '把文档、最佳实践、FAQ 和社区支持接成稳定的排障路径。',
    to: '/community',
  },
]

const editorialPanels = [
  {
    kicker: '今日导读',
    title: '把 OpenClaw 的中文资料整理成可持续查阅的资讯入口',
    detail: '不是单纯官网，也不是零散文章列表，而是带有阅读顺序、更新判断和长期导航能力的站点首页。',
  },
  {
    kicker: '阅读顺序',
    title: '先理解，再部署，再扩展',
    detail: '首页负责分流，栏目页负责承接，详情页负责展开和延伸。',
  },
]

function trackHeroClick(target: string, label: string) {
  trackAction('hero_cta_click', {
    section: 'hero',
    target,
    label,
  })
}
</script>

<template>
  <section class="hero section">
    <div class="container">
      <div class="hero-frame">
        <div class="hero-lead">
          <div class="hero-heading-row">
            <p class="eyebrow">OpenClaw 中文资讯站</p>
            <span class="hero-kicker">Editorial index for docs, updates and practice</span>
          </div>

          <div class="hero-masthead">
            <div class="hero-title-block">
              <span class="hero-edition">第 01 版 · 导读首页</span>
              <h1 class="hero-title">OpenClaw 中文资料、更新与实践导航</h1>
            </div>
            <p class="hero-copy">
              用更接近资讯网站的编排方式，把文档、新闻、最佳实践、视频和社区入口组织成清晰的阅读路径。既保留技术站点的效率，也让首页有一点编辑判断和个性。
            </p>
          </div>

          <div class="button-row">
            <NuxtLink class="button primary" to="/paths" @click="trackHeroClick('/paths', '开始学习路径')">开始学习路径</NuxtLink>
            <NuxtLink class="button secondary" to="/docs" @click="trackHeroClick('/docs', '进入文档中心')">进入文档中心</NuxtLink>
            <NuxtLink class="button ghost" to="/news" @click="trackHeroClick('/news', '查看最近更新')">查看最近更新</NuxtLink>
          </div>

          <div class="hero-digest">
            <article v-for="item in digestItems" :key="item.label" class="digest-card">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
              <p>{{ item.note }}</p>
            </article>
          </div>
        </div>

        <aside class="hero-sidebar card">
          <div class="sidebar-head">
            <span class="sidebar-title">首页提要</span>
            <span class="sidebar-live">Live Index</span>
          </div>

          <div class="editorial-panels">
            <article v-for="panel in editorialPanels" :key="panel.title" class="editorial-panel">
              <span class="panel-kicker">{{ panel.kicker }}</span>
              <strong>{{ panel.title }}</strong>
              <p>{{ panel.detail }}</p>
            </article>
          </div>

          <div class="route-strip">
            <NuxtLink v-for="route in primaryRoutes" :key="route.to" :to="route.to" class="route-item">
              <span class="route-index">0{{ primaryRoutes.indexOf(route) + 1 }}</span>
              <div class="route-copy">
                <strong>{{ route.title }}</strong>
                <p>{{ route.detail }}</p>
              </div>
            </NuxtLink>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 28px;
}

.hero-frame {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(320px, 0.86fr);
  gap: 18px;
  align-items: stretch;
}

.hero-lead {
  display: grid;
  gap: 18px;
  padding: 28px 30px 30px;
  border: 1px solid rgba(64, 73, 85, 0.12);
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(255, 253, 248, 0.9), rgba(248, 241, 230, 0.84)),
    rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 44px rgba(48, 39, 25, 0.08);
}

.hero-heading-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.hero-kicker {
  color: var(--ink-soft);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-masthead {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.72fr);
  gap: 22px;
  padding: 18px 0 24px;
  border-top: 1px solid rgba(64, 73, 85, 0.1);
  border-bottom: 1px solid rgba(64, 73, 85, 0.1);
}

.hero-title-block {
  display: grid;
  gap: 10px;
}

.hero-edition {
  color: var(--accent);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero-title {
  max-width: 11ch;
  margin: 0;
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
  font-size: clamp(2.2rem, 4.4vw, 4.3rem);
  line-height: 1.08;
  letter-spacing: -0.05em;
  text-wrap: balance;
}

.hero-copy {
  margin: 0;
  align-self: end;
  color: var(--ink-soft);
  font-size: 1.02rem;
  line-height: 1.78;
}

.hero-digest {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.digest-card {
  display: grid;
  gap: 6px;
  padding: 16px 18px;
  border-radius: 20px;
  border: 1px solid rgba(64, 73, 85, 0.1);
  background: rgba(255, 255, 255, 0.56);
}

.digest-card span,
.panel-kicker {
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.digest-card strong,
.editorial-panel strong,
.route-copy strong {
  font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
}

.digest-card strong {
  font-size: 1.08rem;
  line-height: 1.28;
}

.digest-card p,
.editorial-panel p,
.route-copy p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.62;
}

.hero-sidebar {
  display: grid;
  gap: 16px;
  align-content: start;
  padding-top: 22px;
}

.sidebar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(64, 73, 85, 0.08);
}

.sidebar-title,
.sidebar-live {
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.sidebar-title {
  color: var(--ink);
}

.sidebar-live {
  color: var(--brand);
}

.editorial-panels,
.route-strip {
  display: grid;
  gap: 12px;
}

.editorial-panel {
  display: grid;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(64, 73, 85, 0.08);
}

.route-item {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 16px;
  border-radius: 20px;
  border: 1px solid rgba(64, 73, 85, 0.08);
  background: rgba(255, 255, 255, 0.5);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.route-item:hover {
  transform: translateY(-2px);
  border-color: rgba(15, 102, 116, 0.2);
  box-shadow: 0 14px 24px rgba(48, 39, 25, 0.08);
}

.route-index {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--brand), var(--brand-bright));
  color: #fffdf8;
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.route-copy {
  display: grid;
  gap: 6px;
}

.route-copy strong {
  font-size: 1rem;
  line-height: 1.35;
}

@media (max-width: 1080px) {
  .hero-frame,
  .hero-masthead {
    grid-template-columns: 1fr;
  }

  .hero-title {
    max-width: 100%;
  }

  .hero-digest {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .hero {
    padding-top: 18px;
  }

  .hero-lead,
  .hero-sidebar {
    padding-inline: 20px;
  }

  .hero-heading-row {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
