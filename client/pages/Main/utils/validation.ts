import {MIME_TYPES} from 'client/constants/mimeTypes';

const AVAILABLE_FORMATS = [MIME_TYPES['.jpg'], MIME_TYPES['.jpeg'], MIME_TYPES['.png']];

export const VALIDATION_ERROR = {
    EMPTY_FILE: 'Please upload at least one dog image',
    INVALID_COUNT: 'You should upload no more than one dog image',
    INVALID_SIZE: 'You have exceeded max file size (8 mb.)',
    INVALID_FORMAT: 'Please upload one of the following image formats: .jpg, .jpeg, .png',
};

const MAX_FILE_SIZE = 8_388_608;

export const validateFile = (files: FileList | null): string | null => {
    if (!files?.length) return VALIDATION_ERROR.EMPTY_FILE;

    if (files.length > 1) return VALIDATION_ERROR.INVALID_COUNT;

    const {size, type} = files[0] || {};

    if (size > MAX_FILE_SIZE) return VALIDATION_ERROR.INVALID_SIZE;

    if (!AVAILABLE_FORMATS.includes(type)) return VALIDATION_ERROR.INVALID_FORMAT;

    return null;
};
