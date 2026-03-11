#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

// 加载 .env 文件
const envPath = path.join(dirname(fileURLToPath(import.meta.url)), '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...value] = line.split('=');
      process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
}

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 创建必要的目录
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 使用 Tavily API 进行搜索
const tavilySearch = (query, options = {}) => {
  const { count = 5, deep = false, topic = 'general', days = 7 } = options;
  
  // 构建命令参数
  let cmd = `TAVILY_API_KEY="${process.env.TAVILY_API_KEY}" node /root/.openclaw/workspace/skills/tavily-search/scripts/search.mjs "${query}"`;
  
  if (count) cmd += ` -n ${count}`;
  if (deep) cmd += ' --deep';
  if (topic !== 'general') cmd += ` --topic ${topic}`;
  if (topic === 'news' && days) cmd += ` --days ${days}`;
  
  try {
    console.log(`🔍 Executing search: ${cmd}`);
    const result = execSync(cmd, { encoding: 'utf8' });
    return result;
  } catch (error) {
    console.error('Tavily search error:', error.message);
    return null;
  }
};

// 解析 Tavily Markdown 格式的结果
const parseTavilyMarkdownResults = (rawResult) => {
  if (!rawResult) return { answer: '', sources: [] };
  
  try {
    // 分割 Answer 和 Sources 部分
    const answerMatch = rawResult.match(/## Answer\s*([\s\S]*?)(?=## Sources|$)/);
    const sourcesMatch = rawResult.match(/## Sources\s*([\s\S]*)/);
    
    const answer = answerMatch ? answerMatch[1].trim() : '';
    
    // 解析 sources
    const sources = [];
    if (sourcesMatch && sourcesMatch[1]) {
      const sourceLines = sourcesMatch[1].split('\n');
      let currentSource = null;
      
      for (const line of sourceLines) {
        if (line.trim().startsWith('- **') && line.includes(')')) {
          // 提取标题和 URL
          const titleMatch = line.match(/- \*\*(.*?)\*\*/);
          const urlMatch = line.match(/\((https?:\/\/[^\s)]+)\)/);
          
          if (titleMatch && urlMatch) {
            sources.push({
              title: titleMatch[1],
              url: urlMatch[1]
            });
          }
        }
      }
    }
    
    return { answer, sources };
  } catch (error) {
    console.error('Error parsing Tavily markdown results:', error);
    return { answer: rawResult, sources: [] };
  }
};

// 检查内容是否与 OpenClaw 相关
const isContentRelevant = (title, content, sources) => {
  const relevantKeywords = [
    'openclaw', 'open claw', 'ai assistant', 'personal assistant', 
    'local ai', 'open source ai', 'automation framework', 'agent framework'
  ];
  
  const textToCheck = (title + ' ' + content + ' ' + 
    (sources ? sources.map(s => s.title).join(' ') : '')).toLowerCase();
  
  // 检查是否包含相关关键词
  return relevantKeywords.some(keyword => textToCheck.includes(keyword));
};

// 生成有意义的中文文件名
const generateChineseFilename = (category, query) => {
  const categoryMap = {
    'news': '新闻',
    'docs': '文档'
  };
  
  // 从查询中提取关键词
  let keyword = query.toLowerCase();
  if (keyword.includes('news') || keyword.includes('framework') || keyword.includes('agent')) {
    keyword = '产品动态';
  } else if (keyword.includes('documentation') || keyword.includes('tutorial') || keyword.includes('guide')) {
    keyword = '技术文档';
  } else if (keyword.includes('installation') || keyword.includes('setup') || keyword.includes('configuration')) {
    keyword = '安装配置';
  } else if (keyword.includes('best practices') || keyword.includes('security')) {
    keyword = '最佳实践';
  } else {
    keyword = '相关内容';
  }
  
  return `${category}-${keyword}.md`;
};

// 主要抓取函数（直接生成中文内容）
const fetchDailyContentChinese = async () => {
  // 检查 TAVILY_API_KEY 环境变量
  if (!process.env.TAVILY_API_KEY) {
    console.error('❌ TAVILY_API_KEY environment variable is not set!');
    console.error('Please set your Tavily API key before running this script.');
    process.exit(1);
  }
  
  const today = new Date().toISOString().split('T')[0];
  const tmpBaseDir = path.join(__dirname, '..', 'content', 'tmp', today);
  
  console.log(`🚀 Starting OpenClaw daily content fetch task for ${today} (Chinese version)`);
  
  // 创建今日临时目录
  ensureDir(tmpBaseDir);
  
  const queries = [
    // 新闻类查询
    { query: "OpenClaw AI assistant framework", category: "news", topic: "news", days: 1, chineseTitle: "OpenClaw 产品动态" },
    { query: "OpenClaw open source AI agent", category: "news", topic: "news", days: 1, chineseTitle: "OpenClaw 开源动态" },
    { query: "OpenClaw personal assistant AI", category: "news", topic: "news", days: 1, chineseTitle: "OpenClaw 个人助理" },
    
    // 文档/教程类查询
    { query: "OpenClaw documentation tutorial guide", category: "docs", deep: true, chineseTitle: "OpenClaw 技术文档" },
    { query: "OpenClaw installation setup configuration", category: "docs", deep: true, chineseTitle: "OpenClaw 安装配置" },
    { query: "OpenClaw API reference examples", category: "docs", deep: true, chineseTitle: "OpenClaw API 参考" },
    { query: "OpenClaw best practices security", category: "docs", deep: true, chineseTitle: "OpenClaw 最佳实践" }
  ];
  
  let createdFiles = 0;
  
  for (const { query, category, topic, days, deep, chineseTitle } of queries) {
    try {
      console.log(`🔍 Fetching ${category} content with query: "${query}"`);
      const rawResult = tavilySearch(query, { count: 5, topic, days, deep });
      const parsedResult = parseTavilyMarkdownResults(rawResult);
      
      if (!parsedResult.answer && (!parsedResult.sources || parsedResult.sources.length === 0)) {
        console.log(`⏭️  No content found for query: "${query}"`);
        continue;
      }
      
      // 检查相关性
      if (!isContentRelevant(parsedResult.answer, parsedResult.answer, parsedResult.sources)) {
        console.log(`⏭️  Content not relevant to OpenClaw for query: "${query}"`);
        continue;
      }
      
      // 生成中文 Markdown 内容
      const date = new Date().toISOString().split('T')[0];
      let chineseContent = `# ${chineseTitle} - ${date}\n\n`;
      
      if (parsedResult.answer) {
        // 这里应该调用真正的翻译 API，但为了演示，我们假设内容已经是中文或需要人工翻译
        // 在实际应用中，这里会调用翻译服务
        chineseContent += `## 内容摘要\n\n${parsedResult.answer}\n\n`;
      }
      
      if (parsedResult.sources && parsedResult.sources.length > 0) {
        chineseContent += `## 来源和参考\n\n`;
        parsedResult.sources.forEach((source, index) => {
          chineseContent += `${index + 1}. [${source.title}](${source.url})\n\n`;
        });
      }
      
      chineseContent += `> **注意**: 此内容于 ${date} 自动抓取并处理。已根据 OpenClaw 相关性进行过滤，并整理为发布格式。\n\n`;
      
      // 生成中文 frontmatter
      const description = `自动抓取和处理的关于 OpenClaw 的${category === 'news' ? '新闻' : '文档'}内容`;
      const frontmatterStr = `---
title: "${chineseTitle} - ${date}"
description: "${description}"
category: "${category === 'news' ? '产品更新' : '技术文档'}"
date: "${date}"
---

`;
      
      const completeChineseMarkdown = frontmatterStr + chineseContent;
      
      // 生成有意义的中文文件名
      const filename = generateChineseFilename(category, query);
      const filePath = path.join(tmpBaseDir, filename);
      
      // 写入中文文件
      fs.writeFileSync(filePath, completeChineseMarkdown, 'utf8');
      console.log(`✅ Created Chinese file: ${filePath}`);
      createdFiles++;
      
    } catch (error) {
      console.error(`❌ Error processing query "${query}":`, error.message);
    }
  }
  
  if (createdFiles > 0) {
    console.log(`✅ Daily content fetch with Chinese completed successfully! Created ${createdFiles} files in ${tmpBaseDir}`);
  } else {
    console.log('ℹ️  No relevant content found for today');
  }
  
  return createdFiles;
};

// 执行主函数
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchDailyContentChinese().catch(error => {
    console.error('❌ Fatal error during daily content fetch:', error);
    process.exit(1);
  });
}