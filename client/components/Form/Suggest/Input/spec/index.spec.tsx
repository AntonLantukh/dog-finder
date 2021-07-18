import React from 'react';
import {render} from '@testing-library/react';

import Input from '..';

const props = {
    value: 'Test',
    isPending: true,
    inputEl: {current: {offsetWidth: 100}},
    onInputChange: jest.fn(),
    onInputFocus: jest.fn(),
    onInputBlur: jest.fn(),
    onInputKeyDown: jest.fn(),
};

describe('Input', () => {
    it('Renders label and its content', () => {
        // @ts-expect-error
        const {getByLabelText} = render(<Input {...props} />);

        expect(getByLabelText('Pick-up Location')).toBeTruthy();
    });

    it('Renders image', () => {
        // @ts-expect-error
        const {queryByRole} = render(<Input {...props} />);

        expect(queryByRole('img')).toBeTruthy();
    });

    it("Doesn't render image if it is not pending", () => {
        // @ts-expect-error
        const {queryByRole} = render(<Input {...{...props, isPending: false}} />);

        expect(queryByRole('img')).toBeFalsy();
    });
});
