---
title: 内容创作助手
description: 使用 OpenClaw 构建内容创作工作流，实现写作辅助、翻译、内容优化和多平台发布。
category: 内容创作
difficulty: 初级
updatedAt: 2026-03-13
sourceType: community
tags: [content, writing, translation, publishing, productivity]
---

# 内容创作助手

本文介绍如何使用 OpenClaw 构建完整的内容创作工作流，提升写作效率和质量。

## 核心场景

| 场景 | 描述 | 适用人群 |
|------|------|----------|
| 写作辅助 | 大纲生成、内容扩写、风格调整 | 博主、作者 |
| 多语言翻译 | 文档翻译、本地化适配 | 跨境团队 |
| 内容优化 | SEO 优化、可读性提升 | 内容运营 |
| 多平台发布 | 一键分发到多个平台 | 自媒体 |

## 写作辅助

### 大纲生成

```python
async def generate_outline(topic, style="professional"):
    """生成文章大纲"""
    prompt = f"""
    为以下主题生成文章大纲：

    主题：{topic}
    风格：{style}

    要求：
    1. 结构清晰，层次分明
    2. 每个章节有明确的小标题
    3. 预估每个章节的字数
    4. 标注需要补充的数据或案例

    输出格式：
    # 标题

    ## 一、章节名（约 X 字）
    - 要点 1
    - 要点 2

    ## 二、章节名（约 X 字）
    ...
    """

    return await generate_response(prompt)
```

### 内容扩写

```json
{
  "workflow": {
    "id": "content-expansion",
    "name": "内容扩写",
    "trigger": {
      "type": "manual"
    },
    "steps": [
      {
        "id": "analyze",
        "type": "ai",
        "prompt": "分析以下大纲，确定扩写重点：\n{{outline}}"
      },
      {
        "id": "expand",
        "type": "ai",
        "prompt": "根据大纲和分析结果，扩写完整文章：\n\n大纲：{{outline}}\n\n分析：{{analyze.result}}\n\n要求：\n1. 保持专业风格\n2. 添加具体案例\n3. 控制在 2000-3000 字"
      }
    ]
  }
}
```

### 风格调整

```python
async def adjust_style(content, target_style):
    """调整写作风格"""
    style_prompts = {
        "professional": "使用专业、正式的语言，避免口语化表达",
        "casual": "使用轻松、亲切的语言，增加互动感",
        "academic": "使用学术语言，增加引用和论证",
        "storytelling": "使用故事化叙述，增加情节和人物"
    }

    prompt = f"""
    将以下内容调整为{target_style}风格：

    原文：
    {content}

    要求：
    {style_prompts.get(target_style, style_prompts['professional'])}

    保持原意不变，只调整表达方式。
    """

    return await generate_response(prompt)
```

### 写作模板

```json
{
  "templates": {
    "tech-article": {
      "name": "技术文章",
      "structure": [
        {
          "section": "引言",
          "content": "背景介绍、问题陈述、文章目标"
        },
        {
          "section": "核心概念",
          "content": "关键术语解释、原理说明"
        },
        {
          "section": "实现步骤",
          "content": "详细步骤、代码示例、注意事项"
        },
        {
          "section": "最佳实践",
          "content": "经验总结、常见问题、优化建议"
        },
        {
          "section": "总结",
          "content": "要点回顾、后续展望"
        }
      ]
    },
    "product-review": {
      "name": "产品评测",
      "structure": [
        {"section": "产品概述", "content": "基本信息、定位"},
        {"section": "核心功能", "content": "功能列表、使用体验"},
        {"section": "优缺点分析", "content": "优点、缺点、适用场景"},
        {"section": "竞品对比", "content": "与同类产品对比"},
        {"section": "购买建议", "content": "适合人群、性价比分析"}
      ]
    },
    "tutorial": {
      "name": "教程指南",
      "structure": [
        {"section": "准备工作", "content": "环境要求、前置知识"},
        {"section": "步骤详解", "content": "分步骤说明"},
        {"section": "常见问题", "content": "FAQ"},
        {"section": "进阶技巧", "content": "高级用法"}
      ]
    }
  }
}
```

## 多语言翻译

### 配置翻译技能

