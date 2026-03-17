export type ToolLink = {
  title: string
  to: string
  meta?: string
}

export type ToolSection = {
  title: string
  eyebrow?: string
  description: string
  items: {
    title: string
    description: string
    detail?: string
  }[]
}

export type ToolChecklistItem = {
  title: string
  detail: string
}

export type ToolPageConfig = {
  slug: string
  title: string
  path: string
  heroTitle: string
  description: string
  eyebrow: string
  summary: string
  signals: {
    label: string
    value: string
    note: string
  }[]
  sections: ToolSection[]
  checklist: ToolChecklistItem[]
  related: ToolLink[]
}

export const toolSeriesSignals = [
  {
    label: '适合什么时候看',
    value: '把扩展能力整理成清晰层级',
    note: '不再把插件、触发、自动化、权限和排障混成一组平行概念，而是按“装能力、触发能力、长期运行、诊断边界”重新归位。',
  },
  {
    label: '你会少踩什么坑',
    value: '合并重复专题，保留清晰主线',
    note: 'Hooks / Webhooks 归并到“触发机制”，工具排障统一收口到“诊断与排障”，避免同一问题被拆成两套入口。',
  },
  {
    label: '更稳的起手式',
    value: '先边界，后扩展',
    note: '先理解执行边界和运行位置，再决定是否安装插件、接入事件触发或做长期自动化。',
  },
]

export const toolSeriesOverview = [
  {
    title: '执行边界',
    description: '先理解 Exec、审批和 sandbox 边界，知道系统能做到什么程度，以及什么动作不该轻易自动化。',
    to: '/tools/exec-and-approvals',
    meta: 'Risk',
  },
  {
    title: '插件系统',
    description: '深入理解插件安装、配置、启停、更新和回滚，区分插件与 Skills、Tools 的边界。',
    to: '/tools/plugins',
    meta: 'Plugins',
  },
  {
    title: '触发机制',
    description: '统一理解 Hooks、Webhooks、Mappings 与事件入口，不再把相近概念拆成两页重复解释。',
    to: '/tools/triggers',
    meta: 'Triggers',
  },
  {
    title: '自动化与定时任务',
    description: '掌握 Cron 定时任务、Heartbeat 心跳、会话管理和长期运行策略。',
    to: '/tools/automation',
    meta: 'Automation',
  },
  {
    title: '诊断与排障',
    description: '把“装了没生效、能调用但失败、环境不一致”统一纳入一套排障顺序。',
    to: '/tools/diagnostics',
    meta: 'Diagnostics',
  },
  {
    title: '组合方案',
    description: '按内容站、开发交付、运维巡检等场景给出可以直接照搬的工具栈。',
    to: '/tools/stacks',
    meta: 'Stacks',
  },
]

export const toolAudienceTracks = [
  {
    title: '刚进入扩展阶段',
    summary: '先看总入口和执行边界，再进入插件系统，目的是先分清风险层和能力层。',
    picks: ['/tools', '/tools/exec-and-approvals', '/tools/plugins'],
  },
  {
    title: '已经准备做流程触发',
    summary: '先看触发机制，再进入自动化任务。先分清事件入口和时间驱动，后面才不会把流程越配越乱。',
    picks: ['/tools/triggers', '/tools/automation'],
  },
  {
    title: '准备长期运行',
    summary: '把审批、日志、并发和诊断方法一起看，不要只盯着“能不能跑起来”。',
    picks: ['/tools/exec-and-approvals', '/tools/automation', '/tools/diagnostics'],
  },
]

export const toolRiskBands = [
  {
    title: '低风险阅读层',
    summary: '概念理解、列表查看、状态确认、只读诊断。',
    detail: '适合第一次接触工具层时先建立心智图，几乎不会破坏外部系统。',
  },
  {
    title: '中风险执行层',
    summary: '受控修改、结构化 patch、已知环境下的小范围动作。',
    detail: '需要你理解当前 workspace、审批规则和回滚方式，不能只看是否能执行成功。',
  },
  {
    title: '高风险自动化层',
    summary: '长期任务、外部系统写入、跨环境执行、多步工作流。',
    detail: '重点不再是“跑起来”，而是日志、失败处理、人工接管和升级后稳定性。',
  },
]

