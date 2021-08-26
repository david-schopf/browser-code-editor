import {File, FileTreeNode, Folder, isFile, isFolder} from "./model";
import React from "react";

export interface FilesState {
    tree: Folder;
    openFiles: File[];
    activeFile?: File;
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

interface OpenFileAction extends Action {
    name: 'OPEN_FILE',
    payload: File
}

interface SelectFileAction extends Action {
    name: 'SELECT_FILE',
    payload: File
}

interface SaveFileAction extends Action {
    name: 'SAVE_FILE',
    payload: File
}

export type FilesAction = AddFolderAction | AddFileAction | OpenFileAction | SelectFileAction | SaveFileAction;

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

const updateFileContent = (tree: Folder, file: File): Folder => {
    return {
        ...tree,
        children: tree.children.map(child => {
            const filePath = getPath(file);
            if (filePath === getPath(child)) {
                return file;
            }
            if (filePath.startsWith(child.inPath) && isFolder(child)) {
                 return updateFileContent(child, file)
            }
            return child;
        })
    }
}

const rootNode = {name: '/', inPath: '', children: []};

export const initialState: FilesState = {tree: rootNode, openFiles: []};

export const dispatchAddFolderInPath = (dispatch: React.Dispatch<FilesAction>) => (inPath: string) => (name: string) => dispatch({
    name: 'ADD_FOLDER',
    payload: {name, inPath}
})

export const dispatchAddFileInPath = (dispatch: React.Dispatch<FilesAction>) => (inPath: string) => (name: string) => dispatch({
    name: 'ADD_FILE',
    payload: {name, inPath}
})

export const dispatchSelectFile = (dispatch: React.Dispatch<FilesAction>) => (file: File) => dispatch({
    name: 'SELECT_FILE',
    payload: file
})

export const dispatchOpenFile = (dispatch: React.Dispatch<FilesAction>) => (file: File) => dispatch({
    name: 'OPEN_FILE',
    payload: file
})

export const dispatchSaveFile = (dispatch: React.Dispatch<FilesAction>) => (file: File) => dispatch({
    name: 'SAVE_FILE',
    payload: file
})

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
        case 'OPEN_FILE': {
            return {
                ...state,
                // Prevent duplicated open files
                openFiles: Array.from(new Set([...state.openFiles, action.payload])),
                activeFile: action.payload
            }
        }
        case 'SELECT_FILE': {
            return {
                ...state,
                activeFile: action.payload
            }
        }
        case 'SAVE_FILE': {
            return {
                ...state,
                tree: updateFileContent(state.tree, action.payload)
            }
        }
    }
    return state;
}
