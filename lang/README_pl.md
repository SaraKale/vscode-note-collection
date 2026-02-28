<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">Kolekcja Notatek</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](README_en.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

Rozszerzenie VS Code do zarządzania i zbierania oznaczonych plików notatek. Efektywnie organizuj swoje notatki dzięki czystemu i intuicyjnemu interfejsowi.

## Funkcje

- **Organizuj notatki według tagów** : Kategoryzuj notatki w własnych tagach, obsługujących tagi katalogów wielopoziomowych
- **Wyszukiwanie pełnotekstowe** : Natychmiastowe wyszukiwanie treści we wszystkich plikach notatek
- **Zarządzanie tagami** : Łatwe tworzenie, zmienianie nazw i usuwanie tagów
- **Import/Eksport** : Importuj pliki kopii zapasowych JSON, aby przywrócić dane, eksportuj kolekcję do plików kopii zapasowych TXT lub JSON
- **Przeciągnij i upuść** : Przeciągaj pliki/ Foldery notatek do różnych tagów dla szybkiej kategoryzacji
- **Integracja plików** : Otwieraj notatki w nowych oknach lub pokaż w eksploratorze plików
- **Włącz/Wyłącz notatki** : Przełącz widoczność notatek bez ich usuwania
- **Obsługa wielu języków** : Obsługuje 12 języków
  - English, 简体中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkcse, Polski, Čeština

## Instalacja

### Zainstaluj z VS Code Marketplace

1. Otwórz VS Code
2. Przejdź do panelu Extensje (Ctrl+Shift+X)
3. Szukaj "Note Collection" lub "笔记收藏集"
4. Kliknij Zainstaluj

![](../image/extensions-1.png)

### Zainstaluj z pliku VSIX

