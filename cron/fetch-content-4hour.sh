#!/bin/bash

# OpenClawCN 每4小时内容抓取任务（增强版）
# 这个脚本每4小时执行一次，从网络抓取OpenClaw相关内容

set -e

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# 切换到项目目录
cd "$PROJECT_ROOT"

# 设置环境变量
export NODE_ENV=production
export TZ=Asia/Shanghai
export TAVILY_API_KEY="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"
export DINGTALK_WEBHOOK_URL="https://oapi.dingtalk.com/robot/send?access_token=your-token-here"

# 记录开始时间
echo "$(date): 开始执行OpenClaw内容抓取任务"

# 执行抓取脚本（使用增强版）
if command -v bun &> /dev/null; then
    bun run scripts/fetch-openclaw-enhanced-content.mjs
elif command -v node &> /dev/null; then
    node scripts/fetch-openclaw-enhanced-content.mjs
else
    echo "错误: 未找到 Node.js 或 Bun 运行时"
    exit 1
fi

# 验证内容
echo "$(date): 验证抓取的内容"
npm run content:check

# 如果有新内容，自动提交到git（可选）
if [[ -n $(git status --porcelain) ]]; then
    echo "$(date): 发现新内容，准备提交"
    git add content/
    git config --global user.email "bot@openclaw.cn"
    git config --global user.name "OpenClaw Bot"
    git commit -m "feat(content): 自动抓取新内容 $(date +%Y-%m-%d-%H:%M)"
    echo "$(date): 内容已提交到本地仓库"
fi

# 发送钉钉通知
if [[ -n "$DINGTALK_WEBHOOK_URL" && "$DINGTALK_WEBHOOK_URL" != "https://oapi.dingtalk.com/robot/send?access_token=your-token-here" ]]; then
    echo "$(date): 发送钉钉通知"
    # 这里可以添加钉钉通知逻辑
else
    echo "警告: 未设置 DINGTALK_WEBHOOK_URL，跳过钉钉通知"
fi

echo "$(date): OpenClaw内容抓取任务完成"