import React, {useState, FunctionComponent} from 'react';

import DragArea from './DragArea';
import Preview from './Preview';

import {useFileHandlers, useSetPreview} from './useFileHandlers';

import css from './style.scss';

type UploaderProps = {
    accept: string;
    showPreview?: boolean;
    onChange: (f: FileList) => void;
    onValidate?: (f: FileList | null) => string | null;
};

const Uploader: FunctionComponent<UploaderProps> = ({showPreview = true, accept, onChange, onValidate}) => {
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isPreviewPending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const setPreview = useSetPreview({setPreviewUrl, setPending});
    const {onFileDrop, onFileUpload} = useFileHandlers({showPreview, setError, setPreview, onChange, onValidate});

    return (
        <div className={css.uploader}>
            <DragArea {...{onFileUpload, onFileDrop, accept, error}} />
            {showPreview && previewUrl && <Preview {...{previewUrl, isPreviewPending}} />}
        </div>
    );
};

export default Uploader;
