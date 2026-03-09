<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">Collection de Notes</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](README_en.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

Une extension VS Code pour gérer et collecter des fichiers de notes étiquetés. Organisez vos notes efficacement grâce à une interface propre et intuitive.

## Fonctionnalités

- **Organiser les notes par étiquettes** : Catégoriser les notes dans des étiquettes personnalisées, supportant les étiquettes de répertoire multiniveaux
- **Recherche en texte intégral** : Rechercher instantanément du contenu dans tous les fichiers de notes
- **Gestion des étiquettes** : Créer, renommer et supprimer facilement des étiquettes
- **Import/Export** : Importer des fichiers de sauvegarde JSON pour restaurer des données, exporter la collection en fichiers TXT ou JSON
- **Glisser-déposer** : Faire glisser des fichiers/dossiers de notes vers différentes étiquettes pour une catégorisation rapide
- **Intégration de fichiers** : Ouvrir des notes dans de nouvelles fenêtres ou afficher dans l'explorateur de fichiers
- **Activer/Désactiver les notes** : Basculer la visibilité des notes sans les supprimer
- **Support multilingue** : Supporte 12 langues
  - English, 简体中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkçe, Polski, Čeština

## Guide vidéo

- [youtube](https://www.youtube.com/watch?v=uH8zRXyZyVA)
[![Note Collection](https://img.youtube.com/vi/uH8zRXyZyVA/0.jpg)](https://www.youtube.com/watch?v=uH8zRXyZyVA)

- [bilibili](https://www.bilibili.com/video/BV1TkPMzhEF2/)
[![Note Collection](https://i0.hdslb.com/bfs/archive/ec21db0cb688bfc6bb55a56ca90b7c6cac27cf3d.jpg@672w_378h_1c.avif)](https://www.bilibili.com/video/BV1TkPMzhEF2/)

## Installation

### Installer depuis le Marketplace VS Code

1. Ouvrir VS Code
2. Aller au panneau Extensions (Ctrl+Shift+X)
3. Recherchez "Note Collection" ou "Collection de notes" ou [Installez depuis le marché](https://marketplace.visualstudio.com/items?itemName=SaraKale.note-collection)
4. Cliquer sur Installer

![](../image/extensions-1.png)

### Installer depuis un fichier VSIX

1. Télécharger le fichier `.vsix` le plus récent depuis la page [Releases](https://github.com/sarakale/vscode-note-collection/releases)
2. Ouvrir VS Code
3. Appuyer sur Ctrl+Shift+P pour ouvrir la palette de commandes
4. Sélectionner "Extensions: Install from VSIX..."
5. Sélectionner le fichier `.vsix` téléchargé

![](../image/extensions-2.png)

## Utilisation

### Premiers pas

1. Après l'installation, la vue "Note Collection" apparaîtra dans la barre d'activité à gauche
2. Cliquer sur l'icône pour ouvrir le panneau latéral
3. Commencer à ajouter vos notes !
4. Il faut redémarrer VS Code pour changer de langue.

### Opérations de base

#### Ajouter des notes aux étiquettes

- Faire un clic droit sur une étiquette, sélectionner "Importer des Fichiers/Dossiers..." pour ajouter des fichiers/dossiers de notes

![](../image/menu-1.png)

- Faire glisser des fichiers/dossiers depuis l'explorateur de fichiers vers les étiquettes

![](../image/path-2.gif)

- Si un fichier est déplacé ou supprimé, une icône d'avertissement et un message apparaîtront.

![](../image/fileerror.png)

- Vous pouvez aussi saisir manuellement les chemins dans plus d'opérations, ce qui ouvrira un panneau Webview dédié pour saisir plus de chemins.
    - Saisie d'étiquette, vous pouvez saisir plusieurs étiquettes séparées par des virgules en anglais :
        ```
        Note1,Note2
        ```
    - Saisie du chemin complet du fichier, un chemin de fichier par ligne :
        ```
        D:\path\file1.txt
        D:\path\file2.txt
        ```
		
![](../image/path-1.png)

#### Gérer les étiquettes

- Cliquer sur "Ajouter des étiquettes..." dans le menu "Plus" pour créer de nouvelles étiquettes/étiquettes multiniveaux
- Faire un clic droit sur les étiquettes pour ajouter des étiquettes, renommer des étiquettes, supprimer des étiquettes
- Supprimer une étiquette ne supprimera pas les fichiers de notes qu'elle contient, seulement les retirer de la collection
- Cliquer sur l'icône de réduction pour développer/réduire tout le contenu des étiquettes
- Vous pouvez aussi déplacer les étiquettes dans d'autres étiquettes

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### Rechercher des notes
- Cliquer sur l'icône de recherche dans la barre d'outils
- Saisir des mots-clés de recherche pour trouver des notes dans toutes les étiquettes
- Affiche jusqu'à 50 résultats correspondants
- Supporte uniquement les formats de texte courants; les images/documents/vidéos ne rechercheront que les noms de fichiers. Les fichiers binaires nécessitent un logiciel de recherche en texte intégral tiers, tel que : Recoll, DocFetcher, etc.

![](../image/search-1.gif)

#### Opérations sur les notes
- **Ouvrir** : Double-cliquer ou sélectionner "Ouvrir le fichier" depuis le menu clic droit
- **Afficher dans l'explorateur** : Ouvrir l'emplacement du fichier dans l'explorateur
- **Renommer la note** : Peut changer vers un nouveau nom
- **Modifier les étiquettes** : Ajouter plusieurs étiquettes aux notes
- **Supprimer la note** : Supprimer les notes de la collection
- **Activer/Désactiver** : Masquer/afficher les éléments de fichiers de notes sans supprimer le fichier.

![](../image/menu-2.png)

### Exporter TXT / Importer Exporter Fichiers de Sauvegarde JSON

- Dans plus d'opérations :
- **Export en TXT** : Exporter la liste complète de la collection de notes en fichier texte
- **Exporter le fichier de sauvegarde JSON** : Créer un fichier de sauvegarde JSON pour enregistrer l'état de votre collection de notes pour une récupération facile ou une migration vers d'autres appareils.
- **Importer le fichier de sauvegarde JSON** : Restaurer l'état de la collection de notes depuis un fichier de sauvegarde JSON précédemment exporté.
  - Note : L'importation d'un fichier de sauvegarde JSON écrasera l'état actuel de la collection de notes, procédez avec prudence.


## Captures d'écran

![](../image/screen-1.png)

## Configuration requise

- Visual Studio Code version 1.80.0 ou supérieure

## Problèmes connus

1. Après la première installation, il peut être nécessaire de redémarrer VS Code pour changer de langue.
2. Lors du développement/réduction des étiquettes, il peut y avoir des problèmes de rafraîchissement de l'interface. Essayez de développer manuellement les étiquettes pour résoudre.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des Pull Requests.

1. Fork ce dépôt
2. Créer une branche et commit
5. Ouvrir une Pull Request

## Instructions de construction

### Développement local

1. Cloner le dépôt
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. Installer les dépendances
```bash
npm install
```

3. Compiler TypeScript
```bash
npm run compile
```

4. Appuyer sur F5 dans VS Code pour démarrer le débogage

### Empaqueter l'extension

1. Installer vsce (VS Code Extension Packager)
```bash
npm install -g vsce
```

2. Empaqueter en fichier `.vsix`
```bash
npm run package
```

Ou utiliser la commande vsce directement
```bash
vsce package
```

3. Le fichier `.vsix` généré peut être installé manuellement.

## Journal des modifications

Consultez [CHANGELOG.md](CHANGELOG.md) pour les détails des mises à jour de chaque version.

## Licence

Ce projet est sous licence GPL-3.0 - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Support

Si vous rencontrez des problèmes ou avez des suggestions de fonctionnalités, veuillez visiter :
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## Remerciements

- Merci à tous les utilisateurs qui utilisent et soutiennent cette extension
- Inspiré par [vscode-project-manager](https://github.com/alefragnani/vscode-project-manager), ajoutant plus de fonctionnalités sur cette base.

---
