import React from 'react';
import {render} from '@testing-library/react';

import DragArea from '..';

const props = {
    onFileDrop: jest.fn(),
    onFileUpload: jest.fn(),
    accept: '.jpg',
    error: 'Error!',
};

describe('DragArea', () => {
    it('Renders button and caption', () => {
        const {queryByText, container} = render(<DragArea {...props} />);

        expect(container.querySelector('input')).toBeTruthy();
        expect(queryByText('Or just drag it to the window')).toBeTruthy();
    });

    it('Renders error if there is error', () => {
        const {queryByText} = render(<DragArea {...props} />);

        expect(queryByText('Error!')).toBeTruthy();
    });

    it('Does not render error if there is no error', () => {
        const modifiedProps = {...props, error: null};
        const {queryByText} = render(<DragArea {...modifiedProps} />);

        expect(queryByText('Error!')).toBeNull();
    });
});
