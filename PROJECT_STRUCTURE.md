# OpenClawCN 项目结构

## 1. 技术栈选择

### 前端技术栈
- **框架**: Nuxt 3 + TypeScript（保留 Vue 生态，同时对 Vercel 部署友好）
- **UI层**: Vue 3 + 自定义组件 / Element Plus（按需引入，避免首屏过重）
- **状态管理**: Pinia
- **内容系统**: Nuxt Content（文档、新闻、最佳实践统一为 Markdown 内容）
- **构建方式**: `nuxt build` 为默认构建命令，兼容 SSR、SSG、Hybrid Rendering
- **图片优化**: `@nuxt/image`（便于接入 Vercel 图片优化能力）

### 后端技术栈
- **服务端**: Nuxt Nitro Server Routes / API Routes（与前端同仓库部署到 Vercel）
- **运行时**: Node.js Runtime on Vercel Functions
- **数据库**: 托管 PostgreSQL（服务端无状态，适合 Vercel 函数模型）
- **缓存**: 托管 Redis / KV（不依赖本地内存持久化）
- **文件存储**: 对象存储或 Blob 服务，不依赖本地文件系统写入
- **扩展原则**: 优先在 Nuxt/Nitro 体系内扩展，避免引入额外常驻服务

### 部署方案
- **主站部署**: Vercel（Git 集成、Preview、Production、回滚）
- **国内加速**: 根据访问策略接入国内 CDN 或镜像分发
- **域名**: 自定义域名接入 Vercel；如需国内主域名需配合备案方案
- **构建要求**: 所有前后端能力都必须适配 Vercel 的构建与函数约束

## 2. 项目目录结构

```
openclaw-cn-website/
├── app/                     # Nuxt 前端应用
│   ├── components/          # 公共组件
│   ├── composables/         # 组合式逻辑
│   ├── layouts/             # 布局组件
│   ├── pages/               # 页面路由
│   ├── plugins/             # 插件
│   ├── stores/              # Pinia 状态
│   └── assets/              # 样式与静态资源
├── server/                  # Nuxt/Nitro 服务端能力
│   ├── api/                 # Vercel Functions API 路由
│   ├── routes/              # 服务端路由
│   ├── middleware/          # 服务端中间件
│   └── utils/               # 服务端工具
├── content/                 # Markdown 内容管理
│   ├── news/                # 新闻内容
│   ├── tutorials/           # 教程内容
│   ├── best-practices/      # 最佳实践内容
│   └── docs/                # 文档内容
│
├── public/                  # 可直接发布的静态文件
├── docs/                    # 项目文档
│   ├── technical/           # 技术文档
│   ├── user-guide/          # 用户指南
│   └── deployment/          # 部署文档（含 Vercel 集成指南）
│
├── scripts/                 # 自动化脚本
├── nuxt.config.ts           # Nuxt 配置
├── vercel.json              # Vercel 配置（函数、Header、重写等）
├── package.json
├── .gitignore
├── README.md
└── REQUIREMENTS.md
```

## 3. 开发环境配置

### 本地开发
- Node.js LTS（与 Vercel 项目设置保持一致）
- npm/yarn/pnpm
- 托管数据库的开发环境连接
- 本地尽量模拟 Vercel 环境变量和无状态运行方式

### 代码规范
- ESLint + Prettier
- Git提交规范
- TypeScript类型检查

## 4. 内容管理系统设计

### 内容类型
- **新闻文章**: 标题、摘要、正文、标签、发布时间、作者
- **教程**: 标题、难度级别、预计时间、步骤、代码示例、相关链接
- **最佳实践**: 场景、解决方案、代码示例、注意事项
- **文档**: 版本、章节、内容、更新时间

### 内容管理流程
1. 内容创作 → Markdown格式
2. 内容审核 → GitHub PR流程
3. 内容发布 → 自动化部署
4. 内容更新 → 版本控制

## 5. 性能优化考虑

### 前端优化
- 代码分割 (Code Splitting)
- 图片懒加载
- 静态资源缓存
- PWA支持
- 按路由选择 SSR / SSG / ISR 策略

### 后端优化
- 数据库索引优化
- API响应缓存
- CDN加速
- 压缩传输
- 避免依赖本地磁盘写入、长连接常驻和进程内状态

## 6. SEO和可访问性

### SEO优化
- 语义化HTML
- Meta标签优化
- Sitemap生成
- 结构化数据

### 可访问性
- ARIA标签
- 键盘导航
- 屏幕阅读器支持
- 对比度合规

## 7. 安全考虑

### 前端安全
- XSS防护
- 内容安全策略(CSP)
- HTTPS强制

### 后端安全
- 输入验证
- SQL注入防护
- 认证授权
- 日志监控
