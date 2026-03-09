---
title: 自定义技能开发实战
description: 从零开发一个完整的 OpenClaw 技能，包括结构设计、API 集成和发布流程。
category: 技能开发
difficulty: 中高级
---

# 自定义技能开发实战

本文通过一个实际案例，介绍从零开发 OpenClaw 技能的完整流程。

## 项目概述

### 技能功能

创建一个天气查询技能：
- 查询指定城市天气
- 预报未来几天天气
- 提供穿衣建议

### 技术栈

- Python 3.10+
- FastAPI
- OpenWeatherMap API

## 项目结构

```
weather-skill/
├── skill.yaml
├── handler.py
├── requirements.txt
├── tests/
│   └── test_handler.py
└── README.md
```

## skill.yaml 配置

```yaml
name: weather
version: 1.0.0
description:
  en: Get weather information for any city
  zh: 获取任意城市的天气信息
triggers:
  - "天气"
  - "weather"
  - "查天气"
  - "今天天气怎么样"
parameters:
  - name: city
    type: string
    required: true
    description: "城市名称"
  - name: days
    type: integer
    required: false
    default: 1
    description: "预报天数"
actions:
  - respond
  - canvas
permissions:
  - network
  - storage
```

## handler.py 实现

```python
import os
import httpx
from typing import Dict, Any

API_KEY = os.getenv("OPENWEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5"

class WeatherSkill:
    def __init__(self):
        self.name = "weather"
    
    async def handle(self, request) -> Dict[str, Any]:
        """处理天气查询请求"""
        params = request.parameters
        city = params.get("city")
        days = params.get("days", 1)
        
        if not city:
            return {
                "format": "text",
                "content": "请提供城市名称，例如：查询北京天气"
            }
        
        try:
            if days == 1:
                weather = await self.get_current_weather(city)
                return self.format_current(weather)
            else:
                forecast = await self.get_forecast(city, days)
                return self.format_forecast(forecast)
        except Exception as e:
            return {
                "format": "text",
                "content": f"查询失败：{str(e)}"
            }
    
    async def get_current_weather(self, city: str) -> Dict:
        """获取当前天气"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{BASE_URL}/weather",
                params={
                    "q": city,
                    "appid": API_KEY,
                    "units": "metric",
                    "lang": "zh_cn"
                }
            )
            response.raise_for_status()
            return response.json()
    
    async def get_forecast(self, city: str, days: int) -> Dict:
        """获取预报"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{BASE_URL}/forecast",
                params={
                    "q": city,
                    "appid": API_KEY,
                    "units": "metric",
                    "lang": "zh_cn",
                    "cnt": days * 8
                }
            )
            response.raise_for_status()
            return response.json()
    
    def format_current(self, data: Dict) -> Dict:
        """格式化当前天气"""
        weather = data["weather"][0]
        main = data["main"]
        
        content = f"""
🌤️ {data['name']} 当前天气

{weather['description']}
温度：{main['temp']}°C
体感：{main['feels_like']}°C
湿度：{main['humidity']}%
风速：{data['wind']['speed']} m/s
"""
        return {
            "format": "text",
            "content": content.strip()
        }
    
    def format_forecast(self, data: Dict) -> Dict:
        """格式化预报"""
        # 使用 Canvas 显示
        items = []
        for item in data["list"][:5]:
            items.append({
                "type": "text",
                "content": f"{item['dt_txt']}: {item['weather'][0]['description']} {item['main']['temp']}°C"
            })
        
        return {
            "format": "canvas",
            "components": [
                {
                    "type": "text",
                    "props": {
                        "content": "📅 天气预报",
                        "size": "xl",
                        "weight": "bold"
                    }
                },
                {
                    "type": "list",
                    "props": {"items": items}
                }
            ]
        }

# 导出技能实例
skill = WeatherSkill()
```

## requirements.txt

```
fastapi>=0.100.0
httpx>=0.24.0
pydantic>=2.0.0
```

## 测试用例

```python
import pytest
from handler import WeatherSkill

@pytest.fixture
def skill():
    return WeatherSkill()

@pytest.mark.asyncio
async def test_handle_no_city(skill):
    request = Mock(parameters={})
    response = await skill.handle(request)
    assert "请提供城市名称" in response["content"]

@pytest.mark.asyncio
async def test_handle_invalid_city(skill):
    request = Mock(parameters={"city": "invalid_city_xyz"})
    with pytest.raises(Exception):
        await skill.handle(request)
```

## 本地测试

```bash
# 安装依赖
pip install -r requirements.txt

# 设置环境变量
export OPENWEATHER_API_KEY=your_api_key

# 测试技能
openclaw skills test weather --input "北京天气怎么样"
```

## 发布技能

### 打包

```bash
openclaw skills pack weather-skill -o weather-skill.ocpkg
```

### 发布到 ClawHub

```bash
openclaw skills publish weather-skill.ocpkg
```

## 使用技能

### 在聊天中使用

```
用户：明天上海天气怎么样
助手：[天气技能返回预报结果]
```

### 在代码中调用

```python
from openclaw import Skill

weather = Skill("weather")
result = await weather.execute(
    parameters={"city": "北京", "days": 3}
)
```

## 下一步

- [技能开发基础](/best-practices/skills-development)
- [技能进阶](/best-practices/skill-development-advanced)
- [API 参考](/docs/reference/api-reference-overview)