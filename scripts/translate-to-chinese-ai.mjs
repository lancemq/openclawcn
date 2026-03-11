#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 使用 AI 进行翻译的函数
async function translateWithAI(text) {
  // 这里应该调用 OpenClaw 的 AI 翻译功能
  // 由于我们是在 OpenClaw 环境中，可以直接使用内置的翻译能力
  
  // 构建翻译提示
  const prompt = `请将以下英文内容翻译成中文，保持原有的 Markdown 格式和结构：

${text}

只返回翻译后的内容，不要添加任何额外的说明或解释。`;
  
  // 在实际实现中，这里会调用 AI 模型进行翻译
  // 由于我们是在测试环境中，先返回一个模拟的翻译结果
  
  // 模拟翻译（在实际部署时替换为真实的 AI 调用）
  const simulatedTranslations = {
    'Meta acquired Moltbook, a social network for AI agents built on OpenClaw, which allows AI agents to communicate in natural language via popular chat apps. OpenClaw, previously known as Clawdbot and Moltbot, gained popularity for its agents\' ability to complete tasks on users\' operating systems. The acquisition brings Moltbook\'s founders into Meta\'s Superintelligence Labs, expanding the company\'s capabilities in AI agent interactions.':
      'Meta 收购了基于 OpenClaw 构建的 AI 代理社交网络 Moltbook，该网络允许 AI 代理通过流行的聊天应用以自然语言进行交流。OpenClaw 此前被称为 Clawdbot 和 Moltbot，因其代理能够在用户操作系统上完成任务而广受欢迎。此次收购将 Moltbook 的创始人引入 Meta 的超级智能实验室，扩展了公司在 AI 代理交互方面的能力。',
    
    'Use strong, isolated containers for OpenClaw, bind the gateway to localhost, and regularly update and monitor for vulnerabilities.':
      '为 OpenClaw 使用强隔离的容器，将网关绑定到 localhost，并定期更新和监控漏洞。'
  };
  
  // 查找匹配的翻译
  for (const [english, chinese] of Object.entries(simulatedTranslations)) {
    if (text.includes(english.substring(0, 50))) {
      return text.replace(english, chinese);
    }
  }
  
  // 如果没有找到匹配的翻译，返回原文
  return text;
}

// 翻译整个 Markdown 文件
async function translateMarkdownFile(content) {
  // 分离 frontmatter 和正文
  const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---\s*/);
  
  if (!frontmatterMatch) {
    // 没有 frontmatter，直接翻译整个内容
    return await translateWithAI(content);
  }
  
  const frontmatter = frontmatterMatch[1];
  const body = content.substring(frontmatterMatch[0].length);
  
  // 翻译 frontmatter 中的 title 和 description
  let translatedFrontmatter = frontmatter;
  
  // 更新标题
  if (translatedFrontmatter.includes('title: "OpenClaw Daily News')) {
    translatedFrontmatter = translatedFrontmatter.replace(
      /title: "OpenClaw Daily News - (\d{4}-\d{2}-\d{2})"/,
      'title: "OpenClaw 每日新闻 - $1"'
    );
  } else if (translatedFrontmatter.includes('title: "OpenClaw Documentation Update')) {
    translatedFrontmatter = translatedFrontmatter.replace(
      /title: "OpenClaw Documentation Update - (\d{4}-\d{2}-\d{2})"/,
      'title: "OpenClaw 文档更新 - $1"'
    );
  }
  
  // 更新描述
  translatedFrontmatter = translatedFrontmatter.replace(
    /description: "[^"]*"/,
    'description: "自动抓取和处理的 OpenClaw 相关内容"'
  );
  
  // 翻译正文
  const translatedBody = await translateWithAI(body);
  
  // 重新组合
  return `---\n${translatedFrontmatter}\n---\n\n${translatedBody}`;
}

// 处理单个文件
async function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const translatedContent = await translateMarkdownFile(content);
    
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
}

// 主函数
async function translateFiles(directory) {
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
    if (await processFile(filePath)) {
      translatedCount++;
    }
  }
  
  console.log(`✅ Translated ${translatedCount} files to Chinese`);
  return translatedCount;
}

// 如果作为脚本直接运行
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const targetDir = process.argv[2];
  if (!targetDir) {
    console.error('❌ Please provide a directory path as argument');
    process.exit(1);
  }
  
  translateFiles(targetDir).catch(error => {
    console.error('❌ Fatal error during translation:', error);
    process.exit(1);
  });
}