import React from "react";
import {FilesContext} from "../App";
import {act, render, screen} from "@testing-library/react";
import {initialState} from "../filesReducer";
import {File} from "../filesModel";
import {getPath} from "../filesFunctions";
import FileTree from "./FileTree";

const testFile: File = {
    name: 'Test file',
    inPath: '/'
}

const contextValue = {
    ...initialState,
    tree: {
        ...initialState.tree,
        children: [testFile]
    }
}

describe("FileTree", () => {

    test("it renders the file in the tree", () => {
            render(<FilesContext.Provider value={
                [contextValue, jest.fn()]
            }>
                <FileTree onCreateFile={jest.fn()} onCreateFolder={jest.fn()}/>
            </FilesContext.Provider>)
            const treeitem = screen.getByRole("treeitem");
            expect(treeitem.textContent).toContain(testFile.name)
        }
    )

})