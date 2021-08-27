import {File, FileTreeNode, Folder, isFolder} from "./filesModel";

export const getPath = (node: FileTreeNode) => isFolder(node) ? `${node.inPath + node.name}/` : node.inPath + node.name
const addNodeToFolder = (node: FileTreeNode, folder: Folder): Folder => ({
    ...folder,
    children: [...folder.children, node]
})

export function isPathEqual(node: FileTreeNode, compare: FileTreeNode) {
    return getPath(node) === getPath(compare);
}

// Adds new nodes recursively to the tree
export const addNodeToTree = (tree: Folder, nodeToAdd: FileTreeNode): Folder => {
    // Do not add duplicate names
    if (tree.children.some(node => node.name === nodeToAdd.name)) {
        return tree;
    } else {
        const path = getPath(tree);
        // Add new node to the current folder
        if (path === nodeToAdd.inPath && isFolder(tree)) {
            return addNodeToFolder(nodeToAdd, tree)
            // Add new node to a subfolder because of the matching path
        } else if (nodeToAdd.inPath.startsWith(path) && isFolder(tree)) {
            return ({
                ...tree,
                children: tree.children.filter(isFolder).map(child => addNodeToTree(child, nodeToAdd))
            });
        } else return tree;
    }
}
export const removeNodeFromTree = (tree: Folder, nodeToRemove: FileTreeNode): Folder => {
    return ({
        ...tree,
        children: tree.children
            .filter(child => !isPathEqual(child, nodeToRemove)) // Remove child if it is the removed node
            .map(child => isFolder(child) ? removeNodeFromTree(child, nodeToRemove) : child) // recursion
    });
}

export function addFileWithoutDuplicates(openFiles: File[], newFile: File): File[] {
    return openFiles.some(file => isPathEqual(file, newFile)) ? openFiles : [...openFiles, newFile];
}

export function isPathInTree(tree: FileTreeNode, path: string): boolean {
    if (getPath(tree) === path) {
        return true;
    } else if (isFolder(tree)) {
        return tree.children.some(child => isPathInTree(child, path))
    }
    return false;
}