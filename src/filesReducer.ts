import {File, FileTreeNode, Folder, isFolder} from "./model";
import React from "react";

export interface FilesState {
    tree: Folder;
    fileContent: Map<string, string>
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
    payload: {
        file: File;
        content: string;
    }
}

export type FilesAction = AddFolderAction | AddFileAction | OpenFileAction | SelectFileAction | SaveFileAction;

export const getPath = (node: FileTreeNode) => isFolder(node) ? `${node.inPath + node.name}/` : node.inPath + node.name

const addNodeToFolder = (node: FileTreeNode, folder: Folder): Folder => ({
    ...folder,
    children: [...folder.children, node]
})

// Adds new nodes recursively to the tree
const addNodeToTree = (tree: Folder, nodeToAdd: FileTreeNode): Folder => {
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

const rootNode = {name: '', inPath: '', children: []};

export const initialState: FilesState = {tree: rootNode, fileContent: new Map<string, string>(), openFiles: []};

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

export const dispatchSaveFile = (dispatch: React.Dispatch<FilesAction>) => (file: File, content: string) => dispatch({
    name: 'SAVE_FILE',
    payload: {
       file,
        content
    }
})

function uniqueOpenFiles (openFiles: File[], newFile: File): File[] {
    return [newFile, ...openFiles.filter(file => getPath(file) !== getPath(newFile))];
}

export default function filesReducer(state: FilesState, action: FilesAction): FilesState {
    switch (action.name) {
        case 'ADD_FOLDER':
            const newFolder: Folder = {...action.payload, children: []};
            return {
                ...state,
                tree: addNodeToTree(state.tree, newFolder)
            }
        case 'ADD_FILE':
            return {
                ...state,
                tree: addNodeToTree(state.tree, action.payload),
                openFiles: uniqueOpenFiles(state.openFiles, action.payload),
                activeFile: action.payload
            }
        case 'OPEN_FILE': {
            return {
                ...state,
                openFiles: uniqueOpenFiles(state.openFiles, action.payload),
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
                fileContent: new Map(state.fileContent).set(getPath(action.payload.file), action.payload.content)
            }
        }
    }
    return state;
}
