import React from 'react';
import {render} from '@testing-library/react';

import Dogs from '..';

const props = {
    dogs: ['url', 'url1'],
};

describe('Breed', () => {
    it('Renders list of dogs (1)', () => {
        const {container} = render(<Dogs {...props} />);

        const imgs = container.querySelectorAll('img');

        expect(imgs.length).toEqual(2);
    });

    it('Renders list of dogs (2)', () => {
        const modifiedProps = {dogs: ['url', 'url1', 'url3', 'url4']};
        const {container} = render(<Dogs {...modifiedProps} />);

        const imgs = container.querySelectorAll('img');

        expect(imgs.length).toEqual(4);
    });
});
