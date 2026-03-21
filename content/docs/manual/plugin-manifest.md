---
title: 插件清单与配置校验
description: 基于最新官方文档，解释 openclaw.plugin.json 的必填字段、校验规则，以及为什么插件清单会直接影响配置是否可通过。
category: 功能
updatedAt: 2026-03-21
source: https://docs.openclaw.ai/plugins/manifest
sourceName: OpenClaw Docs
sourceType: official
tags: [plugins, manifest, schema, validation, configuration]
---

# 插件清单与配置校验

很多人会把插件理解成“装一个包，再写配置”。但 OpenClaw 现在的插件系统已经把配置校验前移到了插件发现阶段，这意味着插件清单本身就是正式接口的一部分。

官方要求每个插件根目录都带有 `openclaw.plugin.json`。Gateway 不需要先执行插件代码，就会先读取这个文件，确认插件 id、配置 schema 和能力声明是否有效。清单缺失或格式错误时，插件会被视为错误项，并直接阻塞配置校验。

## `openclaw.plugin.json` 最少要写什么

官方文档给出的最低要求非常明确：

- `id`：插件的规范 id，后续 `plugins.entries.<id>`、`allow`、`deny`、`slots` 都靠它匹配
- `configSchema`：插件配置的 JSON Schema，即使插件没有配置项，也必须提供对象 schema

一个最小可用示例如下：

```json
{
  "id": "voice-call",
  "configSchema": {
    "type": "object",
    "additionalProperties": false,
    "properties": {}
  }
}
```

如果插件作者省略了 schema，或者把 schema 写坏了，问题不会等到运行时才暴露，而会在配置读取和写入阶段就被拦住。

## 可选字段解决什么问题

在最低字段之外，官方还支持这些常见扩展信息：

- `kind`：标记插件类型，例如记忆类插件
- `channels`：声明这个插件注册了哪些渠道 id
- `providers`：声明新增的模型/能力 provider
- `skills`：声明要一起加载的 skills 目录
- `name` / `description`：给 CLI 或 UI 显示更友好的名称和说明
- `uiHints`：给配置界面提供标签、占位符、敏感字段提示
- `version`：记录插件版本信息

最值得注意的是 `channels` 和 `skills`。它们不只是注释，而会直接影响 Gateway 如何理解配置项和插件能力边界。

## 为什么这个文件会影响配置是否通过

现在的 OpenClaw 插件校验不是“装上就算”，而是“发现成功 + 清单合法 + schema 合法”三步一起成立，配置才算有效。

官方文档特别强调了几条规则：

- `channels.*` 下出现未知渠道 key 会报错，除非某个插件清单已经声明了对应 channel id
- `plugins.entries.<id>`、`plugins.allow`、`plugins.deny`、`plugins.slots.*` 都必须引用当前可发现的插件 id
- 插件已安装但清单损坏、缺失或 schema 非法时，配置校验会失败，Doctor 也会把它报出来
- 插件被禁用时，配置不会丢，只是保留并在日志与 Doctor 中提示

这意味着插件清单已经不是“给开发者看的元信息”，而是 Gateway 配置系统的一部分。

## 没有配置项的插件也要写 schema

这是一个非常容易被忽略的细节。官方要求即使插件没有任何可配项，也必须提供一个对象 schema。

更稳妥的写法通常是：

```json
{
  "type": "object",
  "additionalProperties": false
}
```

这样做有两个价值：

- 让配置层知道这个插件确实“不接受额外字段”
- 防止用户误把别的配置写进这个插件下却长期不自知

## 本地插件和文件系统加载也不能跳过

另一个重要变化是：即使你不是从 npm 安装，而是通过本地路径、工作区扩展目录或全局扩展目录加载插件，也同样必须带有清单文件。

也就是说，这条规则同时适用于：

- npm 安装的插件
- 工作区里的插件
- 本地私有插件
- 通过文件系统路径加载的扩展

如果你的团队内部有私有插件，最容易踩坑的地方往往不是运行逻辑，而是忘了把 manifest 和 schema 做完整。

## 实际排查时先看什么

如果插件“能看到但配不动”或者“配置一改就报错”，排查顺序建议是：

1. 先看 `openclaw plugins list`
2. 再看 `openclaw plugins inspect <id>` 或 `status`
3. 运行 `openclaw plugins doctor`
4. 确认插件根目录里是否真的存在 `openclaw.plugin.json`
5. 检查 `configSchema` 是否允许你当前写入的字段

如果你已经怀疑是清单问题，盲目重启 Gateway 的帮助通常不如先看 Doctor 和 schema。

## 对插件开发者的实际要求

如果你准备自己写插件，至少应该把这几件事当成正式交付物，而不是补充文件：

- 稳定的插件 id
- 可校验的 JSON Schema
- 明确声明新增的 channels/providers/skills
- 必要的版本和描述信息

如果插件还依赖原生模块，官方文档也建议把构建步骤和包管理器允许项写清楚，否则团队成员在安装和 CI 上很容易卡住。

## 中文站建议的阅读顺序

- 先看 [OpenClaw 插件系统怎么用](/docs/manual/plugins-overview)
- 再看 [配置参考](/docs/reference/configuration-reference)
- 如果要自己写插件，再继续补 [Tools 概览](/docs/manual/tools-overview)

把这几页连起来看，会比单独看 manifest 更容易理解“为什么一个插件清单会影响整个 Gateway 配置面”。
