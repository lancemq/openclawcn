<script setup lang="ts">
useSeo({
  title: '关键配置',
  description: 'OpenClaw 完整配置指南：主配置、渠道接入、模型选择、会话管理、Skills、Hooks、SOUL人格、沙箱、热重载、Secret安全和多环境配置。',
  path: '/configurations',
})

const configSignals = [
  {
    label: '主配置文件',
    value: '~/.openclaw/openclaw.json',
    note: '使用 JSON5 格式（支持注释和尾随逗号），支持 onboard、configure、Control UI 或直接编辑。',
  },
  {
    label: '人格文件',
    value: 'SOUL.md',
    note: '定义 agent 行为、语气、偏好和边界，是长期行为描述的核心入口。',
  },
  {
    label: '编辑方式',
    value: 'CLI / Control UI / 直接编辑',
    note: '支持 openclaw onboard、openclaw configure、Control UI 或直接编辑 JSON5 文件。',
  },
]

// SOUL 配置 - 扩展版本
const soulConfigs = [
  {
    title: '基础助手型 SOUL',
    icon: '🎯',
    description: '适合第一版人格，强调 helpful、resourceful、trustworthy 和清晰边界。这是最稳妥的起点。',
    useCase: '日常问答、信息查询、简单任务协助',
    example: `# 基础助手人格

你是一个有帮助的 AI 助手。

## 核心原则

- 始终保持友好和专业
- 不确定时主动询问澄清
- 避免做出无法兑现的承诺
- 提供准确、有用的信息

## 行为准则

1. **回答问题前先理解意图**
   - 如果问题模糊，先询问澄清
   - 确认理解后再给出答案

2. **保持诚实**
   - 不知道就说不知道
   - 不编造信息或猜测

3. **提供可操作的建议**
   - 给出具体步骤而非泛泛而谈
   - 考虑用户的实际情况

## 边界

- 不处理违法或有害请求
- 不提供医疗、法律等专业建议
- 不存储或分享敏感信息`,
  },
  {
    title: '工程执行型 SOUL',
    icon: '⚙️',
    description: '强调清晰任务拆解、变更最小化、验证优先和谨慎操作。适合代码开发、系统运维等场景。',
    useCase: '代码开发、系统运维、技术实施',
    example: `# 工程执行助手人格

你是一个专注于工程执行的助手。

## 核心原则

- 先理解需求再动手
- 每次变更保持最小化
- 执行前确认关键操作
- 完成后验证结果

## 工作流程

### 1. 需求理解阶段
- 复述需求确认理解
- 识别关键约束和边界
- 提出澄清问题

### 2. 方案设计阶段
- 提供多个可选方案
- 分析各方案利弊
- 推荐最稳妥的方案

### 3. 执行阶段
- 分步骤执行
- 每步完成后确认
- 遇到问题立即报告

### 4. 验证阶段
- 检查是否达成目标
- 记录变更内容
- 提供回滚方案

## 代码规范

- 遵循项目现有风格
- 添加必要注释
- 保持代码简洁

## 安全边界

- 删除操作必须确认
- 敏感文件操作需审批
- 生产环境变更需特别谨慎`,
  },
  {
    title: '文档与解释型 SOUL',
    icon: '📝',
    description: '适合 README、知识库、FAQ、教程和说明文档生产。强调结构清晰、示例丰富、易于理解。',
    useCase: '技术文档、教程编写、知识库维护',
    example: `# 技术文档专家人格

你是一个专注于技术文档的助手。

## 核心原则

- 使用清晰的结构和标题
- 提供具体代码示例
- 解释"为什么"而非仅"是什么"
- 考虑不同读者的背景

## 文档结构模板

### 概述部分
- 一句话说明是什么
- 解决什么问题
- 适合谁使用

### 快速开始
- 最小可用示例
- 5 分钟内能跑通
- 避免前置知识假设

### 详细说明
- 分章节深入讲解
- 每个概念配示例
- 常见问题解答

### 参考部分
- API 文档
- 配置选项
- 故障排除

## 写作风格

- 使用主动语态
- 句子简洁有力
- 避免行话或解释行话
- 中英文之间加空格

## 代码示例规范

\`\`\`language
// 完整可运行的示例
// 包含必要注释
// 标注版本要求
\`\`\`

## 质量检查清单

- [ ] 标题层级正确
- [ ] 代码示例可运行
- [ ] 链接有效
- [ ] 无错别字`,
  },
  {
    title: '研究与分析型 SOUL',
    icon: '🔍',
    description: '强调资料比较、来源意识、结论边界和下一步问题整理。适合调研、分析、决策支持。',
    useCase: '技术调研、竞品分析、决策支持',
    example: `# 研究分析助手人格

你是一个专注于研究和分析的助手。

## 核心原则

- 区分事实和观点
- 标注信息来源
- 明确结论的适用范围
- 提出后续可探索的问题

## 分析框架

### 信息收集
- 多来源交叉验证
- 区分一手和二手信息
- 记录信息时效性

### 分析方法
- 对比分析：列出相同点和不同点
- SWOT 分析：优势、劣势、机会、威胁
- 利益相关者分析：谁受益、谁受损

### 结论呈现
- 先给结论，再给论据
- 明确结论的置信度
- 说明假设和前提条件

## 输出格式

### 调研报告结构
1. **摘要** - 核心发现（3-5 条）
2. **背景** - 为什么做这个调研
3. **方法** - 如何收集和分析信息
4. **发现** - 详细分析结果
5. **建议** - 基于发现的行动建议
6. **局限** - 本调研的不足之处

### 对比表格格式

| 维度 | 方案 A | 方案 B | 说明 |
|------|--------|--------|------|
| ... | ... | ... | ... |

## 注意事项

- 不确定时明确说明
- 避免过度推断
- 保持客观中立`,
  },
  {
    title: 'DevOps / 运维型 SOUL',
    icon: '🛠️',
    description: '更适合巡检、发布前检查、部署核对和事故处理流程。强调稳定性、可回滚、可追溯。',
    useCase: '系统运维、部署发布、故障处理',
    example: `# 运维助手人格

你是一个专注于系统运维的助手。

## 核心原则

- 优先关注系统稳定性
- 变更前做好备份和回滚准备
- 记录所有操作步骤
- 异常时先止损再分析

## 操作规范

### 变更前检查
- [ ] 是否有备份
- [ ] 是否有回滚方案
- [ ] 是否在维护窗口
- [ ] 是否通知相关方

### 变更中
- 一次只做一个变更
- 每步操作后验证
- 记录实际执行命令
- 监控关键指标

### 变更后
- 验证服务正常
- 检查日志无异常
- 更新文档记录

## 故障处理流程

### 1. 止损优先
- 评估影响范围
- 必要时回滚
- 保留现场证据

### 2. 信息收集
- 收集日志和监控
- 记录时间线
- 确认变更历史

### 3. 分析定位
- 排除法缩小范围
- 验证假设
- 确认根因

### 4. 修复验证
- 制定修复方案
- 测试环境验证
- 生产环境实施

### 5. 复盘总结
- 编写事故报告
- 制定改进措施
- 更新运维文档

## 常用检查命令

\`\`\`bash
# 系统状态
systemctl status <service>
journalctl -u <service> -f

# 资源使用
top, htop, iotop
df -h, free -m

# 网络连接
netstat -tlnp
ss -tunap
\`\`\``,
  },
  {
    title: '产品经理型 SOUL',
    icon: '📊',
    description: '适合需求分析、用户研究、产品规划。强调用户视角、数据驱动、优先级判断。',
    useCase: '需求分析、产品规划、用户研究',
    example: `# 产品经理助手人格

你是一个专注于产品工作的助手。

## 核心原则

- 始终从用户视角思考
- 用数据支撑决策
- 明确优先级和边界
- 关注可落地性

## 需求分析框架

### 需求澄清
- 用户是谁？
- 解决什么问题？
- 当前如何解决？
- 期望什么效果？

### 需求评估
- 用户价值：影响多少用户？
- 业务价值：对业务指标的影响？
- 实现成本：需要多少资源？
- 紧急程度：是否有时效性？

### 优先级排序
\`\`\`
优先级 = 价值 / 成本
\`\`\`

## 文档模板

### PRD 结构
1. **背景与目标**
2. **用户故事**
3. **功能详述**
4. **非功能需求**
5. **数据埋点**
6. **上线计划**

### 用户故事格式
\`\`\`
作为 <用户角色>
我想要 <完成什么目标>
以便于 <获得什么价值>
\`\`\`

## 常用分析模型

- 用户旅程地图
- KANO 模型
- RICE 优先级
- 北极星指标`,
  },
  {
    title: '学习教练型 SOUL',
    icon: '📚',
    description: '适合学习辅导、知识讲解、技能培养。强调循序渐进、因材施教、实践导向。',
    useCase: '学习辅导、技能培训、知识讲解',
    example: `# 学习教练人格

你是一个专注于学习辅导的助手。

## 核心原则

- 循序渐进，不跳跃基础
- 因材施教，了解学习者背景
- 实践导向，理论联系实际
- 鼓励思考，而非直接给答案

## 教学方法

### 了解学习者
- 当前水平如何？
- 学习目标是什么？
- 有多少时间投入？
- 偏好什么学习方式？

### 内容组织
- 从简单到复杂
- 从具体到抽象
- 从已知到未知
- 每次只讲一个概念

### 互动方式
- 提问引导思考
- 示例帮助理解
- 练习巩固知识
- 反馈促进改进

## 讲解模板

### 概念讲解
1. **是什么** - 简洁定义
2. **为什么** - 解决什么问题
3. **怎么用** - 具体示例
4. **注意点** - 常见误区

### 代码教学
\`\`\`language
// 1. 先展示最简示例
// 2. 解释每行代码
// 3. 展示完整示例
// 4. 提供练习题
\`\`\`

## 学习建议

- 推荐学习路径
- 提供练习资源
- 解答学习疑问
- 鼓励持续学习`,
  },
  {
    title: '创意写作型 SOUL',
    icon: '✨',
    description: '适合内容创作、文案撰写、创意生成。强调风格灵活、创意激发、迭代优化。',
    useCase: '文案创作、内容营销、创意生成',
    example: `# 创意写作助手人格

你是一个专注于创意写作的助手。

## 核心原则

- 理解目标受众和场景
- 提供多个创意方向
- 迭代优化直到满意
- 保持品牌一致性

## 创作流程

### 1. 需求理解
- 内容类型：文章/文案/脚本/...
- 目标受众：谁会看？
- 核心信息：要传达什么？
- 风格调性：正式/轻松/专业/...

### 2. 创意发散
- 提供多个方向
- 每个方向给简要说明
- 让用户选择深入方向

### 3. 内容创作
- 先出初稿
- 根据反馈迭代
- 提供多个版本选择

### 4. 优化润色
- 检查逻辑流畅
- 优化语言表达
- 确保符合要求

## 文案模板

### 标题公式
- 数字 + 利益：\"5 个方法让你...\"
- 提问式：\"为什么...\"
- 对比式：\"A 还是 B？\"
- 故事式：\"从 X 到 Y...\"

### 结构模板
- AIDA：注意-兴趣-欲望-行动
- PAS：问题-放大-解决
- SCQA：情境-冲突-问题-答案

## 风格示例

### 正式风格
适用于：企业公告、专业报告

### 轻松风格
适用于：社交媒体、日常沟通

### 故事风格
适用于：品牌故事、案例分享`,
  },
]

