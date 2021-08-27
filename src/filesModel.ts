export interface FileTreeNode {
    name: string;
    inPath: string;
}

export interface Folder extends FileTreeNode {
    children: FileTreeNode[];
}

export interface File extends FileTreeNode {
}

export function isFolder(node: FileTreeNode): node is Folder {
    return "children" in node;
}