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

// 计算中文字符数（包括标点符号）
const countChineseCharacters = (text) => {
  if (!text) return 0;
  // 匹配中文字符、标点符号和数字
  const chineseRegex = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g;
  const matches = text.match(chineseRegex);
  return matches ? matches.length : 0;
};

// 生成基于内容的有意义文件名
const generateContentBasedFilename = (title, content, category) => {
  // 从内容中提取关键词
  let summaryText = title || content.substring(0, 200);
  
  // 提取核心主题词
  const keywords = [];
  const importantTerms = [
    'OpenClaw', 'Meta', 'Moltbook', 'AI代理', '开源', '安全', '配置', 
    '文档', '教程', '最佳实践', '收购', '社交网络', '自动化'
  ];
  
  for (const term of importantTerms) {
    if (summaryText.includes(term)) {
      keywords.push(term);
    }
  }
  
  // 如果没有找到关键词，从内容中提取前几个词
  if (keywords.length === 0) {
    const words = summaryText.split(/[\s\u3000，。！？；：]+/).filter(w => w.length > 2);
    keywords.push(...words.slice(0, 3));
  }
  
  let filenameBase = keywords.join('-');
  
  // 清理文件名
  filenameBase = filenameBase
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
  
  if (!filenameBase) {
    filenameBase = 'openclaw-content';
  }
  
  return `${category}-${filenameBase}.md`;
};

// 检查内容是否与 OpenClaw 相关且足够长
const isContentValid = (title, content, sources) => {
  const relevantKeywords = [
    'openclaw', 'open claw', 'ai assistant', 'personal assistant', 
    'local ai', 'open source ai', 'automation framework', 'agent framework',
    'AI代理', '开源AI', '自动化框架'
  ];
  
  const textToCheck = (title + ' ' + content + ' ' + 
    (sources ? sources.map(s => s.title).join(' ') : '')).toLowerCase();
  
  // 检查是否包含相关关键词
  const isRelevant = relevantKeywords.some(keyword => textToCheck.includes(keyword.toLowerCase()));
  
  // 检查中文字符数是否大于200
  const chineseCharCount = countChineseCharacters(content);
  const isLongEnough = chineseCharCount >= 200;
  
  console.log(`📝 Content validation - Relevant: ${isRelevant}, Chinese chars: ${chineseCharCount}, Long enough: ${isLongEnough}`);
  
  return isRelevant && isLongEnough;
};