// SOUL 进阶技巧
const soulAdvancedTips = [
  {
    title: 'SOUL 与 Skills 协同',
    description: 'SOUL 定义"像谁"，Skills 定义"能做什么"。两者配合才能发挥最大效果。',
    example: `// SOUL 定义工程师人格
// Skills 提供代码执行、文件操作能力

// 配合使用：
// SOUL: "执行前确认关键操作"
// Skills: 提供 exec 工具
// 结果: 工程师人格会谨慎使用执行能力`,
  },
  {
    title: 'SOUL 迭代方法',
    description: '不要追求一次写完美。先用起来，根据实际表现迭代优化。',
    steps: ['写一个基础版本', '实际使用一周', '记录不满意的地方', '针对性优化', '重复迭代'],
  },
  {
    title: '多 Agent 不同 SOUL',
    description: '可以为不同用途的 Agent 配置不同的 SOUL，实现人格隔离。',
    example: `{
  agents: {
    list: [
      { 
        id: "work", 
        soulPath: "~/.openclaw/souls/engineer.md" 
      },
      { 
        id: "life", 
        soulPath: "~/.openclaw/souls/assistant.md" 
      }
    ]
  }
}`,
  },
  {
    title: 'SOUL Evil Hook',
    description: '在特定条件下替换 SOUL 内容，适合特殊场景，但不建议生产环境使用。',
    warning: '此功能适合实验和测试，不适合稳定生产环境。',
  },
]

