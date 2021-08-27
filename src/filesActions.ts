import {File, FileTreeNode} from "./filesModel";

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

interface DeleteNodeAction extends Action {
    name: 'DELETE_NODE',
    payload: FileTreeNode
}

export type FilesAction =
    AddFolderAction
    | AddFileAction
    | OpenFileAction
    | SelectFileAction
    | SaveFileAction
    | DeleteNodeAction;