<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">Raccolta Note</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](README_en.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

Un'estensione VS Code per gestire e raccogliere file di note etichettati. Organizza le tue note in modo efficiente attraverso un'interfaccia pulita e intuitiva.

## Funzionalità

- **Organizza note per tag** : Categorizza note in tag personalizzati, supportando tag di directory multilivello
- **Ricerca testo completo** : Cerca istantaneamente contenuti in tutti i file di note
- **Gestione tag** : Crea, rinomina ed elimina facilmente i tag
- **Importa/Esporta** : Importa file di backup JSON per ripristinare dati, esporta raccolta in file di backup TXT o JSON
- **Drag and drop** : Trascina file/cartelle di note in diversi tag per una categorizzazione rapida
- **Integrazione file** : Apri note in nuove finestre o mostra nel file explorer
- **Abilita/Disabilita note** : Commuta la visibilità delle note senza eliminarle
- **Supporto multilingua** : Supporta 12 lingue
  - English, 简体中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkçe, Polski, Čeština

## Installazione

### Installa dal Marketplace VS Code

1. Apri VS Code
2. Vai al pannello Estensioni (Ctrl+Shift+X)
3. Cerca "Note Collection" o "笔记收藏集"
4. Clicca su Installa

![](../image/extensions-1.png)

### Installa da file VSIX

1. Scarica l'ultimo file `.vsix` dalla pagina [Releases](https://github.com/sarakale/vscode-note-collection/releases)
2. Apri VS Code
3. Premi Ctrl+Shift+P per aprire il riquadro comandi
4. Seleziona "Extensions: Install from VSIX..."
5. Seleziona il file `.vsix` scaricato

![](../image/extensions-2.png)

## Utilizzo

### Per iniziare

1. Dopo l'installazione, la visualizzazione "Note Collection" apparirà nella barra di attività sinistra
2. Clicca sull'icona per aprire la barra laterale
3. Inizia ad aggiungere le tue note!
4. È necessario riavviare VS Code per cambiare lingua.

### Operazioni di base

#### Aggiungere note ai tag

- Clicca con il tasto destro su un tag, seleziona "Importa File/Cartelle..." per aggiungere file/cartelle di note

![](../image/menu-1.png)

- Trascina file/cartelle dal file explorer nei tag

![](../image/path-2.gif)

- Se un file viene spostato o cancellato, apparirà un'icona di avviso e un messaggio.
![](../image/fileerror.png)

- Puoi anche inserire manualmente i percorsi in ulteriori operazioni, che aprirà un pannello Webview dedicato per inserire più percorsi.
    - Inserimento tag, puoi inserire più tag separati da virgole inglesi:
        ```
        Note1,Note2
        ```
    - Inserimento percorso completo file, un percorso file per riga:
        ```
        D:\path\file1.txt
        D:\path\file2.txt
        ```
![](../image/path-1.png)

#### Gestire tag

- Clicca "Aggiungi Tag..." nel menu "Altro" per creare nuovi tag/tag multilivello
- Clicca con il tasto destro sui tag per aggiungere tag, rinominare tag, eliminare tag
- L'eliminazione di un tag non eliminerà i file di note che contiene, solo li rimuoverà dalla raccolta
- Clicca sull'icona di compressione per espandere/comprimere tutto il contenuto dei tag
- Puoi anche spostare i tag all'interno di altri tag

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### Cercare note
- Clicca sull'icona di ricerca nella barra degli strumenti
- Inserisci parole chiave di ricerca per trovare note in tutti i tag
- Mostra fino a 50 risultati corrispondenti
- Supporta solo formati di testo comuni; immagini/documenti/video cercheranno solo i nomi dei file. I file binari richiedono software di ricerca testo completo di terze parti, come: Recoll, DocFetcher, ecc.

![](../image/search-1.gif)

#### Operazioni sulle note
- **Apri** : Doppio clic o seleziona "Apri File" dal menu contestuale
- **Mostra nel Explorer** : Apri la posizione del file nell'explorer
- **Rinomina nota** : Può cambiare in un nuovo nome
- **Modifica tag** : Aggiungi più tag alle note
- **Elimina nota** : Rimuovi note dalla raccolta
- **Abilita/Disabilita** : Nascondi/mostra elementi file note senza cancellare il file.

![](../image/menu-2.png)

### Esporta TXT / Importa Esporta File Backup JSON

- In altre operazioni:
- **Esporta come TXT** : Esporta l'intera lista di raccolta note come file di testo
- **Esporta file backup JSON** : Crea un file backup JSON per salvare lo stato della tua raccolta note per un facile ripristino o migrazione ad altri dispositivi.
- **Importa file backup JSON** : Ripristina lo stato della raccolta note da un file backup JSON precedentemente esportato.
  - Nota: L'importazione di un file backup JSON sovrascriverà lo stato corrente della raccolta note, procedere con cautela.


## Screenshot

![](../image/screen-1.png)

## Requisiti di sistema

- Visual Studio Code versione 1.80.0 o superiore

## Problemi noti

1. Dopo la prima installazione, potrebbe essere necessario riavviare VS Code per cambiare lingua.
2. Quando si comprimono/espandono i tag, possono presentarsi problemi di aggiornamento dell'interfaccia. Provare ad espandere manualmente i tag per risolvere.

## Contributi

I contributi sono benvenuti! Sentitevi liberi di inviare Pull Requests.

1. Fork questo repository
2. Crea un branch e commit
5. Apri una Pull Request

## Istruzioni di costruzione

### Sviluppo locale

1. Clona il repository
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. Installa le dipendenze
```bash
npm install
```

3. Compila TypeScript
```bash
npm run compile
```

4. Premi F5 in VS Code per avviare il debug

### Pacchetto estensione

1. Installa vsce (VS Code Extension Packager)
```bash
npm install -g vsce
```

2. Pacchettizza come file `.vsix`
```bash
npm run package
```

Oppure usa il comando vsce direttamente
```bash
vsce package
```

3. Il file `.vsix` generato può essere installato manualmente.

## Changelog

Vedi [CHANGELOG.md](CHANGELOG.md) per i dettagli dell'aggiornamento di ogni versione.

## Licenza

Questo progetto è concesso in licenza sotto GPL-3.0 Licenza - vedi il file [LICENSE](LICENSE) per i dettagli.

## Supporto

Se riscontri problemi o hai suggerimenti di funzionalità, visita:
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## Ringraziamenti

- Grazie a tutti gli utenti che utilizzano e supportano questa estensione
- Ispirata da [vscode-project-manager](https://github.com/alefragnani/vscode-project-manager), aggiungendo più funzionalità su questa base.

---