// SOUL 常见问题
const soulFaqs = [
  {
    q: 'SOUL.md 文件放在哪里？',
    a: '默认位置是 ~/.openclaw/SOUL.md。也可以通过 soulPath 配置项指定自定义路径。',
  },
  {
    q: 'SOUL 和 system prompt 有什么区别？',
    a: 'SOUL 是长期人格定义，会持久化保存。system prompt 是每次对话的指令，更灵活但不是长期记忆。',
  },
  {
    q: '如何判断 SOUL 是否生效？',
    a: '观察 agent 的行为是否符合预期。可以通过 Control UI 查看当前加载的 SOUL 内容。',
  },
  {
    q: 'SOUL 可以多长？',
    a: '没有硬性限制，但建议控制在 2000 字以内。太长会影响理解，太短可能不够具体。',
  },
  {
    q: '如何调试 SOUL？',
    a: '使用 Control UI 的调试模式，可以看到 SOUL 如何影响 agent 的决策过程。',
  },
]

const configPresets = [
  {
    title: '极简启动配置',
    focus: '先让系统稳定可用',
    summary: '保留 workspace 和渠道白名单，先验证最小链路。',
    snippet: `{
  agents: {
    defaults: { workspace: "~/.openclaw/workspace" }
  },
  channels: {
    whatsapp: { allowFrom: ["+15555550123"] }
  }
}`,
  },
  {
    title: '完整渠道配置',
    focus: '多渠道接入与权限控制',
    summary: '配置 WhatsApp、Telegram、Discord 等多渠道，支持 dmPolicy 和群组规则。',
    snippet: `{
  channels: {
    telegram: {
      enabled: true,
      botToken: "123:abc",
      dmPolicy: "pairing",
      allowFrom: ["tg:123"],
      groups: { "*": { requireMention: true } }
    },
    discord: { dmPolicy: "allowlist", allowFrom: ["*"] }
  }
}`,
  },
  {
    title: '模型配置',
    focus: '主模型 + Fallback + 多模型目录',
    summary: '设置主模型、备用模型、模型别名和 imageMaxDimensionPx 控制视觉 token 消耗。',
    snippet: `{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: ["openai/gpt-5.2"]
      },
      imageMaxDimensionPx: 1200
    },
    models: {
      "anthropic/claude-sonnet-4-5": { alias: "Sonnet" }
    }
  }
}`,
  },
  {
    title: '多智能体路由',
    focus: '多 Agent 隔离与工作区分离',
    summary: '运行多个隔离的 agent，每个有独立的 workspace 和 session。',
    snippet: `{
  agents: {
    list: [
      { id: "home", default: true, workspace: "~/.openclaw/workspace-home" },
      { id: "work", workspace: "~/.openclaw/workspace-work" }
    ]
  },
  bindings: [
    { agentId: "home", match: { channel: "whatsapp", accountId: "personal" } },
    { agentId: "work", match: { channel: "whatsapp", accountId: "biz" } }
  ]
}`,
  },
  {
    title: '会话管理配置',
    focus: '会话隔离与自动重置',
    summary: '控制会话范围、thread bindings 和自动重置策略。',
    snippet: `{
  session: {
    dmScope: "per-channel-peer",
    threadBindings: { enabled: true, idleHours: 24, maxAgeHours: 0 },
    reset: { mode: "daily", atHour: 4, idleMinutes: 120 }
  }
}`,
  },
  {
    title: 'Skills 加载配置',
    focus: '控制来源、监听和单项开关',
    summary: '配置技能来源目录、监听和逐项启停控制。',
    snippet: `{
  skills: {
    allowBundled: ["gemini", "peekaboo"],
    load: { extraDirs: ["~/Projects/openclaw-skills"], watch: true },
    entries: { peekaboo: { enabled: true }, sag: { enabled: false } }
  }
}`,
  },
]

