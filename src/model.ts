export interface FileTreeNode {
    name: string;
    inPath: string;
}

export interface Folder extends FileTreeNode {
    children: FileTreeNode[];
}

export interface File extends FileTreeNode {
    content: string;
}


export function isFile(node: FileTreeNode): node is File {
    return "content" in node;
}

export function isFolder(node: FileTreeNode): node is Folder {
    return "children" in node;
}