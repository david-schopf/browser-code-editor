import React from 'react';
import {act, render, screen} from '@testing-library/react';
import FolderItem from "./FolderItem";
import {File, Folder} from "../../filesModel";

const testFolder: Folder = {
    name: 'TestFolder',
    inPath: '/',
    children: []
}

test('should add a folder', () => {
    const addFolderToPath = jest.fn()
    const addFileToPath = jest.fn()
    const deleteFile = jest.fn()
    const selectFile = jest.fn()

    render(<FolderItem folder={testFolder} onCreateFolder={addFolderToPath} isRoot={false} onDelete={deleteFile}
                       onCreateFile={addFileToPath} onClickFile={selectFile}/>);

    const button = screen.getByLabelText(/Create folder/)

    act(() => {
        button.click()
    })

    expect(addFolderToPath).toHaveBeenCalled();
});