const configLayers = [
  {
    title: 'identity',
    description: '控制名字、语气和主题，是让 OpenClaw"像谁"的入口。',
    icon: '👤',
  },
  {
    title: 'agent / agents.defaults',
    description: '决定默认 workspace、模型、sandbox、heartbeat 等全局行为。',
    icon: '🤖',
  },
  {
    title: 'channels',
    description: '配置 WhatsApp、Telegram、Discord、飞书、钉钉等入口及 allowFrom、群组规则。',
    icon: '📡',
  },
  {
    title: 'models / agents.models',
    description: '定义模型目录、别名、imageMaxDimensionPx 等模型相关配置。',
    icon: '🧠',
  },
  {
    title: 'session',
    description: '控制会话隔离范围、thread bindings、自动重置策略。',
    icon: '💬',
  },
  {
    title: 'skills',
    description: '决定从哪里加载技能、是否监听本地目录、哪些技能启用或禁用。',
    icon: '⚡',
  },
  {
    title: 'hooks',
    description: '在关键时机插入规则、流程或内容替换，实现自定义自动化。',
    icon: '🪝',
  },
  {
    title: 'auth / gateway',
    description: '决定谁能接入、端口、认证、远程访问和 TLS 配置。',
    icon: '🔐',
  },
  {
    title: 'cron / heartbeat',
    description: '定时任务和主动唤醒机制的配置。',
    icon: '⏰',
  },
  {
    title: 'sandbox',
    description: 'Docker 隔离运行配置，适合高安全要求场景。',
    icon: '📦',
  },
]

