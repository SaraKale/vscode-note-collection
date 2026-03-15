<h1 align="center">Note Collection</h1>

<p align="center">
<font size="20px">Coleção de Notas</font><br />
</p>
 
<p align="center">
  <img src="../media/icon.png" align="middle" width = "100"/>
    <br /><br />
</p>

language: [English](README_en.md) | [简体中文](README_zh-cn.md) | [繁體中文](README_zh-tw.md) | [Français](README_fr.md) | [Deutsch](README_de.md) | [Español](README_es.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-br.md) | [Türkçe](README_tr.md) | [Polski](README_pl.md) | [Čeština](README_cs.md)

Uma extensão do VS Code para gerenciar e coletar arquivos de notas etiquetados. Organize suas notas de forma eficiente através de uma interface limpa e intuitiva.

## Funcionalidades

- **Organizar notas por etiquetas** : Categorizar notas em etiquetas personalizadas, suportando etiquetas de diretório multinível
- **Busca de texto completo** : Pesquisar conteúdo instantaneamente em todos os arquivos de notas
- **Gerenciamento de etiquetas** : Criar, renomear e excluir etiquetas facilmente
- **Importar/Exportar** : Importar arquivos de backup JSON para restaurar dados, exportar coleção para arquivos de backup TXT ou JSON
- **Arrastar e soltar** : Arrastar arquivos/pastas de notas para diferentes etiquetas para categorização rápida
- **Integração de arquivos** : Abrir notas em novas janelas ou mostrar no explorador de arquivos
- **Ativar/Desativar notas** : Alternar a visibilidade das notas sem excluí-las
- **Suporte multilíngue** : Suporta 12 idiomas
  - English, 简体中文, 繁體中文, Français, Deutsch, Español
  - 日本語, 한국어, Русский, Italiano, Português (Brasil), Türkçe, Polski, Čeština

## Guia de vídeo