// 使用 Tavily API 进行搜索（仅限当天）
const tavilySearchToday = (query) => {
  const cmd = `TAVILY_API_KEY="${process.env.TAVILY_API_KEY}" node /root/.openclaw/workspace/skills/tavily-search/scripts/search.mjs "${query}" -n 5 --topic news --days 1`;
  
  try {
    console.log(`🔍 Executing today's search: ${cmd}`);
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
    const answerMatch = rawResult.match(/## Answer\s*([\s\S]*?)(?=## Sources|$)/);
    const sourcesMatch = rawResult.match(/## Sources\s*([\s\S]*)/);
    
    const answer = answerMatch ? answerMatch[1].trim() : '';
    
    const sources = [];
    if (sourcesMatch && sourcesMatch[1]) {
      const sourceLines = sourcesMatch[1].split('\n');
      for (const line of sourceLines) {
        if (line.trim().startsWith('- **') && line.includes(')')) {
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

// 将内容转换为丰富的 Markdown 格式
const createRichMarkdownContent = (originalContent, sources, title) => {
  const date = new Date().toISOString().split('T')[0];
  
  // 创建表格形式的元数据
  let markdownContent = `# ${title}\n\n`;
  
  markdownContent += `## 📊 文章信息\n\n`;
  markdownContent += `| 属性 | 值 |\n`;
  markdownContent += `|------|-----|\n`;
  markdownContent += `| 日期 | ${date} |\n`;
  markdownContent += `| 类型 | OpenClaw 相关新闻/动态 |\n`;
  markdownContent += `| 字符数 | ${countChineseCharacters(originalContent)} 中文字符 |\n\n`;
  
  // 主要内容
  markdownContent += `## 📝 内容摘要\n\n${originalContent}\n\n`;
  
  // 来源表格
  if (sources && sources.length > 0) {
    markdownContent += `## 🔗 信息来源\n\n`;
    markdownContent += `| 序号 | 标题 | 链接 |\n`;
    markdownContent += `|------|------|------|\n`;
    sources.forEach((source, index) => {
      markdownContent += `| ${index + 1} | ${source.title} | [访问链接](${source.url}) |\n`;
    });
    markdownContent += `\n`;
  }
  
  // 添加代码块示例（如果相关内容涉及技术）
  if (originalContent.includes('配置') || originalContent.includes('安装') || originalContent.includes('代码')) {
    markdownContent += `## 💻 相关代码示例\n\n`;
    markdownContent += '```bash\n# OpenClaw 安装命令示例\nnpm install -g openclaw\n\n# 启动 OpenClaw\nopenclaw start\n```\n\n';
  }
  
  markdownContent += `> **ℹ️ 说明**: 此内容于 ${date} 自动抓取并处理，已根据 OpenClaw 相关性进行过滤，并确保内容长度超过200字。\n\n`;
  
  return markdownContent;
};

// 抓取并处理当天的内容
const fetchTodayContent = async () => {
  if (!process.env.TAVILY_API_KEY) {
    console.error('❌ TAVILY_API_KEY environment variable is not set!');
    process.exit(1);
  }
  
  const today = new Date().toISOString().split('T')[0];
  const tmpBaseDir = path.join(__dirname, '..', 'content', 'tmp', today);
  ensureDir(tmpBaseDir);
  
  console.log(`🚀 Starting OpenClaw enhanced content fetch for ${today}`);
  
  // 只搜索当天的新闻和动态
  const queries = [
    "OpenClaw AI assistant framework",
    "OpenClaw open source AI agent", 
    "OpenClaw personal assistant AI",
    "OpenClaw latest news",
    "OpenClaw recent developments"
  ];
  
  let createdFiles = 0;
  
  for (const query of queries) {
    try {
      console.log(`🔍 Fetching today's content with query: "${query}"`);
      const rawResult = tavilySearchToday(query);
      const parsedResult = parseTavilyMarkdownResults(rawResult);
      
      if (!parsedResult.answer && (!parsedResult.sources || parsedResult.sources.length === 0)) {
        console.log(`⏭️  No content found for query: "${query}"`);
        continue;
      }
      
      // 调用 AI 翻译脚本
      const tempInputFile = `/tmp/openclaw-translate-input-${Date.now()}.txt`;
      const tempOutputFile = `/tmp/openclaw-translate-output-${Date.now()}.txt`;
      
      fs.writeFileSync(tempInputFile, parsedResult.answer, 'utf8');
      
      try {
        execSync(`node /root/.openclaw/workspace/projects/openclawcn/scripts/translate-content-ai.mjs "${tempInputFile}" "${tempOutputFile}"`, { stdio: 'inherit' });
        const translatedContent = fs.readFileSync(tempOutputFile, 'utf8');
        
        // 验证内容是否有效（相关且足够长）
        if (!isContentValid(parsedResult.answer, translatedContent, parsedResult.sources)) {
          console.log(`⏭️  Content not valid for query: "${query}"`);
          continue;
        }
        
        // 生成文章标题
        const articleTitle = `OpenClaw ${today} 新闻动态`;
        
        // 创建丰富的 Markdown 内容
        const richMarkdown = createRichMarkdownContent(translatedContent, parsedResult.sources, articleTitle);
        
        // 生成基于内容的文件名
        const filename = generateContentBasedFilename(articleTitle, translatedContent, 'news');
        const filePath = path.join(tmpBaseDir, filename);
        
        // 写入文件
        fs.writeFileSync(filePath, richMarkdown, 'utf8');
        console.log(`✅ Created file: ${filePath}`);
        createdFiles++;
        
      } catch (translateError) {
        console.error(`❌ Translation failed for query "${query}":`, translateError.message);
        continue;
      } finally {
        // 清理临时文件
        try {
          fs.unlinkSync(tempInputFile);
          fs.unlinkSync(tempOutputFile);
        } catch (cleanupError) {
          // 忽略清理错误
        }
      }
      
    } catch (error) {
      console.error(`❌ Error processing query "${query}":`, error.message);
    }
  }
  
  if (createdFiles > 0) {
    console.log(`✅ Enhanced content fetch completed successfully! Created ${createdFiles} files in ${tmpBaseDir}`);
  } else {
    console.log('ℹ️  No valid content found for today');
  }
  
  return createdFiles;
};

// 执行主函数
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fetchTodayContent().catch(error => {
    console.error('❌ Fatal error during enhanced content fetch:', error);
    process.exit(1);
  });
}