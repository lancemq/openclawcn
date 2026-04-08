export type HermesSeriesPage = {
  slug: 'overview' | 'capabilities' | 'operations' | 'memory-and-skills' | 'automation-and-surfaces' | 'security'
  title: string
  to: string
  meta: string
  description: string
}

export const hermesSeriesPages: HermesSeriesPage[] = [
  {
    slug: 'overview',
    title: 'Hermes 总览',
    to: '/hermes-agent',
    meta: 'Overview',
    description: '先建立整体认知，再决定该从能力、运行、机制、入口还是安全继续往下读。',
  },
  {
    slug: 'capabilities',
    title: '能力地图',
    to: '/hermes-agent/capabilities',
    meta: 'Capabilities',
    description: '系统解释长期运行、记忆、执行、自动推进和多入口协作如何拼成 Hermes。',
  },
  {
    slug: 'operations',
    title: '运行与使用',
    to: '/hermes-agent/operations',
    meta: 'Operations',
    description: '理解 Hermes 的典型运行形态、使用入口和长期运行时最该关注什么。',
  },
  {
    slug: 'memory-and-skills',
    title: '记忆、技能与子 Agent',
    to: '/hermes-agent/memory-and-skills',
    meta: 'Memory',
    description: '解释 Hermes 为什么会随着运行时间变强，以及长期积累是如何形成的。',
  },
  {
    slug: 'automation-and-surfaces',
    title: '自动化、浏览器与入口',
    to: '/hermes-agent/automation-and-surfaces',
    meta: 'Surfaces',
    description: '理解 CLI、消息、浏览器和自动化任务如何让 Hermes 真正接触外部世界。',
  },
  {
    slug: 'security',
    title: '安全与边界',
    to: '/hermes-agent/security',
    meta: 'Security',
    description: '把长期运行 agent 的权限、执行面和风险判断放回同一套边界框架里。',
  },
]

export const hermesHeroSignals = [
  {
    label: '页面定位',
    value: 'Hermes Agent 中文专题中心',
    note: '它不再只是一个总览页，而是一组有中心页、有深读分页的中文专题结构。',
  },
  {
    label: '最适合谁看',
    value: '已经理解 OpenClaw 基础的用户',
    note: '如果你已经知道 agent、工具和长期运行的基本概念，这组页面适合继续把 Hermes 看深一层。',
  },
  {
    label: '最关键差异',
    value: '长期在线、持续积累、持续推进',
    note: 'Hermes 的真正差异不只是功能多，而是它被设计成一套长期工作的自治 agent 系统。',
  },
]

export const hermesOverviewComparisons = [
  {
    title: '不是普通聊天 Agent',
    description: '聊天 agent 更偏“当前这一轮回答得好不好”，Hermes 更偏“这套系统能不能长期接棒和推进”。',
    contrast: '重点从回复质量转向长期工作能力。',
  },
  {
    title: '不是一次性 Workflow 包装',
    description: 'Workflow 擅长把既定步骤连起来，Hermes 更强调在长期运行中记住上下文、调用技能并持续推进。',
    contrast: '重点从静态流程转向动态积累。',
  },
  {
    title: '不是单轮 Copilot',
    description: 'Copilot 往往服务当前界面和当前任务，Hermes 更像一个跨入口、跨时间持续工作的系统。',
    contrast: '重点从即时辅助转向长期自治。',
  },
]

