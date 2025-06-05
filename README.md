# Feishu2Obsidian

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个用于将飞书知识库文档同步为Markdown文件的Obsidian插件，基于feishu2md工具实现。

## 功能特点

- 一键同步飞书知识库文档到Markdown文件
- 支持通过快捷键（Mod+Alt+O）快速触发同步
- 提供完整的配置选项，包括输出路径、飞书API凭证等
- 同步过程中显示状态通知
- 支持强制更新模式
- 详细的日志记录选项

## 安装方法

### 前提条件

- 已安装 [Obsidian](https://obsidian.md/) 应用（最低版本要求：0.15.0）
- 已安装 [feishu2md](https://github.com/qiaogaojian/contribute_feishu2md) 工具（或在插件设置中指定路径）

### 安装步骤

1. 在Obsidian中，打开设置 > 第三方插件
2. 禁用安全模式
3. 点击浏览社区插件
4. 搜索 "Feishu2Obsidian"
5. 安装插件
6. 启用插件

## 使用说明

### 基本使用

1. 首次使用前，请先在插件设置中配置必要参数（飞书API凭证、Wiki URL等）
2. 使用以下任一方式触发同步：
   - 使用快捷键 `Mod+Alt+O`（Windows/Linux上为Ctrl+Alt+O，Mac上为Cmd+Alt+O）
   - 通过命令面板执行 "Run Feishu to Markdown Sync" 命令
3. 同步过程中会显示状态通知，完成后会提示同步结果

### 配置选项

在Obsidian设置 > 插件选项 > Feishu2Obsidian 中可以配置以下选项：

| 选项 | 说明 |
| --- | --- |
| Feishu2md Path | feishu2md.exe可执行文件的路径。如果未设置，将默认使用系统PATH中的feishu2md.exe |
| Force Update | 启用强制更新模式（--force参数） |
| Output Path | 输出文件的保存路径（-o参数） |
| Wiki URL | 飞书知识库URL |
| App ID | 飞书应用的App ID |
| App Secret | 飞书应用的App Secret |
| Enable Log | 启用详细日志记录 |

## 获取飞书API凭证

要使用此插件，您需要创建一个飞书应用并获取API凭证：

1. 登录[飞书开发者平台](https://open.feishu.cn/)
2. 创建一个自建应用
3. 在应用凭证页面获取App ID和App Secret
4. 为应用添加以下权限：
   - 知识库 > 知识库信息查看
   - 知识库 > 知识库内容查看

## 技术架构

- 基于Obsidian插件API开发
- 使用TypeScript语言
- 通过child_process模块调用外部feishu2md工具
- 模块化设计，职责清晰
- 完整的设置持久化功能

## 常见问题

**Q: 为什么同步失败？**

A: 请检查以下几点：
- 确认feishu2md工具已正确安装或路径已正确配置
- 验证App ID和App Secret是否正确
- 检查Wiki URL格式是否正确
- 启用日志记录查看详细错误信息

**Q: 如何更新插件？**

A: Obsidian会自动检查并提示插件更新，您也可以手动检查更新。

## 许可证

[MIT](LICENSE)