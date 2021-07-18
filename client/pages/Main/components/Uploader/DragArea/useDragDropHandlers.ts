import {useState, DragEvent, useCallback} from 'react';

type DragDropHandlersProps = {
    onFileDrop: (e: DragEvent) => void;
};

type ResProps = {
    onDragOver: (e: DragEvent) => void;
    onDragLeave: (e: DragEvent) => void;
    onDrop: (e: DragEvent) => void;
    isFileDraggedOver: boolean;
};

export const useDragDropHandlers = ({onFileDrop}: DragDropHandlersProps): ResProps => {
    const [isFileDraggedOver, setIsFileDraggedOver] = useState(false);

    const onDragOver = useCallback(
        (evt: DragEvent) => {
            evt.preventDefault();
            setIsFileDraggedOver(true);
        },
        [setIsFileDraggedOver],
    );

    const onDragLeave = useCallback(
        (evt: DragEvent) => {
            evt.preventDefault();
            setIsFileDraggedOver(false);
        },
        [setIsFileDraggedOver],
    );

    const onDrop = useCallback(
        (evt: DragEvent) => {
            evt.preventDefault();
            evt.stopPropagation();

            setIsFileDraggedOver(false);
            onFileDrop(evt);
        },
        [onFileDrop, setIsFileDraggedOver],
    );

    return {isFileDraggedOver, onDragOver, onDragLeave, onDrop};
};
