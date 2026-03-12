---
title: OpenClaw 家庭自动化应用
description: 使用 OpenClaw 构建智能家居控制中心，实现语音控制、自动化场景和设备管理。
category: 应用场景
difficulty: 中级
updatedAt: 2026-03-12
sourceType: third-party
tags: [smart-home, automation, home-assistant, iot]
---

# OpenClaw 家庭自动化应用

本文介绍如何使用 OpenClaw 构建智能家居控制中心，实现统一的家庭自动化管理。

## 架构概述

```text
┌─────────────────────────────────────────────┐
│                  OpenClaw                    │
│  ┌─────────┐  ┌─────────┐  ┌─────────────┐  │
│  │ 语音入口 │  │ 消息渠道 │  │ 自动化引擎  │  │
│  └────┬────┘  └────┬────┘  └──────┬──────┘  │
│       └────────────┼──────────────┘         │
│                    ▼                         │
│           ┌───────────────┐                 │
│           │  Home Assistant │                │
│           └───────┬───────┘                 │
└───────────────────┼─────────────────────────┘
                    ▼
    ┌───────────────────────────────────┐
    │         智能设备                   │
    │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
    │  │灯光 │ │空调 │ │窗帘 │ │安防 │  │
    │  └─────┘ └─────┘ └─────┘ └─────┘  │
    └───────────────────────────────────┘
```

## Home Assistant 集成

### 安装 Home Assistant 技能

```bash
openclaw skills install home-assistant
```

### 配置连接

```json
{
  "skills": {
    "home-assistant": {
      "enabled": true,
      "url": "http://homeassistant.local:8123",
      "token": "${HA_ACCESS_TOKEN}",
      "entities": {
        "lights": ["light.living_room", "light.bedroom"],
        "climate": ["climate.living_room_ac"],
        "sensors": ["sensor.temperature", "sensor.humidity"]
      }
    }
  }
}
```

### 获取 Access Token

1. 打开 Home Assistant
2. 进入 用户 → 安全 → 长期访问令牌
3. 创建新令牌
4. 复制令牌值

## 设备控制

### 灯光控制

```python
# 通过 OpenClaw 控制灯光
async def control_light(entity_id, action, **params):
    if action == "turn_on":
        await ha.call_service("light", "turn_on", {
            "entity_id": entity_id,
            **params
        })
    elif action == "turn_off":
        await ha.call_service("light", "turn_off", {
            "entity_id": entity_id
        })
    elif action == "toggle":
        await ha.call_service("light", "toggle", {
            "entity_id": entity_id
        })
```

### 空调控制

```python
async def control_climate(entity_id, temperature=None, mode=None):
    service_data = {"entity_id": entity_id}
    
    if temperature:
        service_data["temperature"] = temperature
    if mode:
        service_data["hvac_mode"] = mode
    
    await ha.call_service("climate", "set_temperature", service_data)
```

### 场景控制

```python
# 预设场景
scenes = {
    "morning": {
        "lights": {"brightness": 255, "color_temp": 400},
        "climate": {"temperature": 24, "mode": "cool"},
        "curtain": {"position": "open"}
    },
    "night": {
        "lights": {"brightness": 50, "color_temp": 300},
        "climate": {"temperature": 26, "mode": "cool"},
        "curtain": {"position": "closed"}
    },
    "movie": {
        "lights": {"brightness": 30, "rgb_color": [255, 100, 100]},
        "climate": {"temperature": 24},
        "curtain": {"position": "closed"}
    }
}

async def activate_scene(scene_name):
    scene = scenes.get(scene_name)
    if scene:
        for device, settings in scene.items():
            await apply_device_settings(device, settings)
```

## 语音控制

### 配置语音入口

```json
{
  "channels": {
    "voice": {
      "enabled": true,
      "wakeupWord": "小助手",
      "language": "zh-CN"
    }
  }
}
```

### 语音命令示例

