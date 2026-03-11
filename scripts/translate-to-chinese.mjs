#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 翻译内容为中文
const translateToChinese = (content) => {
  // 使用 OpenClaw 的翻译功能
  try {
    // 提取 Markdown 内容部分（不包括 frontmatter）
    const contentMatch = content.match(/---\s*[\s\S]*?---\s*([\s\S]*)/);
    if (!contentMatch) {
      console.log('⚠️  No content found to translate');
      return content;
    }
    
    const markdownContent = contentMatch[1];
    
    // 调用翻译命令
    const translateCmd = `echo '${JSON.stringify(markdownContent)}' | node -e "
      const content = JSON.parse(fs.readFileSync(0, 'utf8'));
      // 这里模拟翻译，实际应该调用真正的翻译 API
      // 由于我们没有真实的翻译 API，这里只是演示结构
      console.log(content.replace(/OpenClaw/g, 'OpenClaw').replace(/Daily News/g, '每日新闻').replace(/Documentation Update/g, '文档更新'));
    "`;
    
    // 实际的翻译实现应该使用真实的翻译服务
    // 例如：DeepL API, Google Translate API, 或其他翻译服务
    
    // 为了演示，我们创建一个简单的翻译映射
    const simpleTranslations = {
      'OpenClaw Daily News': 'OpenClaw 每日新闻',
      'OpenClaw Documentation Update': 'OpenClaw 文档更新',
      'Content Summary': '内容摘要',
      'Sources and References': '来源和参考',
      'Automatically fetched and processed': '自动抓取和处理',
      'filtered for relevance to OpenClaw': '已过滤与 OpenClaw 相关的内容',
      'organized for publication': '已整理用于发布',
      'Note': '注意',
      'This content was automatically fetched and processed on': '此内容于',
      'It has been filtered for relevance to OpenClaw and organized for publication': '已过滤与 OpenClaw 相关的内容并整理用于发布'
    };
    
    let translatedContent = markdownContent;
    for (const [english, chinese] of Object.entries(simpleTranslations)) {
      const regex = new RegExp(english, 'g');
      translatedContent = translatedContent.replace(regex, chinese);
    }
    
    // 重新组合 frontmatter 和翻译后的内容
    const frontmatterMatch = content.match(/(^---\s*[\s\S]*?---\s*)/);
    if (frontmatterMatch) {
      // 更新 frontmatter 中的描述为中文
      let frontmatter = frontmatterMatch[1];
      frontmatter = frontmatter.replace(
        /description: "([^"]*)"/, 
        'description: "自动抓取和处理的 OpenClaw 相关内容"'
      );
      
      return frontmatter + translatedContent;
    }
    
    return translatedContent;
    
  } catch (error) {
    console.error('❌ Translation error:', error.message);
    return content; // 如果翻译失败，返回原文
  }
};

// 处理单个文件
const processFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const translatedContent = translateToChinese(content);
    
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
const translateFiles = (directory) => {
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
    if (processFile(filePath)) {
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
  
  translateFiles(targetDir);
}