---
title: 添加第一个技能
description: 学习如何为 OpenClaw Agent 添加和配置技能，让助手具备更多能力。
category: 入门
updatedAt: 2026-05-26
sourceType: official
tags: [skills, quickstart, tutorial, basics]
---

# 添加第一个技能

技能 (Skills) 是 OpenClaw 的核心能力扩展机制。这一页带你理解技能是什么、如何添加、以及如何让技能真正发挥作用。

## 技能是什么

技能是预定义的能力模块，让 Agent 能够执行特定类型的任务。比如：

- **网页搜索** - 让 Agent 能搜索互联网获取最新信息
- **天气查询** - 让 Agent 能查询天气信息
- **文件操作** - 让 Agent 能读写本地文件
- **代码执行** - 让 Agent 能运行代码片段

### 技能与工具的区别

很多初学者会把技能和工具混为一谈。它们的区别是：

| 维度 | 技能 | 工具 |
|------|------|------|
| 抽象层级 | 高层级能力包 | 底层原子能力 |
| 配置方式 | 声明式，开箱即用 | 需要更多参数配置 |
| 复用性 | 面向任务场景 | 面向单点操作 |
| 示例 | web-search（包含搜索+解析+摘要） | httpRequest（仅发送 HTTP 请求） |

简单记法：技能是"能做什么"，工具是"用什么做"。

## 技能市场

OpenClaw 有一个丰富的技能市场，目前已有 **349+** 开源技能可供使用。

### 浏览可用技能

```bash
# 列出所有可用技能
openclaw skills list

# 搜索特定技能
openclaw skills search weather

# 查看技能详情
openclaw skills info web-search
```

### 通过 Control UI 浏览

1. 打开 `openclaw dashboard`
2. 进入 Skills 页面
3. 浏览分类或搜索关键词
4. 查看技能评分和使用量

### 技能选择指南

在技能市场中选择技能时，建议参考这些标准：

| 评估维度 | 好的信号 | 警惕信号 |
|---------|---------|---------|
| 技能描述 | 清晰说明功能、输入和输出 | 描述模糊或过于宽泛 |
| 使用量 | 有稳定的安装和使用数据 | 完全没有任何使用记录 |
| 维护状态 | 近期有更新或维护记录 | 超过半年未更新 |
| 依赖要求 | 明确的 API 和权限声明 | 未声明任何依赖或权限 |
| 安装量 | 较高的社区安装量 | 几乎无人使用 |

## 安装技能

### 通过 CLI 安装

```bash
# 安装官方技能
openclaw skills install web-search

# 安装社区技能
openclaw skills install community/weather-alert

# 从本地路径安装
openclaw skills install ./my-custom-skill
```

### 通过配置文件

在 Agent 配置中添加：

```json
{
  "skills": [
    "web-search",
    "weather",
    "calculator"
  ]
}
```

## 配置技能

很多技能需要额外配置才能正常工作：

### API 密钥配置

```json
{
  "skills": {
    "web-search": {
      "provider": "google",
      "apiKey": "${GOOGLE_SEARCH_API_KEY}",
      "searchEngineId": "${SEARCH_ENGINE_ID}"
    }
  }
}
```

### 环境变量方式

推荐使用环境变量管理敏感信息：

```bash
# ~/.openclaw/.env
GOOGLE_SEARCH_API_KEY=your-api-key
SEARCH_ENGINE_ID=your-engine-id
```

然后在配置中引用：

```json
{
  "skills": {
    "web-search": {
      "apiKey": "${GOOGLE_SEARCH_API_KEY}"
    }
  }
}
```

### 技能依赖管理

安装技能时注意它的依赖关系：

- **API 依赖**：技能需要调用外部 API，确保你有对应的 API Key 并已正确配置
- **工具依赖**：某些技能依赖特定的工具，需要先启用对应的工具
- **版本依赖**：部分技能需要特定版本的 Gateway，安装前查看兼容性
- **权限依赖**：声明了特定权限的技能，需要先在 Gateway 中授权