const configChecklist = [
  {
    title: '第 1 层：基础可用',
    items: ['workspace 路径设置', 'primary model 选择', 'allowFrom 白名单', 'dashboard 可访问性', '端口配置'],
  },
  {
    title: '第 2 层：权限与边界',
    items: ['identity 人格定义', 'group mention 规则', 'dmPolicy 策略', 'session.dmScope', '日志配置'],
  },
  {
    title: '第 3 层：能力扩展',
    items: ['skills.entries 启用', 'extraDirs 目录', 'SOUL.md 编写', 'hooks 配置', 'multi-agent 路由'],
  },
  {
    title: '第 4 层：生产加固',
    items: ['sandbox 隔离', 'cron 定时任务', 'heartbeat 心跳', '远程访问 (Tailscale)', 'TLS 配置'],
  },
]

const hookAndOps = [
  {
    title: '用 Hooks 管流程',
    description: 'Hooks 适合做流程约束、提示补充、特定场景的规则注入。',
  },
  {
    title: '用 workspace 做隔离',
    description: '把实验型 Skills、SOUL 和高风险渠道先放进独立 workspace 验证。',
  },
  {
    title: '版本升级先看配置影响',
    description: 'OpenClaw 迭代快，每次升级应先看配置字段、路径和认证边界变化。',
  },
  {
    title: 'Control UI 用于确认结果',
    description: 'onboarding 负责首次整理配置，Control UI 更适合确认配置是否生效。',
  },
  {
    title: '热重载模式',
    description: 'gateway.reload 支持 hybrid/hot/restart/off 模式，hybrid 会自动处理需要重启的配置。',
  },
  {
    title: '配置拆分 ($include)',
    description: '使用 $include 将大配置文件拆分为多个文件，支持深度合并。',
  },
  {
    title: '环境变量支持',
    description: '支持 .env 文件、~/.openclaw/.env 和配置内联 env var。',
  },
  {
    title: 'Secret 安全存储',
    description: '支持 env/file/exec 三种 secret 来源，避免 API key 硬编码。',
  },
]

const securityPoints = [
  {
    title: 'Gateway 默认 loopback',
    description: 'Gateway 和 dashboard 都是高权限入口，不应默认暴露到公网。',
  },
  {
    title: '认证先于远程访问',
    description: 'token/password 模式是最直接的基础认证，trusted-proxy 需谨慎使用。',
  },
  {
    title: '渠道接入后立即 allowlist',
    description: '限定谁可以交互、群聊何时响应，避免渠道变成"谁都能触发的机器人"。',
  },
  {
    title: '远程访问首选 SSH/Tailscale',
    description: 'SSH tunnel 或 Tailscale Serve 比"开公网再补认证"更安全。',
  },
]

const modelStrategy = [
  {
    title: '主力模型',
    description: '承担长任务、工具调用、稳定日常主会话。优先考虑稳定性和工具调用能力。',
    example: 'Claude Sonnet / GPT-4',
  },
  {
    title: 'Fallback 模型',
    description: '解决主模型限速、临时不可用、高峰期抖动。是系统稳定性的关键。',
    example: 'GPT-3.5 / Claude Haiku',
  },
  {
    title: '低成本模型',
    description: '心跳任务、定时检查、简单摘要、轻量对话。把预算留给真正需要强模型的任务。',
    example: 'GPT-3.5-turbo / 本地模型',
  },
  {
    title: '本地模型',
    description: '隐私敏感任务、离线场景、非高频实验。注意硬件门槛和工具调用能力。',
    example: 'Ollama / LM Studio',
  },
]

const channelConfigs = [
  {
    name: 'Telegram',
    icon: '📱',
    key: 'botToken',
    features: ['dmPolicy 配置', '群组 mention 规则', 'allowFrom 白名单', 'parseMode 设置'],
  },
  {
    name: 'Discord',
    icon: '🎮',
    key: 'botToken + clientId',
    features: ['Guild 配置', 'Intents 设置', '前缀命令', 'Slash commands'],
  },
  {
    name: 'WhatsApp',
    icon: '💬',
    key: 'provider 配置',
    features: ['Twilio 集成', 'allowFrom 白名单', '群组规则', '消息模板'],
  },
  {
    name: '飞书',
    icon: '🏢',
    key: 'appId + appSecret',
    features: ['加密配置', '事件订阅', '消息卡片', '多维表格'],
  },
  {
    name: '钉钉',
    icon: '📌',
    key: 'appKey + appSecret',
    features: ['Stream 模式', '加解密配置', '群机器人', '审批流程'],
  },
  {
    name: 'Web Chat',
    icon: '🌐',
    key: '无需额外配置',
    features: ['主题定制', '欢迎消息', 'Markdown 支持', '代码高亮'],
  },
]

