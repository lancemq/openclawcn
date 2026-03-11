# Vercel 部署说明

本项目当前基于 `Nuxt 3 + Nuxt Content + Nitro`，默认以 `vercel` preset 构建，适合直接部署到 Vercel。

## 1. 部署前准备

需要先准备以下环境变量：

```bash
NUXT_PUBLIC_SITE_URL=https://你的正式域名
NUXT_PUBLIC_GITHUB_URL=https://github.com/openclaw/openclaw
NUXT_PUBLIC_SITE_NAME=OpenClawCN
NUXT_PUBLIC_SITE_DESCRIPTION=OpenClaw 中文官网，提供新闻资讯、文档教程、最佳实践与中文社区支持入口。
NUXT_PUBLIC_SITE_KEYWORDS=OpenClaw,OpenClaw中文,OpenClaw教程,OpenClaw文档
NUXT_PUBLIC_BAIDU_SITE_VERIFICATION=
NUXT_PUBLIC_BAIDU_VERIFY_FILE=
NUXT_PUBLIC_SOGOU_SITE_VERIFICATION=
NUXT_PUBLIC_SO_SITE_VERIFICATION=
FEEDBACK_WEBHOOK_URL=
SUBSCRIBE_WEBHOOK_URL=
VERCEL_DEPLOY_HOOK_URL=
CONTENT_REBUILD_TOKEN=
```

说明：
- `NUXT_PUBLIC_SITE_URL` 用于生成 canonical、OG 链接、`robots.txt` 和 `sitemap.xml`
- `NUXT_PUBLIC_SITE_NAME`、`NUXT_PUBLIC_SITE_DESCRIPTION`、`NUXT_PUBLIC_SITE_KEYWORDS` 用于全站 title/meta/structured data
- `NUXT_PUBLIC_BAIDU_SITE_VERIFICATION` 用于百度站长平台的 HTML Meta 验证
- `NUXT_PUBLIC_BAIDU_VERIFY_FILE` 用于百度文件验证；填写 `baidu_verify_xxxxxxxx.txt` 后，站点会自动返回对应验证文件
- `NUXT_PUBLIC_SOGOU_SITE_VERIFICATION`、`NUXT_PUBLIC_SO_SITE_VERIFICATION` 分别用于搜狗与 360 的站点验证 meta
- `FEEDBACK_WEBHOOK_URL` 与 `SUBSCRIBE_WEBHOOK_URL` 可选，不配置时反馈和订阅接口仍可本地验证，但不会转发到外部服务
- `VERCEL_DEPLOY_HOOK_URL` 用于接收自动重建请求并触发新部署
- `CONTENT_REBUILD_TOKEN` 用于保护 `/api/rebuild` 接口，避免未授权触发部署

## 2. 本地验证

部署前建议先完成本地检查：

```bash
npm install
npm run build
```

本地开发运行：

```bash
npm run dev
```

内容发布检查：

```bash
npm run content:check
```

关键验证路径：
- `/`
- `/docs`
- `/news`
- `/best-practices`
- `/community`
- `/search`
- `/feedback`
- `/api/health`
- `/api/publish-status`
- `/api/rebuild`
- `/robots.txt`
- `/rss.xml`
- `/sitemap.xml`

建议再额外检查：
- 页面源码中是否输出 `keywords`、canonical、`baidu-site-verification`
- 若配置了 `NUXT_PUBLIC_BAIDU_VERIFY_FILE`，直接访问 `/baidu_verify_xxxxxxxx.txt`

## 3. 在 Vercel 上部署

1. 将仓库导入 Vercel
2. Framework Preset 选择 `Nuxt.js`
3. Build Command 使用默认值 `nuxt build`
4. Output 设置保持 Vercel/Nuxt 默认，不需要额外改成静态导出
5. 在 `Production`、`Preview`、`Development` 环境中配置变量

推荐至少配置：
- `NUXT_PUBLIC_SITE_URL`
- `NUXT_PUBLIC_GITHUB_URL`
- `NUXT_PUBLIC_SITE_NAME`
- `NUXT_PUBLIC_SITE_DESCRIPTION`
- `NUXT_PUBLIC_SITE_KEYWORDS`

按需配置：
- `NUXT_PUBLIC_BAIDU_SITE_VERIFICATION`
- `NUXT_PUBLIC_BAIDU_VERIFY_FILE`
- `NUXT_PUBLIC_SOGOU_SITE_VERIFICATION`
- `NUXT_PUBLIC_SO_SITE_VERIFICATION`
- `FEEDBACK_WEBHOOK_URL`
- `SUBSCRIBE_WEBHOOK_URL`
- `VERCEL_DEPLOY_HOOK_URL`
- `CONTENT_REBUILD_TOKEN`

## 4. 域名与 SEO

上线正式域名后，需要确认以下几点：
- `NUXT_PUBLIC_SITE_URL` 已切换到正式域名
- [robots.txt](/Users/maqi/code/openclawcn/server/routes/robots.txt.ts) 可返回正确的 `Sitemap` 地址
- [sitemap.xml](/Users/maqi/code/openclawcn/server/routes/sitemap.xml.ts) 包含首页、列表页和内容详情页
- 页面 `<title>`、`description`、`keywords`、canonical 与 OG 图片正常输出
- 如果接入百度/搜狗/360 站长平台，对应验证 meta 或验证文件可直接访问

## 4.1 国内搜索引擎提交流程

针对百度等国内搜索引擎，建议在正式域名部署完成后做以下动作：

1. 进入百度搜索资源平台添加站点
2. 优先使用 `HTML 标签验证` 或 `文件验证`
3. 验证方式对应关系：
   - `NUXT_PUBLIC_BAIDU_SITE_VERIFICATION`：用于页面 `<meta name="baidu-site-verification">`
   - `NUXT_PUBLIC_BAIDU_VERIFY_FILE`：用于文件验证，例如 `baidu_verify_xxxxxxxx.txt`
4. 验证通过后提交 `https://你的域名/sitemap.xml`
5. 后续内容更新继续通过 sitemap 与正常抓取完成收录

如果同时接搜狗或 360，也可以直接使用：
- `NUXT_PUBLIC_SOGOU_SITE_VERIFICATION`
- `NUXT_PUBLIC_SO_SITE_VERIFICATION`

## 5. 回滚与预览

Vercel 会为每次变更生成 Preview Deployment，建议使用以下流程：

1. 功能分支提交后先看 Preview
2. 确认首页、内容页、接口和 SEO 元信息正常
3. 再合并到主分支发布 Production
4. 如出现回归，直接在 Vercel 控制台回滚到上一个稳定部署

## 6. 当前已对齐的上线产物

当前仓库已经包含：
- Vercel Nitro preset
- `robots.txt` 动态路由
- `rss.xml` 动态路由
- `sitemap.xml` 动态路由
- 面向生产域名的 SEO canonical/OG 基础配置
- 内容校验与发布清单脚本
- 自动重建触发接口
- `.env.example` 环境变量模板
