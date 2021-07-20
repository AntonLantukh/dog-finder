export const mockFile = new Blob(['testing'], {type: 'image/jpeg'});

export const mockReader = {
    readAsDataURL: async function (args: any): Promise<void> {
        await this.onload(args);
    },
    onloadstart: jest.fn(),
    onload: jest.fn(),
};

export const mockUploadEvent = {
    target: {
        files: [mockFile],
    },
};

export const mockDropEvent = {
    dataTransfer: {
        files: [mockFile],
    },
};