```json
{
  "skills": {
    "translator": {
      "enabled": true,
      "languages": {
        "source": "auto",
        "target": ["zh-CN", "en", "ja", "ko"]
      },
      "options": {
        "preserve_format": true,
        "technical_terms": "keep",
        "context_aware": true
      }
    }
  }
}
```

### 翻译工作流

```python
async def translate_document(content, target_lang, context=None):
    """文档翻译"""
    prompt = f"""
    将以下内容翻译成{target_lang}：

    {content}

    要求：
    1. 保持原文格式不变
    2. 专业术语保持原文或使用标准译法
    3. 保持原文语气和风格
    4. 代码块内容不翻译

    {f'上下文：{context}' if context else ''}
    """

    return await generate_response(prompt)
```

### 本地化适配

```python
async def localize_content(content, target_region):
    """内容本地化"""
    localization_rules = {
        "zh-CN": {
            "date_format": "YYYY年MM月DD日",
            "currency": "CNY",
            "examples": "使用中国案例"
        },
        "en-US": {
            "date_format": "MM/DD/YYYY",
            "currency": "USD",
            "examples": "使用美国案例"
        },
        "ja": {
            "date_format": "YYYY年MM月DD日",
            "currency": "JPY",
            "examples": "使用日本案例"
        }
    }

    rules = localization_rules.get(target_region, {})

    prompt = f"""
    将以下内容本地化为{target_region}版本：

    {content}

    本地化要求：
    - 日期格式：{rules.get('date_format', '保持原样')}
    - 货币单位：{rules.get('currency', '保持原样')}
    - 案例：{rules.get('examples', '保持原样')}
    - 文化适配：避免文化敏感内容
    """

    return await generate_response(prompt)
```

### 术语管理

```json
{
  "terminology": {
    "AI": {
      "zh-CN": "人工智能",
      "ja": "人工知能",
      "keep_original": false
    },
    "API": {
      "zh-CN": "API",
      "ja": "API",
      "keep_original": true
    },
    "Machine Learning": {
      "zh-CN": "机器学习",
      "ja": "機械学習",
      "keep_original": false
    }
  }
}
```

## 内容优化

### SEO 优化

```python
async def optimize_seo(content, keywords):
    """SEO 内容优化"""
    prompt = f"""
    对以下内容进行 SEO 优化：

    {content}

    目标关键词：{', '.join(keywords)}

    优化要求：
    1. 标题包含主关键词
    2. 首段包含关键词
    3. 关键词密度 2-3%
    4. 添加相关长尾词
    5. 优化小标题结构
    6. 添加 meta 描述

    输出：
    - 优化后的标题
    - 优化后的内容
    - meta 描述（150字以内）
    - 建议的 URL slug
    """

    return await generate_response(prompt)
```

### 可读性优化

```json
{
  "workflow": {
    "id": "readability-check",
    "name": "可读性检查",
    "steps": [
      {
        "id": "analyze",
        "type": "ai",
        "prompt": "分析以下内容的可读性：\n{{content}}\n\n评估维度：\n1. 句子长度（建议 15-20 字）\n2. 段落长度（建议 3-5 句）\n3. 专业术语密度\n4. 逻辑连贯性\n5. 标点使用\n\n给出评分和改进建议。"
      },
      {
        "id": "improve",
        "type": "ai",
        "prompt": "根据分析结果优化内容：\n\n原文：{{content}}\n\n分析：{{analyze.result}}\n\n保持原意，提升可读性。"
      }
    ]
  }
}
```

### 内容去重

```python
async def check_duplicate(content):
    """检查内容重复度"""
    # 分段
    segments = split_content(content)

    duplicates = []
    for segment in segments:
        # 搜索相似内容
        similar = await search_similar_content(segment)
        if similar.score > 0.8:
            duplicates.append({
                "segment": segment,
                "similar_to": similar.source,
                "score": similar.score
            })

    return {
        "duplicate_ratio": len(duplicates) / len(segments),
        "details": duplicates
    }
```

## 多平台发布

### 平台配置

