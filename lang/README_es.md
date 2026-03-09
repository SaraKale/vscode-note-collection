<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">Colección de Notas</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](README_en.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

Una extensión de VS Code para administrar y recopilar archivos de notas etiquetados. Organice sus notas de manera eficiente a través de una interfaz limpia e intuitiva.

## Características

- **Organizar notas por etiquetas** : Categorizar notas en etiquetas personalizadas, soportando etiquetas de directorio multinivel
- **Búsqueda de texto completo** : Buscar contenido instantáneamente en todos los archivos de notas
- **Gestión de etiquetas** : Crear, renombrar y eliminar etiquetas fácilmente
- **Importar/Exportar** : Importar archivos de respaldo JSON para restaurar datos, exportar colección a archivos de respaldo TXT o JSON
- **Arrastrar y soltar** : Arrastrar archivos/carpetas de notas a diferentes etiquetas para una categorización rápida
- **Integración de archivos** : Abrir notas en nuevas ventanas o mostrar en el explorador de archivos
- **Activar/Desactivar notas** : Alternar la visibilidad de las notas sin eliminarlas
- **Soporte multilingüe** : Soporta 12 idiomas
  - English, 简体中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkçe, Polski, Čeština

## Guía de video

- [youtube](https://www.youtube.com/watch?v=uH8zRXyZyVA)
[![Note Collection](https://img.youtube.com/vi/uH8zRXyZyVA/0.jpg)](https://www.youtube.com/watch?v=uH8zRXyZyVA)

- [bilibili](https://www.bilibili.com/video/BV1TkPMzhEF2/)
[![Note Collection](https://i0.hdslb.com/bfs/archive/ec21db0cb688bfc6bb55a56ca90b7c6cac27cf3d.jpg@672w_378h_1c.avif)](https://www.bilibili.com/video/BV1TkPMzhEF2/)

## Instalación

### Instalar desde el Marketplace de VS Code

1. Abra VS Code
2. Vaya al panel de extensiones (Ctrl+Shift+X)
3. Buscar "Note Collection" o "Colección de notas" o [instalar en el mercado de extensiones](https://marketplace.visualstudio.com/items?itemName=SaraKale.note-collection)
4. Haga clic en Instalar

![](../image/extensions-1.png)

### Instalar desde un archivo VSIX

1. Descargue el archivo `.vsix` más reciente desde la página [Releases](https://github.com/sarakale/vscode-note-collection/releases)
2. Abra VS Code
3. Presione Ctrl+Shift+P para abrir la paleta de comandos
4. Seleccione "Extensions: Install from VSIX..."
5. Seleccione el archivo `.vsix` descargado

![](../image/extensions-2.png)

## Uso

### Primeros pasos

1. Después de la instalación, la vista "Note Collection" aparecerá en la barra de actividad izquierda
2. Haga clic en el icono para abrir el panel lateral
3. ¡Comience a agregar sus notas!
4. Es necesario reiniciar VS Code para cambiar el idioma.

### Operaciones básicas

#### Agregar notas a etiquetas

- Haga clic derecho en una etiqueta, seleccione "Importar archivos/carpetas..." para agregar archivos/carpetas de notas

![](../image/menu-1.png)

- Arrastrar archivos/carpetas desde el explorador de archivos a las etiquetas

![](../image/path-2.gif)

- Si un archivo se mueve o elimina, aparecerá un icono de advertencia y un mensaje.

![](../image/fileerror.png)

- También puede ingresar rutas manualmente en más operaciones, lo que abrirá un panel Webview dedicado para ingresar más rutas.
    - Entrada de etiqueta, puede ingresar múltiples etiquetas separadas por comas en inglés:
        ```
        Nota1,Nota2
        ```
    - Entrada de ruta completa de archivo, una ruta de archivo por línea:
        ```
        D:\ruta\archivo1.txt
        D:\ruta\archivo2.txt
        ```

![](../image/path-1.png)

#### Gestionar etiquetas

- Haga clic en "Añadir etiquetas..." en el menú "Más" para crear nuevas etiquetas/etiquetas multinivel
- Haga clic derecho en las etiquetas para agregar etiquetas, renombrar etiquetas, eliminar etiquetas
- Eliminar una etiqueta no eliminará los archivos de notas que contiene, solo los eliminará de la colección
- Haga clic en el icono de colapsar para expandir/colapsar todo el contenido de las etiquetas
- También puede mover etiquetas dentro de otras etiquetas

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### Buscar notas
- Haga clic en el icono de búsqueda en la barra de herramientas
- Ingrese palabras clave de búsqueda para encontrar notas en todas las etiquetas
- Muestra hasta a 50 resultados coincidentes
- Solo admite formatos de texto comunes; imágenes/documentos/videos solo buscarán nombres de archivo. Los archivos binarios requieren software de búsqueda de texto completo de terceros, como: Recoll, DocFetcher, etc.

![](../image/search-1.gif)

#### Operaciones de notas
- **Abrir** : Haga doble clic o seleccione "Abrir archivo" desde el menú contextual
- **Mostrar en el explorador** : Abrir la ubicación del archivo en el explorador
- **Renombrar nota** : Puede cambiar a un nuevo nombre
- **Editar etiquetas** : Agregar múltiples etiquetas a las notas
- **Eliminar nota** : Eliminar notas de la colección
- **Activar/Desactivar** : Ocultar/mostrar elementos de archivos de notas sin eliminar realmente el archivo.

![](../image/menu-2.png)

### Exportar TXT / Importar Exportar Archivos de Respaldo JSON

- En más operaciones:
- **Exportar como TXT** : Exportar la lista completa de la colección de notas como archivo de texto
- **Exportar archivo de respaldo JSON** : Crear un archivo de respaldo JSON para guardar el estado de su colección de notas para una fácil recuperación o migración a otros dispositivos.
- **Importar archivo de respaldo JSON** : Restaurar el estado de la colección de notas desde un archivo de respaldo JSON previamente exportado.
  - Nota: Importar un archivo de respaldo JSON sobrescribirá el estado actual de la colección de notas, proceda con precaución.


## Capturas de pantalla

![](../image/screen-1.png)

## Requisitos del sistema

- Visual Studio Code versión 1.80.0 o superior

## Problemas conocidos

1. Después de la primera instalación, es posible que deba reiniciar VS Code para cambiar el idioma.
2. Al colapsar/expandir etiquetas, pueden aparecer problemas de actualización de la interfaz. Intente expandir manualmente las etiquetas para resolver.

## Contribuir

¡Las contribuciones son bienvenidas! No dude en enviar Pull Requests.

1. Forkear este repositorio
2. Crear una rama y commit
5. Abrir un Pull Request

## Instrucciones de compilación

### Desarrollo local

1. Clonar el repositorio
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. Instalar dependencias
```bash
npm install
```

3. Compilar TypeScript
```bash
npm run compile
```

4. Presione F5 en VS Code para iniciar la depuración

### Empaquetar extensión

1. Instalar vsce (VS Code Extension Packager)
```bash
npm install -g vsce
```

2. Empaquetar como archivo `.vsix`
```bash
npm run package
```

O use el comando vsce directamente
```bash
vsce package
```

3. El archivo `.vsix` generado se puede instalar manualmente.

## Registro de cambios

Consulte [CHANGELOG.md](CHANGELOG.md) para detalles de actualización de cada versión.

## Licencia

Este proyecto está bajo licencia GPL-3.0 - consulte el archivo [LICENSE](LICENSE) para más detalles.

## Soporte

Si encuentra algún problema o tiene sugerencias de funciones, visite:
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## Agradecimientos

- Gracias a todos los usuarios que usan y apoyan esta extensión
- Inspirado en [vscode-project-manager](https://github.com/alefragnani/vscode-project-manager), agregando más funciones sobre esta base.

---
