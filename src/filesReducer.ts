import {File, FileTreeNode, Folder, isFolder} from "./model";
import React from "react";

export interface FilesState {
    tree: Folder;
}


interface Action {
    name: string;
    payload: any;
}

interface AddFolderAction extends Action {
    name: 'ADD_FOLDER',
    payload: {
        name: string;
        inPath: string;
    }
}

interface AddFileAction extends Action {
    name: 'ADD_FILE',
    payload: {
        name: string;
        inPath: string;
    }
}

export const getPath = (node: FileTreeNode) => node.inPath + node.name

const addNodeToFolder = (node: FileTreeNode, folder: Folder): Folder => ({
    ...folder,
    children: [...folder.children, node]
})

// Adds new nodes recursively to the tree
const addNodeToFileTree = (tree: Folder, nodeToAdd: FileTreeNode): Folder => {
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
                children: tree.children.filter(isFolder).map(child => addNodeToFileTree(child, nodeToAdd))
            });
        } else return tree;
    }
}

const rootNode = {name: '/', inPath: '', children: []};

export const initialState: FilesState = {tree: rootNode};

export const dispatchAddFolderInPath = (dispatch: React.Dispatch<FilesAction>) => (inPath: string) => (name: string) => dispatch({
    name: 'ADD_FOLDER',
    payload: {name, inPath}
})

export const dispatchAddFileInPath = (dispatch: React.Dispatch<FilesAction>) => (inPath: string) => (name: string) => dispatch({
    name: 'ADD_FILE',
    payload: {name, inPath}
})

export type FilesAction = AddFolderAction | AddFileAction;

export default function filesReducer(state: FilesState, action: FilesAction): FilesState {
    const newFolder: Folder = {...action.payload, children: []};
    switch (action.name) {
        case 'ADD_FOLDER':
            return {
                ...state,
                tree: addNodeToFileTree(state.tree, newFolder)
            }
        case 'ADD_FILE':
            const newFile: File = {...action.payload, content: ''}
            return {
                ...state,
                tree: addNodeToFileTree(state.tree, newFile)
            }
    }
    return state;
}