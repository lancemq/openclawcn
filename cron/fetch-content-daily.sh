#!/bin/bash

# OpenClawCN 每日内容抓取任务
# 这个脚本每天执行一次，从网络抓取OpenClaw相关内容

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
echo "$(date): 开始执行OpenClaw每日内容抓取任务"

# 执行抓取脚本
if command -v bun &> /dev/null; then
    bun run scripts/fetch-openclaw-daily-content.mjs
elif command -v node &> /dev/null; then
    node scripts/fetch-openclaw-daily-content.mjs
else
    echo "错误: 未找到 Node.js 或 Bun 运行时"
    exit 1
fi

# 验证内容
echo "$(date): 验证抓取的内容"
npm run content:check

echo "$(date): OpenClaw每日内容抓取任务完成"