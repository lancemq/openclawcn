---
title: Transcript 会话记录治理与归档策略
description: 结合官方 Transcript Hygiene 文档，整理一套会话记录的治理方法，帮助长期运行的 OpenClaw 实例控制存储增长、保障隐私合规。
category: 运维治理
difficulty: 中级
updatedAt: "2026-05-18"
source: https://docs.openclaw.ai/reference/transcript-hygiene
sourceName: OpenClaw Docs
sourceType: official
tags: [transcript, sessions, hygiene, privacy, compliance, operations]
---

# Transcript 会话记录治理与归档策略

OpenClaw 长期运行后，会话记录（transcript）会自然积累。如果不做治理，会带来三个问题：

1. **存储无限增长** - 每个对话都永久保留，磁盘迟早会满
2. **查询性能下降** - 搜索和索引的基数变大，响应变慢
3. **隐私合规风险** - 某些数据需要定期清理或脱敏

这篇指南帮你建立一套 transcript 治理策略。

## Transcript 在 OpenClaw 里存成什么样

OpenClaw 的会话记录通常以 JSONL 格式存储：

```
~/.openclaw/sessions/
├── session_abc123.jsonl
├── session_def456.jsonl
└── archive/
    ├── 2026-01/
    │   └── session_abc123.jsonl.gz
    └── 2026-02/
        └── session_def456.jsonl.gz
```

每条记录包含：

- 消息内容
- 时间戳
- 发送者信息
- 元数据（渠道、Agent ID 等）

## 三层治理策略

### 第一层：会话生命周期管理

不是每个会话都需要永久保留。合理的生命周期策略：

| 会话类型 | 保留策略 | 理由 |
|----------|----------|------|
| 临时测试对话 | 7 天后自动清理 | 无长期价值 |
| 普通用户对话 | 90 天后归档 | 兼顾支持和隐私 |
| 工作流执行记录 | 30 天后清理 | 通常只需看最近结果 |
| 重要项目对话 | 永久保留 | 有知识沉淀价值 |

在 OpenClaw 配置中，可以通过 session 策略实现：

```json
{
  "sessions": {
    "retention": {
      "default": "90d",
      "rules": [
        {
          "tag": "test",
          "retention": "7d"
        },
        {
          "tag": "project",
          "retention": "forever"
        }
      ]
    }
  }
}
```

### 第二层：Compaction 与压缩

OpenClaw 的 compaction 机制会自动处理长会话：

```json
{
  "memory": {
    "compaction": {
      "enabled": true,
      "trigger": "token_threshold",
      "threshold": 12000,
      "strategy": "summary"
    }
  }
}
```

Compaction 的作用：

- 当会话 token 数超过阈值时，自动压缩早期内容
- 把详细对话转成摘要，保留关键信息
- 释放上下文窗口，同时不丢失核心内容

但这只解决 "运行时内存" 的问题，不解决 "磁盘存储" 的问题。

### 第三层：归档与清理

对于磁盘上的旧会话文件，需要主动归档：

```bash
# 手动归档示例
find ~/.openclaw/sessions/ -name "*.jsonl" -mtime +90 \
  -exec gzip {} \; \
  -exec mv {}.gz ~/.openclaw/sessions/archive/$(date +%Y-%m)/ \;
```

更推荐的做法是用 OpenClaw 内置的归档能力（如果已启用）：

```json
{
  "sessions": {
    "archive": {
      "enabled": true,
      "after": "90d",
      "compress": true,
      "destination": "/var/backups/openclaw/sessions/"
    }
  }
}
```

## 隐私合规要点

如果你的 OpenClaw 实例处理敏感数据，transcript 治理需要额外注意：

### PII 检测与脱敏

在存储前对 transcript 进行扫描：

```json
{
  "sessions": {
    "hygiene": {
      "redactPII": true,
      "patterns": [
        "email",
        "phone",
        "ssn",
        "credit_card"
      ]
    }
  }
}
```

### 用户删除请求

某些法规（如 GDPR）要求支持用户删除请求。实现方式：

1. 按用户 ID 标记所有相关会话
2. 执行 `openclaw sessions purge --user <user_id>`
3. 确认索引中也已清除

### 访问审计

记录谁查看了哪些会话：

```json
{
  "sessions": {
    "audit": {
      "readAccess": true,
      "exportAccess": true
    }
  }
}
```

## 存储监控与告警

建立 transcript 存储的监控基线：

```bash
# 检查会话存储大小
du -sh ~/.openclaw/sessions/

# 检查会话数量
find ~/.openclaw/sessions/ -name "*.jsonl" | wc -l

# 检查最老的会话
ls -lt ~/.openclaw/sessions/*.jsonl | tail -5
```

建议的告警阈值：

| 指标 | 警告 | 严重 |
|------|------|------|
| 总会话存储大小 | > 10GB | > 50GB |
| 活跃会话数 | > 1000 | > 5000 |
| 最老未归档会话 | > 120 天 | > 180 天 |

## 定期维护检查单

每月执行一次：

- [ ] 检查存储增长趋势
- [ ] 确认归档任务正常执行
- [ ] 抽查几个归档文件是否可解压读取
- [ ] 检查是否有异常大的单个会话文件
- [ ] 确认 PII 脱敏规则仍覆盖新业务字段

每季度执行一次：

- [ ] 评估保留策略是否需要调整
- [ ] 测试会话恢复流程（从归档还原）
- [ ] 审查访问审计日志
- [ ] 清理已确认无用的测试会话

## 下一步

- [会话管理与配对](/docs/manual/session-and-pairing)
- [内存系统与索引刷新](/docs/manual/session-memory-search-and-index-refresh)
- [系统提示词与上下文压缩](/docs/manual/system-prompt-context-and-compaction)
- [预压缩内存刷新](/docs/operations/pre-compaction-memory-flush)
