---
title: 监控与告警系统
description: 建立完整的监控和告警系统，包括指标收集、告警规则和通知渠道。
category: 运维管理
difficulty: 中高级
updatedAt: 2026-03-11
sourceType: third-party
tags: [monitoring, alerting, metrics, operations]
---

# 监控与告警系统

本文介绍 OpenClaw 的监控和告警系统。

## 监控指标

### 系统指标

| 指标 | 说明 |
|------|------|
| cpu_usage | CPU 使用率 |
| memory_usage | 内存使用率 |
| disk_usage | 磁盘使用率 |
| network_io | 网络 I/O |

### 应用指标

| 指标 | 说明 |
|------|------|
| requests_total | 总请求数 |
| requests_duration | 请求响应时间 |
| active_sessions | 活跃会话数 |
| errors_total | 错误总数 |

## Prometheus 配置

### 指标端点

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'openclaw'
    static_configs:
      - targets: ['localhost:18789']
    metrics_path: '/metrics'
```

### 自定义指标

```python
from prometheus_client import Counter, Histogram

requests_total = Counter(
    'openclaw_requests_total',
    'Total requests',
    ['channel', 'status']
)

request_duration = Histogram(
    'openclaw_request_duration_seconds',
    'Request duration',
    ['channel']
)
```

## Grafana 仪表板

### 仪表板配置

```json
{
  "dashboard": {
    "title": "OpenClaw 监控",
    "panels": [
      {
        "title": "请求速率",
        "targets": [
          {
            "expr": "rate(openclaw_requests_total[5m])"
          }
        ]
      },
      {
        "title": "响应时间 P95",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, openclaw_request_duration_bucket)"
          }
        ]
      }
    ]
  }
}
```

## 告警配置

### 告警规则

```yaml
groups:
  - name: openclaw
    rules:
      - alert: HighErrorRate
        expr: rate(openclaw_errors_total[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "错误率过高"
          
      - alert: HighMemory
        expr: openclaw_memory_usage > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "内存使用率过高"
```

### 通知渠道

```yaml
route:
  receiver: 'default'
  routes:
    - match:
        severity: critical
      receiver: 'critical'

receivers:
  - name: 'default'
    email:
      to: 'admin@example.com'
      
  - name: 'critical'
    slack:
      webhook_url: '${SLACK_WEBHOOK}'
```

## 下一步

- [性能优化](/best-practices/performance-tuning)
- [日志管理](/best-practices/logging-advanced)
- [故障排除](/docs/reference/troubleshooting)
