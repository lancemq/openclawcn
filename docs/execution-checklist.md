# OpenClawCN 执行清单

这份清单把 [strategy-and-operations-plan.md](/Users/maqi/project/lancemq/openclawcn/docs/strategy-and-operations-plan.md) 拆成更直接的执行项，方便按周推进。

## 一、已完成

- [x] 输出完整策略文档，明确现状、风险、目标、阶段方案与优先级
- [x] 工具专题页与生态页完成一轮设计统一和模块收口
- [x] 工具专题页抽出复用组件：
  - `ToolTopicHero`
  - `ToolSectionHeading`
  - `ToolFaqSection`
  - `ToolRelatedSection`
- [x] 内容详情页新增更新时间 / 来源信息展示能力
- [x] `sitemap.xml` 补充重要静态页覆盖：
  - `/ecosystem`
  - `/skills`
  - `/configurations`
  - `/models`
  - `/security`
  - `/story`
  - `/roadmap`
  - `/showcase`
  - `/download`

## 二、产品优化待办

### P0

- [ ] 收紧首页首屏，只强调 3 条主路径：
  - 新手上手
  - 已部署扩展
  - 持续追踪更新
- [ ] 统一首页、主导航、页脚的入口表达，不再重复讲多套逻辑
- [ ] 明确页面职责边界：
  - `/paths` 负责按阶段分流
  - `/topics` 负责按问题域聚合
  - `/docs` 负责按知识结构展开
  - `/tools` 负责解释扩展能力边界

### P1

- [ ] 为首页和主要列表页建立单一主 CTA 逻辑
- [ ] 统一资讯页主 CTA 指向文档或最佳实践
- [ ] 检查 `/skills`、`/configurations`、`/ecosystem` 与 `/tools` 的互链节奏

## 三、SEO 与内容治理待办

### P0

- [ ] 补齐高价值内容的 `updatedAt`
- [ ] 补齐高价值内容的 `source / sourceName / sourceType`
- [ ] 对重点页增加“更新时间”和“来源说明”的实际内容覆盖
- [ ] 建立中文高意图关键词清单并映射到目标页面

建议首批关键词：

- [ ] OpenClaw 安装
- [ ] OpenClaw 中文文档
- [ ] OpenClaw Skills
- [ ] OpenClaw 配置
- [ ] OpenClaw Telegram
- [ ] OpenClaw 本地模型

### P1

- [ ] 强化新闻页到文档 / 工具专题 / 最佳实践的回链
- [ ] 检查 `useSeo` 在重点详情页的发布时间、section、canonical 是否完整
- [ ] 为高价值页面补结构化数据细节
- [ ] 跑通百度站长平台：
  - [ ] 域名验证
  - [ ] sitemap 提交
  - [ ] 普通收录提交
  - [ ] 观察抓取与索引反馈

## 四、内容运营待办

### 每周固定动作

- [ ] 1 篇搜索型文档或教程
- [ ] 1 篇更新解读型新闻
- [ ] 1 篇案例型最佳实践

### 内容回流机制

- [ ] 每篇新闻至少回链 2 个长期知识页
- [ ] 每篇最佳实践至少回链 1 个文档页和 1 个专题页
- [ ] 首页推荐位每周轮换
- [ ] 定期清理沉底但高价值的旧内容并重新曝光

### 内容治理

- [ ] 为 `docs` 建立优先补齐名单
- [ ] 为 `news` 建立“更新解读优先于单纯搬运”的规范
- [ ] 为 `best-practices` 建立“问题场景 -> 方法 -> 配置 -> 风险提醒”的固定结构

## 五、开发与组件化待办

### P0

- [ ] 抽专题页复用组件：
  - [ ] `CodeExampleCard`
  - [ ] `ComparisonTableCard`
  - [ ] `ProcessStepsCard`
  - [ ] `SignalSummaryCard`

### P1

- [ ] 收口详情页重复出现的 guide / stage / CTA 模块
- [ ] 继续减少单页 scoped 样式中重复的卡片和列表结构
- [ ] 建立“新增专题页模板”

## 六、运营数据待办

### P0

- [ ] 明确最小漏斗指标：
  - [ ] Landing page
  - [ ] 下一步点击
  - [ ] 订阅提交
  - [ ] 反馈提交
- [ ] 接入基础页面分析
- [ ] 为首页、文档页、新闻页、专题页定义不同的观察指标

### P1

- [ ] 形成每周复盘模板：
  - [ ] 本周新增内容
  - [ ] Top landing pages
  - [ ] 高跳出页面
  - [ ] 需要补链页面
  - [ ] 需要补内容页面

## 七、建议执行顺序

### 本周

- [ ] 首页主路径收口
- [ ] 补齐重点页面元数据
- [ ] 建立关键词清单与目标页面映射

### 下周

- [ ] 继续专题页组件化
- [ ] 补新闻页与实践页的回链
- [ ] 开始固定周更节奏

### 本月

- [ ] 跑通百度站长平台
- [ ] 接入最小分析闭环
- [ ] 完成一轮重点页面 SEO 复查
