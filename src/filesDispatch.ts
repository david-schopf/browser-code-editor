import React from "react";
import {File, FileTreeNode} from "./filesModel";
import {FilesAction} from "./filesActions";

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

export const dispatchDeleteNode = (dispatch: React.Dispatch<FilesAction>) => (node: FileTreeNode) => dispatch({
    name: 'DELETE_NODE',
    payload: node,
})