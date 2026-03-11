#!/bin/bash

# OpenClawCN 每4小时内容抓取任务
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

# 记录开始时间
echo "$(date): 开始执行OpenClaw内容抓取任务"

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

# 发送钉钉通知
echo "$(date): 发送钉钉通知"
if [[ -n $(git status --porcelain) ]]; then
    # 有新内容
    MESSAGE="✅ OpenClaw 内容抓取任务完成！\n\n📅 时间: $(date)\n📁 新内容已保存到 content/tmp/ 目录\n\n请检查新抓取的内容并进行后续处理。"
else
    # 无新内容
    MESSAGE="ℹ️ OpenClaw 内容抓取任务完成\n\n📅 时间: $(date)\n🔍 未发现新的相关内容"
fi

# 使用 curl 发送钉钉消息（需要配置 webhook URL）
# 注意：你需要在 .env 文件中设置 DINGTALK_WEBHOOK_URL
if [[ -n "$DINGTALK_WEBHOOK_URL" ]]; then
    curl -H 'Content-Type: application/json' \
         -d "{\"msgtype\": \"text\", \"text\": {\"content\": \"$MESSAGE\"}}" \
         "$DINGTALK_WEBHOOK_URL" || echo "钉钉通知发送失败"
else
    echo "警告: 未设置 DINGTALK_WEBHOOK_URL，跳过钉钉通知"
fi

echo "$(date): OpenClaw内容抓取任务完成"