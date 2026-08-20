import { defineConfig } from 'vitepress'

// 侧边栏：理论考试模块
const theorySidebar = [
  {
    text: '理论考试 · 知识点',
    collapsed: false,
    items: [
      { text: '1. 职业道德', link: '/theory/01-professional-ethics' },
      { text: '2. 消防工作概述', link: '/theory/02-fire-service-overview' },
      { text: '3. 燃烧和火灾基础知识', link: '/theory/03-combustion-fire' },
      { text: '4. 建筑防火基础知识', link: '/theory/04-building-fire' },
      { text: '5. 电气消防基础知识', link: '/theory/05-electrical-fire' },
      { text: '6. 消防设施基础知识', link: '/theory/06-fire-facilities' },
      { text: '7. 初起火灾处置知识', link: '/theory/07-initial-fire' },
      { text: '8. 计算机基础知识', link: '/theory/08-computer' },
      { text: '9. 法律法规与技术标准', link: '/theory/09-laws-standards' },
      { text: '10. 安全生产与职业健康', link: '/theory/10-safety-health' }
    ]
  }
]

// 侧边栏：技能操作考核模块
const skillSidebar = [
  {
    text: '技能操作考核 · 职业功能',
    collapsed: false,
    items: [
      { text: '1. 设施监控', link: '/skill/01-monitoring' },
      { text: '2. 设施操作', link: '/skill/02-operation' },
      { text: '3. 设施保养', link: '/skill/03-maintenance' },
      { text: '4. 设施维修', link: '/skill/04-repair' },
      { text: '5. 设施检测', link: '/skill/05-detection' },
      { text: '火灾自动报警系统项目卡', link: '/skill/alarm-system' },
      { text: '水系统设备项目卡', link: '/skill/water-system' }
    ]
  }
]

// 侧边栏：首页 / 考试说明总览
const homeSidebar = [
  {
    text: '开始学习',
    items: [
      { text: '首页', link: '/' },
      { text: '考核说明', link: '/exam-guide' },
      { text: '零基础导学', link: '/beginner-guide' },
      { text: '核心术语表', link: '/glossary' },
      { text: '权威依据与版本边界', link: '/sources' },
      { text: '技能考核路线图', link: '/skill-roadmap' }
    ]
  },
  {
    text: '只读训练',
    collapsed: false,
    items: [
      { text: '训练总览', link: '/training' },
      { text: '理论训练', link: '/training-theory' },
      { text: '技能训练', link: '/training-skill' },
      { text: '题源与标记说明', link: '/training-labels' }
    ]
  },
  {
    text: '理论考试',
    items: [
      { text: '1. 职业道德', link: '/theory/01-professional-ethics' },
      { text: '2. 消防工作概述', link: '/theory/02-fire-service-overview' },
      { text: '3. 燃烧和火灾基础知识', link: '/theory/03-combustion-fire' },
      { text: '4. 建筑防火基础知识', link: '/theory/04-building-fire' },
      { text: '5. 电气消防基础知识', link: '/theory/05-electrical-fire' },
      { text: '6. 消防设施基础知识', link: '/theory/06-fire-facilities' },
      { text: '7. 初起火灾处置知识', link: '/theory/07-initial-fire' },
      { text: '8. 计算机基础知识', link: '/theory/08-computer' },
      { text: '9. 法律法规与技术标准', link: '/theory/09-laws-standards' },
      { text: '10. 安全生产与职业健康', link: '/theory/10-safety-health' }
    ]
  },
  {
    text: '技能操作考核',
    items: [
      { text: '1. 设施监控', link: '/skill/01-monitoring' },
      { text: '2. 设施操作', link: '/skill/02-operation' },
      { text: '3. 设施保养', link: '/skill/03-maintenance' },
      { text: '4. 设施维修', link: '/skill/04-repair' },
      { text: '5. 设施检测', link: '/skill/05-detection' },
      { text: '火灾自动报警系统项目卡', link: '/skill/alarm-system' },
      { text: '水系统设备项目卡', link: '/skill/water-system' }
    ]
  }
]

export default defineConfig({
  title: '消防设施操作员（四级）学习站',
  description: '面向零基础学员的四级/中级工线下常规考核（理论+技能）系统学习站点',
  lang: 'zh-CN',
  // 使用自定义域名部署，静态资源和站内链接从域名根路径加载
  base: '/',
  cleanUrls: true,
  ignoreDeadLinks: false,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '考核说明', link: '/exam-guide' },
      { text: '零基础导学', link: '/beginner-guide' },
      { text: '只读训练', link: '/training' },
      { text: '理论考试', link: '/theory/01-professional-ethics' },
      { text: '技能操作', link: '/skill/01-monitoring' }
    ],
    sidebar: {
      '/theory/': theorySidebar,
      '/skill/': skillSidebar,
      '/': homeSidebar
    },
    search: { provider: 'local' },
    docFooter: { prev: true, next: true },
    outline: { label: '本页目录', level: [2, 3] },
    lastUpdated: { text: '最后更新于' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '导航菜单',
    darkModeSwitchLabel: '主题',
    langMenuLabel: '语言',
    notFound: {
      title: '页面未找到',
      quote: '抱歉，您访问的页面不存在。',
      linkText: '返回首页'
    }
  }
})