## 常用技能推荐

### 信息获取类

| 技能 | 用途 | 难度 | 推荐理由 |
|------|------|------|---------|
| web-search | 网页搜索 | 简单 | 最常用的技能，几乎所有场景都适用 |
| weather | 天气查询 | 简单 | 配置简单，适合用来验证技能系统 |
| wikipedia | 维基百科查询 | 简单 | 信息源可靠，适合知识类任务 |
| news | 新闻获取 | 简单 | 支持多信源，可指定关键词 |

### 生产力类

| 技能 | 用途 | 难度 | 推荐理由 |
|------|------|------|---------|
| calendar | 日历管理 | 中等 | 适合个人日程管理场景 |
| email | 邮件处理 | 中等 | 需要谨慎配置权限 |
| notes | 笔记管理 | 简单 | 快速记录和整理信息 |
| tasks | 任务管理 | 简单 | 轻量级任务追踪 |

### 开发者类

| 技能 | 用途 | 难度 | 推荐理由 |
|------|------|------|---------|
| code-exec | 代码执行 | 中等 | 适合编程辅助场景 |
| github | GitHub 操作 | 中等 | 开发者日常工作流 |
| docker | Docker 管理 | 高级 | 需要一定运维基础 |
| database | 数据库操作 | 高级 | 注意权限控制 |

### 按场景选择技能组合

根据你的需求场景，推荐这些技能组合：

**个人日常助理**：web-search + weather + notes + calendar + tasks

**学习研究助手**：web-search + wikipedia + news + translator + notes

**开发者工具**：github + code-exec + web-search + docker（可选）

**内容创作助手**：web-search + notes + news + translator

## 创建自定义技能

如果现有技能不能满足需求，可以创建自定义技能：

### 技能结构

```text
my-skill/
├── skill.json       # 技能元数据
├── prompt.md        # 提示词模板
├── tools.json       # 工具定义
└── examples/        # 示例对话
    └── example1.md
```

### skill.json 示例

```json
{
  "name": "my-custom-skill",
  "version": "1.0.0",
  "description": "我的自定义技能",
  "author": "your-name",
  "tools": ["tool1", "tool2"],
  "prompts": ["prompt.md"],
  "examples": ["examples/example1.md"]
}
```

### 提示词模板

```markdown
# My Custom Skill

你是一个专业的助手，擅长处理以下任务：

1. 任务类型 A
2. 任务类型 B

当用户请求帮助时，你应该：
- 首先理解用户的具体需求
- 提供清晰、结构化的回答
- 必要时使用可用工具
```

### 自定义技能的最佳实践

- **单一职责**：一个技能只做一件事，做好一件事
- **清晰命名**：技能名称和描述应让用户一眼知道它能做什么
- **完整示例**：提供至少 1-2 个示例对话，帮助 Agent 理解使用场景
- **声明权限**：明确声明技能需要的 API、工具和权限
- **版本管理**：使用语义化版本号，方便跟踪变更

## 测试技能

安装技能后，测试是否正常工作：

```bash
# 测试特定技能
openclaw skills test web-search --query "今天的新闻"

# 检查技能状态
openclaw skills status

# 查看技能日志
openclaw skills logs web-search
```

### 技能测试检查清单

完成基础测试后，逐条确认：

- [ ] 技能能被 Agent 正确识别和调用
- [ ] 技能调用返回了预期结果
- [ ] 配置的 API Key 有效，没有认证错误
- [ ] 技能在对话中的表现符合预期
- [ ] 技能调用速度在可接受范围内
- [ ] 如果依赖外部服务，服务可用性正常

## 技能管理

### 更新技能

```bash
# 更新单个技能
openclaw skills update web-search

# 更新所有技能
openclaw skills update --all
```

### 禁用技能

