#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 简单的英文到中文翻译映射（实际应该使用真正的翻译API）
const translationMap = {
  // OpenClaw 相关内容
  'Meta acquired Moltbook, a social network for AI agents built on OpenClaw, which allows AI agents to communicate in natural language via popular chat apps. OpenClaw, previously known as Clawdbot and Moltbot, gained popularity for its agents\' ability to complete tasks on users\' operating systems. The acquisition brings Moltbook\'s founders into Meta\'s Superintelligence Labs, expanding the company\'s capabilities in AI agent interactions.':
    'Meta收购了基于OpenClaw构建的AI代理社交网络Moltbook，该网络允许AI代理通过流行的聊天应用以自然语言进行交流。OpenClaw此前被称为Clawdbot和Moltbot，因其代理能够在用户操作系统上完成任务而广受欢迎。此次收购将Moltbook的创始人引入Meta的超级智能实验室，扩展了公司在AI代理交互方面的能力。',
  
  'Use strong, isolated containers for OpenClaw, bind the gateway to localhost, and regularly update and monitor for vulnerabilities.':
    '为OpenClaw使用强隔离的容器，将网关绑定到localhost，并定期更新和监控漏洞。',

  'OpenClaw is an open-source autonomous AI agent that has gained significant attention for its ability to autonomously complete tasks and interact with the real world without continuous human guidance. It has been noted for its unrestricted and autonomous operating features, leading to its rapid spread and recognition as a prominent AI agent project. The technology community has shown growing interest in AI agents like OpenClaw, which could potentially disrupt traditional internet models by enabling direct service delivery without intermediaries. Additionally, OpenClaw has been used in various applications, including a social network where AI agents communicate with each other, and it has been acquired by Meta for its potential in enabling AI agents to work for people and businesses.':
    'OpenClaw是一个开源的自主AI代理，因其能够自主完成任务并与现实世界互动而无需持续的人类指导而受到广泛关注。它以其无限制和自主运行的特性而闻名，导致其快速传播并被认可为一个重要的AI代理项目。技术社区对像OpenClaw这样的AI代理表现出日益增长的兴趣，这些代理有可能通过实现无中介的直接服务交付来颠覆传统的互联网模式。此外，OpenClaw已被用于各种应用程序，包括一个AI代理相互交流的社交网络，并且已被Meta收购，以发挥其在使AI代理为个人和企业工作方面的潜力。',

  'OpenClaw is an open-source framework for creating personal AI assistants. It can automate tasks through messaging platforms like WhatsApp and Discord. For documentation and setup guides, visit DigitalOcean or freeCodeCamp.':
    'OpenClaw是一个用于创建个人AI助手的开源框架。它可以通过WhatsApp和Discord等消息平台自动化任务。有关文档和设置指南，请访问DigitalOcean或freeCodeCamp。'
};

// 完整翻译函数
function translateContentToChinese(content) {
  let translatedContent = content;
  
  // 翻译 frontmatter
  translatedContent = translatedContent
    .replace(/title: "OpenClaw Daily News/g, 'title: "OpenClaw 每日新闻')
    .replace(/title: "OpenClaw Documentation Update/g, 'title: "OpenClaw 文档更新')
    .replace(/description: "Automatically fetched and processed/g, 'description: "自动抓取和处理的')
    .replace(/category: "Product Updates"/g, 'category: "产品更新"')
    .replace(/category: "Technical Documentation"/g, 'category: "技术文档"')
    .replace(/Content Summary/g, '内容摘要')
    .replace(/Sources and References/g, '来源和参考')
    .replace(/Note:/g, '注意:')
    .replace(/This content was automatically fetched and processed on/g, '此内容于')
    .replace(/It has been filtered for relevance to OpenClaw and organized for publication/g, '已根据 OpenClaw 相关性进行过滤，并整理为发布格式');
  
  // 翻译具体内容
  for (const [english, chinese] of Object.entries(translationMap)) {
    if (translatedContent.includes(english)) {
      translatedContent = translatedContent.replace(english, chinese);
    }
  }
  
  return translatedContent;
}

// 处理单个文件
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const translatedContent = translateContentToChinese(content);
    
    // 如果内容有变化，保存新文件
    if (translatedContent !== content) {
      fs.writeFileSync(filePath, translatedContent, 'utf8');
      console.log(`✅ Fixed Chinese translation: ${filePath}`);
      return true;
    } else {
      console.log(`ℹ️  No changes needed: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing file ${filePath}:`, error.message);
    return false;
  }
}

// 处理目录中的所有文件
function processDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`📁 Directory ${directory} does not exist`);
    return 0;
  }
  
  const files = fs.readdirSync(directory).filter(file => 
    file.endsWith('.md')
  );
  
  let fixedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    if (processFile(filePath)) {
      fixedCount++;
    }
  }
  
  console.log(`✅ Fixed Chinese translation for ${fixedCount} files`);
  return fixedCount;
}

// 主函数
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const targetDir = process.argv[2] || '/root/.openclaw/workspace/projects/openclawcn/content/tmp/2026-03-11';
  processDirectory(targetDir);
}