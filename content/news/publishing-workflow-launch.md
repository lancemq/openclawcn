---
title: 内容发布流程与自动更新已接入
description: 发布前校验、内容清单生成和自动重建接口已经补齐，站点开始具备更稳定的内容发布能力。
category: 站点更新
date: 2026-03-09
---

# 内容发布流程与自动更新已接入

这次推进的重点是把“写完内容之后怎么稳定上线”也纳入项目本身。

## 已补齐

- 内容 frontmatter 与正文校验脚本
- 构建时自动生成内容清单
- 发布状态接口
- 受 token 保护的自动重建接口

## 现在可以怎么验证

1. 运行 `npm run content:check`
2. 确认生成 `public/generated/content-manifest.json`
3. 打开 `/api/publish-status`
4. 配置好环境变量后调用 `/api/rebuild`