export const toolReadingPath = [
  { title: '先看执行边界', to: '/tools/exec-and-approvals', meta: 'Risk' },
  { title: '理解插件系统', to: '/tools/plugins', meta: 'Plugins' },
  { title: '掌握触发机制', to: '/tools/triggers', meta: 'Triggers' },
  { title: '配置自动化任务', to: '/tools/automation', meta: 'Automation' },
  { title: '学习诊断排障', to: '/tools/diagnostics', meta: 'Diagnostics' },
  { title: '参考组合方案', to: '/tools/stacks', meta: 'Stacks' },
]

export const toolPages: ToolPageConfig[] = [
  {
    slug: 'plugins',
    path: '/tools/plugins',
    title: '插件系统',
    heroTitle: '插件系统',
    description: '理解 OpenClaw 插件如何安装、启停、更新和回滚，并区分它和 Skills、Tools 的边界。',
    eyebrow: 'Plugins',
    summary: '插件解决的是“把新的代码能力装进系统”，而不是“把工作流写得更长”。如果你在扩展渠道、语音、记忆或 Gateway 内能力，这一层比 Skills 更关键。',
    signals: [
      {
        label: '最核心区别',
        value: '插件装能力，Skills 组织能力',
        note: '插件更接近系统级扩展，Skills 更接近任务打法和提示词层的能力包。',
      },
      {
        label: '典型场景',
        value: '渠道、语音、记忆、集成',
        note: '只要涉及 Gateway 里的真实运行代码，通常都更应该先看插件，而不是先找 skill。',
      },
      {
        label: '最稳起手式',
        value: '先 list，再装，再 enable',
        note: '先确认系统里已有能力，避免重复安装，也方便判断到底是“没装”还是“没启用”。',
      },
    ],
    sections: [
      {
        title: '边界判断',
        eyebrow: '什么时候该看插件',
        description: '下面这些情况优先看插件，而不是继续调 Skills 或只改配置。',
        items: [
          {
            title: '需要新命令或新工具接口',
            description: '如果目标是把新的执行能力真正注册进系统，插件是正式扩展入口。',
          },
          {
            title: '需要在 Gateway 内运行集成代码',
            description: '像语音、渠道桥接、第三方系统接入，通常都属于插件层。',
          },
          {
            title: '需要独立启停、升级和回滚',
            description: '插件比散落脚本更适合正式管理，也更容易做排障和变更控制。',
          },
        ],
      },
      {
        title: '最常用操作',
        eyebrow: 'CLI 节奏',
        description: '别一上来就 install。更稳的流程是先盘点，再装，再确认启停。',
        items: [
          {
            title: '盘点当前插件面',
            description: '`openclaw plugins list` 和 `info` 先确认当前系统到底有哪些插件、是否启用、配置挂在哪里。',
          },
          {
            title: '按来源安装',
            description: '支持 npm 包和本地目录。生产环境更该先看来源可信度和维护频率。',
          },
          {
            title: '显式启用、停用和更新',
            description: '启停和更新比重装更适合作为日常操作，也更利于回滚。',
          },
        ],
      },
      {
        title: '配置挂载位置',
        eyebrow: '别把所有配置都塞一处',
        description: '插件相关配置不一定都写在同一个键下面，这也是最常见的踩坑点之一。',
        items: [
          {
            title: '`plugins.entries.<id>.config`',
            description: '通用插件配置入口，适合插件自己的参数。',
          },
          {
            title: '`channels.<channelId>`',
            description: '渠道型插件经常把配置挂在 channels 下，而不是 plugins.entries 里。',
          },
          {
            title: '`plugins.slots.memory`',
            description: '记忆相关插件会直接影响核心记忆槽位，这类插件要特别注意运行位置和升级策略。',
          },
        ],
      },
    ],
    checklist: [
      { title: '先确认来源', detail: '看维护者、文档和最近更新，不要只因为名字熟就安装。' },
      { title: '先在测试环境启用', detail: '插件是代码，不只是文本规则，风险高于普通 skills。' },
      { title: '记录配置位置', detail: '后续排障最常见的问题不是没装，而是配错层。' },
      { title: '保留停用和回滚路径', detail: '长期运行前必须知道怎么 disable、怎么回到上一个稳定状态。' },
    ],
    related: [
      { title: '工具系列总入口', to: '/tools', meta: '总览' },
      { title: 'Skills 与扩展能力', to: '/skills', meta: '相关但不同层' },
      { title: '关键配置', to: '/configurations', meta: '配置落点' },
      { title: '插件文档', to: '/docs/manual/plugins-overview', meta: '文档' },
    ],
  },
  {
    slug: 'exec-and-approvals',
    path: '/tools/exec-and-approvals',
    title: 'Exec、apply_patch 与审批',
    heroTitle: 'Exec、apply_patch 与审批',
    description: '理解 OpenClaw 的高权限工具、审批机制和 sandbox 边界，知道哪些动作该谨慎自动化。',
    eyebrow: 'Risk Boundaries',
    summary: '如果说插件决定“系统能装进什么能力”，那 Exec 这一层决定“模型在当前环境里到底能做多大动作”。这不是配置细节，而是风险边界。',
    signals: [
      {
        label: '最关键问题',
        value: '不是能不能执行，而是该不该执行',
        note: '高权限工具最常见的误区，是把一次执行成功误判成长期适合自动化。',
      },
      {
        label: '推荐顺序',
        value: '先读，再小改，再高权限',
        note: '先确认信息，再做结构化的小范围修改，最后才考虑跨环境或外部系统写操作。',
      },
      {
        label: '核心硬边界',
        value: '审批 + Sandbox',
        note: 'system prompt 只是约束，真正的硬边界来自审批策略和运行隔离。',
      },
    ],
    sections: [
      {
        title: '能力分层',
        eyebrow: '两类核心工具',
        description: '把 `exec` 和 `apply_patch` 分开理解，会比把它们都看成“执行命令”更稳。',
        items: [
          {
            title: '`exec`',
            description: '更接近通用执行能力，可以读文件、跑命令、观察环境，也因此风险上限最高。',
          },
          {
            title: '`apply_patch`',
            description: '适合结构化、小范围、可审查的文件修改，比任意写文件更容易控制和复核。',
          },
          {
            title: '审批策略',
            description: '决定哪些动作可以自动执行，哪些必须经用户确认，是所有高权限行为的真正闸门。',
          },
        ],
      },
      {
        title: '风险矩阵',
        eyebrow: '什么该自动，什么不该',
        description: '并不是所有“能做”的动作都应该交给长期自动化去做。',
        items: [
          {
            title: '低风险',
            description: '查看状态、只读检查、列清单、生成 diff 建议。',
          },
          {
            title: '中风险',
            description: '小范围 patch、固定目录内修改、可回滚的脚本执行。',
          },
          {
            title: '高风险',
            description: '批量写外部系统、跨机器执行、不可逆删除、无监控的多步骤链路。',
          },
        ],
      },
      {
        title: '运行边界',
        eyebrow: '为什么 sandbox 不是“麻烦设置”',
        description: '高权限工具最容易被低估的，不是调用本身，而是运行位置和隔离范围。',
        items: [
          {
            title: 'workspace 边界',
            description: '先判断当前工具操作的是哪个目录、哪些文件，以及是否会碰到用户未预期的区域。',
          },
          {
            title: '远程和本地差异',
            description: '本地能跑不代表 Gateway 主机上也能跑。环境差异和依赖差异经常是根因。',
          },
          {
            title: '审批拒绝后的行为',
            description: '需要提前设计未获批准时的降级路径，而不是把整个流程卡死在某一步。',
          },
        ],
      },
    ],
    checklist: [
      { title: '先做只读确认', detail: '先确定目标文件、目标环境、命令影响范围，再进入写操作。' },
      { title: '优先结构化修改', detail: '能用 apply_patch 的场景，不要直接走更大范围的任意写入。' },
      { title: '高风险动作必须可回滚', detail: '至少知道失败后怎么停、怎么恢复、怎么补救。' },
      { title: '长期运行前看审批与日志', detail: '没有审批边界和日志回看，就不要把动作放进自动化。' },
    ],
    related: [
      { title: '工具系列总入口', to: '/tools', meta: '总览' },
      { title: '关键配置', to: '/configurations', meta: 'sandbox / config' },
      { title: '工具文档', to: '/docs/manual/exec-tools-and-approvals', meta: '文档' },
      { title: '诊断与排障', to: '/tools/diagnostics', meta: '下一步' },
    ],
  },
  {
    slug: 'automation',
    path: '/tools/automation',
    title: '自动化与定时任务',
    heroTitle: '自动化与定时任务',
    description: '围绕 cron、heartbeat、会话保留、日志和并发控制，理解 OpenClaw 的长期自动化能力。',
    eyebrow: 'Automation',
    summary: '从被动响应进入主动运行阶段后，真正重要的就不是“能不能自动跑”，而是运行节奏、日志、失败处理、会话隔离和人工接管。',
    signals: [
      {
        label: '最常见问题',
        value: '自动化跑一次不等于能长期跑',
        note: '长期任务的成本通常出在观察和维护，不出在第一次配置。',
      },
      {
        label: '两种核心机制',
        value: 'cron + heartbeat',
        note: '一个偏时间驱动，一个偏主动唤醒；前者像定时任务，后者更像固定节奏的助手回访。',
      },
      {
        label: '最关键配套',
        value: '日志、并发、保留策略',
        note: '没有 run log、session retention 和并发限制，任务越多越容易把系统拖乱。',
      },
    ],
    sections: [
      {
        title: '时间驱动能力',
        eyebrow: '从时间开始，而不是从复杂业务开始',
        description: '更稳的自动化起点，通常是节奏稳定、影响范围可控的任务。',
        items: [
          {
            title: 'Cron jobs',
            description: '适合日报、巡检、内容抓取、发布前检查等固定频率任务。',
          },
          {
            title: 'Heartbeat',
            description: '适合让 agent 按固定节奏主动来找你，做汇报、提醒或轻量状态总结。',
          },
          {
            title: 'Session retention',
            description: '长期任务必须考虑上下文是否保留、保留多久、会不会污染后续会话。',
          },
        ],
      },
      {
        title: '运行稳定性',
        eyebrow: '自动化不是一次性脚本',
        description: '真正的长期价值，来自你能不能长期看懂、控制和修复这些任务。',
        items: [
          {
            title: '并发控制',
            description: '`maxConcurrentRuns` 控制系统同时跑多少任务，防止高峰期把环境压乱。',
          },
          {
            title: '日志管理',
            description: '`runLog` 决定你事后还能不能还原现场，排障时价值远高于临时打印几行信息。',
          },
          {
            title: '失败处理',
            description: '需要提前定义跳过、重试、告警还是人工接管，不能把失败当成“以后再说”。',
          },
        ],
      },
      {
        title: '适合先做的场景',
        eyebrow: '优先低耦合任务',
        description: '第一批自动化最好选那些收益明显、输入输出固定、依赖较少的流程。',
        items: [
          {
            title: '站点健康检查',
            description: '定期确认服务在线、关键接口可达、状态是否异常，收益高且易观察。',
          },
          {
            title: '内容汇总与简报',
            description: '日报、周报、更新摘要一类任务，天然适合固定节奏运行。',
          },
          {
            title: '发布前 checklist',
            description: '把容易遗漏的检查做成固定节奏的复核，比一上来就接复杂写操作更稳。',
          },
        ],
      },
    ],
    checklist: [
      { title: '先跑测试环境', detail: '先观察一段时间，再把任务升级到长期主环境。' },
      { title: '限制并发和范围', detail: '别让多条任务同时写同一批资源，也别让任务一次做太多事。' },
      { title: '保留日志与告警入口', detail: '至少要能知道什么时候失败、失败在哪一步、谁来接手。' },
      { title: '定期复查任务价值', detail: '自动化越多，越需要淘汰那些已经不再值得长期维护的流程。' },
    ],
    related: [
      { title: '工具系列总入口', to: '/tools', meta: '总览' },
      { title: '触发机制', to: '/tools/triggers', meta: '事件触发' },
      { title: '自动化实践', to: '/best-practices/automation-workflows', meta: '实践' },
      { title: '关键配置', to: '/configurations', meta: 'cron / heartbeat' },
    ],
  },
  {
    slug: 'stacks',
    path: '/tools/stacks',
    title: '工具组合方案',
    heroTitle: '工具组合方案',
    description: '按内容站、开发交付、运维巡检、个人工作台和团队协作等场景，给出可直接套用的 OpenClaw 工具栈。',
    eyebrow: 'Stacks',
    summary: '单个插件、单个 hook、单个 skill 都只是零件。真正有价值的是一组能长期运转的组合，而且每种组合的优先级和风险边界都不一样。',
    signals: [
      {
        label: '这一页适合谁',
        value: '已经知道自己在做什么事的人',
        note: '如果你已经明确是内容运营、开发交付还是运维巡检，这一页能直接帮你抄一套更稳的组合。',
      },
      {
        label: '最重要原则',
        value: '先组闭环，再加花样',
        note: '先让一条工作链从输入到输出完整可见，再决定要不要扩更多能力。',
      },
      {
        label: '推荐做法',
        value: '每个场景只先做一套主栈',
        note: '不要同时启动多种风格的自动化栈，否则很难判断到底是哪一层出了问题。',
      },
    ],
    sections: [
      {
        title: '内容站维护栈',
        eyebrow: '内容和知识沉淀',
        description: '适合文档站、资讯站、知识库维护者，把研究、写作、发布和定时检查接起来。',
        items: [
          {
            title: 'Research + Docs + Release Notes',
            description: '先把资料整理、中文写作和更新摘要接成一个轻量闭环。',
          },
          {
            title: '定时抓取和健康检查',
            description: '用 cron 跑固定节奏的抓取、状态确认和内容清点。',
          },
          {
            title: '反馈收口',
            description: '把表单、社区反馈或 webhook 输入接到同一条整理链路里。',
          },
        ],
      },
      {
        title: '开发交付栈',
        eyebrow: '代码与发布',
        description: '适合已经有代码仓库、测试和发布节奏的团队，目标是减少回归和发布失误。',
        items: [
          {
            title: 'Code Review + Test + Deploy Check',
            description: '把代码复核、测试提醒和发布前检查组合成固定节奏。',
          },
          {
            title: 'Exec + approvals',
            description: '高权限动作必须被审批和日志托住，不要把发布动作做成黑箱自动化。',
          },
          {
            title: '失败后人工接管',
            description: '发布类工作流天然需要人工兜底，不能完全交给单链路自动化。',
          },
        ],
      },
      {
        title: '运维巡检栈',
        eyebrow: '稳态运行',
        description: '适合长期在线服务，重点是状态观察、异常归纳、权限边界和慢慢扩大自动化范围。',
        items: [
          {
            title: 'Health + cron + sandbox',
            description: '先从只读健康检查和受控巡检开始，不要直接上高风险写动作。',
          },
          {
            title: 'Hooks / alerts',
            description: '把异常事件送进既有流里，而不是让运维系统完全独立。',
          },
          {
            title: '版本节奏管理',
            description: '任何长期运维栈都必须考虑升级节奏和兼容性回看。',
          },
        ],
      },
      {
        title: '个人工作台与团队协作栈',
        eyebrow: '高频但轻量',
        description: '适合收口日常消息、摘要、提醒和协作输入，优先追求稳定和低认知负担。',
        items: [
          {
            title: 'Briefing + Inbox + heartbeat',
            description: '先把每天高频但轻量的总结、提醒和分类接起来，形成固定节奏。',
          },
          {
            title: 'Channels + routing',
            description: '多入口协作时，先做清晰路由和身份边界，再谈复杂自动化。',
          },
          {
            title: '轻量记忆和归档',
            description: '适合做行动项整理、摘要沉淀和个人工作台，而不是一开始就追求“大而全”。',
          },
        ],
      },
    ],
    checklist: [
      { title: '先选一个主场景', detail: '内容、开发、运维、协作四类不要同时起步。' },
      { title: '先让输入和输出可见', detail: '任何组合都该先看得到入口、处理和结果，而不是隐藏在复杂配置里。' },
      { title: '每个组合都带风险说明', detail: '不同场景对审批、日志和人工接管的要求不同。' },
      { title: '保留精简空间', detail: '真正长期好用的工具栈，通常比你想象中更克制。' },
    ],
    related: [
      { title: '工具系列总入口', to: '/tools', meta: '总览' },
      { title: '热门技能', to: '/skills', meta: '能力包' },
      { title: '自动化与定时任务', to: '/tools/automation', meta: '长期运行' },
      { title: '自动化实践', to: '/best-practices/automation-workflows', meta: '实践' },
    ],
  },
]

export function getToolPageBySlug(slug: string) {
  return toolPages.find(page => page.slug === slug)
}