export const hermesAudienceRoutes = [
  {
    title: '我先想理解 Hermes 为什么成立',
    description: '先去能力地图页，看长期运行、记忆、执行和自动推进是怎么拼成一个系统的。',
    to: '/hermes-agent/capabilities',
    meta: '建议先看',
  },
  {
    title: '我想知道 Hermes 真正怎么跑',
    description: '从运行与使用页进入，先理解它的运行形态、任务入口和长期运行方式。',
    to: '/hermes-agent/operations',
    meta: '使用承接',
  },
  {
    title: '我最关心它为什么会越来越强',
    description: '直接进入记忆、技能与子 Agent 页，看长期积累是如何形成的。',
    to: '/hermes-agent/memory-and-skills',
    meta: '核心差异',
  },
  {
    title: '我更关心它怎么接触真实世界',
    description: '如果你在意 CLI、浏览器、消息和自动化入口，去自动化、浏览器与入口页更合适。',
    to: '/hermes-agent/automation-and-surfaces',
    meta: '入口与动作',
  },
  {
    title: '我先想判断风险和边界',
    description: '长期在线且会行动的 agent，不该把安全当附录。先去安全与边界页更稳。',
    to: '/hermes-agent/security',
    meta: '风险优先',
  },
]

export const hermesCoreBeliefs = [
  {
    title: '长期运行',
    description: 'Hermes Agent 的默认语境不是“一次问答结束”，而是常驻在服务器上，持续接任务、持续处理状态。',
    kind: 'pulse' as const,
    tone: 'brand' as const,
  },
  {
    title: '记忆与成长',
    description: '它会保留学习到的内容、积累技能和历史上下文，让能力随着运行时间逐步变强，而不是每轮都从空白开始。',
    kind: 'orbit' as const,
    tone: 'accent' as const,
  },
  {
    title: '主动推进',
    description: 'Hermes 不只是回答问题，更适合持续推进任务、异步跟进和把工作往前拱，而不是停在单轮回复。',
    kind: 'flow' as const,
    tone: 'brand' as const,
  },
  {
    title: '多入口协作',
    description: 'CLI、Gateway、消息渠道、定时任务和浏览器能力共同构成它的工作面，不局限在一个聊天窗口里。',
    kind: 'stack' as const,
    tone: 'muted' as const,
  },
]

export const hermesCapabilityFlow = [
  {
    step: '01',
    title: '接收任务',
    description: '从 CLI、消息入口、自动化任务或外部触发接收新的工作请求。',
    detail: '它的入口不是单一界面，而是一个可长期接收任务的运行面。',
  },
  {
    step: '02',
    title: '记住上下文',
    description: '把历史对话、环境信息、已有技能和长期记忆沉淀下来，而不是每一轮都重新拼 prompt。',
    detail: '这让它更适合做连续工作，而不是一次性问答。',
  },
  {
    step: '03',
    title: '调用技能与工具',
    description: '在真实沙箱、浏览器和工具环境中完成动作，能力可以通过技能和配置逐步扩展。',
    detail: 'Hermes 的强点是“能做动作”，而不是只会生成文本。',
  },
  {
    step: '04',
    title: '并行或异步推进',
    description: '通过定时任务、子 agent 和长期运行机制，把工作从同步对话延展到可持续推进的状态。',
    detail: '这一步决定了它更像系统，而不是一次性助手。',
  },
  {
    step: '05',
    title: '持续回报结果',
    description: '在合适的入口里回传进度、结果和新的观察，让人类接手时不必从头理解发生了什么。',
    detail: '结果反馈是持续协作链路的一部分，不是最后补一句“已完成”。',
  },
]

export const hermesScenarios = [
  {
    title: '长期研究与资料跟踪',
    summary: '当你需要持续关注某个主题、定期更新结论并逐步积累可复用观察时，Hermes 比单轮问答更合适。',
    fit: '它能长期保存上下文、复用技能，并在后续回合里接着推进，而不是每次都从“重新解释背景”开始。',
    gap: '普通聊天 agent 往往更适合当次回答，不擅长把研究任务变成长期持续的工作面。',
  },
  {
    title: '自动巡检与定时处理',
    summary: '当任务需要定时检查状态、遇到异常再行动时，Hermes 的长期运行和自动化机制更能发挥价值。',
    fit: '它可以作为一个持续在线的值守层，在固定节奏里执行检查、处理和反馈。',
    gap: '单次 workflow 可以跑完一步，但不一定适合承担长期在线、持续接棒的职责。',
  },
  {
    title: '多入口消息驱动助手',
    summary: '当任务来自不同消息入口或协作界面时，Hermes 更像一个统一的接单与推进系统。',
    fit: 'CLI、消息、自动化和浏览器控制能被整理到同一个 agent 工作面里。',
    gap: '纯界面型助手常常只在自己的窗口里成立，跨入口协作能力较弱。',
  },
]

