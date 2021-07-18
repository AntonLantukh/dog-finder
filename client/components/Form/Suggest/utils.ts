import {MutableRefObject} from 'react';

export const getNode = (ref: MutableRefObject<HTMLUListElement | null>, index: number): HTMLLIElement =>
    ref.current?.children?.[index] as HTMLLIElement;

export const focusOption = (
    ref: MutableRefObject<HTMLUListElement | null>,
    index: number,
    prevIndex?: number,
): void => {
    const liEl = getNode(ref, index);

    if (prevIndex != null) {
        const prevLiEl = getNode(ref, prevIndex);
        prevLiEl.setAttribute('aria-selected', 'false');
    }

    liEl.focus();
    liEl.setAttribute('aria-selected', 'true');
};

export const stringify = (strArr: string[]): string => strArr.filter(Boolean).join(', ');
