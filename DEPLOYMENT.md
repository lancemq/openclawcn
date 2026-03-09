# OpenClawCN 内容自动化部署指南

## 每小时内容抓取任务设置

### 1. 本地开发环境设置

#### 使用 crontab (Linux/macOS)

1. 打开终端并运行 `crontab -e`
2. 添加以下行来设置每4小时执行：

```bash
0 */4 * * * cd /path/to/your/openclawcn && npm run content:fetch >> /var/log/openclaw-content-fetch.log 2>&1
```

3. 保存并退出

#### 使用 Windows 任务计划程序

1. 打开任务计划程序
2. 创建基本任务
3. 设置触发器为"每天"，重复任务间隔为"1小时"
4. 操作选择"启动程序"，程序为 `cmd.exe`，参数为：
   ```
   /c "cd /path/to/your/openclawcn && npm run content:fetch >> C:\logs\openclaw-content-fetch.log 2>&1"
   ```

### 2. Vercel 部署环境设置

Vercel 不支持传统的 cron 作业，但可以通过以下方式实现：

#### 方案 A: 使用 Vercel Cron Jobs (推荐)

1. 在 Vercel 项目设置中添加 Cron Job
2. URL: `https://your-domain.com/api/rebuild`
3. Schedule: `0 * * * *` (每小时)
4. 确保 `server/api/rebuild.post.ts` 已正确配置

#### 方案 B: 使用第三方 Cron 服务

1. 注册 [cron-job.org](https://cron-job.org) 或类似服务
2. 设置每小时 HTTP 请求到您的 Vercel 函数端点
3. URL: `https://your-openclawcn.vercel.app/api/rebuild`

### 3. 脚本说明

#### 主要命令
- `npm run content:fetch` - 执行内容抓取脚本
- `npm run content:check` - 验证和生成内容清单

#### 日志管理
- 建议将日志输出到文件以便调试
- 定期清理旧日志文件

### 4. 故障排除

#### 常见问题
1. **权限问题**: 确保脚本有执行权限 (`chmod +x`)
2. **路径问题**: 使用绝对路径或确保工作目录正确
3. **依赖问题**: 确保 Node.js 和 npm 版本兼容
4. **网络问题**: 确保服务器可以访问外部网络

#### 调试步骤
1. 手动运行 `npm run content:fetch` 测试脚本
2. 检查生成的日志文件
3. 验证生成的 Markdown 文件格式是否正确
4. 确认内容验证通过 (`npm run content:validate`)

### 5. 监控和维护

#### 监控指标
- 脚本执行成功率
- 生成内容的数量和质量
- 内容验证通过率
- 网站构建成功率

#### 维护任务
- 定期更新抓取源配置 (`config/content-sources.json`)
- 监控 API 配额使用情况
- 更新内容模板和格式
- 优化抓取算法和过滤规则

### 6. 安全考虑

#### API 密钥管理
- 不要在代码中硬编码 API 密钥
- 使用环境变量存储敏感信息
- 在 Vercel 中通过项目设置管理环境变量

#### 内容安全
- 对抓取的内容进行安全过滤
- 避免执行不可信的代码
- 定期审查生成的内容

### 7. 扩展功能

#### 自定义抓取源
编辑 `config/content-sources.json` 添加新的抓取源：

```json
{
  "news": [
    {
      "name": "custom-news-source",
      "url": "https://example.com/feed",
      "type": "rss"
    }
  ],
  "docs": [
    {
      "name": "custom-docs-source", 
      "query": "openclaw tutorial site:example.com",
      "type": "search"
    }
  ]
}
```

#### 内容后处理
可以在 `scripts/fetch-openclaw-content.mjs` 中添加自定义内容处理逻辑。

## 注意事项

- 每小时抓取可能会受到 API 配额限制
- 生成的内容需要人工审核后才能正式发布
- 建议在非高峰时段执行抓取任务
- 定期备份重要的内容文件