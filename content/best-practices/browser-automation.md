---
title: 浏览器自动化实战
description: 利用 OpenClaw 的浏览器控制能力实现网页自动化，提升工作效率。
category: 进阶指南
difficulty: 中级
---

# 浏览器自动化实战

OpenClaw 支持通过专用 Chrome/Chromium 控制实现浏览器自动化。本文将分享如何利用这一能力实现日常工作自动化。

## 浏览器自动化能做什么

### 1. 自动化网页操作

- 自动填写表单
- 点击按钮和链接
- 滚动页面
- 截图和录屏

### 2. 数据抓取

- 提取网页内容
- 批量获取数据
- 定期监控信息变化

### 3. 工作流自动化

- 定时执行网页操作
- 批量处理任务
- 跨网站数据同步

## 使用场景举例

### 场景一：自动填表

```python
# 自动填写表单示例
browser.goto("https://example.com/form")
browser.fill("#name", "张三")
browser.fill("#email", "zhangsan@example.com")
browser.click("#submit")
browser.screenshot()
```

### 场景二：数据监控

```python
# 监控股票价格
browser.goto("https://finance.example.com/stock/AAPL")
price = browser.text(".stock-price")
if float(price) > threshold:
    send_alert(f"AAPL 突破 {threshold} 美元")
```

### 场景三：批量处理

```python
# 批量发送消息
for user in users:
    browser.goto(f"https://chat.example.com/user/{user}")
    browser.fill("#message", "Hello!")
    browser.click("#send")
```

## 基础操作

### 启动浏览器

```python
from openclaw import Browser

browser = Browser()
browser.launch(headless=False)  # headless=True 隐藏浏览器
```

### 导航

```python
browser.goto("https://example.com")
browser.back()
browser.forward()
browser.reload()
```

### 元素操作

```python
# 点击
browser.click("#button-id")
browser.click(".submit-button")

# 填写
browser.fill("#input-name", "value")
browser.fill("#textarea-content", "multi-line\ntext")

# 选择
browser.select("#dropdown", "option-value")
browser.check("#checkbox")
browser.uncheck("#checkbox")
```

### 获取内容

```python
# 文本
title = browser.text("h1")
content = browser.text(".article-content")

# 属性
link = browser.attr("a", "href")
image = browser.attr("img", "src")

# HTML
html = browser.html(".container")

# 截图
browser.screenshot("page.png")
browser.screenshot(".element.png", element=True)
```

## 等待和同步

### 显式等待

```python
# 等待元素出现
browser.wait_for_selector("#result", timeout=10000)

# 等待导航完成
browser.wait_for_navigation()

# 等待 JavaScript 条件
browser.wait_for_function("() => document.readyState === 'complete'")
```

### 自动等待

OpenClaw 会自动等待元素可操作：

```python
browser.click("#dynamic-button")  # 自动等待按钮出现
```

## 高级技巧

### 滚动操作

```python
# 滚动到顶部
browser.scroll_to_top()

# 滚动到底部
browser.scroll_to_bottom()

# 滚动到元素
browser.scroll_to("#target-element")

# 滚动指定像素
browser.scroll_by(0, 500)
```

### iframe 处理

```python
# 切换到 iframe
with browser.frame("#my-iframe"):
    browser.fill("#input", "value")

# 切回主框架
browser.switch_to_main()
```

### 键盘操作

```python
# 特殊按键
browser.press("Enter")
browser.press("Control+a")
browser.press("Escape")

# 快捷键
browser.key_down("Control")
browser.click("c")
browser.key_up("Control")
```

### JavaScript 执行

```python
# 执行 JavaScript
result = browser.evaluate("""
    return document.title;
""")

# 注入脚本
browser.evaluate("""
    window.scrollTo(0, document.body.scrollHeight);
""")
```

## 反爬虫处理

### 设置 User-Agent

```python
browser.launch(
    args=[
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    ]
)
```

### 添加 cookies

```python
browser.set_cookies({
    "name": "session",
    "value": "xxx",
    "domain": ".example.com"
})
```

### 绕过检测

```python
browser.launch(
    args=[
        "--disable-blink-features=AutomationControlled",
        "--disable-dev-shm-usage"
    ]
)
```

## 错误处理

### 基本错误处理

```python
try:
    browser.goto("https://example.com")
except TimeoutError:
    print("页面加载超时")
except NavigationError as e:
    print(f"导航失败: {e}")
```

### 元素不存在处理