1. Pobierz najnowszy plik `.vsix` ze strony [Releases](https://github.com/sarakale/vscode-note-collection/releases)
2. Otwórz VS Code
3. Naciśnij Ctrl+Shift+P, aby otworzyć paletę komend
4. Wybierz "Extensions: Install from VSIX..."
5. Wybierz pobrany plik `.vsix`

![](../image/extensions-2.png)

## Użycie

### Pierwsze kroki

1. Po instalacji widok "Note Collection" pojawi się w lewym pasku aktywności
2. Kliknij ikonę, aby otworzyć panel boczny
3. Zacznij dodawać swoje notatki!
4. Należy ponownie uruchomić VS Code, aby zmienić język.

### Podstawowe operacje

#### Dodawanie notatek do tagów

- Kliknij prawym przyciskiem myszy na tag, wybierz "Importuj Pliki/Foldery...", aby dodać pliki/foldery notatek

![](../image/menu-1.png)

- Przeciągnij pliki/foldery z eksploratora plików do tagów

![](../image/path-2.gif)

- Jeśli plik zostanie przeniesiony lub usunięty, pojawi się ikona ostrzeżenia i wiadomość.
![](../image/fileerror.png)

- Możesz również ręcznie wprowadzać ścieżki w więcej operacji, co otworzy dedykowany panel Webview do wprowadzania większej liczby ścieżek.
    - Wprowadzanie tagu, możesz wprowadzić wiele tagów oddzielonych angielskimi przecinkami:
        ```
        Note1,Note2
        ```
    - Wprowadzanie pełnej ścieżki pliku, jedna ścieżka pliku na linię:
        ```
        D:\path\file1.txt
        D:\path\file2.txt
        ```
![](../image/path-1.png)

#### Zarządzanie tagami

- Kliknij "Dodaj Tagi..." w menu "Więcej", aby utworzyć nowe tagi/tagi wielopoziomowe
- Kliknij prawym przyciskiem myszy na tagi, aby dodać tagi, zmienić nazwę tagów, usunąć tagi
- Usunięcie tagu nie usunie plików notatek, które zawiera, tylko usunie je z kolekcji
- Kliknij na ikonę zwinąć, aby rozwinąć/zwinąć całą zawartość tagów
- Możesz również przenieść tagi do innych tagów

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### Wyszukiwanie notatek
- Kliknij ikonę wyszukiwania na pasku narzędzi
- Wprowadź słowa kluczowe wyszukiwania, aby znaleźć notatki we wszystkich tagach
- Pokazuje do 50 pasujących wyników
- Obsługuje tylko zwykłe formaty tekstowe; obrazy/dokumenty/wideo będą szukać tylko nazw plików. Pliki binarne wymagają zewnętrznego oprogramowania do przeszukiwania pełnego tekstu, takiego jak: Recoll, DocFetcher itp.

![](../image/search-1.gif)

#### Operacje na notatkach
- **Otwórz** : Kliknij dwukrotnie lub wybierz "Otwórz Plik" z menu kontekstowego
- **Pokaż w Eksploratorze** : Otwórz lokalizację pliku w eksploratorze
- **Zmień nazwę notatki** : Można zmienić na nową nazwę
- **Edytuj tagi** : Dodaj wiele tagów do notatek
- **Usuń notatkę** : Usuń notatki z kolekcji
- **Włącz/Wyłącz** : Ukryj/pokaż elementy plików notatek, nie usuwając pliku.

![](../image/menu-2.png)

### Eksportuj TXT / Importuj Eksportuj Pliki Kopii Zapasowych JSON

- W więcej operacjach:
- **Eksportuj jako TXT** : Wyeksportuj całą listę kolekcji notatek jako plik tekstowy
- **Eksportuj plik kopii zapasowej JSON** : Utwórz plik kopii zapasowej JSON, aby zapisać stan swojej kolekcji notatek dla łatwego odzyskania lub migracji do innych urządzeń.
- **Zaimportuj plik kopii zapasowej JSON** : Przywróć stan kolekcji notatek z wcześniej wyeksportowanego pliku kopii zapasowej JSON.
  - Uwaga: Zaimportowanie pliku kopii zapasowej JSON nadpisze aktualny stan kolekcji notatek, postępuj ostrożnie.


## Zrzuty ekranu

![](../image/screen-1.png)

## Wymagania systemowe

- Visual Studio Code wersja 1.80.0 lub wyższa

## Znane problemy

1. Po pierwszej instalacji może być konieczne ponowne uruchomienie VS Code, aby zmienić język.
2. Przy zwijaniu/rozwijaniu tagów mogą wystąpić problemy z odświeżaniem interfejsu. Spróbuj ręcznie rozwinąć tagi, aby rozwiązać.

## Współpraca

Współpraca jest mile widziana! Nie wahaj się wysyłać Pull Request.

1. Fork tego repozytorium
2. Utwórz gałąź i commit
5. Otwórz Pull Request

## Instrukcje budowania

### Rozwój lokalny

1. Klonuj repozytorium
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. Zainstaluj zależności
```bash
npm install
```

3. Skompiluj TypeScript
```bash
npm run compile
```

4. Naciśnij F5 w VS Code, aby rozpocząć debugowanie

### Pakowanie rozszerzenia

1. Zainstaluj vsce (VS Code Extension Packager)
```bash
npm install -g vsce
```

2. Pakuj jako plik `.vsix`
```bash
npm run package
```

Lub użyj komendy vsce bezpośrednio
```bash
vsce package
```

3. Wygenerowany plik `.vsix` można zainstalować ręcznie.

## Dziennik zmian

Zobacz [CHANGELOG.md](CHANGELOG.md), aby sprawdzić szczegóły aktualizacji każdej wersji.

## Licencja

Ten projekt jest licencjonowany pod GPL-3.0 Licencja - zobacz plik [LICENSE](LICENSE) dla szczegółów.

## Wsparcie

Jeśli napotkasz jakiekolwiek problemy lub masz sugestie dotyczące funkcji, odwiedź:
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## Podziękowania

- Dziękujemy wszystkim użytkownikom, którzy używają i wspierają to rozszerzenie
- Zainspirowane przez [vscode-project-manager](https://github.com/alefragnani/vscode-project-manager), dodając więcej funkcji na tej podstawie.

---