- [youtube](https://www.youtube.com/watch?v=uH8zRXyZyVA)
- [![Note Collection](https://img.youtube.com/vi/uH8zRXyZyVA/0.jpg)](https://www.youtube.com/watch?v=uH8zRXyZyVA)

- [bilibili](https://www.bilibili.com/video/BV1TkPMzhEF2/)
- [![Note Collection](https://i0.hdslb.com/bfs/archive/ec21db0cb688bfc6bb55a56ca90b7c6cac27cf3d.jpg@672w_378h_1c.avif)](https://www.bilibili.com/video/BV1TkPMzhEF2/)

## Instalação

### Instalar do Marketplace do VS Code

1. Abrir o VS Code
2. Ir para o painel de Extensões (Ctrl+Shift+X)
3. Pesquise por "Note Collection" ou "Coleção de notas" ou [instale no Marketplace](https://marketplace.visualstudio.com/items?itemName=SaraKale.note-collection)
4. Clicar em Instalar

![](../image/extensions-1.png)

### Instalar de um arquivo VSIX

1. Baixar o último arquivo `.vsix` da página [Releases](https://github.com/sarakale/vscode-note-collection/releases)
2. Abrir o VS Code
3. Pressionar Ctrl+Shift+P para abrir o Paleta de Comandos
4. Selecionar "Extensions: Install from VSIX..."
5. Selecionar o arquivo `.vsix` baixado

![](../image/extensions-2.png)

## Uso

### Começando

1. Após a instalação, a visualização "Note Collection" aparecerá na barra de atividades esquerda
2. Clicar no ícone para abrir a barra lateral
3. Comece a adicionar suas notas!
4. É necessário reiniciar o VS Code para mudar o idioma.

### Operações básicas

#### Adicionar notas às etiquetas

- Clicar com o botão direito em uma etiqueta, selecionar "Importar Arquivos/Pastas..." para adicionar arquivos/pastas de notas

![](../image/menu-1.png)

- Arrastar arquivos/pastas do explorador de arquivos para as etiquetas

![](../image/path-2.gif)

- Se um arquivo for movido ou excluído, aparecerá um ícone de aviso e uma mensagem.

![](../image/fileerror.png)

- Você também pode inserir caminhos manualmente em mais operações, que abrirá um painel Webview dedicado para inserir mais caminhos.
    - Entrada de etiqueta, você pode inserir várias etiquetas separadas por vírgulas em inglês:
        ```
        Note1,Note2
        ```
    - Entrada de caminho completo do arquivo, um caminho de arquivo por linha:
        ```
        D:\path\file1.txt
        D:\path\file2.txt
        ```

![](../image/path-1.png)

- Se novos arquivos/pastas forem adicionados no explorador de arquivos, a interface será atualizada automaticamente. Se os novos arquivos ou pastas não aparecerem, você pode clicar manualmente no botão de atualização.
- Ao mover ou excluir arquivos/pastas, a interface não será atualizada rapidamente. Você precisa clicar manualmente no botão de atualização para atualizar.

#### Gerenciar etiquetas

- Clicar "Adicionar Etiquetas..." no menu "Mais" para criar novas etiquetas/etiquetas multinível
- Clicar com o botão direito nas etiquetas para adicionar etiquetas, renomear etiquetas, excluir etiquetas
- Excluir uma etiqueta não excluirá os arquivos de notas que ela contém, apenas os removerá da coleção
- Clicar no ícone de recolher para expandir/recolher todo o conteúdo das etiquetas
- Você também pode mover etiquetas dentro de outras etiquetas

![](../image/tag-1.png)

![](../image/tag-2.gif)

![](../image/tag-3.gif)

#### Pesquisar notas

- Clicar no ícone de pesquisa na barra de ferramentas
- Inserir palavras-chave de pesquisa para encontrar notas em todas as etiquetas
- Exibe até a 50 resultados correspondentes
- Suporta apenas formatos de texto comuns; imagens/documentos/vídeos só pesquisarão nomes de arquivos. Arquivos binários exigem software de pesquisa de texto completo de terceiros, como: Recoll, DocFetcher, etc.

![](../image/search-1.gif)

#### Operações de notas

- **Abrir** : Clique duplo ou selecione "Abrir Arquivo" no menu de contexto
- **Mostrar no Explorador** : Abrir a localização do arquivo no explorador
- **Renomear nota** : Pode mudar para um novo nome
- **Editar etiquetas** : Adicionar várias etiquetas às notas
- **Excluir nota** : Excluir notas da coleção
- **Ativar/Desativar** : Ocultar/mostrar itens de arquivos de notas sem excluir o arquivo.

![](../image/menu-2.png)

### Exportar TXT / Importar Exportar Arquivos de Backup JSON

- Em mais operações:
- **Exportar como TXT** : Exportar toda a lista de coleção de notas como arquivo de texto
- **Exportar arquivo de backup JSON** : Criar um arquivo de backup JSON para salvar o estado da sua coleção de notas para fácil recuperação ou migração para outros dispositivos.
- **Importar arquivo de backup JSON** : Restaurar o estado da coleção de notas de um arquivo de backup JSON previamente exportado.
  - Nota: Importar um arquivo de backup JSON sobrescreverá o estado atual da coleção de notas, proceda com cautela.


## Capturas de tela

![](../image/screen-1.png)

## Requisitos do sistema

- Visual Studio Code versão 1.80.0 ou superior

## Problemas conhecidos

1. Após a primeira instalação, pode ser necessário reiniciar o VS Code para mudar o idioma.
2. Ao recolher/expandir etiquetas, podem aparecer problemas de atualização da interface. Tente expandir manualmente as etiquetas para resolver.
3. Se houver muitos itens de notas, o carregamento do VS Code pode demorar muito tempo. Testei com mais de 6000 notas e levou 8 segundos para abrir. Se as notas não aparecerem, aguarde pacientemente o carregamento.

## Contribuir

Contribuições são bem-vindas! Sinta-se à vontade para enviar Pull Requests.

1. Fork este repositório
2. Criar uma branch e commit
5. Abrir um Pull Request

## Instruções de compilação

### Desenvolvimento local

1. Clonar o repositório
```bash
git clone https://github.com/sarakale/vscode-note-collection.git
cd vscode-note-collection
```

2. Instalar dependências
```bash
npm install
```

3. Compilar TypeScript
```bash
npm run compile
```

4. Pressione F5 no VS Code para iniciar a depuração

### Empacotar extensão

1. Instalar vsce (VS Code Extension Packager)
```bash
npm install -g vsce
```

2. Empacotar como arquivo `.vsix`
```bash
npm run package
```

Ou use o comando vsce diretamente
```bash
vsce package
```

3. O arquivo `.vsix` gerado pode ser instalado manualmente.

## Registro de alterações

Consulte [CHANGELOG.md](CHANGELOG.md) para detalhes de atualização de cada versão.

## Licença

Este projeto está licenciado sob GPL-3.0 Licença - consulte o arquivo [LICENSE](LICENSE) para detalhes.

## Suporte

Se encontrar algum problema ou tiver sugestões de funcionalidades, visite:
- [GitHub Issues](https://github.com/sarakale/vscode-note-collection/issues)

## Agradecimentos

- Obrigado a todos os usuários que usam e apóiam esta extensão
- Inspirado em [vscode-project-manager](https://github.com/alefragnani/vscode-project-manager), adicionando mais funcionalidades nesta base.

---
