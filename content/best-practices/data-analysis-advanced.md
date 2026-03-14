---
title: 数据分析助手
description: 使用 OpenClaw 构建数据分析助手，实现报表生成、数据可视化、异常检测和智能洞察。
category: 数据分析
difficulty: 中级
updatedAt: 2026-03-13
sourceType: community
tags: [data-analysis, visualization, reporting, insights, analytics]
---

# 数据分析助手

本文介绍如何使用 OpenClaw 构建智能数据分析助手，让数据分析更高效、更智能。

## 核心场景

| 场景 | 描述 | 价值 |
|------|------|------|
| 报表生成 | 自动生成数据报表 | 节省 80% 报表制作时间 |
| 数据可视化 | 智能图表推荐与生成 | 降低可视化门槛 |
| 异常检测 | 自动发现数据异常 | 及时预警风险 |
| 智能洞察 | AI 驱动的数据解读 | 发现隐藏价值 |

## 数据连接

### 支持的数据源

```json
{
  "data_sources": {
    "databases": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis"
    ],
    "warehouses": [
      "Snowflake",
      "BigQuery",
      "Redshift",
      "ClickHouse"
    ],
    "files": [
      "CSV",
      "Excel",
      "JSON",
      "Parquet"
    ],
    "apis": [
      "REST API",
      "GraphQL",
      "Webhook"
    ]
  }
}
```

### 数据源配置

```json
{
  "connections": {
    "main_db": {
      "type": "postgresql",
      "host": "${DB_HOST}",
      "port": 5432,
      "database": "production",
      "username": "${DB_USER}",
      "password": "${DB_PASSWORD}"
    },
    "analytics": {
      "type": "bigquery",
      "project_id": "my-project",
      "credentials": "${GOOGLE_CREDENTIALS}"
    }
  }
}
```

### 自然语言查询

```python
async def nl_to_sql(question, schema):
    """自然语言转 SQL"""
    prompt = f"""
    将以下问题转换为 SQL 查询：

    问题：{question}

    数据库结构：
    {schema}

    要求：
    1. 生成标准 SQL
    2. 添加必要的 JOIN
    3. 考虑性能优化
    4. 添加注释说明

    返回 JSON：
    {{
        "sql": "SELECT ...",
        "explanation": "查询说明",
        "estimated_rows": 1000
    }}
    """

    return await generate_response(prompt)
```

## 报表生成

### 报表模板

```json
{
  "report_templates": {
    "daily_sales": {
      "name": "每日销售报表",
      "schedule": "0 8 * * *",
      "sections": [
        {
          "title": "销售概览",
          "type": "summary",
          "metrics": ["total_sales", "order_count", "avg_order_value"]
        },
        {
          "title": "销售趋势",
          "type": "chart",
          "chart_type": "line",
          "dimensions": ["date"],
          "metrics": ["sales"]
        },
        {
          "title": "商品排行",
          "type": "table",
          "dimensions": ["product_name"],
          "metrics": ["sales", "quantity"],
          "order_by": "sales DESC",
          "limit": 10
        }
      ]
    }
  }
}
```

### 自动报表生成

```python
async def generate_report(template_id, date_range):
    """生成报表"""
    template = await get_template(template_id)

    report_sections = []
    for section in template.sections:
        if section.type == "summary":
            data = await fetch_summary_metrics(section.metrics, date_range)
            content = await format_summary(data)

        elif section.type == "chart":
            data = await fetch_chart_data(section, date_range)
            chart = await generate_chart(data, section.chart_type)
            content = chart

        elif section.type == "table":
            data = await fetch_table_data(section, date_range)
            content = await format_table(data)

        report_sections.append({
            "title": section.title,
            "content": content
        })

    # 生成洞察
    insights = await generate_insights(report_sections)

    return {
        "title": template.name,
        "date_range": date_range,
        "sections": report_sections,
        "insights": insights
    }
```

### 报表分发

```json
{
  "distribution": {
    "channels": ["email", "slack", "feishu"],
    "recipients": {
      "email": ["manager@company.com", "team@company.com"],
      "slack": ["#sales-reports"],
      "feishu": ["oc_xxx"]
    },
    "format": ["pdf", "excel", "html"],
    "schedule": {
      "daily": "08:00",
      "weekly": "Monday 09:00",
      "monthly": "1st 10:00"
    }
  }
}
```

