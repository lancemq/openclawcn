#!/usr/bin/env node

// 内容相关性过滤器
// 判断抓取的内容是否与 OpenClaw 网站内容相关

export const isOpenClawRelevant = (content, title, url) => {
  const contentLower = content.toLowerCase();
  const titleLower = title.toLowerCase();
  const urlLower = url.toLowerCase();
  
  // OpenClaw 相关关键词
  const openClawKeywords = [
    'openclaw', 'open claw', 'clawd', 'ai assistant', 'personal assistant',
    'local ai', 'privacy first', 'agent framework', 'automation framework',
    'github.com/openclaw', 'docs.openclaw.ai', 'openclaw.cn'
  ];
  
  // 检查是否包含 OpenClaw 关键词
  const hasOpenClawKeyword = openClawKeywords.some(keyword => 
    contentLower.includes(keyword) || titleLower.includes(keyword) || urlLower.includes(keyword)
  );
  
  // 如果不包含 OpenClaw 关键词，但包含其他 AI/自动化相关词汇，也可能是相关的
  const aiKeywords = [
    'ai agent', 'personal ai', 'local ai', 'privacy ai', 'automation',
    'workflow automation', 'ai framework', 'open source ai'
  ];
  
  const hasAIGeneralKeyword = aiKeywords.some(keyword => 
    contentLower.includes(keyword) || titleLower.includes(keyword)
  );
  
  // 相关性判断逻辑
  if (hasOpenClawKeyword) {
    return { relevant: true, reason: 'Contains OpenClaw specific keywords' };
  }
  
  if (hasAIGeneralKeyword && (contentLower.includes('assistant') || contentLower.includes('framework'))) {
    return { relevant: true, reason: 'Contains general AI keywords with assistant/framework context' };
  }
  
  // 检查 URL 是否来自技术博客、新闻网站等
  const techDomains = [
    'github.com', 'medium.com', 'dev.to', 'hackernoon.com', 'reddit.com',
    'twitter.com', 'linkedin.com', 'news.ycombinator.com', 'techcrunch.com'
  ];
  
  const isTechDomain = techDomains.some(domain => urlLower.includes(domain));
  if (isTechDomain && hasAIGeneralKeyword) {
    return { relevant: true, reason: 'From tech domain with AI keywords' };
  }
  
  return { relevant: false, reason: 'No relevant keywords found' };
};

// 内容分类器
export const classifyContent = (content, title) => {
  const text = (title + ' ' + content).toLowerCase();
  
  if (text.includes('news') || text.includes('update') || text.includes('announcement') || text.includes('release')) {
    return 'news';
  }
  
  if (text.includes('tutorial') || text.includes('guide') || text.includes('how to') || text.includes('documentation')) {
    return 'docs';
  }
  
  if (text.includes('config') || text.includes('configuration') || text.includes('setup') || text.includes('install')) {
    return 'config';
  }
  
  if (text.includes('best practice') || text.includes('security') || text.includes('performance')) {
    return 'best-practices';
  }
  
  return 'general';
};

// 生成有意义的文件名
export const generateMeaningfulFilename = (title, category, dateStr) => {
  // 清理标题以创建文件名
  let filename = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // 移除非字母数字字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .replace(/^-+|-+$/g, ''); // 移除开头和结尾的连字符
  
  // 限制文件名长度
  if (filename.length > 50) {
    filename = filename.substring(0, 50);
    // 确保不在单词中间截断
    const lastDash = filename.lastIndexOf('-');
    if (lastDash > 30) {
      filename = filename.substring(0, lastDash);
    }
  }
  
  // 如果文件名太短，使用类别名
  if (filename.length < 5) {
    filename = category;
  }
  
  return `${category}-${dateStr}-${filename}.md`;
};