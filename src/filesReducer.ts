import {Folder} from "./model";

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

export type FilesAction = AddFolderAction;

export default function filesReducer(state: FilesState, action: FilesAction): FilesState {
    const newFolder: Folder = {...action.payload, children: []};
    switch (action.name) {
        case 'ADD_FOLDER':
            return {
                ...state,
                folders: [...state.folders, newFolder]
            }
    }
    return state;
}