import React from "react";
import {FilesContext} from "../App";
import {render, screen} from "@testing-library/react";
import MainWindow from "./MainWindow";
import {initialState} from "../filesReducer";
import {File} from "../filesModel";
import {getPath} from "../filesFunctions";

const testFile: File = {
    name: 'Test file',
    inPath: '/'
}

const contextValue = {
    ...initialState,
    openFiles: [testFile],
    activeFile: testFile,
    fileContent: new Map().set(getPath(testFile), 'content')
}

describe("MainWindow", () => {

    test("it renders the tab", () => {
        render(<FilesContext.Provider value={
            [contextValue, jest.fn()]
        }>
            <MainWindow/>
        </FilesContext.Provider>)
            const tab = screen.getByRole("tab");
            expect(tab.textContent).toEqual(getPath(testFile))
        }
    )

    test("it renders the editor with file content", () => {
        render(<FilesContext.Provider value={
            [contextValue, jest.fn()]
        }>
            <MainWindow/>
        </FilesContext.Provider>)

        const textarea = screen.getByRole("textbox");
        expect((textarea as HTMLTextAreaElement).value).toEqual('content')
    })
})