<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">Notizsammlung</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](README_en.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

Eine VS Code-Erweiterung zur Verwaltung und Sammlung von getaggten Notizdateien. Organisieren Sie Ihre Notizen effizient durch eine saubere und intuitive Benutzeroberfläche.

## Funktionen

- **Notizen nach Tags organisieren** : Kategorisieren Sie Notizen in benutzerdefinierte Tags mit Unterstützung für mehrstufige Verzeichnis-Tags
- **Volltextsuche** : Suchen Sie sofort in allen Notizdateien
- **Tag-Verwaltung** : Erstellen, umbenennen und löschen Sie Tags einfach
- **Import/Export** : Importieren Sie JSON-Backup-Dateien zum Wiederherstellen von Daten, exportieren Sie Sammlungen als TXT- oder JSON-Backup-Dateien
- **Drag & Drop** : Ziehen Sie Notizdateien/ordner in verschiedene Tags für schnelle Kategorisierung
- **Dateiintegration** : Öffnen Sie Notizen in neuen Fenstern oder zeigen Sie sie im Datei-Explorer an
- **Notizen aktivieren/deaktivieren** : Schalten Sie die Sichtbarkeit von Notizen um, ohne sie zu löschen
- **Mehrsprachunterstützung** : Unterstützt 12 Sprachen
  - English, 简体中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkçe, Polski, Čeština

## Videoanleitung

