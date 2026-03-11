export type VideoItem = {
  title: string
  description: string
  href: string
  platform: 'YouTube' | 'Bilibili' | 'Official'
  duration?: string
  publishedAt?: string
  views?: string
  level: '入门' | '基础' | '进阶'
  tags: string[]
  note?: string
}

export const videoSections: Array<{
  id: string
  title: string
  description: string
  items: VideoItem[]
}> = [
  {
    id: 'official',
    title: '官方入口与总览',
    description: '优先看官方 Showcase 和官方挑选的实战演示，先建立对 OpenClaw 能力边界的直观认识。',
    items: [
      {
        title: 'OpenClaw Showcase',
        description: '官方 Showcase 页面，持续收录真实社区项目、自动化案例、语音/硬件/部署演示与 YouTube 视频入口。',
        href: 'https://docs.openclaw.ai/start/showcase',
        platform: 'Official',
        level: '入门',
        tags: ['官方', 'showcase', '案例'],
        note: '适合先扫一遍，判断自己更该看安装、自动化还是渠道接入。',
      },
      {
        title: 'ClawdBot: The self-hosted AI that Siri should have been (Full setup)',
        description: '官方 Showcase 推荐的完整设置演练，适合作为英文世界里最接近“从概念到落地”的一条视频入口。',
        href: 'https://www.youtube.com/watch?v=SaWSPZoPX34',
        platform: 'YouTube',
        duration: '28 分钟',
        level: '基础',
        tags: ['官方推荐', 'full-setup', '英文'],
      },
    ],
  },
  {
    id: 'setup',
    title: '安装与部署教程',
    description: '面向第一次上手的用户，优先收录本地部署、Windows/WSL 路径和更完整的保姆级教程。',
    items: [
      {
        title: 'OpenClaw本地部署保姆级教程，新手小白龙虾安装指南',
        description: '适合完全第一次接触 OpenClaw 的中文用户，重点覆盖本地部署全过程和常见卡点。',
        href: 'https://www.bilibili.com/video/BV1o1AZzmEz7/',
        platform: 'Bilibili',
        publishedAt: '2026-03-03',
        views: '1.3 万播放',
        level: '入门',
        tags: ['本地部署', '新手', '中文'],
      },
      {
        title: 'Openclaw本地部署0基础教学 Windows快速部署Openclaw深度详细全程演示',
        description: '偏 Windows 本地部署，播放量高，适合先跟着走完整条安装链路。',
        href: 'https://www.bilibili.com/video/BV1e6PNzNEBf/',
        platform: 'Bilibili',
        publishedAt: '2026-03-04',
        views: '10.2 万播放',
        level: '入门',
        tags: ['Windows', '部署', '高热度'],
      },
      {
        title: '〖Clawdbot/Openclaw〗超详细Windows下安全（基于WSL）安装指南',
        description: '如果你在 Windows 上更关注更稳妥的 WSL 安装路径，这个视频更有参考价值。',
        href: 'https://www.bilibili.com/video/BV1SPFMzQErh/',
        platform: 'Bilibili',
        publishedAt: '2026-02-02',
        duration: '33:49',
        views: '2.4 万播放',
        level: '基础',
        tags: ['Windows', 'WSL', '安全'],
      },
      {
        title: 'Windows本地部署openclaw大龙虾教学，无需科学上网，无需WSL',
        description: '更偏向简化的 Windows 部署路径，适合想先降低网络和环境门槛的用户。',
        href: 'https://www.bilibili.com/video/BV1UgA6zUEpS/',
        platform: 'Bilibili',
        publishedAt: '2026-02-26',
        views: '2.2 万播放',
        level: '入门',
        tags: ['Windows', '免WSL', '快速部署'],
      },
    ],
  },
  {
    id: 'skills',
    title: 'Skills 与能力扩展',
    description: '已经跑通基础链路后，更应该看 Skills、自动化和能力扩展，而不是继续重复安装视频。',
    items: [
      {
        title: '给 OpenClaw 小龙虾安装技能包',
        description: '聚焦 Skills 安装和扩展能力，适合在基础部署完成后继续往“能做事”推进。',
        href: 'https://www.bilibili.com/video/BV1PbFUzZEvN',
        platform: 'Bilibili',
        publishedAt: '2026-02-10',
        views: '1.5 万播放',
        level: '基础',
        tags: ['skills', '扩展', '中文'],
      },
      {
        title: '〖让Openclaw开挂〗一个例子就能学会skills',
        description: '更像一支短路径教学，适合已经安装完成、只想快速理解 Skills 的用户。',
        href: 'https://www.bilibili.com/video/BV1BgfqB7EEU/',
        platform: 'Bilibili',
        publishedAt: '2026-02-23',
        views: '3669 播放',
        level: '基础',
        tags: ['skills', '示例', '进阶入口'],
      },
      {
        title: '安装了72个Skills后，我的OpenClaw无所不能！',
        description: '虽然更偏展示，但适合快速感知 Skills 扩展后能覆盖到的能力广度。',
        href: 'https://www.bilibili.com/video/BV19dZKBHEmg/',
        platform: 'Bilibili',
        publishedAt: '2026-02-16',
        views: '3.9 万播放',
        level: '进阶',
        tags: ['skills', '案例', '展示'],
      },
    ],
  },
  {
    id: 'integration',
    title: '渠道接入与办公场景',
    description: '适合已经知道 OpenClaw 是什么，接下来要把它真正接到微信、飞书、钉钉、QQ 或团队流转里的用户。',
    items: [
      {
        title: '〖2026最新Clawdbot/OpenClaw部署教程〗接入微信/飞书/钉钉/QQ实现自动化运行',
        description: '更偏企业办公和国内渠道接入，覆盖阿里云、腾讯云以及飞书/钉钉/QQ 等实战流程。',
        href: 'https://www.bilibili.com/video/BV1qHAozLEZw/',
        platform: 'Bilibili',
        publishedAt: '2026-03-03',
        views: '5060 播放',
        level: '进阶',
        tags: ['飞书', '钉钉', 'QQ', '自动化'],
      },
      {
        title: 'clawdbot/openclaw安装并对接自己的本地模型ollama及使用',
        description: '适合关心本地模型接入、想把 OpenClaw 和 Ollama 配合起来的用户。',
        href: 'https://www.bilibili.com/video/BV1Ys6yBLEiK/',
        platform: 'Bilibili',
        publishedAt: '2026-01-31',
        views: '3375 播放',
        level: '进阶',
        tags: ['Ollama', '本地模型', '模型接入'],
      },
      {
        title: '一夜爆火的OpenClaw，背后是蔓延的“AI落后焦虑”〖零门槛OpenClaw教程〗',
        description: '更偏趋势解读 + 零门槛搭建，适合想先理解为什么大家在讨论 OpenClaw，再决定是否自己部署。',
        href: 'https://www.bilibili.com/video/BV1DxFazREAG',
        platform: 'Bilibili',
        publishedAt: '2026-02-05',
        views: '15.8 万播放',
        level: '入门',
        tags: ['趋势', '零门槛', '中文'],
      },
    ],
  },
]

export const featuredVideos = [
  {
    title: '官方 Showcase',
    description: '先看官方挑选的真实案例和 YouTube 演示，再决定自己下一步该走哪条路径。',
    to: '/videos',
    meta: '官方入口',
  },
  {
    title: '安装与部署合集',
    description: '把本地部署、Windows、WSL 和免 WSL 视频整理在一个页面里，不用再到处搜。',
    to: '/videos#setup',
    meta: '部署',
  },
  {
    title: 'Skills 与渠道接入',
    description: '从技能扩展到飞书、钉钉、QQ、Ollama 接入，把更实战的内容单独聚合。',
    to: '/videos#skills',
    meta: '进阶',
  },
]