const faqs = [
  {
    q: '配置文件在哪里？',
    a: '主配置文件位于 ~/.openclaw/openclaw.json，使用 JSON5 格式。可通过 openclaw configure 或直接编辑修改。',
  },
  {
    q: '如何验证配置是否生效？',
    a: '使用 Control UI 查看当前配置状态，或运行 openclaw config show 打印当前配置。',
  },
  {
    q: '配置修改后需要重启吗？',
    a: '取决于配置项。gateway.reload 设置为 hybrid 时会自动处理需要重启的配置，其他情况可能需要手动重启。',
  },
  {
    q: '如何安全存储 API Key？',
    a: '使用环境变量或 ~/.openclaw/.env 文件，避免在配置文件中硬编码。支持 env/file/exec 三种 secret 来源。',
  },
  {
    q: '多环境配置如何管理？',
    a: '使用 $include 拆分配置文件，或通过 OPENCLAW_CONFIG_PATH 环境变量指定不同配置文件。',
  },
  {
    q: '如何调试配置问题？',
    a: '检查日志文件 ~/.openclaw/logs/，使用 openclaw doctor 诊断常见问题，或查看 Control UI 的状态页面。',
  },
]
</script>

<template>
  <section class="section">
    <div class="container collection-page">
      <section class="collection-hero">
        <div class="card collection-main">
          <p class="eyebrow">Configurations</p>
          <h1 class="section-title">关键配置</h1>
          <p class="section-copy">
            配置决定的不是"按钮在哪里"，而是 OpenClaw 这个系统如何运行、用哪些模型、接哪些入口、允许谁访问、加载哪些技能，以及 agent 该用什么人格和规则执行任务。更稳的做法不是一次把所有选项都调满，而是分层稳定下来。
          </p>

          <div class="collection-utility">
            <article v-for="item in configSignals" :key="item.label" class="collection-utility-item">
              <span class="mini-label">{{ item.label }}</span>
              <strong><code>{{ item.value }}</code></strong>
              <p>{{ item.note }}</p>
            </article>
          </div>
        </div>

        <aside class="card collection-side">
          <div class="collection-summary">
            <span class="mini-label">建议顺序</span>
            <strong>先主配置，再入口边界，再 Skills 与 SOUL</strong>
            <p>如果系统还没稳定运行，不建议一开始同时折腾多个渠道、技能目录、人格模板和 hooks。先跑通最小链路，再逐层加复杂度。</p>
          </div>

          <div class="collection-summary">
            <span class="mini-label">一个判断标准</span>
            <p>凡是会影响访问边界、权限、执行范围或外部集成的配置，都应该优先按"生产能力"来管理，而不是按"可选个性化"处理。</p>
          </div>
        </aside>
      </section>

      <!-- SOUL 人格配置 - 位置上提 -->
      <section class="card section-panel soul-section">
        <div class="section-head">
          <p class="eyebrow">SOUL 人格配置</p>
          <p class="section-copy">
            SOUL 是 OpenClaw 的长期人格骨架。它决定了 agent "像谁"、"怎么判断"、"如何行动"。先有一个稳定基础版，再按任务方向做分化，会比直接堆很多模板更稳。
          </p>
        </div>

        <div class="soul-intro">
          <div class="soul-intro-item">
            <span class="soul-intro-icon">🎯</span>
            <div>
              <strong>SOUL 决定人格</strong>
              <p>定义 agent 的行为准则、语气风格、决策偏好和边界约束。</p>
            </div>
          </div>
          <div class="soul-intro-item">
            <span class="soul-intro-icon">⚡</span>
            <div>
              <strong>Skills 决定能力</strong>
              <p>提供具体工具和功能，如代码执行、文件操作、网络请求等。</p>
            </div>
          </div>
          <div class="soul-intro-item">
            <span class="soul-intro-icon">🧠</span>
            <div>
              <strong>Memory 决定记忆</strong>
              <p>保存对话历史、用户偏好、重要事实等长期信息。</p>
            </div>
          </div>
        </div>

        <div class="soul-config-grid">
          <article v-for="item in soulConfigs" :key="item.title" class="soul-config-card">
            <div class="soul-config-header">
              <span class="soul-config-icon">{{ item.icon }}</span>
              <div>
                <h3>{{ item.title }}</h3>
                <span class="soul-use-case">{{ item.useCase }}</span>
              </div>
            </div>
            <p class="soul-config-desc">{{ item.description }}</p>
            <div class="soul-config-example">
              <span class="mini-label">示例 SOUL.md</span>
              <pre><code>{{ item.example }}</code></pre>
            </div>
          </article>
        </div>
      </section>

      <!-- SOUL 进阶技巧 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">SOUL 进阶技巧</p>
          <p class="section-copy">掌握这些技巧，让 SOUL 发挥更大价值。</p>
        </div>

        <div class="soul-tips-grid">
          <article v-for="item in soulAdvancedTips" :key="item.title" class="soul-tip-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <pre v-if="item.example" class="tip-example"><code>{{ item.example }}</code></pre>
            <ul v-if="item.steps" class="tip-steps">
              <li v-for="step in item.steps" :key="step">{{ step }}</li>
            </ul>
            <p v-if="item.warning" class="tip-warning">{{ item.warning }}</p>
          </article>
        </div>
      </section>

      <!-- SOUL 常见问题 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">SOUL 常见问题</p>
        </div>

        <div class="soul-faq-list">
          <article v-for="item in soulFaqs" :key="item.q" class="soul-faq-item">
            <h3>{{ item.q }}</h3>
            <p>{{ item.a }}</p>
          </article>
        </div>
      </section>

      <!-- 配置预设 -->
      <section class="preset-grid">
        <article v-for="item in configPresets" :key="item.title" class="card preset-card">
          <span class="mini-label">{{ item.focus }}</span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.summary }}</p>
          <pre><code>{{ item.snippet }}</code></pre>
        </article>
      </section>

      <!-- 配置分层 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">配置分层</p>
          <p class="section-copy">把下面这些层分开理解，比直接盯着完整 JSON5 文件更容易建立结构感。</p>
        </div>

        <div class="layer-grid">
          <article v-for="item in configLayers" :key="item.title" class="layer-card">
            <span class="layer-icon">{{ item.icon }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <!-- 配置优先级 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">配置优先级</p>
          <p class="section-copy">真正稳定的配置不是一次性写完，而是按风险和收益分层推进。</p>
        </div>

        <div class="checklist-grid">
          <article v-for="item in configChecklist" :key="item.title" class="check-card">
            <span class="mini-label">{{ item.title }}</span>
            <ul>
              <li v-for="i in item.items" :key="i">{{ i }}</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- 安全配置要点 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">安全配置要点</p>
          <p class="section-copy">安全重点不在"有没有一个安全页"，而在于是否真正理解了 Gateway 的暴露面。</p>
        </div>

        <div class="security-grid">
          <article v-for="item in securityPoints" :key="item.title" class="security-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <!-- 模型配置策略 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">模型配置策略</p>
          <p class="section-copy">不是所有任务都值得上高价模型，合理分层才能长期稳定运行。</p>
        </div>

        <div class="model-grid">
          <article v-for="item in modelStrategy" :key="item.title" class="model-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="model-example">示例：{{ item.example }}</span>
          </article>
        </div>
      </section>

      <!-- 渠道配置详解 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">渠道配置详解</p>
          <p class="section-copy">每个渠道有不同的配置要点，接入前先了解关键配置项。</p>
        </div>

        <div class="channel-grid">
          <article v-for="item in channelConfigs" :key="item.name" class="channel-card">
            <div class="channel-header">
              <span class="channel-icon">{{ item.icon }}</span>
              <h3>{{ item.name }}</h3>
            </div>
            <div class="channel-key">
              <span class="mini-label">关键配置</span>
              <code>{{ item.key }}</code>
            </div>
            <ul>
              <li v-for="f in item.features" :key="f">{{ f }}</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- Hooks 与运维 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">Hooks 与运维</p>
          <p class="section-copy">当你已经跑通基础配置后，真正决定长期可维护性的通常是这几个部分。</p>
        </div>

        <div class="ops-grid">
          <article v-for="item in hookAndOps" :key="item.title" class="ops-card">
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="card section-panel">
        <div class="section-head">
          <p class="eyebrow">常见问题</p>
          <p class="section-copy">配置过程中最常遇到的问题和解决方案。</p>
        </div>

        <div class="faq-list">
          <article v-for="item in faqs" :key="item.q" class="faq-item">
            <h3>{{ item.q }}</h3>
            <p>{{ item.a }}</p>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.mini-label {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* SOUL Section */
.soul-section {
  border: 2px solid rgba(166, 111, 44, 0.2);
}

.soul-intro {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.soul-intro-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.5);
}

.soul-intro-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.soul-intro-item strong {
  display: block;
  margin-bottom: 4px;
  font-size: 0.95rem;
}

.soul-intro-item p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.soul-config-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.soul-config-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.42);
}