export const hermesResourceLinks = [
  {
    title: '我想先跑起来',
    description: '从 Quickstart 进入，先理解 Hermes 的基础安装、启动方式和最小可运行路径。',
    href: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart/',
    meta: 'Quickstart',
  },
  {
    title: '我想看核心能力',
    description: 'Features Overview 最适合用来核对 Hermes 的长期运行、记忆、技能、子 agent 和浏览器能力。',
    href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/overview',
    meta: 'Features',
  },
  {
    title: '我想确认安全边界',
    description: '在真的长期运行之前，先看 Security，理解权限、风险和运行边界会更稳。',
    href: 'https://hermes-agent.nousresearch.com/docs/user-guide/security/',
    meta: 'Security',
  },
  {
    title: '我想继续深入',
    description: '继续到官方首页和 GitHub，确认项目定位、更新节奏和更完整的文档入口。',
    href: 'https://hermes-agent.nousresearch.com/',
    meta: 'Official Site',
    secondaryHref: 'https://github.com/NousResearch/hermes-agent',
    secondaryLabel: 'GitHub',
  },
]

export const hermesFaqItems = [
  {
    question: 'Hermes 和普通聊天 agent 最大的区别是什么？',
    answer: '最核心的区别不在“会不会聊天”，而在它是否被设计成长期在线、持续积累并持续推进任务的系统。Hermes 更接近一个长期工作面，而不是一轮对话结束就退出的助手。',
  },
  {
    question: 'Hermes 更适合什么任务？',
    answer: '它更适合需要长期上下文、定时推进、多入口协作、异步反馈和持续记忆的任务，而不是只求一次回答的简单问答场景。',
  },
  {
    question: 'Hermes 是 workflow 工具，还是自治 agent？',
    answer: '更准确地说，它是一个自治 agent 系统。它可以包含 workflow 式动作，但官方定位并不只是“把步骤连起来”，而是长期运行、学习和持续推进。',
  },
  {
    question: '开始使用前最该先看什么？',
    answer: '如果你已经理解基础概念，最值得先看的是 Quickstart、Features Overview 和 Security。它们分别解决“怎么跑起来”“为什么成立”“长期运行时要注意什么”。',
  },
]

export const hermesInternalLinks = [
  {
    title: '工具系列',
    description: '如果你已经在判断长期运行、自动化和执行边界，继续到工具系列会更顺。',
    to: '/tools',
    meta: 'Tools',
  },
  {
    title: '二次开发',
    description: '如果你更关心技能、插件、Hooks 和扩展方式，下一步更适合看二次开发专题。',
    to: '/secondary-development',
    meta: '开发',
  },
  {
    title: '关键配置',
    description: '如果你已经开始思考运行位置、模型和配置边界，可以回到关键配置页继续看。',
    to: '/configurations',
    meta: 'Config',
  },
]