```json
{
  "publishing": {
    "platforms": {
      "wechat": {
        "enabled": true,
        "type": "official_account",
        "features": ["图文", "视频"]
      },
      "zhihu": {
        "enabled": true,
        "type": "article",
        "features": ["文章", "回答", "想法"]
      },
      "juejin": {
        "enabled": true,
        "type": "article",
        "features": ["文章", "沸点"]
      },
      "xiaohongshu": {
        "enabled": true,
        "type": "note",
        "features": ["图文", "视频"]
      }
    }
  }
}
```

### 格式适配

```python
async def adapt_for_platform(content, platform):
    """适配不同平台格式"""
    platform_rules = {
        "wechat": {
            "max_length": 20000,
            "image_required": True,
            "title_max": 64,
            "format": "富文本"
        },
        "zhihu": {
            "max_length": 50000,
            "image_required": False,
            "title_max": 50,
            "format": "markdown"
        },
        "xiaohongshu": {
            "max_length": 1000,
            "image_required": True,
            "image_count": "3-9张",
            "format": "纯文本+图片"
        }
    }

    rules = platform_rules.get(platform, {})

    # 根据规则调整内容
    adapted = await adjust_content(content, rules)

    return adapted
```

### 一键发布

```json
{
  "workflow": {
    "id": "multi-platform-publish",
    "name": "多平台发布",
    "trigger": {
      "type": "manual"
    },
    "steps": [
      {
        "id": "prepare",
        "type": "action",
        "action": "prepareContent",
        "params": {
          "content": "{{input.content}}",
          "images": "{{input.images}}"
        }
      },
      {
        "id": "adapt-wechat",
        "type": "action",
        "action": "adaptContent",
        "params": {
          "platform": "wechat"
        }
      },
      {
        "id": "publish-wechat",
        "type": "action",
        "action": "publishToWechat",
        "params": {
          "title": "{{input.title}}",
          "content": "{{adapt-wechat.result}}"
        }
      },
      {
        "id": "adapt-xiaohongshu",
        "type": "action",
        "action": "adaptContent",
        "params": {
          "platform": "xiaohongshu"
        }
      },
      {
        "id": "publish-xiaohongshu",
        "type": "action",
        "action": "publishToXiaohongshu",
        "params": {
          "content": "{{adapt-xiaohongshu.result}}",
          "images": "{{input.images}}"
        }
      }
    ]
  }
}
```

## 内容日历

### 发布计划

```json
{
  "content_calendar": {
    "monday": {
      "platform": "知乎",
      "type": "技术文章",
      "time": "10:00"
    },
    "wednesday": {
      "platform": "微信公众号",
      "type": "深度分析",
      "time": "20:00"
    },
    "friday": {
      "platform": "小红书",
      "type": "经验分享",
      "time": "18:00"
    }
  }
}
```

### 自动提醒

```python
async def schedule_reminder(calendar):
    """发布提醒"""
    for day, plan in calendar.items():
        await create_reminder(
            day=day,
            time=plan["time"],
            message=f"今日发布计划：{plan['platform']} - {plan['type']}"
        )
```

## 最佳实践

### 写作效率

1. **先大纲后内容** - 避免写作迷失方向
2. **分块写作** - 每次专注一个章节
3. **定期复盘** - 分析数据优化内容

### 翻译质量

1. **建立术语库** - 保持翻译一致性
2. **人工审核** - AI 翻译后人工校对
3. **本地化测试** - 确保文化适配

### 多平台运营

1. **内容差异化** - 不同平台调整内容风格
2. **发布时间优化** - 根据平台用户活跃时间发布
3. **互动管理** - 及时回复评论和私信

## 常见问题

### 内容质量不稳定

建立内容检查清单：

```json
{
  "checklist": [
    "标题是否吸引人",
    "开头是否抓住读者",
    "结构是否清晰",
    "是否有具体案例",
    "结尾是否有行动号召"
  ]
}
```

### 翻译不准确

添加上下文和术语说明：

```json
{
  "translation_context": {
    "domain": "技术文档",
    "audience": "开发者",
    "tone": "专业"
  }
}
```

### 发布效率低

使用批量发布工具：

```bash
openclaw publish --platforms wechat,zhihu,juejin --content article.md
```

## 下一步

- [自动化工作流](/best-practices/automation-workflows)
- [通知系统](/best-practices/notification-system)
- [中文优化](/best-practices/chinese-optimization)