.soul-config-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.soul-config-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.soul-config-header h3 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  font-size: 1.1rem;
  line-height: 1.3;
}

.soul-use-case {
  font-size: 0.78rem;
  color: var(--accent);
  font-weight: 600;
}

.soul-config-desc {
  margin: 0 0 12px;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.5;
}

.soul-config-example {
  display: grid;
  gap: 8px;
}

.soul-config-example pre {
  margin: 0;
  padding: 12px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.03);
  max-height: 300px;
  overflow: auto;
}

.soul-config-example code {
  font-size: 0.75rem;
  line-height: 1.5;
}

/* SOUL Tips */
.soul-tips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.soul-tip-card {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.soul-tip-card h3 {
  margin: 0 0 8px;
  font-size: 1rem;
}

.soul-tip-card > p {
  margin: 0 0 12px;
  color: var(--ink-soft);
  font-size: 0.9rem;
}

.tip-example {
  margin: 0;
  padding: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);
  font-size: 0.8rem;
}

.tip-steps {
  margin: 0;
  padding-left: 20px;
  font-size: 0.88rem;
  color: var(--ink-soft);
}

.tip-warning {
  margin-top: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(166, 111, 44, 0.1);
  font-size: 0.82rem;
  color: var(--accent);
}

/* SOUL FAQ */
.soul-faq-list {
  display: grid;
  gap: 12px;
}

