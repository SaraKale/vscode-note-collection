<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">노트 모음</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](README_en.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

태그가 지정된 노트 파일을 관리하고 수집하는 VS Code 확장 프로그램입니다. 깔끔하고 직관적인 인터페이스를 통해 노트를 효율적으로 정리할 수 있습니다.

## 기능

- **태그로 노트 정리** : 사용자 정의 태그로 노트를 분류하며, 다단계 디렉토리 태그를 지원
- **전체 텍스트 검색** : 모든 노트 파일에서 즉시 콘텐츠 검색
- **태그 관리** : 태그 생성, 이름 변경, 삭제가 간편
- **가져오기/내보내기** : 데이터를 복구하기 위해 JSON 백업 파일을 가져오고, 컬렉션을 TXT 또는 JSON 백업 파일로 내보내기
- **드래그 앤 드롭** : 노트 파일/폴더를 다른 태그로 드래그하여 빠른 분류
- **파일 통합** : 새 창에서 노트를 열거나 파일 탐색기에서 표시
- **노트 활성화/비활성화** : 삭제하지 않고 노트 표시 전환
- **다국어 지원** : 12개 언어 지원
  - English, 简体中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkçe, Polski, Čeština

## 비디오 가이드

- [youtube](https://www.youtube.com/watch?v=uH8zRXyZyVA)
[![Note Collection](https://img.youtube.com/vi/uH8zRXyZyVA/0.jpg)](https://www.youtube.com/watch?v=uH8zRXyZyVA)

- [bilibili](https://www.bilibili.com/video/BV1TkPMzhEF2/)
[![Note Collection](https://i0.hdslb.com/bfs/archive/ec21db0cb688bfc6bb55a56ca90b7c6cac27cf3d.jpg@672w_378h_1c.avif)](https://www.bilibili.com/video/BV1TkPMzhEF2/)

## 설치

### VS Code 마켓플레이스에서 설치

1. VS Code 열기
2. 확장 패널로 이동 (Ctrl+Shift+X)
3. "Note Collection" 또는 "노트 컬렉션" 또는 [확장 시장 설치](https://marketplace.visualstudio.com/items?itemName=SaraKale.note-collection) 검색
4. 설치 클릭

![](../image/extensions-1.png)

### VSIX 파일에서 설치

1. [Releases](https://github.com/sarakale/vscode-note-collection/releases) 페이지에서 최신 `.vsix` 파일 다운로드
2. VS Code 열기
3. Ctrl+Shift+P를 눌러 명령 팔레트 열기
4. "Extensions: Install from VSIX..." 선택
5. 다운로드한 `.vsix` 파일 선택

![](../image/extensions-2.png)

## 사용법

### 시작하기

1. 설치 후 왼쪽 활동 표시줄에 "Note Collection" 뷰가 나타납니다
2. 아이콘을 클릭하여 사이드바 열기
3. 노트 추가를 시작하세요!
4. 언어를 변경하려면 VS Code를 다시 시작해야 합니다.

### 기본 작업

#### 태그에 노트 추가

- 태그를 마우스 오른쪽 버튼으로 클릭하고 "파일/폴더 가져오기..."를 선택하여 노트 파일/폴더 추가

![](../image/menu-1.png)

- 파일 탐색기에서 파일/폴더를 태그로 드래그 앤 드롭

![](../image/path-2.gif)

- 파일이 이동되거나 삭제된 경우 경고 아이콘과 메시지가 나타납니다.

![](../image/fileerror.png)

- 추가 작업에서 수동으로 경로를 입력할 수도 있습니다. 이렇게 하면 더 많은 경로를 입력하기 위한 전용 Webview 패널이 열립니다.
    - 태그 입력, 영어 쉼표로 구분하여 여러 태그를 입력할 수 있습니다:
        ```
        Note1,Note2
        ```
    - 파일 전체 경로 입력, 한 줄당 하나의 파일 경로:
        ```
        D:\path\file1.txt
        D:\path\file2.txt
        ```
		
![](../image/path-1.png)

#### 태그 관리

- "더보기" 메뉴에서 "태그 추가..."를 클릭하여 새 태그/다단계 태그 생성
- 태그를 마우스 오른쪽 버튼으로 클릭하여 태그 추가, 태그 이름 변경, 태그 삭제
- 태그를 삭제해도 그 안의 노트 파일은 삭제되지 않고 컬렉션에서만 제거됩니다
- 접기 아이콘을 클릭하여 모든 태그 콘텐츠 확장/접기
- 태그를 다른 태그 안으로 이동할 수도 있습니다

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### 노트 검색
- 도구 모음의 검색 아이콘을 클릭
- 검색 키워드를 입력하여 모든 태그에서 노트 찾기
- 최대 50개의 일치하는 결과 표시
- 일반적인 텍스트 형식만 지원하며, 이미지/문서/비디오 등은 파일 이름만 검색됩니다. 바이너리 파일은 Recoll, DocFetcher 등의 타사 전체 텍스트 검색 소프트웨어가 필요합니다.

![](../image/search-1.gif)

#### 노트 작업
- **열기** : 더블 클릭하거나 오른쪽 클릭 메뉴에서 "파일 열기" 선택
- **탐색기에서 표시** : 탐색기에서 파일의 위치 열기
- **노트 이름 변경** : 새 이름으로 변경 가능
- **태그 편집** : 노트에 여러 태그 추가
- **노트 삭제** : 컬렉션에서 노트 삭제
- **활성화/비활성화** : 노트 파일 항목 숨기기/표시, 실제로 파일을 삭제하지 않습니다.

![](../image/menu-2.png)

### TXT 내보내기 / JSON 백업 파일 가져오기 내보내기

- 추가 작업에서:
- **TXT로 내보내기** : 전체 노트 컬렉션 목록을 텍스트 파일로 내보내기
- **JSON 백업 파일 내보내기** : 노트 컬렉션 상태를 저장하는 JSON 백업 파일을 생성하여 쉽게 복구하거나 다른 장치로 마이그레이션할 수 있습니다.
- **JSON 백업 파일 가져오기** : 이전에 내보낸 JSON 백업 파일에서 노트 컬렉션 상태를 복구합니다.
  - 참고: JSON 백업 파일을 가져오면 현재 노트 컬렉션 상태를 덮어씁니다. 주의해서 진행하세요.


## 스크린샷

![](../image/screen-1.png)

## 시스템 요구 사항

- Visual Studio Code 버전 1.80.0 이상

## 알려진 문제

1. 처음 설치 후 언어를 변경하려면 VS Code를 다시 시작해야 할 수 있습니다.
2. 태그를 접기/펼칠 때 UI 새로고침 문제가 발생할 수 있습니다. 수동으로 태그를 펼쳐 해결하세요.

## 기여

기여를 환영합니다! 자유롭게 Pull Request를 제출하세요.

1. 이 저장소 포크
2. 브랜치 생성 및 커밋
5. Pull Request 열기

## 빌드 지침

### 로컬 개발

1. 저장소 복제
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. 종속성 설치
```bash
npm install
```

3. TypeScript 컴파일
```bash
npm run compile
```

4. VS Code에서 F5를 눌러 디버깅 시작

### 확장 프로그램 패키징

1. vsce 설치 (VS Code Extension Packager)
```bash
npm install -g vsce
```

2. `.vsix` 파일로 패키징
```bash
npm run package
```

또는 vsce 명령을 직접 사용
```bash
vsce package
```

3. 생성된 `.vsix` 파일을 수동으로 설치할 수 있습니다.

## 변경 로그

각 버전의 업데이트 내용은 [CHANGELOG.md](CHANGELOG.md)를 참조하세요.

## 라이선스

이 프로젝트는 GPL-3.0 라이선스에 따라 라이선스가 부여됩니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 지원

문제가 발생하거나 기능 제안이 있는 경우 다음을 방문하세요:
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## 감사의 말씀

- 이 확장 프로그램을 사용하고 지원해 주신 모든 사용자에게 감사합니다
- [vscode-project-manager](https://github.com/alefragnani/vscode-project-manager)에서 영감을 받아 이를 기반으로 더 많은 기능을 추가했습니다.

---
