import React from 'react';
import {act, render, screen} from '@testing-library/react';
import Sidebar from "./Sidebar";

test('should render a tree', () => {
    const addFolderToPath = jest.fn()
    const addFileToPath = jest.fn()

    render(<Sidebar addFolderToPath={addFolderToPath} addFileToPath={addFileToPath} />);

    const tree = screen.getByRole("tree")

    expect(tree).toBeInTheDocument();
});