export const hermesCapabilityPillars = [
  {
    title: '长期在线运行面',
    summary: 'Hermes 不是只在你打开一个聊天窗口时才成立，而是被设计成可以持续驻留、持续接单和持续处理状态的 agent 系统。',
    items: ['长期在线而非临时唤起', '支持持续状态与任务推进', '更适合守护型和跟进型工作'],
  },
  {
    title: '记忆与上下文沉淀',
    summary: '长期运行的前提不是“会聊天”，而是能把已有上下文、历史知识和任务状态沉淀下来，避免每轮都从空白开始。',
    items: ['长期记忆不是附属功能', '历史上下文能转化成后续判断成本优势', '更适合连续任务和长期观察'],
  },
  {
    title: '真实执行与工具调用',
    summary: 'Hermes 的价值不止于描述下一步，而在于它可以通过沙箱、浏览器与技能体系真正去做动作。',
    items: ['真实环境中的动作能力', '技能让动作更可复用', '浏览器与工具让执行面更完整'],
  },
  {
    title: '自动推进与异步协作',
    summary: '如果 agent 只能同步回答，它更像高级搜索；Hermes 的差异在于它能把任务延展到异步和持续推进。',
    items: ['定时任务与自动触发', '子 agent 帮忙并行推进', '人类可以在中途接管而不是从头开始'],
  },
]

export const hermesCapabilitySections = [
  {
    title: '长期运行能力',
    description: 'Hermes 的第一能力不是某一个工具，而是能长期保持工作身份和任务连续性。',
    items: [
      {
        title: '常驻式而不是弹出式',
        body: '许多 agent 产品本质上依赖一次性会话，而 Hermes 更强调长期在线、长期接单和长期推进。',
      },
      {
        title: '持续状态比一次回应更重要',
        body: '它的价值常常来自状态连续，而不是某一轮回答特别漂亮。',
      },
      {
        title: '适合被当成工作系统而不是演示工具',
        body: '这使它更适合承担长期研究、巡检、值守和消息驱动的持续任务。',
      },
    ],
  },
  {
    title: '执行与行动能力',
    description: 'Hermes 的差异来自“能做动作”，而不是只会生成解释。',
    items: [
      {
        title: '技能把能力固定下来',
        body: '技能不是装饰层，而是把可复用能力、流程和知识沉淀成长期资产。',
      },
      {
        title: '工具与浏览器让它真正触碰外部世界',
        body: '浏览器控制、沙箱执行与多入口接入，共同构成一个真实的行动面。',
      },
      {
        title: '执行能力决定了它的自治价值',
        body: '如果没有真实动作能力，长期运行只会变成长期聊天；Hermes 的价值正是在这里拉开差距。',
      },
    ],
  },
  {
    title: '协作与系统能力',
    description: 'Hermes 更像一个长期工作的系统，因此入口、回报、子 agent 和自动推进都必须看成整体。',
    items: [
      {
        title: '多入口不是附加项',
        body: 'CLI、消息、定时触发和浏览器并不是平行功能，而是同一个 agent 工作面的不同接面。',
      },
      {
        title: '子 agent 让并行推进成立',
        body: '当任务需要拆分和并行时，子 agent 不是噱头，而是让复杂工作持续向前的一层结构。',
      },
      {
        title: '回报机制决定接管成本',
        body: '长期运行 agent 最大的问题之一是人类如何重新接手，Hermes 的回报和状态保留能力正是为此服务。',
      },
    ],
  },
]

export const hermesCapabilityConnections = [
  {
    title: '长期运行 + 记忆',
    detail: '没有记忆，长期运行只是一直在线；没有长期运行，记忆也难以形成真实价值。',
  },
  {
    title: '技能 + 执行面',
    detail: '技能把能力沉淀下来，执行面让这些沉淀能力真正作用在外部世界上。',
  },
  {
    title: '自动推进 + 回报',
    detail: '自动推进让任务持续前进，回报机制则保证人类在需要时能重新理解局面。',
  },
]

export const hermesOperationsModes = [
  {
    title: '快速启动模式',
    summary: '适合第一次接触 Hermes 的用户，目标是先看到它跑起来，而不是立刻把所有能力全开。',
    signals: ['先跑最小链路', '先理解入口', '先验证任务接收与结果回报'],
  },
  {
    title: '长期在线模式',
    summary: '适合把 Hermes 当作持续工作系统来使用，重点不再是“能不能运行”，而是“是否能稳定接棒”。',
    signals: ['关注持续状态', '关注定时与消息入口', '关注日志和回报机制'],
  },
  {
    title: '协作接管模式',
    summary: '适合团队或高价值任务，重点是让人类知道什么时候介入、在哪里介入、如何低成本接管。',
    signals: ['回报清晰', '边界明确', '高风险动作可控'],
  },
]

