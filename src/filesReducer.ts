import {File, Folder} from "./model";

export interface FilesState {
    folders: Folder[];
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

export const getFolderPath = (folder: Folder) => `${folder.inPath}${folder.name}/`;

const addFileToFolder = (file: File, folder: Folder): Folder => {
    return {
        ...folder,
        children: [...folder.children, file]
    }
}

const addFileToFileTree = (tree: Folder[], file: File): Folder[] => {
    return tree.map(folder => {
        const path = getFolderPath(folder);
        if (path === file.inPath) {
            return addFileToFolder(file, folder)
        }
        return folder;
    })
}

export type FilesAction = AddFolderAction | AddFileAction;

export default function filesReducer(state: FilesState, action: FilesAction): FilesState {
    const newFolder: Folder = {...action.payload, children: []};
    switch (action.name) {
        case 'ADD_FOLDER':
            return {
                ...state,
                folders: [...state.folders, newFolder]
            }
        case 'ADD_FILE':
            const newFile: File = {...action.payload, content: ''}
            return {
                ...state,
                folders: addFileToFileTree(state.folders, newFile)
            }
    }
    return state;
}