import React, {FunctionComponent, ChangeEvent, DragEvent} from 'react';
import cn from 'classnames';

import {useDragDropHandlers} from './useDragDropHandlers';

import css from './style.scss';

type DragAreaProps = {
    onFileDrop: (e: DragEvent) => void;
    onFileUpload: (e: ChangeEvent) => void;
    accept: string;
    error: string | null;
};

const DragArea: FunctionComponent<DragAreaProps> = ({onFileDrop, onFileUpload, accept, error}) => {
    const {isFileDraggedOver, onDragOver, onDragLeave, onDrop} = useDragDropHandlers({onFileDrop});

    return (
        <div>
            <div
                className={cn(css.dragdrop, isFileDraggedOver && css.dragdrop_dragged, error && css.dragdrop_error)}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <input type="file" id="upload" hidden onChange={onFileUpload} accept={accept} />
                <label htmlFor="upload" className={css.dragdrop__button}>
                    Upload the image
                </label>
                <span className={css.dragdrop__caption}>Or just drag it to the window</span>
            </div>
            {error && <p className={css.dragdrop__error}>{error}</p>}
        </div>
    );
};

export default DragArea;