```bash
# 临时禁用
openclaw skills disable web-search

# 重新启用
openclaw skills enable web-search
```

### 卸载技能

```bash
openclaw skills uninstall web-search
```

### 技能生命周期管理

安装技能后，建议定期做这些维护工作：

- **月度检查**：检查已安装技能是否有可用更新
- **使用审计**：查看哪些技能被高频使用，哪些几乎没用
- **清理冗余**：卸载不再使用的技能，减少上下文噪声
- **配置验证**：API Key 是否过期？需要更新的配置是否已经更新？

## 技能组合与冲突处理

当 Agent 配置了多个技能时，注意这些组合问题：

### 技能优先级

如果多个技能有重叠能力，Agent 可能不知道该调用哪个。解决方法：

- 确保技能描述足够精确，Agent 能根据描述区分
- 避免安装功能高度重叠的技能
- 必要时通过配置调整技能调用优先级

### 常见冲突模式

| 冲突类型 | 表现 | 解决方案 |
|---------|------|---------|
| 功能重叠 | 两个技能都能完成同一任务 | 只保留更成熟的那个 |
| 依赖冲突 | 两个技能依赖不同版本的同一工具 | 检查版本兼容性 |
| 上下文干扰 | 一个技能的输出污染另一个技能的输入 | 确保技能职责边界清晰 |
| 权限冲突 | 一个技能要求开放另一个技能应受限的权限 | 分别评估各技能的权限需求 |

## 常见技能误区

| 误区 | 问题 | 正确做法 |
|------|------|---------|
| 技能装得越多越好 | Agent 上下文被稀释，决策变慢 | 只安装当前场景需要的技能 |
| 装完技能就能直接用 | 很多技能需要 API 和权限配置 | 安装后务必检查和配置依赖 |
| 所有技能都绑到所有 Agent 上 | 每个 Agent 的能力面过于宽泛 | 按 Agent 职责配相应技能 |
| 不测试就投入生产 | 技能调用失败是被动发现的 | 安装后先在沙箱中测试 |
| 忽略技能更新 | 过期技能可能因 API 变更而失效 | 定期检查并更新技能 |
| 自定义技能不写描述 | Agent 不知道何时该用这个技能 | 写清晰的功能描述和触发条件 |

## 技能对性能的影响

技能不是免费的。每个已安装并启用的技能都会影响 Agent 的表现：

- **上下文消耗**：Agent 需要理解每个技能的描述和调用规则，技能越多 token 消耗越大
- **决策延迟**：Agent 需要在多个技能中选择合适的那个，技能越多决策时间越长
- **错误概率**：更多技能意味着更多可能的调用失败点

建议控制单个 Agent 的技能数量在 **5-8 个**以内，超过这个数量后性价比明显下降。

## 常见问题

### 技能安装失败

检查：
- 网络连接是否正常
- 技能名称是否正确
- 是否有必要的权限
- 技能市场是否可访问

### 技能不工作

检查：
- 配置是否正确
- API 密钥是否有效
- 查看技能日志排查问题
- 技能是否需要特定的 Gateway 版本

### 技能冲突

如果多个技能有重叠功能：
- 检查技能优先级配置
- 考虑只保留必要的技能
- 使用技能分组管理

### Agent 没有调用已安装的技能

检查：
- 技能是否被正确分配给了 Agent
- Agent 的 systemPrompt 是否覆盖了该技能的使用场景
- 技能的触发关键词或条件是否合理

### 技能调用返回错误

检查：
- API Key 是否过期
- 外部服务是否可用
- 传入参数是否符合技能要求
- 查看技能错误日志获取详细信息

## 下一步

- [技能系统详解](/docs/manual/skills-system)
- [自定义技能开发](/best-practices/skill-development-advanced)
- [工具配置指南](/docs/manual/tools-overview)
- [技能市场浏览](https://skills.openclaw.ai)
