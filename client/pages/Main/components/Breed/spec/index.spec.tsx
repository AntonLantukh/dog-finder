import React from 'react';
import {render} from '@testing-library/react';

import Breed from '..';

const props = {
    breed: ['terrier', 'yorkshire'],
};

describe('Breed', () => {
    it('Renders breed caption if breed comes', () => {
        const {queryByText} = render(<Breed {...props} />);

        expect(
            queryByText(`Your dog's breed is yorkshire terrier. Nice choice! Look at other dogs of the same breed.`),
        ).toBeTruthy();
    });

    it('Renders not found caption if there is no breed', () => {
        const modifiedProps = {breed: []};

        const {queryByText} = render(<Breed {...modifiedProps} />);

        expect(
            queryByText(`Ooops! We could not find the breed! Maybe you have just created a new one? 🤔`),
        ).toBeTruthy();
    });
});
