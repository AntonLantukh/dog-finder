import React from 'react';
import {render} from '@testing-library/react';

import {DogSearchContent} from '..';

jest.mock('../../Uploader', () => 'mock-uploader');
jest.mock('../../Breed', () => 'mock-breed');
jest.mock('../../DogsList', () => 'mock-dogs-list');
jest.mock('../../Spinner', () => 'mock-spinner');

jest.mock('@tensorflow/tfjs-core');
jest.mock('@tensorflow/tfjs-converter');

const mockProps = {
    onChange: jest.fn(),
    onValidate: jest.fn(),
    isSearchActivated: false,
    isPending: false,
    breed: [],
    dogs: [],
    interRef: {current: {} as HTMLDivElement},
};

describe('DogSearchContent', () => {
    it('Initial state => show only uploader', () => {
        const {container} = render(<DogSearchContent {...mockProps} />);

        expect(container.querySelector('mock-uploader')).toBeTruthy();
        expect(container.querySelector('mock-breed')).toBeNull();
        expect(container.querySelector('mock-dogs-list')).toBeNull();
        expect(container.querySelector('mock-spinner')).toBeNull();
    });

    it('Pending state => show uploader + pending', () => {
        const modifiedProps = {...mockProps, isPending: true};

        const {container} = render(<DogSearchContent {...modifiedProps} />);

        expect(container.querySelector('mock-uploader')).toBeTruthy();
        expect(container.querySelector('mock-breed')).toBeNull();
        expect(container.querySelector('mock-dogs-list')).toBeNull();
        expect(container.querySelector('mock-spinner')).toBeTruthy();
    });

    it('Active state + dogs => show uploader + dogs + breed', () => {
        const modifiedProps = {...mockProps, isSearchActivated: true, dogs: ['dog'], breed: ['breed']};

        const {container} = render(<DogSearchContent {...modifiedProps} />);

        expect(container.querySelector('mock-uploader')).toBeTruthy();
        expect(container.querySelector('mock-breed')).toBeTruthy();
        expect(container.querySelector('mock-dogs-list')).toBeTruthy();
        expect(container.querySelector('mock-spinner')).toBeNull();
    });
});
