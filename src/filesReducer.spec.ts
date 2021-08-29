import filesReducer, {initialState} from "./filesReducer";
import {Folder, File} from "./filesModel";
import {getPath} from "./filesFunctions";

const testFolder: Folder = {
    name: 'TestFolder',
    inPath: '/',
    children: []
}

const testFile: File = {
    name: 'Test file',
    inPath: '/'
}

describe('File Reducer', () => {

    it('should add a folder', () => {
        const state = filesReducer(initialState, {
            name: "ADD_FOLDER",
            payload: testFolder
        })

        expect(state).toEqual({
            ...state,
            tree: {
                children: [testFolder],
                inPath: "",
                name: ""
            }
        })
    })

    it('should add a file', () => {
        const state = filesReducer(initialState, {
            name: "ADD_FILE",
            payload: testFile
        })

        expect(state).toEqual({
            ...state,
            tree: {
                children: [testFile],
                inPath: "",
                name: ""
            }
        })
    })

    it('should open a file', () => {
        const state = filesReducer(initialState, {
            name: "OPEN_FILE",
            payload: testFile
        })

        expect(state.openFiles).toEqual([testFile])
    })

    it('should select a file', () => {
        const state = filesReducer(initialState, {
            name: "SELECT_FILE",
            payload: testFile
        })

        expect(state.activeFile).toEqual(testFile)
    })

    it('should save a file', () => {
            const state = filesReducer(initialState, {
                name: "SAVE_FILE",
                payload: {
                    file: testFile,
                    content: 'Content'
                }
            })

            expect(state.fileContent.get('/Test file')).toEqual('Content')
        }
    )

    it('should delete a folder and its children', () => {
        const state = filesReducer({
            ...initialState,
            tree: {
                children: [testFolder],
                inPath: "",
                name: ""
            }
        }, {
            name: "DELETE_NODE",
            payload: testFolder
        })

        expect(state.tree.children.length).toBe(0)
    })
})