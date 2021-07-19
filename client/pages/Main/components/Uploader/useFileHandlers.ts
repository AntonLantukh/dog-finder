import {ChangeEvent, DragEvent, useCallback} from 'react';

type PreviewProps = {
    setPending: (b: boolean) => void;
    setPreviewUrl: (b: string) => void;
};

export const useSetPreview = ({setPending, setPreviewUrl}: PreviewProps): ((f: File) => void) =>
    useCallback(
        (file: File) => {
            const reader = new FileReader();

            reader.onloadstart = () => setPending(true);
            reader.onerror = () => setPending(false);
            reader.onabort = () => setPending(false);
            reader.onloadend = () => setPending(false);
            reader.onload = () => setPreviewUrl(reader.result as string);

            reader.readAsDataURL(file);
        },
        [setPreviewUrl, setPending],
    );

type FileHandlerProps = {
    showPreview: boolean;

    setError: (e: string | null) => void;
    setPreview: (f: File) => void;
    onChange: (f: FileList) => void;
    onValidate?: (f: FileList | null) => string | null;
};

type Handlers = {
    onFileDrop: (c: DragEvent<Element>) => void;
    onFileUpload: (c: ChangeEvent<Element>) => void;
};

export const useFileHandlers = ({
    setError,
    setPreview,
    onChange,
    onValidate,
    showPreview,
}: FileHandlerProps): Handlers => {
    const onFileUpload = useCallback(
        (evt: ChangeEvent) => {
            setError(null);

            const files = (evt.target as HTMLInputElement)?.files;
            const error = onValidate ? onValidate(files) : null;

            if (error) {
                setError(error);
                return;
            }

            const checkedFiles = files as FileList;

            if (showPreview) {
                setPreview(checkedFiles[0]);
            }

            onChange(checkedFiles);
        },
        [setPreview, showPreview, onChange, onValidate, setError],
    );

    const onFileDrop = useCallback(
        (evt: DragEvent) => {
            const files = evt.dataTransfer.files;

            const error = onValidate ? onValidate(files) : null;

            if (error) {
                setError(error);
                return;
            }

            if (showPreview && files?.length) {
                setPreview(files[0]);
            }

            onChange(files);
        },
        [setPreview, showPreview, onChange, onValidate, setError],
    );

    return {onFileDrop, onFileUpload};
};
