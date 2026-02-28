<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">Kolekce Poznámek</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](README_en.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

Rozšíření VS Code pro správu a sbírání označených souborů poznámek. Efektivně organizujte své poznámky prostřednictvím čistého a intuitivního rozhraní.

## Funkce

- **Organizovat poznámky podle štítků** : Kategorizovat poznámky do vlastní štítky podporující víceúrovňové štítky adresářů
- **Fulltextové vyhledávání** : Okamžitě hledat obsah ve všech souborech poznámek
- **Správa štítků** : Snadné vytváření, přejmenování a odstraňování štítků
- **Import/Export** : Importovat záložní soubory JSON pro obnovu dat, exportovat sbírku do záložních souborů TXT nebo JSON
- **Drag and drop** : Přetáhnout soubory/složky poznámek do různých štítků pro rychlou kategorizaci
- **Integrace souborů** : Otevřít poznámky v nových oknech nebo zobrazit v průzkumníku souborů
- **Povolit/Zakázat poznámky** : Přepínat viditelnost poznámek bez jejich odstranění
- **Podpora více jazyků** : Podporuje 12 jazyků
  - English, 简体中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkçe, Polski, Čeština

## Instalace

### Instalovat z VS Code Marketplace

1. Otevřít VS Code
2. Přejít na panel rozšíření (Ctrl+Shift+X)
3. Najít "Note Collection" nebo "笔记收藏集"
4. Kliknout na Instalovat

![](../image/extensions-1.png)

### Instalovat ze souboru VSIX

1. Stáhnout nejnovější soubor `.vsix` ze stránky [Releases](https://github.com/sarakale/vscode-note-collection/releases)
2. Otevřít VS Code
3. Stisknout Ctrl+Shift+P pro otevření palety příkazů
4. Vybrat "Extensions: Install from VSIX..."
5. Vybrat stažený soubor `.vsix`

![](../image/extensions-2.png)

## Použití

### Začínáme

1. Po instalaci se zobrazení "Note Collection" objeví v levém panelu aktivit
2. Kliknout na ikonu pro otevření postranního panelu
3. Začněte přidávat své poznámky!
4. Je třeba restartovat VS Code, aby se změnil jazyk.

### Základní operace

#### Přidat poznámky do štítků

- Kliknout pravým tlačítkem myši na štítek, vybrat "Importovat Soubory/Složky..." pro přidání souborů/složek poznámek

![](../image/menu-1.png)

- Přetáhnout soubory/složky z průzkumníku souborů do štítků

![](../image/path-2.gif)

- Pokud je soubor přesunut nebo odstraněn, objeví se ikona varování a zpráva.
![](../image/fileerror.png)

- Můžete také ručně zadávat cesty v dalších operacích, což otevře vyhrazený panel Webview pro zadání více cest.
    - Vstup štítku, můžete zadat více štítků oddělených anglickými čárkami:
        ```
        Note1,Note2
        ```
    - Vstup úplné cesty k souboru, jedna cesta k souboru na řádek:
        ```
        D:\cesta\file1.txt
        D:\cesta\file2.txt
        ```
![](../image/path-1.png)

#### Správa štítků

- Kliknout "Přidat Štítky..." v menu "Více" pro vytvoření nových štítků/víceúrovňových štítků
- Kliknout pravým tlačítkem myši na štítky pro přidání štítků, přejmenování štítků, odstranění štítků
- Odstranění štítku neodstraní soubory poznámek, které obsahuje, jen je odstraní ze sbírky
- Kliknout na ikonu sbalit pro rozbalení/sbalení celého obsahu štítků
- Můžete také přesunout štítky do jiných štítků

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### Hledání poznámek
- Kliknout na ikonu hledání na panelu nástrojů
- Zadat vyhledávací klíčová slova pro nalezení poznámek ve všech štítkách
- Zobrazí až a 50 odpovídajících výsledků
- Podporuje pouze běžné textové formáty; obrázky/dokumenty/videa budou hledat pouze názvy souborů. Pro binární soubory je vyžadován software třetí strany pro fulltextové vyhledávání, například: Recoll, DocFetcher atd.

![](../image/search-1.gif)

#### Operace s poznámkami
- **Otevřít** : Dvakrát kliknout nebo zvolit "Otevřít Soubor" z kontextového menu
- **Zobrazit v Průzkumníkovi** : Otevřít umístění souboru v průzkumníkovi
- **Přejmenovat poznámku** : Lze změnit na nový název
- **Upravit štítky** : Přidat více štítků k poznámkám
- **Odstranit poznámku** : Odstranit poznámky ze sbírky
- **Povolit/Zakázat** : Skrýt/zobrazit položky souborů poznámek, aniž by se soubor skutečně odstranil.

![](../image/menu-2.png)

### Exportovat TXT / Importovat Exportovat Záložní soubory JSON

- V dalších operacích:
- **Exportovat jako TXT** : Exportovat celý seznam sbírky poznámek jako textový soubor
- **Exportovat záložní soubor JSON** : Vytvořit záložní soubor JSON pro uložení stavu vaší sbírky poznámek pro snadné obnovení nebo migraci na jiná zařízení.
- **Importovat záložní soubor JSON** : Obnovit stav sbírky poznámek z dříve exportovaného záložního souboru JSON.
  - Poznámka: Import záložního souboru JSON přepíše aktuální stav sbírky poznámek, postupujte opatrně.


## Snímky obrazovky

![](../image/screen-1.png)

## Systémové požadavky

- Visual Studio Code verze 1.80.0 nebo vyšší

## Známé problémy

1. Po první instalaci může být nutné restartovat VS Code, aby se změnil jazyk.
2. Při sbalování/rozbalování štítků se mohou objevit problémy s aktualizací uživatelského rozhraní. Zkuste ručně rozbalit štítky pro vyřešení.

## Přispěvat

Příspěvky jsou vítány! Neváhejte zaslat Pull Requests.

1. Fork tohoto repozitáře
2. Vytvořit větev a commit
5. Otevřít Pull Request

## Pokyny pro sestavení

### Místní vývoj

1. Klonovat repozitář
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. Instalovat závislosti
```bash
npm install
```

3. Kompilovat TypeScript
```bash
npm run compile
```

4. Stisknout F5 ve VS Code pro spuštění ladění

### Balení rozšíření

1. Instalovat vsce (VS Code Extension Packager)
```bash
npm install -g vsce
```

2. Zabalit jako soubor `.vsix`
```bash
npm run package
```

Nebo použijte příkaz vsce přímo
```bash
vsce package
```

3. Vygenerovaný soubor `.vsix` lze nainstalovat ručně.

## Záznam změn

Viz [CHANGELOG.md](CHANGELOG.md) pro detaily aktualizace každé verze.

## Licence

Tento projekt je licencován pod GPL-3.0 Licence - viz soubor [LICENSE](LICENSE) pro detaily.

## Podpora

Pokud narazíte na nějaké problémy nebo máte návrhy funkcí, prosím navštivte:
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## Poděkování

- Děkujeme všem uživatelům, kteří používají a podporují toto rozšíření
- Inspirováno [vscode-project-manager](https://github.com/alefragnani/vscode-project-manager), přidáním více funkcí na této základně.

---
