import React from 'react';
import {render} from '@testing-library/react';

import {MOCK_LOCATION} from 'client/spec/location';

import {OptionEmpty, OptionContent} from '..';

const props = {
    onOptionKeyDown: jest.fn(),
    onOptionClick: jest.fn(),
    location: MOCK_LOCATION,
    searchTerm: 'Abc',
    index: 2,
};

describe('OptionContent', () => {
    it('Renders option', () => {
        const {queryByRole} = render(<OptionContent {...props} />);

        expect(queryByRole('option')).toBeTruthy();
    });

    it('Renders popular badge if isPopular prop equals to true', () => {
        const {queryByText} = render(<OptionContent {...props} />);

        expect(queryByText('Popular')).toBeTruthy();
    });

    it("Doesn't render popular badge if isPopular prop equals to false", () => {
        const modifiedProps = {...props, location: {...props.location, isPopular: false}};
        const {queryByText} = render(<OptionContent {...modifiedProps} />);

        expect(queryByText('Popular')).toBeFalsy();
    });

    it('Renders region and country (doesn`t boldify when no match)', () => {
        const modifiedProps = {...props, location: {...props.location, region: 'Testiko', country: 'Wonderland'}};
        const {queryByText} = render(<OptionContent {...modifiedProps} />);

        expect(queryByText('Testiko, Wonderland')).toBeTruthy();
    });

    it('Renders region and country (boldifies)', () => {
        const modifiedProps = {
            ...props,
            searchTerm: 'Test',
            location: {...props.location, region: 'Testiko', country: 'Wonderland'},
        };
        const {queryByText} = render(<OptionContent {...modifiedProps} />);

        expect(queryByText('Testiko, Wonderland')).toBeFalsy();
        expect(queryByText('iko, Wonderland')).toBeTruthy();
    });
});

describe('OptionEmpty', () => {
    it('Renders empty option', () => {
        const {queryByRole} = render(<OptionEmpty />);

        expect(queryByRole('option')).toBeTruthy();
    });
});
