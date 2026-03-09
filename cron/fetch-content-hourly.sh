#!/bin/bash

# OpenClawCN 每小时内容抓取任务
# 这个脚本每小时执行一次，从网络抓取OpenClaw相关内容

set -e

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# 切换到项目目录
cd "$PROJECT_ROOT"

# 设置环境变量
export NODE_ENV=production
export TZ=Asia/Shanghai

# 记录开始时间
echo "$(date): 开始执行OpenClaw内容抓取任务"

# 执行抓取脚本
if command -v bun &> /dev/null; then
    bun run scripts/fetch-openclaw-content.mjs
elif command -v node &> /dev/null; then
    node scripts/fetch-openclaw-content.mjs
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

echo "$(date): OpenClaw内容抓取任务完成"