| 命令 | 动作 |
|------|------|
| "打开客厅灯" | `light.living_room` turn_on |
| "关闭所有灯" | 所有灯光 turn_off |
| "空调调到 24 度" | 设置空调温度 |
| "开启观影模式" | 激活 movie 场景 |
| "晚安" | 激活 night 场景 |

### 意图识别

```json
{
  "intents": {
    "light_control": {
      "patterns": [
        "{action} {room} 灯",
        "把 {room} 的灯 {action}",
        "{room} 灯光 {action}"
      ],
      "slots": {
        "action": ["打开", "关闭", "调亮", "调暗"],
        "room": ["客厅", "卧室", "厨房", "书房"]
      }
    },
    "climate_control": {
      "patterns": [
        "把空调调到 {temperature} 度",
        "空调 {action}",
        "{room} 空调 {action}"
      ]
    }
  }
}
```

## 自动化场景

### 定时场景

```json
{
  "workflows": {
    "morning-routine": {
      "trigger": {
        "type": "schedule",
        "cron": "0 7 * * 1-5"
      },
      "steps": [
        {"action": "open_curtain"},
        {"action": "light_on", "params": {"brightness": 50}},
        {"action": "climate_set", "params": {"temperature": 24}},
        {"action": "play_music", "params": {"playlist": "morning"}}
      ]
    }
  }
}
```

### 条件触发

```json
{
  "workflows": {
    "auto-light": {
      "trigger": {
        "type": "event",
        "event": "motion_detected"
      },
      "condition": {
        "and": [
          {"sensor": "sun.sun", "state": "below_horizon"},
          {"sensor": "light.living_room", "state": "off"}
        ]
      },
      "steps": [
        {"action": "light_on", "params": {"entity": "light.living_room"}}
      ]
    }
  }
}
```

### 离家模式

```json
{
  "workflows": {
    "leave-home": {
      "trigger": {
        "type": "manual"
      },
      "steps": [
        {"action": "all_lights_off"},
        {"action": "all_climate_off"},
        {"action": "curtain_close"},
        {"action": "security_arm"},
        {"action": "notify", "params": {"message": "离家模式已启动"}}
      ]
    }
  }
}
```

## 安全监控

### 安防集成

```json
{
  "skills": {
    "security": {
      "enabled": true,
      "cameras": ["camera.door", "camera.garage"],
      "sensors": [
        "binary_sensor.door",
        "binary_sensor.window",
        "binary_sensor.motion"
      ],
      "alerts": {
        "enabled": true,
        "channels": ["telegram", "push"]
      }
    }
  }
}
```

### 异常告警

```python
async def handle_security_event(event):
    if event.type == "motion_detected" and is_arm_away():
        # 发送告警
        await send_alert(
            message=f"检测到移动: {event.location}",
            image=await get_camera_snapshot(event.camera)
        )
        
        # 触发警报
        await trigger_alarm()
```

## 能源管理

### 用电监控

```json
{
  "skills": {
    "energy-monitor": {
      "enabled": true,
      "sensors": [
        "sensor.power_consumption",
        "sensor.solar_production"
      ],
      "reporting": {
        "daily": true,
        "weekly": true
      }
    }
  }
}
```

### 智能调度

```python
async def optimize_energy():
    # 获取电价
    price = await get_electricity_price()
    
    # 获取太阳能发电
    solar = await get_solar_production()
    
    # 调整高耗能设备
    if solar > 1000:  # 太阳能充足
        await start_charging_ev()
        await run_appliance("washing_machine")
    elif price > 0.5:  # 电价高
        await defer_appliance("dishwasher")
```

## 常见问题

### Home Assistant 连接失败

检查：
- URL 是否正确
- Access Token 是否有效
- 网络是否可达

### 设备响应慢

优化：
- 使用本地连接
- 减少轮询频率
- 启用缓存

### 语音识别不准

改进：
- 使用高质量麦克风
- 减少环境噪音
- 自定义唤醒词

## 下一步

- [自动化工作流](/best-practices/automation-workflows)
- [语音助手设置](/best-practices/voice-assistant-setup)
- [安全最佳实践](/docs/operations/openclaw-security-best-practices)