## 数据可视化

### 智能图表推荐

```python
async def recommend_chart(data_profile):
    """推荐最佳图表类型"""
    prompt = f"""
    根据数据特征推荐最佳可视化方式：

    数据特征：
    - 维度：{data_profile.dimensions}
    - 指标：{data_profile.metrics}
    - 数据量：{data_profile.row_count}
    - 时间跨度：{data_profile.time_span}

    推荐要求：
    1. 选择最直观的图表类型
    2. 说明推荐理由
    3. 提供配置建议

    返回 JSON：
    {{
        "chart_type": "line",
        "reason": "适合展示时间序列趋势",
        "config": {{
            "x": "date",
            "y": ["sales", "profit"],
            "colors": ["#4CAF50", "#2196F3"]
        }}
    }}
    """

    return await generate_response(prompt)
```

### 图表类型指南

| 数据类型 | 推荐图表 | 适用场景 |
|----------|----------|----------|
| 时间序列 | 折线图、面积图 | 趋势分析 |
| 对比分析 | 柱状图、条形图 | 类别比较 |
| 占比分析 | 饼图、环形图 | 构成分析 |
| 分布分析 | 直方图、箱线图 | 数据分布 |
| 关联分析 | 散点图、气泡图 | 相关性 |
| 地理数据 | 地图、热力图 | 区域分析 |

### 交互式图表

```json
{
  "chart_config": {
    "type": "line",
    "data": {
      "labels": ["Jan", "Feb", "Mar", "Apr", "May"],
      "datasets": [
        {
          "label": "销售额",
          "data": [100, 120, 150, 130, 180],
          "borderColor": "#4CAF50"
        }
      ]
    },
    "options": {
      "responsive": true,
      "plugins": {
        "tooltip": {
          "enabled": true
        },
        "zoom": {
          "enabled": true
        }
      },
      "scales": {
        "y": {
          "beginAtZero": true
        }
      }
    }
  }
}
```

## 异常检测

### 异常检测配置

```json
{
  "anomaly_detection": {
    "metrics": [
      {
        "name": "daily_revenue",
        "method": "zscore",
        "threshold": 3,
        "lookback_days": 30
      },
      {
        "name": "conversion_rate",
        "method": "isolation_forest",
        "sensitivity": 0.95
      },
      {
        "name": "error_rate",
        "method": "moving_average",
        "window": 7,
        "threshold": 2
      }
    ]
  }
}
```

### 异常检测算法

```python
async def detect_anomalies(metric, data):
    """检测数据异常"""
    if metric.method == "zscore":
        # Z-Score 方法
        mean = np.mean(data)
        std = np.std(data)
        anomalies = [
            (i, v) for i, v in enumerate(data)
            if abs((v - mean) / std) > metric.threshold
        ]

    elif metric.method == "isolation_forest":
        # 孤立森林
        clf = IsolationForest(contamination=0.1)
        predictions = clf.fit_predict(data.reshape(-1, 1))
        anomalies = [(i, data[i]) for i, p in enumerate(predictions) if p == -1]

    elif metric.method == "moving_average":
        # 移动平均
        ma = moving_average(data, metric.window)
        deviations = np.abs(data - ma)
        threshold = np.mean(deviations) * metric.threshold
        anomalies = [(i, data[i]) for i, d in enumerate(deviations) if d > threshold]

    return anomalies
```

### 异常告警

```json
{
  "workflow": {
    "id": "anomaly-alert",
    "name": "异常告警",
    "trigger": {
      "type": "event",
      "event": "anomaly.detected"
    },
    "steps": [
      {
        "id": "analyze",
        "type": "ai",
        "prompt": "分析以下数据异常：\n指标：{{event.metric}}\n异常值：{{event.value}}\n正常范围：{{event.normal_range}}\n\n给出可能原因和建议措施。"
      },
      {
        "id": "alert",
        "type": "action",
        "action": "sendAlert",
        "params": {
          "channel": "slack",
          "severity": "{{event.severity}}",
          "message": "⚠️ 数据异常告警\n\n指标：{{event.metric}}\n异常值：{{event.value}}\n分析：{{analyze.result}}"
        }
      }
    ]
  }
}
```

## 智能洞察

### 自动洞察生成

