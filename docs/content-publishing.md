# 内容发布流程与自动更新

当前项目的内容发布流程已经拆成三层：校验、清单生成、自动重建。

## 1. 发布前校验

项目内置了两条内容脚本：

```bash
npm run content:validate
npm run content:manifest
```

组合执行：

```bash
npm run content:check
```

校验内容包括：
- Markdown frontmatter 必填字段是否完整
- 推荐字段是否缺失
- 新闻 `date` 是否符合 `YYYY-MM-DD`
- `updatedAt` 是否符合 `YYYY-MM-DD`
- `sourceType` 是否属于允许枚举
- `tags` 是否为数组格式
- 正文是否为空
- 内容路径是否重复

## 2. 构建时自动生成发布清单

执行 `npm run build` 时，会先自动运行：

```bash
npm run content:check
```

随后生成：

```text
public/generated/content-manifest.json
```

这个清单包含：
- 内容生成时间
- 文档 / 新闻 / 最佳实践数量
- 每个集合的路径与基础元信息
- `updatedAt / sourceType / tags / source`

可以通过以下接口查看运行时状态：
- `/api/health`
- `/api/publish-status`

## 3. 自动重建触发

如果后续接入外部内容源、自动化脚本或 CMS，可以调用：

```text
POST /api/rebuild
```

请求头二选一：

```text
Authorization: Bearer <CONTENT_REBUILD_TOKEN>
```

或：

```text
x-rebuild-token: <CONTENT_REBUILD_TOKEN>
```

请求体示例：

```json
{
  "source": "cms",
  "reason": "news-updated"
}
```

当配置了 `VERCEL_DEPLOY_HOOK_URL` 后，这个接口会转发到 Vercel Deploy Hook，触发一次新的构建与部署。

## 4. 环境变量

新增变量：

```bash
VERCEL_DEPLOY_HOOK_URL=
CONTENT_REBUILD_TOKEN=
```

建议：
- `CONTENT_REBUILD_TOKEN` 使用高强度随机字符串
- `VERCEL_DEPLOY_HOOK_URL` 使用 Vercel 项目里的 Deploy Hook
- Preview 与 Production 使用不同 token

## 5. 推荐发布流程

1. 修改 `content/` 下的 Markdown
2. 本地执行 `npm run build`
3. 检查 `/api/publish-status` 与 `public/generated/content-manifest.json`
4. 提交代码后由 Vercel Preview 验证
5. 合并主分支后发布到正式环境
6. 如果后续接外部内容源，则改为由外部系统调用 `/api/rebuild`

## 6. 推荐元数据标准

建议所有公开内容逐步统一到以下字段：

```yaml
title:
description:
category:
tags: [tag-a, tag-b]
updatedAt: 2026-03-11
sourceType: official
```

其中 `sourceType` 当前允许的值为：

```text
official
github
community
media
third-party
internal
```

补充说明：
- `news` 继续要求 `date`
- `news` 建议补 `source`
- `docs` 和 `best-practices` 建议逐步补齐 `updatedAt` 与 `sourceType`
