export const secondaryDevelopmentStats = [
  {
    label: '第一条主线',
    value: 'Skills',
    note: '适合把特定任务流程、提示词约束和可复用脚本打包成能力包。',
  },
  {
    label: '第二条主线',
    value: 'Plugins',
    note: '适合接入新渠道、注册新工具、扩展 Gateway 运行时能力。',
  },
  {
    label: '第三条主线',
    value: 'Hooks',
    note: '适合做事件触发、命令触发和和外部系统的轻量联动。',
  },
  {
    label: '第四条主线',
    value: 'ClawHub',
    note: '适合分发、版本化和复用公开技能包。',
  },
]

export const secondaryDevelopmentSignals = [
  {
    label: '专题定位',
    value: '给准备做二次开发的人一张结构图',
    note: '先分清该写 skill、写 plugin，还是只接 webhook，再决定工程投入。',
  },
  {
    label: '资料来源',
    value: '以官方文档和官方仓库为主',
    note: '优先引用 OpenClaw 官方文档、主仓库和官方技能分发入口，而不是二手教程。',
  },
  {
    label: '推荐顺序',
    value: '先 skills，再 plugins，再事件和 HTTP',
    note: '多数团队一开始并不需要写完整插件，先把需求压缩到更轻的扩展方式通常更稳。',
  },
]

export const secondaryDevelopmentTracks = [
  {
    title: 'Skills 扩展',
    description: '当你要教模型完成某类固定任务、复用提示词规则，或把脚本和资源与任务绑定时，优先考虑 skills。',
    fit: '内容生产、资料整理、内部规范执行、轻量工作流',
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
    description: '当你要给 Gateway 增加真实运行能力，比如新渠道、模型适配、命令、工具或运行时配置时，应该走 plugin。',
    fit: '渠道接入、企业系统桥接、自定义命令、运行时扩展',
    output: '一个插件包，可从 npm 安装，也可从本地扩展目录安装调试',
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
    description: '当你不需要重写完整插件，只想把外部事件接进来，或者在某个命令、动作发生时触发自动流程，可以优先走 hook 和 HTTP route。',
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
    title: '先判断需求重量',
    description: '如果只是把任务打包给模型，先不要急着写 plugin；能用 skill 解决的，维护成本通常更低。',
  },
  {
    title: '再决定运行边界',
    description: '只有当你需要新工具、HTTP 路由、Hook 或 Gateway 级配置时，才进入 plugin 形态。',
  },
  {
    title: '最后考虑分发与团队复用',
    description: '公开技能优先考虑 ClawHub，团队内部共享则考虑工作区或本地 managed skills。',
  },
]

export const secondaryDevelopmentScenarios = [
  {
    title: '给企业内部知识助手做专用技能包',
    description: '把术语约束、输出模板、常用脚本和文档资源一起封装进 skill，适合客服、法务、售前、运营等团队。',
    path: '优先走 Skills',
  },
  {
    title: '把 OpenClaw 接进内部审批或工单系统',
    description: '通过 plugin 注册 HTTP 路由或 hook，让外部系统事件直接进入 Gateway，再由 agent 决定后续动作。',
    path: '优先走 Plugins / HTTP Routes',
  },
  {
    title: '增加新的渠道或第三方消息入口',
    description: '如果需要新的 IM、CRM、协作平台接入，这类通常已经超出 skill 范畴，应走插件层开发。',
    path: '优先走 Plugins',
  },
  {
    title: '给团队分发可复用的公开能力包',
    description: '当技能具备通用价值时，可以版本化并发布到 ClawHub，降低团队和社区复用门槛。',
    path: '优先走 ClawHub',
  },
]

export const secondaryDevelopmentSources = [
  {
    title: 'Skills',
    href: 'https://docs.openclaw.ai/skills',
    source: 'OpenClaw Docs',
    summary: '官方说明了 skills 的目录结构、加载位置、优先级，以及 workspace / 本地 / 内置 skills 的覆盖关系。',
  },
  {
    title: 'Creating Skills',
    href: 'https://docs.openclaw.ai/tools/creating-skills',
    source: 'OpenClaw Docs',
    summary: '官方给出了创建第一个 skill 的最小步骤，包括目录、`SKILL.md`、刷新与测试方式。',
  },
  {
    title: 'ClawHub',
    href: 'https://docs.openclaw.ai/tools/clawhub',
    source: 'OpenClaw Docs',
    summary: '官方把 ClawHub 定义为公开技能注册表，支持搜索、安装、更新和发布技能。',
  },
  {
    title: 'Plugins',
    href: 'https://docs.openclaw.ai/tools/plugin',
    source: 'OpenClaw Docs',
    summary: '插件文档说明了插件的安装方式、导出形式，以及如何在运行时注册 hook。',
  },
  {
    title: 'Plugin Agent Tools',
    href: 'https://docs.openclaw.ai/plugins/agent-tools',
    source: 'OpenClaw Docs',
    summary: '官方明确插件可以向 LLM 暴露 JSON Schema 形式的 agent tools，并通过 allowlist / denylist 管理可调用范围。',
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
    description: '如果你已经确定要写插件，先回到站内插件页看边界和分类。',
    to: '/tools/plugins',
    meta: 'Tools',
  },
  {
    title: '触发与自动化',
    description: '如果你更像是在接事件和回调，这一页更适合决定是 hook 还是自动化。',
    to: '/tools/triggers',
    meta: 'Flow',
  },
  {
    title: 'Skills',
    description: '如果你还在判断 skill 到底适不适合当前需求，先看这一页更稳。',
    to: '/skills',
    meta: 'Skills',
  },
  {
    title: '关键配置',
    description: '二次开发最终还是会落到运行时配置、权限、模型和环境变量上。',
    to: '/configurations',
    meta: 'Config',
  },
]
