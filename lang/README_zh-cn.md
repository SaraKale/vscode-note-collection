<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">笔记收藏集</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](../README.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

一个用于管理和收集带标签笔记文件的 VS Code 扩展。通过简洁直观的界面，高效地整理您的笔记。

## 功能特性

- **按标签组织笔记**：将笔记分类到自定义标签中，支持多级目录标签
- **全文搜索**：在所有笔记文件中即时搜索内容
- **标签管理**：轻松创建、重命名和删除标签
- **导入/导出**：可导入 JSON 备份文件恢复数据，导出集合为 TXT 或 JSON 备份文件
- **拖拽操作**：拖动笔记文件/文件夹到不同标签，快速分类
- **文件集成**：在新窗口打开笔记或在文件资源管理器中显示
- **启用/禁用笔记**：切换笔记显示状态，无需删除
- **多语言支持**：支持 12 种语言
  - English, 简体中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkçe, Polski, Čeština

## 安装

### 从 VS Code 应用商店安装

1. 打开 VS Code
2. 进入扩展面板 (Ctrl+Shift+X)
3. 搜索 "Note Collection" 或 "笔记收藏集" 或 [扩展市场安装](https://marketplace.visualstudio.com/items?itemName=SaraKale.note-collection)
4. 点击安装

![](../image/extensions-1.png)

### 从 VSIX 文件安装

1. 从 [Releases](https://github.com/sarakale/vscode-note-collection/releases) 页面下载最新的 `.vsix` 文件
2. 打开 VS Code
3. 按下 Ctrl+Shift+P 打开命令面板
4. 选择 "Extensions: Install from VSIX..."
5. 选择下载的 `.vsix` 文件

![](../image/extensions-2.png)

## 使用说明

### 入门

1. 安装后，"Note Collection" 视图将出现在左侧活动栏
2. 点击图标打开侧边栏
3. 开始添加您的笔记！
4. 需要重新启动 VSCode 才能更换语言。

### 基本操作

#### 向标签添加笔记

- 右键点击标签，选择 "导入文件/文件夹..." 添加笔记文件/文件夹

![](../image/menu-1.png)

- 从文件资源管理器拖拽文件/文件夹到标签中

![](../image/path-2.gif)

- 如果文件被移动或删除，会有警告图标和提示。

![](../image/fileerror.png)

- 也可以在更多操作中手动输入地址，会打开一个专用的 Webview 面板来输入更多地址。
    - 标签填写，也可以填写多个标签，以英文逗号分隔：
        ```
        Note1,Note2
        ```
    - 文件完整路径输入，每行一个文件路径：
        ```
        D:\path\file1.txt
        D:\path\file2.txt
        ```
![](../image/path-1.png)

#### 管理标签

- 在"更多"菜单中点击"添加标签..."创建新标签/多级标签
- 右键点击标签可添加标签、重命名标签、删除标签
- 删除标签不会删除其中的笔记文件，只会从集合中移除它们。
- 点击折叠图标可展开/折叠所有标签内容
- 还可以将标签移动其他标签内

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### 搜索笔记
- 点击工具栏的搜索图标
- 输入搜索关键词，在所有标签中查找笔记
- 最多显示前 50 条匹配结果
- 仅支持常见的文本格式，图片/文档/视频等只会搜索到文件名。二进制文件需要借助第三方全文搜索软件，如：Recoll、DocFetcher等。

![](../image/search-1.gif)

#### 笔记操作
- **打开**：双击或从右键菜单选择 "打开文件"
- **在资源管理器中打开**：打开资源管理中文件的位置
- **重命名笔记**：可以更改新的名称
- **编辑标签**：为笔记添加多个标签
- **删除笔记**：从集合中移除笔记
- **启用/禁用**：隐藏/显示笔记文件项目，不实际删除文件。

![](../image/menu-2.png)

### 导出 TXT / 导入导出 JSON 备份文件

- 在更多操作中：
- **导出为 TXT**：将整个笔记集合列表导出为 TXT 文本文件 
- **导出 JSON 备份文件**：创建 JSON 备份文件以保存您的笔记集合状态，便于恢复或迁移到其他设备。
- **导入 JSON 备份文件**：从之前导出的 JSON 备份文件恢复笔记集合状态。
  - 注：导入 JSON 备份文件将覆盖当前笔记集合状态，请谨慎操作。


## 截图

![](../image/screen-1.png)

## 系统要求

- Visual Studio Code 版本 1.80.0 或更高版本

## 已知问题

1. 首次安装后，可能需要重启 VSCode 才能更换语言。
2. 折叠/展开标签时，可能会出现 UI 刷新问题。请尝试手动展开标签以解决。

## 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 本仓库
2. 创建分支和提交
5. 打开 Pull Request

## 构建说明

### 本地开发

1. 克隆仓库
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. 安装依赖
```bash
npm install
```

3. 编译 TypeScript
```bash
npm run compile
```

4. 在 VS Code 中按 F5 启动调试

### 打包扩展

1. 安装 vsce（VS Code 扩展打包工具）
```bash
npm install -g vsce
```

2. 打包为 `.vsix` 文件
```bash
npm run package
```

或直接使用 vsce 命令
```bash
vsce package
```

3. 生成的 `.vsix` 文件可手动安装。

## 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解各版本的更新内容。

## 许可证

本项目采用 GPL-3.0 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 支持

如果遇到任何问题或有功能建议，请访问：
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## 致谢

- 感谢所有使用和支持本扩展的用户
- 灵感来源于 [vscode-project-manager]( https://github.com/alefragnani/vscode-project-manager) 在此基础上增加了更多功能。

---

