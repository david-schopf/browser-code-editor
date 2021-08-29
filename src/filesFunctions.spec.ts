import {getPath, isPathEqual} from "./filesFunctions";
import {File, Folder} from "./filesModel";


const testFolder: Folder = {
    name: 'TestFolder',
    inPath: '/',
    children: []
}

const testFile: File = {
    name: 'Test file',
    inPath: '/'
}

describe('Files Functions', () => {

    it('should return the paths are equal', () => {
        const isEqual = isPathEqual(testFile, testFile)
        expect(isEqual).toBe(true)
    })

    it('should return the paths are not equal', () => {
        const isEqual = isPathEqual(testFile, testFolder)
        expect(isEqual).toBe(false)
    })

    it('should return the file path', () => {
        const path = getPath(testFile)
        expect(path).toEqual('/Test file')
    })

    it('should return the folder path', () => {
        const path = getPath(testFolder)
        expect(path).toEqual('/TestFolder/')
    })


})