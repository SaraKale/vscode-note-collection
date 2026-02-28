<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">ノートコレクション</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](README_en.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

タグ付きノートファイルを管理・収集するための VS Code 拡張機能。シンプルで直感的なインターフェースで効率的にノートを整理できます。

## 機能

- **タグでノートを整理** : カスタムタグでノートを分類、マルチレベルディレクトリタグをサポート
- **全文検索** : すべてのノートファイルから即座にコンテンツを検索
- **タグ管理** : タグの作成、名前変更、削除が簡単
- **インポート/エクスポート** : データを復元するために JSON バックアップファイルをインポート、コレクションを TXT または JSON バックアップファイルとしてエクスポート
- **ドラッグ＆ドロップ** : ノートファイル/フォルダを異なるタグにドラッグして素早く分類
- **ファイル統合** : 新規ウィンドウでノートを開いたり、ファイルエクスプローラーで表示したりできます
- **ノートの有効化/無効化** : 削除せずにノートの表示を切り替え可能
- **多言語サポート** : 12言語をサポート
  - English, 简体中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkçe, Polski, Čeština

## インストール

### VS Code マーケットプレースからインストール

1. VS Code を開く
2. 拡張機能パネルに移動（Ctrl+Shift+X）
3. 「Note Collection」または「ノートコレクション」を検索するか、[拡張機能マーケットでインストール](https://marketplace.visualstudio.com/items?itemName=SaraKale.note-collection)
4. インストールをクリック

![](../image/extensions-1.png)

### VSIX ファイルからインストール

1. [Releases](https://github.com/sarakale/vscode-note-collection/releases) ページから最新の `.vsix` ファイルをダウンロード
2. VS Code を開く
3. Ctrl+Shift+P を押してコマンドパレットを開く
4. "Extensions: Install from VSIX..." を選択
5. ダウンロードした `.vsix` ファイルを選択

![](../image/extensions-2.png)

## 使用方法

### はじめに

1. インストール後、"Note Collection" ビューが左のアクティビティバーに表示されます
2. アイコンをクリックしてサイドバーを開く
3. ノートの追加を開始しましょう！
4. 言語を切り替えるには VS Code を再起動する必要があります。

### 基本操作

#### タグにノートを追加

- タグを右クリックして "ファイル/フォルダをインポート..." を選択して、ノートファイル/フォルダを追加

![](../image/menu-1.png)

- ファイルエクスプローラーからファイル/フォルダをタグにドラッグ＆ドロップ

![](../image/path-2.gif)

- ファイルが移動または削除された場合、警告アイコンとメッセージが表示されます。

![](../image/fileerror.png)

- その他の操作で手動でパスを入力することもできます。これにより、より多くのパスを入力するための専用の Webview パネルが開きます。
    - タグ入力、英語のコンマで区切って複数のタグを入力できます：
        ```
        Note1,Note2
        ```
    - ファイルの完全なパス入力、1行に1つのファイルパス：
        ```
        D:\path\file1.txt
        D:\path\file2.txt
        ```
		
![](../image/path-1.png)

#### タグの管理

- "その他"メニューで"タグを追加..."をクリックして新しいタグ/マルチレベルタグを作成
- タグを右クリックしてタグを追加、タグの名前変更、タグを削除
- タグを削除してもその中のノートファイルは削除されず、コレクションから削除されるだけです
- 折りたたみアイコンをクリックしてすべてのタグコンテンツを展開/折りたたみ
- タグを他のタグ内に移動することもできます

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### ノートの検索
- ツールバーの検索アイコンをクリック
- 検索キーワードを入力してすべてのタグでノートを検索
- 最大50件の一致結果を表示
- 一般的なテキスト形式のみをサポート、画像/ドキュメント/ビデオなどはファイル名のみが検索されます。バイナリファイルには Recoll、DocFetcher などのサードパーティの全文検索ソフトが必要です。

![](../image/search-1.gif)

#### ノート操作
- **開く** : ダブルクリックまたは右クリックメニューから「ファイルを開く」を選択
- **エクスプローラーで表示** : エクスプローラー内のファイルの場所を開く
- **ノートの名前変更** : 新しい名前に変更できます
- **タグの編集** : ノートに複数のタグを追加
- **ノートの削除** : コレクションからノートを削除
- **有効化/無効化** : ノートファイルアイテムを非表示/表示、実際にファイルを削除しません。

![](../image/menu-2.png)

### TXT をエクスポート / JSON バックアップファイルをインポートエクスポート

- その他の操作で：
- **TXT としてエクスポート** : ノートコレクション全体のリストをテキストファイルとしてエクスポート
- **JSON バックアップファイルをエクスポート** : ノートコレクションの状態を保存する JSON バックアップファイルを作成し、簡単に復旧または他のデバイスに移行できます。
- **JSON バックアップファイルをインポート** : 以前にエクスポートされた JSON バックアップファイルからノートコレクションの状態を復元。
  - 注：JSON バックアップファイルをインポートすると現在のノートコレクションの状態が上書きされるため、注意してください。


## スクリーンショット

![](../image/screen-1.png)

## システム要件

- Visual Studio Code バージョン 1.80.0 以降

## 既知の問題

1. 最初のインストール後、言語を切り替えるために VS Code を再起動する必要がある場合があります。
2. タグを折りたたむ/展開する際に UI の更新の問題が発生する場合があります。手動でタグを展開して解決してください。

## 貢献

貢献を歓迎します！お気軽にプルリクエストを送信してください。

1. このリポジトリをフォーク
2. ブランチを作成してコミット
5. プルリクエストを開く

## ビルド手順

### ローカル開発

1. リポジトリをクローン
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. 依存関係をインストール
```bash
npm install
```

3. TypeScript をコンパイル
```bash
npm run compile
```

4. VS Code で F5 を押してデバッグを開始

### 拡張機能のパッケージ化

1. vsce をインストール（VS Code Extension Packager）
```bash
npm install -g vsce
```

2. `.vsix` ファイルとしてパッケージ化
```bash
npm run package
```

または vsce コマンドを直接使用
```bash
vsce package
```

3. 生成された `.vsix` ファイルを手動でインストールできます。

## 変更履歴

各バージョンの更新の詳細については [CHANGELOG.md](CHANGELOG.md) を参照してください。

## ライセンス

このプロジェクトは GPL-3.0 ライセンスの下でライセンスされています - 詳細については [LICENSE](LICENSE) ファイルを参照してください。

## サポート

問題が発生したり、機能の提案がある場合は、以下をご覧ください：
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## 謝辞

- この拡張機能を使用し、サポートしてくれているすべてのユーザーに感謝します
- [vscode-project-manager](https://github.com/alefragnani/vscode-project-manager) に触発され、これをベースにさらに機能が追加されました。

---
