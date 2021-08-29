import React from 'react';
import {render, screen} from '@testing-library/react';
import Tabs from './Tabs';
import {File} from "../filesModel";

const testFile: File = {
    name: 'Test file',
    inPath: '/'
}
describe('Tabs', () => {

    test('should render tabs', () => {
        render(<Tabs files={[testFile]} onSelectFile={jest.fn()}/>);
        const tabs = screen.getByRole(/tablist/)
        expect(tabs.textContent).toContain(testFile.name);
    });

    test('should render a tab', () => {
        render(<Tabs files={[testFile]} onSelectFile={jest.fn()}/>);
        const tab = screen.getByRole("tab")
        expect(tab.textContent).toContain(testFile.name);
    });

});
