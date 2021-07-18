import React from 'react';
import {render} from '@testing-library/react';

import {MOCK_LOCATION} from 'client/spec/location';

import List from '..';

const props = {
    onOptionKeyDown: jest.fn(),
    onOptionClick: jest.fn(),
    listEl: {current: {}},
    isListVisible: true,
    result: {data: [MOCK_LOCATION, MOCK_LOCATION], numFound: 6},
    searchTerm: 'Abc',
    index: 2,
};

describe('List', () => {
    it('Renders List and Options', () => {
        // @ts-expect-error
        const {queryAllByRole, queryByText, queryByRole} = render(<List {...props} />);

        expect(queryByRole('listbox')).toBeTruthy();
        expect(queryAllByRole('option')).toHaveLength(2);
        expect(queryByText('No results found')).toBeFalsy();
    });

    it('Renders Empty option when numFound equals to 0', () => {
        const modifiedProps = {...props, result: {...props.result, numFound: 0}};
        // @ts-expect-error
        const {queryAllByRole, queryByRole, queryByText} = render(<List {...modifiedProps} />);

        expect(queryByRole('listbox')).toBeTruthy();
        expect(queryAllByRole('option')).toHaveLength(1);
        expect(queryByText('No results found')).toBeTruthy();
    });
});
