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

// 生成基于内容的有意义的中文文件名
const generateChineseFilename = (title, content, category) => {
  // 提取关键词并创建中文文件名
  let filenameBase;
  
  if (category === 'news') {
    filenameBase = 'OpenClaw-每日新闻';
  } else if (category === 'docs') {
    filenameBase = 'OpenClaw-文档更新';
  } else {
    filenameBase = 'OpenClaw-内容';
  }
  
  return `${category}-${filenameBase}.md`;
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

// 将英文内容翻译为中文
const translateToChinese = (englishContent) => {
  // 这里应该调用实际的翻译 API
  // 由于我们没有真实的翻译 API，这里模拟翻译过程
  
  // 简单的关键词替换来模拟翻译
  const translations = {
    'OpenClaw Daily News': 'OpenClaw 每日新闻',
    'OpenClaw Documentation Update': 'OpenClaw 文档更新',
    'Content Summary': '内容摘要',
    'Sources and References': '来源和参考',
    'Note': '注意',
    'This content was automatically fetched and processed on': '此内容于',
    'It has been filtered for relevance to OpenClaw and organized for publication': '已根据 OpenClaw 相关性进行过滤并整理用于发布',
    'Automatically fetched and processed': '自动抓取和处理',
    'filtered for relevance to OpenClaw': '已过滤与 OpenClaw 相关的内容',
    'organized for publication': '已整理用于发布'
  };
  
  let chineseContent = englishContent;
  for (const [english, chinese] of Object.entries(translations)) {
    const regex = new RegExp(english, 'g');
    chineseContent = chineseContent.replace(regex, chinese);
  }
  
  // 如果内容中包含英文，添加说明
  if (chineseContent === englishContent) {
    // 没有翻译成功，保持原样但标记
    chineseContent = englishContent + '\n\n> **注意**: 此内容为英文原文，自动翻译功能待完善';
  }
  
  return chineseContent;
};

// 重写和整理内容（中文版本）
const rewriteAndOrganizeChineseContent = (originalContent, sources, category) => {
  const date = new Date().toISOString().split('T')[0];
  let content = `# ${category === 'news' ? 'OpenClaw 每日新闻' : 'OpenClaw 文档更新'} - ${date}\n\n`;
  
  if (originalContent) {
    content += `## 内容摘要\n\n${originalContent}\n\n`;
  }
  
  if (sources && sources.length > 0) {
    content += `## 来源和参考\n\n`;
    sources.forEach((source, index) => {
      content += `${index + 1}. [${source.title}](${source.url})\n\n`;
    });
  }
  
  content += `> **注意**: 此内容于 ${date} 自动抓取并处理。已根据 OpenClaw 相关性进行过滤，并整理为发布格式。\n\n`;
  
  return content;
};

// 生成完整的中文 Markdown 内容
const generateCompleteChineseMarkdown = (title, description, category, content, date) => {
  // 中文描述
  const chineseDescription = category === 'news' 
    ? '自动抓取和处理的 OpenClaw 新闻内容' 
    : '自动抓取和处理的 OpenClaw 文档内容';
  
  const frontmatterStr = `---
title: "${title}"
description: "${chineseDescription}"
category: "${category === 'news' ? '产品更新' : '技术文档'}"
date: "${date}"
---

`;
  return frontmatterStr + content;
};

// 抓取并处理内容（生成中文版本）
const fetchAndProcessChineseContent = async (query, category, options = {}) => {
  const { topic = 'general', days = 7, deep = false } = options;
  
  console.log(`🔍 Fetching ${category} content with query: "${query}"`);
  const rawResult = tavilySearch(query, { count: 5, topic, days, deep });
  const parsedResult = parseTavilyMarkdownResults(rawResult);
  
  if (!parsedResult.answer && (!parsedResult.sources || parsedResult.sources.length === 0)) {
    console.log(`⏭️  No content found for query: "${query}"`);
    return null;
  }
  
  // 检查相关性
  if (!isContentRelevant(parsedResult.answer, parsedResult.answer, parsedResult.sources)) {
    console.log(`⏭️  Content not relevant to OpenClaw for query: "${query}"`);
    return null;
  }
  
  // 重写和整理中文内容
  const processedContent = rewriteAndOrganizeChineseContent(
    parsedResult.answer, 
    parsedResult.sources, 
    category
  );
  
  const date = new Date().toISOString().split('T')[0];
  const title = `${category === 'news' ? 'OpenClaw 每日新闻' : 'OpenClaw 文档更新'} - ${date}`;
  
  const completeMarkdown = generateCompleteChineseMarkdown(title, '', category, processedContent, date);
  
  return {
    content: completeMarkdown,
    title: title,
    sources: parsedResult.sources
  };
};

// 主要抓取函数（中文版本）
const fetchDailyChineseContent = async () => {
  // 检查 TAVILY_API_KEY 环境变量
  if (!process.env.TAVILY_API_KEY) {
    console.error('❌ TAVILY_API_KEY environment variable is not set!');
    console.error('Please set your Tavily API key before running this script.');
    process.exit(1);
  }
  
  const today = new Date().toISOString().split('T')[0];
  const tmpBaseDir = path.join(__dirname, '..', 'content', 'tmp', today);
  
  console.log(`🚀 Starting OpenClaw daily content fetch task for ${today} (with Chinese translation)`);
  
  // 创建今日临时目录
  ensureDir(tmpBaseDir);
  
  const queries = [
    // 新闻类查询
    { query: "OpenClaw AI assistant framework", category: "news", topic: "news", days: 1 },
    { query: "OpenClaw open source AI agent", category: "news", topic: "news", days: 1 },
    { query: "OpenClaw personal assistant AI", category: "news", topic: "news", days: 1 },
    
    // 文档/教程类查询
    { query: "OpenClaw documentation tutorial guide", category: "docs", deep: true },
    { query: "OpenClaw installation setup configuration", category: "docs", deep: true },
    { query: "OpenClaw API reference examples", category: "docs", deep: true },
    { query: "OpenClaw best practices security", category: "docs", deep: true }
  ];
  
  let createdFiles = 0;
  
  for (const { query, category, topic, days, deep } of queries) {
    try {
      const result = await fetchAndProcessChineseContent(query, category, { topic, days, deep });
      
      if (result) {
        // 生成有意义的中文文件名
        const filename = generateChineseFilename(result.title, result.content, category);
        const filePath = path.join(tmpBaseDir, filename);
        
        // 写入中文文件
        fs.writeFileSync(filePath, result.content, 'utf8');
        console.log(`✅ Created Chinese file: ${filePath}`);
        createdFiles++;
      }
    } catch (error) {
      console.error(`❌ Error processing query "${query}":`, error.message);
    }
  }
  
  if (createdFiles > 0) {
    console.log(`✅ Daily content fetch with Chinese translation completed successfully! Created ${createdFiles} files in ${tmpBaseDir}`);
  } else {
    console.log('ℹ️  No relevant content found for today');
  }
  
  return createdFiles;
};

// 执行主函数
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchDailyChineseContent().catch(error => {
    console.error('❌ Fatal error during daily content fetch:', error);
    process.exit(1);
  });
}