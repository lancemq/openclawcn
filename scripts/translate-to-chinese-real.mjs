#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 简单的中英文翻译映射（用于演示）
const translationMap = {
  // 标题翻译
  'OpenClaw Daily News': 'OpenClaw 每日新闻',
  'OpenClaw Documentation Update': 'OpenClaw 文档更新',
  
  // 内容部分翻译
  'Content Summary': '内容摘要',
  'Sources and References': '来源和参考',
  'Latest Developments': '最新进展',
  'Technical Updates': '技术更新',
  'Key Topics Found': '发现的关键主题',
  'Search Summary': '搜索摘要',
  
  // 描述翻译
  'Daily automated news update for OpenClaw': 'OpenClaw 每日自动化新闻更新',
  'Automated documentation content for OpenClaw': 'OpenClaw 自动化文档内容',
  'Automatically fetched and processed news content about OpenClaw': '自动抓取和处理的关于 OpenClaw 的新闻内容',
  'Automatically fetched and processed docs content about OpenClaw': '自动抓取和处理的关于 OpenClaw 的文档内容',
  
  // 注释翻译
  'Note': '注意',
  'This is automatically generated content. Please review and edit as needed before publishing.': '这是自动生成的内容。请在发布前根据需要进行审核和编辑。',
  'This content was automatically fetched and processed on': '此内容于',
  'It has been filtered for relevance to OpenClaw and organized for publication.': '已过滤与 OpenClaw 相关的内容并整理用于发布。',
  
  // 类别翻译
  '产品更新': '产品更新',
  '技术文档': '技术文档',
  
  // 其他常见词汇
  'Automated content fetch completed at': '自动化内容抓取完成于',
  'based on web search results for OpenClaw': '基于 OpenClaw 的网络搜索结果',
  'Please review and edit as needed before publishing': '请在发布前根据需要进行审核和编辑'
};

// 翻译函数
const translateText = (text) => {
  let translated = text;
  
  // 按长度排序，先替换长的字符串，避免短字符串干扰
  const sortedKeys = Object.keys(translationMap).sort((a, b) => b.length - a.length);
  
  for (const key of sortedKeys) {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    translated = translated.replace(regex, translationMap[key]);
  }
  
  return translated;
};

// 处理 Markdown 文件
const translateMarkdownFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 翻译整个内容
    const translatedContent = translateText(content);
    
    // 创建中文版本文件名
    const dirName = path.dirname(filePath);
    const baseName = path.basename(filePath, '.md');
    const chineseFilePath = path.join(dirName, `${baseName}-zh.md`);
    
    fs.writeFileSync(chineseFilePath, translatedContent, 'utf8');
    console.log(`✅ Created Chinese version: ${chineseFilePath}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error processing file ${filePath}:`, error.message);
    return false;
  }
};

// 主函数
const translateDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    console.log(`📁 Directory ${directory} does not exist`);
    return 0;
  }
  
  const files = fs.readdirSync(directory).filter(file => 
    file.endsWith('.md') && !file.includes('-zh')
  );
  
  let translatedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    if (translateMarkdownFile(filePath)) {
      translatedCount++;
    }
  }
  
  console.log(`✅ Translated ${translatedCount} files to Chinese`);
  return translatedCount;
};

// 如果作为脚本直接运行
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const targetDir = process.argv[2];
  if (!targetDir) {
    console.error('❌ Please provide a directory path as argument');
    process.exit(1);
  }
  
  translateDirectory(targetDir);
}