```python
element = browser.wait_for_selector("#optional", timeout=3000)
if element:
    print("元素存在")
else:
    print("元素不存在，继续其他操作")
```

### 重试机制

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def fetch_data():
    browser.goto("https://example.com/data")
    return browser.text(".data-content")
```

## 安全注意事项

### 1. 凭证保护

- 不要在代码中硬编码密码
- 使用环境变量或密钥管理服务
- 完成后清除 cookies 和 storage

### 2. 频率限制

- 避免过高频率请求
- 添加适当延迟
- 遵守网站 robots.txt

### 3. 数据处理

- 敏感数据加密存储
- 定期清理临时文件
- 遵循数据保护法规

## 实际案例

### 案例：自动报税

```python
def monthly_tax_report():
    # 1. 登录税务系统
    browser.goto("https://tax.example.com/login")
    browser.fill("#username", os.getenv("TAX_USER"))
    browser.fill("#password", os.getenv("TAX_PASS"))
    browser.click("#login")
    
    # 2. 导航到申报页面
    browser.wait_for_selector(".dashboard")
    browser.click("#monthly-declare")
    
    # 3. 填写报表
    browser.select("#month", str(date.today().month - 1))
    browser.fill("#revenue", "100000")
    browser.fill("#tax", "13000")
    
    # 4. 提交
    browser.click("#submit")
    browser.screenshot("tax-submitted.png")
    
    # 5. 发送通知
    notify_team("月报已提交")
```

### 案例：竞品监控

```python
def monitor_competitors():
    competitors = ["a.com", "b.com", "c.com"]
    results = []
    
    for comp in competitors:
        browser.goto(f"https://{comp}/pricing")
        price = browser.text(".price")
        features = browser.texts(".feature-item")
        
        results.append({
            "competitor": comp,
            "price": price,
            "features": features
        })
    
    # 保存结果
    save_to_notion(results)
    
    # 检查变化并告警
    check_and_alert(results)
```

## 性能优化

### 并行浏览器实例

```python
from concurrent.futures import ThreadPoolExecutor

def process_site(site):
    browser = Browser()
    # ... 处理逻辑
    browser.close()

with ThreadPoolExecutor(max_workers=3) as executor:
    executor.map(process_site, sites)
```

### 资源清理

```python
# 确保关闭浏览器
browser.close()

# 或使用上下文管理器
with Browser() as browser:
    # ... 操作
# 自动清理
```

## 与 AI 结合的高级用法

### 智能页面分析

结合 AI 模型自动分析页面内容：

```python
from openclaw import Browser
from openclaw.ai import analyze_page

browser = Browser()
browser.goto("https://news.example.com")

# AI 自动提取关键信息
summary = analyze_page(browser.page.content(), "提取文章标题和主要内容")
print(summary)
```

### 自动化测试

利用浏览器自动化进行 UI 测试：

```python
def test_login_flow():
    browser.goto("https://app.example.com/login")
    browser.fill("#username", "testuser")
    browser.fill("#password", "wrongpassword")
    browser.click("#login")
    
    # 验证错误提示
    error = browser.text(".error-message")
    assert "密码错误" in error
```

### 批量数据采集

定时采集公开数据：

```python
import schedule
from datetime import datetime

def collect_pricing_data():
    products = get_product_list()
    data = []
    
    for product in products:
        browser.goto(f"https://shop.example.com/{product}")
        price = browser.text(".price")
        data.append({"product": product, "price": price, "time": datetime.now()})
    
    save_to_database(data)

# 每天早上 9 点执行
schedule.every().day.at("09:00").do(collect_pricing_data)
```

## 常见陷阱

### 1. 动态内容处理

有些页面内容通过 JavaScript 动态加载：

```python
# 等待动态内容加载
browser.wait_for_selector(".loaded-content", timeout=15000)
```

### 2. 验证码处理

避免自动化访问触发验证码：

- 控制请求频率
- 使用真实浏览器配置
- 考虑使用验证码解决服务

### 3. 会话管理

避免会话冲突：

```python
# 每个实例使用独立配置
browser.launch(
    user_data_dir=f"/tmp/browser-{user_id}",
    args=["--disable-blink-features=AutomationControlled"]
)
```

## 小结

浏览器自动化是 OpenClaw 的强大功能，掌握这些技巧可以大幅提升重复性工作的效率。结合 AI 能力，可以实现更智能的数据采集和自动化流程。

## 下一步

- [核心能力总览](/docs/manual/core-capabilities)
- [技能开发指南](/best-practices/skills-development)
- [安全配置基础](/docs/operations/safety-basics)