interface FileTreeNode {
    name: string;
    inPath: string;
}

export interface Folder extends FileTreeNode {
    children: FileTreeNode[];
}

export interface File extends FileTreeNode {
    content: string;
}

