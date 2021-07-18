import React from 'react';
import {render} from '@testing-library/react';

import Announcement from '..';

const props = {
    numFound: null,
};

describe('Announcement', () => {
    it('Renders text for search start', () => {
        const {queryByText} = render(<Announcement {...props} />);

        expect(queryByText('Start typings to find a location')).toBeTruthy();
    });

    it('Renders text for search done', () => {
        const {queryByText} = render(<Announcement numFound={3} />);

        expect(queryByText('3 suggestions found, to navigate use up and down arrows')).toBeTruthy();
    });
});