- [youtube](https://www.youtube.com/watch?v=uH8zRXyZyVA)
- [![Note Collection](https://img.youtube.com/vi/uH8zRXyZyVA/0.jpg)](https://www.youtube.com/watch?v=uH8zRXyZyVA)

- [bilibili](https://www.bilibili.com/video/BV1TkPMzhEF2/)
- [![Note Collection](https://i0.hdslb.com/bfs/archive/ec21db0cb688bfc6bb55a56ca90b7c6cac27cf3d.jpg@672w_378h_1c.avif)](https://www.bilibili.com/video/BV1TkPMzhEF2/)

## Installation

### Installation aus dem VS Code Marketplace

1. Öffnen Sie VS Code
2. Gehen Sie zum Erweiterungsbereich (Ctrl+Shift+X)
3. Suchen Sie nach "Note Collection" oder "Notizensammlung" oder [erweitern Sie den Markt](https://marketplace.visualstudio.com/items?itemName=SaraKale.note-collection)
4. Klicken Sie auf Installieren

![](../image/extensions-1.png)

### Installation aus einer VSIX-Datei

1. Laden Sie die neueste `.vsix`-Datei von der [Releases](https://github.com/sarakale/vscode-note-collection/releases)-Seite herunter
2. Öffnen Sie VS Code
3. Drücken Sie Ctrl+Shift+P, um die Befehlspalette zu öffnen
4. Wählen Sie "Extensions: Install from VSIX..."
5. Wählen Sie die heruntergeladene `.vsix`-Datei aus

![](../image/extensions-2.png)

## Verwendung

### Erste Schritte

1. Nach der Installation erscheint die Ansicht "Note Collection" in der linken Aktivitätsleiste
2. Klicken Sie auf das Symbol, um die Seitenleiste zu öffnen
3. Beginnen Sie, Ihre Notizen hinzuzufügen!
4. Sie müssen VS Code neu starten, um die Sprache zu wechseln.

### Grundlegende Bedienung

#### Notizen zu Tags hinzufügen

- Klicken Sie mit der rechten Maustaste auf ein Tag und wählen Sie "Dateien/Ordner importieren...", um Notizdateien/ordner hinzuzufügen

![](../image/menu-1.png)

- Ziehen Sie Dateien/Ordner aus dem Datei-Explorer in die Tags

![](../image/path-2.gif)

- Wenn eine Datei verschoben oder gelöscht wurde, erscheint ein Warnsymbol und eine Meldung.

![](../image/fileerror.png)

- Sie können Pfade auch manuell in weiteren Operationen eingeben, was ein dediziertes Webview-Panel zum Eingeben weiterer Pfade öffnet.
    - Tag-Eingabe, Sie können mehrere Tags durch englische Kommas getrennt eingeben:
        ```
        Note1,Note2
        ```
    - Vollständiger Dateipfad-Eingabe, ein Dateipfad pro Zeile:
        ```
        D:\path\file1.txt
        D:\path\file2.txt
        ```

![](../image/path-1.png)

- Wenn neue Dateien/Ordner im Datei-Explorer hinzugefügt werden, wird die Benutzeroberfläche automatisch aktualisiert. Wenn neue Dateien oder Ordner nicht angezeigt werden, können Sie manuell auf die Aktualisieren-Schaltfläche klicken.
- Beim Verschieben oder Löschen von Dateien/Ordnern wird die Benutzeroberfläche nicht schnell aktualisiert. Sie müssen manuell auf die Aktualisieren-Schaltfläche klicken, um zu aktualisieren.

#### Tags verwalten

- Klicken Sie im "Mehr"-Menü auf "Tags hinzufügen...", um neue Tags/mehrstufige Tags zu erstellen
- Klicken Sie mit der rechten Maustaste auf Tags, um Tags hinzuzufügen, Tags umzubenennen, Tags zu löschen
- Das Löschen von Tags löscht nicht die darin enthaltenen Notizdateien, sondern entfernt sie nur aus der Sammlung
- Klicken Sie auf das Einklapp-Symbol, um alle Tag-Inhalte zu erweitern/einzuklappen
- Sie können Tags auch in andere Tags verschieben

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### Notizen durchsuchen

- Klicken Sie auf das Suchsymbol in der Symbolleiste
- Geben Sie Suchbegriffe ein, um Notizen in allen Tags zu finden
- Zeigt bis zu 50 übereinstimmende Ergebnisse an
- Unterstützt nur gängige Textformate; bei Bilder/Dokumenten/Videos werden nur Dateinamen durchsucht. Für Binärdateien wird Volltextsuchsoftware von Drittanbietern benötigt, wie z.B.: Recoll, DocFetcher, usw.

![](../image/search-1.gif)

#### Notizoperationen

- **Öffnen** : Doppelklicken oder "Datei öffnen" aus dem Kontextmenü wählen
- **Im Explorer anzeigen** : Den Speicherort der Datei im Explorer öffnen
- **Notiz umbenennen** : Kann zu einem neuen Namen geändert werden
- **Tags bearbeiten** : Mehrere Tags zu Notizen hinzufügen
- **Notiz löschen** : Notizen aus der Sammlung entfernen
- **Aktivieren/Deaktivieren** : Notizdateielemente ausblenden/anzeigen, ohne die Datei tatsächlich zu löschen.

![](../image/menu-2.png)

### TXT exportieren / JSON-Backup-Dateien importieren exportieren

- In weiteren Operationen:
- **Als TXT exportieren** : Die gesamte Notizsammlung als TXT-Datei exportieren
- **JSON-Backup-Datei exportieren** : Eine JSON-Backup-Datei erstellen, um den Status Ihrer Notizsammlung zu speichern, was eine einfache Wiederherstellung oder Migration zu anderen Geräten ermöglicht.
- **JSON-Backup-Datei importieren** : Den Status der Notizsammlung aus einer zuvor exportierten JSON-Backup-Datei wiederherstellen.
  - Hinweis: Das Importieren einer JSON-Backup-Datei überschreibt den aktuellen Status der Notizsammlung. Bitte fahren Sie mit Vorsicht fort.


## Screenshots

![](../image/screen-1.png)

## Systemanforderungen

- Visual Studio Code Version 1.80.0 oder höher

## Bekannte Probleme

1. Nach der ersten Installation müssen Sie VS Code möglicherweise neu starten, um die Sprache zu wechseln.
2. Beim Zusammenklappen/Ausklappen von Tags können UI-Aktualisierungsprobleme auftreten. Versuchen Sie, Tags manuell auszuklappen, um das Problem zu lösen.
3. Wenn es zu viele Notizeinträge gibt, kann das Laden von VS Code lange dauern. Ich habe mit über 6000 Notizen getestet und es hat 8 Sekunden gedauert, um zu öffnen. Wenn Notizen nicht erscheinen, warten Sie bitte geduldig auf das Laden.

## Beitragen

Beiträge sind willkommen! Zögern Sie nicht, Pull Requests zu senden.

1. Fork dieses Repository
2. Einen Branch erstellen und committen
5. Einen Pull Request öffnen

## Build-Anweisungen

### Lokale Entwicklung

1. Repository klonen
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. Abhängigkeiten installieren
```bash
npm install
```

3. TypeScript kompilieren
```bash
npm run compile
```

4. Drücken Sie F5 in VS Code, um das Debugging zu starten

### Erweiterung paketieren

1. vsce installieren (VS Code Extension Packager)
```bash
npm install -g vsce
```

2. Als `.vsix`-Datei paketieren
```bash
npm run package
```

Oder verwenden Sie den vsce-Befehl direkt
```bash
vsce package
```

3. Die generierte `.vsix`-Datei kann manuell installiert werden.

## Änderungsprotokoll

Sehen Sie [CHANGELOG.md](CHANGELOG.md) für Updatedetails jeder Version ein.

## Lizenz

Dieses Projekt ist unter der GPL-3.0-Lizenz lizenziert - siehe die [LICENSE](LICENSE)-Datei für Details.

## Support

Wenn Sie Probleme haben oder Funktionsvorschläge haben, besuchen Sie bitte:
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## Danksagungen

- Danke an alle Benutzer, die diese Erweiterung verwenden und unterstützen
- Inspiriert von [vscode-project-manager](https://github.com/alefragnani/vscode-project-manager), mit weiteren Funktionen auf dieser Basis.

---
