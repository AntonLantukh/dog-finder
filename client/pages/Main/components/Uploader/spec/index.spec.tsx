import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';

import Uploader from '..';

const mockOnChange = jest.fn();
const mockOnValidate = jest.fn(() => null);

const mockBaseProps = {
    accept: '.jpg,.jpeg,.png',
    showPreview: true,
    onChange: mockOnChange,
    onValidate: mockOnValidate,
};

const mockFile = new Blob(['testing'], {type: 'image/jpeg'});

const mockReader = {
    readAsDataURL: function () {
        this.onloadstart();
        this.onload();
    },
    onloadstart: jest.fn(),
    onload: jest.fn(),
};

// @ts-expect-error
window.FileReader = jest.fn(() => mockReader);

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Uploader', () => {
    describe('Upload change event', () => {
        const mockUploadEvent = {
            target: {
                files: [mockFile],
            },
        };
        it('Triggers parent onChange event if validation is passed', async () => {
            const {container} = render(<Uploader {...mockBaseProps} />);

            const inputEl = container.getElementsByTagName('input').item(0) as HTMLInputElement;

            await waitFor(() => fireEvent.change(inputEl, mockUploadEvent));

            expect(mockOnValidate).toBeCalledTimes(1);
            expect(mockOnChange).toBeCalledTimes(1);
            expect(mockOnChange).toBeCalledWith([mockFile]);
            expect(mockOnValidate).toBeCalledWith([mockFile]);
        });

        it('Doesn"t trigger parent onChange event if validation is not passed', async () => {
            const onValidate = jest.fn(() => 'error!');
            const mockModifiedProps = {...mockBaseProps, onValidate};

            const {container} = render(<Uploader {...mockModifiedProps} />);

            const inputEl = container.getElementsByTagName('input').item(0) as HTMLInputElement;

            await waitFor(() => fireEvent.change(inputEl, mockUploadEvent));

            expect(onValidate).toBeCalledTimes(1);
            expect(onValidate).toBeCalledWith([mockFile]);
            expect(mockOnChange).toBeCalledTimes(0);
        });
    });

    describe('Upload drop event', () => {
        const mockDropEvent = {
            dataTransfer: {
                files: [mockFile],
            },
        };
        it('Triggers parent onChange event if validation is passed', async () => {
            const {container} = render(<Uploader {...mockBaseProps} />);

            const dragArea = container.getElementsByTagName('input').item(0) as HTMLInputElement;

            await waitFor(() => fireEvent.drop(dragArea, mockDropEvent));

            expect(mockOnValidate).toBeCalledTimes(1);
            expect(mockOnChange).toBeCalledTimes(1);
            expect(mockOnChange).toBeCalledWith([mockFile]);
            expect(mockOnValidate).toBeCalledWith([mockFile]);
        });

        it('Doesn"t trigger parent onChange event if validation is not passed', async () => {
            const onValidate = jest.fn(() => 'error!');
            const mockModifiedProps = {...mockBaseProps, onValidate};

            const {container} = render(<Uploader {...mockModifiedProps} />);

            const dragArea = container.getElementsByTagName('input').item(0) as HTMLInputElement;

            await waitFor(() => fireEvent.drop(dragArea, mockDropEvent));

            expect(onValidate).toBeCalledTimes(1);
            expect(onValidate).toBeCalledWith([mockFile]);
            expect(mockOnChange).toBeCalledTimes(0);
        });
    });
});
