import CreateFileDialog from "./CreateFileDialog";
import {act, fireEvent, render, screen} from "@testing-library/react";

describe('CreateDialog', () => {

    test('Renders an input element', () => {
        render(<CreateFileDialog onCreated={jest.fn()} onCancel={jest.fn()} />)
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument()
    })

    test('Cancels the dialog', () => {
        const onCancel = jest.fn();
        render(<CreateFileDialog onCreated={jest.fn()} onCancel={onCancel}/>)
        const cancelButton = screen.getByText('Cancel');

        act(() => {
            cancelButton.click();
        })

        expect(onCancel).toHaveBeenCalled()
    })

    test('Fires a create event if there is a name', () => {
        const onCreate = jest.fn();
        render(<CreateFileDialog onCreated={onCreate} onCancel={jest.fn()}/>)
        const okButton = screen.getByText('OK');
        const input = screen.getByRole(/textbox/);

        act(() => {
            fireEvent.change(input, { target: { value: 'test'}})
        })

        act(() => okButton.click())

        expect(onCreate).toHaveBeenCalledWith('test')
    })

})