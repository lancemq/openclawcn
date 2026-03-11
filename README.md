# OpenClawCN

面向中文用户的 OpenClaw 介绍站点，当前包含文档、新闻、最佳实践、社区支持、站内搜索、反馈和订阅等能力。

## 技术栈

- `Nuxt 3`
- `@nuxt/content`
- `Nitro Server API`
- `Vercel` 部署目标

## 本地启动

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
npm install
npm run dev
```

建议使用 `Node 22.x`。项目当前已固定为 `Nuxt Content native sqlite` 路径，以避免 `better-sqlite3` 在不同本机环境里的原生编译差异。

默认访问地址：
- `http://localhost:3000/`
- `http://localhost:3000/docs`
- `http://localhost:3000/news`
- `http://localhost:3000/best-practices`
- `http://localhost:3000/api/health`

## 生产构建

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
npm run build
```

当前项目默认使用 `Nitro preset: vercel`，构建后可直接用于 Vercel 部署。

## 内容发布

发布前可先运行：

```bash
npm run content:check
```

这会完成内容字段校验并生成 `public/generated/content-manifest.json`。

自动更新与发布流程说明见 [content-publishing.md](/Users/maqi/code/openclawcn/docs/content-publishing.md)。

## 环境变量

参考 [.env.example](/Users/maqi/code/openclawcn/.env.example)：

```bash
NUXT_PUBLIC_SITE_URL=https://openclawcn.vercel.app
NUXT_PUBLIC_GITHUB_URL=https://github.com/openclaw/openclaw
FEEDBACK_WEBHOOK_URL=
SUBSCRIBE_WEBHOOK_URL=
VERCEL_DEPLOY_HOOK_URL=
CONTENT_REBUILD_TOKEN=
```

## 上线相关

项目已补齐以下上线基础项：
- 动态 `robots.txt`
- 动态 `sitemap.xml`
- 动态 `rss.xml`
- canonical / OG / 基础 SEO 配置
- 内容发布校验与自动生成清单
- 受 token 保护的自动重建接口
- 适配 Vercel 的构建与函数路由结构

部署细节见 [deployment.md](/Users/maqi/code/openclawcn/docs/deployment.md)。
