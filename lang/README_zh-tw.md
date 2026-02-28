<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">筆記收藏集</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](README_en.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

一個用於管理和收集帶標籤筆記檔案的 VS Code 擴充工具。透過簡潔直觀的介面，高效地整理您的筆記。

## 功能特性

- **按標籤組織筆記**：將筆記分類到自定義標籤中，支援多級目錄標籤
- **全文搜索**：在所有筆記檔案中即時搜索內容
- **標籤管理**：輕鬆建立、重新命名和刪除標籤
- **匯入/匯出**：可匯入 JSON 備份檔案恢復資料，匯出集合為 TXT 或 JSON 備份檔案
- **拖曳操作**：拖動筆記檔案/資料夾到不同標籤，快速分類
- **檔案整合**：在新視窗開啟筆記或在檔案總管中顯示
- **啟用/停用筆記**：切換筆記顯示狀態，無需刪除
- **多語言支援**：支援 12 種語言
  - English, 簡體中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkçe, Polski, Čeština

## 安裝

### 從 VS Code 應用市集安裝

1. 開啟 VS Code
2. 進入擴充功能面板 (Ctrl+Shift+X)
3. 搜尋 "Note Collection" 或 "筆記收藏集"
4. 點擊安裝

![](../image/extensions-1.png)

### 從 VSIX 檔案安裝

1. 從 [Releases](https://github.com/sarakale/vscode-note-collection/releases) 頁面下載最新的 `.vsix` 檔案
2. 開啟 VS Code
3. 按下 Ctrl+Shift+P 開啟指令面板
4. 選擇 "Extensions: Install from VSIX..."
5. 選擇下載的 `.vsix` 檔案

![](../image/extensions-2.png)

## 使用說明

### 快速開始

1. 安裝後，"Note Collection" 視圖將出現在左側活動欄
2. 點擊圖示開啟側邊欄
3. 開始新增您的筆記！
4. 需要重新啟動 VSCode 才能切換語言。

### 基本操作

#### 向標籤新增筆記

- 右鍵點擊標籤，選擇 "匯入檔案/資料夾..." 新增筆記檔案/資料夾

![](../image/menu-1.png)

- 從檔案總管拖曳檔案/資料夾到標籤中

![](../image/path-2.gif)

- 如果檔案被移動或刪除，會有警告圖示和提示。
![](../image/fileerror.png)

- 也可以在更多操作中手動輸入位址，會開啟一個專用的 Webview 面板來輸入更多位址。
    - 標籤填寫，也可以填寫多個標籤，以英文逗號分隔：
        ```
        Note1,Note2
        ```
    - 檔案完整路徑輸入，每行一個檔案路徑：
        ```
        D:\path\file1.txt
        D:\path\file2.txt
        ```
![](../image/path-1.png)

#### 管理標籤

- 在"更多"選單中點擊"新增標籤..."建立新標籤/多級標籤
- 右鍵點擊標籤可新增標籤、重新命名標籤、刪除標籤
- 刪除標籤不會刪除其中的筆記檔案，只會從集合中移除它們。
- 點擊折疊圖示可展開/收起所有標籤內容
- 還可以將標籤移動其他標籤內

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### 搜尋筆記
- 點擊工具列的搜尋圖示
- 輸入搜尋關鍵字，在所有標籤中查找筆記
- 最多顯示前 50 條匹配結果
- 僅支援常見的文字格式，圖片/文件/影片等只會搜尋到檔名。二進位檔案需要藉助第三方全文搜尋軟體，如：Recoll、DocFetcher等。

![](../image/search-1.gif)

#### 筆記操作
- **開啟**：雙擊或從右鍵選單選擇 "開啟檔案"
- **在總管中開啟**：開啟總管中檔案的位置
- **重新命名筆記**：可以更改新的名稱
- **編輯標籤**：為筆記新增多個標籤
- **刪除筆記**：從集合中移除筆記
- **啟用/停用**：隱藏/顯示筆記檔案項目，不實際刪除檔案。

![](../image/menu-2.png)

### 匯出 TXT / 匯入匯出 JSON 備份檔案

- 在更多操作中：
- **匯出為 TXT**：將整個筆記集合列表匯出為 TXT 文字檔案
- **匯出 JSON 備份檔案**：建立 JSON 備份檔案以儲存您的筆記集合狀態，方便恢復或遷移到其他裝置。
- **匯入 JSON 備份檔案**：從先前匯出的 JSON 備份檔案恢復筆記集合狀態。
  - 註：匯入 JSON 備份檔案將覆蓋目前筆記集合狀態，請謹慎操作。


## 截圖

![](../image/screen-1.png)

## 系統需求

- Visual Studio Code 版本 1.80.0 或更高版本

## 已知問題

1. 首次安裝後，可能需要重新啟動 VSCode 才能切換語言。
2. 折疊/展開標籤時，可能會出現 UI 重新整理問題。請嘗試手動展開標籤來解決。

## 貢獻

歡迎貢獻！請隨時提交 Pull Request。

1. Fork 本倉庫
2. 建立分支和提交
5. 開啟 Pull Request

## 建置說明

### 本地開發

1. 複製倉庫
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. 安裝相依套件
```bash
npm install
```

3. 編譯 TypeScript
```bash
npm run compile
```

4. 在 VS Code 中按 F5 啟動除錯

### 打包擴充功能

1. 安裝 vsce（VS Code 擴充功能打包工具）
```bash
npm install -g vsce
```

2. 打包為 `.vsix` 檔案
```bash
npm run package
```

或直接使用 vsce 指令
```bash
vsce package
```

3. 產生的 `.vsix` 檔案可手動安裝。

## 更新日誌

查看 [CHANGELOG.md](CHANGELOG.md) 了解各版本的更新內容。

## 授權條款

本專案採用 GPL-3.0 授權條款 - 詳見 [LICENSE](LICENSE) 檔案。

## 支援

如果您遇到任何問題或有功能建議，請造訪：
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## 致謝

- 感謝所有使用和支援本擴充功能的用戶
- 靈感來源於 [vscode-project-manager](https://github.com/alefragnani/vscode-project-manager) 在此基礎上增加了更多功能。

---
