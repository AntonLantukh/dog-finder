import {renderHook} from '@testing-library/react-hooks';

import getPredictions from 'client/api/tensorflow/getPredictions';

import {mockFile, mockReader} from '../../../../mocks';

import {useFileHandlers} from '../useFileHandlers';

// @ts-expect-error
window.FileReader = jest.fn(() => mockReader);

const mockBreeds = {
    finnish: ['lapphund'],
    frise: ['bichon'],
    germanshepherd: [],
    greyhound: ['italian'],
};

const mockFetchDogs = jest.fn(() => Promise.resolve());
const mockSetPending = jest.fn();
const mockFiles = [mockFile] as unknown as FileList;

const mockProps = {
    breeds: mockBreeds,

    setIsPending: mockSetPending,
    setDogs: jest.fn(),
    setError: jest.fn(),
    setSearchActivated: jest.fn(),
    setBreed: jest.fn(),
    fetchDogs: mockFetchDogs,
};

const mockPredictions = [
    {className: 'papillon', probability: 0.003951134160161018},
    {className: 'Pomeranian, best dog, really', probability: 0.9925622344017029},
    {className: 'Yorkshire terrier', probability: 0.001014165347442031},
];

jest.mock('client/api/tensorflow/getPredictions', () => {
    const defaultFn = jest.fn(() => Promise.resolve(mockPredictions));

    return {
        __esModule: true,
        default: defaultFn,
    };
});

jest.mock('../../../../utils/breed', () => {
    const defaultFn = () => ['terrier', 'best'];

    return {
        __esModule: true,
        getBreedFromPrediction: defaultFn,
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});
describe('useFileHandlers', () => {
    it('Triggers api endpoint to fetch predictions and sets pending state to false', async () => {
        const {result, waitFor} = renderHook(() => useFileHandlers(mockProps));

        result.current(mockFiles);
        // @ts-expect-error
        await waitFor(mockFetchDogs);

        expect(mockFetchDogs).toBeCalledTimes(1);
        expect(getPredictions).toHaveBeenCalledTimes(1);
        expect(mockSetPending).toHaveBeenCalledTimes(2);
    });
});
