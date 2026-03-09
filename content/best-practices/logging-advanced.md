---
title: 日志管理与分析
description: 集中式日志管理、日志分析和日志可视化。
category: 运维管理
difficulty: 中级
---

# 日志管理与分析

本文介绍 OpenClaw 的日志管理和分析。

## 日志配置

### 基本配置

```json
{
  "logging": {
    "level": "info",
    "format": "json",
    "outputs": [
      {
        "type": "file",
        "path": "/var/log/openclaw/app.log"
      },
      {
        "type": "stdout",
        "format": "pretty"
      }
    ]
  }
}
```

### 日志级别

| 级别 | 说明 |
|------|------|
| debug | 调试信息 |
| info | 一般信息 |
| warning | 警告 |
| error | 错误 |
| critical | 严重错误 |

## 日志收集

### ELK Stack

```yaml
# docker-compose.yml
services:
  elasticsearch:
    image: elasticsearch:8.0.0
    environment:
      - discovery.type=single-node
  
  logstash:
    image: logstash:8.0.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
  
  kibana:
    image: kibana:8.0.0
    ports:
      - "5601:5601"
```

### Logstash 配置

```conf
input {
  file {
    path => "/var/log/openclaw/*.log"
    codec => json
  }
}

filter {
  mutate {
    add_field => { "environment" => "production" }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
  }
}
```

## 日志分析

### Kibana 仪表板

```json
{
  "dashboard": {
    "panels": [
      {
        "title": "错误趋势",
        "type": "line",
        "query": "level:error"
      },
      {
        "title": "请求量",
        "type": "metric",
        "query": "*"
      },
      {
        "title": "响应时间",
        "type": "histogram",
        "query": "duration:*"
      }
    ]
  }
}
```

### 日志查询

```bash
# 搜索错误
openclaw logs --search "error" --level error

# 按时间过滤
openclaw logs --since "1h"

# 按渠道过滤
openclaw logs --channel telegram

# 导出日志
openclaw logs --export errors.log
```

## 告警规则

### 错误告警

```json
{
  "alerts": {
    "error_rate": {
      "condition": "count(level:error) > 10 per minute",
      "action": "notify",
      "channels": ["email", "slack"]
    }
  }
}
```

## 下一步

- [监控配置](/best-practices/performance-tuning)
- [故障排除](/docs/reference/troubleshooting)
- [安全配置](/docs/operations/safety-basics)