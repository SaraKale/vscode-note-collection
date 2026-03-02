import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { NoteItem, NoteList } from './types';
import { Localize } from './lang';

// 如果语言环境可能动态变化，可以监听事件重新加载
// 但通常在 activate 时加载一次就足够了
// Localize.load(vscode.env.language);

// 定义TreeView中的节点类型
type TreeItemType = 'tag' | 'file' | 'folder';
class TreeNoteItem extends vscode.TreeItem {
    children?: TreeNoteItem[];
    
    constructor(
        label: string,
        collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly type: 'tag' | 'file' | 'folder',
        public tagPath?: string,
        public noteItem?: NoteItem,
        public folderPath?: string
    ) {
        super(label, collapsibleState);
        
        // 为文件节点设置tooltip显示完整路径
        if (type === 'file' && noteItem && noteItem.rootPath) {
            this.tooltip = noteItem.rootPath;
        }
        
        // 为文件夹节点设置tooltip显示完整路径
        if (type === 'folder' && folderPath) {
            this.tooltip = folderPath;
        }
    }
}

// 核心类：笔记集合提供者，负责管理笔记数据和树视图的交互
export class NoteCollectionProvider implements vscode.TreeDataProvider<TreeNoteItem>, vscode.TreeDragAndDropController<TreeNoteItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<TreeNoteItem | undefined | null | void> = new vscode.EventEmitter();
    readonly onDidChangeTreeData: vscode.Event<TreeNoteItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private noteList: NoteList = [];
    private collapsedState: Set<string> = new Set(); // 存储折叠的标签路径
    private dataFilePath: string;
    private globalState: vscode.Memento;
    private treeVersion: number = 0; // 新增：用于强制刷新树视图缓存的版本号计数器

    // 拖放支持的数据类型
    dropMimeTypes = ['text/uri-list'];
    dragMimeTypes = [];

    constructor(dataFilePath: string, globalState: vscode.Memento) {
        this.dataFilePath = dataFilePath;
        this.globalState = globalState;
        this.loadData();
        this.loadCollapsedState();
    }

    // 核心方法：从JSON文件加载数据
    private loadData(): void {
        if (fs.existsSync(this.dataFilePath)) {
            const data = fs.readFileSync(this.dataFilePath, 'utf-8');
            this.noteList = JSON.parse(data);
        } else {
            this.noteList = [];
        }
    }
    // 将数据保存到JSON文件
    private saveData(): void {
        fs.writeFileSync(this.dataFilePath, JSON.stringify(this.noteList, null, 2));
    }
    // 加载和保存标签的折叠状态
    private loadCollapsedState(): void {
        this.collapsedState = new Set(this.globalState.get('noteCollection.collapsedTags', []));
    }
    // 保存折叠状态到全局状态
    private saveCollapsedState(): void {
        this.globalState.update('noteCollection.collapsedTags', Array.from(this.collapsedState));
    }

    // 实现 vscode.TreeDataProvider 接口
    getTreeItem(element: TreeNoteItem): vscode.TreeItem {
        // 确保标签节点始终显示箭头
        if (element.type === 'tag' && element.tagPath) {
            // 检查该标签下是否有笔记
            const hasNotes = this.noteList.some(note => 
                note.enabled && note.tags.some(tag => this.getTagPath(tag) === element.tagPath)
            );
            
            // 设置正确的折叠状态
            // Collapsed: 显示 >（向右箭头），表示已折叠，可以点击展开
            // Expanded: 显示 ▼（向下箭头），表示已展开，可以点击折叠
            const isCollapsed = this.collapsedState.has(element.tagPath);
            element.collapsibleState = isCollapsed 
                ? vscode.TreeItemCollapsibleState.Collapsed 
                : vscode.TreeItemCollapsibleState.Expanded;

            // 【关键】：绑定带有版本号的 ID
            element.id = `tag-${element.tagPath}-v${this.treeVersion}`;
        }
        return element;
    }

  
    /**
     * 获取树节点的子节点
     * 实现 vscode.TreeDataProvider 接口的方法
     * 
     * @param element - 当前树节点，undefined 表示根节点
     * @returns - 子节点数组的 Promise
     */
    getChildren(element?: TreeNoteItem): Thenable<TreeNoteItem[]> {
        if (!element) {
            // 根节点：返回所有标签
            // 调用 buildTagTree() 方法构建完整的标签树
            return Promise.resolve(this.buildTagTree());
        } else if (element.type === 'tag' && element.tagPath) {
            // 标签节点：返回子标签和笔记文件
            const items: TreeNoteItem[] = [];
            
            // 1. 添加直接子标签（下一级标签）
            // 获取所有标签
            const allTags = this.getAllTags();
            // 过滤出直接子标签：路径长度大于1且父路径等于当前标签路径
            const directChildTags = allTags.filter(tag => {
                const tagPath = this.getTagPath(tag);
                const parts = tagPath.split('/');
                if (parts.length <= 1) return false; // 顶级标签没有父标签
                
                const parentPath = parts.slice(0, -1).join('/');
                return parentPath === element.tagPath;
            });
            
            // 为每个直接子标签创建 TreeItem
            directChildTags.forEach(tag => {
                const tagPath = this.getTagPath(tag);
                const parts = tag.split('/');
                const label = parts[parts.length - 1]; // 标签名称（取路径的最后一部分）
                
                // 根据保存的折叠状态设置子标签的折叠状态
                const isCollapsed = this.collapsedState.has(tagPath);
                const collapsibleState = isCollapsed
                    ? vscode.TreeItemCollapsibleState.Collapsed
                    : vscode.TreeItemCollapsibleState.Expanded;
                
                // 创建子标签树节点
                const childTagItem = new TreeNoteItem(
                    label,
                    collapsibleState,
                    'tag',
                    tagPath
                );
                // 设置唯一ID，包含版本号以强制刷新
                childTagItem.id = `tag-${tagPath}-v${this.treeVersion}`;
                // 设置上下文值，用于右键菜单
                childTagItem.contextValue = 'tag';
                items.push(childTagItem);
            });
            
            // 2. 添加该标签下的笔记文件
            // 过滤出启用状态且包含当前标签的笔记
            const notes = this.noteList.filter(note =>
                note.enabled && note.tags.some(tag => this.getTagPath(tag) === element.tagPath)
            );
            
            // 构建文件夹树结构
            const folderMap = new Map<string, TreeNoteItem>(); // 存储文件夹节点
            const fileItems: TreeNoteItem[] = []; // 存储文件节点
            
            notes.forEach(note => {
                if (!note.rootPath) return; // 跳过没有路径的笔记
                
                const dirPath = path.dirname(note.rootPath); // 获取文件所在目录
                const fileName = path.basename(note.rootPath); // 获取文件名
                
                // 检查是否是文件夹（通过判断是否有子文件）
                const isFolder = fs.existsSync(note.rootPath) && fs.statSync(note.rootPath).isDirectory();
                
                if (isFolder) {
                    // 如果是文件夹，创建文件夹节点
                    if (!folderMap.has(note.rootPath)) {
                        const folderItem = new TreeNoteItem(
                            fileName,
                            vscode.TreeItemCollapsibleState.Collapsed,
                            'folder',
                            undefined,
                            undefined,
                            note.rootPath
                        );
                        folderItem.id = `folder-${note.rootPath}`;
                        folderItem.contextValue = 'folder';
                        
                        // 检查文件夹是否存在
                        const folderExists = fs.existsSync(note.rootPath);
                        if (folderExists) {
                            folderItem.iconPath = new vscode.ThemeIcon('folder');
                        } else {
                            folderItem.iconPath = vscode.Uri.joinPath(vscode.Uri.file(path.join(__dirname, '..')), 'media', 'Warning.svg'); // 文件夹不存在，显示警告图标
                            folderItem.description = Localize.localize('msg.fileMissing'); // 文件夹不存在
                            folderItem.tooltip = Localize.localize('msg.fileMovedOrDeleted', fileName); // 文件夹已被移动或删除
                        }
                        
                        folderMap.set(note.rootPath, folderItem);
                    }
                } else {
                    // 如果是文件，检查是否需要放在文件夹下
                    const relativePath = dirPath;
                    if (folderMap.has(relativePath)) {
                        // 文件夹已存在，文件作为文件夹的子项
                        // 这里简化处理，暂时不实现文件夹嵌套
                        fileItems.push(this.createFileTreeItem(note));
                    } else {
                        // 直接添加文件节点
                        fileItems.push(this.createFileTreeItem(note));
                    }
                }
            });
            
            // 合并子标签、文件夹和文件
            items.push(...Array.from(folderMap.values()), ...fileItems);
            return Promise.resolve(items);
        } else if (element.type === 'folder' && element.folderPath) {
            // 文件夹节点：返回文件夹内的文件
            // 过滤出启用状态且所在目录等于当前文件夹路径的笔记
            const notes = this.noteList.filter(note =>
                note.enabled && note.rootPath && path.dirname(note.rootPath) === element.folderPath
            );
            // 为每个笔记创建文件树节点
            const items = notes.map(note => this.createFileTreeItem(note));
            return Promise.resolve(items);
        }
        // 其他情况返回空数组
        return Promise.resolve([]);
    }

    // 构建多级标签树
    private buildTagTree(): TreeNoteItem[] {
        const tagMap = new Map<string, TreeNoteItem>();

        // 收集所有标签并构建层级
        this.noteList.forEach(note => {
            note.tags.forEach(tag => {
                const tagPath = this.getTagPath(tag);
                if (!tagMap.has(tagPath)) {
                    const parts = tag.split('/');
                    const label = parts[parts.length - 1];
                    
                    // 根据保存的折叠状态设置标签节点的折叠状态
                    const isCollapsed = this.collapsedState.has(tagPath);
                    const collapsibleState = isCollapsed
                        ? vscode.TreeItemCollapsibleState.Collapsed
                        : vscode.TreeItemCollapsibleState.Expanded;

                    const treeItem = new TreeNoteItem(
                        label,
                        collapsibleState,
                        'tag',
                        tagPath
                    );

                    // 【关键】：绑定带有版本号的 ID
                    treeItem.id = `tag-${tagPath}-v${this.treeVersion}`;
                    treeItem.contextValue = 'tag';
                    tagMap.set(tagPath, treeItem);
                }
            });
        });

        // 构建层级关系（支持多级嵌套）
        const rootTags: TreeNoteItem[] = [];
        
        // 首先按路径长度排序，确保先处理父标签
        const sortedTags = Array.from(tagMap.entries()).sort((a, b) => {
            return a[0].split('/').length - b[0].split('/').length;
        });
        
        sortedTags.forEach(([tagPath, treeItem]) => {
            const parts = tagPath.split('/');
            if (parts.length === 1) {
                // 顶级标签
                rootTags.push(treeItem);
            } else {
                // 子标签，找到父标签
                const parentPath = parts.slice(0, -1).join('/');
                const parentItem = tagMap.get(parentPath);
                if (parentItem) {
                    // 将子标签添加到父标签的 children 中
                    if (!parentItem.children) {
                        parentItem.children = [];
                    }
                    parentItem.children.push(treeItem);
                } else {
                    // 如果父标签不存在，作为根标签处理
                    rootTags.push(treeItem);
                }
            }
        });

        return rootTags;
    }

    // 创建文件树项
    private createFileTreeItem(note: NoteItem): TreeNoteItem {
        // 确定显示名称：如果有 name 则使用 name，否则使用第一个标签名称
        const displayName = note.name || (note.tags && note.tags.length > 0 ? note.tags[0] : Localize.localize('msg.untitled')); // 未命名
        
        // 检查文件是否存在
        const fileExists = note.rootPath && fs.existsSync(note.rootPath);
        
        const treeItem = new TreeNoteItem(
            displayName,
            vscode.TreeItemCollapsibleState.None,
            'file',
            undefined,
            note
        );
        
        // 只有当 rootPath 不为空时才设置 resourceUri 和 command
        if (note.rootPath) {
            treeItem.resourceUri = vscode.Uri.file(note.rootPath);
            treeItem.command = {
                command: 'noteCollection.openFile',
                title: Localize.localize('msg.openFile'), // 打开文件
                arguments: [note]
            };
        }
        
        // 根据文件是否存在设置样式
        if (fileExists) {
            treeItem.contextValue = note.enabled ? 'file' : 'file-disabled';
            treeItem.iconPath = note.enabled ? new vscode.ThemeIcon('file') : new vscode.ThemeIcon('circle-slash');
        } else {
            // 文件不存在，显示明显的错误样式
            treeItem.contextValue = 'file-missing';
            // treeItem.iconPath = new vscode.ThemeIcon('error'); // 调用VScode的错误图标
            treeItem.iconPath = vscode.Uri.joinPath(vscode.Uri.file(path.join(__dirname, '..')), 'media', 'Warning.svg'); // 指定警告图标
            treeItem.description = Localize.localize('msg.fileMissing'); // 文件不存在
            treeItem.tooltip = Localize.localize('msg.fileMovedOrDeleted', displayName); // 文件已被移动或删除
        }
        
        return treeItem;
    }

    private getTagPath(tag: string): string {
        return tag.trim();
    }

    private getDisplayName(note: NoteItem): string {
        return note.name || (note.tags && note.tags.length > 0 ? note.tags[0] : Localize.localize('msg.untitled')); // 未命名
    }

    // --------------
    // 实现拖放功能
    // --------------
    async handleDrag(source: TreeNoteItem[], treeDataTransfer: vscode.DataTransfer, token: vscode.CancellationToken): Promise<void> {
        const draggedItems = source.filter(item => 
            (item.type === 'file' && item.noteItem?.rootPath) || 
            (item.type === 'tag' && item.tagPath)
        );
        if (draggedItems.length === 0) {
            return;
        }

        // 序列化拖拽的项目
        const serializedItems = draggedItems.map(item => {
            if (item.type === 'file' && item.noteItem) {
                return item.noteItem;
            } else if (item.type === 'tag' && item.tagPath) {
                return { tagPath: item.tagPath };
            }
            return null;
        }).filter(item => item !== null);

        treeDataTransfer.set('application/vnd.code.tree.noteCollection.list', new vscode.DataTransferItem(JSON.stringify(serializedItems)));
    }

    async handleDrop(target: TreeNoteItem | undefined, sources: vscode.DataTransfer, token: vscode.CancellationToken): Promise<void> {
        // 检查是否是从树形视图拖拽的文件
        const treeTransferItem = sources.get('application/vnd.code.tree.noteCollection.list');
        if (treeTransferItem) {
            const draggedNotesStr = await treeTransferItem.asString();
            if (!draggedNotesStr) { return; }
            const draggedItems: any[] = JSON.parse(draggedNotesStr);
            
            // 目标标签：拖到空白处时为 undefined，表示移动到根级别
            const targetTag = target?.type === 'tag' ? target.tagPath : undefined;
            let movedCount = 0;
            
            // 处理拖拽的项目
            for (const draggedItem of draggedItems) {
                if (draggedItem.rootPath) {
                    // 拖拽的是文件
                    const note = this.noteList.find(n => n.rootPath === draggedItem.rootPath);
                    if (note) {
                        if (targetTag) {
                            // 拖到标签上：设置为该标签
                            if (!note.tags.includes(targetTag)) {
                                note.tags = [targetTag];
                                movedCount++;
                            }
                        } else {
                            // 拖到空白处：使用默认标签或第一个标签
                            const defaultTag = Localize.localize('msg.defaultTag'); // 默认标签
                            if (!note.tags.includes(defaultTag)) {
                                note.tags = [defaultTag];
                                movedCount++;
                            }
                        }
                    }
                } else if (draggedItem.tagPath) {
                    // 拖拽的是标签（需要移动该标签及其子标签下的所有文件）
                    const draggedTagPath = draggedItem.tagPath;
                    const allTags = this.getAllTags();
                    const tagsToMove = allTags.filter(tag => {
                        const currentTagPath = this.getTagPath(tag);
                        return currentTagPath === draggedTagPath || currentTagPath.startsWith(draggedTagPath + '/');
                    });
                    
                    if (targetTag) {
                        // 检查是否会导致循环引用
                        const wouldCauseCycle = tagsToMove.some(tag => {
                            const newTagPath = targetTag + '/' + tag.substring(draggedTagPath.length);
                            return targetTag.startsWith(newTagPath + '/');
                        });
                        
                        if (wouldCauseCycle) {
                            vscode.window.showWarningMessage(Localize.localize('msg.tagAlreadyExists', draggedTagPath)); // 标签已存在
                            return;
                        }
                    }
                    
                    // 创建标签映射表：旧标签 -> 新标签
                    const tagMapping = new Map<string, string>();
                    tagsToMove.forEach(oldTag => {
                        const relativePath = oldTag.substring(draggedTagPath.length);
                        let newTagPath: string;
                        if (targetTag) {
                            // 拖到标签上：变成子标签
                            if (relativePath) {
                                newTagPath = targetTag + relativePath;
                            } else {
                                newTagPath = targetTag + '/' + oldTag;
                            }
                        } else {
                            // 拖到空白处：变成父级标签（提取标签名）
                            const parts = draggedTagPath.split('/');
                            const baseName = parts[parts.length - 1];
                            if (relativePath) {
                                newTagPath = baseName + relativePath;
                            } else {
                                newTagPath = baseName;
                            }
                        }
                        tagMapping.set(oldTag, newTagPath);
                    });
                    
                    // 更新这些标签下的所有文件
                    for (const note of this.noteList) {
                        let hasMovedTag = false;
                        const newTags = note.tags.map(tag => {
                            if (tagMapping.has(tag)) {
                                hasMovedTag = true;
                                return tagMapping.get(tag)!;
                            }
                            return tag;
                        });
                        
                        if (hasMovedTag) {
                            note.tags = newTags;
                            movedCount++;
                        }
                    }
                }
            }
            // 保存数据并刷新视图
            if (movedCount > 0) {
                this.saveData();
                this._onDidChangeTreeData.fire(null);
                const targetName = targetTag || Localize.localize('msg.defaultTag'); // 目标标签或默认标签
                vscode.window.showInformationMessage(Localize.localize('msg.movedFilesToTag', movedCount.toString(), targetName)); // 移动文件到标签
            }
            return;
        }

        // 处理从文件系统拖拽的文件
        const transferItem = sources.get('text/uri-list');
        if (!transferItem) { return; }

        const value = await transferItem.asString();
        const fileUris = value.split('\r\n').filter(line => line.startsWith('file://')).map(line => vscode.Uri.parse(line));

        let addedCount = 0;
        for (const uri of fileUris) {
            const filePath = uri.fsPath;
            const fileName = path.basename(filePath);
            
            // 检查是否是文件夹
            if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
                // 拖入文件夹：创建同名标签
                let newTagName = fileName;
                
                // 确定父标签（如果拖到标签上，则作为子标签）
                let parentTag = '';
                if (target?.type === 'tag' && target.tagPath) {
                    parentTag = target.tagPath;
                }
                
                // 构建完整的标签路径
                let fullTagPath = parentTag ? `${parentTag}/${newTagName}` : newTagName;
                
                // 检查标签是否已存在
                const tagExists = this.noteList.some(note => note.tags.includes(fullTagPath));
                if (tagExists) {
                    // 如果标签已存在，询问用户是否覆盖
                    const choice = await vscode.window.showWarningMessage(
                        Localize.localize('msg.tagAlreadyExists', fullTagPath), // 标签已存在
                        Localize.localize('msg.overwrite'), // 覆盖
                        Localize.localize('msg.cancel') // 取消
                    );
                    if (choice !== Localize.localize('msg.overwrite')) {
                        continue;
                    }
                }
                
                // 导入文件夹内的所有文件到新标签
                addedCount += await this.importFolderToTag(filePath, fullTagPath);
            } else {
                // 导入单个文件
                // 确定目标标签
                let targetTag = Localize.localize('msg.defaultTag'); // 默认标签
                if (target?.type === 'tag' && target.tagPath) {
                    targetTag = target.tagPath;
                }

                const fileName = path.basename(filePath);

                // 检查该标签下是否已存在同名文件
                const existsInTag = this.noteList.some(note => 
                    note.rootPath === filePath && note.tags.includes(targetTag)
                );
                if (existsInTag) {
                    continue;
                }

                // 检查该文件是否已经在其他标签中存在
                const existingNote = this.noteList.find(note => note.rootPath === filePath);
                if (existingNote) {
                    // 如果文件已存在，只需添加到当前标签
                    if (!existingNote.tags.includes(targetTag)) {
                        existingNote.tags.push(targetTag);
                        addedCount++;
                    }
                } else {
                    // 如果文件不存在，创建新笔记
                    const newNote: NoteItem = {
                        name: fileName,
                        rootPath: filePath,
                        paths: [],
                        tags: [targetTag],
                        enabled: true
                    };
                    this.noteList.push(newNote);
                    addedCount++;
                }
            }
        }

        if (addedCount > 0) {
            this.saveData();
            this._onDidChangeTreeData.fire();
            vscode.window.showInformationMessage(Localize.localize('msg.addedFiles', addedCount.toString())); // 添加文件
        }
    }

    // --------------------
    // 折叠/展开命令实现
    // --------------------

    // 折叠所有标签
    collapseAll(): void {
        const allTags = this.getAllTags();
        const allTagPaths = allTags.map(tag => this.getTagPath(tag));
        
        if (allTagPaths.length === 0) {
            vscode.window.showInformationMessage(Localize.localize('msg.noCollapsibleTags')); // 没有可折叠标签
            return;
        }
        
        this.treeVersion++; // 核心：增加版本号，强制 VS Code 放弃旧 UI 缓存
        this.collapsedState.clear(); // 折叠所有：将所有标签加入折叠状态集
        allTagPaths.forEach(tagPath => this.collapsedState.add(tagPath));
        this.saveCollapsedState();
        this._onDidChangeTreeData.fire(null);
        vscode.window.showInformationMessage(Localize.localize('msg.collapsedAllTags'));  // 折叠所有标签
    }

    // 展开所有标签
    expandAll(): void {
        const allTags = this.getAllTags();
        if (allTags.length === 0) {
            vscode.window.showInformationMessage(Localize.localize('msg.noCollapsibleTags'));  // 没有可折叠标签
            return;
        }
        this.treeVersion++; // 核心：增加版本号，强制 VS Code 放弃旧 UI 缓存
        this.collapsedState.clear(); // 展开所有：清空折叠状态集
        this.saveCollapsedState();
        this._onDidChangeTreeData.fire(null);
        vscode.window.showInformationMessage(Localize.localize('msg.expandedAllTags'));  // 展开所有标签
    }

    // 右键菜单-切换单个标签的折叠状态
    toggleCollapse(tagPath: string): void {
        // 【关键修复】：增加版本号，强制 VS Code 刷新该节点的 UI 状态
        this.treeVersion++;
        // 切换折叠状态
        if (this.collapsedState.has(tagPath)) {
            this.collapsedState.delete(tagPath);
        } else {
            this.collapsedState.add(tagPath);
        }
        this.saveCollapsedState();
        // 触发刷新。注意：这里 fire() 不传参数表示刷新整棵树，
        // 这样可以确保带新版本号 ID 的节点被重新渲染。
        this._onDidChangeTreeData.fire();
    }

    // 当标签被折叠时调用（由 TreeView 事件触发）
    onTagCollapsed(tagPath: string): void {
        if (!this.collapsedState.has(tagPath)) {
            this.collapsedState.add(tagPath);
            this.saveCollapsedState();
        }
    }

    // 当标签被展开时调用（由 TreeView 事件触发）
    onTagExpanded(tagPath: string): void {
        if (this.collapsedState.has(tagPath)) {
            this.collapsedState.delete(tagPath);
            this.saveCollapsedState();
        }
    }

    // 获取所有标签
    getAllTags(): string[] {
        return Array.from(new Set(
            this.noteList.flatMap(n => n.tags)
        ));
    }

    // 检查标签是否已折叠
    isTagCollapsed(tagPath: string): boolean {
        return this.collapsedState.has(tagPath);
    }

    // --------------------
    // 删除项目
    // --------------------
    async deleteItem(node: NoteItem | NoteItem[]): Promise<void> {
        const items = Array.isArray(node) ? node : [node];
        if (items.length === 0) { return; }
        
        const confirmMsg = items.length === 1 
            ? Localize.localize('msg.confirmDelete', this.getDisplayName(items[0])) // 确认删除
            : Localize.localize('msg.confirmDeleteMultiple', items.length.toString()); // 确认删除多个
        
        const choice = await vscode.window.showWarningMessage(
            confirmMsg,
            Localize.localize('msg.delete'), // 删除
            Localize.localize('msg.cancel') // 取消
        );
        
        if (choice === Localize.localize('msg.delete')) {
            const pathsToDelete = new Set(items.map(item => item.rootPath));
            this.noteList = this.noteList.filter(note => !pathsToDelete.has(note.rootPath));
            this.saveData();
            this._onDidChangeTreeData.fire();
        }
    }

    // 切换文件/标签的启用状态
    toggleItemEnabled(node: NoteItem, enabled?: boolean): void {
        const note = this.noteList.find(n => n.rootPath === node.rootPath);
        if (note) {
            if (enabled === undefined) {
                note.enabled = !note.enabled;
            } else {
                note.enabled = enabled;
            }
            this.saveData();
            this._onDidChangeTreeData.fire();
            const status = note.enabled ? Localize.localize('msg.enabled') : Localize.localize('msg.disabled'); // 已启用/已禁用
            vscode.window.showInformationMessage(Localize.localize('msg.enabledStatus', this.getDisplayName(note), status)); // 已启用/已禁用状态
        }
    }

    // 编辑文件/标签的关联标签
    async editItemTags(node: NoteItem): Promise<void> {
        const allTags = Array.from(new Set(this.noteList.flatMap(n => n.tags)));
        const selected = await vscode.window.showQuickPick(allTags, {
            placeHolder: Localize.localize('msg.selectMultipleTags'), // 选择多个标签
            canPickMany: true
        });
        if (selected) {
            const note = this.noteList.find(n => n.rootPath === node.rootPath);
            if (note) {
                note.tags = selected;
                this.saveData();
                this._onDidChangeTreeData.fire();
            }
        }
    }

    // 重命名文件/标签
    async renameItem(node: NoteItem): Promise<void> {
        if (!node.rootPath) {
            vscode.window.showInformationMessage(Localize.localize('msg.emptyTagCannotRename')); // 空标签无法重命名
            return;
        }
        const newName = await vscode.window.showInputBox({
            value: node.name || '',
            prompt: Localize.localize('msg.renamePrompt'), // 重命名提示
        });
        if (newName && newName !== node.name) {
            const note = this.noteList.find(n => n.rootPath === node.rootPath);
            if (note) {
                note.name = newName;
                this.saveData();
                this._onDidChangeTreeData.fire();
            }
        }
    }

    // --------------------
    // 显示更多操作
    // --------------------
    async showMoreActions(): Promise<void> {
        const exportTxtTitle = Localize.localize('msg.exportTxt.title'); // 导出为文本文件
        const backupTitle = Localize.localize('msg.backup.title'); // 导出JSON备份文件
        const importBackupTitle = Localize.localize('msg.importBackup.title'); // 导入JSON备份文件
        const addTagTitle = Localize.localize('msg.addTag.title'); // 添加标签
        const importFromTextTitle = Localize.localize('msg.importFromText.title'); // 手动输入地址
        const selectOperation = Localize.localize('msg.selectOperation'); // 选择操作
        
        const choices = [exportTxtTitle, backupTitle, importBackupTitle, addTagTitle, importFromTextTitle];
        const selected = await vscode.window.showQuickPick(choices, { placeHolder: selectOperation });
        switch (selected) {
            case exportTxtTitle: vscode.commands.executeCommand('noteCollection.exportTxt'); break;
            case backupTitle: vscode.commands.executeCommand('noteCollection.backup'); break;
            case importBackupTitle: vscode.commands.executeCommand('noteCollection.importBackup'); break;
            case addTagTitle: vscode.commands.executeCommand('noteCollection.addTag'); break;
            case importFromTextTitle: vscode.commands.executeCommand('noteCollection.importFromText'); break;
        }
    }

    // 导出笔记列表为TXT文本文件
    async exportAsTxt(): Promise<void> {
        // 生成带日期和时间的文件名
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');
        const dateStr = `${year}${month}${day}`;
        const timeStr = `${hour}${minute}${second}`;
        
        // 构建默认文件名
        const dirPath = path.dirname(this.dataFilePath);
        const defaultFileName = `NoteList_${dateStr}_${timeStr}.txt`;
        const defaultUri = vscode.Uri.file(path.join(dirPath, defaultFileName));
        
        const uri = await vscode.window.showSaveDialog({
            defaultUri: defaultUri,
            filters: { 'Text Files': ['txt'] },
            title: Localize.localize('msg.exportTitle') // 导出为文本文件
        });
        if (!uri) { return; }

        let content = '';
        const notesByTag = new Map<string, NoteItem[]>();
        this.noteList.forEach(note => {
            note.tags.forEach(tag => {
                if (!notesByTag.has(tag)) { notesByTag.set(tag, []); }
                notesByTag.get(tag)!.push(note);
            });
        });

        const tags = Array.from(notesByTag.keys());
        tags.forEach((tag, index) => {
            const notes = notesByTag.get(tag)!.filter(note => note.rootPath);
            if (notes.length === 0) {
                return;
            }
            content += `tags: ${tag}\n`;
            notes.forEach(note => content += `${note.rootPath}\n`);
            if (index < tags.length - 1) {
                content += '\n';
            }
        });

        fs.writeFileSync(uri.fsPath, content);
        vscode.window.showInformationMessage(Localize.localize('msg.exportSuccess')); // 成功导出为文本文件
    }

    // 导出JSON备份
    async backupList(sourcePath: string): Promise<void> {
        // 生成带日期和时间的文件名
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');
        const dateStr = `${year}${month}${day}`;
        const timeStr = `${hour}${minute}${second}`;
        
        // 构建默认文件名
        const dirPath = path.dirname(sourcePath);
        const defaultFileName = `NoteList_backup_${dateStr}_${timeStr}.json`;
        const defaultUri = vscode.Uri.file(path.join(dirPath, defaultFileName));
        
        const uri = await vscode.window.showSaveDialog({
            defaultUri: defaultUri,
            filters: { 'JSON Files': ['json'] }
        });
        if (uri) {
            fs.copyFileSync(sourcePath, uri.fsPath);
            vscode.window.showInformationMessage(Localize.localize('msg.backupSuccess')); // 成功导出备份文件
        }
    }

    // 导入JSON备份
    async importBackupList(): Promise<void> {
        const uri = await vscode.window.showOpenDialog({
            canSelectMany: false,
            filters: { 'JSON Files': ['json'] },
            title: Localize.localize('msg.selectBackupFile') // 选择备份文件
        });
        if (!uri || uri.length === 0) {
            return;
        }

        const backupFilePath = uri[0].fsPath;
        try {
            // 读取备份文件内容
            const backupContent = fs.readFileSync(backupFilePath, 'utf-8');
            // 验证 JSON 格式
            JSON.parse(backupContent);
            // 写入到 NoteList.json
            fs.writeFileSync(this.dataFilePath, backupContent);
            // 重新加载数据
            this.loadData();
            // 刷新树形视图
            this._onDidChangeTreeData.fire();
            vscode.window.showInformationMessage(Localize.localize('msg.importBackupSuccess')); // 成功导入备份
        } catch (error) {
            vscode.window.showErrorMessage(Localize.localize('msg.importBackupError', String(error))); // 导入备份失败
        }
    }

    // 标签名称验证和清理方法
    private sanitizeTagName(tagName: string): string {
        // 移除或替换非法字符
        return tagName
            .replace(/[<>:"/\\|?*]/g, '') // 移除Windows文件系统非法字符
            .replace(/^\s+|\s+$/g, '') // 移除首尾空格
            .replace(/\s+/g, ' ') // 将多个空格合并为一个
            .substring(0, 50); // 限制最大长度
    }

    // 标签名称验证方法
    private validateTagName(tagName: string): string | null {
        if (!tagName || tagName.trim().length === 0) {
            return Localize.localize('msg.tagNameCannotBeEmpty'); // 标签名不能为空
        }
        
        if (tagName.length > 50) {
            return Localize.localize('msg.tagNameTooLong'); // 标签名过长
        }
        
        // 检查非法字符
        const invalidChars = /[<>:"/\\|?*]/;
        if (invalidChars.test(tagName)) {
            return Localize.localize('msg.tagNameContainsInvalidChars'); // 标签名包含非法字符
        }
        
        // 检查保留名称
        const reservedNames = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'];
        if (reservedNames.includes(tagName.toUpperCase())) {
            return Localize.localize('msg.tagNameIsReserved'); // 标签名是系统保留名称
        }
        
        return null;
    }

    // 添加标签
    async addTag(): Promise<void> {
        const tagName = await vscode.window.showInputBox({ 
            prompt: Localize.localize('msg.enterTagName'),
            validateInput: (value: string) => {
                return this.validateTagName(value);
            }
        });
        if (!tagName) { return; }

        const choices = [Localize.localize('msg.createEmptyTag'), Localize.localize('msg.addToFile')]; // 创建空标签、添加到文件
        const selected = await vscode.window.showQuickPick(choices, {
            placeHolder: Localize.localize('msg.selectOperationType') // 选择操作类型
        });

        if (selected === Localize.localize('msg.createEmptyTag')) {
            // 创建空标签项目（只包含 tags 和 enabled）
            const newNote: NoteItem = {
                name: Localize.localize('msg.exampleNotes'), // 示例笔记
                rootPath: '',
                paths: [],
                tags: [tagName],
                enabled: true
            };
            this.noteList.push(newNote);
            this.saveData();
            this._onDidChangeTreeData.fire();
            vscode.window.showInformationMessage(Localize.localize('msg.createdTag', tagName)); // 成功创建标签
        } else if (selected === Localize.localize('msg.addToFile')) { // 添加到文件
            const enabledNotes = this.noteList.filter(note => note.enabled);
            if (enabledNotes.length === 0) {
                vscode.window.showWarningMessage(Localize.localize('msg.noAvailableFiles')); // 没有可用文件
                return;
            }

            const items = enabledNotes.map(note => ({
                label: this.getDisplayName(note),
                description: note.rootPath || Localize.localize('msg.exampleNotes'), // 显示路径或示例笔记
                note: note
            }));

            const fileSelected = await vscode.window.showQuickPick(items, {
                placeHolder: Localize.localize('msg.selectFileToAdd') // 选择要添加标签的文件
            });

            if (fileSelected) {
                const note = this.noteList.find(n => n.rootPath === fileSelected.note.rootPath);
                if (note) {
                    if (!note.tags.includes(tagName)) {
                        note.tags.push(tagName);
                        this.saveData();
                        this._onDidChangeTreeData.fire();
                        vscode.window.showInformationMessage(Localize.localize('msg.tagAddedToNote', tagName, this.getDisplayName(note))); // 成功将标签添加到笔记
                    } else {
                        vscode.window.showInformationMessage(Localize.localize('msg.noteAlreadyHasTag', tagName)); // 笔记已包含该标签
                    }
                }
            }
        }
    }

    // 删除标签（不删除子标签）
    async deleteTag(): Promise<void> {
        const allTags = Array.from(new Set(this.noteList.flatMap(n => n.tags)));
        const selected = await vscode.window.showQuickPick(allTags, { placeHolder: Localize.localize('msg.selectTagToDelete') });
        if (selected) {
            // 检查该标签下是否有文件
            const notesInTag = this.noteList.filter(note => note.tags.includes(selected));
            const hasFiles = notesInTag.length > 0;
            
            let message = Localize.localize('msg.confirmDeleteTag', selected);
            if (hasFiles) {
                // message = `将要删除标签 "${selected}" 和标签内的 ${notesInTag.length} 个文件项目，是否继续？`;
                message = Localize.localize('msg.confirmDeleteTagWithFiles', selected, notesInTag.length.toString());
            }
            
            const choice = await vscode.window.showWarningMessage(
                message,
                Localize.localize('msg.delete'), // 删除
                Localize.localize('msg.cancel') // 取消
            );
            if (choice === Localize.localize('msg.delete')) {
                // 删除标签及其包含的文件项目
                this.noteList = this.noteList.filter(note => !note.tags.includes(selected));
                this.saveData();
                this._onDidChangeTreeData.fire();
                
                if (hasFiles) {
                    // vscode.window.showInformationMessage(`已删除标签 "${selected}" 及其包含的 ${notesInTag.length} 个文件项目`);
                    vscode.window.showInformationMessage(Localize.localize('msg.deletedTagWithFiles', selected, notesInTag.length.toString())); // 成功删除标签及其包含的文件项目
                } else {
                    vscode.window.showInformationMessage(Localize.localize('msg.tagRemoved', selected, '0')); // 成功删除标签
                }
            }
        }
    }

    // 删除标签（支持单个或多个，同时删除子标签）
    async deleteTagWithChildren(tagPath: string | string[]): Promise<void> {
        const tagPaths = Array.isArray(tagPath) ? tagPath : [tagPath];
        if (tagPaths.length === 0) { return; }
        
        // 找出所有要删除的标签（包括子标签）
        const allTagsToDelete = new Set<string>();
        for (const tp of tagPaths) {
            allTagsToDelete.add(tp);
            // 查找所有子标签（以 tp/ 开头的标签）
            this.noteList.forEach(note => {
                note.tags.forEach(tag => {
                    if (tag.startsWith(tp + '/')) {
                        allTagsToDelete.add(tag);
                    }
                });
            });
        }
        
        // 计算所有要删除标签下的文件数量
        let totalNotes = 0;
        for (const tp of allTagsToDelete) {
            totalNotes += this.noteList.filter(note => note.tags.includes(tp)).length;
        }
        
        const confirmMsg = tagPaths.length === 1
            ? Localize.localize('msg.confirmDeleteTagWithFiles', tagPaths[0], totalNotes.toString())
            : Localize.localize('msg.confirmDeleteMultipleTags', tagPaths.length.toString(), totalNotes.toString());
        
        const choice = await vscode.window.showWarningMessage(
            confirmMsg,
            Localize.localize('msg.delete'),
            Localize.localize('msg.cancel')
        );
        
        if (choice === Localize.localize('msg.delete')) {
            // 从文件中移除这些标签
            for (const note of this.noteList) {
                const originalLength = note.tags.length;
                note.tags = note.tags.filter(tag => !allTagsToDelete.has(tag));
                // 如果文件没有其他标签了，删除该文件
                if (note.tags.length === 0 && originalLength > 0) {
                    this.noteList = this.noteList.filter(n => n.rootPath !== note.rootPath);
                }
            }
            this.saveData();
            this._onDidChangeTreeData.fire();
            vscode.window.showInformationMessage(Localize.localize('msg.deletedMultipleTags', allTagsToDelete.size.toString(), totalNotes.toString()));
        }
    }

    refresh(): void {
        this.loadData();
        this._onDidChangeTreeData.fire();
    }

    // 重命名标签（不重命名子标签）
    async renameTag(tagPath: string): Promise<void> {
        const oldTagName = tagPath.split('/').pop() || '';
        const newTagName = await vscode.window.showInputBox({
            prompt: Localize.localize('msg.renameTagPrompt'), // 重命名标签
            value: oldTagName,
            validateInput: (value: string) => {
                return this.validateTagName(value);
            }
        });

        if (!newTagName || newTagName === oldTagName) {
            return;
        }
        
        // 清理标签名称
        const sanitizedTagName = this.sanitizeTagName(newTagName);
        if (sanitizedTagName !== newTagName) {
            const useSanitized = await vscode.window.showWarningMessage(
                Localize.localize('msg.tagNameSanitized', newTagName, sanitizedTagName), // 标签名 \"{0}\" 包含非法字符，已自动清理为 \"{1}\"，是否使用清理后的名称？
                Localize.localize('msg.useSanitized'), // 使用清理后的名称
                Localize.localize('msg.cancel') // 取消
            );
            
            if (useSanitized !== Localize.localize('msg.useSanitized')) {
                return;
            }
        }

        // 重命名所有包含该标签的笔记
        let renamedCount = 0;
        for (const note of this.noteList) {
            if (note.tags && note.tags.includes(oldTagName)) {
                // 替换标签名称
                const index = note.tags.indexOf(oldTagName);
                if (index !== -1) {
                    note.tags[index] = newTagName;
                    renamedCount++;
                }
            }
        }

        // 保存数据
        this.saveData();
        this._onDidChangeTreeData.fire();
        
        vscode.window.showInformationMessage(Localize.localize('msg.tagRenamed', oldTagName, newTagName, renamedCount.toString())); // 成功重命名标签，并显示受影响的笔记数量
    }

    // 导入文件或文件夹到标签
    async importFiles(tagPath: string): Promise<void> {
        // 让用户选择导入文件或文件夹
        const importType = await vscode.window.showQuickPick([
            { label: Localize.localize('msg.importFiles'), value: 'files' }, // 导入文件
            { label: Localize.localize('msg.importFolders'), value: 'folders' } // 导入文件夹
        ], {
            placeHolder: Localize.localize('msg.chooseImportType') // 选择导入类型
        });
        
        if (!importType) {
            return;
        }
        
        const fileUris = await vscode.window.showOpenDialog({
            canSelectMany: true,
            canSelectFiles: importType.value === 'files',
            canSelectFolders: importType.value === 'folders',
            openLabel: Localize.localize('msg.import'), // 导入
            title: Localize.localize('msg.selectFilesToImport'), // 选择要导入的文件
            filters: importType.value === 'files' ? {
                'All Files': ['*.*']
            } : undefined
        });
        
        if (!fileUris || fileUris.length === 0) {
            return;
        }

        if (!fileUris || fileUris.length === 0) {
            return;
        }

        let addedCount = 0;
        let skippedCount = 0;
        let createdTags: string[] = [];

        for (const uri of fileUris) {
            const filePath = uri.fsPath;
            const fileName = path.basename(filePath);
            
            // 检查是否是文件夹
            if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
                // 导入文件夹：创建同名标签
                let newTagName = fileName;
                
                // 构建完整的标签路径
                let fullTagPath = tagPath ? `${tagPath}/${newTagName}` : newTagName;
                
                // 检查标签是否已存在
                const tagExists = this.noteList.some(note => note.tags.includes(fullTagPath));
                if (tagExists) {
                    // 如果标签已存在，询问用户是否覆盖
                    const choice = await vscode.window.showWarningMessage(
                        Localize.localize('msg.tagAlreadyExists', fullTagPath), // 标签已存在
                        Localize.localize('msg.overwrite'), // 覆盖
                        Localize.localize('msg.cancel') // 取消
                    );
                    if (choice !== Localize.localize('msg.overwrite')) {
                        continue;
                    }
                } else {
                    createdTags.push(fullTagPath);
                }
                
                // 导入文件夹内的所有文件到新标签
                addedCount += await this.importFolderToTag(filePath, fullTagPath);
                continue;
            }
            
            // 检查该标签下是否已存在同名文件
            const existsInTag = this.noteList.some(note => 
                note.rootPath === filePath && note.tags.includes(tagPath)
            );
            if (existsInTag) {
                skippedCount++;
                continue;
            }

            // 检查该文件是否已经在其他标签中存在
            const existingNote = this.noteList.find(note => note.rootPath === filePath);
            if (existingNote) {
                // 如果文件已存在，只需添加到当前标签
                if (!existingNote.tags.includes(tagPath)) {
                    existingNote.tags.push(tagPath);
                    addedCount++;
                } else {
                    skippedCount++;
                }
            } else {
                // 如果文件不存在，创建新笔记
                const newNote: NoteItem = {
                    name: fileName,
                    rootPath: filePath,
                    paths: [],
                    tags: [tagPath],
                    enabled: true
                };
                this.noteList.push(newNote);
                addedCount++;
            }
        }

        if (addedCount > 0) {
            this.saveData();
            this._onDidChangeTreeData.fire();
        }

        let message = Localize.localize('msg.importedFiles', addedCount.toString()); // 成功导入文件数量
        if (createdTags.length > 0) {
            message += Localize.localize('msg.createdTags', createdTags.length.toString()); // 创建的标签数量
        }
        if (skippedCount > 0) {
            message += Localize.localize('msg.skippedFiles', skippedCount.toString()); // 跳过的文件数量
        }
        vscode.window.showInformationMessage(message);
    }

    // 导入文件夹内的所有文件到指定标签
    private async importFolder(folderPath: string, tagPath: string): Promise<number> {
        let addedCount = 0;
        
        try {
            const files = fs.readdirSync(folderPath);
            
            for (const file of files) {
                const fullPath = path.join(folderPath, file);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    // 递归导入子文件夹
                    addedCount += await this.importFolder(fullPath, tagPath);
                } else {
                    // 导入文件
                    const fileName = path.basename(fullPath);
                    
                    // 检查该标签下是否已存在同名文件
                    const existsInTag = this.noteList.some(note => 
                        note.rootPath === fullPath && note.tags.includes(tagPath)
                    );
                    if (existsInTag) {
                        continue;
                    }
                    
                    // 检查该文件是否已经在其他标签中存在
                    const existingNote = this.noteList.find(note => note.rootPath === fullPath);
                    if (existingNote) {
                        // 如果文件已存在，只需添加到当前标签
                        if (!existingNote.tags.includes(tagPath)) {
                            existingNote.tags.push(tagPath);
                            addedCount++;
                        }
                    } else {
                        // 如果文件不存在，创建新笔记
                        const newNote: NoteItem = {
                            name: fileName,
                            rootPath: fullPath,
                            paths: [],
                            tags: [tagPath],
                            enabled: true
                        };
                        this.noteList.push(newNote);
                        addedCount++;
                    }
                }
            }
        } catch (error) {
            console.error(`Error importing folder ${folderPath}:`, error);
        }
        
        return addedCount;
    }

    // 导入文件夹内的所有文件到指定标签（递归，子文件夹创建同名子标签）
    private async importFolderToTag(folderPath: string, tagPath: string): Promise<number> {
        let addedCount = 0;
        let hasFiles = false; // 标记当前文件夹是否有文件
        
        try {
            // 检查文件夹是否存在且可访问
            if (!fs.existsSync(folderPath)) {
                console.warn(`Folder does not exist: ${folderPath}`);
                return 0;
            }
            
            const files = fs.readdirSync(folderPath);
            
            for (const file of files) {
                const fullPath = path.join(folderPath, file);
                
                try {
                    const stat = fs.statSync(fullPath);
                    
                    // 跳过系统文件和隐藏文件
                    if (file.startsWith('.') || file === 'Thumbs.db' || file === 'desktop.ini') {
                        continue;
                    }
                    
                    if (stat.isDirectory()) {
                        // 子文件夹创建同名子标签（支持无限层级递归）
                        const subTagName = this.sanitizeTagName(file);
                        const subTagPath = `${tagPath}/${subTagName}`;
                        
                        // 递归导入子文件夹
                        const subAddedCount = await this.importFolderToTag(fullPath, subTagPath);
                        addedCount += subAddedCount;
                        
                        // 如果子文件夹有文件，标记当前文件夹也有内容
                        if (subAddedCount > 0) {
                            hasFiles = true;
                        }
                    } else {
                        // 支持所有文件类型
                        // 导入文件到指定标签
                        const fileName = path.basename(fullPath);
                        hasFiles = true; // 标记有文件
                        
                        // 检查该标签下是否已存在同名文件
                        const existsInTag = this.noteList.some(note => 
                            note.rootPath === fullPath && note.tags.includes(tagPath)
                        );
                        if (existsInTag) {
                            continue;
                        }
                        
                        // 检查该文件是否已经在其他标签中存在
                        const existingNote = this.noteList.find(note => note.rootPath === fullPath);
                        if (existingNote) {
                            // 如果文件已存在，只需添加到当前标签
                            if (!existingNote.tags.includes(tagPath)) {
                                existingNote.tags.push(tagPath);
                                addedCount++;
                            }
                        } else {
                            // 如果文件不存在，创建新笔记
                            const newNote: NoteItem = {
                                name: fileName,
                                rootPath: fullPath,
                                paths: [],
                                tags: [tagPath],
                                enabled: true
                            };
                            this.noteList.push(newNote);
                            addedCount++;
                        }
                    }
                } catch (fileError) {
                    console.warn(`Error processing file ${fullPath}:`, fileError);
                    // 继续处理其他文件，不中断整个导入过程
                }
            }
            
            // 确保每个文件夹都有对应的标签（即使没有文件也要创建标签以保持层级结构）
            // 检查该标签是否已存在
            const tagExists = this.noteList.some(note => note.tags.includes(tagPath));
            if (!tagExists) {
                // 创建空标签项目
                const emptyNote: NoteItem = {
                    name: Localize.localize('msg.emptyFolder'), // 空文件夹
                    rootPath: '',
                    paths: [],
                    tags: [tagPath],
                    enabled: true
                };
                this.noteList.push(emptyNote);
            }
        } catch (error) {
            console.error(`Error importing folder ${folderPath} to tag ${tagPath}:`, error);
        }
        
        return addedCount;
    }

    // 获取所有启用的笔记文件路径
    getAllNoteFiles(): string[] {
        return this.noteList
            .filter(note => note.enabled && note.rootPath && fs.existsSync(note.rootPath))
            .map(note => note.rootPath!);
    }

    // 检查所有标签是否都已折叠
    async isAllCollapsed(): Promise<boolean> {
        const allTags = this.getAllTags();
        const allTagPaths = allTags.map(tag => this.getTagPath(tag));
        return allTagPaths.length > 0 && allTagPaths.every(tagPath => this.collapsedState.has(tagPath));
    }

    // -------------------
    // 从文本手动导入文件 - 使用 Webview 面板
    // -------------------
    async importFromText(): Promise<void> {
        const panel = vscode.window.createWebviewPanel(
            'importFromText',
            Localize.localize('msg.importFromText.title'), // 从文本手动导入文件
            vscode.ViewColumn.One,
            { enableScripts: true }
        );
        
        panel.webview.html = this.getImportWebviewHtml();
        
        panel.webview.onDidReceiveMessage(async (message) => {
            if (message.command === 'import') {
                await this.processImportFromText(message.tags, message.paths);
                panel.dispose();
            }
        });
    }
    
    // HTML 样式
    private getImportWebviewHtml(): string {
        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: var(--vscode-font-family);
            padding: 20px;
            color: var(--vscode-foreground);
            background: var(--vscode-editor-background);
        }
        .container { max-width: 600px; }
        label { 
            display: block; 
            margin-bottom: 5px; 
            font-weight: bold;
        }
        input[type="text"] {
            width: 100%;
            padding: 8px;
            margin-bottom: 15px;
            border: 1px solid #555;
            background: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border-radius: 4px;
            box-sizing: border-box;
        }
        input[type="text"]:focus {
            border-color: var(--vscode-focusBorder);
            outline: none;
        }
        textarea {
            width: 100%;
            height: 250px;
            padding: 8px;
            margin-bottom: 15px;
            border: 1px solid #555;
            background: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border-radius: 4px;
            resize: vertical;
            font-family: var(--vscode-editor-font-family);
            box-sizing: border-box;
        }
        textarea:focus {
            border-color: var(--vscode-focusBorder);
            outline: none;
        }
        button {
            padding: 10px 20px;
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        button:hover {
            background: var(--vscode-button-hoverBackground);
        }
        .hint {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <label>${Localize.localize('msg.importFromText.tagsLabel')}</label>
        <input type="text" id="tags" placeholder="${Localize.localize('msg.importFromText.tagsPlaceholder')}">
        
        <label>${Localize.localize('msg.importFromText.pathsLabel')}</label>
        <div class="hint">${Localize.localize('msg.importFromText.pathsHint')}</div>
        <textarea id="paths" placeholder="D:\\path\\file1.txt&#10;D:\\path\\file2.xlsx"></textarea>
        
        <button id="importBtn">${Localize.localize('msg.importFromText.importBtn')}</button>
    </div>
    
    <script>
        const vscode = acquireVsCodeApi();
        document.getElementById('importBtn').addEventListener('click', () => {
            const tags = document.getElementById('tags').value;
            const paths = document.getElementById('paths').value;
            vscode.postMessage({ command: 'import', tags, paths });
        });
    </script>
</body>
</html>`;
    }
    
    // 处理从文本手动导入文件的逻辑
    private async processImportFromText(tagsInput: string, pathsInput: string): Promise<void> {
        const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
        const filePaths = pathsInput.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        // 如果用户没有输入文件路径，提示并返回
        if (filePaths.length === 0) {
            vscode.window.showWarningMessage(Localize.localize('msg.importFromText.noFiles')); // 提示用户输入有效文件路径
            return;
        }
        // 如果用户没有输入标签，使用默认标签
        if (tags.length === 0) {
            tags.push(Localize.localize('msg.defaultTag')); // 添加默认标签
        }
        
        let addedCount = 0;
        let skippedCount = 0;
        // 逐行处理文件路径
        for (const filePath of filePaths) {
            if (!fs.existsSync(filePath)) {
                skippedCount++;
                continue;
            }
            // 如果是目录，递归导入子目录
            const fileName = path.basename(filePath);
            const isDirectory = fs.statSync(filePath).isDirectory();
            // 如果是文件，直接添加到标签
            for (const tag of tags) {
                if (isDirectory) {
                    addedCount += await this.importFolderToTag(filePath, tag);
                    continue;
                }
                // 检查该标签下是否已存在同名文件
                const existsInTag = this.noteList.some(note => 
                    note.rootPath === filePath && note.tags.includes(tag)
                );
                if (existsInTag) {
                    skippedCount++;
                    continue;
                }
                // 检查该文件是否已经在其他标签中存在
                const existingNote = this.noteList.find(note => note.rootPath === filePath);
                if (existingNote) {
                    if (!existingNote.tags.includes(tag)) {
                        existingNote.tags.push(tag);
                        addedCount++;
                    }
                } else {
                    this.noteList.push({
                        name: fileName,
                        rootPath: filePath,
                        paths: [],
                        tags: [tag],
                        enabled: true
                    });
                    addedCount++;
                }
            }
        }
        // 保存数据并刷新视图
        if (addedCount > 0) {
            this.saveData();
            this._onDidChangeTreeData.fire();
        }
        // 构建提示信息
        let message = Localize.localize('msg.importedFiles', addedCount.toString()); // 导入成功
        if (skippedCount > 0) {
            message += Localize.localize('msg.skippedFiles', skippedCount.toString()); // 跳过的文件
        }
        vscode.window.showInformationMessage(message);
    }

    // =========== END ==============
}