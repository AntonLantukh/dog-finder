import {validateFile, VALIDATION_ERROR} from '../validation';

describe('validateFile', () => {
    it('Got 2 files => returns error', () => {
        const files = [
            {
                size: 99999,
                name: 'dog.jpg',
                type: 'image/jpeg',
            },
            {
                size: 99999,
                name: 'do1.jpg',
                type: 'image/jpeg',
            },
        ] as unknown as FileList;

        const error = validateFile(files);

        expect(error).toEqual(VALIDATION_ERROR.INVALID_COUNT);
    });

    it('Got 0 files => returns error', () => {
        const files = [] as unknown as FileList;

        const error = validateFile(files);

        expect(error).toEqual(VALIDATION_ERROR.EMPTY_FILE);
    });

    it('Got invalid size => returns error', () => {
        const files = [
            {
                size: 1_048_599,
                name: 'dog.jpg',
                type: 'image/jpeg',
            },
        ] as unknown as FileList;

        const error = validateFile(files);

        expect(error).toEqual(VALIDATION_ERROR.INVALID_SIZE);
    });

    it('Got invalid format => returns error', () => {
        const files = [
            {
                size: 1_048_570,
                name: 'dog.jpg',
                type: 'image/svg',
            },
        ] as unknown as FileList;

        const error = validateFile(files);

        expect(error).toEqual(VALIDATION_ERROR.INVALID_FORMAT);
    });

    it('Everything is ok => no errors', () => {
        const files = [
            {
                size: 1_048_572,
                name: 'dog.jpg',
                type: 'image/jpeg',
            },
        ] as unknown as FileList;

        const error = validateFile(files);

        expect(error).toEqual(null);
    });
});
