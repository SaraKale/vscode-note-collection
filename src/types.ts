// 定义NoteItem接口
// 用于表示单个笔记项
// 包含笔记的名称、根路径、子路径、标签和启用状态
export interface NoteItem {
    name?: string;
    rootPath?: string;
    paths?: string[];
    tags: string[];
    enabled: boolean;
}

export type NoteList = NoteItem[];
