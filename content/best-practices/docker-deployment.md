---
title: Docker 部署与容器化运行
description: 使用 Docker 部署 OpenClaw，包括镜像构建、docker-compose 配置和 Kubernetes 部署。
category: 部署运维
difficulty: 中级
updatedAt: 2026-03-11
sourceType: third-party
tags: [docker, deployment, containers, operations]
---

# Docker 部署与容器化运行

本文介绍使用 Docker 部署 OpenClaw 的完整指南。

## Docker 基础

### 拉取镜像

```bash
# 官方镜像
docker pull openclaw/openclaw:latest

# 指定版本
docker pull openclaw/openclaw:2026.3.7
```

### 运行容器

```bash
# 基本运行
docker run -d \
  --name openclaw \
  -p 18789:18789 \
  -v ~/.openclaw:/app/config \
  openclaw/openclaw:latest

# 完整配置
docker run -d \
  --name openclaw \
  -p 18789:18789 \
  -v ~/.openclaw:/app/config \
  -e OPENCLAW_TOKEN=your_token \
  -e OPENCLAW_MODEL=claude-3-5-sonnet \
  --restart unless-stopped \
  openclaw/openclaw:latest
```

## Docker Compose

### 基本配置

```yaml
version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    ports:
      - "18789:18789"
    volumes:
      - ./config:/app/config
      - ./data:/app/data
    environment:
      - OPENCLAW_TOKEN=${OPENCLAW_TOKEN}
      - OPENCLAW_MODEL=claude-3-5-sonnet
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "openclaw", "status"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 多服务配置

```yaml
version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    ports:
      - "18789:18789"
    volumes:
      - ./config:/app/config
      - ./data:/app/data
    environment:
      - OPENCLAW_TOKEN=${OPENCLAW_TOKEN}
    depends_on:
      - redis
      - postgres
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: openclaw-redis
    volumes:
      - redis-data:/data
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    container_name: openclaw-postgres
    environment:
      - POSTGRES_DB=openclaw
      - POSTGRES_USER=openclaw
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  redis-data:
  postgres-data:
```

### 开发环境

```yaml
version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:dev
    container_name: openclaw-dev
    ports:
      - "18789:18789"
      - "9229:9229"
    volumes:
      - ./config:/app/config
      - ../openclaw:/app/src
    environment:
      - NODE_ENV=development
      - DEBUG=*
    command: sh -c "npm run dev"
```

## Kubernetes 部署

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openclaw
  labels:
    app: openclaw
spec:
  replicas: 2
  selector:
    matchLabels:
      app: openclaw
  template:
    metadata:
      labels:
        app: openclaw
    spec:
      containers:
      - name: openclaw
        image: openclaw/openclaw:latest
        ports:
        - containerPort: 18789
        env:
        - name: OPENCLAW_TOKEN
          valueFrom:
            secretKeyRef:
              name: openclaw-secrets
              key: token
        volumeMounts:
        - name: config
          mountPath: /app/config
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
      volumes:
      - name: config
        persistentVolumeClaim:
          claimName: openclaw-config
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: openclaw
spec:
  selector:
    app: openclaw
  ports:
  - port: 80
    targetPort: 18789
  type: ClusterIP
```

### Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: openclaw
  annotations:
    nginx.ingress.kubernetes.io/proxy-body-size: "50m"
spec:
  rules:
  - host: openclaw.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: openclaw
            port:
              number: 80
  tls:
  - hosts:
    - openclaw.example.com
    secretName: openclaw-tls
```

## 数据持久化

### 配置文件

```yaml
volumes:
  - ./config:/app/config:ro
  - ./data:/app/data
  - ./skills:/app/skills
  - ./logs:/app/logs
```

### 备份策略

```bash
# 备份配置
docker run --rm -v openclaw_config:/data -v $(pwd):/backup alpine \
  tar czf /backup/openclaw-config.tar.gz /data

# 恢复配置
docker run --rm -v openclaw_config:/data -v $(pwd):/backup alpine \
  tar xzf /backup/openclaw-config.tar.gz -C /
```

## 监控集成

### 健康检查

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 18789
  initialDelaySeconds: 60
  periodSeconds: 30

readinessProbe:
  httpGet:
    path: /ready
    port: 18789
  initialDelaySeconds: 10
  periodSeconds: 10
```

### 日志收集

```yaml
logging:
  driver: json-file
  options:
    max-size: "100m"
    max-file: "3"
```

## 下一步

- [企业部署指南](/news/enterprise-deployment)
- [安全配置](/docs/operations/safety-basics)
- [故障排除](/docs/reference/troubleshooting)
