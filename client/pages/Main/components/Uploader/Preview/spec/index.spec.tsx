import React from 'react';
import {render} from '@testing-library/react';

import Preview from '..';

const props = {
    previewUrl: 'url',
    isPreviewPending: true,
};

describe('Preview', () => {
    it('Renders spinner while loading', () => {
        const {queryByAltText} = render(<Preview {...props} />);

        expect(queryByAltText('spinner')).toBeTruthy();
        expect(queryByAltText('image')).toBeNull();
        expect(queryByAltText('template')).toBeNull();
    });

    it('Renders preview while not loading and no url', () => {
        const modifiedProps = {
            previewUrl: '',
            isPreviewPending: false,
        };

        const {queryByAltText} = render(<Preview {...modifiedProps} />);

        expect(queryByAltText('template')).toBeTruthy();
        expect(queryByAltText('spinner')).toBeNull();
        expect(queryByAltText('image')).toBeNull();
    });

    it('Renders image while not loading and has url', () => {
        const modifiedProps = {
            previewUrl: 'url',
            isPreviewPending: false,
        };

        const {queryByAltText} = render(<Preview {...modifiedProps} />);

        expect(queryByAltText('image')).toBeTruthy();
        expect(queryByAltText('spinner')).toBeNull();
        expect(queryByAltText('template')).toBeNull();
    });
});