```python
async def generate_insights(data, context=None):
    """生成数据洞察"""
    prompt = f"""
    分析以下数据，生成洞察报告：

    数据摘要：
    {data.summary}

    关键指标：
    {data.key_metrics}

    趋势信息：
    {data.trends}

    {f'背景信息：{context}' if context else ''}

    要求：
    1. 识别关键变化和趋势
    2. 分析可能原因
    3. 提出行动建议
    4. 使用简洁专业的语言

    输出格式：
    ## 关键发现
    - 发现 1
    - 发现 2

    ## 原因分析
    - 分析 1
    - 分析 2

    ## 行动建议
    - 建议 1
    - 建议 2
    """

    return await generate_response(prompt)
```

### 对比分析

```python
async def compare_periods(current, previous):
    """期间对比分析"""
    changes = calculate_changes(current, previous)

    prompt = f"""
    对比分析两个时期的数据：

    当前期间：{current.period}
    对比期间：{previous.period}

    变化情况：
    {format_changes(changes)}

    请分析：
    1. 主要变化点
    2. 变化原因推测
    3. 需要关注的指标
    """

    return await generate_response(prompt)
```

### 预测分析

```python
async def forecast(metric, historical_data, periods=7):
    """预测分析"""
    # 时间序列预测
    model = Prophet()
    model.fit(historical_data)
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)

    # 生成预测报告
    prompt = f"""
    基于历史数据预测未来 {periods} 天的 {metric}：

    历史趋势：{summarize_trend(historical_data)}
    预测结果：{summarize_forecast(forecast)}

    请提供：
    1. 预测解读
    2. 置信度说明
    3. 风险提示
    """

    return await generate_response(prompt)
```

## 数据问答

### 自然语言问答

```json
{
  "workflow": {
    "id": "data-qa",
    "name": "数据问答",
    "steps": [
      {
        "id": "understand",
        "type": "ai",
        "prompt": "理解用户问题，提取关键信息：\n问题：{{user.question}}\n\n返回：\n- 意图\n- 时间范围\n- 指标\n- 维度"
      },
      {
        "id": "query",
        "type": "action",
        "action": "executeDataQuery",
        "params": {
          "intent": "{{understand.intent}}",
          "time_range": "{{understand.time_range}}",
          "metrics": "{{understand.metrics}}",
          "dimensions": "{{understand.dimensions}}"
        }
      },
      {
        "id": "answer",
        "type": "ai",
        "prompt": "根据查询结果回答用户问题：\n\n问题：{{user.question}}\n\n数据：{{query.result}}\n\n要求：\n1. 直接回答问题\n2. 提供数据支撑\n3. 必要时添加可视化建议"
      }
    ]
  }
}
```

### 常见问题示例

| 问题 | 处理方式 |
|------|----------|
| "昨天销售额多少" | 查询 → 直接回答 |
| "本周和上周对比" | 查询 → 对比分析 |
| "为什么今天订单少了" | 查询 → 归因分析 |
| "预测下月销量" | 预测 → 趋势解读 |

## 最佳实践

### 数据质量

1. **数据验证** - 定期检查数据完整性
2. **异常处理** - 建立异常数据处理流程
3. **版本控制** - 保留历史数据版本

### 报表设计

1. **目标明确** - 每个报表有清晰目标
2. **简洁直观** - 避免信息过载
3. **行动导向** - 提供可操作的建议

### 安全合规

1. **数据脱敏** - 敏感数据加密处理
2. **访问控制** - 按角色限制数据访问
3. **审计日志** - 记录所有数据操作

## 常见问题

### 查询速度慢

优化方案：

```json
{
  "optimization": {
    "use_cache": true,
    "pre_aggregate": true,
    "partition_tables": true,
    "index_columns": ["date", "user_id"]
  }
}
```

### 图表不直观

改进建议：

```json
{
  "visualization_tips": {
    "simplify": "减少图表元素",
    "highlight": "突出关键数据",
    "annotate": "添加必要注释"
  }
}
```

### 预测不准确

提升方法：

```json
{
  "forecast_improvement": {
    "more_data": "增加历史数据量",
    "seasonality": "考虑季节性因素",
    "external_factors": "纳入外部变量"
  }
}
```

## 下一步

- [自动化工作流](/best-practices/automation-workflows)
- [通知系统](/best-practices/notification-system)
- [监控告警](/best-practices/monitoring-alerting)