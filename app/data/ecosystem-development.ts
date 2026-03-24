export const secondaryDevelopmentStats = [
  {
    label: '核心方向',
    value: 'Skills',
    note: '围绕任务流程、提示词规则和可复用脚本构建能力包。',
  },
  {
    label: '核心方向',
    value: 'Plugins',
    note: '面向渠道接入、工具注册和 Gateway 运行时扩展。',
  },
  {
    label: '核心方向',
    value: 'Hooks',
    note: '用于事件触发以及和外部系统的轻量联动。',
  },
  {
    label: '生态入口',
    value: 'ClawHub',
    note: '适合公开分发、版本管理和复用技能能力。',
  },
]

export const secondaryDevelopmentSignals = [
  {
    label: '页面定位',
    value: 'OpenClaw 二次开发资料索引',
    note: '围绕 Skills、Plugins、Hooks、HTTP Routes 和 ClawHub 汇总常见开发方向。',
  },
  {
    label: '资料来源',
    value: '以官方文档与官方入口为主',
    note: '优先整理 OpenClaw 官方文档与官方分发入口中的公开资料。',
  },
  {
    label: '内容覆盖',
    value: '开发形态、场景示例、资料索引',
    note: '覆盖扩展类型、常见场景和官方资料入口。',
  },
]

export const secondaryDevelopmentTracks = [
  {
    title: 'Skills 扩展',
    description: '适合封装提示词规则、脚本、资源文件和操作说明，形成可复用能力包。',
    fit: '内容生产、资料整理、规范执行、轻量工作流',
    output: '一个目录 + `SKILL.md` + 可选脚本与资源',
    links: [
      {
        label: 'Skills 总览',
        href: 'https://docs.openclaw.ai/skills',
      },
      {
        label: '创建 Skills',
        href: 'https://docs.openclaw.ai/tools/creating-skills',
      },
      {
        label: 'ClawHub',
        href: 'https://docs.openclaw.ai/tools/clawhub',
      },
    ],
  },
  {
    title: 'Plugins 扩展',
    description: '适合为 Gateway 增加渠道接入、工具能力和运行时扩展。',
    fit: '渠道接入、企业系统桥接、自定义命令、运行时扩展',
    output: '一个插件包，可从 npm 安装，也可从本地扩展目录调试',
    links: [
      {
        label: 'Plugins 文档',
        href: 'https://docs.openclaw.ai/tools/plugin',
      },
      {
        label: 'Plugin Agent Tools',
        href: 'https://docs.openclaw.ai/plugins/agent-tools',
      },
      {
        label: 'Plugin HTTP Routes',
        href: 'https://docs.openclaw.ai/plugin',
      },
    ],
  },
  {
    title: 'Hooks / Webhooks 联动',
    description: '适合连接外部事件、回调通知和轻量自动流程，让系统与表单、审批、工单等服务联动。',
    fit: '审批回调、表单通知、GitHub 事件、内部系统回调',
    output: '插件中的 Hook 注册，或带鉴权的 HTTP 入口',
    links: [
      {
        label: 'Plugins 文档',
        href: 'https://docs.openclaw.ai/tools/plugin',
      },
      {
        label: 'Plugin HTTP Routes',
        href: 'https://docs.openclaw.ai/plugin',
      },
      {
        label: '站内触发机制',
        to: '/tools/triggers',
      },
    ],
  },
]

export const secondaryDevelopmentReadingPath = [
  {
    title: '明确扩展目标',
    description: '先确定是任务封装、能力接入、事件联动还是公开分发，再选择对应开发形态。',
  },
  {
    title: '确认运行边界',
    description: '涉及新工具、HTTP 路由、Hook 或 Gateway 级配置时，再进入插件层开发。',
  },
  {
    title: '考虑分发与复用',
    description: '对外公开的技能可进入 ClawHub，团队内部共享更适合工作区或本地托管。',
  },
]

export const secondaryDevelopmentScenarios = [
  {
    title: '给企业内部知识助手做专用技能包',
    description: '将术语规则、输出模板、常用脚本和文档资源封装进技能包，方便客服、法务、售前、运营等团队复用。',
    path: 'Skills',
  },
  {
    title: '把 OpenClaw 接进内部审批或工单系统',
    description: '通过插件注册 HTTP 路由或 Hook，让审批、工单、表单等事件进入 Gateway。',
    path: 'Plugins / HTTP Routes',
  },
  {
    title: '增加新的渠道或第三方消息入口',
    description: '新增 IM、CRM 或协作平台入口时，通常需要通过插件扩展渠道层能力。',
    path: 'Plugins',
  },
  {
    title: '给团队分发可复用的公开能力包',
    description: '当技能具备通用价值时，可以版本化并发布到 ClawHub，降低团队和社区复用门槛。',
    path: 'ClawHub',
  },
]

export const secondaryDevelopmentSources = [
  {
    title: 'Skills',
    href: 'https://docs.openclaw.ai/skills',
    source: 'OpenClaw Docs',
    summary: '官方说明 skills 的目录结构、加载位置、优先级，以及 workspace / 本地 / 内置 skills 的覆盖关系。',
  },
  {
    title: 'Creating Skills',
    href: 'https://docs.openclaw.ai/tools/creating-skills',
    source: 'OpenClaw Docs',
    summary: '官方给出创建第一个 skill 的最小步骤，包括目录、`SKILL.md`、刷新与测试方式。',
  },
  {
    title: 'ClawHub',
    href: 'https://docs.openclaw.ai/tools/clawhub',
    source: 'OpenClaw Docs',
    summary: '官方将 ClawHub 定义为公开技能注册表，支持搜索、安装、更新和发布技能。',
  },
  {
    title: 'Plugins',
    href: 'https://docs.openclaw.ai/tools/plugin',
    source: 'OpenClaw Docs',
    summary: '插件文档说明插件的安装方式、导出形式，以及如何在运行时注册 hook。',
  },
  {
    title: 'Plugin Agent Tools',
    href: 'https://docs.openclaw.ai/plugins/agent-tools',
    source: 'OpenClaw Docs',
    summary: '官方说明插件可向 LLM 暴露 JSON Schema 形式的 agent tools，并通过 allowlist / denylist 管理可调用范围。',
  },
  {
    title: 'Plugin HTTP Routes',
    href: 'https://docs.openclaw.ai/plugin',
    source: 'OpenClaw Docs',
    summary: '官方给出了 `api.registerHttpRoute(...)` 的注册方式，适合做 webhook、回调入口和外部系统接入。',
  },
]

export const secondaryDevelopmentCrossLinks = [
  {
    title: '插件系统',
    description: '查看插件分类、运行边界和扩展方式。',
    to: '/tools/plugins',
    meta: 'Tools',
  },
  {
    title: '触发与自动化',
    description: '查看事件触发、回调处理与自动化编排相关内容。',
    to: '/tools/triggers',
    meta: 'Flow',
  },
  {
    title: 'Skills',
    description: '查看 Skills 的安装、使用和典型能力场景。',
    to: '/skills',
    meta: 'Skills',
  },
  {
    title: '关键配置',
    description: '查看运行时配置、权限、模型和环境变量相关说明。',
    to: '/configurations',
    meta: 'Config',
  },
]
