import React, {useState, FunctionComponent, ChangeEvent, DragEvent, useCallback} from 'react';

import DragArea from './DragArea';
import Preview from './Preview';

import css from './style.css';

type UploaderProps = {
    accept: string;
    showPreview?: boolean;
    onChange: (f: FileList) => void;
    validateFile?: (f: FileList | null) => string | null;
};

const Uploader: FunctionComponent<UploaderProps> = ({showPreview = true, accept, onChange, validateFile}) => {
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isPreviewPending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const setPreview = useCallback(
        (file: File) => {
            const reader = new FileReader();

            reader.onloadstart = () => setPending(true);
            reader.onerror = () => setPending(false);
            reader.onabort = () => setPending(false);
            reader.onloadend = () => setPending(false);
            reader.onload = () => setPreviewUrl(reader.result as string);

            reader.readAsDataURL(file);
        },
        [setPreviewUrl],
    );

    const onFileUpload = useCallback(
        (evt: ChangeEvent) => {
            const files = (evt.target as HTMLInputElement)?.files;

            const error = validateFile ? validateFile(files) : null;

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
        [setPreview, showPreview, onChange, validateFile],
    );

    const onFileDrop = useCallback(
        (evt: DragEvent) => {
            const files = evt.dataTransfer.files;

            const error = validateFile ? validateFile(files) : null;

            if (error) {
                setError(error);
                return;
            }

            if (showPreview && files?.length) {
                setPreview(files[0]);
            }

            onChange(files);
        },
        [setPreview, showPreview, onChange, validateFile],
    );

    return (
        <div className={css.uploader}>
            <DragArea {...{onFileUpload, onFileDrop, accept, error}} />
            {showPreview && previewUrl && <Preview {...{previewUrl, isPreviewPending}} />}
        </div>
    );
};

export default Uploader;
