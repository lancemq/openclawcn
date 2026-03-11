---
title: 数据分析与可视化
description: 使用 OpenClaw 进行数据分析，包括数据收集、处理和可视化展示。
category: 数据处理
difficulty: 中级
updatedAt: 2026-03-11
sourceType: third-party
tags: [data, analysis, visualization, workflows]
---

# 数据分析与可视化

本文介绍如何使用 OpenClaw 进行数据分析和可视化。

## 数据收集

### 数据源配置

```json
{
  "data_sources": {
    "api": {
      "type": "rest",
      "url": "https://api.example.com/data",
      "auth": "api_key"
    },
    "database": {
      "type": "postgresql",
      "connection": "postgresql://user:pass@localhost/db"
    },
    "file": {
      "type": "csv",
      "path": "/data/*.csv"
    }
  }
}
```

### 数据抓取

```python
async def collect_data(source, query):
    if source.type == "api":
        return await fetch_from_api(query)
    elif source.type == "database":
        return await query_database(query)
    elif source.type == "file":
        return await read_file(query)
```

## 数据处理

### 数据清洗

```python
def clean_data(data):
    # 去除空值
    data = data.dropna()
    
    # 去除重复
    data = data.drop_duplicates()
    
    # 数据类型转换
    data['date'] = pd.to_datetime(data['date'])
    
    return data
```

### 数据转换

```python
def transform_data(data):
    # 聚合
    aggregated = data.groupby('category').agg({
        'value': 'sum',
        'count': 'mean'
    })
    
    # 透视表
    pivot = data.pivot_table(
        index='date',
        columns='category',
        values='value'
    )
    
    return aggregated, pivot
```

## 数据可视化

### 图表类型

| 图表 | 适用场景 |
|------|----------|
| 折线图 | 趋势变化 |
| 柱状图 | 对比分析 |
| 饼图 | 占比分析 |
| 散点图 | 相关性分析 |
| 热力图 | 密度分布 |

### Canvas 展示

```python
def create_chart(data, chart_type):
    return {
        "type": "chart",
        "chartType": chart_type,
        "data": data,
        "options": {
            "responsive": True,
            "plugins": {
                "legend": {"position": "top"}
            }
        }
    }
```

## 自动化报告

### 报告生成

```python
async def generate_report(data):
    # 数据分析
    analysis = analyze_data(data)
    
    # 生成图表
    charts = [create_chart(d, 'line') for d in analysis]
    
    # 生成报告
    report = {
        "title": "数据分析报告",
        "date": datetime.now(),
        "summary": analysis.summary,
        "charts": charts
    }
    
    return report
```

## 下一步

- [Canvas 开发](/best-practices/canvas-interactive)
- [自动化工作流](/best-practices/automation-workflows)
- [技能开发](/best-practices/skills-development)
