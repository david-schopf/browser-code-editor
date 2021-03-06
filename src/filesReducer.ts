import {File, Folder} from "./filesModel";
import {
    addFileWithoutPathDuplicates,
    addNodeToTree, filterNodeIsInTree, filterNodesAreInTree,
    getPath,
    removeNodeFromTree
} from "./filesFunctions";
import {FilesAction} from "./filesActions";

export interface FilesState {
    tree: Folder;
    fileContent: Map<string, string>
    openFiles: File[];
    activeFile?: File;
}

const rootNode: Folder = {name: '', inPath: '', children: []};

export const initialState: FilesState = {tree: rootNode, fileContent: new Map<string, string>(), openFiles: []};

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
                openFiles: addFileWithoutPathDuplicates(state.openFiles, action.payload),
                activeFile: action.payload
            }
        case 'OPEN_FILE': {
            return {
                ...state,
                openFiles: addFileWithoutPathDuplicates(state.openFiles, action.payload),
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
            // Create new reference and add file
            const fileContent = new Map(state.fileContent);
            fileContent.set(getPath(action.payload.file), action.payload.content)
            return {
                ...state,
                fileContent
            }
        }
        case 'DELETE_NODE': {
            // Create new reference and remove file
            const fileContent = new Map(state.fileContent);
            fileContent.delete(getPath(action.payload));

            // Create new tree without this node and its children
            const tree = removeNodeFromTree(state.tree, action.payload)

            const openFiles = filterNodesAreInTree(tree, state.openFiles);
            const activeFile = (state.activeFile && filterNodeIsInTree(tree, state.activeFile)) || openFiles[0];

            return {
                ...state,
                openFiles,
                activeFile,
                tree,
                fileContent
            }
        }
    }
    return state;
}
