export type HermesSeriesPage = {
  slug: 'overview' | 'capabilities' | 'operations' | 'memory-and-skills' | 'automation-and-surfaces' | 'security' | 'configuration' | 'skills' | 'subagents' | 'showcases' | 'monitoring'
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
  {
    slug: 'configuration',
    title: '配置与部署',
    to: '/hermes-agent/configuration',
    meta: 'Config',
    description: '模型配置、运行环境、权限设定和入口参数，帮助你在启动前理解 Hermes 的关键配置点。',
  },
  {
    slug: 'skills',
    title: '技能开发指南',
    to: '/hermes-agent/skills',
    meta: 'Skills',
    description: '如何编写、测试和发布自定义技能，把重复工作模式固化为可复用的 agent 能力。',
  },
  {
    slug: 'subagents',
    title: '子 Agent 编排',
    to: '/hermes-agent/subagents',
    meta: 'Subagents',
    description: '子 Agent 的分工模式、通信机制与编排策略，让复杂任务不再卡在单线程上。',
  },
  {
    slug: 'showcases',
    title: '实战案例',
    to: '/hermes-agent/showcases',
    meta: 'Showcases',
    description: '从研究跟踪到自动巡检的真实场景拆解，看 Hermes 在不同任务中的实际落地方式。',
  },
  {
    slug: 'monitoring',
    title: '性能与监控',
    to: '/hermes-agent/monitoring',
    meta: 'Monitoring',
    description: '日志、指标、状态观察和问题排查，确保长期运行的 Hermes 始终处于可观测状态。',
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

export const hermesOverviewFacts = [
  {
    label: '官方定位',
    value: '长期在线的自治 Agent',
    note: 'Hermes 官方表达的重点是 lives on your server、remembers、gets more capable the longer it runs。',
  },
  {
    label: '核心成长线',
    value: '记忆、技能、子 Agent',
    note: '它的长期价值不只来自模型本身，而是来自随着运行逐步形成的复用能力。',
  },
  {
    label: '关键执行面',
    value: '真实沙箱、浏览器、消息入口',
    note: '这让 Hermes 不只是会解释任务，而是能真正接触环境、执行动作和持续推进。',
  },
  {
    label: '使用门槛',
    value: '先理解工作方式，再看具体配置',
    note: '如果只盯着命令和安装，很容易把 Hermes 误解成更复杂的聊天壳。',
  },
]

export const hermesReadingSequence = [
  {
    step: '01',
    title: '先立住整体认知',
    detail: '先看总览页，知道 Hermes 在整组专题里是什么角色、和哪些 agent 形态不同。',
  },
  {
    step: '02',
    title: '再理解它为什么成立',
    detail: '能力地图页负责解释长期运行、记忆、执行和自动推进如何拼成系统。',
  },
  {
    step: '03',
    title: '然后决定你最关心哪一层',
    detail: '如果你在意运行方式，就去 operations；如果你在意成长机制，就去 memory-and-skills。',
  },
  {
    step: '04',
    title: '最后才进入入口与安全判断',
    detail: '入口、浏览器、自动化和安全边界更适合作为第二轮理解，而不是第一屏就把注意力打散。',
  },
]

export const hermesWhyItMatters = [
  {
    title: '把 Agent 从“会回答”推进到“会持续工作”',
    body: 'Hermes 真正重要的地方，不只是把模型装进一个更完整的界面，而是把 agent 变成一种能长期驻留、长期推进的工作结构。',
  },
  {
    title: '把偶然成功的操作变成可复用资产',
    body: '当工作开始被记忆、技能和子 agent 支撑时，Agent 的价值就不再只靠某一次 prompt 表现得好不好。',
  },
  {
    title: '把多入口、多时间尺度的任务收进同一个系统',
    body: '消息、CLI、浏览器和定时任务并不只是多个入口，它们共同构成一种更真实的工作面。',
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

export const hermesCapabilityArchitecture = [
  {
    layer: 'Identity Layer',
    title: '长期在线身份层',
    description: '先有“持续存在的 agent 身份”，后面才谈得上状态、记忆和长期协作。',
  },
  {
    layer: 'Memory Layer',
    title: '上下文与记忆层',
    description: '这一层决定 Hermes 能不能把过去工作的结果真正带进未来，而不是轮轮重置。',
  },
  {
    layer: 'Action Layer',
    title: '技能与执行层',
    description: '技能、工具、浏览器和沙箱共同构成真实动作面，让 Hermes 不止停留在解释。',
  },
  {
    layer: 'Coordination Layer',
    title: '自动推进与协作层',
    description: '子 Agent、自动化和结果回报让任务可以跨时间、跨入口、跨子任务持续前进。',
  },
]

export const hermesCapabilityFitMatrix = [
  {
    title: '最适合的任务',
    examples: ['长期跟踪型研究', '定时巡检与持续值守', '多入口协作任务', '需要累积知识的工作流'],
    note: '这些任务能显著放大长期运行、记忆和持续推进的收益。',
  },
  {
    title: '勉强能做但未必划算',
    examples: ['一次性问答', '零碎即时查询', '没有复用价值的临时动作'],
    note: '这类任务并不是做不了，而是 Hermes 的系统性优势不一定能被充分体现。',
  },
  {
    title: '容易被误配的场景',
    examples: ['把它当成更复杂聊天窗口', '把所有入口同时打开', '过早依赖高风险自动化'],
    note: '这些误配通常会让复杂度比收益涨得更快。',
  },
]

export const hermesCapabilityAntiPatterns = [
  {
    title: '只看 feature 数量，不看能力之间的关系',
    detail: 'Hermes 的强点不是“会很多件事”，而是这些能力能形成一个持续运转的系统。',
  },
  {
    title: '把记忆和技能当作锦上添花',
    detail: '如果把它们看成可有可无的外挂，就很难理解 Hermes 为什么适合长期运行。',
  },
  {
    title: '把自动推进理解成“自动点按钮”',
    detail: '真正的自动推进包含任务接续、状态延续和结果回报，而不是简单替你执行几个动作。',
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

export const hermesOperationPath = [
  {
    title: '先跑最小链路',
    description: '优先验证 Hermes 能不能稳定接收一个任务、完成一个动作、回报一个结果。',
  },
  {
    title: '再引入真实入口',
    description: '当你开始接消息、CLI 或浏览器入口时，Hermes 才真正进入真实工作场景。',
  },
  {
    title: '然后才考虑长期运行',
    description: '长期运行不是把进程挂久一点，而是让状态、日志、回报和接管路径都变得稳定。',
  },
  {
    title: '最后再加自动推进与高风险动作',
    description: '定时任务、浏览器控制、外部写入这类能力越后开，长期稳定性通常越好。',
  },
]

export const hermesOperationSignals = [
  {
    title: '状态可见',
    detail: '如果你说不清 Hermes 现在在处理什么、刚刚做了什么，就还不适合把它开得太自动。',
  },
  {
    title: '入口收敛',
    detail: '入口越多，越要先搞清每个入口分别负责什么，而不是全都接进来再慢慢猜。',
  },
  {
    title: '接管低成本',
    detail: '长期运行系统最怕“跑是跑着，但人接不上”，所以接管路径要和运行能力一起设计。',
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

export const hermesMemoryAssets = [
  {
    title: '上下文资产',
    description: '过去的观察、结论、偏好和任务状态会变成后续工作的起点，而不是散落在旧会话里的噪音。',
  },
  {
    title: '技能资产',
    description: '反复有效的方法和流程会逐渐从“偶然成功”转成可复用的长期能力。',
  },
  {
    title: '协作资产',
    description: '当子 Agent 分工模式逐渐稳定，复杂任务的拆分与接手成本都会下降。',
  },
]

export const hermesMemoryCollaboration = [
  {
    title: '人类不再每次都要重新解释背景',
    detail: '长期记忆最直接的价值之一，是让协作者接手时不必一次次从头补全部上下文。',
  },
  {
    title: '技能让团队习惯更容易被固化',
    detail: '一旦某些工作方式值得保留，技能就是把团队经验沉淀进 agent 的关键方式。',
  },
  {
    title: '子 Agent 让复杂工作从个人负担变成结构化分工',
    detail: '当任务能被拆解并行后，协作的成本不只下降，而且更容易被复盘和优化。',
  },
]

export const hermesMemoryWarnings = [
  {
    title: '不是所有历史都值得记住',
    description: '长期积累的关键在于筛选有价值的信息，而不是把所有过程都原样保留下来。',
  },
  {
    title: '不是所有重复动作都值得做成技能',
    description: '只有会持续复用、且能稳定提升结果质量的模式，才值得被编码成技能。',
  },
  {
    title: '不是所有复杂任务都该立刻拆成子 Agent',
    description: '拆得过细会增加协调负担，子 Agent 真正适合相对完整且可并行的子任务。',
  },
]

export const hermesSkillLifecycle = [
  {
    stage: 'Capture',
    title: '先观察重复模式',
    detail: '不是每个做过一次的动作都值得变成技能，只有反复出现、并且对结果有稳定影响的模式才值得沉淀。',
  },
  {
    stage: 'Encode',
    title: '再打包为可复用技能',
    detail: '技能的价值在于把经验从“这次刚好做对”变成“下次也更容易做对”。',
  },
  {
    stage: 'Refine',
    title: '在长期运行中继续修正',
    detail: '技能不是一经写完就永远稳定，而是会随着任务和上下文的变化继续被校正。',
  },
  {
    stage: 'Compose',
    title: '最后进入更大的工作组合',
    detail: '真正成熟的技能，最终会进入更复杂的多步骤或多 agent 协作，而不再只是单点招式。',
  },
]

export const hermesSubagentPatterns = [
  {
    title: '分探索与分执行',
    description: '主 agent 负责掌握全局，子 agent 去探索局部问题、并行收集信息或执行独立分支任务。',
  },
  {
    title: '按主题拆分而不是按句子拆分',
    description: '子 agent 更适合处理相对完整的子任务，而不是把一个简单问题硬拆成过多小碎片。',
  },
  {
    title: '子 Agent 的价值在并行与隔离',
    description: '它不只是为了更快，也为了让复杂任务的不同部分不互相污染上下文。',
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

export const hermesSurfaceMatrix = [
  {
    surface: 'CLI',
    bestFor: '验证、试验、明确输入输出',
    tradeoff: '进入门槛低，但更偏主动操作场景。',
  },
  {
    surface: '消息入口',
    bestFor: '真实协作、异步沟通、持续接单',
    tradeoff: '最贴近真实使用，但也更容易放大边界和状态管理问题。',
  },
  {
    surface: '浏览器',
    bestFor: '网页阅读、表单处理、跨站操作',
    tradeoff: '执行面更强，但风险和复杂度也明显上升。',
  },
  {
    surface: '自动化任务',
    bestFor: '定时巡检、重复跟进、长期观察',
    tradeoff: '最能体现持续推进价值，也最需要清楚的启停与回报设计。',
  },
]

export const hermesBrowserAndAutomationNotes = [
  {
    title: '浏览器不是“看网页的附加功能”',
    detail: '一旦浏览器进入工作流，Hermes 就能从解释页面内容转向直接处理网页任务，这会显著改变任务结构。',
  },
  {
    title: '自动化不是“节省点击”的别称',
    detail: '真正的自动化价值在于让 Hermes 能持续值守和持续推进，而不是简单代替几次手动操作。',
  },
  {
    title: '入口和自动化必须一起考虑回报机制',
    detail: '入口越真实、触发越自动，越需要让人类能够看见状态、理解进度并在必要时低成本接手。',
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

export const hermesSecurityChecklist = [
  {
    title: '先缩小入口，再扩大能力',
    detail: '不要一开始就同时开放消息、浏览器和自动化任务；先让最小入口稳定，再逐步放开。',
  },
  {
    title: '先能看见状态，再谈自治',
    detail: '如果没有清晰的日志、结果回报和接管路径，所谓长期自治只会增加排障和风险成本。',
  },
  {
    title: '高风险动作最后启用',
    detail: '任何外部写入、浏览器操作和自动触发都应该晚于基础运行验证，而不是反过来。',
  },
  {
    title: '把安全当作运行设计的一部分',
    detail: '对于长期在线的 agent，安全不该是最后一页文档，而应是运行方式的一部分。',
  },
]

// ── 配置与部署 ──

export const hermesConfigOverview = [
  {
    title: '模型配置',
    description: 'Hermes 的核心推理能力由底层模型驱动，配置模型端点、API Key 和参数是启动前最重要的步骤。',
  },
  {
    title: '运行环境',
    description: '沙箱、文件系统和网络权限决定了 Hermes 能在哪些环境中安全执行任务。',
  },
  {
    title: '权限体系',
    description: '工具权限、浏览器权限和自动化权限形成三层控制面，配置顺序影响长期运行的风险。',
  },
  {
    title: '入口参数',
    description: 'CLI、消息渠道和自动化触发各自需要独立的连接配置和认证方式。',
  },
]

export const hermesConfigSections = [
  {
    title: '模型接入配置',
    description: 'Hermes 支持多种模型后端，选择合适的模型和参数直接影响运行成本和任务质量。',
    items: [
      {
        title: 'API 端点与密钥',
        body: '配置模型服务的 base URL 和 API Key，确保 Hermes 能稳定访问推理服务。生产环境建议使用环境变量而非硬编码。',
      },
      {
        title: '模型选择策略',
        body: '不同任务对模型能力要求不同：复杂推理用更强模型，常规任务用轻量模型，通过路由配置可实现分层调度。',
      },
      {
        title: '上下文窗口与参数',
        body: 'max_tokens、temperature 和 top_p 等参数需要根据任务类型调整。长期运行场景下，上下文窗口大小直接影响记忆表现。',
      },
    ],
  },
  {
    title: '运行环境配置',
    description: 'Hermes 的执行环境决定了它能做什么、不能做什么，是最容易被忽略的配置层。',
    items: [
      {
        title: '沙箱隔离级别',
        body: '沙箱决定 Hermes 可以访问哪些文件系统和网络资源。开发阶段可以放宽，生产环境应严格限制。',
      },
      {
        title: '持久化存储',
        body: '记忆、技能和会话数据需要可靠的存储后端。默认使用本地文件系统，生产环境建议接入外部数据库或对象存储。',
      },
      {
        title: '网络访问策略',
        body: '浏览器能力和外部 API 调用依赖网络策略。建议使用白名单模式，而不是允许全部出站流量。',
      },
    ],
  },
  {
    title: '技能与工具注册',
    description: '技能是 Hermes 的能力扩展单元，配置方式和注册顺序会影响 agent 的行为优先级。',
    items: [
      {
        title: '内置技能管理',
        body: 'Hermes 附带一组内置技能，可以通过配置文件启用或禁用。建议只开启当前任务真正需要的技能，减少无关上下文干扰。',
      },
      {
        title: '自定义技能注册',
        body: '自定义技能通过定义清晰的输入输出接口注册到 Hermes。技能文件的位置、命名和元信息需要符合约定结构。',
      },
      {
        title: '工具权限范围',
        body: '每个技能可以声明它需要的权限（文件读写、网络请求、命令执行）。配置时应遵循最小权限原则。',
      },
    ],
  },
  {
    title: '入口与渠道配置',
    description: '多入口是 Hermes 的优势，但每个入口都需要独立的连接和安全配置。',
    items: [
      {
        title: 'CLI 接入配置',
        body: 'CLI 入口通常用于开发和调试场景，配置主要涉及启动参数、日志级别和交互模式。',
      },
      {
        title: '消息渠道接入',
        body: 'Slack、Discord 等消息渠道需要独立的 Bot Token 和 Webhook 配置。不同渠道的消息格式和权限模型各异。',
      },
      {
        title: '自动化触发器配置',
        body: '定时任务和事件触发需要在配置中声明 cron 表达式或监听条件，并指定触发后执行的任务入口。',
      },
    ],
  },
]

export const hermesConfigChecklist = [
  {
    title: 'API Key 已通过环境变量注入',
    detail: '确认所有密钥不硬编码在配置文件中，生产环境使用密钥管理服务或环境变量注入。',
  },
  {
    title: '沙箱权限已按最小原则设置',
    detail: '只开放当前任务确实需要的文件路径和网络资源，不使用的权限保持关闭。',
  },
  {
    title: '存储后端已确认可用且稳定',
    detail: '记忆和技能数据需要可靠存储，本地路径或外部存储的连接状态已在启动前验证。',
  },
  {
    title: '每类入口的认证配置已完成',
    detail: 'CLI、消息渠道和自动化的 Token/Webhook 已配置并通过连通性测试。',
  },
  {
    title: '技能列表已按需精简',
    detail: '只注册当前任务需要的技能，关闭不必要的内置技能以减少上下文噪声和权限面。',
  },
  {
    title: '日志级别已设为合适模式',
    detail: '开发阶段使用 debug 级别，生产环境建议 info 或 warn，避免日志量过大影响性能。',
  },
]

export const hermesConfigMistakes = [
  {
    title: '一启动就打开所有权限',
    detail: '在还不清楚 Hermes 需要哪些能力之前开放全部权限，是最常见的风险来源。应先跑通最小链路再逐步放开。',
  },
  {
    title: '把 API Key 写死在配置里',
    detail: '硬编码密钥不仅存在泄露风险，还会让环境切换（开发/测试/生产）变得繁琐且容易出错。',
  },
  {
    title: '忽略存储后端的可靠性',
    detail: '本地文件系统适合原型验证，但长期运行场景下一旦存储损坏，记忆和技能资产可能全部丢失。',
  },
  {
    title: '同时注册过多技能',
    detail: '技能太多会增加模型判断负担和上下文开销。建议保持技能清单精简，只保留当前任务线所需的技能。',
  },
]

// ── 技能开发指南 ──

export const hermesSkillsOverview = [
  {
    title: '技能是什么',
    description: '技能是 Hermes 的能力单元，把一组可复用的操作、知识和流程打包成 agent 可以直接调用的模块。',
  },
  {
    title: '技能为什么重要',
    description: '没有技能的 Hermes 每次面对类似任务都需要重新"临场发挥"；有了技能之后，成功模式可以被固定和复用。',
  },
  {
    title: '技能与工具的区别',
    description: '工具是单点动作（读文件、发请求），技能是封装了逻辑的完整能力单元（执行研究工作流、生成周报）。',
  },
  {
    title: '技能的运行方式',
    description: '技能在 Hermes 的沙箱中运行，可以访问已授权的文件、网络和工具资源，输出结果返回给主 agent。',
  },
]

export const hermesSkillTypes = [
  {
    title: '信息处理型',
    summary: '对输入信息进行分析、转换和结构化输出。',
    examples: ['文档摘要技能', '数据格式转换技能', '多语言翻译技能'],
    note: '这类技能的核心价值是降低重复劳动，适合输入输出模式相对固定的场景。',
  },
  {
    title: '研究工作流型',
    summary: '按固定步骤完成资料收集、整理和结论生成。',
    examples: ['竞品调研技能', '技术方案评估技能', '行业趋势跟踪技能'],
    note: '这类技能的价值来自把经验流程固化，让每次执行的结果质量更稳定。',
  },
  {
    title: '自动化操作型',
    summary: '在授权范围内执行具体动作并返回操作结果。',
    examples: ['定时巡检技能', '数据备份技能', '部署验证技能'],
    note: '这类技能需要最严格的权限声明，因为直接作用于外部环境的修改。',
  },
  {
    title: '协作编排型',
    summary: '协调多个子任务或子 agent 完成复杂工作。',
    examples: ['多源数据聚合技能', '跨步骤项目推进技能', '多 agent 协作调度技能'],
    note: '这类技能相当于"元技能"，用来管理其他技能的调用顺序和结果合并。',
  },
]

export const hermesSkillDevProcess = [
  {
    stage: '定义',
    title: '明确技能边界',
    detail: '先写清楚技能负责什么、不负责什么、输入输出格式。边界清晰的技能更容易测试和维护。',
  },
  {
    stage: '实现',
    title: '编写技能代码',
    detail: '按 Hermes 技能规范编写实现代码，声明需要的权限和资源。遵循单一职责原则，一个技能只做一件事。',
  },
  {
    stage: '测试',
    title: '在隔离环境中验证',
    detail: '在沙箱中单独测试技能的行为，确认输入输出符合预期，再在完整 Hermes 系统中集成。',
  },
  {
    stage: '注册',
    title: '注册并分配权限',
    detail: '将技能注册到 Hermes 配置中，分配最小必要的权限。注册后通过任务验证技能是否能被正确调用。',
  },
  {
    stage: '迭代',
    title: '根据使用反馈持续改进',
    detail: '技能不是一次写完就结束。在实际使用中观察它的调用频率、成功率和结果质量，持续优化。',
  },
]

export const hermesSkillBestPractices = [
  {
    title: '一个技能只做一件完整的事',
    detail: '技能应该封装一个可独立完成的任务单元，而不是把多个不相关的操作塞进同一个技能。',
  },
  {
    title: '声明必要的最小权限',
    detail: '明确声明技能需要的文件、网络和执行权限。权限声明既是为了安全，也是让调用者理解技能的边界。',
  },
  {
    title: '为技能编写清晰的描述',
    detail: 'Hermes 的模型通过技能描述来判断何时调用它。描述应该说明技能的功能、适用条件和输出格式。',
  },
  {
    title: '技能应该可重复且可预测',
    detail: '给定相同输入，技能应产生一致输出。避免在技能中引入随机性或依赖不可控的外部状态。',
  },
  {
    title: '记录技能的调用日志',
    detail: '每个技能调用都应该记录输入、输出、耗时和状态。这些日志是后续排查问题和优化技能的依据。',
  },
]

export const hermesSkillMistakes = [
  {
    title: '技能做得太大',
    detail: '一个技能试图做太多事，会导致边界模糊、难以测试、调用场景受限。保持技能聚焦。',
  },
  {
    title: '技能描述写得太模糊',
    detail: '如果 Hermes 看不懂技能什么时候该用，技能写了也等于没用。描述应该具体到触发条件。',
  },
  {
    title: '权限声明过于宽松',
    detail: '为图方便声明多余权限，一旦技能被滥用或误用，危害范围会被放大。',
  },
  {
    title: '技能写完不测试就上线',
    detail: '未经测试的技能在真实工作流中失败时，排查成本往往高于写技能本身。',
  },
]

// ── 子 Agent 编排 ──

export const hermesSubagentOverview = [
  {
    title: '子 Agent 的角色',
    description: '子 Agent 是主 Agent 委派的执行单元，负责完成独立的子任务，结果汇总回主 Agent。',
  },
  {
    title: '什么时候需要子 Agent',
    description: '当任务可以拆分为多个独立分支、需要并行探索、或者不同步骤需要不同能力配置时。',
  },
  {
    title: '子 Agent 与技能的关系',
    description: '技能是可复用的能力单元，子 Agent 是运行时的工作单元。技能被子 Agent 调用，子 Agent 被主 Agent 编排。',
  },
  {
    title: '子 Agent 的生命周期',
    description: '子 Agent 随任务创建，任务完成后销毁。它的上下文和结果会汇报给主 Agent，但不会长期驻留。',
  },
]

export const hermesSubagentOrchestration = [
  {
    title: '主从式编排',
    summary: '主 Agent 分配子任务，子 Agent 执行后汇报结果。',
    items: ['主 Agent 掌握全局上下文', '子 Agent 聚焦局部任务', '结果汇总后由主 Agent 决策下一步'],
    fit: '适合任务结构清晰、分支相对独立、且需要统一决策的场景。',
  },
  {
    title: '流水线式编排',
    summary: '多个子 Agent 按顺序接力执行，每个子 Agent 处理一个阶段。',
    items: ['前一个子 Agent 的输出是后一个的输入', '每个阶段可配置不同模型和能力', '流水线整体进度可追踪'],
    fit: '适合有明确阶段划分、且阶段性间依赖关系固定的工作流。',
  },
  {
    title: '竞速式编排',
    summary: '多个子 Agent 同时探索不同方向，最快返回有效结果的被采纳。',
    items: ['并行探索降低延迟', '适合开放式研究任务', '需要结果质量评估机制'],
    fit: '适合探索型任务，多个方案并行验证、最快找到可行路径。',
  },
  {
    title: '混合式编排',
    summary: '结合上述模式，根据任务阶段动态切换编排策略。',
    items: ['前期竞速探索方向', '中期主从深入执行', '后期流水线收尾汇总'],
    fit: '适合复杂长期任务，不同阶段需要不同的协作模式。',
  },
]

export const hermesSubagentBestPractices = [
  {
    title: '子任务粒度要适中',
    detail: '子任务太大则失去并行意义，太小则协调成本高于执行收益。一个好的判断标准：子 Agent 应该能独立完成一个可交付的子结果。',
  },
  {
    title: '为子 Agent 提供清晰的上下文',
    detail: '子 Agent 不应该从零开始。主 Agent 需要传递足够的背景信息，但也要避免把整个上下文都丢给它。',
  },
  {
    title: '子 Agent 的结果需要结构化',
    detail: '自由格式的回复不利于主 Agent 做聚合和判断。定义统一的结果格式，包含结论、证据和置信度。',
  },
  {
    title: '设置合理的超时和重试',
    detail: '子 Agent 可能卡在某个分支上。为每个子任务设置超时时间，超时后应有降级或重试策略。',
  },
  {
    title: '子 Agent 的错误不应该沉默',
    detail: '子 Agent 失败时应该返回错误信息，而不是沉默或返回空结果。主 Agent 需要知道哪里失败了才能做决策。',
  },
]

// ── 实战案例 ──

export const hermesShowcases = [
  {
    category: '长期研究与知识管理',
    title: '技术趋势持续跟踪',
    scenario: '你是一个技术团队负责人，需要持续关注 AI Agent 领域的最新动态，并定期输出趋势简报。',
    approach: '部署 Hermes 作为长期值守的研究助手，配置定时任务每周抓取指定信息源。通过记忆系统积累观察，通过技能沉淀分析方法论，每次产出都比上一次更深入。',
    highlight: '运行三个月后，Hermes 积累了一套完整的领域知识图谱和评估框架，新入团队的成员可以直接基于这份积累开展工作。',
    fit: '长期运行 + 记忆积累 + 技能沉淀',
  },
  {
    category: '自动化运维与巡检',
    title: '服务健康度自动巡检',
    scenario: '你维护一套微服务系统，每天需要检查各服务的健康状态、日志异常和资源使用趋势。',
    approach: 'Hermes 通过定时任务每小时执行一次巡检流程：检查各端点状态、扫描日志中的 ERROR 级别条目、对比资源指标趋势。发现异常时通过消息渠道推送告警，并附带初步分析。',
    highlight: '巡检从每天 30 分钟的手动工作降为零。更重要的是，Hermes 能发现"趋势异常"——指标还没超标但已出现持续偏离——这是人工巡检容易忽略的信号。',
    fit: '自动推进 + 多入口 + 长期值守',
  },
  {
    category: '多入口消息驱动',
    title: '跨渠道工单统一处理',
    scenario: '你的团队同时使用 Slack 和邮件接收用户请求，需要在两个渠道之间保持统一的响应质量和跟踪能力。',
    approach: 'Hermes 同时接入 Slack Bot 和邮件入口，自动识别请求类型、分配处理优先级、执行标准化响应。需要升级的问题自动创建子 Agent 进行深入分析。',
    highlight: '首次响应时间从平均 45 分钟降到 3 分钟。标准问题自动处理率超过 70%，复杂问题才需要人工介入。',
    fit: '多入口协作 + 子 Agent + 持续推进',
  },
  {
    category: '数据流水线',
    title: '自动化数据清洗与分析',
    scenario: '每天有来自多个数据源的原始数据需要清洗、标准化并生成分析报告，数据格式和结构经常变化。',
    approach: 'Hermes 的技能系统承载了数据清洗逻辑，记忆系统记录每种数据源的历史处理模式。当数据格式变化时，Hermes 能基于历史经验调整处理方式，而不是直接报错。',
    highlight: '数据处理的成功率从 82% 提升到 97%。即使格式变化，Hermes 也能在 1-2 次尝试内自适应，不再需要每次都由人工介入调整脚本。',
    fit: '技能沉淀 + 长期积累 + 自适应',
  },
  {
    category: '安全与合规',
    title: '日志审计与异常检测',
    scenario: '安全团队每天需要审查大量系统日志，识别潜在的安全事件和合规违规。',
    approach: '部署 Hermes 持续读取日志流，利用技能库中的审计规则进行实时分析。异常事件自动创建带有初步分析的报告，按风险等级路由到对应处理人。',
    highlight: '安全团队从每天 4 小时的日志审查工作中解放出来。Hermes 将误报率控制在 5% 以下，高风险事件的识别速度比人工快 20 倍。',
    fit: '自动推进 + 长期值守 + 多入口回报',
  },
  {
    category: '开发与工程效率',
    title: '代码评审辅助系统',
    scenario: '开发团队的 PR 评审经常因为 reviewer 时间不够而积压，简单问题得不到及时反馈。',
    approach: 'Hermes 接入 GitHub Webhook，新 PR 自动触发代码评审技能：检查代码风格、测试覆盖率、文档完整性。基础检查通过后再分配给人工 reviewer，附带 Auto Agent 的预审报告。',
    highlight: 'PR 首次反馈时间从平均 8 小时降到 12 分钟。约 30% 的简单 PR 在人工介入前已完成所有基础检查。',
    fit: '自动化触发 + 技能执行 + 人机协作',
  },
]

export const hermesShowcasePatterns = [
  {
    title: '从值守起步，再扩展能力',
    detail: '大多数成功案例都是从"先让 Hermes 稳定执行某个固定任务"开始的，而不是一开始就追求全能力覆盖。',
  },
  {
    title: '积累半年以上的案例价值明显更高',
    detail: '运行时间越长，记忆和技能的沉淀越能体现。3 个月内的案例更多展示的是自动化价值，6 个月以上展示的是复利价值。',
  },
  {
    title: '最成功的案例往往有清晰的边界',
    detail: '那些明确知道"Hermes 负责什么、不负责什么"的团队，比试图让 Hermes 覆盖所有场景的团队走得更远。',
  },
]

// ── 性能与监控 ──

export const hermesMonitoringOverview = [
  {
    title: '为什么要关注监控',
    description: '长期在线的 agent 如果不被观察，就像一个持续运转但不报状态的机器——你不知道它是在工作还是在空转。',
  },
  {
    title: '监控的四个维度',
    description: '系统健康度、任务执行效率、记忆与技能状态、安全与边界状况——四个维度缺一不可。',
  },
  {
    title: '监控与调试的区别',
    description: '调试是在问题发生后打开盖子看，监控是在运行时持续观察仪表盘。长期运行的系统两者都需要。',
  },
  {
    title: '可观测性设计原则',
    description: '不要等到出问题了才想怎么监控。在配置 Hermes 的阶段就应该把日志、指标和告警设计进去。',
  },
]

export const hermesMetrics = [
  {
    title: '任务吞吐量',
    detail: '单位时间内完成任务的数量。持续下降可能意味着 Hermes 卡在某个任务上，或者模型响应变慢。',
  },
  {
    title: '任务成功率',
    detail: '成功完成的任务占总任务的比例。长期低于 80% 说明需要检查技能配置、模型选择或任务复杂度。',
  },
  {
    title: '平均响应时间',
    detail: '从任务提交到首次响应的时间。突然升高可能预示模型 API 延迟或系统资源瓶颈。',
  },
  {
    title: '技能调用频率与成功率',
    detail: '每个技能被调用的次数和成功率。低频使用的技能可以考虑关闭，高频低成功率的技能需要优化。',
  },
  {
    title: '记忆利用率',
    detail: '记忆系统中被后续任务引用的比例。利用率持续走低说明记忆筛选策略可能需要调整。',
  },
  {
    title: '子 Agent 平均执行时间',
    detail: '子 Agent 从创建到返回结果的平均耗时。执行时间过长的子任务可能需要重新拆分。',
  },
]

export const hermesLogging = [
  {
    title: '日志分级策略',
    detail: 'ERROR 记录导致任务失败的问题，WARN 记录异常但未失败的情况，INFO 记录任务生命周期事件，DEBUG 记录详细执行链路。',
  },
  {
    title: '结构化日志格式',
    detail: '每行日志包含时间戳、任务 ID、事件类型、关键字段和消息体。结构化日志比纯文本日志更适合后续检索和分析。',
  },
  {
    title: '日志轮转与保留',
    detail: '长期运行会产生大量日志。建议按天轮转，保留最近 30 天的日志，超过 30 天的归档到低成本存储。',
  },
  {
    title: '告警规则配置',
    detail: '任务连续失败 N 次、响应时间超过阈值、内存使用率过高——为关键指标设置告警，通过消息渠道推送给运维人员。',
  },
]

export const hermesTroubleshooting = [
  {
    title: 'Hermes 不响应任务',
    detail: '检查模型 API 是否可用、网络连接是否正常、进程是否在运行。逐层排查从基础设施到应用层的链路。',
  },
  {
    title: '记忆似乎没有被保存',
    detail: '检查存储后端连接状态、磁盘空间是否充足、记忆配置中的持久化开关是否启用。',
  },
  {
    title: '技能调用失败',
    detail: '检查技能代码是否有语法错误、依赖是否安装、声明的权限是否已被授权。在沙箱中单独运行技能确认。',
  },
  {
    title: '子 Agent 执行超时',
    detail: '子任务可能过于复杂或依赖的外部资源响应慢。考虑增大超时阈值或进一步拆分子任务。',
  },
  {
    title: '消息入口连接断开',
    detail: '检查 Bot Token 是否过期、Webhook URL 是否正确、消息平台的 API 是否有访问频率限制。',
  },
  {
    title: '性能持续下降',
    detail: '检查记忆库是否已增长到影响检索效率、是否注册了过多技能、长期运行是否有内存泄漏。',
  },
]

// ── 术语表 ──

export const hermesGlossary = [
  {
    term: 'Agent',
    definition: '能够感知环境、自主决策并执行动作的智能系统。在 Hermes 语境下特指长期在线的自治 agent。',
  },
  {
    term: '长期运行',
    definition: 'Agent 不是"用完即走"的一次性会话，而是持续驻留在服务器上，跨时间接收和处理任务。',
  },
  {
    term: '记忆',
    definition: 'Agent 在长期运行中积累的信息、经验和状态，能在后续任务中被检索和复用。不是简单的聊天历史。',
  },
  {
    term: '技能',
    definition: '封装了特定能力的可复用模块，包含执行逻辑、权限声明和调用接口。比"工具"更完整，比"应用"更轻量。',
  },
  {
    term: '子 Agent',
    definition: '由主 Agent 创建的临时工作单元，负责完成独立子任务。生命周期随任务开始和结束，不长期驻留。',
  },
  {
    term: 'Surface（接面）',
    definition: 'Agent 接收任务和回报结果的渠道，包括 CLI、消息入口、浏览器和自动化触发。',
  },
  {
    term: '沙箱',
    definition: 'Agent 的执行环境隔离层，限制它可以访问的文件、网络和系统资源，是安全模型的核心。',
  },
  {
    term: '自动推进',
    definition: 'Agent 在不需要人类持续输入的情况下，自主推进任务进度的能力，包括异步处理和定时触发。',
  },
  {
    term: '编排',
    definition: '管理和协调多个子 Agent 的执行顺序、通信方式和结果汇总的策略。',
  },
  {
    term: '可观测性',
    definition: '通过日志、指标和追踪等手段，让系统内部状态可以被外部理解和监控的能力。',
  },
  {
    term: '回报机制',
    definition: 'Agent 向人类汇报任务进度、结果和异常的方式，良好的回报机制是长期运行系统的基本要求。',
  },
  {
    term: '记忆复利',
    definition: '随着运行时间增加，积累的记忆和技能持续产生价值，且新知识的获取成本因已有积累而递减的现象。',
  },
]

// ── 现有页面深化数据：案例与实践指南 ──

export const hermesCapabilityCases = [
  {
    title: '持续代码审查助手',
    scenario: '开发团队希望有一个 agent 能持续跟踪代码仓库的 PR，自动完成基础审查并积累团队的代码规范知识。',
    approach: '利用 Hermes 的长期运行和记忆能力，让它持续接入 GitHub Webhook。每次 PR 审查不仅是当前检查，还会把团队的审查偏好记住，后续审查越来越精准。',
    result: '代码规范一致性从 60% 提升到 92%，新成员 onboarding 周期缩短 40%。',
  },
  {
    title: '跨周项目状态跟踪',
    scenario: '项目经理需要跨周跟踪多个技术项目的进展，但每周手动汇总效率很低。',
    approach: 'Hermes 持续接入项目管理系统，利用长期上下文记住每个项目的历史决策和当前状态。每周自动生成状态报告，并在风险项上标注历史关联。',
    result: '项目状态汇总从每周 3 小时降到 10 分钟，历史决策的追溯成本大幅降低。',
  },
]

export const hermesCapabilityGuide = [
  {
    step: '01',
    title: '确认是否需要长期运行能力',
    detail: '先问自己：这个任务是一次性回答，还是需要跨时间、跨上下文持续推进？如果是后者，Hermes 的能力架构才真正成立。',
  },
  {
    step: '02',
    title: '从最小链路验证执行能力',
    detail: '不要一上来就打开所有能力。先跑通"接收任务 → 执行动作 → 回报结果"的最小闭环，再逐步叠加记忆和子 Agent。',
  },
  {
    step: '03',
    title: '观察能力之间的支撑关系',
    detail: '运行时注意观察：记忆是否真的被后续任务复用？技能是否在降低重复劳动？子 Agent 是否真的在并行推进？如果没有，说明配置或用例需要调整。',
  },
]

export const hermesOperationsCases = [
  {
    title: '从 CLI 起步到消息入口迁移',
    scenario: '研发团队先在 CLI 中验证 Hermes 的处理能力，确认稳定后再接入 Slack。',
    approach: '前两周全部通过 CLI 操作，建立稳定的任务处理和回报机制。第三周接入 Slack Bot，将 Hermes 暴露给更多团队成员。',
    result: '从 CLI 到消息入口的迁移没有中断任何正在进行的任务，团队成员在 Slack 中的采纳率超过 85%。',
  },
  {
    title: '通过入口分离隔离风险',
    scenario: '运维团队需要 Hermes 同时处理"日常查询"和"高危操作"，但不想让两类风险混在一起。',
    approach: 'CLI 入口只开放给运维人员执行高危操作，消息入口只处理查询和报告类任务。两类入口使用不同的权限配置。',
    result: '高危操作的误触率降为零，日常查询的响应时间保持在 2 秒以内。',
  },
]

export const hermesOperationsGuide = [
  {
    step: '01',
    title: '先跑通一个入口',
    detail: '不论选 CLI 还是消息入口，先让一个入口稳定运行至少一周。多入口在早期只会分散注意力。',
  },
  {
    step: '02',
    title: '建立回报检查机制',
    detail: '每天花 5 分钟查看 Hermes 的执行日志和结果回报。如果说不清它昨天做了什么，说明回报机制还不够好。',
  },
  {
    step: '03',
    title: '再考虑增加入口',
    detail: '当现有入口已经稳定运行且回报清晰时，再增加下一个入口。每次只加一个，验证稳定后再加下一个。',
  },
  {
    step: '04',
    title: '最后开启自动触发',
    detail: '定时任务和自动化触发放在最后。它们最强大也最容易掩盖问题，务必在前三步稳固后再开。',
  },
]

export const hermesMemoryCases = [
  {
    title: '客户历史积累',
    scenario: '客服团队希望 agent 在每次对话中都能记住客户的偏好和历史记录。',
    approach: 'Hermes 每次对话结束时自动更新记忆库，记录客户偏好和本次对话的关键决策。下次同客户对话时，Hermes 自动加载相关记忆。',
    result: '客户无需重复描述历史背景，满意度从 72% 提升到 91%。',
  },
  {
    title: '研究笔记自动沉淀',
    scenario: '研究人员每周阅读大量论文，希望 agent 能记住关键结论并在后续研究中自动关联。',
    approach: 'Hermes 通过技能自动提取论文关键信息并存入记忆。当新论文涉及相关主题时，自动关联已有记忆并提供交叉引用。',
    result: '六个月内积累了一个涵盖 200+ 篇论文的知识网络，研究启动速度提升 3 倍。',
  },
]

export const hermesMemoryGuide = [
  {
    step: '01',
    title: '先观察哪些经验值得积累',
    detail: '不是所有信息都值得进入记忆。观察团队工作中哪些知识被反复查询、哪些经验被重复使用，把这些作为沉淀的起点。',
  },
  {
    step: '02',
    title: '从最简单的技能开始固化',
    detail: '不要把第一个技能设计得太复杂。选择一个频率高、逻辑简单的工作流，把它做成技能并验证可用性。',
  },
  {
    step: '03',
    title: '观察复利回路是否形成',
    detail: '持续运行 2-4 周后，检查记忆是否真的被后续任务复用、技能是否在降低重复劳动。如果看不到复利迹象，说明沉淀策略需要调整。',
  },
  {
    step: '04',
    title: '再引入子 Agent',
    detail: '子 Agent 适合在记忆和技能已经稳定运行后再引入。过早引入子 Agent 会让排查复杂问题的成本陡增。',
  },
]

export const hermesSurfaceCases = [
  {
    title: 'CLI + 浏览器联动调试',
    scenario: '开发团队需要在 CLI 中调试 Web 应用，同时让 Hermes 通过浏览器实时查看页面状态。',
    approach: 'CLI 负责执行命令和输出结果，浏览器负责渲染和截图。Hermes 在 CLI 中接收指令，通过浏览器执行操作后把结果返回 CLI。',
    result: '调试效率提升 2 倍，尤其是前端样式和交互问题的定位时间大幅缩短。',
  },
  {
    title: '消息入口 + 自动化定时报告',
    scenario: '团队每天需要一份项目进展摘要，但不想为此单独配置一个定时任务系统。',
    approach: '利用 Hermes 的自动化触发能力设置每日定时报告，通过消息入口推送到团队频道。报告内容随记忆积累越来越精准。',
    result: '日报从手动整理变为自动推送，团队信息获取效率显著提升。',
  },
]

export const hermesSurfaceAntiPatterns = [
  {
    title: '所有入口同时启用',
    detail: '一口气打开 CLI、消息、浏览器和自动化，会导致状态分散、边界模糊。应先从一个入口跑稳，再逐步叠加。',
  },
  {
    title: '让消息入口同时处理简单查询和高危操作',
    detail: '消息入口通常权限较低、受众较广，不适合直接从消息入口开放文件写入或命令执行等高危操作。',
  },
  {
    title: '浏览器能力一开就不设限',
    detail: '浏览器能让 Hermes 操作真实网页，应该严格限定可访问的域名和可执行的操作类型。',
  },
  {
    title: '自动化任务不设超时和上限',
    detail: '自动化一旦触发可能无限执行。每次自动化任务都应明确超时时间、最大执行次数和异常降级策略。',
  },
]

export const hermesSecurityCases = [
  {
    title: '逐步放权的安全策略',
    scenario: '某团队希望 Hermes 能最终处理文件写入操作，但不想一步到位开放所有权限。',
    approach: '第一阶段只开放只读操作，第二阶段增加可控写入（写入前需二次确认），第三阶段才开放自动写入。每个阶段运行至少两周。',
    result: '零安全事故。团队对 Hermes 的信任建立在渐进验证的基础上，而不是冲动授权。',
  },
  {
    title: '多入口权限隔离',
    scenario: 'Hermes 同时接入 Slack 和自动化任务，两类入口的安全要求不同。',
    approach: 'Slack 入口的权限限制为只读查询，自动化任务入口拥有完整的巡检和执行权限。两类入口使用不同的 Token 和沙箱配置。',
    result: '即使消息入口的 Token 泄露，攻击面也仅限于只读查询，核心系统不受影响。',
  },
]

export const hermesSecurityAntiPatterns = [
  {
    title: '把安全配置留到"出了问题再改"',
    detail: '长期在线的 agent 不像一次性脚本，出错的持续时间和影响面都会放大。安全应该在第一天就纳入设计。',
  },
  {
    title: '所有入口共用一个身份和权限',
    detail: '不同的入口有不同的风险等级。共用身份意味着最高权限被所有入口共享，任何一个入口的泄露都会威胁全部。',
  },
  {
    title: '自动化任务不设人工复核节点',
    detail: '某些高风险操作（如文件删除、数据写入、命令执行）应该设置人工复核节点，而不是完全交给 agent 自动决定。',
  },
  {
    title: '运行后不再回顾安全配置',
    detail: '安全配置不是一劳永逸的。随着入口增加、能力扩展和任务变化，安全边界也应该定期重新评估。',
  },
]

export function getHermesPage(slug: HermesSeriesPage['slug']) {
  return hermesSeriesPages.find(item => item.slug === slug)
}

export function getHermesRelatedPages(currentSlug: HermesSeriesPage['slug']) {
  return hermesSeriesPages.filter(item => item.slug !== currentSlug)
}
