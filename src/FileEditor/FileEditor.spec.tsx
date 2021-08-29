import React from 'react';
import { render, screen } from '@testing-library/react';
import FileEditor from "./FileEditor";
import {File} from "../filesModel";

const fileContent = 'content';

const testFile: File = {
    name: 'Test file',
    inPath: '/'
}

describe('FileEditor', () => {

    test('Renders a textarea with the content if there is a file', () => {
        render(<FileEditor onEdit={jest.fn()} content={fileContent} file={testFile} />)
        const textarea = screen.getByRole(/textbox/)
        expect((textarea as HTMLTextAreaElement).value).toEqual(fileContent)
    })

    test('Renders a message if there is no file', () => {
        render(<FileEditor onEdit={jest.fn()} content={fileContent} />)
        const noFileMessage = screen.getByText(/Create, select or open a file to see its content/i);
        expect(noFileMessage).toBeInTheDocument();
    })

})