export const hermesOperationEntryChoices = [
  {
    title: 'CLI 入口',
    fit: '适合需要明确输入、快速试验、结构化验证的场景。',
    why: 'CLI 是最快理解 Hermes 工作节奏的入口，因为你能直接观察任务如何进入、如何被推进。',
  },
  {
    title: '消息与对话入口',
    fit: '适合把 Hermes 接到真实沟通流和外部协作面上。',
    why: '消息入口更像真实工作入口，而不是测试界面，能更早暴露长期运行场景下的问题。',
  },
  {
    title: '自动化与定时入口',
    fit: '适合值守、巡检、长期观察和定期处理型任务。',
    why: '这类入口最能体现 Hermes 的持续推进价值，但也最容易把边界和风险放大。',
  },
]

export const hermesOperationsMistakes = [
  {
    title: '把 Hermes 当成更花哨的聊天机器人',
    detail: '这样会错过它最重要的长期运行和持续推进价值，也会误判它哪些地方值得配置。',
  },
  {
    title: '一开始就把入口和能力全部打开',
    detail: '长期在线 agent 的复杂度会层层叠加，先跑通最小链路比一口气全装更稳。',
  },
  {
    title: '只关心能不能启动，不关心如何接管',
    detail: '长期运行系统真正难的是如何接手、如何审计、如何知道它刚刚做了什么。',
  },
]

export const hermesMemoryPillars = [
  {
    title: '记忆不是聊天历史的别名',
    description: 'Hermes 的记忆价值不在“保存更多文字”，而在于把长期工作中真正重要的事实、经验和状态沉淀下来。',
  },
  {
    title: '技能让积累可复用',
    description: '没有技能，许多能力只能停留在某一次成功；技能把这些能力从偶然发挥变成稳定资产。',
  },
  {
    title: '子 Agent 让复杂任务可拆分',
    description: '当工作开始变复杂，子 agent 不只是提速工具，而是让分工与并行变得真实可管理。',
  },
  {
    title: '三者一起形成长期复利',
    description: '记忆提供连续性，技能提供复用性，子 agent 提供扩展性，这三者共同构成 Hermes 的长期成长逻辑。',
  },
]

export const hermesMemoryLoops = [
  {
    step: 'Observe',
    title: '观察并记录',
    detail: '任务过程中的信息不会只停留在当前窗口，而是开始形成可以被后续工作复用的上下文资产。',
  },
  {
    step: 'Package',
    title: '沉淀为技能',
    detail: '重复出现的任务模式和解决方式，才真正值得被做成技能，而不是永远依赖临场发挥。',
  },
  {
    step: 'Delegate',
    title: '交给子 Agent',
    detail: '当任务可以拆解并行时，子 agent 让复杂工作不再卡在单线程推进上。',
  },
  {
    step: 'Compound',
    title: '形成长期复利',
    detail: '下一次面对类似任务时，Hermes 不必重新学习全部背景，而是站在既有积累上继续推进。',
  },
]

export const hermesMemoryFitTasks = [
  {
    title: '长期研究',
    description: '需要长期记录观察、迭代结论和回看历史上下文的任务，最能体现记忆与技能的价值。',
  },
  {
    title: '重复但逐渐复杂的工作流',
    description: '当某类任务反复出现，并且每次都在前一次基础上增加复杂度时，沉淀技能和复用历史尤其有价值。',
  },
  {
    title: '需要拆分与并行推进的任务',
    description: '当工作开始需要多个视角或多个子任务并行推进时，子 agent 会明显改变效率和结构。',
  },
]