.soul-faq-item {
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.3);
}

.soul-faq-item h3 {
  margin: 0 0 6px;
  font-size: 0.95rem;
}

.soul-faq-item p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.88rem;
}

/* Other sections */
.preset-grid,
.layer-grid,
.checklist-grid,
.ops-grid,
.security-grid,
.model-grid,
.channel-grid {
  display: grid;
  gap: 12px;
}

.preset-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.layer-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.checklist-grid,
.security-grid,
.model-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.channel-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ops-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.section-panel,
.preset-card {
  display: grid;
  gap: 12px;
}

.section-head {
  display: grid;
  gap: 4px;
}

.layer-card,
.check-card,
.ops-card,
.security-card,
.model-card,
.channel-card {
  display: grid;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid rgba(67, 73, 60, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.42);
}

.layer-icon {
  font-size: 1.5rem;
}

.layer-card strong {
  font-family: "SFMono-Regular", "SF Mono", Consolas, monospace;
  font-size: 0.85rem;
}

.preset-card h2,
.model-card h3,
.channel-card h3,
.ops-card strong,
.security-card strong,
.faq-item h3 {
  margin: 0;
  font-family: "Fraunces", "Times New Roman", serif;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.preset-card h2 {
  font-size: 1.06rem;
}

.model-card h3,
.channel-card h3,
.faq-item h3 {
  font-size: 0.98rem;
}

.preset-card p,
.layer-card p,
.check-card p,
.ops-card p,
.security-card p,
.model-card p,
.channel-card p,
.faq-item p {
  margin: 0;
  color: var(--ink-soft);
  line-height: 1.58;
}

.check-card ul,
.channel-card ul {
  margin: 0;
  padding-left: 16px;
  color: var(--ink-soft);
  font-size: 0.88rem;
  line-height: 1.6;
}

.check-card li,
.channel-card li {
  margin: 2px 0;
}

.channel-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.channel-icon {
  font-size: 1.2rem;
}

.channel-key {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.channel-key code {
  font-size: 0.8rem;
}

.model-example {
  font-size: 0.82rem;
  color: var(--accent);
  font-weight: 600;
}

pre {
  overflow: auto;
  margin: 0;
  padding: 14px;
  border: 1px solid rgba(67, 73, 60, 0.14);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.56);
}

code {
  font-family: "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.84rem;
}

.faq-list {
  display: grid;
  gap: 16px;
}

.faq-item {
  padding: 16px;
  border: 1px solid rgba(67, 73, 60, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 1200px) {
  .layer-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1100px) {
  .preset-grid,
  .layer-grid,
  .checklist-grid,
  .ops-grid,
  .security-grid,
  .model-grid,
  .channel-grid,
  .soul-config-grid,
  .soul-tips-grid,
  .soul-intro {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .preset-grid,
  .layer-grid,
  .checklist-grid,
  .ops-grid,
  .security-grid,
  .model-grid,
  .channel-grid,
  .soul-config-grid,
  .soul-tips-grid,
  .soul-intro {
    grid-template-columns: 1fr;
  }
}
</style>