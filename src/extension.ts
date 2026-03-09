import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { NoteCollectionProvider } from './NoteCollectionProvider';
import { NoteItem } from './types';
import { Localize } from './lang';

// --------------------
// 插件激活函数
// --------------------
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations！ the“Note Collection” plug-in has been activated!'); // 插件激活时输出日志

    // 1. 初始化存储路径和JSON文件
    const storagePath = context.globalStoragePath;
    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath, { recursive: true });
    }
    const noteListPath = path.join(storagePath, 'NoteList.json');
    // 如果文件不存在，创建一个包含示例数据的初始文件
    if (!fs.existsSync(noteListPath)) {
        const initialData: NoteItem[] = [{
            name: Localize.localize('msg.exampleNotes'),
            rootPath: "",
            paths: [],
            tags: [Localize.localize('msg.defaultTag')],
            enabled: true
        }];
        fs.writeFileSync(noteListPath, JSON.stringify(initialData, null, 2));
    }

    // 2. 创建TreeDataProvider并注册视图
    const treeDataProvider = new NoteCollectionProvider(noteListPath, context.globalState);
    const treeView = vscode.window.createTreeView('noteCollection.list', {
        treeDataProvider, 
        showCollapseAll: false, // 不显示"折叠所有"按钮
        canSelectMany: true, // 允许同时选择多个项目
        dragAndDropController: treeDataProvider // 启用拖放控制器
    });

    // 监听 TreeView 的折叠/展开事件，同步状态
    context.subscriptions.push(
        treeView.onDidCollapseElement(e => {
            const element = e.element;
            if (element.type === 'tag' && element.tagPath) {
                treeDataProvider.onTagCollapsed(element.tagPath);
            }
        })
    );
    // 监听 TreeView 的展开事件，同步状态
    context.subscriptions.push(
        treeView.onDidExpandElement(e => {
            const element = e.element;
            if (element.type === 'tag' && element.tagPath) {
                treeDataProvider.onTagExpanded(element.tagPath);
            }
        })
    );

    // 3. 注册命令
    const commands = [
        // 导航栏按钮命令
        vscode.commands.registerCommand('noteCollection.editList', () => {
            vscode.workspace.openTextDocument(noteListPath).then(doc => vscode.window.showTextDocument(doc));
        }),
        vscode.commands.registerCommand('noteCollection.toggleCollapse', async () => {
            // 使用 TreeView 的 API 来控制折叠/展开
            const allTags = treeDataProvider.getAllTags();
            if (allTags.length === 0) {
                vscode.window.showInformationMessage(Localize.localize('msg.noCollapsibleTags')); // 没有可折叠的标签
                return;
            }
            
            // 使用 Provider 中的方法判断是否已经全部折叠
            const allCollapsed = await treeDataProvider.isAllCollapsed();
            
            if (allCollapsed) {
                // 如果当前全都处于折叠状态，则执行：全部展开
                treeDataProvider.expandAll();
            } else {
                // 只要有任何一个标签处于展开状态，则执行：全部折叠
                treeDataProvider.collapseAll();
            }
        }),

        // 刷新列表
        vscode.commands.registerCommand('noteCollection.refresh', async () => {
            await treeDataProvider.refreshAllFolders();
        }),

        // 搜索笔记
        vscode.commands.registerCommand('noteCollection.search', async () => {
            const searchQuery = await vscode.window.showInputBox({
                placeHolder: Localize.localize('msg.searchPlaceholder'), // 搜索占位符
                prompt: Localize.localize('msg.searchPrompt') // 搜索提示
            });
            if (!searchQuery) { return; }

            // 获取所有笔记文件的路径
            const allFiles = treeDataProvider.getAllNoteFiles();
            if (allFiles.length === 0) {
                vscode.window.showInformationMessage(Localize.localize('msg.noSearchableFiles')); // 没有可搜索的文件
                return;
            }

            // 在这些文件中搜索
            const searchResults: { file: string; line: number; content: string; isFileName: boolean }[] = [];
            
            // 定义文本文件扩展名列表（只包含真正的纯文本文件）
            const textExtensions = new Set([
                // 纯文本文件
                'txt', 'text', 'md', 'markdown', 'rst', 'adoc', 'tex', 'bib', 'log', 'out', 'err', 'debug', 'trace',
                
                // 编程语言源代码
                'js', 'ts', 'jsx', 'tsx', 'vue', 'svelte', 'html', 'htm', 'xhtml', 'xml', 'xsl', 'xslt',
                'css', 'scss', 'sass', 'less', 'styl', 'stylus',
                'py', 'pyw', 'pyi', 'java', 'groovy', 'scala', 'kotlin', 'kt', 'kts', 'go', 'rs', 'dart', 'lua',
                'c', 'cpp', 'cc', 'cxx', 'h', 'hpp', 'hxx', 'm', 'mm', 'swift', 'objc',
                'cs', 'vb', 'fs', 'fsx', 'fsi', 'php', 'phtml', 'inc', 'rb', 'gemspec', 'rake',
                'pl', 'pm', 't', 'pod', 'sh', 'bash', 'zsh', 'fish', 'csh', 'tcsh', 'ksh',
                'bat', 'cmd', 'ps1', 'psm1', 'vbs', 'wsf', 'sql', 'plsql', 'tsql', 'mysql', 'pgsql',
                'r', 'rmd', 'jl', 'matlab', 'f', 'f90', 'f95', 'f03',
                'asm', 's', 'nasm', 'masm', 'tasm', 'a51',
                'clj', 'cljs', 'cljc', 'edn', 'lisp', 'lsp', 'scm', 'rkt', 'hs', 'lhs',
                'erl', 'hrl', 'ex', 'exs', 'ml', 'mli', 're', 'rei', 'elm', 'purs', 'idr', 'nim', 'cr', 'd', 'di', 'zig',
                'cob', 'cbl', 'cpy', 'jcl', 'pl1', 'pli', 'pco', 'ecl', 'eco', 'ec', 'ecp',
                'abap', 'ada', 'adb', 'ads', 'pas', 'pp', 'inc', 'dpr', 'dpk', 'lfm', 'lpr',
                'vi', 'ctl', 'g', 'gd', 'v', 'sv', 'vh', 'vhdl', 'vhd', 'fx', 'x',
                
                // 配置文件（纯文本）
                'json', 'yaml', 'yml', 'toml', 'ini', 'cfg', 'conf', 'config', 'properties', 'env', 'dotenv',
                'gitignore', 'gitattributes', 'gitmodules', 'gitkeep', 'gitconfig', 'editorconfig',
                'eslintrc', 'eslintrc.js', 'eslintrc.json', 'eslintrc.yaml', 'eslintrc.yml',
                'prettierrc', 'prettierrc.js', 'prettierrc.json', 'prettierrc.yaml', 'prettierrc.yml',
                'babelrc', 'babel.config.js', 'babel.config.json', 'babel.config.cjs',
                'tsconfig.json', 'jsconfig.json', 'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
                'dockerfile', 'docker-compose.yml', 'docker-compose.yaml', 'dockerignore',
                'makefile', 'cmakelists.txt', 'cmake', 'gradle', 'gradle.properties', 'pom.xml', 'build.gradle',
                'webpack.config.js', 'rollup.config.js', 'vite.config.js',
                'npmignore', 'yarnignore', 'prettierignore', 'eslintignore',
                'htaccess', 'htpasswd', 'nginx.conf', 'apache.conf',
                
                // 数据文件（纯文本）
                'csv', 'tsv', 'rss', 'atom', 'rdf', 'ttl', 'n3', 'nt', 'jsonld',
                
                // 文档文件（纯文本）
                'rtf', 'tex', 'bib',
                
                // SVG 是纯文本格式
                'svg', 'svgz',
                
                // 其他文本文件
                'readme', 'license', 'changelog', 'authors', 'contributors', 'history',
                'example', 'sample', 'template', 'demo', 'test', 'spec',
                'lock', 'hash', 'sum', 'md5', 'sha1', 'sha256', 'sha512',
                'manifest', 'meta', 'info', 'version', 'build', 'release',
                'map', 'source', 'sourcemap', 'min', 'minified'
            ]);
            
            for (const filePath of allFiles) {
                const fileName = path.basename(filePath);
                const ext = path.extname(filePath).toLowerCase().replace('.', '');
                
                // 检查是否是文本文件
                const isTextFile = textExtensions.has(ext);
                
                // 首先搜索文件名
                if (fileName.toLowerCase().includes(searchQuery.toLowerCase())) {
                    searchResults.push({
                        file: filePath,
                        line: 0,
                        content: fileName,
                        isFileName: true
                    });
                }
                
                // 如果是文本文件，也搜索文件内容
                if (isTextFile) {
                    try {
                        const content = fs.readFileSync(filePath, 'utf-8');
                        const lines = content.split('\n');
                        lines.forEach((line, index) => {
                            if (line.toLowerCase().includes(searchQuery.toLowerCase())) {
                                searchResults.push({
                                    file: filePath,
                                    line: index + 1,
                                    content: line.trim(),
                                    isFileName: false
                                });
                            }
                        });
                    } catch (error) {
                        console.error(Localize.localize('msg.cannotReadFile', filePath), error); // 无法读取文件
                    }
                }
            }
            // 如果没有找到任何匹配项，显示提示信息
            if (searchResults.length === 0) {
                vscode.window.showInformationMessage(Localize.localize('msg.noMatchFound')); // 没有匹配的结果
                return;
            }

            // 显示搜索结果
            const items = searchResults.slice(0, 50).map(result => {
                if (result.isFileName) {
                    // 文件名匹配
                    return {
                        label: result.content,
                        description: Localize.localize('msg.fileNameMatch'), // 文件名匹配
                        detail: result.file,
                        filePath: result.file,
                        line: 0
                    };
                } else {
                    // 内容匹配
                    return {
                        label: result.content.substring(0, 50) + (result.content.length > 50 ? '...' : ''),
                        description: `${path.basename(result.file)}:${result.line}`,
                        detail: result.file,
                        filePath: result.file,
                        line: result.line
                    };
                }
            });

            const selected = await vscode.window.showQuickPick(items, {
                placeHolder: Localize.localize('msg.foundResults', searchResults.length.toString()), // 搜索结果占位符
                matchOnDescription: true,
                matchOnDetail: true
            });
            
            // 如果用户选择了一个结果，根据是文件名匹配还是内容匹配来打开文件
            if (selected) {
                if (selected.line === 0) {
                    // 文件名匹配，使用智能文件打开方式
                    try {
                        await vscode.commands.executeCommand('vscode.open', vscode.Uri.file(selected.filePath));
                    } catch (error) {
                        // 如果 vscode.open 失败，尝试使用系统默认程序打开
                        try {
                            await vscode.env.openExternal(vscode.Uri.file(selected.filePath));
                        } catch (externalError) {
                            vscode.window.showErrorMessage(Localize.localize('msg.cannotOpenFile', selected.filePath)); // 无法打开文件
                        }
                    }
                } else {
                    // 内容匹配，打开文本文档并定位到行
                    const doc = await vscode.workspace.openTextDocument(selected.filePath);
                    const editor = await vscode.window.showTextDocument(doc);
                    const position = new vscode.Position(selected.line - 1, 0);
                    editor.selection = new vscode.Selection(position, position);
                    editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenter);
                }
            }
        }),
        vscode.commands.registerCommand('noteCollection.more', () => treeDataProvider.showMoreActions()),

        // --------------------
        // 右键菜单命令
        // --------------------

        // 打开文件
        vscode.commands.registerCommand('noteCollection.openFile', async (node: any) => {
            const noteItem = node.noteItem || node;
            if (noteItem && noteItem.rootPath) {
                // 检查文件是否存在
                if (fs.existsSync(noteItem.rootPath)) {
                    try {
                        // 使用 vscode.open 命令，它会智能处理不同类型的文件
                        await vscode.commands.executeCommand('vscode.open', vscode.Uri.file(noteItem.rootPath));
                    } catch (error) {
                        // 如果 vscode.open 失败，尝试使用系统默认程序打开
                        try {
                            await vscode.env.openExternal(vscode.Uri.file(noteItem.rootPath));
                        } catch (externalError) {
                            vscode.window.showErrorMessage(Localize.localize('msg.cannotOpenFile', noteItem.rootPath)); // 无法打开文件
                        }
                    }
                } else {
                    vscode.window.showWarningMessage(Localize.localize('msg.fileMovedOrDeleted', noteItem.name || Localize.localize('msg.untitled'))); // 文件已移动或删除
                }
            }
        }),

        // 在新窗口中打开所在文件夹
        vscode.commands.registerCommand('noteCollection.openInNewWindow', (node: any) => {
            const noteItem = node.noteItem || node;
            if (noteItem && noteItem.rootPath) {
                vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(path.dirname(noteItem.rootPath)), true);
            }
        }),

        // 在资源管理器中显示
        vscode.commands.registerCommand('noteCollection.revealInExplorer', (node: any) => {
            const noteItem = node.noteItem || node;
            if (noteItem && noteItem.rootPath) {
                vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(noteItem.rootPath));
            }
        }),

        // 删除项目（支持单选和多选）
        vscode.commands.registerCommand('noteCollection.deleteItem', (node: any) => {
            // 从 treeView.selection 获取所有选中项
            const selection = treeView.selection;
            if (selection && selection.length > 0) {
                const items = selection
                    .map(item => item.noteItem)
                    .filter((n): n is NoteItem => n !== undefined && !!n.rootPath);
                if (items.length > 0) {
                    treeDataProvider.deleteItem(items);
                }
            } else if (node) {
                // 单个节点的情况
                const noteItem = node?.noteItem || node;
                if (noteItem && noteItem.rootPath) {
                    treeDataProvider.deleteItem(noteItem);
                }
            }
        }),

        // 启用/禁用项目
        vscode.commands.registerCommand('noteCollection.disableItem', (node: any) => {
            const noteItem = node.noteItem || node;
            if (noteItem) treeDataProvider.toggleItemEnabled(noteItem);
        }),

        // 编辑标签
        vscode.commands.registerCommand('noteCollection.editTags', (node: any) => {
            const noteItem = node.noteItem || node;
            if (noteItem) treeDataProvider.editItemTags(noteItem);
        }),
        // 重命名项目
        vscode.commands.registerCommand('noteCollection.renameItem', (node: any) => {
            const noteItem = node.noteItem || node;
            if (noteItem) treeDataProvider.renameItem(noteItem);
        }),

        // --------------------
        // "更多"菜单中的命令
        // --------------------
        vscode.commands.registerCommand('noteCollection.exportTxt', () => treeDataProvider.exportAsTxt()), // 导出为TXT
        vscode.commands.registerCommand('noteCollection.backup', () => treeDataProvider.backupList(noteListPath)), // 导出备份文件
        vscode.commands.registerCommand('noteCollection.importBackup', () => treeDataProvider.importBackupList()), // 导入备份文件
        vscode.commands.registerCommand('noteCollection.addTag', () => treeDataProvider.addTag()), // 添加标签
        vscode.commands.registerCommand('noteCollection.deleteTag', () => treeDataProvider.deleteTag()), // 删除标签
        vscode.commands.registerCommand('noteCollection.importFromText', () => treeDataProvider.importFromText()), // 手动输入地址

        // 导入文件
        vscode.commands.registerCommand('noteCollection.importFiles', (node: any) => {
            let tagPath = node?.tagPath;
            // 如果是从文件夹节点触发，使用父标签的路径
            if (!tagPath && node?.folderPath) {
                // 文件夹节点，需要找到所属的标签
                // 这里简化处理，使用默认标签或者让用户选择
                const allTags = treeDataProvider.getAllTags();
                vscode.window.showQuickPick(allTags, {
                    placeHolder: Localize.localize('msg.selectTag') // 选择标签
                }).then(selectedTag => {
                    if (selectedTag) {
                        treeDataProvider.importFiles(selectedTag);
                    }
                });
                return;
            }
            if (tagPath) treeDataProvider.importFiles(tagPath);
        }),

        // 重命名标签
        vscode.commands.registerCommand('noteCollection.renameTag', (node: any) => {
            const tagPath = node.tagPath;
            if (tagPath) treeDataProvider.renameTag(tagPath);
        }),

        // 删除标签（支持单选和多选）
        vscode.commands.registerCommand('noteCollection.deleteTagWithChildren', (node: any) => {
            // 从 treeView.selection 获取所有选中项
            const selection = treeView.selection;
            if (selection && selection.length > 0) {
                const tagPaths = selection
                    .filter(item => item.type === 'tag' && item.tagPath)
                    .map(item => item.tagPath!);
                if (tagPaths.length > 0) {
                    treeDataProvider.deleteTagWithChildren(tagPaths);
                }
            } else if (node?.tagPath) {
                treeDataProvider.deleteTagWithChildren(node.tagPath);
            }
        }),
        
        // 单个标签折叠/展开
        vscode.commands.registerCommand('noteCollection.toggleCollapseTag', (node: any) => {
            const tagPath = node.tagPath;
            if (tagPath) treeDataProvider.toggleCollapse(tagPath);
        }),
    ];

    commands.forEach(cmd => context.subscriptions.push(cmd));
    context.subscriptions.push(treeView);
    
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('noteCollection.autoRefreshFolders')) {
                const config = vscode.workspace.getConfiguration('noteCollection');
                const enabled = config.get<boolean>('autoRefreshFolders', true);
                treeDataProvider.setAutoRefreshEnabled(enabled);
            }
        })
    );
    
    context.subscriptions.push(
        vscode.commands.registerCommand('noteCollection.refreshFolder', async (node: any) => {
            const tagPath = node?.tagPath;
            if (tagPath) {
                const noteList = treeDataProvider.getNoteList();
                const folderNote = noteList.find((note: any) => 
                    note.isFolder && note.tags.includes(tagPath)
                );
                if (folderNote && folderNote.rootPath) {
                    await treeDataProvider.refreshFolderContent(folderNote.rootPath);
                }
            }
        })
    );
    
    context.subscriptions.push({
        dispose: () => treeDataProvider.dispose()
    });
}