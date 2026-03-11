export type DerivativeItem = {
  title: string
  summary: string
  type: string
  audience: string
  maturity: string
  relation: string
  sourceType: string
  href?: string
  note: string
  tags: string[]
}

export type DerivativeSection = {
  id: string
  title: string
  description: string
  items: DerivativeItem[]
}

export const derivativeSignals = [
  {
    label: '页面定位',
    value: '中文衍生生态导览',
    note: '聚合国内二次开发、轻量封装、部署发行版和实验工具，帮助你判断它们与 OpenClaw 主项目的关系。',
  },
  {
    label: '适合谁看',
    value: '已了解主线能力的用户',
    note: '如果你已经知道 OpenClaw 本体是什么，这一页更适合用来决定下一步应该看哪个分支生态。',
  },
  {
    label: '阅读方式',
    value: '先看定位，再看成熟度',
    note: '不要只看名字像不像；先判断它是桌面包装、渠道分发、硬件方向，还是自动化平台化方案。',
  },
]

export const derivativeSections: DerivativeSection[] = [
  {
    id: 'desktop',
    title: '桌面与轻量入口',
    description: '更偏向桌面体验、轻量封装或上手门槛优化，适合希望更快得到“可用界面”的用户。',
    items: [
      {
        title: 'QClaw',
        summary: '偏桌面端和轻量客户端方向的二次封装，强调开箱体验、界面友好和更低的首次上手阻力。',
        type: '桌面客户端 / 可视化包装',
        audience: '想先体验图形界面，而不是直接从 CLI 开始的新用户。',
        maturity: '公开官网可见',
        relation: '更像面向国内用户的使用入口，而不是 OpenClaw 主项目本体。',
        sourceType: '官网',
        href: 'https://qclawd.com/',
        note: '更适合把它看成“更友好的入口层”，需要继续确认其与上游版本同步节奏。',
        tags: ['桌面', '客户端', '可视化'],
      },
      {
        title: 'NanoClaw',
        summary: '强调更轻的部署包和更快的本地体验，常见于希望降低资源消耗或快速试跑的场景。',
        type: '轻量封装 / 社区变体',
        audience: '设备资源有限，或想以最小成本快速验证流程的用户。',
        maturity: '公开站点 / 社区资料',
        relation: '通常被看作面向轻量环境的社区变体，而不是官方分发渠道。',
        sourceType: '官网 / 社区资料',
        href: 'https://www.nanoclaw.ai/',
        note: '适合关注其体积、依赖和支持平台，不应默认视为与主线功能完全等价。',
        tags: ['轻量', '部署', '社区'],
      },
      {
        title: 'PicoClaw',
        summary: '更强调小体积和边缘设备友好的体验，适合把 OpenClaw 能力往更轻的运行环境里压缩。',
        type: '轻量发行 / 边缘入口',
        audience: '想在低资源设备或精简环境中试用 OpenClaw 思路的人。',
        maturity: '公开官网可见',
        relation: '是围绕 OpenClaw 生态做的小型化入口，不等同于官方标准安装链路。',
        sourceType: '官网',
        href: 'https://www.picoclaw.ai/',
        note: '更适合先确认它支持的模型、渠道和运行环境，再决定是否拿来做长期主环境。',
        tags: ['轻量', '边缘', '小型化'],
      },
    ],
  },
  {
    id: 'platform',
    title: '平台化与国内分发方向',
    description: '更偏向自动化、企业接入、本地化发行和国内使用门槛优化，适合已经开始考虑扩展、部署或团队使用的人。',
    items: [
      {
        title: 'AutoClaw',
        summary: '公开资料里更常以自动化执行、批处理工作流或平台化组合方案出现，强调“把 OpenClaw 接进流程”。',
        type: '自动化平台 / 工作流包装',
        audience: '已经跑通基础环境，准备把能力接进任务流、表单流或内部自动化的人。',
        maturity: '社区发布 / 媒体报道',
        relation: '目前更像围绕 OpenClaw 思路做的衍生方案，公开信息主要来自社区介绍。',
        sourceType: '社区报道',
        note: '当前更适合把它列入观察名单；如果准备正式使用，应先确认维护主体、安装方式和升级路径。',
        tags: ['自动化', '平台化', '工作流'],
      },
      {
        title: 'ArkClaw',
        summary: '常见于和国内模型、云资源或企业场景结合的讨论里，重点通常放在“更适合国内环境的接入方式”。',
        type: '企业接入 / 国内模型适配',
        audience: '更关注国内模型供应、云厂商环境和企业内网接入的人。',
        maturity: '社区发布 / 媒体报道',
        relation: '更像“面向国内运行环境的衍生方向”，不是 OpenClaw 官方产品线的一部分。',
        sourceType: '社区报道',
        note: '看这类项目时，最该先确认的是模型供应商绑定程度、兼容性和长期维护节奏。',
        tags: ['企业', '国产模型', '云接入'],
      },
      {
        title: 'openclaw-china',
        summary: '偏中文资料、本地化分发和国内使用辅助入口，适合作为中文用户理解与部署 OpenClaw 的辅助起点。',
        type: '本地化发行 / 中文入口',
        audience: '需要中文资料、国内环境说明和本地化部署信息的用户。',
        maturity: '公开站点可见',
        relation: '更像本地化社区分支或中文分发入口，用来降低中文用户理解和部署门槛。',
        sourceType: '官网',
        href: 'https://open-claw.org.cn/',
        note: '适合作为资料入口和国内部署参考，但仍建议同步对照 OpenClaw 上游官方文档。',
        tags: ['中文', '本地化', '部署'],
      },
    ],
  },
  {
    id: 'hardware',
    title: '硬件与实验方向',
    description: '更偏向实验性硬件、边缘计算或形态创新，适合已经理解主线能力并想看更前沿玩法的人。',
    items: [
      {
        title: 'IronClaw',
        summary: '更偏硬件、设备化或实验平台方向，把 OpenClaw 思路往物理设备和边缘形态延展。',
        type: '硬件实验 / 设备形态',
        audience: '关心边缘设备、物理载体或更实验性运行形态的开发者。',
        maturity: '公开官网可见',
        relation: '更像生态外延和实验方向，不建议把它视作大多数用户的标准入口。',
        sourceType: '官网',
        href: 'https://ironclaw.ai/',
        note: '更适合作为方向观察和能力边界参考，而不是默认主线部署方案。',
        tags: ['硬件', '设备', '实验'],
      },
    ],
  },
]

export const derivativeRecommendations = [
  {
    title: '如果你是第一次接触 OpenClaw',
    description: '优先看 QClaw 或 openclaw-china 这类入口型项目，帮助你用中文快速建立直觉，但不要跳过上游官方文档。',
  },
  {
    title: '如果你想要更轻的部署体验',
    description: '先看 NanoClaw、PicoClaw 这类轻量方向，再核对它们支持的模型、渠道和平台是否符合你的预期。',
  },
  {
    title: '如果你想做团队接入或自动化',
    description: '把 AutoClaw、ArkClaw 放进观察清单，优先核对其维护主体、升级路径和与上游版本的同步节奏。',
  },
]
