import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';

import getLocations from 'client/api/getDogs';

import {MOCK_LOCATION} from 'client/spec/location';

import Suggest from '..';

const mockData = [MOCK_LOCATION, {...MOCK_LOCATION, name: 'Airport', region: 'Somewhere', country: 'Sun'}];

jest.mock('client/api/getLocations', () => {
    const defaultFn = jest.fn().mockImplementation(() => Promise.resolve({data: mockData, numFound: 6}));

    return {
        __esModule: true,
        default: defaultFn,
    };
});

jest.mock('client/hooks/useDebounce', () => {
    const defaultFn = jest.fn().mockImplementation(func => func);

    return {
        __esModule: true,
        default: defaultFn,
    };
});

beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

describe('Suggest', () => {
    it('Updates value and searchTerm on input change ( >= 2 value.length)', async () => {
        const {container} = render(<Suggest />);

        const inputEl = container.getElementsByTagName('input').item(0) as HTMLInputElement;

        await waitFor(() => fireEvent.input(inputEl, {target: {value: 'abs'}}));

        expect(getLocations).toBeCalledWith({searchTerm: 'abs'});
        expect(getLocations).toBeCalledTimes(1);
        expect(inputEl.value).toEqual('abs');
    });

    it("Doesn't update value and searchTerm on input change ( < 2 value.length)", async () => {
        const {container} = render(<Suggest />);

        const inputEl = container.getElementsByTagName('input').item(0) as HTMLInputElement;

        await waitFor(() => fireEvent.input(inputEl, {target: {value: 's'}}));

        expect(getLocations).toBeCalledTimes(0);
        expect(inputEl.value).toEqual('s');
    });

    it('Selects value in option after keydown', async () => {
        const {container} = render(<Suggest />);

        const inputEl = container.getElementsByTagName('input').item(0) as HTMLInputElement;

        await waitFor(() => fireEvent.input(inputEl, {target: {value: 'abcs'}}));

        const liElFirst = container.getElementsByTagName('li').item(0) as HTMLLIElement;
        const liElSecond = container.getElementsByTagName('li').item(1) as HTMLLIElement;

        await waitFor(() => fireEvent.keyDown(liElFirst, {keyCode: 40}));
        await waitFor(() => fireEvent.keyDown(liElSecond, {keyCode: 13}));

        expect(inputEl.value).toEqual('Airport, Somewhere, Sun');
    });

    it('Selects value in option after click', async () => {
        const {container} = render(<Suggest />);

        const inputEl = container.getElementsByTagName('input').item(0) as HTMLInputElement;

        await waitFor(() => fireEvent.input(inputEl, {target: {value: 'abcs'}}));

        const liEl = container.getElementsByTagName('li').item(0) as HTMLLIElement;

        await waitFor(() => fireEvent.click(liEl, {keyCode: 13}));

        expect(inputEl.value).toEqual('Test, Test, Wonderland');
    });

    it('Selects value in option after key down and up move', async () => {
        const {container} = render(<Suggest />);

        const inputEl = container.getElementsByTagName('input').item(0) as HTMLInputElement;

        await waitFor(() => fireEvent.input(inputEl, {target: {value: 'abcs'}}));

        const liElFirst = container.getElementsByTagName('li').item(0) as HTMLLIElement;
        const liElSecond = container.getElementsByTagName('li').item(1) as HTMLLIElement;

        await waitFor(() => fireEvent.keyDown(liElFirst, {keyCode: 38}));
        await waitFor(() => fireEvent.keyDown(liElSecond, {keyCode: 40}));
        await waitFor(() => fireEvent.keyDown(liElFirst, {keyCode: 13}));

        expect(inputEl.value).toEqual('Test, Test, Wonderland');
    });
});
