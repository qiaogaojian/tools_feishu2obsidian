# Obsidian Feishu to Markdown Sync Plugin

通过 feishu2md.exe 实现飞书文档与Markdown的自动化同步。

## 主要功能

- 🛠 **飞书配置管理**  
  配置飞书应用ID/密钥、知识库URL、输出路径
- ⚙ **执行参数控制**  
  支持强制覆盖模式(isForce)、日志开关(enableLog)
- 📂 **自定义执行路径**  
  支持指定 feishu2md.exe 的绝对路径
- ⌨ **快捷执行**  
  Ctrl+Alt+O 触发文档同步
- 📊 **实时通知**  
  显示同步进度通知和错误提示

## 使用方法

1. 在设置界面填写飞书应用凭证
2. 配置本地输出路径（默认：D:\feishu2md_output）
3. 设置 feishu2md.exe 路径（可选）
4. 使用 Ctrl+Alt+O 执行同步

## 开发指南

```bash
# 安装依赖
npm install

# 开发模式 (实时编译)
npm run dev

# 生产构建
npm run build
```

## 配置参数说明

| 参数名称 | 类型 | 默认值 | 说明 |
|----------|------|--------|-----|
| appId | string | - | 飞书开放平台应用ID |
| appSecret | string | - | 飞书应用密钥 |
| wikiUrl | string | https://example.com/wiki | 知识库URL |
| outPath | string | D:\feishu2md_output | 文档输出路径 |
| isForce | boolean | false | 强制覆盖已有文件 |
| enableLog | boolean | false | 启用执行日志 |
| feishu2mdPath | string | feishu2md.exe | 执行器绝对路径 |

## 依赖管理

- [feishu2md](https://github.com/org/feishu2md) 文档转换工具
- Obsidian Plugin API v1.2.0+
- Node.js 18+