export const hermesMemoryOverkill = [
  {
    title: '一次性问答',
    description: '如果任务只需要单次回答，开启完整的长期积累能力往往收益不高。',
  },
  {
    title: '没有复用价值的零碎动作',
    description: '如果任务既不连续，也不值得沉淀成技能，那么长期记忆与子 agent 都容易开得太重。',
  },
]

export const hermesSurfaces = [
  {
    title: 'CLI 与交互式入口',
    description: '最适合实验、验证和快速观察 Hermes 的工作节奏。',
  },
  {
    title: '消息与外部入口',
    description: '把 Hermes 接进真实沟通流和任务流之后，才真正能看到它的长期协作价值。',
  },
  {
    title: '浏览器控制',
    description: '浏览器能力让 Hermes 可以进入网页与表单世界，而不只是停留在文字层面。',
  },
  {
    title: '自动化与定时任务',
    description: '定时和自动触发能力，把 Hermes 从被动响应型助手推进到持续值守型系统。',
  },
]

export const hermesSurfacePatterns = [
  {
    title: '入口越多，越需要统一状态',
    detail: '多入口不是单纯增加便利，而是放大状态管理、权限边界和任务连续性的要求。',
  },
  {
    title: '浏览器能力会改变任务类型',
    detail: '一旦 agent 能真正看网页、操作界面，很多任务就从“解释问题”转向“直接处理问题”。',
  },
  {
    title: '自动化让边界比功能更重要',
    detail: '当 Hermes 能被自动唤起和持续运行时，最重要的常常不再是它会什么，而是它该不该做什么。',
  },
]

export const hermesSecurityRisks = [
  {
    title: '长期在线放大了错误的持续时间',
    description: '普通聊天 agent 的错误常常止于当前会话，但长期在线系统的错误可能持续累积。',
  },
  {
    title: '真实执行面放大了外部影响',
    description: '一旦 agent 可以调用工具、浏览器和自动化任务，风险就从“说错”变成“做错”。',
  },
  {
    title: '多入口会放大控制面复杂度',
    description: 'CLI、消息、浏览器和自动化入口一起存在时，真正的风险来自边界是否统一。',
  },
  {
    title: '自动推进要求更强的人类接管设计',
    description: '一个能持续推进任务的系统，必须同时设计好暂停、审查、接手和回滚路径。',
  },
]

export const hermesSecurityLadder = [
  {
    step: '01',
    title: '先跑最小执行面',
    detail: '先在最小权限和最小入口下运行 Hermes，再逐步增加入口、浏览器和自动化能力。',
  },
  {
    step: '02',
    title: '再开放长期运行能力',
    detail: '只有当日志、回报和人类接手路径都清楚时，长期运行才值得打开。',
  },
  {
    step: '03',
    title: '最后再开放高风险自动化',
    detail: '浏览器、外部写入和自动触发这类能力，不该作为默认起手式。',
  },
]

export const hermesSecurityLinks = [
  {
    title: '官方 Security',
    description: '先看官方安全页，理解 Hermes 长期运行时最核心的风险面。',
    href: 'https://hermes-agent.nousresearch.com/docs/user-guide/security/',
  },
  {
    title: 'Quickstart',
    description: '回到 Quickstart 重新核对你当前启用的运行方式和入口。',
    href: 'https://hermes-agent.nousresearch.com/docs/getting-started/quickstart/',
  },
  {
    title: 'Features Overview',
    description: '如果你还没搞清自己启用了哪些能力，先回功能总览页再判断风险更稳。',
    href: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/overview',
  },
]

export function getHermesPage(slug: HermesSeriesPage['slug']) {
  return hermesSeriesPages.find(item => item.slug === slug)
}

export function getHermesRelatedPages(currentSlug: HermesSeriesPage['slug']) {
  return hermesSeriesPages.filter(item => item.slug !== currentSlug)
}
